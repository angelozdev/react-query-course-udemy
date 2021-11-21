import { Fragment } from "react";
import { useMutation, useQuery } from "react-query";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

// components
import { CommentList, Wrapper } from "components";

// uitls
import * as postAPI from "api/posts";

// types
import type { Post } from "api/resources";

function SinglePost() {
  const { id: postId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const placeholderPost = (state as Post) || undefined;

  if (typeof postId !== "string") throw new Error("[useActions] Invalid id");

  const posts = useQuery(
    ["post", { id: postId }],
    () => postAPI.getById(postId),
    {
      placeholderData: placeholderPost,
      initialData: placeholderPost,
    }
  );

  const deletePost = useMutation(() => postAPI.deleteById(postId));

  if (deletePost.isSuccess) navigate("/posts");

  const { title, body, userId } = posts.data || {};

  return (
    <Wrapper>
      {posts.isLoading && <p>Loading post...</p>}
      {posts.isError && <p>Error loading posts.</p>}
      {posts.isSuccess && (
        <Fragment>
          <div className="single-post__container">
            <h1>{title?.toUpperCase()}</h1>
            <Link className="badge primary" to={`/users/${userId}`}>
              user
            </Link>
            <p>{body}</p>
            <button
              disabled={deletePost.isLoading}
              onClick={() => deletePost.mutate()}
              className="button danger"
            >
              {deletePost.isLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
          <CommentList postId={postId} />
        </Fragment>
      )}
    </Wrapper>
  );
}

export default SinglePost;
