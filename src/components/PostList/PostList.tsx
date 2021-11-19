import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Wrapper } from "../";
import * as api from "../../api";
import styles from "./post-list.module.css";

function PostList() {
  const { data: posts = [], isLoading } = useQuery("posts", api.posts.getPosts);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Wrapper>
      <h1>Posts ({posts.length})</h1>
      <ul className={styles.list}>
        {posts.map((post) => (
          <Link key={post.id} className={styles.link} to={`/posts/${post.id}`}>
            <li className={styles.item}>
              <h2 className={styles.item__title}>
                {post.title.slice(0, 20)}...
              </h2>
              <p>{post.body.slice(0, 50)}...</p>
            </li>
          </Link>
        ))}
      </ul>
    </Wrapper>
  );
}

export default PostList;
