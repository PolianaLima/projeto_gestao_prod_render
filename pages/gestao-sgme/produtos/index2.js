import React, {useEffect, useState} from 'react';
import HeadSgme from "@/components/head/HeadSgme";
import {getProdutos} from "@/api/produtosApi";
import {handleApiError} from "@/utils/errors/handleErroApi";
import MessageLoadingData from "@/components/message/messageLoadingData";
import DashBoardIndexProdClieForn from "@/components/layouts/DashBoardIndexProdClieForn";

const PRODUTOS_URL = '/gestao-sgme/produtos';

function Index(props) {
    const [erroApiMessage, setErroApiMessage] = useState('');
    const [statusErroApi, setStatusErroApi] = useState(false);
    const [loading, setLoading] = useState(true);
    const [produtos, setProdutos] = useState([]);

    const fetchData = async ()=>{
        try {
            const data = await getProdutos();
            setProdutos(data);
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
            <HeadSgme title="SGME - Produtos"/>
            {loading ? (
                <MessageLoadingData message="Carregando lista de produtos" />
            ): (
                <main className="container mt-5">
                    <DashBoardIndexProdClieForn dados={produtos}
                                 statusErroApi={statusErroApi}
                                 erroApiMessage={erroApiMessage}
                                 url={`${PRODUTOS_URL}/cadastro`}
                                 titleListagem="Produtos"
                                 titleButtonAdd="Novo Produto"
                                 urlDetalhes={`${PRODUTOS_URL}/update`}
                    />
                </main>

            )}
        </>
    );
}

export default Index;