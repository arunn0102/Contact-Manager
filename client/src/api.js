// import axios from "axios";

// // Set up our backend base URL
// const API = axios.create({
//   baseURL: "https://contact-manager-server-pb33.onrender.com", // Backend URL
// });

// // API functions
// export const fetchContacts = () => API.get("/contacts");
// export const addContact = (contact) => API.post("/contacts", contact);
// export const updateContact = (id, contact) => API.put(`/contacts/${id}`, contact);
// export const deleteContact = (id) => API.delete(`/contacts/${id}`);

import axios from "axios";

// Backend API base URL (points directly to contacts endpoint)
const API = axios.create({
  baseURL: "https://contact-manager-server-pb33.onrender.com/api/contacts",
});

// API functions
export const fetchContacts = () => API.get("/");               // GET /api/contacts
export const addContact = (contact) => API.post("/", contact); // POST /api/contacts
export const updateContact = (id, contact) => API.put(`/${id}`, contact); // PUT /api/contacts/:id
export const deleteContact = (id) => API.delete(`/${id}`);     // DELETE /api/contacts/:id


