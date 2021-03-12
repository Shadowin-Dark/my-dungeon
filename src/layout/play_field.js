import React from 'react';
import { Layout } from 'antd';

import styles from './layout.modules.css';

const { Header, Sider, Content, Footer } = Layout;

export const PlayField = React.memo(({ Menu, Players, Actions, Map, Details }) => {
  return (
    <Layout className={styles.layout}>
      <Sider>
        <Layout style={{ height: '100%' }}>
          <Header>{Menu}</Header>
          <Content>{Players}</Content>
          <Footer style={{ padding: '10px' }}>{Actions}</Footer>
        </Layout>
      </Sider>
      <Content style={{ background: '#bfd8ee' }} className={styles.playground}>
        {Map}
      </Content>
      {Details && <Sider>{Details}</Sider>}
    </Layout>
  );
});
