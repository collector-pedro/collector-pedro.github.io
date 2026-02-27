// Dados da coleção
const collectionData = [
    { id: 1, name: "Absol", set: "base", rarity: "rare", number: "1/102" },
    { id: 2, name: "Absol EX", set: "base", rarity: "rare", number: "97/109" },
    { id: 3, name: "Absol GX", set: "fossil", rarity: "holo", number: "45/62" },
    { id: 4, name: "Absol Lv.X", set: "fossil", rarity: "rare", number: "101/122" },
    { id: 5, name: "Absol Prime", set: "base", rarity: "holo", number: "85/95" },
    { id: 6, name: "Absol V", set: "fossil", rarity: "uncommon", number: "78/100" }
];

// Tema
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️';

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
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
        cardElement.innerHTML = `
            <div class="card-placeholder-small">🎴</div>
            <div class="card-info">
                <h3 class="card-name">${card.name}</h3>
                <p class="card-set">${card.set} #${card.number}</p>
                <span class="card-rarity">${card.rarity.toUpperCase()}</span>
            </div>
        `;
        cardsGrid.appendChild(cardElement);
    });
}

function filterCards() {
    const set = setFilter.value;
    const rarity = rarityFilter.value;
    const search = searchInput.value.toLowerCase();
    
    const filtered = collectionData.filter(card => {
        return (set === 'all' || card.set === set) &&
               (rarity === 'all' || card.rarity === rarity) &&
               card.name.toLowerCase().includes(search);
    });
    
    renderCards(filtered);
}

setFilter.addEventListener('change', filterCards);
rarityFilter.addEventListener('change', filterCards);
searchInput.addEventListener('input', filterCards);

// Estatísticas
function updateStats() {
    document.getElementById('totalCards').textContent = collectionData.length;
    document.getElementById('uniqueCards').textContent = collectionData.length;
    document.getElementById('rareCards').textContent = collectionData.filter(c => c.rarity === 'rare' || c.rarity === 'holo').length;
    document.getElementById('completeSets').textContent = 2;
}

// Inicialização
window.addEventListener('load', () => {
    renderCards(collectionData);
    updateStats();
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});