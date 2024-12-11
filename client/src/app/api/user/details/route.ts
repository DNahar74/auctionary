import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
  
    if (!email) {
      return NextResponse.json({success: false, message: "Invalid Request"}, { status:400 });
    }
  
    //? Check for existing user
    const userExists = await UserModel.findOne({ email });

    if (!userExists) {
      return NextResponse.json({success: false, message: "User does not exist"}, { status:409 });
    }

    return NextResponse.json({success: true, message: "User created", user: userExists}, { status:200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json({success: false, message: `Internal Server Error :: ${error.name}`}, { status:500 });
    }
    return NextResponse.json({success: false, message: "Internal Server Error"}, { status:500 });
  }
}