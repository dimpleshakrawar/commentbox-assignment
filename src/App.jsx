import { Card, Typography, Form, Input, Button, Row, Col } from "antd";
import { useDispatch } from "react-redux";
import { addComment } from "./store/commentSlice";
import CommentBox from "./components/commentBox";
import { commentData } from "./utils";
import styles from "./app.module.scss";

export default function App() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { Title, Paragraph } = Typography;
  const { TextArea } = Input;

  const onSubmit = (values) => {
    dispatch(addComment(commentData(values.comment)));
    form.resetFields();
  };

  return (
    <Card className={styles.appWrapper}>
      <Row>
        <Col xs={24}>
          <Title level={4}>
            Late Night Random Discussion Thread - 16 June, 2023
          </Title>
          <Paragraph>
            Place for Random Thoughts. Tell us about your life, culture, city,
            day, hobbies, favorite food, movies or anything general in life.
            Share away anything you want, and make some new friends along the
            way. Note: Please keep all comments Civil and Non-Political. Make
            Sure to take permission before sending DM and dont tag Non-Regular
            users.
          </Paragraph>
          <Form layout="vertical" onFinish={onSubmit} form={form}>
            <Form.Item
              label="Comment as User"
              name="comment"
              rules={[{ required: true, message: "Field is required" }]}
            >
              <TextArea rows={4} autoFocus />
            </Form.Item>
            <Button htmlType="submit">Comment</Button>
          </Form>
        </Col>
        <Col xs={24}>
          <CommentBox />
        </Col>
      </Row>
    </Card>
  );
}
