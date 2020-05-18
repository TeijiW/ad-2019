import axios from "axios"

export default function email() {
    axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL + "/email"
    const send = async () => {
        try {
            const response = await axios.get()
            console.log(response.status)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    return { send }
}
