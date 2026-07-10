@echo off
title Shree Balaji TVS Dev Server
cd /d "%~dp0"
echo ===================================================
echo   Cleaning Next.js Cache & Starting Server...
echo ===================================================
echo.

:: Clear Next.js build cache to prevent Turbopack Manifest errors
if exist .next (
    echo Clearing .next build cache...
    rmdir /s /q .next
)

:: Try starting with pnpm first
call pnpm dev
if %ERRORLEVEL% neq 0 (
    echo.
    echo pnpm was not found or failed, trying npm...
    echo.
    call npm run dev
)

echo.
echo Server has stopped.
pause
