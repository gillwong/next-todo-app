import dayjs from "dayjs";
import { RowDataPacket } from "mysql2";

import { Todo } from "@/lib/todos";

import connectToDb from "@/utils/config";

export class TodoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TodoError";
  }
}

function convertSqlTodo(row: RowDataPacket) {
  const { is_completed, ...other } = row;
  return {
    ...other,
    description: other.description ?? undefined,
    due: other.due ?? undefined,
    priority: other.priority !== "" ? other.priority : undefined,
    isCompleted: is_completed ? true : false,
  } as Todo;
}

async function getAll() {
  const connection = await connectToDb();
  try {
    const [rows] = await connection.query("SELECT * FROM todos");
    return (rows as RowDataPacket[]).map((row) => convertSqlTodo(row));
  } catch (error) {
    throw new TodoError("Failed to select all from todos table");
  }
}

async function getById(id: number) {
  const connection = await connectToDb();
  try {
    const sql = "SELECT * FROM todos WHERE id = ?";
    const [rows] = await connection.execute(sql, [id]);
    const row = (rows as RowDataPacket[])[0];
    return convertSqlTodo(row);
  } catch (error) {
    throw new TodoError("Failed to select from todos table");
  }
}

async function save(todo: Omit<Todo, "id">) {
  const connection = await connectToDb();

  try {
    const sql =
      "INSERT INTO todos (title, is_completed, description, due, priority) VALUES (?, ?, ?, ?, ?)";
    await connection.execute(sql, [
      todo.title,
      todo.isCompleted ? 1 : 0,
      todo.description ?? "",
      todo.due ? dayjs(todo.due).format("YYYY-MM-DD") : null,
      todo.priority ?? "",
    ]);
  } catch (error) {
    throw new TodoError("Failed to insert todo into todos table");
  }

  const [rows] = await connection.query("SELECT LAST_INSERT_ID()");
  const insertId = (rows as RowDataPacket[])[0]["LAST_INSERT_ID()"] as number;
  const savedTodo = await getById(insertId);
  return savedTodo;
}

async function update(id: number, updatedTodo: Omit<Todo, "id">) {
  const connection = await connectToDb();

  try {
    const sql =
      "UPDATE todos SET title = ?, description = ?, priority = ?, due = ?, is_completed = ? WHERE id = ?";
    connection.execute(sql, [
      updatedTodo.title,
      updatedTodo.description ?? "",
      updatedTodo.priority ?? "",
      updatedTodo.due ? dayjs(updatedTodo.due).format("YYYY-MM-DD") : null,
      updatedTodo.isCompleted ? 1 : 0,
      id,
    ]);
  } catch (error) {
    throw new TodoError("Failed to update todo in todos table");
  }

  const savedTodo = await getById(id);
  return savedTodo;
}

async function remove(id: number) {
  const connection = await connectToDb();

  try {
    const sql = "DELETE FROM todos WHERE id = ?";
    connection.execute(sql, [id]);
  } catch (error) {
    throw new TodoError("Failed to delete todo from todos table");
  }
}

const Todos = { getAll, getById, save, update, remove };

export default Todos;
