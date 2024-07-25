import expressAsyncHandler from "express-async-handler";
import BlogCategory from "../models/blogCategoryModel.js";
import validateMongoDBId from "../utils/validateMongoDB.js";

const createBlogCategory = expressAsyncHandler(async (req, res) => {
  try {
    const newBlogCat = await BlogCategory.create(req.body);
    res.status(201).json(newBlogCat);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBlogCategory = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDBId(id);
    const updateBlogCat = await BlogCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateBlogCat);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBlogCategory = expressAsyncHandler(async (req, res) => {
  try {
    const blogCat = await BlogCategory.find();
    res.status(200).json(blogCat);
  } catch (error) {
    throw new Error(error);
  }
});

const getOneBlogCategory = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDBId(id);
    const blogCat = await BlogCategory.findById(id);
    res.status(200).json(blogCat);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBlogCategory = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDBId(id);
    const deletedBlogCat = await BlogCategory.findByIdAndDelete(id);
    res.status(200).json(deletedBlogCat);
  } catch (error) {
    throw new Error(error);
  }
});

export {
  createBlogCategory,
  deleteBlogCategory,
  getAllBlogCategory,
  getOneBlogCategory,
  updateBlogCategory,
};
