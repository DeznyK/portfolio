/* =========================================================

   This file does two small things:
     1. Fades each section in as you scroll down to it.
     2. Highlights the nav link of the section you are viewing.

   Both use something called an IntersectionObserver, which is
   a built-in browser tool that tells us when an element enters
   or leaves the visible part of the screen.
   ========================================================= */


/* ---------------------------------------------------------
   SETTINGS (edit these here, just like the CSS control panel)
   --------------------------------------------------------- */
const SETTINGS = {
  // How much of a section must be visible before it fades in.
  // 0.15 means 15% of it.
  revealThreshold: 0.15,

  // Which part of the screen counts as "where you are reading".
  // This shrinks the detection area to a thin band near the middle.
  activeLinkZone: "-40% 0px -55% 0px"
};


/* ---------------------------------------------------------
   Wait until the page has finished loading before running,
   so that all the sections and links exist.
   --------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {

  // Find every <section> inside <main> that has an id
  const sections = document.querySelectorAll("main section[id]");

  // Find every link inside the navigation menu
  const navLinks = document.querySelectorAll(".nav-links a");


  /* -------------------------------------------------------
     FEATURE 1: Fade sections in as they scroll into view
     ------------------------------------------------------- */
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Add the "visible" class; the CSS (B14) does the animation
        entry.target.classList.add("visible");

        // Stop watching this section, since it only needs to appear once
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: SETTINGS.revealThreshold });

  sections.forEach(function (section) {
    // We add the "reveal" class here, NOT in the HTML.
    // That way, if JavaScript ever fails, the content stays visible.
    section.classList.add("reveal");
    revealObserver.observe(section);
  });


  /* -------------------------------------------------------
     FEATURE 2: Highlight the nav link for the current section
     ------------------------------------------------------- */
  const navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // The link for this section looks like "#projects"
        const matchingHref = "#" + entry.target.id;

        navLinks.forEach(function (link) {
          // toggle(name, true) adds the class, toggle(name, false) removes it
          link.classList.toggle("active", link.getAttribute("href") === matchingHref);
        });
      }
    });
  }, { rootMargin: SETTINGS.activeLinkZone });

  sections.forEach(function (section) {
    navObserver.observe(section);
  });

});