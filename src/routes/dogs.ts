import express from "express";
import dogsController from "../controllers/dogsController";
const dogsRouter = express.Router();

dogsRouter.get("/", dogsController.getDogs);
dogsRouter.get("/:id", dogsController.getDogById);
dogsRouter.post("/", dogsController.addDog);
dogsRouter.post("/:dogId/person/:personId", dogsController.addPersonToDog);

export default dogsRouter;
