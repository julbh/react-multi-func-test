import React, { FC, createContext, useState } from "react";
import { Layout } from "antd";
import styled from "styled-components";
import "antd/dist/antd.css";
import ContentComponent from "./contentComponent";
import SiderComponent from "./siderComponent";
import HeaderComponent from "./headerComponent";
import { MyContextProvider } from "../../context/MyContext";

const { Header, Footer, Sider, Content } = Layout;
const MainLayout: FC = () => {
  return (
    <>
      <MyContextProvider>
        <Layout>
          <Header>
            <HeaderComponent />
          </Header>
          <Layout>
            <Sider
              theme="light"
              breakpoint="lg"
              collapsedWidth="0"
              onBreakpoint={(broken) => {
                console.log(broken);
              }}
              onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
              }}
            >
              <SiderComponent />
            </Sider>
            <Content>
              <ContentComponent />
            </Content>
          </Layout>
        </Layout>
      </MyContextProvider>
    </>
  );
};

const StyledSider = styled(Sider)`
  width: 500px;
  background-color: green;
`;

export default MainLayout;
