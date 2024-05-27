import React, {useState} from 'react';
import HeadSgme from "@/components/head/HeadSgme";
import {useForm} from "react-hook-form";
import {getUserFromCookie} from "@/utils/Cookies";
import {http} from "@/utils/http";
import {useRouter} from "next/router";
import axios from "axios";

function Index() {

    const {
        register,
        handleSubmit,
    } = useForm();

    const [errorApi, setErrorApi] = useState("");
    const router = useRouter();

    const onSubmit = async (data) => {
        try {
            const dataUser = getUserFromCookie();
            await http.post(`/ckeckouts/abirNovoCheckout`, data, {
                headers: {
                    Authorization: `Bearer ${dataUser.token}`
                }
            })
            await router.push('/gestao-sgme/pdv');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setErrorApi(error.response.data.message)
            }
        }
    }

    return (
        <>
            <HeadSgme title="SGME _ Novo Caixa"/>
            <main>
                <div className="container-sm d-flex flex-column justify-content-center align-items-center">
                    <h2>Abertura de caixa</h2>
                    <form className="d-sm-flex flex-column justify-content-center align-items-center mb-3">
                        <label htmlFor="valor_inicial" className="mb-3">Valor de abertura</label>
                        <input type="number" className="form-control"
                               {...register("valor_inicial")} />
                        <button type="submit" className="btn btn-success mt-3 w-100" onClick={event => {
                            event.preventDefault()
                            handleSubmit(onSubmit)()
                        }}>Abrir Caixa
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}

export default Index;
