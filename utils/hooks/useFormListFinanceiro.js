// Objective: create a custom hook to handle the form index financeiro page

import {useState} from "react";
import {useForm} from "react-hook-form";

export const useFormListFinanceiro = (ROUTE_PATH) => {
    const [erroApiMessage, setErroApiMessage] = useState('');
    const [statusErroApi, setStatusErroApi] = useState(false);
    const [loading, setLoading] = useState(true)
    const {register, handleSubmit} = useForm()
    const [dataFiltro, setdataFiltro] = useState({
        dataInicial: "",
        dataFinal: "",
        status: ""
    });


    return {
        erroApiMessage,
        setErroApiMessage,
        statusErroApi,
        setStatusErroApi,
        loading,
        setLoading,
        register,
        handleSubmit,
        dataFiltro,
        setdataFiltro
    };
}