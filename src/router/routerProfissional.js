// routes.js
import express from "express";
import ProfissionalController from "../controller/profissionalController.js";

const routes = express.Router();

routes.get('/visualizarProfissional/:id?', ProfissionalController.visualizarProfissionais);
routes.post('/adicionarProfissional', ProfissionalController.adicionarProfissional);
routes.put('/EditarProfissional/:id', ProfissionalController.editarProfissional);
routes.delete('/profissional/:id', ProfissionalController.deletarProfissional);

export default routes;