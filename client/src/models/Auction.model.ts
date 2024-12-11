//todo: (1) Add a co-hosts field

import mongoose, { Document, Schema } from "mongoose";

export interface Auction extends Document{
  auctioneerId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  isPublic: boolean;
  joinCondition: string;
  startTime: Date;
  walletLimits?: {
    min?: number;
    max?: number;
  };
  numberOfProducts: number;
  products: mongoose.Types.ObjectId[];
  inviteCode: string;
  status: string;
  participants?: mongoose.Types.ObjectId[];
}

const AuctionSchema: Schema<Auction> = new Schema({
  auctioneerId: { 
    type: Schema.Types.ObjectId, 
    ref: "Users", 
    required: true,
  },
  title: { 
    type: String, 
    required: [true, "Title is required"],
    maxlength: [100, "Title can be at most 100 characters long"],
    trim: true,
  },
  description: { 
    type: String, 
    required: [true, "Description is required"],
    maxlength: [1000, "Description can be at most 1000 characters long"],
    trim: true,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  joinCondition: {
    type: String,
    enum: ['startOnly', 'betweenItems', 'betweenBids'],
    default: 'startOnly',
    trim: true,
  },
  startTime: {
    type: Date,
    required: [true, "Start time is required"],
    default: () => new Date(Date.now() + 2 * 60 * 60 * 1000), // starts in 2 hours
  },
  walletLimits: {
    min: { 
      type: Number, 
      min: 0,
    },
    max: { 
      type: Number, 
      min: 0, 
    },
  },
  numberOfProducts: {
    type: Number,
    required: [true, "Number of products is required"],
    min: [1, "Number of products must be at least 1"],
    max: [20, "Number of products can be at most 20"],
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
    required: true,
  }],
  inviteCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 8,
    maxlength: 8,
  },
  status: {
    type: String,
    enum: ['scheduled', 'ongoing', 'finished', 'canceled'],
    default: 'scheduled',
    trim: true,
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  }]
})

const AuctionModel = (mongoose.models.Auctions as mongoose.Model<Auction>) || (mongoose.model<Auction>("Auctions", AuctionSchema));

export default AuctionModel;