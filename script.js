

document.addEventListener('DOMContentLoaded', () => {
  //decodificación para el título
  const decodeTitle = () => {
    const el = document.getElementById('decode-word');
    if (!el) return;
 
    const target = (el.textContent || '').toUpperCase();
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let iteration = 0;
 
    let lastUpdate = 0;
    const updateInterval = 45; // ms
 
    function animate(timestamp) {
      if (!lastUpdate) lastUpdate = timestamp;
      const elapsed = timestamp - lastUpdate;
 
      if (elapsed > updateInterval) {
        const shown = target.slice(0, iteration);
        const rest = target.slice(iteration).split('').map(() => letters[Math.floor(Math.random() * letters.length)]).join('');
        el.textContent = shown + rest;
 
        if (iteration >= target.length) {
          el.textContent = target; 
          return; 
        }
        iteration += 1;
        lastUpdate = timestamp;
      }
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  };

  

  



  



  // Animación para el párrafo
  const animateParagraph = () => {
    const p = document.getElementById('animated-paragraph');
    if (!p) return;

    const originalText = p.innerText.trim();
    const words = originalText.split(/\s+/);

    p.innerHTML = ''; 

    words.forEach((word, index) => {
      const wordSpan = document.createElement('span');
      wordSpan.textContent = word; 
      wordSpan.className = 'word';
      p.appendChild(wordSpan);
      p.append(' '); 

      
      setTimeout(() => {
        wordSpan.classList.add('visible');
      }, index * 40); 
    });
  };

  
  const updateYear = () => {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  };

  // Lógica Imágenes
  const setupImageModal = () => {
    const projectsContainer = document.querySelector('.cards');

    if (projectsContainer) {
      projectsContainer.addEventListener('click', (e) => {
        
        if (e.target.tagName === 'IMG' && e.target.closest('.card')) {
          e.preventDefault();

          const modalOverlay = document.createElement('div');
          modalOverlay.className = 'modal-overlay';

          const modalImage = document.createElement('img');
          modalImage.src = e.target.src;
          modalImage.alt = e.target.alt;

          modalOverlay.appendChild(modalImage);
          document.body.appendChild(modalOverlay);
          document.body.classList.add('modal-open');

          const closeModal = () => {
            modalOverlay.remove();
            document.body.classList.remove('modal-open');
            document.removeEventListener('keydown', handleEsc);
          };

          
          modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) {
              closeModal();
            }
          });
          const handleEsc = (event) => event.key === 'Escape' && closeModal();
          document.addEventListener('keydown', handleEsc);
        }
      });
    }
  };

  // Lógica para el cambio de tema
  const setupThemeToggle = () => {
    const themeToggle = document.querySelector(".checkbox");
    const body = document.body;

    if (!themeToggle) return; 

    
    const applyTheme = (theme) => {
      if (theme === "light") {
        body.classList.add("light-mode");
        themeToggle.checked = true;
      } else {
        body.classList.remove("light-mode");
        themeToggle.checked = false;
      }
    };

    
    const savedTheme = localStorage.getItem("theme") || "dark"; 
    applyTheme(savedTheme);

    
    themeToggle.addEventListener("change", () => {
      const newTheme = themeToggle.checked ? "light" : "dark";
      body.classList.toggle("light-mode", themeToggle.checked);
      localStorage.setItem("theme", newTheme);
    });
  };

  setupThemeToggle();
  decodeTitle();
  animateParagraph();
  updateYear();
  setupImageModal();
});
