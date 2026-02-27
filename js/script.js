// ============================================================
// CONFIGURAÇÃO DOS SETS
// Edite aqui para adicionar/remover sets e cartas
// ============================================================

const setsData = [
    {
        id: 'base-set',
        name: 'Base Set',
        year: '1999',
        // Caminho relativo a partir da raiz do repositório
        image: 'images/cards/base-set/base-set.png',
        cardCount: 102,
        description: 'A edição que começou tudo',
        color: '#E63946',
        // Lista das cartas que você tem nesse set
        // Cada carta precisa ter um arquivo de imagem em images/cards/base-set/
        cards: [
            { name: 'Charizard',  number: '4/102',  image: 'images/cards/base-set/Charizard_BS_4.jpg' },
            { name: 'Blastoise',  number: '2/102',  image: 'images/cards/base-set/blastoise.jpg' },
            { name: 'Venusaur',   number: '15/102', image: 'images/cards/base-set/venusaur.jpg'  },
            { name: 'Pikachu',    number: '58/102', image: 'images/cards/base-set/pikachu.jpg'   },
            // Adicione mais cartas aqui seguindo o mesmo padrão
        ]
    },
    {
        id: 'fossil',
        name: 'Fossil',
        year: '1999',
        image: 'images/cards/fossil/fossil.png',
        cardCount: 62,
        description: 'Pokémon pré-históricos',
        color: '#457B9D',
        cards: [
            { name: 'Dragonite', number: '4/62',  image: 'images/cards/fossil/dragonite.jpg' },
            { name: 'Gengar',    number: '5/62',  image: 'images/cards/fossil/gengar.jpg'    },
            { name: 'Lapras',    number: '10/62', image: 'images/cards/fossil/lapras.jpg'    },
            // Adicione mais cartas aqui
        ]
    },
    {
        id: 'jungle',
        name: 'Jungle',
        year: '1999',
        image: 'images/cards/jungle/jungle.png',
        cardCount: 64,
        description: 'Aventura na selva',
        color: '#2A9D8F',
        cards: [
            { name: 'Clefable',  number: '1/64',  image: 'images/cards/jungle/clefable.jpg'  },
            { name: 'Scyther',   number: '10/64', image: 'images/cards/jungle/scyther.jpg'   },
            { name: 'Pikachu',   number: '60/64', image: 'images/cards/jungle/pikachu.jpg'   },
            // Adicione mais cartas aqui
        ]
    },
    {
        id: 'team-rocket',
        name: 'Team Rocket',
        year: '2000',
        image: 'images/cards/team-rocket/team-rocket.png',
        cardCount: 83,
        description: 'A primeira expansão dos vilões',
        color: '#6B2D8B',
        cards: [
            { name: 'Dark Charizard', number: '4/82',  image: 'images/cards/team-rocket/dark_charizard.jpg' },
            { name: 'Dark Blastoise', number: '3/82',  image: 'images/cards/team-rocket/dark_blastoise.jpg' },
            // Adicione mais cartas aqui
        ]
    }
];

// Cartas que aparecem na seção "Destaque" da página inicial
const featuredCards = [
    { name: 'Charizard',      set: 'Base Set',    image: 'images/cards/base-set/charizard.jpg',            color: '#E63946' },
    { name: 'Blastoise',      set: 'Base Set',    image: 'images/cards/base-set/blastoise.jpg',            color: '#E63946' },
    { name: 'Dragonite',      set: 'Fossil',      image: 'images/cards/fossil/dragonite.jpg',              color: '#457B9D' },
    { name: 'Scyther',        set: 'Jungle',      image: 'images/cards/jungle/scyther.jpg',                color: '#2A9D8F' },
    { name: 'Dark Charizard', set: 'Team Rocket', image: 'images/cards/team-rocket/dark_charizard.jpg',    color: '#6B2D8B' },
    { name: 'Gengar',         set: 'Fossil',      image: 'images/cards/fossil/gengar.jpg',                 color: '#457B9D' },
];

// ============================================================
// FUNÇÕES — não é necessário editar abaixo desta linha
// ============================================================

// Cria um placeholder colorido quando a imagem não carrega
function makePlaceholder(label, color) {
    const div = document.createElement('div');
    div.className = 'img-placeholder';
    div.style.background = color || '#333';
    div.innerHTML = `<span>${label.charAt(0)}</span>`;
    return div;
}

// Cria os cards dos sets na página inicial
function createSetCards() {
    const grid = document.getElementById('setsGrid');
    if (!grid) return;

    grid.innerHTML = '';

    setsData.forEach(set => {
        const card = document.createElement('div');
        card.className = 'set-card';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.addEventListener('click', () => window.location.href = set.id + '.html');
        card.addEventListener('keydown', e => { if (e.key === 'Enter') window.location.href = set.id + '.html'; });

        const imgWrap = document.createElement('div');
        imgWrap.className = 'set-card-img-wrap';
        imgWrap.style.setProperty('--set-color', set.color);

        const img = document.createElement('img');
        img.alt = set.name + ' logo';
        img.className = 'set-image';
        img.src = set.image;
        img.onerror = function () {
            this.style.display = 'none';
            imgWrap.appendChild(makePlaceholder(set.name, set.color));
        };

        imgWrap.appendChild(img);

        card.innerHTML = `
            <div class="set-info">
                <div class="set-color-tag" style="background:${set.color}"></div>
                <h3 class="set-name">${set.name}</h3>
                <p class="set-year"><i class="far fa-calendar-alt"></i> ${set.year}</p>
                <p class="set-desc">${set.description}</p>
                <span class="set-badge">${set.cardCount} cartas</span>
            </div>
        `;
        card.insertBefore(imgWrap, card.firstChild);

        grid.appendChild(card);
    });
}

// Cria os cards de destaque na página inicial
function createFeaturedCards() {
    const grid = document.getElementById('featuredGrid');
    if (!grid) return;

    grid.innerHTML = '';

    featuredCards.forEach(card => {
        const el = document.createElement('div');
        el.className = 'featured-card';

        const imgWrap = document.createElement('div');
        imgWrap.className = 'featured-img-wrap';

        const img = document.createElement('img');
        img.src = card.image;
        img.alt = card.name;
        img.onerror = function () {
            this.style.display = 'none';
            imgWrap.appendChild(makePlaceholder(card.name, card.color));
        };

        imgWrap.appendChild(img);

        const info = document.createElement('div');
        info.className = 'featured-card-info';
        info.innerHTML = `
            <h4 class="featured-card-name">${card.name}</h4>
            <small class="featured-card-set">${card.set}</small>
        `;

        el.appendChild(imgWrap);
        el.appendChild(info);
        grid.appendChild(el);
    });
}

// Preenche a página de set (ex: base-set.html, fossil.html)
function initSetPage() {
    const cardsGrid = document.getElementById('cardsGrid');
    if (!cardsGrid) return;

    // Descobre qual set é baseado no nome do arquivo na URL
    const page = window.location.pathname.split('/').pop().replace('.html', '');
    const setData = setsData.find(s => s.id === page);

    if (!setData) {
        cardsGrid.innerHTML = '<p class="loading-msg">Set não encontrado.</p>';
        return;
    }

    // Preenche o cabeçalho da página de set
    const titleEl = document.getElementById('setTitle');
    const descEl  = document.getElementById('setDescription');
    const yearEl  = document.getElementById('setYear');
    const countEl = document.getElementById('setCount');
    const coverEl = document.getElementById('setCoverImg');
    const headerEl = document.getElementById('setPageHeader');

    if (titleEl) titleEl.textContent = setData.name;
    if (descEl)  descEl.textContent  = setData.description;
    if (yearEl)  yearEl.innerHTML    = `<i class="far fa-calendar-alt"></i> ${setData.year}`;
    if (countEl) countEl.innerHTML   = `<i class="fas fa-layer-group"></i> ${setData.cardCount} cartas`;
    if (headerEl) headerEl.style.setProperty('--set-color', setData.color);
    if (coverEl) {
        coverEl.src = setData.image;
        coverEl.onerror = function() { this.style.display = 'none'; };
    }

    document.title = `${setData.name} - Pedro's TCG Collection`;

    // Renderiza as cartas
    renderCards(setData.cards, cardsGrid);

    // Busca ao vivo
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const q = this.value.toLowerCase();
            const filtered = setData.cards.filter(c => c.name.toLowerCase().includes(q));
            renderCards(filtered, cardsGrid);
        });
    }
}

function renderCards(cards, grid) {
    grid.innerHTML = '';

    if (cards.length === 0) {
        grid.innerHTML = '<p class="loading-msg">Nenhuma carta encontrada.</p>';
        return;
    }

    cards.forEach(card => {
        const el = document.createElement('div');
        el.className = 'card-item';

        const imgWrap = document.createElement('div');
        imgWrap.className = 'card-item-img';

        const img = document.createElement('img');
        img.src = card.image;
        img.alt = card.name;
        img.loading = 'lazy';
        img.onerror = function () {
            this.style.display = 'none';
            imgWrap.appendChild(makePlaceholder(card.name, '#555'));
        };

        imgWrap.appendChild(img);

        const info = document.createElement('div');
        info.className = 'card-item-info';
        info.innerHTML = `
            <span class="card-item-name">${card.name}</span>
            <span class="card-item-number">${card.number}</span>
        `;

        el.appendChild(imgWrap);
        el.appendChild(info);
        grid.appendChild(el);
    });
}

// Tema claro/escuro
function initThemeToggle() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;

    const icon = btn.querySelector('i');
    const saved = localStorage.getItem('theme');

    if (saved === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.className = 'fas fa-sun';
    }

    btn.addEventListener('click', function () {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            icon.className = 'fas fa-moon';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.className = 'fas fa-sun';
        }
    });
}

// Menu mobile
function initMobileMenu() {
    const btn     = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    if (!btn || !navLinks) return;

    btn.addEventListener('click', function () {
        navLinks.classList.toggle('open');
    });

    // Fecha ao clicar em link
    navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
}

// Scroll suave para âncoras
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Animação de entrada ao scrollar
function initScrollAnimation() {
    const items = document.querySelectorAll('.set-card, .featured-card, .card-item');
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    items.forEach(el => observer.observe(el));
}

// Init
document.addEventListener('DOMContentLoaded', function () {
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();

    // Página inicial
    createSetCards();
    createFeaturedCards();

    // Página de set
    initSetPage();

    // Animações (após render)
    setTimeout(initScrollAnimation, 100);
});
