import React, { useState, useEffect } from "react"
import { Box, Image } from "grommet"

import {
    Description,
    Options,
    UserList,
    UserForm,
    UserDetails,
    EmailFeedback,
    ErrorList,
} from "./components"
import logo from "./images/logo.png"

export default function App() {
    const [list, setList] = useState([])
    const [errors, setErrors] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [showDetails, setShowDetails] = useState(false)
    const [sendButton, setSendButton] = useState(false)
    const [showEmailText, setShowEmailText] = useState(false)
    const [userData, setUserData] = useState({})

    useEffect(() => {
        const usersNoFriend = list?.filter((user) => {
            return !user.friend
        })
        if (usersNoFriend?.length > 0 || list.length < 2) {
            setSendButton(true)
        }
    }, [list])

    const setError = (error) => {
        if (!errors.includes(error)) {
            setErrors([...errors, error])
        }
    }

    const formToggle = () => {
        setShowEmailText(false)
        if (errors.length > 0) {
            setErrors([])
        }
        setShowForm(!showForm)
    }

    const detailsToggle = () => {
        setShowEmailText(false)
        if (errors.length > 0) {
            setErrors([])
        }
        setShowDetails(!showDetails)
    }

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
            setError={setError}
            setErrors={setErrors}
        />
    )

    const renderTable = () => (
        <>
            <Options
                setError={setError}
                setErrors={setErrors}
                formToggle={formToggle}
                listLength={list.length}
            />
            <UserList
                setError={setError}
                formToggle={formToggle}
                list={list}
                setList={setList}
                showUserDetails={showUserDetails}
            />
        </>
    )

    const renderEmailFeedback = () => (
        <EmailFeedback
            setError={setError}
            setErrors={setErrors}
            showEmailText={showEmailText}
            setShowEmailText={setShowEmailText}
            sendButton={sendButton}
        />
    )

    return (
        <Box direction="row" justify="center" align="start" wrap="true">
            <Box justify="start" align="center" wrap="true">
                <Box height="small" width="small">
                    <Image fit="cover" src={logo} />
                </Box>
                <Description />
                {errors.length > 0 && <ErrorList errors={errors} />}
                {renderEmailFeedback()}
            </Box>
            <Box
                focusIndicator="false"
                elevation="large"
                width={{
                    min: "430",
                }}
                background="light-3"
                border={{ color: "brand", size: "medium" }}
                margin="medium"
                pad={{
                    top: "medium",
                }}
            >
                {showDetails && renderDetails()}
                {showForm && renderForm()}
                {!showForm && !showDetails && renderTable()}
            </Box>
        </Box>
    )
}
