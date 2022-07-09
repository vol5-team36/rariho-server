import { notFoundException } from "../error";
import ProfileDocumentSchema, {
  IProfileDocument,
  schemaToObject,
} from "./profiles_document_schema";

export interface ProfileDocument {
  profile_id?: number;
  name: string;
  image?: string;
  github_account: string;
  twitter_account: string;
  url: string;
  comment: string;
  skills: Array<{
    id: number;
    order: number;
    rank: number;
  }>;
}

export const uploadProfile = async (profile: IProfileDocument) => {
  const profileDocumentSchema = new ProfileDocumentSchema(profile);
  await profileDocumentSchema.save();
};

export const getProfile = async (profile_id: number) => {
  const result = await ProfileDocumentSchema.findOne({
    profile_id: profile_id,
  });
  if (!result) {
    throw notFoundException();
  }
  return schemaToObject(result);
};
