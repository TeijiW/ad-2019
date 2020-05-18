import React from "react"
import { Header, Button } from "grommet"
import { UserAdd, Close, Cycle } from "grommet-icons"
import services from "../../services"

export default function Options(props) {
    const { setError, setErrors, setSubmitLabel, formToggle } = props

    const draw = async () => {
        try {
            await services.draw().run()
            setErrors([])
            return window.location.reload()
        } catch (error) {
            setError(error)
        }
    }

    const removeAll = async () => {
        try {
            await services.user().removeAll()
            setErrors([])
            return window.location.reload()
        } catch (error) {
            setError("Não foi possível remover todos os participantes")
        }
    }

    const addUser = async () => {
        setSubmitLabel("Adicionar")
        formToggle()
    }
    return (
        <Header
            direction="column"
            justify="start"
            margin={{ bottom: "medium" }}
            pad={{
                horizontal: "xlarge",
            }}
        >
            <Button
                icon={<Cycle />}
                fill="true"
                color="brand"
                primary
                label="SORTEAR!"
                onClick={() => draw()}
            />

            <Button
                icon={<UserAdd />}
                fill="true"
                color="status-ok"
                primary
                label="ADICIONAR PARTICIPANTE"
                onClick={() => addUser()}
            />

            <Button
                icon={<Close />}
                fill="true"
                color="status-error"
                primary
                label="REMOVER TODOS"
                onClick={() => removeAll()}
            />
        </Header>
    )
}
