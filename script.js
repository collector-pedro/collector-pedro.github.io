// script.js

// Dados da coleção
const collectionData = [
    { id: 1, name: "Absol", set: "base", rarity: "holo", number: "1/102" },
    { id: 2, name: "Absol EX", set: "team-rocket", rarity: "rare", number: "97/109" },
    { id: 3, name: "Absol GX", set: "fossil", rarity: "holo", number: "45/62" },
    { id: 4, name: "Absol Lv.X", set: "jungle", rarity: "rare", number: "101/122" },
    { id: 5, name: "Absol Prime", set: "base", rarity: "holo", number: "85/95" },
    { id: 6, name: "Absol V", set: "fossil", rarity: "uncommon", number: "78/100" },
    { id: 7, name: "Absol VSTAR", set: "base", rarity: "holo", number: "112/125" },
    { id: 8, name: "Absol VMAX", set: "team-rocket", rarity: "rare", number: "156/165" }
];

// Gerenciamento de tema
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const savedTheme = localStorage.getItem('theme') || 'light';

// Aplicar tema salvo
document.documentElement.setAttribute('data-theme', savedTheme);
themeIcon.textContent = savedTheme === 'light' ? '🌙' : '☀️';

// Alternar tema
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeIcon.textContent = newTheme === 'light' ? '🌙' : '☀️';
});

// Navegação ativa
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
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

// Renderizar cards
const cardsGrid = document.getElementById('cardsGrid');
const setFilter = document.getElementById('setFilter');
const rarityFilter = document.getElementById('rarityFilter');
const searchInput = document.getElementById('searchInput');

function renderCards(cards) {
    cardsGrid.innerHTML = '';
    
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card-item';
        
        // Escolhe um emoji diferente baseado na raridade
        let cardEmoji = '🎴';
        if (card.rarity === 'holo') cardEmoji = '✨';
        if (card.rarity === 'rare') cardEmoji = '⭐';
        if (card.name.includes('EX')) cardEmoji = '💫';
        if (card.name.includes('GX')) cardEmoji = '🌟';
        if (card.name.includes('VMAX')) cardEmoji = '⚡';
        
        cardElement.innerHTML = `
            <div class="card-image">${cardEmoji}</div>
            <div class="card-info">
                <h3 class="card-name">${card.name}</h3>
                <p class="card-set">${card.set.toUpperCase()} #${card.number}</p>
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
        const matchSearch = card.name.toLowerCase().includes(search) || 
                           card.set.toLowerCase().includes(search);
        
        return matchSet && matchRarity && matchSearch;
    });
    
    renderCards(filtered);
}

// Event listeners para filtros
setFilter.addEventListener('change', filterCards);
rarityFilter.addEventListener('change', filterCards);
searchInput.addEventListener('input', filterCards);

// Atualizar estatísticas
function updateStats() {
    document.getElementById('totalCards').textContent = collectionData.length;
    document.getElementById('uniqueCards').textContent = collectionData.length;
    document.getElementById('rareCards').textContent = collectionData.filter(c => c.rarity === 'rare' || c.rarity === 'holo').length;
    document.getElementById('completeSets').textContent = 3;
}

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Inicialização
window.addEventListener('load', () => {
    renderCards(collectionData);
    updateStats();
});