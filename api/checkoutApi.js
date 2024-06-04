import {getUserFromCookie} from "@/utils/Cookies";
import {http} from "@/utils/http";

const  CHECKOUT_URL = '/ckeckouts';
const dataUser = getUserFromCookie();

export const getCheckout = async () => {
    try {
        const response  = await  http.get(`${CHECKOUT_URL}/checkoutOpen`,{
            headers: {
                Authorization: `Bearer ${dataUser.token}`
            }
        })
        return response.data;
    }catch (error) {
        throw error;
    }
}
