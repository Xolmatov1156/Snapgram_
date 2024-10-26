import { Link } from "react-router-dom";
import Logo from "../assets/logoo.svg";

const NotFound = () => {
    return (
      <div className="bg-black text-white h-screen flex flex-col justify-center items-center gap-[20px]">
        <div className="flex items-center gap-[10px]">
            <h2 className="text-[34px]">4</h2>
            <img src={Logo} alt="logo" className="w-[40px] h-[40px]"/>
            <h2 className="text-[34px]">4</h2>
        </div>
        <p className="text-4xl font-semibold">Page Not Found</p>
        <p className="text-gray-400">The page you're looking for doesn't exist</p>
        <Link to={'/'} className="bg-[#877EFF] hover:bg-[#746cef] text-white font-bold py-2 px-4 rounded duration-300">Go Home</Link>
      </div>
    );
  };
  
  export default NotFound;
  