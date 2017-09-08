import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PageInfoComponent from 'components/App/Pages/PageInfo';
import Notes from 'components/Common/modals/Notes';
import Emails from 'components/Common/modals/Emails';
import PageJobModal from 'components/App/Pages/modals/PageJobModal';
import PageDisbursementModal from 'components/App/Pages/modals/PageDisbursementModal';
import PageRentModal from 'components/App/Pages/modals/PageRentModal';
import PagePaymentModal from 'components/App/Pages/modals/PagePaymentModal';
import PageLandlordModal from 'components/App/Pages/modals/PageLandlordModal';
import PageAccountModal from 'components/App/Pages/modals/PageAccountModal';

import {
  mainFormChange,
  mainFormSubmit,
  handleClientChange,
  handleClientSelect,
  handlePropertyChange,
  handlePropertySelect,
  mainFormAgreedDateChange,
  mainFormStartDateChange,
  mainFormEndDateChange,
  toggleBlockType,
  toggleInlineStyle,
  changeComment,
  clearError,
  handleNotesClick,
  handleModalClose,
  handleNoteCreate,
  handleNoteChange,
  handleNoteDelete,
  handlePrintChange,
  handlePrintSubmit,
  handleDocumentUpload,
  handleDocumentDownload,
  handleDocumentDelete,
  getPageJobs,
  getPageJobInfo,
  addPageJob,
  handlePageJobChange,
  handlePageJobSubmit,
  deletePageJob,
  handleJobClientSelect,
  handleJobClientChange,
  jobScheludeDateChange,
  jobCompletionDateChange,
  getDisbursementInfo,
  addDisbursement,
  handleDisbursementChange,
  handleDisbursementSubmit,
  deleteDisbursement,
  disbursementDateChange,
  getPageRents,
  getNextRents,
  getPreviousRents,
  getNextDisbursments,
  getPreviousDisbursments,
  getNextJobs,
  getPreviousJobs,
  getPageRentInfo,
  addPageRent,
  handlePageRentChange,
  handlePageRentDateChange,
  handlePageRentStartDateChange,
  handlePageRentEndDateChange,
  handleGenerateRentSubmit,
  handlePageRentSubmit,
  deletePageRent,
  getPagePayments,
  handlePagePatmentSubmit,
  handlePagePaymentChange,
  handlePagePaymentDateChange,
  handlePagePaymentNext,
  handlePagePaymentPrevious,
  getPagePaymentInfo,
  deletePagePayment,
  clearPagePayment,
  confirmPageRent,
  handleAccountClick,
  getPageAccountOverview,
  handlePageAccountNext,
  handlePageAccountPrevious,
  getPageAccountInfo,
  handlePageAccountChange,
  handlePageAccountDateChange,
  handlePageAccountSubmit,
  clearPageAccount,
  deletePageAccount,
  handlePageStatementNext,
  handlePageStatementPrevious,
  getPageStatementInfo,
  handlePageStatementChange,
  handlePageStatementStartDateChange,
  handlePageStatementEndtDateChange,
  handlePageStatementSubmit,
  deletePageStatement,
  getPageStatementTemplate,
  handleTemplateDownload,
  getPageLandlords,
  handlePageLandlordChange,
  handlePageLandlordDateChange,
  handlePageLandlordSubmit,
  handlePageLandlordNext,
  handlePageLandlordPrevious,
  clearPageLandlord,
  getPageLandlordInfo,
  deletePageLandlord,
  quickCreateContact,
  quickCreateProperty,
  addNewContact,
  addNewProperty,
  handleEmailCreate,
  handleEmailChange,
  handleAttachmentRemove,
  handleTemplateChange,
  setDocument,
  handlePagePaymentsModalClose,
} from 'redux/modules/app/pages';

class PageInfo extends React.Component {
  componentWillReceiveProps(nextState) {
    if (nextState.error && nextState.error.callback) {
      nextState.error.callback();
      this.props.clearError();
    }
  }
  render() {
    return (
      <div>
        <PageInfoComponent {...this.props} />
        {this.props.modal === 'notes' && (
          <Notes
            user={this.props.user}
            note={this.props.note || {}}
            notes={this.props.notes}
            categories={this.props.noteCategories}
            handleClose={this.props.handleModalClose}
            createNote={this.props.handleNoteCreate}
            deleteNote={this.props.handleNoteDelete}
            onChange={this.props.handleNoteChange}
            error={this.props.error}
            />
        )}
        {this.props.modal === 'job' && (
          <PageJobModal
            PageJob={this.props.PageJob}
            peoples={this.props.peoples}
            users={this.props.users}
            user={this.props.user}
            handleClose={this.props.handleModalClose}
            handlePageJobSubmit={this.props.handlePageJobSubmit}
            handlePageJobChange={this.props.handlePageJobChange}
            handleJobClientSelect={this.props.handleJobClientSelect}
            handleJobClientChange={this.props.handleJobClientChange}
            jobScheludeDateChange={this.props.jobScheludeDateChange}
            jobCompletionDateChange={this.props.jobCompletionDateChange}
          />
        )}
        {this.props.modal === 'disbursement' && (
          <PageDisbursementModal
            disbursement={this.props.disbursement}
            user={this.props.user}
            handleClose={this.props.handleModalClose}
            handleDisbursementSubmit={this.props.handleDisbursementSubmit}
            handleDisbursementChange={this.props.handleDisbursementChange}
            disbursementDateChange={this.props.disbursementDateChange}
          />
        )}
        {this.props.modal === 'rent' && (
          <PageRentModal
            PageRent={this.props.PageRent}
            user={this.props.user}
            handleClose={this.props.handleModalClose}
            handlePageRentSubmit={this.props.handlePageRentSubmit}
            handlePageRentChange={this.props.handlePageRentChange}
            handlePageRentDateChange={this.props.handlePageRentDateChange}
            error={this.props.error}
          />
        )}
        {this.props.modal === 'payment' && (
          <PagePaymentModal
            amount={(this.props.PageAccountOverview && this.props.PageAccountOverview.rent_due) || 0}
            PagePayment={this.props.PagePayment}
            PagePayments={this.props.PagePayments}
            user={this.props.user}
            tenants={this.props.Page.tenant}
            handleClose={this.props.handlePagePaymentsModalClose}
            handlePagePatmentSubmit={this.props.handlePagePatmentSubmit}
            handlePagePaymentChange={this.props.handlePagePaymentChange}
            handlePagePaymentDateChange={this.props.handlePagePaymentDateChange}
            handlePagePaymentNext={this.props.handlePagePaymentNext}
            handlePagePaymentPrevious={this.props.handlePagePaymentPrevious}
            getPagePaymentInfo={this.props.getPagePaymentInfo}
            deletePagePayment={this.props.deletePagePayment}
            clearPagePayment={this.props.clearPagePayment}
            error={this.props.error}
          />
        )}
        {this.props.modal === 'account' && (
          <PageAccountModal
            PageAccount={this.props.PageAccount}
            PageAccounts={this.props.PageAccounts}
            user={this.props.user}
            handleClose={this.props.handleModalClose}
            handlePageAccountSubmit={this.props.handlePageAccountSubmit}
            handlePageAccountChange={this.props.handlePageAccountChange}
            handlePageAccountDateChange={this.props.handlePageAccountDateChange}
            handlePageAccountNext={this.props.handlePageAccountNext}
            handlePageAccountPrevious={this.props.handlePageAccountPrevious}
            getPageAccountInfo={this.props.getPageAccountInfo}
            deletePageAccount={this.props.deletePageAccount}
            clearPageAccount={this.props.clearPageAccount}
            error={this.props.error}
          />
        )}
        {this.props.modal === 'landlord' && (
          <PageLandlordModal
            amount={this.props.PageAccountOverview.landlord_due}
            PageLandlord={this.props.PageLandlord}
            PageLandlords={this.props.PageLandlords}
            user={this.props.user}
            handleClose={this.props.handleModalClose}
            handlePageLandlordSubmit={this.props.handlePageLandlordSubmit}
            handlePageLandlordChange={this.props.handlePageLandlordChange}
            handlePageLandlordDateChange={this.props.handlePageLandlordDateChange}
            handlePageLandlordNext={this.props.handlePageLandlordNext}
            handlePageLandlordPrevious={this.props.handlePageLandlordPrevious}
            getPageLandlordInfo={this.props.getPageLandlordInfo}
            deletePageLandlord={this.props.deletePageLandlord}
            clearPageLandlord={this.props.clearPageLandlord}
            error={this.props.error}
          />
        )}
        {this.props.modal === 'emails' && (
          <Emails
            user={this.props.user}
            email={this.props.email}
            emails={this.props.emails}
            handleClose={this.props.handleModalClose}
            error={this.props.error}
            handleEmailCreate={this.props.handleEmailCreate}
            handleEmailChange={this.props.handleEmailChange}
            handleAttachmentRemove={this.props.handleAttachmentRemove}
            printedDoc={this.props.printedDoc}
            handleTemplateChange={this.props.handleTemplateChange}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.app.Pages.user,
  users: state.common.users,
  email: state.app.Pages.email,
  emails: state.app.Pages.emails,
  printedDoc: state.app.Pages.printedDoc,
  Page: state.app.Pages.Page,
  peoples: state.app.Pages.peoples,
  properties: state.app.Pages.properties,
  printTemplates: state.app.Pages.printTemplates,
  printValues: state.app.Pages.printValues,
  documents: state.app.Pages.documents,
  activity: state.app.Pages.activity,
  uploadDocumentProgress: state.app.Pages.uploadDocumentProgress,
  comment: state.app.Pages.comment,
  error: state.app.Pages.error,
  note: state.app.Pages.note,
  notes: state.app.Pages.notes,
  noteCategories: state.app.Pages.noteCategories,
  modal: state.app.Pages.modal,
  PageRents: state.app.Pages.PageRents,
  PageRent: state.app.Pages.PageRent,
  PageGenerateRent: state.app.Pages.PageGenerateRent,
  PageJobs: state.app.Pages.PageJobs,
  PageJob: state.app.Pages.PageJob,
  PageStatements: state.app.Pages.PageStatements,
  PageStatement: state.app.Pages.PageStatement,
  PageStatementTemplates: state.app.Pages.PageStatementTemplates,
  disbursments: state.app.Pages.disbursments,
  disbursement: state.app.Pages.disbursement,
  PagePayment: state.app.Pages.PagePayment,
  PagePayments: state.app.Pages.PagePayments,
  PageRentDueId: state.app.Pages.PageRentDueId,
  PageAccounts: state.app.Pages.PageAccounts,
  PageAccount: state.app.Pages.PageAccount,
  PageAccountOverview: state.app.Pages.PageAccountOverview,
  PageLandlords: state.app.Pages.PageLandlords,
  PageLandlord: state.app.Pages.PageLandlord,
  newContact: state.app.Pages.newContact,
  newProperty: state.app.Pages.newProperty,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  mainFormChange,
  mainFormSubmit,
  handleClientChange,
  handleClientSelect,
  handlePropertyChange,
  handlePropertySelect,
  mainFormAgreedDateChange,
  mainFormStartDateChange,
  mainFormEndDateChange,
  toggleBlockType,
  toggleInlineStyle,
  changeComment,
  clearError,
  handleNotesClick,
  handleModalClose,
  handleNoteCreate,
  handleNoteChange,
  handleNoteDelete,
  handlePrintChange,
  handlePrintSubmit,
  handleDocumentUpload,
  handleDocumentDownload,
  handleDocumentDelete,
  getPageJobs,
  getPageJobInfo,
  addPageJob,
  handlePageJobChange,
  handlePageJobSubmit,
  deletePageJob,
  handleJobClientSelect,
  handleJobClientChange,
  jobScheludeDateChange,
  jobCompletionDateChange,
  getDisbursementInfo,
  addDisbursement,
  handleDisbursementChange,
  handleDisbursementSubmit,
  deleteDisbursement,
  disbursementDateChange,
  getPageRents,
  getNextRents,
  getPreviousRents,
  getNextDisbursments,
  getPreviousDisbursments,
  getNextJobs,
  getPreviousJobs,
  getPageRentInfo,
  addPageRent,
  handlePageRentChange,
  handlePageRentDateChange,
  handlePageRentStartDateChange,
  handlePageRentEndDateChange,
  handleGenerateRentSubmit,
  handlePageRentSubmit,
  deletePageRent,
  getPagePayments,
  handlePagePatmentSubmit,
  handlePagePaymentChange,
  handlePagePaymentDateChange,
  handlePagePaymentNext,
  handlePagePaymentPrevious,
  getPagePaymentInfo,
  deletePagePayment,
  clearPagePayment,
  confirmPageRent,
  handleAccountClick,
  getPageAccountOverview,
  handlePageAccountNext,
  handlePageAccountPrevious,
  getPageAccountInfo,
  handlePageAccountChange,
  handlePageAccountDateChange,
  handlePageAccountSubmit,
  clearPageAccount,
  deletePageAccount,
  handlePageStatementNext,
  handlePageStatementPrevious,
  getPageStatementInfo,
  handlePageStatementChange,
  handlePageStatementStartDateChange,
  handlePageStatementEndtDateChange,
  handlePageStatementSubmit,
  deletePageStatement,
  getPageStatementTemplate,
  handleTemplateDownload,
  getPageLandlords,
  handlePageLandlordChange,
  handlePageLandlordDateChange,
  handlePageLandlordSubmit,
  handlePageLandlordNext,
  handlePageLandlordPrevious,
  clearPageLandlord,
  getPageLandlordInfo,
  deletePageLandlord,
  quickCreateContact,
  quickCreateProperty,
  addNewContact,
  addNewProperty,
  handleEmailCreate,
  handleEmailChange,
  handleAttachmentRemove,
  handleTemplateChange,
  setDocument,
  handlePagePaymentsModalClose,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PageInfo);
