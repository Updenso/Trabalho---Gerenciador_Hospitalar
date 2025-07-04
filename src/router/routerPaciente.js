import express from "express";
import PacienteController from "../controller/pacienteController.js";

const routes = express.Router();

routes.get('/pacientes', PacienteController.visualizarPacientes)
routes.get('/pacientes/:id', PacienteController.visualizarPacientes)
routes.post('/pacientes', PacienteController.adicionarPaciente)
routes.put('/pacientes/:id', PacienteController.editarPaciente)
routes.delete('/paciente/:id', PacienteController.deletarPaciente)

export default routes;