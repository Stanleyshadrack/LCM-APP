// components/MessagesModal.tsx
import React from 'react';
import { Modal, Tabs } from 'antd';
import { UserOutlined, TeamOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

interface MessagesModalProps {
  visible: boolean;
  onClose: () => void;
}

const MessagesModal: React.FC<MessagesModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      title="Messages"
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab={<><UserOutlined /> Direct Chat</>} key="1">
          {/* One-to-one chat UI goes here */}
          <p>One-to-One Chat Component</p>
        </TabPane>
        <TabPane tab={<><TeamOutlined /> Group Chat</>} key="2">
          {/* Group chat UI goes here */}
          <p>Group Chat Component</p>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default MessagesModal;

