import "./style.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import {BsFillHandThumbsUpFill} from "react-icons/bs"





function Chitiet() {
  const { state } = useLocation();
  console.log(state);


  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };


  return (
    <div className="page-chitiet">
      <div className="product-view">
        <div className="product-essential">
          <div className="page-title product-view">
            <span className="h1">Nội Dung Phim</span>
          </div>
          <div className="product-name-reponsive">
            <h1>{state.name}</h1>
          </div>
          <div className="product-img-box">
            <div className="product-image product-image-zoom zoom-available">
              <div className="product-image-gallery">
                <img
                  id="image-main"
                  className="gallery-image visible"
                  src={state.image}
                  alt={state.name}
                  title={state.name}
                />
              </div>
            </div>
          </div>
          <div className="product-shop">
            <div className="product-name">
              <span className="h1">{state.name}</span>
            </div>

            {/* Build test  */}
            <div className="movie-director movie-info">
              <label>Đạo diễn: </label>
              <div className="std">&nbsp; {state.directors} </div>
            </div>
            <div className="movie-actress movie-info">
              <label cursorshover="true">Diễn viên:</label>
              <div className="std">
                &nbsp; {state.actor}
              </div>
            </div>
            <div className="movie-genre movie-info">
              <label>Thể loại: </label>
              <div className="std">
                &nbsp; {state.category}
              </div>
            </div>
            <div className="movie-release movie-info">
              <label>Khởi chiếu: </label>
              <div className="std">&nbsp; {state.timeStart} </div>
            </div>
            <div className="movie-actress movie-info">
              <label>Thời lượng: </label>
              <div className="std">&nbsp; {state.time} phút</div>
            </div>
            <div className="movie-language movie-info">
              <label>Ngôn ngữ: </label>
              <div className="std">
                &nbsp; {state.language}
              </div>
            </div>
            <div className="movie-rating movie-rated-web">
              <label cursorshover="true">Rated: </label>
              <div className="std">
                &nbsp; {state.rated}
              </div>
            </div>
          </div>
          <div className="movie-detail-fb-booking">
            <ul className="add-to-cart-wrapper">
              <li>
                <button type="button" title="Thích" className="button btn-like">
                <BsFillHandThumbsUpFill/>
                  <span>like</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  title="Mua vé"
                  className="button btn-booking"
                >
                  <span>
                    Mua vé
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="product-collateral toggle-content tabs-format-cgv">
          <div className="bloc-tabs">
            <button
              className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(1)}
            >
              Chi tiết
            </button>
            <button
              className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(2)}
            >
              Trailer
            </button>
          </div>

          <div className="content-tabs">
            <div
              className={
                toggleState === 1 ? "content  active-content" : "content"
              }
            >
              <p>
                {state.detail}
              </p>
            </div>

            <div
              className={
                toggleState === 2 ? "content  active-content" : "content"
              }
            >
              <iframe
                width="560"
                height="315"
                src={state.trailer}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Chitiet;

