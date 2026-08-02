// ====================================
// ColorView Pro - script.js
// ====================================
// --- Elements ---
const body = document.body;
const htmlEl = document.documentElement;
const logoImage = document.getElementById('logo-image');
const preview = document.getElementById('current-color-preview');
const uploadedImage = document.getElementById('uploaded-image');
const hexInput = document.getElementById('hexInput');
const rgbInput = document.getElementById('rgbInput');
const hslInput = document.getElementById('hslInput');
const hRange = document.getElementById('hRange');
const sRange = document.getElementById('sRange');
const lRange = document.getElementById('lRange');
const hValue = document.getElementById('hValue');
const sValue = document.getElementById('sValue');
const lValue = document.getElementById('lValue');
const settingsBtn = document.getElementById('settings-btn');
const settingsDrawer = document.getElementById('settings-drawer');
const lightModeBtn = document.getElementById('lightModeBtn');
const darkModeBtn = document.getElementById('darkModeBtn');
const customModeBtn = document.getElementById('customModeBtn');
const customAccentInput = document.getElementById('customAccentInput');
const colorblindSelect = document.getElementById('colorblind-mode-select');
const imageUpload = document.getElementById('imageUpload');
const uploadBtn = document.getElementById('uploadBtn');
const clearImageBtn = document.getElementById('clearImageBtn');
const languageSelect = document.getElementById('languageSelect');
const disclaimerPanel = document.getElementById('colorblind-disclaimer');
const disclaimerText = document.getElementById('disclaimer-text');
const disclaimerOkBtn = document.getElementById('disclaimer-ok-btn');
const disclaimerNeverBtn = document.getElementById('disclaimer-never-btn');
const pcLayoutBtn = document.getElementById('pcLayoutBtn');
const mobileLayoutBtn = document.getElementById('mobileLayoutBtn');
const modeInfoBox = document.getElementById('mode-info-box');
const modeInfoTitle = document.getElementById('mode-info-title');
const modeInfoList = document.getElementById('mode-info-list');
const singleLineFooter = document.getElementById('single-line-footer');
const splashScreen = document.getElementById('splash-screen');
const splashLogo = document.getElementById('splash-logo');
// New: color tools
const eyedropperBtn = document.getElementById('eyedropperBtn');
const favBtn = document.getElementById('favBtn');
const colorNameValue = document.getElementById('colorNameValue');
const dangerPairsBox = document.getElementById('dangerPairsBox');
const contrastColor1 = document.getElementById('contrastColor1');
const contrastColor2 = document.getElementById('contrastColor2');
const contrastPreview = document.getElementById('contrastPreview');
const contrastResultText = document.getElementById('contrastResultText');
const generatePaletteBtn = document.getElementById('generatePaletteBtn');
const paletteSwatchRow = document.getElementById('paletteSwatchRow');
const complementarySwatches = document.getElementById('complementarySwatches');
const analogousSwatches = document.getElementById('analogousSwatches');
const triadicSwatches = document.getElementById('triadicSwatches');
const recentSwatches = document.getElementById('recentSwatches');
const favoriteSwatches = document.getElementById('favoriteSwatches');
const exportCssBtn = document.getElementById('exportCssBtn');
const exportJsonBtn = document.getElementById('exportJsonBtn');
const exportPngBtn = document.getElementById('exportPngBtn');
// New: simulation controls
const severityRange = document.getElementById('severityRange');
const severityValue = document.getElementById('severityValue');
const wholeSiteToggle = document.getElementById('wholeSiteToggle');
const dynamicCBMatrix = document.getElementById('dynamicCBMatrix');
// New: image tools
const imageDropZone = document.getElementById('imageDropZone');
const imageCaption = document.getElementById('imageCaption');
const threePanelView = document.getElementById('threePanelView');
const panelOriginal = document.getElementById('panelOriginal');
const panelSimulated = document.getElementById('panelSimulated');
const panelCorrected = document.getElementById('panelCorrected');
const webcamBtn = document.getElementById('webcamBtn');
const webcamVideo = document.getElementById('webcamVideo');
const batchUploadBtn = document.getElementById('batchUploadBtn');
const batchImageUpload = document.getElementById('batchImageUpload');
const batchGallery = document.getElementById('batchGallery');
const downloadSimBtn = document.getElementById('downloadSimBtn');
const shareCardBtn = document.getElementById('shareCardBtn');
const chartUpload = document.getElementById('chartUpload');
const chartCheckerResult = document.getElementById('chartCheckerResult');
// New: fun extras
const colorFactBanner = document.getElementById('colorFactBanner');
const colorFactText = document.getElementById('colorFactText');
const colorFactCloseBtn = document.getElementById('colorFactCloseBtn');
const achievementsBar = document.getElementById('achievementsBar');
const achievementToast = document.getElementById('achievementToast');
// New: accessibility
const fontSmallBtn = document.getElementById('fontSmallBtn');
const fontMediumBtn = document.getElementById('fontMediumBtn');
const fontLargeBtn = document.getElementById('fontLargeBtn');
const dyslexiaFontToggle = document.getElementById('dyslexiaFontToggle');
const reduceMotionToggle = document.getElementById('reduceMotionToggle');
// New: personalization
const myConditionSelect = document.getElementById('myConditionSelect');
const imageHistoryGallery = document.getElementById('imageHistoryGallery');

// --- State ---
let H = parseInt(hRange.value);
let S = parseInt(sRange.value);
let L = parseInt(lRange.value);
let currentMode = 'none';
let lastUploadedDataUrl = null;
let webcamStream = null;

// --- Persistent lists (localStorage) ---
function loadList(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; } catch (e) { return []; }
}
function saveList(key, list) {
    try { localStorage.setItem(key, JSON.stringify(list)); } catch (e) { /* storage full or unavailable */ }
}
let recentColors = loadList('cvp_recent_colors');
let favoriteColors = loadList('cvp_favorite_colors');
let imageHistory = loadList('cvp_image_history');
let unlockedAchievements = loadList('cvp_achievements');

// --- Localization Data ---
const translations = {
    en: {
        dir: 'ltr',
        main_title: 'Color Picker & Values',
        hsl_controls: 'HSL Controls',
        simulation_title: 'Color Blindness View',
        simulation_desc: 'Simulate for accessible design:',
        normal_vision: 'Normal Vision Test',
        deuteranopia: 'Deuteranopia Test',
        protanopia: 'Protanopia Test',
        settings_h2: 'Settings',
        theme_h3: 'Theme',
        light_mode: 'Light Mode',
        dark_mode: 'Dark Mode',
        custom_mode: 'Custom',
        language_h3: 'Language',
        layout_h3: 'Display Layout',
        pc_layout: 'PC Layout',
        mobile_layout: 'Mobile Layout',
        upload_btn: 'Upload Image for Simulation',
        clear_btn: 'Clear',
        single_line_footer: 'ColorView Pro made by Ahmed Sameh and Nour Eldeen. | ColorView Pro © All rights reserved.',
        disclaimer: 'For the best use of this feature, You should have someone with you who is not colorblind',
        disclaimer_ok: 'Ok',
        disclaimer_never: 'Never Show Again',
        closest_name: 'Closest name:',
        danger_pairs_title: 'Danger Pairs',
        danger_pairs_desc: 'Checks your current color against commonly-confused colors under each colorblindness type.',
        contrast_title: 'Contrast Checker (WCAG)',
        foreground: 'Foreground',
        background: 'Background',
        palette_title: 'Colorblind-Safe Palette',
        generate: 'Generate',
        harmony_title: 'Color Harmony',
        complementary: 'Complementary',
        analogous: 'Analogous',
        triadic: 'Triadic',
        recent_title: 'Recent Colors',
        favorites_title: 'Favorites',
        export_css: 'Export CSS Variables',
        export_json: 'Export JSON',
        export_png: 'Export Swatch PNG',
        whole_site_label: 'Preview whole site in this mode',
        image_tools_title: 'Image Tools',
        drop_zone: 'Drag & drop an image here, or paste from clipboard',
        webcam_btn: 'Live Webcam Mode',
        batch_btn: 'Batch Upload',
        download_btn: 'Download Result',
        share_card_btn: 'Before/After Card',
        chart_checker_title: 'Chart / Graph Checker',
        chart_upload_btn: 'Upload Chart',
        chart_checker_placeholder: 'Upload a chart or graph image to check whether its colors stay distinguishable for colorblind viewers.',
        accessibility_h3: 'Accessibility',
        dyslexia_font_label: 'Dyslexia-friendly font',
        reduce_motion_label: 'Reduce motion',
        personalization_h3: 'Personalization',
        my_condition_label: 'My condition (auto-selects simulation):',
        image_history_label: 'Recent images (stored on this device only):',
        about_h3: 'About',
        about_text: 'Hello to everyone who opened this to know about us. We are 2 normal students, Nour Eldeen and Ahmed Sameh. We wanted to build something that helps the community, so we made ColorView Pro to help colorblind people and the people designing for them. You can pick colors with HEX, RGB and HSL, simulate 8 types of color blindness with adjustable severity, check contrast and safe palettes, and preview your own images and even your camera through each mode. We used AI tools to help us learn and move faster while building this. Thank you for trying it out — more updates are coming soon.',
        about_credit: '— Nour Eldeen & Ahmed Sameh',
        custom_accent_label: 'Custom accent color:',
        achievement_unlocked_prefix: 'Achievement unlocked: ',
        locked_label: 'Locked',
        unlocked_label: 'Unlocked',
        select_options: {
            none_full: 'No Simulation (Normal Vision)',
            protanopia_full: 'Protanopia (Red-Blind)',
            protanomaly_full: 'Protanomaly (Red-Weak)',
            deuteranopia_full: 'Deuteranopia (Green-Blind)',
            deuteranomaly_full: 'Deuteranomaly (Green-Weak)',
            tritanopia_full: 'Tritanopia (Blue-Blind)',
            tritanomaly_full: 'Tritanomaly (Blue-Weak)',
            achromatopsia_full: 'Achromatopsia (Monochrome)',
            achromatomaly_full: 'Achromatomaly (Weak Monochrome)',
            none_short: 'None / Not sure',
            protanopia_short: 'Protanopia',
            protanomaly_short: 'Protanomaly',
            deuteranopia_short: 'Deuteranopia',
            deuteranomaly_short: 'Deuteranomaly',
            tritanopia_short: 'Tritanopia',
            tritanomaly_short: 'Tritanomaly',
            achromatopsia_short: 'Achromatopsia'
        },
        achievements: {
            uploaded_image: 'First Upload',
            used_eyedropper: 'Eyedropper Pro',
            favorite_color: 'Color Collector',
            tried_all_modes: 'Full Spectrum',
            used_webcam: 'Live Viewer',
            used_batch: 'Batch Master',
            exported_palette: 'Exporter',
            checked_chart: 'Chart Checker',
            downloaded_result: 'Downloader',
            shared_card: 'Storyteller',
            dark_mode_used: 'Night Owl',
            custom_theme_used: 'Personal Touch'
        },
        lang_options: [
            { code: 'en', name: 'English' },
            { code: 'ar', name: 'العربية' }
        ],
        info: {
            none: {
                title: 'No Simulation Selected',
                points: [
                    'Select a color blindness mode above to learn about it.',
                    'The boxes below will show how your design looks in that mode.'
                ]
            },
            protanopia: {
                title: 'Protanopia (Red-Blind)',
                points: [
                    'Protanopia is a type of color blindness where the eye can’t detect red light.',
                    'People with it often confuse reds with greens or browns.',
                    'Red shades may appear darker than they really are.',
                    'It’s usually inherited and present from birth.',
                    'Daily life is normal, but some color-based tasks can be harder.'
                ]
            },
            protanomaly: {
                title: 'Protanomaly (Red-Weak)',
                points: [
                    'Protanomaly is a milder form of red color deficiency, not full color blindness.',
                    'Reds, oranges and greens can look muted or shifted.',
                    'The severity slider shows a lighter version of the Protanopia shift.',
                    'It’s usually inherited and present from birth.'
                ]
            },
            deuteranopia: {
                title: 'Deuteranopia (Green-Blind)',
                points: [
                    'Deuteranopia is a type of color blindness where the eye can’t detect green light.',
                    'People with it often confuse greens with reds or yellows.',
                    'Green shades may appear dull or faded.',
                    'It’s usually inherited and present from birth.',
                    'Daily life is normal, but some color-based tasks can be harder.'
                ]
            },
            deuteranomaly: {
                title: 'Deuteranomaly (Green-Weak)',
                points: [
                    'Deuteranomaly is the most common color deficiency, a milder form of green weakness.',
                    'Greens and reds can look closer together than they really are.',
                    'The severity slider shows a lighter version of the Deuteranopia shift.',
                    'It’s usually inherited and present from birth.'
                ]
            },
            tritanopia: {
                title: 'Tritanopia (Blue-Blind)',
                points: [
                    'Tritanopia is a type of color blindness where the eye can’t detect blue light.',
                    'People with it often confuse blues with greens or yellows.',
                    'Blue shades may appear greener or faded.',
                    'It’s usually inherited and present from birth.',
                    'Daily life is normal, but some color-based tasks can be harder.'
                ]
            },
            tritanomaly: {
                title: 'Tritanomaly (Blue-Weak)',
                points: [
                    'Tritanomaly is a rarer, milder form of blue-yellow color deficiency.',
                    'Blues and greens, or yellows and pinks, can be harder to tell apart.',
                    'The severity slider shows a lighter version of the Tritanopia shift.'
                ]
            },
            achromatopsia: {
                title: 'Achromatopsia (Monochrome)',
                points: [
                    'Monochromacy is a rare form of color blindness where the eye cannot distinguish any colors at all.',
                    'People with it see the world in shades of gray, black, and white.',
                    'It happens when two or all three types of cone cells don’t work.',
                    'It’s usually inherited and appears from birth.',
                    'Daily life is normal, but color-based tasks can be much harder.'
                ]
            },
            achromatomaly: {
                title: 'Achromatomaly (Weak Monochrome)',
                points: [
                    'Achromatomaly is a milder form of monochromacy — colors look washed out rather than fully gray.',
                    'It happens when cone cells are working but weakly.',
                    'The severity slider shows a lighter version of the Achromatopsia shift.'
                ]
            }
        },
        facts: [
            'Roughly 1 in 12 men and 1 in 200 women have some form of color vision deficiency.',
            'Deuteranomaly (green-weak) is the most common type of color blindness.',
            'Dogs are not fully colorblind — they see blues and yellows, but not reds or greens well.',
            'Total color blindness (achromatopsia) is rare, affecting about 1 in 30,000 people.',
            'The color blue is the world\'s most universally liked color across cultures.',
            'Mantis shrimp have up to 16 types of color receptors — humans have just 3.',
            'Color blindness is far more common in men because the genes involved sit on the X chromosome.',
            'The Ishihara test, still used today, was designed in 1917 by Dr. Shinobu Ishihara.'
        ]
    },
    ar: {
        dir: 'rtl',
        main_title: 'منتقي الألوان والقيم',
        hsl_controls: 'تحكم HSL',
        simulation_title: 'معاينة عمى الألوان',
        simulation_desc: 'محاكاة لتصميم يسهل الوصول إليه:',
        normal_vision: 'اختبار الرؤية العادية',
        deuteranopia: 'اختبار عمى الألوان الأخضر',
        protanopia: 'اختبار عمى الألوان الأحمر',
        settings_h2: 'الإعدادات',
        theme_h3: 'السمة',
        light_mode: 'الوضع الفاتح',
        dark_mode: 'الوضع الداكن',
        custom_mode: 'مخصص',
        language_h3: 'اللغة',
        layout_h3: 'تخطيط العرض',
        pc_layout: 'تخطيط الحاسوب',
        mobile_layout: 'تخطيط الهاتف',
        upload_btn: 'تحميل صورة للمحاكاة',
        clear_btn: 'مسح',
        single_line_footer: 'ColorView Pro صُنع بواسطة أحمد سامح ونور الدين. | ColorView Pro © جميع الحقوق محفوظة.',
        disclaimer: 'للاستفادة  من هذه الميزة يجب أن يكون معك شخص غير مصاب بعمى الألوان',
        disclaimer_ok: 'حسنا',
        disclaimer_never: 'لا تظهر مره اخرى',
        closest_name: 'أقرب اسم:',
        danger_pairs_title: 'الألوان الخطرة',
        danger_pairs_desc: 'يفحص لونك الحالي مقابل الألوان التي يسهل الخلط بينها في كل نوع من عمى الألوان.',
        contrast_title: 'فاحص التباين (WCAG)',
        foreground: 'الأمامي',
        background: 'الخلفية',
        palette_title: 'لوحة ألوان آمنة لعمى الألوان',
        generate: 'إنشاء',
        harmony_title: 'توافق الألوان',
        complementary: 'متكامل',
        analogous: 'متجانس',
        triadic: 'ثلاثي',
        recent_title: 'الألوان الأخيرة',
        favorites_title: 'المفضلة',
        export_css: 'تصدير متغيرات CSS',
        export_json: 'تصدير JSON',
        export_png: 'تصدير صورة الألوان',
        whole_site_label: 'معاينة الموقع بالكامل بهذا الوضع',
        image_tools_title: 'أدوات الصورة',
        drop_zone: 'اسحب وأفلت صورة هنا، أو الصق من الحافظة',
        webcam_btn: 'وضع الكاميرا المباشر',
        batch_btn: 'تحميل مجموعة صور',
        download_btn: 'تحميل النتيجة',
        share_card_btn: 'بطاقة قبل/بعد',
        chart_checker_title: 'فحص الرسوم البيانية',
        chart_upload_btn: 'تحميل رسم بياني',
        chart_checker_placeholder: 'حمّل صورة رسم بياني للتحقق من بقاء ألوانه واضحة لمرضى عمى الألوان.',
        accessibility_h3: 'إمكانية الوصول',
        dyslexia_font_label: 'خط مناسب لعسر القراءة',
        reduce_motion_label: 'تقليل الحركة',
        personalization_h3: 'التخصيص',
        my_condition_label: 'حالتي (يحدد المحاكاة تلقائيًا):',
        image_history_label: 'الصور الأخيرة (محفوظة على هذا الجهاز فقط):',
        about_h3: 'عنّا',
        about_text: 'أهلاً بكل من فتح هذا ليعرف عنّا. نحن طالبان عاديان، نور الدين وأحمد سامح. أردنا أن نصنع شيئًا يفيد المجتمع، فصنعنا ColorView Pro لمساعدة مرضى عمى الألوان ومصممي المحتوى لهم. يمكنك اختيار الألوان بصيغ HEX وRGB وHSL، ومحاكاة 8 أنواع من عمى الألوان بشدة قابلة للتعديل، وفحص التباين والألوان الآمنة، ومعاينة صورك وحتى كاميرتك في كل وضع. استخدمنا أدوات الذكاء الاصطناعي لمساعدتنا على التعلم والعمل بشكل أسرع أثناء بناء هذا التطبيق. شكرًا لتجربته — المزيد من التحديثات قادم قريبًا.',
        about_credit: '— نور الدين وأحمد سامح',
        custom_accent_label: 'لون مخصص:',
        achievement_unlocked_prefix: 'تم فتح إنجاز: ',
        locked_label: 'مغلق',
        unlocked_label: 'مفتوح',
        select_options: {
            none_full: 'بدون محاكاة (رؤية طبيعية)',
            protanopia_full: 'عمى الألوان البروتاني (عمى الأحمر)',
            protanomaly_full: 'عمى الألوان البروتاني الخفيف (ضعف الأحمر)',
            deuteranopia_full: 'عمى الألوان الديوتري (عمى الأخضر)',
            deuteranomaly_full: 'عمى الألوان الديوتري الخفيف (ضعف الأخضر)',
            tritanopia_full: 'عمى الألوان التريتي (عمى الأزرق)',
            tritanomaly_full: 'عمى الألوان التريتي الخفيف (ضعف الأزرق)',
            achromatopsia_full: 'عمى الألوان الكامل (أحادي اللون)',
            achromatomaly_full: 'عمى الألوان الكامل الخفيف (أحادي لون ضعيف)',
            none_short: 'لا شيء / غير متأكد',
            protanopia_short: 'عمى الألوان البروتاني',
            protanomaly_short: 'عمى الألوان البروتاني الخفيف',
            deuteranopia_short: 'عمى الألوان الديوتري',
            deuteranomaly_short: 'عمى الألوان الديوتري الخفيف',
            tritanopia_short: 'عمى الألوان التريتي',
            tritanomaly_short: 'عمى الألوان التريتي الخفيف',
            achromatopsia_short: 'عمى الألوان الكامل'
        },
        achievements: {
            uploaded_image: 'أول تحميل',
            used_eyedropper: 'محترف القطارة',
            favorite_color: 'جامع الألوان',
            tried_all_modes: 'الطيف الكامل',
            used_webcam: 'مشاهد مباشر',
            used_batch: 'خبير الدفعات',
            exported_palette: 'مُصدِّر',
            checked_chart: 'فاحص الرسوم البيانية',
            downloaded_result: 'مُحمِّل',
            shared_card: 'راوي القصص',
            dark_mode_used: 'طائر الليل',
            custom_theme_used: 'لمسة شخصية'
        },
        lang_options: [
            { code: 'en', name: 'English' },
            { code: 'ar', name: 'العربية' }
        ],
        info: {
            none: {
                title: 'لم يتم تحديد محاكاة',
                points: [
                    'حدد وضع عمى الألوان أعلاه للتعرف عليه.',
                    'ستعرض الصناديق أدناه كيف يبدو تصميمك في هذا الوضع.'
                ]
            },
            protanopia: {
                title: 'عمى الألوان البروتاني',
                points: [
                    'عمى الألوان البروتاني هو نوع من عمى الألوان لا يستطيع فيه الشخص رؤية الضوء الأحمر.',
                    'غالبًا ما يَخلِط المصابون به بين اللونين الأحمر والأخضر أو الأحمر والبني.',
                    'تظهر الدرجات الحمراء أغمق مما هي عليه في الحقيقة.',
                    'يكون عادةً وراثيًا وموجودًا منذ الولادة.',
                    'يمكن العيش معه طبيعيًا، لكن بعض المهام التي تعتمد على الألوان قد تكون أصعب.'
                ]
            },
            protanomaly: {
                title: 'عمى الألوان البروتاني الخفيف',
                points: [
                    'شكل أخف من نقص اللون الأحمر، وليس عمى ألوان كامل.',
                    'قد تبدو الألوان الحمراء والبرتقالية والخضراء باهتة أو منزاحة قليلاً.',
                    'يوضح منزلق الشدة نسخة أخف من عمى الألوان البروتاني.'
                ]
            },
            deuteranopia: {
                title: 'عمى الألوان الديوتري',
                points: [
                    'عمى الألوان الديوتري هو نوع من عمى الألوان لا يستطيع فيه الشخص رؤية الضوء الأخضر.',
                    'غالبًا ما يَخلِط المصابون به بين اللونين الأخضر والأحمر أو الأخضر والأصفر.',
                    'تبدو الدرجات الخضراء باهتة أو أقل وضوحًا.',
                    'يكون عادةً وراثيًا وموجودًا منذ الولادة.',
                    'يمكن العيش معه طبيعيًا، لكن بعض المهام التي تعتمد على الألوان قد تكون أصعب.'
                ]
            },
            deuteranomaly: {
                title: 'عمى الألوان الديوتري الخفيف',
                points: [
                    'أكثر أنواع نقص إدراك الألوان شيوعًا، وهو شكل أخف من ضعف اللون الأخضر.',
                    'قد يبدو اللونان الأخضر والأحمر أقرب من الحقيقة.',
                    'يوضح منزلق الشدة نسخة أخف من عمى الألوان الديوتري.'
                ]
            },
            tritanopia: {
                title: 'عمى الألوان التريتي',
                points: [
                    'عمى الألوان التريتي هو نوع من عمى الألوان لا يستطيع فيه الشخص رؤية الضوء الأزرق.',
                    'غالبًا ما يَخلِط المصابون به بين اللونين الأزرق والأخضر أو الأزرق والأصفر.',
                    'تبدو الدرجات الزرقاء أكثر خضرة أو باهتة.',
                    'يكون عادةً وراثيًا وموجودًا منذ الولادة.',
                    'يمكن العيش معه طبيعيًا، لكن بعض المهام التي تعتمد على الألوان قد تكون أصعب.'
                ]
            },
            tritanomaly: {
                title: 'عمى الألوان التريتي الخفيف',
                points: [
                    'شكل أخف وأندر من نقص اللون الأزرق والأصفر.',
                    'قد يصعب التمييز بين الأزرق والأخضر، أو الأصفر والوردي.',
                    'يوضح منزلق الشدة نسخة أخف من عمى الألوان التريتي.'
                ]
            },
            achromatopsia: {
                title: 'عمى الألوان الكامل',
                points: [
                    'عمى الألوان الكامل هو نوع نادر من عمى الألوان لا يستطيع فيه الشخص تمييز أي ألوان.',
                    'يرى المصابون به العالم بدرجات الرمادي والأسود والأبيض فقط.',
                    'يحدث بسبب عدم عمل نوعين أو جميع أنواع خلايا المخاريط.',
                    'يكون عادةً وراثيًا وموجودًا منذ الولادة.',
                    'يمكن العيش معه طبيعيًا، لكن المهام التي تعتمد على الألوان تكون أصعب بكثير.'
                ]
            },
            achromatomaly: {
                title: 'عمى الألوان الكامل الخفيف',
                points: [
                    'شكل أخف من عمى الألوان الكامل — تبدو الألوان باهتة بدلاً من رمادية تمامًا.',
                    'يحدث عندما تعمل خلايا المخاريط لكن بشكل ضعيف.',
                    'يوضح منزلق الشدة نسخة أخف من عمى الألوان الكامل.'
                ]
            }
        },
        facts: [
            'حوالي 1 من كل 12 رجلاً و1 من كل 200 امرأة لديهم شكل من أشكال نقص رؤية الألوان.',
            'عمى الألوان الديوتري الخفيف هو أكثر أنواع عمى الألوان شيوعًا.',
            'اللون الأزرق هو اللون الأكثر تفضيلاً عالميًا عبر الثقافات المختلفة.',
            'اختبار إيشيهارا، المستخدم حتى اليوم، صممه الدكتور شينوبو إيشيهارا عام 1917.'
        ]
    }
};

// ====================================
// Color Conversion Functions
// ====================================
function hslToRgb(h, s, l) {
    s /= 100; l /= 100;
    let c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = l - c / 2, r = 0, g = 0, b = 0;
    if (0 <= h && h < 60) { r = c; g = x; b = 0; } else if (60 <= h && h < 120) { r = x; g = c; b = 0; } else if (120 <= h && h < 180) { r = 0; g = c; b = x; } else if (180 <= h && h < 240) { r = 0; g = x; b = c; } else if (240 <= h && h < 300) { r = x; g = 0; b = c; } else if (300 <= h && h < 360) { r = c; g = 0; b = x; }
    r = Math.round((r + m) * 255); g = Math.round((g + m) * 255); b = Math.round((b + m) * 255);
    return [r, g, b];
}
function rgbToHex(r, g, b) {
    const toHex = (c) => {
        const hex = Math.max(0, Math.min(255, c)).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };
    return "#" + toHex(r) + toHex(g) + toHex(b);
}
function hexToRgb(hex) {
    const cleanHex = hex.replace('#', '');
    const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
    if (!result) return null;
    return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
}
function hexToHsl(hex) {
    const cleanHex = hex.replace('#', '');
    if (cleanHex.length < 6) return [H, S, L];
    const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
    if (!result) return [H, S, L];
    let r = parseInt(result[1], 16) / 255; let g = parseInt(result[2], 16) / 255; let b = parseInt(result[3], 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [ Math.round(h * 360), Math.round(s * 100), Math.round(l * 100) ];
}

// ====================================
// Named color lookup (nearest match by RGB distance)
// ====================================
const NAMED_COLORS = [
    ["Black","#000000"],["White","#FFFFFF"],["Red","#FF0000"],["Green","#008000"],["Blue","#0000FF"],
    ["Yellow","#FFFF00"],["Cyan","#00FFFF"],["Magenta","#FF00FF"],["Gray","#808080"],["Silver","#C0C0C0"],
    ["Maroon","#800000"],["Olive","#808000"],["Purple","#800080"],["Teal","#008080"],["Navy","#000080"],
    ["Orange","#FFA500"],["Pink","#FFC0CB"],["Brown","#A52A2A"],["Gold","#FFD700"],["Beige","#F5F5DC"],
    ["Curious Blue","#3498DB"],["Emerald","#2ECC71"],["Sunflower","#F1C40F"],["Alizarin","#E74C3C"],
    ["Amethyst","#9B59B6"],["Turquoise","#1ABC9C"],["Carrot Orange","#E67E22"],["Wet Asphalt","#34495E"],
    ["Peter River","#3498DB"],["Pomegranate","#C0392B"],["Wisteria","#8E44AD"],["Belize Hole","#2980B9"],
    ["Nephritis","#27AE60"],["Sea Green","#2E8B57"],["Coral","#FF7F50"],["Salmon","#FA8072"],
    ["Khaki","#F0E68C"],["Lavender","#E6E6FA"],["Indigo","#4B0082"],["Crimson","#DC143C"],
    ["Chocolate","#D2691E"],["Tan","#D2B48C"],["Slate Gray","#708090"],["Steel Blue","#4682B4"],
    ["Forest Green","#228B22"],["Dark Orange","#FF8C00"],["Hot Pink","#FF69B4"],["Sky Blue","#87CEEB"],
    ["Mint","#98FF98"],["Charcoal","#36454F"],["Ivory","#FFFFF0"],["Plum","#DDA0DD"],["Peach","#FFE5B4"]
];
function closestColorName(hex) {
    const rgb = hexToRgb(hex);
    if (!rgb) return '';
    let best = NAMED_COLORS[0], bestDist = Infinity;
    NAMED_COLORS.forEach(([name, hx]) => {
        const c = hexToRgb(hx);
        const d = Math.pow(rgb[0]-c[0],2) + Math.pow(rgb[1]-c[1],2) + Math.pow(rgb[2]-c[2],2);
        if (d < bestDist) { bestDist = d; best = [name, hx]; }
    });
    return best[0];
}

// ====================================
// WCAG Contrast
// ====================================
function relativeLuminance([r, g, b]) {
    const chan = (c) => {
        c /= 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const [rl, gl, bl] = [chan(r), chan(g), chan(b)];
    return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
}
function contrastRatio(hex1, hex2) {
    const rgb1 = hexToRgb(hex1), rgb2 = hexToRgb(hex2);
    if (!rgb1 || !rgb2) return null;
    const L1 = relativeLuminance(rgb1), L2 = relativeLuminance(rgb2);
    const lighter = Math.max(L1, L2), darker = Math.min(L1, L2);
    return (lighter + 0.05) / (darker + 0.05);
}

// ====================================
// Colorblind simulation matrices + severity blending
// ====================================
const IDENTITY_MATRIX = [1,0,0,0,0, 0,1,0,0,0, 0,0,1,0,0, 0,0,0,1,0];
const CB_BASE_MATRICES = {
    protanopia: [0.567,0.433,0.000,0,0, 0.558,0.442,0.000,0,0, 0.000,0.242,0.758,0,0, 0,0,0,1,0],
    deuteranopia: [0.625,0.375,0.000,0,0, 0.700,0.300,0.000,0,0, 0.000,0.300,0.700,0,0, 0,0,0,1,0],
    tritanopia: [0.950,0.050,0.000,0,0, 0.000,0.433,0.567,0,0, 0.000,0.475,0.525,0,0, 0,0,0,1,0],
    achromatopsia: [0.333,0.333,0.333,0,0, 0.333,0.333,0.333,0,0, 0.333,0.333,0.333,0,0, 0,0,0,1,0]
};
function baseTypeForMode(mode) {
    if (mode.startsWith('protan')) return 'protanopia';
    if (mode.startsWith('deuteran')) return 'deuteranopia';
    if (mode.startsWith('tritan')) return 'tritanopia';
    if (mode.startsWith('achromat')) return 'achromatopsia';
    return null;
}
function blendedMatrix(mode, severityPct) {
    const baseType = baseTypeForMode(mode);
    if (!baseType) return IDENTITY_MATRIX;
    const base = CB_BASE_MATRICES[baseType];
    const t = Math.max(0, Math.min(100, severityPct)) / 100;
    return IDENTITY_MATRIX.map((v, i) => (v * (1 - t) + base[i] * t));
}
function applySimulationMode(mode, severityPct) {
    if (mode === 'none') {
        document.documentElement.style.setProperty('--filter-colorblind', 'none');
        return;
    }
    const matrix = blendedMatrix(mode, severityPct);
    dynamicCBMatrix.setAttribute('values', matrix.map(v => v.toFixed(3)).join(' '));
    document.documentElement.style.setProperty('--filter-colorblind', "url('#dynamicCB')");
}
// Simulate a hex color for a given mode/severity using the same matrix math (for danger pairs / chart checker)
function simulateHex(hex, mode, severityPct) {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    const m = blendedMatrix(mode, severityPct);
    const [r, g, b] = rgb.map(v => v / 255);
    const nr = m[0]*r + m[1]*g + m[2]*b;
    const ng = m[5]*r + m[6]*g + m[7]*b;
    const nb = m[10]*r + m[11]*g + m[12]*b;
    return rgbToHex(Math.round(nr*255), Math.round(ng*255), Math.round(nb*255));
}
function colorDistance(hex1, hex2) {
    const a = hexToRgb(hex1), b = hexToRgb(hex2);
    if (!a || !b) return 999;
    return Math.sqrt(Math.pow(a[0]-b[0],2) + Math.pow(a[1]-b[1],2) + Math.pow(a[2]-b[2],2));
}

// ====================================
// Harmony generator
// ====================================
function hueToHex(h, s, l) {
    const [r, g, b] = hslToRgb(((h % 360) + 360) % 360, s, l);
    return rgbToHex(r, g, b);
}
function getHarmonies() {
    return {
        complementary: [hueToHex(H, S, L), hueToHex(H + 180, S, L)],
        analogous: [hueToHex(H - 30, S, L), hueToHex(H, S, L), hueToHex(H + 30, S, L)],
        triadic: [hueToHex(H, S, L), hueToHex(H + 120, S, L), hueToHex(H + 240, S, L)]
    };
}

// ====================================
// Colorblind-safe palette generator
// ====================================
function generateSafePalette(count) {
    count = count || 5;
    const palette = [];
    let attempts = 0;
    let hueStart = Math.random() * 360;
    while (palette.length < count && attempts < 200) {
        attempts++;
        const h = (hueStart + (palette.length * (360 / count)) + (Math.random() * 10 - 5) + 360) % 360;
        const candidate = hueToHex(h, 65, 50);
        const okAgainstAll = palette.every(existing => {
            return ['protanopia', 'deuteranopia', 'tritanopia'].every(mode => {
                const a = simulateHex(candidate, mode, 100);
                const b = simulateHex(existing, mode, 100);
                return colorDistance(a, b) > 45;
            });
        });
        if (okAgainstAll) {
            palette.push(candidate);
        } else {
            hueStart += 7; // nudge and retry
        }
    }
    return palette;
}

// ====================================
// Danger pairs
// ====================================
const DANGER_REFERENCE_COLORS = [
    ['Red', '#E74C3C'], ['Green', '#2ECC71'], ['Brown', '#A52A2A'],
    ['Orange', '#E67E22'], ['Blue', '#3498DB'], ['Purple', '#9B59B6']
];
function checkDangerPairs(hex) {
    const results = [];
    ['protanopia', 'deuteranopia', 'tritanopia'].forEach(mode => {
        const simSelf = simulateHex(hex, mode, 100);
        DANGER_REFERENCE_COLORS.forEach(([name, refHex]) => {
            if (refHex.toUpperCase() === hex.toUpperCase()) return;
            const simRef = simulateHex(refHex, mode, 100);
            const dist = colorDistance(simSelf, simRef);
            if (dist < 30) {
                results.push({ mode, name, dist });
            }
        });
    });
    return results;
}

// ====================================
// Core Update Function (color picker)
// ====================================
let recentColorTimer = null;
function updateColor(source, newH, newS, newL) {
    H = newH !== undefined ? newH : H;
    S = newS !== undefined ? newS : S;
    L = newL !== undefined ? newL : L;
    H = Math.max(0, Math.min(360, H));
    S = Math.max(0, Math.min(100, S));
    L = Math.max(0, Math.min(100, L));
    const [R, G, B] = hslToRgb(H, S, L);
    const hex = rgbToHex(R, G, B).toUpperCase();
    if (source !== 'slider') {
        hRange.value = H;
        sRange.value = S;
        lRange.value = L;
    }
    hValue.textContent = H;
    sValue.textContent = S + '%';
    lValue.textContent = L + '%';
    if (source !== 'hex') {
        hexInput.value = hex;
    }
    rgbInput.value = `${R}, ${G}, ${B}`;
    hslInput.value = `${H}, ${S}%, ${L}%`;
    if(uploadedImage.style.display !== 'block') {
        preview.style.backgroundColor = `hsl(${H}, ${S}%, ${L}%)`;
    }
    if (source !== 'image' && source !== 'clear') {
        preview.classList.remove('pulse');
        void preview.offsetWidth;
        preview.classList.add('pulse');
    }
    // New: color name, danger pairs, harmony
    if (colorNameValue) colorNameValue.textContent = closestColorName(hex);
    renderDangerPairs(hex);
    renderHarmonies();
    // Debounce adding to "recent colors" so dragging a slider doesn't spam the list
    clearTimeout(recentColorTimer);
    recentColorTimer = setTimeout(() => addRecentColor(hex), 600);
}

// ====================================
// Recent colors / Favorites
// ====================================
function addRecentColor(hex) {
    recentColors = recentColors.filter(c => c !== hex);
    recentColors.unshift(hex);
    recentColors = recentColors.slice(0, 12);
    saveList('cvp_recent_colors', recentColors);
    renderSwatchLists();
}
function toggleFavorite(hex) {
    if (favoriteColors.includes(hex)) {
        favoriteColors = favoriteColors.filter(c => c !== hex);
    } else {
        favoriteColors.unshift(hex);
        favoriteColors = favoriteColors.slice(0, 20);
        unlockAchievement('favorite_color');
    }
    saveList('cvp_favorite_colors', favoriteColors);
    renderSwatchLists();
}
function makeSwatch(hex, options) {
    options = options || {};
    const div = document.createElement('div');
    div.className = 'swatch';
    div.style.backgroundColor = hex;
    div.title = hex;
    div.setAttribute('role', 'button');
    div.setAttribute('tabindex', '0');
    div.setAttribute('aria-label', 'Use color ' + hex);
    const applyColor = () => {
        const [h, s, l] = hexToHsl(hex);
        updateColor('swatch', h, s, l);
    };
    div.addEventListener('click', applyColor);
    div.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); applyColor(); } });
    if (options.favToggle) {
        const star = document.createElement('span');
        star.className = 'fav-star';
        star.textContent = favoriteColors.includes(hex) ? '★' : '☆';
        star.title = 'Toggle favorite';
        star.addEventListener('click', (e) => { e.stopPropagation(); toggleFavorite(hex); });
        div.appendChild(star);
    }
    return div;
}
function renderSwatchLists() {
    if (recentSwatches) {
        recentSwatches.innerHTML = '';
        recentColors.forEach(hex => recentSwatches.appendChild(makeSwatch(hex, { favToggle: true })));
    }
    if (favoriteSwatches) {
        favoriteSwatches.innerHTML = '';
        favoriteColors.forEach(hex => favoriteSwatches.appendChild(makeSwatch(hex, { favToggle: true })));
    }
}

// ====================================
// Danger pairs rendering
// ====================================
function renderDangerPairs(hex) {
    if (!dangerPairsBox) return;
    const results = checkDangerPairs(hex);
    dangerPairsBox.innerHTML = '';
    dangerPairsBox.classList.add('visible');
    if (results.length === 0) {
        const p = document.createElement('p');
        p.className = 'safe-note';
        p.textContent = '✓ No common confusions detected for this color.';
        dangerPairsBox.appendChild(p);
        return;
    }
    const seenModes = new Set();
    results.forEach(r => {
        seenModes.add(r.mode);
    });
    seenModes.forEach(mode => {
        const namesForMode = results.filter(r => r.mode === mode).map(r => r.name);
        const p = document.createElement('p');
        p.className = 'danger-warning';
        p.textContent = `⚠ Under ${mode}, this color may be confused with: ${namesForMode.join(', ')}.`;
        dangerPairsBox.appendChild(p);
    });
}

// ====================================
// Contrast checker rendering
// ====================================
function updateContrastChecker() {
    if (!contrastColor1 || !contrastColor2) return;
    const c1 = contrastColor1.value, c2 = contrastColor2.value;
    if (!/^#[0-9A-Fa-f]{6}$/.test(c1) || !/^#[0-9A-Fa-f]{6}$/.test(c2)) return;
    const ratio = contrastRatio(c1, c2);
    if (!ratio) return;
    contrastPreview.style.backgroundColor = c2;
    contrastPreview.style.color = c1;
    const rounded = ratio.toFixed(2);
    const aaNormal = ratio >= 4.5, aaLarge = ratio >= 3, aaaNormal = ratio >= 7, aaaLarge = ratio >= 4.5;
    contrastResultText.innerHTML =
        `Ratio: <strong>${rounded}:1</strong><br>` +
        `AA Normal Text <span class="contrast-badge ${aaNormal ? 'badge-pass' : 'badge-fail'}">${aaNormal ? 'PASS' : 'FAIL'}</span> ` +
        `AA Large Text <span class="contrast-badge ${aaLarge ? 'badge-pass' : 'badge-fail'}">${aaLarge ? 'PASS' : 'FAIL'}</span><br>` +
        `AAA Normal Text <span class="contrast-badge ${aaaNormal ? 'badge-pass' : 'badge-fail'}">${aaaNormal ? 'PASS' : 'FAIL'}</span> ` +
        `AAA Large Text <span class="contrast-badge ${aaaLarge ? 'badge-pass' : 'badge-fail'}">${aaaLarge ? 'PASS' : 'FAIL'}</span>`;
}

// ====================================
// Harmony rendering
// ====================================
function renderHarmonies() {
    if (!complementarySwatches) return;
    const h = getHarmonies();
    complementarySwatches.innerHTML = '';
    h.complementary.forEach(hex => complementarySwatches.appendChild(makeSwatch(hex)));
    analogousSwatches.innerHTML = '';
    h.analogous.forEach(hex => analogousSwatches.appendChild(makeSwatch(hex)));
    triadicSwatches.innerHTML = '';
    h.triadic.forEach(hex => triadicSwatches.appendChild(makeSwatch(hex)));
}

// ====================================
// Export functions
// ====================================
function downloadTextFile(filename, content, mime) {
    const blob = new Blob([content], { type: mime || 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
function exportCssVariables() {
    let lines = [':root {'];
    recentColors.forEach((hex, i) => lines.push(`  --recent-${i + 1}: ${hex};`));
    favoriteColors.forEach((hex, i) => lines.push(`  --favorite-${i + 1}: ${hex};`));
    lines.push('}');
    downloadTextFile('colorview-palette.css', lines.join('\n'), 'text/css');
    unlockAchievement('exported_palette');
}
function exportJsonPalette() {
    const data = { recent: recentColors, favorites: favoriteColors, exportedAt: new Date().toISOString() };
    downloadTextFile('colorview-palette.json', JSON.stringify(data, null, 2), 'application/json');
    unlockAchievement('exported_palette');
}
function exportSwatchPng() {
    const colors = favoriteColors.length ? favoriteColors : recentColors;
    if (!colors.length) return;
    const size = 80;
    const canvas = document.createElement('canvas');
    canvas.width = size * colors.length;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    colors.forEach((hex, i) => {
        ctx.fillStyle = hex;
        ctx.fillRect(i * size, 0, size, size);
    });
    canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'colorview-swatches.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
    unlockAchievement('exported_palette');
}

// ====================================
// Image handling helpers
// ====================================
function handleImageFile(file, callback) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => callback(e.target.result);
    reader.readAsDataURL(file);
}
function setUploadedImage(dataUrl) {
    uploadedImage.src = dataUrl;
    uploadedImage.style.display = 'block';
    clearImageBtn.style.display = 'block';
    preview.style.backgroundColor = 'transparent';
    lastUploadedDataUrl = dataUrl;
    imageCaption.style.display = 'block';
    panelOriginal.src = dataUrl;
    panelSimulated.src = dataUrl;
    panelCorrected.src = dataUrl;
    threePanelView.classList.add('active');
    updateCorrectedFilter();
    addImageToHistory(dataUrl);
    unlockAchievement('uploaded_image');
    updateColor('image', H, S, L);
}
function updateCorrectedFilter() {
    const mode = colorblindSelect.value;
    let correctionFilter = 'none';
    if (mode.startsWith('protan')) correctionFilter = "url('#correctProtan')";
    else if (mode.startsWith('deuteran')) correctionFilter = "url('#correctDeutan')";
    else if (mode.startsWith('tritan')) correctionFilter = "url('#correctTritan')";
    panelCorrected.style.filter = correctionFilter;
    panelSimulated.style.filter = 'var(--filter-colorblind)';
}

// --- Drag & drop + paste ---
if (imageDropZone) {
    ['dragover', 'dragenter'].forEach(evt => {
        imageDropZone.addEventListener(evt, (e) => { e.preventDefault(); imageDropZone.classList.add('dragover'); });
    });
    ['dragleave', 'drop'].forEach(evt => {
        imageDropZone.addEventListener(evt, (e) => { e.preventDefault(); imageDropZone.classList.remove('dragover'); });
    });
    imageDropZone.addEventListener('drop', (e) => {
        const file = e.dataTransfer.files && e.dataTransfer.files[0];
        if (file) handleImageFile(file, setUploadedImage);
    });
}
document.addEventListener('paste', (e) => {
    const items = e.clipboardData && e.clipboardData.items;
    if (!items) return;
    for (const item of items) {
        if (item.type.startsWith('image/')) {
            const file = item.getAsFile();
            handleImageFile(file, setUploadedImage);
            break;
        }
    }
});

// --- Local image history (device-only) ---
function addImageToHistory(dataUrl) {
    imageHistory = imageHistory.filter(d => d !== dataUrl);
    imageHistory.unshift(dataUrl);
    imageHistory = imageHistory.slice(0, 5); // keep storage small
    saveList('cvp_image_history', imageHistory);
    renderImageHistory();
}
function renderImageHistory() {
    if (!imageHistoryGallery) return;
    imageHistoryGallery.innerHTML = '';
    imageHistory.forEach(dataUrl => {
        const img = document.createElement('img');
        img.src = dataUrl;
        img.alt = 'Previously uploaded image';
        img.addEventListener('click', () => setUploadedImage(dataUrl));
        imageHistoryGallery.appendChild(img);
    });
}

// --- Webcam ---
async function toggleWebcam() {
    if (webcamStream) {
        webcamStream.getTracks().forEach(t => t.stop());
        webcamStream = null;
        webcamVideo.style.display = 'none';
        webcamVideo.srcObject = null;
        return;
    }
    try {
        webcamStream = await navigator.mediaDevices.getUserMedia({ video: true });
        webcamVideo.srcObject = webcamStream;
        webcamVideo.style.display = 'block';
        webcamVideo.style.filter = 'var(--filter-colorblind)';
        unlockAchievement('used_webcam');
    } catch (err) {
        alert('Could not access the camera. Please check your browser permissions.');
    }
}
if (webcamBtn) webcamBtn.addEventListener('click', toggleWebcam);

// --- Batch upload ---
if (batchUploadBtn) batchUploadBtn.addEventListener('click', () => batchImageUpload.click());
if (batchImageUpload) {
    batchImageUpload.addEventListener('change', (e) => {
        const files = Array.from(e.target.files || []);
        batchGallery.innerHTML = '';
        files.forEach(file => {
            handleImageFile(file, (dataUrl) => {
                const img = document.createElement('img');
                img.src = dataUrl;
                img.alt = 'Batch uploaded image, simulated';
                img.addEventListener('click', () => setUploadedImage(dataUrl));
                batchGallery.appendChild(img);
            });
        });
        if (files.length) unlockAchievement('used_batch');
    });
}

// --- Download simulated result (uses Canvas 2D filter where supported) ---
function downloadSimulatedResult() {
    if (!lastUploadedDataUrl) { alert('Upload an image first.'); return; }
    const img = new Image();
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        try {
            ctx.filter = getComputedStyle(document.documentElement).getPropertyValue('--filter-colorblind') || 'none';
        } catch (e) { /* Canvas filter with SVG url not supported in this browser */ }
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'colorview-simulated.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    };
    img.src = lastUploadedDataUrl;
    unlockAchievement('downloaded_result');
}
if (downloadSimBtn) downloadSimBtn.addEventListener('click', downloadSimulatedResult);

// --- Before/After share card ---
function generateShareCard() {
    if (!lastUploadedDataUrl) { alert('Upload an image first.'); return; }
    const img = new Image();
    img.onload = () => {
        const w = img.naturalWidth, h = img.naturalHeight;
        const canvas = document.createElement('canvas');
        canvas.width = w * 2 + 20;
        canvas.height = h + 60;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 40, w, h);
        try { ctx.filter = getComputedStyle(document.documentElement).getPropertyValue('--filter-colorblind') || 'none'; } catch (e) {}
        ctx.drawImage(img, w + 20, 40, w, h);
        ctx.filter = 'none';
        ctx.fillStyle = '#2c3e50';
        ctx.font = 'bold 20px sans-serif';
        ctx.fillText('Original', 10, 28);
        ctx.fillText('Simulated (' + colorblindSelect.value + ')', w + 30, 28);
        canvas.toBlob(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'colorview-before-after.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    };
    img.src = lastUploadedDataUrl;
    unlockAchievement('shared_card');
}
if (shareCardBtn) shareCardBtn.addEventListener('click', generateShareCard);

// --- Chart / graph checker ---
function checkChartColors(dataUrl) {
    const img = new Image();
    img.onload = () => {
        const canvas = document.createElement('canvas');
        const scale = Math.min(1, 200 / img.naturalWidth);
        canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        let data;
        try {
            data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        } catch (e) {
            chartCheckerResult.textContent = 'Could not analyze this image (it may be from a different origin).';
            return;
        }
        // Sample pixels and bucket into a small set of dominant colors
        const buckets = {};
        for (let i = 0; i < data.length; i += 4 * 5) {
            const r = data[i], g = data[i+1], b = data[i+2], a = data[i+3];
            if (a < 200) continue;
            // Skip near-white/near-black (backgrounds/text)
            if ((r > 235 && g > 235 && b > 235) || (r < 25 && g < 25 && b < 25)) continue;
            const key = [Math.round(r/24)*24, Math.round(g/24)*24, Math.round(b/24)*24].join(',');
            buckets[key] = (buckets[key] || 0) + 1;
        }
        const sorted = Object.entries(buckets).sort((a, b) => b[1] - a[1]).slice(0, 6);
        const dominant = sorted.map(([key]) => {
            const [r, g, b] = key.split(',').map(Number);
            return rgbToHex(r, g, b);
        });
        if (dominant.length < 2) {
            chartCheckerResult.innerHTML = '<p>Not enough distinct colors detected to check.</p>';
            return;
        }
        let warnings = [];
        ['protanopia', 'deuteranopia', 'tritanopia'].forEach(mode => {
            for (let i = 0; i < dominant.length; i++) {
                for (let j = i + 1; j < dominant.length; j++) {
                    const simA = simulateHex(dominant[i], mode, 100);
                    const simB = simulateHex(dominant[j], mode, 100);
                    if (colorDistance(simA, simB) < 30) {
                        warnings.push(`${mode}: colors ${dominant[i]} and ${dominant[j]} may look alike.`);
                    }
                }
            }
        });
        let html = '<div class="swatch-row">' + dominant.map(c => `<div class="swatch" style="background:${c};" title="${c}"></div>`).join('') + '</div>';
        if (warnings.length) {
            html += '<p class="danger-warning" style="margin-top:8px;">⚠ ' + warnings.slice(0, 4).join('<br>⚠ ') + '</p>';
        } else {
            html += '<p class="safe-note" style="margin-top:8px;">✓ These dominant colors stay reasonably distinguishable across the simulated modes.</p>';
        }
        chartCheckerResult.innerHTML = html;
        unlockAchievement('checked_chart');
    };
    img.src = dataUrl;
}
if (chartUpload) {
    chartUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) handleImageFile(file, checkChartColors);
    });
}

// ====================================
// Eyedropper
// ====================================
if (eyedropperBtn) {
    eyedropperBtn.addEventListener('click', async () => {
        if (!('EyeDropper' in window)) {
            alert('Your browser does not support the Eyedropper tool yet (try a recent Chrome/Edge).');
            return;
        }
        try {
            const eyeDropper = new EyeDropper();
            const result = await eyeDropper.open();
            const [h, s, l] = hexToHsl(result.sRGBHex);
            updateColor('hex', h, s, l);
            hexInput.value = result.sRGBHex.toUpperCase();
            unlockAchievement('used_eyedropper');
        } catch (e) { /* user cancelled */ }
    });
}
if (favBtn) {
    favBtn.addEventListener('click', () => toggleFavorite(hexInput.value.toUpperCase()));
}

// ====================================
// Fun extras: color fact of the day
// ====================================
function showColorFact() {
    const langCode = localStorage.getItem('cvp_language') || 'en';
    const facts = translations[langCode].facts;
    const dayIndex = Math.floor(Date.now() / 86400000) % facts.length;
    colorFactText.textContent = facts[dayIndex];
    const dismissedDay = localStorage.getItem('cvp_fact_dismissed_day');
    const todayKey = String(Math.floor(Date.now() / 86400000));
    colorFactBanner.style.display = dismissedDay === todayKey ? 'none' : 'flex';
}
if (colorFactCloseBtn) {
    colorFactCloseBtn.addEventListener('click', () => {
        colorFactBanner.style.display = 'none';
        localStorage.setItem('cvp_fact_dismissed_day', String(Math.floor(Date.now() / 86400000)));
    });
}

// ====================================
// Fun extras: achievements
// ====================================
const ACHIEVEMENT_IDS = [
    'uploaded_image', 'used_eyedropper', 'favorite_color', 'tried_all_modes',
    'used_webcam', 'used_batch', 'exported_palette', 'checked_chart',
    'downloaded_result', 'shared_card', 'dark_mode_used', 'custom_theme_used'
];
function currentLangData() {
    const code = localStorage.getItem('cvp_language') || 'en';
    return translations[code] || translations.en;
}
let seenModes = new Set(loadList('cvp_seen_modes'));
function unlockAchievement(id) {
    if (unlockedAchievements.includes(id)) { renderAchievements(); return; }
    unlockedAchievements.push(id);
    saveList('cvp_achievements', unlockedAchievements);
    renderAchievements();
    const lang = currentLangData();
    const label = (lang.achievements && lang.achievements[id]) || id;
    showAchievementToast(label);
}
function showAchievementToast(text) {
    const lang = currentLangData();
    achievementToast.textContent = (lang.achievement_unlocked_prefix || 'Achievement unlocked: ') + text;
    achievementToast.classList.add('show');
    setTimeout(() => achievementToast.classList.remove('show'), 3000);
}
function renderAchievements() {
    if (!achievementsBar) return;
    const lang = currentLangData();
    achievementsBar.innerHTML = '';
    ACHIEVEMENT_IDS.forEach(id => {
        const chip = document.createElement('span');
        const isUnlocked = unlockedAchievements.includes(id);
        chip.className = 'badge-chip' + (isUnlocked ? ' unlocked' : '');
        chip.textContent = (lang.achievements && lang.achievements[id]) || id;
        chip.title = isUnlocked ? (lang.unlocked_label || 'Unlocked') : (lang.locked_label || 'Locked');
        achievementsBar.appendChild(chip);
    });
}
function trackModeUsage(mode) {
    seenModes.add(mode);
    saveList('cvp_seen_modes', Array.from(seenModes));
    const allModes = ['protanopia','protanomaly','deuteranopia','deuteranomaly','tritanopia','tritanomaly','achromatopsia','achromatomaly'];
    if (allModes.every(m => seenModes.has(m))) unlockAchievement('tried_all_modes');
}

// ====================================
// Accessibility: font size, dyslexia font, reduce motion
// ====================================
function setFontSize(size) {
    htmlEl.setAttribute('data-font-size', size);
    localStorage.setItem('cvp_font_size', size);
}
if (fontSmallBtn) fontSmallBtn.addEventListener('click', () => setFontSize('small'));
if (fontMediumBtn) fontMediumBtn.addEventListener('click', () => setFontSize('medium'));
if (fontLargeBtn) fontLargeBtn.addEventListener('click', () => setFontSize('large'));
if (dyslexiaFontToggle) {
    dyslexiaFontToggle.addEventListener('change', () => {
        body.classList.toggle('dyslexia-font', dyslexiaFontToggle.checked);
        localStorage.setItem('cvp_dyslexia_font', dyslexiaFontToggle.checked ? 'true' : 'false');
    });
}
if (reduceMotionToggle) {
    reduceMotionToggle.addEventListener('change', () => {
        body.classList.toggle('reduce-motion', reduceMotionToggle.checked);
        localStorage.setItem('cvp_reduce_motion', reduceMotionToggle.checked ? 'true' : 'false');
    });
}

// ====================================
// Personalization: "my condition" + custom theme
// ====================================
if (myConditionSelect) {
    myConditionSelect.addEventListener('change', () => {
        const cond = myConditionSelect.value;
        localStorage.setItem('cvp_my_condition', cond);
        if (cond !== 'none') {
            colorblindSelect.value = cond;
            colorblindSelect.dispatchEvent(new Event('change'));
        }
    });
}
function applyCustomTheme(accentHex) {
    body.classList.remove('light-mode', 'dark-mode');
    document.documentElement.style.setProperty('--color-accent', accentHex);
    document.documentElement.style.setProperty('--color-bg', '#f8f8f8');
    document.documentElement.style.setProperty('--color-surface', '#ffffff');
    document.documentElement.style.setProperty('--color-text', '#2c3e50');
    document.documentElement.style.setProperty('--color-border', '#ecf0f1');
    document.documentElement.style.setProperty('--logo-color-light', accentHex);
    logoImage.src = 'logo.png';
    localStorage.setItem('cvp_theme', 'custom');
    localStorage.setItem('cvp_custom_accent', accentHex);
    unlockAchievement('custom_theme_used');
}
if (customModeBtn) {
    customModeBtn.addEventListener('click', () => applyCustomTheme(customAccentInput.value));
}
if (customAccentInput) {
    customAccentInput.addEventListener('input', () => {
        if (localStorage.getItem('cvp_theme') === 'custom') applyCustomTheme(customAccentInput.value);
    });
}

// ====================================
// Whole-site filter toggle
// ====================================
if (wholeSiteToggle) {
    wholeSiteToggle.addEventListener('change', () => {
        body.classList.toggle('whole-site-filter', wholeSiteToggle.checked);
    });
}

// ====================================
// Register service worker (PWA / offline)
// ====================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(() => { /* offline support unavailable */ });
    });
}

// ====================================
// UI Update Function (i18n)
// ====================================
function updateUIContent(langCode) {
    const lang = translations[langCode] || translations.en;
    const modeVal = colorblindSelect.value;
    document.body.dir = lang.dir;
    document.getElementById('main-content-title').textContent = lang.main_title;
    document.getElementById('hsl-controls-title').textContent = lang.hsl_controls;
    document.getElementById('simulation-area-title').textContent = lang.simulation_title;
    document.getElementById('simulation-desc').textContent = lang.simulation_desc;
    document.getElementById('normal-vision-test').textContent = lang.normal_vision;
    document.getElementById('deuteranopia-test').textContent = lang.deuteranopia;
    document.getElementById('protanopia-test').textContent = lang.protanopia;
    document.getElementById('settings-h2').textContent = lang.settings_h2;
    document.getElementById('theme-h3').textContent = lang.theme_h3;
    document.getElementById('language-h3').textContent = lang.language_h3;
    document.getElementById('layout-h3').textContent = lang.layout_h3;
    lightModeBtn.textContent = lang.light_mode;
    darkModeBtn.textContent = lang.dark_mode;
    if (customModeBtn) customModeBtn.textContent = lang.custom_mode;
    pcLayoutBtn.textContent = lang.pc_layout;
    mobileLayoutBtn.textContent = lang.mobile_layout;
    uploadBtn.textContent = lang.upload_btn;
    clearImageBtn.textContent = lang.clear_btn;
    singleLineFooter.textContent = lang.single_line_footer;
    disclaimerText.textContent = lang.disclaimer;
    disclaimerOkBtn.textContent = lang.disclaimer_ok;
    disclaimerNeverBtn.textContent = lang.disclaimer_never;
    // New elements
    const setText = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
    setText('dangerPairsTitle', lang.danger_pairs_title);
    setText('contrastTitle', lang.contrast_title);
    setText('paletteTitle', lang.palette_title);
    setText('generatePaletteBtn', lang.generate);
    setText('harmonyTitle', lang.harmony_title);
    setText('complementaryLabel', lang.complementary);
    setText('analogousLabel', lang.analogous);
    setText('triadicLabel', lang.triadic);
    setText('recentTitle', lang.recent_title);
    setText('favoritesTitle', lang.favorites_title);
    setText('exportCssBtn', lang.export_css);
    setText('exportJsonBtn', lang.export_json);
    setText('exportPngBtn', lang.export_png);
    setText('wholeSiteLabel', lang.whole_site_label);
    setText('imageToolsTitle', lang.image_tools_title);
    setText('webcamBtn', lang.webcam_btn);
    setText('batchUploadBtn', lang.batch_btn);
    setText('downloadSimBtn', lang.download_btn);
    setText('shareCardBtn', lang.share_card_btn);
    setText('chartCheckerTitle', lang.chart_checker_title);
    setText('accessibilityH3', lang.accessibility_h3);
    setText('dyslexiaFontLabel', lang.dyslexia_font_label);
    setText('reduceMotionLabel', lang.reduce_motion_label);
    setText('personalizationH3', lang.personalization_h3);
    setText('myConditionLabel', lang.my_condition_label);
    setText('imageHistoryLabel', lang.image_history_label);
    setText('aboutH3', lang.about_h3);
    if (imageDropZone) imageDropZone.textContent = lang.drop_zone;
    if (chartCheckerResult && !chartCheckerResult.querySelector('.swatch-row')) {
        chartCheckerResult.textContent = lang.chart_checker_placeholder;
    }
    // Previously untranslated elements
    setText('closestNameLabel', lang.closest_name);
    setText('dangerPairsDesc', lang.danger_pairs_desc);
    setText('foregroundLabel', lang.foreground);
    setText('backgroundLabel', lang.background);
    setText('chartUploadLabel', lang.chart_upload_btn);
    setText('customAccentLabel', lang.custom_accent_label);
    setText('aboutText', lang.about_text);
    setText('aboutCredit', lang.about_credit);
    // Dropdown option text
    const so = lang.select_options;
    if (so) {
        setText('opt-cb-none', so.none_full);
        setText('opt-cb-protanopia', so.protanopia_full);
        setText('opt-cb-protanomaly', so.protanomaly_full);
        setText('opt-cb-deuteranopia', so.deuteranopia_full);
        setText('opt-cb-deuteranomaly', so.deuteranomaly_full);
        setText('opt-cb-tritanopia', so.tritanopia_full);
        setText('opt-cb-tritanomaly', so.tritanomaly_full);
        setText('opt-cb-achromatopsia', so.achromatopsia_full);
        setText('opt-cb-achromatomaly', so.achromatomaly_full);
        setText('opt-mc-none', so.none_short);
        setText('opt-mc-protanopia', so.protanopia_short);
        setText('opt-mc-protanomaly', so.protanomaly_short);
        setText('opt-mc-deuteranopia', so.deuteranopia_short);
        setText('opt-mc-deuteranomaly', so.deuteranomaly_short);
        setText('opt-mc-tritanopia', so.tritanopia_short);
        setText('opt-mc-tritanomaly', so.tritanomaly_short);
        setText('opt-mc-achromatopsia', so.achromatopsia_short);
    }
    renderAchievements();
    updateModeInfo(modeVal, lang);
    languageSelect.innerHTML = '';
    lang.lang_options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.code;
        opt.textContent = option.name;
        languageSelect.appendChild(opt);
    });
    languageSelect.value = langCode;
    localStorage.setItem('cvp_language', langCode);
    showColorFact();
}
function updateModeInfo(mode, currentLang) {
    const lang = currentLang || translations[localStorage.getItem('cvp_language') || 'en'];
    const info = lang.info[mode] || lang.info.none;
    modeInfoTitle.textContent = info.title;
    modeInfoList.innerHTML = '';
    info.points.forEach(pointText => {
        const li = document.createElement('li');
        li.textContent = pointText;
        modeInfoList.appendChild(li);
    });
}

// ====================================
// Layout Control
// ====================================
function setLayout(layoutMode) {
    if (layoutMode === 'mobile') {
        body.classList.add('mobile-layout');
        mobileLayoutBtn.classList.add('active');
        pcLayoutBtn.classList.remove('active');
        localStorage.setItem('cvp_layout', 'mobile');
    } else {
        body.classList.remove('mobile-layout');
        pcLayoutBtn.classList.add('active');
        mobileLayoutBtn.classList.remove('active');
        localStorage.setItem('cvp_layout', 'pc');
    }
}

// -----------------------------------
// Event Listeners
// -----------------------------------
[hRange, sRange, lRange].forEach(slider => {
    slider.addEventListener('input', () => {
        updateColor('slider', parseInt(hRange.value), parseInt(sRange.value), parseInt(lRange.value));
    });
});
hexInput.addEventListener('input', (e) => {
    let val = e.target.value.toUpperCase().replace(/[^0-9A-F#]/g, '');
    if (!val.startsWith('#')) val = '#' + val.replace('#', '');
    if (val.length > 7) val = val.substring(0, 7);
    hexInput.value = val;
    if (val.length === 7) {
        const [newH, newS, newL] = hexToHsl(val);
        updateColor('hex', newH, newS, newL);
    }
});
uploadBtn.addEventListener('click', () => imageUpload.click());
clearImageBtn.addEventListener('click', () => {
    uploadedImage.src = '';
    uploadedImage.style.display = 'none';
    clearImageBtn.style.display = 'none';
    imageCaption.style.display = 'none';
    imageCaption.value = '';
    threePanelView.classList.remove('active');
    lastUploadedDataUrl = null;
    updateColor('clear', H, S, L);
});
imageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleImageFile(file, setUploadedImage);
});
function setTheme(mode) {
    body.classList.remove('light-mode', 'dark-mode');
    document.documentElement.style.removeProperty('--color-accent');
    document.documentElement.style.removeProperty('--color-bg');
    document.documentElement.style.removeProperty('--color-surface');
    document.documentElement.style.removeProperty('--color-text');
    document.documentElement.style.removeProperty('--color-border');
    document.documentElement.style.removeProperty('--logo-color-light');
    body.classList.add(mode);
    if (mode === 'dark-mode') {
        logoImage.src = 'logo-dark.png';
        unlockAchievement('dark_mode_used');
    } else {
        logoImage.src = 'logo.png';
    }
    localStorage.setItem('cvp_theme', mode);
}
lightModeBtn.addEventListener('click', () => setTheme('light-mode'));
darkModeBtn.addEventListener('click', () => setTheme('dark-mode'));
languageSelect.addEventListener('change', (e) => updateUIContent(e.target.value));
pcLayoutBtn.addEventListener('click', () => setLayout('pc'));
mobileLayoutBtn.addEventListener('click', () => setLayout('mobile'));
settingsBtn.addEventListener('click', () => settingsDrawer.classList.toggle('open'));
document.addEventListener('click', (e) => {
    if (settingsDrawer.classList.contains('open') &&
        !settingsDrawer.contains(e.target) &&
        e.target !== settingsBtn &&
        !settingsBtn.contains(e.target)) {
        settingsDrawer.classList.remove('open');
    }
});
function checkAndShowDisclaimer() {
    const neverShow = localStorage.getItem('cvp_disclaimer_hidden') === 'true';
    disclaimerPanel.style.display = neverShow ? 'none' : 'flex';
}
disclaimerOkBtn.addEventListener('click', () => { disclaimerPanel.style.display = 'none'; });
disclaimerNeverBtn.addEventListener('click', () => {
    localStorage.setItem('cvp_disclaimer_hidden', 'true');
    disclaimerPanel.style.display = 'none';
});
colorblindSelect.addEventListener('change', (e) => {
    const mode = e.target.value;
    currentMode = mode;
    const defaultSeverity = mode === 'none' ? 0 : (mode.includes('anomaly') ? 50 : 100);
    severityRange.value = defaultSeverity;
    severityValue.textContent = defaultSeverity + '%';
    applySimulationMode(mode, defaultSeverity);
    updateModeInfo(mode);
    updateCorrectedFilter();
    if (mode !== 'none') trackModeUsage(mode);
});
severityRange.addEventListener('input', () => {
    severityValue.textContent = severityRange.value + '%';
    applySimulationMode(colorblindSelect.value, parseInt(severityRange.value));
    updateCorrectedFilter();
});
if (contrastColor1) contrastColor1.addEventListener('input', updateContrastChecker);
if (contrastColor2) contrastColor2.addEventListener('input', updateContrastChecker);
if (generatePaletteBtn) {
    generatePaletteBtn.addEventListener('click', () => {
        const palette = generateSafePalette(5);
        paletteSwatchRow.innerHTML = '';
        palette.forEach(hex => paletteSwatchRow.appendChild(makeSwatch(hex, { favToggle: true })));
    });
}
if (exportCssBtn) exportCssBtn.addEventListener('click', exportCssVariables);
if (exportJsonBtn) exportJsonBtn.addEventListener('click', exportJsonPalette);
if (exportPngBtn) exportPngBtn.addEventListener('click', exportSwatchPng);

// ====================================
// Initialization
// ====================================
updateColor('init', H, S, L);
renderSwatchLists();
renderAchievements();

const storedLang = localStorage.getItem('cvp_language') || 'en';
updateUIContent(storedLang);

const storedTheme = localStorage.getItem('cvp_theme') || 'light-mode';
if (storedTheme === 'custom') {
    const storedAccent = localStorage.getItem('cvp_custom_accent') || '#3498db';
    customAccentInput.value = storedAccent;
    setTimeout(() => applyCustomTheme(storedAccent), 0);
} else {
    setTimeout(() => setTheme(storedTheme), 0);
}

const storedLayout = localStorage.getItem('cvp_layout') || 'pc';
setLayout(storedLayout);

checkAndShowDisclaimer();
updateModeInfo(colorblindSelect.value);
updateContrastChecker();
renderImageHistory();

// Restore accessibility + personalization preferences
const storedFontSize = localStorage.getItem('cvp_font_size') || 'medium';
setFontSize(storedFontSize);
if (localStorage.getItem('cvp_dyslexia_font') === 'true') {
    dyslexiaFontToggle.checked = true;
    body.classList.add('dyslexia-font');
}
if (localStorage.getItem('cvp_reduce_motion') === 'true') {
    reduceMotionToggle.checked = true;
    body.classList.add('reduce-motion');
}
const storedCondition = localStorage.getItem('cvp_my_condition');
if (storedCondition) {
    myConditionSelect.value = storedCondition;
    if (storedCondition !== 'none') {
        colorblindSelect.value = storedCondition;
        colorblindSelect.dispatchEvent(new Event('change'));
    }
}

// Splash screen
splashLogo.src = storedTheme === 'dark-mode' ? 'logo-dark.png' : 'logo.png';
setTimeout(() => {
    splashScreen.style.opacity = '0';
    setTimeout(() => { splashScreen.style.display = 'none'; }, 500);
}, 2000);
