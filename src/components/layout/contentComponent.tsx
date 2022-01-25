import { FC, useEffect, useState } from 'react';
import { Layout, Table, Avatar } from 'antd';
import styled from "styled-components";
import {useMyContext} from '../../context/MyContext';
// import styled from 'styled-components';

const ContentComponent: FC = () => {
  const [store, setStore] = useMyContext();
  // let avatarString: string = store.image64;
  type MyType = {
    username: string,
    avatar: string,
    firstname: string,
    lastname: string,
    email: string,
  };
  const [tableData, setTabledata] = useState([{}]);

  let localData: any = localStorage.getItem('tableData');
  let temp: MyType[] = [];

  useEffect(()=>{
    let storeData: any = store.data;
    let currentUser: MyType = {
      username: storeData.username,
      avatar: storeData.avatar,
      firstname: storeData.firstname,
      lastname: storeData.lastname,
      email: storeData.email,
    };
    temp.push(currentUser);setTabledata([...tableData, ...temp]);
    // console.log(tableData);
    setStore({count: tableData.length-1});
  }, [store.data]);

  const columns = [
    {
      title: 'username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar: any) => <Avatar src={avatar} />,
    },
    {
      title: 'first name',
      dataIndex: 'firstname',
      key: 'firstname',
    },
    {
      title: 'last name',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
  ];
  let dataSource = [
    {
      username: '1',
      avatar: <Avatar src={store.image64} />,
      firstname: 32,
      lastname: '10 Downing Street',
      email: '10 Downing Street',
    },
  ];

  return (
    <>
      <StyledLayout>
        <div>
          <Avatar src={store.image64} />
          <a href="https://ant.design">{store.name}</a>
        </div>
        <Table dataSource={tableData.slice(2, tableData.length)} columns={columns} />
      </StyledLayout>
    </>
  );
};

const StyledLayout = styled(Layout)`
  padding: 30px;
`;

export default ContentComponent;
