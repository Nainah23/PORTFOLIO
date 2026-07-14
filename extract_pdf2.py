import fitz

pdf_path = r'C:\Users\dell\Downloads\Ian_Kamau_CV (1) (1).pdf'
doc = fitz.open(pdf_path)
text = ""
for page in doc:
    text += page.get_text()

# Print first 3000 chars to get the beginning
print(text[:3000])
print("\n\n=== END OF FIRST PART ===\n\n")
doc.close()
