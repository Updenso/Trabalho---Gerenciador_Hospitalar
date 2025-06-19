// server.js
import express from 'express';
import routes from './src/router/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear o corpo das requisições como JSON
app.use(express.json());

// Configura as rotas da aplicação
routes(app);

// Rota padrão para testar se o servidor está funcionando
app.get('/', (req, res) => {
    res.send('Servidor Express funcionando! Acesse /api/visualizarPaciente, /api/visualizarAgendamento ou /api/visualizarProfissional.');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});