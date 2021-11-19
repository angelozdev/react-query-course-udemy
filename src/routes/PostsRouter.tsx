import { Route, Routes } from "react-router-dom";

// components
import { PostList, SinglePost } from "pages";

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
