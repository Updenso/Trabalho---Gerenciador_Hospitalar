import express from "express";
import AgendamentoController from "../controller/agendamentoController.js";

const routes = express.Router();

routes.get('/agendamentos', AgendamentoController.visualizarAgendamentos);
routes.get('/agendamentos/:id', AgendamentoController.visualizarAgendamentos);
routes.post('/agendamentos', AgendamentoController.adicionarAgendamento);
routes.put('/agendamentos/:id', AgendamentoController.editarAgendamento);
routes.delete('/agendamentos/:id', AgendamentoController.deletarAgendamento);

export default routes;
