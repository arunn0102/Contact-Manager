import axios from "axios";

// Set up our backend base URL
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Backend URL
});

// API functions
export const fetchContacts = () => API.get("/contacts");
export const addContact = (contact) => API.post("/contacts", contact);
export const updateContact = (id, contact) => API.put(`/contacts/${id}`, contact);
export const deleteContact = (id) => API.delete(`/contacts/${id}`);
