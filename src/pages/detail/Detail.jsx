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

const Detail = () => {
  const { endpoint } = useParams();
  const [item, setItem] = useState(null);
  const [chapters, setChapters] = useState([]);
  // const link = "/" + "read" + "/" + item.endpoint + "/";
  console.log(endpoint);
  const params = {};
  useEffect(() => {
    const getDetail = async () => {
      const response = await comics.detail(endpoint);
      const responseChapter = await comics.chapter(endpoint);
      setItem(response.data.data[0]);
      setChapters(responseChapter.data.data);

      // console.log(responseChapter.data.data);
      // console.log(response.data.data);
      window.scrollTo(0, 0);
    };
    console.log(item);
    getDetail();
  }, [endpoint]);

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
