import { FC } from 'react';
import { Layout } from 'antd';
// import styled from 'styled-components';
import {useMyContext} from '../../context/MyContext';

const HeaderComponent: FC = () => {
  const [store, setStore] = useMyContext();
  
  return (
    <>
      <Layout>
        Generated Contacts: {store.count}
      </Layout>
    </>
  );
};

export default HeaderComponent;
