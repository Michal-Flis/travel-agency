import React from 'react';
import {Col, Row, Grid} from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import OrderSummary from '../OrderSummary/OrderSummary';

const OrderFrom = (props) => (
  <Grid>
    <Row>
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