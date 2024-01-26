import { Link } from "react-router-dom";
import "./Banner.css";
import { motion } from "framer-motion";
function Banner({ title, text, img }) {
  return (
    <div className="banner">
      <div className="container mx-auto">
        <div className="banner-container">
          <div className="text-side">
            <div className="text">
              <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-black">{title}</h2>
              <p>{text}</p>
              <Link onClick={() => window.scrollTo(0, 0)}>
                <motion.button whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.9 }} transition={{ duration: 0.2 }}>Shop now</motion.button>
              </Link>
            </div>
          </div>
          <div className="img-side">
            <img src={img} alt="banner" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
