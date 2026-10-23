
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Menú móvil
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    const closeMenu = () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    };

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  // Aparición progresiva al desplazarse
  const revealItems = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        activeObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -45px 0px"
    });

    revealItems.forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 90}ms`);
      observer.observe(item);
    });
  }

  // Contenido de la órbita
  const orbitTopics = {
    territory: {
      label: "Territorio",
      title: "Un territorio que nos conecta.",
      text: "Conoce el espacio que habitamos y las iniciativas que contribuyen a su cuidado.",
      href: "explora.html"
    },
    community: {
      label: "Comunidad",
      title: "El futuro se construye en comunidad.",
      text: "Descubre espacios de participación, iniciativas y recursos para la vida comunitaria.",
      href: "comunidad.html"
    },
    nature: {
      label: "Naturaleza",
      title: "Cuidar el entorno es cuidar el futuro.",
      text: "Explora información sobre el entorno natural y su relación con la vida en Rapa Nui.",
      href: "explora.html"
    }
  };

  const experience = document.querySelector("#orbit-experience");
  const orbitArt = experience?.querySelector(".orbit-art");

  if (experience && orbitArt) {
    const points = experience.querySelectorAll(".orbit-point");
    const label = experience.querySelector("#orbit-detail-label");
    const title = experience.querySelector("#orbit-detail-title");
    const text = experience.querySelector("#orbit-detail-text");
    const link = experience.querySelector("#orbit-detail-link");

    // Movimiento suave de la órbita con ratón o trackpad.
    // En pantallas táctiles no bloquea el desplazamiento de la página.
    if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      let framePending = false;
      let pointerX = 0;
      let pointerY = 0;

      orbitArt.addEventListener("pointermove", (event) => {
        const rect = orbitArt.getBoundingClientRect();
        pointerX = (event.clientX - rect.left) / rect.width - 0.5;
        pointerY = (event.clientY - rect.top) / rect.height - 0.5;

        if (framePending) return;
        framePending = true;

        window.requestAnimationFrame(() => {
          orbitArt.style.setProperty("--orbit-tilt-x", `${pointerX * 9}deg`);
          orbitArt.style.setProperty("--orbit-tilt-y", `${pointerY * -9}deg`);
          orbitArt.style.setProperty("--orbit-shift-x", `${pointerX * 5}px`);
          orbitArt.style.setProperty("--orbit-shift-y", `${pointerY * 5}px`);
          framePending = false;
        });
      });

      orbitArt.addEventListener("pointerleave", () => {
        orbitArt.style.setProperty("--orbit-tilt-x", "0deg");
        orbitArt.style.setProperty("--orbit-tilt-y", "0deg");
        orbitArt.style.setProperty("--orbit-shift-x", "0px");
        orbitArt.style.setProperty("--orbit-shift-y", "0px");
      });
    }

    const selectTopic = (point) => {
      const topic = orbitTopics[point.dataset.topic];
      if (!topic || !label || !title || !text || !link) return;

      points.forEach((item) => {
        item.setAttribute("aria-pressed", String(item === point));
      });

      experience.dataset.activeTopic = point.dataset.topic;

      const detail = experience.querySelector(".orbit-detail");

      if (detail) {
        detail.classList.add("is-changing");

        window.setTimeout(() => {
          label.textContent = topic.label;
          title.textContent = topic.title;
          text.textContent = topic.text;
          link.href = topic.href;

          // Icono vectorial SVG, sin caracteres de flecha.
          link.innerHTML = `${point.dataset.topic === "community" ? "Participar en comunidad" : `Explorar ${topic.label.toLowerCase()}`}
            <span class="link-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7 17 17 7"></path>
                <path d="M8 7h9v9"></path>
              </svg>
            </span>`;

          detail.classList.remove("is-changing");
        }, reduceMotion ? 0 : 160);
      } else {
        label.textContent = topic.label;
        title.textContent = topic.title;
        text.textContent = topic.text;
        link.href = topic.href;
      }
    };

    points.forEach((point) => {
      point.addEventListener("click", () => selectTopic(point));
    });
  }
})();
