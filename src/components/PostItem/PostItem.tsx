import { Link } from "react-router-dom";

// styles
import styles from "./post-item.module.css";

// types
import type { Post } from "api/resources";
interface Props extends Post {}

function PostItem({ body, id, title, userId }: Props) {
  return (
    <li key={id}>
      <Link
        state={{ body, id, title, userId }}
        className={styles.link}
        to={`/posts/${id}`}
      >
        <h2 className={styles.item__title}>{title.slice(0, 20)}...</h2>
        <p>{body.slice(0, 50)}...</p>
      </Link>
    </li>
  );
}

export default PostItem;
