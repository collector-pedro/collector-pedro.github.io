// Estado da aplicação
let todasAsCartas = [];
let cartasFiltradas = [];

// Elementos do DOM
const container = document.getElementById('cartas-container');
const buscaInput = document.getElementById('busca');
const filtroTipo = document.getElementById('filtro-tipo');

// Carrega as cartas do arquivo JSON
async function carregarCartas() {
    try {
        const resposta = await fetch('dados.json');
        const dados = await resposta.json();
        todasAsCartas = dados.cartas;
        cartasFiltradas = [...todasAsCartas];
        renderizarCartas();
    } catch (erro) {
        console.error('Erro ao carregar cartas:', erro);
        container.innerHTML = '<p style="text-align: center;">Erro ao carregar as cartas. Tente novamente mais tarde.</p>';
    }
}

// Renderiza as cartas na tela
function renderizarCartas() {
    if (!cartasFiltradas || cartasFiltradas.length === 0) {
        container.innerHTML = '<p style="text-align: center;">Nenhuma carta encontrada.</p>';
        return;
    }

    container.innerHTML = cartasFiltradas.map(carta => `
        <div class="carta-card" data-id="${carta.id}">
            <img class="carta-imagem" src="${carta.imagem}" alt="${carta.nome}" loading="lazy">
            <div class="carta-info">
                <div class="carta-nome">${carta.nome}</div>
                <div>
                    <span class="carta-tipo tipo-${carta.tipo}">${carta.tipo}</span>
                    <span class="carta-numero">${carta.numero}</span>
                </div>
                <div style="margin-top: 0.5rem; color: #e33535; font-weight: bold;">
                    Quantidade: ${carta.quantidade}
                </div>
            </div>
        </div>
    `).join('');
}

// Filtra as cartas baseado na busca e no tipo selecionado
function filtrarCartas() {
    const termoBusca = buscaInput.value.toLowerCase();
    const tipoSelecionado = filtroTipo.value;

    cartasFiltradas = todasAsCartas.filter(carta => {
        const matchBusca = carta.nome.toLowerCase().includes(termoBusca);
        const matchTipo = tipoSelecionado === 'todos' || carta.tipo === tipoSelecionado;
        return matchBusca && matchTipo;
    });

    renderizarCartas();
}

// Event listeners
buscaInput.addEventListener('input', filtrarCartas);
filtroTipo.addEventListener('change', filtrarCartas);

// Inicia a aplicação
carregarCartas();