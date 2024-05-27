import React, {useState} from 'react';
import HeadSgme from "@/components/head/HeadSgme";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import axios from "axios";
import {getUserFromCookie} from "@/utils/Cookies";
import {http} from "@/utils/http";

function Cadastro(props) {
    const router = useRouter();
    const [status, setStatus] = useState([false])
    const [errorApi, setErrorApi] = useState("")
    const [resultErro, setResultErro] = useState(false)


    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm();

    const cancelar = () => {
        router.push("/gestao-sgme/produtos")
    }

    const onSubmit = async (data) => {

        const dataUser = getUserFromCookie();
        try {
            await http.post('/produtos/cadastro', data, {
                headers: {
                    Authorization: `Bearer ${dataUser.token}`
                }
            })
                .then((response) => {
                    setStatus(true)
                    reset()
                    router.push('/gestao-sgme/produtos')
                })
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setResultErro(true)
                setErrorApi(error.response.data.message)
            }
        }
    }

    console.log(errorApi)
    return (
        <>
            <HeadSgme title="SGME - Cadastro de produtos"/>
            <main className="container-sm d-sm-flex align-items-center justify-content-start mt-5">

                <form className="form-control-sm w-100" style={{maxWidth: "75%"}}>

                    <h3 className="mb-4">Novo Produto</h3>

                    <div className="d-sm-flex justify-content-between flex-row ">
                        <div className="w-100 me-3">
                            <label htmlFor="codigo">Codigo</label>
                            <input type="text"
                                   placeholder="Digite  o codigo do produto"
                                   className="form-control" {...register('codigo')}/>
                        </div>
                        <div className="w-100">
                            <label htmlFor="nome">Nome</label>
                            <input type="text"
                                   placeholder="Digite o nome do produto"
                                   className="form-control" {...register('nome')}/>
                        </div>

                    </div>

                    <div className="d-sm-flex justify-content-between flex-row ">
                        <div className="w-100 me-3">
                            <label htmlFor="codigo">Custo</label>
                            <input type="number"
                                   placeholder="Digite  o custo do produto"
                                   className="form-control" {...register('custo')}/>
                        </div>
                        <div className="w-100 mb-3">
                            <label htmlFor="nome">Preco</label>
                            <input type="number"
                                   placeholder="Digite o preço do produto"
                                   className="form-control" {...register('preco')}/>
                        </div>
                    </div>

                    {errorApi !== "" ? (
                        <p className="text-danger fw-bold">{errorApi}</p>
                    ) : ("")}

                    <div className="d-flex ">
                        <button className="btn bg-success pe-5 ps-5 me-3" onClick={(e) => {
                            e.preventDefault();
                            handleSubmit(onSubmit)();
                        }}>SALVAR
                        </button>

                        <button className="btn btn-danger pe-5 ps-5 me-3" onClick={(e) => {
                            e.preventDefault();
                            cancelar();
                        }}>CANCELAR
                        </button>
                    </div>

                </form>
            </main>
        </>
    );
}

export default Cadastro;