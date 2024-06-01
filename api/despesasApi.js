import {http} from "@/utils/http";
import {getUserFromCookie} from "@/utils/Cookies";


const DESPESAS_URL = `/despesas`
const dataUser = getUserFromCookie();

export const getDespesas = async () => {
    try {
        const response = await http.get(DESPESAS_URL, {
            headers: {
                Authorization: `Bearer ${dataUser.token}`
            }
        })
        return response.data;
    }catch (error) {
        throw error;
    }
}
