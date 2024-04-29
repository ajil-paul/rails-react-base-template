import axios from "axios";

const fetch = () => axios.get("roles");

const rolesApi = { fetch };

export { rolesApi };
