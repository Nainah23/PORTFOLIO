import fitz
import sys

pdf_path = r'C:\Users\dell\Downloads\Ian_Kamau_CV (1) (1).pdf'
doc = fitz.open(pdf_path)
text = ""
for page in doc:
    text += page.get_text()
print(text)
doc.close()
