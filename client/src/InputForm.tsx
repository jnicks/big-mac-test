import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

interface Props {
    changeFunc: Function;
}

interface State {
    valid: boolean;
}

export default class InputForm extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { valid: true };
        this.onChange = this.onChange.bind(this);
    }

    onChange(ev: React.ChangeEvent<HTMLInputElement>) : void {
        let {value} = ev.currentTarget;
        let num = parseFloat(value)
        let valid = !isNaN(num);
        this.setState({valid: valid});
        if (valid) {
            this.props.changeFunc(num);
        }
    }

    render() {
        return (
            <Form>
                <Form.Group controlId="inputValue">
                    <Form.Label><h4>Please enter an amount of money in your local currency</h4></Form.Label>
                    <Form.Control defaultValue="1" placeholder="5.0" onChange={this.onChange} isValid={this.state.valid}/>
                </Form.Group>
            </Form>
        )
    }
}
