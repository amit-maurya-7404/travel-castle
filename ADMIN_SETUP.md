# Travel Castle Admin Panel Setup Guide

## Overview

The Travel Castle Admin Panel is a complete content management system for managing your travel business. It allows you to control:
- **Packages** - Travel packages by category
- **Blogs** - Travel blog posts
- **Gallery** - Travel photography
- **Reviews** - Customer testimonials

## Prerequisites

Before starting, you need:
1. MongoDB Atlas account with a database
2. Connection string from MongoDB Atlas
3. A secure JWT secret for authentication

## Environment Variables

Set these environment variables in your Vercel project settings or `.env.local`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-secure-random-secret-key
```

### How to Get MongoDB Connection String:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster (if not already done)
3. Click "Connect" on your cluster
4. Select "Drivers"
5. Copy the connection string
6. Replace `<password>` with your database password

### Generate a Strong JWT Secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Admin Access

### First Time Setup

1. Navigate to `http://localhost:3000/admin/login` (or your domain)
2. Click "Register" to create your first admin account
3. Enter email and password
4. You're now logged in to the admin dashboard

### Login
- Go to `/admin/login`
- Enter your credentials
- Access the dashboard

## Dashboard Features

### 1. **Packages Management**
- **View all packages** with filtering by category
- **Create new packages** with:
  - Title and description
  - Category (honeymoon, corporate, bachelor, family, solo, adventure)
  - Image URL
  - Duration and price
  - Highlights list
  - Publish/draft status
- **Edit existing packages**
- **Delete packages**

### 2. **Blogs Management**
- **Create blog posts** with:
  - Title and description
  - Full content
  - Featured image
  - Author name
- **Edit and delete blog posts**
- **Search functionality**

### 3. **Gallery Management**
- **Upload images** with categories:
  - Destination
  - Experience
  - Culture
  - Nature
- **Filter by category**
- **Grid view preview**
- **Edit and delete images**

### 4. **Reviews Management**
- **Add customer reviews** with:
  - Customer name
  - Rating (1-5 stars)
  - Review text
  - Destination
  - Avatar image
  - Verified badge
- **Edit and delete reviews**
- **View verification status**

## Database Schema

### Packages Collection
```json
{
  "title": "string",
  "description": "string",
  "category": "honeymoon|corporate|bachelor|family|solo|adventure",
  "image": "string (URL)",
  "duration": "string",
  "price": "number",
  "highlights": ["string"],
  "itinerary": [{"day": "number", "title": "string", "description": "string"}],
  "published": "boolean",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Blogs Collection
```json
{
  "title": "string",
  "description": "string",
  "content": "string",
  "image": "string (URL)",
  "author": "string",
  "published": "boolean",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Gallery Collection
```json
{
  "title": "string",
  "image": "string (URL)",
  "category": "destination|experience|culture|nature",
  "published": "boolean",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Reviews Collection
```json
{
  "author": "string",
  "rating": "number (1-5)",
  "text": "string",
  "destination": "string",
  "avatar": "string (URL)",
  "verified": "boolean",
  "published": "boolean",
  "createdAt": "date",
  "updatedAt": "date"
}
```

## API Endpoints

All admin endpoints require authentication token in cookies.

### Authentication
- `POST /api/auth/register` - Register new admin
- `POST /api/auth/login` - Login admin
- `POST /api/auth/logout` - Logout admin

### Packages
- `GET /api/packages` - Get all packages
- `POST /api/packages` - Create package
- `GET /api/packages/[id]` - Get package details
- `PUT /api/packages/[id]` - Update package
- `DELETE /api/packages/[id]` - Delete package

### Blogs
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create blog
- `GET /api/blogs/[id]` - Get blog details
- `PUT /api/blogs/[id]` - Update blog
- `DELETE /api/blogs/[id]` - Delete blog

### Gallery
- `GET /api/gallery` - Get all gallery images
- `POST /api/gallery` - Upload image
- `GET /api/gallery/[id]` - Get image details
- `PUT /api/gallery/[id]` - Update image
- `DELETE /api/gallery/[id]` - Delete image

### Reviews
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/[id]` - Get review details
- `PUT /api/reviews/[id]` - Update review
- `DELETE /api/reviews/[id]` - Delete review

## Features

✅ **Security**
- Secure JWT authentication
- Password hashing with bcryptjs
- HTTP-only cookies
- Route protection with middleware

✅ **User Experience**
- Responsive design for mobile and desktop
- Real-time search and filtering
- Confirm delete dialogs
- Toast notifications
- Loading states

✅ **Content Management**
- Rich forms with validation
- Image URL support
- Draft/publish status
- Timestamps for all content

✅ **Analytics Dashboard**
- Total packages, blogs, gallery images, reviews count
- Quick access buttons
- Content statistics

## Troubleshooting

### "Unauthorized" Error
- Check if token is set in cookies
- Try logging out and logging in again
- Clear browser cookies and cache

### MongoDB Connection Error
- Verify MONGODB_URI is correct
- Check MongoDB Atlas allows your IP
- Ensure database user has proper permissions

### Images Not Loading
- Ensure image URLs are valid and publicly accessible
- Check CORS if using external image hosting

## Security Best Practices

1. **Change Password Regularly** - Update your admin password frequently
2. **Use Strong Passwords** - Use 12+ characters with mixed case and numbers
3. **JWT Secret** - Keep your JWT_SECRET secure and never share it
4. **Database Backups** - Regularly backup your MongoDB database
5. **IP Whitelisting** - Consider whitelisting IPs in MongoDB Atlas

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review console logs for error messages
3. Verify environment variables are set correctly
4. Check MongoDB Atlas dashboard for connection issues
