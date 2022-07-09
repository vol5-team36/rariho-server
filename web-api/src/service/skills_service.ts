import { badRequestException } from "../error";
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

export const addSkills = async (
  skills: Array<{ name: string; type: Type }>
): Promise<any> => {
  await connection(async (c) => {
    c.beginTransaction();
    for (const skill of skills) {
      await c
        .query("insert into skills" + "(id, name, type)" + " values(?, ?, ?)", [
          idgen(),
          skill.name,
          skill.type,
        ])
        .catch(() => {
          return badRequestException();
        });
      await c.commit();
    }
  });
};

export const deleteSkill = async (skillId: number) => {
  const res = await connection(async (c) => {
    c.beginTransaction();
    c.query("delete from skills where id = ?", [skillId]).catch(() => {
      return badRequestException();
    });
    c.commit();
  });
  if (res instanceof Error) {
    throw badRequestException();
  }
};
