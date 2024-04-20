import axios from "axios";

const fetch = filters => axios.get("users", { params: filters });

const usersApi = { fetch };

export { usersApi };
