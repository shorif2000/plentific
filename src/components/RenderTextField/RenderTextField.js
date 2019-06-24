export const renderTextField = function(field) {
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
};
