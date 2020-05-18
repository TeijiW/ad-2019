import React, { useState, useEffect } from "react"
import { Trash, Catalog, View } from "grommet-icons"
import { DataTable, Button, Menu } from "grommet"
import LoadingBar from "./LoadingBar"
import services from "../../services"
import "./index.css"

export default function Userslist(props) {
    const { list, setList, setError, showUserDetails } = props

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
                setError(error)
                console.error(error)
            }
        }
        fetchList()
    }, [])

    const removeUser = async (user) => {
        try {
            await services.user().removeOne(user)
        } catch (error) {
            setError(error)
        } finally {
            window.location.reload()
        }
    }

    const renderLoadingBar = () => {
        return (
            <LoadingBar
                loadingCounter={loadingCounter}
                setLoadingCounter={setLoadingCounter}
            />
        )
    }

    const resultToggle = (user) => {
        setList(
            list.map((item) => {
                if (user._id === item._id) {
                    item.show = !item.show
                }
                return item
            })
        )
    }

    const renderShowOrHideLabel = (user) => (user.show ? "Esconder" : "Mostrar")

    return (
        <>
            {runLoadingBar && renderLoadingBar()}
            <DataTable
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
                                return user.show ? user.friend.name : "?"
                            }
                            return "-"
                        },
                    },
                    {
                        header: "",
                        align: "center",
                        render: (user) => (
                            <>
                                {/* <Button
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
                                <Button
                                    onClick={() => {
                                        resultToggle(user)
                                    }}
                                    primary
                                    margin="xsmall"
                                    icon={<View size="small" />}
                                /> */}
                                <Menu
                                    label="Menu"
                                    size="small"
                                    dropAlign="center"
                                    items={[
                                        {
                                            label: "Remover",
                                            onClick: () => removeUser(user),
                                        },
                                        {
                                            label: "Visualizar",
                                            onClick: () =>
                                                showUserDetails(user),
                                        },
                                        {
                                            label: `${renderShowOrHideLabel(
                                                user
                                            )} resultado`,
                                            onClick: () => {
                                                resultToggle(user)
                                            },
                                        },
                                    ]}
                                />
                            </>
                        ),
                    },
                ]}
            />
        </>
    )
}
