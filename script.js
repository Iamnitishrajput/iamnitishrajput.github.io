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


/* V6 interaction layer */
(function(){
  const progress = document.getElementById('scroll-progress');
  const toggle = document.querySelector('.work-profile-toggle');
  const panel = document.getElementById('work-profile-panel');

  function updateProgress(){
    if(!progress) return;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    progress.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, {passive:true});
  updateProgress();

  if(toggle && panel){
    toggle.addEventListener('click', function(){
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      panel.hidden = open;
    });
  }

  // Gentle number count-up for the first prominent "6+" experience figure.
  const candidates = Array.from(document.querySelectorAll('h1,h2,h3,h4,.stat,.metric,.number,.hero-card *'));
  const counter = candidates.find(el => /^6\+?$/.test(el.textContent.trim()));
  if(counter){
    const target = parseInt(counter.textContent,10);
    if(Number.isFinite(target)){
      const run = () => {
        const duration = 900;
        const start = performance.now();
        const tick = now => {
          const p = Math.min((now-start)/duration,1);
          const eased = 1 - Math.pow(1-p,3);
          counter.textContent = Math.floor(target*eased) + '+';
          if(p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      };
      const observer = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting){
          run();
          observer.disconnect();
        }
      }, {threshold:.6});
      observer.observe(counter);
    }
  }

  // Add subtle active pulse to timeline markers as timeline items enter view.
  const timelineItems = document.querySelectorAll('.timeline-item,.timeline-entry,.timeline li');
  if(timelineItems.length){
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add('is-active');
      });
    }, {threshold:.35});
    timelineItems.forEach(item => io.observe(item));
  }
})();



