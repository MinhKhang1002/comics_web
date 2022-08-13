import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { comics } from "../../api/tmdbApi";
import MovieCard from "../moviecard/MovieCard";
import tmdbApi from "../../api/tmdbApi";
import "./movie-grid.scss";
import Button, { OutlineButton } from "../button/Button";
import Input from "../input/Input";
import { useNavigate } from "react-router-dom";
const MovieGrid = (props) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const { keyword } = useParams();
  useEffect(() => {
    const getList = async () => {
      let response = null;
      if (keyword == undefined) {
        response = await comics.getAll(page);
      } else {
        const params = { title: keyword };
        response = await comics.search(params);
      }

      setItems(response.data.data);
      setTotalPage(29);
      console.log(keyword);
    };
    getList();
  }, [props.category, keyword]);

  const loadMore = async () => {
    let response = null;
    if (keyword == undefined) {
      const params = {
        page: page + 1,
      };
      try {
        response = await comics.getAll(page);
      } catch {
        console.log("error");
      }
    }
    // console.log(1, response);
    setItems([...items, ...response.data.data]);
    console.log(response.data.data[0]);
    setPage(page + 1);
  };

  return (
    <>
      <div className="section mb-3">
        <MovieSearch category="comics" keyword={keyword} />
      </div>
      <div className="movie-grid">
        {items.map((item, i) => (
          <MovieCard category={props.category} item={item} key={i} />
        ))}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            Tải thêm truyện
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
};

const MovieSearch = (props) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      navigate(`/comics/search/${keyword}`);
    }
  }, [keyword, props.category, navigate]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword, goToSearch]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Nhập truyện cần tìm"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button className="small" onClick={goToSearch}>
        Tìm kiếm
      </Button>
    </div>
  );
};

export default MovieGrid;
