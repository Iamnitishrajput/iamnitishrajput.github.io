const body = document.body;
const button = document.getElementById("themeToggle");
const saved = localStorage.getItem("nitish-theme");
if (saved === "dark") {
  body.classList.add("dark");
  button.textContent = "☀";
}
button.addEventListener("click", () => {
  body.classList.toggle("dark");
  const dark = body.classList.contains("dark");
  button.textContent = dark ? "☀" : "◐";
  localStorage.setItem("nitish-theme", dark ? "dark" : "light");
});
