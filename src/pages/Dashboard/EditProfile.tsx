import { EditIcon } from "../../assets/Icons";
import { useUploadFilesMutation } from "../../redux/api/post-api";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetCurrentUserDatasQuery,
  useUpdateUserMutation,
} from "../../redux/api/users-api";

function EditProfile() {
  const { data: currentUserData } = useGetCurrentUserDatasQuery(true);
  const [fileUpload, { isLoading }] = useUploadFilesMutation();
  const [userImg, setUserImg] = useState<string>("");
  const [updateUserDetails, { isLoading: isUserUpdating }] =
    useUpdateUserMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUserData?.photo) {
      setUserImg(currentUserData?.photo);
    }
  }, [currentUserData]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFiles = Array.from(files);

      const formData = new FormData();

      selectedFiles.forEach((img) => {
        formData.append("files", img, img.name);
      });

      try {
        await fileUpload(formData)
          .unwrap()
          .then((res) => {
            setUserImg(res.files.flat()[0].url);
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      photo: userImg,
      full_name: formData.get("full_name")?.toString(),
      username: formData.get("username")?.toString(),
      email: formData.get("email")?.toString(),
      bio: formData.get("bio")?.toString(),
    };
    updateUserDetails(data)
      .unwrap()
      .then(() => {
        const updatedUser = {
          ...currentUserData,
          username: data.username,
          full_name: data.full_name,
        };
        window.localStorage.setItem("userData", JSON.stringify(updatedUser));

        navigate("/");
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  return (
    <section className="w-full h-screen bg-black text-white overflow-y-auto px-[60px] py-[80px]">
      {currentUserData && (
        <div>
          <div className="flex items-center gap-[11px] mb-[50px]">
            <EditIcon />
            <h1 className="capitalize tracking-[-1px] text-4xl font-bold">
              Edit Profile
            </h1>
          </div>
          <form
            onSubmit={handleFormSubmit}
            className="flex items-start gap-9 flex-col"
          >
            <div className="flex items-center gap-[14px]">
              <img
                className="size-[100px] object-cover rounded-full"
                src={userImg}
                onError={(e) => (e.currentTarget.src = userImg)}
                alt="Profile"
              />
              <label htmlFor="newImg">
                <input
                  accept="image/*"
                  onChange={handleFileUpload}
                  type="file"
                  hidden
                  id="newImg"
                />
                <span className="text-lg font-semibold cursor-pointer hover:opacity-80 duration-300 text-blue-100">
                  {isLoading ? "Uploading..." : "Change profile photo"}
                </span>
              </label>
            </div>
            <label className="flex flex-col gap-3 w-full">
              <span className="text-lg font-medium">Name</span>
              <input
                type="text"
                name="full_name"
                defaultValue={currentUserData.username}
                className="bg-gray-900 outline-none w-full py-4 rounded-lg px-5 font-semibold"
              />
            </label>
            <label className="flex flex-col gap-3 w-full">
              <span className="text-lg font-medium">Username</span>
              <div className="flex items-center bg-gray-900 outline-none w-full py-4 px-5 font-semibold">
                <p>@</p>
                <input
                  type="text"
                  name="username"
                  defaultValue={currentUserData.fullName}
                  className="w-full bg-gray-900 outline-none rounded-lg"
                />
              </div>
            </label>
            <label className="flex flex-col gap-3 w-full">
              <span className="text-lg font-medium">Email</span>
              <input
                name="email"
                type="text"
                defaultValue={currentUserData.email}
                className="bg-gray-900 outline-none w-full rounded-lg py-4 px-5 font-semibold"
              />
            </label>
            <label className="flex flex-col gap-3 w-full">
              <span className="text-lg font-medium">Bio</span>
              <textarea
                name="bio"
                defaultValue={currentUserData.bio || ""}
                rows={3}
                className="bg-gray-900 resize-none rounded-lg outline-none w-full py-4 px-5 font-semibold"
              ></textarea>
            </label>
            <button className="ml-auto py-3 mt-10 rounded-lg px-5 bg-[#877EFF] font-semibold">
              {isUserUpdating ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      )}
    </section>
  );
}

export default EditProfile;
