import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DropdownItem from './dropdownItem';
import { select } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const DropdownList = ({ countries, title, selectedCountryId, 
                        onSelectedValueChanged, 
                        isDropdownVisible,
                        updateDropdownVisibility,
                        hideDropdown }) => {
  return(
    <div className="dropdown">
      <div className="dropdown--title"
           onClick={updateDropdownVisibility}>{title}</div>
      {
        isDropdownVisible ? (
          <div className="dropdown--items">
            {
              countries.map((country) => {
                let isSelected = false;

                if (country.id === selectedCountryId) {
                  isSelected = true;
                }
      
                return (
                  <DropdownItem key={country.id} 
                                country={country} 
                                isSelected={isSelected}
                                onSelectedValueChanged={onSelectedValueChanged}
                                hideDropdown={hideDropdown} />
                )
              })
            }
          </div>
        ) : null
      }
    </div>
  );
};

class Dropdown extends Component {
  state = {
    isDropdownVisible: false
  };

  componentDidMount() {
    document.addEventListener('click', (e) => {
      const domNode = ReactDOM.findDOMNode(this);
      if (!domNode || !domNode.contains(e.target)) {
        this.hideDropdown();
      }
    });
  };

  onSelectedValueChanged = (id, name) => {
    return this.props.onItemSelect(id, name);
  };

  updateDropdownVisibility = () => {
    this.setState((state) => {
      return {
        isDropdownVisible: !state.isDropdownVisible
      }
    })
  };

  hideDropdown = () => {
    this.setState(() => {
      return {
        isDropdownVisible: false
      }
    })
  };

  updateTitle = (array, id) => {
    return array.find(item => item.id === id);
  };

  render() {
    let updatedTitle;
    const { countries, title, selectedCountryId } = this.props;
    
    if (selectedCountryId.length > 0) {
      updatedTitle = this.updateTitle(countries, selectedCountryId).name;
    } else {
      updatedTitle = title;
    }

    return <DropdownList countries={countries} 
                         title={updatedTitle} 
                         selectedCountryId={selectedCountryId}
                         onSelectedValueChanged={this.onSelectedValueChanged}
                         isDropdownVisible={this.state.isDropdownVisible}
                         updateDropdownVisibility={this.updateDropdownVisibility}
                         hideDropdown={this.hideDropdown} />
  };
}

const mapStateToProps = (state) => {
  return {
    countries: state.dropdown.countries,
    title: state.dropdown.title,
    selectedCountryId: state.dropdown.selectedCountryId
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onItemSelect: select
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);