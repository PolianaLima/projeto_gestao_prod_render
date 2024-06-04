import React, {useEffect, useState} from 'react';
import HeadSgme from "@/components/head/HeadSgme";
import {getClientes} from "@/api/clienteApi";
import MessageLoadingData from "@/components/message/messageLoadingData";
import {handleApiError} from "@/utils/errors/handleErroApi";
import DashBoardIndexProdClieForn from "@/components/layouts/DashBoardIndexProdClieForn";

const CLIENTES_URL = '/gestao-sgme/clientes';

function Index() {
    const [erroApiMessage, setErroApiMessage] = useState('');
    const [statusErroApi, setStatusErroApi] = useState(false);
    const [loading, setLoading] = useState(true);
    const [clientes, setClientes] = useState([]);

    const fetchData = async ()=>{
        try {
            const data = await getClientes();
            setClientes(data);
        }catch (error){
            handleApiError(error, setErroApiMessage, setStatusErroApi)
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <HeadSgme title="SGME - Clientes"/>
            {loading ? (
               <MessageLoadingData message="Carregando lista de clientes" />
            ) : (
                <main className="container mt-5">
                    <DashBoardIndexProdClieForn
                        dados={clientes}
                        url={`${CLIENTES_URL}/cadastro-cliente`}
                        titleListagem="Clientes"
                        titleButtonAdd="Novo Cliente"
                        erroApiMessage={erroApiMessage}
                        statusErroApi={statusErroApi}
                        urlDetalhes={`${CLIENTES_URL}/update`}
                    />
                </main>
            )}
        </>
    )
}

export default Index;