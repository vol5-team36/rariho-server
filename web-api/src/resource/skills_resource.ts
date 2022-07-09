import express from "express";
import { getSkills, Type } from "../service/skills_service";

const router = express.Router();

router.get("/", async (req: express.Request, res: express.Response, next) => {
  const languages = await getSkills(Type.language);
  const frameworks = await getSkills(Type.framework);
  res.send({
    skills: {
      languages: languages,
      frameworks: frameworks,
    },
  });
});

export default router;
