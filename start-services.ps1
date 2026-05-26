$rootDir = $PSScriptRoot
if ([string]::IsNullOrEmpty($rootDir)) {
    $rootDir = $pwd.Path
}

Write-Host "Waiting for Docker daemon to be ready..."
while ($true) {
    docker info > $null 2>&1
    if ($LASTEXITCODE -eq 0) {
        break
    }
    Start-Sleep -Seconds 2
}
Write-Host "Docker is ready. Starting infrastructure..."

docker compose up -d

Write-Host "Starting API Gateway..."
Start-Process powershell -WorkingDirectory "$rootDir\api-gateway" -ArgumentList "-NoExit", "-Command", "npm run start:dev"

Write-Host "Starting Microservices..."
Start-Process powershell -WorkingDirectory "$rootDir\microservices\auth-service" -ArgumentList "-NoExit", "-Command", "npm run start:dev"
Start-Process powershell -WorkingDirectory "$rootDir\microservices\crm-service" -ArgumentList "-NoExit", "-Command", "npm run start:dev"
Start-Process powershell -WorkingDirectory "$rootDir\microservices\erp-service" -ArgumentList "-NoExit", "-Command", "npm run start:dev"
Start-Process powershell -WorkingDirectory "$rootDir\microservices\scm-service" -ArgumentList "-NoExit", "-Command", "npm run start:dev"

Write-Host "Starting Frontend..."
Start-Process powershell -WorkingDirectory "$rootDir\frontend" -ArgumentList "-NoExit", "-Command", "npm run dev"

Write-Host "Starting Public Site..."
Start-Process powershell -WorkingDirectory "$rootDir\public-site" -ArgumentList "-NoExit", "-Command", "npm run dev"

Write-Host "All services have been launched in separate windows!"

