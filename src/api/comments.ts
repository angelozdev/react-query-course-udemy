import axios from "axios";

// types
import type { Comment, Params } from "./resources";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export async function getByPostId(
  postId: number | string,
  options?: Params
): Promise<Comment[]> {
  const { limit = 10 } = options || {};
  const url = `${BASE_URL}/${postId}/comments`;

  const { data: comments } = await axios.get<Comment[]>(url, {
    params: { _limit: limit },
  });

  return comments;
}
