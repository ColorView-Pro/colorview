// ELEMENTS
const imageInput = document.getElementById("imageUpload");
const preview = document.getElementById("preview");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const filters = document.querySelectorAll(".filter");
const resetBtn = document.getElementById("btnReset");

const langSelect = document.getElementById("languageSelect");
const themeToggle = document.getElementById("themeToggle");
const logo = document.getElementById("logo");

let originalImage = null;

// ---------------- IMAGE UPLOAD ----------------
imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
        preview.src = e.target.result;
        preview.style.display = "block";

        preview.onload = () => {
            canvas.width = preview.naturalWidth;
            canvas.height = preview.naturalHeight;

            ctx.drawImage(preview, 0, 0);
            originalImage = ctx.getImageData(0, 0, canvas.width, canvas.height);

            canvas.style.display = "block";
        };
    };

    reader.readAsDataURL(file);
});

// ---------------- FILTERS ----------------
const MATRICES = {
    protanopia: [0.567,0.433,0, 0.558,0.442,0, 0,0.242,0.758],
    deuteranopia: [0.625,0.375,0, 0.7,0.3,0, 0,0.3,0.7],
    tritanopia: [0.95,0.05,0, 0,0.433,0.567, 0,0.475,0.525]
};

function applyMatrix(type){
    if (!originalImage) return;

    const m = MATRICES[type];
    const copy = new Uint8ClampedArray(originalImage.data);
    const img = new ImageData(copy, originalImage.width, originalImage.height);

    const d = img.data;
    for (let i=0;i<d.length;i+=4){
        const r = d[i], g = d[i+1], b = d[i+2];
        d[i] = r*m[0] + g*m[1] + b*m[2];
        d[i+1] = r*m[3] + g*m[4] + b*m[5];
        d[i+2] = r*m[6] + g*m[7] + b*m[8];
    }

    ctx.putImageData(img, 0, 0);
}

filters.forEach(btn=>{
    btn.addEventListener("click", () => applyMatrix(btn.dataset.filter));
});

resetBtn.addEventListener("click", () => {
    if (!originalImage) return;
    ctx.putImageData(originalImage, 0, 0);
});

// ---------------- LANGUAGE ----------------
const TEXT = {
    en: {
        subtitle: "Upload an image and preview color‑vision filters",
        upload: "Choose Image",
        pro: "Red‑Weak",
        deu: "Green‑Weak",
        tri: "Blue‑Weak",
        reset: "Reset",
        light: "Light Mode",
        dark: "Gold Mode"
    },
    ar: {
        subtitle: "ارفع صورة واعرض محاكاة ضعف الألوان",
        upload: "اختر صورة",
        pro: "ضعف الأحمر",
        deu: "ضعف الأخضر",
        tri: "ضعف الأزرق",
        reset: "إعادة",
        light: "الوضع الفاتح",
        dark: "وضع ذهبي"
    }
};

function setLanguage(l) {
    document.getElementById("subtitle").textContent = TEXT[l].subtitle;
    document.querySelector(".upload-text").textContent = TEXT[l].upload;
    btnPro.textContent = TEXT[l].pro;
    btnDeu.textContent = TEXT[l].deu;
    btnTri.textContent = TEXT[l].tri;
    resetBtn.textContent = TEXT[l].reset;

    const current = document.documentElement.getAttribute("data-theme") === "gold" ? "dark" : "light";
    themeToggle.textContent = TEXT[l][current];

    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
}

langSelect.addEventListener("change", e => setLanguage(e.target.value));
setLanguage("en");

// ---------------- THEME + LOGO SWITCH ----------------
function setTheme(mode){
    if (mode === "light"){
        document.documentElement.setAttribute("data-theme","light");
        logo.src = "logo.png";
        themeToggle.textContent = TEXT[langSelect.value].light;
    } else {
        document.documentElement.setAttribute("data-theme","gold");
        logo.src = "logo-dark.png";
        themeToggle.textContent = TEXT[langSelect.value].dark;
    }

    localStorage.setItem("theme", mode);
}

themeToggle.addEventListener("click", () => {
    const next = localStorage.getItem("theme") === "light" ? "gold" : "light";
    setTheme(next);
});

// initial load
setTheme(localStorage.getItem("theme") || "gold");
