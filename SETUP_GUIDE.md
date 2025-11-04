# Analyzify360 - Local Development Setup Guide

## 🚀 Quick Start for Frontend (Next.js)

### Option 1: Using Command Prompt (CMD) - Recommended for Windows

1. **Open Command Prompt (CMD)** - not PowerShell
   - Press `Win + R`, type `cmd`, press Enter

2. **Navigate to the frontend directory:**
   ```cmd
   cd C:\Users\Administrator\Desktop\Analyzify360\frontend
   ```

3. **Install dependencies:**
   ```cmd
   npm install
   ```

4. **Create environment file (optional):**
   ```cmd
   copy env.example .env.local
   ```

5. **Start the development server:**
   ```cmd
   npm run dev
   ```

6. **Open your browser:**
   - Visit: http://localhost:3000

### Option 2: Fix PowerShell Execution Policy

If you prefer using PowerShell:

1. **Open PowerShell as Administrator:**
   - Right-click PowerShell → Run as Administrator

2. **Change execution policy:**
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

3. **Navigate and install:**
   ```powershell
   cd C:\Users\Administrator\Desktop\Analyzify360\frontend
   npm install
   ```

4. **Start the dev server:**
   ```powershell
   npm run dev
   ```

### Option 3: Use npm.cmd directly

If npm is installed but PowerShell is blocking it:

```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```

## 📋 Prerequisites

Make sure you have:
- ✅ **Node.js 18+** installed
  - Check: `node --version`
  - Download: https://nodejs.org/

- ✅ **npm** (comes with Node.js)
  - Check: `npm --version`

## 🛠️ Available Commands

Once setup is complete:

```bash
npm run dev      # Start development server (with Turbopack)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## ⚙️ Environment Variables (Optional)

The frontend can run without environment variables for basic development. However, if you need backend integration:

1. Copy the example file:
   ```cmd
   copy env.example .env.local
   ```

2. Edit `.env.local` with your settings (defaults work for frontend-only)

## 🎯 What You'll See

After running `npm run dev`, you should see:
- ✅ Server starting on http://localhost:3000
- ✅ Compilation successful
- ✅ Ready to view in browser

## 🔧 Troubleshooting

### Issue: "npm is not recognized"
**Solution:** 
- Reinstall Node.js from https://nodejs.org/
- Make sure to check "Add to PATH" during installation

### Issue: Port 3000 already in use
**Solution:**
```cmd
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

### Issue: Dependencies installation fails
**Solution:**
```cmd
npm cache clean --force
npm install
```

## 📝 Notes

- The frontend can run independently without the backend
- All static content and pages will work perfectly
- API-dependent features (like job applications) require the backend to be running

## 🎉 You're Ready!

Once the dev server starts, open http://localhost:3000 in your browser to see your Analyzify360 website!

