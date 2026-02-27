// Configuracao dos sets
const setsData = [
    {
        id: 'base-set',
        name: 'Base Set',
        year: '1999',
        image: 'images/sets/base-set.png',
        cardCount: 102,
        description: 'A edicao que comecou tudo',
        folder: 'base-set',
        prefix: 'BS',
        color: '#ff6b6b'
    },
    {
        id: 'fossil',
        name: 'Fossil',
        year: '1999',
        image: 'images/sets/fossil.png',
        cardCount: 62,
        description: 'Pokemon pre-historicos',
        folder: 'fossil',
        prefix: 'FO',
        color: '#4ecdc4'
    },
    {
        id: 'jungle',
        name: 'Jungle',
        year: '1999',
        image: 'images/sets/jungle.png',
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
        image: 'images/sets/team-rocket.png',
        cardCount: 83,
        description: 'A primeira expansao dos viloes',
        folder: 'team-rocket',
        prefix: 'RO',
        color: '#6c5ce7'
    }
];

function createSetCards() {
    const setsGrid = document.getElementById('setsGrid');
    if (!setsGrid) {
        console.log('Pagina de set detectada');
        return;
    }
    
    setsGrid.innerHTML = '';
    console.log('Criando cards dos sets...');
    
    for(let i = 0; i < setsData.length; i++) {
        const set = setsData[i];
        const card = document.createElement('div');
        card.className = 'set-card';
        card.onclick = function() {
            window.location.href = set.id + '.html';
        };
        
        const fallbackColor = set.color;
        const fallbackSVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="' + fallbackColor + '"/><text x="50" y="120" font-family="Arial" font-size="24" fill="white" font-weight="bold">' + set.name + '</text></svg>';
        
        card.innerHTML = 
            '<img src="' + set.image + '" alt="' + set.name + '" class="set-image" onerror="this.src=\'' + fallbackSVG + '\'">' +
            '<div class="set-info">' +
            '<h3 class="set-name">' + set.name + '</h3>' +
            '<p class="set-year"><i class="far fa-calendar-alt"></i> ' + set.year + '</p>' +
            '<p style="color: var(--text-secondary); margin: 0.5rem 0;">' + set.description + '</p>' +
            '<span class="set-badge">' + set.cardCount + ' cartas</span>' +
            '</div>';
        
        setsGrid.appendChild(card);
    }
}

function createFeaturedCards() {
    const featuredGrid = document.getElementById('featuredGrid');
    if (!featuredGrid) return;
    
    featuredGrid.innerHTML = '<div class="loading">Carregando cartas em destaque...</div>';
    
    const featuredCards = [
        { name: 'Charizard', set: 'Base Set', number: '4', setFolder: 'base-set', prefix: 'BS', color: '#ff6b6b' },
        { name: 'Blastoise', set: 'Base Set', number: '2', setFolder: 'base-set', prefix: 'BS', color: '#ff6b6b' },
        { name: 'Venusaur', set: 'Base Set', number: '15', setFolder: 'base-set', prefix: 'BS', color: '#ff6b6b' },
        { name: 'Dragonite', set: 'Fossil', number: '4', setFolder: 'fossil', prefix: 'FO', color: '#4ecdc4' },
        { name: 'Pikachu', set: 'Jungle', number: '60', setFolder: 'jungle', prefix: 'JU', color: '#45b7d1' },
        { name: 'Dark Charizard', set: 'Team Rocket', number: '4', setFolder: 'team-rocket', prefix: 'RO', color: '#6c5ce7' }
    ];
    
    featuredGrid.innerHTML = '';
    
    for(let i = 0; i < featuredCards.length; i++) {
        const card = featuredCards[i];
        const cardElement = document.createElement('div');
        cardElement.className = 'featured-card';
        
        const imagePath = 'images/cards/' + card.setFolder + '/' + card.name.replace(' ', '_') + '_' + card.prefix + '_' + card.number + '.jpg';
        const fallbackDiv = '<div style="width:100%; height:150px; background: linear-gradient(135deg, ' + card.color + ', ' + card.color + 'dd); display: flex; align-items: center; justify-content: center; border-radius: 8px 8px 0 0;"><span style="color: white; font-size: 2rem; font-weight: bold;">' + card.name.charAt(0) + '</span></div>';
        
        cardElement.innerHTML = 
            '<img src="' + imagePath + '" alt="' + card.name + '" style="width:100%; height:150px; object-fit: cover; border-radius: 8px 8px 0 0;" onerror="this.style.display=\'none\'; this.parentNode.innerHTML = \'' + fallbackDiv + '\' + this.parentNode.innerHTML;">' +
            '<div class="featured-card-info">' +
            '<h4 class="featured-card-name">' + card.name + '</h4>' +
            '<p class="featured-card-number">' + card.number + '</p>' +
            '<small style="color: var(--accent-primary);">' + card.set + '</small>' +
            '</div>';
        
        featuredGrid.appendChild(cardElement);
    }
}

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if(icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            if(icon) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            if(icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }
    });
}

function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuBtn || !navLinks) return;
    
    menuBtn.addEventListener('click', function() {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
        }
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
        } else {
            navLinks.style.display = 'none';
        }
    });
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    for(let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
}

function initScrollAnimation() {
    const cards = document.querySelectorAll('.set-card, .featured-card');
    if (cards.length === 0) return;
    
    for(let i = 0; i < cards.length; i++) {
        cards[i].style.opacity = '0';
        cards[i].style.transform = 'translateY(20px)';
        cards[i].style.transition = 'opacity 0.5s, transform 0.5s';
    }
    
    const observer = new IntersectionObserver(function(entries) {
        for(let i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
                entries[i].target.style.opacity = '1';
                entries[i].target.style.transform = 'translateY(0)';
            }
        }
    }, { threshold: 0.1 });
    
    for(let i = 0; i < cards.length; i++) {
        observer.observe(cards[i]);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, inicializando...');
    
    const path = window.location.pathname;
    console.log('Caminho atual:', path);
    
    createSetCards();
    createFeaturedCards();
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimation();
});