import { useQuery } from "react-query";

// components
import { PostItem, Wrapper } from "components";

// utils
import styles from "./post-list.module.css";
import * as postsAPI from "api/posts";

// types
import type { QueryStatus } from "react-query";

function PostList() {
  const { data: posts = [], status } = useQuery("posts", () =>
    postsAPI.getAll()
  );

  const render: Record<QueryStatus, JSX.Element> = {
    error: <p>Error loading posts</p>,
    idle: <></>,
    loading: <p>Loading posts...</p>,
    success: (
      <ul className={styles.list}>
        {posts.map((post) => (
          <PostItem post={post} key={post.id} />
        ))}
      </ul>
    ),
  };

  return (
    <Wrapper>
      <h1>Posts ({posts.length})</h1>
      {render[status]}
    </Wrapper>
  );
}

export default PostList;
