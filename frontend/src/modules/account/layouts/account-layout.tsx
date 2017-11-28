import * as React from 'react';
import { ILayoutProps } from 'types';
import { Grid } from 'semantic-ui-react';
import Particles from 'react-particles-js';
import { Aux } from 'lib';

export class AccountLayout extends React.Component<ILayoutProps>{
    render() {
        return (
            <Aux>
                <Particles canvasClassName="account-layout-particles" />
                <Grid className="account-layout" centered columns="4">
                    <Grid.Row verticalAlign="middle" >
                        {this.props.children}
                    </Grid.Row>
                </Grid>
            </Aux>
        );
    }

}