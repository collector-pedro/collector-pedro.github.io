// Dados dos Sets
const setsData = [
    {
        id: 'base-set',
        name: 'Base Set',
        year: '1999',
        image: 'https://via.placeholder.com/300x200/ff6b6b/ffffff?text=Base+Set',
        cardCount: 102,
        description: 'A edição que começou tudo'
    },
    {
        id: 'fossil',
        name: 'Fossil',
        year: '1999',
        image: 'https://via.placeholder.com/300x200/4ecdc4/ffffff?text=Fossil',
        cardCount: 62,
        description: 'Pokémon pré-históricos'
    },
    {
        id: 'jungle',
        name: 'Jungle',
        year: '1999',
        image: 'https://via.placeholder.com/300x200/45b7d1/ffffff?text=Jungle',
        cardCount: 64,
        description: 'Aventura na selva'
    }
];

// Dados das cartas em destaque
const featuredCardsData = [
    { name: 'Charizard', number: '4/102', set: 'Base Set', image: 'https://via.placeholder.com/200x150/f6d365/ffffff?text=Charizard' },
    { name: 'Blastoise', number: '2/102', set: 'Base Set', image: 'https://via.placeholder.com/200x150/ff9f43/ffffff?text=Blastoise' },
    { name: 'Venusaur', number: '15/102', set: 'Base Set', image: 'https://via.placeholder.com/200x150/ff6b6b/ffffff?text=Venusaur' },
    { name: 'Dragonite', number: '4/62', set: 'Fossil', image: 'https://via.placeholder.com/200x150/4ecdc4/ffffff?text=Dragonite' },
    { name: 'Aerodactyl', number: '16/62', set: 'Fossil', image: 'https://via.placeholder.com/200x150/45b7d1/ffffff?text=Aerodactyl' },
    { name: 'Pikachu', number: '58/64', set: 'Jungle', image: 'https://via.placeholder.com/200x150/f9ca24/ffffff?text=Pikachu' }
];

// Função para criar cards dos sets
function createSetCards() {
    const setsGrid = document.getElementById('setsGrid');
    
    setsData.forEach(set => {
        const card = document.createElement('div');
        card.className = 'set-card';
        card.onclick = () => window.location.href = `${set.id}.html`;
        
        card.innerHTML = `
            <img src="${set.image}" alt="${set.name}" class="set-image">
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

// Função para criar cards em destaque
function createFeaturedCards() {
    const featuredGrid = document.getElementById('featuredGrid');
    
    featuredCardsData.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'featured-card';
        
        cardElement.innerHTML = `
            <img src="${card.image}" alt="${card.name}">
            <div class="featured-card-info">
                <h4 class="featured-card-name">${card.name}</h4>
                <p class="featured-card-number">${card.number}</p>
                <small style="color: var(--accent-primary);">${card.set}</small>
            </div>
        `;
        
        featuredGrid.appendChild(cardElement);
    });
}

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    // Verificar preferência salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });
}

// Mobile Menu
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Ajustar quando redimensionar a tela
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
        } else {
            navLinks.style.display = 'none';
        }
    });
}

// Smooth Scroll para links internos
function initSmoothScroll() {
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
}

// Animação de entrada dos cards
function initScrollAnimation() {
    const cards = document.querySelectorAll('.set-card, .featured-card');
    
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

// Inicializar tudo quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    createSetCards();
    createFeaturedCards();
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimation();
    
    // Loading state simulation (opcional)
    console.log('Site da coleção Pokémon TCG carregado!');
});