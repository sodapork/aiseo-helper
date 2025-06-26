# User Data Management & Email Export Guide

## 📊 **Where Users Are Stored**

Your users are stored in **MongoDB** in the `aiseo-helper` database:

- **Database**: `aiseo-helper`
- **Collection**: `users`
- **Connection**: `mongodb://localhost:27017/aiseo-helper`

## 🚀 **How to Export User Data**

### **Method 1: Admin Dashboard (Recommended)**

1. **Login as an admin user**
2. **Navigate to**: `http://localhost:3000/admin/users`
3. **Use the export buttons**:
   - **Export JSON**: Complete user data in JSON format
   - **Export CSV**: User data in CSV format (email, name, role, created_at)
   - **Export Emails**: Plain text file with one email per line
   - **Export Editors**: CSV with only editor users

### **Method 2: Command Line Script**

```bash
# Export all user data to exports/ directory
npm run export-users
```

This creates multiple files:
- `users-[timestamp].json` - Complete user data
- `email-list-[timestamp].csv` - Email list with names and roles
- `emails-only-[timestamp].txt` - Just email addresses
- `users-detailed-[timestamp].csv` - Detailed user information
- `users-admin-[timestamp].csv` - Admin users only
- `users-editor-[timestamp].csv` - Editor users only

### **Method 3: Direct Database Access**

```bash
# Connect to MongoDB
mongosh "mongodb://localhost:27017/aiseo-helper"

# View all users
db.users.find({}, {email: 1, name: 1, role: 1, createdAt: 1})

# Export emails only
db.users.find({}, {email: 1}).forEach(function(user) { print(user.email) })

# Export to CSV format
db.users.find({}, {email: 1, name: 1, role: 1, createdAt: 1}).forEach(function(user) { 
  print('"' + user.email + '","' + user.name + '","' + user.role + '","' + user.createdAt + '"') 
})
```

### **Method 4: API Endpoints (For Developers)**

```bash
# Get all users as JSON (requires admin authentication)
curl -H "Cookie: payload-token=YOUR_TOKEN" \
  "http://localhost:3000/api/admin/export-users?format=json"

# Export as CSV
curl -H "Cookie: payload-token=YOUR_TOKEN" \
  "http://localhost:3000/api/admin/export-users?format=csv" \
  -o users.csv

# Export emails only
curl -H "Cookie: payload-token=YOUR_TOKEN" \
  "http://localhost:3000/api/admin/export-users?format=emails" \
  -o emails.txt

# Export only editor users
curl -H "Cookie: payload-token=YOUR_TOKEN" \
  "http://localhost:3000/api/admin/export-users?format=csv&role=editor" \
  -o editors.csv
```

## 📧 **Email List Formats**

### **CSV Format (Recommended for Email Marketing)**
```csv
email,name,role,created_at
"user@example.com","John Doe","editor","2024-06-26T17:06:25.851Z"
"admin@example.com","Admin User","admin","2024-06-26T17:06:25.851Z"
```

### **Plain Text (One email per line)**
```
user@example.com
admin@example.com
test@example.com
```

### **JSON Format (For developers)**
```json
{
  "users": [
    {
      "id": "685d7e115445ceb3c82f53b9",
      "email": "admin@aiseohelper.com",
      "name": "Admin User",
      "role": "admin",
      "createdAt": "2024-06-26T17:06:25.851Z",
      "updatedAt": "2024-06-26T17:06:25.851Z"
    }
  ],
  "total": 1,
  "exportedAt": "2024-06-26T17:30:00.000Z"
}
```

## 🔐 **Security & Access Control**

### **Admin Access Required**
- Only users with `role: 'admin'` can export user data
- All export endpoints require authentication
- API endpoints validate admin permissions

### **Data Protection**
- Passwords are never exported (hashed in database)
- Sensitive data is filtered out
- Export logs are maintained for audit purposes

## 📈 **User Statistics**

### **Current User Count**
```bash
# Check total users
mongosh "mongodb://localhost:27017/aiseo-helper" --eval "db.users.countDocuments()"

# Check users by role
mongosh "mongodb://localhost:27017/aiseo-helper" --eval "db.users.aggregate([{\$group: {_id: '\$role', count: {\$sum: 1}}}])"
```

### **User Growth Tracking**
```bash
# Users created in the last 30 days
mongosh "mongodb://localhost:27017/aiseo-helper" --eval "
db.users.countDocuments({
  createdAt: {
    \$gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  }
})
"
```

## 🛠 **Advanced Usage**

### **Filtering Users**
```bash
# Export only users created in the last 7 days
mongosh "mongodb://localhost:27017/aiseo-helper" --eval "
db.users.find({
  createdAt: {
    \$gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  }
}, {email: 1, name: 1, role: 1, createdAt: 1})
"
```

### **Bulk Operations**
```bash
# Update all editor users to a new role
mongosh "mongodb://localhost:27017/aiseo-helper" --eval "
db.users.updateMany(
  {role: 'editor'},
  {\$set: {role: 'premium'}}
)
"
```

### **Data Backup**
```bash
# Create a backup of the users collection
mongodump --db aiseo-helper --collection users --out ./backup

# Restore from backup
mongorestore --db aiseo-helper --collection users ./backup/aiseo-helper/users.bson
```

## 📊 **Integration with Email Marketing Tools**

### **Mailchimp**
1. Export emails as CSV
2. Import into Mailchimp audience
3. Use the CSV format with headers

### **ConvertKit**
1. Export emails as plain text
2. Import as subscribers
3. Tag based on user role

### **ActiveCampaign**
1. Export detailed CSV
2. Import with custom fields
3. Segment by role

## 🔄 **Automated Exports**

### **Scheduled Exports (Cron Job)**
```bash
# Add to crontab for daily export
0 9 * * * cd /path/to/your/project && npm run export-users
```

### **Webhook Integration**
```javascript
// Example webhook for new user registration
app.post('/webhook/new-user', async (req, res) => {
  const { email, name, role } = req.body
  
  // Send to your email marketing platform
  await sendToMailchimp(email, name, role)
  
  res.json({ success: true })
})
```

## 📞 **Support & Troubleshooting**

### **Common Issues**

1. **"No users found"**
   - Check if MongoDB is running
   - Verify database connection
   - Ensure users exist in the database

2. **"Admin access required"**
   - Login with an admin account
   - Check user role in database
   - Verify authentication token

3. **Export fails**
   - Check file permissions
   - Ensure exports directory exists
   - Verify disk space

### **Getting Help**
- Check the browser console for errors
- Review server logs in terminal
- Verify MongoDB connection
- Test with a simple user query first

## 🎯 **Best Practices**

1. **Regular Backups**: Export user data regularly
2. **Data Validation**: Verify export data before use
3. **Access Control**: Only give admin access to trusted users
4. **Audit Logs**: Keep track of who exports what and when
5. **Data Privacy**: Follow GDPR and privacy regulations
6. **Testing**: Test exports with small datasets first

Your user data management system is now fully operational! 🚀 