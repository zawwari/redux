import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_POSTS } from "../../redux/actions/posts";
const Card = ({ item, onDelete }) => {
  const [isLoading, setLoader] = useState(false);

  const dispatch = useDispatch();

  const deletePost = async () => {
    try {
      setLoader(true);
      await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${item.id}`
      );

      dispatch({
        type: DELETE_POSTS,
        payload: {
          id: item.id,
        },
      });
    } catch (e) {
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="card-main">
      <div className="card">
        <div className="image-wrapper">
          <img src="/fash.jpg" alt="" />
        </div>
        <h1>{item.title}</h1>

        <p>{item.body}</p>
        <button onClick={deletePost}> Delete</button>
      </div>

      {isLoading && (
        <div className="loader-show">
          <img src="/loading-slow-internet.gif" alt="" />
        </div>
      )}
    </div>
  );
};

export default Card;
