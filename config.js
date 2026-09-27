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
     0B. STATUS DE COMISSÕES
     Exibido em destaque no topo do site (Hero).
     Slots disponíveis = totalSlots − slotsOcupados. Ao pegar uma comissão,
     basta aumentar "slotsOcupados". Com todos ocupados, o badge muda
     sozinho para "mensagemLotadas".
  --------------------------------------------------------------------- */
  comissoes: {
    abertas: true,
    totalSlots: 7,
    slotsOcupados: 0,
    mensagemAbertas: "COMISSÕES ABERTAS",
    mensagemFechadas: "COMISSÕES FECHADAS NO MOMENTO",
    mensagemLotadas: "COMISSÕES LOTADAS",
  },

  /* ---------------------------------------------------------------------
     1. HERO
  --------------------------------------------------------------------- */
  hero: {
    // "\u00A0" = espaço que não quebra: mantém cada "—" junto da palavra
    // anterior, para o travessão não ficar sozinho na linha no celular.
    eyebrow: "PRODUÇÃO MUSICAL\u00A0— EDIÇÃO DE VÍDEO\u00A0— RENDER 3D",
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
      // Serviço pausado no momento — o aviso abaixo aparece como uma faixa sobre o card.
      // Para reativar, apague (ou defina como false) o campo "indisponivel".
      indisponivel: true,
      avisoIndisponivel: "EM PAUSA",
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
        "Renderização 3D no Blender focada em modelos de Minecraft (skins, personagens, builds). Não sou modelador, o cliente precisa fornecer o modelo pronto, em Blockbench (.bbmodel) ou glTF (.gltf/.glb). De um headshot simples para foto de perfil até um wallpaper completo. Animações e loops ainda não são oferecidos devido a limitações de hardware.",
      recursos: [
        "Render de modelos de Minecraft (skins, personagens, builds)",
        "Cliente fornece o modelo: Blockbench (.bbmodel) ou glTF (.gltf/.glb)",
        "Render de personagem/headshot para foto de perfil",
        "Render de cena completa para wallpaper",
        "Iluminação e composição personalizadas",
        "Entrega em alta resolução (PNG)",
      ],
      pacotes: [
        { nome: "Render Simples", preco: "R$ 15", prazo: "sob consulta" },
        { nome: "Render Complexo", preco: "R$ 50", prazo: "sob consulta" },
      ],
    },
  ],

  /* ---------------------------------------------------------------------
     3. PORTFÓLIO
     Adicione, remova ou edite quantos itens quiser.
     "icon" é o ícone do card; "imagem" (opcional) só é usada sem "icon".
     Links externos abrem em nova aba; links internos, na mesma aba.
  --------------------------------------------------------------------- */
  portfolio: [
    {
      titulo: "Portfólio de Música",
      descricao:
        "Confira todas as minhas produções musicais e trilhas sonoras no Spotify.",
      link: "https://open.spotify.com/intl-pt/artist/5VfkQSPwXlnyfa6NlSCzQq?si=U1c67IiASCWgqR6A4kZ5aQ",
      icon: "spotify-white-icon.webp",
    },
    {
      titulo: "Portfólio de Edição de Vídeo",
      descricao:
        "Assista aos meus trabalhos de edição e cinemáticas no meu canal do YouTube.",
      link: "https://www.youtube.com/@Theflerres",
      icon: "youtube-app-white-icon.webp",
    },
    {
      titulo: "Portfólio de Render 3D",
      descricao:
        "Veja os renders 3D no Blender que já entreguei, direto no Histórico de Clientes.",
      // Link interno: abre na mesma aba, já com a aba Render selecionada
      link: "historico.html#render",
      icon: "render-white-icon.svg",
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
          "É expressamente proibido usar qualquer obra entregue seja áudio, vídeo ou render 3D, no todo ou em parte para treinar, alimentar ou gerar conteúdo por meio de sistemas de Inteligência Artificial generativa (incluindo, mas não se limitando a, fine-tuning, criação de datasets, style transfer, upscaling por IA e ferramentas similares). O descumprimento desta cláusula constitui quebra de contrato e revoga imediatamente a licença de uso concedida.",
      },
      {
        numero: "04",
        titulo: "Render 3D — Limitações Atuais",
        texto:
          "Atualmente não são oferecidas animações ou loops em render 3D (Blender), devido a limitações de hardware. O serviço é restrito a imagens estáticas de um headshot simples para foto de perfil a um wallpaper completo.",
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
       - "video" com "imagem": a imagem aparece ao fundo, com ícone e link por cima
  --------------------------------------------------------------------- */
  historico: {
    eyebrow: "TRABALHOS ENTREGUES",
    titulo: "Histórico de Clientes",
    subtitulo: "Toque ou clique em um card para ver o que foi entregue para cada cliente.",
    // A ordem aqui define a ordem das abas de filtro (a primeira abre selecionada).
    tipoLabels: {
      render: "Render",
      video: "Edição de Vídeo",
      musica: "Música",
    },
    // RENDERS 3D — todos os arquivos da pasta abaixo entram na aba Render.
    // Nome do arquivo: "Título_Cliente.ext" (o texto após o último "_" é o
    // cliente). Clientes com mais de um render viram um grupo expansível.
    // Render novo? Basta adicionar uma linha com o nome do arquivo.
    // Título diferente do nome do arquivo? Use um objeto no lugar da string:
    //   { arquivo: "Diretores2_Equinox.png", titulo: "Diretores" },
    // O cliente continua vindo do nome do arquivo.
    //
    // SIGILO — { arquivo: "...", sigilo: true }: o card mostra só a versão
    // borrada de "pastaSigilo" (mesmo nome, extensão .jpg) e, ao clicar,
    // exibe "mensagemSigilo". O site nunca monta o caminho do original, que
    // deve ficar fora do site em _privado/ (ignorada pelo git).
    // Fim do sigilo: devolva o original para assets/Blender/, apague o
    // "sigilo: true" e (opcional) a versão borrada em assets/sigilo/.
    pastaRenders: "assets/Blender",
    pastaSigilo: "assets/sigilo",
    // TRABALHOS RECENTES — qualquer trabalho do Histórico (render, item de
    // "clientes" ou item finalizado da Fila) com "recente: true" aparece na
    // seção Trabalhos Recentes da página inicial e ganha a etiqueta "NOVO".
    // A página inicial mostra no máximo "recentesMax", na ordem deste
    // arquivo (renders, animações, clientes, Fila). Para um recente aparecer
    // primeiro, deixe a linha dele no topo da lista.
    recentesMax: 4,
    mensagemSigilo: "O cliente pediu sigilo até o lançamento oficial da arte em seu projeto.",
    renders: [
      { arquivo: "Banner Aurora Live_Aurora Mortis.png", recente: true },
      { arquivo: "Star e Cachorros_Aurora Mortis.png", recente: true },
      "Bott e P3_FCN.png",
      { arquivo: "Bott rosto 4_FCN.png", titulo: "Bott – Rosto" },
      { arquivo: "Diretores2_Equinox.png", titulo: "Diretores" },
      { arquivo: "Encontro2_Equinox.png", titulo: "Encontro" },
      { arquivo: "Half Body Bott_FCN.png", titulo: "Bott – Half Body" },
      { arquivo: "KANEKA Espelho_Kaneka.png", titulo: "Kaneka – Espelho" },
      { arquivo: "Logo album anti espiral_Espiralium.png", titulo: "Logo Álbum Anti-Espiral" },
      { arquivo: "Perfil p3_FCN.png", titulo: "Perfil P3" },
      { arquivo: "Sirius praia_Equinox.jpg", titulo: "Sirius na Praia", recente: true },
      { arquivo: "Sirus_Equinox.png", titulo: "Sirius" },
      { arquivo: "Tom foto de Perfil_Espiralium.png", titulo: "Tom – Foto de Perfil" },
      { arquivo: "Zilla e sirus_Equinox.png", titulo: "Zilla e Sirius", recente: true },
      "Zilla_Equinox.png",
    ],
    // ANIMAÇÕES 3D — vídeos (.mp4) da pasta abaixo. Mesma regra de nome
    // ("Título_Cliente.mp4") e mesmas opções dos renders (titulo, recente).
    // Entram na aba Render, junto dos renders do mesmo cliente, com a
    // etiqueta "ANIMAÇÃO"; ao clicar, o vídeo toca ampliado.
    // (O sigilo só vale para renders em imagem.)
    pastaAnimacoes: "assets/Animacao",
    animacoes: [
      "Aurora Live_Aurora Mortis.mp4",
    ],
    // Os cards de trabalhos finalizados na Fila aparecem aqui automaticamente.
    // Adicione objetos aqui para trabalhos que não passaram pela Fila.
    // Em "video", "imagem" é opcional (ex.: thumbnail do YouTube).
    clientes: [
      {
        tipo: "video",
        cliente: "Aurora Mortis",
        titulo: "Alvorecer da Morte - Aurora Mortis Trailer Oficial",
        link: "https://youtu.be/gpKwpTIKtYw",
        imagem: "https://img.youtube.com/vi/gpKwpTIKtYw/hqdefault.jpg",
        icon: "youtube-app-white-icon.webp",
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
     Quando o "status" de um item vira "finalizado", ele some automaticamente
     desta lista e passa a aparecer em Histórico de Clientes (historico.html)
     — não precisa duplicar o item lá. "link" e "icon" são opcionais e, se
     informados, são usados no card gerado em Histórico (senão usa o ícone
     padrão da categoria e o card fica sem link clicável).
  --------------------------------------------------------------------- */
  fila: {
    eyebrow: "PROJETOS EM ANDAMENTO",
    titulo: "Fila de Trabalhos",
    subtitulo: "Veja quais projetos estou desenvolvendo no momento.",
    musicProjects: [
      { titulo: "Single Aurora Mortis", status: "finalizado" },
      { titulo: "Album Espiralium Era 2", status: "finalizado", link: "https://open.spotify.com/intl-pt/album/2fNIPPAkr3uBjjHwzVDqly?si=rTjne6L2ReuuSsoejFaeBA" },
      { titulo: "Album Espiralium Era 2 Anti-Espiral", status: "finalizado", link: "https://open.spotify.com/intl-pt/album/4EwuJ7gFCC5kGjtM2JaZzw?si=ssF23VCyQTqp2FG7a3nAgA" },
      { titulo: "Album Espiralium Era 2 Deluxe", status: "finalizado", link: "https://open.spotify.com/intl-pt/album/7z49fWQSpJdRYJQ5cHGMJM?si=OBUMD49JTY-TjLp1KsE7gg" },
      { titulo: "Album Ordem Paranormal Genesis", status: "em producao" },
      { titulo: "Album BTWO - Tempestade Vermelha", status: "em espera" },
    ],
    videoProjects: [
      { titulo: "FCNSMP", status: "em producao" },
      { titulo: "EquinoxSMP", status: "em producao" },
      { titulo: "Aurora Mortis", status: "em producao" },
      { titulo: "Espiralium Era 2", status: "finalizado", link: "https://www.youtube.com/@EspiraliumEra2" },
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
