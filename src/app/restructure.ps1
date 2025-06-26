Write-Host "🔄 Restructuring your project..."

# Create necessary folders
New-Item -ItemType Directory -Force -Path src\components\layout
New-Item -ItemType Directory -Force -Path src\features\meterReadings\components
New-Item -ItemType Directory -Force -Path src\features\invoices\components
New-Item -ItemType Directory -Force -Path src\features\tenants
New-Item -ItemType Directory -Force -Path src\styles

# Move layout and components
Move-Item -Force src\app\clientLayout.tsx src\components\layout\
Move-Item -Force src\app\lcmapplication\protected\sidebar\sidebar.tsx src\components\layout\sidebar.tsx -ErrorAction SilentlyContinue
Move-Item -Force src\app\lcmapplication\protected\topbar\topbars.tsx src\components\layout\topbar.tsx -ErrorAction SilentlyContinue

# Move UI components
Move-Item -Force src\app\components\ui src\components\ -ErrorAction SilentlyContinue

# Move lib
Move-Item -Force src\app\lib\utils.ts src\lib\utils.ts -ErrorAction SilentlyContinue

# Move CSS
Move-Item -Force src\app\globals.css src\styles\ -ErrorAction SilentlyContinue

# Move meter readings
Move-Item -Force src\app\components\drawer\addMeterReadingDrawer.tsx src\features\meterReadings\components\add-meter-reading-drawer.tsx -ErrorAction SilentlyContinue
Move-Item -Force src\app\meter-readings\meter-readings.tsx src\app\meter-readings\page.tsx -ErrorAction SilentlyContinue

# Tenants
Move-Item -Force src\app\lcmapplication\forms\add-tenants\add-tenant.tsx src\features\tenants\create-tenant-form.tsx -ErrorAction SilentlyContinue

Write-Host "✅ Done organizing your files!"