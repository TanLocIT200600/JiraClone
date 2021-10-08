import React, { useState } from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'

const { Option } = Select;

const ModalJiraCloneHOC = () => {
  const dispatch = useDispatch();
  const { visible, ComponentContentDrawer, callBackSubmit } = useSelector(state => state.ModalJiraCloneReducer)
  console.log('visible', visible);
  const showDrawer = () => {
    dispatch({
      type: 'OPEN_DRAWER_MODAL'
    })
  };

  const onClose = () => {
    dispatch({
      type: 'CLOSE_DRAWER_MODAL'
    })
  };

  return (
    <>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={callBackSubmit} type="primary">Submit</Button>
          </Space>
        }
      >
        {/* Noi dung thay doi cua drawer */}
        {ComponentContentDrawer}
      </Drawer>
    </>
  );
}

export default ModalJiraCloneHOC;
