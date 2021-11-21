import axios from "axios";

// types
import type { Post, Params } from "./resources";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export async function getAll(options?: Params): Promise<Post[]> {
  const { limit = 10, page = 1 } = options || {};
  const { data } = await axios.get<Post[]>(BASE_URL, {
    params: { _limit: limit, _page: page },
  });
  return data;
}

export async function getById(id: number | string): Promise<Post> {
  const { data } = await axios.get<Post>(`${BASE_URL}/${id}`);
  return data;
}

export async function deleteById(id: number | string): Promise<void> {
  await axios.delete(`${BASE_URL}/${id}`);
}
