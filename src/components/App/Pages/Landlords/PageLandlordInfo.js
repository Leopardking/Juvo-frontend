import React from 'react';
import { Modal, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import Datetime from 'react-datetime';
import moment from 'moment';

const PageLandlordInfo = ({
  user = {},
  PageLandlord = {},
  handleClose,
  handlePageLandlordSubmit,
  handlePageLandlordChange,
  handlePageLandlordDateChange,
  paymentTypes = {
    1: 'Standing Order',
    2: 'Housing Benefit',
    3: 'BACS',
    4: 'Cash',
    5: 'Credit/Debit Card',
    6: 'Direct Debit',
  },
}) => (
  <Modal show onHide={handleClose} className="jobs">
    <Modal.Header closeButton>
      <Modal.Title>Landlords</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form onSubmit={handlePageLandlordSubmit}>
        <FormGroup className="clearfix">
          <Col componentClass={ControlLabel} sm={3}>
            Amount
          </Col>
          <Col sm={3}>
            <FormControl
              value={PageLandlord.amount || ''}
              name="amount"
              type="number"
              step="0.1"
              onChange={handlePageLandlordChange}
            />
          </Col>
          <Col sm={2} componentClass={ControlLabel}>
            Date Received
          </Col>
          <Col sm={4}>
            <Datetime
              inputProps={{ name: 'date_received', placeholder: 'Date Received' }}
              value={PageLandlord.date_received ? moment(PageLandlord.date_received) : ''}
              timeFormat={false}
              dateFormat={user.dateDisplayFormat}
              onChange={handlePageLandlordDateChange}
              closeOnSelect
            />
          </Col>
        </FormGroup>
        <FormGroup className="clearfix">
          <Col componentClass={ControlLabel} sm={3}>
            Payment Type
          </Col>
          <Col sm={9}>
            <FormControl
              value={PageLandlord.payment_type_id || ''}
              name="payment_type_id"
              componentClass="select"
              onChange={handlePageLandlordChange}
            >
              <option value="" disabled>Select Payment Type</option>
              {Object.keys(paymentTypes).map(key => (
                <option key={key} value={key}>{paymentTypes[key]}</option>
              ))}
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup className="clearfix">
          <Col componentClass={ControlLabel} sm={3}>
            Description
          </Col>
          <Col sm={9}>
            <FormControl
              name="description"
              type="text"
              value={PageLandlord.description || ''}
              onChange={handlePageLandlordChange}
            />
          </Col>
        </FormGroup>
        <FormGroup className="clearfix">
          <Col sm={2} smOffset={10}>
            <Button bsStyle="primary" type="submit">{PageLandlord.id ? 'Save' : 'Create'}</Button>
          </Col>
        </FormGroup>
      </form>
    </Modal.Body>
  </Modal>
);

PageLandlordInfo.propTypes = {
  user: React.PropTypes.object,
  PageLandlord: React.PropTypes.object,
  handleClose: React.PropTypes.func.isRequired,
  handlePageLandlordSubmit: React.PropTypes.func.isRequired,
  handlePageLandlordChange: React.PropTypes.func.isRequired,
  handlePageLandlordDateChange: React.PropTypes.func.isRequired,
};

export default PageLandlordInfo;
