import { Request, Response } from "express";
import db from "../models/index";

const dogsModel = db.Dogs;

class dogsControllerClass {
  model: typeof dogsModel = dogsModel;

  getDogs(req: Request, res: Response) {
    dogsModel
      .findAll({
        include: {
          model: db.Persons,
        },
      })
      .then((dogs) => res.send(dogs))
      .catch((error) => console.error(error));
  }
  getDogById(req: Request, res: Response) {
    const id = req.params.id;
    dogsModel
      .findByPk(id)
      .then((dog) => res.send(dog))
      .catch((error) => console.error(error));
  }
  addDog(req: Request, res: Response) {
    const dog = req.body;
    dogsModel
      .create(dog)
      .then((dog) => res.send(dog))
      .catch((error) => console.error(error));
  }
  async addPersonToDog(req: Request, res: Response) {
    const personId = req.params.personId;
    const dogId = req.params.dogId;
    console.log(dogId, personId);
    const dog = await dogsModel.findByPk(dogId);
    if (dog) {
      return dog?.addPerson(+personId).then(() => res.sendStatus(201));
    } else return res.send("no se pudo crear");
  }
}

const dogsController = new dogsControllerClass();

export default dogsController;
