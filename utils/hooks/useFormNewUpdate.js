// Objective: create a custom hook to handle the form and modal of the new update page

import {useRouter} from "next/router";
import {useState} from "react";
import {toggleModalCancelarController, toggleModalController} from "@/utils/controller/modal";

export const useFormModalNewUpdate = (ROUTE_PATH) => {
    const router = useRouter();
    const [loadingData, setLoadingData] = useState(true);
    const [loadingApi, setLoadingApi] = useState(false);

    const [statusButtonSalvar, setStatusButtonSalvar] = useState(true);
    const [statusButtonEditar, setStatusButtonEditar] = useState(true);
    const [statusInputDisabled, setStatusInputDisabled] = useState(true);

    const [erroApiMessage, setErroApiMessage] = useState(false);
    const [statusErroApi, setStatusErroApi] = useState(false);

    const [statusVisibleModal, setStatusVisibleModal] = useState(false);
    const [statusVisibleModalCancelar, setStatusVisibleModalCancelar] = useState(false);
    const toggleModalCancelar = () => {
        toggleModalCancelarController(setStatusVisibleModalCancelar, statusVisibleModalCancelar, ROUTE_PATH)
    }

    const toggleModal = () => {
        toggleModalController(setStatusVisibleModal, statusVisibleModal, ROUTE_PATH)
    }

    const concelar = () => {
        if (statusButtonEditar === false) {
            setStatusVisibleModalCancelar(true);
        } else {
            router.push(ROUTE_PATH);
        }
    }

    return {
        loadingData,
        setLoadingData,
        loadingApi,
        setLoadingApi,
        statusButtonSalvar,
        setStatusButtonSalvar,
        statusButtonEditar,
        setStatusButtonEditar,
        statusInputDisabled,
        setStatusInputDisabled,
        erroApiMessage,
        setErroApiMessage,
        statusErroApi,
        setStatusErroApi,
        statusVisibleModal,
        setStatusVisibleModal,
        statusVisibleModalCancelar,
        setStatusVisibleModalCancelar,
        toggleModalCancelar,
        toggleModal,
        concelar
    };

}
