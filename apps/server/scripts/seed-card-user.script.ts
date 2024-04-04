import { connect, connection } from "mongoose";
import { CardUserModel } from "../src/models";
import { Env } from "../src/env";
import { PasswordUtility } from "../src/utils";

/**
 * @description - This is used to seed some test users into the database.
 * @generates - A new card-user in the database with the following credentials:
 * - cardNumber: 6362970000457013
 * - password: meucartao@2024
 * - name: Luiz Fernando
 */
async function seed() {
  await connect(Env.MONGO_URI);

  const password = "meucartao@2024";

  const payload = {
    cardNumber: "6362970000457013",
    password: PasswordUtility.encryptPassword(password),
    name: "Luiz Fernando",
  };

  const exists = await CardUserModel.findOne({
    cardNumber: payload.cardNumber,
  });

  if (exists) {
    throw new Error("Card user already exists.");
  }

  const admin = new CardUserModel(payload);

  await admin.save();

  console.log("No Name Card User created successfully.");
  console.log("Email:", admin.cardNumber);
  console.log("Password:", password);

  await connection.close();
}

seed();
