import UserName from '../../../assets/user.svg';
import {
  useGetAllUserQuery,
  useGetFeedQuery,
  useGetUserQuery,
} from "../../../redux/api/users-api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Creator from '../../../components/Creators';
import { useNavigate } from 'react-router-dom';

export const imageFileTypes = [
  ".png",
  ".jpeg",
  ".jpg",
  ".gif",
  ".bmp",
  ".webp",
  ".tiff",
  ".svg",
];
function Home() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-US", options).replace(",", " at");
  };

  const currentUserUsername = window.localStorage.getItem("userData")
    ? JSON.parse(window.localStorage.getItem("userData") as string).username
    : null;
  const { data: feeds } = useGetFeedQuery(true);
  const { data: currentUserData } = useGetUserQuery(currentUserUsername);
  const { data: allUser } = useGetAllUserQuery(true);

  const followedUsers = currentUserData?.following?.map((followingUser: any) =>
    allUser?.find((user: any) => user.username === followingUser.username)
  );
  const handleClick = (username: string) => {
    navigate(`/users/${username}`);
  };
  const navigate = useNavigate();

  const UsersCard = (): JSX.Element => {
    return (
      <div className="flex items-center gap-4 overflow-y-auto">
        {followedUsers
          ?.filter((user: any) => user)
          .map((user: any, index: number) => (
            <div
            onClick={() => handleClick(user.username)}
              key={index}
              className="text-center flex flex-col min-w-[86px] items-center"
            >
              <img
                src={import.meta.env.VITE_API_URL + user.photo}
                onError={(e) => (e.currentTarget.src = UserName)}
                alt={user.username}
                className="size-12 rounded-full object-cover border-[2px] border-[#877EFF]"
                style={{ width: "48px", height: "48px", objectFit: "cover" }}
              />
              <h1 className="text-xs font-semibold mt-[6px]">
                {user.username}
              </h1>
            </div>
          ))}
      </div>
    );
  };

  return (
    <section className="grid grid-cols-12 h-screen text-white">
      <div className="col-span-7 text-white px-[53px] overflow-y-auto py-[60px] bg-black">
        <header>
          {followedUsers?.length ? (
            <div className="flex overflow-x-auto">
              <UsersCard />
            </div>
          ) : (
            <p className="text-center font-bold text-light-300 text-xs">
              You haven't followed any users yet...
            </p>
          )}
        </header>
        <div className="mt-[40px]">
          <h1 className="text-[30px] mb-[40px] font-bold">Home Feed</h1>
          <div className="flex flex-col gap-[40px]">
            {feeds?.posts?.length ? (
              feeds?.posts?.map((post: any, index: number) => (
                <div
                  key={index}
                  className="px-[29px] py-[36px] border border-gray-500 rounded-[20px]"
                >
                  <header className="mb-[40px] ">
                    <div className="flex gap-[10px]">
                      <img
                        className="size-[50px] rounded-full object-cover"
                        src={
                          import.meta.env.VITE_API_URL +
                          post.owner.photo
                        }
                        onError={(e) =>
                          (e.currentTarget.src =
                            import.meta.env.VITE_API_URL +
                            currentUserData?.photo)
                        }
                        alt="Post owner"
                      />
                      <div className="mb-[20px] flex flex-col">
                        <h1 className="text-[18px] font-semibold">
                          {post.owner.username}
                        </h1>
                        <p className="text-[14px] text-light-300 font-bold">
                          {formatDate(post?.createdAt)}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold">{post?.content_alt}</p>
                  </header>
                  <Swiper
                    key={index}
                    navigation={true}
                    spaceBetween={10}
                    modules={[Navigation]}
                  >
                    {post.content &&
                      post.content?.map(
                        (content: any, contentIndex: number) => {
                          if (content?.type === "VIDEO") {
                            return (
                              <SwiperSlide key={contentIndex}>
                                <video
                                  controls
                                  className="w-full h-[500px] object-contain"
                                  src={content?.url}
                                ></video>
                              </SwiperSlide>
                            );
                          } else {
                            return (
                              <SwiperSlide key={contentIndex}>
                                <img
                                  className="w-full h-[500px] object-contain"
                                  src={content?.url}
                                />
                              </SwiperSlide>
                            );
                          }
                        }
                      )}
                  </Swiper>
                </div>
              ))
            ) : (
              <p>No posts available yet...</p>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-5">
        <Creator />
      </div>
    </section>
  );
}

export default Home;
