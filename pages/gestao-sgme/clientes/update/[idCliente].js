import HeadSgme from "@/components/head/HeadSgme";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {getClienteId} from "@/api/clienteApi";
import axios from "axios";
import MessageErrorApi from "@/components/Errors/messageErrorApi";
import MessageLoadingData from "@/components/message/messageLoadingData";

function UpdateCliente() {
    const router = useRouter();
    const [loadingData, setLoadingData] = useState(true);
    const {idCliente} = router.query;
    const [cliente, setCliente] = useState({});
    const [erroApiMessage, setErroApiMessage] = useState(false);
    const [statusErroApi, setStatusErroApi] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getClienteId(idCliente);
                setCliente(data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        setErroApiMessage(error.response.data.message);
                        setStatusErroApi(true)
                    } else {
                        setErroApiMessage(error.message);
                        setStatusErroApi(true);
                    }
                }
            } finally {
                setLoadingData(false);
            }
        }
        fetchData();
    }, [idCliente]);
    return (
        <>
            <HeadSgme title="SGME - Cliente"/>

            {loadingData ? (
                <MessageLoadingData message="Carregando dados do cliente"/>
            ) : (
                <main className="container mt-5">

                </main>
            )}
        </>
    )
}

export default UpdateCliente;