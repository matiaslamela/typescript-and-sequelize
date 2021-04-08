import express, { Router } from "express";
import dogsRoutes from "./dogs";
import personsRoutes from "./persons";

const router: Router = express.Router();

router.use("/dogs", dogsRoutes);
router.use("/persons", personsRoutes);

export default router;
