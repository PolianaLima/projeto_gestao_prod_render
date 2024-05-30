import axios from "axios";

export const handleApiError = (error,setErroApiMessage,setStatusErroApi ) => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            setErroApiMessage(error.response.data.message);
        } else {
            setErroApiMessage(error.message);
        }
        setStatusErroApi(true);
    }
}
