import React from "react"
import { Box, Text, List } from "grommet"

export default function ErrorList(props) {
    return (
        <Box
            border={{
                color: "dark-1",
                size: "medium",
            }}
            margin="small"
            width={{
                max: "medium",
            }}
            background="status-error"
            justify="center"
            align="center"
        >
            <Text
                textAlign="center"
                margin={{
                    bottom: "small",
                }}
                size="large"
            >
                Erro(s)
            </Text>
            <List data={props.errors} />
        </Box>
    )
}
