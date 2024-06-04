import React, {useEffect, useState} from 'react';
import HeadSgme from "@/components/head/HeadSgme";
import Link from "next/link";
import Image from "next/image";
import {handleApiError} from "@/utils/errors/handleErroApi";
import {useFormListFinanceiro} from "@/utils/hooks/useFormListFinanceiro";
import MessageLoadingData from "@/components/message/messageLoadingData";
import {getCheckout} from "@/api/checkoutApi";
import {getVendasCheckout} from "@/api/vendasApi";

const ROUTE_PATH = "/gestao-sgme/pdv";

function Index() {

    const {
        loading,
        setLoading,
        loadingApi,
        setLoadingApi,
        erroApiMessage,
        setErroApiMessage,
        statusErroApi,
        setStatusErroApi,
        statusVisibleModal,
        setStatusVisibleModal,
        handleSubmit,
        register,
        filtrarDados,
        setdataFiltro,
        isButtonDisabled,
        setIsButtonDisabled

    } = useFormListFinanceiro()

    const [loadingData, setLoadingData] = useState(true);
    const [vendas, setVendas] = useState([]);
    const [vendasFiltradas, setVendasFiltradas] = useState([]);
    const [checkout, setCheckout] = useState({});

    const [isCheckout, setIsCheckout] = useState(false);


    useEffect(() => {
        const checkout = async () => {
            setLoading(true)
            try {
                const checkooutData = await getCheckout();
                setCheckout(checkooutData);
                setIsCheckout(true);

                let vendasData = await getVendasCheckout(checkooutData.id);
                const vendasFiltradas = vendasData.filter(venda => {
                    if (venda.status === "") {
                        return venda;
                    }
                    return venda.status === venda.status;
                });
                setVendas(vendasFiltradas);
            } catch (error) {
                handleApiError(error, setErroApiMessage, setStatusErroApi);
            } finally {
                setLoading(false)
            }
        }
        checkout();
    }, [setErroApiMessage, setLoading, setStatusErroApi]);


    const totalVendas = {
        total: vendas.reduce((acc, venda) => acc + venda.valor_total, 0),
        totalPix: vendas.reduce((acc, venda) => acc + (venda.forma_pagamento === "PIX" ? venda.valor_total : 0), 0),
        totalDinheiro: vendas.reduce((acc, venda) => acc + (venda.forma_pagamento === "DINHEIRO" ? venda.valor_total : 0), 0),
        totalCartao: vendas.reduce((acc, venda) => acc + (venda.forma_pagamento === "CARTAO" ? venda.valor_total : 0), 0),
        totalBoleto: vendas.reduce((acc, venda) => acc + (venda.forma_pagamento === "BOLETO" ? venda.valor_total : 0), 0),
        totalTransacoes: vendas.length
    };

    console.log(totalVendas)

    return (
        <>
            <HeadSgme title="SGME - PDV"/>


            {loading ? (
                <MessageLoadingData message="Carregando dados, por favor aguarde"/>
            ) : (
                <>
                    {isCheckout === false ? (
                        <main className="mt-3 d-flex h-100">
                            <div className="w-100 d-flex align-items-center justify-content-center">

                                <Image src="/assets/img/icone_pdv.svg" alt="Pdv"
                                       width="0"
                                       height="0"
                                       sizes="100vw"
                                       style={{width: '80%', height: 'auto'}}
                                       priority={true}
                                />
                            </div>
                            <div className="d-sm-flex flex-column justify-content-center align-items-center w-100">
                                <h1 className="fw-medium  d-sm-flex text-center p-3">Olá bem vindo(a),</h1>
                                <p className="fs-5 mb-0">
                                    Para comecar suas vendas
                                </p>
                                <p>faça abertura do seu caixa e boas vendas!!</p>
                                <Link href="/gestao-sgme/fluxo-caixa/novo-caixa" className="btn btn-success">
                                    ABRIR CAIXA
                                </Link>
                            </div>

                        </main>
                    ) : (
                        <main className="mt-5 h-100 d-sm-flex">
                            <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                                <h1>CAIXA LIVRE</h1>
                                <Link href={`${ROUTE_PATH}/venda/${checkout.id}`}
                                      className="btn btn-success p-3 ">
                                     NOVA VENDA
                                </Link>
                            </div>
                            <div className="w-100 d-flex justify-content-center">
                                <Image src="/assets/img/icone_func_pdv.svg"
                                       alt="Cadastro de Cliente"
                                       width="0"
                                       height="0"
                                       priority={true}
                                       sizes="100vw"
                                       style={{width: "90%", height: "auto"}}/>
                            </div>
                        </main>
                    )}
                </>
            )}
        </>
    );
}

export default Index;
