// ============================================
// SKILL TAGS — Dynamic rendering
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
    { name: "AWS", category: "tools" },
];

// Render skills dynamically
function renderSkills(filter = "all") {
    const container = document.getElementById("skills-container");
    const filtered = filter === "all" 
        ? skills 
        : skills.filter(s => s.category === filter);
    
    container.innerHTML = filtered
        .map(skill => `
            <span class="skill-tag" data-category="${skill.category}">
                ${skill.name}
            </span>
        `)
        .join("");
}

// Filter buttons
function setupFilters() {
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active from all buttons
            buttons.forEach(b => b.classList.remove("active"));
            // Add active to clicked button
            btn.classList.add("active");
            // Render filtered skills
            renderSkills(btn.dataset.filter);
        });
    });
}

// ============================================
// DARK MODE TOGGLE
// ============================================

function setupDarkMode() {
    const toggle = document.getElementById("dark-toggle");
    if (!toggle) return;
    
    // Check saved preference
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") {
        document.body.classList.add("dark");
        toggle.textContent = "☀️ Light Mode";
    }
    
    toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        const isDark = document.body.classList.contains("dark");
        toggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
        localStorage.setItem("darkMode", isDark);
    });
}

// ============================================
// TYPING ANIMATION
// ============================================

function setupTypingAnimation() {
    const element = document.getElementById("typing-text");
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
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            element.textContent = currentText.slice(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentText.slice(0, charIndex + 1);
            charIndex++;
        }
        
        // Finished typing
        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => { isDeleting = true; }, 1500);
        }
        
        // Finished deleting
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        const speed = isDeleting ? 50 : 100;
        setTimeout(type, speed);
    }
    
    type();
}

// ============================================
// DSA PROGRESS TRACKER
// ============================================

const dsaProgress = {
    arrays: { solved: 4, total: 20 },
    strings: { solved: 0, total: 15 },
    linkedList: { solved: 0, total: 10 },
    trees: { solved: 0, total: 15 },
    graphs: { solved: 0, total: 10 },
    dp: { solved: 0, total: 15 },
};

function renderProgress() {
    const container = document.getElementById("progress-container");
    if (!container) return;
    
    container.innerHTML = Object.entries(dsaProgress)
        .map(([topic, data]) => {
            const percent = Math.round((data.solved / data.total) * 100);
            return `
                <div class="progress-item">
                    <div class="progress-header">
                        <span class="topic-name">${topic}</span>
                        <span class="progress-count">
                            ${data.solved}/${data.total}
                        </span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" 
                             style="width: ${percent}%">
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
    const form = document.getElementById("contact-form");
    if (!form) return;
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        
        // Basic validation
        if (!name || !email || !message) {
            showAlert("Please fill all fields", "error");
            return;
        }
        
        if (!isValidEmail(email)) {
            showAlert("Please enter a valid email", "error");
            return;
        }
        
        // Simulate sending (replace with Formspree later)
        showAlert(`Thanks ${name}! Message received.`, "success");
        form.reset();
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showAlert(message, type) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
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
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.1 }
    );
    
    document.querySelectorAll(".section").forEach(section => {
        observer.observe(section);
    });
}

// ============================================
// INITIALIZE EVERYTHING
// ============================================

document.addEventListener("DOMContentLoaded", () => {
    renderSkills();
    setupFilters();
    setupDarkMode();
    setupTypingAnimation();
    renderProgress();
    setupContactForm();
    setupScrollAnimations();
    
    console.log("Portfolio initialized successfully");
});