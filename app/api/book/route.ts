import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, packageTitle, optionName, totalPrice, date } = body

    if (!name || !email || !phone || !packageTitle) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    // 1. Configure SMTP transporter
    let transporter
    const isSmtpConfigured = process.env.SMTP_USER && process.env.SMTP_PASS

    if (isSmtpConfigured) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })
    } else {
      // Fallback: Generate a test account dynamically using Ethereal Email
      const testAccount = await nodemailer.createTestAccount()
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      })
    }

    // From email header
    const fromSender = isSmtpConfigured ? process.env.SMTP_USER : 'noreply@travelcastle.in'
    const ownerEmail = process.env.OWNER_EMAIL || 'owner@travelcastle.in'

    // 2. Draft email content for Owner (Admin)
    const ownerMailOptions = {
      from: `"Travel Castle Booking" <${fromSender}>`,
      to: ownerEmail,
      subject: `New Booking Request: ${packageTitle}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; color: #334155; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #0284c7; font-size: 24px; margin: 0; font-weight: 800; letter-spacing: -0.5px;">Travel Castle</h1>
            <p style="font-size: 14px; color: #64748b; margin: 4px 0 0 0;">New Booking Confirmation Alert</p>
          </div>
          <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 20px 0;" />
          <h2 style="color: #1e293b; font-size: 18px; font-weight: 700; margin-top: 0; margin-bottom: 16px;">Booking Details Summary</h2>
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 35%;">Package Title</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 750;">${packageTitle}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Selected Option</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 700;">${optionName || 'Standard Triple Sharing'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Preferred Travel Date</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 700;">${date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Not selected'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Estimated Cost</td>
              <td style="padding: 8px 0; color: #0284c7; font-weight: 800; font-size: 16px;">₹${totalPrice.toLocaleString('en-IN')}</td>
            </tr>
          </table>
          <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 20px 0;" />
          <h2 style="color: #1e293b; font-size: 18px; font-weight: 700; margin-top: 0; margin-bottom: 16px;">Customer Information</h2>
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 35%;">Name</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 700;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Phone Number</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 700;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email ID</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 700;">${email}</td>
            </tr>
          </table>
          <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #94a3b8;">
            <p>This is an automated notification from your Travel Castle reservation portal.</p>
            <p>Timestamp: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    }

    // 3. Draft email content for User (Customer Confirmation)
    const customerMailOptions = {
      from: `"Travel Castle" <${fromSender}>`,
      to: email,
      subject: `Booking Request Confirmed: ${packageTitle}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; color: #334155; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #0284c7; font-size: 26px; margin: 0; font-weight: 800; letter-spacing: -0.5px;">Travel Castle</h1>
            <p style="font-size: 14px; color: #10b981; font-weight: 700; margin: 6px 0 0 0;">✓ Booking Request Received</p>
          </div>
          <p style="font-size: 15px; line-height: 1.6; color: #475569;">
            Hi <strong>${name}</strong>,
          </p>
          <p style="font-size: 15px; line-height: 1.6; color: #475569;">
            Thank you for choosing Travel Castle. We have successfully registered your booking request for the <strong>${packageTitle}</strong> package.
          </p>
          <p style="font-size: 15px; line-height: 1.6; color: #475569;">
            Our dedicated travel consultant will call you back on your number <strong>${phone}</strong> within 15 minutes to configure your custom itinerary details, flight preferences, and guide you through the payment options.
          </p>
          <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 24px 0;" />
          <h3 style="color: #1e293b; font-size: 16px; font-weight: 700; margin-top: 0; margin-bottom: 14px;">Your Trip Details</h3>
          <div style="background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 12px; padding: 16px; font-size: 14px; margin-bottom: 24px;">
            <p style="margin: 4px 0;"><strong>Trip Title:</strong> ${packageTitle}</p>
            <p style="margin: 4px 0;"><strong>Accommodation Option:</strong> ${optionName || 'Standard Triple Sharing'}</p>
            <p style="margin: 4px 0;"><strong>Preferred Departure Date:</strong> ${date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Not selected'}</p>
            <p style="margin: 4px 0; color: #0284c7; font-size: 15px; font-weight: 800;"><strong>Total Cost:</strong> ₹${totalPrice.toLocaleString('en-IN')}</p>
          </div>
          <p style="font-size: 13px; line-height: 1.5; color: #64748b;">
            * Please note: You will only need to pay a secure token amount of ₹5,000 to confirm and lock your booking slots. No payment is required immediately.
          </p>
          <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 24px 0;" />
          <p style="font-size: 14px; color: #475569;">
            Have questions? Reply directly to this email or call our helpline: <strong>+91-9809660999 / +91-9820702727</strong>.
          </p>
          <p style="margin-top: 30px; font-size: 14px; color: #475569; border-top: 1px solid #f1f5f9; pt: 20px;">
            Best Regards,<br/>
            <strong>Team Travel Castle</strong>
          </p>
        </div>
      `,
    }

    // Send emails
    const ownerInfo = await transporter.sendMail(ownerMailOptions)
    const customerInfo = await transporter.sendMail(customerMailOptions)

    let previewUrl = null
    if (!isSmtpConfigured) {
      previewUrl = nodemailer.getTestMessageUrl(ownerInfo)
    }

    return NextResponse.json({
      success: true,
      message: 'Booking completed and emails sent.',
      previewUrl,
    })
  } catch (error: any) {
    console.error('Error handling booking request:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
