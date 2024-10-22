import { useParams } from "react-router-dom";
import {
  useGetAllPostByUserQuery,
  useGetUserQuery,
  useFollowingMutation,
  useUnfollowingMutation,
} from "../../redux/api/users-api";
import { useEffect, useState } from "react";
import { ThreeDots, Triangle } from "react-loader-spinner";
import { imageFileTypes } from "../Dashboard/Home/Home";
import NoImg from "../../../src/assets/user.svg";
function UsersProfile() {
  const videoFileTypes = [".mp4", ".webm", ".ogg"];
  const [profile, setProfile] = useState<any>();
  const [posts, setPosts] = useState<any[]>([]);
  const [unfollow] = useUnfollowingMutation();
  const [follow] = useFollowingMutation();
  const [currentUserInfo, setCurrentUserInfo] = useState<any>();

  const currentUserUsername = window.localStorage.getItem("userData")
    ? JSON.parse(window.localStorage.getItem("userData") as string).username
    : null;

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
              className="w-[150px] h-[150px] rounded-full object-cover"
              src={import.meta.env.VITE_API_URL + profile.photo}
              onError={(e) => (e.currentTarget.src = NoImg)}
              alt={profile.fullName}
            />
            <div>
              <div className="flex items-center gap-[78px]">
                <h1 className="font-semibold text-4xl mb-[6.5px]">
                  {profile.fullName}
                </h1>
                {profile &&
                  currentUserInfo &&
                  profile._id !== currentUserInfo._id && (
                    <button
                      className={`${
                        currentUserInfo.following.some(
                          (user: any) => user._id === profile._id
                        )
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-[#877EFF]"
                      } text-white font-semibold py-2 px-4 rounded`}
                      onClick={() => {
                        if (
                          currentUserInfo.following.some(
                            (user: any) => user._id === profile._id
                          )
                        ) {
                          unfollow(profile.username);
                        } else {
                          follow(profile.username);
                        }
                      }}
                    >
                      {currentUserInfo.following.some(
                        (user: any) => user._id === profile._id
                      )
                        ? "Unfollow"
                        : "Follow"}
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
          <div className="mt-[68px] grid grid-cols-12 gap-4">
            {posts.length ? (
              posts.map((item: any, inx: number) => {
                const firstPost: string = item?.content[0];

                return (
                  <div
                    key={inx}
                    className="col-span-4 rounded-2xl overflow-hidden relative"
                  >
                    {item.content.length > 1 && (
                      <span className="absolute top-6 right-[14px]"></span>
                    )}

                    <div
                      className="absolute flex flex-col justify-end top-0 left-0 right-0 bottom-0"
                      style={{
                        background: `linear-gradient(180deg, rgba(23, 23, 23, 0) 0%, #171717 109.15%)`,
                      }}
                    >
                      <div className="p-4">
                        <h1 className="font-bold">{item.caption}</h1>
                        <h1 className="italic text-xs text-gray-500">
                          {item.content_alt}
                        </h1>
                      </div>
                    </div>
                    {imageFileTypes.some(
                      (type: string) =>
                        typeof firstPost === "string" &&
                        firstPost?.includes(type)
                    ) && (
                      <img
                        className="w-full h-[315px] object-cover"
                        src={firstPost}
                        alt="Post content"
                      />
                    )}

                    {videoFileTypes.some(
                      (type: string) =>
                        typeof firstPost === "string" &&
                        firstPost?.includes(type)
                    ) && (
                      <video
                        className="w-full h-[315px] object-cover"
                        src={firstPost}
                        controls
                      ></video>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-center col-span-12 text-3xl font-semibold opacity-70 capitalize">
                No post yet...
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
