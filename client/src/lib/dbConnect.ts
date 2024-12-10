//todo: (1) Study the options that mongoose.connect gives, like passing options on connection
//todo: (2) Check what the various return objects include
//todo: (3) Check what the void type is in typescript and how it differs from C/C++

import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number
}

const connection: connectionObject = {};

export const dbConnect = async ():Promise<void> => {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  } else {
    try {
      const db = await mongoose.connect(process.env.MONGODB_URI || '', {});

      connection.isConnected = db.connections[0].readyState;
      console.log("\nConnected to database");
    } catch (error) {
      console.error("Failed to connect to database :: \n" + error);
      process.exit(1);
    }
  }
}