/* ==========================================================================
   SCRIPT.JS
   ----------------------------------------------------------------------
   1. Renderização de conteúdo (a partir de config.js)
   2. Rede de partículas conectadas (fundo ambiente + intro)
   3. Feixe de varredura LiDAR
   4. Scroll reveal (IntersectionObserver)
   5. Navegação (scroll state + menu mobile)
   ========================================================================== */

(() => {
  "use strict";

  const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------
     ÍCONES — símbolos de linha simples e monocromáticos para contato
  ------------------------------------------------------------------ */
  const ICONS = {
    Discord: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="4" y="7" width="16" height="11" rx="4"/><circle cx="9" cy="12.5" r="1.1" fill="currentColor" stroke="none"/><circle cx="15" cy="12.5" r="1.1" fill="currentColor" stroke="none"/><path d="M8 7L9 4h6l1 3"/></svg>`,
    WhatsApp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M6 18l-1.5 3L8 19.6A8 8 0 1 0 5 12"/><path d="M9 9.5c0 3.5 2.7 6 6 6"/></svg>`,
    Instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.4"/><circle cx="16.6" cy="7.4" r=".6" fill="currentColor" stroke="none"/></svg>`,
    Email: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M4 7l8 6 8-6"/></svg>`,
  };

  /* ------------------------------------------------------------------
     1. RENDERIZAÇÃO DE CONTEÚDO
  ------------------------------------------------------------------ */
  function applySEO() {
    const { seo } = SITE_CONFIG.identidade;
    document.title = seo.titulo;
    setMeta('meta[name="description"]', seo.descricao);
    setMeta('meta[name="keywords"]', seo.palavrasChave);
    setMeta('meta[property="og:title"]', seo.titulo);
    setMeta('meta[property="og:description"]', seo.descricao);
  }
  function setMeta(selector, content) {
    const el = document.querySelector(selector);
    if (el) el.setAttribute("content", content);
  }

  function renderHero() {
    const h = SITE_CONFIG.hero;
    if (!document.getElementById("hero-eyebrow")) return;
    document.getElementById("hero-eyebrow").textContent = h.eyebrow;
    document.getElementById("hero-title").textContent = h.titulo;
    document.getElementById("hero-subtitle").textContent = h.subtitulo;

    const p = document.getElementById("hero-btn-primary");
    p.textContent = h.botaoPrimario.texto;
    p.href = h.botaoPrimario.href;

    const s = document.getElementById("hero-btn-secondary");
    s.textContent = h.botaoSecundario.texto;
    s.href = h.botaoSecundario.href;

    renderCommissionBadge();
  }

  function renderCommissionBadge() {
    const badge = document.getElementById("commission-badge");
    const c = SITE_CONFIG.comissoes;
    if (!badge || !c) return;

    badge.classList.toggle("commission-open", !!c.abertas);
    badge.classList.toggle("commission-closed", !c.abertas);

    const slotsTxt = c.abertas
      ? ` · ${c.slotsDisponiveis} ${c.slotsDisponiveis === 1 ? "SLOT DISPONÍVEL" : "SLOTS DISPONÍVEIS"}`
      : "";

    badge.innerHTML = `
      <span class="commission-dot"></span>
      <span>${c.abertas ? c.mensagemAbertas : c.mensagemFechadas}${slotsTxt}</span>
    `;
  }

  function renderServices() {
    const grid = document.getElementById("services-grid");
    if (!grid) return;
    grid.innerHTML = SITE_CONFIG.servicos.map((s) => `
      <article class="bracket-card service-card${s.indisponivel ? " service-card-unavailable" : ""}" data-reveal>
        ${s.indisponivel ? `<div class="service-ribbon mono">${s.avisoIndisponivel || "INDISPONÍVEL"}</div>` : ""}
        <span class="service-number mono">${s.numero}</span>
        <h3>${s.titulo}</h3>
        <p class="service-desc">${s.descricao}</p>
        <ul class="service-features">
          ${s.recursos.map((r) => `<li>${r}</li>`).join("")}
        </ul>
        <div class="service-packages">
          ${s.pacotes.map((p) => `
            <div class="package-row">
              <span class="package-name">${p.nome}</span>
              <span class="package-meta">
                <span class="price">${p.preco}</span>
                <span>${p.prazo}</span>
              </span>
            </div>
          `).join("")}
        </div>
      </article>
    `).join("");
  }

  function renderPortfolio() {
    const grid = document.getElementById("portfolio-grid");
    if (!grid) return;
    grid.innerHTML = SITE_CONFIG.portfolio.map((item) => `
      <article class="bracket-card portfolio-card" data-reveal>
        <div class="portfolio-media">
          <img src="${item.icon || item.imagem}" alt="${item.titulo}" loading="lazy" />
        </div>
        <div class="portfolio-body">
          <h3>${item.titulo}</h3>
          <p>${item.descricao}</p>
          <a class="portfolio-link mono" href="${item.link}" target="_blank" rel="noopener">VER PROJETO →</a>
        </div>
      </article>
    `).join("");
  }

  function renderProcess() {
    const track = document.getElementById("process-track");
    if (!track) return;
    track.innerHTML = SITE_CONFIG.processo.map((step) => `
      <div class="process-step" data-reveal>
        <div class="process-num">${step.numero}</div>
        <h3>${step.titulo}</h3>
        <p>${step.descricao}</p>
      </div>
    `).join("");
  }

  function renderContact() {
    const c = SITE_CONFIG.contato;
    if (!document.getElementById("contact-grid")) return;
    document.getElementById("contact-eyebrow").textContent = c.eyebrow;
    document.getElementById("contact-title").textContent = c.titulo;
    document.getElementById("contact-subtitle").textContent = c.subtitulo;

    const grid = document.getElementById("contact-grid");
    grid.innerHTML = c.links.map((l) => `
      <a class="contact-item contact-item-single" data-reveal href="${l.href}" target="_blank" rel="noopener">
        <span class="contact-icon">
          ${l.icon ? `<img src="${l.icon}" alt="${l.tipo}" />` : (ICONS[l.tipo] || "")}
        </span>
        <div class="contact-type">${l.tipo}</div>
        <div class="contact-value mono">${l.valor}</div>
      </a>
    `).join("");
  }

  function renderFooter() {
    const el = document.getElementById("footer-text");
    if (!el) return;
    el.textContent = `© ${new Date().getFullYear()} ${SITE_CONFIG.footer.texto}`;
  }

  function renderRecentWorks() {
    const grid = document.getElementById("recent-works-grid");
    if (!grid || !SITE_CONFIG.trabalhosRecentes) return;
    grid.innerHTML = SITE_CONFIG.trabalhosRecentes.map((item) => `
      <a class="bracket-card recent-work-card" data-reveal href="${item.link}" target="_blank" rel="noopener">
        <div class="recent-work-media">
          <img src="${item.imagem}" alt="${item.titulo}" loading="lazy" />
        </div>
        <div class="recent-work-body">
          <h3>${item.titulo}</h3>
        </div>
      </a>
    `).join("");
  }

  // Itens da Fila com status "finalizado" saem da Fila e viram cards
  // automáticos em Histórico de Clientes — não precisam ser duplicados em
  // SITE_CONFIG.historico.clientes.
  function getFinalizedFilaItems() {
    const f = SITE_CONFIG.fila;
    if (!f) return [];
    const music = (f.musicProjects || [])
      .filter((p) => p.status === "finalizado")
      .map((p) => ({
        cliente: p.titulo,
        tipo: "musica",
        titulo: "Produção Musical",
        link: p.link || null,
        icon: p.icon || "spotify-white-icon.webp",
      }));
    const video = (f.videoProjects || [])
      .filter((p) => p.status === "finalizado")
      .map((p) => ({
        cliente: p.titulo,
        tipo: "video",
        titulo: "Edição de Vídeo",
        link: p.link || null,
        icon: p.icon || "youtube-app-white-icon.webp",
      }));
    return [...music, ...video];
  }

  function renderFila() {
    const f = SITE_CONFIG.fila;
    const musicList = document.getElementById("fila-music");
    if (!f || !musicList) return;

    document.getElementById("fila-eyebrow").textContent = f.eyebrow;
    document.getElementById("fila-title").textContent = f.titulo;
    document.getElementById("fila-subtitle").textContent = f.subtitulo;

    // Itens finalizados não aparecem mais na Fila — foram para o Histórico.
    musicList.innerHTML = f.musicProjects.filter((p) => p.status !== "finalizado").map((p) => {
      // Converte "em producao" para "em_producao" para bater com o CSS
      const statusClass = p.status.replace(/\s+/g, '_').toLowerCase();
      return `
      <div class="fila-item fila-status-${statusClass}" data-reveal>
        <div class="fila-item-name">${p.titulo}</div>
        <div class="fila-item-status mono">${p.status.replace(/_/g, ' ').toUpperCase()}</div>
      </div>
    `}).join("");

    const videoList = document.getElementById("fila-video");
    videoList.innerHTML = f.videoProjects.filter((p) => p.status !== "finalizado").map((p) => {
      const statusClass = p.status.replace(/\s+/g, '_').toLowerCase();
      return `
      <div class="fila-item fila-status-${statusClass}" data-reveal>
        <div class="fila-item-name">${p.titulo}</div>
        <div class="fila-item-status mono">${p.status.replace(/_/g, ' ').toUpperCase()}</div>
      </div>
    `}).join("");
  }

  function renderTermos() {
    const grid = document.getElementById("termos-list");
    if (!grid || !SITE_CONFIG.termos) return;
    const t = SITE_CONFIG.termos;

    document.getElementById("termos-eyebrow").textContent = t.eyebrow;
    document.getElementById("termos-title").textContent = t.titulo;
    document.getElementById("termos-subtitle").textContent = t.subtitulo;

    grid.innerHTML = t.clausulas.map((c) => `
      <article class="bracket-card termos-item" data-reveal>
        <span class="termos-number mono">${c.numero}</span>
        <h3>${c.titulo}</h3>
        <p>${c.texto}</p>
      </article>
    `).join("");
  }

  function renderHistorico() {
    const grid = document.getElementById("client-history-grid");
    if (!grid || !SITE_CONFIG.historico) return;
    const h = SITE_CONFIG.historico;

    document.getElementById("historico-eyebrow").textContent = h.eyebrow;
    document.getElementById("historico-title").textContent = h.titulo;
    document.getElementById("historico-subtitle").textContent = h.subtitulo;

    const itens = [...getFinalizedFilaItems(), ...h.clientes];

    grid.innerHTML = itens.map((c) => {
      const label = h.tipoLabels[c.tipo] || c.tipo;
      const tag = c.link ? "a" : "div";
      const attrs = c.link ? `href="${c.link}" target="_blank" rel="noopener"` : "";
      const reveal = c.tipo === "render"
        ? `<div class="client-card-reveal"><img src="${c.imagem}" alt="${c.titulo}" loading="lazy" /></div>`
        : `<div class="client-card-reveal">
             <span class="client-card-icon"><img src="${c.icon}" alt="" /></span>
             <span class="client-card-cta mono">${c.link ? `VER ${label.toUpperCase()} →` : label.toUpperCase()}</span>
           </div>`;
      return `
        <${tag} class="bracket-card client-card client-card-${c.tipo}" ${attrs} data-reveal>
          <div class="client-card-face">
            <span class="client-card-badge mono">${label}</span>
            <h3>${c.cliente}</h3>
            <p>${c.titulo}</p>
          </div>
          ${reveal}
        </${tag}>
      `;
    }).join("");
  }

  function renderAll() {
    applySEO();
    renderHero();
    renderServices();
    renderPortfolio();
    renderRecentWorks();
    renderProcess();
    renderFila();
    renderContact();
    renderFooter();
    renderTermos();
    renderHistorico();
  }

  /* ------------------------------------------------------------------
     2. REDE DE PARTÍCULAS (fundo ambiente + intro)
     Pontos conectados por linhas finas que se movem lentamente,
     como um scanner construindo um mapa do ambiente.
  ------------------------------------------------------------------ */
  class ParticleField {
    constructor(canvas, opts = {}) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.opts = Object.assign({
        density: 18000,      // px² por partícula (menor = mais partículas)
        maxLinkDist: 130,
        speed: 0.12,
        pointColor: "255,255,255",
        reactToMouse: true,
        formIn: false,       // se true, partículas nascem no centro e se espalham (efeito intro)
      }, opts);

      this.mouse = { x: -9999, y: -9999 };
      this.points = [];
      this._resize = this._resize.bind(this);
      this._onMove = this._onMove.bind(this);
      this._tick = this._tick.bind(this);

      window.addEventListener("resize", this._resize);
      if (this.opts.reactToMouse) {
        window.addEventListener("mousemove", this._onMove);
      }
      this._resize();
      if (!REDUCED_MOTION) {
        this.raf = requestAnimationFrame(this._tick);
      } else {
        this._drawStatic();
      }
    }

    _resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.w = this.canvas.clientWidth || window.innerWidth;
      this.h = this.canvas.clientHeight || window.innerHeight;
      this.canvas.width = this.w * dpr;
      this.canvas.height = this.h * dpr;
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(30, Math.floor((this.w * this.h) / this.opts.density));
      this.points = new Array(count).fill(0).map(() => this._makePoint());
    }

    _makePoint() {
      const angle = Math.random() * Math.PI * 2;
      const sp = this.opts.speed;
      return {
        x: this.opts.formIn ? this.w / 2 : Math.random() * this.w,
        y: this.opts.formIn ? this.h / 2 : Math.random() * this.h,
        tx: Math.random() * this.w,
        ty: Math.random() * this.h,
        vx: Math.cos(angle) * sp,
        vy: Math.sin(angle) * sp,
        r: Math.random() * 1.4 + 0.6,
        pulse: Math.random() * Math.PI * 2,
      };
    }

    _onMove(e) {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    }

    _drawStatic() {
      // Versão sem animação para prefers-reduced-motion: desenha um único frame estático
      const { ctx } = this;
      ctx.clearRect(0, 0, this.w, this.h);
      ctx.fillStyle = `rgba(${this.opts.pointColor},0.5)`;
      this.points.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    _tick(t) {
      const { ctx, points } = this;
      ctx.clearRect(0, 0, this.w, this.h);

      // movimento
      points.forEach((p) => {
        if (this.opts.formIn) {
          p.x += (p.tx - p.x) * 0.02;
          p.y += (p.ty - p.y) * 0.02;
        } else {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -20) p.x = this.w + 20;
          if (p.x > this.w + 20) p.x = -20;
          if (p.y < -20) p.y = this.h + 20;
          if (p.y > this.h + 20) p.y = -20;
        }

        // leve repulsão do cursor
        if (this.opts.reactToMouse) {
          const dx = p.x - this.mouse.x;
          const dy = p.y - this.mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 14400) {
            const d = Math.sqrt(d2) || 1;
            const f = (120 - d) / 120;
            p.x += (dx / d) * f * 1.4;
            p.y += (dy / d) * f * 1.4;
          }
        }
      });

      // conexões
      const maxD = this.opts.maxLinkDist;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i], b = points[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxD) {
            const alpha = (1 - dist / maxD) * 0.22;
            ctx.strokeStyle = `rgba(${this.opts.pointColor},${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // pontos
      points.forEach((p) => {
        p.pulse += 0.02;
        const glow = 0.5 + Math.sin(p.pulse) * 0.3;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${this.opts.pointColor},${glow})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      this.raf = requestAnimationFrame(this._tick);
    }

    destroy() {
      cancelAnimationFrame(this.raf);
      window.removeEventListener("resize", this._resize);
      window.removeEventListener("mousemove", this._onMove);
    }
  }

  /* ------------------------------------------------------------------
     3. FEIXE DE VARREDURA LIDAR
     Atravessa a tela ocasionalmente, como se o site estivesse
     sendo escaneado em tempo real.
  ------------------------------------------------------------------ */
  function initScanBeam() {
    const beam = document.getElementById("scan-beam");
    if (!beam || REDUCED_MOTION) return;

    function sweep() {
      beam.style.transition = "none";
      beam.style.transform = "translateX(0)";
      beam.style.opacity = "0";

      requestAnimationFrame(() => {
        beam.style.transition = "transform 2.6s cubic-bezier(.4,0,.2,1), opacity 2.6s ease";
        beam.style.opacity = "1";
        beam.style.transform = `translateX(${window.innerWidth * 1.3}px)`;
      });

      setTimeout(() => { beam.style.opacity = "0"; }, 2600);
    }

    sweep();
    setInterval(sweep, 7000 + Math.random() * 4000);
  }

  /* ------------------------------------------------------------------
     4. SCROLL REVEAL
  ------------------------------------------------------------------ */
  function initReveal() {
    const targets = document.querySelectorAll("[data-reveal]");
    if (REDUCED_MOTION || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("visible"));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

    targets.forEach((el) => obs.observe(el));
  }

  /* Reobserva elementos criados dinamicamente (grids) após a renderização */
  function initGridReveal() {
    const targets = document.querySelectorAll(
      ".services-grid [data-reveal], .portfolio-grid [data-reveal], .process-track [data-reveal], .contact-grid [data-reveal], .termos-list [data-reveal], .client-history-grid [data-reveal]"
    );
    if (REDUCED_MOTION || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("visible"));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("visible"), i * 60);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    targets.forEach((el) => obs.observe(el));
  }

  /* ------------------------------------------------------------------
     5. NAVEGAÇÃO
  ------------------------------------------------------------------ */
  function initNav() {
    const nav = document.getElementById("nav");
    const toggle = document.getElementById("nav-toggle");
    const links = document.getElementById("nav-links");

    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 40);
    }, { passive: true });

    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });

    links.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ------------------------------------------------------------------
     6. INTRO — scanner formando a rede antes da interface principal
  ------------------------------------------------------------------ */
  function initIntro() {
    const intro = document.getElementById("intro");
    const canvas = document.getElementById("intro-canvas");
    const label = document.getElementById("intro-text");

    if (REDUCED_MOTION) {
      intro.classList.add("hide");
      setTimeout(() => intro.remove(), 300);
      return;
    }

    const field = new ParticleField(canvas, {
      density: 9000,
      maxLinkDist: 150,
      speed: 0.05,
      formIn: true,
      reactToMouse: false,
    });

    const messages = ["INICIALIZANDO SCANNER", "MAPEANDO PONTOS", "REDE ESTABELECIDA"];
    let i = 0;
    const msgInterval = setInterval(() => {
      i = (i + 1) % messages.length;
      label.textContent = messages[i];
    }, 650);

    setTimeout(() => {
      clearInterval(msgInterval);
      intro.classList.add("hide");
      setTimeout(() => {
        field.destroy();
        intro.remove();
      }, 850);
    }, 2000);
  }

  /* ------------------------------------------------------------------
     INICIALIZAÇÃO
  ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    renderAll();
    initNav();
    initReveal();
    initGridReveal();
    initScanBeam();
    initIntro();

    new ParticleField(document.getElementById("bg-canvas"), {
      density: 22000,
      maxLinkDist: 130,
      speed: 0.12,
      reactToMouse: true,
    });
  });
})();
