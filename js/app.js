document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".hl-shoppers-slider");

  if (!slider) return;

  // Permitir desplazamiento suave en todos los dispositivos
  slider.style.scrollBehavior = "smooth";

  // Habilitar swipe en trackpads y móviles
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5; // velocidad
    slider.scrollLeft = scrollLeft - walk;
  });

  // Soporte para touch
  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("touchmove", (e) => {
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.2;
    slider.scrollLeft = scrollLeft - walk;
  });

  /* --- Scroll Snap (Opción C) --- */
  slider.style.scrollSnapType = "x mandatory";
  const cards = slider.querySelectorAll(".hl-shoppers-card");
  cards.forEach(card => {
    card.style.scrollSnapAlign = "center";
  });

  /* === MODAL DINÁMICO GLOBAL === */
  console.log("JS cargado: Modal dinámico inicializado");
  const overlay = document.getElementById("hl-modal-overlay");
  const modal = document.getElementById("hl-modal");
  const modalTitle = document.getElementById("hl-modal-title");
  const modalDescription = document.getElementById("hl-modal-description");
  const modalClose = document.getElementById("hl-modal-close");

  // Datos de cada Personal Shopper
  const shoppers = {
    "carlos-segoviano": {
      title: "Carlos Segoviano",
      description: "Especialista en estilo formal y casual premium."
    },
    "ricardo-lino": {
      title: "Ricardo Lino Rodríguez",
      description: "Personal Shopper con experiencia en sastrería fina y consultoría de imagen."
    },
    "oscar-miguel": {
      title: "Oscar Miguel Morelos Hernández",
      description: "Especialista en estilo ejecutivo y recomendaciones personalizadas."
    },
    "jose-antonio": {
      title: "José Antonio Valdovino Segoviano",
      description: "Asesor con amplio dominio en moda contemporánea y tendencias."
    },
    "carlos-santillan": {
      title: "Carlos Santillán Fuentes",
      description: "Enfoque en estilo minimalista, profesional y elegante."
    },
    "ana-gabriela": {
      title: "Ana Gabriela Frías Flores",
      description: "Experta en asesoría integral de imagen, cortes y combinaciones."
    },
    "jose-luis": {
      title: "José Luis Herrera López",
      description: "Guía personalizado en selección de prendas premium."
    },
    "alejandro-morales": {
      title: "Alejandro Morales Pinto",
      description: "Orientación profesional para construcción de estilo corporativo."
    }
  };

  // Abrir modal dinámico
  document.querySelectorAll(".hl-view-more").forEach(btn => {
    btn.addEventListener("click", () => {
      console.log("Click detectado en botón Ver más:", btn.dataset.id);

      const rawId = btn.dataset.id; // ejemplo: "modal-carlos"
      const id = rawId.replace("modal-", ""); // queda solo "carlos"

      const block = document.getElementById(`data-${id}`);
      console.log("Bloque encontrado:", block);

      if (!block) return;

      // Extraer contenido del bloque oculto
      const titleEl = block.querySelector("h3");
      const descEl = block.querySelector("p");

      modalTitle.textContent = titleEl ? titleEl.textContent : "";
      modalDescription.textContent = descEl ? descEl.textContent : "";

      /* === FOTO DEL MODAL — FIX DEFINITIVO === */
      const modalPhoto = document.getElementById("hl-modal-photo");

      // Usar dataset.id completo (ej: "modal-carlos-segoviano")
      let fullId = rawId.replace("modal-", "").toLowerCase();

      // Caso especial: "carlos" debe mapear a "carlos-segoviano"
      if (fullId === "carlos") {
        fullId = "carlos-segoviano";
      }

      if (modalPhoto) {
        const photoMap = {
          "carlos-segoviano": "assets/personalshoppers/ps-01/ps-carlos-segoviano-01.jpg",
          "jose-antonio": "assets/personalshoppers/ps-02/ps-02-jose-antonio-valdovino-segoviano-01.jpg",
          "carlos-santillan": "assets/personalshoppers/ps-03/ps-03-carlos-santillan-fuentes-01.jpg",
          "alejandro-morales": "assets/personalshoppers/ps-04/ps-04-alejandro-morales-pinto-01.jpg",
          "ana-gabriela": "assets/personalshoppers/ps-05/ps-05-ana-gabriela-frias-flores-01.jpg",
          "jose-luis": "assets/personalshoppers/ps-06/ps-06-jose-luis-herrera-lopez-01.jpg",
          "ricardo-lino": "assets/personalshoppers/ps-07/ps-07-ricardo-lino-rodriguez-01.jpg",
          "oscar-miguel": "assets/personalshoppers/ps-08/ps-08-oscar-miguel-morelos-hernandez-01.jpg"
        };
        modalPhoto.src = photoMap[fullId] || "";
        modalPhoto.alt = modalTitle.textContent;
      }

      console.log("Mostrando modal con título:", modalTitle.textContent);
      // Mostrar modal
      overlay.classList.add("active");
      modal.classList.add("active");
    });
  });

  // Cerrar modal
  modalClose.addEventListener("click", () => {
    overlay.classList.remove("active");
    modal.classList.remove("active");
  });
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("active");
      modal.classList.remove("active");
    }
  });

  /* === SCROLL SUAVE DESDE EL BOTÓN DEL HERO HACIA EL FORMULARIO === */
  const heroBtn = document.querySelector(".hl-hero-btn");
  const formSection = document.querySelector(".hl-form");

  if (heroBtn && formSection) {
    heroBtn.addEventListener("click", (e) => {
      e.preventDefault();
      formSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  /* === ANIMACIONES PREMIUM — INTERSECTION OBSERVER === */
  const animatedElements = document.querySelectorAll(".hl-animate");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("hl-animate-visible");
        }
      });
    },
    {
      threshold: 0.25
    }
  );

  animatedElements.forEach((el) => observer.observe(el));
});
