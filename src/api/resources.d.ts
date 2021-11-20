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
  limit?: number;
}
