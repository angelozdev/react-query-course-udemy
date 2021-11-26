import { useQuery, useQueryClient } from "react-query";

// components
import { PostItem, Spinner, Wrapper } from "components";

// utils
import * as postsAPI from "api/posts";
import { useQueryParams } from "hooks/";

function PostList() {
  const queryClient = useQueryClient();
  const { page, pageSize, onNextPage, onPreviousPage, setPageSize } =
    useQueryParams({
      defaultPage: 1,
      defaultPageSize: 6,
      onChangeParams: async ({ page, pageSize }) => {
        const nextPage = page + 1;
        await queryClient.prefetchQuery(
          ["posts", { page: nextPage, pageSize }],
          () => postsAPI.getAll({ page: nextPage, limit: pageSize })
        );
      },
    });

  const postsQuery = useQuery(
    ["posts", { page, pageSize }],
    () =>
      postsAPI.getAll({
        page: page,
        limit: pageSize,
      }),
    { keepPreviousData: true }
  );

  return (
    <Wrapper>
      <h1>
        Posts ({postsQuery.data?.length})
        {postsQuery.isFetching && <span>*</span>}
      </h1>
      <label>
        Posts per page
        <input
          type="number"
          value={pageSize}
          className="input"
          onChange={({ target }) => setPageSize(+target.value)}
        />
      </label>
      {postsQuery.isLoading && <Spinner />}
      {postsQuery.isSuccess && (
        <div>
          <ul className="card-list">
            {postsQuery.data.map(({ body, id, title, userId }) => (
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
              disabled={page <= 1 || postsQuery.isFetching}
            >
              Previous
            </button>
            <span>{page}</span>
            <button
              disabled={
                postsQuery.data.length < pageSize || postsQuery.isFetching
              }
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
