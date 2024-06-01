// Objective: create a custom hook to handle the form and modal of the new cadastro page

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { toggleModalCancelarController, toggleModalController } from '@/utils/controller/modal';

export const useFormModal = (ROUTE_PATH) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const [loadingApi, setLoadingApi] = useState(false);
    const [statusErroApi, setStatusErroApi] = useState("");
    const [erroApiMessage, setErroApiMessage] = useState("");

    const [statusVisibleModal, setStatusVisibleModal] = useState(false);
    const [statusVisibleModalCancelar, setStatusVisibleModalCancelar] = useState(false);

    const toggleModalCancelar = () => {
        toggleModalCancelarController(setStatusVisibleModalCancelar, statusVisibleModalCancelar, ROUTE_PATH)
    }

    const toggleModal = () => {
        toggleModalController(setStatusVisibleModal, statusVisibleModal, ROUTE_PATH)
    }

    return {
        register,
        handleSubmit,
        errors,
        loadingApi,
        setLoadingApi,
        statusErroApi,
        setStatusErroApi,
        erroApiMessage,
        setErroApiMessage,
        statusVisibleModal,
        setStatusVisibleModal,
        statusVisibleModalCancelar,
        setStatusVisibleModalCancelar,
        toggleModalCancelar,
        toggleModal
    };
};