import axios from "axios"

export default function user() {
    axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL + "/users"

    const getAll = async () => {
        try {
            const response = await axios.get()
            return response.data
        } catch (error) {
            console.error(error)
            throw "Não foi possível obter os dados atualizados"
        }
    }

    const removeOne = async (user) => {
        try {
            await axios.delete(`/${user._id}`)
            return null
        } catch (error) {
            console.error(error)
            throw "Ocorreu um erro ao tentar remover o participante"
        }
    }

    const removeAll = async () => {
        try {
            await axios.delete()
        } catch (error) {
            console.error(error)
            throw "Ocorreu um erro ao tentar remover todos os participantes"
        }
    }

    const save = async (user) => {
        try {
            if (!user?._id) {
                await axios.post("", user)
            }
            if (user?._id) {
                await axios.put(`/${user._id}`, user)
            }
        } catch (error) {
            if (error.response.status === 400) {
                throw "Participante não adicionado. Verifique os dados e tente novamente"
            }
            throw "Erro desconhecido"
        }
    }

    return { getAll, removeAll, removeOne, save }
}
