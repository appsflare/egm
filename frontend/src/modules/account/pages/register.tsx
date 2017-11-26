import * as React from 'react';
import { Row, Col, Card, CardBody, CardFooter, Button } from 'reactstrap';
import { RegisterFormContainer } from '../containers';
import { connect } from 'react-redux';
import { IAccountState } from '../state';
import { bindActionCreators } from 'redux';
import { AccountActions } from '../actions';
import { RouteComponentProps, withRouter } from 'react-router-dom';


class RegisterPageComp extends React.Component<RouteComponentProps<{}>> {
    render() {
        return (
            <Col md="6">
                <Card className="mx-4">
                    <CardBody className="p-4">
                        <RegisterFormContainer onSubmitSuccess={() => {
                            this.props.history.push('/app/account/login', {
                                message: 'Successfully created your account!'
                            });
                        }} />
                    </CardBody>
                    <CardFooter className="p-4">
                        <Row>
                            <Col xs="12" sm="6">
                                <Button className="btn-facebook" block><span>facebook</span></Button>
                            </Col>
                            <Col xs="12" sm="6">
                                <Button className="btn-twitter" block><span>twitter</span></Button>
                            </Col>
                        </Row>
                    </CardFooter>
                </Card>
            </Col>
        );
    }
}


export const RegisterPage = connect((state: { accounts: IAccountState }, props: any) => {
    const { accounts } = state;
    return { ...accounts, ...props };
}, (dispatch) => bindActionCreators(AccountActions, dispatch))(withRouter(RegisterPageComp));