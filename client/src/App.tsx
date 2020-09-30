import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { IBigMacData } from './interfaces';
import InputForm from './InputForm';
import * as STATIC from './static';
import * as API from './api';

interface State {
    loading: boolean;
    input: number;
    data?: IBigMacData;
}

export default class App extends Component<any, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            loading: true,
            input: 1
        };

        this.fetch = this.fetch.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    componentDidMount() {
        this.fetch();
    }

    fetch() : void {
        let handleResponse = (data: IBigMacData) : void => {
            this.setState({data: data, loading: false});
        };
        API.fetchBigMacData().then(handleResponse);
    }

    onInputChange(value: number) : void {
        this.setState({input: value});
    }

    render() {
        if (this.state.loading) {
            return STATIC.loading;
        }
        if (!this.state.data) {
            return STATIC.noData;
        }

        let {input, data} = this.state;
        let {local, random} = data;

        let value = input / local.localPrice;
        let conversion = local.dollarPrice / random.dollarPrice;

        return (
            <Container className="min-vh-100">
                <Row className="row-third pad-v">
                    <Col>
                        <h3>You are in {local.country}</h3>
                        <InputForm changeFunc={this.onInputChange} />
                    </Col>
                </Row>
                <Row className="row-third pad-v">
                    <Col>
                        <h3>You could buy {calculated(value)} Bic Macs in your country</h3>
                        <h4>Your Dollar Purchasing Parity (PPP) is {calculated(local.dollarPpp)}</h4>
                    </Col>
                </Row>
                <Row className="row-third pad-v">
                    <Col>
                        <h3>Random Country: {random.country}</h3>
                        <h4>You could buy {calculated(value * conversion)} Big Macs in {random.country}</h4>
                        <h4>Your {calculated(input)} is worth about {calculated(input * conversion)} in {random.country}</h4>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const calculated = (input: number) : JSX.Element => {
    return <u>{input.toFixed(2)}</u>
}
