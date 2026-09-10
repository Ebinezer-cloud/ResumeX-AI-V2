@echo off
setlocal
title ResumeX AI V2
cd /d "%~dp0"

echo.
echo ==================================================
echo                 RESUMEX AI V2
echo             RESUME INTELLIGENCE
echo ==================================================
echo.

set "PYTHON="
where py >nul 2>&1
if not errorlevel 1 set "PYTHON=py"
if not defined PYTHON (
  where python >nul 2>&1
  if not errorlevel 1 set "PYTHON=python"
)

if not defined PYTHON (
  echo ERROR: Python was not found.
  echo Install Python 3.10+ and enable PATH.
  pause
  exit /b 1
)

echo [OK] Python:
%PYTHON% --version

if not exist ".venv\Scripts\python.exe" (
  echo.
  echo Creating virtual environment...
  %PYTHON% -m venv .venv
  if errorlevel 1 goto fail
)

set "PY=.venv\Scripts\python.exe"

echo.
echo Installing dependencies...
%PY% -m pip install -q --upgrade pip
%PY% -m pip install -q -r backend\requirements.txt
if errorlevel 1 goto fail

echo.
echo Starting ResumeX AI V2...
start "ResumeX AI V2 Backend" cmd /k ""%CD%\.venv\Scripts\python.exe" "%CD%\backend\app.py""

echo Waiting for backend...
set /a n=0
:wait
timeout /t 1 /nobreak >nul
powershell -NoProfile -Command "try{$r=Invoke-WebRequest 'http://127.0.0.1:5000/api/health' -UseBasicParsing -TimeoutSec 1;if($r.StatusCode -eq 200){exit 0}else{exit 1}}catch{exit 1}"
if not errorlevel 1 goto ready
set /a n+=1
if %n% GEQ 25 goto fail
goto wait

:ready
echo.
echo ==================================================
echo             RESUMEX AI V2 IS READY
echo ==================================================
echo.
start "" "http://127.0.0.1:5000"
pause
exit /b 0

:fail
echo.
echo ERROR: ResumeX AI could not start.
echo Check the backend window for the exact error.
pause
exit /b 1
