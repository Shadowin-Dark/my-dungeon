import React from 'react';
import { Layout } from 'antd';

import styles from './layout.modules.css';

const { Header, Sider, Content } = Layout;

export const PlayField = React.memo(({ Menu, Players, Map, Details }) => {
  return (
    <Layout className={styles.layout}>
      <Sider>
        <Layout>
          <Header>{Menu}</Header>
          <Content>{Players}</Content>
        </Layout>
      </Sider>
      <Content style={{ background: '#bfd8ee' }} className={styles.playground}>
        {Map}
      </Content>
      {Details && <Sider>{Details}</Sider>}
    </Layout>
  );
});
