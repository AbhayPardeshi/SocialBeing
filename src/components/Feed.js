import React, { useState, useRef, useEffect } from "react";
import { ImImage } from "react-icons/im";
import {
  AiOutlineVideoCamera,
  AiOutlineAudio,
  AiOutlineHeart,
  AiOutlineComment,
  AiFillHeart,
} from "react-icons/ai";
import { FiBookmark, FiShare2 } from "react-icons/fi";
import { IoMdAttach } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { BsFillBookmarkFill } from "react-icons/bs";
import { useFetch } from "../services/useFetch";
import { usePost } from "../contexts/posts/PostProvider";
import creationTime from "../utils/creationTime";
import Post from "./Post";

const Feed = () => {
  const fileInputRef = useRef(null);
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const { sendData, posts } = usePost();
  const reversePost = [...posts].reverse();

  const setPostHandler = async () => {
    const file = postImage;
    var formData = new FormData();
    formData.append("text", postText);
    formData.append("file", file);

    await sendData(formData);
    setPostText("");
    setPostImage("");
    setImagePreview("");
  };

  const setPostTextHandler = (e) => {
    setPostText(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPostImage(file);
      setImagePreview(imageUrl);
    }
  };
  const openFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <section className="p-[1rem]  rounded-md">
        {/* Post Area */}

        <div className="bg-white flex p-5 gap-4 rounded-md justify-center">
          <div className="mt-[0.40rem]">
            <img
              className="w-[2.15rem] h-[2.1rem] rounded-full object-cover"
              src="./assets/images/user1.jfif"
              alt="user"
            />
          </div>
          <div className="flex flex-col w-full gap-y-4">
            <textarea
              name="post-area"
              id="search-input"
              cols="55"
              rows="3"
              placeholder="Find friends, communities and pages here"
              className="outline-none text-[0.65rem] mx-1 bg-[#f5f7fb] w-full p-3 rounded-2xl flex items-center resize-none"
              onChange={setPostTextHandler}
              value={postText}
            />
            <div className="flex justify-between p-2">
              {imagePreview && (
                <div className="flex items-center gap-2 flex-col">
                  <img
                    className="rounded-md object-cover w-[100%] h-[20rem]"
                    src={imagePreview}
                    alt="user"
                  />
                  <button
                    className="text-red-500"
                    onClick={() => {
                      setPostImage("");
                      setImagePreview("");
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            <div className="flex text-gray-500 justify-around">
              <button
                className="flex text-[0.85rem] px-2 py-1 rounded-md items-center gap-x-2 "
                onClick={openFileInput}
              >
                <ImImage />
                <p>Image</p>
              </button>
              <input
                type="file"
                name="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
                ref={fileInputRef}
              />
              <button className="flex text-[0.85rem] px-2 py-1 rounded-md items-center gap-x-2">
                <AiOutlineVideoCamera />
                <p>Video/Gif</p>
              </button>

              <button className="flex text-[0.85rem] px-2 py-1 rounded-md items-center gap-x-2">
                <IoMdAttach />
                <p>Attachements</p>
              </button>
              <button className="flex text-[0.85rem] px-2 py-1 rounded-md items-center gap-x-2">
                <AiOutlineAudio />
                <p>Audio</p>
              </button>
              <div>
                <button
                  className="bg-blue-600 text-white rounded-2xl px-4 py-1 text-[0.85rem]"
                  onClick={setPostHandler}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Post Area End */}

        {/* List of All Post */}
        {reversePost?.map((item, index) => {
          return <Post item={item} index={index} />;
        })}
      </section>
    </>
  );
};

export default Feed;
