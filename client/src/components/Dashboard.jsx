import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [activeTab, setActiveTab] = useState("books"); // 'books' or 'users'

  // Book form state
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    price: "",
    category: "",
    Image: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentBookId, setCurrentBookId] = useState(null);

  // Toast helper
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  // Fetch books
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/books`);
      const data = Array.isArray(res.data) ? res.data : res.data.books ? res.data.books : [];
      setBooks(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch books");
      showToast("Failed to fetch books", "error");
    } finally {
      setLoading(false);
    }
  };

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/admin/users`);
      const data = Array.isArray(res.data) ? res.data : res.data.users ? res.data.users : [];
      setUsers(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch users");
      showToast("Failed to fetch users", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "books") fetchBooks();
    else if (activeTab === "users") fetchUsers();
  }, [activeTab]);

  // Handle form input change
  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Submit book form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.title || !formData.price || !formData.category) {
      showToast("Please fill all required fields", "error");
      return;
    }

    try {
      if (isEditing) {
        const res = await axios.put(`${API_URL}/books/${currentBookId}`, formData);
        setBooks(books.map((b) => (b._id === currentBookId ? res.data : b)));
        showToast("Book updated successfully!");
      } else {
        const res = await axios.post(`${API_URL}/books`, formData);
        setBooks([...books, res.data]);
        showToast("Book added successfully!");
      }
      setFormData({ name: "", title: "", price: "", category: "", Image: "", description: "" });
      setIsEditing(false);
      setCurrentBookId(null);
    } catch {
      showToast(`Failed to ${isEditing ? "update" : "add"} book`, "error");
    }
  };

  // Edit book
  const handleEdit = (book) => {
    setFormData({
      name: book.name,
      title: book.title,
      price: book.price,
      category: book.category,
      Image: book.Image || "",
      description: book.description || "",
    });
    setIsEditing(true);
    setCurrentBookId(book._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete book
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await axios.delete(`${API_URL}/books/${id}`);
      setBooks(books.filter((b) => b._id !== id));
      showToast("Book deleted successfully!");
    } catch {
      showToast("Failed to delete book", "error");
    }
  };

  // Toggle user admin
  const toggleUserAdmin = async (userId, isAdmin) => {
    try {
      const res = await axios.put(`${API_URL}/admin/user/${userId}/admin`, { isAdmin: !isAdmin });
      setUsers(users.map((u) => (u._id === userId ? res.data.user : u)));
      showToast(res.data.message, "success");
    } catch {
      showToast("Failed to update user admin status", "error");
    }
  };

  return (
    <div className="container mx-auto px-4 mt-15">
      {/* Toast */}
      {toast.show && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-md shadow-lg ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {toast.message}
        </div>
      )}

      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === "books" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("books")}
        >
          Manage Books
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("users")}
        >
          Manage Users
        </button>
      </div>

      {/* Books Section */}
      {activeTab === "books" && (
        <div>
          {/* Book Form */}
          <form onSubmit={handleSubmit} className="bg-base-100 p-6 rounded-lg shadow-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Book Name" className="input input-bordered w-full" required />
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" className="input input-bordered w-full" required />
              <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Price" className="input input-bordered w-full" required />
              <input type="text" name="category" value={formData.category} onChange={handleInputChange} placeholder="Category" className="input input-bordered w-full" required />
              <input type="text" name="Image" value={formData.Image} onChange={handleInputChange} placeholder="Image URL" className="input input-bordered w-full" />
              <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" className="textarea textarea-bordered w-full md:col-span-2" />
            </div>
            <button type="submit" className="btn btn-primary mt-4">{isEditing ? "Update Book" : "Add Book"}</button>
          </form>

          {/* Books Table */}
          {loading ? <p>Loading books...</p> : error ? <p className="text-red-500">{error}</p> :
            books.length > 0 ? (
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((b) => (
                    <tr key={b._id}>
                      <td>{b.name}</td>
                      <td>{b.title}</td>
                      <td>{b.price}</td>
                      <td>{b.category}</td>
                      <td>
                        <button onClick={() => handleEdit(b)} className="btn btn-sm btn-warning mr-2">Edit</button>
                        <button onClick={() => handleDelete(b._id)} className="btn btn-sm btn-error">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <p>No books found</p>
          }
        </div>
      )}

      {/* Users Section */}
      {activeTab === "users" && (
        <div>
          {loading ? <p>Loading users...</p> : error ? <p className="text-red-500">{error}</p> :
            users.length > 0 ? (
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id}>
                      <td>{u.fullname}</td>
                      <td>{u.email}</td>
                      <td>{u.isAdmin ? "Admin" : "User"}</td>
                      <td>
                        <button onClick={() => toggleUserAdmin(u._id, u.isAdmin)} className="btn btn-sm btn-info">
                          {u.isAdmin ? "Remove Admin" : "Make Admin"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <p>No users found</p>
          }
        </div>
      )}
    </div>
  );
};

export default Dashboard;
