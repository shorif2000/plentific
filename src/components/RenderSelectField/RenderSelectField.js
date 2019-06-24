export const renderSelectField = function renderSelectField(field) {
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
};
