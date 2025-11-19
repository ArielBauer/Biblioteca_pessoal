const form = document.getElementById("form");
const div = document.getElementById("botaoNota");
let lista = document.getElementById("lista");

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

    // Botão de excluir
    const botao = document.createElement("button");
    botao.textContent = 'Excluir';
    botao.style.marginLeft = '10px';
    li.appendChild(botao);

    // Listener do botão
    botao.addEventListener("click", async () => {
      await deletarLivro(u.id);
      li.remove();
    });
    
    // Infos do livro
    const ul = document.createElement("ul");
    ul.style.marginLeft = '15px';
    li.appendChild(ul);

    const li2 = document.createElement("li");
    li2.textContent = `Autor(a): ${u.autor}`;
    ul.appendChild(li2);

    const li3 = document.createElement("li");
    li3.textContent = `Id: ${u.id}`;
    ul.appendChild(li3);
  });
  
  // 
  let idLivro = document.getElementById("livroFK").value;
  let nomeLivro = document.getElementById("nomeLivro");
  function procuraLivro(){
    for(let i = 0; i < livros.length; i++){
      if(livros[i].id == idLivro){
        nomeLivro.innerHTML = livros[i].titulo;
        i=livros.length;
      }};
  };
  procuraLivro();
};

// Função para deletar o livro
async function deletarLivro(id){
  try {
    const response = await fetch(`/livros/${id}`, {
      method: "DELETE"
    });

    if(response.ok){
      console.log("Livro deletado");
    }else{
      console.log("Erro", response.status);
    }
  } catch (err){
    console.log(err);
  };
};


// Função para carregar notas
async function carregarNotas(){
  const resposta = await fetch("/notas");
  const notas = await resposta.json();
  console.log(notas);

  // let idLivro = document.getElementById("livroFK").value;

  let lista = document.getElementById("listaNotas");
  lista.innerHTML = ' '; // Limpa a lista
  // Adiciona notas já cadastradas a lista
  notas.forEach((u) => {
    const li = document.createElement("li");
    li.textContent = `Id do livro: ${u.livroFK}`
    li.style.marginTop = '15px';
    lista.appendChild(li);

    // Botão de excluir
    const botao = document.createElement("button");
    botao.textContent = 'Excluir';
    botao.style.marginLeft = '10px';
    li.appendChild(botao);

    // Listener do botão
    botao.addEventListener("click", async () => {
      await deletarNota(u.id);
      li.remove();
    });

    const ul = document.createElement("ul");
    ul.style.marginLeft = '15px';
    li.appendChild(ul);

    const li2 = document.createElement("li");
    li2.textContent = `Nota: ${u.nota}`
    if(u.avaliacao == null){
    }else{
      const li3 = document.createElement("li");
      li3.textContent = `Avaliação escrita: ${u.avaliacao}`
      ul.appendChild(li3);
    };
  });
};

// Função para deletar a nota
async function deletarNota(id){
  try {
    const response = await fetch(`/notas/${id}`, {
      method: "DELETE"
    });

    if(response.ok){
      console.log("Nota deletada");
    }else{
      console.log("Erro", response.status);
    }
  } catch (err){
    console.log(err);
  };
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

// Função para enviar nova nota
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