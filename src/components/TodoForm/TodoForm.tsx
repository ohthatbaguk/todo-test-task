import { Button, Card, Form, Input, Typography } from "antd";
import styles from "./todoForm.module.css";
import { useEffect, useState } from "react";
import { getFullDate } from "../../tools/dates";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../tools/localStorage";
const { Title } = Typography;

export interface TodoItem {
  description: string;
  date: string;
}

export default function TodoForm() {
  const [form] = Form.useForm();
  const [items, setItems] = useState<TodoItem[]>(
    getFromLocalStorage("todos", [])
  );

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

  return (
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
      {items?.map((item) => (
        <Form.Item key={item.description}>
          <Card className={styles.card} size="small" title={item.description}>
            <p className={styles.date}> Date: {item.date}</p>
            <Button>Delete</Button>
            <Button>Edit</Button>
          </Card>
        </Form.Item>
      ))}
    </Form>
  );
}
