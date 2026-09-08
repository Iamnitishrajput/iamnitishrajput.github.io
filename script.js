const toggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("nks-theme");
if (savedTheme === "dark") document.body.classList.add("dark");

function syncThemeIcon(){
  toggle.textContent = document.body.classList.contains("dark") ? "☀" : "☾";
}
syncThemeIcon();

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("nks-theme", document.body.classList.contains("dark") ? "dark" : "light");
  syncThemeIcon();
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal");
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});

document.querySelectorAll(".section h2, .career, .expertise-grid article, .project, .education-row, .contact-links a").forEach(el => {
  revealObserver.observe(el);
});
