// script.js

// Configuração de imagens com fallback
const IMAGE_CONFIG = {
    // Usando a PokeAPI para imagens oficiais
    pokeApi: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/',
    // Fallback para placeholders caso a imagem não carregue
    placeholder: 'https://via.placeholder.com/300x400/6b4f8c/ffffff?text='
};

// Dados da coleção com IDs corretos dos Pokémon
const collectionData = [
    {
        id: 1,
        name: "Absol",
        set: "base",
        rarity: "holo",
        pokemonId: 359, // ID do Absol na PokeAPI
        number: "1/102",
        description: "Base Set - Holo Rare"
    },
    {
        id: 2,
        name: "Absol EX",
        set: "team-rocket",
        rarity: "rare",
        pokemonId: 359,
        number: "97/109",
        description: "Team Rocket - Rare"
    },
    {
        id: 3,
        name: "Absol GX",
        set: "fossil",
        rarity: "holo",
        pokemonId: 359,
        number: "45/62",
        description: "Fossil - Holo Rare"
    },
    {
        id: 4,
        name: "Absol Lv.X",
        set: "jungle",
        rarity: "rare",
        pokemonId: 359,
        number: "101/122",
        description: "Jungle - Rare"
    },
    {
        id: 5,
        name: "Absol Prime",
        set: "base",
        rarity: "holo",
        pokemonId: 359,
        number: "85/95",
        description: "Base Set 2 - Holo Rare"
    },
    {
        id: 6,
        name: "Absol V",
        set: "fossil",
        rarity: "uncommon",
        pokemonId: 359,
        number: "78/100",
        description: "Fossil - Uncommon"
    },
    {
        id: 7,
        name: "Absol VSTAR",
        set: "base",
        rarity: "holo",
        pokemonId: 359,
        number: "112/125",
        description: "Base Set - Holo Rare"
    },
    {
        id: 8,
        name: "Absol VMAX",
        set: "team-rocket",
        rarity: "rare",
        pokemonId: 359,
        number: "156/165",
        description: "Team Rocket - Rare"
    }
];

// Função para gerar URL da imagem com fallback
function getImageUrl(card, type = 'card') {
    // Para diferentes tamanhos de imagem baseado no tipo
    const sizes = {
        card: '300x400',
        hero: '400x500',
        silhouette: '400x500'
    };
    
    const size = sizes[type] || sizes.card;
    const colors = {
        card: '6b4f8c',
        hero: '6b4f8c',
        silhouette: '2c3e50'
    };
    const color = colors[type] || colors.card;
    
    // Primeira opção: PokeAPI (apenas para cards)
    if (type === 'card') {
        return `${IMAGE_CONFIG.pokeApi}${card.pokemonId}.png`;
    }
    
    // Fallback: placeholder personalizado
    return `${IMAGE_CONFIG.placeholder}${card.name.replace(' ', '+')}?colors=${color}&size=${size}`;
}

// Função para lidar com erro de imagem
function handleImageError(img, card, type = 'card') {
    const sizes = {
        card: '300x400',
        hero: '400x500',
        silhouette: '400x500'
    };
    const colors = {
        card: '6b4f8c',
        hero: '6b4f8c',
        silhouette: '2c3e50'
    };
    
    const size = sizes[type];
    const color = colors[type];
    const text = encodeURIComponent(card.name);
    
    img.src = `https://via.placeholder.com/${size}/${color}/ffffff?text=${text}`;
    img.onerror = null; // Previne loop infinito
}

// Gerenciamento de tema
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

// Verificar tema salvo
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcons(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcons(newTheme);
});

function updateThemeIcons(theme) {
    if (theme === 'light') {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
}

// Navegação ativa
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 300)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Renderizar cards da coleção
const cardsGrid = document.getElementById('cardsGrid');
const setFilter = document.getElementById('setFilter');
const rarityFilter = document.getElementById('rarityFilter');
const searchInput = document.getElementById('searchInput');

function renderCards(cards) {
    cardsGrid.innerHTML = '';
    
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card-item';
        
        const imgUrl = getImageUrl(card, 'card');
        
        cardElement.innerHTML = `
            <img src="${imgUrl}" 
                 alt="${card.name}" 
                 class="card-image"
                 onerror="this.onerror=null; this.src='https://via.placeholder.com/300x400/6b4f8c/ffffff?text=${encodeURIComponent(card.name)}'">
            <div class="card-info">
                <h3 class="card-name">${card.name}</h3>
                <p class="card-set">${card.set} #${card.number}</p>
                <span class="card-rarity rarity-${card.rarity}">${card.rarity.toUpperCase()}</span>
                <p class="card-description">${card.description || ''}</p>
            </div>
        `;
        
        cardsGrid.appendChild(cardElement);
    });
}

// Filtrar cards
function filterCards() {
    const set = setFilter.value;
    const rarity = rarityFilter.value;
    const search = searchInput.value.toLowerCase();
    
    const filtered = collectionData.filter(card => {
        const matchSet = set === 'all' || card.set === set;
        const matchRarity = rarity === 'all' || card.rarity === rarity;
        const matchSearch = card.name.toLowerCase().includes(search) || 
                           (card.description && card.description.toLowerCase().includes(search));
        
        return matchSet && matchRarity && matchSearch;
    });
    
    renderCards(filtered);
}

// Event listeners para filtros
setFilter.addEventListener('change', filterCards);
rarityFilter.addEventListener('change', filterCards);
searchInput.addEventListener('input', filterCards);

// Animar números das estatísticas
function animateNumbers() {
    const stats = [
        { element: document.getElementById('totalCards'), target: collectionData.length },
        { element: document.getElementById('uniqueCards'), target: collectionData.length },
        { element: document.getElementById('rareCards'), target: collectionData.filter(c => c.rarity === 'rare' || c.rarity === 'holo').length },
        { element: document.getElementById('completeSets'), target: 3 }
    ];
    
    stats.forEach(stat => {
        if (!stat.element) return;
        
        let current = 0;
        const increment = Math.ceil(stat.target / 50); // Animação em 50 passos
        const timer = setInterval(() => {
            current += increment;
            if (current >= stat.target) {
                stat.element.textContent = stat.target;
                clearInterval(timer);
            } else {
                stat.element.textContent = current;
            }
        }, 20);
    });
}

// Pré-carregar imagens para melhor performance
function preloadImages() {
    collectionData.forEach(card => {
        const img = new Image();
        img.src = getImageUrl(card, 'card');
    });
}

// Inicialização
window.addEventListener('load', () => {
    renderCards(collectionData);
    animateNumbers();
    preloadImages();
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Adicionar estilo para as descrições dos cards
const style = document.createElement('style');
style.textContent = `
    .card-description {
        font-size: 0.8rem;
        color: var(--text-secondary);
        margin-top: 0.25rem;
        line-height: 1.4;
    }
    
    .card-image {
        background: linear-gradient(135deg, var(--primary-light), var(--secondary-light));
        min-height: 200px;
        object-fit: contain;
        padding: 1rem;
    }
    
    [data-theme="dark"] .card-image {
        background: linear-gradient(135deg, var(--primary-dark), var(--secondary-dark));
    }
`;
document.head.appendChild(style);