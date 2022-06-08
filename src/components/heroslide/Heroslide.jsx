import React, { useState, useEffect } from "react";

import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import tmdbApi, { comics, movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import Button, { OutlineButton } from "../button/Button";

import "./hero-slide.scss";
import { useNavigate } from "react-router-dom";

const HeroSlide = () => {
  // const [movieItems, setMovieItems] = useState([]);
  const [comic, setComic] = useState([]);
  SwiperCore.use([Autoplay]);
  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        // const response = await tmdbApi.getMoviesList(movieType.popular, {
        //   params,
        // });
        // const res = await comics.getTopRating();

        // setMovieItems(response.results.slice(0, 6));
        const res = await comics.getTopSearch();
        setComic(res.data.data.slice(1, 10));
        // setComic(res.data.data.slice(0, 6));
        // console.log(res.data.data);

        // console.log(response.results);
      } catch {
        console.log("error");
      }
    };
    getMovies();
  }, []);

  // useEffect(() => {
  //   const getComics = async () => {
  //     try {
  //       const res = await comics.getTopRating();
  //       setComic(res.data.data.slice(0, 2));
  //     } catch {
  //       console.log("error");
  //     }
  //   };
  //   getComics();
  // }, []);

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
      >
        {comic.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? "active" : ""} `}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const HeroSlideItem = (props) => {
  let navigate = useNavigate();
  const item = props.item;
  const poster = props.poster;
  // console.log(poster);
  const background = item.theme;
  console.log(poster);
  console.log(background);
  return (
    <div
      className={`hero-slide__item ${props.className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.description}</div>
          <div className="btns">
            <Button onClick={() => navigate(`book/detail/${item.endpoint}`)}>
              Watch now
            </Button>
            <OutlineButton onClick={() => console.log(123)}>
              Watch trailer
            </OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={item.theme || item.thumb} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HeroSlide;
