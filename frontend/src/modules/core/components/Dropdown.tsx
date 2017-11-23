import React from 'react';
import { DropdownMenu, Dropdown as RsDropDown, DropdownToggle, DropdownItem } from 'reactstrap';

interface IDropdownItem {
  text: string;
  value: any;
}

interface IDropdownProps {
  id: string;
  items: Array<IDropdownItem>;
  defaultValue?: any;
  isLoading?: boolean;
  onChange?(selected: IDropdownItem): void;
}

interface IDropdownState {
  isOpen: boolean;
  selectedValue: string;
  selectedText: string;
}

export class Dropdown extends React.Component<IDropdownProps, IDropdownState> {

  constructor(props: IDropdownProps) {
    super(props);
    this.state = { isOpen: false, selectedValue: '', selectedText: 'Select...' };
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  select(selected: IDropdownItem) {
    this.setState({ selectedText: selected.text, selectedValue: selected.value });
    this.props.onChange && this.props.onChange(selected);
  }

  public render() {
    return (
      <RsDropDown isOpen={this.state.isOpen} toggle={this.toggle}>
        <DropdownToggle caret>{this.props.isLoading ? <span>Loading...</span> : this.state.selectedText}</DropdownToggle>
        <DropdownMenu>
          {this.props.items.map(item => {
            return <DropdownItem onClick={this.select.bind(this, item)}>{item.text}</DropdownItem>
          })}
        </DropdownMenu>
      </RsDropDown>
    );
  }
}
