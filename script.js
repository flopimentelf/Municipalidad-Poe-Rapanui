
(() => {
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

  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          activeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
  
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

  const orbitExperience = document.querySelector("#orbit-experience");

  if (orbitExperience) {
    const points = orbitExperience.querySelectorAll(".orbit-point");
    const label = orbitExperience.querySelector("#orbit-detail-label");
    const title = orbitExperience.querySelector("#orbit-detail-title");
    const text = orbitExperience.querySelector("#orbit-detail-text");
    const link = orbitExperience.querySelector("#orbit-detail-link");

    points.forEach((point) => {
      point.addEventListener("click", () => {
        const topic = orbitTopics[point.dataset.topic];
        if (!topic) return;

        points.forEach((item) => {
          item.setAttribute("aria-pressed", String(item === point));
        });

        label.textContent = topic.label;
        title.textContent = topic.title;
        text.textContent = topic.text;
        link.href = topic.href;
        link.innerHTML = `${topic.label === "Comunidad" ? "Participar en comunidad" : "Explorar " + topic.label.toLowerCase()} <span aria-hidden="true">↗</span>`;
      });
    });
  }

})();
