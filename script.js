const body = document.body;
const toggle = document.getElementById("themeToggle");
const icon = document.getElementById("themeIcon");

const savedTheme = localStorage.getItem("nitish-theme");
if (savedTheme === "dark") {
  body.classList.add("dark");
  icon.textContent = "☀";
}

toggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const dark = body.classList.contains("dark");
  icon.textContent = dark ? "☀" : "☾";
  localStorage.setItem("nitish-theme", dark ? "dark" : "light");
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
