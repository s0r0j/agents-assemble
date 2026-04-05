import { Router } from "express";

import { handleAgentRequest } from "../controllers/agentController.js";

const router = Router();

router.post("/agent", handleAgentRequest);

export default router;
