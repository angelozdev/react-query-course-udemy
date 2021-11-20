import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

// components
import { CommentList, Wrapper } from "components";

// uitls
import useActions from "./useActions";

function SinglePost() {
  const navigate = useNavigate();
  const {
    isDeleting,
    isLoadingPost,
    onDeletePost,
    post,
    postId,
    wasDeletedSuccessfully,
    wasFetchedSuccessfully,
  } = useActions();

  if (wasDeletedSuccessfully) {
    navigate("/posts");
  }

  return (
    <Wrapper>
      {isLoadingPost && <div>Loading post...</div>}
      {wasFetchedSuccessfully && (
        <Fragment>
          <div className="single-post__container">
            <h1>{post?.title.toUpperCase()}</h1>
            <Link className="badge primary" to={`/users/${post?.userId}`}>
              user
            </Link>
            <p>{post?.body}</p>
            <button
              disabled={isDeleting}
              onClick={() => onDeletePost()}
              className="button danger"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
          <CommentList postId={postId} />
        </Fragment>
      )}
    </Wrapper>
  );
}

export default SinglePost;
