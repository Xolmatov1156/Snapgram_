import {
  useFollowMutation,
  useGetUserQuery,
  useGetAllUserQuery,
} from "../redux/api/users-api";
import { User } from "../../src/types/index";
import UserName from "../../src/assets/user.svg";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { useEffect } from "react";

const Creator = () => {
  const { data: users, isLoading } = useGetAllUserQuery({});
  const [followUser] = useFollowMutation();
  const navigate = useNavigate();

  const handleFollow = (username: string) => {
    followUser(username);
  };

  const currentUserUsername = window.localStorage.getItem("userData")
    ? JSON.parse(window.localStorage.getItem("userData") as string).username
    : null;

  const { data: currentUserInfo } = useGetUserQuery(currentUserUsername);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = UserName;
  };

  const handleClick = (username: string) => {
    navigate(`/users/${username}`);
  };
  useEffect(() => {
    console.log("isLoading:", isLoading);
  }, [isLoading]);

  const userItems: JSX.Element[] = users?.map(
    (user: User): JSX.Element => (
      <div key={user._id} className="">
        <div className="p-[20px] w-[180px] h-[190px] border border-gray-500 rounded-xl">
          <div
            onClick={() => handleClick(user.username)}
            className="cursor-pointer"
          >
            <img
              onError={handleImageError}
              src={user.photo}
              alt={user.fullName}
              className="w-[54px] h-[54px] rounded-full mx-auto bg-white"
            />
            <h3 className="mt-[10px] line-clamp-1">{user.username}</h3>
          </div>
          {currentUserInfo &&
          user.followers?.some(
            (follower: any) => follower._id === currentUserInfo._id
          ) ? (
            <button
              onClick={() => handleFollow("unfollow/" + user.username)}
              className="bg-[red] text-white w-[74px] py-[5px] mt-[18px] rounded-lg"
            >
              Unfollow
            </button>
          ) : (
            <button
              onClick={() => handleFollow("follow/" + user.username)}
              className="bg-[#877EFF] text-white w-[74px] py-[5px] mt-[18px] rounded-lg"
            >
              Follow
            </button>
          )}
        </div>
      </div>
    )
  );

  

  const skeletonItems: JSX.Element[] = Array.from(new Array(6)).map(
    (_, index) => (
      <div
        key={index}
        className="p-[20px] w-[180px] h-[190px] border border-gray-500 rounded-xl"
      >
        <Skeleton
          variant="circular"
          width={54}
          height={54}
          className="mx-auto mt-[0px]"
          sx={{ bgcolor: "grey.800", color: "grey.700" }}
        />
        <Skeleton
          variant="text"
          width={74}
          className="mx-auto mt-[15px]"
          sx={{ bgcolor: "grey.800", color: "grey.700" }}
        />
        <Skeleton
          variant="rectangular"
          width={74}
          height={30}
          className="mx-auto mt-[18px] rounded-md"
          sx={{ bgcolor: "grey.800", color: "grey.700" }}
        />
      </div>
    )
  );

  return (
    <div className="col-span-4 bg-black h-screen flex flex-wrap gap-[20px] pl-[20px] overflow-y-auto text-white text-center py-[40px]">
      <h2 className="text-[24px] w-full text-start font-semibold">
        Top Creators
      </h2>
      {isLoading ? skeletonItems : userItems}
    </div>
  );
};

export default Creator;
