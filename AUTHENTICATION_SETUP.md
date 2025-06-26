# Authentication System Setup Guide

## Overview

This guide explains how to set up and use the member and login functionality for your AI SEO Helper application. The system uses Payload CMS for authentication with Next.js integration.

## Features Implemented

### ✅ Core Authentication
- User registration and login
- JWT-based authentication with secure cookies
- Password hashing and security
- Role-based access control (Admin/Editor)

### ✅ User Interface
- Modern login and registration forms
- Responsive header with authentication controls
- User dashboard with personalized content
- Account settings page

### ✅ Security Features
- Protected routes with middleware
- HTTP-only cookies for JWT tokens
- Password validation and confirmation
- CSRF protection

## File Structure

```
app/
├── components/
│   ├── AuthProvider.tsx      # Authentication context provider
│   └── Header.tsx           # Navigation header with auth controls
├── api/auth/
│   ├── login/route.ts       # Login API endpoint
│   ├── logout/route.ts      # Logout API endpoint
│   ├── register/route.ts    # Registration API endpoint
│   ├── update-profile/route.ts # Profile update endpoint
│   └── change-password/route.ts # Password change endpoint
├── login/page.tsx           # Login page
├── register/page.tsx        # Registration page
├── dashboard/page.tsx       # User dashboard
├── settings/page.tsx        # Account settings
└── layout.tsx              # Root layout with auth provider
middleware.ts               # Route protection middleware
```

## Setup Instructions

### 1. Environment Variables

Add these to your `.env.local` file:

```env
PAYLOAD_SECRET=your-secret-key-here
MONGODB_URI=your-mongodb-connection-string
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### 2. Database Setup

Ensure your MongoDB database is running and accessible. The Users collection will be automatically created by Payload CMS.

### 3. Initialize Payload

Run the initialization script to set up the database:

```bash
npm run init-payload
```

### 4. Create Admin User

You can create an admin user through the Payload admin panel at `/admin` or programmatically:

```typescript
// In your initialization script
await payload.create({
  collection: 'users',
  data: {
    email: 'admin@example.com',
    password: 'secure-password',
    name: 'Admin User',
    role: 'admin',
  },
})
```

## Usage Guide

### For Users

1. **Registration**: Visit `/register` to create a new account
2. **Login**: Visit `/login` to sign in
3. **Dashboard**: Access personalized content at `/dashboard`
4. **Settings**: Manage account at `/settings`

### For Developers

#### Protecting Routes

Routes are automatically protected by the middleware. Add new protected routes to the `protectedRoutes` array in `middleware.ts`:

```typescript
const protectedRoutes = ['/dashboard', '/settings', '/admin', '/your-new-route']
```

#### Using Authentication in Components

```typescript
import { useAuth } from '../components/AuthProvider'

function MyComponent() {
  const { user, login, logout, isLoading } = useAuth()
  
  if (isLoading) return <div>Loading...</div>
  if (!user) return <div>Please log in</div>
  
  return <div>Welcome, {user.name}!</div>
}
```

#### API Authentication

For API routes that require authentication:

```typescript
import { getPayload } from 'payload'

export async function GET(request: NextRequest) {
  const payload = await getPayload()
  const { user } = await payload.auth({ headers: request.headers })
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Your protected API logic here
}
```

## Security Considerations

### ✅ Implemented
- JWT tokens stored in HTTP-only cookies
- Password hashing with bcrypt
- CSRF protection
- Input validation
- Rate limiting (via Payload)

### 🔄 Recommended Additions
- Email verification
- Password reset functionality
- Two-factor authentication
- Session management
- Audit logging

## Customization

### User Roles

Modify the role options in `collections/Users.ts`:

```typescript
{
  name: 'role',
  type: 'select',
  required: true,
  defaultValue: 'editor',
  options: [
    { label: 'Admin', value: 'admin' },
    { label: 'Editor', value: 'editor' },
    { label: 'Viewer', value: 'viewer' }, // Add new roles
  ],
}
```

### User Fields

Add custom fields to the Users collection:

```typescript
fields: [
  // ... existing fields
  {
    name: 'company',
    type: 'text',
  },
  {
    name: 'preferences',
    type: 'group',
    fields: [
      {
        name: 'theme',
        type: 'select',
        options: ['light', 'dark'],
        defaultValue: 'light',
      },
    ],
  },
]
```

## Troubleshooting

### Common Issues

1. **"PAYLOAD_SECRET environment variable is required"**
   - Ensure you have set the `PAYLOAD_SECRET` in your `.env.local` file

2. **"MongoDB connection failed"**
   - Check your `MONGODB_URI` and ensure MongoDB is running

3. **"Authentication failed"**
   - Verify the user exists in the database
   - Check that the password is correct

4. **"Route not found"**
   - Ensure all API routes are properly created
   - Check file naming conventions

### Debug Mode

Enable debug logging by adding to your `.env.local`:

```env
DEBUG=payload:*
```

## Next Steps

1. **Email Verification**: Implement email verification for new registrations
2. **Password Reset**: Add forgot password functionality
3. **Social Login**: Integrate OAuth providers (Google, GitHub, etc.)
4. **Advanced Permissions**: Implement granular permission system
5. **User Management**: Add admin interface for user management

## Support

For issues or questions about the authentication system, check the Payload CMS documentation or create an issue in your project repository. 