import React, { useState, useEffect } from "react"
import { Box } from "grommet"

import {
    Description,
    Options,
    UserList,
    UserForm,
    UserDetails,
    EmailFeedback,
    ErrorList,
} from "./components"

export default function App() {
    const [list, setList] = useState([])
    const [sendButton, setSendButton] = useState(false)
    const [errors, setErrors] = useState([])
    const [submitLabel, setSubmitLabel] = useState("Adicionar")
    const [showForm, setShowForm] = useState(false)
    const [showDetails, setShowDetails] = useState(false)
    const [userData, setUserData] = useState({})

    const setError = (error) => {
        if (!errors.includes(error)) {
            setErrors([...errors, error])
        }
    }

    const formToggle = () => {
        setShowForm(!showForm)
    }

    const detailsToggle = () => {
        setShowDetails(!showDetails)
    }

    useEffect(() => {
        const usersNoFriend = list?.filter((user) => {
            return !user.friend
        })
        if (usersNoFriend?.length > 0) {
            setSendButton(true)
        }
    }, [list])

    const showUserDetails = (data) => {
        setUserData(data)
        detailsToggle()
    }

    const renderDetails = () => (
        <UserDetails detailsToggle={detailsToggle} userData={userData} />
    )

    const renderForm = () => (
        <UserForm
            showForm={showForm}
            formToggle={formToggle}
            submitLabel={submitLabel}
            setError={setError}
            setErrors={setErrors}
        />
    )

    const renderTable = () => (
        <>
            <Options
                setError={setError}
                setErrors={setErrors}
                setSubmitLabel={setSubmitLabel}
                formToggle={formToggle}
            />
            <UserList
                setSubmitLabel={setSubmitLabel}
                setError={setError}
                formToggle={formToggle}
                list={list}
                setList={setList}
                showUserDetails={showUserDetails}
            />
        </>
    )

    return (
        <Box
            background="light-5"
            direction="column"
            justify="start"
            align="center"
            wrap="true"
        >
            <Description />
            {errors.length > 0 && <ErrorList errors={errors} />}
            <EmailFeedback
                setError={setError}
                setErrors={setErrors}
                sendButton={sendButton}
            />
            <Box
                focusIndicator="false"
                elevation="large"
                width={{
                    min: "430",
                }}
                background="light-2"
                border={{ color: "brand", size: "medium" }}
                margin="medium"
                pad="medium"
            >
                {showDetails && renderDetails()}
                {showForm && renderForm()}
                {!showForm && !showDetails && renderTable()}
            </Box>
        </Box>
    )
}
