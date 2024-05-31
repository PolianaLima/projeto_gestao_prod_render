import React, {useEffect, useState} from 'react';
import HeadSgme from "@/components/head/HeadSgme";
import Link from "next/link";
import {getClientes} from "@/api/clienteApi";
import MessageLoadingData from "@/utils/message/messageLoadingData";
import {handleApiError} from "@/utils/errors/handleErroApi";

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
                    <div className="d-flex justify-content-between">
                        <h3>Clientes</h3>
                        <Link href="/gestao-sgme/clientes/cadastro" className="btn btn-primary">
                            <i className="bi bi-person-add fs-5 pe-2 text-white"></i>
                            Novo Cliente</Link>
                    </div>
                    <div className="mt-3" >
                        <table className="table table-borderless">
                            <thead>
                            <tr className="border-bottom shadow">
                                <th scope="col" style={{minWidth: 100}}>Codigo</th>
                                <th scope="col" className="w-100">Nome</th>
                                <th scope="col" className="w-100">Status</th>
                                <th scope="col" style={{minWidth: 100}}>Detalhar</th>
                            </tr>
                            </thead>
                            <tbody >
                            {clientes && clientes.length > 0 ? (
                                clientes.map((cliente, index) =>
                                    <tr key={index}>
                                        <td style={{minWidth: 100}}>{index+1}</td>
                                        <td className="w-100">{cliente.nome}</td>
                                        <td className="w-100">{cliente.status.toLowerCase()}</td>
                                        <td className="d-flex justify-content-center align-items-center" style={{minWidth: 100}}>
                                            <Link href={`/gestao-sgme/clientes/update/${cliente.id}`} className="btn btn-success">
                                                <i className="bi bi-search text-white"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            ) : (
                                <tr>
                                    {statusErroApi?(
                                        <td colSpan="3" className="text-center text-danger">{erroApiMessage}</td>
                                    ) : (
                                        <td colSpan="3" className="text-center">Nenhum cliente cadastrado</td>
                                    )}
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </main>
            )}
        </>
    )
}

export default Index;