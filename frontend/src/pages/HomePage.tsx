import React from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter } from 'reactstrap';
// import { Pushpin } from 'components/Pushpin';
import { renderCreateGatewayForm } from 'modules/gateways';
export class HomePage extends React.Component {
  public componentDidMount() {

  }

  public render() {
    return (
      <Card>
        <CardHeader>
          <strong>Add New Gateway</strong>
        </CardHeader>
        <CardBody>
          {renderCreateGatewayForm()}
        </CardBody>
        <CardFooter>
          <Button color="success" size="sm"><i className="fa fa-save"/> Add</Button>
          <Button color="danger" size="sm"><i className="fa fa-dot-circle-o"/> Clear</Button>
        </CardFooter>
      </Card>
    );
  }
}
