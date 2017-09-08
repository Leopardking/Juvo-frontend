import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RentsComponent from 'components/App/Pages/Rents';
import PageRentModal from 'components/App/Pages/modals/PageRentModal';
import PagePaymentModal from 'components/App/Pages/modals/PagePaymentModal';
import {
  handlePageRentChange,
  handlePageRentSubmit,
  handlePageRentDateChange,
  getPageRentInfo,
  getPagePayments,
  deletePageRent,
  handleClose,
  handlePagePatmentSubmit,
  handlePagePaymentChange,
  handlePagePaymentDateChange,
  handlePagePaymentNext,
  handlePagePaymentPrevious,
  getPagePaymentInfo,
  deletePagePayment,
  clearPagePayment,
  handlePageLandlordChange,
  handlePageLandlordDateChange,
  handlePageLandlordSubmit,
  handlePageLandlordNext,
  handlePageLandlordPrevious,
  clearPageLandlord,
  getPageLandlordInfo,
  deletePageLandlord,
  handleModalClose,
  clearError,
  handlePageStatementSubmit,
  handlePageStatementChange,
  handlePageStatementStartDateChange,
  handlePageStatementEndtDateChange,
  deletePageStatement,
  handleTemplateDownload,
  handlePageStatementNext,
  handlePageStatementPrevious,
  setSelectedRent,
  handleRentPaymentsModalClose,
} from 'redux/modules/app/pages';

class Rents extends React.Component {
  componentWillReceiveProps(props) {
    if (props.error && props.error.callback) {
      props.error.callback();
      this.props.clearError();
    }
  }
  render() {
    return (
      <div>
        <RentsComponent {...this.props} />
        {this.props.modal === 'rent' ? (
          <PageRentModal
            PageRent={this.props.rent}
            user={this.props.user}
            handlePageRentChange={this.props.handlePageRentChange}
            handlePageRentSubmit={this.props.handlePageRentSubmit}
            handlePageRentDateChange={this.props.handlePageRentDateChange}
            handleClose={this.props.handleClose}
          />
        ) : null}
        {this.props.modal === 'payment' ? (
          <PagePaymentModal
            amount={(this.props.PageAccountOverview && this.props.PageAccountOverview.rent_due) || 0}
            PagePayment={this.props.PagePayment}
            PagePayments={this.props.PagePayments}
            user={this.props.user}
            tenants={this.props.tenants}
            handleClose={this.props.handleRentPaymentsModalClose}
            handlePagePatmentSubmit={this.props.handlePagePatmentSubmit}
            handlePagePaymentChange={this.props.handlePagePaymentChange}
            handlePagePaymentDateChange={this.props.handlePagePaymentDateChange}
            handlePagePaymentNext={this.props.handlePagePaymentNext}
            handlePagePaymentPrevious={this.props.handlePagePaymentPrevious}
            getPagePaymentInfo={this.props.getPagePaymentInfo}
            deletePagePayment={this.props.deletePagePayment}
            clearPagePayment={this.props.clearPagePayment}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rents: state.app.Pages.PageRents,
  tenants: state.app.Pages.tenants,
  rent: state.app.Pages.PageRent,
  PageAccountOverview: state.app.Pages.PageAccountOverview,
  PagePayment: state.app.Pages.PagePayment,
  PagePayments: state.app.Pages.PagePayments,
  PageStatement: state.app.Pages.PageStatement,
  PageStatements: state.app.Pages.PageStatements,
  PageStatementTemplates: state.app.Pages.PageStatementTemplates,
  PageLandlords: state.app.Pages.PageLandlords,
  PageLandlord: state.app.Pages.PageLandlord,
  user: state.app.Pages.user,
  modal: state.app.Pages.modal,
  error: state.app.Pages.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getPageRentInfo,
  deletePageRent,
  handlePageRentChange,
  handlePageRentSubmit,
  handlePageRentDateChange,
  getPagePayments,
  handleClose,
  clearError,
  handlePagePatmentSubmit,
  handlePagePaymentChange,
  handlePagePaymentDateChange,
  handlePagePaymentNext,
  handlePagePaymentPrevious,
  getPagePaymentInfo,
  deletePagePayment,
  clearPagePayment,
  handlePageLandlordChange,
  handlePageLandlordDateChange,
  handlePageLandlordSubmit,
  handlePageLandlordNext,
  handlePageLandlordPrevious,
  clearPageLandlord,
  getPageLandlordInfo,
  deletePageLandlord,
  handleModalClose,
  handlePageStatementSubmit,
  handlePageStatementChange,
  handlePageStatementStartDateChange,
  handlePageStatementEndtDateChange,
  deletePageStatement,
  handleTemplateDownload,
  handlePageStatementNext,
  handlePageStatementPrevious,
  setSelectedRent,
  handleRentPaymentsModalClose,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Rents);
