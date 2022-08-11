import React, { useEffect } from "react";
import "./Posts.css";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Post/Post";
import { getTimelinePosts } from "../../actions/PostAction";
import { useParams } from "react-router-dom";

const Posts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  const params = useParams();

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);
  if (!posts) return "no posts";
  if (params._id) posts = posts.filter((post) => post.userId === useParams._id);
  return (
    <div className="Post">
      {loading
        ? "Fetching Post"
        : posts.map((post, id) => {
            return <Post data={post} id={id} />;
          })}
    </div>
  );
};

export default Posts;
