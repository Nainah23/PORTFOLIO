Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead('C:\Users\dell\Downloads\Ian Wainaina Kamau kamauwainaina29@gmail.docx')
$entry = $zip.Entries | Where-Object { $_.FullName -eq 'word/document.xml' }
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream)
$content = $reader.ReadToEnd()
$reader.Close()
$zip.Dispose()

# Replace paragraph endings with newlines
$content = $content -replace '</w:p>', "`n"
# Replace tabs
$content = $content -replace '</w:tab>', "`t"
# Replace breaks
$content = $content -replace '<w:br[^>]*/>', "`n"
# Strip all XML tags
$text = [System.Text.RegularExpressions.Regex]::Replace($content, '<[^>]+>', '')
# Clean up extra whitespace per line but keep newlines
$lines = $text -split "`n" | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne '' }
$result = $lines -join "`n"
Write-Output $result
