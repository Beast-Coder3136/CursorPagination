import mongoose from "mongoose";
import Product from "../models/products.js";
import { decodeCursor, encodeCursor } from "../utilis/cursor.js";


export const getProducts = async (req, res) => {
  try {
    let { category, nextCursor, limit, } = req.query;
    category = category?.trim();
    let keyword = {  };
    limit = Math.min(
      Number(limit) || 20,
      50
    );
    if (nextCursor) {
      const last = decodeCursor(nextCursor);
  
      keyword.$or = [
          {
            createdAt : { $lt: new Date(last.createdAt) }
          },
          {
            createdAt: new Date(last.createdAt),
            _id: { $lt: new mongoose.Types.ObjectId(last.id) }
          }
        ]
    }
    if (category) {
      keyword['category'] = category;
    }
    const products = await Product.find(keyword).sort({
      createdAt: -1,
      _id: -1
    }).limit(limit).lean() 

    let n = products?.length;
    if (n === 0 || !n) {
      return res.status(200).json({
        success: true,
        products: [],
        nextCursor: null,
      });
    }
    let lastProduct = products[n - 1];
    const encodedNextCursor = encodeCursor(lastProduct);
    return res.status(200).json({
      success: true,
      products,
      nextCursor: encodedNextCursor ,
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


export const createProduct = async (req, res) => {
  try {
    const { name, category, price } = req.body
    if (!name || !category || !price) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields"
      })
    }
    const product = await Product.create({
      name,
      category,
      price
    })
    return res.status(201).json({
      success: true,
      message: "New Product Added",
      product
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Please Provide Product Id"
      })
    }
    const { name, category, price } = req.body
    const product = await Product.findById(productId)
    product.name = name ? name : product.name
    product.category = category ? category : product.category
    product.price = price ? price : product.price
    await product.save()
    return res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}