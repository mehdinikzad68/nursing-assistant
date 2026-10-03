# check-encoding.ps1 — محافظ انکودینگ متن فارسی
# Trace: RULES.md E2 (متن‌های فارسی) · C5 (برچسب دادهٔ نمونه)
#
# چرا این اسکریپت لازم است؟
#   ویرایش فایل‌های UTF-8 با PowerShell 5.1 و دستورهای زیر، متن فارسی را
#   «دوبار-انکود» (mojibake) و خراب می‌کند:
#     ✗  Get-Content file -Raw          (بدون -Encoding → ANSI)
#     ✗  Set-Content file -Encoding UTF8  (بدون [System.IO.File]::WriteAllText)
#   راه درست:
#     ✓  [System.IO.File]::ReadAllText($p, [System.Text.UTF8Encoding]::new($false))
#     ✓  [System.IO.File]::WriteAllText($p, $t, [System.Text.UTF8Encoding]::new($false))
#   یا از ابزار ویرایشگر که UTF-8 را حفظ می‌کند استفاده کنید.
#
# اجرا:  powershell -NoProfile -File scripts\check-encoding.ps1
# خروج:  کد ۱ در صورت یافتن فایل خراب (قابل استفاده در CI)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$targets = @("app", "components", "lib", "data")

# الگوهای mojibake: بایت‌های UTF-8 که به‌عنوان Latin-1 خوانده شده‌اند
$patterns = @("Ø", "Ù", "Ã¢", "â€", "ðŸ")

$bad = @()
foreach ($dir in $targets) {
    $path = Join-Path $root $dir
    if (-not (Test-Path $path)) { continue }
    Get-ChildItem -Path $path -Recurse -File -Include *.tsx, *.ts, *.json, *.css, *.md |
        ForEach-Object {
            $text = [System.IO.File]::ReadAllText($_.FullName, [System.Text.UTF8Encoding]::new($false))
            foreach ($p in $patterns) {
                if ($text.Contains($p)) {
                    $bad += $_.FullName.Replace("$root\", "")
                    break
                }
            }
        }
}

if ($bad.Count -gt 0) {
    Write-Host "❌ متن خراب (mojibake) پیدا شد:" -ForegroundColor Red
    $bad | Sort-Object -Unique | ForEach-Object { Write-Host "   - $_" }
    Write-Host ""
    Write-Host "رفع: فایل را با UTF-8 معتبر بازنویسی کنید (نه با Set-Content پیش‌فرض)."
    exit 1
}

Write-Host "✅ انکودینگ همه فایل‌ها سالم است." -ForegroundColor Green
exit 0