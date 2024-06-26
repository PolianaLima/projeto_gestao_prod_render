import {getUserFromCookie} from "@/utils/Cookies";
import {http} from "@/utils/http";

const  VENDAS_URL = '/vendas';
const dataUser = getUserFromCookie();

export const getVendasCheckout = async (idCheckout) => {
    try {
        const response  = await  http.get(`${VENDAS_URL}/checkout/${idCheckout}`,{
            headers: {
                Authorization: `Bearer ${dataUser.token}`
            }
        })
        return response.data;
    }catch (error) {
        throw error;
    }
}

export const postVendas = async (venda) => {
    try {
        const response  = await  http.post(`${VENDAS_URL}/novavenda`, venda, {
            headers: {
                Authorization: `Bearer ${dataUser.token}`
            }
        })
        return response.data;
    }catch (error) {
        throw error;
    }
}