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

export default function userDetails(props) {
    const { userData, detailsToggle } = props

    return (
        <Box size="large">
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell scope="col" border="bottom">
                            <strong>Nome</strong>
                        </TableCell>
                        <TableCell size="small" scope="col">
                            <Text size="small">{userData.name}</Text>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell scope="col" border="bottom">
                            <strong>Email</strong>
                        </TableCell>
                        <TableCell size="small" scope="col">
                            <Text size="small">{userData.email}</Text>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Button
                size="small"
                margin="small"
                onClick={() => detailsToggle()}
                label="Voltar"
            />
        </Box>
    )
}
