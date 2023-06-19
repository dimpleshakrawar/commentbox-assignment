import { useState } from "react";
import PropTypes from "prop-types";
import { Card, Typography, Row, Col, Avatar } from "antd";
import {
  UserOutlined,
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import Reply from "../reply";
import Edit from "../edit";
import { deleteComment } from "../../store/commentSlice";
import styles from "./index.module.scss";

export default function Comment({ comment }) {
  const dispatch = useDispatch();
  const { Text, Title, Link } = Typography;
  const [isReply, setIsReply] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className={styles.commentWrapper}>
      <Card bodyStyle={{ paddingTop: "8px", paddingBottom: "8px" }}>
        <Row align="middle" gutter={16}>
          <Col>
            <Avatar icon={<UserOutlined />} />
          </Col>
          <Col>
            <Row align="middle">
              <Col xs={24}>
                <div className={styles.comment_user}>
                  <Title level={5} className={styles.comment_user_title}>
                    {comment.user}
                  </Title>
                  <Text className={styles.comment_user_time}>
                    {comment.time}
                  </Text>
                  <Link type="link" onClick={() => setIsReply(!isReply)}>
                    <CommentOutlined /> Reply
                  </Link>
                  <Link onClick={() => setIsEdit(!isEdit)}>
                    <EditOutlined /> Edit
                  </Link>
                  <Link
                    onClick={() =>
                      dispatch(deleteComment({ commentId: comment.id }))
                    }
                  >
                    <DeleteOutlined /> Delete
                  </Link>
                </div>
              </Col>
              <Col xs={24}>
                {isEdit ? (
                  <Edit
                    editText={comment.name}
                    commentId={comment.id}
                    setIsEdit={setIsEdit}
                  />
                ) : (
                  <Text className={styles.comment_name}>{comment.name}</Text>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
      {isReply && <Reply commentId={comment.id} setIsReply={setIsReply} />}
      <div style={{ paddingLeft: "20px" }}>
        {comment?.items?.map((cmt) => (
          <Comment key={cmt.id} comment={cmt} />
        ))}
      </div>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string,
    user: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    time: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired,
        name: PropTypes.string,
        time: PropTypes.string,
      })
    ),
  }),
};
