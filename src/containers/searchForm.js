import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

import { fetchCategories } from "../actions";
import { requestPro, fetchPro, fetchProCount } from "../actions/pro";

import { Field, reduxForm, formValueSelector, change } from "redux-form";
import { valid_postcode } from "../components/validation";

const validatePostcode = value =>
  valid_postcode(value) ? undefined : "Enter valid postcode";

const selector = formValueSelector("search_pros");

class SearchForm extends Component {
  constructor() {
    super();
    this.state = { request: true, postcode: "", category: "" };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.renderSelectField = this.renderSelectField.bind(this);
    this.renderTextField = this.renderTextField.bind(this);
  }

  componentDidMount() {
    const self = this;
    this.props.fetchCategories().then(response => {
      const data = response.payload.data;
      if (Object.keys(data).length > 0) {
        self.props.initialize({ category: data[0].id });
        self.setState({ category: data[0].id });
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

    return (
      <div className={className}>
        <label className="control-label col-sm-2 col-md-4">{label}</label>
        <div className="col-sm-12">
          <select
            {...input}
            className="form-control form-control-inline"
            type={type}
            value={this.state[input.name]}
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
        onChange={event => {
          event.preventDefault();
          this.setState({ category: event.target.value, request: true });
        }}
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
            value={this.state[input.name]}
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
        value={this.state.postcode}
        onChange={event => {
          event.preventDefault();
          this.setState({ postcode: event.target.value, request: true });
        }}
        //nChange={event => event.preventDefault()}
      />
    );
  }

  onSubmit(params) {
    const { category, postcode, request } = this.state;
    const {
      form: {
        search_pros: { values }
      }
    } = this.props;
    if (
      values.category !== category &&
      (postcode !== "" && values.postcode !== postcode)
    ) {
      console.log("not matching");
    }

    const location = postcode === "" ? null : postcode;
    if (request) {
      this.props
        .requestPro()
        .then(() => this.props.fetchProCount(category, location, 0))
        .then(() => this.props.fetchPro(category, location, 0))
        .then(() => this.setState({ request: false }))
        .catch(thrown => console.log(thrown.message));
    } else {
      this.props
        .requestPro()
        //.then(() => this.props.fetchProCount(category, postcode, 0))
        .then(() => this.props.fetchPro(category, postcode, 0))
        .then(() => this.setState({ request: false }))
        .catch(thrown => console.log(thrown.message));
    }
  }

  handleOnChange(event) {
    event.preventDefault();
    const {
      form: {
        search_pros: { values }
      }
    } = this.props;
    if (
      values[event.target.name] &&
      values[event.target.name] !== event.target.value
    ) {
      const state = this.state;
      state[event.target.name] = event.target.value;
      state.request = true;
      this.setState(state);
    }
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
    prevValues: selector(state, "category", "postcode")
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchCategories, requestPro, fetchPro, fetchProCount, change },
    dispatch
  );
}

export default reduxForm({
  form: "search_pros", // a unique name for this form
  initialValues: {
    postcode: ""
  }
})(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(SearchForm)
  )
);
