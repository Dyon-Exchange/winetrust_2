import axios from "axios";

export default async (newClient: NewClientForm) => {
  await axios.post("/client/create", newClient);
};
