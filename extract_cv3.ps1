Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead('C:\Users\dell\OneDrive\Ian Wainaina Kamau kamauwainaina29@gmail.docx')
$entry = $zip.Entries | Where-Object { $_.FullName -eq 'word/document.xml' }
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream)
$content = $reader.ReadToEnd()
$reader.Close()
$zip.Dispose()
$content = $content -replace '</w:p>', "`n"
$content = $content -replace '<w:br[^>]*/>', "`n"
$text = [System.Text.RegularExpressions.Regex]::Replace($content, '<[^>]+>', '')
$lines = $text -split "`n" | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne '' }
$result = $lines -join "`n"
Write-Output $result
