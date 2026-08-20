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
    {
      numero: "03",
      titulo: "Render 3D (Blender)",
      descricao:
        "Renderização 3D no Blender, de um headshot simples para foto de perfil até um wallpaper completo com cena e iluminação elaboradas. Animações e loops ainda não são oferecidos devido a limitações de hardware.",
      recursos: [
        "Render de personagem/headshot para foto de perfil",
        "Render de cena completa para wallpaper",
        "Iluminação e composição personalizadas",
        "Entrega em alta resolução (PNG)",
      ],
      pacotes: [
        { nome: "Render Simples", preco: "R$ 5", prazo: "sob consulta" },
        { nome: "Render Complexo", preco: "R$ 50", prazo: "sob consulta" },
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
     3C. TERMOS DE SERVIÇO
     Exibido em termos.html. Edite as cláusulas livremente.
  --------------------------------------------------------------------- */
  termos: {
    eyebrow: "PROTEÇÃO E TRANSPARÊNCIA",
    titulo: "Termos de Serviço",
    subtitulo:
      "Como funcionam o pagamento, os direitos sobre a obra e o uso de Inteligência Artificial nos projetos.",
    clausulas: [
      {
        numero: "01",
        titulo: "Pagamento",
        texto:
          "O início de todo projeto exige o pagamento de 50% do valor combinado (sinal). Os 50% restantes são pagos na entrega final. Prévias em baixa qualidade ou com marca d'água podem ser enviadas durante o processo, mas o arquivo final em alta qualidade só é liberado após a confirmação do pagamento integral.",
      },
      {
        numero: "02",
        titulo: "Direitos Autorais e Licença de Uso",
        texto:
          "O autor mantém os direitos autorais sobre toda obra produzida (música, vídeo ou render 3D). O cliente recebe uma licença de uso, cujo escopo (pessoal ou comercial) é definido individualmente para cada projeto. Salvo acordo em contrário por escrito, o autor pode exibir a obra em seu portfólio e materiais de divulgação.",
      },
      {
        numero: "03",
        titulo: "Proibição de Uso com Inteligência Artificial",
        texto:
          "É expressamente proibido usar qualquer obra entregue — áudio, vídeo ou render 3D, no todo ou em parte — para treinar, alimentar ou gerar conteúdo por meio de sistemas de Inteligência Artificial generativa (incluindo, mas não se limitando a, fine-tuning, criação de datasets, style transfer, upscaling por IA e ferramentas similares). O descumprimento desta cláusula constitui quebra de contrato e revoga imediatamente a licença de uso concedida.",
      },
      {
        numero: "04",
        titulo: "Render 3D — Limitações Atuais",
        texto:
          "Atualmente não são oferecidas animações ou loops em render 3D (Blender), devido a limitações de hardware. O serviço é restrito a imagens estáticas — de um headshot simples para foto de perfil a um wallpaper completo.",
      },
      {
        numero: "05",
        titulo: "Revisões",
        texto:
          "Cada pacote inclui até 2 rodadas de revisão. Alterações solicitadas além desse limite, ou fora do escopo combinado inicialmente, podem ser cobradas à parte.",
      },
      {
        numero: "06",
        titulo: "Cancelamento",
        texto:
          "Caso o cliente opte por cancelar o projeto após o início da produção, o valor do sinal (50%) não é reembolsável, pois cobre o tempo e o trabalho já investidos.",
      },
      {
        numero: "07",
        titulo: "Prazos de Entrega",
        texto:
          "Os prazos são combinados individualmente para cada projeto, de acordo com a complexidade e a fila de trabalhos em andamento (veja a seção Fila de Trabalhos).",
      },
      {
        numero: "08",
        titulo: "Crédito Autoral",
        texto:
          "É solicitado, mas não obrigatório, que o cliente credite o autor (\"Produzido por Theflerres\") ao divulgar publicamente a obra entregue.",
      },
      {
        numero: "09",
        titulo: "Aceite dos Termos",
        texto:
          "Como não há contrato assinado formalmente, o comprovante de pagamento do sinal (50% inicial) é considerado como aceite destes Termos de Serviço.",
      },
      {
        numero: "10",
        titulo: "Foro e Legislação Aplicável",
        texto:
          "Este é um acordo firmado entre particulares (pessoa física), sem vínculo com pessoa jurídica registrada. Aplica-se a legislação brasileira, sendo eventuais disputas resolvidas de comum acordo ou, se necessário, no foro da comarca do autor.",
      },
    ],
  },

  /* ---------------------------------------------------------------------
     3D. HISTÓRICO DE CLIENTES
     Exibido em historico.html. Um card por trabalho entregue.
     tipo: "musica" | "video" | "render"
       - "musica"/"video": usa "icon" (ícone da plataforma) e "link" (abre em nova aba)
       - "render": usa "imagem" (preview que aparece ao passar o mouse)
  --------------------------------------------------------------------- */
  historico: {
    eyebrow: "TRABALHOS ENTREGUES",
    titulo: "Histórico de Clientes",
    subtitulo: "Passe o mouse sobre um card para ver o que foi entregue para cada cliente.",
    tipoLabels: {
      musica: "Música",
      video: "Vídeo",
      render: "Render 3D",
    },
    // EXEMPLOS — substitua pelos dados reais dos seus clientes e remova estes 3 itens de exemplo.
    clientes: [
      {
        cliente: "Cliente Exemplo (Música)",
        tipo: "musica",
        titulo: "Single — descrição do trabalho realizado",
        link: "https://open.spotify.com/",
        icon: "spotify-white-icon.webp",
      },
      {
        cliente: "Cliente Exemplo (Vídeo)",
        tipo: "video",
        titulo: "Edição de vídeo — descrição do trabalho realizado",
        link: "https://www.youtube.com/",
        icon: "youtube-app-white-icon.webp",
      },
      {
        cliente: "Cliente Exemplo (Render)",
        tipo: "render",
        titulo: "Render 3D — descrição do trabalho realizado",
        imagem: "https://placehold.co/800x600/1a1a1a/FFFFFF?text=Render+Preview",
      },
    ],
  },

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
      { titulo: "Album Espiralium Era 2 Deluxe", status: "finalizado" },
      { titulo: "Album Ordem Paranormal Genesis", status: "em producao" },
      { titulo: "Album BTWO - Tempestade Vermelha", status: "em espera" },
    ],
    videoProjects: [
      { titulo: "FCNSMP", status: "em producao" },
      { titulo: "EquinoxSMP", status: "em producao" },
      { titulo: "Aurora Mortis", status: "em producao" },
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
