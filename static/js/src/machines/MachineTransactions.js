
import React, {useState} from 'react';
import { Col, Row, Table } from 'react-bootstrap';

export const MachineTransactions = ({machine}) => {
    const [selectedTransaction, setSelectedTransaction] = useState(machine.transactions.length ? machine.transactions[0]: null);

    return (
      <>
      
      <Row className="my-4">
      <Col>
        <h4>Transactions</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>Date Added</th>
            </tr>
          </thead>
          <tbody>
            {machine.transactions.map((transaction) => (
              <tr
                key={transaction.id}
                onClick={() => setSelectedTransaction(transaction)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: transaction.transaction_type === 'Income' ? '#e6f4ea' : '#f8d7da',
                }}
              >
                <td>{transaction.identifier}</td>
                <td>{transaction.description}</td>
                <td>{transaction.transaction_type}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.currency}</td>
                <td>{transaction.date_added}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>

    {/* Sekcija za logove transakcije */}
    {selectedTransaction && (
      <Row className="my-4">
        <Col>
          <h4>Transaction Logs for {selectedTransaction.identifier}</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Modifier</th>
                <th>Date Added</th>
              </tr>
            </thead>
            <tbody>
              {selectedTransaction.logs.map((log) => (
                <tr key={log.id}>
                  <td>{log.modifier}</td>
                  <td>{log.date_added}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    )}  
    </>

    );
}