import { Button, Card, Form, Input, Space } from "antd";
import styles from "../TodoForm/todoForm.module.css";
import { Item } from "../TodoForm/TodoForm";
import { useState } from "react";

interface TodoItemParams {
  item: Item;
  onClickDelete: (item: Item) => void;
  updateTodo: (item: Item, editedDescription: string) => void;
}

export default function TodoItem({
  item,
  onClickDelete,
  updateTodo,
}: TodoItemParams) {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const onClickEdit = () => {
    setIsEdit((prevState) => !prevState);
  };

  const onFinish = ({ editItem }: any) => {
    if (!editItem) {
      setIsEdit(false);
    } else {
      updateTodo(item, editItem);
    }
  };

  return (
    <Form onFinish={onFinish}>
      <Card key={item.description} className={styles.card} size="small">
        {isEdit ? (
          <>
            <Form.Item name="editItem">
              <Input defaultValue={item.description} />
            </Form.Item>
            <Button htmlType="submit">Save</Button>
          </>
        ) : (
          <p className={styles.title}>Title: {item.description}</p>
        )}
        <p className={styles.date}> Date: {item.date}</p>
        <Button onClick={() => onClickDelete(item)}>Delete</Button>
        <Button onClick={() => onClickEdit()}>Edit</Button>
      </Card>
    </Form>
  );
}
