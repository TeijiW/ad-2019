import axios from "axios"

export default function user() {
    axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL + "/users"

    const getAll = async () => {
        try {
            const response = await axios.get()
            return response.data
        } catch (error) {
            console.log(error)
            return error.response.status
        }
    }

    const removeOne = async (user) => {
        try {
            await axios.delete(`/${user._id}`)
            return null
        } catch (error) {
            console.log(error)
            return "Erro desconhecido"
        }
    }

    const removeAll = async () => {
        try {
            const response = await axios.delete()
            console.log(response.status)
            return true
        } catch (error) {
            console.log(error)
            console.log(error.response.status)
            return false
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
            return null
        } catch (error) {
            console.log(error)
            if (error.response.status === 400) {
                return "Participante não adicionado. Verifique os dados e tente novamente"
            }
            return "Erro desconhecido"
        }
    }

    return { getAll, removeAll, removeOne, save }
}
