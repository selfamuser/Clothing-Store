import expressAsyncHandler from "express-async-handler";
import Blog from "../models/blogModel.js";
import validateMongoDBId from "../utils/validateMongoDB.js";
const createBlog = expressAsyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json({
      status: 201,
      data: newBlog,
      message: "Blog created successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getBlogs = expressAsyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json({
      status: 200,
      data: blogs,
      message: "Blogs fetched successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getOneBlog = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDBId(id);
  try {
    const blog = await Blog.findById(id).populate("likes").populate("dislikes");
    const updateViews = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      {
        new: true,
      }
    );
    if (blog) {
      res.json({
        status: 200,
        data: blog,
        message: "Blog fetched successfully",
      });
    } else {
      res.json({
        status: 404,
        data: null,
        message: "Blog not found",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const updateBlog = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDBId(id);
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      status: 200,
      data: updatedBlog,
      message: "Blog updated successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBlog = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDBId(id);
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    res.json({
      status: 200,
      data: deletedBlog,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const likedBlog = expressAsyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDBId(blogId);
  // Find the blog which you want to be liked
  const blog = await Blog.findById(blogId);
  // find the login user
  const loginUserId = req?.user?._id;
  // find if the user has liked the blog
  const isLiked = blog?.isLiked;
  // find if the user has disliked the blog
  const alreadyDisliked = blog?.dislikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (alreadyDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(blog);
  }
  if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
});
const dislikedBlog = expressAsyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDBId(blogId);
  // Find the blog which you want to be liked
  const blog = await Blog.findById(blogId);
  // find the login user
  const loginUserId = req?.user?._id;
  // find if the user has liked the blog
  const isDisLiked = blog?.isDisliked;
  // find if the user has disliked the blog
  const alreadyLiked = blog?.likes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (alreadyLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  }
  if (isDisLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDisliked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
});

export {
  createBlog,
  deleteBlog,
  dislikedBlog,
  getBlogs,
  getOneBlog,
  likedBlog,
  updateBlog,
};
