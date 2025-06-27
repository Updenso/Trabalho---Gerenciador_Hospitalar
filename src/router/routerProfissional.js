// routes.js
import express from "express";
import ProfissionalController from "../controller/profissionalController.js";

const routes = express.Router();

routes.get('/profissionais', ProfissionalController.visualizarProfissionais);
routes.get('/profissionais/:id', ProfissionalController.visualizarProfissionais);
routes.post('/profissionais', ProfissionalController.adicionarProfissional);
routes.put('/profissionais/:id', ProfissionalController.editarProfissional);
routes.delete('/profissionais/:id', ProfissionalController.deletarProfissional);

export default routes;