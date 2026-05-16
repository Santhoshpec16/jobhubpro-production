import fitz
import sys

doc = fitz.open("visily-multiscreens.pdf")
for i, page in enumerate(doc):
    pix = page.get_pixmap(dpi=150)
    pix.save(f"page_{i}.png")
