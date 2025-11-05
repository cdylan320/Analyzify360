# PowerShell Script to Fix Execution Policy
# Run this script as Administrator or run the command manually

Write-Host "Fixing PowerShell Execution Policy..." -ForegroundColor Yellow
Write-Host ""

# Set execution policy for current user (doesn't require admin)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force

Write-Host "✅ Execution policy updated successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "You can now use 'npm' commands normally." -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. cd frontend" -ForegroundColor White
Write-Host "  2. npm install" -ForegroundColor White
Write-Host "  3. npm run dev" -ForegroundColor White

