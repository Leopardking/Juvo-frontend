import { getRequest, endpoint, checkStatus } from 'common/utils';

const URL_FETCH = '/page/fetch';
const URL_PAGE_INFO = '/page/info';
const URL_PAGE_CREATE = '/page/create';
const URL_PAGE_UPDATE = '/page/update';
const URL_PAGE_DELETE = '/page/delete';
const URL_PEOPLE_AUTOCOMPLETE = '/autocomplete/contact';
const URL_PROPERTY_AUTOCOMPLETE = '/autocomplete/property';
const URL_FETCH_NOTES = '/note/fetch';
const URL_FETCH_NOTECATEGORIES = '/note/category_array';
const URL_CREATE_NOTE = '/note/create';
const URL_DELETE_NOTE = '/note/delete';
const URL_PRINT_TEMPLATE = '/print/page';
const URL_DOCUMENTSIGN = '/document/sign';
export const URL_AWS_DOCUMENTS = 'https://doc-juvo.s3-eu-west-1.amazonaws.com/';
const URL_CREATEDOCUMENT = '/document/create';
const URL_FETCH_ACTIVITY = '/activity/PAGE';
const URL_GET_DOCUMENT = '/document/get_file';
const URL_PAGE_JOB_FETCH = '/page_job/fetch';
const URL_PAGE_JOB_INFO = '/page_job/info';
const URL_PAGE_JOB_CREATE = '/page_job/create';
const URL_PAGE_JOB_UPDATE = '/page_job/update';
const URL_PAGE_JOB_DELETE = '/page_job/delete';
const URL_PAGE_DISBURSEMENT_FETCH = '/page_disbursement/fetch';
const URL_PAGE_DISBURSEMENT_INFO = '/page_disbursement/info';
const URL_PAGE_DISBURSEMENT_CREATE = '/page_disbursement/create';
const URL_PAGE_DISBURSEMENT_UPDATE = '/page_disbursement/update';
const URL_PAGE_DISBURSEMENT_DELETE = '/page_disbursement/delete';
const URL_PAGE_RENT_FETCH = '/page_rent/fetch';
const URL_PAGE_RENT_GENERATE = '/page_rent/generate';
const URL_PAGE_RENT_INFO = '/page_rent/info';
const URL_PAGE_RENT_CREATE = '/page_rent/create';
const URL_PAGE_RENT_UPDATE = '/page_rent/update';
const URL_PAGE_RENT_DELETE = '/page_rent/delete';
const URL_PAGE_PAYMENTS_FETCH = '/page_rent_payment/fetch';
const URL_PAGE_PAYMENT_CREATE = '/page_rent_payment/create';
const URL_PAGE_PAYMENT_UPDATE = '/page_rent_payment/update';
const URL_PAGE_PAYMENT_INFO = '/page_rent_payment/info';
const URL_PAGE_PAYMENT_DELETE = '/page_rent_payment/delete';
const URL_PAGE_RENT_CONFIRM = '/page_rent/confirm';
const URL_PAGE_RENT_UNCONFIRM = '/page_rent/unconfirm';
const URL_PAGE_ACCOUNT_FETCH = '/page_account/fetch';
const URL_PAGE_ACCOUNT_OVERVIEW = '/pageE_account/overview';
const URL_PAGE_ACCOUNT_INFO = '/page_account/info';
const URL_PAGE_ACCOUNT_CREATE = '/page_account/create';
const URL_PAGE_ACCOUNT_UPDATE = '/page_account/update';
const URL_PAGE_ACCOUNT_DELETE = '/page_account/delete';
const URL_PAGE_STATEMENT_FETCH = '/page_statement/fetch';
const URL_PAGE_STATEMENT_FILE = '/page_statement/get_file';
const URL_PAGE_STATEMENT_INFO = '/page_statement/info';
const URL_PAGE_STATEMENT_CREATE = '/page_statement/create';
const URL_PAGE_STATEMENT_TEMPLATE = '/page_statement/template';
const URL_PAGE_STATEMENT_DELETE = '/page_statement/delete';
const URL_PAGE_LANDLORD_FETCH = '/page_rent_payment_landlord/fetch';
const URL_PAGE_LANDLORD_INFO = '/page_rent_payment_landlord/info';
const URL_PAGE_LANDLORD_CREATE = '/page_rent_payment_landlord/create';
const URL_PAGE_LANDLORD_UPDATE = '/page_rent_payment_landlord/update';
const URL_PAGE_LANDLORD_DELETE = '/page_rent_payment_landlord/delete';
const URL_PROPERTY_QUICK = 'property/quick';
const URL_PAGE_LANDLORD_DUE_FETCH = '/page_rent_landlord/fetch';
const URL_PAGE_CLIENT_ACCOUNT_FETCH = '/page_account/fetch';
const URL_PAGE_CLIENT_ACCOUNT_OVERVIEW = '/page_account/overview';
const URL_PAGE_CLIENT_ACCOUNT_MANAGEMENT_EXPORT = '/page_account/management_fee_export';
const URL_PAGE_CLIENT_ACCOUNT_VAT_EXPORT = '/page_account/vat_export';
const URL_FETCH_EMAILS = '/email/fetch';

export const fetch = data => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH)}`)
    .send(data)
).then(checkStatus);
export const PAGEInfo = id => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_INFO)}`)
    .query({ id })
).then(checkStatus);
export const PAGECreate = data => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_CREATE)}`)
    .send(data)
).then(checkStatus);
export const PAGEUpdate = data => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_UPDATE)}`)
    .send(data)
).then(checkStatus);
export const PAGEDelete = id => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_DELETE)}`)
    .query({ id })
).then(checkStatus);
export const peopleAutocomplete = data => getRequest(
  request => request
    .post(`${endpoint(URL_PEOPLE_AUTOCOMPLETE)}`)
    .send({ s: data })
).then(checkStatus);
export const propertyAutocomplete = data => getRequest(
  request => request
    .post(`${endpoint(URL_PROPERTY_AUTOCOMPLETE)}`)
    .send({ s: data })
).then(checkStatus);
export const getPAGENotes = data => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH_NOTES)}`)
    .send(data)
).then(checkStatus);
export const getNotesCategory = () => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH_NOTECATEGORIES)}`)
).then(checkStatus);
export const createNote = data => getRequest(
  request => request
    .post(`${endpoint(URL_CREATE_NOTE)}`)
    .send(data)
).then(checkStatus);
export const deleteNote = data => getRequest(
  request => request
    .post(`${endpoint(URL_DELETE_NOTE)}`)
    .query(data)
).then(checkStatus);
export const printTemplate = data => getRequest(
  request => request
    .post(`${endpoint(URL_PRINT_TEMPLATE)}`)
    .send(data)
).then(checkStatus);
export const getDocumentSign = () => getRequest(
  request => request
    .post(`${endpoint(URL_DOCUMENTSIGN)}`)
    .query()
).then(checkStatus);
export const createDocuments = data => getRequest(
  request => request
    .post(`${endpoint(URL_CREATEDOCUMENT)}`)
    .send(data)
).then(checkStatus);
export const fetchPAGEActivity = id => getRequest(
  request => request
    .post(`${endpoint(URL_FETCH_ACTIVITY)}`)
    .query({ id }))
  .then(checkStatus);
export const downloadDocument = id => getRequest(
  request => request
    .post(`${endpoint(URL_GET_DOCUMENT)}`)
    .query({ id })
).then(checkStatus);
export const fetchPAGEJobs = data => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_JOB_FETCH)}`)
    .send(data)
).then(checkStatus);
export const PAGEJobInfo = id => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_JOB_INFO)}`)
    .query({ id })
).then(checkStatus);
export const PAGEJobCreate = data => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_JOB_CREATE)}`)
    .send(data)
).then(checkStatus);
export const PAGEJobUpdate = data => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_JOB_UPDATE)}`)
    .send(data)
).then(checkStatus);
export const PAGEJobDelete = id => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_JOB_DELETE)}`)
    .query({ id })
).then(checkStatus);
export const fetchDisbursments = data => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_DISBURSEMENT_FETCH)}`)
    .send(data)
).then(checkStatus);
export const disbursementInfo = id => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_DISBURSEMENT_INFO)}`)
    .query({ id })
).then(checkStatus);
export const disbursementCreate = data => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_DISBURSEMENT_CREATE)}`)
    .send(data)
).then(checkStatus);
export const disbursementUpdate = data => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_DISBURSEMENT_UPDATE)}`)
    .send(data)
).then(checkStatus);
export const disbursementDelete = id => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_DISBURSEMENT_DELETE)}`)
    .query({ id })
).then(checkStatus);
export const fetchPAGERents = data => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_RENT_FETCH)}`)
    .send(data)
).then(checkStatus);
export const PAGERentGenerate = data => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_RENT_GENERATE)}`)
    .send(data)
).then(checkStatus);
export const PAGERentInfo = id => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_RENT_INFO)}`)
    .query({ id })
).then(checkStatus);
export const PAGERentCreate = data => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_RENT_CREATE)}`)
    .send(data)
).then(checkStatus);
export const PAGERentUpdate = data => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_RENT_UPDATE)}`)
    .send(data)
).then(checkStatus);
export const PAGERentDelete = id => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_RENT_DELETE)}`)
    .query({ id })
).then(checkStatus);
export const fetchPAGEPayments = data => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_PAYMENTS_FETCH)}`)
    .send(data)
).then(checkStatus);
export const PAGEPaymentCreate = data => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_PAYMENT_CREATE)}`)
    .send(data)
).then(checkStatus);
export const PAGEPaymentUpdate = data => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_PAYMENT_UPDATE)}`)
    .send(data)
).then(checkStatus);
export const PAGEPaymentInfo = id => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_PAYMENT_INFO)}`)
    .query({ id })
).then(checkStatus);
export const PAGEPaymentDelete = id => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_PAYMENT_DELETE)}`)
    .query({ id })
).then(checkStatus);
export const PAGERentConfirm = id => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_RENT_CONFIRM)}`)
    .query({ id })
).then(checkStatus);
export const PAGERentUnconfirm = id => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_RENT_UNCONFIRM)}`)
    .query({ id })
).then(checkStatus);
export const fetchPAGEAccounts = data => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_ACCOUNT_FETCH)}`)
    .send(data)
).then(checkStatus);
export const PAGEAccountOverview = id => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_ACCOUNT_OVERVIEW)}`)
    .query({ id })
).then(checkStatus);
export const PAGEAccountInfo = id => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_ACCOUNT_INFO)}`)
    .query({ id })
).then(checkStatus);
export const PAGEAccountCreate = data => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_ACCOUNT_CREATE)}`)
    .send(data)
).then(checkStatus);
export const PAGEAccountUpdate = data => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_ACCOUNT_UPDATE)}`)
    .send(data)
).then(checkStatus);
export const PAGEAccountDelete = id => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_ACCOUNT_DELETE)}`)
    .query({ id })
).then(checkStatus);
export const fetchPAGEStatements = data => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_STATEMENT_FETCH)}`)
    .send(data)
).then(checkStatus);
export const PAGEStatementFile = id => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_STATEMENT_FILE)}`)
    .query({ id })
).then(checkStatus);
export const PAGEStatementInfo = id => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_STATEMENT_INFO)}`)
    .query({ id })
).then(checkStatus);
export const PAGEStatementCreate = data => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_STATEMENT_CREATE)}`)
    .send(data)
).then(checkStatus);
export const PAGEStatementTemplate = data => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_STATEMENT_TEMPLATE)}`)
    .send(data)
).then(checkStatus);
export const PAGEStatementDelete = id => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_STATEMENT_DELETE)}`)
    .query({ id })
).then(checkStatus);
export const fetchPAGELandlord = data => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_LANDLORD_FETCH)}`)
    .send(data)
).then(checkStatus);
export const PAGELandlordInfo = id => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_LANDLORD_INFO)}`)
    .query({ id })
).then(checkStatus);
export const PAGELandlordCreate = data => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_LANDLORD_CREATE)}`)
    .send(data)
).then(checkStatus);
export const PAGELandlordUpdate = data => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_LANDLORD_UPDATE)}`)
    .send(data)
).then(checkStatus);
export const PAGELandlordDelete = id => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_LANDLORD_DELETE)}`)
    .query({ id })
).then(checkStatus);
export const propertyQuickCreate = data => getRequest(
  request => request
    .post(`${endpoint(URL_PROPERTY_QUICK)}`)
    .send(data)
  ).then(checkStatus);
export const fetchPAGELandlordDue = data => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_LANDLORD_DUE_FETCH)}`)
    .send(data)
).then(checkStatus);
export const fetchPAGEClient = data => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_CLIENT_ACCOUNT_FETCH)}`)
    .send(data)
).then(checkStatus);
export const fetchPAGEClientOverview = data => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_CLIENT_ACCOUNT_OVERVIEW)}`)
    .send(data)
).then(checkStatus);
export const exportManagementFee = data => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_CLIENT_ACCOUNT_MANAGEMENT_EXPORT)}`)
    .send(data)
).then(checkStatus);
export const exportVat = data => getRequest(
  request => request
    .post(`${endpoint(URL_PAGE_CLIENT_ACCOUNT_VAT_EXPORT)}`)
    .send(data)
).then(checkStatus);
export const fetchEmails = data => getRequest(
    request => request
      .post(`${endpoint(URL_FETCH_EMAILS)}`)
      .send(data))
      .then(checkStatus);
