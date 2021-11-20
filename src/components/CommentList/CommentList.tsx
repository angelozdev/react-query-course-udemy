import { useQuery } from "react-query";

// utils
import * as commentsAPI from "api/comments";

// types
interface Props {
  postId: number | string;
}

function CommentList({ postId }: Props) {
  const {
    data: comments,
    isLoading,
    isSuccess,
  } = useQuery(
    ["comments", { postId }],
    () => commentsAPI.getByPostId(postId),
    { staleTime: 1000 * 10 }
  );

  return (
    <details open>
      <summary>Comments ({comments?.length || 0})</summary>
      {isLoading && <p>Loading comments...</p>}
      {isSuccess && (
        <ul className="comment-list">
          {comments?.map((comment) => (
            <li className="comment-item" key={comment.id}>
              <h4 className="comment-item__title">{comment.name}</h4>
              <p className="comment-item__text">{comment.body}</p>
            </li>
          ))}
        </ul>
      )}
    </details>
  );
}

export default CommentList;
