import axios from "./axiosInstance";

export const apiRoutesPermission = {
    getConfiguredRoutes: async () => {
        const data = await axios.get("/route-permission/configured-routes");
        return data;
    },
};
