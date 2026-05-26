import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, tripType, destination, budget, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields (name, email, and message are required)' },
        { status: 400 }
      )
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
      from: `"Travel Castle Contact" <${fromSender}>`,
      to: ownerEmail,
      subject: `New Contact Inquiry from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; color: #334155; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #0066cc; font-size: 24px; margin: 0; font-weight: 800; letter-spacing: -0.5px;">Travel Castle</h1>
            <p style="font-size: 14px; color: #64748b; margin: 4px 0 0 0;">New Contact Form Inquiry</p>
          </div>
          <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 20px 0;" />
          <h2 style="color: #1e293b; font-size: 18px; font-weight: 700; margin-top: 0; margin-bottom: 16px;">Inquiry Details</h2>
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 35%;">Customer Name</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 750;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email Address</td>
              <td style="padding: 8px 0; color: #0066cc; font-weight: 700;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Phone Number</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 700;">${phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Type of Trip</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 700; text-transform: capitalize;">${tripType || 'General Inquiry'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Destination</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 700;">${destination || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Budget Range</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 700;">${budget || 'Not specified'}</td>
            </tr>
          </table>
          <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 20px 0;" />
          <h3 style="color: #1e293b; font-size: 16px; font-weight: 700; margin-top: 0; margin-bottom: 10px;">Message</h3>
          <div style="background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 12px; padding: 16px; font-size: 14px; color: #334155; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #94a3b8;">
            <p>This inquiry was sent from the Travel Castle Contact Us page.</p>
            <p>Timestamp: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    }

    // 3. Draft email content for User (Customer Confirmation)
    const customerMailOptions = {
      from: `"Travel Castle" <${fromSender}>`,
      to: email,
      subject: `We've received your inquiry - Travel Castle`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; color: #334155; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #0066cc; font-size: 26px; margin: 0; font-weight: 800; letter-spacing: -0.5px;">Travel Castle</h1>
            <p style="font-size: 14px; color: #10b981; font-weight: 700; margin: 6px 0 0 0;">✓ Message Received Successfully</p>
          </div>
          <p style="font-size: 15px; line-height: 1.6; color: #475569;">
            Hi <strong>${name}</strong>,
          </p>
          <p style="font-size: 15px; line-height: 1.6; color: #475569;">
            Thank you for reaching out to Travel Castle! We've received your message and our team of travel experts is already reviewing it.
          </p>
          <p style="font-size: 15px; line-height: 1.6; color: #475569;">
            We know how important your travel plans are, so a dedicated travel specialist will get back to you <strong>within 2 hours</strong> (during business hours) to discuss custom itineraries or answer your questions.
          </p>
          <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 24px 0;" />
          <h3 style="color: #1e293b; font-size: 16px; font-weight: 700; margin-top: 0; margin-bottom: 14px;">Summary of Your Request</h3>
          <div style="background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 12px; padding: 16px; font-size: 14px; margin-bottom: 24px;">
            ${tripType ? `<p style="margin: 4px 0;"><strong>Trip Type:</strong> ${tripType.charAt(0).toUpperCase() + tripType.slice(1)}</p>` : ''}
            ${destination ? `<p style="margin: 4px 0;"><strong>Destination:</strong> ${destination}</p>` : ''}
            ${budget ? `<p style="margin: 4px 0;"><strong>Estimated Budget:</strong> ${budget}</p>` : ''}
            <p style="margin: 4px 0;"><strong>Your Message:</strong></p>
            <p style="margin: 4px 0; color: #64748b; font-style: italic;">"${message.length > 120 ? message.substring(0, 120) + '...' : message}"</p>
          </div>
          <p style="font-size: 13px; line-height: 1.5; color: #64748b;">
            If you need urgent assistance, you can always ring our support desk directly at <strong>+91-9809660999</strong> or <strong>+91-9820702727</strong>.
          </p>
          <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 24px 0;" />
          <p style="font-size: 14px; color: #475569;">
            Warm regards,<br/>
            <strong>Team Travel Castle</strong>
          </p>
        </div>
      `,
    }

    // Send emails
    const ownerInfo = await transporter.sendMail(ownerMailOptions)
    await transporter.sendMail(customerMailOptions)

    let previewUrl = null
    if (!isSmtpConfigured) {
      previewUrl = nodemailer.getTestMessageUrl(ownerInfo)
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry received and emails sent successfully.',
      previewUrl,
    })
  } catch (error: any) {
    console.error('Error handling contact request:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
