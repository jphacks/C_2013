import React from "react";
import Header from "../components/header";
import { Form, Input, Button } from "antd";
import config from "../config.json";
import { Modal } from "antd";
import { Redirect } from "react-router-dom";
const info = () => {
  Modal.info({
    title: "テンプレートが登録されました",
    content: (
      <div>
        <p>OKボタンでホームに戻ります</p>
      </div>
    ),
    onOk() {
      window.location.href = "/";
    },
  });
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const base_url = config[process.env.NODE_ENV]["backend"];

const ConfirmationPage = ({ imgURL }) => {
  const onFinish = (values) => {
    console.log("Success:", values);
    postData(values.templatename);
    info();
  };

  const postData = (templatename) => {
    const body = { file: imgURL, name: templatename };
    fetch(base_url + "/template/eyebrow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {!imgURL ? (
        <Redirect to="/error" />
      ) : (
        <>
          <Header />
          <div style={{ width: "90%", margin: "auto", fontFamily: "book" }}>
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: false }}
              onFinish={onFinish}
              onFinishFailed={<Redirect to="/error" />}
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
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ margin: "auto" }}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </>
      )}
    </>
  );
};

export default ConfirmationPage;
