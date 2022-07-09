import express from "express";
import { getSkills, Type } from "../service/skills_service";

const router = express.Router();

router.get("/", async (req: express.Request, res: express.Response, next) => {
  const langages = await getSkills(Type.langage);
  const frameworks = await getSkills(Type.framework);
  res.send({
    skills: {
      langages: langages,
      frameworks: frameworks,
    },
  });
});

export default router;
