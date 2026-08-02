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
// New: color name search
const colorSearchInput = document.getElementById('colorSearchInput');
const colorSearchBtn = document.getElementById('colorSearchBtn');
const colorSearchMsg = document.getElementById('colorSearchMsg');
// New: accessibility audit
const auditImageUpload = document.getElementById('auditImageUpload');
const auditResult = document.getElementById('auditResult');
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
        color_search_label: 'Search by color name',
        color_search_placeholder: 'e.g. dark blue',
        color_search_not_found: 'No matching color name found in this language.',
        accessibility_audit_title: 'Accessibility Audit',
        accessibility_audit_desc: 'Upload a design or image to audit its dominant colors for text contrast (WCAG) and colorblind safety.',
        accessibility_audit_upload_btn: 'Upload Design',
        accessibility_audit_placeholder: 'Upload an image to run an accessibility audit.',
        audit_not_enough_colors: 'Not enough distinct colors detected to audit.',
        audit_contrast_title: 'Text Contrast (WCAG)',
        audit_cb_title: 'Colorblind Safety',
        audit_pass_aa: 'Passes AA for normal text (4.5:1+)',
        audit_pass_aa_large: 'Passes AA for large text/UI only (3:1+)',
        audit_fail_aa: 'Fails WCAG AA — too low contrast for text',
        audit_ratio_prefix: 'Contrast ratio: ',
        audit_low_contrast_intro: 'These color pairs may not have enough contrast for text:',
        audit_no_low_contrast: 'No low-contrast pairs detected among dominant colors.',
        audit_cb_warning_intro: 'These color pairs may look alike to colorblind viewers:',
        audit_cb_safe: 'Dominant colors stay distinguishable across colorblind simulations.',
        accessibility_h3: 'Accessibility',
        dyslexia_font_label: 'Dyslexia-friendly font',
        reduce_motion_label: 'Reduce motion',
        personalization_h3: 'Personalization',
        my_condition_label: 'My condition (auto-selects simulation):',
        image_history_label: 'Recent images (stored on this device only):',
        about_h3: 'About',
        about_text: 'Hello to everyone who opened this to know about us. We are 2 normal students, Nour Eldeen and Ahmed Sameh. We wanted to build something that helps the community, so we made ColorView Pro to help colorblind people and the people designing for them. You can pick colors with HEX, RGB and HSL, simulate 8 types of color blindness with adjustable severity, check contrast and safe palettes, and preview your own images and even your camera through each mode. We used AI tools to help us learn and move faster while building this. Thank you for trying it out — more updates are coming soon.',
        about_credit: '— Nour Eldeen & Ahmed Sameh',
        ishihara_modal_title: 'Colorblindness Self-Test',
        ishihara_intro_desc: 'Take a short test to see which type of color vision you might have. This uses generated plates, not a medical device.',
        ishihara_start_btn: 'Take the Test',
        ishihara_know_btn: 'I Know My Condition',
        ishihara_skip_btn: 'Skip',
        ishihara_question: 'What number do you see?',
        ishihara_cant_see: "I can't see a number",
        ishihara_skip_test_link: 'Skip test',
        ishihara_result_prefix: 'You have ',
        ishihara_result_normal: 'You have normal color vision!',
        ishihara_disclaimer: 'This is a fun self-check, not a medical diagnosis. See an eye care professional for an official diagnosis.',
        ishihara_apply_btn: 'Apply & Close',
        ishihara_retake_link: 'Retake test',
        ishihara_retake_settings_btn: 'Take the Colorblindness Test',
        danger_safe_note: '✓ No common confusions detected for this color.',
        danger_warning_template: '⚠ Under {mode}, this color may be confused with: {names}.',
        danger_colors: {
            Red: 'Red', Green: 'Green', Brown: 'Brown',
            Orange: 'Orange', Blue: 'Blue', Purple: 'Purple'
        },
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
            { code: 'ar', name: 'العربية' },
            { code: 'es', name: 'Español' },
            { code: 'ru', name: 'Русский' },
            { code: 'fr', name: 'Français' },
            { code: 'de', name: 'Deutsch' },
            { code: 'pt', name: 'Português' }
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
        color_search_label: 'البحث باسم اللون',
        color_search_placeholder: 'مثال: أزرق غامق',
        color_search_not_found: 'لم يتم العثور على اسم لون مطابق بهذه اللغة.',
        accessibility_audit_title: 'تدقيق إمكانية الوصول',
        accessibility_audit_desc: 'ارفع تصميمًا أو صورة لتدقيق ألوانها السائدة من حيث تباين النص (WCAG) وسلامتها لمرضى عمى الألوان.',
        accessibility_audit_upload_btn: 'رفع التصميم',
        accessibility_audit_placeholder: 'ارفع صورة لإجراء تدقيق إمكانية الوصول.',
        audit_not_enough_colors: 'لا توجد ألوان مميزة كافية لإجراء التدقيق.',
        audit_contrast_title: 'تباين النص (WCAG)',
        audit_cb_title: 'السلامة لمرضى عمى الألوان',
        audit_pass_aa: 'يجتاز معيار AA للنص العادي (4.5:1+)',
        audit_pass_aa_large: 'يجتاز معيار AA للنص الكبير/الواجهة فقط (3:1+)',
        audit_fail_aa: 'لا يجتاز معيار WCAG AA — تباين منخفض جدًا للنص',
        audit_ratio_prefix: 'نسبة التباين: ',
        audit_low_contrast_intro: 'قد لا تحتوي أزواج الألوان هذه على تباين كافٍ للنص:',
        audit_no_low_contrast: 'لم يتم رصد أزواج ألوان منخفضة التباين بين الألوان السائدة.',
        audit_cb_warning_intro: 'قد تبدو أزواج الألوان هذه متشابهة لمرضى عمى الألوان:',
        audit_cb_safe: 'تبقى الألوان السائدة مميزة عبر محاكاة عمى الألوان.',
        accessibility_h3: 'إمكانية الوصول',
        dyslexia_font_label: 'خط مناسب لعسر القراءة',
        reduce_motion_label: 'تقليل الحركة',
        personalization_h3: 'التخصيص',
        my_condition_label: 'حالتي (يحدد المحاكاة تلقائيًا):',
        image_history_label: 'الصور الأخيرة (محفوظة على هذا الجهاز فقط):',
        about_h3: 'عنّا',
        about_text: 'أهلاً بكل من فتح هذا ليعرف عنّا. نحن طالبان عاديان، نور الدين وأحمد سامح. أردنا أن نصنع شيئًا يفيد المجتمع، فصنعنا ColorView Pro لمساعدة مرضى عمى الألوان ومصممي المحتوى لهم. يمكنك اختيار الألوان بصيغ HEX وRGB وHSL، ومحاكاة 8 أنواع من عمى الألوان بشدة قابلة للتعديل، وفحص التباين والألوان الآمنة، ومعاينة صورك وحتى كاميرتك في كل وضع. استخدمنا أدوات الذكاء الاصطناعي لمساعدتنا على التعلم والعمل بشكل أسرع أثناء بناء هذا التطبيق. شكرًا لتجربته — المزيد من التحديثات قادم قريبًا.',
        about_credit: '— نور الدين وأحمد سامح',
        ishihara_modal_title: 'اختبار ذاتي لعمى الألوان',
        ishihara_intro_desc: 'أجرِ اختبارًا قصيرًا لمعرفة نوع رؤية الألوان الذي قد يكون لديك. يستخدم هذا لوحات منشأة وليس جهازًا طبيًا.',
        ishihara_start_btn: 'ابدأ الاختبار',
        ishihara_know_btn: 'أعرف حالتي',
        ishihara_skip_btn: 'تخطي',
        ishihara_question: 'ما الرقم الذي تراه؟',
        ishihara_cant_see: 'لا أستطيع رؤية رقم',
        ishihara_skip_test_link: 'تخطي الاختبار',
        ishihara_result_prefix: 'لديك ',
        ishihara_result_normal: 'لديك رؤية ألوان طبيعية!',
        ishihara_disclaimer: 'هذا فحص ذاتي للتسلية وليس تشخيصًا طبيًا. راجع طبيب عيون للحصول على تشخيص رسمي.',
        ishihara_apply_btn: 'تطبيق وإغلاق',
        ishihara_retake_link: 'إعادة الاختبار',
        ishihara_retake_settings_btn: 'إجراء اختبار عمى الألوان',
        danger_safe_note: '✓ لا توجد ألوان يسهل الخلط بينها وبين هذا اللون.',
        danger_warning_template: '⚠ في وضع {mode}، قد يُخلط هذا اللون مع: {names}.',
        danger_colors: {
            Red: 'أحمر', Green: 'أخضر', Brown: 'بني',
            Orange: 'برتقالي', Blue: 'أزرق', Purple: 'بنفسجي'
        },
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
            { code: 'ar', name: 'العربية' },
            { code: 'es', name: 'Español' },
            { code: 'ru', name: 'Русский' },
            { code: 'fr', name: 'Français' },
            { code: 'de', name: 'Deutsch' },
            { code: 'pt', name: 'Português' }
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
    },
    es: {
        dir: 'ltr',
        main_title: 'Selector de Color y Valores',
        hsl_controls: 'Controles HSL',
        simulation_title: 'Vista de Daltonismo',
        simulation_desc: 'Simula para un diseño accesible:',
        normal_vision: 'Prueba de Visión Normal',
        deuteranopia: 'Prueba de Deuteranopía',
        protanopia: 'Prueba de Protanopía',
        settings_h2: 'Configuración',
        theme_h3: 'Tema',
        light_mode: 'Modo Claro',
        dark_mode: 'Modo Oscuro',
        custom_mode: 'Personalizado',
        language_h3: 'Idioma',
        layout_h3: 'Diseño de Pantalla',
        pc_layout: 'Diseño de PC',
        mobile_layout: 'Diseño Móvil',
        upload_btn: 'Subir Imagen para Simulación',
        clear_btn: 'Borrar',
        single_line_footer: 'ColorView Pro creado por Ahmed Sameh y Nour Eldeen. | ColorView Pro © Todos los derechos reservados.',
        disclaimer: 'Para un mejor uso de esta función, deberías tener contigo a alguien que no sea daltónico',
        disclaimer_ok: 'Aceptar',
        disclaimer_never: 'No Mostrar de Nuevo',
        closest_name: 'Nombre más cercano:',
        danger_pairs_title: 'Pares Peligrosos',
        danger_pairs_desc: 'Compara tu color actual con colores comúnmente confundidos en cada tipo de daltonismo.',
        palette_title: 'Paleta Segura para Daltónicos',
        generate: 'Generar',
        harmony_title: 'Armonía de Color',
        complementary: 'Complementario',
        analogous: 'Análogo',
        triadic: 'Tríada',
        recent_title: 'Colores Recientes',
        favorites_title: 'Favoritos',
        export_css: 'Exportar Variables CSS',
        export_json: 'Exportar JSON',
        export_png: 'Exportar Muestra PNG',
        whole_site_label: 'Vista previa de todo el sitio en este modo',
        image_tools_title: 'Herramientas de Imagen',
        drop_zone: 'Arrastra y suelta una imagen aquí, o pega desde el portapapeles',
        webcam_btn: 'Modo de Cámara en Vivo',
        batch_btn: 'Carga por Lotes',
        download_btn: 'Descargar Resultado',
        share_card_btn: 'Tarjeta Antes/Después',
        chart_checker_title: 'Verificador de Gráficos',
        chart_upload_btn: 'Subir Gráfico',
        chart_checker_placeholder: 'Sube una imagen de gráfico para comprobar si sus colores siguen siendo distinguibles para personas daltónicas.',
        color_search_label: 'Buscar por nombre de color',
        color_search_placeholder: 'ej. azul oscuro',
        color_search_not_found: 'No se encontró un nombre de color coincidente en este idioma.',
        accessibility_audit_title: 'Auditoría de Accesibilidad',
        accessibility_audit_desc: 'Sube un diseño o imagen para auditar sus colores dominantes por contraste de texto (WCAG) y seguridad para daltónicos.',
        accessibility_audit_upload_btn: 'Subir Diseño',
        accessibility_audit_placeholder: 'Sube una imagen para ejecutar una auditoría de accesibilidad.',
        audit_not_enough_colors: 'No se detectaron suficientes colores distintos para auditar.',
        audit_contrast_title: 'Contraste de Texto (WCAG)',
        audit_cb_title: 'Seguridad para Daltónicos',
        audit_pass_aa: 'Aprueba AA para texto normal (4.5:1+)',
        audit_pass_aa_large: 'Aprueba AA solo para texto grande/UI (3:1+)',
        audit_fail_aa: 'No aprueba WCAG AA — contraste demasiado bajo para texto',
        audit_ratio_prefix: 'Ratio de contraste: ',
        audit_low_contrast_intro: 'Estos pares de colores pueden no tener suficiente contraste para texto:',
        audit_no_low_contrast: 'No se detectaron pares de bajo contraste entre los colores dominantes.',
        audit_cb_warning_intro: 'Estos pares de colores pueden parecer iguales para personas daltónicas:',
        audit_cb_safe: 'Los colores dominantes siguen siendo distinguibles en las simulaciones de daltonismo.',
        accessibility_h3: 'Accesibilidad',
        dyslexia_font_label: 'Fuente para dislexia',
        reduce_motion_label: 'Reducir movimiento',
        personalization_h3: 'Personalización',
        my_condition_label: 'Mi condición (selecciona la simulación automáticamente):',
        image_history_label: 'Imágenes recientes (guardadas solo en este dispositivo):',
        about_h3: 'Acerca de',
        about_text: 'Hola a todos los que abrieron esto para saber sobre nosotros. Somos 2 estudiantes normales, Nour Eldeen y Ahmed Sameh. Queríamos construir algo que ayudara a la comunidad, así que creamos ColorView Pro para ayudar a las personas daltónicas y a quienes diseñan para ellas. Puedes elegir colores en HEX, RGB y HSL, simular 8 tipos de daltonismo con severidad ajustable, comprobar el contraste y paletas seguras, y previsualizar tus propias imágenes e incluso tu cámara en cada modo. Usamos herramientas de IA para aprender y avanzar más rápido mientras construíamos esto. Gracias por probarlo — pronto llegarán más actualizaciones.',
        about_credit: '— Nour Eldeen y Ahmed Sameh',
        ishihara_modal_title: 'Autoevaluación de Daltonismo',
        ishihara_intro_desc: 'Realiza una breve prueba para ver qué tipo de visión de color podrías tener. Usa láminas generadas, no es un dispositivo médico.',
        ishihara_start_btn: 'Hacer la Prueba',
        ishihara_know_btn: 'Ya Sé Mi Condición',
        ishihara_skip_btn: 'Omitir',
        ishihara_question: '¿Qué número ves?',
        ishihara_cant_see: 'No puedo ver ningún número',
        ishihara_skip_test_link: 'Omitir prueba',
        ishihara_result_prefix: 'Tienes ',
        ishihara_result_normal: '¡Tienes visión de color normal!',
        ishihara_disclaimer: 'Esto es una autoevaluación informal, no un diagnóstico médico. Consulta a un oftalmólogo para un diagnóstico oficial.',
        ishihara_apply_btn: 'Aplicar y Cerrar',
        ishihara_retake_link: 'Repetir prueba',
        ishihara_retake_settings_btn: 'Hacer la Prueba de Daltonismo',
        danger_safe_note: '✓ No se detectaron confusiones comunes para este color.',
        danger_warning_template: '⚠ Bajo {mode}, este color puede confundirse con: {names}.',
        danger_colors: {
            Red: 'Rojo', Green: 'Verde', Brown: 'Marrón',
            Orange: 'Naranja', Blue: 'Azul', Purple: 'Morado'
        },
        custom_accent_label: 'Color de acento personalizado:',
        achievement_unlocked_prefix: 'Logro desbloqueado: ',
        locked_label: 'Bloqueado',
        unlocked_label: 'Desbloqueado',
        select_options: {
            none_full: 'Sin Simulación (Visión Normal)',
            protanopia_full: 'Protanopía (Ciego al Rojo)',
            protanomaly_full: 'Protanomalía (Rojo Débil)',
            deuteranopia_full: 'Deuteranopía (Ciego al Verde)',
            deuteranomaly_full: 'Deuteranomalía (Verde Débil)',
            tritanopia_full: 'Tritanopía (Ciego al Azul)',
            tritanomaly_full: 'Tritanomalía (Azul Débil)',
            achromatopsia_full: 'Acromatopsia (Monocromo)',
            achromatomaly_full: 'Acromatomalía (Monocromo Débil)',
            none_short: 'Ninguno / No estoy seguro',
            protanopia_short: 'Protanopía',
            protanomaly_short: 'Protanomalía',
            deuteranopia_short: 'Deuteranopía',
            deuteranomaly_short: 'Deuteranomalía',
            tritanopia_short: 'Tritanopía',
            tritanomaly_short: 'Tritanomalía',
            achromatopsia_short: 'Acromatopsia'
        },
        achievements: {
            uploaded_image: 'Primera Subida',
            used_eyedropper: 'Experto Cuentagotas',
            favorite_color: 'Coleccionista de Colores',
            tried_all_modes: 'Espectro Completo',
            used_webcam: 'Espectador en Vivo',
            used_batch: 'Maestro de Lotes',
            exported_palette: 'Exportador',
            checked_chart: 'Verificador de Gráficos',
            downloaded_result: 'Descargador',
            shared_card: 'Narrador',
            dark_mode_used: 'Ave Nocturna',
            custom_theme_used: 'Toque Personal'
        },
        lang_options: [
            { code: 'en', name: 'English' },
            { code: 'ar', name: 'العربية' },
            { code: 'es', name: 'Español' },
            { code: 'ru', name: 'Русский' },
            { code: 'fr', name: 'Français' },
            { code: 'de', name: 'Deutsch' },
            { code: 'pt', name: 'Português' }
        ],
        info: {
            none: {
                title: 'Ninguna Simulación Seleccionada',
                points: [
                    'Selecciona un modo de daltonismo arriba para aprender sobre él.',
                    'Los cuadros de abajo mostrarán cómo se ve tu diseño en ese modo.'
                ]
            },
            protanopia: {
                title: 'Protanopía (Ciego al Rojo)',
                points: [
                    'La protanopía es un tipo de daltonismo en el que el ojo no puede detectar la luz roja.',
                    'Quienes la padecen suelen confundir el rojo con el verde o el marrón.',
                    'Los tonos rojos pueden parecer más oscuros de lo que realmente son.',
                    'Suele ser hereditaria y estar presente desde el nacimiento.',
                    'La vida diaria es normal, pero algunas tareas basadas en el color pueden ser más difíciles.'
                ]
            },
            protanomaly: {
                title: 'Protanomalía (Rojo Débil)',
                points: [
                    'La protanomalía es una forma más leve de deficiencia al rojo, no daltonismo total.',
                    'Los rojos, naranjas y verdes pueden verse apagados o desplazados.',
                    'El deslizador de severidad muestra una versión más leve del cambio de la protanopía.',
                    'Suele ser hereditaria y estar presente desde el nacimiento.'
                ]
            },
            deuteranopia: {
                title: 'Deuteranopía (Ciego al Verde)',
                points: [
                    'La deuteranopía es un tipo de daltonismo en el que el ojo no puede detectar la luz verde.',
                    'Quienes la padecen suelen confundir el verde con el rojo o el amarillo.',
                    'Los tonos verdes pueden parecer apagados o descoloridos.',
                    'Suele ser hereditaria y estar presente desde el nacimiento.',
                    'La vida diaria es normal, pero algunas tareas basadas en el color pueden ser más difíciles.'
                ]
            },
            deuteranomaly: {
                title: 'Deuteranomalía (Verde Débil)',
                points: [
                    'La deuteranomalía es la deficiencia de color más común, una forma más leve de debilidad al verde.',
                    'El verde y el rojo pueden parecer más cercanos entre sí de lo que realmente son.',
                    'El deslizador de severidad muestra una versión más leve del cambio de la deuteranopía.',
                    'Suele ser hereditaria y estar presente desde el nacimiento.'
                ]
            },
            tritanopia: {
                title: 'Tritanopía (Ciego al Azul)',
                points: [
                    'La tritanopía es un tipo de daltonismo en el que el ojo no puede detectar la luz azul.',
                    'Quienes la padecen suelen confundir el azul con el verde o el amarillo.',
                    'Los tonos azules pueden parecer más verdosos o descoloridos.',
                    'Suele ser hereditaria y estar presente desde el nacimiento.',
                    'La vida diaria es normal, pero algunas tareas basadas en el color pueden ser más difíciles.'
                ]
            },
            tritanomaly: {
                title: 'Tritanomalía (Azul Débil)',
                points: [
                    'La tritanomalía es una forma más rara y leve de deficiencia azul-amarillo.',
                    'Puede ser más difícil distinguir el azul del verde, o el amarillo del rosa.',
                    'El deslizador de severidad muestra una versión más leve del cambio de la tritanopía.'
                ]
            },
            achromatopsia: {
                title: 'Acromatopsia (Monocromo)',
                points: [
                    'La monocromacía es una forma rara de daltonismo en la que el ojo no puede distinguir ningún color.',
                    'Quienes la padecen ven el mundo en tonos de gris, negro y blanco.',
                    'Ocurre cuando dos o los tres tipos de células cono no funcionan.',
                    'Suele ser hereditaria y aparecer desde el nacimiento.',
                    'La vida diaria es normal, pero las tareas basadas en el color pueden ser mucho más difíciles.'
                ]
            },
            achromatomaly: {
                title: 'Acromatomalía (Monocromo Débil)',
                points: [
                    'La acromatomalía es una forma más leve de monocromacía: los colores se ven desvaídos en lugar de completamente grises.',
                    'Ocurre cuando las células cono funcionan, pero de forma débil.',
                    'El deslizador de severidad muestra una versión más leve del cambio de la acromatopsia.'
                ]
            }
        },
        facts: [
            'Aproximadamente 1 de cada 12 hombres y 1 de cada 200 mujeres tiene alguna forma de deficiencia en la visión del color.',
            'La deuteranomalía (verde débil) es el tipo más común de daltonismo.',
            'Los perros no son completamente daltónicos: ven bien los azules y amarillos, pero no tan bien los rojos y verdes.',
            'El daltonismo total (acromatopsia) es raro y afecta aproximadamente a 1 de cada 30,000 personas.',
            'El azul es el color más universalmente preferido en todas las culturas.',
            'La mantis marina tiene hasta 16 tipos de receptores de color; los humanos solo tenemos 3.',
            'El daltonismo es mucho más común en los hombres porque los genes involucrados están en el cromosoma X.',
            'La prueba de Ishihara, todavía utilizada hoy en día, fue diseñada en 1917 por el Dr. Shinobu Ishihara.'
        ]
    },
    ru: {
        dir: 'ltr',
        main_title: 'Выбор цвета и значения',
        hsl_controls: 'Управление HSL',
        simulation_title: 'Просмотр дальтонизма',
        simulation_desc: 'Симуляция для доступного дизайна:',
        normal_vision: 'Тест нормального зрения',
        deuteranopia: 'Тест дейтеранопии',
        protanopia: 'Тест протанопии',
        settings_h2: 'Настройки',
        theme_h3: 'Тема',
        light_mode: 'Светлый режим',
        dark_mode: 'Тёмный режим',
        custom_mode: 'Свой вариант',
        language_h3: 'Язык',
        layout_h3: 'Макет отображения',
        pc_layout: 'Макет ПК',
        mobile_layout: 'Мобильный макет',
        upload_btn: 'Загрузить изображение для симуляции',
        clear_btn: 'Очистить',
        single_line_footer: 'ColorView Pro создан Ахмедом Самехом и Нур Эльдин. | ColorView Pro © Все права защищены.',
        disclaimer: 'Для наилучшего использования этой функции рядом с вами должен быть кто-то без дальтонизма',
        disclaimer_ok: 'Ок',
        disclaimer_never: 'Больше не показывать',
        closest_name: 'Ближайшее название:',
        danger_pairs_title: 'Опасные пары',
        danger_pairs_desc: 'Сравнивает текущий цвет с часто путаемыми цветами при каждом типе дальтонизма.',
        palette_title: 'Безопасная палитра для дальтоников',
        generate: 'Создать',
        harmony_title: 'Гармония цвета',
        complementary: 'Дополнительные',
        analogous: 'Аналогичные',
        triadic: 'Триада',
        recent_title: 'Недавние цвета',
        favorites_title: 'Избранное',
        export_css: 'Экспорт переменных CSS',
        export_json: 'Экспорт JSON',
        export_png: 'Экспорт образца PNG',
        whole_site_label: 'Просмотр всего сайта в этом режиме',
        image_tools_title: 'Инструменты для изображений',
        drop_zone: 'Перетащите изображение сюда или вставьте из буфера обмена',
        webcam_btn: 'Режим live-камеры',
        batch_btn: 'Пакетная загрузка',
        download_btn: 'Скачать результат',
        share_card_btn: 'Карточка до/после',
        chart_checker_title: 'Проверка графиков',
        chart_upload_btn: 'Загрузить график',
        chart_checker_placeholder: 'Загрузите изображение диаграммы или графика, чтобы проверить, остаются ли его цвета различимыми для людей с дальтонизмом.',
        color_search_label: 'Поиск по названию цвета',
        color_search_placeholder: 'напр. тёмно-синий',
        color_search_not_found: 'Совпадающее название цвета на этом языке не найдено.',
        accessibility_audit_title: 'Аудит доступности',
        accessibility_audit_desc: 'Загрузите дизайн или изображение, чтобы проверить его основные цвета на контраст текста (WCAG) и безопасность для дальтоников.',
        accessibility_audit_upload_btn: 'Загрузить дизайн',
        accessibility_audit_placeholder: 'Загрузите изображение для проверки доступности.',
        audit_not_enough_colors: 'Недостаточно различимых цветов для проверки.',
        audit_contrast_title: 'Контраст текста (WCAG)',
        audit_cb_title: 'Безопасность для дальтоников',
        audit_pass_aa: 'Соответствует AA для обычного текста (4.5:1+)',
        audit_pass_aa_large: 'Соответствует AA только для крупного текста/интерфейса (3:1+)',
        audit_fail_aa: 'Не соответствует WCAG AA — слишком низкий контраст для текста',
        audit_ratio_prefix: 'Коэффициент контраста: ',
        audit_low_contrast_intro: 'Этим парам цветов может не хватать контраста для текста:',
        audit_no_low_contrast: 'Пар цветов с низким контрастом среди основных цветов не обнаружено.',
        audit_cb_warning_intro: 'Эти пары цветов могут выглядеть одинаково для людей с дальтонизмом:',
        audit_cb_safe: 'Основные цвета остаются различимыми при симуляции дальтонизма.',
        accessibility_h3: 'Доступность',
        dyslexia_font_label: 'Шрифт для дислексии',
        reduce_motion_label: 'Уменьшить анимацию',
        personalization_h3: 'Персонализация',
        my_condition_label: 'Моё состояние (автоматически выбирает симуляцию):',
        image_history_label: 'Недавние изображения (хранятся только на этом устройстве):',
        about_h3: 'О нас',
        about_text: 'Привет всем, кто открыл это, чтобы узнать о нас. Мы — два обычных студента, Нур Эльдин и Ахмед Самех. Мы хотели создать что-то полезное для сообщества, поэтому сделали ColorView Pro, чтобы помочь людям с дальтонизмом и тем, кто создаёт дизайн для них. Вы можете выбирать цвета в форматах HEX, RGB и HSL, симулировать 8 типов дальтонизма с регулируемой степенью тяжести, проверять контраст и безопасные палитры, а также просматривать свои изображения и даже камеру в каждом режиме. Мы использовали инструменты ИИ, чтобы учиться и работать быстрее при создании этого приложения. Спасибо, что попробовали — скоро появятся новые обновления.',
        about_credit: '— Нур Эльдин и Ахмед Самех',
        ishihara_modal_title: 'Самопроверка на дальтонизм',
        ishihara_intro_desc: 'Пройдите короткий тест, чтобы узнать, какой тип цветовосприятия у вас может быть. Используются сгенерированные таблицы, это не медицинское устройство.',
        ishihara_start_btn: 'Пройти тест',
        ishihara_know_btn: 'Я знаю своё состояние',
        ishihara_skip_btn: 'Пропустить',
        ishihara_question: 'Какую цифру вы видите?',
        ishihara_cant_see: 'Я не вижу цифру',
        ishihara_skip_test_link: 'Пропустить тест',
        ishihara_result_prefix: 'У вас ',
        ishihara_result_normal: 'У вас нормальное цветовое зрение!',
        ishihara_disclaimer: 'Это развлекательная самопроверка, а не медицинский диагноз. Обратитесь к офтальмологу для официального диагноза.',
        ishihara_apply_btn: 'Применить и закрыть',
        ishihara_retake_link: 'Пройти тест снова',
        ishihara_retake_settings_btn: 'Пройти тест на дальтонизм',
        danger_safe_note: '✓ Обычных путаниц для этого цвета не обнаружено.',
        danger_warning_template: '⚠ При режиме {mode} этот цвет можно спутать с: {names}.',
        danger_colors: {
            Red: 'Красный', Green: 'Зелёный', Brown: 'Коричневый',
            Orange: 'Оранжевый', Blue: 'Синий', Purple: 'Фиолетовый'
        },
        custom_accent_label: 'Свой акцентный цвет:',
        achievement_unlocked_prefix: 'Достижение открыто: ',
        locked_label: 'Заблокировано',
        unlocked_label: 'Открыто',
        select_options: {
            none_full: 'Без симуляции (нормальное зрение)',
            protanopia_full: 'Протанопия (не видит красный)',
            protanomaly_full: 'Протаномалия (слабое восприятие красного)',
            deuteranopia_full: 'Дейтеранопия (не видит зелёный)',
            deuteranomaly_full: 'Дейтераномалия (слабое восприятие зелёного)',
            tritanopia_full: 'Тританопия (не видит синий)',
            tritanomaly_full: 'Тританомалия (слабое восприятие синего)',
            achromatopsia_full: 'Ахроматопсия (монохромное зрение)',
            achromatomaly_full: 'Ахроматомалия (слабое монохромное зрение)',
            none_short: 'Нет / не уверен(а)',
            protanopia_short: 'Протанопия',
            protanomaly_short: 'Протаномалия',
            deuteranopia_short: 'Дейтеранопия',
            deuteranomaly_short: 'Дейтераномалия',
            tritanopia_short: 'Тританопия',
            tritanomaly_short: 'Тританомалия',
            achromatopsia_short: 'Ахроматопсия'
        },
        achievements: {
            uploaded_image: 'Первая загрузка',
            used_eyedropper: 'Мастер пипетки',
            favorite_color: 'Коллекционер цветов',
            tried_all_modes: 'Полный спектр',
            used_webcam: 'Зритель вживую',
            used_batch: 'Мастер пакетов',
            exported_palette: 'Экспортёр',
            checked_chart: 'Проверяющий графики',
            downloaded_result: 'Загрузчик',
            shared_card: 'Рассказчик',
            dark_mode_used: 'Ночная сова',
            custom_theme_used: 'Личный штрих'
        },
        lang_options: [
            { code: 'en', name: 'English' },
            { code: 'ar', name: 'العربية' },
            { code: 'es', name: 'Español' },
            { code: 'ru', name: 'Русский' },
            { code: 'fr', name: 'Français' },
            { code: 'de', name: 'Deutsch' },
            { code: 'pt', name: 'Português' }
        ],
        info: {
            none: {
                title: 'Симуляция не выбрана',
                points: [
                    'Выберите режим дальтонизма выше, чтобы узнать о нём подробнее.',
                    'Ниже показано, как выглядит ваш дизайн в этом режиме.'
                ]
            },
            protanopia: {
                title: 'Протанопия (не видит красный)',
                points: [
                    'Протанопия — это тип дальтонизма, при котором глаз не способен воспринимать красный свет.',
                    'Люди с этим состоянием часто путают красный с зелёным или коричневым.',
                    'Красные оттенки могут казаться темнее, чем они есть на самом деле.',
                    'Обычно передаётся по наследству и присутствует с рождения.',
                    'Повседневная жизнь протекает нормально, но некоторые задачи, связанные с цветом, могут быть сложнее.'
                ]
            },
            protanomaly: {
                title: 'Протаномалия (слабое восприятие красного)',
                points: [
                    'Протаномалия — более лёгкая форма недостатка восприятия красного, а не полный дальтонизм.',
                    'Красные, оранжевые и зелёные цвета могут казаться приглушёнными или смещёнными.',
                    'Ползунок степени тяжести показывает более лёгкую версию сдвига при протанопии.',
                    'Обычно передаётся по наследству и присутствует с рождения.'
                ]
            },
            deuteranopia: {
                title: 'Дейтеранопия (не видит зелёный)',
                points: [
                    'Дейтеранопия — это тип дальтонизма, при котором глаз не способен воспринимать зелёный свет.',
                    'Люди с этим состоянием часто путают зелёный с красным или жёлтым.',
                    'Зелёные оттенки могут казаться тусклыми или блёклыми.',
                    'Обычно передаётся по наследству и присутствует с рождения.',
                    'Повседневная жизнь протекает нормально, но некоторые задачи, связанные с цветом, могут быть сложнее.'
                ]
            },
            deuteranomaly: {
                title: 'Дейтераномалия (слабое восприятие зелёного)',
                points: [
                    'Дейтераномалия — самая распространённая недостаточность цветовосприятия, более лёгкая форма слабости к зелёному.',
                    'Зелёный и красный могут казаться ближе друг к другу, чем на самом деле.',
                    'Ползунок степени тяжести показывает более лёгкую версию сдвига при дейтеранопии.',
                    'Обычно передаётся по наследству и присутствует с рождения.'
                ]
            },
            tritanopia: {
                title: 'Тританопия (не видит синий)',
                points: [
                    'Тританопия — это тип дальтонизма, при котором глаз не способен воспринимать синий свет.',
                    'Люди с этим состоянием часто путают синий с зелёным или жёлтым.',
                    'Синие оттенки могут казаться более зеленоватыми или блёклыми.',
                    'Обычно передаётся по наследству и присутствует с рождения.',
                    'Повседневная жизнь протекает нормально, но некоторые задачи, связанные с цветом, могут быть сложнее.'
                ]
            },
            tritanomaly: {
                title: 'Тританомалия (слабое восприятие синего)',
                points: [
                    'Тританомалия — более редкая и лёгкая форма сине-жёлтой недостаточности цветовосприятия.',
                    'Может быть сложнее отличить синий от зелёного или жёлтый от розового.',
                    'Ползунок степени тяжести показывает более лёгкую версию сдвига при тританопии.'
                ]
            },
            achromatopsia: {
                title: 'Ахроматопсия (монохромное зрение)',
                points: [
                    'Монохромазия — редкая форма дальтонизма, при которой глаз вообще не может различать цвета.',
                    'Люди с этим состоянием видят мир в оттенках серого, чёрного и белого.',
                    'Возникает, когда два или все три типа колбочек не работают.',
                    'Обычно передаётся по наследству и проявляется с рождения.',
                    'Повседневная жизнь протекает нормально, но задачи, связанные с цветом, могут быть намного сложнее.'
                ]
            },
            achromatomaly: {
                title: 'Ахроматомалия (слабое монохромное зрение)',
                points: [
                    'Ахроматомалия — более лёгкая форма монохромазии: цвета выглядят блёклыми, а не полностью серыми.',
                    'Возникает, когда колбочки работают, но слабо.',
                    'Ползунок степени тяжести показывает более лёгкую версию сдвига при ахроматопсии.'
                ]
            }
        },
        facts: [
            'Примерно у 1 из 12 мужчин и у 1 из 200 женщин наблюдается та или иная форма нарушения цветового зрения.',
            'Дейтераномалия (слабое восприятие зелёного) — самый распространённый тип дальтонизма.',
            'Собаки не полностью дальтоники — они хорошо видят синий и жёлтый, но плохо красный и зелёный.',
            'Полный дальтонизм (ахроматопсия) встречается редко, примерно у 1 из 30 000 человек.',
            'Синий цвет — самый универсально любимый цвет во всех культурах мира.',
            'У раков-богомолов до 16 типов цветовых рецепторов — у людей всего 3.',
            'Дальтонизм гораздо чаще встречается у мужчин, потому что связанные с ним гены находятся на X-хромосоме.',
            'Тест Исихары, используемый и сегодня, был разработан в 1917 году доктором Синобу Исихарой.'
        ]
    },
    fr: {
        dir: 'ltr',
        main_title: 'Sélecteur de couleur et valeurs',
        hsl_controls: 'Contrôles HSL',
        simulation_title: 'Vue du daltonisme',
        simulation_desc: "Simuler pour une conception accessible :",
        normal_vision: 'Test de vision normale',
        deuteranopia: 'Test de deutéranopie',
        protanopia: 'Test de protanopie',
        settings_h2: 'Paramètres',
        theme_h3: 'Thème',
        light_mode: 'Mode clair',
        dark_mode: 'Mode sombre',
        custom_mode: 'Personnalisé',
        language_h3: 'Langue',
        layout_h3: "Disposition de l'affichage",
        pc_layout: 'Disposition PC',
        mobile_layout: 'Disposition mobile',
        upload_btn: 'Téléverser une image pour la simulation',
        clear_btn: 'Effacer',
        single_line_footer: "ColorView Pro créé par Ahmed Sameh et Nour Eldeen. | ColorView Pro © Tous droits réservés.",
        disclaimer: "Pour une meilleure utilisation de cette fonctionnalité, une personne non daltonienne devrait être avec vous",
        disclaimer_ok: 'Ok',
        disclaimer_never: 'Ne plus afficher',
        closest_name: 'Nom le plus proche :',
        danger_pairs_title: 'Paires à risque',
        danger_pairs_desc: 'Compare votre couleur actuelle à des couleurs couramment confondues pour chaque type de daltonisme.',
        palette_title: 'Palette sûre pour daltoniens',
        generate: 'Générer',
        harmony_title: 'Harmonie des couleurs',
        complementary: 'Complémentaire',
        analogous: 'Analogue',
        triadic: 'Triade',
        recent_title: 'Couleurs récentes',
        favorites_title: 'Favoris',
        export_css: 'Exporter les variables CSS',
        export_json: 'Exporter en JSON',
        export_png: "Exporter l'échantillon PNG",
        whole_site_label: 'Aperçu de tout le site dans ce mode',
        image_tools_title: "Outils d'image",
        drop_zone: 'Glissez-déposez une image ici, ou collez depuis le presse-papiers',
        webcam_btn: 'Mode webcam en direct',
        batch_btn: 'Téléversement par lot',
        download_btn: 'Télécharger le résultat',
        share_card_btn: 'Carte avant/après',
        chart_checker_title: 'Vérificateur de graphiques',
        chart_upload_btn: 'Téléverser un graphique',
        chart_checker_placeholder: 'Téléversez une image de graphique pour vérifier si ses couleurs restent distinguables pour les personnes daltoniennes.',
        color_search_label: 'Rechercher par nom de couleur',
        color_search_placeholder: 'ex. bleu foncé',
        color_search_not_found: 'Aucun nom de couleur correspondant trouvé dans cette langue.',
        accessibility_audit_title: 'Audit d\'Accessibilité',
        accessibility_audit_desc: 'Téléversez un design ou une image pour auditer ses couleurs dominantes en matière de contraste de texte (WCAG) et de sécurité pour daltoniens.',
        accessibility_audit_upload_btn: 'Téléverser un Design',
        accessibility_audit_placeholder: 'Téléversez une image pour lancer un audit d\'accessibilité.',
        audit_not_enough_colors: 'Pas assez de couleurs distinctes détectées pour auditer.',
        audit_contrast_title: 'Contraste du Texte (WCAG)',
        audit_cb_title: 'Sécurité pour Daltoniens',
        audit_pass_aa: 'Conforme AA pour texte normal (4.5:1+)',
        audit_pass_aa_large: 'Conforme AA pour texte large/UI uniquement (3:1+)',
        audit_fail_aa: 'Non conforme WCAG AA — contraste trop faible pour le texte',
        audit_ratio_prefix: 'Ratio de contraste : ',
        audit_low_contrast_intro: 'Ces paires de couleurs peuvent manquer de contraste pour le texte :',
        audit_no_low_contrast: 'Aucune paire à faible contraste détectée parmi les couleurs dominantes.',
        audit_cb_warning_intro: 'Ces paires de couleurs peuvent sembler identiques pour les daltoniens :',
        audit_cb_safe: 'Les couleurs dominantes restent distinguables dans les simulations de daltonisme.',
        accessibility_h3: 'Accessibilité',
        dyslexia_font_label: 'Police adaptée à la dyslexie',
        reduce_motion_label: 'Réduire les animations',
        personalization_h3: 'Personnalisation',
        my_condition_label: 'Ma condition (sélectionne automatiquement la simulation) :',
        image_history_label: 'Images récentes (stockées uniquement sur cet appareil) :',
        about_h3: 'À propos',
        about_text: "Bonjour à tous ceux qui ont ouvert cette page pour en savoir plus sur nous. Nous sommes deux étudiants ordinaires, Nour Eldeen et Ahmed Sameh. Nous voulions créer quelque chose d'utile pour la communauté, alors nous avons conçu ColorView Pro pour aider les personnes daltoniennes et celles qui conçoivent pour elles. Vous pouvez choisir des couleurs en HEX, RGB et HSL, simuler 8 types de daltonisme avec une sévérité ajustable, vérifier le contraste et les palettes sûres, et prévisualiser vos propres images et même votre caméra dans chaque mode. Nous avons utilisé des outils d'IA pour apprendre et avancer plus vite en construisant ceci. Merci de l'essayer — d'autres mises à jour arrivent bientôt.",
        about_credit: '— Nour Eldeen & Ahmed Sameh',
        ishihara_modal_title: 'Autotest de Daltonisme',
        ishihara_intro_desc: 'Passez un court test pour voir quel type de vision des couleurs vous pourriez avoir. Utilise des planches générées, pas un dispositif médical.',
        ishihara_start_btn: 'Passer le Test',
        ishihara_know_btn: 'Je Connais Ma Condition',
        ishihara_skip_btn: 'Ignorer',
        ishihara_question: 'Quel chiffre voyez-vous ?',
        ishihara_cant_see: 'Je ne vois aucun chiffre',
        ishihara_skip_test_link: 'Ignorer le test',
        ishihara_result_prefix: 'Vous avez ',
        ishihara_result_normal: 'Vous avez une vision des couleurs normale !',
        ishihara_disclaimer: "Ceci est un autotest ludique, pas un diagnostic médical. Consultez un ophtalmologiste pour un diagnostic officiel.",
        ishihara_apply_btn: 'Appliquer et Fermer',
        ishihara_retake_link: 'Repasser le test',
        ishihara_retake_settings_btn: 'Passer le Test de Daltonisme',
        danger_safe_note: '✓ Aucune confusion courante détectée pour cette couleur.',
        danger_warning_template: '⚠ En mode {mode}, cette couleur peut être confondue avec : {names}.',
        danger_colors: {
            Red: 'Rouge', Green: 'Vert', Brown: 'Marron',
            Orange: 'Orange', Blue: 'Bleu', Purple: 'Violet'
        },
        custom_accent_label: "Couleur d'accent personnalisée :",
        achievement_unlocked_prefix: 'Succès débloqué : ',
        locked_label: 'Verrouillé',
        unlocked_label: 'Débloqué',
        select_options: {
            none_full: 'Aucune simulation (vision normale)',
            protanopia_full: 'Protanopie (aveugle au rouge)',
            protanomaly_full: 'Protanomalie (rouge faible)',
            deuteranopia_full: 'Deutéranopie (aveugle au vert)',
            deuteranomaly_full: 'Deutéranomalie (vert faible)',
            tritanopia_full: 'Tritanopie (aveugle au bleu)',
            tritanomaly_full: 'Tritanomalie (bleu faible)',
            achromatopsia_full: 'Achromatopsie (monochrome)',
            achromatomaly_full: 'Achromatomalie (monochrome faible)',
            none_short: 'Aucun / Pas sûr',
            protanopia_short: 'Protanopie',
            protanomaly_short: 'Protanomalie',
            deuteranopia_short: 'Deutéranopie',
            deuteranomaly_short: 'Deutéranomalie',
            tritanopia_short: 'Tritanopie',
            tritanomaly_short: 'Tritanomalie',
            achromatopsia_short: 'Achromatopsie'
        },
        achievements: {
            uploaded_image: 'Premier envoi',
            used_eyedropper: 'Pro de la pipette',
            favorite_color: 'Collectionneur de couleurs',
            tried_all_modes: 'Spectre complet',
            used_webcam: 'Spectateur en direct',
            used_batch: 'Maître des lots',
            exported_palette: 'Exportateur',
            checked_chart: 'Vérificateur de graphiques',
            downloaded_result: 'Téléchargeur',
            shared_card: "Conteur d'histoires",
            dark_mode_used: 'Oiseau de nuit',
            custom_theme_used: 'Touche personnelle'
        },
        lang_options: [
            { code: 'en', name: 'English' },
            { code: 'ar', name: 'العربية' },
            { code: 'es', name: 'Español' },
            { code: 'ru', name: 'Русский' },
            { code: 'fr', name: 'Français' },
            { code: 'de', name: 'Deutsch' },
            { code: 'pt', name: 'Português' }
        ],
        info: {
            none: {
                title: 'Aucune simulation sélectionnée',
                points: [
                    'Sélectionnez un mode de daltonisme ci-dessus pour en savoir plus.',
                    'Les cases ci-dessous montreront à quoi ressemble votre conception dans ce mode.'
                ]
            },
            protanopia: {
                title: 'Protanopie (aveugle au rouge)',
                points: [
                    "La protanopie est un type de daltonisme où l'œil ne peut pas détecter la lumière rouge.",
                    'Les personnes atteintes confondent souvent le rouge avec le vert ou le marron.',
                    "Les teintes rouges peuvent paraître plus sombres qu'elles ne le sont réellement.",
                    "C'est généralement héréditaire et présent dès la naissance.",
                    'La vie quotidienne est normale, mais certaines tâches liées aux couleurs peuvent être plus difficiles.'
                ]
            },
            protanomaly: {
                title: 'Protanomalie (rouge faible)',
                points: [
                    "La protanomalie est une forme plus légère de déficience au rouge, pas un daltonisme complet.",
                    'Les rouges, oranges et verts peuvent paraître atténués ou décalés.',
                    'Le curseur de sévérité montre une version plus légère du décalage de la protanopie.',
                    "C'est généralement héréditaire et présent dès la naissance."
                ]
            },
            deuteranopia: {
                title: 'Deutéranopie (aveugle au vert)',
                points: [
                    "La deutéranopie est un type de daltonisme où l'œil ne peut pas détecter la lumière verte.",
                    'Les personnes atteintes confondent souvent le vert avec le rouge ou le jaune.',
                    'Les teintes vertes peuvent paraître ternes ou fanées.',
                    "C'est généralement héréditaire et présent dès la naissance.",
                    'La vie quotidienne est normale, mais certaines tâches liées aux couleurs peuvent être plus difficiles.'
                ]
            },
            deuteranomaly: {
                title: 'Deutéranomalie (vert faible)',
                points: [
                    'La deutéranomalie est la déficience de couleur la plus courante, une forme plus légère de faiblesse au vert.',
                    "Le vert et le rouge peuvent paraître plus proches qu'ils ne le sont réellement.",
                    'Le curseur de sévérité montre une version plus légère du décalage de la deutéranopie.',
                    "C'est généralement héréditaire et présent dès la naissance."
                ]
            },
            tritanopia: {
                title: 'Tritanopie (aveugle au bleu)',
                points: [
                    "La tritanopie est un type de daltonisme où l'œil ne peut pas détecter la lumière bleue.",
                    'Les personnes atteintes confondent souvent le bleu avec le vert ou le jaune.',
                    'Les teintes bleues peuvent paraître plus verdâtres ou fanées.',
                    "C'est généralement héréditaire et présent dès la naissance.",
                    'La vie quotidienne est normale, mais certaines tâches liées aux couleurs peuvent être plus difficiles.'
                ]
            },
            tritanomaly: {
                title: 'Tritanomalie (bleu faible)',
                points: [
                    'La tritanomalie est une forme plus rare et plus légère de déficience bleu-jaune.',
                    'Il peut être plus difficile de distinguer le bleu du vert, ou le jaune du rose.',
                    'Le curseur de sévérité montre une version plus légère du décalage de la tritanopie.'
                ]
            },
            achromatopsia: {
                title: 'Achromatopsie (monochrome)',
                points: [
                    "La monochromie est une forme rare de daltonisme où l'œil ne peut distinguer aucune couleur.",
                    'Les personnes atteintes voient le monde en nuances de gris, de noir et de blanc.',
                    'Cela se produit lorsque deux ou les trois types de cônes ne fonctionnent pas.',
                    "C'est généralement héréditaire et présent dès la naissance.",
                    'La vie quotidienne est normale, mais les tâches liées aux couleurs peuvent être bien plus difficiles.'
                ]
            },
            achromatomaly: {
                title: 'Achromatomalie (monochrome faible)',
                points: [
                    "L'achromatomalie est une forme plus légère de monochromie — les couleurs paraissent délavées plutôt que totalement grises.",
                    'Cela se produit lorsque les cônes fonctionnent, mais faiblement.',
                    "Le curseur de sévérité montre une version plus légère du décalage de l'achromatopsie."
                ]
            }
        },
        facts: [
            'Environ 1 homme sur 12 et 1 femme sur 200 ont une forme de déficience de la vision des couleurs.',
            'La deutéranomalie (vert faible) est le type de daltonisme le plus courant.',
            'Les chiens ne sont pas complètement daltoniens — ils voient bien le bleu et le jaune, mais pas très bien le rouge et le vert.',
            'Le daltonisme total (achromatopsie) est rare, touchant environ 1 personne sur 30 000.',
            'Le bleu est la couleur la plus universellement appréciée à travers les cultures.',
            'Les crevettes-mantes ont jusqu\'à 16 types de récepteurs de couleur — les humains n\'en ont que 3.',
            'Le daltonisme est bien plus courant chez les hommes car les gènes impliqués se trouvent sur le chromosome X.',
            "Le test d'Ishihara, encore utilisé aujourd'hui, a été conçu en 1917 par le Dr Shinobu Ishihara."
        ]
    },
    de: {
        dir: 'ltr',
        main_title: 'Farbwähler & Werte',
        hsl_controls: 'HSL-Steuerung',
        simulation_title: 'Farbenblindheits-Ansicht',
        simulation_desc: 'Simulation für barrierefreies Design:',
        normal_vision: 'Test für normales Sehen',
        deuteranopia: 'Deuteranopie-Test',
        protanopia: 'Protanopie-Test',
        settings_h2: 'Einstellungen',
        theme_h3: 'Design',
        light_mode: 'Heller Modus',
        dark_mode: 'Dunkler Modus',
        custom_mode: 'Benutzerdefiniert',
        language_h3: 'Sprache',
        layout_h3: 'Anzeigelayout',
        pc_layout: 'PC-Layout',
        mobile_layout: 'Mobiles Layout',
        upload_btn: 'Bild für Simulation hochladen',
        clear_btn: 'Löschen',
        single_line_footer: 'ColorView Pro erstellt von Ahmed Sameh und Nour Eldeen. | ColorView Pro © Alle Rechte vorbehalten.',
        disclaimer: 'Für die beste Nutzung dieser Funktion sollte eine nicht farbenblinde Person bei Ihnen sein',
        disclaimer_ok: 'Ok',
        disclaimer_never: 'Nicht mehr anzeigen',
        closest_name: 'Nächster Name:',
        danger_pairs_title: 'Gefährliche Paare',
        danger_pairs_desc: 'Vergleicht Ihre aktuelle Farbe mit häufig verwechselten Farben bei jedem Farbenblindheitstyp.',
        palette_title: 'Farbenblind-sichere Palette',
        generate: 'Erzeugen',
        harmony_title: 'Farbharmonie',
        complementary: 'Komplementär',
        analogous: 'Analog',
        triadic: 'Triadisch',
        recent_title: 'Letzte Farben',
        favorites_title: 'Favoriten',
        export_css: 'CSS-Variablen exportieren',
        export_json: 'JSON exportieren',
        export_png: 'Farbmuster als PNG exportieren',
        whole_site_label: 'Gesamte Website in diesem Modus anzeigen',
        image_tools_title: 'Bildwerkzeuge',
        drop_zone: 'Bild hierher ziehen und ablegen oder aus der Zwischenablage einfügen',
        webcam_btn: 'Live-Webcam-Modus',
        batch_btn: 'Stapel-Upload',
        download_btn: 'Ergebnis herunterladen',
        share_card_btn: 'Vorher/Nachher-Karte',
        chart_checker_title: 'Diagramm-Prüfung',
        chart_upload_btn: 'Diagramm hochladen',
        chart_checker_placeholder: 'Laden Sie ein Diagramm- oder Grafikbild hoch, um zu prüfen, ob dessen Farben für Farbenblinde unterscheidbar bleiben.',
        color_search_label: 'Nach Farbname suchen',
        color_search_placeholder: 'z. B. dunkelblau',
        color_search_not_found: 'Kein passender Farbname in dieser Sprache gefunden.',
        accessibility_audit_title: 'Barrierefreiheits-Audit',
        accessibility_audit_desc: 'Laden Sie ein Design oder Bild hoch, um dessen dominante Farben auf Textkontrast (WCAG) und Farbenblind-Sicherheit zu prüfen.',
        accessibility_audit_upload_btn: 'Design hochladen',
        accessibility_audit_placeholder: 'Laden Sie ein Bild hoch, um ein Barrierefreiheits-Audit durchzuführen.',
        audit_not_enough_colors: 'Nicht genügend unterschiedliche Farben erkannt, um zu prüfen.',
        audit_contrast_title: 'Textkontrast (WCAG)',
        audit_cb_title: 'Farbenblind-Sicherheit',
        audit_pass_aa: 'Besteht AA für normalen Text (4.5:1+)',
        audit_pass_aa_large: 'Besteht AA nur für großen Text/UI (3:1+)',
        audit_fail_aa: 'Besteht WCAG AA nicht — Kontrast für Text zu niedrig',
        audit_ratio_prefix: 'Kontrastverhältnis: ',
        audit_low_contrast_intro: 'Diese Farbpaare haben möglicherweise nicht genug Kontrast für Text:',
        audit_no_low_contrast: 'Keine kontrastarmen Paare unter den dominanten Farben erkannt.',
        audit_cb_warning_intro: 'Diese Farbpaare könnten für Farbenblinde ähnlich aussehen:',
        audit_cb_safe: 'Die dominanten Farben bleiben in den Farbenblind-Simulationen unterscheidbar.',
        accessibility_h3: 'Barrierefreiheit',
        dyslexia_font_label: 'Legasthenie-freundliche Schrift',
        reduce_motion_label: 'Bewegung reduzieren',
        personalization_h3: 'Personalisierung',
        my_condition_label: 'Meine Erkrankung (wählt Simulation automatisch aus):',
        image_history_label: 'Letzte Bilder (nur auf diesem Gerät gespeichert):',
        about_h3: 'Über uns',
        about_text: 'Hallo an alle, die dies geöffnet haben, um mehr über uns zu erfahren. Wir sind zwei ganz normale Studenten, Nour Eldeen und Ahmed Sameh. Wir wollten etwas bauen, das der Gemeinschaft hilft, also haben wir ColorView Pro entwickelt, um farbenblinden Menschen und denjenigen, die für sie gestalten, zu helfen. Sie können Farben in HEX, RGB und HSL auswählen, 8 Arten von Farbenblindheit mit einstellbarem Schweregrad simulieren, Kontrast und sichere Paletten prüfen und Ihre eigenen Bilder und sogar Ihre Kamera in jedem Modus vorschauen. Wir haben KI-Tools verwendet, um schneller zu lernen und voranzukommen, während wir das gebaut haben. Danke, dass Sie es ausprobieren — weitere Updates folgen bald.',
        about_credit: '— Nour Eldeen & Ahmed Sameh',
        ishihara_modal_title: 'Farbenblindheits-Selbsttest',
        ishihara_intro_desc: 'Machen Sie einen kurzen Test, um zu sehen, welche Art von Farbsehen Sie haben könnten. Verwendet generierte Tafeln, kein medizinisches Gerät.',
        ishihara_start_btn: 'Test starten',
        ishihara_know_btn: 'Ich kenne meine Erkrankung',
        ishihara_skip_btn: 'Überspringen',
        ishihara_question: 'Welche Zahl sehen Sie?',
        ishihara_cant_see: 'Ich sehe keine Zahl',
        ishihara_skip_test_link: 'Test überspringen',
        ishihara_result_prefix: 'Sie haben ',
        ishihara_result_normal: 'Sie haben normales Farbsehen!',
        ishihara_disclaimer: 'Dies ist ein unterhaltsamer Selbsttest, keine medizinische Diagnose. Für eine offizielle Diagnose wenden Sie sich an einen Augenarzt.',
        ishihara_apply_btn: 'Anwenden & Schließen',
        ishihara_retake_link: 'Test wiederholen',
        ishihara_retake_settings_btn: 'Farbenblindheitstest machen',
        danger_safe_note: '✓ Für diese Farbe wurden keine häufigen Verwechslungen festgestellt.',
        danger_warning_template: '⚠ Bei {mode} kann diese Farbe verwechselt werden mit: {names}.',
        danger_colors: {
            Red: 'Rot', Green: 'Grün', Brown: 'Braun',
            Orange: 'Orange', Blue: 'Blau', Purple: 'Lila'
        },
        custom_accent_label: 'Benutzerdefinierte Akzentfarbe:',
        achievement_unlocked_prefix: 'Erfolg freigeschaltet: ',
        locked_label: 'Gesperrt',
        unlocked_label: 'Freigeschaltet',
        select_options: {
            none_full: 'Keine Simulation (normales Sehen)',
            protanopia_full: 'Protanopie (rot-blind)',
            protanomaly_full: 'Protanomalie (rot-schwach)',
            deuteranopia_full: 'Deuteranopie (grün-blind)',
            deuteranomaly_full: 'Deuteranomalie (grün-schwach)',
            tritanopia_full: 'Tritanopie (blau-blind)',
            tritanomaly_full: 'Tritanomalie (blau-schwach)',
            achromatopsia_full: 'Achromatopsie (monochrom)',
            achromatomaly_full: 'Achromatomalie (schwach monochrom)',
            none_short: 'Keine / Nicht sicher',
            protanopia_short: 'Protanopie',
            protanomaly_short: 'Protanomalie',
            deuteranopia_short: 'Deuteranopie',
            deuteranomaly_short: 'Deuteranomalie',
            tritanopia_short: 'Tritanopie',
            tritanomaly_short: 'Tritanomalie',
            achromatopsia_short: 'Achromatopsie'
        },
        achievements: {
            uploaded_image: 'Erster Upload',
            used_eyedropper: 'Pipetten-Profi',
            favorite_color: 'Farbsammler',
            tried_all_modes: 'Volles Spektrum',
            used_webcam: 'Live-Betrachter',
            used_batch: 'Stapel-Meister',
            exported_palette: 'Exporteur',
            checked_chart: 'Diagramm-Prüfer',
            downloaded_result: 'Downloader',
            shared_card: 'Geschichtenerzähler',
            dark_mode_used: 'Nachteule',
            custom_theme_used: 'Persönliche Note'
        },
        lang_options: [
            { code: 'en', name: 'English' },
            { code: 'ar', name: 'العربية' },
            { code: 'es', name: 'Español' },
            { code: 'ru', name: 'Русский' },
            { code: 'fr', name: 'Français' },
            { code: 'de', name: 'Deutsch' },
            { code: 'pt', name: 'Português' }
        ],
        info: {
            none: {
                title: 'Keine Simulation ausgewählt',
                points: [
                    'Wählen Sie oben einen Farbenblindheitsmodus aus, um mehr darüber zu erfahren.',
                    'Die Kästen unten zeigen, wie Ihr Design in diesem Modus aussieht.'
                ]
            },
            protanopia: {
                title: 'Protanopie (rot-blind)',
                points: [
                    'Protanopie ist eine Form der Farbenblindheit, bei der das Auge kein rotes Licht wahrnehmen kann.',
                    'Betroffene verwechseln Rot oft mit Grün oder Braun.',
                    'Rottöne können dunkler erscheinen, als sie tatsächlich sind.',
                    'Sie ist meist vererbt und von Geburt an vorhanden.',
                    'Der Alltag ist normal, aber manche farbbasierten Aufgaben können schwieriger sein.'
                ]
            },
            protanomaly: {
                title: 'Protanomalie (rot-schwach)',
                points: [
                    'Protanomalie ist eine mildere Form der Rotschwäche, keine vollständige Farbenblindheit.',
                    'Rot, Orange und Grün können gedämpft oder verschoben wirken.',
                    'Der Schweregrad-Regler zeigt eine leichtere Version der Protanopie-Verschiebung.',
                    'Sie ist meist vererbt und von Geburt an vorhanden.'
                ]
            },
            deuteranopia: {
                title: 'Deuteranopie (grün-blind)',
                points: [
                    'Deuteranopie ist eine Form der Farbenblindheit, bei der das Auge kein grünes Licht wahrnehmen kann.',
                    'Betroffene verwechseln Grün oft mit Rot oder Gelb.',
                    'Grüntöne können matt oder verblasst erscheinen.',
                    'Sie ist meist vererbt und von Geburt an vorhanden.',
                    'Der Alltag ist normal, aber manche farbbasierten Aufgaben können schwieriger sein.'
                ]
            },
            deuteranomaly: {
                title: 'Deuteranomalie (grün-schwach)',
                points: [
                    'Deuteranomalie ist die häufigste Farbfehlsichtigkeit, eine mildere Form der Grünschwäche.',
                    'Grün und Rot können näher beieinander wirken, als sie tatsächlich sind.',
                    'Der Schweregrad-Regler zeigt eine leichtere Version der Deuteranopie-Verschiebung.',
                    'Sie ist meist vererbt und von Geburt an vorhanden.'
                ]
            },
            tritanopia: {
                title: 'Tritanopie (blau-blind)',
                points: [
                    'Tritanopie ist eine Form der Farbenblindheit, bei der das Auge kein blaues Licht wahrnehmen kann.',
                    'Betroffene verwechseln Blau oft mit Grün oder Gelb.',
                    'Blautöne können grünlicher oder verblasst erscheinen.',
                    'Sie ist meist vererbt und von Geburt an vorhanden.',
                    'Der Alltag ist normal, aber manche farbbasierten Aufgaben können schwieriger sein.'
                ]
            },
            tritanomaly: {
                title: 'Tritanomalie (blau-schwach)',
                points: [
                    'Tritanomalie ist eine seltenere, mildere Form der Blau-Gelb-Farbfehlsichtigkeit.',
                    'Blau und Grün, oder Gelb und Rosa, können schwerer zu unterscheiden sein.',
                    'Der Schweregrad-Regler zeigt eine leichtere Version der Tritanopie-Verschiebung.'
                ]
            },
            achromatopsia: {
                title: 'Achromatopsie (monochrom)',
                points: [
                    'Monochromasie ist eine seltene Form der Farbenblindheit, bei der das Auge überhaupt keine Farben unterscheiden kann.',
                    'Betroffene sehen die Welt in Grau-, Schwarz- und Weißtönen.',
                    'Sie tritt auf, wenn zwei oder alle drei Zapfentypen nicht funktionieren.',
                    'Sie ist meist vererbt und von Geburt an vorhanden.',
                    'Der Alltag ist normal, aber farbbasierte Aufgaben können deutlich schwieriger sein.'
                ]
            },
            achromatomaly: {
                title: 'Achromatomalie (schwach monochrom)',
                points: [
                    'Achromatomalie ist eine mildere Form der Monochromasie — Farben wirken blass statt vollständig grau.',
                    'Sie tritt auf, wenn die Zapfen funktionieren, aber nur schwach.',
                    'Der Schweregrad-Regler zeigt eine leichtere Version der Achromatopsie-Verschiebung.'
                ]
            }
        },
        facts: [
            'Etwa 1 von 12 Männern und 1 von 200 Frauen hat eine Form von Farbsehschwäche.',
            'Deuteranomalie (grün-schwach) ist die häufigste Art der Farbenblindheit.',
            'Hunde sind nicht vollständig farbenblind — sie sehen Blau und Gelb gut, aber Rot und Grün weniger gut.',
            'Vollständige Farbenblindheit (Achromatopsie) ist selten und betrifft etwa 1 von 30.000 Menschen.',
            'Blau ist die weltweit universell beliebteste Farbe über alle Kulturen hinweg.',
            'Fangschreckenkrebse haben bis zu 16 Arten von Farbrezeptoren — Menschen haben nur 3.',
            'Farbenblindheit ist bei Männern viel häufiger, weil die beteiligten Gene auf dem X-Chromosom liegen.',
            'Der Ishihara-Test, der noch heute verwendet wird, wurde 1917 von Dr. Shinobu Ishihara entwickelt.'
        ]
    },
    pt: {
        dir: 'ltr',
        main_title: 'Seletor de Cor e Valores',
        hsl_controls: 'Controles HSL',
        simulation_title: 'Visão de Daltonismo',
        simulation_desc: 'Simular para um design acessível:',
        normal_vision: 'Teste de Visão Normal',
        deuteranopia: 'Teste de Deuteranopia',
        protanopia: 'Teste de Protanopia',
        settings_h2: 'Configurações',
        theme_h3: 'Tema',
        light_mode: 'Modo Claro',
        dark_mode: 'Modo Escuro',
        custom_mode: 'Personalizado',
        language_h3: 'Idioma',
        layout_h3: 'Layout de Exibição',
        pc_layout: 'Layout de PC',
        mobile_layout: 'Layout Móvel',
        upload_btn: 'Enviar Imagem para Simulação',
        clear_btn: 'Limpar',
        single_line_footer: 'ColorView Pro criado por Ahmed Sameh e Nour Eldeen. | ColorView Pro © Todos os direitos reservados.',
        disclaimer: 'Para melhor uso deste recurso, você deve ter alguém que não seja daltônico com você',
        disclaimer_ok: 'Ok',
        disclaimer_never: 'Não Mostrar Novamente',
        closest_name: 'Nome mais próximo:',
        danger_pairs_title: 'Pares Perigosos',
        danger_pairs_desc: 'Compara sua cor atual com cores comumente confundidas em cada tipo de daltonismo.',
        palette_title: 'Paleta Segura para Daltônicos',
        generate: 'Gerar',
        harmony_title: 'Harmonia de Cores',
        complementary: 'Complementar',
        analogous: 'Análogo',
        triadic: 'Tríade',
        recent_title: 'Cores Recentes',
        favorites_title: 'Favoritos',
        export_css: 'Exportar Variáveis CSS',
        export_json: 'Exportar JSON',
        export_png: 'Exportar Amostra PNG',
        whole_site_label: 'Pré-visualizar todo o site neste modo',
        image_tools_title: 'Ferramentas de Imagem',
        drop_zone: 'Arraste e solte uma imagem aqui, ou cole da área de transferência',
        webcam_btn: 'Modo de Câmera ao Vivo',
        batch_btn: 'Envio em Lote',
        download_btn: 'Baixar Resultado',
        share_card_btn: 'Cartão Antes/Depois',
        chart_checker_title: 'Verificador de Gráficos',
        chart_upload_btn: 'Enviar Gráfico',
        chart_checker_placeholder: 'Envie uma imagem de gráfico para verificar se suas cores permanecem distinguíveis para pessoas daltônicas.',
        color_search_label: 'Pesquisar por nome de cor',
        color_search_placeholder: 'ex. azul escuro',
        color_search_not_found: 'Nenhum nome de cor correspondente encontrado neste idioma.',
        accessibility_audit_title: 'Auditoria de Acessibilidade',
        accessibility_audit_desc: 'Envie um design ou imagem para auditar suas cores dominantes quanto ao contraste de texto (WCAG) e segurança para daltônicos.',
        accessibility_audit_upload_btn: 'Enviar Design',
        accessibility_audit_placeholder: 'Envie uma imagem para executar uma auditoria de acessibilidade.',
        audit_not_enough_colors: 'Não há cores distintas suficientes detectadas para auditar.',
        audit_contrast_title: 'Contraste de Texto (WCAG)',
        audit_cb_title: 'Segurança para Daltônicos',
        audit_pass_aa: 'Aprova AA para texto normal (4.5:1+)',
        audit_pass_aa_large: 'Aprova AA somente para texto grande/UI (3:1+)',
        audit_fail_aa: 'Não aprova WCAG AA — contraste muito baixo para texto',
        audit_ratio_prefix: 'Proporção de contraste: ',
        audit_low_contrast_intro: 'Estes pares de cores podem não ter contraste suficiente para texto:',
        audit_no_low_contrast: 'Nenhum par de baixo contraste detectado entre as cores dominantes.',
        audit_cb_warning_intro: 'Estes pares de cores podem parecer iguais para pessoas daltônicas:',
        audit_cb_safe: 'As cores dominantes permanecem distinguíveis nas simulações de daltonismo.',
        accessibility_h3: 'Acessibilidade',
        dyslexia_font_label: 'Fonte amigável para dislexia',
        reduce_motion_label: 'Reduzir movimento',
        personalization_h3: 'Personalização',
        my_condition_label: 'Minha condição (seleciona a simulação automaticamente):',
        image_history_label: 'Imagens recentes (armazenadas apenas neste dispositivo):',
        about_h3: 'Sobre',
        about_text: 'Olá a todos que abriram isto para saber sobre nós. Somos 2 estudantes normais, Nour Eldeen e Ahmed Sameh. Queríamos construir algo que ajudasse a comunidade, então criamos o ColorView Pro para ajudar pessoas daltônicas e quem projeta para elas. Você pode escolher cores em HEX, RGB e HSL, simular 8 tipos de daltonismo com severidade ajustável, verificar contraste e paletas seguras, e pré-visualizar suas próprias imagens e até sua câmera em cada modo. Usamos ferramentas de IA para aprender e avançar mais rápido enquanto construíamos isso. Obrigado por experimentar — mais atualizações estão chegando em breve.',
        about_credit: '— Nour Eldeen & Ahmed Sameh',
        ishihara_modal_title: 'Autoteste de Daltonismo',
        ishihara_intro_desc: 'Faça um teste curto para ver que tipo de visão de cor você pode ter. Usa pranchas geradas, não é um dispositivo médico.',
        ishihara_start_btn: 'Fazer o Teste',
        ishihara_know_btn: 'Já Sei Minha Condição',
        ishihara_skip_btn: 'Pular',
        ishihara_question: 'Que número você vê?',
        ishihara_cant_see: 'Não consigo ver nenhum número',
        ishihara_skip_test_link: 'Pular teste',
        ishihara_result_prefix: 'Você tem ',
        ishihara_result_normal: 'Você tem visão de cor normal!',
        ishihara_disclaimer: 'Isto é uma autoavaliação informal, não um diagnóstico médico. Consulte um oftalmologista para um diagnóstico oficial.',
        ishihara_apply_btn: 'Aplicar e Fechar',
        ishihara_retake_link: 'Refazer teste',
        ishihara_retake_settings_btn: 'Fazer o Teste de Daltonismo',
        danger_safe_note: '✓ Nenhuma confusão comum detectada para esta cor.',
        danger_warning_template: '⚠ No modo {mode}, esta cor pode ser confundida com: {names}.',
        danger_colors: {
            Red: 'Vermelho', Green: 'Verde', Brown: 'Marrom',
            Orange: 'Laranja', Blue: 'Azul', Purple: 'Roxo'
        },
        custom_accent_label: 'Cor de destaque personalizada:',
        achievement_unlocked_prefix: 'Conquista desbloqueada: ',
        locked_label: 'Bloqueado',
        unlocked_label: 'Desbloqueado',
        select_options: {
            none_full: 'Sem Simulação (Visão Normal)',
            protanopia_full: 'Protanopia (Cego ao Vermelho)',
            protanomaly_full: 'Protanomalia (Vermelho Fraco)',
            deuteranopia_full: 'Deuteranopia (Cego ao Verde)',
            deuteranomaly_full: 'Deuteranomalia (Verde Fraco)',
            tritanopia_full: 'Tritanopia (Cego ao Azul)',
            tritanomaly_full: 'Tritanomalia (Azul Fraco)',
            achromatopsia_full: 'Acromatopsia (Monocromático)',
            achromatomaly_full: 'Acromatomalia (Monocromático Fraco)',
            none_short: 'Nenhum / Não tenho certeza',
            protanopia_short: 'Protanopia',
            protanomaly_short: 'Protanomalia',
            deuteranopia_short: 'Deuteranopia',
            deuteranomaly_short: 'Deuteranomalia',
            tritanopia_short: 'Tritanopia',
            tritanomaly_short: 'Tritanomalia',
            achromatopsia_short: 'Acromatopsia'
        },
        achievements: {
            uploaded_image: 'Primeiro Envio',
            used_eyedropper: 'Profissional do Conta-gotas',
            favorite_color: 'Colecionador de Cores',
            tried_all_modes: 'Espectro Completo',
            used_webcam: 'Espectador ao Vivo',
            used_batch: 'Mestre dos Lotes',
            exported_palette: 'Exportador',
            checked_chart: 'Verificador de Gráficos',
            downloaded_result: 'Baixador',
            shared_card: 'Contador de Histórias',
            dark_mode_used: 'Coruja Noturna',
            custom_theme_used: 'Toque Pessoal'
        },
        lang_options: [
            { code: 'en', name: 'English' },
            { code: 'ar', name: 'العربية' },
            { code: 'es', name: 'Español' },
            { code: 'ru', name: 'Русский' },
            { code: 'fr', name: 'Français' },
            { code: 'de', name: 'Deutsch' },
            { code: 'pt', name: 'Português' }
        ],
        info: {
            none: {
                title: 'Nenhuma Simulação Selecionada',
                points: [
                    'Selecione um modo de daltonismo acima para saber mais sobre ele.',
                    'As caixas abaixo mostrarão como seu design fica nesse modo.'
                ]
            },
            protanopia: {
                title: 'Protanopia (Cego ao Vermelho)',
                points: [
                    'A protanopia é um tipo de daltonismo em que o olho não consegue detectar a luz vermelha.',
                    'Pessoas com essa condição costumam confundir vermelho com verde ou marrom.',
                    'Tons vermelhos podem parecer mais escuros do que realmente são.',
                    'Geralmente é hereditária e está presente desde o nascimento.',
                    'A vida diária é normal, mas algumas tarefas baseadas em cor podem ser mais difíceis.'
                ]
            },
            protanomaly: {
                title: 'Protanomalia (Vermelho Fraco)',
                points: [
                    'A protanomalia é uma forma mais leve de deficiência ao vermelho, não daltonismo completo.',
                    'Vermelhos, laranjas e verdes podem parecer suaves ou deslocados.',
                    'O controle de severidade mostra uma versão mais leve da mudança da protanopia.',
                    'Geralmente é hereditária e está presente desde o nascimento.'
                ]
            },
            deuteranopia: {
                title: 'Deuteranopia (Cego ao Verde)',
                points: [
                    'A deuteranopia é um tipo de daltonismo em que o olho não consegue detectar a luz verde.',
                    'Pessoas com essa condição costumam confundir verde com vermelho ou amarelo.',
                    'Tons verdes podem parecer opacos ou desbotados.',
                    'Geralmente é hereditária e está presente desde o nascimento.',
                    'A vida diária é normal, mas algumas tarefas baseadas em cor podem ser mais difíceis.'
                ]
            },
            deuteranomaly: {
                title: 'Deuteranomalia (Verde Fraco)',
                points: [
                    'A deuteranomalia é a deficiência de cor mais comum, uma forma mais leve de fraqueza ao verde.',
                    'Verde e vermelho podem parecer mais próximos do que realmente são.',
                    'O controle de severidade mostra uma versão mais leve da mudança da deuteranopia.',
                    'Geralmente é hereditária e está presente desde o nascimento.'
                ]
            },
            tritanopia: {
                title: 'Tritanopia (Cego ao Azul)',
                points: [
                    'A tritanopia é um tipo de daltonismo em que o olho não consegue detectar a luz azul.',
                    'Pessoas com essa condição costumam confundir azul com verde ou amarelo.',
                    'Tons azuis podem parecer mais esverdeados ou desbotados.',
                    'Geralmente é hereditária e está presente desde o nascimento.',
                    'A vida diária é normal, mas algumas tarefas baseadas em cor podem ser mais difíceis.'
                ]
            },
            tritanomaly: {
                title: 'Tritanomalia (Azul Fraco)',
                points: [
                    'A tritanomalia é uma forma mais rara e leve de deficiência azul-amarelo.',
                    'Pode ser mais difícil diferenciar azul de verde, ou amarelo de rosa.',
                    'O controle de severidade mostra uma versão mais leve da mudança da tritanopia.'
                ]
            },
            achromatopsia: {
                title: 'Acromatopsia (Monocromático)',
                points: [
                    'A monocromacia é uma forma rara de daltonismo em que o olho não consegue distinguir nenhuma cor.',
                    'Pessoas com essa condição veem o mundo em tons de cinza, preto e branco.',
                    'Ocorre quando dois ou todos os três tipos de células cone não funcionam.',
                    'Geralmente é hereditária e aparece desde o nascimento.',
                    'A vida diária é normal, mas tarefas baseadas em cor podem ser muito mais difíceis.'
                ]
            },
            achromatomaly: {
                title: 'Acromatomalia (Monocromático Fraco)',
                points: [
                    'A acromatomalia é uma forma mais leve de monocromacia — as cores parecem desbotadas em vez de totalmente cinzas.',
                    'Ocorre quando as células cone funcionam, mas fracamente.',
                    'O controle de severidade mostra uma versão mais leve da mudança da acromatopsia.'
                ]
            }
        },
        facts: [
            'Aproximadamente 1 em cada 12 homens e 1 em cada 200 mulheres têm alguma forma de deficiência na visão de cores.',
            'A deuteranomalia (verde fraco) é o tipo mais comum de daltonismo.',
            'Os cães não são totalmente daltônicos — eles veem bem azuis e amarelos, mas não muito bem vermelhos e verdes.',
            'O daltonismo total (acromatopsia) é raro, afetando cerca de 1 em cada 30.000 pessoas.',
            'O azul é a cor mais universalmente preferida em todas as culturas.',
            'Os camarões-louva-a-deus têm até 16 tipos de receptores de cor — os humanos têm apenas 3.',
            'O daltonismo é muito mais comum em homens porque os genes envolvidos estão no cromossomo X.',
            'O teste de Ishihara, ainda usado hoje, foi criado em 1917 pelo Dr. Shinobu Ishihara.'
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
// Multilingual color-name search
// Only understands the 7 languages the site itself supports (see `translations`
// above). A query in any other language simply won't match anything, which is
// intentional: it keeps results predictable instead of guessing.
// ====================================
const COLOR_SEARCH_DATA = {
    en: {
        bases: {
            red: '#FF0000', orange: '#FFA500', yellow: '#FFFF00', green: '#008000', cyan: '#00FFFF',
            blue: '#0000FF', purple: '#800080', pink: '#FFC0CB', magenta: '#FF00FF', brown: '#A52A2A',
            gray: '#808080', grey: '#808080', black: '#000000', white: '#FFFFFF', teal: '#008080',
            navy: '#000080', maroon: '#800000', olive: '#808000', gold: '#FFD700', silver: '#C0C0C0',
            beige: '#F5F5DC', turquoise: '#40E0D0', indigo: '#4B0082', violet: '#8A2BE2', lime: '#00FF00',
            mint: '#98FF98', coral: '#FF7F50', salmon: '#FA8072', khaki: '#F0E68C', lavender: '#E6E6FA', plum: '#DDA0DD'
        },
        modifiers: {
            dark: ['dark'], light: ['light'], bright: ['bright', 'vivid'], pale: ['pale']
        }
    },
    ar: {
        bases: {
            'احمر': '#FF0000', 'برتقالي': '#FFA500', 'اصفر': '#FFFF00', 'اخضر': '#008000', 'سماوي': '#00FFFF',
            'ازرق': '#0000FF', 'بنفسجي': '#800080', 'وردي': '#FFC0CB', 'ارجواني': '#FF00FF', 'بني': '#A52A2A',
            'رمادي': '#808080', 'اسود': '#000000', 'ابيض': '#FFFFFF', 'كحلي': '#000080', 'عنابي': '#800000',
            'زيتي': '#808000', 'ذهبي': '#FFD700', 'فضي': '#C0C0C0', 'بيج': '#F5F5DC', 'فيروزي': '#40E0D0',
            'نيلي': '#4B0082'
        },
        modifiers: {
            dark: ['غامق', 'داكن'], light: ['فاتح'], bright: ['زاهي', 'ساطع'], pale: ['باهت']
        }
    },
    es: {
        bases: {
            rojo: '#FF0000', naranja: '#FFA500', amarillo: '#FFFF00', verde: '#008000', cian: '#00FFFF',
            azul: '#0000FF', morado: '#800080', purpura: '#800080', rosa: '#FFC0CB', magenta: '#FF00FF',
            marron: '#A52A2A', gris: '#808080', negro: '#000000', blanco: '#FFFFFF', dorado: '#FFD700',
            plateado: '#C0C0C0', turquesa: '#40E0D0', violeta: '#8A2BE2', beige: '#F5F5DC', oliva: '#808000',
            granate: '#800000', indigo: '#4B0082', marino: '#000080'
        },
        modifiers: {
            dark: ['oscuro'], light: ['claro'], bright: ['brillante', 'vivo'], pale: ['palido']
        }
    },
    ru: {
        bases: {
            'красный': '#FF0000', 'оранжевый': '#FFA500', 'желтый': '#FFFF00', 'зеленый': '#008000', 'голубой': '#00FFFF',
            'синий': '#0000FF', 'фиолетовый': '#800080', 'розовый': '#FFC0CB', 'пурпурный': '#FF00FF', 'коричневый': '#A52A2A',
            'серый': '#808080', 'черный': '#000000', 'белый': '#FFFFFF', 'золотой': '#FFD700', 'серебристый': '#C0C0C0',
            'бирюзовый': '#40E0D0', 'сиреневый': '#8A2BE2', 'бежевый': '#F5F5DC', 'оливковый': '#808000',
            'бордовый': '#800000', 'индиго': '#4B0082', 'морской': '#000080'
        },
        modifiers: {
            dark: ['темный', 'темно'], light: ['светлый', 'светло'], bright: ['яркий', 'ярко'], pale: ['бледный', 'бледно']
        }
    },
    fr: {
        bases: {
            rouge: '#FF0000', orange: '#FFA500', jaune: '#FFFF00', vert: '#008000', cyan: '#00FFFF',
            bleu: '#0000FF', violet: '#800080', rose: '#FFC0CB', magenta: '#FF00FF', marron: '#A52A2A',
            gris: '#808080', noir: '#000000', blanc: '#FFFFFF', dore: '#FFD700', argente: '#C0C0C0',
            turquoise: '#40E0D0', beige: '#F5F5DC', olive: '#808000', bordeaux: '#800000', indigo: '#4B0082',
            marine: '#000080'
        },
        modifiers: {
            dark: ['fonce', 'sombre'], light: ['clair'], bright: ['vif'], pale: ['pale']
        }
    },
    de: {
        bases: {
            rot: '#FF0000', orange: '#FFA500', gelb: '#FFFF00', grun: '#008000', cyan: '#00FFFF',
            blau: '#0000FF', lila: '#800080', violett: '#800080', rosa: '#FFC0CB', magenta: '#FF00FF',
            braun: '#A52A2A', grau: '#808080', schwarz: '#000000', weiss: '#FFFFFF', gold: '#FFD700',
            silber: '#C0C0C0', turkis: '#40E0D0', beige: '#F5F5DC', oliv: '#808000', bordeaux: '#800000',
            indigo: '#4B0082', marine: '#000080'
        },
        modifiers: {
            dark: ['dunkel'], light: ['hell'], bright: ['leuchtend', 'knallig'], pale: ['blass']
        },
        // German commonly writes modifier+color as one compound word (e.g. "dunkelblau")
        compoundPrefixes: {
            dark: ['dunkel'], light: ['hell']
        }
    },
    pt: {
        bases: {
            vermelho: '#FF0000', laranja: '#FFA500', amarelo: '#FFFF00', verde: '#008000', ciano: '#00FFFF',
            azul: '#0000FF', roxo: '#800080', rosa: '#FFC0CB', magenta: '#FF00FF', marrom: '#A52A2A',
            cinza: '#808080', preto: '#000000', branco: '#FFFFFF', dourado: '#FFD700', prateado: '#C0C0C0',
            turquesa: '#40E0D0', bege: '#F5F5DC', oliva: '#808000', bordo: '#800000', indigo: '#4B0082',
            marinho: '#000080'
        },
        modifiers: {
            dark: ['escuro'], light: ['claro'], bright: ['vivo', 'brilhante'], pale: ['palido']
        }
    }
};
// Normalizes a query so accents/diacritics and Arabic letter variants don't
// prevent an otherwise-correct match (e.g. "café" vs "cafe", or Arabic alef forms).
function normalizeColorQuery(str, langCode) {
    let s = (str || '').trim().toLowerCase();
    if (langCode === 'ar') {
        s = s.replace(/[\u064B-\u0652\u0640]/g, ''); // strip harakat/tatweel
        s = s.replace(/[إأآا]/g, 'ا');
        s = s.replace(/ى/g, 'ي');
        s = s.replace(/ة/g, 'ه');
        s = s.split(/\s+/).map(tok => tok.replace(/^ال/, '')).join(' ');
    } else if (langCode === 'ru') {
        s = s.replace(/ё/g, 'е'); // common alternate spelling, no NFD stripping (would corrupt й)
    } else {
        s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // strip Latin accents (es/fr/de/pt/en)
    }
    s = s.replace(/-/g, ' ');
    return s.replace(/\s+/g, ' ').trim();
}
// Nudges a base hue's HSL lightness/saturation to reflect a "dark/light/bright/pale" modifier.
function applyColorModifier(hex, modifierKey) {
    const [h, s, l] = hexToHsl(hex);
    let ns = s, nl = l;
    if (modifierKey === 'dark') { nl = Math.max(8, Math.round(l * 0.5)); }
    else if (modifierKey === 'light') { nl = Math.min(90, Math.round(l + (100 - l) * 0.55)); }
    else if (modifierKey === 'bright') { ns = Math.min(100, s + 30); nl = Math.max(35, Math.min(60, l)); }
    else if (modifierKey === 'pale') { ns = Math.max(10, Math.round(s * 0.35)); nl = Math.min(90, Math.round(l + (100 - l) * 0.5)); }
    const [r, g, b] = hslToRgb(h, ns, nl);
    return rgbToHex(r, g, b).toUpperCase();
}
// Looks up a color by name, restricted to the language passed in (one of the
// site's 7 supported languages). Returns a hex string, or null if nothing matched.
function searchColorByName(query, langCode) {
    const data = COLOR_SEARCH_DATA[langCode] || COLOR_SEARCH_DATA.en;
    const q = normalizeColorQuery(query, langCode);
    if (!q) return null;
    // Allow matching one of the site's extended English display names too (e.g. "Curious Blue")
    if (langCode === 'en') {
        const direct = NAMED_COLORS.find(([name]) => normalizeColorQuery(name, 'en') === q);
        if (direct) return direct[1].toUpperCase();
    }
    let modifierKey = null;
    let remaining = q;
    // German-style compound words: "dunkelblau" -> "dunkel" + "blau"
    if (data.compoundPrefixes) {
        for (const [modKey, prefixes] of Object.entries(data.compoundPrefixes)) {
            for (const prefix of prefixes) {
                if (q.startsWith(prefix) && q.length > prefix.length && data.bases[q.slice(prefix.length)]) {
                    modifierKey = modKey;
                    remaining = q.slice(prefix.length);
                    break;
                }
            }
            if (modifierKey) break;
        }
    }
    if (data.bases[remaining]) {
        return modifierKey ? applyColorModifier(data.bases[remaining], modifierKey) : data.bases[remaining].toUpperCase();
    }
    // Space-separated forms: "dark blue", "ازرق غامق", "bleu foncé" (order doesn't matter)
    const tokens = q.split(' ').filter(Boolean);
    let baseHex = null;
    tokens.forEach(tok => {
        if (data.bases[tok]) baseHex = data.bases[tok];
        if (!modifierKey) {
            for (const [modKey, words] of Object.entries(data.modifiers)) {
                if (words.includes(tok)) { modifierKey = modKey; break; }
            }
        }
    });
    if (!baseHex) return null;
    return modifierKey ? applyColorModifier(baseHex, modifierKey) : baseHex.toUpperCase();
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
    if (source !== 'rgb') {
        rgbInput.value = `${R}, ${G}, ${B}`;
    }
    if (source !== 'hsl') {
        hslInput.value = `${H}, ${S}%, ${L}%`;
    }
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
    const lang = currentLangData();
    const results = checkDangerPairs(hex);
    dangerPairsBox.innerHTML = '';
    dangerPairsBox.classList.add('visible');
    if (results.length === 0) {
        const p = document.createElement('p');
        p.className = 'safe-note';
        p.textContent = lang.danger_safe_note;
        dangerPairsBox.appendChild(p);
        return;
    }
    const seenModes = new Set();
    results.forEach(r => {
        seenModes.add(r.mode);
    });
    const modeKey = { protanopia: 'protanopia_short', deuteranopia: 'deuteranopia_short', tritanopia: 'tritanopia_short' };
    seenModes.forEach(mode => {
        const namesForMode = results.filter(r => r.mode === mode).map(r => (lang.danger_colors && lang.danger_colors[r.name]) || r.name);
        const modeName = (lang.select_options && lang.select_options[modeKey[mode]]) || mode;
        const namesText = namesForMode.join(', ');
        // Split the template around {mode} so the mode name can be wrapped in its own
        // themed span (accent color) while the rest of the sentence stays warning-red.
        const filled = lang.danger_warning_template
            .replace('{mode}', '\u0000MODE\u0000')
            .replace('{names}', namesText);
        const [beforeMode, afterMode = ''] = filled.split('\u0000MODE\u0000');
        const p = document.createElement('p');
        p.className = 'danger-warning';
        p.appendChild(document.createTextNode(beforeMode));
        const modeSpan = document.createElement('span');
        modeSpan.className = 'danger-mode-name';
        modeSpan.textContent = modeName;
        p.appendChild(modeSpan);
        p.appendChild(document.createTextNode(afterMode));
        dangerPairsBox.appendChild(p);
    });
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
// Accessibility Audit (contrast + colorblind safety for an uploaded design)
// ====================================
// WCAG 2.x relative luminance / contrast ratio (see w3.org/TR/WCAG21/#dfn-relative-luminance)
function relativeLuminance(hex) {
    const rgb = hexToRgb(hex);
    if (!rgb) return 0;
    const [r, g, b] = rgb.map(v => {
        const c = v / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrastRatio(hex1, hex2) {
    const l1 = relativeLuminance(hex1), l2 = relativeLuminance(hex2);
    const lighter = Math.max(l1, l2), darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
}
// Samples an image onto a small canvas and buckets pixels into a handful of dominant colors.
// Unlike the Chart Checker (which skips near-white/near-black), the audit keeps them,
// since a light background vs. dark text is exactly the kind of pair we need to check.
function getDominantColors(dataUrl, callback) {
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
            callback(null);
            return;
        }
        const buckets = {};
        for (let i = 0; i < data.length; i += 4 * 5) {
            const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
            if (a < 200) continue;
            const key = [Math.round(r / 24) * 24, Math.round(g / 24) * 24, Math.round(b / 24) * 24].join(',');
            buckets[key] = (buckets[key] || 0) + 1;
        }
        const sorted = Object.entries(buckets).sort((a, b) => b[1] - a[1]).slice(0, 6);
        callback(sorted.map(([key]) => {
            const [r, g, b] = key.split(',').map(Number);
            return rgbToHex(r, g, b);
        }));
    };
    img.src = dataUrl;
}
function pairSwatchesHtml(hexA, hexB) {
    return `<div class="audit-pair-swatches"><div class="swatch" style="background:${hexA};" title="${hexA}"></div><div class="swatch" style="background:${hexB};" title="${hexB}"></div></div>`;
}
function runAccessibilityAudit(dataUrl) {
    const langCode = localStorage.getItem('cvp_language') || 'en';
    const lang = translations[langCode] || translations.en;
    getDominantColors(dataUrl, (dominant) => {
        if (!dominant) {
            auditResult.textContent = 'Could not analyze this image (it may be from a different origin).';
            return;
        }
        if (dominant.length < 2) {
            auditResult.innerHTML = `<p>${lang.audit_not_enough_colors}</p>`;
            return;
        }
        // --- Contrast pairs (every combination, sorted worst-first) ---
        const contrastPairs = [];
        for (let i = 0; i < dominant.length; i++) {
            for (let j = i + 1; j < dominant.length; j++) {
                contrastPairs.push({ a: dominant[i], b: dominant[j], ratio: contrastRatio(dominant[i], dominant[j]) });
            }
        }
        contrastPairs.sort((x, y) => x.ratio - y.ratio);
        const lowContrast = contrastPairs.filter(p => p.ratio < 4.5).slice(0, 5);

        let html = '<div class="swatch-row">' + dominant.map(c => `<div class="swatch" style="background:${c};" title="${c}"></div>`).join('') + '</div>';

        html += `<div class="audit-section"><h5>${lang.audit_contrast_title}</h5>`;
        if (lowContrast.length) {
            html += `<p>${lang.audit_low_contrast_intro}</p>`;
            lowContrast.forEach(p => {
                const badge = p.ratio >= 3 ? `<span class="audit-badge pass-large">${lang.audit_pass_aa_large}</span>` : `<span class="audit-badge fail">${lang.audit_fail_aa}</span>`;
                html += `<div class="audit-pair-row">${pairSwatchesHtml(p.a, p.b)}<div class="audit-pair-info">${lang.audit_ratio_prefix}${p.ratio.toFixed(2)}:1 ${badge}</div></div>`;
            });
        } else {
            html += `<p class="safe-note">✓ ${lang.audit_no_low_contrast}</p>`;
        }
        html += '</div>';

        // --- Colorblind-confusion pairs ---
        let cbWarnings = [];
        ['protanopia', 'deuteranopia', 'tritanopia'].forEach(mode => {
            for (let i = 0; i < dominant.length; i++) {
                for (let j = i + 1; j < dominant.length; j++) {
                    const simA = simulateHex(dominant[i], mode, 100);
                    const simB = simulateHex(dominant[j], mode, 100);
                    if (colorDistance(simA, simB) < 30) {
                        cbWarnings.push({ mode, a: dominant[i], b: dominant[j] });
                    }
                }
            }
        });
        html += `<div class="audit-section"><h5>${lang.audit_cb_title}</h5>`;
        if (cbWarnings.length) {
            html += `<p>${lang.audit_cb_warning_intro}</p>`;
            cbWarnings.slice(0, 5).forEach(w => {
                html += `<div class="audit-pair-row">${pairSwatchesHtml(w.a, w.b)}<div class="audit-pair-info"><span class="danger-mode-name">${w.mode}</span></div></div>`;
            });
        } else {
            html += `<p class="safe-note">✓ ${lang.audit_cb_safe}</p>`;
        }
        html += '</div>';

        auditResult.innerHTML = html;
    });
}
if (auditImageUpload) {
    auditImageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) handleImageFile(file, runAccessibilityAudit);
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
    localStorage.setItem('cvp_language', langCode);
    const modeVal = colorblindSelect.value;
    document.body.dir = lang.dir;
    htmlEl.lang = langCode;
    htmlEl.dir = lang.dir;
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
    setText('chartUploadLabel', lang.chart_upload_btn);
    // Color name search
    setText('colorSearchLabel', lang.color_search_label);
    if (colorSearchInput) colorSearchInput.placeholder = lang.color_search_placeholder;
    if (colorSearchMsg && colorSearchMsg.style.display !== 'none') {
        colorSearchMsg.textContent = lang.color_search_not_found;
    }
    // Accessibility audit
    setText('accessibilityAuditTitle', lang.accessibility_audit_title);
    setText('accessibilityAuditDesc', lang.accessibility_audit_desc);
    setText('auditUploadLabel', lang.accessibility_audit_upload_btn);
    if (auditResult && !auditResult.querySelector('.audit-section')) {
        auditResult.textContent = lang.accessibility_audit_placeholder;
    }
    setText('customAccentLabel', lang.custom_accent_label);
    setText('aboutText', lang.about_text);
    setText('aboutCredit', lang.about_credit);
    // Ishihara self-test
    setText('ishiharaModalTitle', lang.ishihara_modal_title);
    setText('ishiharaIntroDesc', lang.ishihara_intro_desc);
    setText('ishiharaStartBtn', lang.ishihara_start_btn);
    setText('ishiharaKnowBtn', lang.ishihara_know_btn);
    setText('ishiharaSkipBtn', lang.ishihara_skip_btn);
    setText('ishiharaSkipMidTestBtn', lang.ishihara_skip_test_link);
    setText('ishiharaDisclaimer', lang.ishihara_disclaimer);
    setText('ishiharaApplyBtn', lang.ishihara_apply_btn);
    setText('ishiharaRetakeLinkBtn', lang.ishihara_retake_link);
    setText('ishiharaRetakeBtn', lang.ishihara_retake_settings_btn);
    updateIshiharaStatusNote();
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
    if (dangerPairsBox && dangerPairsBox.classList.contains('visible') && hexInput) {
        renderDangerPairs(hexInput.value);
    }
    updateModeInfo(modeVal, lang);
    languageSelect.innerHTML = '';
    lang.lang_options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.code;
        opt.textContent = option.name;
        languageSelect.appendChild(opt);
    });
    languageSelect.value = langCode;
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
function detectDeviceLayout() {
    const ua = navigator.userAgent || '';
    const isMobileUA = /Android|iPhone|iPad|iPod|Mobile|Windows Phone/i.test(ua);
    const isNarrowScreen = window.matchMedia('(max-width: 768px)').matches;
    return (isMobileUA || isNarrowScreen) ? 'mobile' : 'pc';
}

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
// --- RGB input (editable) ---
rgbInput.addEventListener('input', (e) => {
    const match = e.target.value.match(/(-?\d+)\D+(-?\d+)\D+(-?\d+)/);
    if (!match) return;
    const r = Math.max(0, Math.min(255, parseInt(match[1], 10)));
    const g = Math.max(0, Math.min(255, parseInt(match[2], 10)));
    const b = Math.max(0, Math.min(255, parseInt(match[3], 10)));
    const [newH, newS, newL] = hexToHsl(rgbToHex(r, g, b));
    updateColor('rgb', newH, newS, newL);
});
rgbInput.addEventListener('blur', () => updateColor('rgb-blur', H, S, L)); // snap back to a clean "r, g, b" format
rgbInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); rgbInput.blur(); } });
// --- HSL input (editable) ---
hslInput.addEventListener('input', (e) => {
    const match = e.target.value.match(/(-?\d+)\D+(-?\d+)%?\D+(-?\d+)%?/);
    if (!match) return;
    const h = ((parseInt(match[1], 10) % 360) + 360) % 360;
    const s = Math.max(0, Math.min(100, parseInt(match[2], 10)));
    const l = Math.max(0, Math.min(100, parseInt(match[3], 10)));
    updateColor('hsl', h, s, l);
});
hslInput.addEventListener('blur', () => updateColor('hsl-blur', H, S, L)); // snap back to a clean "h, s%, l%" format
hslInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); hslInput.blur(); } });
// --- Color name search ---
function runColorSearch() {
    if (!colorSearchInput) return;
    const langCode = localStorage.getItem('cvp_language') || 'en';
    const lang = translations[langCode] || translations.en;
    const hex = searchColorByName(colorSearchInput.value, langCode);
    if (colorSearchMsg) colorSearchMsg.style.display = 'none';
    if (hex) {
        const [newH, newS, newL] = hexToHsl(hex);
        updateColor('search', newH, newS, newL);
    } else if (colorSearchMsg) {
        colorSearchMsg.textContent = lang.color_search_not_found;
        colorSearchMsg.style.display = 'block';
    }
}
if (colorSearchBtn) colorSearchBtn.addEventListener('click', runColorSearch);
if (colorSearchInput) {
    colorSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); runColorSearch(); }
    });
    colorSearchInput.addEventListener('input', () => {
        if (colorSearchMsg) colorSearchMsg.style.display = 'none';
    });
}
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
// Ishihara-style Colorblindness Self-Test
// ====================================
const ishiharaOverlay = document.getElementById('ishiharaOverlay');
const ishiharaIntroScreen = document.getElementById('ishiharaIntroScreen');
const ishiharaTestScreen = document.getElementById('ishiharaTestScreen');
const ishiharaResultScreen = document.getElementById('ishiharaResultScreen');
const ishiharaStartBtn = document.getElementById('ishiharaStartBtn');
const ishiharaKnowBtn = document.getElementById('ishiharaKnowBtn');
const ishiharaSkipBtn = document.getElementById('ishiharaSkipBtn');
const ishiharaSkipMidTestBtn = document.getElementById('ishiharaSkipMidTestBtn');
const ishiharaCanvas = document.getElementById('ishiharaCanvas');
const ishiharaProgress = document.getElementById('ishiharaProgress');
const ishiharaQuestion = document.getElementById('ishiharaQuestion');
const ishiharaChoices = document.getElementById('ishiharaChoices');
const ishiharaResultTitle = document.getElementById('ishiharaResultTitle');
const ishiharaApplyBtn = document.getElementById('ishiharaApplyBtn');
const ishiharaRetakeLinkBtn = document.getElementById('ishiharaRetakeLinkBtn');
const ishiharaRetakeBtn = document.getElementById('ishiharaRetakeBtn');
const ishiharaLastResultNote = document.getElementById('ishiharaLastResultNote');

// Plate order matters for scoring below: [control, red-green #1, red-green #2 (protan-leaning), blue-yellow, isoluminant/hue-only]
const ISHIHARA_PLATES = [
    { id: 'control', digit: '5', figure: { h: 170, s: 55, l: 45 }, bg: { h: 330, s: 60, l: 75 }, choices: ['5', '6', '8'] },
    { id: 'rg1', digit: '8', figure: { h: 20, s: 80, l: 55 }, bg: { h: 140, s: 45, l: 55 }, choices: ['8', '3', '6'] },
    { id: 'rg2', digit: '6', figure: { h: 0, s: 55, l: 28 }, bg: { h: 0, s: 0, l: 60 }, choices: ['6', '8', '5'] },
    { id: 'by', digit: '2', figure: { h: 225, s: 65, l: 45 }, bg: { h: 55, s: 70, l: 65 }, choices: ['2', '7', '3'] },
    { id: 'iso', digit: '9', figure: { h: 260, s: 40, l: 55 }, bg: { h: 160, s: 40, l: 55 }, choices: ['9', '4', '7'] }
];

let ishiharaIndex = 0;
let ishiharaAnswers = [];

function digitMask(digit, size) {
    const off = document.createElement('canvas');
    off.width = size;
    off.height = size;
    const octx = off.getContext('2d');
    octx.clearRect(0, 0, size, size);
    octx.fillStyle = '#000';
    octx.font = `bold ${Math.floor(size * 0.72)}px sans-serif`;
    octx.textAlign = 'center';
    octx.textBaseline = 'middle';
    octx.fillText(digit, size / 2, size / 2 + size * 0.03);
    return octx.getImageData(0, 0, size, size);
}

function renderIshiharaPlate(canvas, plate) {
    const size = canvas.width;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, size, size);
    const mask = digitMask(plate.digit, size);
    const R = size / 2;
    const cx = R, cy = R;
    const dotCount = Math.floor((size * size) / 30);
    for (let i = 0; i < dotCount; i++) {
        let x, y, dist;
        do {
            x = Math.random() * size;
            y = Math.random() * size;
            dist = Math.hypot(x - cx, y - cy);
        } while (dist > R - 4);
        const idx = (Math.floor(y) * size + Math.floor(x)) * 4;
        const isFigure = mask.data[idx + 3] > 128;
        const base = isFigure ? plate.figure : plate.bg;
        const hue = base.h + (Math.random() * 14 - 7);
        const sat = Math.max(0, Math.min(100, base.s + (Math.random() * 16 - 8)));
        const light = Math.max(0, Math.min(100, base.l + (Math.random() * 14 - 7)));
        const radius = 2.5 + Math.random() * 4.5;
        ctx.beginPath();
        ctx.fillStyle = `hsl(${hue}, ${sat}%, ${light}%)`;
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

function getIshiharaLang() {
    return translations[localStorage.getItem('cvp_language') || 'en'] || translations.en;
}

function showIshiharaScreen(name) {
    ishiharaIntroScreen.style.display = name === 'intro' ? 'block' : 'none';
    ishiharaTestScreen.style.display = name === 'test' ? 'block' : 'none';
    ishiharaResultScreen.style.display = name === 'result' ? 'block' : 'none';
}

function openIshiharaModal(screen) {
    ishiharaOverlay.style.display = 'flex';
    showIshiharaScreen(screen);
}

function closeIshiharaModal() {
    ishiharaOverlay.style.display = 'none';
}

function startIshiharaTest() {
    ishiharaIndex = 0;
    ishiharaAnswers = [];
    showIshiharaScreen('test');
    renderIshiharaQuestion();
}

function renderIshiharaQuestion() {
    const lang = getIshiharaLang();
    const plate = ISHIHARA_PLATES[ishiharaIndex];
    renderIshiharaPlate(ishiharaCanvas, plate);
    ishiharaProgress.textContent = `${ishiharaIndex + 1} / ${ISHIHARA_PLATES.length}`;
    ishiharaQuestion.textContent = lang.ishihara_question;
    const opts = [...plate.choices];
    for (let i = opts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    ishiharaChoices.innerHTML = '';
    opts.forEach((val) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ishihara-choice-btn';
        btn.textContent = val;
        btn.addEventListener('click', () => handleIshiharaAnswer(val, plate.digit));
        ishiharaChoices.appendChild(btn);
    });
    const cantSeeBtn = document.createElement('button');
    cantSeeBtn.type = 'button';
    cantSeeBtn.className = 'ishihara-choice-btn ishihara-cant-see-btn';
    cantSeeBtn.textContent = lang.ishihara_cant_see;
    cantSeeBtn.addEventListener('click', () => handleIshiharaAnswer('none', plate.digit));
    ishiharaChoices.appendChild(cantSeeBtn);
}

function handleIshiharaAnswer(value) {
    const plate = ISHIHARA_PLATES[ishiharaIndex];
    ishiharaAnswers.push({ id: plate.id, correct: value === plate.digit, cantSee: value === 'none' });
    ishiharaIndex++;
    if (ishiharaIndex < ISHIHARA_PLATES.length) {
        renderIshiharaQuestion();
    } else {
        finishIshiharaTest();
    }
}

function scoreIshiharaAnswers(answers) {
    const byId = {};
    answers.forEach((a) => { byId[a.id] = a; });
    const control = byId.control, rg1 = byId.rg1, rg2 = byId.rg2, by = byId.by, iso = byId.iso;
    let result = 'none';
    if (!control.correct && !rg1.correct && !rg2.correct && !by.correct) {
        result = iso.cantSee ? 'achromatopsia' : (!iso.correct ? 'achromatomaly' : 'none');
    } else if (!rg1.correct) {
        if (!rg2.correct) {
            result = (rg1.cantSee || rg2.cantSee) ? 'protanopia' : 'protanomaly';
        } else {
            result = rg1.cantSee ? 'deuteranopia' : 'deuteranomaly';
        }
    } else if (!by.correct) {
        result = by.cantSee ? 'tritanopia' : 'tritanomaly';
    } else if (!iso.correct) {
        result = iso.cantSee ? 'achromatopsia' : 'achromatomaly';
    } else {
        result = 'none';
    }
    return result;
}

function finishIshiharaTest() {
    const result = scoreIshiharaAnswers(ishiharaAnswers);
    localStorage.setItem('cvp_ishihara_status', 'done');
    localStorage.setItem('cvp_ishihara_result', result);
    showIshiharaResult(result);
}

function showIshiharaResult(resultCode) {
    const lang = getIshiharaLang();
    ishiharaResultTitle.textContent = resultCode === 'none'
        ? lang.ishihara_result_normal
        : lang.ishihara_result_prefix + (lang.select_options[resultCode + '_full'] || resultCode);
    showIshiharaScreen('result');
    updateIshiharaStatusNote();
}

function updateIshiharaStatusNote() {
    if (!ishiharaLastResultNote) return;
    const status = localStorage.getItem('cvp_ishihara_status');
    const result = localStorage.getItem('cvp_ishihara_result');
    if (status === 'done' && result) {
        const lang = getIshiharaLang();
        const label = result === 'none' ? lang.ishihara_result_normal : lang.ishihara_result_prefix + (lang.select_options[result + '_full'] || result);
        ishiharaLastResultNote.textContent = label;
        ishiharaLastResultNote.style.display = 'block';
    } else {
        ishiharaLastResultNote.style.display = 'none';
    }
}

function applyIshiharaResult() {
    const result = localStorage.getItem('cvp_ishihara_result') || 'none';
    myConditionSelect.value = result;
    localStorage.setItem('cvp_my_condition', result);
    if (result !== 'none') {
        colorblindSelect.value = result;
        colorblindSelect.dispatchEvent(new Event('change'));
    }
    closeIshiharaModal();
}

function ishiharaKnowCondition() {
    localStorage.setItem('cvp_ishihara_status', 'skipped');
    closeIshiharaModal();
    settingsDrawer.classList.add('open');
    myConditionSelect.focus();
}

function skipIshiharaTest() {
    localStorage.setItem('cvp_ishihara_status', 'skipped');
    closeIshiharaModal();
}

function checkAndShowIshiharaPrompt() {
    const status = localStorage.getItem('cvp_ishihara_status');
    if (!status) {
        openIshiharaModal('intro');
    }
}

if (ishiharaStartBtn) ishiharaStartBtn.addEventListener('click', startIshiharaTest);
if (ishiharaKnowBtn) ishiharaKnowBtn.addEventListener('click', ishiharaKnowCondition);
if (ishiharaSkipBtn) ishiharaSkipBtn.addEventListener('click', skipIshiharaTest);
if (ishiharaSkipMidTestBtn) ishiharaSkipMidTestBtn.addEventListener('click', skipIshiharaTest);
if (ishiharaApplyBtn) ishiharaApplyBtn.addEventListener('click', applyIshiharaResult);
if (ishiharaRetakeLinkBtn) ishiharaRetakeLinkBtn.addEventListener('click', startIshiharaTest);
if (ishiharaRetakeBtn) ishiharaRetakeBtn.addEventListener('click', () => openIshiharaModal('intro'));

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

const storedLayout = localStorage.getItem('cvp_layout') || detectDeviceLayout();
setLayout(storedLayout);

checkAndShowDisclaimer();
updateModeInfo(colorblindSelect.value);
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

updateIshiharaStatusNote();
setTimeout(() => { checkAndShowIshiharaPrompt(); }, 2600);
