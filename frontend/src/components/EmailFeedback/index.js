import React, { useState } from "react"
import { Button, Text, Heading, Box } from "grommet"
import { Send } from "grommet-icons"
import services from "../../services"

export default function EmailFeedback(props) {
    // const [showEmailText, setShowEmailText] = useState(false)
    const {
        setError,
        setErrors,
        sendButton,
        showEmailText,
        setShowEmailText,
    } = props

    const sendEmail = async () => {
        try {
            await services.email().send()
            setErrors([])
            setShowEmailText(true)
            return null
        } catch (error) {
            setError(error)
        }
    }

    const renderShowEmailText = () => (
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
            margin="small"
        >
            <Text textAlign="center">
                Dica: Para poder enviar o resultado, é necessário que todos os
                usuários tenham um amigo sorteado e que tenha ao menos dois
                participantes
            </Text>
        </Box>
    )

    return (
        <>
            {showEmailText && renderShowEmailText()}
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
