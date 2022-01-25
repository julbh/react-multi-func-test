import { FC, useState, useEffect } from "react";
import { Layout } from "antd";
import { Image } from "antd";
import styled from "styled-components";
import _ from "lodash";
import "antd/dist/antd.css";
import { Form, Input, Select, Tooltip, Button, Space, Typography, Row, Col, Spin, Alert } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { createAvatar } from "@dicebear/avatars";
import {useMyContext} from '../../context/MyContext';
// import * as identicon from '@dicebear/avatars-identicon-sprites';
import * as male from "@dicebear/avatars-male-sprites";
import * as female from "@dicebear/avatars-female-sprites";

const { Option } = Select;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const SiderComponent: FC = () => {
  const [seedText, setSeedtext] = useState("");
  const [spriteText, setSpritetext] = useState("");
  const [image64, setImage64] = useState("");
  const [isLoad, setIsload] = useState(false);
  const [store, setStore] = useMyContext();
  let currentUser = {
    username: '',
    avatar: '',
    firstname: '',
    lastname: '',
    email: '',
  };
  const [user, setUser] = useState({});
  // console.log(localStorage.getItem('token'));
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    setIsload(true);
      fetch('https://randomuser.me/api/?seed=' + values.username)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setUserData(data.results[0]);
          setIsload(false);
        })
        .catch((error) => {
          console.log(error);
          alert("Please check your network!");
          setIsload(false);
        })
  };

  const setUserData = (results: any) => {
    currentUser = {
      username: results.name.title,
      avatar: store.image64,
      firstname: results.name.first,
      lastname: results.name.last,
      email: results.email,
    };
    setStore({data: currentUser})
  };

  useEffect(() => {
    if(isLoad === false && spriteText !== "") {
      let svg: any;
      if (spriteText == "male")
        svg = createAvatar(male, {
          seed: seedText,
        });  
      if (spriteText == "female")
        svg = createAvatar(male, {
          seed: seedText,
        });  
      var svg64 = btoa(unescape(encodeURIComponent(svg)));
      // var svg64 = encodeURIComponent(svg).toString('base64');
      setImage64("data:image/svg+xml;base64," + svg64);
      setStore({image64: "data:image/svg+xml;base64," + svg64});   
  }
  }, [seedText]);

  const handleNameChange = (e: any) => {
    if(spriteText !== "" && e.target.value !== "")
      setIsload(false);
    setSeedtext(e.target.value);    
  };

  const handleKeyDown = (e: any) => {
    setIsload(true);
    // console.log(e.target.value);
    setStore({name: e.target.value, image64: ''});
  };

  const handleSpriteChange = (e: any) => {
    setSpritetext(e);
  };

  return (
    <>
      <Row style={{marginTop: 30}}>
        <Col span={4}></Col>
        <Col span={16}>
          <div style={{width: 100, height: 100}}>
            {isLoad === true?
            <Spin tip="Loading...">
              <div style={{width: 100, height: 100}}></div>
            </Spin>
            :
            <Image src={image64} />}
          </div>
        </Col>
        <Col span={4}></Col>
      </Row>
      <Row style={{marginTop: 30}}>
        <StyledForm
          name="complex-form"
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item label="sprite">
            <Space>
              <Form.Item
                name="sprite"
                noStyle
                rules={[{ required: true, message: "sprite is required" }]}
              >
                <Select placeholder="Select sprite" onChange={handleSpriteChange} style={{ width: 110 }}>
                  <Option value="male">male</Option>
                  <Option value="female">female</Option>
                </Select>
              </Form.Item>
            </Space>
          </Form.Item>
          <Form.Item label="seed">
            <Space>
              <Form.Item
                name="username"
                noStyle
                rules={[{ required: true, message: "Username is required" }]}
              >
                <Input
                  style={{ width: 110 }}
                  placeholder="Please input"
                  value={seedText}
                  onChange={_.debounce(handleNameChange, 2000)}
                  onKeyUp={handleKeyDown}
                />
              </Form.Item>
            </Space>
          </Form.Item>
          <Form.Item label=" " colon={false}>
          {isLoad === true?
            <Button type="primary" htmlType="submit" loading>
              Submit
            </Button>
            :
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          }
          </Form.Item>
        </StyledForm>
      </Row>
    </>
  );
};

const StyledForm = styled(Form)`
  padding: 10px;
`;

export default SiderComponent;
