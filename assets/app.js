/* ============================================================
   PAWŁOWICE BEARS — skrypty strony
   Czysty JavaScript, bez zależności.
   ============================================================ */
(function () {
  "use strict";

  var STORE = "bears-theme";

  /* --- Motyw jasny / ciemny ------------------------------------ */
  function setTheme(name) {
    document.documentElement.setAttribute("data-theme", name);
    try { localStorage.setItem(STORE, name); } catch (e) {}
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", name === "light" ? "true" : "false");
      btn.setAttribute("aria-label", name === "light" ? "Włącz motyw ciemny" : "Włącz motyw jasny");
    });
  }

  function initTheme() {
    var current = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(current);
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      if (btn.dataset.bound) return;
      btn.dataset.bound = "1";
      btn.addEventListener("click", function () {
        var now = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
        setTheme(now);
      });
    });
  }

  /* --- Menu mobilne -------------------------------------------- */
  function initNav() {
    var burger = document.querySelector("[data-burger]");
    var nav = document.getElementById("glowna-nawigacja");
    if (!burger || !nav || burger.dataset.bound) return;
    burger.dataset.bound = "1";

    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        nav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* --- Galeria: filtry ------------------------------------------ */
  function initFilters() {
    var bar = document.querySelector("[data-filters]");
    if (!bar || bar.dataset.bound) return;
    bar.dataset.bound = "1";
    var shots = Array.prototype.slice.call(document.querySelectorAll("[data-kat]"));

    bar.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-filter]");
      if (!btn) return;
      var kat = btn.dataset.filter;
      bar.querySelectorAll("button[data-filter]").forEach(function (b) {
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      shots.forEach(function (s) {
        s.hidden = !(kat === "wszystko" || s.dataset.kat === kat);
      });
    });
  }

  /* --- Galeria: lightbox ---------------------------------------- */
  function initLightbox() {
    var box = document.getElementById("lightbox");
    if (!box || box.dataset.bound) return;
    box.dataset.bound = "1";

    var frame = box.querySelector(".lightbox__frame");
    var cap = box.querySelector(".lightbox__cap");
    var opener = null;
    var idx = 0;

    function visible() {
      return Array.prototype.slice.call(document.querySelectorAll("[data-kat]")).filter(function (s) { return !s.hidden; });
    }

    function show(i) {
      var list = visible();
      if (!list.length) return;
      idx = (i + list.length) % list.length;
      var src = list[idx].querySelector("img, svg");
      var label = list[idx].querySelector("figcaption");
      frame.innerHTML = "";
      if (src) frame.appendChild(src.cloneNode(true));
      cap.textContent = label ? label.textContent.trim() : "";
    }

    function open(i, trigger) {
      opener = trigger || null;
      box.classList.add("is-open");
      box.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      show(i);
      box.querySelector(".lb-close").focus();
    }

    function close() {
      box.classList.remove("is-open");
      box.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (opener) opener.focus();
    }

    document.addEventListener("click", function (e) {
      var shot = e.target.closest("[data-kat]");
      if (shot && !shot.hidden) {
        open(visible().indexOf(shot), shot);
        return;
      }
      if (e.target.closest(".lb-close")) return close();
      if (e.target.closest(".lb-prev")) return show(idx - 1);
      if (e.target.closest(".lb-next")) return show(idx + 1);
      if (e.target === box) close();
    });

    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("is-open")) {
        var focused = document.activeElement;
        if (focused && focused.matches("[data-kat]") && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          open(visible().indexOf(focused), focused);
        }
        return;
      }
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  /* --- Formularz kontaktowy ------------------------------------- */
  function initForm() {
    var form = document.querySelector("form.klub");
    if (!form || form.dataset.bound) return;
    form.dataset.bound = "1";
    var note = document.getElementById("form-status");

    var wanted = new URLSearchParams(window.location.search).get("grupa");
    var select = form.querySelector('select[name="grupa"]');
    if (wanted && select) {
      var match = Array.prototype.slice.call(select.options).filter(function (o) {
        return o.value.toLowerCase() === wanted.toLowerCase();
      })[0];
      if (match) select.value = match.value;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var d = new FormData(form);
      var tresc =
        "Imię i nazwisko: " + d.get("imie") + "\n" +
        "E-mail: " + d.get("email") + "\n" +
        "Telefon: " + (d.get("telefon") || "-") + "\n" +
        "Grupa: " + d.get("grupa") + "\n\n" +
        d.get("wiadomosc");

      var adres = form.dataset.mailto || "kontakt@pawlowicebears.pl";
      window.location.href =
        "mailto:" + adres +
        "?subject=" + encodeURIComponent("Zapytanie ze strony – grupa " + d.get("grupa")) +
        "&body=" + encodeURIComponent(tresc);

      if (note) {
        note.hidden = false;
        note.textContent = "Otwieramy Twój program pocztowy z gotową wiadomością. Jeśli nic się nie stało, napisz bezpośrednio na " + adres + ".";
      }
    });
  }

  /* --- Rok w stopce ---------------------------------------------- */
  function initYear() {
    document.querySelectorAll("[data-rok]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  function init() {
    initTheme();
    initNav();
    initFilters();
    initLightbox();
    initForm();
    initYear();
  }

  window.Bears = { init: init, setTheme: setTheme };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
