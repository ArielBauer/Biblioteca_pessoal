const express = require("express"); // Framework para criar servidor e rotas
const mysql = require("mysql2"); // Biblioteca para conectar no MySQL
const path = require("path"); // Módulo nativo do Node para lidar com caminhos

const app = express(); // Cria a aplicação Express

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Middleware para servir arquivos estáticos (HTML, CSS, JS da pasta public/)
app.use(express.static(path.join(__dirname, "public")));

// Conexão com o banco MySQL (via XAMPP)
const db = mysql.createConnection({
  host: "localhost", // Servidor do MySQL
  user: "root", // Usuário padrão do XAMPP
  password: "", // Senha (geralmente vazia no XAMPP)
  database: "biblioteca_pessoal", // Nome do banco que você criou
});

// ---------- ROTAS ----------

// GET /usuarios → retorna todos os usuários do banco
app.get("/livros", (req, res) => {
  db.query("SELECT * FROM livros", (err, results) => {
    if (err) throw err; // Se der erro na query, interrompe
    res.json(results); // Envia o resultado como JSON para o front
  });
});

app.get("/notas", (req, res) => {
  db.query("SELECT * FROM notas", (err, results) => {
    if (err) throw err; 
    res.json(results); 
  });
});


// POST /livros → insere um novo livro no banco
app.post("/livros", (req, res) => {
  const { titulo, autor, paginas_total } = req.body; // Extrai os dados enviados pelo front
  db.query(
    "INSERT INTO livros (titulo, autor, paginas_total) VALUES (?, ?, ?)", // Query SQL com placeholders
    [titulo, autor, paginas_total], // Valores que substituem os "?"
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Livro adicionado com sucesso!" }); // Retorno de sucesso
    });
});

// Inicia o servidor na porta 3000
app.listen(3000, () =>
  console.log("Servidor rodando em http://localhost:3000")
);
