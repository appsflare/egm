import React from 'react';
import { Button, Card, CardHeader } from 'semantic-ui-react';
// import { Pushpin } from 'components/Pushpin';

export class HomePage extends React.Component {
  public componentDidMount() {

  }

  public render() {
    return (
      <Card>
        <CardHeader>
          <strong>Add New Gateway</strong>
        </CardHeader>
        <Card.Content>

        </Card.Content>
        <Card.Description>
          <Button color="green" size="mini"><i className="fa fa-save" /> Add</Button>
          <Button color="red" size="mini"><i className="fa fa-dot-circle-o" /> Clear</Button>
        </Card.Description>
      </Card>
    );
  }
}
