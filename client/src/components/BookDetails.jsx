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

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/book/${id}`);
        setBook(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch book details');
        setLoading(false);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  const handleBuyNow = () => {
    setShowPayment(true);
  };

  const handlePayment = async (paymentData) => {
    try {
      // Simulate payment processing
      console.log('Processing payment:', paymentData);
      alert('Payment successful! Thank you for your purchase.');
      setShowPayment(false);
    } catch (err) {
      alert('Payment failed. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-warning">
          <span>Book not found</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        className="btn btn-outline mb-6"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>
      
      <div className="card bg-base-100 shadow-xl">
        <div className="md:flex">
          <figure className="md:w-1/3 p-6">
            <img
              src={book.Image || '/placeholder-image.jpg'}
              alt={book.title}
              className="object-contain h-64 md:h-96 w-full rounded-lg"
              onError={(e) => {
                e.target.src = '/placeholder-image.jpg';
              }}
            />
          </figure>
          
          <div className="card-body md:w-2/3">
            <h1 className="card-title text-3xl">{book.name}</h1>
            <h2 className="text-xl font-semibold text-gray-600">{book.title}</h2>
            
            <div className="badge badge-secondary mb-4">NEW</div>
            
            <p className="text-lg">
              <span className="font-semibold">Category:</span> {book.category}
            </p>
            
            <p className="text-lg">
              <span className="font-semibold">Price:</span> ${book.price}
            </p>
            
            {book.description && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{book.description}</p>
              </div>
            )}
            
            <div className="card-actions justify-end mt-6">
              <button 
                className="btn btn-primary btn-lg"
                onClick={handleBuyNow}
              >
                Buy Now - ${book.price}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Payment Details</h3>
              <button 
                className="btn btn-sm btn-circle btn-ghost"
                onClick={() => setShowPayment(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="mb-4">
              <p className="font-semibold">Book: {book.name}</p>
              <p className="font-semibold">Total: ${book.price}</p>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const paymentData = {
                bookId: book._id,
                bookName: book.name,
                price: book.price,
                cardNumber: formData.get('cardNumber'),
                expiry: formData.get('expiry'),
                cvv: formData.get('cvv')
              };
              handlePayment(paymentData);
            }}>
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
              
              <div className="grid grid-cols-2 gap-4 mb-4">
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
              
              <div className="flex justify-end gap-2">
                <button 
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowPayment(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="btn btn-primary"
                >
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