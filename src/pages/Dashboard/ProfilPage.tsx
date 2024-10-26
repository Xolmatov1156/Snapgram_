import { Link, useParams } from "react-router-dom";
import {
  useGetUserQuery,
} from "../../redux/api/users-api";
import {useGetAllPostByUserQuery} from "../../redux/api/post-api";
import NoImg from "../../../src/assets/user.svg";
import { Triangle } from "react-loader-spinner";
import { EditIcon } from "../../assets/Icons";

const ProfilPage = () => {
  const { username } = useParams<{ username: string }>();
  const { data: userInfo, isLoading } = useGetUserQuery(username);
  const { data: posts } = useGetAllPostByUserQuery(username);
  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Triangle
          visible={true}
          height="80"
          width="80"
          color="white"
          ariaLabel="triangle-loading"
        />
      </div>
    );
  }

  return (
    <section className="text-white h-screen px-[60px] py-[80px] overflow-y-auto bg-black">
      {userInfo ? (
        <main>
          <header className="flex gap-[30px]">
            <img
              className="w-[150px] h-[150px] rounded-full object-cover bg-white"
              src={userInfo.photo}
              onError={(e) => (e.currentTarget.src = NoImg)}
              alt={userInfo.fullName}
            />
            <div>
              <div className="flex items-center gap-[78px]">
                <h1 className="font-semibold text-4xl mb-[6.5px] capitalize">
                  {userInfo.username}
                </h1>
                <Link to={`/edit-profile/${userInfo.username}`} className="flex w-[137px] py-[10px] bg-[#101012] items-center gap-[5px] justify-center rounded-md">
                <EditIcon/>
                <p>Edit Profile</p>
                </Link>
              </div>
              <p className="text-lg text-light-300 text-gray-500">@{userInfo.fullName}</p>
              <div className="mt-[22px] flex items-center gap-10">
                <div className="flex items-center gap-2 ">
                  <p className="text-[20px] text-purple font-bold tracking-[-1px]">
                    {userInfo.posts?.length || 0}
                  </p>
                  <span className="text-[18px] font-medium text-light-200">
                    Posts
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-[20px] text-purple font-bold tracking-[-1px]">
                    {userInfo.followers?.length || 0}
                  </p>
                  <span className="text-[18px] font-medium text-light-200">
                    Followers
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-[20px] text-purple font-bold tracking-[-1px]">
                    {userInfo.following?.length || 0}
                  </p>
                  <span className="text-[18px] font-medium text-light-200">
                    Following
                  </span>
                </div>
              </div>
              <p className="mt-[30px]">
                {userInfo.bio || (
                  <>
                    For Developers, By Developers <br />
                    💻 Web Development & Coding <br />
                    🎥 YouTube - JavaScript Mastery <br />
                    ✉️ Business Inquiries - Email or DM
                  </>
                )}
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
          />
        </div>
      )}
    </section>
  );
};

export default ProfilPage;