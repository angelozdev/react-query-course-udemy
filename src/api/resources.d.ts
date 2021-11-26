export interface Post {
  userId: number;
  id: number;
  body: string;
  title: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface Params {
  limit?: number | string;
  page?: number | string;
}

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}
