import { Button, Form, Input, Typography } from "antd";
import styles from "./todoForm.module.css";
import { useEffect, useState } from "react";
import { getFullDate } from "../../tools/dates";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../tools/localStorage";
import TodoItem from "../TodoItem/TodoItem";
const { Title } = Typography;

export interface Item {
  description: string;
  date: string;
}

export default function TodoForm() {
  const [form] = Form.useForm();
  const [items, setItems] = useState<Item[]>(getFromLocalStorage("todos", []));

  useEffect(() => {
    saveToLocalStorage("todos", items);
  }, [items]);

  const onFinish = ({ todosItem }: any) => {
    setItems((items) => [
      { description: todosItem, date: getFullDate(new Date()) },
      ...items,
    ]);

    form.resetFields();
  };

  const onClickDelete = (item: Item) => {
    setItems((items) =>
      items.filter((todo) => todo.description !== item.description)
    );
  };

  const updateTodo = (item: Item, editedDescription: string) => {
    setItems((items) => {
      const newItems = [...items];
      const editItemIndex = newItems.findIndex(
        (todo) => todo.description === item.description
      );
      newItems.splice(editItemIndex, editItemIndex, {
        description: editedDescription,
        date: newItems[editItemIndex].date,
      });
      return newItems;
    });
  };

  return (
    <>
      <Form form={form} className={styles.form} onFinish={onFinish}>
        <Title>TODO Form</Title>
        <Form.Item name="todosItem">
          <Input placeholder="Enter todo" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
      {items?.map((item) => (
        <TodoItem
          onClickDelete={onClickDelete}
          updateTodo={updateTodo}
          key={item.description}
          item={item}
        />
      ))}
    </>
  );
}
