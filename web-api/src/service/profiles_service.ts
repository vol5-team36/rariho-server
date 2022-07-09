import { badRequestException } from "../error";
import connection, { idgen } from "../mysql";

export const addProfile = async (): Promise<number> => {
  const id = idgen();
  await connection(async (c) => {
    c.beginTransaction();
    await c.query("insert into profiles" + "(id)" + " values(?)", [id]);
    await c.commit();
  });
  return id;
};

export const getProfile = async (profileId: number): Promise<any> => {
  const data: Array<Object> = await connection(async (c) => {
    const [data] = await c.query("select * from profiles where id = ?", [
      profileId,
    ]);
    return data;
  });
  return data[0];
};
