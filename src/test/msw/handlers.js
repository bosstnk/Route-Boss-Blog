import { http, HttpResponse } from "msw";

export const API = import.meta.env.VITE_API_BASE_URL; // http://localhost:3000/api

export const fakeUser = {
  id: 1,
  name: "Somchai Jaidee",
  username: "somchai",
  email: "somchai@example.com",
  image: "",
  bio: "I love writing about cats",
  role: "user",
};

export const fakePosts = [
  {
    id: 1,
    title: "The Art of Mindfulness",
    description: "Finding peace in a busy world",
    category: "General",
    author: "Thompson P.",
    author_pic: "",
    image: "https://example.com/1.jpg",
    date: "2024-03-05T12:00:00.000Z",
  },
  {
    id: 2,
    title: "Understanding Cat Behavior",
    description: "Why cats knock things off tables",
    category: "Cat",
    author: "Thompson P.",
    author_pic: "",
    image: "https://example.com/2.jpg",
    date: "2024-04-10T12:00:00.000Z",
  },
];

// handler ตั้งต้น = "ทางที่สำเร็จ" ของแต่ละ API
// test ไหนอยากได้ผลอื่น (error, ข้อมูลอื่น) ให้ทับด้วย server.use(...) ในตัว test เอง
export const handlers = [
  http.post(`${API}/auth/login`, () =>
    HttpResponse.json({ token: "fake-jwt-token" })
  ),

  http.post(`${API}/auth/register`, () =>
    HttpResponse.json({ token: "fake-jwt-token" }, { status: 201 })
  ),

  http.get(`${API}/user`, () => HttpResponse.json(fakeUser)),

  http.get(`${API}/posts`, () =>
    HttpResponse.json({
      totalPosts: 2,
      totalPages: 1,
      currentPage: 1,
      limit: 6,
      posts: fakePosts,
    })
  ),

  http.get(`${API}/categories/popular`, () =>
    HttpResponse.json([
      { id: 1, name: "General" },
      { id: 2, name: "Cat" },
    ])
  ),

  http.get(`${API}/notifications`, () => HttpResponse.json([])),
];