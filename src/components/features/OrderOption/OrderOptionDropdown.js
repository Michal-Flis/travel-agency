import React from 'react';
import styles from './OrderOption.module.scss';
import PropTypes from 'prop-types';
import {formatPrice} from '../../../utils/formatPrice';

const OrderOptionDropdown = ({values, required, currentValue, setOptionValue}) => (
    <select className={styles.dropdown}
      value={currentValue}
      onChange={event => setOptionValue(event.currentTarget.value)}>
      {required ? '' : (
        <option key='null' value=''>---</option>
      )}
      {values.map(value => (
        <option key={value.id} value={value.id}>{value.name} ({formatPrice(value.price)})</option>
      ))}  
    </select>
);

OrderOptionDropdown.propTypes = {
  currentValue: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  setOptionValue: PropTypes.func,
  values: PropTypes.array,
};

export default OrderOptionDropdown;