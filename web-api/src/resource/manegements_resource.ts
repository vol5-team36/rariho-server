import express from "express";
import { addSkills, deleteSkill, Type } from "../service/skills_service";
import { HttpException, internalServerErrorException } from "../error";

const router = express.Router();

router.post(
  "/skills",
  async (req: express.Request, res: express.Response, next) => {
    try {
      const skills = req.body.skills;
      await addSkills(skills);
      res.status(200).send();
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        next(e);
      } else {
        next(internalServerErrorException());
      }
    }
  }
);

router.delete(
  "/skills/:skillId",
  async (req: express.Request, res: express.Response, next) => {
    try {
      const skillId = req.params.skillId;
      await deleteSkill(parseInt(skillId));
      res.status(204).send();
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        next(e);
      } else {
        next(internalServerErrorException());
      }
    }
  }
);

export default router;
