import { Wrapper } from "components";
import { useInfiniteQuery } from "react-query";
import * as TodoAPI from "api/todos";
import { useState } from "react";

const MAX_PAGES_BY_REQUEST = 10;

function TodoList() {
  const [page, setPage] = useState(1);
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    "todos",
    ({ pageParam = 1 }) =>
      TodoAPI.getAll({ page: pageParam, limit: MAX_PAGES_BY_REQUEST }),
    {
      getNextPageParam: (lastPage) =>
        lastPage.length === MAX_PAGES_BY_REQUEST ? page + 1 : false,
    }
  );
  return (
    <Wrapper>
      <h1>Todos</h1>
      <ul className="card-list">
        {data?.pages.map((todos) =>
          todos.map(({ id, title, completed }) => (
            <li
              className={[
                "card",
                completed ? "border-success" : "border-info",
                "border",
              ].join(" ")}
              key={id}
            >
              <input type="checkbox" defaultChecked={completed} />
              <p>{completed ? <del>{title}</del> : title}</p>
            </li>
          ))
        )}
      </ul>
      <div className="pagination">
        <button
          disabled={!hasNextPage || isFetching}
          className="button info"
          onClick={() => {
            setPage((prevPage) => prevPage + 1);
            fetchNextPage();
          }}
        >
          {isFetching ? "Loading..." : "MORE"}
        </button>
      </div>
    </Wrapper>
  );
}

export default TodoList;
