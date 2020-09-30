import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const message = (msg: string) : JSX.Element => (
    <Container>
        <Row>
            <Col>
                <h1>{msg}</h1>
            </Col>
        </Row>
    </Container>
);

export const loading = message('Loading Your Data');
export const noData = message('Unable to Load Data');

