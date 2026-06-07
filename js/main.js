document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  var current = window.location.pathname.split("/").pop() || "index.html";
  var currentHash = window.location.hash;
  if (!currentHash && current === "about.html") currentHash = "#mission";
  if (!currentHash && current === "working-groups.html") currentHash = "#overview";

  document.querySelectorAll(".nav a").forEach(function (link) {
    var parts = link.getAttribute("href").split("#");
    var linkPage = parts[0].split("/").pop();
    var linkHash = parts[1] ? "#" + parts[1] : "";
    var pageMatches = linkPage === current;
    var linkMatches = pageMatches && ((!linkHash && !window.location.hash) || linkHash === currentHash);

    if (linkMatches) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }

    if (pageMatches) {
      var parentGroup = link.closest(".nav-group");
      if (parentGroup) parentGroup.querySelector(".nav-parent").classList.add("active");
    }
  });

  document.querySelectorAll(".nav-parent").forEach(function (button) {
    button.addEventListener("click", function () {
      var group = button.closest(".nav-group");
      var open = group.classList.toggle("open");
      button.setAttribute("aria-expanded", String(open));
    });
  });

  document.addEventListener("click", function (event) {
    document.querySelectorAll(".nav-group.open").forEach(function (group) {
      if (!group.contains(event.target)) {
        group.classList.remove("open");
        group.querySelector(".nav-parent").setAttribute("aria-expanded", "false");
      }
    });
  });

  document.querySelectorAll("form[data-demo-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var note = form.querySelector(".form-note");
      if (note) {
        note.textContent = "This form is a placeholder and is not connected to a submission service.";
      }
    });
  });
});
