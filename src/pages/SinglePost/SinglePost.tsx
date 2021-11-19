import { Fragment } from "react";
import { QueryStatus, useQuery } from "react-query";
import { useParams } from "react-router-dom";

// components
import { Wrapper } from "components";

// uitls
import { getPost } from "api/posts";

function SinglePost() {
  const { id } = useParams();
  if (typeof id !== "string") throw new Error("[SinglePost] Invalid id");
  const { data: post, status } = useQuery(["posts", id], ({ queryKey }) =>
    getPost(queryKey[1])
  );

  const render: Record<QueryStatus, JSX.Element> = {
    success: (
      <Fragment>
        <h1>{post?.title}</h1>
        <p>{post?.body}</p>
      </Fragment>
    ),
    loading: <p>Loading post...</p>,
    error: <p>Error loading post</p>,
    idle: <p>No post found</p>,
  };

  return <Wrapper>{render[status]}</Wrapper>;
}

export default SinglePost;
