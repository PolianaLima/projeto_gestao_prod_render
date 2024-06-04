// Objective: create a custom hook to handle the form index financeiro page

import {useState} from "react";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";

export const useFormListFinanceiro = (ROUTE_PATH) => {
    const router = useRouter();
    const [erroApiMessage, setErroApiMessage] = useState('');
    const [statusErroApi, setStatusErroApi] = useState(false);
    const [loading, setLoading] = useState(true)
    const {register, handleSubmit} = useForm()
    const [statusVisibleModal, setStatusVisibleModal] = useState(false);
    const [statusVisibleModalCancelar,setStatusVisibleModalCancelar] = useState(false)
    const [id, setId] = useState(null);
    const [loadingApi, setLoadingApi] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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
        setdataFiltro,
        statusVisibleModal,
        setStatusVisibleModal,
        statusVisibleModalCancelar,
        setStatusVisibleModalCancelar,
        id,
        setId,
        loadingApi,
        setLoadingApi,
        router,
        isButtonDisabled,
        setIsButtonDisabled
    };
}