import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import { Link } from "react-router-dom";

const Course = () => {
  const [books, setBooks] = useState([]); // Always initialize as array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/books`);

        // Ensure data is an array
        if (Array.isArray(res.data)) {
          setBooks(res.data);
        } else if (Array.isArray(res.data.books)) {
          setBooks(res.data.books);
        } else {
          console.warn("Unexpected response format:", res.data);
          setBooks([]);
        }
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getBooks();
  }, []);

  if (loading) return <p className="text-center mt-20">Loading books...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 my-8 mt-20 md:mt-28 min-h-screen">
      {/* Heading */}
      <div className="flex flex-col items-center text-center">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-semibold leading-tight">
          We're delighted to have you <span className="text-pink-500">here :)</span>
        </h1>

        <p className="mt-4 text-sm sm:text-base md:text-lg max-w-4xl">
          Explore our collection of books. Find knowledge, stories, and inspiration for free and paid books.
        </p>

        <Link to="/">
          <button className="mt-6 px-4 sm:px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition duration-300">
            Back
          </button>
        </Link>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8 lg:gap-12 mt-10">
        {books.length > 0 ? (
          books.map((item) => <Card key={item._id || item.id} item={item} />)
        ) : (
          <p className="col-span-full text-center">No books found.</p>
        )}
      </div>
    </div>
  );
};

export default Course;
