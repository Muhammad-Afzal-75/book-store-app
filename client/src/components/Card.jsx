import React from 'react'
import { useNavigate } from 'react-router-dom';

const Card = ({ item }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/book/${item._id}`);
  };

  return (
    <div className="w-full">
      <div className="card bg-base-100 shadow-md rounded-xl overflow-hidden transition-transform duration-300 hover:scale-95">
        
        {/* Image */}
        <figure className="bg-gray-100 p-4">
          <img
            src={item.Image}
            className="object-contain h-36 sm:h-48 md:h-48 w-full"
            alt={item.title}
          />
        </figure>

        {/* Card Body */}
        <div className="card-body space-y-2">
          {/* Title */}
          <h2 className="card-title text-base sm:text-lg font-semibold">
            {item.name.slice(0, 18)}
            <div className="badge badge-secondary">NEW</div>
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-sm sm:text-base">
            {item.title.length > 60 ? item.title.slice(0, 60) + "..." : item.title}
          </p>

          {/* Price & Button */}
          <div className="card-actions justify-between items-center pt-3 flex-wrap gap-2">
            <div className="badge badge-outline px-3 py-2 text-sm sm:text-base font-medium">
              ${item.price}
            </div>
            <button
              className="badge badge-outline hover:bg-pink-500 duration-200 hover:text-white px-4 py-2 cursor-pointer text-sm sm:text-base"
              onClick={handleViewDetails}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card