import axios from "axios";

// types
import type { Params, Todo } from "./resources";

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

export async function getAll(options?: Params): Promise<Todo[]> {
  const { limit = 10, page = 1 } = options || {};
  const { data } = await axios.get<Todo[]>(BASE_URL, {
    params: { _limit: limit, _page: page },
  });
  return data;
}

export async function update(id: number, todo: Partial<Todo>): Promise<Todo> {
  const { data } = await axios.put<Todo>(`${BASE_URL}/${id}`, todo);
  return data;
}
