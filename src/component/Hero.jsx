import "./Header.css";
import Main1 from "../img/header/home-img-1.jpg";
import Main2 from "../img/header/home-img-2.jpg";
import Main3 from "../img/header/home-img-3.jpg";
import Main4 from "../img/header/home-img-4.jpg";
import { Link, useNavigate } from "react-router-dom";

function Hero({ value, setValue, active, setActive }) {
  const navigate = useNavigate();
  const handleNavigate = (v, id) => {
    navigate("/product");
    setValue(v)
    setActive(id)
  }

  return (
    <>
      <div className="py-8">
        <div className="container mx-auto">
          <div className="grid-container">
            <div className="featured grid-one">
              <a onClick={() => handleNavigate("furniture", 2)} >
                <div id="img1" className="lil-overlay"></div>
                <img src={Main1} alt="img1" />
                <p className="main-description text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Live Comfortably</p>
              </a>
            </div>
            <div className="featured grid-two">
              <a onClick={() => handleNavigate("skin-care", 7)} >
                <div id="img2" className="lil-overlay"></div>
                <img src={Main2} alt="img2" />
                <p className="main-description text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Skincare</p>
              </a>
            </div>
            
            <div className="featured grid-four">
              <a onClick={() => handleNavigate("kitchen", 5)} >
                <div id="img3" className="lil-overlay"></div>
                <img src={Main3} alt="img3" />
                <p className="main-description text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Kitchen</p>
              </a>
            </div>
            <div className="featured grid-four-low">
              <a onClick={() => handleNavigate("electronic", 3)} >
                <div id="img4" className="lil-overlay"></div>
                <img src={Main4} alt="img4" />
                <p className="main-description text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Electronics</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
