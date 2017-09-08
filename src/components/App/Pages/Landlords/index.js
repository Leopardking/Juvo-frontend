import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import Pagination from 'components/Common/Pagination';
import NoDataFound from 'components/Common/NoDataFound';
import { momentFormats } from 'common/utils';
import juvo from 'juvo';
import Landlord from './Landlord';

const LandlordsComponent = ({
  rents = {},
  user = {},
  deletePageRent,
  getPageRentInfo,
  getPagePayments,
  getPageLandlordsStandalone,
  confirmPageRent,
  handleModalClose,
  getPageStatements,
  getPageStatementTemplate,
  setSelectedRent,
}) => (
  <Grid fluid className="contacts-page">
    <div className="contacts-content panel panel-box">
      <Col className="breadcrumb">
        <div>
          <Link to={juvo.Pages.index}>Pages</Link>
          <span> / Landlord Payments</span>
        </div>
        <div className="total">
          <span>Total: {rents.total}</span>
        </div>
      </Col>
      <div className="client" />
    </div>
    <div className="contacts-content list">
      <Row className="table-row table-header">
        <Col sm={2}>
          <div className="column">Due Date</div>
        </Col>
        <Col sm={2}>
          <div className="column">Page</div>
        </Col>
        <Col sm={3}>
          <div className="column">Landlord</div>
        </Col>
        <Col sm={2}>
          <div className="column">Amount</div>
        </Col>
        <Col sm={3}>
          <div className="column">Fee</div>
        </Col>
      </Row>
      {!rents.data || rents.data.length === 0 ? <NoDataFound /> :
        rents.data.map((item, index) => (
          <Landlord
            key={item.id}
            rent={item}
            user={user}
            index={index}
            dateDisplayFormat={user.dateDisplayFormat || momentFormats['d/m/Y']}
            deletePageRent={deletePageRent}
            getPageRentInfo={getPageRentInfo}
            confirmPageRent={confirmPageRent}
            getPagePayments={getPagePayments}
            getPageLandlords={getPageLandlordsStandalone}
            handleClose={handleModalClose}
            getPageStatements={getPageStatements}
            getPageStatementTemplate={getPageStatementTemplate}
            setSelectedRent={setSelectedRent}
          />
        )
      )}
    </div>
    {rents && rents.total ? (
      <Pagination pagination={rents} route={juvo.Pages.landlords.pageLink} />
    ) : null}
  </Grid>
);

LandlordsComponent.propTypes = {
  rents: React.PropTypes.object,
  user: React.PropTypes.object,
  deletePageRent: React.PropTypes.func.isRequired,
  getPageRentInfo: React.PropTypes.func.isRequired,
  getPagePayments: React.PropTypes.func.isRequired,
  getPageLandlordsStandalone: React.PropTypes.func.isRequired,
  confirmPageRent: React.PropTypes.func.isRequired,
  handleModalClose: React.PropTypes.func.isRequired,
  getPageStatements: React.PropTypes.func.isRequired,
  getPageStatementTemplate: React.PropTypes.func.isRequired,
  setSelectedRent: React.PropTypes.func.isRequired,
};

export default LandlordsComponent;
