import React, { useState, useEffect } from "react";
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
  // console.log(user);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { endpoint } = useParams();
  const [item, setItem] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [comments, setComments] = useState([]);
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
      setComments(newComments);

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
      // const newComments = [...comments];
      // newComments.splice(index, 1);
      // setComments(newComments);
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
        alert("Follow Thành công");
      } else {
        alert("Thất bại !");
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
        alert("Unfollow Thành công");
      } else {
        alert("Thất bại !");
      }

      // console.log(newComments.data.data[0]);
      // setComments([...comments, ...newComments.data.data[0]]);
    };
    follow();
  };

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
                <Button className="small" onClick={() => handleFollow()}>
                  Follow
                </Button>
                <OutlineButton className="small ml-1" onClick={handleUnfollow}>
                  Un Follow
                </OutlineButton>
              </div>
              <p className="overview">{item.description}</p>

              <div className="cast">
                <div className="section__header">
                  <h2>Author</h2>
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
              <label for="subject">Comments</label>
              {accessToken ? (
                <textarea
                  id="comments"
                  name="comments"
                  placeholder="Write something.."
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
                            Xóa
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
                <h2>Similar</h2>
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
