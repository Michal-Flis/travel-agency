import React from 'react';
import styles from './OrderOption.module.scss';
import PropTypes from 'prop-types';
import { formatPrice } from '../../../utils/formatPrice';
import OrderOptionIcon from './OrderOptionIcons';

const OrderOptionNumber = ({currentValue, limits,  price, setOptionValue}) => (
  <div className={styles.inputSmall}>
    <input max={limits.max}
      min={limits.min}
      onChange={(event) => setOptionValue(event.currentTarget.value)}
      value={currentValue}
      type='number' />
    {formatPrice(price)}
  </div>
);

OrderOptionNumber.propTypes = {
  currentValue: PropTypes.number,
  limits: PropTypes.object,
  price: PropTypes.string,
  setOptionValue: PropTypes.func,
};

export default OrderOptionNumber;