from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from io import BytesIO
import json
import os
from pathlib import Path
from urllib.parse import unquote

from bidi.algorithm import get_display
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle
import arabic_reshaper


ROOT = Path(__file__).resolve().parent
KURDISH_FONT_PATH = ROOT / "fonts" / "22_Sarchia_Baran.ttf"
ARABIC_FONT_PATH = ROOT / "fonts" / "NotoNaskhArabic-Regular.ttf"
ARABIC_BOLD_FONT_PATH = ROOT / "fonts" / "NotoNaskhArabic-Bold.ttf"
DEFAULT_FONT_NAME = "ReportFont"
DEFAULT_BOLD_FONT_NAME = "ReportFontBold"
LTR_FONT_NAME = "Helvetica"
LTR_BOLD_FONT_NAME = "Helvetica-Bold"


def shape_text(value, is_rtl=True):
    text = "" if value is None else str(value)
    if not text:
        return ""
    if not is_rtl:
        return text
    try:
        return get_display(arabic_reshaper.reshape(text))
    except Exception:
        return text


def cell(value, font_name=DEFAULT_FONT_NAME, alignment=2, is_rtl=True):
    text = shape_text(value, is_rtl)
    return Paragraph(text, ParagraphStyle(
        "cell",
        fontName=font_name,
        fontSize=7,
        leading=9,
        alignment=alignment,
    ))


def build_pdf(payload):
    lang = payload.get("lang") or "ckb"
    is_rtl = lang in ("ar", "ckb")
    alignment = 2 if is_rtl else 0
    title_alignment = 2
    table_align = "RIGHT" if is_rtl else "LEFT"
    if lang == "ar":
        font_path = ARABIC_FONT_PATH
        bold_font_path = ARABIC_BOLD_FONT_PATH
        font_name = DEFAULT_FONT_NAME
        bold_font_name = DEFAULT_BOLD_FONT_NAME
        pdfmetrics.registerFont(TTFont(font_name, str(font_path)))
        pdfmetrics.registerFont(TTFont(bold_font_name, str(bold_font_path)))
    elif lang == "ckb":
        font_path = ARABIC_FONT_PATH
        bold_font_path = ARABIC_BOLD_FONT_PATH
        font_name = DEFAULT_FONT_NAME
        bold_font_name = DEFAULT_BOLD_FONT_NAME
        pdfmetrics.registerFont(TTFont(font_name, str(font_path)))
        pdfmetrics.registerFont(TTFont(bold_font_name, str(bold_font_path)))
    else:
        font_name = LTR_FONT_NAME
        bold_font_name = LTR_BOLD_FONT_NAME

    title = payload.get("title") or "Cancer report"
    subtitle = payload.get("subtitle") or ""
    filters = payload.get("filters") or ""
    columns = payload.get("columns") or []
    rows = payload.get("rows") or []
    total_rows = int(payload.get("totalRows") or len(rows))
    summary = payload.get("summary") or []

    buffer = BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=landscape(A4),
        rightMargin=9 * mm,
        leftMargin=9 * mm,
        topMargin=9 * mm,
        bottomMargin=9 * mm,
        title=title,
    )

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        "title",
        parent=styles["Title"],
        fontName=bold_font_name,
        fontSize=18,
        leading=23,
        alignment=title_alignment,
        textColor=colors.HexColor("#113c39"),
    )
    note_style = ParagraphStyle(
        "note",
        parent=styles["Normal"],
        fontName=font_name,
        fontSize=10,
        leading=14,
        alignment=title_alignment,
        textColor=colors.HexColor("#496663"),
    )

    story = [
        Paragraph(shape_text(title, is_rtl), title_style),
        Paragraph(shape_text(subtitle, is_rtl), note_style),
        Spacer(1, 5 * mm),
    ]
    if filters:
        story.append(Paragraph(shape_text(filters, is_rtl), note_style))
        story.append(Spacer(1, 4 * mm))

    if summary:
        summary_table = Table([[cell(item.get("label", ""), font_name, alignment, is_rtl), cell(item.get("value", ""), font_name, alignment, is_rtl)] for item in summary], hAlign=table_align)
        summary_table.setStyle(TableStyle([
            ("FONTNAME", (0, 0), (-1, -1), font_name),
            ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#e9f5f3")),
            ("BOX", (0, 0), (-1, -1), 0.6, colors.HexColor("#c7ddda")),
            ("INNERGRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#d9e9e6")),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("ALIGN", (0, 0), (-1, -1), table_align),
            ("PADDING", (0, 0), (-1, -1), 6),
        ]))
        story.append(summary_table)
        story.append(Spacer(1, 5 * mm))

    max_cols = min(len(columns), 10)
    selected_columns = columns[:max_cols]
    selected_rows = rows[:1500]
    table_data = [[cell(label, bold_font_name, alignment, is_rtl) for label in selected_columns]]
    for row in selected_rows:
        table_data.append([cell(row[i] if i < len(row) else "", font_name, alignment, is_rtl) for i in range(max_cols)])

    if table_data:
        widths = [26 * mm] * max_cols
        if max_cols:
            widths[0] = 18 * mm
        data_table = Table(table_data, repeatRows=1, colWidths=widths, hAlign=table_align)
        data_table.setStyle(TableStyle([
            ("FONTNAME", (0, 0), (-1, -1), font_name),
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#0b7f78")),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("BACKGROUND", (0, 1), (-1, -1), colors.white),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f4faf9")]),
            ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#c7ddda")),
            ("INNERGRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#d9e9e6")),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("ALIGN", (0, 0), (-1, -1), table_align),
            ("PADDING", (0, 0), (-1, -1), 4),
        ]))
        story.append(data_table)

    if total_rows > len(selected_rows):
        story.append(PageBreak())
        story.append(Paragraph(shape_text(f"PDF contains the first {len(selected_rows)} filtered rows out of {total_rows} for performance.", is_rtl), note_style))

    doc.build(story)
    return buffer.getvalue()


class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_POST(self):
        if unquote(self.path).split("?", 1)[0] != "/api/pdf":
            self.send_error(404)
            return
        try:
            size = int(self.headers.get("Content-Length", "0"))
            payload = json.loads(self.rfile.read(size).decode("utf-8"))
            pdf = build_pdf(payload)
            self.send_response(200)
            self.send_header("Content-Type", "application/pdf")
            self.send_header("Content-Disposition", 'attachment; filename="cancer-report.pdf"')
            self.send_header("Content-Length", str(len(pdf)))
            self.end_headers()
            self.wfile.write(pdf)
        except Exception as exc:
            self.send_response(500)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(exc)}, ensure_ascii=False).encode("utf-8"))


if __name__ == "__main__":
    os.chdir(ROOT)
    server = ThreadingHTTPServer(("127.0.0.1", 8765), Handler)
    print("Cancer data report app running at http://127.0.0.1:8765/")
    server.serve_forever()
