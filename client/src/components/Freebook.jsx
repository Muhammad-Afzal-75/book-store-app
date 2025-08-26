import React, { useEffect, useState } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import Card from "./Card";

const Freebook = () => {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5050/book?category=free");
        const data = res.data.filter((item) => item.category === "free");
        setBook(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBooks();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: false, // ✅ force horizontal
    responsive: [
      { breakpoint: 1440, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "0px",
        },
      },
    ],
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-20 my-10 space-y-8">
      {/* Section Heading */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl font-bold">Free Books</h1>
        <p className="text-gray-600 max-w-2xl mx-auto md:mx-0">
          Discover our selection of free books. Read anytime, anywhere — totally free.
        </p>
      </div>

      {/* Slider */}
      <Slider {...settings}>
        {book.map((item, index) => (
          <div key={index} className="p-3">
            <div className="w-72 mx-auto">
              <Card item={item} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Freebook;
