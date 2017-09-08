import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Statements from 'components/App/Pages/Landlords/Statements';
import {
  deletePageStatement,
  handleTemplateDownload,
  setDocument,
  handlePageStatementNext,
  handlePageStatementPrevious,
  handleModalClose,
  handleEmailCreate,
  handleEmailChange,
  handleAttachmentRemove,
  handleTemplateChange,
  handlePageStatementSubmit,
  handlePageStatementChange,
  handlePageStatementStartDateChange,
  handlePageStatementEndtDateChange,
} from 'redux/modules/app/pages';
import { momentFormats } from 'common/utils';
import Emails from 'components/Common/modals/Emails';

class LandlordStatements extends React.Component {
  componentWillReceiveProps(nextState) {
    if (nextState.error && nextState.error.callback) {
      nextState.error.callback();
      this.props.clearError();
    }
  }
  render() {
    return (
      <div>
        <Statements
          {...this.props}
          dateDisplayFormat={(this.props.user && this.props.user.dateDisplayFormat) || momentFormats['d/m/Y']}
        />
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
  page: state.app.pages.page,
  pageStatement: state.app.pages.pageStatement,
  pageStatementTemplates: state.app.pages.pageStatementTemplates,
  pageStatements: state.app.pages.pageStatements,
  user: state.app.pages.user,
  error: state.app.pages.error,
  modal: state.app.pages.modal,
  email: state.app.pages.email,
  emails: state.app.pages.emails,
  printedDoc: state.app.pages.printedDoc,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  deletePageStatement,
  handleTemplateDownload,
  setDocument,
  handlePageStatementNext,
  handlePageStatementPrevious,
  handleModalClose,
  handleEmailCreate,
  handleEmailChange,
  handleAttachmentRemove,
  handleTemplateChange,
  handlePageStatementSubmit,
  handlePageStatementChange,
  handlePageStatementStartDateChange,
  handlePageStatementEndtDateChange,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LandlordStatements);
