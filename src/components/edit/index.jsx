import { useDispatch } from "react-redux";
import { Form, Input, Row, Col, Button } from "antd";
import PropTypes from "prop-types";
import { editComment } from "../../store/commentSlice";
import { commentData } from "../../utils";
import styles from "./index.module.scss";

export default function Edit({ editText, commentId, setIsEdit }) {
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    dispatch(
      editComment({ commentId, editCommentData: commentData(values.edit) })
    );
    setIsEdit(false);
  };

  return (
    <Form
      className={styles.editWrapper}
      onFinish={onSubmit}
      initialValues={{ edit: editText }}
    >
      <Row>
        <Col span={20}>
          <Form.Item
            style={{ margin: 0 }}
            name="edit"
            rules={[{ required: true, message: "This field is required!" }]}
          >
            <Input autoFocus placeholder="Reply" />
          </Form.Item>
        </Col>
        <Col xs>
          <Button type="link" htmlType="submit">
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

Edit.propTypes = {
  editText: PropTypes.string,
  commentId: PropTypes.string.isRequired,
  setIsEdit: PropTypes.func.isRequired,
};
