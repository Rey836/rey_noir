
gsap.registerPlugin(ScrollTrigger, TextPlugin);

   //SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const href = anchor.getAttribute("href");
    if (!href || href === "#") return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
    // Close mobile menu if open
    closeMobileMenu();
  });
});

   //CURSOR
const cursor = document.getElementById("cursor");
const cursorFollower = document.getElementById("cursorFollower");

if (cursor && cursorFollower) {
  let mouseX = 0,
    mouseY = 0;
  let followerX = 0,
    followerY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.1, ease: "none" });
  });

  (function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    gsap.set(cursorFollower, { x: followerX, y: followerY });
    requestAnimationFrame(animateFollower);
  })();

  document
    .querySelectorAll("a, button, .skill-card, .project-card, .filter-btn")
    .forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("hovering");
        cursorFollower.classList.add("hovering");
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("hovering");
        cursorFollower.classList.remove("hovering");
      });
    });
}

   //MAGNETIC BUTTONS
document.querySelectorAll(".magnetic").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.4,
      ease: "power2.out",
    });
  });
  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
  });
});

   //MOBILE MENU
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const mobileOverlay = document.getElementById("mobileOverlay");

function openMobileMenu() {
  hamburger.classList.add("open");
  mobileMenu.classList.add("open");
  mobileOverlay.classList.add("visible");
  document.body.style.overflow = "hidden";

  // Stagger menu items
  gsap.fromTo(
    ".mobile-nav-link",
    { x: 30, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.07,
      ease: "power3.out",
      delay: 0.2,
    },
  );
}

function closeMobileMenu() {
  hamburger.classList.remove("open");
  mobileMenu.classList.remove("open");
  mobileOverlay.classList.remove("visible");
  document.body.style.overflow = "";
}

hamburger?.addEventListener("click", () => {
  if (mobileMenu.classList.contains("open")) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});

mobileOverlay?.addEventListener("click", closeMobileMenu);

document.querySelectorAll(".mobile-nav-link").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

   //ACTIVE NAV LINK ON SCROLL
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link[data-section]");

function updateActiveNav() {
  const scrollY = window.scrollY;
  sections.forEach((section) => {
    const top = section.offsetTop - 200;
    const bottom = top + section.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      const id = section.getAttribute("id");
      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("data-section") === id,
        );
      });
    }
  });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });

   //PAGE LOAD ANIMATION
const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

// Initial page reveal
tl.fromTo("body", { opacity: 0 }, { opacity: 1, duration: 0.4 })
  .fromTo(
    ".sidebar",
    { x: -30, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
    0.2,
  )
  .fromTo(
    ".hero-badge",
    { y: 10, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6 },
    0.4,
  )
  .to(
    ".title-reveal",
    {
      y: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "power4.out",
    },
    0.5,
  )
  .fromTo(
    ".hero-description",
    { y: 16, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7 },
    0.9,
  )
  .fromTo(
    ".hero-cta",
    { y: 16, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7 },
    1.0,
  )
  .fromTo(
    ".hero-stats",
    { y: 16, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7 },
    1.1,
  )
  .fromTo(
    ".hero-visual",
    { scale: 0.9, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.0, ease: "power3.out" },
    0.6,
  )
  .fromTo(
    ".scroll-indicator",
    { opacity: 0 },
    { opacity: 1, duration: 0.8 },
    1.4,
  );

   //STAT COUNTER ANIMATION
const statNumbers = document.querySelectorAll(".stat-number[data-count]");

ScrollTrigger.create({
  trigger: ".hero-stats",
  start: "top 80%",
  onEnter: () => {
    statNumbers.forEach((el) => {
      const target = parseInt(el.dataset.count, 10);
      gsap.to(
        { val: 0 },
        {
          val: target,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: function () {
            el.textContent = Math.round(this.targets()[0].val);
          },
          onComplete: () => {
            el.textContent = target + (el === statNumbers[0] ? "+" : "+");
          },
        },
      );
    });
  },
  once: true,
});

   //SCROLL TRIGGER ANIMATIONS

// Section headers
gsap.utils.toArray(".section-header").forEach((el) => {
  gsap.fromTo(
    el,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 82%",
        toggleActions: "play none none none",
      },
    },
  );
});

// About section
gsap.fromTo(
  ".about-card",
  { y: 50, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 75%",
      toggleActions: "play none none none",
    },
  },
);

gsap.fromTo(
  ".about-side > *",
  { y: 40, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 70%",
      toggleActions: "play none none none",
    },
  },
);

// Skill cards
gsap.utils.toArray(".skill-card").forEach((card, i) => {
  gsap.fromTo(
    card,
    { y: 50, opacity: 0, scale: 0.95 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      delay: (i % 3) * 0.1,
    },
  );

  // Skill bar animation
  const fill = card.querySelector(".skill-fill");
  if (fill) {
    const width = fill.dataset.width + "%";
    ScrollTrigger.create({
      trigger: card,
      start: "top 80%",
      onEnter: () =>
        gsap.to(fill, { width, duration: 1.2, ease: "power3.out", delay: 0.3 }),
      once: true,
    });
  }
});

// Project cards
gsap.utils.toArray(".project-card").forEach((card, i) => {
  gsap.fromTo(
    card,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 88%",
        toggleActions: "play none none none",
      },
      delay: (i % 2) * 0.1,
    },
  );
});

// Contact section
gsap.fromTo(
  ".contact-info",
  { x: -40, opacity: 0 },
  {
    x: 0,
    opacity: 1,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".contact-section",
      start: "top 75%",
      toggleActions: "play none none none",
    },
  },
);

gsap.fromTo(
  ".contact-form",
  { x: 40, opacity: 0 },
  {
    x: 0,
    opacity: 1,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".contact-section",
      start: "top 75%",
      toggleActions: "play none none none",
    },
  },
);

// Footer
gsap.fromTo(
  ".footer-content > *",
  { y: 20, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    stagger: 0.1,
    duration: 0.6,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".footer",
      start: "top 90%",
      toggleActions: "play none none none",
    },
  },
);

   //PROJECT FILTER
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    projectCards.forEach((card) => {
      const category = card.dataset.category;
      const show = filter === "all" || category === filter;

      if (show) {
        gsap.to(card, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        });
        card.style.display = "block";
        card.classList.remove("hidden");
      } else {
        gsap.to(card, {
          opacity: 0,
          scale: 0.95,
          y: 10,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            card.classList.add("hidden");
          },
        });
      }
    });
  });
});

   //CONTACT FORM 
const contactForm = document.getElementById("contactForm");

contactForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  const spanEl = btn.querySelector("span");
  const originalText = spanEl.textContent;

  btn.disabled = true;
  spanEl.textContent = "Sending…";
  gsap.to(btn, { scale: 0.97, duration: 0.1 });

  const data = {
    name: document.getElementById("nameInput")?.value.trim(),
    email: document.getElementById("emailInput")?.value.trim(),
    subject: document.getElementById("subjectInput")?.value.trim(),
    message: document.getElementById("messageInput")?.value.trim(),
  };

  try {
    const res = await fetch("http://localhost:8000/backend/contact/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();

    if (res.ok) {
      gsap.to(btn, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });
      spanEl.textContent = "Message Sent!";
      btn.style.background = "#4ade80";
      btn.style.color = "#000";
      contactForm.reset();
      setTimeout(() => {
        spanEl.textContent = originalText;
        btn.style.background = "";
        btn.style.color = "";
        btn.disabled = false;
      }, 3000);
    } else {
      throw new Error(json.error || "Failed to send");
    }
  } catch (err) {
    gsap.to(btn, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });
    spanEl.textContent = "Failed — Try Again";
    btn.style.background = "#ef4444";
    btn.style.color = "#fff";
    setTimeout(() => {
      spanEl.textContent = originalText;
      btn.style.background = "";
      btn.style.color = "";
      btn.disabled = false;
    }, 3000);
  }
});

   //HERO VISUAL PARALLAX
window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  gsap.to(".hero-avatar-wrap", {
    x: x * 0.5,
    y: y * 0.5,
    duration: 1,
    ease: "power2.out",
  });
  gsap.to(".float-icon", {
    x: x * -0.3,
    y: y * -0.3,
    duration: 1.5,
    ease: "power2.out",
    stagger: 0.02,
  });
  gsap.to(".glow-1", {
    x: x * 0.8,
    y: y * 0.8,
    duration: 2,
    ease: "power2.out",
  });
  gsap.to(".glow-2", {
    x: x * -0.5,
    y: y * -0.5,
    duration: 2,
    ease: "power2.out",
  });
});

   //MOBILE HEADER SCROLL EFFECT
let lastScrollY = 0;
const mobileHeader = document.getElementById("mobileHeader");

window.addEventListener(
  "scroll",
  () => {
    const currentScrollY = window.scrollY;
    if (mobileHeader) {
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        gsap.to(mobileHeader, { y: -60, duration: 0.3, ease: "power2.in" });
      } else {
        gsap.to(mobileHeader, { y: 0, duration: 0.3, ease: "power2.out" });
      }
    }
    lastScrollY = currentScrollY;
  },
  { passive: true },
);

   //PROJECT CARD HOVER — subtle tilt
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateY: x * 4,
      rotateX: -y * 4,
      transformPerspective: 800,
      ease: "power2.out",
      duration: 0.4,
    });
  });
  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  });
});

   //REFRESHED SCROLLTRIGGER ON LOAD
  
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
  loadGithubRepos();
});


   //GITHUB REPOS — auto-load from Rey836
const LANG_COLORS = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Python: "#3776ab",
  Go: "#00add8",
  Rust: "#dea584",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Vue: "#41b883",
  Shell: "#89e051",
  Ruby: "#701516",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  PHP: "#4f5d95",
  Swift: "#ffac45",
  Kotlin: "#a97bff",
};

function buildRepoCard(repo, index) {
  const lang = repo.language || "Code";
  const langColor = LANG_COLORS[lang] || "#888";
  const desc = repo.description
    ? repo.description.length > 90
      ? repo.description.slice(0, 90) + "…"
      : repo.description
    : "No description provided.";
  const stars = repo.stargazers_count || 0;
  const forks = repo.forks_count || 0;
  const updated = repo.updated_at
    ? new Date(repo.updated_at).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "";

  const bgIndex = (index % 4) + 1;

  return `
    <div class="project-card glass-card" data-category="github" style="opacity:0; transform:translateY(40px)">
      <div class="project-visual pv-${bgIndex}">
        <div class="project-glow"></div>
        <div class="project-label">${String(index + 1).padStart(2, "0")}</div>
        <div class="repo-lang-badge" style="background:${langColor}22; border-color:${langColor}44; color:${langColor}">
          <span class="repo-lang-dot" style="background:${langColor}"></span>${lang}
        </div>
      </div>
      <div class="project-info">
        <div class="project-meta">
          <span class="project-tag">GitHub</span>
          <span class="project-year">${updated}</span>
        </div>
        <h3>${repo.name.replace(/-/g, " ").replace(/_/g, " ")}</h3>
        <p>${desc}</p>
        <div class="repo-stats">
          <span class="repo-stat">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.4 8.162L12 18.896l-7.334 3.858 1.4-8.162L.132 9.21l8.2-1.192z"/></svg>
            ${stars}
          </span>
          <span class="repo-stat">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"/><line x1="12" y1="12" x2="12" y2="15"/></svg>
            ${forks}
          </span>
        </div>
        <div class="project-links">
          <a href="${repo.html_url}" target="_blank" rel="noopener" class="project-link">
            GitHub
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
          </a>
          ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noopener" class="project-link">Live <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg></a>` : ""}
        </div>
      </div>
    </div>`;
}

async function loadGithubRepos() {
  const grid = document.querySelector(".projects-grid");
  if (!grid) return;

  // Add GitHub filter button if not already there
  const filters = document.querySelector(".project-filters");
  if (filters && !filters.querySelector('[data-filter="github"]')) {
    const btn = document.createElement("button");
    btn.className = "filter-btn";
    btn.dataset.filter = "github";
    btn.textContent = "GitHub";
    filters.appendChild(btn);
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      filterProjects("github");
    });
  }

  // Loading skeleton
  const loadingEl = document.createElement("div");
  loadingEl.className = "github-loading";
  loadingEl.innerHTML = `<span class="github-loading-dot"></span><span>Loading repos from GitHub…</span>`;
  grid.after(loadingEl);

  try {
    const res = await fetch("http://localhost:8000/backend/github/repos/");
    const json = await res.json();
    loadingEl.remove();

    if (!res.ok || !json.repos?.length) {
      return;
    }

    // Remove existing github cards if any
    grid
      .querySelectorAll('[data-category="github"]')
      .forEach((c) => c.remove());

    // Add new repo cards
    json.repos
      .filter((r) => !r.fork)
      .slice(0, 8)
      .forEach((repo, i) => {
        grid.insertAdjacentHTML("beforeend", buildRepoCard(repo, i));
      });

    // Animate newly added cards
    const newCards = grid.querySelectorAll('[data-category="github"]');
    newCards.forEach((card, i) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: i * 0.08,
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      // Re-attach hover tilt
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotateY: x * 4,
          rotateX: -y * 4,
          transformPerspective: 800,
          ease: "power2.out",
          duration: 0.4,
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        });
      });
    });

    ScrollTrigger.refresh();
  } catch (err) {
    loadingEl.remove();
    console.warn("Could not load GitHub repos:", err);
  }
}

function filterProjects(filter) {
  document.querySelectorAll(".project-card").forEach((card) => {
    const cat = card.dataset.category;
    const show = filter === "all" || cat === filter;
    if (show) {
      card.classList.remove("hidden");
      gsap.to(card, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(card, {
        opacity: 0,
        scale: 0.95,
        y: 10,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => card.classList.add("hidden"),
      });
    }
  });
}
