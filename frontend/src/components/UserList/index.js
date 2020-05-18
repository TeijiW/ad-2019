import React, { useState, useEffect } from "react"
import { Trash, Catalog } from "grommet-icons"
import { Box, DataTable, Button } from "grommet"
import LoadingBar from "./LoadingBar"
import services from "../../services"
import "./index.css"

export default function Userslist(props) {
    const {
        list,
        setList,
        setError,
        showUserDetails,
        setSubmitLabel,
        formToggle,
    } = props

    const [runLoadingBar, setRunLoadingBar] = useState(true)
    let [loadingCounter, setLoadingCounter] = useState(0)

    useEffect(() => {
        const fetchList = async () => {
            try {
                const rawList = await services.user().getAll()
                if (!Array.isArray(rawList)) {
                    setError(
                        "Não foi possível carregar a lista de participantes"
                    )
                }
                setLoadingCounter(100)
                setRunLoadingBar(false)
                setList(rawList)
            } catch (error) {
                console.log(error)
            }
        }
        fetchList()
    }, [])

    const removeUser = async (user) => {
        const error = await services.user().removeOne(user)
        if (error) {
            setError(error)
        }
        window.location.reload()
    }

    const renderLoadingBar = () => {
        return (
            <LoadingBar
                loadingCounter={loadingCounter}
                setLoadingCounter={setLoadingCounter}
            />
        )
    }

    return (
        <>
            {runLoadingBar && renderLoadingBar()}
            <DataTable
                onClickRow={({ datum }) => {
                    showUserDetails(datum)
                }}
                alignSelf="center"
                data={list}
                columns={[
                    {
                        property: "name",
                        header: "Participante",
                        primary: true,
                        align: "center",
                    },
                    {
                        property: "friend",
                        header: "Amigo sorteado",
                        align: "center",
                        render: (user) => {
                            if (user.friend) {
                                return user.friend.name
                            }
                            return "?"
                        },
                    },
                    {
                        header: "Opções",
                        align: "center",
                        render: (user) => (
                            <>
                                <Button
                                    onClick={() => removeUser(user)}
                                    primary
                                    margin="xsmall"
                                    icon={<Trash size="small" />}
                                />
                                <Button
                                    onClick={() => showUserDetails(user)}
                                    primary
                                    margin="xsmall"
                                    icon={<Catalog size="small" />}
                                />
                            </>
                        ),
                    },
                ]}
            />
        </>
    )
}
