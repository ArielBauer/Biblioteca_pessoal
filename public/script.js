
let lista = document.getElementById("lista");

// Função para carregar livros
async function carregarLivros() {
  const resposta = await fetch("/livros");
  const livros = await resposta.json();
  console.log(livros);

  //Adiciona livros já cadastrados a lista
  livros.forEach((u) => {
    const li = document.createElement("li");
    li.textContent = u.titulo;
    lista.appendChild(li);
    const ul = document.createElement("ul");
    ul.textContent = " "
    li.appendChild(ul);
    const li2 = document.createElement("li");
    li2.textContent = `Autor(a): ${u.autor}`;
    ul.appendChild(li2);
    const li3 = document.createElement("li");
    li3.textContent = `Total de páginas: ${u.paginas_total}`;
    ul.appendChild(li3);
  });;
};

// Carrega ao abrir a página
carregarLivros();