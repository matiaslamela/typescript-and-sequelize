import express from "express";
import personsController from "../controllers/personsController";
const personsRouter = express.Router();

personsRouter.get("/", personsController.getPersons);
personsRouter.get("/:id", personsController.getPersonById);
personsRouter.post("/", personsController.addPerson);

export default personsRouter;
