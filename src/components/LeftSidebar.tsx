import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { useGetUserQuery } from "../redux/api/users-api";
import {
  HomeIcon,
  ExploreIcon,
  PeopleIcon,
  SavedIcon,
  ReelsIcon,
  ChatIcon,
  CreatePostIcon,
  LogOutIcon,
  SettignsIcon,
} from "../assets/Icons";

const LeftSidebar = () => {
  const currentUserUsername = window.localStorage.getItem("userData")
    ? JSON.parse(window.localStorage.getItem("userData") as string).username
    : null;
  const { data: currentUserInfo } = useGetUserQuery(currentUserUsername);

  return (
    <div className="col-span-2 h-screen bg-black overflow-y-auto">
      <div className="pt-[48px] px-[24px] w-full h-[600px] text-white">
        <Link to={"/"} className="flex gap-[10px]">
          <img src={Logo} alt="logo" />
          <h2 className="text-[28px] font-semibold">Snapgram</h2>
        </Link>
        <div className="flex gap-[10px] items-center mt-[44px]">
          <img
            className="rounded-full bg-white"
            src={import.meta.env.VITE_API_URL + currentUserInfo?.photo}
            alt="photo"
            width={56}
            height={56}
          />
          <div className="flex flex-col">
            {/* Wrap username and fullName in a Link to the ProfilePage */}
            <Link to={`/profile/${currentUserInfo?.username}`}>
              <p className="capitalize">{currentUserInfo?.username}</p>
              <p className="capitalize text-gray-500 text-[14px]">
                @{currentUserInfo?.fullName}
              </p>
            </Link>
          </div>
        </div>
        <div className="mt-[44px] flex flex-col gap-[24px]">
          <NavLink
            to={"/"}
            className={`flex w-full p-[15px] gap-[18px] text-white rounded-lg`}
          >
            <HomeIcon /> Home
          </NavLink>
          <NavLink
            to={"/explore"}
            className={`flex w-full p-[15px] gap-[18px] text-white rounded-lg`}
          >
            <ExploreIcon /> Explore
          </NavLink>
          <NavLink
            to={"/people"}
            className={`flex w-full p-[15px] gap-[18px] text-white rounded-lg`}
          >
            <PeopleIcon /> People
          </NavLink>
          <NavLink
            to={"/saved"}
            className={`flex w-full p-[15px] gap-[18px] text-white rounded-lg`}
          >
            <SavedIcon /> Saved
          </NavLink>
          <NavLink
            to={"/reels"}
            className={`flex w-full p-[15px] gap-[18px] text-white rounded-lg`}
          >
            <ReelsIcon /> Reels
          </NavLink>
          <NavLink
            to={"/chats"}
            className={`flex w-full p-[15px] gap-[18px] text-white rounded-lg`}
          >
            <ChatIcon /> Chats
          </NavLink>
          <NavLink
            to={"/create"}
            className={`flex w-full p-[15px] gap-[18px] text-white rounded-lg`}
          >
            <CreatePostIcon /> Create Post
          </NavLink>
        </div>
        <div className="mt-[108px]">
          <div
            className={`cursor-pointer flex w-full p-[15px] gap-[18px] text-white rounded-lg`}
          >
            <LogOutIcon />
            Logout
          </div>
          <div
            className={`cursor-pointer flex w-full p-[15px] gap-[18px] text-white rounded-lg`}
          >
            <SettignsIcon />
            Settings
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
