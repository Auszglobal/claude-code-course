Write-Host "Installing Claude Code Skills..." -ForegroundColor Cyan
$skillsDir = "$env:USERPROFILE\.claude\skills"
if (-not (Test-Path $skillsDir)) {
    New-Item -ItemType Directory -Path $skillsDir -Force | Out-Null
    Write-Host "Created $skillsDir" -ForegroundColor Green
}
$skills = @("invoice-automation", "booking-agent", "email-reporter")
foreach ($skill in $skills) {
    $src = ".\skills-examples\$skill"
    $dst = "$skillsDir\$skill"
    if (Test-Path $src) {
        Copy-Item -Path $src -Destination $dst -Recurse -Force
        Write-Host "OK: $skill" -ForegroundColor Green
    } else {
        Write-Host "Skip: $skill not found" -ForegroundColor Yellow
    }
}
Write-Host "Done! Run: npx skills list" -ForegroundColor Green
