import {Badge, Input, message} from 'antd';
import {SearchOutlined, HomeOutlined, ShoppingCartOutlined, CopyOutlined, UserOutlined, BarChartOutlined, LogoutOutlined} from '@ant-design/icons';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const Header = ({setSearch}) => {
  const cart = useSelector((state) => state.cart);
  const {pathname} = useLocation();
  const navigate = useNavigate();



  const logOut = ()=> {
    if (window.confirm("Are you sure to log out?")){
      localStorage.removeItem("posUser");
      navigate("/login");
      message.success("Logged out");
    }
  };

  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6 flex justify-between items-center gap-10">
        <div className="logo">
          <a href="/">
            <h2 className="text-2xl font-bold md:text-4xl">Restaurant</h2>
          </a>
        </div>
        <div className="header-search flex-1 flex justify-center">
          <Input size="large" placeholder="Search in Restaurant..." prefix={<SearchOutlined />} className="rounded-full max-w-[800px]" onClick={()=> {pathname !== "/" && navigate("/")}} onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}/>   
        </div>
        <div className="menu-links flex justify-between items-center gap-7 md:static fixed z-50 bottom-0 md:w-auto w-screen md:bg-transparent bg-white left-0 md:border-t-0 border-t md:px-0 px-4 py-1">
          <Link to={"/"} className="menu-link flex flex-col hover:text-[#ff0000] transition-all gap-y-[2px]">
            <HomeOutlined className="md:text-2xl text-xl"  />
            <span className="md:text-xs text-[10px]">Home</span>
          </Link>
          <Badge count={cart.cartItems.length} offset={[0,0]} className="md:flex hidden">
            <Link to={"/cart"} className="menu-link flex flex-col hover:text-[#ff0000] transition-all">
               <ShoppingCartOutlined className="md:text-2xl text-xl"  />
               <span className="md:text-xs text-[10px]">Shopping Cart</span>
            </Link>
          </Badge>
          <Link to={"/bills"} className="menu-link flex flex-col hover:text-[#ff0000] transition-all">
            <CopyOutlined className="md:text-2xl text-xl"  />
            <span className="md:text-xs text-[10px]">Bill</span>
          </Link>
          <Link to={"/customers"} className="menu-link flex flex-col hover:text-[#ff0000] transition-all">
            <UserOutlined className="md:text-2xl text-xl"  />
            <span className="md:text-xs text-[10px]">Users</span>
          </Link>
          <Link to={"/statistic"} className="menu-link flex flex-col hover:text-[#ff0000] transition-all">
            <BarChartOutlined className="md:text-2xl text-xl"  />
            <span className="md:text-xs text-[10px]">Statistics</span>
          </Link>
         <div onClick={logOut}>
         <Link className="menu-link flex flex-col hover:text-[#ff0000] transition-all">
            <LogoutOutlined className="md:text-2xl text-xl"  />
            <span className="md:text-xs text-[10px]">Log Out</span>
          </Link>
         </div>
        </div>
        <Badge count={cart.cartItems.length} offset={[0,0]} className="md:hidden flex">
            <a href={"/"} className="menu-link flex flex-col hover:text-[#ff0000] transition-all">
               <ShoppingCartOutlined className="md:text-2xl text-xl"  />
               <span className="md:text-xs text-[10px]">Shopping Cart</span>
            </a>
          </Badge>
      </header>
    </div>
  );
};

export default Header;