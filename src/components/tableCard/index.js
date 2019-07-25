import React, { Fragment } from 'react';
import { Card, Loader, Table, Form } from "tabler-react";
// import { TableCardProps } from "../../types";
import "./index.css";

const TableCard = (props) => {
  const { data, tableData, loading, multiSelect } = props;

  return (
    <Fragment>
      <Card>
        <Table responsive="true">
          <Table.Header>
            <Table.Row>
              {multiSelect && <Table.ColHeader>
                <Form.Checkbox
                  className="tableMargin"
                  label=" "
                />
              </Table.ColHeader>}
              {tableData.tData[0] && Object.keys(tableData.tData[0]).map((row) => (
                <Table.ColHeader key={row}>{row}</Table.ColHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {loading && data.length === 0 &&
            <Table.Row>
              <Table.Col><Loader className="position-static" /></Table.Col>
            </Table.Row>
            }
            {tableData.tData && tableData.tData.map((row, index) => (
              <Table.Row key={index}>
                {multiSelect && <Table.Col>
                  <Form.Checkbox
                    className="tableMargin"
                    label=" "
                  />
                </Table.Col>}
                {Object.values(row).map((column, ind) => <Table.Col key={ind}>{column}</Table.Col>)}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
    </Fragment>
  )
};

export default TableCard;
