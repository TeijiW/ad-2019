import React from "react"
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Button,
    Text,
} from "grommet"

export default function UserDetails(props) {
    const { userData, detailsToggle } = props

    return (
        <Box size="large">
            <Table alignSelf="center">
                <TableBody>
                    <TableRow>
                        <TableCell scope="col" border="bottom">
                            <strong>Nome</strong>
                        </TableCell>
                        <TableCell size="medium" scope="col">
                            <Text wordBreak="break-word">{userData.name}</Text>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell scope="col" border="bottom">
                            <strong>Email</strong>
                        </TableCell>
                        <TableCell size="medium" scope="col">
                            <Text wordBreak="break-word">{userData.email}</Text>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Button
                size="small"
                margin="small"
                width={{
                    max: "small",
                }}
                onClick={() => detailsToggle()}
                label="Voltar"
            />
        </Box>
    )
}
