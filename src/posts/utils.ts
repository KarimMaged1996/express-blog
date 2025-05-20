import Post from "./models";

export const createPostInstance = async (
  author: string,
  title: string,
  body: string
) => {
  const post = new Post({ author, title, body });
  await post.save();
  return post;
};

export const getPostsCount = async () => {
  return await Post.countDocuments();
};

export const getPosts = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  return posts;
};

export const getUserPostsCount = async (author: string) => {
  return await Post.countDocuments({ author });
};

export const getUserPosts = async (
  author: string,
  page: number,
  limit: number
) => {
  const skip = (page - 1) * limit;
  const posts = await Post.find({ author })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  return posts;
};
