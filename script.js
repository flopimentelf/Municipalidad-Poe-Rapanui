
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    const closeMenu = () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    };

    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  const revealItems = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(item => item.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        activeObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    });

    revealItems.forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 90}ms`);
      observer.observe(item);
    });
  }

  const topics = {
    territory: {
      label: "Territorio",
      title: "Un territorio que nos conecta.",
      text: "Conoce el espacio que habitamos y las iniciativas que contribuyen a su cuidado.",
      linkText: "Explorar territorio",
      href: "explora.html"
    },
    community: {
      label: "Comunidad",
      title: "El futuro se construye en comunidad.",
      text: "Descubre espacios de participación, iniciativas y recursos para la vida comunitaria.",
      linkText: "Participar en comunidad",
      href: "comunidad.html"
    },
    nature: {
      label: "Naturaleza",
      title: "Cuidar el entorno es cuidar el futuro.",
      text: "Explora información sobre el entorno natural y su relación con la vida en Rapa Nui.",
      linkText: "Explorar naturaleza",
      href: "explora.html"
    }
  };

  const experience = document.querySelector("#orbit-experience");

  if (!experience) return;

  const points = experience.querySelectorAll(".orbit-point");
  const detail = experience.querySelector(".orbit-detail");
  const label = experience.querySelector("#orbit-detail-label");
  const title = experience.querySelector("#orbit-detail-title");
  const text = experience.querySelector("#orbit-detail-text");
  const link = experience.querySelector("#orbit-detail-link");

  if (!points.length || !detail || !label || !title || !text || !link) return;

  let activeTopic = "territory";
  let changeTimeout;

  const selectTopic = (point) => {
    const key = point.dataset.topic;
    const topic = topics[key];

    if (!topic) return;

    activeTopic = key;

    points.forEach(item => {
      const active = item === point;
      item.setAttribute("aria-pressed", String(active));
      item.classList.toggle("is-active", active);
    });

    experience.dataset.activeTopic = key;

    window.clearTimeout(changeTimeout);
    detail.classList.add("is-changing");

    changeTimeout = window.setTimeout(() => {
      label.textContent = topic.label;
      title.textContent = topic.title;
      text.textContent = topic.text;
      link.textContent = topic.linkText;
      link.href = topic.href;
      detail.classList.remove("is-changing");
      detail.classList.add("is-expanded");
    }, reduceMotion ? 0 : 170);
  };

  points.forEach(point => {
    point.addEventListener("click", () => selectTopic(point));

    point.addEventListener("keydown", event => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      selectTopic(point);
    });
  });

  const orbitArt = experience.querySelector(".orbit-art");

  if (orbitArt && !reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    orbitArt.addEventListener("pointermove", event => {
      const rect = orbitArt.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      orbitArt.style.setProperty("--orbit-tilt-x", `${x * 8}deg`);
      orbitArt.style.setProperty("--orbit-tilt-y", `${y * -8}deg`);
    });

    orbitArt.addEventListener("pointerleave", () => {
      orbitArt.style.setProperty("--orbit-tilt-x", "0deg");
      orbitArt.style.setProperty("--orbit-tilt-y", "0deg");
    });
  }
  (() => {
  const welcome = document.getElementById("welcome-screen");
  if (!welcome || sessionStorage.getItem("welcome-seen")) {
    welcome?.remove();
    return;
  }
  sessionStorage.setItem("welcome-seen", "true");
  window.setTimeout(() => {
    welcome.classList.add("is-hidden");
    window.setTimeout(() => {
      welcome.remove();
    }, 500);
  }, 1000);
})();
})();
})();
