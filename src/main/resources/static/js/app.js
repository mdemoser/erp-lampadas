document.addEventListener('DOMContentLoaded', function() {
    // Navegação entre páginas
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            loadPage(page);
            
            // Atualiza o link ativo
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Carrega a página inicial
    loadPage('dashboard');
});

async function loadPage(page) {
    const content = document.getElementById('content');
    
    try {
        let html = '';
        
        switch(page) {
            case 'dashboard':
                html = await loadDashboard();
                break;
            case 'produtos':
                html = await loadProdutos();
                break;
            // Adicionar outros casos para clientes, vendas, etc.
            default:
                html = '<h2>Página não encontrada</h2>';
        }
        
        content.innerHTML = html;
        
        // Adiciona eventos após carregar o conteúdo
        if (page === 'produtos') {
            setupProdutosEvents();
        }
    } catch (error) {
        console.error('Erro ao carregar página:', error);
        content.innerHTML = '<p>Erro ao carregar a página. Tente novamente.</p>';
    }
}

async function loadDashboard() {
    // Simula carregamento de dados
    const response = await fetch('/api/produtos');
    const produtos = await response.json();
    
    return `
        <h2>Dashboard</h2>
        <div class="card">
            <h3>Resumo</h3>
            <p>Total de produtos: ${produtos.length}</p>
            <!-- Adicionar mais estatísticas -->
        </div>
        <div class="card">
            <h3>Produtos com baixo estoque</h3>
            <ul>
                ${produtos.filter(p => p.estoque < 10).map(p => `
                    <li>${p.nome} - ${p.estoque} unidades</li>
                `).join('')}
            </ul>
        </div>
    `;
}

async function loadProdutos() {
    const response = await fetch('/api/produtos');
    const produtos = await response.json();
    
    return `
        <div class="card">
            <h2>Produtos</h2>
            <button id="novo-produto">Novo Produto</button>
            
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Tipo</th>
                        <th>Preço</th>
                        <th>Estoque</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    ${produtos.map(produto => `
                        <tr>
                            <td>${produto.nome}</td>
                            <td>${produto.tipo}</td>
                            <td>R$ ${produto.preco.toFixed(2)}</td>
                            <td>${produto.estoque}</td>
                            <td>
                                <button class="editar" data-id="${produto.id}">Editar</button>
                                <button class="excluir" data-id="${produto.id}">Excluir</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        
        <!-- Modal para novo/editar produto -->
        <div id="produto-modal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h3 id="modal-title">Novo Produto</h3>
                <form id="produto-form">
                    <input type="hidden" id="produto-id">
                    <div class="form-group">
                        <label for="nome">Nome:</label>
                        <input type="text" id="nome" required>
                    </div>
                    <div class="form-group">
                        <label for="tipo">Tipo:</label>
                        <select id="tipo" required>
                            <option value="LED">LED</option>
                            <option value="Fluorescente">Fluorescente</option>
                            <option value="Incandescente">Incandescente</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="preco">Preço:</label>
                        <input type="number" id="preco" step="0.01" required>
                    </div>
                    <div class="form-group">
                        <label for="estoque">Estoque:</label>
                        <input type="number" id="estoque" required>
                    </div>
                    <button type="submit">Salvar</button>
                </form>
            </div>
        </div>
    `;
}

function setupProdutosEvents() {
    // Novo produto
    document.getElementById('novo-produto').addEventListener('click', () => {
        openProdutoModal();
    });
    
    // Editar produto
    document.querySelectorAll('.editar').forEach(btn => {
        btn.addEventListener('click', async function() {
            const id = this.getAttribute('data-id');
            const response = await fetch(`/api/produtos/${id}`);
            const produto = await response.json();
            
            openProdutoModal(produto);
        });
    });
    
    // Excluir produto
    document.querySelectorAll('.excluir').forEach(btn => {
        btn.addEventListener('click', async function() {
            const id = this.getAttribute('data-id');
            if (confirm('Tem certeza que deseja excluir este produto?')) {
                await fetch(`/api/produtos/${id}`, { method: 'DELETE' });
                loadPage('produtos'); // Recarrega a lista
            }
        });
    });
    
    // Formulário de produto
    document.getElementById('produto-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const produto = {
            nome: document.getElementById('nome').value,
            tipo: document.getElementById('tipo').value,
            preco: parseFloat(document.getElementById('preco').value),
            estoque: parseInt(document.getElementById('estoque').value)
        };
        
        const id = document.getElementById('produto-id').value;
        const url = id ? `/api/produtos/${id}` : '/api/produtos';
        const method = id ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
        });
        
        if (response.ok) {
            closeProdutoModal();
            loadPage('produtos'); // Recarrega a lista
        }
    });
}

function openProdutoModal(produto = null) {
    const modal = document.getElementById('produto-modal');
    const title = document.getElementById('modal-title');
    const form = document.getElementById('produto-form');
    
    if (produto) {
        title.textContent = 'Editar Produto';
        document.getElementById('produto-id').value = produto.id;
        document.getElementById('nome').value = produto.nome;
        document.getElementById('tipo').value = produto.tipo;
        document.getElementById('preco').value = produto.preco;
        document.getElementById('estoque').value = produto.estoque;
    } else {
        title.textContent = 'Novo Produto';
        form.reset();
        document.getElementById('produto-id').value = '';
    }
    
    modal.style.display = 'block';
}

function closeProdutoModal() {
    document.getElementById('produto-modal').style.display = 'none';
}