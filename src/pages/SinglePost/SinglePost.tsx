import { Fragment } from "react";
import { useMutation, useQuery } from "react-query";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

// components
import { CommentList, Spinner, Wrapper } from "components";

// uitls
import * as postAPI from "api/posts";

// types
import type { Post } from "api/resources";

function SinglePost() {
  const { id: postId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const placeholderPost: Post = state || undefined;

  if (typeof postId !== "string") throw new Error("[useActions] Invalid id");

  const postQuery = useQuery(
    ["post", { id: postId }],
    () => postAPI.getById(postId),
    {
      placeholderData: placeholderPost,
      initialData: placeholderPost,
    }
  );

  const deletePostMutation = useMutation(
    (postId: string) => {
      if (Math.random() < 0.75) return Promise.reject("Ouch :(");
      return postAPI.deleteById(postId);
    },
    { retry: 3 }
  );

  if (deletePostMutation.isSuccess) navigate("/posts");

  const { title, body, userId } = postQuery.data || {};

  return (
    <Wrapper>
      {postQuery.isLoading && <Spinner />}
      {postQuery.isError && <p>Error loading posts.</p>}
      {postQuery.isSuccess && (
        <Fragment>
          <div className="single-post__container">
            <h1>{title?.toUpperCase()}</h1>
            <Link className="badge primary" to={`/users/${userId}`}>
              user
            </Link>
            <p>{body}</p>
            <button
              disabled={deletePostMutation.isLoading}
              onClick={() => deletePostMutation.mutate(postId)}
              className="button danger"
            >
              {deletePostMutation.isLoading
                ? "Deleting..."
                : `Delete${deletePostMutation.isError ? " (try again)" : ""}`}
            </button>
          </div>
          <CommentList postId={postId} />
        </Fragment>
      )}
    </Wrapper>
  );
}

export default SinglePost;
