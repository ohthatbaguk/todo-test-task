import { Button, Form, Input, Typography } from "antd";
import styles from "./todoForm.module.css";
import { useState } from "react";
import { getFullDate } from "../tools/dates";
const { Title } = Typography;

interface TodoItem {
  description: string;
  date: string;
}

export default function TodoForm() {
  const [form] = Form.useForm();
  const [items, setItems] = useState<TodoItem[]>([]);

  const onFinish = ({ todosItem }: any) => {
    setItems((items) => [
      { description: todosItem, date: getFullDate(new Date()) },
      ...items,
    ]);

    console.log(items);
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
      {items.map((item) => (
        <Form.Item key={item.description}>{item.description}</Form.Item>
      ))}
    </Form>
  );
}
