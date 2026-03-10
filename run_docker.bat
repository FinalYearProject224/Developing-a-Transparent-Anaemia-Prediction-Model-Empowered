@echo off
echo ================================
echo Starting Anaemia Flask App
echo ================================

docker rm -f anaemia_container

docker run  -p 5000:5000 ^
-v "%cd%\uploads:/app/uploads" ^
-v "%cd%\signup.db:/app/signup.db" ^
--name anaemia_container ^
anaemia_app

echo Waiting for server to start...
timeout /t 5 /nobreak >nul

start http://localhost:5000

echo ================================
echo App is running at:
echo http://localhost:5000
echo ================================
pause
