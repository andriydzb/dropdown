const reducer = (state, action) => {
  if (state === undefined) {
    return {
      dropdown: {
        title: 'Select country',
        selectedCountryId: '2',
        countries: [{
            id: '1',
            name: 'Ukraine'
          },
          {
            id: '2',
            name: 'USA'
          },
          {
            id: '3',
            name: 'England'
          },
          {
            id: '4',
            name: 'Spain'
          },
          {
            id: '5',
            name: 'Poland'
          }]
      }
    }
  }
  switch (action.type) {
    case 'ON_ITEM_SELECT':
      return {
        ...state,
        dropdown: {
          ...state.dropdown,
          selectedCountryId: action.index,
          title: action.text
        }
      };

    default:
      return state;
  }
};

export default reducer;