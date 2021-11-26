import { Spinner, TodoItem, Wrapper } from "components";
import { useInfiniteQuery, useMutation } from "react-query";
import * as TodoAPI from "api/todos";
import { useCallback, useState } from "react";
import { Todo } from "api/resources";

const MAX_PAGES_BY_REQUEST = 12;

function TodoList() {
  const [page, setPage] = useState(1);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      "todos",
      ({ pageParam = page }) =>
        TodoAPI.getAll({ page: pageParam, limit: MAX_PAGES_BY_REQUEST }),
      {
        getNextPageParam: (lastPage) => {
          const hasNextPage = lastPage.length === MAX_PAGES_BY_REQUEST;
          return hasNextPage ? page + 1 : false;
        },
      }
    );

  const updateTodoMutation = useMutation(
    ({ id, todo }: { id: number; todo: Partial<Todo> }) => {
      return TodoAPI.update(id, todo);
    }
  );

  const handleToggle = useCallback(
    async (id: number, isCompleted: boolean) => {
      updateTodoMutation.mutate({ id, todo: { completed: isCompleted } });
    },
    [updateTodoMutation]
  );

  return (
    <Wrapper>
      <h1>Todos</h1>
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
          <button
            disabled={isFetchingNextPage}
            className="button info"
            onClick={() => {
              fetchNextPage().then(() => setPage((prevPage) => prevPage + 1));
            }}
          >
            {isFetchingNextPage ? "Loading..." : "MORE"}
          </button>
        </div>
      )}
    </Wrapper>
  );
}

export default TodoList;
