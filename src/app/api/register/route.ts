import dbConnect from "@/lib/dbConnect";
import Games from "@/models/Games";
import User from "@/models/Users";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const validateEmail = (email: string): boolean => {
  const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return regEx.test(email);
};

const validateForm = async (
  username: string,
  email: string,
  password: string
) => {
  if (username.length < 3) {
    return { errorMSG: "Username must have 3 or more characters" };
  }
  if (!validateEmail(email)) {
    return { errorMSG: "Email is invalid" };
  }

  await dbConnect();
  const emailUser = await User.findOne({ email: email });
  if (emailUser) {
    return { errorMSG: "Email already exists" };
  }

  if (password.length < 5) {
    return { errorMSG: "Password must have 5 or more characters" };
  }

  return null;
};

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    const errorMessage = await validateForm(username, email, password);
    if (errorMessage) {
      return new Response(JSON.stringify(errorMessage), { status: 400 });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new Games on MongoDB
    const newGames = new Games({
      games: [],
    });

    // Save games to database
    await newGames.save().catch((err: Error) => {
      console.log("Error on save: ", err);
    });

    // create new User on MongoDB
    const newUser = new User({
      username,
      email,
      hashedPassword,
      games: newGames._id,
    });

    // Save user to database
    await newUser.save().catch((err: Error) => {
      console.log("Error on save: ", err);
    });
    return NextResponse.json({
      msg: "Successfully created new User: " + newUser,
    });
  } catch (err) {
    return Response.error();
  }
}
