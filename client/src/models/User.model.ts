//todo: (1) How to implement the daily login function

import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document{
  username: string;
  email: string;
  isAnonymous: boolean;
  cyclingUsernames?: [string];
  wallet: number;
  auctionsHosted?: mongoose.Types.ObjectId[];
  auctionsJoined?: mongoose.Types.ObjectId[];
  productsOwned?: [{
    auctionId: mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId;
    salePrice: number;
  }];
  dailyLoginBonusClaimed: boolean;
}

const UserSchema: Schema<User> = new Schema({
  username: { 
    type: String,
    required: [true, "Username is required"],
    minlength: [1, "Username cannot be empty"],
    maxlength: [20, "Username can be at most 20 characters long"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  isAnonymous: {
    type: Boolean,
    default: false,
  },
  cyclingUsernames: [{
    type: String,
    minlength: [1, "Username cannot be empty"],
    maxlength: [20, "Username can be at most 20 characters long"],
    trim: true,
  }],
  wallet: {
    type: Number,
    default: 0,
    min: 0,
  },
  auctionsHosted: [{
    type: Schema.Types.ObjectId,
    ref: "Auctions",
  }],
  auctionsJoined: [{
    type: Schema.Types.ObjectId,
    ref: "Auctions",
  }],
  productsOwned: [{
    auctionId: {
      type: Schema.Types.ObjectId,
      ref: "Auctions",
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    salePrice: {
      type: Number,
      min: 0,
    },
  }],
  dailyLoginBonusClaimed: {
    type: Boolean,
    default: false,
  }
})

const UserModel = (mongoose.models.Users as mongoose.Model<User>) || (mongoose.model<User>("Users", UserSchema));

export default UserModel;