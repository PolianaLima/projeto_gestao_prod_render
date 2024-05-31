import {http} from "@/utils/http";
import {getUserFromCookie} from "@/utils/Cookies";

const  FORNECEDORES_URL = '/clientes';
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
