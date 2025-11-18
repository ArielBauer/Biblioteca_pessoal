const form = document.getElementById("form");
const div = document.getElementById("botaoNota");
let lista = document.getElementById("lista");
// let livroNome

// Função para carregar livros
async function carregarLivros(){
  const resposta = await fetch("/livros");
  const livros = await resposta.json();
  console.log(livros);

  lista.innerHTML = ' '; // Limpa a lista
  //Adiciona livros já cadastrados a lista
  livros.forEach((u) => {
    const li = document.createElement("li");
    li.textContent = u.titulo;
    li.style.marginTop = '15px';
    lista.appendChild(li);
    
    const ul = document.createElement("ul");
    ul.id = "ul"
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
  
  let idLivro = document.getElementById("livroFK").value;
  let nomeLivro = document.getElementById("nomeLivro");
  function procuraLivro(){
    for(let i = 0; i < livros.length; i++){
      if(livros[i].id == idLivro){
        nomeLivro.innerHTML = livros[i].titulo;
        // livroNome = livros[i].titulo;
        i=livros.length;
      }};
  };
  procuraLivro();
};


async function carregarNotas(){
  const resposta = await fetch("/notas");
  const notas = await resposta.json();
  console.log(notas);

  let p = document.getElementById("p");
  let idLivro = document.getElementById("livroFK").value;

  for(let i = 0; i < notas.length; i++){
    if(notas[i].livroFK == idLivro){
      p.innerHTML = `${livroNome}, ${notas[i].nota}, ${notas[i].avaliacao}`;
      i=notas.length;
    }else{p.innerHTML=' '};
  };

  let lista = document.getElementById("listaNotas");
  lista.innerHTML = ' '; // Limpa a lista

  // Adiciona notas já cadastradas a lista
  notas.forEach((u) => {
    const li = document.createElement("li");
    li.textContent = `Id do livro: ${u.livroFK}`
    li.style.marginTop = '15px';
    lista.appendChild(li);

    const ul = document.createElement("ul");
    ul.id = "ul"
    ul.textContent = " "
    li.appendChild(ul);
    const li2 = document.createElement("li");
    li2.textContent = `Nota: ${u.nota}`
    li2.style.marginLeft = '15px';
    li2.style.marginTop = '5px';
    ul.appendChild(li2);
    if(u.avaliacao == null){
    }else{
      const li3 = document.createElement("li");
      li3.textContent = `Avaliação escrita: ${u.avaliacao}`
      ul.appendChild(li3);
      li3.style.marginLeft = '15px';
      li3.style.marginTop = '5px';
    };
  });
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

div.addEventListener("submit", async (e) => {
  e.preventDefault();
  const livroFK = document.getElementById("livroFK").value;
  const nota = document.getElementById("nota").value;
  const avaliacao = document.getElementById("avaliacao").value;
  console.log(livroFK, nota, avaliacao)

  await fetch("/notas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ livroFK, nota, avaliacao }),
  });

  div.reset();
  carregarNotas();
});


// Carrega ao abrir a página
carregarLivros();
carregarNotas();