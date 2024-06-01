import React, {useEffect, useState} from 'react';
import HeadSgme from "@/components/head/HeadSgme";
import {handleApiError} from "@/utils/errors/handleErroApi";
import {getDespesas} from "@/api/despesasApi";
import Link from "next/link";
import {format, parseISO} from "date-fns";
import {ptBR} from "date-fns/locale";
import {useForm} from "react-hook-form";
import MessageLoadingData from "@/components/message/messageLoadingData";
import LayoutFinanceiroIndex from "@/components/listagem_dados/LayoutFinanceiroIndex";

function Index(props) {

    const [erroApiMessage, setErroApiMessage] = useState('');
    const [statusErroApi, setStatusErroApi] = useState(false);
    const [despesas, setDespesas] = useState([])
    const [loading, setLoading] = useState(false)
    const [dataFiltro, setdataFiltro] = useState({
        dataInicial: "",
        dataFinal: "",
        status: ""
    });
    const [totalDespesas, setTotalDespesas] = useState(0.00)

    const {register, handleSubmit} = useForm()

    const fetchData = async () => {
        setLoading(true)
        try {
            let data = await getDespesas();

            // Aplica os filtros se existirem
            if (dataFiltro) {
                const {dataFiltroInicio, dataFiltroFim, statusFiltro} = dataFiltro;

                data = data.filter(despesa => {
                    // Lógica de filtro para dataFiltroInicio
                    if (dataFiltroInicio && new Date(despesa.data_vencimento) < new Date(dataFiltroInicio)) {
                        return false;
                    }

                    // Lógica de filtro para dataFiltroFim
                    if (dataFiltroFim && new Date(despesa.data_vencimento) > new Date(dataFiltroFim)) {
                        return false;
                    }

                    // Lógica de filtro para statusFiltro
                    if (statusFiltro && despesa.status !== statusFiltro) {
                        return false;
                    }

                    return true; // Retorna true se a despesa passar por todos os filtros
                });
            }

            setDespesas(data)
            const total = data.reduce((sum, despesa) => sum + despesa.valor, 0);
            setTotalDespesas(total);

        } catch (error) {
            handleApiError(error, setErroApiMessage, setStatusErroApi)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [dataFiltro])

    console.log(despesas)

    console.log(dataFiltro)

    return (
        <>
            <HeadSgme title="SGME - Contas a pagar"/>
            {loading ? (
                <MessageLoadingData message="Carregando os dados" />
            ): (
                <main className="m-2 mt-5">

                    <LayoutFinanceiroIndex
                        handleSubmit={handleSubmit}
                        register={register}
                        despesas={despesas}
                        setdataFiltro={setdataFiltro}
                        totalDespesas={totalDespesas}
                        statusErroApi={statusErroApi}
                        erroApiMessage={erroApiMessage}
                    />

                   {/* <div className="d-sm-flex justify-content-between align-items-center">
                        <div>
                            <h1>Contas a pagar</h1>
                            <p className="text-secondary fw-light">Acompanhe de perto como estar as suas finanças!! </p>
                        </div>
                        <div>
                            <Link href="/gestao-sgme/financeiro/contas-a-pagar/cadastro" className="btn btn-success">
                                Nova despesa
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
                            </tr>
                            </thead>
                            <tbody>
                            {despesas && despesas.length > 0 ? (
                                despesas.map((despesa, index) =>
                                    <tr key={index}>
                                        <td style={{minWidth: 100}}>{index + 1}</td>
                                        <td className="w-100">{despesa.nome_fornecedor}</td>
                                        <td style={{minWidth: 100}}>{despesa.valor.toLocaleString('pt-br', {
                                            style: 'currency',
                                            currency: 'BRL'
                                        })}</td>
                                        <td style={{minWidth: 100}}>{format(parseISO(despesa.data_vencimento), 'dd/MM/yyyy', {locale: ptBR})}</td>
                                        <td style={{minWidth: 100}}>{despesa.status.toLowerCase()}</td>
                                        <td className="d-flex justify-content-center align-items-center"
                                            style={{minWidth: 100}}>
                                            <Link href={`/gestao-sgme/financeiro/contas-a-pagar/update/${despesa.id}`}
                                                  className="btn btn-success">
                                                <i className="bi bi-search text-white"></i>
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
                                Total de despesas
                            </p>
                            <p className="fw-bolder mt-3 ps-3">
                                {totalDespesas.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}
                            </p>
                        </div>
                    </div>*/}


                </main>
            )}

        </>

    );
}

export default Index;