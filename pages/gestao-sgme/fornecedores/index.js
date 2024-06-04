'use client';
import React, {useEffect, useState} from 'react';
import HeadSgme from "@/components/head/HeadSgme";
import {getFornecedores} from "@/api/fornecedoresApi";
import {handleApiError} from "@/utils/errors/handleErroApi";
import MessageLoadingData from "@/components/message/messageLoadingData";
import DashBoardIndexProdClieForn from "@/components/layouts/DashBoardIndexProdClieForn";

const FORNECEDORES_URL = '/gestao-sgme/fornecedores';

function Index(props) {
    const [erroApiMessage, setErroApiMessage] = useState('');
    const [statusErroApi, setStatusErroApi] = useState(false);
    const [loading, setLoading] = useState(true);

    const [fornecedores, setFornecedores] = useState([]);

    const fetchData = async ()=>{
        try {
            const data = await getFornecedores();
            setFornecedores(data);
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
            <HeadSgme title="SGME - Fornecedores" />
            <main className="container mt-5">
                {loading ? (
                    <MessageLoadingData message="Carregando lista de fornecedores"/>
                ):(
                     <DashBoardIndexProdClieForn
                        dados={fornecedores}
                        url={`${FORNECEDORES_URL}/cadastro-fornecedor`}
                        urlDetalhes={`${FORNECEDORES_URL}/update`}
                        titleListagem="Fornecedores"
                        titleButtonAdd="Novo Fornecedor"
                        erroApiMessage={erroApiMessage}
                        statusErroApi={statusErroApi}
                     />
                        )}
            </main>
        </>
    );
}

export default Index;