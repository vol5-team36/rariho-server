import express from "express";
import fs from "fs";
import {
  badRequestException,
  HttpException,
  internalServerErrorException,
} from "../error";
import { IProfileDocument } from "../service/profiles_document_schema";
import {
  getProfile,
  ProfileDocument,
  uploadProfile,
} from "../service/profiles_document_service";
import { addProfile } from "../service/profiles_service";

const router = express.Router();

router.get(
  "/:profileId",
  async (req: express.Request, res: express.Response, next) => {
    try {
      const profileId = parseInt(req.params.profileId);
      const profile = await getProfile(profileId);
      let image;
      if (fs.existsSync(getImagePath(profileId))) {
        image = fs.readFileSync(getImagePath(profileId));
      }
      if (image) {
        profile.image = "data:image/png;base64," + image.toString("base64");
      }
      res.json(profile);
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

router.post("/", async (req: express.Request, res: express.Response, next) => {
  try {
    const profile = req.body as ProfileDocument;
    const image = profile.image;
    const profileId = await addProfile();
    profile.profile_id = profileId;
    if (image) {
      try {
        const base64Data = req.body.image.replace(
          /^data:image\/png;base64,/,
          ""
        );
        fs.writeFileSync(getImagePath(profileId), base64Data, "base64");
      } catch (e) {
        throw badRequestException("invalid image data");
      }
    }
    await uploadProfile(profile as IProfileDocument);
    res.send();
  } catch (e) {
    console.error(e);
    if (e instanceof HttpException) {
      next(e);
    } else {
      next(internalServerErrorException());
    }
  }
});

const getImagePath = (profileId: number): string => {
  return "store/images/" + profileId + ".png";
};

export default router;
