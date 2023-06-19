import { Form, Input, Row, Col, Button } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addReply } from '../../store/commentSlice';
import { commentData } from '../../utils';
import styles from './index.module.scss';

export default function Reply({ commentId, setIsReply }) {
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    dispatch(addReply({ commentId, commentData: commentData(values.reply) }))
    setIsReply(false)
  }
  return (
    <Form className={styles.replyWrapper} onFinish={onSubmit}>
      <Row>
        <Col span={22}>
          <Form.Item style={{margin: 0}} name="reply" rules={[{ required: true, message: 'This field is required!' }]}>
            <Input autoFocus placeholder='Reply'/>
          </Form.Item>
        </Col>
        <Col xs>
          <Button type="link" htmlType='submit'>Reply</Button>
        </Col>
      </Row>
    </Form>
  )
}

Reply.propTypes = {
  commentId: PropTypes.string.isRequired,
  setIsReply: PropTypes.func.isRequired
};