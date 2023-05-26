import {Form, Input, Button, Carousel, message} from "antd";
import {Link} from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";
import { useNavigate } from "react-router-dom";
import {useState} from "react";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values)=> {
    setLoading(true)
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/auth/register", {
        method: "POST",
        body: JSON.stringify(values), 
        headers: {"Content-type": "application/json; charset=UTF-8"},
      });
      if(res.status === 200) {
        message.success("Registration successful");
        navigate("/login");
        setLoading(false);
      }
    } catch (error) {
      message.error("Something went wrong");
      console.log(error);
    }  
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-2">Restaurant</h1>
          <Form layout="vertical" onFinish={onFinish}>
                <Form.Item label="User Name" name={"username"} rules={[{required: true, message:"User Name space cannot be empty",},]}>
                  <Input />
                </Form.Item>
                <Form.Item label="E-mail" name={"email"} rules={[{required: true, message:"E-mail space cannot be empty",},]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Password" name={"password"} rules={[{required: true, message:"Password space cannot be empty",},]}>
                  <Input.Password />
                </Form.Item>
                <Form.Item 
                  label="Password Again"
                  name={"passwordAgain"}
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message:"Password Again space cannot be empty",
                    },
                    ({ getFieldValue }) => ({
                      validator(_,value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match"));
                      },
                    }),
                  ]}
                >
                  <Input.Password/>
                </Form.Item>
                <Form.Item>
                   <Button type="primary" htmlType="submit" className="w-full" size="large" loading={loading}>Register</Button>
                </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Do you have an account?&nbsp; <Link to="/login" className="text-blue-600">Sign in</Link>
          </div>
        </div>
        <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#f62929fb] h-full">
          <div className="w-full h-full flex items-center">
            <div className="w-full">
              <Carousel className="!h-full px-6" autoplay >
                <AuthCarousel img="/images/ilksayfa.png" title="Online Order" desc="Compatible with all devices" />
                <AuthCarousel img="/images/ikincisayfa.png" title="Online Order" desc="Compatible with all devices" />
                <AuthCarousel img="/images/sonsayfa.png" title="Online Order" desc="Compatible with all devices" />
              </Carousel>  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;