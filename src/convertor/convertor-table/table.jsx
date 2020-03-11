import React from 'react'
import {Table} from "semantic-ui-react";


export const ConvertorTable = ({convertedUnits}) =>
    <Table definition>
        <Table.Body>
            {convertedUnits.map(({plural, value}, index) =>
                <Table.Row key={plural + index}>
                    <Table.Cell>{plural}</Table.Cell>
                    <Table.Cell>{value}</Table.Cell>
                </Table.Row>
            )}
        </Table.Body>
    </Table>
