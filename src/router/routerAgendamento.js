import express from "express";
import AgendamentoController from "../controller/agendamentoController.js";

const routes = express.Router();

routes.get('/visualizarAgendamento/:id?', AgendamentoController.visualizarAgendamentos);
routes.post('/adicionarAgendamento', AgendamentoController.adicionarAgendamento);
routes.put('/EditarAgendamento/:id', AgendamentoController.editarAgendamento);
routes.delete('/agendamento/:id', AgendamentoController.deletarAgendamento);

export default routes;
