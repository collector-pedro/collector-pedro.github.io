// Configuração da API
const API_BASE = 'https://api.pokemontcg.io/v2';
const API_KEY = '6acad21f04e5574fed6c7fe4dd4de3728aa2a712cfda499f9858c8371b56cad0'; // Opcional - sem chave dá 1000 requests/dia

// Dados dos Sets (agora com IDs oficiais da API)
const setsData = [
    {
        id: 'base1', // ID oficial da API para Base Set
        name: 'Base Set',
        year: '1999',
        cardCount: 102,
        description: 'A edição que começou tudo',
        apiSetId: 'base1'
    },
    {
        id: 'base3', // ID oficial para Fossil
        name: 'Fossil',
        year: '1999',
        cardCount: 62,
        description: 'Pokémon pré-históricos',
        apiSetId: 'base3'
    },
    {
        id: 'base2', // ID oficial para Jungle
        name: 'Jungle',
        year: '1999',
        cardCount: 64,
        description: 'Aventura na selva',
        apiSetId: 'base2'
    }
];

// Função para buscar imagem do set da API
async function fetchSetImage(setId) {
    try {
        const response = await fetch(`${API_BASE}/sets/${setId}`);
        const data = await response.json();
        // Retorna a imagem do símbolo do set ou uma imagem padrão
        return data.data.images.symbol || data.data.images.logo;
    } catch (error) {
        console.error('Erro ao buscar imagem do set:', error);
        // Fallback para imagem SVG genérica
        return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23ff6b6b"/><text x="50" y="120" font-family="Arial" font-size="24" fill="white" font-weight="bold">${setId}</text></svg>`;
    }
}

// Função para buscar cartas em destaque da API
async function fetchFeaturedCards() {
    try {
        // Busca cartas famosas dos sets clássicos
        const response = await fetch(`${API_BASE}/cards?q=set.id:base1 OR set.id:base2 OR set.id:base3&pageSize=6&orderBy=number`);
        const data = await response.json();
        
        return data.data.map(card => ({
            name: card.name,
            number: card.number,
            set: card.set.name,
            image: card.images.small,
            id: card.id
        }));
    } catch (error) {
        console.error('Erro ao buscar cartas:', error);
        // Fallback para dados locais
        return getLocalFeaturedCards();
    }
}

// Fallback local caso a API falhe
function getLocalFeaturedCards() {
    return [
        { name: 'Charizard', number: '4/102', set: 'Base Set', image: '' },
        { name: 'Blastoise', number: '2/102', set: 'Base Set', image: '' },
        { name: 'Venusaur', number: '15/102', set: 'Base Set', image: '' },
        { name: 'Dragonite', number: '4/62', set: 'Fossil', image: '' },
        { name: 'Aerodactyl', number: '16/62', set: 'Fossil', image: '' },
        { name: 'Pikachu', number: '58/64', set: 'Jungle', image: '' }
    ];
}

// Função principal para criar cards dos sets (agora assíncrona)
async function createSetCards() {
    const setsGrid = document.getElementById('setsGrid');
    setsGrid.innerHTML = '<div class="loading">Carregando sets...</div>';
    
    try {
        const setsWithImages = await Promise.all(
            setsData.map(async (set) => {
                const imageUrl = await fetchSetImage(set.apiSetId);
                return { ...set, image: imageUrl };
            })
        );
        
        setsGrid.innerHTML = '';
        
        setsWithImages.forEach(set => {
            const card = document.createElement('div');
            card.className = 'set-card';
            card.onclick = () => window.location.href = `${set.id}.html`;
            
            card.innerHTML = `
                <img src="${set.image}" alt="${set.name}" class="set-image" 
                     onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'300\\' height=\\'200\\' viewBox=\\'0 0 300 200\\'><rect width=\\'300\\' height=\\'200\\' fill=\\'%23ff6b6b\\'/><text x=\\'50\\' y=\\'120\\' font-family=\\'Arial\\' font-size=\\'24\\' fill=\\'white\\' font-weight=\\'bold\\'>${set.name}</text></svg>'">
                <div class="set-info">
                    <h3 class="set-name">${set.name}</h3>
                    <p class="set-year"><i class="far fa-calendar-alt"></i> ${set.year}</p>
                    <p style="color: var(--text-secondary); margin: 0.5rem 0;">${set.description}</p>
                    <span class="set-badge">${set.cardCount} cartas</span>
                </div>
            `;
            
            setsGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao criar cards:', error);
        setsGrid.innerHTML = '<p style="text-align: center; color: red;">Erro ao carregar sets. Tente novamente mais tarde.</p>';
    }
}

// Função para criar cards em destaque (agora assíncrona)
async function createFeaturedCards() {
    const featuredGrid = document.getElementById('featuredGrid');
    featuredGrid.innerHTML = '<div class="loading">Carregando cartas em destaque...</div>';
    
    try {
        const cards = await fetchFeaturedCards();
        
        featuredGrid.innerHTML = '';
        
        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'featured-card';
            
            cardElement.innerHTML = `
                <img src="${card.image || 'https://via.placeholder.com/200x150/ff6b6b/ffffff?text=Carregando...'}" 
                     alt="${card.name}"
                     onerror="this.src='https://via.placeholder.com/200x150/ff6b6b/ffffff?text=${card.name.replace(' ', '+')}'">
                <div class="featured-card-info">
                    <h4 class="featured-card-name">${card.name}</h4>
                    <p class="featured-card-number">${card.number}</p>
                    <small style="color: var(--accent-primary);">${card.set}</small>
                </div>
            `;
            
            featuredGrid.appendChild(cardElement);
        });
    } catch (error) {
        console.error('Erro ao criar cards em destaque:', error);
        featuredGrid.innerHTML = '<p style="text-align: center; color: red;">Erro ao carregar cartas em destaque.</p>';
    }
}

// Modifique a inicialização para funções assíncronas
document.addEventListener('DOMContentLoaded', async () => {
    await createSetCards();
    await createFeaturedCards();
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimation();
});