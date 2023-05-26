import {Form, Input, Button, Carousel, message} from "antd";
import {Link, useNavigate} from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";
import Checkbox from "antd/es/checkbox/Checkbox";
import {useState} from "react";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values)=> {
    setLoading(true);
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/auth/login", {
        method: "POST",
        body: JSON.stringify(values), 
        headers: {"Content-type": "application/json; charset=UTF-8"},
      });

      const user = await res.json();


      if (res.status === 200) {
        localStorage.setItem(
          "posUser",
          JSON.stringify({
            username: user.username,
            email: user.email,
          })
        );
        message.success("Registration successful");
        navigate("/");
      } else if(res.status === 404){
        message.error("User not found");
      } else if(res.status === 403){
        message.error("Wrong password");
      }
      setLoading(false);
    } catch (error) {
      message.error("Something went wrong");
      console.log(error);
      setLoading(false);
    }  
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-2">Restaurant</h1>
          <Form layout="vertical" onFinish={onFinish} initialValues={{remember: false}}>
                <Form.Item label="E-mail" name={"email"} rules={[{required: true, message:"E-mail space cannot be empty",},]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Password" name={"password"} rules={[{required: true, message:"Password space cannot be empty",},]}>
                  <Input.Password />
                </Form.Item>
                <Form.Item name={"remember"} valuePropName="checked">
                    <div className="flex justify-between items-center">
                      <Checkbox>Remember me</Checkbox>
                      <Link>Forgot Password?</Link>
                    </div>
                </Form.Item>
                <Form.Item>
                   <Button type="primary" htmlType="submit" className="w-full" size="large" loading={loading}>Sign in</Button>
                </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Don't have an account?&nbsp; <Link to="/Register" className="text-blue-600">Register</Link>
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

export default Login;