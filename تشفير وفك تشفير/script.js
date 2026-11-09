"use strict";

/* =========================================================
   CryptoLab
   Educational Cryptography Laboratory
   Developed by: Qusay Jalal
   ========================================================= */

/* =========================================================
   1. GLOBAL STATE
   ========================================================= */

let currentLanguage =
    localStorage.getItem("cryptolab-language") || "ar";

let currentTheme =
    localStorage.getItem("cryptolab-theme") || "dark";

let currentAlgorithm = "caesar";
let currentOperation = "encrypt";
let lastResult = "";


/* =========================================================
   2. DOM ELEMENTS
   ========================================================= */

const modal = document.getElementById("cipherModal");
const closeModalBtn = document.getElementById("closeModal");
const executeBtn = document.getElementById("executeBtn");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");

const cipherInput = document.getElementById("cipherInput");
const cipherResult = document.getElementById("cipherResult");

const inputCounter = document.getElementById("inputCounter");
const stepsList = document.getElementById("stepsList");
const stepsCount = document.getElementById("stepsCount");

const algorithmControls =
    document.getElementById("algorithmControls");

const modalIcon = document.getElementById("modalIcon");
const modalKicker = document.getElementById("modalKicker");
const modalTitle = document.getElementById("modalTitle");
const modalSubtitle = document.getElementById("modalSubtitle");
const modalFormula = document.getElementById("modalFormula");
const modalType = document.getElementById("modalType");

const executeText =
    document.getElementById("executeText");

const languageBtn =
    document.getElementById("languageBtn");

const themeBtn =
    document.getElementById("themeBtn");

const toastContainer =
    document.getElementById("toastContainer");

const startBtn =
    document.getElementById("startBtn");


/* =========================================================
   3. TRANSLATIONS
   ========================================================= */

const translations = {

    ar: {
        navHome: "الرئيسية",
        navAlgorithms: "الخوارزميات",
        navAbout: "عن المشروع",

        heroBadge: "مختبر تشفير تعليمي متكامل",
        heroTitle1: "اكتشف عالم",
        heroTitle2: "بطريقة تفاعلية",

        heroDescription:
            "منصة تعليمية تفاعلية لفهم أشهر خوارزميات التشفير وتنفيذ عمليات التشفير وفك التشفير خطوة بخطوة.",

        startLearning: "ابدأ التجربة",
        exploreAlgorithms: "استكشف الخوارزميات",

        developedBy: "تم تطوير المشروع بواسطة",

        statAlgorithms: "خوارزميات",
        statLocal: "تشغيل محلي",
        statOperations: "عمليات",
        statDeveloper: "مطور المشروع",

        algorithmsLabel: "CRYPTOGRAPHY",
        algorithmsTitle: "مختبر الخوارزميات",
        algorithmsDescription:
            "اختر الخوارزمية التي تريد دراستها وابدأ تجربة التشفير وفك التشفير.",

        caesarDesc:
            "إزاحة حروف النص بعدد ثابت من المواقع داخل الأبجدية.",

        multiplicativeDesc:
            "تشفير الحروف باستخدام الضرب في مفتاح ضمن modulo 26.",

        multiKeyDesc:
            "استخدام سلسلة مفاتيح تتكرر دوريًا على أحرف النص.",

        xorDesc:
            "تنفيذ عملية XOR بين بيانات النص والمفتاح على مستوى البايت.",

        transpositionDesc:
            "إعادة ترتيب الحروف بكتابتها في صفوف ثم قراءتها في أعمدة.",

        boxPDesc:
            "إعادة ترتيب مواقع الأحرف باستخدام Permutation محدد.",

        sBoxDesc:
            "تحويل مجموعات 5-bit إلى مخرجات 3-bit باستخدام جدول S-Box.",

        desDesc:
            "خوارزمية تشفير كتلية تعتمد على 16 جولة من Feistel Network.",

        tryNow: "تجربة",

        encrypt: "تشفير",
        decrypt: "فك التشفير",

        inputText: "النص المدخل",
        clear: "مسح",
        result: "النتيجة",
        copy: "نسخ",
        steps: "خطوات التنفيذ",

        stepsEmpty:
            "نفّذ العملية لمشاهدة خطوات التشفير.",

        aboutTitle: "مختبر تشفير تعليمي",

        aboutDescription:
            "تم تصميم CryptoLab ليكون بيئة تعليمية تفاعلية تساعد على فهم مبادئ التشفير من خلال التجربة العملية ومشاهدة خطوات التنفيذ والنتائج بشكل واضح.",

        footerText:
            "Educational Cryptography Laboratory"
    },

    en: {
        navHome: "Home",
        navAlgorithms: "Algorithms",
        navAbout: "About",

        heroBadge: "Interactive Educational Cryptography Lab",
        heroTitle1: "Discover the World of",
        heroTitle2: "Cryptography Interactively",

        heroDescription:
            "An interactive educational platform for understanding popular cryptographic algorithms and performing encryption and decryption step by step.",

        startLearning: "Start Experiment",
        exploreAlgorithms: "Explore Algorithms",

        developedBy: "Developed by",

        statAlgorithms: "Algorithms",
        statLocal: "Local Execution",
        statOperations: "Operations",
        statDeveloper: "Project Developer",

        algorithmsLabel: "CRYPTOGRAPHY",
        algorithmsTitle: "Algorithm Laboratory",
        algorithmsDescription:
            "Choose an algorithm to study and start an encryption or decryption experiment.",

        caesarDesc:
            "Shifts letters of the text by a fixed number of positions in the alphabet.",

        multiplicativeDesc:
            "Encrypts letters by multiplying them with a key modulo 26.",

        multiKeyDesc:
            "Uses a cyclic sequence of keys across the characters of the text.",

        xorDesc:
            "Performs XOR between plaintext data and the key at byte level.",

        transpositionDesc:
            "Rearranges characters by writing rows and reading columns.",

        boxPDesc:
            "Rearranges character positions using a defined permutation.",

        sBoxDesc:
            "Converts 5-bit groups into 3-bit outputs using an S-Box table.",

        desDesc:
            "A block cipher based on a 16-round Feistel Network.",

        tryNow: "Try",

        encrypt: "Encrypt",
        decrypt: "Decrypt",

        inputText: "Input Text",
        clear: "Clear",
        result: "Result",
        copy: "Copy",
        steps: "Execution Steps",

        stepsEmpty:
            "Execute the operation to see the encryption steps.",

        aboutTitle: "Educational Cryptography Laboratory",

        aboutDescription:
            "CryptoLab was designed as an interactive educational environment for understanding cryptography through practical experimentation and clear execution steps.",

        footerText:
            "Educational Cryptography Laboratory"
    }
};


/* =========================================================
   4. ALGORITHM INFORMATION
   ========================================================= */

const algorithms = {

    caesar: {
        icon: "👑",
        kicker: "CLASSICAL",
        title: "Caesar Cipher",
        subtitle: "تشفير قيصر",
        subtitleEn: "Caesar Cipher",
        formula: "C = (P + K) mod 26",
        type: "Classical Cipher",
        typeEn: "Classical Cipher",
        encryptExample: "SMILE",
        decryptExample: "VPLOH"
    },

    multiplicative: {
        icon: "✖️",
        kicker: "CLASSICAL",
        title: "Multiplicative Cipher",
        subtitle: "التشفير الضربي",
        subtitleEn: "Multiplicative Cipher",
        formula: "C = (P × K) mod 26",
        type: "Classical Cipher",
        typeEn: "Classical Cipher",
        encryptExample: "HELLO",
        decryptExample: "VMHHQ"
    },

    "multi-key": {
        icon: "🔑",
        kicker: "POLYALPHABETIC",
        title: "Multi-Key Cipher",
        subtitle: "التشفير متعدد المفاتيح",
        subtitleEn: "Multi-Key Cipher",
        formula: "Ci = (Pi + Ki) mod 26",
        type: "Polyalphabetic Cipher",
        typeEn: "Polyalphabetic Cipher",
        encryptExample: "CATDOG",
        decryptExample: "EEZFSM"
    },

    xor: {
        icon: "⚡",
        kicker: "BINARY",
        title: "XOR / Simple 4RC",
        subtitle: "تشفير XOR",
        subtitleEn: "XOR Encryption",
        formula: "C = P ⊕ K",
        type: "Binary Cipher",
        typeEn: "Binary Cipher",
        encryptExample: "HELLO",
        decryptExample: ""
    },

    transposition: {
        icon: "🔄",
        kicker: "TRANSPOSITION",
        title: "Transposition Cipher",
        subtitle: "تبديل المواقع",
        subtitleEn: "Transposition Cipher",
        formula: "Rows → Columns",
        type: "Transposition Cipher",
        typeEn: "Transposition Cipher",
        encryptExample: "COMPUTER",
        decryptExample: "CUOTMEPR"
    },

    "box-p": {
        icon: "📦",
        kicker: "PERMUTATION",
        title: "Box-P",
        subtitle: "صندوق التبديل",
        subtitleEn: "Permutation Box",
        formula: "P → Permutation",
        type: "Permutation Cipher",
        typeEn: "Permutation Cipher",
        encryptExample: "SALEM",
        decryptExample: "MLSEA"
    },

    "s-box": {
        icon: "🧩",
        kicker: "SUBSTITUTION",
        title: "S-Box",
        subtitle: "صندوق الاستبدال",
        subtitleEn: "Substitution Box",
        formula: "5-bit → S-Box → 3-bit",
        type: "Substitution",
        typeEn: "Substitution",
        encryptExample: "01111",
        decryptExample: "101"
    },

    des: {
        icon: "🛡️",
        kicker: "BLOCK CIPHER",
        title: "DES",
        subtitle: "Data Encryption Standard",
        subtitleEn: "Data Encryption Standard",
        formula: "64-bit • 16 Rounds",
        type: "Block Cipher",
        typeEn: "Block Cipher",
        encryptExample: "Hello DES!",
        decryptExample: ""
    }
};


/* =========================================================
   5. S-BOX TABLE
   ========================================================= */

const SBOX = [
    [3, 2, 4, 1, 0, 5, 7, 6],
    [1, 7, 2, 0, 0, 3, 4, 5],
    [0, 1, 3, 2, 4, 6, 5, 7],
    [7, 6, 5, 4, 3, 2, 1, 0]
];


/* =========================================================
   6. LANGUAGE
   ========================================================= */

function applyLanguage() {

    const dict = translations[currentLanguage];

    document.documentElement.lang = currentLanguage;
    document.documentElement.dir =
        currentLanguage === "ar" ? "rtl" : "ltr";

    document.body.dir =
        currentLanguage === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key = element.dataset.i18n;

            if (dict[key]) {
                element.textContent = dict[key];
            }
        });

    languageBtn.textContent =
        currentLanguage === "ar" ? "EN" : "AR";

    const arrow =
        document.querySelector(".btn-arrow");

    if (arrow) {
        arrow.textContent =
            currentLanguage === "ar" ? "←" : "→";
    }

    updateCounter();

    if (modal.classList.contains("active")) {
        updateModalLanguage();
        buildControls(currentAlgorithm);
    }
}


function updateModalLanguage() {

    const alg = algorithms[currentAlgorithm];

    modalSubtitle.textContent =
        currentLanguage === "ar"
            ? alg.subtitle
            : alg.subtitleEn;

    modalType.textContent =
        currentLanguage === "ar"
            ? alg.type
            : alg.typeEn;

    executeText.textContent =
        currentOperation === "encrypt"
            ? currentLanguage === "ar"
                ? "تشفير الآن"
                : "Encrypt Now"
            : currentLanguage === "ar"
                ? "فك التشفير الآن"
                : "Decrypt Now";
}


/* =========================================================
   7. THEME
   ========================================================= */

function applyTheme() {

    if (currentTheme === "light") {

        document.body.classList.add("light-theme");

        themeBtn.textContent = "🌙";
        themeBtn.title =
            currentLanguage === "ar"
                ? "الوضع الداكن"
                : "Dark Mode";

    } else {

        document.body.classList.remove("light-theme");

        themeBtn.textContent = "☀️";
        themeBtn.title =
            currentLanguage === "ar"
                ? "الوضع الفاتح"
                : "Light Mode";
    }
}


/* =========================================================
   8. TOAST
   ========================================================= */

function showToast(message, type = "success") {

    if (!toastContainer) return;

    const toast = document.createElement("div");

    toast.className = `toast toast-${type}`;

    const icon =
        type === "success"
            ? "✓"
            : type === "error"
                ? "!"
                : "i";

    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message"></span>
    `;

    toast.querySelector(".toast-message")
        .textContent = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("toast-hide");

        setTimeout(() => {
            toast.remove();
        }, 300);

    }, 2800);
}


/* =========================================================
   9. MODAL
   ========================================================= */

function openModal(algorithmName) {

    if (!algorithms[algorithmName]) return;

    currentAlgorithm = algorithmName;
    currentOperation = "encrypt";
    lastResult = "";

    const alg = algorithms[algorithmName];

    modalIcon.textContent = alg.icon;
    modalKicker.textContent = alg.kicker;
    modalTitle.textContent = alg.title;
    modalSubtitle.textContent =
        currentLanguage === "ar"
            ? alg.subtitle
            : alg.subtitleEn;

    modalFormula.textContent = alg.formula;

    modalType.textContent =
        currentLanguage === "ar"
            ? alg.type
            : alg.typeEn;

    buildControls(algorithmName);

    cipherInput.value = alg.encryptExample;

    resetResult();

    updateOperationTabs();
    updateModalLanguage();
    updateCounter();

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    setTimeout(() => {
        cipherInput.focus();
    }, 150);
}


function closeModal() {

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");
}


function resetResult() {

    lastResult = "";

    cipherResult.textContent =
        currentLanguage === "ar"
            ? "ستظهر النتيجة هنا..."
            : "The result will appear here...";

    cipherResult.classList.remove("has-result");

    stepsCount.textContent = "0";

    stepsList.innerHTML = `
        <div class="empty-steps">
            <span>🧮</span>
            <p>
                ${
                    currentLanguage === "ar"
                        ? "نفّذ العملية لمشاهدة خطوات التشفير."
                        : "Execute the operation to see the execution steps."
                }
            </p>
        </div>
    `;
}


/* =========================================================
   10. OPERATION TABS
   ========================================================= */

function updateOperationTabs() {

    document.querySelectorAll(".operation-tab")
        .forEach(tab => {

            tab.classList.toggle(
                "active",
                tab.dataset.operation === currentOperation
            );
        });

    updateModalLanguage();
}


function changeOperation(operation) {

    currentOperation = operation;

    updateOperationTabs();

    if (lastResult) {

        cipherInput.value = lastResult;

    } else {

        const alg = algorithms[currentAlgorithm];

        cipherInput.value =
            operation === "encrypt"
                ? alg.encryptExample
                : alg.decryptExample;
    }

    resetResult();
    updateCounter();

    buildControls(currentAlgorithm);
}


/* =========================================================
   11. DYNAMIC CONTROLS
   ========================================================= */

function buildControls(algorithmName) {

    let html = "";

    const label =
        currentLanguage === "ar"
            ? "المفتاح"
            : "Key";

    if (algorithmName === "caesar") {

        html = `
            <div class="control-group">
                <label class="control-label" for="keyInput">
                    ${label}
                </label>

                <input
                    id="keyInput"
                    class="control-input"
                    type="number"
                    min="-25"
                    max="25"
                    value="3"
                >

                <div class="control-hint">
                    ${
                        currentLanguage === "ar"
                            ? "مثال المحاضرة: المفتاح 3 يحول SMILE إلى VPLOH."
                            : "Lecture example: key 3 transforms SMILE into VPLOH."
                    }
                </div>
            </div>
        `;

    } else if (algorithmName === "multiplicative") {

        html = `
            <div class="control-group">
                <label class="control-label" for="keyInput">
                    ${
                        currentLanguage === "ar"
                            ? "المفتاح الضربي"
                            : "Multiplicative Key"
                    }
                </label>

                <input
                    id="keyInput"
                    class="control-input"
                    type="number"
                    min="1"
                    max="25"
                    value="3"
                >

                <div class="control-hint">
                    ${
                        currentLanguage === "ar"
                            ? "يجب أن يكون gcd(K, 26) = 1. مثال المحاضرة: HELLO مع K=3."
                            : "The key must satisfy gcd(K, 26) = 1. Lecture example: HELLO with K=3."
                    }
                </div>
            </div>
        `;

    } else if (algorithmName === "multi-key") {

        html = `
            <div class="control-group">
                <label class="control-label" for="keysInput">
                    ${
                        currentLanguage === "ar"
                            ? "المفاتيح"
                            : "Keys"
                    }
                </label>

                <input
                    id="keysInput"
                    class="control-input"
                    type="text"
                    value="2,4,6"
                    placeholder="2,4,6"
                >

                <div class="control-hint">
                    ${
                        currentLanguage === "ar"
                            ? "اكتب المفاتيح مفصولة بفواصل. مثال: 2,4,6 — CATDOG → EEZFSM."
                            : "Enter keys separated by commas. Example: 2,4,6 — CATDOG → EEZFSM."
                    }
                </div>
            </div>
        `;

    } else if (algorithmName === "xor") {

        html = `
            <div class="control-group">
                <label class="control-label" for="keyInput">
                    ${
                        currentLanguage === "ar"
                            ? "مفتاح XOR"
                            : "XOR Key"
                    }
                </label>

                <input
                    id="keyInput"
                    class="control-input"
                    type="text"
                    value="KEY"
                    autocomplete="off"
                >

                <div class="control-hint">
                    ${
                        currentLanguage === "ar"
                            ? "يتم تحويل النص والمفتاح إلى UTF-8 bytes ثم تنفيذ XOR. الناتج يظهر بصيغة Base64."
                            : "Text and key are converted to UTF-8 bytes and XOR is applied. Output is displayed as Base64."
                    }
                </div>
            </div>
        `;

    } else if (algorithmName === "transposition") {

        html = `
            <div class="control-group">
                <label class="control-label" for="columnsInput">
                    ${
                        currentLanguage === "ar"
                            ? "عدد الأعمدة"
                            : "Number of Columns"
                    }
                </label>

                <input
                    id="columnsInput"
                    class="control-input"
                    type="number"
                    min="2"
                    max="50"
                    value="4"
                >
            </div>

            <div class="control-group">
                <label class="control-label" for="paddingInput">
                    ${
                        currentLanguage === "ar"
                            ? "حرف الحشو"
                            : "Padding Character"
                    }
                </label>

                <input
                    id="paddingInput"
                    class="control-input"
                    type="text"
                    maxlength="1"
                    value="X"
                >

                <div class="control-hint">
                    ${
                        currentLanguage === "ar"
                            ? "مثال المحاضرة: COMPUTER مع 4 أعمدة → CUOTMEPR."
                            : "Lecture example: COMPUTER with 4 columns → CUOTMEPR."
                    }
                </div>
            </div>
        `;

    } else if (algorithmName === "box-p") {

        html = `
            <div class="control-group full-width">
                <label class="control-label" for="permutationInput">
                    ${
                        currentLanguage === "ar"
                            ? "Permutation"
                            : "Permutation"
                    }
                </label>

                <input
                    id="permutationInput"
                    class="control-input"
                    type="text"
                    value="5,3,1,4,2"
                >

                <div class="control-hint">
                    ${
                        currentLanguage === "ar"
                            ? "يجب أن يحتوي الـPermutation على كل الأرقام من 1 إلى طول النص. مثال SALEM مع 5,3,1,4,2 → MLSEA."
                            : "The permutation must contain every number from 1 to the text length. Example SALEM with 5,3,1,4,2 → MLSEA."
                    }
                </div>
            </div>
        `;

    } else if (algorithmName === "s-box") {

        html = `
            <div class="control-group full-width">

                <label class="control-label">
                    S-Box
                </label>

                <div style="
                    overflow-x:auto;
                    border-radius:14px;
                    padding:10px;
                    background:rgba(255,255,255,0.03);
                ">

                    <table style="
                        width:100%;
                        border-collapse:collapse;
                        text-align:center;
                        font-family:Consolas,monospace;
                    ">

                        <thead>
                            <tr>
                                <th style="padding:8px;">Row / Col</th>
                                ${[0,1,2,3,4,5,6,7]
                                    .map(n =>
                                        `<th style="padding:8px;">${n}</th>`
                                    )
                                    .join("")}
                            </tr>
                        </thead>

                        <tbody>

                            ${SBOX.map((row, r) => `
                                <tr>
                                    <th style="padding:8px;">${r}</th>
                                    ${row.map(value =>
                                        `<td style="padding:8px;">${value}</td>`
                                    ).join("")}
                                </tr>
                            `).join("")}

                        </tbody>

                    </table>

                </div>

                <div class="control-hint">
                    ${
                        currentLanguage === "ar"
                            ? "Input = 5 bits. أول وآخر bit يحددان Row، والـ3 bits الوسطى تحدد Column. الناتج = 3 bits."
                            : "Input = 5 bits. First and last bits determine the row, while the middle 3 bits determine the column. Output = 3 bits."
                    }
                </div>

            </div>
        `;

    } else if (algorithmName === "des") {

        html = `
            <div class="control-group full-width">

                <label class="control-label" for="keyInput">
                    ${
                        currentLanguage === "ar"
                            ? "مفتاح DES"
                            : "DES Key"
                    }
                </label>

                <input
                    id="keyInput"
                    class="control-input"
                    type="text"
                    value="12345678"
                    autocomplete="off"
                >

                <div class="control-hint">
                    ${
                        currentLanguage === "ar"
                            ? "المفتاح يجب أن يكون 8 أحرف ASCII أو 16 رقمًا سداسيًا عشريًا."
                            : "The key must be 8 ASCII characters or 16 hexadecimal digits."
                    }
                </div>

                <div class="control-hint" style="margin-top:8px;">
                    ${
                        currentLanguage === "ar"
                            ? "اختبار DES القياسي: Key=133457799BBCDFF1 ، Plaintext=0123456789ABCDEF → 85E813540F0AB405."
                            : "Standard DES test vector: Key=133457799BBCDFF1, Plaintext=0123456789ABCDEF → 85E813540F0AB405."
                    }
                </div>

            </div>
        `;
    }

    algorithmControls.innerHTML = html;
}


/* =========================================================
   12. COUNTER
   ========================================================= */

function updateCounter() {

    if (!cipherInput || !inputCounter) return;

    const count =
        Array.from(cipherInput.value).length;

    inputCounter.textContent =
        currentLanguage === "ar"
            ? `${count} حرف`
            : `${count} characters`;
}


/* =========================================================
   13. MATHEMATICAL HELPERS
   ========================================================= */

function mod(n, m) {
    return ((n % m) + m) % m;
}


function gcd(a, b) {

    a = Math.abs(a);
    b = Math.abs(b);

    while (b !== 0) {
        const temp = a % b;
        a = b;
        b = temp;
    }

    return a;
}


function modInverse(a, m) {

    a = mod(a, m);

    for (let x = 1; x < m; x++) {

        if (mod(a * x, m) === 1) {
            return x;
        }
    }

    throw new Error(
        currentLanguage === "ar"
            ? "لا يوجد معكوس ضربي لهذا المفتاح modulo 26."
            : "This key has no multiplicative inverse modulo 26."
    );
}


/* =========================================================
   14. CAESAR CIPHER
   ========================================================= */

function caesarCipher(text, key, decrypt = false) {

    key = Number(key);

    if (!Number.isInteger(key)) {
        throw new Error(
            currentLanguage === "ar"
                ? "مفتاح قيصر يجب أن يكون رقمًا صحيحًا."
                : "Caesar key must be an integer."
        );
    }

    const shift = mod(
        decrypt ? -key : key,
        26
    );

    let result = "";
    const steps = [];

    for (let i = 0; i < text.length; i++) {

        const char = text[i];

        if (!/[A-Za-z]/.test(char)) {

            result += char;

            continue;
        }

        const base =
            char === char.toUpperCase()
                ? 65
                : 97;

        const p =
            char.charCodeAt(0) - base;

        const c =
            mod(p + shift, 26);

        const output =
            String.fromCharCode(base + c);

        result += output;

        if (steps.length < 80) {

            steps.push({
                title:
                    currentLanguage === "ar"
                        ? `الحرف ${i + 1}: ${char}`
                        : `Character ${i + 1}: ${char}`,

                detail:
                    `${char} (${p}) → ` +
                    `(${p} ${decrypt ? "-" : "+"} ${key}) mod 26 = ${c} → ${output}`
            });
        }
    }

    if (text.length > 80) {

        steps.push({
            title:
                currentLanguage === "ar"
                    ? "ملاحظة"
                    : "Note",

            detail:
                currentLanguage === "ar"
                    ? "تم عرض أول 80 خطوة فقط للحفاظ على سرعة الواجهة."
                    : "Only the first 80 steps are displayed for interface performance."
        });
    }

    return {
        result,
        steps
    };
}


/* =========================================================
   15. MULTIPLICATIVE CIPHER
   ========================================================= */

function multiplicativeCipher(
    text,
    key,
    decrypt = false
) {

    key = Number(key);

    if (!Number.isInteger(key)) {

        throw new Error(
            currentLanguage === "ar"
                ? "المفتاح يجب أن يكون رقمًا صحيحًا."
                : "The key must be an integer."
        );
    }

    key = mod(key, 26);

    if (gcd(key, 26) !== 1) {

        throw new Error(
            currentLanguage === "ar"
                ? `المفتاح ${key} غير صالح. يجب أن يكون gcd(${key},26)=1.`
                : `Key ${key} is invalid. gcd(${key},26) must equal 1.`
        );
    }

    const actualKey =
        decrypt
            ? modInverse(key, 26)
            : key;

    let result = "";
    const steps = [];

    for (let i = 0; i < text.length; i++) {

        const char = text[i];

        if (!/[A-Za-z]/.test(char)) {

            result += char;
            continue;
        }

        const base =
            char === char.toUpperCase()
                ? 65
                : 97;

        const p =
            char.charCodeAt(0) - base;

        const c =
            mod(p * actualKey, 26);

        const output =
            String.fromCharCode(base + c);

        result += output;

        if (steps.length < 80) {

            steps.push({
                title:
                    currentLanguage === "ar"
                        ? `الحرف ${i + 1}: ${char}`
                        : `Character ${i + 1}: ${char}`,

                detail:
                    `${char} (${p}) → ` +
                    `(${p} × ${actualKey}) mod 26 = ${c} → ${output}`
            });
        }
    }

    steps.unshift({
        title:
            currentLanguage === "ar"
                ? "المفتاح المستخدم"
                : "Effective Key",

        detail:
            decrypt
                ? `K⁻¹ mod 26 = ${actualKey}`
                : `K = ${actualKey}`
    });

    return {
        result,
        steps
    };
}


/* =========================================================
   16. MULTI-KEY CIPHER
   ========================================================= */

function parseKeys(value) {

    const parts =
        String(value)
            .replace(/،/g, ",")
            .split(",");

    const keys = parts
        .map(x => x.trim())
        .filter(x => x !== "")
        .map(Number);

    if (
        keys.length === 0 ||
        keys.some(x => !Number.isInteger(x))
    ) {

        throw new Error(
            currentLanguage === "ar"
                ? "أدخل مفاتيح صحيحة مثل: 2,4,6"
                : "Enter valid keys such as: 2,4,6"
        );
    }

    return keys.map(x => mod(x, 26));
}


function multiKeyCipher(
    text,
    keys,
    decrypt = false
) {

    const parsedKeys = parseKeys(keys);

    let result = "";
    let keyIndex = 0;

    const steps = [];

    for (let i = 0; i < text.length; i++) {

        const char = text[i];

        if (!/[A-Za-z]/.test(char)) {

            result += char;
            continue;
        }

        const base =
            char === char.toUpperCase()
                ? 65
                : 97;

        const p =
            char.charCodeAt(0) - base;

        const key =
            parsedKeys[keyIndex % parsedKeys.length];

        const c =
            mod(
                p + (decrypt ? -key : key),
                26
            );

        const output =
            String.fromCharCode(base + c);

        result += output;

        if (steps.length < 80) {

            steps.push({
                title:
                    currentLanguage === "ar"
                        ? `الحرف ${i + 1}: ${char}`
                        : `Character ${i + 1}: ${char}`,

                detail:
                    `${char} (${p}) → ` +
                    `${decrypt ? `${p} - ${key}` : `${p} + ${key}`} ` +
                    `mod 26 = ${c} → ${output}`
            });
        }

        keyIndex++;
    }

    steps.unshift({
        title:
            currentLanguage === "ar"
                ? "سلسلة المفاتيح"
                : "Key Sequence",

        detail:
            parsedKeys.join(" → ")
    });

    return {
        result,
        steps
    };
}


/* =========================================================
   17. UTF-8 / BASE64 HELPERS
   ========================================================= */

function bytesToBase64(bytes) {

    let binary = "";

    const chunkSize = 0x8000;

    for (
        let i = 0;
        i < bytes.length;
        i += chunkSize
    ) {

        const chunk =
            bytes.subarray(
                i,
                Math.min(i + chunkSize, bytes.length)
            );

        binary += String.fromCharCode(...chunk);
    }

    return btoa(binary);
}


function base64ToBytes(value) {

    const cleaned =
        String(value)
            .replace(/\s/g, "");

    if (!cleaned) {
        return new Uint8Array();
    }

    const binary = atob(cleaned);

    const bytes =
        new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
        bytes[i] =
            binary.charCodeAt(i);
    }

    return bytes;
}


function byteToBinary(byte) {

    return byte
        .toString(2)
        .padStart(8, "0");
}


/* =========================================================
   18. XOR
   ========================================================= */

function xorBytes(data, key) {

    if (key.length === 0) {

        throw new Error(
            currentLanguage === "ar"
                ? "مفتاح XOR لا يمكن أن يكون فارغًا."
                : "XOR key cannot be empty."
        );
    }

    const output =
        new Uint8Array(data.length);

    for (let i = 0; i < data.length; i++) {

        output[i] =
            data[i] ^
            key[i % key.length];
    }

    return output;
}


function xorCipher(
    input,
    keyText,
    decrypt = false
) {

    if (!keyText) {

        throw new Error(
            currentLanguage === "ar"
                ? "أدخل مفتاح XOR."
                : "Enter an XOR key."
        );
    }

    const encoder = new TextEncoder();

    const keyBytes =
        encoder.encode(keyText);

    let inputBytes;

    if (decrypt) {

        inputBytes =
            base64ToBytes(input);

    } else {

        inputBytes =
            encoder.encode(input);
    }

    const outputBytes =
        xorBytes(
            inputBytes,
            keyBytes
        );

    let result;
    const steps = [];

    if (decrypt) {

        const decoder =
            new TextDecoder(
                "utf-8",
                { fatal: true }
            );

        try {

            result =
                decoder.decode(outputBytes);

        } catch {

            throw new Error(
                currentLanguage === "ar"
                    ? "الناتج ليس UTF-8 صالحًا. تأكد من المفتاح وBase64."
                    : "The output is not valid UTF-8. Check the key and Base64 input."
            );
        }

    } else {

        result =
            bytesToBase64(outputBytes);
    }

    const maxSteps =
        Math.min(
            inputBytes.length,
            40
        );

    for (let i = 0; i < maxSteps; i++) {

        const keyByte =
            keyBytes[i % keyBytes.length];

        const outputByte =
            outputBytes[i];

        steps.push({
            title:
                currentLanguage === "ar"
                    ? `Byte ${i + 1}`
                    : `Byte ${i + 1}`,

            detail:
                `${inputBytes[i]} ` +
                `(${byteToBinary(inputBytes[i])}) ` +
                `⊕ ` +
                `${keyByte} ` +
                `(${byteToBinary(keyByte)}) ` +
                `= ` +
                `${outputByte} ` +
                `(${byteToBinary(outputByte)})`
        });
    }

    if (inputBytes.length > maxSteps) {

        steps.push({
            title:
                currentLanguage === "ar"
                    ? "ملاحظة"
                    : "Note",

            detail:
                currentLanguage === "ar"
                    ? `تم عرض أول ${maxSteps} بايت فقط.`
                    : `Only the first ${maxSteps} bytes are displayed.`
        });
    }

    steps.unshift({
        title:
            currentLanguage === "ar"
                ? "عملية XOR"
                : "XOR Operation",

        detail:
            currentLanguage === "ar"
                ? "C = P ⊕ K"
                : "C = P ⊕ K"
    });

    return {
        result,
        steps
    };
}


/* =========================================================
   19. TRANSPOSITION CIPHER
   ========================================================= */

function transpositionCipher(
    text,
    columns,
    padding,
    decrypt = false
) {

    columns = Number(columns);

    if (
        !Number.isInteger(columns) ||
        columns < 2 ||
        columns > 50
    ) {

        throw new Error(
            currentLanguage === "ar"
                ? "عدد الأعمدة يجب أن يكون بين 2 و50."
                : "Columns must be between 2 and 50."
        );
    }

    padding =
        String(padding || "X")
            .charAt(0) || "X";

    if (!decrypt) {

        const originalLength =
            text.length;

        const rows =
            Math.ceil(
                originalLength / columns
            );

        const paddedLength =
            rows * columns;

        const paddedText =
            text.padEnd(
                paddedLength,
                padding
            );

        const matrix = [];

        for (let r = 0; r < rows; r++) {

            matrix.push(
                paddedText.slice(
                    r * columns,
                    (r + 1) * columns
                )
            );
        }

        let result = "";

        for (let c = 0; c < columns; c++) {

            for (let r = 0; r < rows; r++) {

                result += matrix[r][c];
            }
        }

        const steps = [];

        steps.push({
            title:
                currentLanguage === "ar"
                    ? "الخطوة 1: كتابة النص في صفوف"
                    : "Step 1: Write the text in rows",

            detail:
                matrix.join("\n")
        });

        steps.push({
            title:
                currentLanguage === "ar"
                    ? "الخطوة 2: قراءة الأعمدة"
                    : "Step 2: Read columns",

            detail:
                result
        });

        return {
            result,
            steps
        };

    } else {

        if (
            text.length === 0 ||
            text.length % columns !== 0
        ) {

            throw new Error(
                currentLanguage === "ar"
                    ? "طول النص المشفر يجب أن يكون قابلًا للقسمة على عدد الأعمدة."
                    : "Ciphertext length must be divisible by the number of columns."
            );
        }

        const rows =
            text.length / columns;

        const matrix =
            Array.from(
                { length: rows },
                () => Array(columns).fill("")
            );

        let index = 0;

        for (let c = 0; c < columns; c++) {

            for (let r = 0; r < rows; r++) {

                matrix[r][c] =
                    text[index++];
            }
        }

        let result = "";

        for (let r = 0; r < rows; r++) {

            result += matrix[r].join("");
        }

        result =
            result.replace(
                new RegExp(`${escapeRegex(padding)}+$`),
                ""
            );

        const steps = [];

        steps.push({
            title:
                currentLanguage === "ar"
                    ? "إعادة بناء الجدول"
                    : "Rebuild the grid",

            detail:
                matrix
                    .map(row => row.join(""))
                    .join("\n")
        });

        steps.push({
            title:
                currentLanguage === "ar"
                    ? "قراءة الصفوف"
                    : "Read rows",

            detail:
                result
        });

        return {
            result,
            steps
        };
    }
}


/* =========================================================
   20. ESCAPE REGEX
   ========================================================= */

function escapeRegex(value) {

    return String(value)
        .replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );
}


/* =========================================================
   21. BOX-P
   ========================================================= */

function parsePermutation(value, length) {

    const parts =
        String(value)
            .replace(/،/g, ",")
            .split(",")
            .map(x => x.trim())
            .filter(Boolean)
            .map(Number);

    if (parts.length !== length) {

        throw new Error(
            currentLanguage === "ar"
                ? `الـPermutation يجب أن يحتوي على ${length} رقمًا بالضبط.`
                : `The permutation must contain exactly ${length} numbers.`
        );
    }

    const sorted =
        [...parts].sort((a, b) => a - b);

    for (let i = 0; i < length; i++) {

        if (sorted[i] !== i + 1) {

            throw new Error(
                currentLanguage === "ar"
                    ? `الـPermutation يجب أن يحتوي على الأرقام من 1 إلى ${length} مرة واحدة فقط.`
                    : `The permutation must contain every number from 1 to ${length} exactly once.`
            );
        }
    }

    return parts;
}


function boxPCipher(
    text,
    permutationText,
    decrypt = false
) {

    if (text.length === 0) {

        throw new Error(
            currentLanguage === "ar"
                ? "أدخل نصًا أولًا."
                : "Enter some text first."
        );
    }

    const permutation =
        parsePermutation(
            permutationText,
            text.length
        );

    if (!decrypt) {

        let result = "";

        for (const position of permutation) {
            result += text[position - 1];
        }

        const steps = [
            {
                title:
                    currentLanguage === "ar"
                        ? "Permutation"
                        : "Permutation",

                detail:
                    permutation.join(" → ")
            },
            {
                title:
                    currentLanguage === "ar"
                        ? "النتيجة"
                        : "Result",

                detail:
                    result
            }
        ];

        for (
            let i = 0;
            i < text.length && i < 40;
            i++
        ) {

            steps.push({
                title:
                    currentLanguage === "ar"
                        ? `الموضع ${i + 1}`
                        : `Position ${i + 1}`,

                detail:
                    `${i + 1} ← ${permutation[i]} : ` +
                    `${text[permutation[i] - 1]}`
            });
        }

        return {
            result,
            steps
        };

    } else {

        const resultArray =
            Array(text.length).fill("");

        for (let i = 0; i < permutation.length; i++) {

            resultArray[
                permutation[i] - 1
            ] = text[i];
        }

        const result =
            resultArray.join("");

        return {
            result,
            steps: [
                {
                    title:
                        currentLanguage === "ar"
                            ? "عكس الـPermutation"
                            : "Inverse Permutation",

                    detail:
                        permutation.join(" → ")
                },
                {
                    title:
                        currentLanguage === "ar"
                            ? "النتيجة"
                            : "Result",

                    detail:
                        result
                }
            ]
        };
    }
}


/* =========================================================
   22. S-BOX
   ========================================================= */

function sboxLookup(bits) {

    const row =
        parseInt(
            bits[0] + bits[4],
            2
        );

    const column =
        parseInt(
            bits.slice(1, 4),
            2
        );

    const value =
        SBOX[row][column];

    const output =
        value
            .toString(2)
            .padStart(3, "0");

    return {
        row,
        column,
        value,
        output
    };
}


const lectureSBoxInverse = {

    "101": "01111",
    "010": "10110",
    "111": "10001",
    "110": "11010"
};


function sboxCipher(
    input,
    decrypt = false
) {

    const bits =
        String(input).replace(/\s/g, "");

    if (!/^[01]*$/.test(bits)) {

        throw new Error(
            currentLanguage === "ar"
                ? "S-Box يقبل binary فقط: 0 و1."
                : "S-Box accepts binary input only: 0 and 1."
        );
    }

    if (!decrypt) {

        if (
            bits.length === 0 ||
            bits.length % 5 !== 0
        ) {

            throw new Error(
                currentLanguage === "ar"
                    ? "في التشفير يجب أن يكون طول الإدخال من مضاعفات 5."
                    : "For encryption, input length must be a multiple of 5."
            );
        }

        let result = "";
        const steps = [];

        for (
            let i = 0;
            i < bits.length;
            i += 5
        ) {

            const group =
                bits.slice(i, i + 5);

            const lookup =
                sboxLookup(group);

            result += lookup.output;

            steps.push({
                title:
                    currentLanguage === "ar"
                        ? `المجموعة ${i / 5 + 1}: ${group}`
                        : `Group ${i / 5 + 1}: ${group}`,

                detail:
                    `Row = ${lookup.row}, ` +
                    `Column = ${lookup.column}, ` +
                    `S-Box = ${lookup.value}, ` +
                    `Output = ${lookup.output}`
            });
        }

        return {
            result,
            steps
        };

    } else {

        if (
            bits.length === 0 ||
            bits.length % 3 !== 0
        ) {

            throw new Error(
                currentLanguage === "ar"
                    ? "في فك التشفير يجب أن يكون طول الإدخال من مضاعفات 3."
                    : "For decryption, input length must be a multiple of 3."
            );
        }

        let result = "";
        const steps = [];

        for (
            let i = 0;
            i < bits.length;
            i += 3
        ) {

            const output =
                bits.slice(i, i + 3);

            let candidates = [];

            for (let row = 0; row < 4; row++) {

                for (let col = 0; col < 8; col++) {

                    const value =
                        SBOX[row][col]
                            .toString(2)
                            .padStart(3, "0");

                    if (value === output) {

                        const firstLast =
                            row
                                .toString(2)
                                .padStart(2, "0");

                        const middle =
                            col
                                .toString(2)
                                .padStart(3, "0");

                        candidates.push(
                            firstLast[0] +
                            middle +
                            firstLast[1]
                        );
                    }
                }
            }

            let selected =
                lectureSBoxInverse[output];

            if (!selected && candidates.length > 0) {
                selected = candidates[0];
            }

            if (!selected) {
                throw new Error(
                    currentLanguage === "ar"
                        ? `لا يوجد إدخال مناسب للقيمة ${output}.`
                        : `No matching input exists for ${output}.`
                );
            }

            result += selected;

            steps.push({
                title:
                    currentLanguage === "ar"
                        ? `المجموعة ${i / 3 + 1}: ${output}`
                        : `Group ${i / 3 + 1}: ${output}`,

                detail:
                    currentLanguage === "ar"
                        ? `تم اختيار ${selected}. عدد الاحتمالات الموجودة في الجدول: ${candidates.length}.`
                        : `Selected ${selected}. Number of matching values in the table: ${candidates.length}.`
            });
        }

        steps.unshift({
            title:
                currentLanguage === "ar"
                    ? "تنبيه مهم"
                    : "Important Note",

            detail:
                currentLanguage === "ar"
                    ? "جدول S-Box يحتوي على قيم مكررة، لذلك فإن العكس الرياضي ليس فريدًا دائمًا. تم الحفاظ على أمثلة المحاضرة عندما تكون متاحة."
                    : "The S-Box contains repeated values, so its mathematical inverse is not always unique. Lecture examples are preserved whenever available."
        });

        return {
            result,
            steps
        };
    }
}


/* =========================================================
   23. DES TABLES
   ========================================================= */

const DES_IP = [
    58,50,42,34,26,18,10,2,
    60,52,44,36,28,20,12,4,
    62,54,46,38,30,22,14,6,
    64,56,48,40,32,24,16,8,
    57,49,41,33,25,17,9,1,
    59,51,43,35,27,19,11,3,
    61,53,45,37,29,21,13,5,
    63,55,47,39,31,23,15,7
];

const DES_FP = [
    40,8,48,16,56,24,64,32,
    39,7,47,15,55,23,63,31,
    38,6,46,14,54,22,62,30,
    37,5,45,13,53,21,61,29,
    36,4,44,12,52,20,60,28,
    35,3,43,11,51,19,59,27,
    34,2,42,10,50,18,58,26,
    33,1,41,9,49,17,57,25
];

const DES_E = [
    32,1,2,3,4,5,
    4,5,6,7,8,9,
    8,9,10,11,12,13,
    12,13,14,15,16,17,
    16,17,18,19,20,21,
    20,21,22,23,24,25,
    24,25,26,27,28,29,
    28,29,30,31,32,1
];

const DES_P = [
    16,7,20,21,
    29,12,28,17,
    1,15,23,26,
    5,18,31,10,
    2,8,24,14,
    32,27,3,9,
    19,13,30,6,
    22,11,4,25
];

const DES_PC1 = [
    57,49,41,33,25,17,9,
    1,58,50,42,34,26,18,
    10,2,59,51,43,35,27,
    19,11,3,60,52,44,36,
    63,55,47,39,31,23,15,
    7,62,54,46,38,30,22,
    14,6,61,53,45,37,29,
    21,13,5,28,20,12,4
];

const DES_PC2 = [
    14,17,11,24,1,5,
    3,28,15,6,21,10,
    23,19,12,4,26,8,
    16,7,27,20,13,2,
    41,52,31,37,47,55,
    30,40,51,45,33,48,
    44,49,39,56,34,53,
    46,42,50,36,29,32
];

const DES_SHIFTS = [
    1,1,2,2,2,2,2,2,
    1,2,2,2,2,2,2,1
];

const DES_SBOXES = [

    [
        [14,4,13,1,2,15,11,8,3,10,6,12,5,9,0,7],
        [0,15,7,4,14,2,13,1,10,6,12,11,9,5,3,8],
        [4,1,14,8,13,6,2,11,15,12,9,7,3,10,5,0],
        [15,12,8,2,4,9,1,7,5,11,3,14,10,0,6,13]
    ],

    [
        [15,1,8,14,6,11,3,4,9,7,2,13,12,0,5,10],
        [3,13,4,7,15,2,8,14,12,0,1,10,6,9,11,5],
        [0,14,7,11,10,4,13,1,5,8,12,6,9,3,2,15],
        [13,8,10,1,3,15,4,2,11,6,7,12,0,5,14,9]
    ],

    [
        [10,0,9,14,6,3,15,5,1,13,12,7,11,4,2,8],
        [13,7,0,9,3,4,6,10,2,8,5,14,12,11,15,1],
        [13,6,4,9,8,15,3,0,11,1,2,12,5,10,14,7],
        [1,10,13,0,6,9,8,7,4,15,14,3,11,5,2,12]
    ],

    [
        [7,13,14,3,0,6,9,10,1,2,8,5,11,12,4,15],
        [13,8,11,5,6,15,0,3,4,7,2,12,1,10,14,9],
        [10,6,9,0,12,11,7,13,15,1,3,14,5,2,8,4],
        [3,15,0,6,10,1,13,8,9,4,5,11,12,7,2,14]
    ],

    [
        [2,12,4,1,7,10,11,6,8,5,3,15,13,0,14,9],
        [14,11,2,12,4,7,13,1,5,0,15,10,3,9,8,6],
        [4,2,1,11,10,13,7,8,15,9,12,5,6,3,0,14],
        [11,8,12,7,1,14,2,13,6,15,0,9,10,4,5,3]
    ],

    [
        [12,1,10,15,9,2,6,8,0,13,3,4,14,7,5,11],
        [10,15,4,2,7,12,9,5,6,1,13,14,0,11,3,8],
        [9,14,15,5,2,8,12,3,7,0,4,10,1,13,11,6],
        [4,3,2,12,9,5,15,10,11,14,1,7,6,0,8,13]
    ],

    [
        [4,11,2,14,15,0,8,13,3,12,9,7,5,10,6,1],
        [13,0,11,7,4,9,1,10,14,3,5,12,2,15,8,6],
        [1,4,11,13,12,3,7,14,10,15,6,8,0,5,9,2],
        [6,11,13,8,1,4,10,7,9,5,0,15,14,2,3,12]
    ],

    [
        [13,2,8,4,6,15,11,1,10,9,3,14,5,0,12,7],
        [1,15,13,8,10,3,7,4,12,5,6,11,0,14,9,2],
        [7,11,4,1,9,12,14,2,0,6,10,13,15,3,5,8],
        [2,1,14,7,4,10,8,13,15,12,9,0,3,5,6,11]
    ]
];


/* =========================================================
   24. DES HELPERS
   ========================================================= */

function permute(bits, table) {

    return table
        .map(position => bits[position - 1])
        .join("");
}


function xorBits(a, b) {

    let result = "";

    for (let i = 0; i < a.length; i++) {

        result +=
            a[i] === b[i]
                ? "0"
                : "1";
    }

    return result;
}


function leftRotate(bits, count) {

    return (
        bits.slice(count) +
        bits.slice(0, count)
    );
}


function bytesToBits(bytes) {

    let result = "";

    for (const byte of bytes) {

        result +=
            byte
                .toString(2)
                .padStart(8, "0");
    }

    return result;
}


function bitsToBytes(bits) {

    if (bits.length % 8 !== 0) {

        throw new Error(
            "Bit length must be divisible by 8."
        );
    }

    const bytes =
        new Uint8Array(
            bits.length / 8
        );

    for (
        let i = 0;
        i < bytes.length;
        i++
    ) {

        bytes[i] =
            parseInt(
                bits.slice(
                    i * 8,
                    i * 8 + 8
                ),
                2
            );
    }

    return bytes;
}


function hexToBytes(hex) {

    const clean =
        String(hex)
            .replace(/\s/g, "");

    if (
        !/^[0-9a-fA-F]+$/.test(clean) ||
        clean.length % 2 !== 0
    ) {

        throw new Error(
            currentLanguage === "ar"
                ? "القيمة HEX غير صحيحة."
                : "Invalid hexadecimal value."
        );
    }

    const bytes =
        new Uint8Array(
            clean.length / 2
        );

    for (let i = 0; i < bytes.length; i++) {

        bytes[i] =
            parseInt(
                clean.slice(
                    i * 2,
                    i * 2 + 2
                ),
                16
            );
    }

    return bytes;
}


function parseDESKey(value) {

    const keyText =
        String(value || "");

    if (
        /^[0-9a-fA-F]{16}$/.test(keyText)
    ) {

        return hexToBytes(keyText);
    }

    const bytes =
        new TextEncoder()
            .encode(keyText);

    if (bytes.length !== 8) {

        throw new Error(
            currentLanguage === "ar"
                ? "مفتاح DES يجب أن يكون 8 أحرف ASCII أو 16 رقم HEX."
                : "DES key must be 8 ASCII characters or 16 hexadecimal digits."
        );
    }

    return bytes;
}


/* =========================================================
   25. DES KEY SCHEDULE
   ========================================================= */

function generateDESSubkeys(keyBytes) {

    const keyBits =
        bytesToBits(keyBytes);

    const permuted =
        permute(
            keyBits,
            DES_PC1
        );

    let C =
        permuted.slice(0, 28);

    let D =
        permuted.slice(28);

    const subkeys = [];

    for (
        let round = 0;
        round < 16;
        round++
    ) {

        C =
            leftRotate(
                C,
                DES_SHIFTS[round]
            );

        D =
            leftRotate(
                D,
                DES_SHIFTS[round]
            );

        subkeys.push(
            permute(
                C + D,
                DES_PC2
            )
        );
    }

    return subkeys;
}


/* =========================================================
   26. DES FEISTEL
   ========================================================= */

function desFeistel(R, subkey) {

    const expanded =
        permute(
            R,
            DES_E
        );

    const xored =
        xorBits(
            expanded,
            subkey
        );

    let sboxOutput = "";

    for (let i = 0; i < 8; i++) {

        const block =
            xored.slice(
                i * 6,
                i * 6 + 6
            );

        const row =
            parseInt(
                block[0] + block[5],
                2
            );

        const column =
            parseInt(
                block.slice(1, 5),
                2
            );

        const value =
            DES_SBOXES[i][row][column];

        sboxOutput +=
            value
                .toString(2)
                .padStart(4, "0");
    }

    return permute(
        sboxOutput,
        DES_P
    );
}


/* =========================================================
   27. DES BLOCK
   ========================================================= */

function desBlock(
    blockBytes,
    subkeys,
    collectRounds = false
) {

    let bits =
        bytesToBits(blockBytes);

    bits =
        permute(
            bits,
            DES_IP
        );

    let L =
        bits.slice(0, 32);

    let R =
        bits.slice(32);

    const rounds = [];

    for (let i = 0; i < 16; i++) {

        const newL = R;

        const f =
            desFeistel(
                R,
                subkeys[i]
            );

        const newR =
            xorBits(
                L,
                f
            );

        L = newL;
        R = newR;

        if (collectRounds) {

            rounds.push({
                round: i + 1,
                L,
                R
            });
        }
    }

    const finalBits =
        permute(
            R + L,
            DES_FP
        );

    return {
        bytes:
            bitsToBytes(finalBits),
        rounds
    };
}


/* =========================================================
   28. DES PADDING
   ========================================================= */

function desPad(bytes) {

    const padLength =
        8 - (bytes.length % 8);

    const result =
        new Uint8Array(
            bytes.length + padLength
        );

    result.set(bytes);

    result.fill(
        padLength,
        bytes.length
    );

    return result;
}


function desUnpad(bytes) {

    if (bytes.length === 0) {

        throw new Error(
            currentLanguage === "ar"
                ? "بيانات DES فارغة."
                : "DES data is empty."
        );
    }

    const pad =
        bytes[bytes.length - 1];

    if (
        pad < 1 ||
        pad > 8
    ) {

        throw new Error(
            currentLanguage === "ar"
                ? "Padding الخاص بـ DES غير صحيح."
                : "Invalid DES padding."
        );
    }

    for (
        let i = bytes.length - pad;
        i < bytes.length;
        i++
    ) {

        if (bytes[i] !== pad) {

            throw new Error(
                currentLanguage === "ar"
                    ? "Padding الخاص بـ DES غير صحيح."
                    : "Invalid DES padding."
            );
        }
    }

    return bytes.slice(
        0,
        bytes.length - pad
    );
}


/* =========================================================
   29. DES CIPHER
   ========================================================= */

function desCipher(
    input,
    keyText,
    decrypt = false
) {

    const keyBytes =
        parseDESKey(keyText);

    let inputBytes;
    let paddedBytes;

    if (decrypt) {

        inputBytes =
            base64ToBytes(input);

        if (
            inputBytes.length === 0 ||
            inputBytes.length % 8 !== 0
        ) {

            throw new Error(
                currentLanguage === "ar"
                    ? "بيانات DES المشفرة يجب أن تكون Base64 وطولها من مضاعفات 8 bytes."
                    : "DES ciphertext must be Base64 with a byte length divisible by 8."
            );
        }

        paddedBytes = inputBytes;

    } else {

        inputBytes =
            new TextEncoder()
                .encode(input);

        paddedBytes =
            desPad(inputBytes);
    }

    let subkeys =
        generateDESSubkeys(
            keyBytes
        );

    if (decrypt) {
        subkeys = [...subkeys].reverse();
    }

    const output =
        new Uint8Array(
            paddedBytes.length
        );

    const steps = [];

    steps.push({
        title:
            currentLanguage === "ar"
                ? "مفتاح DES"
                : "DES Key",

        detail:
            keyBytesToDisplay(keyBytes)
    });

    steps.push({
        title:
            currentLanguage === "ar"
                ? "حجم البيانات"
                : "Data Size",

        detail:
            `${paddedBytes.length} bytes / 8 = ${paddedBytes.length / 8} blocks`
    });

    for (
        let offset = 0;
        offset < paddedBytes.length;
        offset += 8
    ) {

        const block =
            paddedBytes.slice(
                offset,
                offset + 8
            );

        const blockResult =
            desBlock(
                block,
                subkeys,
                offset === 0
            );

        output.set(
            blockResult.bytes,
            offset
        );

        if (offset === 0) {

            steps.push({
                title:
                    currentLanguage === "ar"
                        ? "الكتلة الأولى"
                        : "First Block",

                detail:
                    bytesToBits(block)
            });

            if (
                blockResult.rounds.length
            ) {

                for (
                    const round
                    of blockResult.rounds
                ) {

                    steps.push({
                        title:
                            currentLanguage === "ar"
                                ? `الجولة ${round.round}`
                                : `Round ${round.round}`,

                        detail:
                            `L = ${round.L}\nR = ${round.R}`
                    });
                }
            }
        }
    }

    let result;

    if (decrypt) {

        const unpadded =
            desUnpad(output);

        try {

            result =
                new TextDecoder(
                    "utf-8",
                    { fatal: true }
                ).decode(unpadded);

        } catch {

            throw new Error(
                currentLanguage === "ar"
                    ? "تعذر تحويل الناتج إلى UTF-8. تأكد من المفتاح."
                    : "Unable to decode the result as UTF-8. Check the key."
            );
        }

    } else {

        result =
            bytesToBase64(output);
    }

    return {
        result,
        steps
    };
}


function keyBytesToDisplay(bytes) {

    return Array.from(bytes)
        .map(
            b =>
                b
                    .toString(16)
                    .padStart(2, "0")
                    .toUpperCase()
        )
        .join("");
}


/* =========================================================
   30. MAIN EXECUTION
   ========================================================= */

function executeCipher() {

    const input =
        cipherInput.value;

    if (
        !input &&
        currentAlgorithm !== "xor"
    ) {

        showToast(
            currentLanguage === "ar"
                ? "أدخل النص أولًا."
                : "Enter the input first.",
            "error"
        );

        return;
    }

    try {

        let output;

        const decrypt =
            currentOperation === "decrypt";

        switch (currentAlgorithm) {

            case "caesar":

                output =
                    caesarCipher(
                        input,
                        document.getElementById(
                            "keyInput"
                        ).value,
                        decrypt
                    );

                break;


            case "multiplicative":

                output =
                    multiplicativeCipher(
                        input,
                        document.getElementById(
                            "keyInput"
                        ).value,
                        decrypt
                    );

                break;


            case "multi-key":

                output =
                    multiKeyCipher(
                        input,
                        document.getElementById(
                            "keysInput"
                        ).value,
                        decrypt
                    );

                break;


            case "xor":

                output =
                    xorCipher(
                        input,
                        document.getElementById(
                            "keyInput"
                        ).value,
                        decrypt
                    );

                break;


            case "transposition":

                output =
                    transpositionCipher(
                        input,
                        document.getElementById(
                            "columnsInput"
                        ).value,
                        document.getElementById(
                            "paddingInput"
                        ).value,
                        decrypt
                    );

                break;


            case "box-p":

                output =
                    boxPCipher(
                        input,
                        document.getElementById(
                            "permutationInput"
                        ).value,
                        decrypt
                    );

                break;


            case "s-box":

                output =
                    sboxCipher(
                        input,
                        decrypt
                    );

                break;


            case "des":

                output =
                    desCipher(
                        input,
                        document.getElementById(
                            "keyInput"
                        ).value,
                        decrypt
                    );

                break;


            default:

                throw new Error(
                    "Unknown algorithm."
                );
        }

        lastResult =
            output.result;

        cipherResult.textContent =
            output.result;

        cipherResult.classList.add(
            "has-result"
        );

        renderSteps(
            output.steps
        );

        showToast(
            currentLanguage === "ar"
                ? "تم تنفيذ العملية بنجاح ✓"
                : "Operation completed successfully ✓",
            "success"
        );

    } catch (error) {

        console.error(error);

        cipherResult.textContent =
            error.message;

        cipherResult.classList.remove(
            "has-result"
        );

        stepsList.innerHTML = `
            <div class="empty-steps">
                <span>⚠️</span>
                <p>${escapeHTML(error.message)}</p>
            </div>
        `;

        stepsCount.textContent = "0";

        showToast(
            error.message,
            "error"
        );
    }
}


/* =========================================================
   31. RENDER STEPS
   ========================================================= */

function renderSteps(steps) {

    if (!steps || steps.length === 0) {

        resetResult();
        return;
    }

    stepsCount.textContent =
        String(steps.length);

    stepsList.innerHTML = "";

    steps.forEach(
        (step, index) => {

            const element =
                document.createElement("div");

            element.className =
                "step-item";

            element.innerHTML = `
                <div class="step-number">
                    ${index + 1}
                </div>

                <div class="step-content">

                    <div class="step-title">
                        ${escapeHTML(step.title)}
                    </div>

                    <div class="step-detail">
                        ${escapeHTML(step.detail)}
                    </div>

                </div>
            `;

            stepsList.appendChild(element);
        }
    );
}


/* =========================================================
   32. SAFE HTML
   ========================================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   33. COPY RESULT
   ========================================================= */

async function copyResult() {

    if (!lastResult) {

        showToast(
            currentLanguage === "ar"
                ? "لا توجد نتيجة لنسخها."
                : "There is no result to copy.",
            "error"
        );

        return;
    }

    try {

        await navigator.clipboard.writeText(
            lastResult
        );

        showToast(
            currentLanguage === "ar"
                ? "تم نسخ النتيجة ✓"
                : "Result copied ✓",
            "success"
        );

    } catch {

        const textarea =
            document.createElement("textarea");

        textarea.value =
            lastResult;

        document.body.appendChild(
            textarea
        );

        textarea.select();

        document.execCommand(
            "copy"
        );

        textarea.remove();

        showToast(
            currentLanguage === "ar"
                ? "تم نسخ النتيجة ✓"
                : "Result copied ✓",
            "success"
        );
    }
}


/* =========================================================
   34. CLEAR
   ========================================================= */

function clearModal() {

    cipherInput.value = "";

    resetResult();

    updateCounter();

    cipherInput.focus();
}


/* =========================================================
   35. EVENT LISTENERS
   ========================================================= */

document
    .querySelectorAll("[data-open]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                openModal(
                    button.dataset.open
                );
            }
        );
    });


document
    .querySelectorAll(".algorithm-card")
    .forEach(card => {

        card.addEventListener(
            "click",
            event => {

                if (
                    event.target.closest(
                        "button"
                    )
                ) {
                    return;
                }

                const algorithm =
                    card.dataset.algorithm;

                if (algorithm) {
                    openModal(algorithm);
                }
            }
        );
    });


document
    .querySelectorAll(".operation-tab")
    .forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                changeOperation(
                    tab.dataset.operation
                );
            }
        );
    });


closeModalBtn.addEventListener(
    "click",
    closeModal
);


modal.addEventListener(
    "click",
    event => {

        if (
            event.target === modal
        ) {
            closeModal();
        }
    }
);


executeBtn.addEventListener(
    "click",
    executeCipher
);


clearBtn.addEventListener(
    "click",
    clearModal
);


copyBtn.addEventListener(
    "click",
    copyResult
);


cipherInput.addEventListener(
    "input",
    updateCounter
);


languageBtn.addEventListener(
    "click",
    () => {

        currentLanguage =
            currentLanguage === "ar"
                ? "en"
                : "ar";

        localStorage.setItem(
            "cryptolab-language",
            currentLanguage
        );

        applyLanguage();
    }
);


themeBtn.addEventListener(
    "click",
    () => {

        currentTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";

        localStorage.setItem(
            "cryptolab-theme",
            currentTheme
        );

        applyTheme();
    }
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            modal.classList.contains("active")
        ) {

            closeModal();
        }

        if (
            event.ctrlKey &&
            event.key === "Enter" &&
            modal.classList.contains("active")
        ) {

            executeCipher();
        }
    }
);


/* =========================================================
   36. START BUTTON
   ========================================================= */

if (startBtn) {

    startBtn.addEventListener(
        "click",
        () => {

            const section =
                document.getElementById(
                    "algorithms"
                );

            if (section) {

                section.scrollIntoView({
                    behavior: "smooth"
                });

                setTimeout(
                    () => openModal("caesar"),
                    550
                );
            }
        }
    );
}


/* =========================================================
   37. NAVIGATION ACTIVE STATE
   ========================================================= */

const sections = [
    document.getElementById("home"),
    document.getElementById("algorithms"),
    document.getElementById("about")
].filter(Boolean);


const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


function setActiveNav(id) {

    navLinks.forEach(link => {

        const href =
            link.getAttribute("href");

        link.classList.toggle(
            "active",
            href === `#${id}`
        );
    });
}


if (
    "IntersectionObserver"
    in window
) {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        setActiveNav(
                            entry.target.id
                        );
                    }
                });

            },
            {
                threshold: 0.35
            }
        );

    sections.forEach(section => {
        observer.observe(section);
    });
}


navLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            navLinks.forEach(
                item =>
                    item.classList.remove(
                        "active"
                    )
            );

            link.classList.add(
                "active"
            );
        }
    );
});


/* =========================================================
   38. DES SELF TEST
   ========================================================= */

function runDESTest() {

    try {

        const key =
            hexToBytes(
                "133457799BBCDFF1"
            );

        const plaintext =
            hexToBytes(
                "0123456789ABCDEF"
            );

        const subkeys =
            generateDESSubkeys(key);

        const result =
            desBlock(
                plaintext,
                subkeys
            ).bytes;

        const hex =
            keyBytesToDisplay(result);

        const expected =
            "85E813540F0AB405";

        if (hex !== expected) {

            console.error(
                "DES self-test failed:",
                hex,
                "expected:",
                expected
            );

        } else {

            console.info(
                "CryptoLab DES self-test: PASSED ✓"
            );
        }

    } catch (error) {

        console.error(
            "DES self-test error:",
            error
        );
    }
}


/* =========================================================
   39. INITIALIZATION
   ========================================================= */

applyTheme();
applyLanguage();
updateCounter();
runDESTest();

console.info(
    "%cCryptoLab%c loaded successfully.",
    "font-weight:bold;font-size:16px;",
    "font-weight:normal;"
);

console.info(
    "Developed by Qusay Jalal"
);