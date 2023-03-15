import { Button, Card, Form, Input } from "antd";
import styles from "../TodoItem/todoItem.module.css";
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
    <Form className={styles.form} onFinish={onFinish}>
      <Card
        bodyStyle={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
        key={item.description}
        size="small"
        style={{ width: 300 }}
      >
        {isEdit ? (
          <div className={styles.editContainer}>
            <Form.Item className={styles.input} name="editItem">
              <Input defaultValue={item.description} />
            </Form.Item>
            <Button type="primary" className={styles.button} htmlType="submit">
              Save
            </Button>
          </div>
        ) : (
          <p className={styles.title}>Title: {item.description}</p>
        )}
        <p className={styles.date}> Date: {item.date}</p>
        <div className={styles.buttons}>
          <Button
            className={styles.button}
            type="primary"
            onClick={() => onClickDelete(item)}
          >
            Delete
          </Button>
          <Button type="primary" onClick={() => onClickEdit()}>
            Edit
          </Button>
        </div>
      </Card>
    </Form>
  );
}
