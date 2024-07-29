import { useState } from "react";
import { useQuery, useRealm, useUser } from "@realm/react";
import { Item } from "../models";

// TODO: This is working, but not re-rendering when new item is created.

export const TodoPage = () => {
  const realm = useRealm();
  const user = useUser();
  const todoItems = useQuery(Item);

  const [summary, setSummary] = useState("");

  const addTodo = () => {
    realm.write(() => {
      realm.create(Item, { summary: summary, owner_id: user.id });
    });
  };

  // TODO: Add ability to complete/delete todos

  return (
    <div>
      <input
        onChange={(e) => setSummary(e.target.value)}
        value={summary}
        placeholder="Pet the cat"
      />

      <button onClick={addTodo}>Add todo item</button>

      {todoItems.length ? (
        <ul>
          {todoItems.map((todo) => (
            <li>{todo.summary}</li>
          ))}
        </ul>
      ) : (
        <p>Nothing to do</p>
      )}
    </div>
  );
};
