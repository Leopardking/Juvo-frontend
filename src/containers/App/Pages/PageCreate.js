import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PageCreateComponent from 'components/App/Pages/PageCreate';
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
  quickCreateContact,
  quickCreateProperty,
  addNewContact,
  addNewProperty,
} from 'redux/modules/app/pages';

class PageCreate extends React.Component {
  componentWillReceiveProps(nextState) {
    if (nextState.error && nextState.error.callback) {
      nextState.error.callback();
      this.props.clearError();
    }
  }
  render() {
    return (
      <PageCreateComponent {...this.props} />
    );
  }
}

const mapStateToProps = state => ({
  user: state.app.pages.user,
  page: state.app.pages.page,
  peoples: state.app.pages.peoples,
  properties: state.app.pages.properties,
  comment: state.app.pages.comment,
  error: state.app.pages.error,
  newContact: state.app.pages.newContact,
  newProperty: state.app.pages.newProperty,
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
  quickCreateContact,
  quickCreateProperty,
  addNewContact,
  addNewProperty,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PageCreate);
