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
