//todo: (1) Add photos
//todo: (2) Add co-hosting option
//todo: (3) Add ability to resell the product/ put it up for auction
//todo: (4) Add an option to add pdf link explicitly, for the product details

import mongoose, { Document, Schema } from "mongoose";

export interface Product extends Document{
  title: string;
  description: string;
  basePrice: number;
  isPublic?: boolean;
  auctionId: mongoose.Types.ObjectId;
  auctioneerId: mongoose.Types.ObjectId;
  salePrice?: number;
  owner?: mongoose.Types.ObjectId;
}

const ProductSchema: Schema<Product> = new Schema({
  title: { 
    type: String, 
    required: [true, "Title is required"],
    trim: true,
  },
  description: { 
    type: String, 
    required: [true, "Description is required"],
    maxlength: [1000, "Description must be at most 1000 characters long"],
  },
  basePrice: { 
    type: Number,
    default: 0,
    min: 0,
  },
  isPublic: { 
    type: Boolean, 
    default: false,
  },
  auctionId: { 
    type: Schema.Types.ObjectId, 
    ref: "Auctions", 
    required: true,
  },
  auctioneerId: { 
    type: Schema.Types.ObjectId, 
    ref: "Users", 
    required: true,
  },
  salePrice: { 
    type: Number,
    min: 0,
  },
  owner: { 
    type: Schema.Types.ObjectId, 
    ref: "Users",
  },
});

const ProductModel = (mongoose.models.Products as mongoose.Model<Product>) || (mongoose.model<Product>("Products", ProductSchema));

export default ProductModel;