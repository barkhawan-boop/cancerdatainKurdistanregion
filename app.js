const DATA = window.CANCER_DATA;
const COLUMNS = DATA.columns;
const ROWS = DATA.rows;
const columnIndex = Object.fromEntries(COLUMNS.map((name, index) => [name, index]));
const col = (...names) => names.map(name => columnIndex[name]).find(index => index !== undefined);

const FIELD = {
  id: col("IDAll"),
  governorate: col("Governorate"),
  year: col("Year of diagnosis"),
  basis: col("Basis of diagnosis"),
  specificSite: col("Specific Site"),
  site: col("Topography type (anatomical site category)"),
  morphology: col("Morphology code (histology code)"),
  behavior: col("Behavior Description", "Behavior code of tumor"),
  extent: col("Extent of disease (tumor extension)", "Extent of disease (umor extension)"),
  laterality: col("Laterality Description", "Laterality of primary site"),
  tStage: col("T (Tumor)", "T"),
  nStage: col("N (Nodes)", "N"),
  mStage: col("M (Metastasis)", "M"),
  surgical: col("Surgical treatment"),
  chemo: col("Chemotherapy"),
  radio: col("Radiotherapy"),
  hormonal: col("Hormonal therapy"),
  targeted: col("Targeted therapy"),
  family: col("Family history of cancer"),
  sex: col("SEX"),
  age: col("Age at diagnosis"),
  ageGroup: col("Age Groups"),
  nationality: col("Nationality"),
  address1: col("Related Address 1"),
  address2: col("Related Address 2"),
  address3: col("Related Address 3"),
  addressGroup: col("Related Address 3", "Related Address 2"),
  occupation: col("Occupation"),
  grade: col("Grade")
};

const ADMIN_SECTIONS = [
  {
    titleKey: "basicCaseInfo",
    fields: [
      FIELD.id,
      FIELD.year,
      FIELD.governorate,
      FIELD.sex,
      FIELD.age,
      FIELD.ageGroup,
      FIELD.nationality
    ]
  },
  {
    titleKey: "tumorClassification",
    fields: [
      FIELD.site,
      FIELD.specificSite,
      columnIndex["Topography code (primary tumor site)"],
      columnIndex["Secondary (grouped topography code)"],
      FIELD.morphology,
      FIELD.behavior,
      FIELD.basis
    ]
  },
  {
    titleKey: "stageDisease",
    fields: [
      FIELD.extent,
      FIELD.laterality,
      FIELD.tStage,
      FIELD.nStage,
      FIELD.mStage,
      FIELD.family
    ]
  },
  {
    titleKey: "treatmentInfo",
    fields: [
      FIELD.surgical,
      FIELD.chemo,
      FIELD.radio,
      FIELD.hormonal,
      columnIndex["Radioisotope therap"],
      FIELD.targeted
    ]
  },
  {
    titleKey: "addressInfo",
    fields: [
      columnIndex["Address (residence)"],
      FIELD.address1,
      FIELD.address2,
      FIELD.address3
    ]
  }
];

const DROPDOWN_FIELDS = new Set([
  FIELD.year,
  FIELD.governorate,
  FIELD.sex,
  FIELD.ageGroup,
  FIELD.site,
  FIELD.basis,
  FIELD.behavior,
  FIELD.extent,
  FIELD.laterality,
  FIELD.tStage,
  FIELD.nStage,
  FIELD.mStage,
  FIELD.surgical,
  FIELD.chemo,
  FIELD.radio,
  FIELD.hormonal,
  columnIndex["Radioisotope therap"],
  FIELD.targeted,
  FIELD.family,
  FIELD.nationality,
  FIELD.address2,
  FIELD.address3
]);

const KURDISH_COLUMNS = {
  IDAll: "ناسنامە",
  Governorate: "پارێزگا",
  "Year of diagnosis": "ساڵی دەستنیشانکردن",
  "Basis of diagnosis": "بنەمای دەستنیشانکردن",
  "Specific Site": "شوێنی ورد",
  "Topography code (primary tumor site)": "کۆدی شوێنی سەرەکی توومەر",
  "Secondary (grouped topography code)": "کۆدی گروپی شوێن",
  "Topography type (anatomical site category)": "جۆری شوێنی شێرپەنجە",
  "Morphology code (histology code)": "کۆدی مۆرفۆلۆجی",
  "Behavior code of tumor": "کۆدی ڕەفتاری توومەر",
  "Behavior Description": "وەسفی ڕەفتاری توومەر",
  "Extent of disease (umor extension)": "ئاستی پەرەسەندنی نەخۆشی",
  "Extent of disease (tumor extension)": "ئاستی پەرەسەندنی نەخۆشی",
  "Laterality of primary site": "لایەنی شوێنی سەرەکی",
  "Laterality Description": "وەسفی لایەنی شوێن",
  T: "T",
  N: "N",
  M: "M",
  "T (Tumor)": "T (توومەر)",
  "N (Nodes)": "N (گرێ لیمفاوی)",
  "M (Metastasis)": "M (بڵاوبوونەوە)",
  "Surgical treatment": "چارەسەری نەشتەرگەری",
  Chemotherapy: "کیمیاوی",
  Radiotherapy: "تیشک",
  "Hormonal therapy": "هۆرمۆنی",
  "Radioisotope therap": "ڕادیۆئایزۆتۆپ",
  "Targeted therapy": "چارەسەری ئامانجدار",
  "Family history of cancer": "مێژووی خێزانی شێرپەنجە",
  SEX: "ڕەگەز",
  "Age at diagnosis": "تەمەن لەکاتی دەستنیشانکردن",
  "Age Groups": "گروپی تەمەن",
  Nationality: "نەتەوە",
  "Address (residence)": "کۆدی نیشتەجێبوون",
  "Related Address 1": "ناونیشانی پەیوەندیدار ١",
  "Related Address 2": "ناونیشانی پەیوەندیدار ٢",
  "Related Address 3": "ناونیشانی پەیوەندیدار ٣",
  Occupation: "پیشە",
  Grade: "پلە"
};

const KURDISH_VALUES = {
  "#N/A": "نادیار",
  "N/A": "نادیار",
  UNKNOWN: "نادیار",
  YES: "بەڵێ",
  NO: "نەخێر",
  IRAQI: "عێراقی",
  OTHER: "هی تر",
  MALE: "نێر",
  FEMALE: "مێ",
  ERBIL: "هەولێر",
  DUHOK: "دهۆک",
  SULAIMANI: "سلێمانی",
  "AL SULAIMANYIA": "سلێمانی",
  BAGHDAD: "بەغدا",
  BASRAH: "بەسرە",
  NINEVHA: "نەینەوا",
  KARBALLA: "کەربەلا",
  BREAST: "مەمک",
  LUNG: "سییەکان",
  BLOOD: "خوێن",
  COLORECTAL: "کۆڵۆن و ڕێکتەم",
  KIDNEY: "گورچیلە",
  PROSTATE: "پرۆستات",
  SKIN: "پێست",
  BRAIN: "مێشک",
  BLADDER: "میزدان",
  STOMACH: "گەدە",
  LIVER: "جگە",
  OVARY: "هێلکەدان",
  PANCREAS: "پانکریاس",
  LYMPHOMA: "لیمفۆما",
  LEUKEMIA: "لۆکیمیا",
  "LYMPH NODES": "گرێی لیمفاوی",
  THYROID: "غودەی دەرەقی",
  UTERUS: "منداڵدان",
  CERVIX: "ملی منداڵدان",
  BONE: "ئێسک",
  EYE: "چاو",
  "EAR/NOSE": "گوێ/لووت",
  ESOPHAGUS: "سورێنچک",
  GASTROINTESTINAL: "کۆئەندامی هەرس",
  "GLANDS - OTHER": "غودەکانی تر",
  HEART: "دڵ",
  MOUTH: "دەم",
  NERVES: "دەمارەکان",
  NOS: "دیارینەکراو",
  PENIS: "ئەندامی نێرینە",
  PERITONEUM: "پەردەی ناوسک",
  PLACENTA: "جێرە",
  TESTIS: "گوێزە",
  "ADRENAL GLAND": "غودەی سەرگورچیلە",
  "MALIGNANT, PRIMARY SITE": "خراپە، شوێنی سەرەکی",
  "UNCERTAIN WHETHER BENIGN OR MALIGNANT (BORDERLINE)": "دڵنیانییە باشخۆ یان خراپە (سنوردار)",
  BENIGN: "باشخۆ",
  "CARCINOMA IN SITU (NON-INVASIVE)": "کارسینۆما لە شوێنی خۆیدا (ناچوونەناو)",
  "UNKNOWN CODE (7)": "کۆدی نادیار (٧)",
  "UNKNOWN CODE (5)": "کۆدی نادیار (٥)",
  LOCALIZED: "سنووردار",
  "DISTANT METASTASIS": "بڵاوبوونەوەی دوور",
  "UNKNOWN/UNSPECIFIED": "نادیار/دیارینەکراو",
  "BENIGN/BORDERLINE": "باشخۆ/سنوردار",
  "REGIONAL LYMPH NODES ONLY": "تەنها گرێی لیمفاوی ناوچەیی",
  "REGIONAL BY DIRECT EXTENSION ONLY": "ناوچەیی بە پەرەسەندنی ڕاستەوخۆ",
  "REGIONAL BY BOTH DIRECT EXTENSION AND LYMPH NODES": "ناوچەیی بە پەرەسەندنی ڕاستەوخۆ و گرێی لیمفاوی",
  "REGIONAL, NOS": "ناوچەیی، دیارینەکراو",
  "DATA ERROR/OTHER": "هەڵەی داتا/هی تر",
  "IN SITU": "لە شوێنی خۆیدا",
  "NOT DOCUMENTED/MISSING": "تۆمارنەکراو/ون",
  "UNKNOWN/NOT STATED": "نادیار/نەوتراو",
  RIGHT: "ڕاست",
  LEFT: "چەپ",
  "NOT A PAIRED ORGAN": "ئەندامی جووت نییە",
  BILATERAL: "هەردوو لایەن",
  "INVALID CODE": "کۆدی نادروست",
  "TX: CANNOT BE ASSESSED": "TX: ناتوانرێت هەڵبسەنگێنرێت",
  "NX: CANNOT BE ASSESSED": "NX: ناتوانرێت هەڵبسەنگێنرێت",
  "MX: CANNOT BE ASSESSED": "MX: ناتوانرێت هەڵبسەنگێنرێت",
  "NO EVIDENCE OF PRIMARY TUMOR": "هیچ بەڵگەیەک بۆ توومەری سەرەکی نییە",
  "T1: TUMOR SIZE/EXTENT 1": "T1: قەبارە/پەرەسەندنی توومەر ١",
  "T2: TUMOR SIZE/EXTENT 2": "T2: قەبارە/پەرەسەندنی توومەر ٢",
  "T3: TUMOR SIZE/EXTENT 3": "T3: قەبارە/پەرەسەندنی توومەر ٣",
  "T4: TUMOR SIZE/EXTENT 4": "T4: قەبارە/پەرەسەندنی توومەر ٤",
  "N0: NO REGIONAL LYMPH NODE METASTASIS": "N0: هیچ بڵاوبوونەوەیەک بۆ گرێی لیمفاوی ناوچەیی نییە",
  "N1: REGIONAL LYMPH NODE INVOLVEMENT 1": "N1: بەشداری گرێی لیمفاوی ناوچەیی ١",
  "N2: REGIONAL LYMPH NODE INVOLVEMENT 2": "N2: بەشداری گرێی لیمفاوی ناوچەیی ٢",
  "N3: REGIONAL LYMPH NODE INVOLVEMENT 3": "N3: بەشداری گرێی لیمفاوی ناوچەیی ٣",
  "N4: REGIONAL LYMPH NODE INVOLVEMENT 4": "N4: بەشداری گرێی لیمفاوی ناوچەیی ٤",
  "M0: NO DISTANT METASTASIS": "M0: بڵاوبوونەوەی دوور نییە",
  "M1: DISTANT METASTASIS": "M1: بڵاوبوونەوەی دوور",
  "M3: DISTANT METASTASIS": "M3: بڵاوبوونەوەی دوور",
  "NOT DOCUMENTED": "تۆمارنەکراو"
};

const ARABIC_COLUMNS = {
  IDAll: "المعرف",
  Governorate: "المحافظة",
  "Year of diagnosis": "سنة التشخيص",
  "Basis of diagnosis": "أساس التشخيص",
  "Specific Site": "الموقع المحدد",
  "Topography code (primary tumor site)": "رمز موقع الورم الأساسي",
  "Secondary (grouped topography code)": "رمز مجموعة الموقع",
  "Topography type (anatomical site category)": "نوع موقع السرطان",
  "Morphology code (histology code)": "رمز النسيج",
  "Behavior code of tumor": "رمز سلوك الورم",
  "Behavior Description": "وصف سلوك الورم",
  "Extent of disease (umor extension)": "مدى انتشار المرض",
  "Extent of disease (tumor extension)": "مدى انتشار المرض",
  "Laterality of primary site": "جانب الموقع الأساسي",
  "Laterality Description": "وصف جانب الموقع",
  T: "T",
  N: "N",
  M: "M",
  "T (Tumor)": "T (الورم)",
  "N (Nodes)": "N (العقد اللمفاوية)",
  "M (Metastasis)": "M (الانتقال)",
  "Surgical treatment": "العلاج الجراحي",
  Chemotherapy: "العلاج الكيميائي",
  Radiotherapy: "العلاج الإشعاعي",
  "Hormonal therapy": "العلاج الهرموني",
  "Radioisotope therap": "العلاج بالنظائر المشعة",
  "Targeted therapy": "العلاج الموجه",
  "Family history of cancer": "تاريخ عائلي للسرطان",
  SEX: "الجنس",
  "Age at diagnosis": "العمر عند التشخيص",
  "Age Groups": "الفئة العمرية",
  Nationality: "الجنسية",
  "Address (residence)": "رمز السكن",
  "Related Address 1": "العنوان المرتبط 1",
  "Related Address 2": "العنوان المرتبط 2",
  "Related Address 3": "العنوان المرتبط 3",
  Occupation: "المهنة",
  Grade: "الدرجة"
};

const ARABIC_VALUES = {
  "#N/A": "غير معروف",
  "N/A": "غير معروف",
  UNKNOWN: "غير معروف",
  YES: "نعم",
  NO: "لا",
  IRAQI: "عراقي",
  OTHER: "أخرى",
  MALE: "ذكر",
  FEMALE: "أنثى",
  ERBIL: "أربيل",
  DUHOK: "دهوك",
  SULAIMANI: "السليمانية",
  "AL SULAIMANYIA": "السليمانية",
  BAGHDAD: "بغداد",
  BASRAH: "البصرة",
  NINEVHA: "نينوى",
  KARBALLA: "كربلاء",
  BREAST: "الثدي",
  LUNG: "الرئة",
  BLOOD: "الدم",
  COLORECTAL: "القولون والمستقيم",
  KIDNEY: "الكلى",
  PROSTATE: "البروستات",
  SKIN: "الجلد",
  BRAIN: "الدماغ",
  BLADDER: "المثانة",
  STOMACH: "المعدة",
  LIVER: "الكبد",
  OVARY: "المبيض",
  PANCREAS: "البنكرياس",
  LYMPHOMA: "اللمفوما",
  LEUKEMIA: "اللوكيميا",
  "LYMPH NODES": "العقد اللمفاوية",
  THYROID: "الغدة الدرقية",
  UTERUS: "الرحم",
  CERVIX: "عنق الرحم",
  BONE: "العظام",
  EYE: "العين",
  "EAR/NOSE": "الأذن/الأنف",
  ESOPHAGUS: "المريء",
  GASTROINTESTINAL: "الجهاز الهضمي",
  "GLANDS - OTHER": "غدد أخرى",
  HEART: "القلب",
  MOUTH: "الفم",
  NERVES: "الأعصاب",
  NOS: "غير محدد",
  PENIS: "القضيب",
  PERITONEUM: "الصفاق",
  PLACENTA: "المشيمة",
  TESTIS: "الخصية",
  "ADRENAL GLAND": "الغدة الكظرية",
  "MALIGNANT, PRIMARY SITE": "خبيث، موقع أولي",
  "UNCERTAIN WHETHER BENIGN OR MALIGNANT (BORDERLINE)": "غير مؤكد حميد أو خبيث (حدي)",
  BENIGN: "حميد",
  "CARCINOMA IN SITU (NON-INVASIVE)": "سرطان موضعي (غير غازي)",
  "UNKNOWN CODE (7)": "رمز غير معروف (7)",
  "UNKNOWN CODE (5)": "رمز غير معروف (5)",
  LOCALIZED: "موضعي",
  "DISTANT METASTASIS": "انتقال بعيد",
  "UNKNOWN/UNSPECIFIED": "غير معروف/غير محدد",
  "BENIGN/BORDERLINE": "حميد/حدي",
  "REGIONAL LYMPH NODES ONLY": "العقد اللمفاوية الإقليمية فقط",
  "REGIONAL BY DIRECT EXTENSION ONLY": "إقليمي بالامتداد المباشر فقط",
  "REGIONAL BY BOTH DIRECT EXTENSION AND LYMPH NODES": "إقليمي بالامتداد المباشر والعقد اللمفاوية",
  "REGIONAL, NOS": "إقليمي، غير محدد",
  "DATA ERROR/OTHER": "خطأ بيانات/أخرى",
  "IN SITU": "موضعي",
  "NOT DOCUMENTED/MISSING": "غير موثق/مفقود",
  "UNKNOWN/NOT STATED": "غير معروف/غير مذكور",
  RIGHT: "يمين",
  LEFT: "يسار",
  "NOT A PAIRED ORGAN": "ليس عضوا مزدوجا",
  BILATERAL: "ثنائي الجانب",
  "INVALID CODE": "رمز غير صحيح",
  "TX: CANNOT BE ASSESSED": "TX: لا يمكن تقييمه",
  "NX: CANNOT BE ASSESSED": "NX: لا يمكن تقييمه",
  "MX: CANNOT BE ASSESSED": "MX: لا يمكن تقييمه",
  "NO EVIDENCE OF PRIMARY TUMOR": "لا دليل على ورم أولي",
  "T1: TUMOR SIZE/EXTENT 1": "T1: حجم/امتداد الورم 1",
  "T2: TUMOR SIZE/EXTENT 2": "T2: حجم/امتداد الورم 2",
  "T3: TUMOR SIZE/EXTENT 3": "T3: حجم/امتداد الورم 3",
  "T4: TUMOR SIZE/EXTENT 4": "T4: حجم/امتداد الورم 4",
  "N0: NO REGIONAL LYMPH NODE METASTASIS": "N0: لا انتقال إلى العقد اللمفاوية الإقليمية",
  "N1: REGIONAL LYMPH NODE INVOLVEMENT 1": "N1: إصابة العقد اللمفاوية الإقليمية 1",
  "N2: REGIONAL LYMPH NODE INVOLVEMENT 2": "N2: إصابة العقد اللمفاوية الإقليمية 2",
  "N3: REGIONAL LYMPH NODE INVOLVEMENT 3": "N3: إصابة العقد اللمفاوية الإقليمية 3",
  "N4: REGIONAL LYMPH NODE INVOLVEMENT 4": "N4: إصابة العقد اللمفاوية الإقليمية 4",
  "M0: NO DISTANT METASTASIS": "M0: لا انتقال بعيد",
  "M1: DISTANT METASTASIS": "M1: انتقال بعيد",
  "M3: DISTANT METASTASIS": "M3: انتقال بعيد",
  "NOT DOCUMENTED": "غير موثق"
};

const ADMIN_USER = "Admin";
const ADMIN_PASS = "Admin123";
const PAGE_SIZE = 50;
const STORAGE_KEY = "krgCancerDataEdits.v1";

let lang = localStorage.getItem("krgCancerLang") || "en";
let page = 1;
let filteredRows = [];
let selectedId = null;
let isAdmin = false;
let edits = loadEdits();
let allRows = buildRows();

const i18n = {
  en: {
    region: "Kurdistan Region - Iraq", appTitle: "Recorded Cancer Case Statistics", dashboard: "Dashboard", cases: "Cases",
    globalStats: "Global Stats", prevention: "Prevention", admin: "Admin", filters: "Filters", reset: "Reset",
    search: "Search", searchNow: "Search", searchPlaceholder: "ID, address, morphology...", year: "Year", governorate: "Governorate",
    sex: "Sex", ageGroup: "Age Group", cancerSite: "Cancer Site", address: "Address Group",
    reportTitle: "Recorded cancer case statistics in the Kurdistan Region - Iraq, 2020-2025", downloadPdf: "Download PDF", print: "Print", exportCsv: "Export CSV",
    casesByYear: "Cases by Year", topCancerSites: "Top Cancer Sites", byGovernorate: "By Governorate",
    byAge: "By Age Group", allData: "All Filtered Data", prev: "Previous", next: "Next",
    refreshSources: "Check sources", officialSources: "Official Sources", preventionTitle: "How to reduce cancer risk",
    iraqReasons: "Main cancer risk drivers in Iraq", adminLogin: "Admin Login", username: "Username", password: "Password",
    login: "Login", localAdminNote: "Admin credentials are private. Changes are saved in this browser.",
    manageCases: "Manage cases", newCase: "New Case", saveEdits: "Export Edits", logout: "Logout", saveCase: "Save Case",
    deleteCase: "Delete Case", clearForm: "Clear", adminHint: "Select any row in the Cases table to edit it here.",
    totalCases: "Filtered cases", topSite: "Top site", averageAge: "Average age", femaleMale: "Female / Male",
    all: "All", page: "Page", of: "of", rows: "rows", noData: "No matching records", lastChecked: "Last checked",
    pdfLimit: "PDF includes summary and first rows for performance. Use Print for complete filtered rows.",
    sourceChecked: "Official links checked from this browser. Live figures should be confirmed from the source pages.",
    sourceBlocked: "The browser could not check all sources automatically; source links remain available below.",
    basicCaseInfo: "Basic case info", tumorClassification: "Tumor classification", stageDisease: "Stage and disease",
    treatmentInfo: "Treatment", addressInfo: "Residence and address", selectValue: "Select", otherDetails: "Other details"
  },
  ckb: {
    region: "هەرێمی کوردستان - عێراق", appTitle: "ئاماری کەیسە تۆمارکراوەکانی شێرپەنجە", dashboard: "داشبۆرد", cases: "کەیسەکان",
    globalStats: "ئاماری جیهانی", prevention: "خۆپاراستن", admin: "ئەدمین", filters: "فلتەرەکان", reset: "سڕینەوە",
    search: "گەڕان", searchNow: "گەڕان", searchPlaceholder: "ئایدی، ناونیشان، مۆرفۆلۆجی...", year: "ساڵ", governorate: "پارێزگا",
    sex: "ڕەگەز", ageGroup: "گروپی تەمەن", cancerSite: "شوێنی شێرپەنجە", address: "گروپی ناونیشان",
    reportTitle: "ئاماری کەیسە تۆمارکراوەکانی شێرپەنجە لە هەرێمی کوردستان - عێراق، ٢٠٢٠-٢٠٢٥", downloadPdf: "داگرتنی PDF", print: "چاپکردن",
    exportCsv: "هەناردەی CSV", casesByYear: "کەیس بەپێی ساڵ", topCancerSites: "زۆرترین جۆرەکان",
    byGovernorate: "بەپێی پارێزگا", byAge: "بەپێی تەمەن", allData: "هەموو داتای فلتەرکراو",
    prev: "پێشوو", next: "دواتر", refreshSources: "پشکنینی سەرچاوەکان", officialSources: "سەرچاوە فەرمییەکان",
    preventionTitle: "چۆن مەترسی شێرپەنجە کەم بکەیتەوە", iraqReasons: "هۆکارە سەرەکییەکانی مەترسی لە عێراق",
    adminLogin: "چوونەژوورەوەی ئەدمین", username: "ناوی بەکارهێنەر", password: "وشەی نهێنی", login: "چوونەژوورەوە",
    localAdminNote: "زانیاری چوونەژوورەوەی ئەدمین نهێنییە. گۆڕانکارییەکان لەم وێبگەڕەدا دەپارێزرێن.",
    manageCases: "بەڕێوەبردنی کەیسەکان", newCase: "کەیسی نوێ", saveEdits: "هەناردەی گۆڕانکاری", logout: "چوونەدەرەوە",
    saveCase: "پاشەکەوتکردنی کەیس", deleteCase: "سڕینەوەی کەیس", clearForm: "پاککردنەوە",
    adminHint: "هەر ڕیزێک لە خشتەی کەیسەکان هەڵبژێرە بۆ دەستکاریکردن.",
    totalCases: "کەیسە فلتەرکراوەکان", topSite: "زۆرترین شوێن", averageAge: "ناوەندی تەمەن", femaleMale: "مێ / نێر",
    all: "هەموو", page: "لاپەڕە", of: "لە", rows: "ڕیز", noData: "هیچ تۆمارێک نەدۆزرایەوە", lastChecked: "دوایین پشکنین",
    pdfLimit: "PDF پوختە و ڕیزە سەرەتاییەکان دەگرێتەوە. بۆ هەموو ڕیزە فلتەرکراوەکان چاپ بەکاربهێنە.",
    sourceChecked: "بەستەرە فەرمییەکان لەم وێبگەڕەوە پشکنران. ژمارەی زیندوو لە پەڕەی سەرچاوەدا بسەلمێنە.",
    sourceBlocked: "وێبگەڕەکە نەیتوانی هەموو سەرچاوەکان ئۆتۆماتیکی بپشکنێت؛ بەستەرەکان لە خوارەوەن.",
    basicCaseInfo: "زانیاری بنەڕەتی کەیس", tumorClassification: "پۆلێنکردنی توومەر", stageDisease: "قۆناغ و پەرەسەندنی نەخۆشی",
    treatmentInfo: "چارەسەر", addressInfo: "نیشتەجێبوون و ناونیشان", selectValue: "هەڵبژێرە", otherDetails: "وردەکارییەکانی تر"
  },
  ar: {
    region: "إقليم كردستان - العراق", appTitle: "إحصاء حالات السرطان المسجلة", dashboard: "لوحة البيانات", cases: "الحالات",
    globalStats: "إحصاءات عالمية", prevention: "الوقاية", admin: "الإدارة", filters: "الفلاتر", reset: "إعادة",
    search: "بحث", searchNow: "بحث", searchPlaceholder: "المعرف، العنوان، المورفولوجيا...", year: "السنة", governorate: "المحافظة",
    sex: "الجنس", ageGroup: "الفئة العمرية", cancerSite: "موقع السرطان", address: "مجموعة العنوان",
    reportTitle: "إحصاء حالات السرطان المسجلة في إقليم كردستان - العراق، 2020-2025", downloadPdf: "تنزيل PDF", print: "طباعة", exportCsv: "تصدير CSV",
    casesByYear: "الحالات حسب السنة", topCancerSites: "أكثر مواقع السرطان", byGovernorate: "حسب المحافظة",
    byAge: "حسب العمر", allData: "كل البيانات المفلترة", prev: "السابق", next: "التالي",
    refreshSources: "فحص المصادر", officialSources: "المصادر الرسمية", preventionTitle: "كيف تقلل خطر السرطان",
    iraqReasons: "أهم عوامل الخطر في العراق", adminLogin: "تسجيل دخول الإدارة", username: "اسم المستخدم",
    password: "كلمة المرور", login: "دخول", localAdminNote: "بيانات دخول الإدارة خاصة. تحفظ التغييرات في هذا المتصفح.",
    manageCases: "إدارة الحالات", newCase: "حالة جديدة", saveEdits: "تصدير التعديلات", logout: "خروج",
    saveCase: "حفظ الحالة", deleteCase: "حذف الحالة", clearForm: "مسح",
    adminHint: "اختر أي صف من جدول الحالات لتعديله هنا.", totalCases: "الحالات المفلترة", topSite: "أكثر موقع",
    averageAge: "متوسط العمر", femaleMale: "إناث / ذكور", all: "الكل", page: "صفحة", of: "من", rows: "صفوف",
    noData: "لا توجد سجلات مطابقة", lastChecked: "آخر فحص",
    pdfLimit: "يتضمن PDF الملخص والصفوف الأولى للأداء. استخدم الطباعة لكل الصفوف المفلترة.",
    sourceChecked: "تم فحص الروابط الرسمية من هذا المتصفح. يجب تأكيد الأرقام الحية من صفحات المصدر.",
    sourceBlocked: "تعذر فحص كل المصادر تلقائيا؛ الروابط الرسمية متاحة أدناه.",
    basicCaseInfo: "معلومات الحالة الأساسية", tumorClassification: "تصنيف الورم", stageDisease: "المرحلة وانتشار المرض",
    treatmentInfo: "العلاج", addressInfo: "السكن والعنوان", selectValue: "اختر", otherDetails: "تفاصيل أخرى"
  }
};

const officialSources = [
  { name: "WHO cancer fact sheet", url: "https://www.who.int/news-room/fact-sheets/detail/cancer" },
  { name: "IARC Global Cancer Observatory - Cancer Today", url: "https://gco.iarc.who.int/today/en" },
  { name: "WHO Global Health Observatory OData API", url: "https://www.who.int/data/gho/info/gho-odata-api" },
  { name: "WHO EMRO Iraq noncommunicable diseases", url: "https://www.emro.who.int/iraq/priority-areas/noncommunicable-diseases.html" },
  { name: "IARC GLOBOCAN Iraq 2022 fact sheet", url: "https://gco.iarc.who.int/media/globocan/factsheets/populations/368-iraq-fact-sheet.pdf" }
];

const globalStats = {
  en: [
    ["20M", "Estimated new cancer cases worldwide in 2022"],
    ["9.7M", "Estimated cancer deaths worldwide in 2022"],
    ["400K", "Children develop cancer each year"],
    ["10%", "Approximate share of 2022 cancers attributed to carcinogenic infections"]
  ],
  ckb: [
    ["٢٠ ملیۆن", "مەزەندەی کەیسی نوێی شێرپەنجە لە جیهان لە ٢٠٢٢"],
    ["٩.٧ ملیۆن", "مەزەندەی مردن بەهۆی شێرپەنجە لە جیهان لە ٢٠٢٢"],
    ["٤٠٠ هەزار", "ساڵانە منداڵان تووشی شێرپەنجە دەبن"],
    ["١٠٪", "نزیکەی بەشی شێرپەنجەکانی ٢٠٢٢ کە پەیوەستن بە هەوکاری شێرپەنجەزا"]
  ],
  ar: [
    ["20 مليون", "حالات سرطان جديدة مقدرة عالميا في 2022"],
    ["9.7 مليون", "وفيات سرطان مقدرة عالميا في 2022"],
    ["400 ألف", "طفل يصابون بالسرطان كل عام"],
    ["10٪", "النسبة التقريبية لسرطانات 2022 المنسوبة إلى عدوى مسرطنة"]
  ]
};

const advice = {
  en: [
    ["Avoid tobacco", "Do not smoke or use smokeless tobacco, and avoid second-hand smoke."],
    ["Screen early", "Follow clinical screening guidance for breast, cervical, colorectal, and other cancers when eligible."],
    ["Vaccinate and treat infections", "HPV and hepatitis B vaccination, hepatitis treatment, and H. pylori care can reduce infection-linked cancers."],
    ["Move and eat well", "Keep a healthy weight, stay active, and limit processed meat and highly processed foods."],
    ["Reduce exposure", "Use sun protection, workplace protection, and limit exposure to polluted air where possible."]
  ],
  ckb: [
    ["دووربە لە توتن", "جگەرە و توتنی بێدوکەڵ بەکارمەهێنە و خۆت لە دوکەڵی دەورووبەر بپارێزە."],
    ["پشکنینی زوو", "ڕێنمایی پزیشکی بۆ پشکنینی مەمک، ملی منداڵدان، کۆڵۆرێکتال و جۆرەکانی تر جێبەجێ بکە."],
    ["ڤاکسین و چارەسەری هەوکار", "ڤاکسینی HPV و هیپاتایتیس B، چارەسەری هیپاتایتیس و H. pylori مەترسی جۆرەکانی پەیوەست بە هەوکار کەم دەکاتەوە."],
    ["جووڵە و خواردنی باش", "کێشی تەندروست بپارێزە، چالاک بە، و خواردنی گۆشتی پرۆسێسکراو و خواردنی زۆر پرۆسێسکراو کەم بکە."],
    ["کەمکردنەوەی بەرکەوتن", "پاراستنی خۆر، پاراستنی شوێنی کار و کەمکردنەوەی بەرکەوتن بە پیسبوونی هەوا بەکاربهێنە."]
  ],
  ar: [
    ["تجنب التبغ", "لا تدخن ولا تستخدم التبغ غير المدخن، وتجنب التدخين السلبي."],
    ["الفحص المبكر", "اتبع إرشادات الفحص الطبي لسرطان الثدي وعنق الرحم والقولون والمستقيم وغيرها عند الحاجة."],
    ["اللقاحات وعلاج العدوى", "لقاح HPV والتهاب الكبد B، وعلاج التهاب الكبد وجرثومة المعدة، يقللون سرطانات مرتبطة بالعدوى."],
    ["الحركة والغذاء الصحي", "حافظ على وزن صحي، مارس النشاط البدني، وقلل اللحوم المصنعة والأغذية فائقة المعالجة."],
    ["تقليل التعرض", "استخدم الوقاية من الشمس وحماية العمل وقلل التعرض لتلوث الهواء قدر الإمكان."]
  ]
};

const iraqReasons = {
  en: [
    ["Tobacco burden", "WHO EMRO reports high tobacco use among Iraqi males and adolescents, a major avoidable cancer risk."],
    ["Air pollution", "Ambient air pollution above WHO guideline levels contributes to lung cancer risk and other NCDs."],
    ["Infections", "HBV, HCV, HPV, and H. pylori can drive liver, cervical, stomach, and other cancers when prevention and treatment are limited."],
    ["Lifestyle transition", "Obesity, unhealthy diet, and physical inactivity increase risk for breast, colorectal, endometrial, kidney, and other cancers."],
    ["Late diagnosis", "Delayed screening or diagnosis can make cancers appear at later stages and increase treatment burden."]
  ],
  ckb: [
    ["بارگرانی توتن", "WHO EMRO بەکارهێنانی بەرزی توتن لە نێوان پیاوان و هەرزەکارانی عێراق ڕاپۆرت دەکات، کە مەترسییەکی گرنگی خۆپارێزراوی شێرپەنجەیە."],
    ["پیسبوونی هەوا", "پیسبوونی هەوای دەرەوە لەسەر ئاستی سەرووی ڕێنمایی WHO مەترسی شێرپەنجەی سی و نەخۆشییە ناتواوەکان زیاد دەکات."],
    ["هەوکارەکان", "HBV، HCV، HPV و H. pylori دەتوانن شێرپەنجەی جگە، ملی منداڵدان، گەدە و جۆرەکانی تر زیاد بکەن ئەگەر پێشگیری و چارەسەر سنووردار بێت."],
    ["گۆڕانی شێوازی ژیان", "قەڵەوی، خواردنی ناتەندروست و کەمی جووڵە مەترسی مەمک، کۆڵۆرێکتال، منداڵدان، گورچیلە و جۆرەکانی تر زیاد دەکات."],
    ["دواکەوتنی دەستنیشانکردن", "دواکەوتنی پشکنین یان دەستنیشانکردن دەتوانێت شێرپەنجە لە قۆناغی درەنگدا دەربخات و باری چارەسەر زیاد بکات."]
  ],
  ar: [
    ["عبء التبغ", "تذكر WHO EMRO ارتفاع استخدام التبغ بين الذكور والمراهقين في العراق، وهو عامل خطر مهم يمكن تجنبه."],
    ["تلوث الهواء", "تلوث الهواء المحيط فوق مستويات إرشادات منظمة الصحة العالمية يساهم في خطر سرطان الرئة وأمراض غير سارية أخرى."],
    ["العدوى", "HBV وHCV وHPV وH. pylori يمكن أن تقود إلى سرطانات الكبد وعنق الرحم والمعدة وغيرها عند ضعف الوقاية والعلاج."],
    ["تغير نمط الحياة", "السمنة والغذاء غير الصحي وقلة النشاط تزيد خطر سرطان الثدي والقولون وبطانة الرحم والكلى وغيرها."],
    ["التشخيص المتأخر", "تأخر الفحص أو التشخيص قد يجعل السرطان يظهر في مراحل متقدمة ويزيد عبء العلاج."]
  ]
};

function t(key) {
  return (i18n[lang] && i18n[lang][key]) || i18n.en[key] || key;
}

function displayColumnName(columnName) {
  if (lang === "ckb") return KURDISH_COLUMNS[columnName] || columnName;
  if (lang === "ar") return ARABIC_COLUMNS[columnName] || columnName;
  return columnName;
}

function displayAnatomyPhrase(text, valueMap, nosLabel, glandLabel) {
  const normalized = text.toUpperCase();
  if (normalized.endsWith(", NOS")) {
    const base = normalized.replace(/, NOS$/, "");
    if (valueMap[base]) return `${valueMap[base]}، ${nosLabel}`;
  }
  if (normalized.endsWith(" GLAND")) {
    const base = normalized.replace(/ GLAND$/, "");
    if (valueMap[base]) return `${valueMap[base]} ${glandLabel}`;
  }
  return "";
}

function displayFieldValue(index, value) {
  const text = String(value ?? "").trim();
  if (text === "") return text;
  const normalized = text.toUpperCase();
  if (lang === "ckb") {
    if (KURDISH_VALUES[normalized]) return KURDISH_VALUES[normalized];
    const anatomy = displayAnatomyPhrase(text, KURDISH_VALUES, "دیارینەکراو", "(غودە)");
    if (anatomy) return anatomy;
    if ([FIELD.surgical, FIELD.chemo, FIELD.radio, FIELD.hormonal, FIELD.targeted, FIELD.family].includes(index)) {
      if (text === "1") return "بەڵێ";
      if (text === "2") return "نەخێر";
      if (text === "9") return "نادیار";
    }
    if (index === FIELD.nationality) {
      if (text === "1") return "عێراقی";
      if (text === "2") return "بیانی";
      if (text === "9") return "نادیار";
    }
    return text;
  }
  if (lang === "ar") {
    if (ARABIC_VALUES[normalized]) return ARABIC_VALUES[normalized];
    const anatomy = displayAnatomyPhrase(text, ARABIC_VALUES, "غير محدد", "(غدة)");
    if (anatomy) return anatomy;
    if ([FIELD.surgical, FIELD.chemo, FIELD.radio, FIELD.hormonal, FIELD.targeted, FIELD.family].includes(index)) {
      if (text === "1") return "نعم";
      if (text === "2") return "لا";
      if (text === "9") return "غير معروف";
    }
    if (index === FIELD.nationality) {
      if (text === "1") return "عراقي";
      if (text === "2") return "أجنبي";
      if (text === "9") return "غير معروف";
    }
    return text;
  }
  return text;
}

function loadEdits() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { updated: {}, deleted: {}, added: [] };
  } catch {
    return { updated: {}, deleted: {}, added: [] };
  }
}

function saveEdits() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(edits));
}

function buildRows() {
  const rows = ROWS.filter(row => !edits.deleted[getId(row)]).map(row => edits.updated[getId(row)] || row);
  return rows.concat(edits.added || []);
}

function getId(row) {
  return String(row[FIELD.id] ?? "");
}

function optionValue(value) {
  return String(value ?? "").trim();
}

function uniqueValues(index) {
  return [...new Set(allRows.map(row => optionValue(row[index])).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
}

function fillSelect(id, index) {
  const select = document.getElementById(id);
  const current = select.value;
  select.innerHTML = `<option value="">${t("all")}</option>` + uniqueValues(index)
    .map(value => `<option value="${escapeAttr(value)}">${escapeHtml(displayFieldValue(index, value))}</option>`).join("");
  select.value = current;
}

function setLanguage(nextLang) {
  lang = nextLang;
  localStorage.setItem("krgCancerLang", lang);
  document.documentElement.lang = lang;
  document.body.dir = lang === "en" ? "ltr" : "rtl";
  document.querySelectorAll(".lang-btn").forEach(btn => btn.classList.toggle("is-active", btn.dataset.lang === lang));
  document.querySelectorAll("[data-i18n]").forEach(el => el.textContent = t(el.dataset.i18n));
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => el.placeholder = t(el.dataset.i18nPlaceholder));
  populateFilters();
  renderAll();
}

function populateFilters() {
  fillSelect("yearFilter", FIELD.year);
  fillSelect("governorateFilter", FIELD.governorate);
  fillSelect("sexFilter", FIELD.sex);
  fillSelect("ageGroupFilter", FIELD.ageGroup);
  fillSelect("siteFilter", FIELD.site);
  fillSelect("addressFilter", FIELD.addressGroup);
}

function getFilterValues() {
  return {
    q: document.getElementById("searchInput").value.trim().toLowerCase(),
    year: document.getElementById("yearFilter").value,
    governorate: document.getElementById("governorateFilter").value,
    sex: document.getElementById("sexFilter").value,
    ageGroup: document.getElementById("ageGroupFilter").value,
    site: document.getElementById("siteFilter").value,
    address: document.getElementById("addressFilter").value
  };
}

function applyFilters() {
  const f = getFilterValues();
  filteredRows = allRows.filter(row => {
    if (f.year && optionValue(row[FIELD.year]) !== f.year) return false;
    if (f.governorate && optionValue(row[FIELD.governorate]) !== f.governorate) return false;
    if (f.sex && optionValue(row[FIELD.sex]) !== f.sex) return false;
    if (f.ageGroup && optionValue(row[FIELD.ageGroup]) !== f.ageGroup) return false;
    if (f.site && optionValue(row[FIELD.site]) !== f.site) return false;
    if (f.address && optionValue(row[FIELD.addressGroup]) !== f.address) return false;
    if (f.q && !row.some((value, index) => {
      const raw = String(value ?? "").toLowerCase();
      const displayed = displayFieldValue(index, value).toLowerCase();
      return raw.includes(f.q) || displayed.includes(f.q);
    })) return false;
    return true;
  });
  page = Math.min(page, Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE)));
}

function countBy(rows, index) {
  const counts = new Map();
  rows.forEach(row => {
    const key = String(row[index] ?? "Unknown").trim() || "Unknown";
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

function countMeaningfulBy(rows, index) {
  const invalid = new Set(["", "#N/A", "N/A", "NA", "UNKNOWN", "DELANOMIAD", "NULL", "UNDEFINED"]);
  return countBy(rows, index).filter(([label]) => !invalid.has(String(label).trim().toUpperCase()));
}

function renderKpis() {
  const total = filteredRows.length;
  const topSite = countMeaningfulBy(filteredRows, FIELD.site)[0] || ["-", 0];
  const female = filteredRows.filter(row => String(row[FIELD.sex]).toLowerCase() === "female").length;
  const male = filteredRows.filter(row => String(row[FIELD.sex]).toLowerCase() === "male").length;
  const ages = filteredRows.map(row => Number(row[FIELD.age])).filter(Number.isFinite);
  const avgAge = ages.length ? Math.round(ages.reduce((a, b) => a + b, 0) / ages.length) : "-";
  const items = [
    [formatNumber(total), t("totalCases")],
    [displayFieldValue(FIELD.site, topSite[0]), `${t("topSite")} (${formatNumber(topSite[1])})`],
    [avgAge, t("averageAge")],
    [`${formatNumber(female)} / ${formatNumber(male)}`, t("femaleMale")]
  ];
  document.getElementById("kpiGrid").innerHTML = items.map(([value, label]) =>
    `<article class="kpi"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></article>`
  ).join("");
}

function renderBarChart(id, entries, limit = 8, valueIndex = null) {
  const top = entries.slice(0, limit);
  const max = Math.max(1, ...top.map(([, value]) => value));
  document.getElementById(id).innerHTML = top.map(([label, value]) => `
    <div class="bar-row">
      <span title="${escapeAttr(displayFieldValue(valueIndex, label))}">${escapeHtml(displayFieldValue(valueIndex, label))}</span>
      <div class="bar-track"><div class="bar-fill" style="width:${Math.max(3, value / max * 100)}%"></div></div>
      <strong>${formatNumber(value)}</strong>
    </div>
  `).join("") || `<p class="source-note">${t("noData")}</p>`;
}

function renderCharts() {
  renderBarChart("yearChart", countBy(filteredRows, FIELD.year).sort((a, b) => String(a[0]).localeCompare(String(b[0]), undefined, { numeric: true })), 6, FIELD.year);
  renderBarChart("siteChart", countMeaningfulBy(filteredRows, FIELD.site), 10, FIELD.site);
  renderBarChart("governorateChart", countBy(filteredRows, FIELD.governorate), 6, FIELD.governorate);
  renderBarChart("ageChart", countBy(filteredRows, FIELD.ageGroup), 10, FIELD.ageGroup);
}

function renderTable() {
  const table = document.getElementById("casesTable");
  const start = (page - 1) * PAGE_SIZE;
  const rows = filteredRows.slice(start, start + PAGE_SIZE);
  const header = `<thead><tr>${COLUMNS.map(col => `<th>${escapeHtml(displayColumnName(col))}</th>`).join("")}</tr></thead>`;
  const body = rows.length ? rows.map(row => `
    <tr data-id="${escapeAttr(getId(row))}">
      ${row.map((value, index) => `<td>${escapeHtml(displayFieldValue(index, value))}</td>`).join("")}
    </tr>
  `).join("") : `<tr><td colspan="${COLUMNS.length}">${t("noData")}</td></tr>`;
  table.innerHTML = `${header}<tbody>${body}</tbody>`;
  table.querySelectorAll("tbody tr[data-id]").forEach(tr => tr.addEventListener("click", () => selectCase(tr.dataset.id)));
  const pages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
  document.getElementById("pageInfo").textContent = `${t("page")} ${page} ${t("of")} ${pages} - ${formatNumber(filteredRows.length)} ${t("rows")}`;
}

function renderGlobal() {
  document.getElementById("globalCards").innerHTML = globalStats[lang].map(([value, label]) =>
    `<article class="info-card"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></article>`
  ).join("");
  document.getElementById("sourceLinks").innerHTML = officialSources.map(source =>
    `<article class="source-item"><a href="${source.url}" target="_blank" rel="noopener">${escapeHtml(source.name)}</a><p>${escapeHtml(source.url)}</p></article>`
  ).join("");
}

function renderAdvice() {
  document.getElementById("adviceList").innerHTML = advice[lang].map(([title, text]) =>
    `<article class="advice-item"><h4>${escapeHtml(title)}</h4><p>${escapeHtml(text)}</p></article>`
  ).join("");
  document.getElementById("iraqReasonList").innerHTML = iraqReasons[lang].map(([title, text]) =>
    `<article class="advice-item"><h4>${escapeHtml(title)}</h4><p>${escapeHtml(text)}</p></article>`
  ).join("");
}

function renderAdminForm(row = emptyRow()) {
  const form = document.getElementById("caseForm");
  const rendered = new Set();
  const sections = ADMIN_SECTIONS.map((section, sectionIndex) => {
    const fields = section.fields.filter(Number.isInteger);
    fields.forEach(index => rendered.add(index));
    return `
      <details class="case-section" ${sectionIndex < 2 ? "open" : ""}>
        <summary>${escapeHtml(t(section.titleKey))}</summary>
        <div class="case-section-grid">
          ${fields.map(index => renderAdminField(index, row)).join("")}
        </div>
      </details>
    `;
  }).join("");
  const remainingFields = COLUMNS
    .map((_, index) => index)
    .filter(index => !rendered.has(index));
  const extra = remainingFields.length ? `
    <details class="case-section">
      <summary>${escapeHtml(t("otherDetails"))}</summary>
      <div class="case-section-grid">
        ${remainingFields.map(index => renderAdminField(index, row)).join("")}
      </div>
    </details>
  ` : "";
  form.innerHTML = sections + extra;
}

function renderAdminField(index, row) {
  const label = displayColumnName(COLUMNS[index]);
  const value = row[index] ?? "";
  const type = index === FIELD.age ? "number" : "text";
  if (DROPDOWN_FIELDS.has(index)) {
    return `
      <label>
        <span>${escapeHtml(label)}</span>
        <select data-col="${index}">
          ${renderSelectOptions(index, value)}
        </select>
      </label>
    `;
  }
  return `
    <label>
      <span>${escapeHtml(label)}</span>
      <input data-col="${index}" type="${type}" value="${escapeAttr(value)}" ${index === FIELD.id ? "readonly" : ""}>
    </label>
  `;
}

function renderSelectOptions(index, selectedValue) {
  const selected = String(selectedValue ?? "");
  const values = uniqueValues(index).filter(value => value !== "");
  if (selected && !values.includes(selected)) values.unshift(selected);
  return `<option value="">${escapeHtml(t("selectValue"))}</option>` + values
    .map(value => `<option value="${escapeAttr(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(displayFieldValue(index, value))}</option>`)
    .join("");
}

function emptyRow() {
  const row = Array(COLUMNS.length).fill("");
  row[FIELD.id] = `NEW-${Date.now()}`;
  return row;
}

function selectCase(id) {
  selectedId = id;
  const row = allRows.find(item => getId(item) === id);
  if (row && isAdmin) renderAdminForm(row);
}

function saveCaseFromForm() {
  const inputs = [...document.querySelectorAll("#caseForm [data-col]")];
  if (!inputs.length) return;
  const row = Array(COLUMNS.length).fill("");
  inputs.forEach(input => row[Number(input.dataset.col)] = parseValue(input.value));
  if (!row[FIELD.id]) row[FIELD.id] = `NEW-${Date.now()}`;
  const id = getId(row);
  const baselineExists = ROWS.some(base => getId(base) === id);
  const addedIndex = edits.added.findIndex(item => getId(item) === id);
  if (baselineExists) {
    edits.updated[id] = row;
  } else if (addedIndex >= 0) {
    edits.added[addedIndex] = row;
  } else {
    edits.added.push(row);
  }
  saveEdits();
  rebuildAndRender();
  selectedId = id;
  renderAdminForm(row);
}

function deleteSelectedCase() {
  const row = getFormRow();
  const id = getId(row);
  if (!id) return;
  const addedIndex = edits.added.findIndex(item => getId(item) === id);
  if (addedIndex >= 0) edits.added.splice(addedIndex, 1);
  else edits.deleted[id] = true;
  delete edits.updated[id];
  saveEdits();
  selectedId = null;
  rebuildAndRender();
  renderAdminForm();
}

function getFormRow() {
  const row = Array(COLUMNS.length).fill("");
  document.querySelectorAll("#caseForm [data-col]").forEach(input => row[Number(input.dataset.col)] = parseValue(input.value));
  return row;
}

function parseValue(value) {
  const trimmed = value.trim();
  if (trimmed === "") return "";
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
  return trimmed;
}

function rebuildAndRender() {
  allRows = buildRows();
  populateFilters();
  renderAll();
}

function renderAll() {
  applyFilters();
  renderKpis();
  renderCharts();
  renderTable();
  renderGlobal();
  renderAdvice();
}

function buildReport(rows, maxRows = rows.length) {
  const f = getFilterValues();
  const shown = rows.slice(0, maxRows);
  const filterLabels = {
    year: FIELD.year,
    governorate: FIELD.governorate,
    sex: FIELD.sex,
    ageGroup: FIELD.ageGroup,
    site: FIELD.site,
    address: FIELD.addressGroup
  };
  const filters = Object.entries(f).filter(([, value]) => value).map(([key, value]) => {
    const label = key === "q" ? t("search") : key === "address" ? t("address") : displayColumnName(COLUMNS[filterLabels[key]]);
    const shown = key === "q" ? value : displayFieldValue(filterLabels[key], value);
    return `${label}: ${shown}`;
  }).join(" | ") || t("all");
  const topSites = countBy(rows, FIELD.site).slice(0, 8);
  return `
    <article class="print-report">
      <h1>${t("appTitle")}</h1>
      <p>${t("reportTitle")}</p>
      <p><strong>${t("filters")}:</strong> ${escapeHtml(filters)}</p>
      <p><strong>${t("totalCases")}:</strong> ${formatNumber(rows.length)}</p>
      <h2>${t("topCancerSites")}</h2>
      <table><thead><tr><th>${t("cancerSite")}</th><th>${t("rows")}</th></tr></thead><tbody>
        ${topSites.map(([site, count]) => `<tr><td>${escapeHtml(displayFieldValue(FIELD.site, site))}</td><td>${formatNumber(count)}</td></tr>`).join("")}
      </tbody></table>
      <h2>${t("allData")}</h2>
      ${rows.length > maxRows ? `<p>${escapeHtml(t("pdfLimit"))} Showing ${formatNumber(maxRows)} of ${formatNumber(rows.length)} rows.</p>` : ""}
      <table><thead><tr>${COLUMNS.map(col => `<th>${escapeHtml(displayColumnName(col))}</th>`).join("")}</tr></thead><tbody>
        ${shown.map(row => `<tr>${row.map((value, index) => `<td>${escapeHtml(displayFieldValue(index, value))}</td>`).join("")}</tr>`).join("")}
      </tbody></table>
    </article>
  `;
}

async function downloadPdf() {
  printReport();
}

function buildPdfPayload() {
  const rowsForPdf = filteredRows.slice(0, 1500);
  const topSite = countMeaningfulBy(filteredRows, FIELD.site)[0] || ["-", 0];
  const ages = filteredRows.map(row => Number(row[FIELD.age])).filter(Number.isFinite);
  const avgAge = ages.length ? Math.round(ages.reduce((a, b) => a + b, 0) / ages.length) : "-";
  return {
    title: t("appTitle"),
    subtitle: t("reportTitle"),
    filters: buildFilterText(),
    totalRows: filteredRows.length,
    lang,
    columns: COLUMNS.map(displayColumnName),
    rows: rowsForPdf.map(row => row.map((value, index) => displayFieldValue(index, value))),
    summary: [
      { label: t("totalCases"), value: formatNumber(filteredRows.length) },
      { label: t("topSite"), value: `${displayFieldValue(FIELD.site, topSite[0])} (${formatNumber(topSite[1])})` },
      { label: t("averageAge"), value: avgAge },
      { label: t("femaleMale"), value: document.querySelector(".kpi:nth-child(4) strong")?.textContent || "" }
    ]
  };
}

function buildFilterText() {
  const f = getFilterValues();
  const filterLabels = {
    year: FIELD.year,
    governorate: FIELD.governorate,
    sex: FIELD.sex,
    ageGroup: FIELD.ageGroup,
    site: FIELD.site,
    address: FIELD.addressGroup
  };
  const parts = Object.entries(f).filter(([, value]) => value).map(([key, value]) => {
    const label = key === "q" ? t("search") : key === "address" ? t("address") : displayColumnName(COLUMNS[filterLabels[key]]);
    const shown = key === "q" ? value : displayFieldValue(filterLabels[key], value);
    return `${label}: ${shown}`;
  });
  return parts.length ? `${t("filters")}: ${parts.join(" | ")}` : `${t("filters")}: ${t("all")}`;
}

function printReport() {
  const printArea = document.getElementById("printArea");
  printArea.innerHTML = buildReport(filteredRows, filteredRows.length);
  printArea.setAttribute("aria-hidden", "false");
  window.print();
  setTimeout(() => printArea.setAttribute("aria-hidden", "true"), 500);
}

function exportCsv() {
  const csv = [COLUMNS, ...filteredRows].map(row => row.map(csvCell).join(",")).join("\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `cancer-data-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

async function checkSources() {
  const checks = await Promise.allSettled(officialSources.map(source => fetch(source.url, { mode: "no-cors", cache: "no-store" })));
  const ok = checks.some(result => result.status === "fulfilled");
  const stamp = `${t("lastChecked")}: ${new Date().toLocaleString()}`;
  document.getElementById("sourceStatus").textContent = `${stamp}. ${ok ? t("sourceChecked") : t("sourceBlocked")}`;
}

function exportEdits() {
  const blob = new Blob([JSON.stringify(edits, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `cancer-admin-edits-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

function formatNumber(value) {
  return Number(value).toLocaleString(lang === "en" ? "en-US" : "ar-IQ");
}

function bindEvents() {
  document.querySelectorAll(".lang-btn").forEach(btn => btn.addEventListener("click", () => setLanguage(btn.dataset.lang)));
  document.querySelectorAll(".nav-btn").forEach(btn => btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-btn").forEach(item => item.classList.remove("is-active"));
    document.querySelectorAll(".view").forEach(item => item.classList.remove("is-active"));
    btn.classList.add("is-active");
    document.getElementById(btn.dataset.view).classList.add("is-active");
  }));
  ["yearFilter", "governorateFilter", "sexFilter", "ageGroupFilter", "siteFilter", "addressFilter"]
    .forEach(id => document.getElementById(id).addEventListener("input", () => { page = 1; renderAll(); }));
  document.getElementById("searchInput").addEventListener("input", event => {
    if (event.target.value.trim() !== "") return;
    page = 1;
    renderAll();
  });
  const runSearch = () => {
    if (document.getElementById("searchInput").value.trim()) {
      ["yearFilter", "governorateFilter", "sexFilter", "ageGroupFilter", "siteFilter", "addressFilter"]
        .forEach(id => document.getElementById(id).value = "");
    }
    page = 1;
    renderAll();
    document.querySelector('[data-view="cases"]').click();
    document.getElementById("casesTable").scrollIntoView({ behavior: "smooth", block: "start" });
  };
  document.getElementById("runSearchBtn").addEventListener("click", runSearch);
  document.getElementById("searchInput").addEventListener("keydown", event => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    runSearch();
  });
  document.getElementById("resetFilters").addEventListener("click", () => {
    ["searchInput", "yearFilter", "governorateFilter", "sexFilter", "ageGroupFilter", "siteFilter", "addressFilter"]
      .forEach(id => document.getElementById(id).value = "");
    page = 1;
    renderAll();
  });
  document.getElementById("prevPage").addEventListener("click", () => { page = Math.max(1, page - 1); renderTable(); });
  document.getElementById("nextPage").addEventListener("click", () => {
    page = Math.min(Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE)), page + 1);
    renderTable();
  });
  document.getElementById("downloadPdfBtn").addEventListener("click", downloadPdf);
  document.getElementById("printBtn").addEventListener("click", printReport);
  document.getElementById("exportCsvBtn").addEventListener("click", exportCsv);
  document.getElementById("refreshSources").addEventListener("click", checkSources);
  document.getElementById("loginForm").addEventListener("submit", event => {
    event.preventDefault();
    isAdmin = document.getElementById("username").value === ADMIN_USER && document.getElementById("password").value === ADMIN_PASS;
    document.getElementById("loginPanel").classList.toggle("is-hidden", isAdmin);
    document.getElementById("adminPanel").classList.toggle("is-hidden", !isAdmin);
    if (isAdmin) renderAdminForm(selectedId ? allRows.find(row => getId(row) === selectedId) : emptyRow());
  });
  document.getElementById("newCaseBtn").addEventListener("click", () => renderAdminForm());
  document.getElementById("saveCaseBtn").addEventListener("click", saveCaseFromForm);
  document.getElementById("deleteCaseBtn").addEventListener("click", deleteSelectedCase);
  document.getElementById("clearFormBtn").addEventListener("click", () => renderAdminForm());
  document.getElementById("saveEditsBtn").addEventListener("click", exportEdits);
  document.getElementById("logoutBtn").addEventListener("click", () => {
    isAdmin = false;
    document.getElementById("loginPanel").classList.remove("is-hidden");
    document.getElementById("adminPanel").classList.add("is-hidden");
  });
}

bindEvents();
setLanguage(lang);
