import React from 'react';
import Link from "next/link";
import {format, parseISO} from "date-fns";
import {ptBR} from "date-fns/locale";

function FinanceiroIndexLayout({
                                   dados,
                                   urlDetalhes,
                                   erroApiMessage,
                                   statusErroApi,
                                   setdataFiltro,
                                   valorTotal,
                                   handleSubmit,
                                   register,
                                   title,
                                   titleButtonAdd,
                                   urlExcluir
                               }) {
    return (
        <>
            <div className="d-sm-flex justify-content-between align-items-center">
                <div>
                    <h1>{title}</h1>
                    <p className="text-secondary fw-light">Acompanhe de perto como estar as suas finanças!! </p>
                </div>
                <div>
                    <Link href="/gestao-sgme/financeiro/contas-a-pagar/cadastro" className="btn btn-success">
                        {titleButtonAdd}
                    </Link>
                </div>
            </div>

            <div className="border border-1 rounded-2 ">
                <div className="bg-primary p-2 d-flex flex-row rounded-top-2">
                    <i className="h5 bi bi-gear text-white"> <span className="text-white"> Opções</span> </i>
                </div>

                <form className="mt-3 d-sm-flex mb-3 p-3">
                    <input className="border border-1 border-secondary-subtle w-100 p-2 m-1"
                           type="date"
                           {...register('dataFiltroInicio')}

                    />
                    <input className="border border-1 border-secondary-subtle w-100 p-2 m-1"
                           type="date"
                           {...register('dataFiltroFim')}
                    />
                    <select className="border border-1 border-secondary-subtle w-100 p-2 m-1"
                            {...register('statusFiltro')}
                    >
                        <option value="">Todos</option>
                        <option value="PENDENTE">Pendente</option>
                        <option value="PAGA">Paga</option>
                    </select>
                    <button className="btn btn-success m-1 ps-5 pe-5 d-flex"
                            onClick={handleSubmit((data) => setdataFiltro(data))}
                    >
                        <i className="bi bi-funnel-fill text-white me-2"> </i>
                        Filtrar
                    </button>
                    <button className="btn btn-secondary m-1 ps-5 pe-5 d-flex">
                        <i className="bi bi-arrow-up-right-square-fill text-white me-3"> </i>
                        Exportar
                    </button>
                </form>
            </div>

            <div className="border border-1 mt-3 rounded-2 shadow ">
                <table className="table table-borderless m-2">
                    <thead>
                    <tr className="border-bottom border-bottom-2">
                        <th scope="col" style={{minWidth: 100}}>Codigo</th>
                        <th scope="col" className="w-100">Fornecedor</th>
                        <th scope="col" style={{minWidth: 100}}>Valor</th>
                        <th scope="col" style={{minWidth: 100}}>Vencimento</th>
                        <th scope="col" style={{minWidth: 100}}>Status</th>
                        <th scope="col" style={{minWidth: 100}}>Detalhar</th>
                        <th scope="col" style={{minWidth: 100}}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {dados && dados.length > 0 ? (
                        dados.map((dado, index) =>
                            <tr key={index}>
                                <td style={{minWidth: 100}}>{index + 1}</td>
                                <td className="w-100">{dado.nome}</td>
                                <td style={{minWidth: 100}}>{dado.valor.toLocaleString('pt-br', {
                                    style: 'currency',
                                    currency: 'BRL'
                                })}</td>
                                <td style={{minWidth: 100}}>{format(parseISO(dado.data_vencimento), 'dd/MM/yyyy', {locale: ptBR})}</td>
                                <td style={{minWidth: 100}}>{dado.status.toLowerCase()}</td>
                                <td className="d-flex justify-content-center align-items-center"
                                    style={{minWidth: 100}}>
                                    <Link href={`${urlDetalhes}/${dado.id}`}
                                          className="btn btn-success">
                                        <i className="bi bi-search text-white"></i>
                                    </Link>
                                </td>

                                <td>
                                    <Link href={`${urlExcluir}/${dado.id}`} className="btn btn-danger"
                                    >
                                        <i className="bi bi-trash text-white"></i>
                                    </Link>
                                </td>

                            </tr>
                        )) : (
                        <tr>
                            {statusErroApi ? (
                                <td colSpan="5" className="text-center text-danger">{erroApiMessage}</td>
                            ) : (
                                <td colSpan="5" className="text-center">Nenhuma despesa cadastrada</td>
                            )}
                        </tr>
                    )}
                    </tbody>

                </table>
                <div className="d-flex justify-content-between align-items-center bg-secondary-subtle">
                    <p className="fw-bolder mt-3 ps-3">
                        Valor Total
                    </p>
                    <p className="fw-bolder mt-3 ps-3">
                        {valorTotal.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}
                    </p>
                </div>
            </div>
        </>
    );
}

export default FinanceiroIndexLayout;