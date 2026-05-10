# Travel Castle Admin Panel - Quick Start

## Step 1: Set Environment Variables

Add these to your Vercel project environment variables:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-secret-key-here
```

## Step 2: Create First Admin Account

1. Go to `https://yourdomain.com/admin/login`
2. Click "Register"
3. Enter email and password
4. Click Register

## Step 3: Access Admin Dashboard

After registration, you'll be redirected to the dashboard at `/admin/dashboard`

## Navigation

The admin panel has 5 main sections:

### 📦 Packages (`/admin/packages`)
- View all travel packages
- Create new packages with multiple categories
- Edit package details, price, duration, highlights
- Publish or save as draft
- Delete packages

### 📝 Blogs (`/admin/blogs`)
- Create and manage blog posts
- Add title, description, and full content
- Upload featured images
- Search and filter posts

### 📸 Gallery (`/admin/gallery`)
- Upload travel photography
- Organize by category (Destination, Experience, Culture, Nature)
- Add titles to images
- Manage gallery collection

### ⭐ Reviews (`/admin/reviews`)
- Add customer testimonials
- Set rating from 1-5 stars
- Upload customer avatars
- Mark reviews as verified
- Manage all reviews

## Quick Actions from Dashboard

The dashboard shows:
- Total count of packages, blogs, images, reviews
- Quick action buttons to add new content
- Stats and overview

## Features

✨ **Modern Admin Interface**
- Clean, intuitive design matching Travel Castle branding
- Responsive on mobile and desktop
- Dark/light mode compatible

🔒 **Secure**
- JWT-based authentication
- Encrypted passwords
- Protected routes

⚡ **Fast**
- Instant search and filtering
- Real-time preview
- Quick delete confirmation

## Common Tasks

### Add a New Package
1. Go to Packages
2. Click "Add Package"
3. Fill in details (title, description, category, image, price, duration)
4. Add highlights
5. Click "Save Package"

### Create a Blog Post
1. Go to Blogs
2. Click "Add Blog"
3. Fill title and description
4. Add full content
5. Upload featured image
6. Click "Save Blog"

### Upload Gallery Image
1. Go to Gallery
2. Click "Upload Image"
3. Select category
4. Paste image URL
5. Add optional title
6. Click "Save Image"

### Add Customer Review
1. Go to Reviews
2. Click "Add Review"
3. Enter customer name
4. Set rating using stars
5. Write review text
6. Add destination and avatar
7. Mark as verified if applicable
8. Click "Save Review"

## Keyboard Shortcuts

- `Ctrl/Cmd + K` - Quick search (when implemented)
- `Escape` - Close dialogs
- `Enter` - Submit forms

## Mobile-Friendly

The admin panel is fully responsive:
- Sidebar collapses on mobile
- Touch-friendly buttons
- Responsive forms and tables
- Mobile-optimized navigation

## Data Goes Live Immediately

Any content you publish in the admin panel appears on your website instantly:
- Published packages show on homepage
- Blogs display in travel blogs section
- Gallery images appear in gallery
- Reviews show in testimonials carousel

## Tips

💡 **Use Drafts** - Save as draft before publishing to review first

💡 **Preview URLs** - Test image URLs before uploading

💡 **Highlights** - Keep package highlights concise and compelling

💡 **Rich Content** - Use formatting in blog content for better readability

## Support

For MongoDB Atlas setup help, see ADMIN_SETUP.md

For database schema details, see ADMIN_SETUP.md

## Next Steps

1. Create first travel package
2. Write introductory blog post
3. Upload gallery images
4. Add customer reviews
5. Visit homepage to see live changes!
