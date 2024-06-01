import React, {useEffect, useState} from 'react';
import HeadSgme from "@/components/head/HeadSgme";
import Link from "next/link";
import {useForm} from "react-hook-form";
import {http} from "@/utils/http";
import {getUserFromCookie} from "@/utils/Cookies";
import Image from "next/image";
import axios from "axios";
import ListaVenda from "@/components/pdvs/ListaVenda";

function Index() {

    const [loadingData, setLoadingData] = useState(true);
    const [vendas, setVendas] = useState([]);
    const [vendasFiltradas, setVendasFiltradas] = useState([]);
    const [isCheckout, setIsCheckout] = useState(false);
    const [checkout_id, setCheckout_id] = useState([{}])

    const [error, setError] = useState("");

    useEffect(() => {
        const verificaCheckout = async () => {
            const dataUser = getUserFromCookie();
            try {
                const response = await http.get('/ckeckouts/isCheckoutOpen', {
                    headers: {
                        Authorization: `Bearer ${dataUser.token}`
                    }
                })
                setIsCheckout(response.data)
                if (response.data === false) {
                    setLoadingData(false)
                }
            } catch (error) {
                setError(error.response.data.message)
            }
        }
        verificaCheckout();

    }, []);

    //Buscar o checkout Aberto
    useEffect(() => {
        if (isCheckout === true) {
            setLoadingData(true)
            getDataCheckout();
        }
    }, [isCheckout]);


    const getDataCheckout = async () => {
        try {
            const dataUser = getUserFromCookie();
            const response = await http.get('/ckeckouts', {
                headers: {
                    Authorization: `Bearer ${dataUser.token}`
                }
            })
            setCheckout_id(response.data.id)
            getDataVendas(response.data.id);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data.message)
            } else {
                setError("Servidor indisponível, tente novamente mais tarde!", error.message)
            }
        }
    };

    //Buscar as vendas de um pdv
    const getDataVendas = async (idCheckout) => {
        try {
            const dataUser = getUserFromCookie();
            const response = await http.get(`/vendas/checkout/${idCheckout}`, {
                headers: {
                    "Authorization": `Bearer ${dataUser.token}`
                }
            });
            setVendas(response.data);
            setVendasFiltradas(response.data)
        } catch (error) {
            console.log("Carregando")
        } finally {
            setLoadingData(false);
        }
    }

    const filtrarDados = (data) => {
        const vendasFiltradas = vendas.filter(venda => {
            if (data.status === "") {
                return venda;
            }
            return venda.status === data.status;
        });
        setVendasFiltradas(vendasFiltradas);
    };

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();


    return (
        <>
            <HeadSgme title="SGME - PDV"/>
            <main className="container-sm">

                {loadingData ? (
                    <div className="d-flex justify-content-center align-items-center" style={{minHeight: '65vh'}}>
                        <div className="spinner-border text-danger"  >
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        {isCheckout === false ? (
                            <div className="container d-sm-flex flex-row justify-content-center  align-items-center">
                                <div className="w-100 d-flex align-items-center justify-content-center">

                                    <Image src="/img/icone_nova_venda.png" alt="Pdv"
                                           width="0"
                                           height="0"
                                           sizes="100vw"
                                           style={{width: '40%', height: 'auto'}}
                                           priority={true}
                                    />
                                </div>
                                <div className="d-sm-flex flex-column justify-content-center align-items-center w-100">
                                    <h1 className="fw-medium  d-sm-flex text-center p-3">Olá bem vindo(a),</h1>
                                    <p>
                                        Para comecar suas vendas faça abertura do seu caixa e boas vendas!!
                                    </p>
                                    <Link href="/gestao-sgme/fluxo-caixa/novo-caixa" className="btn btn-success">
                                        ABRIR CAIXA
                                    </Link>
                                </div>

                            </div>
                        ) : (
                            <>
                                <h1 className="mb-3">PDV</h1>
                                <div className="d-sm-flex justify-content-between align-items-center">
                                    <Link href={`/gestao-sgme/pdv/venda/${checkout_id}`} className="btn btn-success">Nova
                                        Venda</Link>
                                    <div>
                                        <form className="d-sm-flex flex-row justify-content-between mb-3">
                                            <div className="form-group me-3">
                                                <label className="form-label mb-0">Status</label>
                                                <select className="form-select"
                                                        defaultValue={1}
                                                        {...register("status")}
                                                >
                                                    <option value="">Todos</option>
                                                    <option value="CANCELADA">Cancelada</option>
                                                    <option value="PENDENTE">Pendente</option>
                                                    <option value="FINALIZADA">Finalizada</option>
                                                </select>
                                            </div>

                                            <div className="align-content-end ">
                                                <button className="btn btn-success" onClick={event => {
                                                    event.preventDefault()
                                                    handleSubmit(filtrarDados)()
                                                }}>Filtrar
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div className="container-sm">
                                    {vendas.length > 0 ? (

                                        <table className="table table-borderless overflow-x-scroll mb-5">
                                            <thead className="">
                                            <tr>
                                                <th scope="col">Data</th>
                                                <th scope="col">Valor</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Ações</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {vendasFiltradas && vendasFiltradas.length > 0 ? (
                                                vendasFiltradas.map(venda => (
                                                    <ListaVenda key={venda.id} venda={venda}/>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="text-center">Nenhuma venda encontrada
                                                    </td>
                                                </tr>
                                            )}
                                            </tbody>
                                        </table>


                                    ) : (
                                        <div
                                            className="container d-flex flex-column justify-content-center align-items-center">
                                            <Image src="/img/pdv-venda.png"
                                                   alt="Pdv venda"
                                                   width="0"
                                                   height="0"
                                                   sizes="100vw"
                                                   style={{width: '30%', height: 'auto'}}
                                                   priority={true}
                                            />
                                            <p>Nenhuma venda resgistrada</p>
                                        </div>
                                    )}
                                </div>

                            </>

                        )}
                    </>
                )}


            </main>
        </>
    );
}

export default Index;
