import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import moment from 'moment';
import juvo from 'juvo';

class Account extends Component {
  render() {
    const { account, user = {}, dateDisplayFormat, index } = this.props;

    return (
      <Row className={`contact-row rent ${index % 2 === 0 ? '' : 'even'}`} onClick={this.handleRentSelect}>
        <Col sm={2}>{moment(account.date_received).format(dateDisplayFormat)}</Col>
        <Col sm={2}>{account.Page && account.Page.map(Page => (
          <Link key={Page.id} to={juvo.Pages.infoLink(Page.id)}><img src={Page.thumbnail} alt="error" /></Link>
          ))}
        </Col>
        <Col sm={2}>{account.contact && account.contact.map(tenant => (
          <Link key={tenant.id} to={juvo.contacts.infoLink(tenant.id)}>{tenant.name}</Link>
          ))}
        </Col>
        <Col sm={2}><b>{user.currency}</b>{account.amount}</Col>
        <Col sm={3}>{account.description}</Col>
      </Row>
    );
  }
}

export default Account;
