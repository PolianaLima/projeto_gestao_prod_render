import React, {useEffect, useState} from 'react';
import HeadSgme from "@/components/head/HeadSgme";
import {useForm} from "react-hook-form";
import Image from "next/image";
import {http} from "@/utils/http";
import {getUserFromCookie} from "@/utils/Cookies";
import axios from "axios";
import {useRouter} from "next/router";
import Link from "next/link";
import ToltipInfoCancelarRegistroVenda from "@/components/pdvs/ToltipInfoCancelarRegistroVenda";

function Checkout_id() {
    const router = useRouter();
    const {checkout_id} = router.query;

    const [loadingData, setLoadingData] = useState(true);
    const {
        register: registerItem,
        handleSubmit: handleSubmitItem,
        formState: {errors: errorsItem},
        setValue: setValueItem,
        reset: resetItem
    } = useForm();

    const {
        register: registerPagamento,
        handleSubmit: handleSubmitPagamento,
        formState: {errors: errorsPagamento},
    } = useForm();

    const [produtos, setProdutos] = useState([]);
    const [itensVenda, setItensVenda] = useState([]);
    const [totalVendas, setTotalVendas] = useState(0);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [error, setError] = useState("");
    const [errorTroco, setErrorTroco] = useState("");
    const [erroDesconto, setErroDesconto] = useState("");
    const [troco, setTroco] = useState(0);
    const [pagamento, setPagamento] = useState([{}])

    const [isAddItemButtonDisabled, setIsAddItemButtonDisabled] = useState(false);
    const [statusPagamento, setStatusPagamento] = useState(false);

    const [statusHidden, setStatusHidden] = useState(true);
    const [statusCarrinho, setStatusCarrinho] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataUser = getUserFromCookie();
                const response = await http.get('/produtos', {
                    headers: {
                        Authorization: `Bearer ${dataUser.token}`
                    }
                });
                setProdutos(response.data);
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    setError(error.response.data.message)
                }
            } finally {
                setLoadingData(false);
            }
        }
        fetchData();
    }, []);


    const handleProdutoSelecionado = (produto) => {
        setProdutoSelecionado(produto)
        setValueItem("quantidade", 1)
    }


    const adicionarItem = (item) => {
        if (item.descontoProduto === "") {
            item.descontoProduto = 0;
        }

        item.valorProduto = produtoSelecionado.preco;
        item.descontoProduto = parseFloat(item.descontoProduto.toString().replace(",", "."));
        item.quantidade = parseFloat(item.quantidade);
        item.total = (item.valorProduto * item.quantidade) - (item.descontoProduto * item.quantidade);
        item.nome = produtoSelecionado.nome;
        item.codigo = produtoSelecionado.codigo;

        if (item.valorProduto < item.descontoProduto) {
            setErroDesconto("Desconto não pode ser maior que o valor do produto")
        } else {
            addItensVenda(item);
            resetItem();
            setProdutoSelecionado(null)
            setErroDesconto("");
        }

    }

    const addItensVenda = (item) => {
        setItensVenda([...itensVenda, item])
        setStatusCarrinho(true)
    }

    useEffect(() => {
        let total = 0;
        itensVenda.forEach(item => {
            total += item.total;
        });
        setTotalVendas(total);
    }, [itensVenda]);


    const calcularTroco = (data) => {
        const valorRecebido = parseFloat(data.valorRecebido.toString().replace(",", "."));
        console.log("Data pagamento", data)
        if (data.forma_pagamento !== "DINHEIRO" && valorRecebido > totalVendas) {
            setErrorTroco("Forma de pagamento não aceita troco")

        } else if (valorRecebido < totalVendas) {
            setErrorTroco("Valor recebido menor que o total da venda")
        } else {
            setTroco(valorRecebido - totalVendas);
            setIsAddItemButtonDisabled(true);
            setStatusPagamento(true);
            setPagamento(data);
        }
    }

    const finalizarVenda = async () => {
        const dataUser = getUserFromCookie();
        const dataRegisterVenda = {
            vendaDto: {
                forma_pagamento: pagamento.forma_pagamento,
                checkout_id: checkout_id,
            },
            itensVendaDto: itensVenda.map(item => {
                return {
                    id_produto: item.idProduto,
                    quantidade: item.quantidade,
                    valor_produto: item.valorProduto,
                    desconto_produto: item.descontoProduto
                }

            })
        }

        try {
            await http.post('/vendas/novavenda', dataRegisterVenda, {
                headers: {
                    Authorization: `Bearer ${dataUser.token}`
                }
            });
            await router.push('/gestao-sgme/pdv')
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data.message)
            }
        }
    }

    const cancelarRegistroVenda =  () => {
        if(statusCarrinho) {
            setStatusHidden(false)
        }else{
            router.push("/gestao-sgme/pdv");
        }
    }

    return (
        <>
            <HeadSgme title="SGME - Registro de venda"/>
            <main className="container-sm d-flex flex-column justify-content-between">

                {loadingData ? (
                    <div className="d-flex justify-content-center align-items-center" style={{minHeight: '65vh'}}>
                        <div className="spinner-border text-danger">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="container-sm d-sm-flex justify-content-between">
                            <div className="w-50 d-sm-flex " style={{height: '73vh'}}>
                                <form className="w-100 p-3" onSubmit={handleSubmitItem(adicionarItem)}>
                                    <div className="d-flex flex-column w-100">
                                        <label htmlFor="codigo">Produto</label>
                                        <select className="form-control"
                                                defaultValue="0"
                                                {...registerItem("idProduto", {validate: (value) => (value !== "0")})}
                                                onChange={event => {
                                                    const selectedProduct = produtos.find(produto => produto.id === event.target.value);
                                                    handleProdutoSelecionado(selectedProduct)
                                                }}
                                        >
                                            <option value="0">Selecione um produto</option>
                                            {produtos.map((produto, index) => (
                                                <option key={index} value={produto.id}>{produto.nome}</option>
                                            ))}
                                        </select>
                                        {errorsItem?.idProduto?.type === "validate" && (
                                            <span className="text-danger fw-bold">Selecione um produto</span>
                                        )}
                                    </div>

                                    <div className="w-100 d-sm-flex ">
                                        <div className="d-sm-flex flex-column w-100 p-1">
                                            <label htmlFor="quantidade">Quantidade</label>
                                            <input type="number"
                                                   className="form-control"
                                                   {...registerItem("quantidade", {required: true})}
                                            />

                                        </div>
                                        <div className="d-sm-flex flex-column w-100 p-1">
                                            <label htmlFor="valorProduto">Valor Unitário</label>
                                            <input type="number"
                                                   value={produtoSelecionado ? produtoSelecionado.preco : 0}
                                                   readOnly={true}
                                                   className="form-control "
                                                   {...registerItem("valorProduto")}
                                            />

                                        </div>
                                        <div className="d-sm-flex flex-column w-100 p-1">
                                            <label htmlFor="descontoProduto">Desc. Item</label>
                                            <input type="text"
                                                   className="form-control"
                                                   {...registerItem("descontoProduto",)}
                                            />
                                        </div>

                                    </div>

                                    {errorsItem.quantidade &&
                                        <span className="text-danger fw-bold">Campo obrigatório</span>}

                                    {erroDesconto ? (
                                        <p className="text-danger fw-bold mt-3 p-2">{erroDesconto}</p>
                                    ) : ("")}

                                    <button className="btn btn-success w-100 p-2 mt-3 fs-4"
                                            type="submit"
                                            disabled={isAddItemButtonDisabled}
                                    > Adicionar item
                                    </button>
                                </form>
                            </div>
                            <div className="w-100 d-sm-flex">
                                {itensVenda.length > 0 ? (
                                    <div className="d-sm-flex flex-column justify-content-start  w-100"
                                         style={{height: '70vh'}}>

                                        <div
                                            className="d-sm-flex flex-column justify-content-start align-items-center w-100 mb-3 border border-1 p-3 rounded-1  overflow-scroll"
                                            style={{height: '100%'}}>
                                            <table className="table p-2  ">
                                                <thead>
                                                <tr>
                                                    <th scope="col">Codigo</th>
                                                    <th scope="col">Produto</th>
                                                    <th scope="col">Qtd.</th>
                                                    <th scope="col">Valor</th>
                                                    <th scope="col">Desconto</th>
                                                    <th scope="col">Total</th>
                                                    <th scope="col"></th>

                                                </tr>
                                                </thead>
                                                <tbody>
                                                {itensVenda.map((item, index) => (
                                                    <tr key={index} className="border-bottom ">
                                                        <td className="p-2">{item.codigo}</td>
                                                        <td>{item.nome}</td>
                                                        <td>{item.quantidade}</td>
                                                        <td>{item.valorProduto.toLocaleString('pt-br', {
                                                            style: 'currency',
                                                            currency: 'BRL'
                                                        })}</td>
                                                        <td>{item.descontoProduto.toLocaleString('pt-br', {
                                                            style: 'currency',
                                                            currency: 'BRL'
                                                        })}</td>
                                                        <td>{item.total.toLocaleString('pt-br', {
                                                            style: 'currency',
                                                            currency: 'BRL'
                                                        })}</td>
                                                        <td>
                                                            <button className="border-0"
                                                                    disabled={isAddItemButtonDisabled}
                                                                    onClick={() => {
                                                                        const itens = itensVenda.filter((_, i) => i !== index);
                                                                        setItensVenda(itens);

                                                                    }}>
                                                                <Image src="/img/buttonExcluir.png"
                                                                       alt="Button Excluir"
                                                                       width="0"
                                                                       height="0"
                                                                       sizes="100vw"
                                                                       style={{width: '50%', height: 'auto'}}

                                                                />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div
                                            className="w-100 d-flex justify-content-between bg-secondary align-items-center border border-1 p-2 rounded-1">
                                            <p className="text-white mt-1">SUBTOTAL</p>
                                            <p className="text-white">{totalVendas.toLocaleString('pt-br', {
                                                style: 'currency',
                                                currency: 'BRL'
                                            })}</p>

                                        </div>

                                        {statusPagamento ? (
                                            <div>
                                                {troco > 0 ? (
                                                    <div
                                                        className="d-flex flex-column align-items-center rounded-2 p-1 bg-danger mt-4">
                                                        <h2 className="text-white">TROCO: </h2>
                                                        <h2 className="text-white">{troco.toLocaleString('pt-br', {
                                                            style: 'currency',
                                                            currency: 'BRL'
                                                        })}</h2>
                                                    </div>
                                                ) : ("")}

                                                <button className="btn btn-success m-1 w-100 mt-3"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            finalizarVenda()
                                                        }}
                                                >
                                                    FINALIZAR VENDA
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="d-sm-flex justify-content-between w-100 mt-4">
                                                    <form className="d-sm-flex justify-content-between w-100"
                                                          onSubmit={handleSubmitPagamento(calcularTroco)}>
                                                        <div className="d-sm-flex flex-column w-100 p-2">
                                                            <label htmlFor="forma_pagamento">Forma de Pagamento</label>
                                                            <select className="form-control"
                                                                    defaultValue="0"
                                                                    {...registerPagamento("forma_pagamento", {validate: (value) => (value !== "0")})}
                                                            >
                                                                <option value="0">Selecione a forma de pagamento
                                                                </option>
                                                                <option value="DINHEIRO">Dinheiro</option>
                                                                <option value="CARTAO">Cartão</option>
                                                                <option value="PIX">Pix</option>
                                                            </select>

                                                        </div>

                                                        <div className="d-sm-flex flex-column w-100 p-2">
                                                            <label htmlFor="valorRecebido">Valor Recebido</label>
                                                            <input type="text"
                                                                   className="form-control"
                                                                   {...registerPagamento("valorRecebido",
                                                                       {required: true})}
                                                            />

                                                        </div>
                                                        <div
                                                            className="d-sm-flex flex-column w-100 p-2 justify-content-end">
                                                            <button className="btn btn-success mt-2" type="submit">
                                                                Adicionar pagamento
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>

                                                {errorsPagamento.valorRecebido &&
                                                    <span
                                                        className="text-danger">Informe uma valor recebido válido</span>}

                                                {errorsPagamento?.forma_pagamento?.type === "validate" && (
                                                    <p className="text-danger mt-3" role="alert">Selecione uma forma
                                                        de pagamento</p>)}

                                                {errorTroco ? (
                                                    <p className="text-danger fw-bold mt-3 p-2">{errorTroco}</p>
                                                ) : ("")}
                                            </>
                                        )}


                                    </div>
                                ) : (
                                    <div
                                        className="d-sm-flex flex-column justify-content-center align-items-center w-100 border border-1 mb-3">
                                        <p className="fs-5">Seu caixa está <b className="text-info">livre</b> no
                                            momento!</p>
                                        <Image src="/img/carrinho_compas.png"
                                               alt="Carrinho de compras"
                                               width="0"
                                               height="0"
                                               sizes="100vw"
                                               style={{width: '10%', height: 'auto'}}
                                               priority={true}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="d-sm-flex justify-content-end ">
                            <div>
                                <button className="btn btn-danger m-1"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            cancelarRegistroVenda()
                                        }}
                                >CANCELAR
                                </button>
                                {/* <Link href="/gestao-sgme/pdv" className="btn btn-danger m-1">CANCELAR</Link>*/}
                            </div>
                        </div>
                    </>
                )}
                <ToltipInfoCancelarRegistroVenda
                    setStatusHidden={setStatusHidden}
                    statusHidden={statusHidden}
                    setStatusCarrinho={setStatusCarrinho}
                    statusCarrinho={statusCarrinho}
                    tituloInfo="Atenção"
                    conteudoInfo="Deseja cancelar a venda?"
                />
            </main>
        </>
    );
}

export default Checkout_id;