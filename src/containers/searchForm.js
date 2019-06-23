import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

import { fetchCategories } from "../actions";
import { requestPro, fetchPro, fetchProCount } from "../actions/pro";

import { Field, reduxForm } from "redux-form";
import { valid_postcode } from "../components/validation";

const validatePostcode = value =>
  valid_postcode(value) ? undefined : "Enter valid postcode";

class SearchForm extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const self = this;
    this.props.fetchCategories().then(response => {
      const data = response.payload.data;
      if (Object.keys(data).length > 0) {
        self.props.initialize({ category: data[0].id });
      }
    });
  }

  renderSelectField(field) {
    const {
      input,
      label,
      type,
      meta: { touched, error, warning },
      data
    } = field;
    const className = `form-group col-md-5 ${
      touched && error ? "has-danger" : ""
    }`;

    //const id = `select_${input.name}`;
    return (
      <div className={className}>
        <label className="control-label col-sm-2 col-md-4">{label}</label>
        <div className="col-sm-12">
          <select
            {...input}
            className="form-control form-control-inline"
            type={type}
          >
            {data.map((e, key) => {
              return (
                <option key={key} value={e.id}>
                  {e.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="row-fluid">
          <div className="col-sm-2 col-md-4" />
          <div className="col-sm-10 col-md-6">
            {touched &&
              ((error && (
                <span className="text-danger">
                  <i className="fa fa-exclamation-circle" aria-hidden="true" />{" "}
                  {error}
                </span>
              )) ||
                (warning && (
                  <span className="text-warning">
                    <i className="fa fa-question-circle" aria-hidden="true" />{" "}
                    {warning}
                  </span>
                )))}
          </div>
        </div>
      </div>
    );
  }

  renderCategory(data) {
    return (
      <Field
        label="Category"
        data={data}
        name="category"
        component={this.renderSelectField}
        type="select"
        //onBlur={e => this.onAfterSaveCell(e, "category")}
        //onFocus={e => this.onBeforeSaveCell(e, "category")}
      />
    );
  }

  renderTextField(field) {
    const {
      input,
      label,
      type,
      meta: { touched, error, warning },
      maxlength
    } = field;

    const className = `form-group col-md-5 ${
      touched && error ? "has-danger" : ""
    }`;
    return (
      <div className={className}>
        <label className="control-label col-sm-2 col-md-4">{label}</label>
        <div className="col-sm-12">
          <input
            {...input}
            placeholder={label}
            className="form-control form-control-inline"
            type={type}
            maxLength={maxlength}
          />
        </div>
        <div className="row-fluid">
          <div className="col-sm-2 col-md-4" />
          <div className="col-sm-10 col-md-6">
            {touched &&
              ((error && (
                <span className="text-danger">
                  <i className="fa fa-exclamation-circle" aria-hidden="true" />{" "}
                  {error}
                </span>
              )) ||
                (warning && (
                  <span className="text-warning">
                    <i className="fa fa-question-circle" aria-hidden="true" />{" "}
                    {warning}
                  </span>
                )))}
          </div>
        </div>
      </div>
    );
  }

  renderPostcode() {
    return (
      <Field
        label="Postcode"
        name="postcode"
        component={this.renderTextField}
        type="text"
        validate={[validatePostcode]}
        maxlength="5"
        value=""
      />
    );
  }

  onSubmit(values) {
    const { category, postcode } = values;

    this.props
      .requestPro()
      .then(() => this.props.fetchProCount(category, postcode, 0))
      .then(() => this.props.fetchPro(category, postcode, 0));
  }

  render() {
    const { handleSubmit, categoriesReducer } = this.props;
    const data =
      categoriesReducer === undefined ||
      Object.keys(categoriesReducer).length === 0
        ? []
        : categoriesReducer;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div className="form-row align-items-center">
          {this.renderCategory(data)}
          {this.renderPostcode()}
          <div className="form-group col-md-2">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
    form: state.form
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchCategories, requestPro, fetchPro, fetchProCount },
    dispatch
  );
}

export default reduxForm({
  form: "search_pros", // a unique name for this form
  initialValues: {
    postcode: ""
  }
  //enableReinitialize: true
})(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(SearchForm)
  )
);
