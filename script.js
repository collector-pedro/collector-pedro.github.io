// script.js

// Dados da coleção (exemplo)
const collectionData = [
    {
        id: 1,
        name: "Absol",
        set: "base",
        rarity: "holo",
        image: "https://via.placeholder.com/300x400/6b4f8c/ffffff?text=Absol+Base",
        number: "1/102"
    },
    {
        id: 2,
        name: "Absol EX",
        set: "team-rocket",
        rarity: "rare",
        image: "https://via.placeholder.com/300x400/9b7bb5/ffffff?text=Absol+EX",
        number: "97/109"
    },
    {
        id: 3,
        name: "Absol GX",
        set: "fossil",
        rarity: "holo",
        image: "https://via.placeholder.com/300x400/ff6b6b/ffffff?text=Absol+GX",
        number: "45/62"
    },
    {
        id: 4,
        name: "Absol Lv.X",
        set: "jungle",
        rarity: "rare",
        image: "https://via.placeholder.com/300x400/6b4f8c/ffffff?text=Absol+Lv.X",
        number: "101/122"
    },
    {
        id: 5,
        name: "Absol Prime",
        set: "base",
        rarity: "holo",
        image: "https://via.placeholder.com/300x400/9b7bb5/ffffff?text=Absol+Prime",
        number: "85/95"
    },
    {
        id: 6,
        name: "Absol V",
        set: "fossil",
        rarity: "uncommon",
        image: "https://via.placeholder.com/300x400/ff6b6b/ffffff?text=Absol+V",
        number: "78/100"
    }
];

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
        cardElement.innerHTML = `
            <img src="${card.image}" alt="${card.name}" class="card-image">
            <div class="card-info">
                <h3 class="card-name">${card.name}</h3>
                <p class="card-set">${card.set} #${card.number}</p>
                <span class="card-rarity rarity-${card.rarity}">${card.rarity.toUpperCase()}</span>
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
        const matchSearch = card.name.toLowerCase().includes(search);
        
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
        { element: document.getElementById('totalCards'), target: 1250 },
        { element: document.getElementById('uniqueCards'), target: 850 },
        { element: document.getElementById('rareCards'), target: 320 },
        { element: document.getElementById('completeSets'), target: 12 }
    ];
    
    stats.forEach(stat => {
        let current = 0;
        const increment = stat.target / 50; // Animação em 50 passos
        const timer = setInterval(() => {
            current += increment;
            if (current >= stat.target) {
                stat.element.textContent = stat.target;
                clearInterval(timer);
            } else {
                stat.element.textContent = Math.floor(current);
            }
        }, 20);
    });
}

// Iniciar animação quando a página carregar
window.addEventListener('load', () => {
    renderCards(collectionData);
    animateNumbers();
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

// Efeito de hover nos cards
cardsGrid.addEventListener('mouseover', (e) => {
    const card = e.target.closest('.card-item');
    if (card) {
        card.style.transform = 'translateY(-4px)';
        card.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
    }
});

cardsGrid.addEventListener('mouseout', (e) => {
    const card = e.target.closest('.card-item');
    if (card) {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'var(--shadow)';
    }
});