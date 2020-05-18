import React from "react"
import { Box, Form, FormField, TextInput, Button } from "grommet"
import services from "../../services"

export default function UserForm(props) {
    const { formToggle, setError, submitLabel, setErrors, showForm } = props

    const submit = async (data) => {
        const error = await services.user().save({
            name: data.name,
            email: data.email,
        })
        if (error) {
            setError(error)
        } else {
            setErrors([])
        }
        formToggle()
    }

    if (showForm) {
        return (
            <Form
                messages={{
                    required: "Obrigatório",
                }}
                onSubmit={({ value }) => {
                    submit(value)
                }}
            >
                <FormField required name="name" htmlfor="name" label="Name">
                    <TextInput id="name" name="name" />
                </FormField>
                <FormField required name="email" htmlfor="email" label="Email">
                    <TextInput id="email" name="email" />
                </FormField>
                <Box direction="row" justify="between">
                    <Button
                        size="small"
                        margin="small"
                        type="submit"
                        primary
                        label={submitLabel}
                    />
                    <Button
                        size="small"
                        margin="small"
                        type="reset"
                        label="Limpar"
                    />
                    <Button
                        size="small"
                        margin="small"
                        onClick={() => formToggle()}
                        label="Voltar"
                    />
                </Box>
            </Form>
        )
    }
}
