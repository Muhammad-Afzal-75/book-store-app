import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPayment, setShowPayment] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`${API_URL}/books/${id}`);
        setBook(response.data);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to fetch book details');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchBook();
  }, [id, API_URL]);

  const handleBuyNow = () => setShowPayment(true);

  const handlePayment = async (paymentData) => {
    try {
      console.log('Processing payment:', paymentData);
      alert('Payment successful! Thank you for your purchase.');
      setShowPayment(false);
    } catch {
      alert('Payment failed. Please try again.');
    }
  };

  if (loading)
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (error)
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="alert alert-error text-lg">{error}</div>
      </div>
    );

  if (!book)
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="alert alert-warning text-lg">Book not found</div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back Button */}
      <button
        className="btn btn-outline mb-8 hover:bg-gray-100 transition duration-300"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      {/* Book Card */}
      <div className="bg-white shadow-xl rounded-lg overflow-hidden md:flex hover:shadow-2xl transition duration-300">
        <figure className="md:w-1/3 p-6 bg-gray-50 flex items-center justify-center">
          <img
            src={book.Image || '/placeholder-image.jpg'}
            alt={book.title}
            className="object-contain h-64 md:h-96 w-full rounded-lg"
            onError={(e) => (e.target.src = '/placeholder-image.jpg')}
          />
        </figure>

        <div className="p-8 md:w-2/3 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{book.name}</h1>
            <h2 className="text-2xl text-gray-600 mb-4">{book.title}</h2>
            <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
              NEW
            </div>

            <p className="text-lg mb-2">
              <span className="font-semibold">Category:</span> {book.category}
            </p>
            <p className="text-lg font-semibold text-gray-800 mb-4">
              Price: <span className="text-green-600">${book.price}</span>
            </p>

            {book.description && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-700">Description</h3>
                <p className="text-gray-600">{book.description}</p>
              </div>
            )}
          </div>

          {/* Buy Button */}
          <div className="mt-6 flex justify-end">
            <button
              className="btn btn-primary btn-lg hover:scale-105 transform transition duration-300"
              onClick={handleBuyNow}
            >
              Buy Now - ${book.price}
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Payment Details</h3>
              <button
                className="btn btn-sm btn-circle btn-ghost"
                onClick={() => setShowPayment(false)}
              >
                ✕
              </button>
            </div>

            <div className="mb-6">
              <p className="font-semibold">Book: {book.name}</p>
              <p className="font-semibold">Total: ${book.price}</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handlePayment({
                  bookId: book._id,
                  bookName: book.name,
                  price: book.price,
                  cardNumber: formData.get('cardNumber'),
                  expiry: formData.get('expiry'),
                  cvv: formData.get('cvv'),
                });
              }}
            >
              <div className="mb-4">
                <label className="label">
                  <span className="label-text">Card Number</span>
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="label">
                    <span className="label-text">Expiry Date</span>
                  </label>
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">CVV</span>
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    placeholder="123"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowPayment(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Pay ${book.price}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
