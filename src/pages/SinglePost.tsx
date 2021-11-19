import { Fragment } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getPost } from "src/api/posts";
import { Wrapper } from "src/components";

function SinglePost() {
  const { id } = useParams();
  if (typeof id !== "string") throw new Error("[SinglePost] Invalid id");
  const {
    data: post,
    isLoading,
    isSuccess,
    isError,
  } = useQuery(["posts", id], ({ queryKey }) => getPost(queryKey[1]));

  return (
    <Wrapper>
      {isLoading && <p>Loading post...</p>}
      {isError && <p>Error loading post</p>}
      {isSuccess && post && (
        <Fragment>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </Fragment>
      )}
    </Wrapper>
  );
}

export default SinglePost;
