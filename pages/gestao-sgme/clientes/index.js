import React, {useEffect, useState} from 'react';
import {http} from "@/utils/http";
import {getUserFromCookie} from "@/utils/Cookies";
import HeadSgme from "@/components/head/HeadSgme";
import Image from "next/image";
import ComponentCadastroCliente from "@/components/componentes_cadastro/ComponentCadastroCliente";
import ComponentEditarCliente from "@/components/componentes_cadastro/ComponentEditarCliente";
import ToltipInfoAlterarFuncao from "@/components/componentes_cadastro/ToltipInfoAlterarFuncao";
import ToltipInfoCancelar from "@/components/componentes_cadastro/ToltipInfoCancelar";

function Index() {
    const [clientes, setClientes] = useState([]);
    const [statusForm, setStatusForm] = useState(false);
    const [statusNovoCliente, setStatusNovoCliente] = useState(false);
    const [statusHidden, setStatusHidden] = useState(true);
    const [statusHiddenInfo, setStatusHiddenInfo] = useState(true);
    const [clienteEditando, setClienteEditando] = useState({
        nome: "",
        documento: "",
        data_nascimento: "",
        telefone: "",
        status: ""
    });

    const [selectedCliente, setSelectedCliente] = useState({
        id: "",
        nome: "",
        documento: "",
        data_nascimento: "",
        telefone: "",
        status: ""
    });
    const [loadingData, setLoadingData] = useState(true);

    const cadastrarCliente = () => {
        if (statusForm === true && statusNovoCliente === false) {
            setStatusHidden(false)
        } else {
            setStatusForm(true);
            setStatusNovoCliente(true);
        }
    }

    const detalharCliente = (cliente) => {
        setSelectedCliente(cliente);
        if (statusForm === true && statusNovoCliente === true) {
            setStatusHidden(false)
        } else {
            setStatusForm(true);
        }
    }

    const listarClientes = async () => {
        const dataUser = getUserFromCookie();
        try {
            const response = await http.get(`/clientes`, {
                headers: {
                    Authorization: `Bearer ${dataUser.token}`
                }
            });
            setClientes(response.data);
        } catch (error) {
            console.log(error.response.data)
        } finally {
            setLoadingData(false);
        }
    }

    useEffect(() => {
        listarClientes().then(r => r);
    }, []);


    return (

        <>
            <HeadSgme title="SGME - Clientes"/>
            {loadingData ? (
                <div className="container d-flex justify-content-center align-items-center">
                    <div className="container spinner-border text-primary text-center " style={{
                        width: '4rem',
                        height: '4rem'
                    }}>
                        <div className="visually-hidden">Loading...</div>
                    </div>
                </div>


            ) : (
                <main className="container-sm mb-5" style={{height: '75vh'}}>
                    <div className="d-flex justify-content-between" style={{height: '100%'}}>
                        <div className="w-100 p-2 " style={{height: '100%'}}>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h1 className="mb-3">Clientes</h1>
                                <button className="btn btn-warning btn-lg"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            cadastrarCliente();
                                        }}
                                >Novo Cliente
                                </button>
                            </div>

                            <div className="border p-2 rounded-2 shadow "
                                 style={{height: '90%'}}>
                                <div className="table" style={{height: '100%'}}>
                                    <div>
                                        <div className="d-flex justify-content-between border-bottom border-1">
                                            <div style={{width: 70}}>Cod.</div>
                                            <div className="w-100">Nome</div>
                                            <div style={{minWidth: 80}}>Status</div>
                                            <div style={{minWidth: 70}}>Detalhes</div>
                                        </div>
                                    </div>
                                    <div className="overflow-auto" style={{height: '90%'}}>
                                        {clientes && clientes.length > 0 ? (
                                            clientes.map((cliente, index) =>
                                                <div key={cliente.id} className="d-flex justify-content-between ">
                                                    <div style={{width: 70}}>{index + 1}</div>
                                                    <div className="w-100">{cliente.nome}</div>
                                                    <div style={{minWidth: 80}}>{(cliente.status).toLowerCase()}</div>
                                                    <div style={{minWidth: 60}}>
                                                        <button className="border-0" onClick={(event) => {
                                                            event.preventDefault();
                                                            detalharCliente(cliente);
                                                        }}>
                                                            <Image src="/img/verDetalhes.png"
                                                                   alt="Icon editar"
                                                                   width="0"
                                                                   height="0"
                                                                   sizes="100vw"
                                                                   style={{
                                                                       width: 20,
                                                                       height: 20,
                                                                       cursor: 'pointer'
                                                                   }}
                                                            />
                                                        </button>
                                                    </div>

                                                </div>
                                            )) : (
                                            <div>
                                                <p colSpan="3">Nenhum cliente encontrado.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*FORM PARA EDIÇÃO E CADASTRO DE NOVOS CLIENTES*/}

                        <div className="w-100 p-2 d-flex flex-column justify-content-center align-items-center">
                            {statusForm ? (
                                <>
                                    {statusNovoCliente ? (
                                        <ComponentCadastroCliente setStatusForm={setStatusForm}
                                                                  setStatusNovoCliente={setStatusNovoCliente}
                                                                  statusNovoCliente={statusNovoCliente}
                                                                  atualizarClientes={listarClientes}
                                        />
                                    ) : (
                                        <ComponentEditarCliente setStatusForm={setStatusForm}
                                                                setStatusNovoCliente={setStatusNovoCliente}
                                                                cliente={selectedCliente}
                                                                setCliente={setSelectedCliente}
                                                                atualizarClientes={listarClientes}

                                        />
                                    )
                                    }
                                    <ToltipInfoAlterarFuncao
                                        statusHidden={statusHidden}
                                        setStatusHidden={setStatusHidden}
                                        setStatusComponent={setStatusNovoCliente}
                                        statusComponent={statusNovoCliente}
                                        tituloInfo="Atenção"
                                        conteudoInfo="Deseja descartar as alterações?"
                                    />

                                </>
                            ) : (
                                <>
                                    <Image src="/img/icone_nova_venda.png"
                                           alt="Icon Excluir"
                                           width="0"
                                           height="0"
                                           sizes="100vw"
                                           style={{
                                               width: "50%",
                                               height: "auto",
                                           }}
                                           priority={true}
                                    />
                                    <h3>Selecione um cliente para editar</h3>
                                    <h4>ou Crie um novo </h4>
                                    <h5>Consulte os dos dos clientes ao lado</h5>
                                </>
                            )}

                        </div>
                    </div>
                </main>
            )}
        </>

    );
}

export default Index;