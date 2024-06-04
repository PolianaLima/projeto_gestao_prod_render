import {useRouter} from "next/router";
import {useState} from "react";
import {toggleModalController} from "@/utils/controller/modal";


export const useFormDeleteFinanceiro = (ROUTE_PATH) => {
    const router = useRouter();
    const [erroApiMessage, setErroApiMessage] = useState('');
    const [statusErroApi, setStatusErroApi] = useState(false);
    const [loadingApi, setLoadingApi] = useState(false);
    const [statusVisibleModal, setStatusVisibleModal] = useState(false);

    const toggleModal = () => {
        toggleModalController(setStatusVisibleModal, statusVisibleModal, ROUTE_PATH)
    }

    return{
        erroApiMessage,
        setErroApiMessage,
        router,
        loadingApi,
        setLoadingApi,
        statusVisibleModal,
        setStatusVisibleModal,
        statusErroApi,
        setStatusErroApi,
        toggleModal
    }
}