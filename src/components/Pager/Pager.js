import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { UiButton as Button } from 'components/ui';
import { app } from '../../../config/default';


@reduxForm({
  form: 'pagination',
})
export default class Pager extends Component {
  static get propTypes() {
    return {
      pageIndex: PropTypes.number.isRequired,
      pageSize: PropTypes.number.isRequired,
      totalItems: PropTypes.number.isRequired,
      onPageSizeChange: PropTypes.func.isRequired,
      onPageChange: PropTypes.func.isRequired,
    };
  }

  render() {
    const { pageIndex, pageSize, totalItems, onPageSizeChange, onPageChange } = this.props;
    const pages = Math.ceil(totalItems / pageSize || app.gridLimit);

    const previousPage = () => {
      if (pageIndex > 1) {
        onPageChange(pageIndex - 1);
      }
    };

    const nextPage = () => {
      if (pageIndex < pages) {
        onPageChange(pageIndex + 1);
      }
    };

    return (
      <ul className="head-pagination list-unstyled">
        <li><p> Per Page: </p></li>
        <li>
          <Field
            type="select"
            component="select"
            name="Page"
            defaultvalue={pageSize || app.gridLimit}
            value={pageSize || app.gridLimit}
            onChange={e => onPageSizeChange(parseInt(e.target.value, 10))}
            disabled={totalItems === 0}
          >
            <option>5</option>
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
            <option>150</option>
            <option>200</option>
            <option>250</option>
            <option>500</option>
          </Field>
        </li>
        <li>
          <Button disabled={pageIndex <= 1} onClick={previousPage} primary className="btn-prev page-link ml10">
            <i className="fa fa-caret-left" aria-hidden="true" />
          </Button>
        </li>
        <li>
          <Button disabled={pageIndex >= pages} onClick={nextPage} primary className="btn-next page-link">
            <i className="fa fa-caret-right" aria-hidden="true" />
          </Button>
        </li>
      </ul>
    );
  }
}
