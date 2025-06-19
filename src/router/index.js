import express from "express";
import routerPaciente from "./routerPaciente.js"; 
import routerAgendamento from "./routerAgendamento.js";
import routerProfissional from "./routerProfissional.js";

// Função que configura todas as rotas no aplicativo Express
const routes = (app) => {
    // Rota padrão para a raiz da API (ex: GET /)
    app.route('/').get((req, res) => res.status(200).send("API Node.js funcionando!"));

    // Monta os roteadores sob o prefixo '/api'
    app.use('/api', routerPaciente, routerAgendamento, routerProfissional);
};

export default routes;