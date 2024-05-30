import {http} from "@/utils/http";
import {getUserFromCookie} from "@/utils/Cookies";

const  CLIENTES_URL = '/clientes';
const dataUser = getUserFromCookie();

export const getClientes = async () => {
    /*const dataUser = getUserFromCookie();*/
    try {
        const response = await http.get(CLIENTES_URL, {
            headers: {
                Authorization: `Bearer ${dataUser.token}`
            }
        })
        return response.data;
    }catch (error) {
        throw error;
    }
}

export const postCliente = async (data) => {
    try {
        const response = await http.post(`${CLIENTES_URL}/cadastro`, data, {
            headers: {
                Authorization: `Bearer ${dataUser.token}`
            }
        })
        return response.data;
    }catch (error) {
        throw error;
    }
}

export const getClienteId = async (id) => {
    try {
        const response = await http.get(`${CLIENTES_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${dataUser.token}`
            }
        })
        return response.data;
    }catch (error) {
        throw error;
    }
}