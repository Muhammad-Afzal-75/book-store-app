import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [activeTab, setActiveTab] = useState('books'); // 'books' or 'users'

  // Form state for books
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    price: '',
    category: '',
    Image: '',
    description: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentBookId, setCurrentBookId] = useState(null);

  // Toast function
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Fetch all books
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5050/book');
      setBooks(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch books');
      showToast('Failed to fetch books', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5050/admin/users');
      setUsers(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch users');
      showToast('Failed to fetch users', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'books') {
      fetchBooks();
    } else if (activeTab === 'users') {
      fetchUsers();
    }
  }, [activeTab]);

  // Handle form input changes for books
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission for books
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.title || !formData.price || !formData.category) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    try {
      if (isEditing) {
        // Update existing book
        const response = await axios.put(`http://localhost:5050/book/${currentBookId}`, formData);
        setBooks(books.map(book => book._id === currentBookId ? response.data : book));
        showToast('Book updated successfully!', 'success');
      } else {
        // Create new book
        const response = await axios.post('http://localhost:5050/book', formData);
        setBooks([...books, response.data]);
        showToast('Book added successfully!', 'success');
      }

      // Reset form
      setFormData({
        name: '',
        title: '',
        price: '',
        category: '',
        Image: '',
        description: ''
      });
      setIsEditing(false);
      setCurrentBookId(null);
    } catch (err) {
      showToast(`Failed to ${isEditing ? 'update' : 'add'} book`, 'error');
    }
  };

  // Handle edit book
  const handleEdit = (book) => {
    setFormData({
      name: book.name,
      title: book.title,
      price: book.price,
      category: book.category,
      Image: book.Image || '',
      description: book.description || ''
    });
    setIsEditing(true);
    setCurrentBookId(book._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle delete book
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`http://localhost:5050/book/${id}`);
        setBooks(books.filter(book => book._id !== id));
        showToast('Book deleted successfully!', 'success');
      } catch (err) {
        showToast('Failed to delete book', 'error');
      }
    }
  };

  // Toggle user admin status
  const toggleUserAdmin = async (userId, isAdmin) => {
    try {
      const response = await axios.put(`http://localhost:5050/admin/user/${userId}/admin`, {
        isAdmin: !isAdmin
      });
      
      // Update the users state with the updated user
      setUsers(users.map(user =>
        user._id === userId ? response.data.user : user
      ));
      
      showToast(response.data.message, 'success');
    } catch (err) {
      showToast('Failed to update user admin status', 'error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-md shadow-lg ${
          toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white transition-transform transform duration-300 ${
          toast.show ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {toast.message}
        </div>
      )}

      <h1 className="text-3xl font-bold mt-15 text-center">Admin Dashboard</h1>
            
            {/* Create Admin Form */}
            <div className="bg-base-100 p-6 rounded-lg shadow-lg mb-8">
              <h2 className="text-2xl font-bold mb-4">Create Admin User</h2>
              <form onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const adminData = {
                  fullname: formData.get('fullname'),
                  email: formData.get('email'),
                  password: formData.get('password')
                };
                
                try {
                  const response = await axios.post('http://localhost:5050/user/create-admin', adminData);
                  showToast(response.data.message, 'success');
                  e.target.reset();
                } catch (err) {
                  showToast('Failed to create admin: ' + (err.response?.data?.message || err.message), 'error');
                }
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="label">
                      <span className="label-text">Full Name *</span>
                    </label>
                    <input
                      type="text"
                      name="fullname"
                      placeholder="Admin Full Name"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="label">
                      <span className="label-text">Email *</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Admin Email"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="label">
                      <span className="label-text">Password *</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Admin Password"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <button type="submit" className="btn btn-primary">
                    Create Admin User
                  </button>
                </div>
              </form>
            </div>
      
      {/* Tabs */}
      <div className="flex justify-center my-6">
        <div className="tabs tabs-boxed">
          <button
            className={`tab ${activeTab === 'books' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('books')}
          >
            Books Management
          </button>
          <button
            className={`tab ${activeTab === 'users' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users Management
          </button>
        </div>
      </div>

      {/* Books Management */}
      {activeTab === 'books' && (
        <div>
          {/* Book Form */}
          <div className="bg-base-100 p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {isEditing ? 'Edit Book' : 'Add New Book'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label">
                    <span className="label-text">Name *</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder="Book Name"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Title *</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder="Book Title"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Price *</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder="Book Price"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Category *</span>
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder="Book Category"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Image URL</span>
                  </label>
                  <input
                    type="text"
                    name="Image"
                    value={formData.Image}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder="Image URL"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered w-full"
                    placeholder="Book Description"
                    rows="3"
                  ></textarea>
                </div>
              </div>

              <div className="mt-6">
                <button type="submit" className="btn btn-primary mr-2">
                  {isEditing ? 'Update Book' : 'Add Book'}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setIsEditing(false);
                      setCurrentBookId(null);
                      setFormData({
                        name: '',
                        title: '',
                        price: '',
                        category: '',
                        Image: '',
                        description: ''
                      });
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Books List */}
          <div className="bg-base-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Books List</h2>

            {loading ? (
              <div className="text-center py-8">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : error ? (
              <div className="alert alert-error">
                <span>{error}</span>
              </div>
            ) : books.length === 0 ? (
              <div className="text-center py-8">
                <p>No books found. Add your first book!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Image</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book) => (
                      <tr key={book._id}>
                        <td>{book.name}</td>
                        <td>{book.title}</td>
                        <td>${book.price}</td>
                        <td>{book.category}</td>
                        <td>
                          {book.Image ? (
                            <img
                              src={book.Image}
                              alt={book.title}
                              style={{ width: "60px", height: "60px", objectFit: "cover" }}
                            />
                          ) : (
                            <span>No Image</span>
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary mr-2"
                            onClick={() => handleEdit(book)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-error"
                            onClick={() => handleDelete(book._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Users Management */}
      {activeTab === 'users' && (
        <div className="bg-base-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Users List</h2>

          {loading ? (
            <div className="text-center py-8">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : error ? (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-8">
              <p>No users found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.fullname}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.isAdmin ? (
                          <span className="badge badge-success">Admin</span>
                        ) : (
                          <span className="badge badge-secondary">User</span>
                        )}
                      </td>
                      <td>
                        <button
                          className={`btn btn-sm ${user.isAdmin ? 'btn-warning' : 'btn-primary'}`}
                          onClick={() => toggleUserAdmin(user._id, user.isAdmin)}
                        >
                          {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;