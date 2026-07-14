# Try to extract text from PDF using .NET
Add-Type -AssemblyName System.Drawing

$pdfPath = 'C:\Users\dell\Downloads\Ian_Kamau_CV (1) (1).pdf'

# Try using iTextSharp if available, otherwise use raw text extraction
$bytes = [System.IO.File]::ReadAllBytes($pdfPath)
$text = [System.Text.Encoding]::ASCII.GetString($bytes)

# Extract text between BT and ET markers (PDF text objects)
$matches = [System.Text.RegularExpressions.Regex]::Matches($text, '\(([^)]+)\)')
$extractedText = ""
foreach ($match in $matches) {
    $extractedText += $match.Groups[1].Value + " "
}

# Also try Tj and TJ operators
$matches2 = [System.Text.RegularExpressions.Regex]::Matches($text, '\[([^\]]+)\]\s*TJ')
foreach ($match in $matches2) {
    $inner = $match.Groups[1].Value
    $subMatches = [System.Text.RegularExpressions.Regex]::Matches($inner, '\(([^)]+)\)')
    foreach ($sm in $subMatches) {
        $extractedText += $sm.Groups[1].Value + " "
    }
}

Write-Output $extractedText.Substring(0, [Math]::Min(10000, $extractedText.Length))
