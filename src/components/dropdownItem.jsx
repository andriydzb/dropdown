import React, { Component } from 'react';

class DropdownItem extends Component {
  onClick = () => {
    const { id, name } = this.props.country;
    const { onSelectedValueChanged, hideDropdown } = this.props;
    onSelectedValueChanged(id, name);
    hideDropdown();
  };
  
  render() {
    const { name } = this.props.country;
    const { isSelected } = this.props;

    let classNames = 'dropdown--item';
    if (isSelected) {
      classNames += ' dropdown--item-is-selected';
    }
    return(
      <div className={classNames}
           onClick={this.onClick} >
        {name}
      </div>
    );
  }
}

export default DropdownItem;