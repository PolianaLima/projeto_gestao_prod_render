import {http} from "@/utils/http";
import {getUserFromCookie} from "@/utils/Cookies";

const  FORNECEDORES_URL = '/fornecedores';
const dataUser = getUserFromCookie();

export const getFornecedores = async () => {
    try {
        const response = await http.get(FORNECEDORES_URL, {
            headers: {
                Authorization: `Bearer ${dataUser.token}`
            }
        })
        return response.data;
    }catch (error) {
        throw error;
    }
}

export const getFornecedorId = async (id) => {
    try {
        const response = await http.get(`${FORNECEDORES_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${dataUser.token}`
            }
        })
        return response.data;
    }catch (error) {
        throw error;
    }

}

export const postFornecedores = async (data) => {
    try {
        const response = await http.post(`${FORNECEDORES_URL}/cadastro`, data, {
            headers: {
                Authorization: `Bearer ${dataUser.token}`
            }
        })
        return response.data;
    }catch (error) {
        throw error;
    }
}

export const putFornecedor = async (id, data) => {
    try {
        const response = await http.put(`${FORNECEDORES_URL}/${id}`, data, {
            headers: {
                Authorization: `Bearer ${dataUser.token}`
            }
        })
        return response.data;
    }catch (error) {
        throw error;
    }
}
