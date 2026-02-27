// Configuração dos sets
const setsData = [
    {
        id: 'base-set',
        name: 'Base Set',
        year: '1999',
        image: './images/sets/base-set.png', // Caminho relativo correto
        cardCount: 102,
        description: 'A edição que começou tudo',
        folder: 'base-set',
        prefix: 'BS',
        color: '#ff6b6b'
    },
    {
        id: 'fossil',
        name: 'Fossil',
        year: '1999',
        image: './images/sets/fossil.png',
        cardCount: 62,
        description: 'Pokémon pré-históricos',
        folder: 'fossil',
        prefix: 'FO',
        color: '#4ecdc4'
    },
    {
        id: 'jungle',
        name: 'Jungle',
        year: '1999',
        image: './images/sets/jungle.png',
        cardCount: 64,
        description: 'Aventura na selva',
        folder: 'jungle',
        prefix: 'JU',
        color: '#45b7d1'
    },
    {
        id: 'team-rocket',
        name: 'Team Rocket',
        year: '2000',
        image: './images/sets/team-rocket.png',
        cardCount: 83,
        description: 'A primeira expansão dos vilões',
        folder: 'team-rocket',
        prefix: 'RO',
        color: '#6c5ce7'
    }
];

// Função para criar cards dos sets na página inicial
function createSetCards() {
    const setsGrid = document.getElementById('setsGrid');
    if (!setsGrid) {
        console.log('setsGrid não encontrado - provavelmente é página de set');
        return;
    }
    
    setsGrid.innerHTML = '';
    console.log('Criando cards dos sets...');
    
    setsData.forEach(set => {
        const card = document.createElement('div');
        card.className = 'set-card';
        card.onclick = () => window.location.href = `${set.id}.html`;
        
        // Fallback elegante
        const fallbackSVG = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'><rect width='300' height='200' fill='${set.color}'/><text x='50' y='120' font-family='Arial' font-size='24' fill='white' font-weight='bold'>${set.name}</text></svg>`;
        
        card.innerHTML = `
            <img src="${set.image}" 
                 alt="${set.name}" 
                 class="set-image"
                 onerror="this.src='${fallbackSVG}'; console.log('Fallback para ${set.name}')">
            <div class="set-info">
                <h3 class="set-name">${set.name}</h3>
                <p class="set-year"><i class="far fa-calendar-alt"></i> ${set.year}</p>
                <p style="color: var(--text-secondary); margin: 0.5rem 0;">${set.description}</p>
                <span class="set-badge">${set.cardCount} cartas</span>
            </div>
        `;
        
        setsGrid.appendChild(card);
    });
}

// Função para listar cartas de um set
function getCardsFromSet(setId) {
    const set = setsData.find(s => s.id === setId);
    if (!set) return [];
    
    // Lista manual das cartas em destaque (você pode expandir)
    const cardsMap = {
        'base-set': [
            { name: 'Charizard', number: '4' },
            { name: 'Blastoise', number: '2' },
            { name: 'Venusaur', number: '15' },
            { name: 'Pikachu', number: '58' },
            { name: 'Mewtwo', number: '10' },
            { name: 'Gyarados', number: '6' }
        ],
        'fossil': [
            { name: 'Dragonite', number: '4' },
            { name: 'Aerodactyl', number: '16' },
            { name: 'Zapdos', number: '15' },
            { name: 'Articuno', number: '2' },
            { name: 'Moltres', number: '12' }
        ],
        'jungle': [
            { name: 'Pikachu', number: '60' },
            { name: 'Snorlax', number: '11' },
            { name: 'Scyther', number: '10' },
            { name: 'Vaporeon', number: '12' },
            { name: 'Jolteon', number: '4' }
        ],
        'team-rocket': [
            { name: 'Dark_Charizard', number: '4' },
            { name: 'Dark_Blastoise', number: '3' },
            { name: 'Dark_Dragonite', number: '5' },
            { name: 'Dark_Gyarados', number: '8' }
        ]
    };
    
    return (cardsMap[setId] || []).map(card => ({
        ...card,
        image: `./images/cards/${set.folder}/${card.name}_${set.prefix}_${card.number}.jpg`,
        set: set.name
    }));
}

// Função para criar a página do set
function createSetPage(setId) {
    const cardsGrid = document.getElementById('cardsGrid');
    const setTitle = document.getElementById('setTitle');
    const setDescription = document.getElementById('setDescription');
    
    if (!cardsGrid || !setTitle || !setDescription) {
        console.log('Elementos da página de set não encontrados');
        return;
    }
    
    const set = setsData.find(s => s.id === setId);
    if (!set) {
        cardsGrid.innerHTML = '<p>Set não encontrado</p>';
        return;
    }
    
    setTitle.textContent = set.name;
    setDescription.textContent = set.description;
    
    const cards = getCardsFromSet(setId);
    cardsGrid.innerHTML = '';
    
    if (cards.length === 0) {
        cardsGrid.innerHTML = '<p>Nenhuma carta encontrada para este set</p>';
        return;
    }
    
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'featured-card'; // Reutilizando estilo
        
        // Fallback colorido
        const fallbackDiv = `<div style="width:100%; height:150px; background: linear-gradient(135deg, ${set.color}, ${set.color}dd); display: flex; align-items: center; justify-content: center; border-radius: 8px 8px 0 0;"><span style="color: white; font-size: 2rem; font-weight: bold;">${card.name.charAt(0)}</span></div>`;
        
        cardElement.innerHTML = `
            <img src="${card.image}" 
                 alt="${card.name}"
                 style="width:100%; height:150px; object-fit: cover; border-radius: 8px 8px 0 0;"
                 onerror="this.style.display='none'; this.parentNode.innerHTML += '${fallbackDiv}'; console.log('Fallback para ${card.name}')">
            <div class="featured-card-info">
                <h4 class="featured-card-name">${card.name.replace(/_/g, ' ')}</h4>
                <p class="featured-card-number">${card.number}</p>
                <small style="color: var(--accent-primary);">${card.set}</small>
            </div>
        `;
        
        cardsGrid.appendChild(cardElement);
    });
}

// Função para criar cards em destaque na página inicial
function createFeaturedCards() {
    const featuredGrid = document.getElementById('featuredGrid');
    if (!featuredGrid) return;
    
    featuredGrid.innerHTML = '<div class="loading">Carregando cartas em destaque...</div>';
    
    // Pega cartas de todos os sets
    const allFeatured = [
        ...getCardsFromSet('base-set'),
        ...getCardsFromSet('fossil'),
        ...getCardsFromSet('jungle'),
        ...getCardsFromSet('team-rocket')
    ].slice(0, 8); // Mostra só 8 cartas
    
    featuredGrid.innerHTML = '';
    
    allFeatured.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'featured-card';
        
        const set = setsData.find(s => s.name === card.set);
        const fallbackDiv = `<div style="width:100%; height:150px; background: linear-gradient(135deg, ${set?.color || '#ff6b6b'}, ${set?.color || '#ff6b6b'}dd); display: flex; align-items: center; justify-content: center; border-radius: 8px 8px 0 0;"><span style="color: white; font-size: 2rem; font-weight: bold;">${card.name.charAt(0)}</span></div>`;
        
        cardElement.innerHTML = `
            <img src="${card.image}" 
                 alt="${card.name}"
                 style="width:100%; height:150px; object-fit: cover; border-radius: 8px 8px 0 0;"
                 onerror="this.style.display='none'; this.parentNode.innerHTML += '${fallbackDiv}';">
            <div class="featured-card-info">
                <h4 class="featured-card-name">${card.name.replace(/_/g, ' ')}</h4>
                <p class="featured-card-number">${card.number}</p>
                <small style="color: var(--accent-primary);">${card.set}</small>
            </div>
        `;
        
        featuredGrid.appendChild(cardElement);
    });
}

// Theme Toggle (igual ao anterior)
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon?.classList.replace('fa-moon', 'fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            icon?.classList.replace('fa-sun', 'fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon?.classList.replace('fa-moon', 'fa-sun');
        }
    });
}

// Mobile Menu
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuBtn || !navLinks) return;
    
    menuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
    
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
        } else {
            navLinks.style.display = 'none';
        }
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Scroll Animation
function initScrollAnimation() {
    const cards = document.querySelectorAll('.set-card, .featured-card');
    if (cards.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(card);
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado, inicializando...');
    
    // Detecta qual página estamos
    const path = window.location.pathname;
    console.log('Caminho atual:', path);
    
    if (path.includes('base-set.html')) {
        createSetPage('base-set');
    } else if (path.includes('fossil.html')) {
        createSetPage('fossil');
    } else if (path.includes('jungle.html')) {
        createSetPage('jungle');
    } else if (path.includes('team-rocket.html')) {
        createSetPage('team-rocket');
    } else {
        // Página inicial
        createSetCards();
        createFeaturedCards();
    }
    
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimation();
});