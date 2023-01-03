const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem('itens')) || [];

itens.forEach( (elemento) => {
    criaElemento(elemento);
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nome = evento.target.elements['nome'];
    const quantidade  = evento.target.elements['quantidade'];

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    // verificação sé o exite o elemento no array
    const existe = itens.find( elemento => elemento.nome === nome.value);

    if(existe) {
        itemAtual.id = existe.id;
        atualizaElemento(itemAtual);
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;

    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1: 0;

        criaElemento(itemAtual);

        itens.push(itemAtual);
    }  

    // colocando no armazenamento local  
    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "";
    quantidade.value = "";

})

// função de criar o elemento visual
function criaElemento (item) {
    const novoItem = document.createElement('li');  // criando um elemnto de <li>
    novoItem.classList.add('item'); // adicionando classe 'item' a <li>

    // criando elemento na página
    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem); // adicionando a teg <strong> em <li>

    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id));
    
    lista.appendChild(novoItem);  // adicionando o elemento na lista da teg <ul>
}

function atualizaElemento (item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerHTML = "X";
    elementoBotao.addEventListener("click", function() {
        dletaElemento(this.parentNode, id);     // elemento filho que remove o parente acima.
    })

    return elementoBotao;
}

function dletaElemento(elemento, id) {
    elemento.remove();

    // remover item do array
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);
    
    localStorage.setItem("itens", JSON.stringify(itens));
}
