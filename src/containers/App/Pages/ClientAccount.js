import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPageClient, getPageClientOverview, exportManagementFees, exportVats } from 'redux/modules/app/pages';
import ClientAccountComponent from 'components/App/Pages/ClientAccount';

const mapStateToProps = state => ({
  user: state.common.user,
  clientAccounts: state.app.pages.clientAccounts,
  overview: state.app.pages.clientAccountsOverview,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getPageClient,
  getPageClientOverview,
  exportManagementFees,
  exportVats,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClientAccountComponent);
