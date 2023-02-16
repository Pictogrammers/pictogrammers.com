@echo off

set "CERT_STORE=.dev/certs"
set "KEY_FILE=./%CERT_STORE%/dev.pictogrammers-key.pem"
set "CERT_FILE=./%CERT_STORE%/dev.pictogrammers.pem"

IF NOT EXIST %KEY_FILE% IF NOT EXIST %CERT_FILE% (
  choco install mkcert
  mkcert -install
  mkdir "%CERT_STORE%"
  mkcert -key-file "%KEY_FILE%" -cert-file "%CERT_FILE%" dev.pictogrammers.com dev-api.pictogrammers.com localhost 127.0.0.1 ::1
)
