import { useParams } from "react-router-dom";
import {
  useGetUserQuery,
  useFollowMutation,
} from "../../redux/api/users-api";
import {useGetAllPostByUserQuery} from '../../redux/api/post-api'
import { useEffect, useState } from "react";
import { Triangle } from "react-loader-spinner";
import NoImg from "../../../src/assets/user.svg"
function UsersProfile() {
  const [profile, setProfile] = useState<any>();
  const [posts, setPosts] = useState<any[]>([]);
  const [currentUserInfo, setCurrentUserInfo] = useState<any>();
  const [followUser] = useFollowMutation();

  const currentUserUsername = window.localStorage.getItem("userData")
    ? JSON.parse(window.localStorage.getItem("userData") as string)?.username
    : null;
  const handleFollow = (username: string) => {
    followUser(username);
  };

  const { username } = useParams();
  const { data } = useGetUserQuery(username);
  const { data: userData } = useGetUserQuery(currentUserUsername);
  const { data: postByUser } = useGetAllPostByUserQuery(username);
  

  useEffect(() => {
    if (data && postByUser && userData) {
      setProfile(data);
      const updatedPost = postByUser.filter(
        (_: any, inx: number) => inx !== 11
      );
      setPosts(updatedPost);
      setCurrentUserInfo(userData);
    }
  }, [data, postByUser, userData]);

  console.log(posts);

  return (
    <section className="text-white h-screen px-[60px] py-[80px] overflow-y-auto bg-black">
      {profile && posts.length !== undefined ? (
        <main>
          <header className="flex gap-[30px]">
            <img
              className="w-[150px] h-[150px] rounded-full object-cover bg-white"
              src={profile.photo}
              onError={(e) => (e.currentTarget.src = NoImg)}
              alt={profile.fullName}
            />
            <div>
              <div className="flex items-center gap-[78px]">
                <h1 className="font-semibold text-4xl mb-[6.5px]">
                  {profile.fullName}
                </h1>
                {currentUserInfo &&
                profile.followers?.some(
                  (follower: any) => follower._id === currentUserInfo._id
                ) ? (
                  <button
                    onClick={() => handleFollow("unfollow/" + profile.username)}
                    className="bg-[red] text-white w-[74px] py-[5px] mt-[18px] rounded-lg"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => handleFollow("follow/" + profile.username)}
                    className="bg-[#877EFF] text-white w-[74px] py-[5px] mt-[18px] rounded-lg"
                  >
                    Follow
                  </button>
                )}
              </div>
              <p className="text-lg text-light-300">@{profile.username}</p>
              <div className="mt-[22px] flex items-center gap-10">
                <div className="flex items-center gap-2">
                  <p className="text-[20px] text-purple font-bold tracking-[-1px]">
                    {posts.length}
                  </p>
                  <span className="text-[18px] font-medium text-light-200">
                    Posts
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-[20px] text-purple font-bold tracking-[-1px]">
                    {profile.followers.length}
                  </p>
                  <span className="text-[18px] font-medium text-light-200">
                    Followers
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-[20px] text-purple font-bold tracking-[-1px]">
                    {profile.following.length}
                  </p>
                  <span className="text-[18px] font-medium text-light-200">
                    Following
                  </span>
                </div>
              </div>
              <p className="mt-[30px]">
                For Developers, By Developers <br />
                💻 Web Development & Coding <br />
                🎥 YouTube - JavaScript Mastery <br />
                ✉️ Business Inquiries - Email or DM
              </p>
            </div>
          </header>
          <div className="mt-[68px] flex flex-wrap gap-[30px]">
          {posts?.length ? (
              posts?.map((item: any) => {
                let firstPostType = item.content[0]?.type;
                let firstPostUrl = item.content[0]?.url;
                if (firstPostType === "IMAGE") {
                  return (
                    <img
                    key={item._id}
                      src={firstPostUrl}
                      alt=""
                      className="w-[330px] rounded-[15px] object-cover h-[315px] hover:scale-105 duration-300 cursor-pointer"
                    />
                  );
                } else if (firstPostType === "VIDEO") {
                  return (
                    <video
                    key={item._id}
                      src={firstPostUrl}
                      width={330}
                      className="w-[330px] rounded-[15px] h-[315px] object-cover hover:scale-105 duration-300 cursor-pointer"
                    ></video>
                  );
                }
              })
            ) : (
              <p className="text-center col-span-12 text-3xl font-semibold opacity-70 capitalize">
                No posts yet...
              </p>
            )}
          </div>
        </main>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Triangle
            visible={true}
            height="80"
            width="80"
            color="white"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
    </section>
  );
}

export default UsersProfile;