import axios from "axios";

// Set up our backend base URL
const API = axios.create({
  baseURL: "https://contact-manager-server-pb33.onrender.com", // Backend URL
});

// API functions
export const fetchContacts = () => API.get("/contacts");
export const addContact = (contact) => API.post("/contacts", contact);
export const updateContact = (id, contact) => API.put(`/contacts/${id}`, contact);
export const deleteContact = (id) => API.delete(`/contacts/${id}`);
