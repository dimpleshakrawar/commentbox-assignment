import Comment from "../comment";
import styles from "./index.module.scss";
import { useSelector } from "react-redux";

export default function CommentBox() {
  const commentsData = useSelector((state) => state.comment);
  return (
    <div className={styles.wrapperCommentBox}>
      {commentsData?.map((item) => (
        <Comment key={item.id} comment={item} />
      ))}
    </div>
  );
}
