import {Router} from "express";

import {SicSearchController} from "../controllers/SicSearchController";
import { DatabaseSearchService } from "../services/DatabaseSearchService";

const router = Router();
const databaseSearchService = new DatabaseSearchService();
const sicSearchController = new SicSearchController(databaseSearchService);

router.get("/", sicSearchController.renderView);

router.post('/', sicSearchController.search);

export default router;
