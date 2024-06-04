import {getUserFromCookie} from "@/utils/Cookies";
import {http} from "@/utils/http";

const  VENDAS_URL = '/ckeckouts';
const dataUser = getUserFromCookie();

export const vendaCheckout = async () => {
    try {
        const response  = await  http.get(`${VENDAS_URL}/checkoutOpen`,{
            headers: {
                Authorization: `Bearer ${dataUser.token}`
            }
        })
        return response.data;
    }catch (error) {
        throw error;
    }
}