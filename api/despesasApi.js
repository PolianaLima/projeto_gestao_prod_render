import {http} from "@/utils/http";
import {getUserFromCookie} from "@/utils/Cookies";


const DESPESAS_URL = `/despesas`
const dataUser = getUserFromCookie();

export const postDespesa =async (data)=>{
    try {
        const response = await  http.post(`${DESPESAS_URL}/cadastro`,data,{
            headers:{
                Authorization: `Bearer ${dataUser.token}`
            }
        })
    }catch (error){
        throw error;
    }
}

export const putDespesa = async (id, data) => {
    try {
        const response = await http.put(`${DESPESAS_URL}/${id}`, data, {
            headers: {
                Authorization: `Bearer ${dataUser.token}`
            }
        })
        return response.data;
    }catch (error) {
        throw error;
    }

}

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

export const getDespesaId = async (id) => {
    try {
        const response = await http.get(`${DESPESAS_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${dataUser.token}`
            }
        })
        return response.data;
    }catch (error) {
        throw error;
    }

}

export const deleteDespesa = async (id) => {
    try {
        const response = await http.delete(`${DESPESAS_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${dataUser.token}`
            }
        })
        return response.data;
    }catch (error) {
        throw error;
    }
}
