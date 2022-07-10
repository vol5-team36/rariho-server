import express from "express";
import errorHandler from "./error";
import config from "./config";
import skillsResource from "./resource/skills_resource";
import profilesResource from "./resource/profiles_resource";
import manegementsResource from "./resource/manegements_resource";
import { connectDB as connectMongo } from "./mongodb";
import { connectDB as connectMySQL } from "./mysql";

const app: express.Express = express();

connectMongo();
connectMySQL();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);

// CROS対応
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");
    res.header(
      "Access-Control-Allow-Headers",
      "X-Requested-With, Origin, X-Csrftoken, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", "true");

    if ("OPTIONS" === req.method) {
      res.send(200);
    } else {
      next();
    }
  }
);

app.use(config.apiBasePath + "/skills", skillsResource);
app.use(config.apiBasePath + "/profiles", profilesResource);
app.use("/managements", manegementsResource);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log("Start on port " + config.port + ".");
});
