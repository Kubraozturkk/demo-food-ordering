import {Button, Card, Form, Input, Select, Modal, message} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../redux/cartSlice"; 
import { useNavigate } from "react-router-dom";

const CreateBill = ({isModalOpen, setIsModalOpen }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {

      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/add-bill", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          subTotal: cart.total,
          tax: ((cart.total * cart.tax) / 100).toFixed(2),
          totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
          cartItems: cart.cartItems,
        }), 
        headers: {"Content-type": "application/json; charset=UTF-8"},
      });

      if (res.status === 200) {
        message.success("Bill created");
        dispatch(reset());
        navigate("/bills");
      }
    } catch (error) {
      message.danger("Something went wrong");
      console.log(error);
    }
  };

  return (
    <Modal title="Create Bill" open={isModalOpen} footer={false} onCancel={() => setIsModalOpen(false)} >
      <Form layout={"vertical"} onFinish={onFinish}>
       <Form.Item label="Name" name={"customerName"} rules={[{required: true, message:"Name space cannot be empty" }]}>
       <Input placeholder="Enter Your Name" /> 
       </Form.Item>
       <Form.Item label="Phone Number" name={"customerPhoneNumber"} rules={[{required: true, message:"Phone number space cannot be empty"}]}>
       <Input placeholder="Enter Your Phone Number"  maxLength={11} /> 
       </Form.Item>
       <Form.Item label="Payment Method" name={"paymentMode"} rules={[{required: true}]}>
         <Select placeholder="Select Payment Method">
           <Select.Option value="Cash Money">Cash Money</Select.Option>
           <Select.Option value="Credit Card">Credit Card</Select.Option>
         </Select>
       </Form.Item>

          <Card className="">
          <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${cart.total > 0 ? cart.total.toFixed(2) : 0}</span> 
            </div>
            <div className="flex justify-between my-2">
              <span>TAX %{cart.tax}</span>
              <span className="text-red-600">${(cart.total * cart.tax) / 100 > 0 ? `+${((cart.total * cart.tax) / 100).toFixed(2)}` : 0}</span> 
            </div>
            <div className="flex justify-between">
              <b>Total</b>
              <b>${cart.total + (cart.total * cart.tax) / 100 > 0 ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2) : 0}</b> 
            </div>
            <Button className="mt-4 w-full" type="primary" size="large" onClick={() => setIsModalOpen(true)} htmlType="submit">Order Now</Button>
          </Card>

      </Form>
    </Modal>
  );
};

export default CreateBill;