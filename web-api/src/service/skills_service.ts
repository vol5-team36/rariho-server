import connection, { idgen } from "../mysql";

export interface Skill {
  id: number;
  name: string;
}

export enum Type {
  language = "language",
  framework = "framework",
}

export const getSkills = async (type: Type): Promise<Array<Skill>> => {
  const data: Array<Object> = await connection(async (c) => {
    const [data] = await c.query(
      "select id, name " + "from skills " + "where type = '" + type + "'"
    );
    return data;
  });
  return data.map((d) => d as Skill);
};