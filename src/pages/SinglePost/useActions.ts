import { useMutation, useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";

// utils
import * as postAPI from "api/posts";

// types
import type { Post } from "api/resources";

function useActions() {
  const { id: postId } = useParams();
  const { state } = useLocation();
  const placeholderPost = (state as Post) || undefined;

  if (typeof postId !== "string") throw new Error("[useActions] Invalid id");

  const {
    data: post,
    isLoading: isLoadingPost,
    isSuccess: wasFetchedSuccessfully,
    isError: fetchingWasFailed,
  } = useQuery(["post", { id: postId }], () => postAPI.getById(postId), {
    placeholderData: placeholderPost,
  });

  const {
    mutate: onDeletePost,
    isLoading: isDeleting,
    isSuccess: wasDeletedSuccessfully,
    isError: deletingWasFailed,
  } = useMutation(() => postAPI.deleteById(postId));

  return {
    deletingWasFailed,
    fetchingWasFailed,
    isDeleting,
    isLoadingPost,
    onDeletePost,
    post,
    postId,
    wasDeletedSuccessfully,
    wasFetchedSuccessfully,
  };
}

export default useActions;
