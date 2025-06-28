import express from "express";
import routes from "./rotas/index.js"; // Importa a função que configura todas as rotas

// config de banco (aqui você configuraria a conexão com o seu banco de dados, ex: Mongoose.connect())

const app = express();

// Middleware para que o Express entenda requisições com corpo no formato JSON
// É importante que este middleware esteja ANTES de qualquer definição de rota que precise parsear JSON
app.use(express.json());

// Chama a função 'routes' para configurar todas as rotas no aplicativo 'app'
routes(app);

export default app;