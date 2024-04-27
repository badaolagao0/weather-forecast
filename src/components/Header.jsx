import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const Header = () => {
    return (
        <Row style={{
            margin: '0'
        }}>
            <Col style={{
                padding: '0'
            }}>
                <h2 style={{
                    textAlign: 'center',
                    backgroundColor: '#5372f0',
                    color: '#fff',
                    margin: '0',
                    height: '80px',
                    justifyContent: 'center',
                    lineHeight: '80px'
                }}>Weather Dashboard</h2>
            </Col>
        </Row>
    )
}

export default Header