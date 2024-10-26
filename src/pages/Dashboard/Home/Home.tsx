import UserName from "../../../assets/user.svg";
import {
  useGetAllUserQuery,
  useGetUserQuery,
} from "../../../redux/api/users-api";
import { useGetFeedQuery, useLikeMutation, useCommentMutation } from "../../../redux/api/post-api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Creator from "../../../components/Creators";
import { useNavigate } from "react-router-dom";
import LikeIcon from "../../../assets/heart_.svg";
import LikedIcon from "../../../assets/heart.svg";
import { useState, useEffect } from "react";
import { ShareIcon } from "../../../assets/Icons";

export const imageFileTypes = [
  ".png", ".jpeg", ".jpg", ".gif", ".bmp", ".webp", ".tiff", ".svg",
];

function Home() {
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>(
    () => JSON.parse(localStorage.getItem("likedPosts") || "{}")
  );
  const [likePost] = useLikeMutation();
  const [postComment] = useCommentMutation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
  }, [likedPosts]);

  const currentUserUsername = JSON.parse(localStorage.getItem("userData") || "{}")?.username;
  const { data: feeds } = useGetFeedQuery(true);
  const { data: currentUserData } = useGetUserQuery(currentUserUsername);
  const { data: allUser } = useGetAllUserQuery(true);

  const followedUsers = currentUserData?.following?.map((followingUser: any) =>
    allUser?.find((user: any) => user.username === followingUser.username)
  );

  const handleNavigateToUser = (username: string) => {
    navigate(`/users/${username}`);
  };

  const handleLike = (postId: string) => {
    likePost(postId);
    setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric", month: "long", hour: "numeric", minute: "numeric", hour12: true,
    };
    return date.toLocaleString("en-US", options).replace(",", " at");
  };
  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>, postId: string) => {
    e.preventDefault();
    const message = (e.currentTarget.elements.namedItem("comment") as HTMLInputElement).value;
    if (message) {
      postComment({ post: postId, body: { message } }).unwrap().then(() => e.currentTarget.reset());
    }
  };

  const UsersCard = () => (
    <div className="flex items-center gap-4 overflow-y-auto">
      {followedUsers
        ?.filter((user: any) => user)
        .map((user: any, index: number) => (
          <div
            key={index}
            onClick={() => handleNavigateToUser(user.username)}
            className="text-center flex flex-col min-w-[86px] items-center cursor-pointer"
          >
            <img
              src={user.photo || UserName}
              onError={(e) => (e.currentTarget.src = UserName)}
              alt={user.username}
              className="size-12 rounded-full object-cover border-[2px] border-[#877EFF]"
              style={{ width: "48px", height: "48px" }}
            />
            <h1 className="text-xs font-semibold mt-[6px]">{user.username}</h1>
          </div>
        ))}
    </div>
  );

  return (
    <section className="grid grid-cols-12 h-screen text-white">
      <div className="col-span-7 text-white px-[53px] overflow-y-auto py-[60px] bg-black">
        <nav>
          {followedUsers?.length ? (
            <div className="flex overflow-x-auto">
              <UsersCard />
            </div>
          ) : (
            <p className="text-center font-bold text-light-300 text-xs">
              Nothing new here... Check back later or start following more users!
            </p>
          )}
        </nav>
        <div className="mt-[40px]">
          <h1 className="text-[30px] mb-[40px] font-bold">Home Feed</h1>
          <div className="flex flex-col gap-[40px]">
            {feeds?.posts?.length ? (
              feeds.posts.map((post: any, index: number) => (
                <div key={index} className="px-[29px] py-[36px] border border-gray-500 rounded-[20px]">
                  <div className="mb-[40px]">
                    <div className="flex gap-[10px]">
                      <img
                        src={post.owner?.photo || UserName}
                        onError={(e) => (e.currentTarget.src = UserName)}
                        alt="Post Owner"
                        className="size-[50px] rounded-full object-cover"
                      />
                      <div className="mb-[20px] flex flex-col">
                        <h1 className="text-[18px] font-semibold">{post.owner.username}</h1>
                        <p className="text-[14px] text-light-300 font-bold">{formatDate(post.createdAt)}</p>
                      </div>
                    </div>
                    <p className="font-semibold">{post.content_alt}</p>
                  </div>
                  <Swiper navigation={true} spaceBetween={10} modules={[Navigation]}>
                    {post.content.map((content: any, contentIndex: number) => (
                      <SwiperSlide key={contentIndex}>
                        {content.type === "VIDEO" ? (
                          <video controls className="w-full h-[500px] object-cover rounded-md" src={content.url} />
                        ) : (
                          <img className="w-full h-[500px] object-cover rounded-md" src={content.url} alt="Post content" />
                        )}
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="flex items-center gap-[5px] mt-[10px]">
                    <button onClick={() => handleLike(post._id)} className="text-white rounded-lg">
                      <img src={likedPosts[post._id] ? LikedIcon : LikeIcon} alt="like" />
                    </button>
                    <p>{post.likes.length > 0 ? post.likes.length : ""}</p>
                  </div>
                  <form onSubmit={(e) => handleCommentSubmit(e, post._id)}>
                    <label className="flex items-center relative w-[491px]">
                      <input
                        type="text"
                        name="comment"
                        className="mt-[10px] w-[491px] rounded-[20px] p-[10px] bg-[#101012] outline-none"
                        placeholder="Write your comment..."
                      />
                      <button className="pt-[9px] absolute top-0 bottom-0 right-2">
                        <ShareIcon />
                      </button>
                    </label>
                  </form>
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
