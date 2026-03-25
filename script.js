const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${index * 40}ms`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach((el) => revealObserver.observe(el));

const yearTarget = document.getElementById('year');
if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

const bgPrimary = document.querySelector('.bg-photo-primary');
const bgSecondary = document.querySelector('.bg-photo-secondary');

const softwareBackgrounds = [
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2200&q=80',
  'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=2200&q=80',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=2200&q=80',
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=2200&q=80',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=2200&q=80',
];

if (bgPrimary && bgSecondary) {
  let activeIndex = 0;
  let nextIndex = 1;

  bgPrimary.style.backgroundImage = `url(${softwareBackgrounds[activeIndex]})`;
  bgSecondary.style.backgroundImage = `url(${softwareBackgrounds[nextIndex]})`;

  setInterval(() => {
    bgSecondary.classList.add('is-active');

    setTimeout(() => {
      activeIndex = nextIndex;
      nextIndex = (nextIndex + 1) % softwareBackgrounds.length;

      bgPrimary.style.backgroundImage = `url(${softwareBackgrounds[activeIndex]})`;
      bgSecondary.style.backgroundImage = `url(${softwareBackgrounds[nextIndex]})`;
      bgSecondary.classList.remove('is-active');
    }, 1300);
  }, 8000);
}

const downloadButtons = [
  document.getElementById('download-cv'),
  document.getElementById('download-cv-secondary'),
].filter(Boolean);

const cvSheet = document.getElementById('cv-sheet');

function downloadCvFile() {
  if (!cvSheet) {
    return;
  }

  const printableMarkup = cvSheet.outerHTML;
  const cvDocument = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Josphat_Omondi_CV</title>
    <style>
      body {
        margin: 0;
        padding: 32px;
        font-family: "Manrope", Arial, sans-serif;
        background: #f7fbfd;
        color: #10262f;
      }

      .cv-sheet {
        max-width: 900px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #d7e2e9;
        border-radius: 14px;
        box-shadow: 0 10px 30px rgba(16, 38, 47, 0.12);
        padding: 24px;
      }

      .cv-header {
        border-bottom: 2px solid #d7e2e9;
        padding-bottom: 12px;
        margin-bottom: 16px;
      }

      .cv-header h3 {
        margin: 0;
        font-size: 28px;
      }

      .cv-header p {
        margin: 6px 0;
      }

      .cv-block {
        margin-bottom: 16px;
      }

      .cv-block h4 {
        margin: 0 0 8px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .cv-block ul {
        margin: 0;
        padding-left: 18px;
      }

      .cv-columns {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }

      @media (max-width: 760px) {
        body {
          padding: 16px;
        }

        .cv-sheet {
          padding: 16px;
        }

        .cv-columns {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    ${printableMarkup}
  </body>
</html>`;

  const blob = new Blob([cvDocument], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = 'Josphat_Omondi_CV.html';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

downloadButtons.forEach((button) => {
  button.addEventListener('click', downloadCvFile);
});
