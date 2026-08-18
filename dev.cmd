@echo off
title TP x STUDIO - Local Development Server
color 06

echo.
echo  ======================================================================
echo    TP x STUDIO -- LOCAL DEVELOPMENT ENGINE
echo    Website: https://tpxstudio.vercel.app/
echo  ======================================================================
echo.

:: Check if Node.js & npx are installed
where npx >nul 2>nul
if %errorlevel% neq 0 (
    echo  [!] Node.js/npx not detected. Checking Python...
    where python >nul 2>nul
    if %errorlevel% equ 0 (
        echo  [+] Launching via Python HTTP Server on port 3000...
        start http://localhost:3000
        python -m http.server 3000
        goto :EOF
    ) else (
        echo  [X] Neither Node.js nor Python found.
        echo      Please install Node.js (https://nodejs.org) to run the live dev server.
        pause
        exit /b 1
    )
)

echo  [*] Checking dependencies and starting Live Dev Server...
echo  [*] Port: 3000 | Auto-Reload: Enabled
echo.

:: Launch with browser-sync or live-server via npx
start http://localhost:3000
npx --yes browser-sync start --server --files "index.html, style.css, app.js" --port 3000 --no-notify

pause
