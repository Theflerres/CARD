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

    const total = Math.max(0, c.totalSlots || 0);
    const ocupados = Math.min(total, Math.max(0, c.slotsOcupados || 0));
    const disponiveis = total - ocupados;
    const lotado = c.abertas && disponiveis === 0;
    const aberto = c.abertas && !lotado;

    badge.classList.toggle("commission-open", aberto);
    badge.classList.toggle("commission-closed", !aberto);

    const mensagem = aberto ? c.mensagemAbertas : (lotado ? c.mensagemLotadas : c.mensagemFechadas);
    const slotsTxt = aberto
      ? ` · ${disponiveis} ${disponiveis === 1 ? "SLOT DISPONÍVEL" : "SLOTS DISPONÍVEIS"}`
      : "";

    badge.innerHTML = `
      <span class="commission-dot"></span>
      <span>${mensagem}${slotsTxt}</span>
    `;

    // Fileira de quadrados: um por slot (preenchido = ocupado, vazio = livre).
    // Só aparece com as comissões abertas (inclusive lotadas).
    const slots = document.getElementById("commission-slots");
    if (!slots) return;
    slots.hidden = !c.abertas || total === 0;
    slots.classList.toggle("commission-open", aberto);
    slots.classList.toggle("commission-closed", !aberto);
    slots.setAttribute("role", "img");
    slots.setAttribute("aria-label", `${ocupados} de ${total} slots ocupados`);
    slots.innerHTML = Array.from({ length: total }, (_, i) =>
      `<span class="commission-slot${i < ocupados ? " filled" : ""}"></span>`
    ).join("");
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
          <a class="portfolio-link mono" href="${item.link}" ${linkExterno(item.link) ? `target="_blank" rel="noopener"` : ""}>VER PROJETO →</a>
        </div>
      </article>
    `).join("");
  }

  function linkExterno(href) {
    return /^https?:\/\//.test(href || "");
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

  // Trabalhos Recentes: itens do Histórico com "recente: true", na ordem do
  // config (renders, clientes, Fila), limitados a historico.recentesMax.
  function renderRecentWorks() {
    const grid = document.getElementById("recent-works-grid");
    const h = SITE_CONFIG.historico;
    if (!grid || !h) return;
    const max = typeof h.recentesMax === "number" ? h.recentesMax : 4;
    const recentes = [...getRenderWorks(), ...(h.clientes || []), ...getFinalizedFilaItems()]
      .filter((t) => t.recente)
      .slice(0, max);

    // Sem nenhum recente, a seção e o link do menu somem
    const section = document.getElementById("trabalhos");
    if (section) section.hidden = recentes.length === 0;
    document.querySelectorAll('.nav-links a[href="#trabalhos"]').forEach((a) => { a.hidden = recentes.length === 0; });

    grid.innerHTML = recentes.map((t) => {
      // Render: amplia (ou aviso de sigilo). Vídeo/música: abre o link.
      let tag = "div";
      let attrs = "";
      if (t.tipo === "render") {
        attrs = `role="button" tabindex="0" ${abrirAttrs(t, t.cliente)}`;
      } else if (t.link) {
        tag = "a";
        attrs = `href="${t.link}" target="_blank" rel="noopener"`;
      }
      const media = t.imagem
        ? `<img src="${t.imagem}" alt="${t.sigilo ? "" : escapeAttr(t.titulo)}" loading="lazy" />${t.sigilo ? SIGILO_TAG : ""}`
        : `<img class="recent-work-icon" src="${t.icon}" alt="" loading="lazy" />`;
      return `
      <${tag} class="bracket-card recent-work-card${t.sigilo ? " client-sigilo" : ""}" data-reveal ${attrs}>
        <div class="recent-work-media${t.imagem ? "" : " recent-work-media-icon"}">
          ${media}
        </div>
        <div class="recent-work-body">
          <h3>${t.titulo}</h3>
          <p class="recent-work-client mono">${t.cliente}</p>
        </div>
      </${tag}>
    `}).join("");
  }

  // Itens da Fila com status "finalizado" saem da Fila e viram cards
  // automáticos em Histórico de Clientes — não precisam ser duplicados em
  // SITE_CONFIG.historico.clientes. "recente", "imagem", "link" e "icon"
  // são repassados se informados no item da Fila.
  function getFinalizedFilaItems() {
    const f = SITE_CONFIG.fila;
    if (!f) return [];
    const doItem = (p, tipo, titulo, iconPadrao) => ({
      cliente: p.titulo,
      tipo,
      titulo,
      link: p.link || null,
      icon: p.icon || iconPadrao,
      imagem: p.imagem || null,
      recente: !!p.recente,
    });
    const music = (f.musicProjects || [])
      .filter((p) => p.status === "finalizado")
      .map((p) => doItem(p, "musica", "Produção Musical", "spotify-white-icon.webp"));
    const video = (f.videoProjects || [])
      .filter((p) => p.status === "finalizado")
      .map((p) => doItem(p, "video", "Edição de Vídeo", "youtube-app-white-icon.webp"));
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

    const itens = [...getRenderItems(), ...getFinalizedFilaItems(), ...h.clientes];

    grid.innerHTML = itens.map((c, i) => {
      const label = h.tipoLabels[c.tipo] || c.tipo;

      // Cliente com vários renders: capa em mosaico (até 4 renders, levemente
      // borrados) + painel que expande com cada trabalho
      if (c.trabalhos) {
        const n = c.trabalhos.length;
        const capa = c.trabalhos.slice(0, 4);
        return `
          <div class="bracket-card client-card client-card-render client-card-group" data-categoria="render" data-grupo="${i}" role="button" tabindex="0" aria-expanded="false" data-reveal>
            <div class="client-group-mosaic client-group-mosaic-${capa.length}" aria-hidden="true">
              ${capa.map((t) => `<span class="client-group-mosaic-cell"><img src="${t.imagem}" alt="" loading="lazy" /></span>`).join("")}
            </div>
            ${c.trabalhos.some((t) => t.recente) ? NOVO_TAG : ""}
            <div class="client-card-face client-group-face">
              <span class="client-card-badge mono">${label}</span>
              <h3>${c.cliente}</h3>
              <p>${n} trabalhos <span class="client-group-more mono">VER +</span></p>
            </div>
          </div>
          <div class="client-group-panel visible" data-categoria="render" data-grupo-panel="${i}" hidden>
            <p class="client-group-head mono">${c.cliente} — ${n} trabalhos</p>
            <div class="client-group-works">
              ${c.trabalhos.map((t) => `
                <button type="button" class="client-group-work${t.sigilo ? " client-sigilo" : ""}" ${abrirAttrs(t, c.cliente)}>
                  <span class="client-group-work-media">
                    <img src="${t.imagem}" alt="${t.sigilo ? "" : escapeAttr(t.titulo)}" loading="lazy" />
                    ${t.sigilo ? SIGILO_TAG : ""}
                    ${t.recente ? NOVO_TAG : ""}
                  </span>
                  <span class="mono">${t.titulo}</span>
                </button>
              `).join("")}
            </div>
          </div>
        `;
      }

      let tag = "div";
      let attrs = "";
      if (c.tipo === "render") {
        attrs = `role="button" tabindex="0" ${abrirAttrs(c, c.cliente)}`;
      } else if (c.link) {
        tag = "a";
        attrs = `href="${c.link}" target="_blank" rel="noopener"`;
      }
      const reveal = c.tipo === "render"
        ? `<div class="client-card-reveal"><img src="${c.imagem}" alt="${c.sigilo ? "" : escapeAttr(c.titulo)}" loading="lazy" />${c.sigilo ? SIGILO_TAG : ""}</div>`
        : `<div class="client-card-reveal">
             ${c.imagem ? `<img class="client-card-thumb" src="${c.imagem}" alt="" loading="lazy" />` : ""}
             <span class="client-card-icon"><img src="${c.icon}" alt="" /></span>
             <span class="client-card-cta mono">${c.link ? `VER ${label.toUpperCase()} →` : label.toUpperCase()}</span>
           </div>`;
      return `
        <${tag} class="bracket-card client-card client-card-${c.tipo}${c.sigilo ? " client-sigilo" : ""}" data-categoria="${c.tipo}" ${attrs} data-reveal>
          ${c.recente ? NOVO_TAG : ""}
          <div class="client-card-face">
            <span class="client-card-badge mono">${label}</span>
            <h3>${c.cliente}</h3>
            <p>${c.titulo}</p>
          </div>
          ${reveal}
        </${tag}>
      `;
    }).join("");

    // Expande/recolhe grupos de cliente
    grid.querySelectorAll("[data-grupo]").forEach((card) => {
      card.addEventListener("click", () => {
        const panel = grid.querySelector(`[data-grupo-panel="${card.dataset.grupo}"]`);
        const open = card.getAttribute("aria-expanded") !== "true";
        card.setAttribute("aria-expanded", String(open));
        panel.hidden = !open;
      });
    });

    renderHistoricoTabs(itens);
  }

  // Abas de filtro: Render | Edição de Vídeo | Música
  function renderHistoricoTabs(itens) {
    const tabs = document.getElementById("historico-tabs");
    const grid = document.getElementById("client-history-grid");
    if (!tabs) return;
    const labels = SITE_CONFIG.historico.tipoLabels;
    const categorias = Object.keys(labels);
    // Conta trabalhos (não cards): um grupo conta cada render dele
    const contagem = (cat) => itens
      .filter((c) => c.tipo === cat)
      .reduce((n, c) => n + (c.trabalhos ? c.trabalhos.length : 1), 0);

    tabs.innerHTML = categorias.map((cat) => `
      <button type="button" class="historico-tab" role="tab" data-filtro="${cat}">
        ${labels[cat]}<span class="historico-tab-count">${contagem(cat)}</span>
      </button>
    `).join("");

    function selecionar(cat) {
      tabs.querySelectorAll(".historico-tab").forEach((b) => {
        const ativo = b.dataset.filtro === cat;
        b.classList.toggle("active", ativo);
        b.setAttribute("aria-selected", String(ativo));
      });
      grid.querySelectorAll("[data-categoria]").forEach((el) => {
        if (el.dataset.grupoPanel !== undefined) {
          el.hidden = true; // painéis de grupo sempre recolhem ao trocar de aba
        } else {
          el.hidden = el.dataset.categoria !== cat;
        }
      });
      grid.querySelectorAll("[data-grupo]").forEach((g) => g.setAttribute("aria-expanded", "false"));
    }

    tabs.addEventListener("click", (e) => {
      const btn = e.target.closest(".historico-tab");
      if (!btn) return;
      selecionar(btn.dataset.filtro);
      // Mantém a aba no endereço (historico.html#render) para links diretos
      try { history.replaceState(null, "", `#${btn.dataset.filtro}`); } catch (_) {}
    });
    // historico.html#render | #video | #musica abre direto naquela aba
    const doLink = location.hash.slice(1);
    selecionar(categorias.includes(doLink) ? doLink : categorias[0]);
  }

  // Renders da pasta assets/Blender: "Título_Cliente.ext"
  function parseRenderFilename(arquivo) {
    const base = arquivo.replace(/\.[^.]+$/, "");
    const i = base.lastIndexOf("_");
    if (i === -1) {
      console.warn(`Render sem "_Cliente" no nome: ${arquivo}`);
      return { titulo: base, cliente: "" };
    }
    return { titulo: base.slice(0, i).trim(), cliente: base.slice(i + 1).trim() };
  }

  // Lista plana de renders, na ordem do config.
  // Cada item é o nome do arquivo ou { arquivo, titulo, sigilo, recente }.
  function getRenderWorks() {
    const h = SITE_CONFIG.historico;
    return (h.renders || []).map((item) => {
      const obj = typeof item === "object" ? item : {};
      const arquivo = typeof item === "string" ? item : item.arquivo;
      const { titulo: tituloArquivo, cliente } = parseRenderFilename(arquivo);
      const sigilo = !!obj.sigilo;
      // Sob sigilo, o caminho do original nunca é montado: só a versão borrada
      const imagem = sigilo
        ? encodeURI(`${h.pastaSigilo}/${arquivo.replace(/\.[^.]+$/, "")}.jpg`)
        : encodeURI(`${h.pastaRenders}/${arquivo}`);
      return { tipo: "render", cliente, titulo: obj.titulo || tituloArquivo, imagem, sigilo, recente: !!obj.recente };
    });
  }

  // Agrupa os renders por cliente: mais de um trabalho vira grupo
  function getRenderItems() {
    const porCliente = new Map();
    getRenderWorks().forEach((t) => {
      if (!porCliente.has(t.cliente)) porCliente.set(t.cliente, []);
      porCliente.get(t.cliente).push(t);
    });
    return [...porCliente].map(([cliente, trabalhos]) => trabalhos.length > 1
      ? { tipo: "render", cliente, trabalhos }
      : trabalhos[0]);
  }

  const SIGILO_TAG = `<span class="client-sigilo-tag mono">EM SIGILO</span>`;
  const NOVO_TAG = `<span class="tag-novo mono">NOVO</span>`;

  // Clique num render: amplia a imagem ou, sob sigilo, mostra o aviso
  function abrirAttrs(t, cliente) {
    const caption = escapeAttr(`${t.titulo} — ${cliente}`);
    return t.sigilo
      ? `data-sigilo data-caption="${caption}"`
      : `data-lightbox="${t.imagem}" data-caption="${caption}"`;
  }

  function escapeAttr(str) {
    return String(str).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  }

  /* ------------------------------------------------------------------
     VISUALIZADOR DE IMAGEM (lightbox)
     Qualquer elemento com data-lightbox="caminho" abre a imagem ampliada;
     com data-sigilo, abre o aviso de sigilo no lugar da imagem.
  ------------------------------------------------------------------ */
  function initLightbox() {
    const box = document.createElement("div");
    box.className = "lightbox";
    box.hidden = true;
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.innerHTML = `
      <button type="button" class="lightbox-close mono" aria-label="Fechar">FECHAR ✕</button>
      <figure>
        <img alt="" />
        <figcaption class="mono"></figcaption>
      </figure>
      <div class="lightbox-sigilo" hidden>
        <p class="lightbox-sigilo-tag mono">EM SIGILO</p>
        <p class="lightbox-sigilo-msg"></p>
        <p class="lightbox-sigilo-caption mono"></p>
      </div>
    `;
    document.body.appendChild(box);
    const figure = box.querySelector("figure");
    const img = box.querySelector("img");
    const caption = box.querySelector("figcaption");
    const sigilo = box.querySelector(".lightbox-sigilo");

    const fechar = () => { box.hidden = true; img.removeAttribute("src"); };

    document.addEventListener("click", (e) => {
      const alvo = e.target.closest("[data-lightbox], [data-sigilo]");
      if (!alvo) return;
      const emSigilo = alvo.hasAttribute("data-sigilo");
      figure.hidden = emSigilo;
      sigilo.hidden = !emSigilo;
      if (emSigilo) {
        sigilo.querySelector(".lightbox-sigilo-msg").textContent = SITE_CONFIG.historico.mensagemSigilo;
        sigilo.querySelector(".lightbox-sigilo-caption").textContent = alvo.dataset.caption || "";
      } else {
        img.src = alvo.dataset.lightbox;
        img.alt = alvo.dataset.caption || "";
        caption.textContent = alvo.dataset.caption || "";
      }
      box.hidden = false;
    });
    box.addEventListener("click", fechar);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !box.hidden) fechar();
      // Cards com role="button" respondem a Enter/Espaço
      const el = document.activeElement;
      if ((e.key === "Enter" || e.key === " ") && el && el.getAttribute("role") === "button" && el.tagName !== "BUTTON") {
        e.preventDefault();
        el.click();
      }
    });
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
    initLightbox();
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
