import React from 'react';

import { Menu, Dropdown, Modal, Form, InputNumber } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const NewGameModal = React.memo(({ visible, setVisible, onNewGame }) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };

  const handleOk = () => {
    const { height, width, players } = form.getFieldValue();
    onNewGame(height, width, players);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal title="Start a New Game" visible={visible} onOk={handleOk} onCancel={handleCancel}>
      <Form {...layout} form={form} initialValues={{ height: 3, width: 4, players: 1 }}>
        <Form.Item
          name={['height']}
          label="Height of the Map"
          rules={[{ type: 'number', min: 0, max: 99 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={['width']}
          label="Width of the Map"
          rules={[{ type: 'number', min: 0, max: 99 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={['players']}
          label="Player Number"
          rules={[{ type: 'number', min: 0, max: 4 }]}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export const Settings = React.memo(({ onNewGame }) => {
  const [showNew, setShowNew] = React.useState(false);

  const menu = (
    <Menu>
      <Menu.Item>
        <div onClick={() => setShowNew(true)}>New Game</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu}>
        {/* eslint-disable-next-line */}
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          MENU <DownOutlined />
        </a>
      </Dropdown>
      <NewGameModal visible={showNew} setVisible={setShowNew} onNewGame={onNewGame} />
    </>
  );
});
