import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getPages,
  deletePage,
  toggleSearch,
  clearError,
  handleSearchReset,
  handleSearchChange,
  handleSearchSubmit,
 } from 'redux/modules/app/pages';
import PagesComponent from 'components/App/Pages';
import ConfirmDelete from 'components/Common/modals/ConfirmDelete';

class Pages extends React.Component {
  state = {
    deleteModal: false,
  }
  componentDidMount() {
    this.props.getPages();
  }
  componentWillReceiveProps(props) {
    if (props.error && props.error.callback) {
      props.error.callback();
      this.props.clearError();
      this.toggleDeleteModal();
    }
  }
  requestDelete = id => this.setState({ itemToDelete: id, deleteModal: true })
  handleDelete = () => {
    this.props.deletePage(this.state.itemToDelete);
  }
  toggleDeleteModal = () => this.setState({ deleteModal: false, itemToDelete: null })
  render() {
    return (
      <section>
        <PagesComponent {...this.props} deletePage={this.requestDelete} />
        <ConfirmDelete shown={this.state.deleteModal} handleDelete={this.handleDelete} handleClose={this.toggleDeleteModal} />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  Pages: state.app.pages.Pages,
  pagination: state.app.pages.pagination,
  searchPanel: state.app.pages.searchPanel,
  searchValues: state.app.pages.searchValues,
  user: state.common.user,
  error: state.app.Pages.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getPages,
  deletePage,
  toggleSearch,
  clearError,
  handleSearchReset,
  handleSearchChange,
  handleSearchSubmit,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
