import React from 'react';
import { Grid, Panel, Row, Col, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import moment from 'moment';
import Datetime from 'react-datetime';
import { Link } from 'react-router';
import { StickyContainer, Sticky } from 'react-sticky';
import scrollToComponent from 'react-scroll-to-component';
import juvo from 'juvo';
import { momentFormats } from 'common/utils';
import FollowUpManagement from 'containers/FollowUpManagement';
import CollapsiblePanel from 'components/Common/CollapsiblePanel';
import NoDataFound from 'components/Common/NoDataFound';
import UploadManager from '../../Common/UploadManager';
import LeftNavLink from '../../Common/LeftNavLink';
import MainForm from './MainForm';
import PagesJob from './PagesJob';
import PagesDisbursement from './PagesDisbursement';
import PagesRent from './PagesRent';
import PagesStatement from './PagesStatement';

class PagesInfo extends React.Component {
  state = {
    active: 'Details',
  }
  panels = {}
  handleBasicClick = (element, title) => {
    Object.values(this.panels).forEach(panel => panel.collapse());
    element.expand();
    this.setState({ active: title }, () => {
      setTimeout(() => {
        scrollToComponent(element, {
          offset: -50,
          align: 'top',
          duration: 300
        });
      }, 300);
    });
  }
  render() {
    const {
      printValues = {},
      activity = {},
      user = {},
      documents = [],
      Pages = {},
      PagesJobs = {},
      disbursments = {},
      PagesRents = {},
      PagesGenerateRent = {},
      PagesAccountOverview = {},
      PagesStatements = {},
      PagesStatement = {},
      PagesStatementTemplates = {},
      PagesStatementTypes = {
        1: 'Landlord',
        2: 'Tenant',
      },
      types = {
        4: 'Inspection',
        5: 'Notification',
        6: 'Section 21',
      },
      getPagesJobInfo,
      deletePagesJob,
      addPagesJob,
      addDisbursement,
      getDisbursementInfo,
      deleteDisbursement,
      getNextRents,
      getPreviousRents,
      getNextDisbursments,
      getPreviousDisbursments,
      getNextJobs,
      getPreviousJobs,
      addPagesRent,
      handlePagesRentStartDateChange,
      handlePagesRentEndDateChange,
      handleGenerateRentSubmit,
      getPagesRentInfo,
      deletePagesRent,
      getPagesPayments,
      handlePagesStatementNext,
      handlePagesStatementPrevious,
      // getPagesStatementInfo,
      handlePagesStatementChange,
      handlePagesStatementStartDateChange,
      handlePagesStatementEndtDateChange,
      handlePagesStatementSubmit,
      deletePagesStatement,
      // getPagesStatementTemplate,
      handleTemplateDownload,
      getPagesLandlords,
  } = this.props;
    const dateDisplayFormat = user.dateDisplayFormat || momentFormats['d/m/Y'];
    const { active } = this.state;
    return (
      <section className="Pages">
        <Grid fluid className="properties-page create">
          <StickyContainer>
            <header>
              <div>
                <div>
                  <Row>
                    <Col xs={12} sm={5} md={3} className="modals">
                      <Button bsStyle="primary" onClick={this.props.handleNotesClick}>Notes</Button>
                      <Button bsStyle="primary" onClick={this.props.handleAccountClick}>Account</Button>
                    </Col>
                    <Col xs={12} sm={7} md={9}>
                      <form onSubmit={this.props.handlePrintSubmit} className="row mt5">
                        <Col xs={12} sm={6} md={4}>
                          <FormControl
                            componentClass="select"
                            name="template_id"
                            value={printValues.template_id || ''}
                            onChange={this.props.handlePrintChange}
                          >
                            <option value="" disabled>Select template</option>
                            {this.props.printTemplates && this.props.printTemplates.map(template => (
                              <option key={template.id} value={template.id}>{template.name}</option>
                            ))}
                          </FormControl>
                        </Col>
                        <Col xs={12} sm={6} md={3}>
                          <FormControl
                            componentClass="select"
                            name="format"
                            value={printValues.format || ''}
                            onChange={this.props.handlePrintChange}
                          >
                            <option value="" disabled>Select format</option>
                            <option value="pdf">PDF</option>
                            <option value="doc">DOC</option>
                          </FormControl>
                        </Col>
                        <Col xs={12} sm={6} smOffset={2} mdOffset={0} md={3}>
                          <FormGroup className="form-checkbox col-xs-3 col-lg-3">
                            <input
                              id="sendViaEmail"
                              type="checkbox"
                              checked={printValues.sendEmail || false}
                              name="sendEmail"
                              onChange={this.props.handlePrintChange}
                            />
                            <label htmlFor="sendViaEmail"><span>send via email?</span></label>
                          </FormGroup>
                        </Col>
                        <Col xs={6} sm={4} md={2}>
                          <Button bsStyle="primary" type="submit" className="small" disabled={!(printValues.template_id && printValues.format)}>{this.props.loading && this.props.loading.print && <i className="fa fa-circle-o-notch fa-spin" />} Print</Button>
                        </Col>
                      </form>
                    </Col>
                  </Row>
                </div>
                <Row>
                  <Col xs={12} sm={12}>
                    <p><span>Property</span>{Pages.property && (<Link to={juvo.properties.infoLink(Pages.property.id)}>{Pages.property.address}</Link>)}</p>
                    <p><span>Tenants</span>{Pages.tenant && Pages.tenant.map(tenant => (<Link key={tenant.id} to={juvo.contacts.infoLink(tenant.id)}>{tenant.name}</Link>))}</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} className="amounts">
                    <span>Rent Due: <b>{user.currency}{PagesAccountOverview.rent_due || 0}</b></span>
                    <span>Landlord Due: <b>{user.currency}{PagesAccountOverview.landlord_due || 0}</b></span>
                    <span>Next Rent Due: <b>{PagesAccountOverview.next_rent_due_date ? moment(PagesAccountOverview.next_rent_due_date).format(user && user.dateDisplayFormat) : 'N/A'}</b></span>
                    <span>Credit: <b>{user.currency}{PagesAccountOverview.credit || 0}</b></span>
                    <span>Debit: <b>{user.currency}{PagesAccountOverview.debit || 0}</b></span>
                    <span>Balance: <b>{user.currency}{PagesAccountOverview.balance || 0}</b></span>
                  </Col>
                </Row>
              </div>
            </header>
            <Row className="propertyContent">
              <Col sm={2} xsHidden>
                <Sticky topOffset={-50} stickyStyle={{ top: 50 }}>
                  <ul className="propertyInfoNav">
                    <LeftNavLink scrollTo={this.handleBasicClick} title="Details" element={this.panels.basicInfo} active={active === 'Details'} />
                    <LeftNavLink scrollTo={this.handleBasicClick} title="Statements" element={this.panels.statements} active={active === 'Statements'} />
                    <LeftNavLink scrollTo={this.handleBasicClick} title="Rents" element={this.panels.rents} active={active === 'Rents'} />
                    <LeftNavLink scrollTo={this.handleBasicClick} title="Disbursements" element={this.panels.disbursements} active={active === 'Disbursements'} />
                    <LeftNavLink scrollTo={this.handleBasicClick} title="Jobs" element={this.panels.jobs} active={active === 'Jobs'} />
                    <LeftNavLink scrollTo={this.handleBasicClick} title="Management" element={this.panels.followUp} active={active === 'Management'} />
                    <LeftNavLink scrollTo={this.handleBasicClick} title="Documents" element={this.panels.documents} active={active === 'Documents'} />
                    <LeftNavLink scrollTo={this.handleBasicClick} title="Activity" element={this.panels.activity} active={active === 'Activity'} />
                  </ul>
                </Sticky>
              </Col>
              <Col xs={12} sm={10}>
                <Panel>
                  <CollapsiblePanel
                    ref={(b) => { this.panels.basicInfo = b; }}
                    title="Details"
                    className="propertyInfo"
                    default
                  >
                    <MainForm {...this.props} />
                  </CollapsiblePanel>
                  <CollapsiblePanel
                    ref={(b) => { this.panels.statements = b; }}
                    title="Statements"
                    className="propertyInfo"
                    default={false}
                  >
                    <section className="followUp">
                      <form onSubmit={handlePagesStatementSubmit}>
                        <Row>
                          <Col sm={6}>
                            <FormGroup>
                              <Col componentClass={ControlLabel} sm={3}>
                                Type
                              </Col>
                              <Col sm={9}>
                                <FormControl
                                  componentClass="select"
                                  name="type_id"
                                  value={PagesStatement.type_id || ''}
                                  onChange={handlePagesStatementChange}
                                >
                                  <option value="" disabled>Type</option>
                                  {Object.keys(PagesStatementTypes).map(key => (
                                    <option key={key} value={key}>{PagesStatementTypes[key]}</option>
                                  ))}
                                </FormControl>
                              </Col>
                            </FormGroup>
                          </Col>
                          {PagesStatement.type_id === '2' ? (
                            <Col sm={6}>
                              <FormGroup>
                                <Col componentClass={ControlLabel} sm={3}>
                                  Tenant
                                </Col>
                                <Col sm={9}>
                                  <FormControl
                                    componentClass="select"
                                    name="people_id"
                                    value={PagesStatement.people_id || ''}
                                    onChange={handlePagesStatementChange}
                                  >
                                    <option value="" disabled>Select tenant</option>
                                    {Pages.tenant && Pages.tenant.map(tenant => (
                                      <option key={tenant.id} value={tenant.id}>{tenant.name}</option>
                                    ))}
                                  </FormControl>
                                </Col>
                              </FormGroup>
                            </Col>
                          ) : null}
                          <Col sm={6}>
                            <FormGroup>
                              <Col componentClass={ControlLabel} sm={3}>
                                Template
                              </Col>
                              <Col sm={9}>
                                <FormControl
                                  componentClass="select"
                                  name="template_id"
                                  value={PagesStatement.template_id || ''}
                                  onChange={handlePagesStatementChange}
                                >
                                  <option value="" disabled>Template</option>
                                  {Object.keys(PagesStatementTemplates).map(key => (
                                    <option key={key} value={PagesStatementTemplates[key].id}>{PagesStatementTemplates[key].name}</option>
                                  ))}
                                </FormControl>
                              </Col>
                            </FormGroup>
                          </Col>
                          <Col sm={6}>
                            <FormGroup>
                              <Col componentClass={ControlLabel} sm={3}>
                                Start Date
                              </Col>
                              <Col sm={9}>
                                <Datetime
                                  dateFormat={user && user.dateDisplayFormat}
                                  inputprops={{ name: 'start_date', placeholder: 'Start date' }}
                                  value={PagesStatement.start_date ? moment(PagesStatement.start_date) : ''}
                                  onChange={handlePagesStatementStartDateChange}
                                  closeOnSelect
                                  timeFormat={false}
                                />
                              </Col>
                            </FormGroup>
                          </Col>
                          <Col sm={6}>
                            <FormGroup>
                              <Col componentClass={ControlLabel} sm={3}>
                                End Date
                              </Col>
                              <Col sm={9}>
                                <Datetime
                                  dateFormat={user && user.dateDisplayFormat}
                                  inputprops={{ name: 'end_date', placeholder: 'End date' }}
                                  value={PagesStatement.end_date ? moment(PagesStatement.end_date) : ''}
                                  onChange={handlePagesStatementEndtDateChange}
                                  closeOnSelect
                                  timeFormat={false}
                                />
                              </Col>
                            </FormGroup>
                          </Col>
                          <Col sm={2}>
                            <FormGroup>
                              <Col sm={12}>
                                <Button bsStyle="success" type="submit">Add statement</Button>
                              </Col>
                            </FormGroup>
                          </Col>
                        </Row>
                      </form>
                      <Row className="managements">
                        <Panel className="table">
                          <Row className="table-header">
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
                          {!PagesStatements.data || PagesStatements.data.length === 0 ? <NoDataFound /> :
                            PagesStatements.data.map((statement, index) => (
                              <PagesStatement
                                key={statement.id}
                                index={index}
                                type={PagesStatementTypes[statement.type_id]}
                                statement={statement}
                                dateDisplayFormat={dateDisplayFormat}
                                deletePagesStatement={deletePagesStatement}
                                handleTemplateDownload={handleTemplateDownload}
                                setDocument={this.props.setDocument}
                              />
                            )
                          )}
                          {(PagesStatements.current_page && PagesStatements.current_page < PagesStatements.total_page) ? (
                            <Button bsStyle="link" onClick={handlePagesStatementNext}>Next...</Button>
                          ) : null}
                          {(PagesStatements.current_page && PagesStatements.current_page > 1) ? (
                            <Button bsStyle="link" onClick={handlePagesStatementPrevious}>Previous...</Button>
                          ) : null}
                        </Panel>
                      </Row>
                    </section>
                  </CollapsiblePanel>
                  <CollapsiblePanel
                    ref={(b) => { this.panels.rents = b; }}
                    title="Rents"
                    className="propertyInfo"
                    default={false}
                  >
                    <section className="followUp">
                      {PagesRents.data && PagesRents.data.length <= 0 ? (
                        <form onSubmit={handleGenerateRentSubmit}>
                          <Row>
                            <Col sm={5}>
                              <FormGroup>
                                <Col sm={3} componentClass={ControlLabel}>
                                  Start Date
                                </Col>
                                <Col sm={9}>
                                  <Datetime
                                    inputprops={{ name: 'start_date', placeholder: 'Start date' }}
                                    value={PagesGenerateRent.start_date ? moment(PagesGenerateRent.start_date) : ''}
                                    timeFormat={false}
                                    dateFormat={user.dateDisplayFormat}
                                    onChange={handlePagesRentStartDateChange}
                                    closeOnSelect
                                  />
                                </Col>
                              </FormGroup>
                            </Col>
                            <Col sm={5}>
                              <FormGroup>
                                <Col sm={3} componentClass={ControlLabel}>
                                  End Date
                                </Col>
                                <Col sm={9}>
                                  <Datetime
                                    inputprops={{ name: 'end_date', placeholder: 'End date' }}
                                    value={PagesGenerateRent.end_date ? moment(PagesGenerateRent.end_date) : ''}
                                    timeFormat={false}
                                    dateFormat={user.dateDisplayFormat}
                                    onChange={handlePagesRentEndDateChange}
                                    closeOnSelect
                                  />
                                </Col>
                              </FormGroup>
                            </Col>
                            <Col sm={2}>
                              <FormGroup>
                                <Button bsStyle="success" type="submit">Generate</Button>
                              </FormGroup>
                            </Col>
                          </Row>
                        </form>
                      ) : (
                        <Row>
                          <Col sm={4}>
                            <Col sm={12}>
                              <Button bsStyle="success" bsSize="xsmall" onClick={addPagesRent}>Create Rent Demand</Button>
                            </Col>
                          </Col>
                          <Col sm={4}>
                            <Button bsStyle="warning" bsSize="xsmall" onClick={getPagesPayments}>Rental Payments</Button>
                          </Col>
                          <Col sm={4}>
                            <Button bsStyle="warning" bsSize="xsmall" onClick={getPagesLandlords}>Landlord Payments</Button>
                          </Col>
                        </Row>
                      )}
                      <Row className="managements">
                        <Panel className="table">
                          <Row className="table-header">
                            <Col xs={2} sm={2}>
                              <div className="column">Date</div>
                            </Col>
                            <Col xs={2} sm={2}>
                              <div className="column">Amount</div>
                            </Col>
                            <Col xs={2} sm={3}>
                              <div className="column">Management Fee Due</div>
                            </Col>
                          </Row>
                          {!PagesRents.data || PagesRents.data.length === 0 ? <NoDataFound /> :
                            PagesRents.data.map((rent, index) => (
                              <PagesRent
                                key={rent.id}
                                index={index}
                                rent={rent}
                                dateDisplayFormat={dateDisplayFormat}
                                getPagesRentInfo={getPagesRentInfo}
                                deletePagesRent={deletePagesRent}
                                user={user}
                              />
                            )
                          )}
                          {(PagesRents.current_page && PagesRents.current_page < PagesRents.total_page) ? (
                            <Button bsStyle="link" onClick={getNextRents}>Next...</Button>
                          ) : null}
                          {(PagesRents.current_page && PagesRents.current_page > 1) ? (
                            <Button bsStyle="link" onClick={getPreviousRents}>Previous...</Button>
                          ) : null}
                        </Panel>
                      </Row>
                    </section>
                  </CollapsiblePanel>
                  <CollapsiblePanel
                    ref={(b) => { this.panels.disbursements = b; }}
                    title="Disbursements"
                    className="propertyInfo"
                    default={false}
                  >
                    <section className="followUp">
                      <Row>
                        <Col sm={12}>
                          <FormGroup>
                            <Col sm={12}>
                              <Button bsStyle="success" bsSize="xsmall" onClick={addDisbursement}>Add Disbursement</Button>
                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="managements">
                        <Panel className="table">
                          <Row className="table-header">
                            <Col xs={1} sm={1}>
                              <div className="column">VAT</div>
                            </Col>
                            <Col xs={2} sm={2}>
                              <div className="column">Date</div>
                            </Col>
                            <Col xs={2} sm={2}>
                              <div className="column">Amount</div>
                            </Col>
                            <Col xs={6} sm={6}>
                              <div className="column">Description</div>
                            </Col>
                          </Row>
                          {!disbursments.data || disbursments.data.length === 0 ? <NoDataFound /> :
                            disbursments.data.map((disbursement, index) => (
                              <PagesDisbursement
                                key={disbursement.id}
                                index={index}
                                disbursement={disbursement}
                                dateDisplayFormat={dateDisplayFormat}
                                getDisbursementInfo={getDisbursementInfo}
                                deleteDisbursement={deleteDisbursement}
                                user={user}
                              />
                            )
                          )}
                          {(disbursments.current_page && disbursments.current_page < disbursments.total_page) ? (
                            <Button bsStyle="link" onClick={getNextDisbursments}>Next...</Button>
                          ) : null}
                          {(disbursments.current_page && disbursments.current_page > 1) ? (
                            <Button bsStyle="link" onClick={getPreviousDisbursments}>Previous...</Button>
                          ) : null}
                        </Panel>
                      </Row>
                    </section>
                  </CollapsiblePanel>
                  <CollapsiblePanel
                    ref={(b) => { this.panels.jobs = b; }}
                    title="Jobs"
                    className="propertyInfo"
                    default={false}
                  >
                    <section className="followUp">
                      <Row>
                        <Col sm={12}>
                          <Col sm={12}>
                            <Button bsStyle="success" bsSize="xsmall" onClick={addPagesJob}>Add Job</Button>
                          </Col>
                        </Col>
                      </Row>
                      <Row className="managements">
                        <Panel className="table">
                          <Row className="table-header">
                            <Col xs={1} sm={1}>
                              <div className="column">Complete</div>
                            </Col>
                            <Col xs={2} sm={2}>
                              <div className="column">Date</div>
                            </Col>
                            <Col xs={2} sm={2}>
                              <div className="column">Price</div>
                            </Col>
                            <Col xs={6} sm={6}>
                              <div className="column">Description</div>
                            </Col>
                          </Row>
                          {!PagesJobs.data || PagesJobs.data.length === 0 ? <NoDataFound /> :
                            PagesJobs.data.map((job, index) => (
                              <PagesJob
                                key={job.id}
                                index={index}
                                job={job}
                                dateDisplayFormat={dateDisplayFormat}
                                getPagesJobInfo={getPagesJobInfo}
                                deletePagesJob={deletePagesJob}
                                user={user}
                              />
                            )
                          )}
                          {(PagesJobs.current_page && PagesJobs.current_page < PagesJobs.total_page) ? (
                            <Button bsStyle="link" onClick={getNextJobs}>Next...</Button>
                          ) : null}
                          {(PagesJobs.current_page && PagesJobs.current_page > 1) ? (
                            <Button bsStyle="link" onClick={getPreviousJobs}>Previous...</Button>
                          ) : null}
                        </Panel>
                      </Row>
                    </section>
                  </CollapsiblePanel>
                  <CollapsiblePanel
                    ref={(b) => { this.panels.followUp = b; }}
                    title="Management"
                    className="propertyInfo"
                    default={false}
                  >
                    {Pages && <FollowUpManagement element={Pages.id} category={4} types={types} />}
                  </CollapsiblePanel>
                  <CollapsiblePanel
                    id="Documents"
                    ref={(b) => { this.panels.documents = b; }}
                    title="Documents"
                    className="propertyInfo"
                    default={false}
                  >
                    <UploadManager
                      handleDocumentUpload={this.props.handleDocumentUpload}
                      handleDocumentDelete={this.props.handleDocumentDelete}
                      handleDocumentDownload={this.props.handleDocumentDownload}
                      documents={documents}
                      uploadDocumentProgress={this.props.uploadDocumentProgress}
                      setDocument={this.props.setDocument}
                    />
                  </CollapsiblePanel>
                  <CollapsiblePanel
                    ref={(b) => { this.panels.activity = b; }}
                    title="Activity"
                    className="propertyInfo"
                    default={false}
                  >
                    <Row className="appointments">
                      <Panel className="table">
                        <Row className="table-header">
                          <Col xs={2} sm={2}>
                            <div className="column">Date</div>
                          </Col>
                          <Col xs={2} sm={2}>
                            <div className="column">Description</div>
                          </Col>
                        </Row>
                        {!activity || !activity.array || activity.array.length === 0 ? <NoDataFound /> :
                          activity.array.map(action => (
                            <Row key={action.id} className="table-row">
                              <Col sm={2}>{moment(action.date).format(dateDisplayFormat)}</Col>
                              <Col sm={9} dangerouslySetInnerHTML={{ __html: action.description || '' }} />
                            </Row>
                          )
                        )}
                      </Panel>
                    </Row>
                  </CollapsiblePanel>
                </Panel>
              </Col>
            </Row>
          </StickyContainer>
        </Grid>
      </section>
    );
  }
}

PagesInfo.propTypes = {
  loading: React.PropTypes.object,
  printValues: React.PropTypes.object,
  printTemplates: React.PropTypes.array,
  documents: React.PropTypes.array,
  PagesJobs: React.PropTypes.object,
  PagesRents: React.PropTypes.object,
  PagesGenerateRent: React.PropTypes.object,
  disbursments: React.PropTypes.object,
  PagesAccountOverview: React.PropTypes.object,
  PagesStatements: React.PropTypes.object,
  PagesStatement: React.PropTypes.object,
  PagesStatementTemplates: React.PropTypes.array,
  handlePagesStatementNext: React.PropTypes.func.isRequired,
  handlePagesStatementPrevious: React.PropTypes.func.isRequired,
  // getPagesStatementInfo: React.PropTypes.func.isRequired,
  handlePagesStatementChange: React.PropTypes.func.isRequired,
  handlePagesStatementStartDateChange: React.PropTypes.func.isRequired,
  handlePagesStatementEndtDateChange: React.PropTypes.func.isRequired,
  handlePagesStatementSubmit: React.PropTypes.func.isRequired,
  deletePagesStatement: React.PropTypes.func.isRequired,
  // getPagesStatementTemplate: React.PropTypes.func.isRequired,
  handleTemplateDownload: React.PropTypes.func.isRequired,
  handlePrintSubmit: React.PropTypes.func.isRequired,
  handlePrintChange: React.PropTypes.func.isRequired,
  handleNotesClick: React.PropTypes.func.isRequired,
  getPagesJobInfo: React.PropTypes.func.isRequired,
  addPagesJob: React.PropTypes.func.isRequired,
  deletePagesJob: React.PropTypes.func.isRequired,
  addDisbursement: React.PropTypes.func.isRequired,
  getDisbursementInfo: React.PropTypes.func.isRequired,
  deleteDisbursement: React.PropTypes.func.isRequired,
  getNextRents: React.PropTypes.func.isRequired,
  getPreviousRents: React.PropTypes.func.isRequired,
  getNextDisbursments: React.PropTypes.func.isRequired,
  getPreviousDisbursments: React.PropTypes.func.isRequired,
  getNextJobs: React.PropTypes.func.isRequired,
  getPreviousJobs: React.PropTypes.func.isRequired,
  addPagesRent: React.PropTypes.func.isRequired,
  handleGenerateRentSubmit: React.PropTypes.func.isRequired,
  handlePagesRentEndDateChange: React.PropTypes.func.isRequired,
  handlePagesRentStartDateChange: React.PropTypes.func.isRequired,
  getPagesRentInfo: React.PropTypes.func.isRequired,
  deletePagesRent: React.PropTypes.func.isRequired,
  getPagesPayments: React.PropTypes.func.isRequired,
  handleAccountClick: React.PropTypes.func.isRequired,
  getPagesLandlords: React.PropTypes.func.isRequired,
};

export default PagesInfo;
