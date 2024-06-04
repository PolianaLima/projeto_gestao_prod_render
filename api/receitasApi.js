import {getUserFromCookie} from "@/utils/Cookies";
import {http} from "@/utils/http";

const RECEITAS_URL = `/receitas`
const dataUser = getUserFromCookie();

export const postReceita =async (data)=>{
    try {
        const response = await  http.post(`${RECEITAS_URL}/cadastro`,data,{
            headers:{
                Authorization: `Bearer ${dataUser.token}`
            }
        })
    }catch (error){
        throw error;
    }

}

export const putReceita = async (id, data) => {
    try {
        const response = await http.put(`${RECEITAS_URL}/${id}`, data, {
            headers: {
                Authorization: `Bearer ${dataUser.token}`
            }
        })
        return response.data;
    }catch (error) {
        throw error;
    }

}

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

export const getReceitaId = async (id) => {
    try {
        const response = await http.get(`${RECEITAS_URL}/${id}`, {
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