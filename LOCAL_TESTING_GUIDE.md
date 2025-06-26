# Local Testing Guide for Authentication System

## 🚀 Quick Start Testing

Follow these steps to test the authentication system on your local server:

### Step 1: Environment Setup

1. **Create `.env.local` file** in your project root:
```env
PAYLOAD_SECRET=your-super-secret-key-here-make-it-long-and-random
MONGODB_URI=mongodb://localhost:27017/aiseo-helper
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

2. **Install MongoDB** (if not already installed):
   - **macOS**: `brew install mongodb-community`
   - **Windows**: Download from [MongoDB website](https://www.mongodb.com/try/download/community)
   - **Linux**: `sudo apt install mongodb`

3. **Start MongoDB**:
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Windows
   # MongoDB should start automatically as a service
   ```

### Step 2: Initialize the Database

```bash
# Install dependencies (if not already done)
npm install

# Initialize Payload CMS and create database collections
npm run init-payload
```

### Step 3: Start the Development Server

```bash
npm run dev
```

Your application should now be running at `http://localhost:3000`

## 🧪 Testing the Authentication Flow

### Test 1: Registration Flow

1. **Visit Registration Page**: Go to `http://localhost:3000/register`
2. **Fill out the form**:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `testpassword123`
   - Confirm Password: `testpassword123`
3. **Click "Create account"**
4. **Expected Result**: You should be redirected to `/dashboard`

### Test 2: Login Flow

1. **Logout** (if you're logged in) by clicking the logout button in the header
2. **Visit Login Page**: Go to `http://localhost:3000/login`
3. **Fill out the form**:
   - Email: `test@example.com`
   - Password: `testpassword123`
4. **Click "Sign in"**
5. **Expected Result**: You should be redirected to `/dashboard`

### Test 3: Dashboard Access

1. **Visit Dashboard**: Go to `http://localhost:3000/dashboard`
2. **Expected Result**: You should see a personalized dashboard with:
   - Welcome message with your name
   - Stats cards (Total Projects, Active Tools, etc.)
   - Quick action buttons
   - Recent activity feed

### Test 4: Settings Page

1. **Visit Settings**: Go to `http://localhost:3000/settings`
2. **Test Profile Update**:
   - Change your name to something new
   - Click "Update Profile"
   - **Expected Result**: Success message should appear
3. **Test Password Change**:
   - Enter current password: `testpassword123`
   - Enter new password: `newpassword123`
   - Confirm new password: `newpassword123`
   - Click "Change Password"
   - **Expected Result**: Success message should appear

### Test 5: Route Protection

1. **Logout** from the application
2. **Try to access protected routes**:
   - `http://localhost:3000/dashboard` → Should redirect to `/login`
   - `http://localhost:3000/settings` → Should redirect to `/login`
3. **Login again** and verify you can access these routes

### Test 6: Header Navigation

1. **When logged out**: Header should show "Login" and "Sign Up" buttons
2. **When logged in**: Header should show:
   - User avatar with name and role
   - Settings icon
   - Logout button
   - Dashboard link in navigation

## 🔧 Troubleshooting Common Issues

### Issue 1: "PAYLOAD_SECRET environment variable is required"

**Solution**: Make sure your `.env.local` file exists and contains:
```env
PAYLOAD_SECRET=your-secret-key-here
```

### Issue 2: "MongoDB connection failed"

**Solutions**:
1. **Check if MongoDB is running**:
   ```bash
   # macOS
   brew services list | grep mongodb
   
   # Linux
   sudo systemctl status mongod
   ```

2. **Check your MONGODB_URI**:
   ```env
   MONGODB_URI=mongodb://localhost:27017/aiseo-helper
   ```

3. **Start MongoDB manually**:
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

### Issue 3: "Cannot find module" errors

**Solution**: Make sure all dependencies are installed:
```bash
npm install
```

### Issue 4: API routes not working

**Solutions**:
1. **Check the browser console** for JavaScript errors
2. **Check the terminal** for server errors
3. **Verify API routes exist** in `app/api/auth/` directory
4. **Restart the development server**:
   ```bash
   npm run dev
   ```

### Issue 5: Login/Register forms not submitting

**Solutions**:
1. **Check browser console** for JavaScript errors
2. **Verify network requests** in browser DevTools → Network tab
3. **Check server logs** in the terminal
4. **Ensure all form fields are filled** correctly

## 🎯 Expected Behavior Checklist

### ✅ Registration
- [ ] Form validation works (required fields, password confirmation)
- [ ] Successfully creates user account
- [ ] Automatically logs in after registration
- [ ] Redirects to dashboard
- [ ] Shows error for duplicate email

### ✅ Login
- [ ] Form validation works
- [ ] Successfully authenticates with correct credentials
- [ ] Shows error for incorrect credentials
- [ ] Redirects to dashboard on success
- [ ] Sets authentication cookie

### ✅ Dashboard
- [ ] Shows personalized welcome message
- [ ] Displays user stats
- [ ] Shows quick action buttons
- [ ] Lists recent activity
- [ ] Only accessible when logged in

### ✅ Settings
- [ ] Shows current user information
- [ ] Allows profile updates
- [ ] Allows password changes
- [ ] Shows success/error messages
- [ ] Only accessible when logged in

### ✅ Navigation
- [ ] Header shows correct state (logged in/out)
- [ ] Protected routes redirect to login
- [ ] Logout clears session
- [ ] Navigation links work correctly

## 🚀 Advanced Testing

### Test with Multiple Users

1. **Create multiple accounts** with different emails
2. **Test role-based access** (admin vs editor)
3. **Test concurrent sessions** in different browser tabs

### Test Edge Cases

1. **Invalid email formats**
2. **Weak passwords** (less than 6 characters)
3. **Mismatched password confirmation**
4. **Empty form submissions**
5. **Network interruptions** during form submission

### Test Browser Compatibility

1. **Chrome/Chromium**
2. **Firefox**
3. **Safari**
4. **Mobile browsers** (iOS Safari, Chrome Mobile)

## 📊 Performance Testing

### Load Testing

1. **Multiple rapid registrations**
2. **Concurrent login attempts**
3. **Dashboard page load times**

### Security Testing

1. **Try accessing protected routes without authentication**
2. **Test with expired/invalid tokens**
3. **Verify HTTP-only cookies are set correctly**

## 🎉 Success Criteria

Your authentication system is working correctly if:

1. ✅ Users can register new accounts
2. ✅ Users can log in with their credentials
3. ✅ Protected routes are properly secured
4. ✅ User sessions persist across page refreshes
5. ✅ Users can update their profiles and passwords
6. ✅ Logout properly clears the session
7. ✅ The UI responds appropriately to authentication state
8. ✅ No console errors or server crashes occur

## 📞 Getting Help

If you encounter issues:

1. **Check the browser console** for JavaScript errors
2. **Check the terminal** for server errors
3. **Verify environment variables** are set correctly
4. **Ensure MongoDB is running** and accessible
5. **Restart the development server** if needed

The authentication system should work seamlessly once all components are properly set up and the database is initialized! 