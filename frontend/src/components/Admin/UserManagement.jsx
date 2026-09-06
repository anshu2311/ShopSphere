import React, { useState } from "react";

const UserManagement = () => {
 const [users, setUsers] = useState([
  { 
   _id: 1, 
   name: "John Doe", 
   email: "john.doe@example.com", 
     role: "admin" 
  },
  { 
   _id: 2, 
   name: "Jane Smith", 
   email: "jane.smith@example.com", 
     role: "customer" 
  },
  { 
   _id: 3, 
   name: "Bob Johnson", 
   email: "bob.johnson@example.com", 
     role: "customer" 
  },
 ]);
 const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  role: "customer", //default role is customer
 });
 
 const handleChange = (e) => {
  setFormData({
   ...formData,
   [e.target.name]: e.target.value,
  });
 }

 const handleSubmit = (e) => {
  e.preventDefault();

  //reset form data after submission
  setFormData({
   name: "",
   email: "",
   password: "",
   role: "customer",
  });
 };

 const handleRoleChange = (userId, newRole) => {
    setUsers((currentUsers) =>
     currentUsers.map((user) =>
        user._id === userId ? { ...user, role: newRole } : user
     )
    );
 };
 
 const handleDeleteUser = (userId) => {
  if(window.confirm("Are you sure you want to delete this user?")) {
   console.log(`Deleting user with ID: ${userId}`);
   setUsers((currentUsers) => currentUsers.filter((user) => user._id !== userId));
  }
 };

 return (
  <div className="mx-auto max-w-7xl p-6">
   <h2 className="text-2xl font-bold mb-4">User Management</h2>
   {/*Add new user form */}
   <div className="p-6 rounded-lg mb-6">
    <h3 className="text-lg font-bold mb-4">Add New User</h3>
    <form onSubmit={handleSubmit}>
     <div className="mb-4">
      <label className="block text-gray-700">
       Name
      </label>
      <input
       className="w-full p-2 border rounded"
       name="name"
       type="text"
       value={formData.name}
       onChange={handleChange}
       required
      />
     </div>
     <div className="mb-4">
      <label className="block text-gray-700">
       Email
      </label>
      <input
       className="w-full p-2 border rounded"
       name="email"
       type="email"
       value={formData.email}
       onChange={handleChange}
       required
      />
     </div>
     <div className="mb-4">
      <label className="block text-gray-700">
       Password
      </label>
      <input
       className="w-full p-2 border rounded"
       name="password"
       type="password"
       value={formData.password}
       onChange={handleChange}
       required
      />
     </div>
     <div className="mb-4">
      <label className="block text-gray-700">
       Role
      </label>
      <select
       className="w-full p-2 border rounded"
       name="role"
       value={formData.role}
       onChange={handleChange}
       required
      >
       <option value="customer">Customer</option>
       <option value="admin">Admin</option>
      </select>
     </div>
     <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
      Add User
     </button>
    </form>
   </div>

   {/*User list table */}
   <div className="overflow-x-auto shadow-md sm:rounded-lg">
    <table className="min-w-full text-left text-gray-500">
     <thead className="bg-gray-100 text-xs uppercase text-gray-700">
      <tr>
       <th className="px-4 py-2">Name</th>
       <th className="px-4 py-2">Email</th>
       <th className="px-4 py-2">Role</th>
       <th className="px-4 py-2">Actions</th>
      </tr>
     </thead>
     <tbody>
      {users.map((user) => (
       <tr key={user._id} className="border-b hover:bg-gray-50">
        <td className="p-4 font-medium text-gray-900 whitespace-nowrap">{user.name}</td>
        <td className="p-4">{user.email}</td>
        <td className="p-4">
         <select 
          value={user.role} 
          onChange={(e) => handleRoleChange(user._id, e.target.value)}
          className="p-2 border rounded"
         >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
         </select>
        </td>
        <td className="p-4">
         <button onClick={() => handleDeleteUser(user._id)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded ml-2">
          Delete
         </button>
        </td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>
  </div>
 )
}

export default UserManagement