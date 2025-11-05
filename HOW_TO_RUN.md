# 🚀 How to Run Analyzify360 Project

## 📋 Prerequisites

Make sure you have:
- ✅ **Node.js 18 or higher** installed
  - Check: Open terminal and type `node --version`
  - Download from: https://nodejs.org/ if not installed
- ✅ **npm** (comes with Node.js automatically)

---

## 🎯 Step-by-Step Instructions

### **Option 1: Using Command Prompt (Easiest - No PowerShell Issues)**

#### Step 1: Open Command Prompt
- Press `Windows Key + R`
- Type `cmd` and press Enter

#### Step 2: Navigate to Frontend Directory
```cmd
cd C:\Users\Administrator\Desktop\Analyzify360\frontend
```

#### Step 3: Install Dependencies
```cmd
npm install
```
⏱️ This will take 2-5 minutes to download all packages.

#### Step 4: Start Development Server
```cmd
npm run dev
```

#### Step 5: Open in Browser
- Wait for the message: "✓ Ready on http://localhost:3000"
- Open your browser and visit: **http://localhost:3000**

✅ **You're done!** The website is now running locally.

---

### **Option 2: Using PowerShell (After Fixing Execution Policy)**

#### Step 1: Fix PowerShell Execution Policy
Open PowerShell and run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Type `Y` and press Enter when prompted.

#### Step 2: Navigate to Frontend
```powershell
cd C:\Users\Administrator\Desktop\Analyzify360\frontend
```

#### Step 3: Install Dependencies
```powershell
npm install
```

#### Step 4: Start Development Server
```powershell
npm run dev
```

#### Step 5: Open in Browser
Visit: **http://localhost:3000**

---

### **Option 3: Using PowerShell with npm.cmd (Quick Workaround)**

If you don't want to fix execution policy, use `npm.cmd`:

```powershell
cd C:\Users\Administrator\Desktop\Analyzify360\frontend
npm.cmd install
npm.cmd run dev
```

---

## 📝 What You Should See

### When `npm install` completes:
```
added 1234 packages in 2m
```

### When `npm run dev` starts:
```
▲ Next.js 15.3.5
- Local:        http://localhost:3000
- Ready in 2.3s
```

### In Your Browser:
You'll see the **Analyzify360** homepage with:
- Hero section
- Services
- Feature cards
- Project showcase
- Future focus section

---

## 🛠️ Available Commands

Once you're in the `frontend` directory:

```bash
npm run dev      # Start development server (with hot reload)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Check code for errors
```

---

## ⚠️ Troubleshooting

### Problem: "npm is not recognized"
**Solution:** 
- Install Node.js from https://nodejs.org/
- Make sure to restart your terminal after installation

### Problem: "Port 3000 is already in use"
**Solution:**
1. Find what's using port 3000:
   ```cmd
   netstat -ano | findstr :3000
   ```
2. Kill the process (replace PID with the number you see):
   ```cmd
   taskkill /PID <PID_NUMBER> /F
   ```
3. Or use a different port:
   ```cmd
   set PORT=3001 && npm run dev
   ```

### Problem: "npm install" fails or times out
**Solution:**
```cmd
npm cache clean --force
npm install
```

### Problem: PowerShell execution policy error
**Solutions:**
- Use Command Prompt (Option 1) instead
- Or run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
- Or use `npm.cmd` instead of `npm`

### Problem: Dependencies installation is very slow
**Solution:**
- This is normal on first install (can take 2-5 minutes)
- Make sure you have a stable internet connection
- Be patient, it's downloading many packages

---

## 📂 Project Structure

```
Analyzify360/
├── frontend/          ← You'll work here
│   ├── src/          ← Source code
│   ├── public/       ← Images and assets
│   └── package.json  ← Dependencies
└── backend/          ← Backend (optional for frontend)
```

---

## 🎉 Success Checklist

- [ ] Node.js is installed (`node --version` works)
- [ ] Navigated to `frontend` directory
- [ ] Ran `npm install` successfully
- [ ] Ran `npm run dev` successfully
- [ ] Browser opens to http://localhost:3000
- [ ] Website loads without errors

---

## 💡 Tips

- **Keep the terminal open** while the dev server is running
- **Press `Ctrl + C`** in the terminal to stop the server
- The website will **auto-reload** when you make code changes
- **Don't close** the terminal window while developing

---

## 🆘 Still Having Issues?

1. Make sure you're in the correct directory: `frontend/`
2. Try deleting `node_modules` folder and `package-lock.json`, then run `npm install` again
3. Check Node.js version: `node --version` (should be 18+)
4. Try using Command Prompt instead of PowerShell

---

**Need Help?** Check the terminal output for specific error messages and search for them online.


