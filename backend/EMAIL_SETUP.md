# Email Setup Guide for Super2025 Backend

This guide will help you configure email notifications for job applications.

## 🎯 Overview

The backend sends two types of emails:
1. **Confirmation email** - Sent to job applicants
2. **Notification email** - Sent to HR team

## 📧 Gmail Setup (Recommended)

### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click on **Security** 
3. Enable **2-Step Verification**

### Step 2: Generate App Password
1. In Google Account Security settings (where you are now)
2. Look for **"2-Step Verification"** section and click on it
3. Scroll down in the 2-Step Verification page
👉 https://myaccount.google.com/apppasswords

4. Find and click on **"App passwords"** (it's usually at the bottom)
5. You might need to sign in again for security
6. **NEW INTERFACE**: Type `Super2025 Backend` in the "App name" field
7. Click **"Create"**
8. Copy the 16-character password (it looks like: `abcd efgh ijkl mnop`)

**Note**: Google simplified the interface - no more dropdown menus, just type the app name directly!

**Note**: If you don't see "App passwords", make sure 2-Step Verification is fully enabled first.

### Step 3: Update Configuration
Edit your `backend/config.env` file:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_16_character_app_password
FROM_EMAIL=your_email@gmail.com
HR_EMAIL=hr@yourcompany.com
```

## 🔧 Other Email Providers

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USERNAME=your_email@outlook.com
SMTP_PASSWORD=your_password
```

### Yahoo Mail
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USERNAME=your_email@yahoo.com
SMTP_PASSWORD=your_app_password
```

### Custom SMTP Server
```env
SMTP_HOST=mail.yourcompany.com
SMTP_PORT=587
SMTP_USERNAME=your_username
SMTP_PASSWORD=your_password
```

## ✅ Testing Email Configuration

### Method 1: Check Logs
Start the backend and look for these log messages:
```
INFO: Email service initialized successfully
```

If you see warnings about configuration, check your settings.

### Method 2: Submit Test Application
1. Start your backend server
2. Submit a job application through the frontend
3. Check your email for confirmation
4. Check HR email for notification

### Method 3: Direct API Test
```bash
curl -X POST http://localhost:8080/api/v1/applications \
  -F "fullName=Test User" \
  -F "email=test@example.com" \
  -F "phone=+1234567890" \
  -F "position=test-position" \
  -F "coverLetter=This is a test application." \
  -F "resume=@test_resume.pdf"
```

## 🚨 Troubleshooting

### Common Issues

#### 0. Can't Find App Passwords Option
**Problem**: "App passwords" is not visible in Google Account settings

**Solutions**:
- Make sure 2-Step Verification is **fully enabled** (not just started)
- Wait a few minutes after enabling 2-Step Verification
- Try signing out and back into your Google Account
- Go to: [Direct App Passwords Link](https://myaccount.google.com/apppasswords)
- If still not available, your account type might not support it (some business accounts)

#### 1. Authentication Errors
**Error**: `Failed to send email: authentication failed`

**Solutions**:
- Verify SMTP username and password
- For Gmail: Use App Password, not regular password
- Enable 2FA for Gmail if not already enabled

#### 2. Connection Errors
**Error**: `Failed to send email: dial tcp: connect timeout`

**Solutions**:
- Check SMTP host and port
- Verify firewall settings
- Try different port (465 for SSL, 587 for TLS)

#### 3. SSL/TLS Errors
**Error**: `Failed to send email: tls: handshake failure`

**Solutions**:
- Use port 587 for STARTTLS
- Use port 465 for SSL/TLS
- Check provider's SSL requirements

#### 4. Configuration Not Loaded
**Error**: `Email configuration invalid: SMTP_USERNAME is required`

**Solutions**:
- Verify `config.env` file exists in backend directory
- Check environment variable names match exactly
- Restart the backend server after changes

### Log Analysis

Enable debug logging by checking server logs:
```bash
# In backend directory
./start.sh
```

Look for these log patterns:
- ✅ `Email service initialized successfully` - Configuration is valid
- ⚠️ `Email configuration validation failed` - Check your config
- ❌ `Failed to send confirmation email` - SMTP issue
- ❌ `Failed to send notification email` - HR email issue

## 🔒 Security Best Practices

1. **Never commit credentials** to version control
2. **Use App Passwords** instead of main account passwords
3. **Limit email account permissions** to sending only
4. **Monitor email logs** for suspicious activity
5. **Use environment variables** for all sensitive data

## 📝 Email Templates

The system includes professional HTML email templates:

### Confirmation Email Features:
- Company branding
- Application details
- Next steps information
- Professional formatting

### HR Notification Features:
- Candidate information
- Resume download link
- Application metadata
- Quick action items

## 🎨 Customizing Email Templates

Email templates are in `backend/internal/infrastructure/email/email_service.go`:

- `generateHTMLTemplate()` - Candidate confirmation
- `generateHRNotificationTemplate()` - HR notification

## 📞 Support

If you continue to have issues:

1. Check backend logs for specific error messages
2. Verify all environment variables are set correctly
3. Test with a simple email provider like Gmail first
4. Ensure your email provider allows SMTP access

## ✨ Success Indicators

When working correctly, you should see:
- ✅ Candidates receive confirmation emails within seconds
- ✅ HR receives notification emails with resume links
- ✅ Clean server logs with successful email messages
- ✅ No authentication or connection errors 