/* ==========================================================================
   CONFIG.JS
   ----------------------------------------------------------------------
   ÁREA ÚNICA DE EDIÇÃO DO SITE.
   Tudo o que aparece na página — textos, preços, links, imagens do
   portfólio e contatos — é definido aqui. Não é necessário mexer em
   index.html, style.css ou script.js para atualizar o conteúdo.

   Depois de editar este arquivo, basta salvar e atualizar a página.
   ========================================================================== */

const SITE_CONFIG = {

  /* ---------------------------------------------------------------------
     IDENTIDADE
  --------------------------------------------------------------------- */
  identidade: {
    nome: "Theflerres",
    tagline: "Produção Musical & Edição de Vídeo",
    // Usado no título da aba do navegador e em meta tags de SEO
    seo: {
      titulo: "Theflerres — Produção Musical & Edição de Vídeo",
      descricao:
        "Produção musical e edição de vídeo para projetos que precisam se destacar. Trilhas originais, mixagem, edição e finalização de vídeo.",
      palavrasChave:
        "produção musical, edição de vídeo, trilha sonora, freelancer, mixagem, masterização, motion graphics",
    },
  },

  /* ---------------------------------------------------------------------
     1. HERO
  --------------------------------------------------------------------- */
  hero: {
    eyebrow: "PRODUÇÃO MUSICAL — EDIÇÃO DE VÍDEO — ",
    titulo: "TheFlerre's Card.",
    subtitulo:
      "Produção musical e edição de vídeo para projetos que precisam se destacar.",
    botaoPrimario: { texto: "Ver Serviços", href: "#servicos" },
    botaoSecundario: { texto: "Entrar em Contato", href: "#contato" },
  },

  /* ---------------------------------------------------------------------
     2. SERVIÇOS
     Edite descrição, preço, pacotes e prazo livremente.
  --------------------------------------------------------------------- */
  servicos: [
    {
      numero: "01",
      titulo: "Produção Musical",
      descricao:
        "Composição, arranjo e mixagem de trilhas originais de temas orquestrais a texturas eletrônicas, moldadas para a identidade sonora do seu projeto.",
      recursos: [
        "Composição original",
        "Mixagem e masterização",
        "Trilhas para jogos, vídeos e projetos autorais",
        "Entrega em múltiplos formatos (WAV, MP3, OGG)",
      ],
      pacotes: [
        { nome: "Single", preco: "R$ 60", prazo: "sob consulta" },
        { nome: "EP (3–5 faixas)", preco: "R$ 150", prazo: "sob consulta" },
        { nome: "Trilha Completa", preco: "sob consulta", prazo: "sob consulta" },
      ],
    },
    {
      numero: "02",
      titulo: "Edição de Vídeo",
      descricao:
        "Edição e finalização com foco em ritmo, narrativa e impacto visual de cinemáticas a conteúdo para redes sociais.",
      recursos: [
        "Corte e ritmo narrativo",
        "Color grading",
        "Motion graphics básico",
        "Sincronização com trilha sonora",
      ],
      pacotes: [
        { nome: "Vídeo Curto (até 5 min)", preco: "R$ 40", prazo: "sob consulta" },
        { nome: "Projeto Médio", preco: "R$ 100", prazo: "sob consulta" },
        { nome: "Projeto Completo", preco: "sob consulta", prazo: "sob consulta" },
      ],
    },
  ],

  /* ---------------------------------------------------------------------
     3. PORTFÓLIO
     Adicione, remova ou edite quantos itens quiser.
     "imagem" aceita um caminho local (ex: "assets/projeto1.jpg") ou uma URL.
  --------------------------------------------------------------------- */
  portfolio: [
    {
      imagem: "https://placehold.co/800x600/1DB954/FFFFFF?text=Spotify+Artist",
      titulo: "Portfólio de Música",
      descricao:
        "Confira todas as minhas produções musicais e trilhas sonoras no Spotify.",
      link: "https://open.spotify.com/intl-pt/artist/5VfkQSPwXlnyfa6NlSCzQq?si=U1c67IiASCWgqR6A4kZ5aQ",
      icon: "spotify-white-icon.webp",
    },
    {
      imagem: "https://placehold.co/800x600/FF0000/FFFFFF?text=YouTube+Channel",
      titulo: "Portfólio de Edição de Vídeo",
      descricao:
        "Assista aos meus trabalhos de edição e cinemáticas no meu canal do YouTube.",
      link: "https://www.youtube.com/@Theflerres",
      icon: "youtube-app-white-icon.webp",
    },
  ],

  /* ---------------------------------------------------------------------
     3B. TRABALHOS RECENTES
     Galeria de projetos recentes com imagens do projeto.
  --------------------------------------------------------------------- */
  trabalhosRecentes: [
    {
      imagem: "logo album anti espiral.png",
      titulo: "Álbum Anti-Espiral",
      link: "https://open.spotify.com/intl-pt/album/4EwuJ7gFCC5kGjtM2JaZzw?si=s8xlodwqQrGBLKI7tWgAcQ",
    },
    {
      imagem: "nova capa espiralium_final.png",
      titulo: "Nova Capa Espiralum",
      link: "https://open.spotify.com/intl-pt/album/2fNIPPAkr3uBjjHwzVDqly?si=ne7T-AkDStm4z-tX6OO44A",
    },
  ],

  /* ---------------------------------------------------------------------
     4. PROCESSO
  --------------------------------------------------------------------- */
  processo: [
    { numero: "01", titulo: "Contato", descricao: "Você conta sobre o projeto, referências e prazo." },
    { numero: "02", titulo: "Planejamento", descricao: "Alinhamos valores e cronograma antes de começar." },
    { numero: "03", titulo: "Produção", descricao: "Composição, edição e revisões guiadas pelo seu feedback." },
    { numero: "04", titulo: "Entrega", descricao: "Arquivos finais entregues nos formatos combinados." },
  ],

  /* ---------------------------------------------------------------------
     5. CONTATO
     Único local com todos os links de contato do site.
  --------------------------------------------------------------------- */
  contato: {
    eyebrow: "INICIAR CONEXÃO",
    titulo: "Foi um prazer te conhecer.",
    subtitulo: "Entre em contato pelo Discord para trabalhar comigo.",
    links: [
      { tipo: "Discord", valor: "Theflerres", href: "https://discord.com/users/000000000000000000", icon: "discord-white-icon.webp" },
    ],
  },

  /* ---------------------------------------------------------------------
     6. LISTA DE ESPERA / FILA
     Projetos em andamento e aguardando slot.
  --------------------------------------------------------------------- */
  fila: {
    eyebrow: "PROJETOS EM ANDAMENTO",
    titulo: "Fila de Trabalhos",
    subtitulo: "Veja quais projetos estou desenvolvendo no momento.",
    musicProjects: [
      { titulo: "Single Aurora Mortis", status: "finalizado" },
      { titulo: "Album Espiralium Era 2", status: "finalizado" },
      { titulo: "Album Espiralium Era 2 Anti-Espiral", status: "finalizado" },
      { titulo: "Album Espiralium Era 2 Deluxe", status: "em producao" },
      { titulo: "Album Ordem Paranormal Genesis", status: "em producao" },
      { titulo: "Album BTWO - Tempestade Vermelha", status: "em espera" },
    ],
    videoProjects: [
      { titulo: "FCNSMP", status: "em producao" },
      { titulo: "EquinoxSMP", status: "em producao" },
      { titulo: "Aurora Mortis", status: "em espera" },
      { titulo: "Espiralium Era 2", status: "finalizado" },
    ],
    statusLabels: {
      em_producao: "Em Produção",
      em_espera: "Em Espera",
      finalizado: "Finalizado",
    },
  },

  /* ---------------------------------------------------------------------
     RODAPÉ
  --------------------------------------------------------------------- */
  footer: {
    texto: "Theflerres — Produção Musical & Edição de Vídeo",
  },
};