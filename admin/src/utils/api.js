import axios from "./axiosInstance";
import { stringify } from "qs";
export const apiRoutesPermission = {
    getConfiguredRoutes: async (queryParams) => {
        const data = await axios.get(`/route-permission/configured-routes${queryParams ? `?${stringify(queryParams, { encode: false })}` : ""
            }`);
        return data;
    },
    deleteConfiguratedRoutesHistory: async () => {
        const data = await axios.delete(`/route-permission/configured-routes-history`);
        return data;
    }
};
