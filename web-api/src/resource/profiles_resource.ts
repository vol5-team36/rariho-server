import express from "express";
import fs from "fs";
import {
  badRequestException,
  HttpException,
  internalServerErrorException,
  notFoundException,
} from "../error";
import { IProfileDocument } from "../service/profiles_document_schema";
import {
  getProfile,
  objectToProfileDocument,
  uploadProfile,
} from "../service/profiles_document_service";
import {
  getProfile as getProfileEntity,
  addProfile,
} from "../service/profiles_service";

const router = express.Router();

router.get(
  "/:profileId",
  async (req: express.Request, res: express.Response, next) => {
    try {
      const profileId = parseInt(req.params.profileId);
      if (!(await getProfileEntity(profileId))) {
        throw notFoundException();
      }
      const profile = await getProfile(profileId);
      if (!profile) {
        throw notFoundException();
      }
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
    let profile;
    try {
      profile = objectToProfileDocument(req.body);
    } catch (e) {
      console.error(e);
      throw badRequestException("400 Bad Request", "InvalidParameter");
    }
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
    res.send({ profile_id: profileId });
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
