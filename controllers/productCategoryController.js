import expressAsyncHandler from "express-async-handler";
import Category from "../models/productCategoryModel.js.js";
import validateMongoDBId from "../utils/validateMongoDB.js";

const createCategory = expressAsyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const updateCategory = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDBId(id);
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCategory = expressAsyncHandler(async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    throw new Error(error);
  }
});

const getOneCategory = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDBId(id);
    const category = await Category.findById(id);
    res.status(200).json(category);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCategory = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDBId(id);
    const deletedCategory = await Category.findByIdAndDelete(id);
    res.status(200).json(deletedCategory);
  } catch (error) {
    throw new Error(error);
  }
});

export {
  createCategory,
  deleteCategory,
  getAllCategory,
  getOneCategory,
  updateCategory,
};
