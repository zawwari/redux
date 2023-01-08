import React, { useEffect, useState } from "react";
import Card from "../cardsCommon";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_POSTS } from "../../redux/actions/posts";

const Counter = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const [couter, setCount] = useState(0);
  const [val, setVal] = useState("");
  const showVal = (e) => {
    setVal(e.target.value);
  };

  const Increment = () => {
    setCount((c) => c + 1);
  };

  const Decrement = () => {
    setCount((c) => c - 1);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    dispatch({
      type: SAVE_POSTS,
      payload: data,
    });
  };

  return (
    <div className="counter-inner">
      {/* <button onClick={Decrement}>-</button>
      <input type="text" onChange={showVal} value={val} />

      <button onClick={Increment} disabled={couter === 100}>
        +
      </button>

      <span>{val}</span> */}
      <div className="post-wrapper">
        {posts.map((item, index) => (
          <Card item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Counter;
