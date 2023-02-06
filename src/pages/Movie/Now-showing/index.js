import "./style.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {BsFillHandThumbsUpFill} from "react-icons/bs"
function MovieNowShowing() {

  const [showTimes, setShowTimes] = useState([]);
  const [place, setPlace] = useState(1);
  const [calendar, setCalendar] = useState(1);
  const [type, setType] = useState(1);
  const [names, setNames] = useState("");

  const navigate = useNavigate();


  //call api to get data movie
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/movie/now-showing")
      .then((res) => res.json())
      .then((data) => {
        setMovie(data.data.moviesNowShowing);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const showDetailMovie = (e) => {
    const name = e.target.title
    fetch('http://localhost:3001/movie/getmovie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate(`/movie/${data.data.movie.title}`, { state: data.data.movie })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //add event click button to show modal
  const handleShow = (e) => {
    setNames(e.target.name);
    const name = e.target.name;
    fetch('http://localhost:3001/movie/getmovie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    })
      .then((res) => res.json())
      .then((data) => {
        setShowTimes(data.data.movie.Date);
      });
    const modal = document.getElementById("exampleModal");
    modal.classList.add("show");
    modal.setAttribute(
      "style",
      "display: block; padding-right: 16px; background-color: rgba(0, 0, 0, 0.9);"
    );
  };


  const chooseShowTimes = (e) => {
    const Day = document.querySelector('.current .day strong').innerHTML
    const Place = document.querySelector('.toggle-tabs-city .appear .current-location span').innerHTML
    const Type = document.querySelector('.toggle-tabs-type .appear .appear .current-type span').innerHTML
    const Cinema = e.target.closest('.cinema').querySelector('span').innerHTML
    const Site = e.target.closest('.site').querySelector('span').innerHTML
    const TimeSt = e.target.innerHTML
    fetch('http://localhost:3001/movie/getposition', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: names, day: Day, location: Place, type: Type, cinema: Cinema, site: Site, time: TimeSt }),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate('/ticket', { state: data.data })
      });

  }


  //add event click button to hide modal
  const handleClose = () => {
    const modal = document.getElementById("exampleModal");
    modal.classList.remove("show");
    modal.setAttribute(
      "style",
      "display: none; padding-right: 0px; background-color: rgba(0, 0, 0, 0.5);"
    );
  };

  //add event when click outside modal to hide modal
  const handleOutsideClick = (e) => {
    if (e.target.id === "exampleModal") {
      handleClose();
    }
  };



  return (
    <div className="page-phim " id="now-movie">
      <div className="page-title category-title">
        <h1>Phim Đang Chiếu</h1>
      </div>
      <div className="flex-container category-products cgv-movies">
        <ul className="nav flex products-grid products-grid--max-4-col first last odd">
          {movie.map((item, index) => {
            return (
              <li className="film-lists item last " key={index}>
                <div className="product-images">
                  <span className={`nmovie-rating nmovie-rating-${item.itemRate}`}></span>
                  <a
                    onClick={showDetailMovie}
                    className="product-image"
                    cursorshover="true"
                  >
                    <img
                      id="product-collection-image-4250"
                      title={item.name}
                      src={item.image}
                      alt={item.name}
                      cursorshover="true"
                    />
                  </a>
                </div>
                <div
                  className="product-info"
                  style={{
                    minHeight: "0px",
                    maxHeight: "none",
                    height: "121px",
                  }}
                >
                  <h2 className="product-name" title={item.name} onClick={showDetailMovie}>
                    {item.name}
                  </h2>
                  <div className="cgv-movie-info">
                    <span className="cgv-info-bold">Thể loại: </span>
                    <span className="cgv-info-normal">{item.category}</span>
                  </div>
                  <div className="cgv-movie-info">
                    <span className="cgv-info-bold">Thời lượng: </span>
                    <span className="cgv-info-normal">{item.time} phút</span>
                  </div>
                  <div className="cgv-movie-info">
                    <span className="cgv-info-bold">Khởi chiếu: </span>
                    <span className="cgv-info-normal">{item.timeStart}</span>
                  </div>
                </div>
                <ul className="add-to-links">
                  <li>
                    <button
                      type="button"
                      title="Thích"
                      className="button btn-like"

                    >
                      
                      <BsFillHandThumbsUpFill/>
                      <span>like</span>
                    </button>
                  </li>

                  <li>
                    <button
                      type="button"
                      title="Mua vé"
                      className="button btn-booking"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={handleShow}
                      name={item.name}
                    >
                      <span cursorshover="true">MUA VÉ</span>
                    
                    </button>
                    <div
                      className="modal fade "
                      onClick={handleOutsideClick}
                      id="exampleModal"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-xl modal-fullscreen-xl-down modal-dialog-scrollable ">
                        <div className="modal-content">
                          <div className="modal-header">
                            <ul className="toggle-tabs">
                              {showTimes.map((Date) => (
                                <li key={Date.id} className={`${Date.id === calendar ? "date current" : "date"}`} onClick={() => {
                                  setCalendar(Date.id);
                                  setPlace(1);
                                  setType(1);
                                }}>
                                  <div className="day">
                                    <span>{Date.month}</span>
                                    <em>{Date.dayofweek}</em>
                                    <strong>{Date.day}</strong>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="modal-body">
                            <ul className="toggle-tabs-city">
                              {showTimes.map((Date) => (
                                <li key={Date.id} className={`${Date.id === calendar ? "appear" : "hide"}`}>
                                  <ul>
                                    {Date.Location.map((Location) => (
                                      <li key={Location.id} className={`${Location.id === place ? "location current-location" : "location"}`} onClick={() => {
                                        setPlace(Location.id);
                                        setType(1);
                                      }}>
                                        <span>{Location.place}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="modal-body type-watch">
                            <ul className="toggle-tabs-type">
                              {showTimes.map((Date) => (
                                <li key={Date.id} className={`${Date.id === calendar ? "appear" : "hide"}`}>
                                  <ul>
                                    {Date.Location.map((Location) => (
                                      <li key={Location.id} className={`${Location.id === place ? "appear" : "hide"}`}>
                                        <ul>
                                          {Location.Movie_Type.map((Movie_Type) => (
                                            <li key={Movie_Type.id} className={`${Movie_Type.id === type ? "type current-type" : "type"}`} onClick={() => setType(Movie_Type.id)}>
                                              <span>{Movie_Type.type_name}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </li>
                                    ))}
                                  </ul>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="modal-footer">
                            <ul>
                              {showTimes.map((Date) => (
                                <li key={Date.id} className={`${Date.id === calendar ? "appear" : "hide"}`}>
                                  <ul>
                                    {Date.Location.map((Location) => (
                                      <li key={Location.id} className={`${Location.id === place ? "appear" : "hide"}`}>
                                        <ul>
                                          {Location.Movie_Type.map((Movie_Type) => (
                                            <li key={Movie_Type.id} className={`${Movie_Type.id === type ? "appear" : "hide"}`}>
                                              <ul>
                                                {Movie_Type.Cinema.map((Cinema) => (
                                                  <li key={Cinema.id} className="cinema">
                                                    <span>{Cinema.cinema_name}</span>
                                                    <ul>
                                                      {Cinema.Site.map((Site) => (
                                                        <li key={Site.id} className="site">
                                                          <span>{Site.site_name}</span>
                                                          <ul>
                                                            {Site.Time.map((Time) => (
                                                              <li key={Time.id} className="time">
                                                                <span onClick={chooseShowTimes}>{Time.timeSt}</span>
                                                              </li>
                                                            ))}
                                                          </ul>
                                                        </li>
                                                      ))}
                                                    </ul>
                                                  </li>
                                                ))}
                                              </ul>
                                            </li>
                                          ))}
                                        </ul>
                                      </li>
                                    ))}
                                  </ul>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div >
  );
}

export default MovieNowShowing;



