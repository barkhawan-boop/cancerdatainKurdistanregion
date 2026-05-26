# Kurdistan Cancer Data Report App

Open the app at:

`http://127.0.0.1:8765/`

If the local server is not running, start it from this folder:

`..\.venv\Scripts\python.exe server.py`

## Data

Source workbook:

`data/Cancer_2020_2025_Combined_Aligned.xlsx`

Browser data copy:

`data/cancer-data.js`

The app loads 58,863 recorded cancer case rows from the 2020-2025 workbook.

## Admin

Default login:

`Admin / Admin123`

Admin changes are saved in the current browser storage. Use **Export Edits** to save a JSON backup of added, updated, and deleted records.

## PDF and Print

Use **Download PDF** for a clean report export. The app opens the browser print dialog with a PDF-ready report layout; choose **Save as PDF**. This works after upload because the needed fonts are bundled in `fonts/`.

Use **Print** to print all currently filtered rows. Clear filters first to print all records.

## Official Source Panel

The global statistics panel links to WHO, IARC Global Cancer Observatory, WHO GHO, WHO EMRO Iraq, and the GLOBOCAN Iraq fact sheet. Use **Check sources** to verify that official links are reachable from the browser.
