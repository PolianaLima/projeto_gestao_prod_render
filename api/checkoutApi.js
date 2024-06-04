import {getUserFromCookie} from "@/utils/Cookies";
import {http} from "@/utils/http";

const  CHECKOUT_URL = '/ckeckouts';
const dataUser = getUserFromCookie();

export const abrirNovoCheckout = async (data) => {
    try {
        const response = await http.post(`${CHECKOUT_URL}/abirNovoCheckout`, data, {
            headers: {
                Authorization: `Bearer ${dataUser.token}`
            }
        })
        return response.data;
    }catch (error) {
        throw error;
    }

}

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

export const finalizarCheckout = async (id) => {
    try {
        const response = await http.put(`${CHECKOUT_URL}/finalizarCheckout/${id}`, {},{
            headers: {
                Authorization: `Bearer ${dataUser.token}`
            }
        })
        return response.data;
    }catch (error) {
        throw error;
    }
}
