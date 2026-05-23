// ============================================
// SKILLS DATA
// ============================================

const skills = [

    { name: "HTML5", category: "frontend" },
    { name: "CSS3", category: "frontend" },
    { name: "JavaScript", category: "frontend" },
    { name: "React.js", category: "frontend" },

    { name: "Node.js", category: "backend" },
    { name: "Express.js", category: "backend" },
    { name: "MySQL", category: "backend" },
    { name: "MongoDB", category: "backend" },

    { name: "Python", category: "data" },
    { name: "Pandas", category: "data" },
    { name: "Scikit-learn", category: "data" },
    { name: "SQL", category: "data" },

    { name: "Git", category: "tools" },
    { name: "Docker", category: "tools" },
    { name: "AWS", category: "tools" }

];

// ============================================
// RENDER SKILLS
// ============================================

function renderSkills(filter = "all") {

    const container =
        document.getElementById("skills-container");

    if (!container) return;

    const filteredSkills =
        filter === "all"
            ? skills
            : skills.filter(
                skill => skill.category === filter
            );

    container.innerHTML =
        filteredSkills
            .map(skill => `
                <span class="skill-tag">
                    ${skill.name}
                </span>
            `)
            .join("");
}

// ============================================
// FILTER BUTTONS
// ============================================

function setupFilters() {

    const buttons =
        document.querySelectorAll(".filter-btn");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            renderSkills(button.dataset.filter);
        });
    });
}

// ============================================
// DARK MODE
// ============================================

function setupDarkMode() {

    const toggle =
        document.getElementById("dark-toggle");

    if (!toggle) return;

    const savedMode =
        localStorage.getItem("darkMode");

    if (savedMode === "true") {

        document.body.classList.add("dark");

        toggle.textContent = "☀️ Light Mode";
    }

    toggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const isDark =
            document.body.classList.contains("dark");

        toggle.textContent =
            isDark
                ? "☀️ Light Mode"
                : "🌙 Dark Mode";

        localStorage.setItem(
            "darkMode",
            isDark
        );
    });
}

// ============================================
// TYPING ANIMATION
// ============================================

function setupTypingAnimation() {

    const element =
        document.getElementById("typing-text");

    if (!element) return;

    const texts = [

        "Full Stack Developer",

        "Data Analytics Enthusiast",

        "ML Engineer in Training",

        "Problem Solver",

        "Building in Public"

    ];

    let textIndex = 0;

    let charIndex = 0;

    let isDeleting = false;

    function type() {

        const currentText =
            texts[textIndex];

        if (isDeleting) {

            element.textContent =
                currentText.substring(
                    0,
                    charIndex - 1
                );

            charIndex--;

        } else {

            element.textContent =
                currentText.substring(
                    0,
                    charIndex + 1
                );

            charIndex++;
        }

        let speed = isDeleting ? 50 : 100;

        if (
            !isDeleting &&
            charIndex === currentText.length
        ) {

            speed = 1500;

            isDeleting = true;

        } else if (
            isDeleting &&
            charIndex === 0
        ) {

            isDeleting = false;

            textIndex =
                (textIndex + 1) % texts.length;
        }

        setTimeout(type, speed);
    }

    type();
}

// ============================================
// DSA PROGRESS
// ============================================

const dsaProgress = {

    Arrays: { solved: 4, total: 20 },

    Strings: { solved: 0, total: 15 },

    LinkedList: { solved: 0, total: 10 },

    Trees: { solved: 0, total: 15 },

    Graphs: { solved: 0, total: 10 },

    DP: { solved: 0, total: 15 }

};

function renderProgress() {

    const container =
        document.getElementById(
            "progress-container"
        );

    if (!container) return;

    container.innerHTML =
        Object.entries(dsaProgress)
            .map(([topic, data]) => {

                const percent =
                    Math.round(
                        (data.solved / data.total) * 100
                    );

                return `
                    <div class="progress-item">

                        <div class="progress-header">

                            <span>${topic}</span>

                            <span>
                                ${data.solved}/${data.total}
                            </span>

                        </div>

                        <div class="progress-bar">

                            <div
                                class="progress-fill"
                                style="width:${percent}%">
                            </div>

                        </div>

                    </div>
                `;
            })
            .join("");
}

// ============================================
// CONTACT FORM
// ============================================

function setupContactForm() {

    const form =
        document.getElementById("contact-form");

    if (!form) return;

    form.addEventListener("submit", e => {

        e.preventDefault();

        const name =
            document.getElementById("name")
                .value
                .trim();

        const email =
            document.getElementById("email")
                .value
                .trim();

        const message =
            document.getElementById("message")
                .value
                .trim();

        if (!name || !email || !message) {

            showAlert(
                "Please fill all fields",
                "error"
            );

            return;
        }

        if (!validateEmail(email)) {

            showAlert(
                "Enter valid email",
                "error"
            );

            return;
        }

        showAlert(
            `Thanks ${name}! Message received.`,
            "success"
        );

        form.reset();
    });
}

function validateEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);
}

// ============================================
// ALERTS
// ============================================

function showAlert(message, type) {

    const alert =
        document.createElement("div");

    alert.className =
        `alert alert-${type}`;

    alert.textContent = message;

    document.body.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 3000);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function setupScrollAnimations() {

    const sections =
        document.querySelectorAll(".section");

    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target
                            .classList
                            .add("visible");
                    }
                });

            },

            {
                threshold: 0.1
            }
        );

    sections.forEach(section => {
        observer.observe(section);
    });
}

// ============================================
// INITIALIZE WEBSITE
// ============================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderSkills();

        setupFilters();

        setupDarkMode();

        setupTypingAnimation();

        renderProgress();

        setupContactForm();

        setupScrollAnimations();

        console.log(
            "Portfolio initialized successfully"
        );
    }
);