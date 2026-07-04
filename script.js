(function () {
  "use strict";

  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.getElementById("main-nav");

  function setNavOpen(isOpen) {
    if (!mainNav || !navToggle) return;
    mainNav.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    document.body.classList.toggle("nav-open", isOpen);
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      setNavOpen(!mainNav.classList.contains("open"));
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setNavOpen(false);
      });
    });

    document.addEventListener("click", function (e) {
      if (
        mainNav.classList.contains("open") &&
        !mainNav.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        setNavOpen(false);
      }
    });
  }

  document.querySelectorAll(".faq-question").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq-item");
      var isOpen = item.classList.contains("open");

      document.querySelectorAll(".faq-item.open").forEach(function (openItem) {
        openItem.classList.remove("open");
      });

      if (!isOpen) {
        item.classList.add("open");
      }
    });
  });

  var formTypeInput = document.getElementById("form-type");
  var contactForm = document.getElementById("contact-form");
  var formSuccess = document.getElementById("form-success");
  var btnCorporate = document.getElementById("btn-corporate");

  function setFormType(type) {
    if (formTypeInput) {
      formTypeInput.value = type;
    }
    var comment = document.getElementById("comment");
    if (comment && type === "corporate") {
      comment.placeholder = "Опишите задачу предприятия и количество сотрудников";
    } else if (comment) {
      comment.placeholder = "Укажите интересующую программу или задачу";
    }
  }

  document.querySelectorAll("[data-form-type]").forEach(function (el) {
    el.addEventListener("click", function () {
      setFormType(el.getAttribute("data-form-type"));
      var program = el.getAttribute("data-program");
      if (program) {
        var names = {
          managers: "Обеспечение экологической безопасности руководителями",
          specialists: "Обеспечение экологической безопасности специалистами",
          waste: "Обеспечение экологической безопасности при работах с отходами",
        };
        var comment = document.getElementById("comment");
        if (comment && names[program]) {
          comment.value = "Интересует программа: " + names[program];
        }
      }
    });
  });

  if (btnCorporate) {
    btnCorporate.addEventListener("click", function () {
      setFormType("corporate");
      if (contactForm) {
        contactForm.requestSubmit();
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var data = new FormData(contactForm);
      var entries = Object.fromEntries(data.entries());

      try {
        var stored = JSON.parse(localStorage.getItem("academy_leads") || "[]");
        stored.push({
          date: new Date().toISOString(),
          ...entries,
        });
        localStorage.setItem("academy_leads", JSON.stringify(stored));
      } catch (_) {}

      contactForm.reset();
      setFormType("program");
      if (formSuccess) {
        formSuccess.classList.add("visible");
        setTimeout(function () {
          formSuccess.classList.remove("visible");
        }, 6000);
      }
    });
  }
})();
