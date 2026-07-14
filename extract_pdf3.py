import fitz

pdf_path = r'C:\Users\dell\Downloads\My Resume (1).pdf'
doc = fitz.open(pdf_path)
text = ""
for page in doc:
    text += page.get_text()
print(text[:5000])
doc.close()
