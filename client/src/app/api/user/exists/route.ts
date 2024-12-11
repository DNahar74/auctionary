//--- DONE --- todo: (1) This should be a get request instead

import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const username = searchParams.get('username');

    if (!email && !username) {
      return NextResponse.json({success: false, message: "Invalid Request"}, { status:400 });
    }

    const existingUser = await UserModel.findOne({
      $or: [
        {email},
        {username}
      ]
    });

    if (existingUser) {
      return NextResponse.json({success: true, exists: true, message: "User already exists"}, { status:200 });
    }

    return NextResponse.json({success: true, exists: false, message: "User does not exist"}, { status:200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json({success: false, message: `Internal Server Error :: ${error.name}`}, { status:500 });
    }
    return NextResponse.json({success: false, message: "Internal Server Error"}, { status:500 });
  }
}