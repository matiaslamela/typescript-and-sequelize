import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import routes from "./src/routes/index";
import { sequelize } from "./src/models/index";
const app: express.Application = express();

// primero yo quiero declarar como tienen que ser los headers
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/api", routes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("nos conectamos a la base de datos :D");
    app.listen(3000, () => {
      console.log("Che, el servidor esta andando en el puerto 3000");
    });
  })
  .catch((err) => console.error(err));
