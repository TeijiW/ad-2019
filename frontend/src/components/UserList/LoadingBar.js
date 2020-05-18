import React, { useEffect } from "react"
import { Meter } from "grommet"

export default function LoadingBar(props) {
    let { loadingCounter, setLoadingCounter } = props

    useEffect(() => {
        if (loadingCounter <= 100) {
            setLoadingCounter((loadingCounter += 3))
        }
    }, [setLoadingCounter, loadingCounter])

    return (
        <Meter
            alignSelf="center"
            background="light-4"
            values={[
                {
                    value: loadingCounter,
                    label: "Carregando...",
                },
            ]}
            aria-label="meter"
        />
    )
}
