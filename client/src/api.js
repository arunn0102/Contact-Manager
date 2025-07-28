import axios from "axios";

const API = axios.create({
  baseURL: "https://contact-manager-server-pb33.onrender.com/api", 
});

export const fetchContacts = () => API.get("/contacts");
export const addContact = (contact) => API.post("/contacts", contact);
export const updateContact = (id, contact) => API.put(`/contacts/${id}`, contact);
export const deleteContact = (id) => API.delete(`/contacts/${id}`);
