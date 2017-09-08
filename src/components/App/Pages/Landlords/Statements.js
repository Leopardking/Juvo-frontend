import React from 'react';
import { Grid, Row, Col, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Link } from 'react-router';
import Datetime from 'react-datetime';
import moment from 'moment';
import juvo from 'juvo';
import NoDataFound from 'components/Common/NoDataFound';
import pageStatement from '../PageStatement';

export default ({
  PageStatements = {},
  PageStatementTypes = {
    1: 'Landlord',
    2: 'Tenant',
  },
  dateDisplayFormat,
  Page = {},
  pageStatement = {},
  PageStatementTemplates = {},
  deletePageStatement,
  handleTemplateDownload,
  setDocument,
  handlePageStatementNext,
  handlePageStatementPrevious,
  handlePageStatementSubmit,
  handlePageStatementChange,
  handlePageStatementStartDateChange,
  handlePageStatementEndtDateChange,
}) => (
  <Grid fluid className="contacts-page">
    <div className="contacts-content panel panel-box">
      <Col className="breadcrumb">
        <div>
          <Link to={juvo.Pages.index}>Pages</Link>
          <span> / </span>
          <Link to={juvo.Pages.landlords.index}>Landlord Payments</Link>
          <span> / Landlord Statements</span>
        </div>
        <div className="total">
          <span>Total: {PageStatements.total}</span>
        </div>
      </Col>
      <div className="client" />
    </div>
    <div className="contacts-content list">
      <section className="landlordStatements">
        <form onSubmit={handlePageStatementSubmit}>
          <Row>
            <Col sm={6} lg={PageStatement.type_id === '2' ? 4 : 3}>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                  Type
                </Col>
                <Col sm={9}>
                  <FormControl
                    componentClass="select"
                    name="type_id"
                    value={PageStatement.type_id || ''}
                    onChange={handlePageStatementChange}
                  >
                    <option value="" disabled>Type</option>
                    {Object.keys(PageStatementTypes).map(key => (
                      <option key={key} value={key}>{PageStatementTypes[key]}</option>
                    ))}
                  </FormControl>
                </Col>
              </FormGroup>
            </Col>
            {PageStatement.type_id === '2' ? (
              <Col sm={6} lg={4}>
                <FormGroup>
                  <Col componentClass={ControlLabel} sm={3}>
                    Tenant
                  </Col>
                  <Col sm={9}>
                    <FormControl
                      componentClass="select"
                      name="people_id"
                      value={PageStatement.people_id || ''}
                      onChange={handlePageStatementChange}
                    >
                      <option value="" disabled>Select tenant</option>
                      {Page.tenant && Page.tenant.map(tenant => (
                        <option key={tenant.id} value={tenant.id}>{tenant.name}</option>
                      ))}
                    </FormControl>
                  </Col>
                </FormGroup>
              </Col>
            ) : null}
            <Col sm={6} lg={PageStatement.type_id === '2' ? 4 : 3}>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                  Template
                </Col>
                <Col sm={9}>
                  <FormControl
                    componentClass="select"
                    name="template_id"
                    value={PageStatement.template_id || ''}
                    onChange={handlePageStatementChange}
                  >
                    <option value="" disabled>Template</option>
                    {Object.keys(PageStatementTemplates).map(key => (
                      <option key={key} value={PageStatementTemplates[key].id}>{PageStatementTemplates[key].name}</option>
                    ))}
                  </FormControl>
                </Col>
              </FormGroup>
            </Col>
            <Col sm={6} lg={PageStatement.type_id === '2' ? 4 : 3}>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                  Start Date
                </Col>
                <Col sm={9}>
                  <Datetime
                    dateFormat={dateDisplayFormat}
                    inputprops={{ name: 'start_date', placeholder: 'Start date' }}
                    value={PageStatement.start_date ? moment(PageStatement.start_date) : ''}
                    onChange={handlePageStatementStartDateChange}
                    closeOnSelect
                    timeFormat={false}
                  />
                </Col>
              </FormGroup>
            </Col>
            <Col sm={6} lg={PageStatement.type_id === '2' ? 4 : 3}>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                  End Date
                </Col>
                <Col sm={9}>
                  <Datetime
                    dateFormat={dateDisplayFormat}
                    inputprops={{ name: 'end_date', placeholder: 'End date' }}
                    value={PageStatement.end_date ? moment(PageStatement.end_date) : ''}
                    onChange={handlePageStatementEndtDateChange}
                    closeOnSelect
                    timeFormat={false}
                  />
                </Col>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={2}>
              <FormGroup>
                <Col sm={12}>
                  <Button bsStyle="success" type="submit">Add statement</Button>
                </Col>
              </FormGroup>
            </Col>
          </Row>
        </form>
      </section>
      <Row className="table-row table-header">
        <Col xs={2} sm={2}>
          <div className="column">Type</div>
        </Col>
        <Col xs={2} sm={2}>
          <div className="column">Start Date</div>
        </Col>
        <Col xs={2} sm={3}>
          <div className="column">End Date</div>
        </Col>
      </Row>
      {!PageStatements.data || PageStatements.data.length === 0 ? <NoDataFound /> :
        PageStatements.data.map(statement => (
          <PageStatement
            key={statement.id}
            standalone
            type={PageStatementTypes[statement.type_id]}
            statement={statement}
            dateDisplayFormat={dateDisplayFormat}
            deletePageStatement={deletePageStatement}
            handleTemplateDownload={handleTemplateDownload}
            setDocument={setDocument}
          />
        )
        )}
      {(PageStatements.current_page && PageStatements.current_page < PageStatements.total_page) ? (
        <Button bsStyle="link" onClick={handlePageStatementNext}>Next...</Button>
      ) : null}
      {(PageStatements.current_page && PageStatements.current_page > 1) ? (
        <Button bsStyle="link" onClick={handlePageStatementPrevious}>Previous...</Button>
      ) : null}
    </div>
  </Grid>
);
