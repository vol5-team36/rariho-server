import express from "express";
import { HttpException, internalServerErrorException } from "../error";
import { getSkills, Type } from "../service/skills_service";

const router = express.Router();

router.get("/", async (req: express.Request, res: express.Response, next) => {
  try {
    const languages = await getSkills(Type.language);
    const frameworks = await getSkills(Type.framework);
    res.send({
      skills: {
        languages: languages,
        frameworks: frameworks,
      },
    });
  } catch (e) {
    console.error(e);
    if (e instanceof HttpException) {
      next(e);
    } else {
      next(internalServerErrorException());
    }
  }
});

export default router;
