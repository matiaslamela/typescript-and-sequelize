import { Request, Response } from "express";
import db from "../models/index";

const personsModel = db.Persons;

class personsControllerClass {
  model: typeof personsModel = personsModel;

  getPersons(req: Request, res: Response) {
    personsModel
      .findAll()
      .then((persons) => res.send(persons))
      .catch((error) => console.error(error));
  }
  getPersonById(req: Request, res: Response) {
    const id = req.params.id;
    personsModel
      .findByPk(id)
      .then((person) => res.send(person))
      .catch((error) => console.error(error));
  }
  addPerson(req: Request, res: Response) {
    const dog = req.body;
    personsModel
      .create(dog)
      .then((dog) => res.send(dog))
      .catch((error) => console.error(error));
  }
}

const personController = new personsControllerClass();

export default personController;
