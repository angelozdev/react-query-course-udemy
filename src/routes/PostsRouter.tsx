import { Route, Routes } from "react-router-dom";
import { SinglePost } from "src/pages";
import { PostList } from "../components";

function PostsRouter() {
  return (
    <Routes>
      <Route path="posts">
        <Route path="" element={<PostList />} />
        <Route path=":id" element={<SinglePost />} />
      </Route>
    </Routes>
  );
}

export default PostsRouter;
