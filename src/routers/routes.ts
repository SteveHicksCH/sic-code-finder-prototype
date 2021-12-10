import {Router} from "express";

import {SicSearchController} from "../controllers/SicSearchController";

const router = Router();
const sicSearchController = new SicSearchController();

router.get("/", sicSearchController.renderView);

router.post('/upload', sicSearchController.search);

export default router;
