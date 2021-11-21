import { useQuery } from "react-query";

// utils
import * as commentsAPI from "api/comments";

// types
interface Props {
  postId: number | string;
}

function CommentList({ postId }: Props) {
  const comments = useQuery(
    ["comments", { postId }],
    () => commentsAPI.getByPostId(postId),
    { staleTime: 1000 * 60 }
  );

  const areThereNoComments = comments.isSuccess && comments.data.length === 0;

  return (
    <details open>
      <summary>Comments ({comments.data?.length || 0})</summary>
      {comments.isLoading && <p>Loading comments...</p>}
      {areThereNoComments && <p>There are no comments for this post.</p>}
      {comments.isSuccess && (
        <ul className="comment-list">
          {comments.data?.map(({ id, name, body, email }) => (
            <li className="comment-item" key={id}>
              <h4 className="comment-item__title">{name}</h4>
              <p className="comment-item__text">{body}</p>
              <a
                className="comment-item__email"
                rel="noreferrer"
                target="_blank"
                href={`mailto:${email}`}
              >
                {email}
              </a>
            </li>
          ))}
        </ul>
      )}
    </details>
  );
}

export default CommentList;
