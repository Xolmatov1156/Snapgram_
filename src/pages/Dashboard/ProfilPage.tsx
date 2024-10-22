import { useParams } from "react-router-dom";
import {
  useGetAllPostByUserQuery,
  useGetUserQuery,
} from "../../redux/api/users-api";
import NoImg from "../../../src/assets/user.svg";
import { Triangle } from "react-loader-spinner";

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
              src={import.meta.env.VITE_API_URL + userInfo.photo}
              onError={(e) => (e.currentTarget.src = NoImg)}
              alt={userInfo.fullName}
            />
            <div>
              <div className="flex items-center gap-[78px]">
                <h1 className="font-semibold text-4xl mb-[6.5px] capitalize">
                  {userInfo.username}
                </h1>
              </div>
              <p className="text-lg text-light-300 text-gray-500">@{userInfo.fullName}</p>
              <div className="mt-[22px] flex items-center gap-10">
                <div className="flex items-center gap-2">
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
              posts?.map((item: any, inx: number) => {
                let firstPostType = item.content[0]?.type;
                let firstPostUrl = item.content[0]?.url;
                if (firstPostType === "IMAGE") {
                  return (
                    <img
                      src={firstPostUrl}
                      alt=""
                      className="w-[330px] rounded-[15px] object-cover h-[315px]"
                    />
                  );
                } else if (firstPostType === "VIDEO") {
                  return (
                    <video
                      src={firstPostUrl}
                      width={330}
                      className="w-[330px] rounded-[15px] h-[315px] object-cover"
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
