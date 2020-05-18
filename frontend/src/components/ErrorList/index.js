import React from "react"
import { Box, Text, Heading, List } from "grommet"

export default function ErrorList(props) {
    return (
        <Box
            border={{
                color: "dark-1",
                size: "medium",
            }}
            margin="small"
            pad="small"
            background="status-error"
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
