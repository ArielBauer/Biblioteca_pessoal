
function carregaDados () {

let url = `http://localhost:3000/livros`;

  fetch(url)
    .then((response) => {
      return response.json();
    })

    .then((data) => {
      console.log(data)
    })
    
    .catch((error) => {
      console.log("erro no carregamento de dados");
    });

};

carregaDados();