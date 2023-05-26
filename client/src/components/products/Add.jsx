import {Button, Form, Input, message, Modal, Select} from 'antd'
import React from 'react'

const Add = ({isAddModalOpen, setIsAddModalOpen, categories, products, setProducts }) => {
  const [form] = Form.useForm();


  const onFinish = (values)=> {
    try {
      fetch(process.env.REACT_APP_SERVER_URL + "/api/products/add-product", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {"Content-type": "application/json; charset=UTF-8"},
      });
      message.success("Food successfully added");
      form.resetFields();
      setProducts ([
        ...products,
        {
          ...values,   
          _id: Math.random(),
          price: Number(values.price),  
        },
      ]);
      setIsAddModalOpen(false)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal title="Add New Food" open={isAddModalOpen} onCancel={() => setIsAddModalOpen(false)} footer={false} >
      <Form layout="vertical" onFinish={onFinish} form={form} >
        <Form.Item name="title" label="Food Name" rules={[{required: true, message:"Food name field cannot be empty"}]}>
          <Input placeholder="Enter food name"/>
        </Form.Item>
        <Form.Item name="img" label="Food Image" rules={[{required: true, message:"Food image field cannot be empty"}]}>
          <Input placeholder="Enter food image"/>
        </Form.Item>
        <Form.Item name="price" label="Food Price" rules={[{required: true, message:"Food price field cannot be empty"}]}>
          <Input placeholder="Enter food price"/>
        </Form.Item>
        <Form.Item name="category" label="Choose Category" rules={[{required: true, message:"Category field cannot be empty"}]}>
          <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.title ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.title ?? "")
                .toLowerCase()
                .localeCompare((optionB?.title ?? "").toLowerCase())
            }
            options={categories}
          />  
        </Form.Item>
        <Form.Item className="flex justify-end mb-0">
          <Button type="primary" htmlType="submit">Add</Button>
        </Form.Item>
      </Form>
  </Modal>  
  );
};

export default Add;