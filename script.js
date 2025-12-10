const imageUpload = document.getElementById("imageUpload");
const preview = document.getElementById("preview");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let originalImage = null;

// UPLOAD SYSTEM
imageUpload.addEventListener("change", () => {
    const file = imageUpload.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
        preview.src = e.target.result;
        preview.style.display = "block";

        preview.onload = () => {
            canvas.width = preview.width;
            canvas.height = preview.height;

            ctx.drawImage(preview, 0, 0);
            originalImage = ctx.getImageData(0, 0, canvas.width, canvas.height);

            canvas.style.display = "block";
        };
    };

    reader.readAsDataURL(file);
});

// FILTERS
const matrices = {
    pro: [0.567,0.433,0,0, 0.558,0.442,0,0, 0,0.242,0.758,0],
    deu: [0.625,0.375,0,0, 0.7,0.3,0,0, 0,0.3,0.7,0],
    tri: [0.95,0.05,0,0, 0,0.433,0.567,0, 0,0.475,0.525,0]
};

document.querySelectorAll(".filterBtn").forEach(btn => {
    btn.onclick = () => {
        if (!originalImage) return;

        const type = btn.dataset.type;
        const m = matrices[type];

        const imgData = new ImageData(
            new Uint8ClampedArray(originalImage.data),
            originalImage.width,
            originalImage.height
        );

        const d = imgData.data;
        for (let i = 0; i < d.length; i += 4) {
            const r = d[i], g = d[i+1], b = d[i+2];
            d[i]     = r*m[0] + g*m[1] + b*m[2];
            d[i+1]   = r*m[4] + g*m[5] + b*m[6];
            d[i+2]   = r*m[8] + g*m[9] + b*m[10];
        }

        ctx.putImageData(imgData, 0, 0);
    };
});

document.getElementById("resetBtn").onclick = () => {
    if (originalImage) ctx.putImageData(originalImage, 0, 0);
};

// LANGUAGE SYSTEM
const text = {
    en: {
        title: "Upload an Image",
        pro: "Red‑Weak",
        deu: "Green‑Weak",
        tri: "Blue‑Weak",
        reset: "Reset"
    },
    ar: {
        title: "ارفع صورة",
        pro: "ضعيف الأحمر",
        deu: "ضعيف الأخضر",
        tri: "ضعيف الأزرق",
        reset: "إعادة"
    }
};

document.getElementById("languageSelect").onchange = function () {
    const lang = this.value;
    document.getElementById("title").textContent = text[lang].title;

    const buttons = document.querySelectorAll(".filterBtn");
    buttons[0].textContent = text[lang].pro;
    buttons[1].textContent = text[lang].deu;
    buttons[2].textContent = text[lang].tri;

    document.getElementById("resetBtn").textContent = text[lang].reset;

    document.body.style.direction = lang === "ar" ? "rtl" : "ltr";
};

// THEME SYSTEM
const themeBtn = document.getElementById("themeToggle");

themeBtn.onclick = () => {
    document.body.classList.toggle("dark");

    themeBtn.textContent =
        document.body.classList.contains("dark")
        ? "☀️ Light"
        : "🌙 Dark";
};
