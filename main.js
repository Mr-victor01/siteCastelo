// ============================================
// SEO & PERFORMANCE OPTIMIZATION FUNCTIONS
// ============================================

/**
 * Injeta Schema.org JSON-LD para vídeo do YouTube
 * Melhora o SEO do vídeo nos resultados de busca
 */
function injectVideoSchema() {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Última Pregação - Igreja Presbiteriana Castelo Forte",
    "description": "Pregação do Rev. Ronaldo Acioly Cadena na Igreja Presbiteriana Castelo Forte",
    "thumbnailUrl": "https://img.youtube.com/vi/[VIDEO_ID]/maxresdefault.jpg",
    "uploadDate": new Date().toISOString().split('T')[0],
    "duration": "PT0H30M0S",
    "contentUrl": "https://www.youtube.com/embed/[VIDEO_ID]",
    "embedUrl": "https://www.youtube.com/embed/[VIDEO_ID]"
  };
  script.textContent = JSON.stringify(videoSchema);
  document.head.appendChild(script);
}

/**
 * Implementa Lazy Loading para imagens
 * Melhora Core Web Vitals (LCP, CLS)
 */
function implementLazyLoading() {
  const images = document.querySelectorAll('img:not([loading="lazy"])');
  images.forEach(img => {
    if (!img.src.includes('data:')) {
      img.loading = 'lazy';
    }
  });
}

/**
 * Adiciona atributos alt descritivos em imagens sem alt
 * Fundamental para acessibilidade e SEO
 */
function improveImageAccessibility() {
  const imageMap = {
    'android-chrome': 'Logo Igreja Presbiteriana Castelo Forte',
    'pastor.jpg': 'Rev. Ronaldo Acioly Cadena de Oliveira',
    'Ipb_logo.png': 'Logo Igreja Presbiteriana do Brasil'
  };

  document.querySelectorAll('img').forEach(img => {
    if (!img.alt || img.alt.trim() === '') {
      for (const [key, altText] of Object.entries(imageMap)) {
        if (img.src.includes(key)) {
          img.alt = altText;
          break;
        }
      }
    }
  });
}

/**
 * Adiciona breadcrumbs JSON-LD para SEO
 * Ajuda na navegação e estrutura de site
 */
function injectBreadcrumbs() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://mr-victor01.github.io/siteCastelo/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Sobre Nós",
        "item": "https://mr-victor01.github.io/siteCastelo/#sobre"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Pastor",
        "item": "https://mr-victor01.github.io/siteCastelo/#pastor"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Contatos",
        "item": "https://mr-victor01.github.io/siteCastelo/#contatos"
      }
    ]
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(breadcrumbSchema);
  document.head.appendChild(script);
}

/**
 * Monitora e relata Core Web Vitals
 * Ajuda a otimizar performance
 */
function trackCoreWebVitals() {
  // Largest Contentful Paint (LCP)
  const lcp = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
  });
  lcp.observe({ entryTypes: ['largest-contentful-paint'] });

  // Cumulative Layout Shift (CLS)
  let clsValue = 0;
  const cls = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
        console.log('CLS:', clsValue);
      }
    }
  });
  cls.observe({ entryTypes: ['layout-shift'] });

  // First Input Delay (FID) / Interaction to Next Paint (INP)
  const fid = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log('FID/INP:', entry.processingDuration);
    }
  });
  fid.observe({ entryTypes: ['first-input', 'largest-contentful-paint'] });
}

/**
 * Adiciona Links internos com rel="prefetch" para melhorar navegação
 * Melhora performance de navegação entre páginas
 */
function addPrefetchLinks() {
  if ('prefetch' in Link.prototype) {
    const internalLinks = document.querySelectorAll('a[href^="http"][href*="siteCastelo"], a[href^="/"]');
    internalLinks.forEach(link => {
      const prefetchLink = document.createElement('link');
      prefetchLink.rel = 'prefetch';
      prefetchLink.href = link.href;
      document.head.appendChild(prefetchLink);
    });
  }
}

/**
 * Valida estrutura de heading (h1, h2, h3)
 * Ajuda na estrutura semântica para SEO
 */
function validateHeadingStructure() {
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let previousLevel = 0;
  
  headings.forEach((heading, index) => {
    const currentLevel = parseInt(heading.tagName[1]);
    if (index > 0 && currentLevel - previousLevel > 1) {
      console.warn(`Aviso: Pulou de H${previousLevel} para H${currentLevel} em "${heading.textContent}"`);
    }
    previousLevel = currentLevel;
  });
}

/**
 * Fetch o último vídeo do YouTube e injeta
 * Já estava implementado - mantido aqui
 */
async function fetchLatestVideo() {
  const apiKey = 'AIzaSyDdjuTSlI2bHgvPIm__Af-hkkVoofSyInU';
  const channelId = 'UCfrZMAARlqEragXzTVCqZ4g';
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet,id&channelId=${channelId}&order=date&type=video&maxResults=1&key=${apiKey}`;
  const latestVideoElement = document.getElementById('latest-video');
  if (!latestVideoElement) return;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      latestVideoElement.innerHTML = '<p>Último vídeo não encontrado.</p>';
      return;
    }

    const videoId = data.items[0].id.videoId;
    if (!videoId) {
      latestVideoElement.innerHTML = '<p>Último vídeo não encontrado.</p>';
      return;
    }

    // Injeta Schema.org para o vídeo específico
    const videoSchema = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": "Última Pregação - Igreja Presbiteriana Castelo Forte",
      "description": "Pregação do Rev. Ronaldo Acioly Cadena na Igreja Presbiteriana Castelo Forte",
      "thumbnailUrl": `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      "uploadDate": new Date().toISOString().split('T')[0],
      "channelId": "UCfrZMAARlqEragXzTVCqZ4g",
      "embedUrl": `https://www.youtube.com/embed/${videoId}`
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(videoSchema);
    document.head.appendChild(script);

    latestVideoElement.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" title="Última Pregação Castelo Forte" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
  } catch (error) {
    console.error('Erro ao buscar último vídeo:', error);
    latestVideoElement.innerHTML = '<p>Erro ao carregar vídeo.</p>';
  }
}

/**
 * Inicializa todas as otimizações
 */
function initSEOOptimizations() {
  // Aguarda DOM estar pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runOptimizations);
  } else {
    runOptimizations();
  }

  function runOptimizations() {
    console.log('🚀 Iniciando otimizações de SEO...');
    
    fetchLatestVideo();
    implementLazyLoading();
    improveImageAccessibility();
    injectBreadcrumbs();
    validateHeadingStructure();
    trackCoreWebVitals();
    
    console.log('✅ Otimizações de SEO concluídas!');
  }
}

// Executa ao carregar a página
document.addEventListener('DOMContentLoaded', initSEOOptimizations);