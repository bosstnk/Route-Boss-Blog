export function filterPostsByCategory(posts, activeCategory) {
    if (activeCategory === "Highlight") {
      return posts;
    }
    return posts.filter((post) => post.category === activeCategory);
  }