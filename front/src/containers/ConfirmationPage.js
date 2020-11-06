import React from "react";
import Header from "../components/header";
import { Form, Input, Button } from "antd";
import config from "../config.json";

const base_url = config[process.env.NODE_ENV]["backend"];

const ConfirmationPage = ({ imgURL }) => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 10 },
  };
  const onFinish = (values) => {
    console.log("Success:", values);
    postData(values.templatename);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const postData = (templatename) => {
    const body = { file: imgURL, name: templatename };
    fetch(base_url + "/template/eyebrow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => { console.log(data) })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Header />
      <div style={{ width: "90%", margin: "auto", fontFamily: "book" }}>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ marginBottom: "100px" }}
        >
          <Form.Item
            label="テンプレート名"
            name="templatename"
            rules={[
              { required: true, message: "テンプレートに名前をつけてね" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item style={{ margin: "auto", width: "75px" }}>
            <Button type="primary" htmlType="submit" style={{ margin: "auto" }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ConfirmationPage;
