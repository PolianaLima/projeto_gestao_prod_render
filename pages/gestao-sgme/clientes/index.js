import React, {useEffect, useState} from 'react';
import HeadSgme from "@/components/head/HeadSgme";
import CadastroLayout from "@/components/componentes_cadastro/shared/CadastroLayout";
import {getUserFromCookie} from "@/utils/Cookies";
import {http} from "@/utils/http";
import axios from "axios";

function Index() {
    const [erroApi, setErroApi] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [clientes, setClientes] = useState([]);

    const getClientes = async ()=>{
        const dataUser = getUserFromCookie();

        try {
            const response =await http.get(`/clientes`,{
                headers: {
                    Authorization: `Bearer ${dataUser.token}`
                }
            })
            setClientes(response.data);
            console.log("Clientes data",response.data)
        }catch (error) {
            if(axios.isAxiosError(error)){
                setErroApi(error.response.data.message);
            }
        }finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        getClientes();

    },[])



    console.log("Clientes", clientes);
    return (
        <>
            <HeadSgme title="SGME - Clientes"/>
            {loading ? (
                <p>Carregando</p>
            ):(
                <CadastroLayout>

                </CadastroLayout>
            )}
        </>
    )
}

export default Index;