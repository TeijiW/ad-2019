import axios from "axios"

export default function email() {
    axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL + "/email"
    const send = async () => {
        try {
            await axios.get()
        } catch (error) {
            throw "Não foi possível enviar os resultados"
        }
    }

    return { send }
}
