// import { useState } from "react";
// import { Plus, Edit, Trash2, Search } from "lucide-react";

// const dummyContacts = [
//   {
//     id: 1,
//     name: "John Doe",
//     phone: "+1 555-1234",
//     email: "john@example.com",
//     avatar: "https://i.pravatar.cc/150?img=1",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     phone: "+1 555-5678",
//     email: "jane@example.com",
//     avatar: "https://i.pravatar.cc/150?img=2",
//   },
//   {
//     id: 3,
//     name: "Michael Johnson",
//     phone: "+1 555-9012",
//     email: "mike@example.com",
//     avatar: "https://i.pravatar.cc/150?img=3",
//   },
// ];

// function App() {
//   const [contacts] = useState(dummyContacts);
//   const [search, setSearch] = useState("");

//   const filteredContacts = contacts.filter((c) =>
//     c.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       {/* Navbar */}
//       <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center shadow-lg">
//         <h1 className="text-3xl font-bold tracking-wide">Contact Manager</h1>
//         <button className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-xl font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all">
//           <Plus size={18} /> Add Contact
//         </button>
//       </nav>

//       {/* Search Bar */}
//       <div className="flex justify-center mt-6">
//         <div className="relative w-80">
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
//           <input
//             type="text"
//             placeholder="Search contacts..."
//             className="pl-10 pr-4 py-2 w-full rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Contacts Grid */}
//       <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//         {filteredContacts.length ? (
//           filteredContacts.map((contact) => (
//             <div
//               key={contact.id}
//               className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
//             >
//               <div className="flex items-center gap-4">
//                 <img
//                   src={contact.avatar}
//                   alt={contact.name}
//                   className="w-20 h-20 rounded-full object-cover border-2 border-blue-400"
//                 />
//                 <div>
//                   <h2 className="text-xl font-bold text-gray-800">{contact.name}</h2>
//                   <p className="text-gray-600">{contact.phone}</p>
//                   <p className="text-gray-500">{contact.email}</p>
//                 </div>
//               </div>
//               <div className="mt-5 flex gap-3">
//                 <button className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-2 rounded-lg hover:bg-green-200 hover:scale-105 transition">
//                   <Edit size={16} /> Edit
//                 </button>
//                 <button className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 hover:scale-105 transition">
//                   <Trash2 size={16} /> Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500 col-span-full text-lg">
//             No contacts found.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;


// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   fetchContacts,
//   addContact,
//   updateContact,
//   deleteContact,
// } from "./api";

// export default function App() {
//   const [contacts, setContacts] = useState([]);
//   const [filteredContacts, setFilteredContacts] = useState([]);
//   const [form, setForm] = useState({ name: "", email: "", phone: "", profilePic: "" });
//   const [editingId, setEditingId] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const [searchFocused, setSearchFocused] = useState(false);

//   useEffect(() => {
//     loadContacts();
//   }, []);

//   const loadContacts = async () => {
//     const res = await fetchContacts();
//     setContacts(res.data);
//     setFilteredContacts(res.data);
//   };

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearch(value);

//     if (!value.trim()) {
//       setFilteredContacts(contacts);
//     } else {
//       setFilteredContacts(
//         contacts.filter(
//           (c) =>
//             c.name.toLowerCase().includes(value) ||
//             c.email.toLowerCase().includes(value) ||
//             c.phone.toLowerCase().includes(value)
//         )
//       );
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.name || !form.email || !form.phone) {
//       alert("Please fill all fields!");
//       return;
//     }

//     if (isNaN(form.phone)) {
//       alert("Phone number must be numeric!");
//       return;
//     }

//     if (editingId) {
//       await updateContact(editingId, form);
//       setEditingId(null);
//     } else {
//       await addContact(form);
//     }

//     setForm({ name: "", email: "", phone: "", profilePic: "" });
//     setIsModalOpen(false);
//     loadContacts();
//   };

//   const handleEdit = (contact) => {
//     setForm(contact);
//     setEditingId(contact._id);
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     await deleteContact(id);
//     setContacts((prev) => prev.filter((c) => c._id !== id));
//     setFilteredContacts((prev) => prev.filter((c) => c._id !== id));
//   };

//   const openModal = () => {
//     setForm({ name: "", email: "", phone: "", profilePic: "" });
//     setEditingId(null);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-8">
//       {/* Header with Search */}
//       <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
//         <h1 className="text-4xl font-extrabold text-gray-800">Contact Manager</h1>
//         <div className="flex gap-4 items-center w-full md:w-auto">
//           <motion.input
//             type="text"
//             value={search}
//             onChange={handleSearch}
//             onFocus={() => setSearchFocused(true)}
//             onBlur={() => setSearchFocused(false)}
//             placeholder="Search contacts..."
//             animate={{ width: searchFocused ? 280 : 220, boxShadow: searchFocused ? "0 0 10px rgba(37, 99, 235, 0.5)" : "0 0 0" }}
//             transition={{ type: "spring", stiffness: 300 }}
//             className="p-3 border rounded-xl shadow-sm focus:outline-none transition"
//           />
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={openModal}
//             className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition"
//           >
//             + Add
//           </motion.button>
//         </div>
//       </div>

//       {/* Contact Cards */}
//       <motion.div
//         layout
//         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
//       >
//         <AnimatePresence>
//           {filteredContacts.length > 0 ? (
//             filteredContacts.map((contact) => (
//               <motion.div
//                 key={contact._id}
//                 layout
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.8 }}
//                 transition={{ duration: 0.3 }}
//                 className="bg-white shadow-xl rounded-2xl p-6 text-center transform hover:scale-105 transition duration-300"
//               >
//                 <img
//                   src={contact.profilePic || "https://via.placeholder.com/150"}
//                   alt={contact.name}
//                   className="w-24 h-24 rounded-full mx-auto mb-4 shadow-md border-4 border-gray-100"
//                 />
//                 <h2 className="text-xl font-bold text-gray-700">{contact.name}</h2>
//                 <p className="text-gray-500">{contact.email}</p>
//                 <p className="text-gray-600">{contact.phone}</p>
//                 <div className="flex justify-center gap-4 mt-4">
//                   <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => handleEdit(contact)}
//                     className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition"
//                   >
//                     Edit
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => handleDelete(contact._id)}
//                     className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
//                   >
//                     Delete
//                   </motion.button>
//                 </div>
//               </motion.div>
//             ))
//           ) : (
//             <motion.div
//               key="no-results"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 20 }}
//               transition={{ duration: 0.4 }}
//               className="col-span-full text-center text-gray-500 text-lg mt-10"
//             >
//               <p className="text-2xl font-semibold">No Contacts Found</p>
//               <p className="text-sm text-gray-400 mt-1">Try a different search term.</p>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>

//       {/* Modal */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 backdrop-blur-sm"
//           >
//             <motion.div
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.8, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
//             >
//               <h2 className="text-2xl font-bold mb-4 text-gray-800">
//                 {editingId ? "Edit Contact" : "Add Contact"}
//               </h2>
//               <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//                 <input
//                   name="name"
//                   placeholder="Name"
//                   value={form.name}
//                   onChange={handleChange}
//                   className="p-3 border rounded-lg"
//                 />
//                 <input
//                   name="email"
//                   placeholder="Email"
//                   value={form.email}
//                   onChange={handleChange}
//                   className="p-3 border rounded-lg"
//                 />
//                 <input
//                   name="phone"
//                   placeholder="Phone"
//                   value={form.phone}
//                   onChange={handleChange}
//                   className="p-3 border rounded-lg"
//                 />
//                 <input
//                   name="profilePic"
//                   placeholder="Profile Picture URL"
//                   value={form.profilePic}
//                   onChange={handleChange}
//                   className="p-3 border rounded-lg"
//                 />

//                 <div className="flex justify-end gap-3 mt-4">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     type="button"
//                     onClick={closeModal}
//                     className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500"
//                   >
//                     Cancel
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     type="submit"
//                     className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
//                   >
//                     {editingId ? "Update" : "Add"}
//                   </motion.button>
//                 </div>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   fetchContacts,
//   addContact,
//   updateContact,
//   deleteContact,
// } from "./api";

// export default function App() {
//   const [contacts, setContacts] = useState([]);
//   const [filteredContacts, setFilteredContacts] = useState([]);
//   const [form, setForm] = useState({ name: "", email: "", phone: "", profilePic: "" });
//   const [editingId, setEditingId] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const [searchFocused, setSearchFocused] = useState(false);

//   useEffect(() => {
//     loadContacts();
//   }, []);

//   const loadContacts = async () => {
//     const res = await fetchContacts();
//     setContacts(res.data);
//     setFilteredContacts(res.data);
//   };

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearch(value);

//     if (!value.trim()) {
//       setFilteredContacts(contacts);
//     } else {
//       setFilteredContacts(
//         contacts.filter(
//           (c) =>
//             c.name.toLowerCase().includes(value) ||
//             c.email.toLowerCase().includes(value) ||
//             c.phone.toLowerCase().includes(value)
//         )
//       );
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.name || !form.email || !form.phone) {
//       alert("Please fill all fields!");
//       return;
//     }

//     if (isNaN(form.phone)) {
//       alert("Phone number must be numeric!");
//       return;
//     }

//     if (editingId) {
//       await updateContact(editingId, form);
//       setEditingId(null);
//     } else {
//       await addContact(form);
//     }

//     setForm({ name: "", email: "", phone: "", profilePic: "" });
//     setIsModalOpen(false);
//     loadContacts();
//   };

//   const handleEdit = (contact) => {
//     setForm(contact);
//     setEditingId(contact._id);
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     await deleteContact(id);
//     setContacts((prev) => prev.filter((c) => c._id !== id));
//     setFilteredContacts((prev) => prev.filter((c) => c._id !== id));
//   };

//   const openModal = () => {
//     setForm({ name: "", email: "", phone: "", profilePic: "" });
//     setEditingId(null);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//  return (
//     <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-6 text-gray-100">
//       {/* Navbar */}
//       <motion.nav
//         initial={{ y: -80, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6 }}
//         className="sticky top-0 z-50 backdrop-blur-md bg-gray-800/70 border-b border-gray-700 shadow-md rounded-2xl p-4 mb-8 flex flex-col md:flex-row justify-between items-center gap-4"
//       >
//         <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 drop-shadow-lg">
//           Contact Manager
//         </h1>
//         <div className="flex gap-4 items-center w-full md:w-auto">
//           <motion.input
//             type="text"
//             value={search}
//             onChange={handleSearch}
//             onFocus={() => setSearchFocused(true)}
//             onBlur={() => setSearchFocused(false)}
//             placeholder="Search contacts..."
//             animate={{
//               width: searchFocused ? 280 : 220,
//               boxShadow: searchFocused ? "0 0 15px rgba(99, 102, 241, 0.4)" : "0 0 0",
//             }}
//             transition={{ type: "spring", stiffness: 300 }}
//             className="p-3 border rounded-full bg-gray-700 text-gray-200 shadow-sm focus:outline-none placeholder-gray-400"
//           />
//           <motion.button
//             whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
//             whileTap={{ scale: 0.95 }}
//             onClick={openModal}
//             className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition"
//           >
//             + Add Contact
//           </motion.button>
//         </div>
//       </motion.nav>

//       {/* Contact Cards */}
//       <motion.div
//         layout
//         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
//       >
//         <AnimatePresence>
//           {filteredContacts.length > 0 ? (
//             filteredContacts.map((contact) => (
//               <motion.div
//                 key={contact._id}
//                 layout
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 transition={{ duration: 0.4 }}
//                 whileHover={{ scale: 1.05, rotate: 0.2, boxShadow: "0 0 25px rgba(168, 85, 247, 0.3)" }}
//                 className="bg-gray-800/80 backdrop-blur-lg shadow-xl rounded-2xl p-6 text-center border border-gray-700"
//               >
//                 <img
//                   src={contact.profilePic || "https://via.placeholder.com/150"}
//                   alt={contact.name}
//                   className="w-24 h-24 rounded-full mx-auto mb-4 shadow-md border-4 border-gray-700"
//                 />
//                 <h2 className="text-xl font-bold text-gray-100">{contact.name}</h2>
//                 <p className="text-gray-400">{contact.email}</p>
//                 <p className="text-gray-300">{contact.phone}</p>
//                 <div className="flex justify-center gap-4 mt-4">
//                   <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => handleEdit(contact)}
//                     className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg shadow-md hover:bg-yellow-400 transition"
//                   >
//                     Edit
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => handleDelete(contact._id)}
//                     className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
//                   >
//                     Delete
//                   </motion.button>
//                 </div>
//               </motion.div>
//             ))
//           ) : (
//             <motion.div
//               key="no-results"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 20 }}
//               transition={{ duration: 0.4 }}
//               className="col-span-full text-center text-gray-400 text-lg mt-10"
//             >
//               <p className="text-2xl font-semibold">No Contacts Found</p>
//               <p className="text-sm text-gray-500 mt-1">
//                 Try searching for a different name.
//               </p>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>

//       {/* Modal */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50 backdrop-blur-sm"
//           >
//             <motion.div
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.8, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700"
//             >
//               <h2 className="text-2xl font-bold mb-4 text-gray-100">
//                 {editingId ? "Edit Contact" : "Add Contact"}
//               </h2>
//               <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//                 <input
//                   name="name"
//                   placeholder="Name"
//                   value={form.name}
//                   onChange={handleChange}
//                   className="p-3 border rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400"
//                 />
//                 <input
//                   name="email"
//                   placeholder="Email"
//                   value={form.email}
//                   onChange={handleChange}
//                   className="p-3 border rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400"
//                 />
//                 <input
//                   name="phone"
//                   placeholder="Phone"
//                   value={form.phone}
//                   onChange={handleChange}
//                   className="p-3 border rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400"
//                 />
//                 <input
//                   name="profilePic"
//                   placeholder="Profile Picture URL"
//                   value={form.profilePic}
//                   onChange={handleChange}
//                   className="p-3 border rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400"
//                 />
//                 <div className="flex justify-end gap-3 mt-4">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     type="button"
//                     onClick={closeModal}
//                     className="bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-gray-500"
//                   >
//                     Cancel
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     type="submit"
//                     className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-5 py-2 rounded-lg shadow-lg hover:opacity-90"
//                   >
//                     {editingId ? "Update" : "Add"}
//                   </motion.button>
//                 </div>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookUser, PlusCircle , Pencil, Trash2, Search, Users } from "lucide-react";
import {
  fetchContacts,
  addContact,
  updateContact,
  deleteContact,
} from "./api";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", profilePic: "" });
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const res = await fetchContacts();
    setContacts(res.data);
    setFilteredContacts(res.data);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    if (!value.trim()) {
      setFilteredContacts(contacts);
    } else {
      setFilteredContacts(
        contacts.filter(
          (c) =>
            c.name.toLowerCase().includes(value) ||
            c.email.toLowerCase().includes(value) ||
            c.phone.toLowerCase().includes(value)
        )
      );
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone) {
      alert("Please fill all fields!");
      return;
    }

    if (isNaN(form.phone)) {
      alert("Phone number must be numeric!");
      return;
    }

    if (editingId) {
      await updateContact(editingId, form);
      setEditingId(null);
    } else {
      await addContact(form);
    }

    setForm({ name: "", email: "", phone: "", profilePic: "" });
    setIsModalOpen(false);
    loadContacts();
  };

  const handleEdit = (contact) => {
    setForm(contact);
    setEditingId(contact._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteContact(id);
    setContacts((prev) => prev.filter((c) => c._id !== id));
    setFilteredContacts((prev) => prev.filter((c) => c._id !== id));
  };

  const openModal = () => {
    setForm({ name: "", email: "", phone: "", profilePic: "" });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900
  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 text-gray-100">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 backdrop-blur-md bg-gray-800/70 border-b border-gray-700 shadow-md rounded-2xl p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4"
      >
        <div className="flex items-center gap-3">
          <BookUser size={40} className="text-purple-400 drop-shadow" />
          <h1 className="text-3xl w-auto sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 drop-shadow-lg">
            Contact Manager
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto items-center">
          <div className="relative flex items-center">
            {/* Search Icon */}
            <Search size={18} className="absolute left-3 text-gray-400 w-5 h-5 md:w-5 md:h-5" />

            {/* Search Input */}
            <motion.input
              type="text"
              value={search}
              onChange={handleSearch}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search Contacts..."
              animate={{
                width: searchFocused ? 260 : 200,
                boxShadow: searchFocused ? "0 0 15px rgba(99,102,241,0.4)" : "0 0 0",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="pl-10 pr-4 py-2 w-auto sm:w-auto border rounded-full bg-gray-700 text-gray-200 shadow-sm focus:outline-none placeholder-gray-400"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(59,130,246,0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={openModal}
            className="w-auto sm:w-auto bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:opacity-90 transition"
          >
            <div className="flex items-center gap-3">
              <PlusCircle className="w-5 h-5 md:w-5 md:h-5" />
              Add Contacts
            </div>
          </motion.button>
        </div>
      </motion.nav>

      {/* Contact Cards */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10"
      >
        <AnimatePresence>
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <motion.div
                key={contact._id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{
                  scale: 1.05,
                  rotate: 0.2,
                  boxShadow: "0 0 25px rgba(168,85,247,0.3)",
                }}
                className="bg-gray-800/80 backdrop-blur-lg shadow-xl rounded-2xl p-6 text-center border border-gray-700 break-words"
              >
                <img
                  src={contact.profilePic || "https://via.placeholder.com/150"}
                  alt={contact.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-4 shadow-md border-4 border-gray-700"
                />
                <h2 className="text-lg sm:text-xl font-bold text-gray-100 truncate">
                  {contact.name}
                </h2>
                <p className="text-gray-400 text-sm break-all">{contact.email}</p>
                <p className="text-gray-300 text-sm">{contact.phone}</p>
                <div className="flex justify-center gap-3 mt-4 flex-wrap">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEdit(contact)}
                    className="bg-gray-600 text-white px-3 py-2 rounded-lg text-sm sm:text-base shadow-md hover:bg-gray-700"
                  >
                    <div className="flex items-center gap-2">
                      <Pencil size={18} className="mr-1" /> Edit
                    </div>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(contact._id)}
                    className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm sm:text-base shadow-md hover:bg-red-600"
                  >
                    <div className="flex items-center gap-2">
                      <Trash2 size={18} className="mr-1" /> Delete
                    </div>

                  </motion.button>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="col-span-full text-center text-gray-400 text-lg mt-10"
            >
              <p className="text-2xl font-semibold">No Contacts Found</p>
              <p className="text-sm text-gray-500 mt-1">
                Try searching for a different name.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      {/* Modal for Adding/Editing Contact */}
<AnimatePresence>
  {isModalOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="bg-gray-900/80 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-full max-w-lg sm:max-w-md text-gray-200"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {editingId ? "Edit Contact" : "Add Contact"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            name="profilePic"
            placeholder="Profile Picture URL"
            value={form.profilePic}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <div className="flex justify-between gap-4 mt-6">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg shadow-md transition"
            >
              {editingId ? "Update" : "Add"}
            </motion.button>
            <motion.button
              type="button"
              onClick={closeModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 py-3 rounded-lg shadow-md transition"
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
}
