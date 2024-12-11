import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  await dbConnect();

  try {
    const { username, email } = await request.json();
  
    if (!username || !email) {
      return NextResponse.json({success: false, message: "Invalid Request"}, { status:400 });
    }
  
    //? Check for existing user
    const userExists = await axios.post('/api/user/exists', { email });
  
    if (userExists.data.exists) {
      return NextResponse.json({ success: false, message: "User already exists" }, { status: 409 });
    }
  
    //? Create new user
    const newUser = new UserModel({
      username,
      email,
      isAnonymous: true,
      cyclingUsernames: [],
      wallet: 0,
      auctionsHosted: [],
      auctionsJoined: [],
      productsOwned: [],
      dailyLoginBonusClaimed: false,
    })
  
    await newUser.save();

    return NextResponse.json({success: true, message: "User created"}, { status:200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json({success: false, message: `Internal Server Error :: ${error.name}`}, { status:500 });
    }
    return NextResponse.json({success: false, message: "Internal Server Error"}, { status:500 });
  }
}