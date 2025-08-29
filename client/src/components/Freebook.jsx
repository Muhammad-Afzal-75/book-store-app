import React, { useEffect, useState } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from "./Card";

const Freebook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getBooks = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/books?category=free`);
        const data = Array.isArray(res.data) ? res.data : res.data.books ? res.data.books : [];
        setBooks(data);
        setError("");
      } catch (err) {
        console.error("Failed to fetch free books:", err);
        setError("Failed to load free books. Please try again later.");
      } finally {
        setLoading(false);
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
    vertical: false,
    responsive: [
      { breakpoint: 1440, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1, centerMode: true, centerPadding: "0px" } },
    ],
  };

  if (loading) return <p className="text-center my-10">Loading free books...</p>;
  if (error) return <p className="text-center my-10 text-red-500">{error}</p>;
  if (!books.length) return <p className="text-center my-10">No free books available.</p>;

  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-20 my-10 space-y-8">
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl font-bold">Free Books</h1>
        <p className="text-gray-600 max-w-2xl mx-auto md:mx-0">
          Discover our selection of free books. Read anytime, anywhere — totally free.
        </p>
      </div>

      <Slider {...settings}>
        {books.map((item) => (
          <div key={item._id || item.id} className="p-3">
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
