import mongoose from "mongoose";
import { ProfileDocument } from "./profiles_document_service";
import { Type } from "./skills_service";

export interface IProfileDocument {
  _id?: string;
  profile_id: number;
  name: string;
  github_account?: string;
  twitter_account?: string;
  url?: string;
  comment?: string;
  skills: Array<{
    id: number;
    order: number;
    rank: number;
    name: string;
    type: Type;
  }>;
}

export function schemaToObject(schema: IProfileDocument): ProfileDocument {
  const skills = schema.skills.map((s) => {
    return {
      id: s.id,
      order: s.order,
      rank: s.rank,
      name: s.name,
      type: s.type,
    };
  });
  return {
    profile_id: schema.profile_id,
    name: schema.name,
    github_account: schema.github_account,
    twitter_account: schema.twitter_account,
    url: schema.url,
    comment: schema.comment,
    skills: skills,
  };
}

const profileSchema = new mongoose.Schema({
  profile_id: {
    type: mongoose.Schema.Types.Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  github_account: {
    type: String,
    required: false,
  },
  twitter_account: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
  comment: {
    type: String,
    required: false,
  },
  skills: [
    {
      id: {
        type: mongoose.Schema.Types.Number,
        required: true,
      },
      order: {
        type: mongoose.Schema.Types.Number,
        required: true,
      },
      rank: {
        type: mongoose.Schema.Types.Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
    },
  ],
});

export default mongoose.model<IProfileDocument>("Profiles", profileSchema);
