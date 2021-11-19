import axios from "axios";

// types
import type { Post } from "./resources";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export async function getPosts(): Promise<Post[]> {
  const { data } = await axios.get<Post[]>(BASE_URL);
  return data;
}

export async function getPost(id: number | string): Promise<Post> {
  const { data } = await axios.get<Post>(`${BASE_URL}/${id}`);
  return data;
}
