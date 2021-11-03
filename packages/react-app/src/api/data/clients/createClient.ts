import axios from "axios";

export default async (newClient: NewClientForm) => {
  await axios.post("/clients", newClient);
};
