import { Link } from "react-router-dom";

// types
import type { Post } from "api/resources";
interface Props extends Post {}

function PostItem({ body, id, title, userId }: Props) {
  return (
    <li>
      <Link
        state={{ body, id, title, userId }}
        className="card"
        to={`/posts/${id}`}
      >
        <h2 className="card__title">{title.slice(0, 20)}...</h2>
        <p>{body.slice(0, 50)}...</p>
      </Link>
    </li>
  );
}

export default PostItem;
