import {router} from "next/client";

export  const toggleModalController = (setStatusVisibleModal,statusVisibleModal , ROUTE_PATH) => {
    setStatusVisibleModal(!statusVisibleModal);
    router.push(ROUTE_PATH)
}

export const toggleModalCancelarController = (setStatusVisibleModalCancelar,statusVisibleModalCancelar,ROUTE_PATH) => {
    setStatusVisibleModalCancelar(!statusVisibleModalCancelar);
    router.push(ROUTE_PATH)
}