document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      mainNav.classList.toggle("is-open", !isOpen);
    });
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        mainNav.classList.remove("is-open");
      });
    });
  }
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }
  const welcome = document.getElementById("welcome-screen");
  if (welcome) {
    if (sessionStorage.getItem("welcome-seen")) {
      welcome.remove();
    } else {
      sessionStorage.setItem("welcome-seen", "true");
      window.setTimeout(() => {
        welcome.classList.add("is-hidden");
        window.setTimeout(() => {
          welcome.remove();
        }, 500);
      }, 1000);
    }
  }
});
