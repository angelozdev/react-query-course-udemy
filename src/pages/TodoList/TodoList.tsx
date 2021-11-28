import { Button, Spinner, TodoItem, Wrapper } from "components";
import { useInfiniteQuery, useMutation } from "react-query";
import * as TodoAPI from "api/todos";
import { useCallback, useMemo, useState } from "react";
import { Todo } from "api/resources";

const MAX_PAGES_BY_REQUEST = 12;

function TodoList() {
  const [page, setPage] = useState(1);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      "todos",
      ({ pageParam = 1 }) =>
        TodoAPI.getAll({ page: pageParam, limit: MAX_PAGES_BY_REQUEST }),
      {
        getNextPageParam: (lastPage) => {
          const hasNextPage = lastPage.length === MAX_PAGES_BY_REQUEST;
          return hasNextPage ? page + 1 : undefined;
        },
      }
    );

  const updateTodoMutation = useMutation(
    ({ id, todo }: { id: number; todo: Partial<Todo> }) => {
      return TodoAPI.update(id, todo);
    }
  );

  const count = useMemo(
    () => data?.pages?.reduce((acc, cur) => acc + cur.length, 0),
    [data?.pages]
  );

  const handleToggle = useCallback(
    async (id: number, isCompleted: boolean) => {
      updateTodoMutation.mutate({ id, todo: { completed: isCompleted } });
    },
    [updateTodoMutation]
  );

  return (
    <Wrapper>
      <h1>Todos ({count})</h1>
      {isLoading && <Spinner />}
      <ul className="card-list">
        {data?.pages.map((page) =>
          page.map(({ completed, id, title, userId }) => (
            <TodoItem
              key={id}
              userId={userId}
              completed={completed}
              id={id}
              title={title}
              handleToggle={handleToggle}
              disabled={
                updateTodoMutation.variables?.id === id &&
                updateTodoMutation.isLoading
              }
            />
          ))
        )}
      </ul>
      {hasNextPage && (
        <div className="pagination">
          <Button
            disabled={isFetchingNextPage}
            isLoading={isFetchingNextPage}
            className="button info"
            onClick={() => {
              fetchNextPage().then(() => setPage((prevPage) => prevPage + 1));
            }}
          >
            MORE
          </Button>
        </div>
      )}
    </Wrapper>
  );
}

export default TodoList;
