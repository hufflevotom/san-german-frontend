import React from "react";
import { Button, Form, Input } from "antd";
// import { Link } from "react-router-dom";
// import IntlMessages from "util/IntlMessages";
import { useAuth } from "../authentication";
import AppNotificationContainer from "../components/AppNotificationContainer";

const SignIn = () => {
  const { isLoading, error, userLogin } = useAuth();

  const onFinishFailed = errorInfo => {
  };

  const onFinish = values => {
    userLogin(values);
  };

  return (
    <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100%", backgroundColor: '#F8F9FA' }}>
      <div style={{ width: "30%", padding: "15px", display: 'flex', justifyContent: "center", alignItems: "center" }}>
        <div className="gx-app-login-main-content" style={{ padding: "30px", alignItems: "center", justifyContent: "center" }}>
          <img alt="example" src="/assets/images/logo-white.png" style={{ width: '60%', paddingBottom: '25px' }} />
          <Form
            initialValues={{ remember: true }}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="gx-signin-form gx-form-row0"
            style={{ width: "90%" }}
          >
            <Form.Item
              initialValue="demo@example.com"
              rules={[{ required: true, message: 'The input is not valid E-mail!' }]} name="email">
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              initialValue="demo#123"
              rules={[{ required: true, message: 'Please input your Password!' }]} name="password">
              <Input type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button style={{ backgroundColor: '#CC2E72', color: '#fff', width: '100%' }} className="gx-mb-0" htmlType="submit">
                Ingresar
              </Button>
            </Form.Item>
          </Form>
          <AppNotificationContainer loading={isLoading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
