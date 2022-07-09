import express from "express";
import errorHandler from "./error";
import config from "./config";
import skillsResource from "./resource/skills_resource";

const app: express.Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);

// CROS対応
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "https://localhost:8080");
    res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");
    res.header(
      "Access-Control-Allow-Headers",
      "X-Requested-With, Origin, X-Csrftoken, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  }
);

app.use(errorHandler);
app.use(config.apiBasePath + "/skills", skillsResource);

app.listen(config.port, () => {
  console.log("Start on port " + config.port + ".");
});
