import { useFollowMutation, useGetUserQuery, useGetAllUserQuery } from "../../redux/api/users-api";
import { User } from "../../types";
import UserName from '../../../src/assets/user.svg';
import { AllUsers } from "../../assets/Icons";
import { useNavigate } from "react-router-dom";

const People = () => {
  const { data: users } = useGetAllUserQuery({});
  const [followUser] = useFollowMutation();

  const handleFollow = (username: string) => {
    followUser(username);
  };
  const handleClick = (username: string) => {
    navigate(`/users/${username}`);
  };
  const navigate = useNavigate();

  const currentUserUsername = window.localStorage.getItem("userData")
    ? JSON.parse(window.localStorage.getItem("userData") as string).username
    : null;

  const { data: currentUserInfo } = useGetUserQuery(currentUserUsername);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = UserName;
  };

  const userItems: JSX.Element[] = users?.map((user: User): JSX.Element => (
    <div key={user._id} className=" ">
      <div className="p-[20px] w-[303px] h-[319px] border border-gray-500 rounded-xl">
        <div onClick={() => handleClick(user.username)} className="cursor-pointer">
        <img
          onError={handleImageError}
          src={import.meta.env.VITE_API_URL + user.photo}
          alt={user.fullName}
          className="w-[90px] h-[90px] rounded-full mx-auto bg-white mt-[40px]"
        />
        <h3 className="mt-[10px] line-clamp-1 font-semibold text-[24px]">{user.fullName}</h3>
        <h3 className="mt-[10px] line-clamp-1 font-semibold text-gray-400">@{user.username}</h3>
        </div>
        {currentUserInfo && user.followers?.some((follower: any) => follower._id === currentUserInfo._id) ? (
          <button
            onClick={() => handleFollow("unfollow/" + user.username)}
            className="bg-[red] text-white w-[74px] py-[5px] mt-[20px] rounded-lg"
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
  ));

  return (
    <div className=" bg-black h-screen flex flex-wrap justify-center gap-[20px] pl-[20px] overflow-y-auto text-white text-center py-[40px]">
      <h2 className="text-[24px] w-full text-start font-semibold flex pl-[60px] gap-[8px] items-center"><AllUsers/>All users</h2>
      {userItems}
    </div>
  );
};

export default People;
