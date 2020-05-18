import axios from "axios"

export default function draw() {
    axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL + "/draw"
    const run = async () => {
        try {
            const response = await axios.get()
            console.log(response.status)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    return { run }
}
