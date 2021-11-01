import React from 'react';
import {Col, Row, Grid} from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import OrderSummary from '../OrderSummary/OrderSummary';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption';

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
    </Row>
</Grid>
);

OrderFrom.propTypes = {
    cost: PropTypes.string,
    options: PropTypes.object,
};

export default OrderFrom;