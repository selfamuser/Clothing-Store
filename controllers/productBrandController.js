import expressAsyncHandler from "express-async-handler";
import Brand from "../models/productBrandModel.js";
import validateMongoDBId from "../utils/validateMongoDB.js";

const createBrand = expressAsyncHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.status(201).json(newBrand);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBrand = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDBId(id);
    const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedBrand);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBrand = expressAsyncHandler(async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    throw new Error(error);
  }
});

const getOneBrand = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDBId(id);
    const brand = await Brand.findById(id);
    res.status(200).json(brand);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBrand = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDBId(id);
    const deletedBrand = await Brand.findByIdAndDelete(id);
    res.status(200).json(deletedBrand);
  } catch (error) {
    throw new Error(error);
  }
});

export { createBrand, deleteBrand, getAllBrand, getOneBrand, updateBrand };
