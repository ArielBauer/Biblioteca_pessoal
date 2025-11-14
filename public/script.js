const form = document.getElementById("form");
let lista = document.getElementById("lista");

// Função para carregar livros
async function carregarLivros(){
  const resposta = await fetch("/livros");
  const livros = await resposta.json();
  console.log(livros);

  lista.innerHTML = ""; // Limpa a lista
  //Adiciona livros já cadastrados a lista
  livros.forEach((u) => {
    const li = document.createElement("li");
    li.textContent = u.titulo;
    li.style.marginTop = '15px';
    lista.appendChild(li);
    
    const ul = document.createElement("ul");
    ul.textContent = " "
    li.appendChild(ul);
    const li2 = document.createElement("li");
    li2.textContent = `Autor(a): ${u.autor}`;
    li2.style.marginLeft = '15px';
    li2.style.marginTop = '5px';
    ul.appendChild(li2);
    const li3 = document.createElement("li");
    li3.textContent = `Id: ${u.id}`;
    ul.appendChild(li3);
    li3.style.marginLeft = '15px';
    li3.style.marginTop = '5px';
  });
};

async function carregaNotas(){
  const resposta = await fetch("/notas");
  const notas = await resposta.json();
  console.log(notas);
};


// Função para enviar novo livro
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const autor = document.getElementById("autor").value;
  const paginas_total = document.getElementById("paginas_total").value;

  await fetch("/livros", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, autor, paginas_total }), // manda o objeto js para o banco como json
  });

  form.reset(); // limpa os campos com a função nativa para tags form
  carregarLivros(); // atualiza lista
});

// Carrega ao abrir a página
carregarLivros();
carregaNotas();