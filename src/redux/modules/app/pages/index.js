import moment from 'moment';
import { EditorState, RichUtils } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import { browserHistory } from 'react-router';
import superagent from 'superagent-defaults';
import { toastr } from 'react-redux-toastr';
import { downloadFile, momentFormats } from 'common/utils';
import juvo from 'juvo';
import { createContact, createEmail } from '../contacts/requests';

import { SET_STATIC_DATA, SET_USER_DATA } from '../../common';

import {
  URL_AWS_DOCUMENTS,
  fetch,
  pageInfo,
  pageCreate,
  pageUpdate,
  pageDelete,
  peopleAutocomplete,
  propertyAutocomplete,
  getpageNotes,
  getNotesCategory,
  createNote,
  deleteNote,
  printTemplate,
  getDocumentSign,
  createDocuments,
  downloadDocument,
  deleteDocument,
  fetchpageJobs,
  pageJobInfo,
  pageJobCreate,
  pageJobUpdate,
  pageJobDelete,
  fetchDisbursments,
  disbursementInfo,
  disbursementCreate,
  disbursementUpdate,
  disbursementDelete,
  fetchpageRents,
  pageRentGenerate,
  pageRentInfo,
  pageRentCreate,
  pageRentUpdate,
  pageRentDelete,
  fetchpagePayments,
  pagePaymentCreate,
  pagePaymentUpdate,
  pagePaymentInfo,
  pagePaymentDelete,
  pageRentConfirm,
  pageRentUnconfirm,
  fetchpageAccounts,
  pageAccountOverview,
  pageAccountInfo,
  pageAccountCreate,
  pageAccountUpdate,
  pageAccountDelete,
  fetchpageStatements,
  pageStatementFile,
  pageStatementInfo,
  pageStatementCreate,
  pageStatementTemplate,
  pageStatementDelete,
  fetchpageLandlord,
  pageLandlordInfo,
  pageLandlordCreate,
  pageLandlordUpdate,
  pageLandlordDelete,
  propertyQuickCreate,
  fetchpageLandlordDue,
  fetchpageClient,
  exportManagementFee,
  exportVat,
  fetchpageClientOverview,
  fetchEmails,
} from './requests';

const SET_PAGES = 'juvo/app/pages/SET_PAGES';
const SET_PAGE = 'juvo/app/pages/SET_PAGE';
const SET_PAGE_UPDATE = 'juvo/app/pages/SET_PAGE_UPDATE';
const SET_PAGE_DELETE = 'juvo/app/pages/SET_PAGE_DELETE';
const SET_PEOPLE_AUTOCOMPLETE = 'juvo/app/pages/SET_PEOPLE_AUTOCOMPLETE';
const SET_PAGE_PEOPLE = 'juvo/app/pages/SET_PAGE_PEOPLE';
const SET_PROPERTY_AUTOCOMPLETE = 'juvo/app/pages/SET_PROPERTY_AUTOCOMPLETE';
const SET_PAGE_PROPERTY = 'juvo/app/pages/SET_PAGE_PROPERTY';
const SET_PAGE_COMMENT = 'juvo/app/pages/SET_PAGE_COMMENT';
const SET_ERROR = 'juvo/app/pages/SET_ERROR';
const SET_CLEAR_ERROR = 'juvo/app/pages/SET_CLEAR_ERROR';
const SET_HIDE_MODAL = 'juvo/app/pages/SET_HIDE_MODAL';
const SET_NOTES = 'juvo/app/pages/SET_NOTES';
const SET_NOTES_CATEGORY = 'juvo/app/pages/SET_NOTES_CATEGORY';
const SET_NOTE_CREATE = 'juvo/app/pages/SET_NOTE_CREATE';
const SET_NOTE_DELETE = 'juvo/app/pages/SET_NOTE_DELETE';
const SET_PRINT_TEMPLATES = 'juvo/app/pages/SET_PRINT_TEMPLATES';
const SET_LOADING = 'juvo/app/pages/SET_LOADING';
const SET_DOCUMENT_PROGRESS = 'juvo/app/pages/SET_DOCUMENT_PROGRESS';
const SET_CREATE_DOCUMENT = 'juvo/app/pages/SET_CREATE_DOCUMENT';
const SET_PAGE_CLEAR = 'juvo/app/pages/SET_PAGE_CLEAR';
const SET_PAGE_JOBS = 'juvo/app/pages/SET_PAGE_JOBS';
const SET_PAGE_JOB = 'juvo/app/pages/SET_PAGE_JOB';
const SET_NEW_PAGE_JOB = 'juvo/app/pages/SET_NEW_PAGE_JOB';
const SET_PAGE_JOB_CREATE = 'juvo/app/pages/SET_PAGE_JOB_CREATE';
const SET_PAGE_JOB_UPDATE = 'juvo/app/pages/SET_PAGE_JOB_UPDATE';
const SET_PAGE_JOB_DELETE = 'juvo/app/pages/SET_PAGE_JOB_DELETE';
const SET_PAGE_JOB_PEOPLE_AUTOCOMPLETE = 'juvo/app/pages/SET_PAGE_JOB_PEOPLE_AUTOCOMPLETE';
const SET_PAGE_DISBURSMENTS = 'juvo/app/pages/SET_PAGE_DISBURSMENTS';
const SET_PAGE_DISBURSEMENT = 'juvo/app/pages/SET_PAGE_DISBURSEMENT';
const SET_NEW_PAGE_DISBURSEMENT = 'juvo/app/pages/SET_NEW_PAGE_DISBURSEMENT';
const SET_PAGE_DISBURSEMENT_CREATE = 'juvo/app/pages/SET_PAGE_DISBURSEMENT_CREATE';
const SET_PAGE_DISBURSEMENT_UPDATE = 'juvo/app/pages/SET_page_DISBURSEMENT_UPDATE';
const SET_PAGE_DISBURSEMENT_DELETE = 'juvo/app/pages/SET_PAGE_DISBURSEMENT_DELETE';
const SET_PAGE_RENTS = 'juvo/app/pages/SET_PAGE_RENTS';
const SET_PAGE_RENT = 'juvo/app/pages/SET_PAGE_RENT';
const SET_NEW_PAGE_RENT = 'juvo/app/pages/SET_NEW_PAGE_RENT';
const SET_PAGE_GENERATE_RENT = 'juvo/app/pages/SET_PAGE_GENERATE_RENT';
const SET_PAGE_RENT_CREATE = 'juvo/app/pages/SET_PAGE_RENT_CREATE';
const SET_PAGE_RENT_UPDATE = 'juvo/app/pages/SET_PAGE_RENT_UPDATE';
const SET_PAGE_RENT_DELETE = 'juvo/app/pages/SET_PAGE_RENT_DELETE';
const SET_PAGE_RENT_ID = 'juvo/app/pages/SET_PAGE_RENT_ID';
const SET_PAGE_PAYMENTS = 'juvo/app/pages/SET_PAGE_PAYMENTS';
const SET_PAGE_PAYMENT = 'juvo/app/pages/SET_PAGE_PAYMENT';
const SET_PAGE_PAYMENT_CREATE = 'juvo/app/pages/SET_PAGE_PAYMENT_CREATE';
const SET_PAGE_PAYMENT_UPDATE = 'juvo/app/pages/SET_PAGE_PAYMENT_UPDATE';
const SET_PAGE_PAYMENT_DELETE = 'juvo/app/pages/SET_PAGE_PAYMENT_DELETE';
const SET_PAGE_ACCOUNTS = 'juvo/app/pages/SET_PAGE_ACCOUNTS';
const SET_PAGE_ACCOUNT_OVERVIEW = 'juvo/app/pages/SET_PAGE_ACCOUNT_OVERVIEW';
const SET_PAGE_ACCOUNT = 'juvo/app/pages/SET_PAGE_ACCOUNT';
const SET_PAGE_ACCOUNT_CREATE = 'juvo/app/pages/SET_PAGE_ACCOUNT_CREATE';
const SET_PAGE_ACCOUNT_UPDATE = 'juvo/app/pages/SET_PAGE_ACCOUNT_UPDATE';
const SET_PAGE_ACCOUNT_DELETE = 'juvo/app/pages/SET_PAGE_ACCOUNT_DELETE';
const SET_PAGE_STATEMENTS = 'juvo/app/pages/SET_PAGE_STATEMENTS';
const SET_PAGE_STATEMENT = 'juvo/app/pages/SET_PAGE_STATEMENT';
const SET_PAGE_STATEMENT_CREATE = 'juvo/app/pages/SET_PAGE_STATEMENT_CREATE';
const SET_PAGE_STATEMENT_DELETE = 'juvo/app/pages/SET_PAGE_STATEMENT_DELETE';
const SET_PAGE_STATEMENT_TEMPLATE = 'juvo/app/pages/SET_PAGE_STATEMENT_TEMPLATE';
const SET_PAGE_LANDLORDS = 'juvo/app/pages/SET_PAGE_LANDLORDS';
const SET_PAGE_LANDLORD = 'juvo/app/pages/SET_PAGE_LANDLORD';
const SET_PAGE_LANDLORD_CREATE = 'juvo/app/pages/SET_PAGE_LANDLORD_CREATE';
const SET_PAGE_LANDLORD_UPDATE = 'juvo/app/pages/SET_PAGE_LANDLORD_UPDATE';
const SET_PAGE_LANDLORD_DELETE = 'juvo/app/pages/SET_PAGE_LANDLORD_DELETE';
const SET_SELECTED_RENT = 'juvo/app/pages/SET_SELECTED_RENT';
const SET_PAGE_SEARCH_PANEL = 'juvo/app/pages/SET_PAGE_SEARCH_PANEL';
const SET_NEW_PROPERTY = 'juvo/app/pages/SET_NEW_PROPERTY';
const SET_NEW_CONTACT = 'juvo/app/pages/SET_NEW_CONTACT';
const SET_QUICK_CONTACT = 'juvo/app/pages/SET_QUICK_CONTACT';
const SET_QUICK_PROPERTY = 'juvo/app/pages/SET_QUICK_PROPERTY';
const SET_PAGE_LANDLORDS_DUE = 'juvo/app/pages/SET_PAGE_LANDLORDS_DUE';
const SET_PAGE_CLIENT_ACCOUNT = 'juvo/app/pages/SET_PAGE_CLIENT_ACCOUNT';
const SET_PAGE_CLIENT_OVERVIEW = 'juvo/app/pages/SET_PAGE_CLIENT_OVERVIEW';
const SET_EMAIL = 'juvo/app/pages/SET_EMAIL';
const SET_EMAIL_CREATE = 'juvo/app/pages/SET_EMAIL_CREATE';
const SET_PRINTED_DOCUMENT = 'juvo/app/pages/SET_PRINTED_DOCUMENT';
const SET_EMAILS = 'juvo/app/pages/SET_EMAILS';
const SET_PAGES_SEARCH = 'juvo/app/pages/SET_PAGES_SEARCH';

const SUCCESS = '_SUCCESS';
const REQUEST = '_REQUEST';
const FAILURE = '_FAILURE';

export default (state = {}, action) => {
  switch (action.type) {
    case `${SET_STATIC_DATA}${SUCCESS}`: {
      const {
        t_page: printTemplates,
      } = action.res;
      return {
        ...state,
        printTemplates,
      };
    }
    case `${SET_USER_DATA}${SUCCESS}`: {
      const { diary_day_start, date_format, date_display_format, currency_symbol } = action.res.data;
      const dateFormat = momentFormats[date_format];
      const dateDisplayFormat = momentFormats[date_display_format];
      const currency = String.fromCharCode(currency_symbol.replace('#', '').replace(';', ''));
      return {
        ...state,
        user: {
          diaryStart: diary_day_start,
          dateFormat,
          dateDisplayFormat,
          currency,
        }
      };
    }
    case `${SET_PAGES}${SUCCESS}`: {
      const { data: pages, ...pagination } = action.res;
      return { ...state, pages, pagination };
    }
    case SET_PAGE: {
      return { ...state, page: action.payload, comment: state.comment || EditorState.createEmpty() };
    }
    case `${SET_PAGE}${REQUEST}`: {
      return { ...state, loading: { general: true } };
    }
    case `${SET_PAGE}${FAILURE}`: {
      const { errors } = action.error;
      const error = {
        callback: () => toastr.error('Error', action.error.message),
        errors,
      };
      return { ...state, error };
    }
    case `${SET_PAGE}${SUCCESS}`: {
      const page = { ...action.res.data.page };
      const comment = page.comment ? EditorState.createWithContent(stateFromHTML(page.comment)) : EditorState.createEmpty();
      // console.log(offer);
      const documents = [...action.res.data.page.documents];
      const activity = { ...action.res.data.page.activity };
      const disbursments = { ...action.res.data.page.disbursement };
      const pageJobs = { ...action.res.data.page.job };
      const pageRents = { ...action.res.data.page.rent };
      const pageStatements = { ...action.res.data.page.statement };
      const pageStatementTemplates = [...action.res.data.page.statement_template];
      const pageAccount = { ...action.res.data.page.account.data };
      delete page.documents;
      delete page.activity;
      delete page.disbursement;
      delete page.job;
      delete page.rent;
      delete page.statement;
      delete page.account;
      return {
        ...state,
        page,
        documents,
        activity,
        comment,
        loading: {},
        uploadDocumentProgress: 0,
        disbursments,
        pageJobs,
        pageRents,
        pageStatements,
        pageAccountOverview: pageAccount,
        pageStatementTemplates,
      };
    }
    case `${SET_PAGE_UPDATE}${REQUEST}`: {
      return { ...state, loading: { general: true } };
    }
    case `${SET_PAGE_UPDATE}${FAILURE}`: {
      return { ...state, error: { callback: () => toastr.error('Error', action.error.message), errors: action.error.errors } };
    }
    case `${SET_PAGE_UPDATE}${SUCCESS}`: {
      const page = action.res.data.page;
      const comment = page.comment ? EditorState.createWithContent(stateFromHTML(page.comment)) : EditorState.createEmpty();
      return { ...state, page, comment, error: { callback: () => toastr.success('page', 'Updated') }, loading: {} };
    }
    case `${SET_PEOPLE_AUTOCOMPLETE}${SUCCESS}`: {
      return { ...state, peoples: action.res.data };
    }
    case SET_PAGE_PEOPLE: {
      const page = { ...state.page };
      page.tenant = action.payload;
      return { ...state, page, peoples: [] };
    }
    case `${SET_PROPERTY_AUTOCOMPLETE}${SUCCESS}`: {
      return { ...state, properties: action.res.data };
    }
    case SET_PAGE_PROPERTY: {
      const page = { ...state.page };
      page.property_id = action.payload[0] && action.payload[0].id;
      return { ...state, page, properties: [] };
    }
    case SET_PAGE_COMMENT: {
      return { ...state, comment: action.payload };
    }
    case SET_CLEAR_ERROR: {
      const error = state.error ? { ...state.error } : {};
      delete error.callback;
      return { ...state, error };
    }
    case SET_ERROR: {
      return { ...state, error: action.payload || {} };
    }
    case SET_PRINT_TEMPLATES: {
      return { ...state, printValues: action.payload };
    }
    case SET_HIDE_MODAL: {
      return { ...state, modal: '', error: {} };
    }
    case `${SET_NOTES_CATEGORY}${SUCCESS}`: {
      const noteCategories = action.res.data;
      return { ...state, noteCategories };
    }
    case `${SET_NOTES}${REQUEST}`: {
      return { ...state, modal: 'notes' };
    }
    case `${SET_NOTES}${SUCCESS}`: {
      const notes = action.res.data;
      return { ...state, notes };
    }
    case SET_NOTE_CREATE: {
      return { ...state, note: action.payload };
    }
    case `${SET_NOTE_CREATE}${SUCCESS}`: {
      const notes = [...state.notes];
      notes.push(action.res.data);
      return { ...state, notes, note: {}, error: { callback: () => toastr.success('Note', 'Note created!') } };
    }
    case `${SET_NOTE_CREATE}${FAILURE}`: {
      return { ...state, error: { callback: () => toastr.error('Error', action.error.message), errors: action.error.errors } };
    }
    case `${SET_NOTE_DELETE}${FAILURE}`: {
      return { ...state, error: { callback: () => toastr.error('Error', action.error.message), errors: action.error.errors } };
    }
    case `${SET_NOTE_DELETE}${SUCCESS}`: {
      const id = parseInt(action.res.id, 10);
      const notes = [...state.notes].filter(note => note.id !== id);
      return { ...state, notes, error: { callback: () => toastr.info('Note', 'Note deleted!') } };
    }
    case SET_LOADING: {
      const loading = action.payload;
      return { ...state, loading };
    }
    case SET_DOCUMENT_PROGRESS: {
      return { ...state, uploadDocumentProgress: action.payload };
    }
    case SET_CREATE_DOCUMENT: {
      return {
        ...state,
        documents: [action.payload].concat([...state.documents].filter(doc => doc.id !== action.payload.id)),
        propertyLoading: {}
      };
    }
    case `${SET_PAGE_DELETE}${SUCCESS}`: {
      const id = parseInt(action.res.id, 10);
      const pages = [...state.pages].filter(page => page.id !== id);
      return { ...state, pages, error: { callback: () => toastr.info('Deleted', 'page deleted!') } };
    }
    case SET_PAGE_CLEAR: {
      return { ...state, page: {}, modal: '', loading: {}, error: null, comment: EditorState.createEmpty() };
    }
    case `${SET_PAGE_JOBS}${SUCCESS}`: {
      return { ...state, pageJobs: action.res };
    }
    case SET_NEW_PAGE_JOB: {
      return { ...state, pageJob: {}, peoples: [], modal: 'job' };
    }
    case SET_PAGE_JOB: {
      return { ...state, pageJob: action.payload };
    }
    case `${SET_PAGE_JOB}${REQUEST}`: {
      return { ...state, modal: 'job' };
    }
    case `${SET_PAGE_JOB}${SUCCESS}`: {
      return { ...state, pageJob: action.res.data };
    }
    case `${SET_PAGE_JOB_PEOPLE_AUTOCOMPLETE}${SUCCESS}`: {
      return { ...state, peoples: action.res.data };
    }
    case `${SET_PAGE_JOB_UPDATE}${FAILURE}`: {
      const { errors } = action.error;
      return { ...state, error: { callback: () => toastr.error('Error', action.error.message), errors } };
    }
    case `${SET_PAGE_JOB_UPDATE}${SUCCESS}`: {
      const pageJob = { ...action.res.data };
      const pageJobs = state.pageJobs ? { ...state.pageJobs } : {};
      pageJobs.data = pageJobs.data ? [...pageJobs.data].map(job => (job.id === pageJob.id ? pageJob : job)) : [pageJob];
      return { ...state, pageJobs, pageJob: {}, modal: '', peoples: [] };
    }
    case `${SET_PAGE_JOB_CREATE}${FAILURE}`: {
      const { errors } = action.error;
      return { ...state, error: { callback: () => toastr.error('Error', action.error.message), errors } };
    }
    case `${SET_PAGE_JOB_CREATE}${SUCCESS}`: {
      const pageJob = { ...action.res.data };
      const pageJobs = state.pageJobs ? { ...state.pageJobs } : {};
      pageJobs.data = pageJobs.data ? [pageJob].concat([...pageJobs.data]) : [pageJob];
      return { ...state, pageJobs, pageJob: {}, modal: '', peoples: [] };
    }
    case `${SET_PAGE_JOB_DELETE}${SUCCESS}`: {
      const id = parseInt(action.res.id, 10);
      const pageJobs = state.pageJobs ? { ...state.pageJobs } : {};
      pageJobs.date = [...pageJobs.data].filter(job => job.id !== id);
      return { ...state, pageJobs };
    }
    case `${SET_PAGE_DISBURSMENTS}${SUCCESS}`: {
      return { ...state, disbursments: action.res };
    }
    case SET_NEW_PAGE_DISBURSEMENT: {
      return { ...state, disbursement: {}, modal: 'disbursement' };
    }
    case SET_PAGE_DISBURSEMENT: {
      return { ...state, disbursement: action.payload };
    }
    case `${SET_PAGE_DISBURSEMENT}${REQUEST}`: {
      return { ...state, modal: 'disbursement' };
    }
    case `${SET_PAGE_DISBURSEMENT}${SUCCESS}`: {
      return { ...state, disbursement: action.res.data };
    }
    case `${SET_PAGE_DISBURSEMENT_UPDATE}${FAILURE}`: {
      const { errors } = action.error;
      return { ...state, error: { callback: () => toastr.error('Error', action.error.message), errors } };
    }
    case `${SET_PAGE_DISBURSEMENT_UPDATE}${SUCCESS}`: {
      const disbursement = { ...action.res.data };
      const disbursments = state.disbursments ? { ...state.disbursments } : {};
      disbursments.data = disbursments.data ? [...disbursments.data].map(item => (item.id === disbursement.id ? disbursement : item)) : [disbursement];
      return { ...state, disbursments, disbursement: {}, modal: '' };
    }
    case `${SET_PAGE_DISBURSEMENT_CREATE}${FAILURE}`: {
      const { errors } = action.error;
      return { ...state, error: { callback: () => toastr.error('Error', action.error.message), errors } };
    }
    case `${SET_PAGE_DISBURSEMENT_CREATE}${SUCCESS}`: {
      const disbursement = { ...action.res.data };
      const disbursments = state.disbursments ? { ...state.disbursments } : {};
      disbursments.data = disbursments.data ? [disbursement].concat([...disbursments.data]) : [disbursement];
      return { ...state, disbursments, disbursement: {}, modal: '' };
    }
    case `${SET_PAGE_DISBURSEMENT_DELETE}${SUCCESS}`: {
      const id = parseInt(action.res.id, 10);
      const disbursments = state.disbursments ? { ...state.disbursments } : {};
      disbursments.data = [...disbursments.data].filter(item => item.id !== id);
      return { ...state, disbursments };
    }
    case `${SET_PAGE_RENTS}${FAILURE}`: {
      const { errors } = action.error;
      return { ...state, error: { callback: () => toastr.error('Error', action.error.message), errors } };
    }
    case `${SET_PAGE_RENTS}${SUCCESS}`: {
      const pageRents = action.res;
      return { ...state, pageRents, pageAccountOverview: action.res.overview };
    }
    case SET_NEW_PAGE_RENT: {
      return { ...state, pageRent: {}, modal: 'rent' };
    }
    case SET_PAGE_RENT: {
      return { ...state, pageRent: action.payload };
    }
    case `${SET_PAGE_RENT}${REQUEST}`: {
      return { ...state, modal: 'rent' };
    }
    case `${SET_PAGE_RENT}${SUCCESS}`: {
      return { ...state, pageRent: action.res.data };
    }
    case SET_PAGE_GENERATE_RENT: {
      return { ...state, pageGenerateRent: action.payload };
    }
    case `${SET_PAGE_RENT_UPDATE}${FAILURE}`: {
      const { errors } = action.error;
      return { ...state, error: { callback: () => toastr.error('Error', action.error.message), errors } };
    }
    case `${SET_PAGE_RENT_UPDATE}${SUCCESS}`: {
      const pageRent = { ...action.res.data };
      const pageRents = state.pageRents ? { ...state.pageRents } : {};
      pageRents.data = pageRents.data ? [...pageRents.data].map(item => (item.id === pageRent.id ? pageRent : item)) : [pageRent];
      return { ...state, pageRents, pageRent: {}, modal: '', pageGenerateRent: {}, pageAccountOverview: action.res.overview };
    }
    case `${SET_PAGE_RENT_CREATE}${FAILURE}`: {
      const { errors } = action.error;
      return { ...state, error: { callback: () => toastr.error('Error', action.error.message), errors } };
    }
    case `${SET_PAGE_RENT_CREATE}${SUCCESS}`: {
      const pageRent = { ...action.res.data };
      const pageRents = state.pageRents ? { ...state.pageRents } : {};
      pageRents.data = pageRents.data ? [pageRent].concat([...pageRents.data]) : [pageRent];
      return { ...state, pageRents, pageRent: {}, modal: '', pageGenerateRent: {}, pageAccountOverview: action.res.overview };
    }
    case `${SET_PAGE_RENT_DELETE}${SUCCESS}`: {
      const id = parseInt(action.res.id, 10);
      const pageRents = { ...state.pageRents };
      pageRents.data = [...pageRents.data].filter(item => item.id !== id);
      return { ...state, pageRents, pageGenerateRent: {}, pageAccountOverview: action.res.overview };
    }
    case SET_PAGE_RENT_ID: {
      // const pageRent = [...state.pageRents.data].find(item => item.id === action.payload);
      // console.log(state.pageRents.data);
      // console.log(pageRent);
      // const tenants = pageRent.tenant;
      return { ...state, pageRentDueId: action.payload };
    }
    case SET_SELECTED_RENT: {
      return { ...state, pageRent: action.payload, tenants: action.payload.tenant };
    }
    case `${SET_PAGE_PAYMENTS}${REQUEST}`: {
      return { ...state, modal: 'payment', pagePayment: {} };
    }
    case `${SET_PAGE_PAYMENTS}${SUCCESS}`: {
      return { ...state, pagePayments: action.res, pageAccountOverview: action.res.overview };
    }
    case SET_PAGE_PAYMENT: {
      return { ...state, pagePayment: action.payload };
    }
    case `${SET_PAGE_PAYMENT}${SUCCESS}`: {
      return { ...state, pagePayment: action.res.data, pageAccountOverview: action.res.overview };
    }
    case `${SET_PAGE_PAYMENT_UPDATE}${FAILURE}`: {
      const { errors } = action.error;
      return { ...state, error: { callback: () => toastr.error('Error', action.error.message), errors } };
    }
    case `${SET_PAGE_PAYMENT_UPDATE}${SUCCESS}`: {
      const pagePayment = { ...action.res.data };
      const pagePayments = state.pagePayments ? { ...state.pagePayments } : {};
      pagePayments.data = pagePayments.data ? [...pagePayments.data].map(item => (item.id === pagePayment.id ? pagePayment : item)) : [pagePayment];
      return { ...state, pagePayments, pagePayment: {}, error: {}, pageAccountOverview: action.res.overview };
    }
    case `${SET_PAGE_PAYMENT_CREATE}${FAILURE}`: {
      const { errors } = action.error;
      return { ...state, error: { callback: () => toastr.error('Error', action.error.message), errors } };
    }
    case `${SET_PAGE_PAYMENT_CREATE}${SUCCESS}`: {
      const pagePayment = { ...action.res.data };
      const pagePayments = state.pagePayments ? { ...state.pagePayments } : {};
      pagePayments.data = pagePayments.data ? [pagePayment].concat([...pagePayments.data]) : [pagePayment];
      return { ...state, pagePayments, pagePayment: {}, error: {}, pageAccountOverview: action.res.overview };
    }
    case `${SET_PAGE_PAYMENT_DELETE}${SUCCESS}`: {
      const id = parseInt(action.res.id, 10);
      const pagePayments = { ...state.pagePayments };
      pagePayments.data = [...pagePayments.data].filter(item => item.id !== id);
      return { ...state, pagePayments, pageAccountOverview: action.res.overview, error: {} };
    }
    case `${SET_PAGE_ACCOUNTS}${REQUEST}`: {
      return { ...state, modal: 'account' };
    }
    case `${SET_PAGE_ACCOUNTS}${SUCCESS}`: {
      return { ...state, pageAccounts: action.res };
    }
    case `${SET_PAGE_ACCOUNT_OVERVIEW}${SUCCESS}`: {
      return { ...state, pageAccountOverview: action.res.data };
    }
    case SET_PAGE_ACCOUNT: {
      return { ...state, pageAccount: action.payload };
    }
    case `${SET_PAGE_ACCOUNT}${SUCCESS}`: {
      return { ...state, pageAccount: action.res.data };
    }
    case `${SET_PAGE_ACCOUNT_UPDATE}${FAILURE}`: {
      const { errors } = action.error;
      return { ...state, error: { callback: () => toastr.error('Error', action.error.message), errors } };
    }
    case `${SET_PAGE_ACCOUNT_UPDATE}${SUCCESS}`: {
      const pageAccount = { ...action.res.data };
      const pageAccounts = state.pageAccounts ? { ...state.pageAccounts } : {};
      pageAccounts.data = pageAccounts.data ? [...pageAccounts.data].map(item => (item.id === pageAccount.id ? pageAccount : item)) : [pageAccount];
      return { ...state, pageAccounts, pageAccount: {}, error: { callback: () => toastr.success('Account', 'Account created!') } };
    }
    case `${SET_PAGE_ACCOUNT_CREATE}${FAILURE}`: {
      const { errors } = action.error;
      return { ...state, error: { callback: () => toastr.error('Error', action.error.message), errors } };
    }
    case `${SET_PAGE_ACCOUNT_CREATE}${SUCCESS}`: {
      const pageAccount = { ...action.res.data };
      const pageAccounts = state.pageAccounts ? { ...state.pageAccounts } : {};
      pageAccounts.data = pageAccounts.data ? [pageAccount].concat([...pageAccounts.data]) : [pageAccount];
      return { ...state, pageAccounts, pageAccount: {}, error: { callback: () => toastr.success('Account', 'Account created!') } };
    }
    case `${SET_PAGE_ACCOUNT_DELETE}${FAILURE}`: {
      return { ...state, error: { callback: () => toastr.error('Error', action.error.message), errors: action.error.errors } };
    }
    case `${SET_PAGE_ACCOUNT_DELETE}${SUCCESS}`: {
      const id = parseInt(action.res.id, 10);
      const pageAccounts = { ...state.pageAccounts };
      pageAccounts.data = [...pageAccounts.data].filter(item => item.id !== id);
      return { ...state, pageAccounts, error: { callback: () => toastr.info('Account', 'Account deleted!') } };
    }
    case `${SET_PAGE_STATEMENTS}${REQUEST}`: {
      return { ...state, modal: 'statement' };
    }
    case `${SET_PAGE_STATEMENTS}${SUCCESS}`: {
      return { ...state, pageStatements: action.res };
    }
    case SET_PAGE_STATEMENT: {
      return { ...state, pageStatement: action.payload };
    }
    case `${SET_PAGE_STATEMENT}${SUCCESS}`: {
      // const pageRent = [...state.pageRents.data].find(item => item.id === action.payload);
      // console.log(state.pageRents.data);
      // console.log(pageRent);
      // const tenants = pageRent.tenant;
      return { ...state, pageStatement: action.res.data };
    }
    case `${SET_PAGE_STATEMENT_CREATE}${FAILURE}`: {
      const { errors } = action.error;
      return { ...state, error: { callback: () => toastr.error('Error', action.error.message), errors } };
    }
    case `${SET_PAGE_STATEMENT_CREATE}${SUCCESS}`: {
      const pageStatement = { ...action.res.data };
      const pageStatements = state.pageStatements ? { ...state.pageStatements } : {};
      pageStatements.data = pageStatements.data ? [pageStatement].concat([...pageStatements.data]) : [pageStatement];
      return { ...state, pageStatements, pageStatement: {} };
    }
    case `${SET_PAGE_STATEMENT_DELETE}${SUCCESS}`: {
      const id = parseInt(action.res.id, 10);
      const pageStatements = { ...state.pageStatements };
      pageStatements.data = [...pageStatements.data].filter(item => item.id !== id);
      return { ...state, pageStatements };
    }
    case `${SET_PAGE_STATEMENT_TEMPLATE}${SUCCESS}`: {
      return { ...state, pageStatementTemplates: action.res };
    }
    case `${SET_PAGE_LANDLORDS}${REQUEST}`: {
      return { ...state, modal: 'landlord' };
    }
    case `${SET_PAGE_LANDLORDS}${SUCCESS}`: {
      return { ...state, pageLandlords: action.res, pageAccountOverview: action.res.overview };
    }
    case SET_PAGE_LANDLORD: {
      return { ...state, pageLandlord: action.payload };
    }
    case `${SET_PAGE_LANDLORD}${SUCCESS}`: {
      return { ...state, pageLandlord: action.res.data };
    }
    case `${SET_PAGE_LANDLORD_UPDATE}${FAILURE}`: {
      const { errors } = action.error;
      return { ...state, error: { callback: () => toastr.error('Error', action.error.message), errors } };
    }
    case `${SET_PAGE_LANDLORD_UPDATE}${SUCCESS}`: {
      const pageLandlord = { ...action.res.data };
      const pageLandlords = state.pageLandlords ? { ...state.pageLandlords } : {};
      pageLandlords.data = pageLandlords.data ? [...pageLandlords.data].map(item => (item.id === pageLandlord.id ? pageLandlord : item)) : [pageLandlord];
      return { ...state, pageLandlords, pageLandlord: {}, pageAccountOverview: action.res.overview };
    }
    case `${SET_PAGE_LANDLORD_CREATE}${FAILURE}`: {
      const { errors } = action.error;
      return { ...state, error: { callback: () => toastr.error('Error', action.error.message), errors } };
    }
    case `${SET_PAGE_LANDLORD_CREATE}${SUCCESS}`: {
      // const pageAccountOverview = { ...state.pageAccountOverview };
      const pageLandlord = { ...action.res.data };
      const pageLandlords = state.pageLandlords ? { ...state.pageLandlords } : {};
      // pageAccountOverview.landlord_due = `${parseInt(pageAccountOverview.landlord_due, 10) + }`
      pageLandlords.data = pageLandlords.data ? [pageLandlord].concat([...pageLandlords.data]) : [pageLandlord];
      return { ...state, pageLandlords, pageLandlord: {}, pageAccountOverview: action.res.overview };
    }
    case `${SET_PAGE_LANDLORD_DELETE}${SUCCESS}`: {
      const id = parseInt(action.res.id, 10);
      const pageLandlords = { ...state.pageLandlords };
      pageLandlords.data = [...pageLandlords.data].filter(item => item.id !== id);
      return { ...state, pageLandlords, pageAccountOverview: action.res.overview };
    }
    case SET_PAGE_SEARCH_PANEL: {
      return { ...state, searchPanel: !state.searchPanel };
    }
    case SET_NEW_PROPERTY: {
      return { ...state, newProperty: !state.newProperty };
    }
    case SET_NEW_CONTACT: {
      return { ...state, newContact: !state.newContact };
    }
    case `${SET_QUICK_PROPERTY}${FAILURE}`: {
      return { ...state, error: { callback: () => toastr.error('Create Contact Error', action.error.message), errors: action.error.errors } };
    }
    case `${SET_QUICK_PROPERTY}${SUCCESS}`: {
      const property = action.res.data.property;
      property.address = property.address_1;
      const page = { ...state.page };
      page.property = property;
      return { ...state, page, newProperty: false };
    }
    case `${SET_QUICK_CONTACT}${FAILURE}`: {
      return { ...state, error: { callback: () => toastr.error('Create Contact Error', action.error.message), errors: action.error.errors } };
    }
    case `${SET_QUICK_CONTACT}${SUCCESS}`: {
      const contact = action.res.data.contact;
      contact.name = contact.full_name;
      const page = { ...state.page };
      page.tenant = [...page.tenant].concat([contact]);
      return { ...state, page, newContact: false };
    }
    case `${SET_PAGE_LANDLORDS_DUE}${SUCCESS}`: {
      return { ...state, landlordsDue: action.res };
    }
    case `${SET_PAGE_CLIENT_ACCOUNT}${SUCCESS}`: {
      return { ...state, clientAccounts: action.res };
    }
    case `${SET_PAGE_CLIENT_OVERVIEW}${SUCCESS}`: {
      return { ...state, clientAccountsOverview: action.res.data };
    }
    case `${SET_EMAILS}${REQUEST}`: {
      return { ...state, modal: 'emails' };
    }
    case `${SET_EMAILS}${SUCCESS}`: {
      const emails = action.res.data;
      return { ...state, emails };
    }
    case SET_EMAIL: {
      return { ...state, email: action.payload };
    }
    case `${SET_EMAIL_CREATE}${SUCCESS}`: {
      const emails = [action.res.data].concat([...state.emails]);
      const email = { ...state.email };
      delete email.message;
      delete email.subject;
      return { ...state, emails, email, printedDoc: null, error: { callback: () => toastr.success('Sent', 'Mesasge sent!') } };
    }
    case `${SET_EMAIL_CREATE}${FAILURE}`: {
      return { ...state, error: { callback: () => toastr.error('Error', action.error.message), errors: action.error.errors } };
    }
    case SET_PRINTED_DOCUMENT: {
      return { ...state, loading: {}, printedDoc: action.payload };
    }
    case SET_PAGES_SEARCH: {
      return { ...state, searchValues: action.payload };
    }
    default: return state;
  }
};

export const getpages = () => ({ type: SET_PAGES, promise: fetch() });
export const getpageInfo = id => ({ type: SET_PAGE, promise: pageInfo(id) });
export const deletepage = id => ({ type: SET_PAGE_DELETE, promise: pageDelete(id) });
export const mainFormChange = event => (dispatch, getState) => {
  const page = { ...getState().app.pages.page } || {};
  page[event.target.name] = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
  dispatch({ type: SET_PAGE, payload: page });
};
export const mainFormSubmit = event => (dispatch, getState) => {
  event.preventDefault();
  const state = { ...getState().app.pages };
  const page = { ...state.page };
  const comment = state.comment;
  const raw = comment && comment.getCurrentContent();
  if (raw) {
    page.comment = stateToHTML(raw);
  }
  page.tenant = page.tenant && page.tenant.map(tenant => tenant.id).join(',');
  if (page.id) {
    page.property_id = page.property_id || (page.property && page.property.id);
    console.log(page);
    dispatch({ type: SET_PAGE_UPDATE, promise: pageUpdate(page) });
  } else {
    pageCreate(page)
      .then(({ id }) => browserHistory.push(juvo.pages.infoLink(id)))
      .catch((err) => {
        const { errors } = err;
        dispatch({ type: SET_ERROR, payload: { callback: () => toastr.error('Error', err.message), errors } });
      });
  }
};
export const handleClientChange = data => ({ type: SET_PEOPLE_AUTOCOMPLETE, promise: peopleAutocomplete(data) });
export const handleClientSelect = id => ({ type: SET_PAGE_PEOPLE, payload: id });
export const handlePropertyChange = data => ({ type: SET_PROPERTY_AUTOCOMPLETE, promise: propertyAutocomplete(data) });
export const handlePropertySelect = id => ({ type: SET_PAGE_PROPERTY, payload: id });
export const mainFormAgreedDateChange = (event) => {
  return (dispatch, getState) => {
    const page = { ...getState().app.pages.page };
    const date = moment(Date.parse(event));
    page.let_date_agreed = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: SET_PAGE, payload: page });
  };
};
export const mainFormStartDateChange = (event) => {
  return (dispatch, getState) => {
    const page = { ...getState().app.pages.page };
    const date = moment(Date.parse(event));
    page.start_date = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: SET_PAGE, payload: page });
  };
};
export const mainFormEndDateChange = (event) => {
  return (dispatch, getState) => {
    const page = { ...getState().app.pages.page };
    const date = moment(Date.parse(event));
    page.end_date = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: SET_PAGE, payload: page });
  };
};
export const changeComment = editorState => ({ type: SET_PAGE_COMMENT, payload: editorState });
export const toggleBlockType = (blockType) => {
  return (dispatch, getState) => {
    const comment = getState().app.pages.comment;
    dispatch(changeComment(RichUtils.toggleBlockType(comment, blockType)));
  };
};
export const toggleInlineStyle = (inlineStyle) => {
  return (dispatch, getState) => {
    const comment = getState().app.pages.comment;
    dispatch(changeComment(RichUtils.toggleInlineStyle(comment, inlineStyle)));
  };
};
export const clearError = error => ({ type: SET_CLEAR_ERROR, payload: error });
export const handleNotesClick = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    dispatch({ type: SET_NOTES, promise: getpageNotes({ page_id: getState().app.pages.page.id }) });
    dispatch({ type: SET_NOTES_CATEGORY, promise: getNotesCategory() });
  };
};
export const handlePrintChange = (event) => {
  return (dispatch, getState) => {
    const printValues = { ...getState().app.pages.printValues } || {};
    if (event.target.type === 'checkbox') {
      printValues[event.target.name] = event.target.checked;
    } else {
      printValues[event.target.name] = event.target.value;
    }
    dispatch({ type: SET_PRINT_TEMPLATES, payload: printValues });
  };
};
export const handleNoteCreate = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const state = { ...getState().app.pages };
    const { page, noteCategories } = state;
    const note = state.note ? { ...state.note } : {};
    note.page_id = page.id;
    note.category_id = note.category_id || noteCategories[0].id;
    dispatch({ type: SET_NOTE_CREATE, promise: createNote(note) });
  };
};
export const handleNoteChange = (event) => {
  return (dispatch, getState) => {
    const note = { ...getState().app.pages.note };
    note[event.target.name] = event.target.value;
    dispatch({ type: SET_NOTE_CREATE, payload: note });
  };
};
export const handleNoteDelete = id => ({ type: SET_NOTE_DELETE, promise: deleteNote({ id }) });
export const handlePrintSubmit = event => (dispatch, getState) => {
  event.preventDefault();
  dispatch({ type: SET_LOADING, payload: { print: true } });
  const state = { ...getState().app.pages };
  const printValues = { ...state.printValues } || {};
  printValues.template_id = printValues.template_id || state.printTemplates[0].id;
  printValues.id = state.page.id;
  dispatch({ type: SET_ERROR, payload: { callback: () => toastr.info('Printing', 'Generating Print Template') } });
  printTemplate(printValues)
    .then((response) => {
      dispatch({ type: SET_PRINTED_DOCUMENT, payload: response.doc });
      const url = response.url;
      if (printValues.sendEmail) {
        dispatch({ type: SET_EMAILS, promise: fetchEmails({ page_id: state.page.id }) });
      } else {
        dispatch({ type: SET_CREATE_DOCUMENT, payload: response.doc });
        downloadFile(url, response.doc.filename);
      }
      // .then(() => dispatch({ type: SET_CREATE_DOCUMENT, payload: response.doc }))
      // .catch(() => {
      //   dispatch({ type: SET_ERROR, payload: { callback: () => toastr.error('Error', 'Download failed') } });
      //   dispatch({ type: SET_LOADING, payload: {} });
      // });
    }).catch((error) => {
      const { errors } = error;
      dispatch({ type: SET_ERROR, payload: { callback: () => toastr.error('Error', error.message), errors } });
      dispatch({ type: SET_LOADING, payload: {} });
    });
};
export const handleDocumentUpload = (event) => {
  return (dispatch, getState) => {
    dispatch({ type: SET_DOCUMENT_PROGRESS, payload: 0 });
    const files = Object.keys(event.target.files).map(file => event.target.files[file]);
    const uploadProggress = [];
    let total = 0;
    const timer = window.setInterval(() => {
      total = uploadProggress.reduce((sum, current) => (sum + current), 0) / uploadProggress.length;
      if (total === 100) {
        window.clearInterval(timer);
      }
      dispatch({ type: SET_DOCUMENT_PROGRESS, payload: total });
    }, 500);
    const aws = {};
    // eslint-disable-next-line
    event.target.value = '';
    const state = { ...getState().app.pages };
    getDocumentSign()
      .then(({ data }) => {
        aws.accessKey = (data && data.access_key) || null;
        aws.policy = (data && data.policy) || null;
        aws.signature = (data && data.signature) || null;
        if (aws.accessKey && aws.policy && aws.signature) {
          files.forEach((file, index) => {
            const fileToUpload = {
              filename: file.name,
              filesize: file.size,
              page_id: state.page.id,
            };
            const uploadAmazon = (fileInfo) => {
              return new Promise((resolve, reject) => {
                const doc = new FormData();
                doc.append('key', fileInfo.filename);
                doc.append('acl', 'private');
                doc.append('Content-Type', 'binary/octet-stream');
                doc.append('AWSAccessKeyId', aws.accessKey);
                doc.append('Policy', aws.policy);
                doc.append('Signature', aws.signature);
                doc.append('file', file);
                doc.append('filesize', file.size);

                const request = superagent();
                try {
                  request
                    .post(URL_AWS_DOCUMENTS)
                    .send(doc)
                    .on('progress', (e) => {
                      uploadProggress[fileInfo.index] = e.percent;
                      // const total = uploadProggress.reduce((sum, current) => (sum + current), 0) / uploadProggress.length;
                      // dispatch({ type: SET_DOCUMENT_PROGRESS, payload: total });
                    })
                    .end((err, res) => {
                      uploadProggress[fileInfo.index] = 100;
                      // const total = uploadProggress.reduce((sum, current) => (sum + current), 0) / uploadProggress.length;
                      // dispatch({ type: SET_IMAGE_PROGRESS, payload: total });
                      if (err) {
                        reject(err);
                      }
                      if (res) {
                        const result = { ...res };
                        result.data = fileInfo.data;
                        resolve(result);
                      }
                    });
                } catch (ex) {
                  window.clearInterval(timer);
                  reject(ex);
                }
              });
            };

            const uploadDocuments = new Promise((resolve, reject) => {
              const currentFile = index;
              createDocuments(fileToUpload)
                .then((response) => {
                  const result = response;
                  result.index = currentFile;
                  resolve(result);
                })
                .catch(error => reject(error));
            });

            uploadDocuments
              .then((response) => {
                uploadAmazon(response)
                  .then((resFile) => {
                    dispatch({ type: SET_CREATE_DOCUMENT, payload: resFile.data });
                  });
              }, error => console.log(error))
              .then(() => { }, error => console.log(error));
          });
        }
      })
      .catch(error => console.log(error));
  };
};
export const handleDocumentDownload = (id, filename) => {
  return () => {
    downloadDocument(id).then((response) => {
      const { url } = response.data;
      downloadFile(url, filename);
    }).catch(error => toastr.error('Download', error.message));
  };
};
export const handleDocumentDelete = id => ({ type: SET_PAGE_DELETE, promise: deleteDocument(id) });
export const clearpageInfo = () => ({ type: SET_PAGE_CLEAR });
// page JOB
export const getpageJobs = data => ({ type: SET_PAGE_JOBS, promise: fetchpageJobs(data) });
export const getpageJobInfo = id => ({ type: SET_PAGE_JOB, promise: pageJobInfo(id) });
export const addpageJob = () => ({ type: SET_NEW_PAGE_JOB });
export const handlepageJobChange = event => (dispatch, getState) => {
  const state = { ...getState().app.pages };
  const pageJob = state.pageJob ? { ...state.pageJob } : {};
  if (event.target.type === 'checkbox') {
    pageJob[event.target.name] = event.target.checked;
  } else {
    pageJob[event.target.name] = event.target.value;
  }
  dispatch({ type: SET_PAGE_JOB, payload: pageJob });
};
export const handlepageJobSubmit = event => (dispatch, getState) => {
  event.preventDefault();
  const state = { ...getState().app.pages };
  const pageJob = state.pageJob ? { ...state.pageJob } : {};
  pageJob.page_id = state.page.id;
  pageJob.people_id = (pageJob.contact && pageJob.contact.id);
  if (pageJob.id) {
    dispatch({ type: SET_PAGE_JOB_UPDATE, promise: pageJobUpdate(pageJob) });
  } else {
    dispatch({ type: SET_PAGE_JOB_CREATE, promise: pageJobCreate(pageJob) });
  }
};
export const deletepageJob = data => ({ type: SET_PAGE_JOB_DELETE, promise: pageJobDelete(data) });
export const handleJobClientChange = data => ({ type: SET_PAGE_JOB_PEOPLE_AUTOCOMPLETE, promise: peopleAutocomplete(data) });
export const handleJobClientSelect = data => (dispatch, getState) => {
  const state = { ...getState().app.pages };
  const pageJob = state.pageJob ? { ...state.pageJob } : {};
  pageJob.contact = data[0];
  dispatch({ type: SET_PAGE_JOB, payload: pageJob });
};
export const jobScheludeDateChange = (event) => {
  return (dispatch, getState) => {
    const pageJob = { ...getState().app.pages.pageJob };
    const date = moment(Date.parse(event));
    pageJob.scheduled_date = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: SET_PAGE_JOB, payload: pageJob });
  };
};
export const jobCompletionDateChange = (event) => {
  return (dispatch, getState) => {
    const pageJob = { ...getState().app.pages.pageJob };
    const date = moment(Date.parse(event));
    pageJob.completion_date = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: SET_PAGE_JOB, payload: pageJob });
  };
};
export const getNextJobs = () => (dispatch, getState) => {
  const state = { ...getState().app.pages };
  const pageRents = state.pageRents ? { ...state.pageRents } : {};
  const data = {
    page_id: state.page.id,
    page: pageRents.current_page + 1,
  };
  dispatch(getpageJobs(data));
};
export const getPreviousJobs = () => (dispatch, getState) => {
  const state = { ...getState().app.pages };
  const pageRents = state.pageRents ? { ...state.pageRents } : {};
  const data = {
    page_id: state.page.id,
    page: pageRents.current_page - 1,
  };
  dispatch(getpageJobs(data));
};
// page DISBUSEMENT
export const getDisbursments = data => ({ type: SET_PAGE_DISBURSMENTS, promise: fetchDisbursments(data) });
export const getDisbursementInfo = id => ({ type: SET_PAGE_DISBURSEMENT, promise: disbursementInfo(id) });
export const addDisbursement = () => ({ type: SET_NEW_PAGE_DISBURSEMENT });
export const handleDisbursementChange = event => (dispatch, getState) => {
  const state = { ...getState().app.pages };
  const disbursement = state.disbursement ? { ...state.disbursement } : {};
  if (event.target.type === 'checkbox') {
    disbursement[event.target.name] = event.target.checked;
  } else {
    disbursement[event.target.name] = event.target.value;
  }
  dispatch({ type: SET_PAGE_DISBURSEMENT, payload: disbursement });
};
export const disbursementDateChange = (event) => {
  return (dispatch, getState) => {
    const disbursement = { ...getState().app.pages.disbursement };
    const date = moment(Date.parse(event));
    disbursement.date_raised = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: SET_PAGE_DISBURSEMENT, payload: disbursement });
  };
};
export const handleDisbursementSubmit = event => (dispatch, getState) => {
  event.preventDefault();
  const state = { ...getState().app.pages };
  const disbursement = state.disbursement ? { ...state.disbursement } : {};
  disbursement.page_id = state.page.id;
  if (disbursement.id) {
    dispatch({ type: SET_PAGE_DISBURSEMENT_UPDATE, promise: disbursementUpdate(disbursement) });
  } else {
    dispatch({ type: SET_PAGE_DISBURSEMENT_CREATE, promise: disbursementCreate(disbursement) });
  }
};
export const deleteDisbursement = data => ({ type: SET_PAGE_DISBURSEMENT_DELETE, promise: disbursementDelete(data) });
export const getNextDisbursments = () => (dispatch, getState) => {
  const state = { ...getState().app.pages };
  const pageRents = state.pageRents ? { ...state.pageRents } : {};
  const data = {
    page_id: state.page.id,
    page: pageRents.current_page + 1,
  };
  dispatch(getDisbursments(data));
};
export const getPreviousDisbursments = () => (dispatch, getState) => {
  const state = { ...getState().app.pages };
  const pageRents = state.pageRents ? { ...state.pageRents } : {};
  const data = {
    page_id: state.page.id,
    page: pageRents.current_page - 1,
  };
  dispatch(getDisbursments(data));
};
// page RENT
export const getpageRents = data => ({ type: SET_PAGE_RENTS, promise: fetchpageRents(data) });
export const getpageRentInfo = id => ({ type: SET_PAGE_RENT, promise: pageRentInfo(id) });
export const addpageRent = () => ({ type: SET_NEW_PAGE_RENT });
export const handlepageRentChange = event => (dispatch, getState) => {
  const state = { ...getState().app.pages };
  const pageRent = state.pageRent ? { ...state.pageRent } : {};
  if (event.target.type === 'checkbox') {
    pageRent[event.target.name] = event.target.checked;
  } else {
    pageRent[event.target.name] = event.target.value;
  }
  dispatch({ type: SET_PAGE_RENT, payload: pageRent });
};
export const handlepageRentDateChange = (event) => {
  return (dispatch, getState) => {
    const pageRent = { ...getState().app.pages.pageRent };
    const date = moment(Date.parse(event));
    pageRent.due_date = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: SET_PAGE_RENT, payload: pageRent });
  };
};
export const handlepageRentStartDateChange = (event) => {
  return (dispatch, getState) => {
    const pageGenerateRent = { ...getState().app.pages.pageGenerateRent };
    const date = moment(Date.parse(event));
    pageGenerateRent.start_date = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: SET_PAGE_GENERATE_RENT, payload: pageGenerateRent });
  };
};
export const handlepageRentEndDateChange = (event) => {
  return (dispatch, getState) => {
    const pageGenerateRent = { ...getState().app.pages.pageGenerateRent };
    const date = moment(Date.parse(event));
    pageGenerateRent.end_date = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: SET_PAGE_GENERATE_RENT, payload: pageGenerateRent });
  };
};
export const handleGenerateRentSubmit = event => (dispatch, getState) => {
  event.preventDefault();
  const state = { ...getState().app.pages };
  const pageGenerateRent = state.pageGenerateRent ? { ...state.pageGenerateRent } : {};
  pageGenerateRent.page_id = state.page.id;
  dispatch({ type: SET_PAGE_RENTS, promise: pageRentGenerate(pageGenerateRent) });
};
export const handlepageRentSubmit = event => (dispatch, getState) => {
  event.preventDefault();
  const state = { ...getState().app.pages };
  const pageRent = state.pageRent ? { ...state.pageRent } : {};
  if (pageRent.id) {
    dispatch({ type: SET_PAGE_RENT_UPDATE, promise: pageRentUpdate(pageRent) });
  } else {
    pageRent.page_id = state.page.id;
    dispatch({ type: SET_PAGE_RENT_CREATE, promise: pageRentCreate(pageRent) });
  }
};
export const deletepageRent = data => ({ type: SET_PAGE_RENT_DELETE, promise: pageRentDelete(data) });
export const getNextRents = () => (dispatch, getState) => {
  const state = { ...getState().app.pages };
  const pageRents = state.pageRents ? { ...state.pageRents } : {};
  const data = {
    page_id: state.page.id,
    page: pageRents.current_page + 1,
  };
  dispatch(getpageRents(data));
};
export const getPreviousRents = () => (dispatch, getState) => {
  const state = { ...getState().app.pages };
  const pageRents = state.pageRents ? { ...state.pageRents } : {};
  const data = {
    page_id: state.page.id,
    page: pageRents.current_page - 1,
  };
  dispatch(getpageRents(data));
};
// page RENT PAYMENT
export const getpagePayments = id => (dispatch, getState) => {
  const pageId = typeof (id) === 'object' ? getState().app.pages.page.id : (id || getState().app.pages.page.id);
  dispatch({ type: SET_PAGE_PAYMENTS, promise: fetchpagePayments({ page_id: pageId, page: 1 }) });
};
export const handlepagePaymentChange = event => (dispatch, getState) => {
  const pagePayment = { ...getState().app.pages.pagePayment };
  pagePayment[event.target.name] = event.target.value;
  dispatch({ type: SET_PAGE_PAYMENT, payload: pagePayment });
};
export const handlepagePaymentDateChange = (event) => {
  return (dispatch, getState) => {
    const pagePayment = { ...getState().app.pages.pagePayment };
    const date = moment(Date.parse(event));
    pagePayment.date_received = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: SET_PAGE_PAYMENT, payload: pagePayment });
  };
};
export const handlepagePatmentSubmit = event => (dispatch, getState) => {
  event.preventDefault();
  const state = { ...getState().app.pages };
  const pageId = state.page.id;
  const pagePayment = { ...state.pagePayment };
  pagePayment.page_id = pageId;
  pagePayment.page_rent_due_id = state.pageRentDueId;
  pagePayment.people_id = pagePayment.people_id || (pagePayment.tenant && pagePayment.tenant[0] && pagePayment.tenant[0].id);
  if (pagePayment.id) {
    dispatch({ type: SET_PAGE_PAYMENT_UPDATE, promise: pagePaymentUpdate(pagePayment) });
  } else {
    dispatch({ type: SET_PAGE_PAYMENT_CREATE, promise: pagePaymentCreate(pagePayment) });
  }
};
export const handlepagePaymentNext = () => (dispatch, getState) => {
  const state = { ...getState().app.pages };
  const pagePayments = state.pagePayments ? { ...state.pagePayments } : {};
  const data = {
    page_rent_due_id: state.pageRentDueId,
    page: pagePayments.current_page + 1,
  };
  dispatch(getpageRents(data));
};
export const handlepagePaymentPrevious = () => (dispatch, getState) => {
  const state = { ...getState().app.pages };
  const pagePayments = state.pagePayments ? { ...state.pagePayments } : {};
  const data = {
    page_rent_due_id: state.pageRentDueId,
    page: pagePayments.current_page - 1,
  };
  dispatch(getpageRents(data));
};
export const clearpagePayment = () => ({ type: SET_PAGE_PAYMENT, payload: {} });
export const getpagePaymentInfo = id => ({ type: SET_PAGE_PAYMENT, promise: pagePaymentInfo(id) });
export const deletepagePayment = id => ({ type: SET_PAGE_PAYMENT_DELETE, promise: pagePaymentDelete(id) });
export const confirmpageRent = (rent) => {
  if (rent.confirm) {
    return { type: SET_PAGE_RENT_UPDATE, promise: pageRentUnconfirm(rent.id) };
  }
  return { type: SET_PAGE_RENT_UPDATE, promise: pageRentConfirm(rent.id) };
};
// page ACCOUNT
export const getpageAccounts = data => ({ type: SET_PAGE_ACCOUNTS, promise: fetchpageAccounts(data) });
export const handleAccountClick = () => (dispatch, getState) => {
  const id = getState().app.pages.page.id;
  dispatch(getpageAccounts({ page_id: id }));
};
export const getpageAccountOverview = id => ({ type: SET_PAGE_ACCOUNT_OVERVIEW, promise: pageAccountOverview(id) });
export const handlepageAccountNext = () => (dispatch, getState) => {
  const state = { ...getState().app.pages };
  const pageAccounts = state.pageAccounts ? { ...state.pageAccounts } : {};
  const data = {
    page_id: state.page.id,
    page: pageAccounts.current_page + 1,
  };
  dispatch(getpageAccounts(data));
};
export const handlepageAccountPrevious = () => (dispatch, getState) => {
  const state = { ...getState().app.pages };
  const pageAccounts = state.pageAccounts ? { ...state.pageAccounts } : {};
  const data = {
    page_id: state.page.id,
    page: pageAccounts.current_page - 1,
  };
  dispatch(getpageAccounts(data));
};
export const getpageAccountInfo = id => ({ type: SET_PAGE_ACCOUNT, promise: pageAccountInfo(id) });
export const handlepageAccountChange = event => (dispatch, getState) => {
  const pageAccount = { ...getState().app.pages.pageAccount };
  pageAccount[event.target.name] = event.target.value;
  dispatch({ type: SET_PAGE_ACCOUNT, payload: pageAccount });
};
export const handlepageAccountDateChange = (event) => {
  return (dispatch, getState) => {
    const pageAccount = { ...getState().app.pages.pageAccount };
    const date = moment(Date.parse(event));
    pageAccount.date_received = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: SET_PAGE_ACCOUNT, payload: pageAccount });
  };
};
export const handlepageAccountSubmit = event => (dispatch, getState) => {
  event.preventDefault();
  const state = { ...getState().app.pages };
  const pageAccount = { ...state.pageAccount };
  pageAccount.page_id = state.page.id;
  if (pageAccount.id) {
    dispatch({ type: SET_PAGE_ACCOUNT_UPDATE, promise: pageAccountUpdate(pageAccount) });
  } else {
    dispatch({ type: SET_PAGE_ACCOUNT_CREATE, promise: pageAccountCreate(pageAccount) });
  }
};
export const clearpageAccount = () => ({ type: SET_PAGE_ACCOUNT, payload: {} });
export const deletepageAccount = id => ({ type: SET_PAGE_ACCOUNT_DELETE, promise: pageAccountDelete(id) });
// page STATEMENT
export const setSelectedRent = data => ({ type: SET_SELECTED_RENT, payload: data });
export const getpageStatements = data => (dispatch, getState) => {
  const page = getState().app.pages.page ? { ...getState().app.pages.page } : {};
  page.id = (page.id && page.id === data.page_id) ? page.id : data.page_id;
  dispatch({ type: SET_PAGE, payload: page });
  dispatch({ type: SET_PAGE_STATEMENTS, promise: fetchpageStatements(data) });
};
export const handlepageStatementNext = () => (dispatch, getState) => {
  const state = { ...getState().app.pages };
  const pageStatements = state.pageStatements ? { ...state.pageStatements } : {};
  const data = {
    page_id: state.page.id,
    page: pageStatements.current_page + 1,
  };
  dispatch(getpageStatements(data));
};
export const handlepageStatementPrevious = () => (dispatch, getState) => {
  const state = { ...getState().app.pages };
  const pageStatements = state.pageStatements ? { ...state.pageStatements } : {};
  const data = {
    page_id: state.page.id,
    page: pageStatements.current_page - 1,
  };
  dispatch(getpageStatements(data));
};
export const getpageStatementInfo = id => ({ type: SET_PAGE_STATEMENT, promise: pageStatementInfo(id) });
export const handlepageStatementChange = event => (dispatch, getState) => {
  const state = { ...getState().app.pages };
  const pageStatement = { ...state.pageStatement };
  pageStatement[event.target.name] = event.target.value;
  dispatch({ type: SET_PAGE_STATEMENT, payload: pageStatement });
  if (event.target.name === 'type_id') {
    const pageStatements = { ...state.pageStatement };
    const data = {
      page_id: state.page.id,
      page: pageStatements.current_page,
    };
    dispatch(getpageStatements(data));
  }
};
export const handlepageStatementStartDateChange = (event) => {
  return (dispatch, getState) => {
    const pageStatement = { ...getState().app.pages.pageStatement };
    const date = moment(Date.parse(event));
    pageStatement.start_date = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: SET_PAGE_STATEMENT, payload: pageStatement });
  };
};
export const handlepageStatementEndtDateChange = (event) => {
  return (dispatch, getState) => {
    const pageStatement = { ...getState().app.pages.pageStatement };
    const date = moment(Date.parse(event));
    pageStatement.end_date = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: SET_PAGE_STATEMENT, payload: pageStatement });
  };
};
export const handlepageStatementSubmit = event => (dispatch, getState) => {
  event.preventDefault();
  const state = { ...getState().app.pages };
  const pageStatement = { ...state.pageStatement };
  pageStatement.page_id = state.page.id;
  dispatch({ type: SET_PAGE_STATEMENT_CREATE, promise: pageStatementCreate(pageStatement) });
};
export const deletepageStatement = id => ({ type: SET_PAGE_STATEMENT_DELETE, promise: pageStatementDelete(id) });
export const getpageStatementTemplate = () => ({ type: SET_PAGE_STATEMENT_TEMPLATE, promise: pageStatementTemplate() });
export const handleTemplateDownload = (id, filename) => {
  return () => {
    pageStatementFile(id).then((response) => {
      console.log(response);
      const { url } = response.data;
      downloadFile(url, filename);
    }).catch(error => toastr.error('Download', error.message));
  };
};
export const handleClose = () => ({ type: SET_HIDE_MODAL });
// page LANDLORD
export const getpageLandlords = () => (dispatch, getState) => {
  const id = getState().app.pages.page.id;
  dispatch({ type: SET_PAGE_LANDLORDS, promise: fetchpageLandlord({ page_id: id, page: 1 }) });
};
export const getpageLandlordsStandalone = data => ({ type: SET_PAGE_LANDLORDS, promise: fetchpageLandlord(data) });

export const handlepageLandlordChange = event => (dispatch, getState) => {
  const pageLandlord = { ...getState().app.pages.pageLandlord };
  pageLandlord[event.target.name] = event.target.value;
  dispatch({ type: SET_PAGE_LANDLORD, payload: pageLandlord });
};
export const handlepageLandlordDateChange = (event) => {
  return (dispatch, getState) => {
    const pageLandlord = { ...getState().app.pages.pageLandlord };
    const date = moment(Date.parse(event));
    pageLandlord.date_received = date.format('YYYY-MM-DD HH:mm');
    dispatch({ type: SET_PAGE_LANDLORD, payload: pageLandlord });
  };
};
export const handlepageLandlordSubmit = event => (dispatch, getState) => {
  event.preventDefault();
  const state = { ...getState().app.pages };
  const pageId = state.page.id;
  const pageLandlord = { ...state.pageLandlord };
  pageLandlord.page_id = pageId;
  pageLandlord.page_rent_due_id = state.pageRentDueId;
  if (pageLandlord.id) {
    dispatch({ type: SET_PAGE_LANDLORD_UPDATE, promise: pageLandlordUpdate(pageLandlord) });
  } else {
    dispatch({ type: SET_PAGE_LANDLORD_CREATE, promise: pageLandlordCreate(pageLandlord) });
  }
};
export const handlepageLandlordNext = () => (dispatch, getState) => {
  const state = { ...getState().app.pages };
  const pageId = state.page.id;
  const pageLandlord = state.pageLandlord ? { ...state.pageLandlord } : {};
  const data = {
    page_id: pageId,
    page_rent_due_id: state.pageRentDueId,
    page: pageLandlord.current_page + 1,
  };
  dispatch(getpageLandlords(data));
};
export const handlepageLandlordPrevious = () => (dispatch, getState) => {
  const state = { ...getState().app.pages };
  const pageId = state.page.id;
  const pageLandlords = state.pageLandlords ? { ...state.pageLandlords } : {};
  const data = {
    page_id: pageId,
    page_rent_due_id: state.pageRentDueId,
    page: pageLandlords.current_page - 1,
  };
  dispatch(getpageLandlords(data));
};
export const clearpageLandlord = () => ({ type: SET_PAGE_LANDLORD, payload: {} });
export const getpageLandlordInfo = id => ({ type: SET_PAGE_LANDLORD, promise: pageLandlordInfo(id) });
export const deletepageLandlord = id => ({ type: SET_PAGE_LANDLORD_DELETE, promise: pageLandlordDelete(id) });
export const toggleSearch = () => ({ type: SET_PAGE_SEARCH_PANEL });
export const addNewContact = event => (dispatch) => {
  if (event && event.preventDefault) {
    event.preventDefault();
  }
  dispatch({ type: SET_NEW_CONTACT });
};
export const addNewProperty = event => (dispatch) => {
  if (event && event.preventDefault) {
    event.preventDefault();
  }
  dispatch({ type: SET_NEW_PROPERTY });
};
export const quickCreateContact = contact => ({ type: SET_QUICK_CONTACT, promise: createContact(contact) });
export const quickCreateProperty = contact => ({ type: SET_QUICK_PROPERTY, promise: propertyQuickCreate(contact) });
export const getLandlordsDue = data => ({ type: SET_PAGE_LANDLORDS_DUE, promise: fetchpageLandlordDue(data) });
export const getpageClient = data => ({ type: SET_PAGE_CLIENT_ACCOUNT, promise: fetchpageClient(data) });
export const getpageClientOverview = data => ({ type: SET_PAGE_CLIENT_OVERVIEW, promise: fetchpageClientOverview(data) });
export const exportManagementFees = data => ({ type: 'qq', promise: exportManagementFee(data) });
export const exportVats = data => ({ type: 'qq', promise: exportVat(data) });
export const handleEmailChange = event => (dispatch, getState) => {
  const email = { ...getState().app.pages.email };
  email[event.target.name] = event.target.value;
  dispatch({ type: SET_EMAIL, payload: email });
};
export const handleEmailCreate = (event) => {
  event.preventDefault();
  return (dispatch, getState) => {
    const state = getState().app.pages;
    const { page } = { ...state };
    const email = state.email ? { ...state.email } : {};
    email.document_id = state.printedDoc && state.printedDoc.id;
    email.page_id = page.id;
    dispatch({ type: SET_EMAIL_CREATE, promise: createEmail(email) });
  };
};
export const handleAttachmentRemove = () => ({ type: SET_PRINTED_DOCUMENT });
export const handleTemplateChange = template => (dispatch, getState) => {
  const state = { ...getState().app.pages };
  const email = state.email ? { ...state.email } : {};
  email.subject = template.subject;
  email.message = template.message;
  dispatch({ type: SET_EMAIL, payload: email });
};
export const fetchpages = (page = 1) => {
  return (dispatch, getState) => {
    const searchValues = { ...getState().app.pages.searchValues } || {};
    searchValues.page = page;
    dispatch({ type: SET_PAGES, promise: fetch(searchValues) });
  };
};
export const handleSearchReset = () => (dispatch) => {
  dispatch({ type: SET_PAGES_SEARCH });
  dispatch(fetchpages());
};
export const handleSearchChange = (event) => {
  return (dispatch, getState) => {
    const searchValues = { ...getState().app.pages.searchValues } || {};
    searchValues[event.target.name] = event.target.value;
    dispatch({ type: SET_PAGES_SEARCH, payload: searchValues });
  };
};
export const handleSearchSubmit = (event) => {
  event.preventDefault();
  return dispatch => dispatch(fetchpages());
};
export const setDocument = doc => (dispatch, getState) => {
  const state = { ...getState().app.pages };
  dispatch({ type: SET_PRINTED_DOCUMENT, payload: doc });
  dispatch({ type: SET_EMAILS, promise: fetchEmails({ page_id: state.page.id }) });
};
export const handleModalClose = () => ({ type: SET_HIDE_MODAL });

export const handlepagePaymentsModalClose = () => (dispatch, getState) => {
  const state = getState().app.pages;
  dispatch(getpageRents({ page_id: (state.page && state.page.id) || 0 }));
  dispatch({ type: SET_HIDE_MODAL });
};

export const handleRentPaymentsModalClose = () => (dispatch) => {
  dispatch(getpageRents({ overdue: 1, page: 1 }));
  dispatch({ type: SET_HIDE_MODAL });
};
