import * as React from 'react';
import { ILayoutProps } from 'types';
import { Container, Row } from 'reactstrap';

export class AccountLayout extends React.Component<ILayoutProps>{
    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        {this.props.children}
                    </Row>
                </Container>
            </div>
        );
    }

}