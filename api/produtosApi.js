import {http} from "@/utils/http";
import {getUserFromCookie} from "@/utils/Cookies";

const  PRODUTOS_URL = '/produtos';
const dataUser = getUserFromCookie();

export const getProdutos = async () => {
    try {
        const response = await http.get(PRODUTOS_URL, {
            headers: {
                Authorization: `Bearer ${dataUser.token}`
            }
        })
        return response.data;
    }catch (error) {
        throw error;
    }
}