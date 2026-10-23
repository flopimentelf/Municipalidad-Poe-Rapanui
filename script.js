
(() => {
  function iniciarSitio() {
    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    // Menú de navegación
    if (menuToggle && mainNav) {
      menuToggle.addEventListener("click", () => {
        const isOpen =
          menuToggle.getAttribute("aria-expanded") === "true";

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

    // Animaciones al aparecer en pantalla
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

    // Pantalla de bienvenida IORANA
    const welcome = document.getElementById("welcome-screen");

    if (welcome) {
      let yaSeMostro = false;

      try {
        yaSeMostro = sessionStorage.getItem("welcome-seen") === "true";

        if (!yaSeMostro) {
          sessionStorage.setItem("welcome-seen", "true");
        }
      } catch (error) {
        // Si el almacenamiento está bloqueado, la bienvenida igual continúa.
      }

      if (yaSeMostro) {
        welcome.remove();
      } else {
        window.setTimeout(() => {
          welcome.classList.add("is-hidden");

          window.setTimeout(() => {
            welcome.remove();
          }, 550);
        }, 1000);
      }

      // Protección adicional: no dejar la pantalla bloqueada.
      window.setTimeout(() => {
        if (welcome.isConnected) {
          welcome.remove();
        }
      }, 3000);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarSitio, {
      once: true
    });
  } else {
    iniciarSitio();
  }
})();
