import { useQuery, useQueryClient } from "react-query";

// components
import { PostItem, Wrapper } from "components";

// utils
import styles from "./post-list.module.css";
import * as postsAPI from "api/posts";
import useQueryParams from "./useQueryParams";

function PostList() {
  const queryClient = useQueryClient();
  const { page, page_size, onNextPage, onPreviousPage, setPageSize } =
    useQueryParams({
      defaultPage: 1,
      defaultPageSize: 6,
      onChangeParams: async ({ page, page_size }) => {
        const nextPage = page + 1;
        await queryClient.prefetchQuery(
          ["posts", { page: nextPage, page_size }],
          () => postsAPI.getAll({ page: nextPage, limit: page_size })
        );
      },
    });

  const posts = useQuery(
    ["posts", { page, page_size }],
    () =>
      postsAPI.getAll({
        page: page,
        limit: page_size,
      }),
    { keepPreviousData: true }
  );

  return (
    <Wrapper>
      <h1>
        Posts ({posts.data?.length}){posts.isFetching && <span>*</span>}
      </h1>
      <label>
        Posts per page
        <input
          type="number"
          value={page_size}
          className="input"
          onChange={({ target }) => setPageSize(+target.value)}
        />
      </label>
      {posts.isLoading && <div>Loading posts...</div>}
      {posts.isSuccess && (
        <div>
          <ul className={styles.list}>
            {posts.data.map(({ body, id, title, userId }) => (
              <PostItem
                body={body}
                id={id}
                key={id}
                title={title}
                userId={userId}
              />
            ))}
          </ul>

          <div className="pagination">
            <button
              onClick={onPreviousPage}
              className="button info"
              disabled={page <= 1 || posts.isFetching}
            >
              Previous
            </button>
            <span>{page}</span>
            <button
              disabled={posts.data.length < page_size || posts.isFetching}
              onClick={onNextPage}
              className="button info"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </Wrapper>
  );
}

export default PostList;
