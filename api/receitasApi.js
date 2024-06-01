import {getUserFromCookie} from "@/utils/Cookies";
import {http} from "@/utils/http";

const RECEITAS_URL = `/receitas`
const dataUser = getUserFromCookie();

export const getReceitas = async () => {
    try {
        const response = await http.get(RECEITAS_URL, {
            headers: {
                Authorization: `Bearer ${dataUser.token}`
            }
        })
        return response.data;
    }catch (error) {
        throw error;
    }
}

export const deleteReceita = async (id) => {
    try {
        const response = await http.delete(`${RECEITAS_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${dataUser.token}`
            }
        })
        return response.data;
    }catch (error) {
        throw error;
    }
}