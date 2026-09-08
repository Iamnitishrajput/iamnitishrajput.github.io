const toggle=document.getElementById('themeToggle');
const saved=localStorage.getItem('nks-theme');
if(saved==='dark') document.body.classList.add('dark');
function updateIcon(){toggle.textContent=document.body.classList.contains('dark')?'☀':'☾'}
updateIcon();
toggle.addEventListener('click',()=>{
  document.body.classList.toggle('dark');
  localStorage.setItem('nks-theme',document.body.classList.contains('dark')?'dark':'light');
  updateIcon();
});
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('reveal')}})
},{threshold:.12});
document.querySelectorAll('.section h2,.skill,.project,.edu-card').forEach(el=>observer.observe(el));
