import React from 'react';
import PropTypes from 'react';
import styles from './OrderOption.module.scss';
import OrderOptionDropdown from './OrderOptionDropdown';
import OrderOptionIcons from './OrderOptionIcons';
import OrderOptionNumber from './OrderOptionNumber';
import OrderOptionCheckboxes from './OrderOptionCheckboxes';

const optionTypes = {
    dropdown: OrderOptionDropdown,
    icons: OrderOptionIcons,
    checkboxes: OrderOptionCheckboxes,
    number: OrderOptionNumber,
  };

  const OrderOption = ({name, type, id, setOrderOption, ...otherProps}) => {
    const OptionComponent = optionTypes[type];
    if(!OptionComponent){
      return null;
    } else {
      return (
        <div className={styles.component}>
          <h3 className={styles.title}>{name}</h3>
          <OptionComponent
            {...otherProps}
          />
        </div>
      );
    }
  };

  OrderOption.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    setOrderOption: PropTypes.func,
    type: PropTypes.string,
  };

  export default OrderOption;