import {http} from "@/utils/http";
import {getUserFromCookie} from "@/utils/Cookies";

const PRODUTOS_URL = '/produtos';
const dataUser = getUserFromCookie();

export const getProdutos = async () => {
    try {
        const response = await http.get(PRODUTOS_URL, {
            headers: {
                Authorization: `Bearer ${dataUser.token}`
            }
        })
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getProdutoId = async (id) => {
    try {
        const response = await http.get(`${PRODUTOS_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${dataUser.token}`
            }
        })
        return response.data;
    } catch (error) {
        throw error;
    }

}

export const postProduto = async (data) => {
    try {
        const response = await http.post(`${PRODUTOS_URL}/cadastro`, data, {
            headers: {
                Authorization: `Bearer ${dataUser.token}`
            }
        })
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const putProduto = async (id, data) => {
    try {
        const response = await http.put(`${PRODUTOS_URL}/${id}`, data, {
            headers: {
                Authorization: `Bearer ${dataUser.token}`
            }
        })
        return response.data;
    } catch (error) {
        throw error;
    }
}