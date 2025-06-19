import express from "express";
import PacienteController from "../controller/pacienteController.js";

const routes = express.Router();

routes.get('/visualizarPaciente', PacienteController.visualizarPacientes)
routes.get('/visualizarPaciente/:id', PacienteController.visualizarPacientes)
routes.post('/adicionarPaciente', PacienteController.adicionarPaciente)
routes.put('/EditarPaciente/:id', PacienteController.editarPaciente)
routes.delete('/paciente/:id', PacienteController.deletarPaciente)

export default routes;