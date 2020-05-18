import React, { useState } from "react"
import { Button, Text, Heading, Box } from "grommet"
import { Send } from "grommet-icons"
import services from "../../services"

export default function EmailFeedback(props) {
    const [successText, SetSuccessText] = useState(false)
    const { setError, setErrors, sendButton } = props

    const sendEmail = async () => {
        const ok = await services.email().send()
        if (ok) {
            setErrors([])
            SetSuccessText(true)
            return null
        }
        setError("Não foi possível enviar os resultados")
    }

    const renderSuccessText = () => (
        <Box
            width={{
                max: "medium",
            }}
            fill="true"
            pad="medium"
            margin="medium"
        >
            <Box
                border={{
                    color: "dark-1",
                    size: "medium",
                }}
                pad="xsmall"
                margin="small"
                background="status-ok"
            >
                <Heading size="xsmall" textAlign="center">
                    Enviado!
                </Heading>
            </Box>
            <Box
                border={{
                    color: "dark-1",
                    size: "medium",
                }}
                pad="xsmall"
                margin="small"
                background="status-warning"
            >
                <Heading size="xsmall" textAlign="center">
                    Aviso
                </Heading>
                <Text textAlign="center">
                    Verifique sua caixa de spam e lixeira! Peça para seus amigos
                    que participaram fazerem o mesmo
                </Text>
            </Box>
        </Box>
    )

    const renderDisabledWarning = () => (
        <Box
            width={{
                max: "medium",
            }}
            margin={{
                top: "small",
            }}
        >
            <Text textAlign="center">
                Dica: Para poder enviar o resultado, é necessário que todos os
                usuários tenham um amigo sorteado
            </Text>
        </Box>
    )

    return (
        <>
            {successText && renderSuccessText()}
            <Button
                disabled={sendButton}
                primary
                icon={<Send />}
                label="ENVIAR RESULTADO"
                onClick={() => sendEmail()}
            />
            {sendButton && renderDisabledWarning()}
        </>
    )
}
