import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import {
  BarsOutlined,
  UserOutlined,
  SearchOutlined,
  PlusOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

export default function SidebarJiraclone() {

  const [state, setState] = useState({
    collapsed: false,
  });

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };

  return (
    <div>
      <Sider trigger={null} collapsible collapsed={state.collapsed} style={{ minHeight: '100%' }}>
        <div className="text-right pr-2 text-light" onClick={toggle} style={{ cursor: 'pointer', fontSize: '20px' }}><BarsOutlined /></div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<PlusOutlined />}>
            Create Issues
          </Menu.Item>
          <Menu.Item key="2" icon={<SearchOutlined />}>
            Search
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
}
