// Configuração dos sets
const setsData = [
    {
        id: 'base-set',
        name: 'Base Set',
        year: '1999',
        image: 'images/sets/base-set.png', // Você precisa criar essa imagem
        cardCount: 102,
        description: 'A edição que começou tudo',
        folder: 'base-set',
        prefix: 'BS' // Prefixo usado nos arquivos (ex: Abra_BS_43)
    },
    {
        id: 'fossil',
        name: 'Fossil',
        year: '1999',
        image: 'images/sets/fossil.png',
        cardCount: 62,
        description: 'Pokémon pré-históricos',
        folder: 'fossil',
        prefix: 'FO' // Ajuste conforme seus arquivos
    },
    {
        id: 'jungle',
        name: 'Jungle',
        year: '1999',
        image: 'images/sets/jungle.png',
        cardCount: 64,
        description: 'Aventura na selva',
        folder: 'jungle',
        prefix: 'JU' // Ajuste conforme seus arquivos
    }
];

// Função para criar cards dos sets na página inicial
function createSetCards() {
    const setsGrid = document.getElementById('setsGrid');
    if (!setsGrid) return;
    
    setsGrid.innerHTML = '';
    
    setsData.forEach(set => {
        const card = document.createElement('div');
        card.className = 'set-card';
        card.onclick = () => window.location.href = `${set.id}.html`;
        
        // Fallback colorido caso a imagem do set não exista
        const fallbackColor = set.id === 'base-set' ? '#ff6b6b' : 
                             set.id === 'fossil' ? '#4ecdc4' : '#45b7d1';
        
        card.innerHTML = `
            <img src="${set.image}" 
                 alt="${set.name}" 
                 class="set-image"
                 onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'300\\' height=\\'200\\' viewBox=\\'0 0 300 200\\'><rect width=\\'300\\' height=\\'200\\' fill=\\'${fallbackColor}\\'/><text x=\\'50\\' y=\\'120\\' font-family=\\'Arial\\' font-size=\\'24\\' fill=\\'white\\' font-weight=\\'bold\\'>${set.name}</text></svg>'">
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

// Função para listar cartas de um set específico
async function listCardsFromSet(setId) {
    const set = setsData.find(s => s.id === setId);
    if (!set) return [];
    
    // Aqui você pode:
    // Opção 1: Listar arquivos via API (mais dinâmico)
    // Opção 2: Ter um arquivo JSON com a lista (mais controlado)
    // Opção 3: Gerar dinamicamente (recomendo a 2 ou 3)
    
    // Por enquanto, vamos simular com base no prefixo
    const cards = [];
    const totalCards = set.cardCount;
    
    for (let i = 1; i <= totalCards; i++) {
        // Formato: Nome_Set_Numero.jpg
        // Exemplo: Abra_BS_43.jpg
        const numero = i.toString().padStart(3, '0');
        cards.push({
            name: `Carta ${i}`, // Idealmente você teria os nomes reais
            number: `${i}/${totalCards}`,
            image: `images/cards/${set.folder}/${set.prefix}_${numero}.jpg`,
            set: set.name
        });
    }
    
    return cards;
}

// Função para criar a grade de cartas em uma página de set
async function createSetPage(setId) {
    const cardsGrid = document.getElementById('cardsGrid');
    if (!cardsGrid) return;
    
    cardsGrid.innerHTML = '<div class="loading">Carregando cartas...</div>';
    
    const set = setsData.find(s => s.id === setId);
    if (!set) {
        cardsGrid.innerHTML = '<p>Set não encontrado</p>';
        return;
    }
    
    // Atualiza título da página
    document.getElementById('setTitle').textContent = set.name;
    document.getElementById('setDescription').textContent = set.description;
    
    const cards = await listCardsFromSet(setId);
    
    cardsGrid.innerHTML = '';
    
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card-carta';
        
        cardElement.innerHTML = `
            <div class="card-imagem">
                <img src="${card.image}" 
                     alt="${card.name}"
                     loading="lazy"
                     onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'200\\' height=\\'280\\' viewBox=\\'0 0 200 280\\'><rect width=\\'200\\' height=\\'280\\' fill=\\'%23cccccc\\'/><text x=\\'20\\' y=\\'140\\' font-family=\\'Arial\\' font-size=\\'14\\' fill=\\'%23333\\'>${card.name}</text></svg>'">
            </div>
            <div class="card-info">
                <h3>${card.name}</h3>
                <p class="card-numero">${card.number}</p>
            </div>
        `;
        
        cardsGrid.appendChild(cardElement);
    });
}

// Função para criar cards em destaque na página inicial
function createFeaturedCards() {
    const featuredGrid = document.getElementById('featuredGrid');
    if (!featuredGrid) return;
    
    // Cartas famosas para destaque (com seus nomes reais)
    const featuredCards = [
        { name: 'Charizard', set: 'Base Set', numero: '4', setFolder: 'base-set', prefix: 'BS' },
        { name: 'Blastoise', set: 'Base Set', numero: '2', setFolder: 'base-set', prefix: 'BS' },
        { name: 'Venusaur', set: 'Base Set', numero: '15', setFolder: 'base-set', prefix: 'BS' },
        { name: 'Dragonite', set: 'Fossil', numero: '4', setFolder: 'fossil', prefix: 'FO' },
        { name: 'Aerodactyl', set: 'Fossil', numero: '16', setFolder: 'fossil', prefix: 'FO' },
        { name: 'Pikachu', set: 'Jungle', numero: '60', setFolder: 'jungle', prefix: 'JU' }
    ];
    
    featuredGrid.innerHTML = '';
    
    featuredCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'featured-card';
        
        // Monta o caminho da imagem
        const numeroFormatado = card.numero.padStart(3, '0');
        const imagePath = `images/cards/${card.setFolder}/${card.prefix}_${numeroFormatado}.jpg`;
        
        cardElement.innerHTML = `
            <img src="${imagePath}" 
                 alt="${card.name}"
                 loading="lazy"
                 onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'200\\' height=\\'150\\' viewBox=\\'0 0 200 150\\'><rect width=\\'200\\' height=\\'150\\' fill=\\'%23${Math.floor(Math.random()*16777215).toString(16)}\\'/><text x=\\'20\\' y=\\'80\\' font-family=\\'Arial\\' font-size=\\'16\\' fill=\\'white\\'>${card.name}</text></svg>'">
            <div class="featured-card-info">
                <h4 class="featured-card-name">${card.name}</h4>
                <p class="featured-card-number">${card.numero}</p>
                <small style="color: var(--accent-primary);">${card.set}</small>
            </div>
        `;
        
        featuredGrid.appendChild(cardElement);
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Detecta se é página de set ou página inicial
    if (document.getElementById('cardsGrid')) {
        // É uma página de set - pega o ID da URL
        const pathParts = window.location.pathname.split('/');
        const pageName = pathParts[pathParts.length - 1].replace('.html', '');
        createSetPage(pageName);
    } else {
        // É a página inicial
        createSetCards();
        createFeaturedCards();
    }
    
    // Inicializa outras funcionalidades
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimation();
});

// Mantenha suas outras funções (theme toggle, mobile menu, etc.) iguais