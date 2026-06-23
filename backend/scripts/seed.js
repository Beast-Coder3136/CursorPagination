import { connectDB } from "../lib/db.js";
import Product from "../models/products.js";

connectDB()
const SIZE = 200000;
const products = [];
export const categories = [
  "Electronics",
  "Clothing",
  "Books",
  "Home & Kitchen",
  "Sports",
  "Beauty",
  "Toys",
  "Automotive",
  "Health",
  "Grocery",
  "Furniture",
  "Jewelry",
  "Footwear",
  "Pet Supplies",
  "Office Supplies"
];



export const seed = async () => {
  for (let i = 0; i < SIZE; i++) {
    let name = `Product ${i+1}`;
    let categoryIdx = Math.floor(Math.random() * categories.length)
    let category = categories[categoryIdx];
    let price = Math.floor(Math.random() * 10000);
    products.push({
      name,
      category,
      price,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

   await Product.insertMany(products);
}

seed()