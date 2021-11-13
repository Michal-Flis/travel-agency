import React from 'react';
import {Col, Row, Grid} from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import OrderSummary from '../OrderSummary/OrderSummary';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption';
import { formatPrice } from '../../../utils/formatPrice';
import settings from '../../../data/settings';
import { calculateTotal } from '../../../utils/calculateTotal';
import Button from '../../common/Button/Button';

const sendOrder = (options, tripCost, countryName, tripId, tripName) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...options,
    totalCost,
    countryName,
    tripId,
    tripName,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function(response){
      return response.json();
    }).then(function(parsedResponse){
      console.log('parsedResponse', parsedResponse);
    });
};

const checkOrderInfo = (props) => {
  if (props.name && props.contact) {
    sendOrder(props.name, props.contact, props.cost, props.countryName, props.options, props.tripId, props.tripName);
    window.alert(settings.popupMessages.orderConfirm);
  }
  else {
    window.alert(settings.popupMessages.orderIncomplete);    
  }
};

const OrderFrom = (props) => (
  <Grid>
    <Row>
      {pricing.map((pricingOption) => (
        <Col md={3} key={pricingOption.id}>
          <OrderOption key={pricing.id}
            currentValue={props.options[pricingOption.id]}
            setOrderOption={props.setOrderOption}
            {...pricingOption}
          />
        </Col>
      ))}
      <Col xs={12}>
        <OrderSummary options={props.options} cost={props.tripCost} />
      </Col>
      <Button onClick={() => checkOrderInfo(props.options, props.tripCost, props.countryName, props.tripId, props.tripName)}>Order now!</Button>
    </Row>
  </Grid>
);

OrderFrom.propTypes = {
  cost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
  tripCost: PropTypes.string,
  countryName: PropTypes.string,
  tripId: PropTypes.string,
  tripName: PropTypes.string,
};

export default OrderFrom;