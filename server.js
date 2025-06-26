// server.js
import express from 'express';
import routes from './src/router/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// Obter o __dirname em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para parsear o corpo das requisições como JSON
app.use(express.json());

// Configura para servir arquivos estáticos da pasta 'src/view'
app.use(express.static(path.join(__dirname, 'src', 'view')));

// Configura as rotas da aplicação (suas rotas de API)
routes(app);

// Rota padrão para redirecionar para a página de login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'view', './login.html'));
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});