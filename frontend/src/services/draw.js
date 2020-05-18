import axios from "axios"

export default function draw() {
    axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL + "/draw"
    const run = async () => {
        try {
            await axios.get()
        } catch (error) {
            throw "Não foi possível realizar o sorteio, tente novamente"
        }
    }

    return { run }
}
