import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";

import tmdbApi, { categoryComics, comics, movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import "./detail.scss";
import CastList from "./CastList";
import VideoList from "./VideoList";
import MovieList from "../../components/movielist/MovieList";
import Button, { OutlineButton } from "../../components/button/Button";
import { Link } from "react-router-dom";
import { comicsAPI } from "../../api/axiosClient";
import { access_token, username } from "../../store/login";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";

const Detail = () => {
  const [accessToken, setAccessToken] = useRecoilState(access_token);
  const [user, setUser] = useRecoilState(username);
  const [inputValue, setInputValue] = useState("123");

  // console.log(user);
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { endpoint } = useParams();
  const [item, setItem] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [comments, setComments] = useState([]);
  const [isFollow, setIsFollow] = useState(false);
  const token = accessToken;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const onSubmit = (data) => {
    const comment = async () => {
      const coment = await comicsAPI.post(`/comment/${endpoint}`, data, config);
      const newComment = coment.data.data[0];
      console.log(newComment);

      const newComments = [...comments];
      newComments.unshift(newComment);
      setInputValue("");
      setComments(newComments);
      reset();

      // console.log(newComments.data.data[0]);
      // setComments([...comments, ...newComments.data.data[0]]);
    };
    comment();
  };

  const params = {};
  useEffect(() => {
    const getDetail = async () => {
      const response = await comics.detail(endpoint);
      const responseChapter = await comics.chapter(endpoint);
      const responseComments = await comicsAPI.get(`/comment/${endpoint}`);
      const responseFollow = await comics.getBookFollowing(config);
      responseFollow.data.data.map((item, i) => {
        if (item.endpoint === endpoint) {
          setIsFollow(true);
        }
      });
      setItem(response.data.data[0]);
      setChapters(responseChapter.data.data);
      setComments(responseComments.data.data);

      // console.log(responseChapter.data.data);
      // console.log(response.data.data);
      window.scrollTo(0, 0);
    };
    // console.log(item);

    getDetail();
  }, [endpoint]);

  const handleDeleteComment = (id) => {
    try {
      const index = comments.findIndex((x) => x.id === id);
      console.log(config);
      comicsAPI.delete(`/comment/${id}`, config);
      const newComments = [...comments];
      newComments.splice(index, 1);
      setComments(newComments);
    } catch {
      console.log("sai rồiiiiii");
    }
  };

  const handleFollow = (data) => {
    const follow = async () => {
      const follow = await comicsAPI.post(
        `/user/follow-book/${endpoint}`,
        data,
        config
      );

      if (follow.data.status === "success") {
        // alert("Follow Thành công");
        setIsFollow(true);
      }

      // console.log(newComments.data.data[0]);
      // setComments([...comments, ...newComments.data.data[0]]);
    };
    follow();
  };
  const handleUnfollow = (data) => {
    const follow = async () => {
      const follow = await comicsAPI.post(
        `/user/unfollow-book/${endpoint}`,
        data,
        config
      );

      if (follow.data.status === "success") {
        // alert("Unfollow Thành công");
        setIsFollow(false);
      } else {
        alert("Thất bại !");
      }

      // console.log(newComments.data.data[0]);
      // setComments([...comments, ...newComments.data.data[0]]);
    };
    follow();
  };
  // const handleUserInput = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.value);
  //   setInputValue(e.target.value);
  // };

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${item.thumb})`,
            }}
          ></div>
          <div className="mb3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${item.thumb})`,
                }}
              ></div>
            </div>
            <div className="movie-content__info">
              <h1 className="title">{item.title || item.name}</h1>

              <div className="genres">
                {item.genres &&
                  item.genres.slice(0, 5).map((genre, i) => (
                    <span key={i} className="genres__item">
                      {genre.title}
                    </span>
                  ))}
              </div>
              <div className="rating">
                <span
                  class={
                    item.rating >= 0.5 ? "fa fa-star checked" : "fa fa-star"
                  }
                ></span>
                <span
                  class={
                    item.rating >= 1.5 ? "fa fa-star checked" : "fa fa-star"
                  }
                ></span>
                <span
                  class={
                    item.rating >= 2.5 ? "fa fa-star checked" : "fa fa-star"
                  }
                ></span>
                <span
                  class={
                    item.rating >= 3.5 ? "fa fa-star checked" : "fa fa-star"
                  }
                ></span>
                <span
                  class={
                    item.rating >= 4.5 ? "fa fa-star checked" : "fa fa-star"
                  }
                ></span>
              </div>
              <div className="book__follow">
                {isFollow === false ? (
                  <Button className="small" onClick={() => handleFollow()}>
                    Follow
                  </Button>
                ) : (
                  <OutlineButton
                    className="small ml-1"
                    onClick={handleUnfollow}
                  >
                    Un Follow
                  </OutlineButton>
                )}
                {/* <OutlineButton className="small ml-1" onClick={handleUnfollow}>
                  Un Follow
                </OutlineButton> */}
              </div>
              <p className="overview">{item.description}</p>

              <div className="cast">
                <div className="section__header">
                  <h2>Tác giả</h2>
                </div>
                <CastList id="424" />
              </div>
              <div className="chapter">
                {chapters.map((chapter) => (
                  <ul>
                    <li>
                      <Link to={chapter.chapter_endpoint}>
                        <OutlineButton className="small mb-1" href="#">
                          {chapter.chapter_endpoint.charAt(0).toUpperCase() +
                            chapter.chapter_endpoint.slice(1)}
                        </OutlineButton>
                      </Link>
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </div>

          <div className="container">
            <form class="section review-list" onSubmit={handleSubmit(onSubmit)}>
              <label for="subject">Bình luận</label>
              {accessToken ? (
                <textarea
                  type="text"
                  id="comments"
                  name="comments"
                  placeholder="Viết gì đó ..."
                  {...register("content")}
                ></textarea>
              ) : (
                ""
              )}
              {accessToken ? (
                <input type="submit" onClick={handleSubmit} value="Bình luận" />
              ) : (
                ""
              )}
            </form>
          </div>

          <div className="container">
            <div class="section review-list">
              <ul>
                {comments.map((item, i) => (
                  <li key={item.id}>
                    <div className="d-flex">
                      <div className="left">
                        <span>
                          <img
                            src={item.user.avatar}
                            className="profile-pict-img img-fluid"
                            alt=""
                          />
                        </span>
                      </div>
                      <div className="right">
                        <h4>{item.user.username}</h4>

                        <div className="review-description">
                          <p>{item.content}</p>
                        </div>
                        <span className="publish py-3 d-inline-block w-100">
                          {item.time}
                        </span>
                        {item.user.username === user ? (
                          <a
                            href="#publish"
                            className="test"
                            onClick={() => handleDeleteComment(item.id)}
                            key={item.id}
                          >
                            Xóa <i className="fa fa-trash"></i>
                          </a>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="container">
            {/* <div className="section mb-3">
              <VideoList id={item.id} />
            </div> */}
            <div className="section mb-3">
              <div className="section mb-2">
                <h2>Có thể bạn sẽ thích</h2>
                <MovieList
                  category={categoryComics.relate}
                  endpoint={item.endpoint}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
