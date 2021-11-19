import { Link } from "react-router-dom";

// styles
import styles from "./post-item.module.css";

// types
import type { Post } from "api/resources";
interface Props {
  post: Post;
}

function PostItem({ post }: Props) {
  return (
    <li key={post.id}>
      <Link className={styles.link} to={`/posts/${post.id}`}>
        <h2 className={styles.item__title}>{post.title.slice(0, 20)}...</h2>
        <p>{post.body.slice(0, 50)}...</p>
      </Link>
    </li>
  );
}

export default PostItem;
