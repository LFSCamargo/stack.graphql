import { connect, connection } from "mongoose";
import { UserModel } from "../src/models";
import { Env } from "../src/env";
import { PasswordUtility } from "../src/utils";

/**
 * @description - This is used to seed the admin user into the database.
 * @generates - A new admin user in the database with the following credentials:
 * - email: atendimento@ipebank.com.br
 * - password: ipe@bank@2024@admin
 * - name: IpeBank Admin
 */
async function seed() {
  console.log(Env);

  await connect(Env.MONGO_URI, {
    dbName: Env.DB_NAME,
  });

  const password = "ipe@bank@2024@admin";

  const payload = {
    email: "atendimento@ipebank.com.br",
    password: PasswordUtility.encryptPassword(password),
    name: "IpeBank Admin",
  };

  const admin = new UserModel(payload);

  await admin.save();

  console.log("Admin user created successfully.");
  console.log("Email:", admin.email);
  console.log("Password:", password);

  await connection.close();
}

seed();
