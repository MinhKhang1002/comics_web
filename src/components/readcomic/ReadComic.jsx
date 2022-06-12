import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./readcomic.scss";
import { useParams } from "react-router";
import { comicsAPI } from "../../api/axiosClient";

const ReadComic = (props) => {
  const { endpoint, chapter } = useParams();
  const [detail, setDetail] = useState();
  useEffect(() => {
    const getDetail = async () => {
      try {
        const response = await comicsAPI.get(
          `chapter/detail/${endpoint}/${chapter}?view=true`
        );
        console.log(response.data.data[0]);
        setDetail(response.data.data[0]);
      } catch {
        console.log("error");
      }
    };
    getDetail();
  }, []);
  return (
    <div className="main">
      {detail && (
        <>
          <h1>{detail.book_endpoint}</h1>
          <h2>{detail.title}</h2>

          {detail.images &&
            detail.images[0].includes("https") &&
            detail.images.map((item, i) => (
              <img key={i} src={item} alt=""></img>
            ))}

          {detail.images &&
            detail.images[0] !== "https://i.imgur.com/Znxamr4.jpg" &&
            detail.images.map((item, i) => <p className="comic">{item}</p>)}
          {/* <img src="https://i.imgur.com/Znxamr4.jpg" alt="" />
          <img src="https://i.imgur.com/s8URzVE.jpg" alt="" />
          <img src="https://i.imgur.com/vMkRtnV.jpg" alt="" /> */}
        </>
      )}
    </div>
  );
};

export default ReadComic;
