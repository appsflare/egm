import React from 'react';
import { DropdownMenu, Dropdown as RsDropDown, DropdownToggle, DropdownItem } from 'reactstrap';

export interface IDropdownItem {
  text: string;
  value: any;
}

interface IDropdownProps {
  items: Array<IDropdownItem>;
  isOpen: boolean;
  toggle(isOpen: boolean): void;
  onChange?(selected: IDropdownItem): void;
}

export class Dropdown extends React.Component<IDropdownProps> {

  constructor(props: IDropdownProps) {
    super(props);
  }

  toggle = () => {
    this.props.toggle(this.props.isOpen);
  }

  select(selected: IDropdownItem) {
    this.props.onChange && this.props.onChange(selected);
  }

  public render() {
    return (
      <RsDropDown isOpen={this.props.isOpen} toggle={this.toggle}>
        <DropdownToggle caret>{this.props.children}</DropdownToggle>
        <DropdownMenu>
          {this.props.items.map(item => (
            <DropdownItem key={item.value} onClick={this.select.bind(this, item)}>{item.text}</DropdownItem>
          ))}
        </DropdownMenu>
      </RsDropDown>
    );
  }
}
