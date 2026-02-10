import axios from "axios";
import { useState, useEffect, createContext } from "react";

export const PostContext = createContext(null);

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getPosts() {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.get(
        "https://blog-post-project-api.vercel.app/posts"
      );

      setPosts(response.data.posts);
    } catch (err) {
      setError("Failed to fetch posts");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        isLoading,
        error,
        refetchPosts: getPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

