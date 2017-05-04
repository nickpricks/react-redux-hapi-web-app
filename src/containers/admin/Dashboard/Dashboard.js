import React, { Component, PropTypes } from 'react';
import { Tab, Tabs } from 'react-toolbox';
import { connect } from 'react-redux';

import { UiButton as Button } from '../../../components/ui';
import { Pager } from '../../../components';
import { app } from '../../../../config/default';


@connect(state => ({
  totalRecords: state.citizens.totalRecords,
  teachersList: state.citizens.list,
}))

export default class Dashboard extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func,
      totalRecords: PropTypes.number,
      teachersList: PropTypes.array,
    };
  }

  state = {
    tabIndex: 0,
    page: 1,
    pageSize: 5,
  };

  getLocationName = (locationId) => {
    const locationArr = [];
    const { locations } = this.props;
    if (!locationId) {
      return 'n/a';
    }
    locationId.split(',').forEach((id) => {
      const loc = locations.find(t => t.id === parseInt(id, 10));
      locationArr.push(loc.name);
    });
    return locationArr.join(', ');
  };

  handleTabChange = (tabIndex) => {
    this.setState({ tabIndex });
  };

  handlePageChange = page => {
    this.setState({ page });
    console.info('page changed, reload', page);
    this.props.dispatch(loadTeachersList({ page, pageSize: this.state.pageSize }));
  };

  handlePageSizeChange = pageSize => {
    this.setState({ pageSize });
    console.info('size changed, reload', pageSize);
    this.props.dispatch(loadTeachersList({ page: this.state.page, pageSize }));
  };

  reInvite = (emailAddress) => new Promise((resolve, reject) => {
    const { dispatch } = this.props;
    dispatch(
      reInviteTeacher({ email: emailAddress }))
      .then(resolve)
      .catch(err => {
        global.console.warn('Redux::Module:reInvite error.', err);
        reject({});
      });
  });

  render() {
    const { teachersList, totalRecords } = this.props;
    const { tabIndex, page, pageSize } = this.state;

    const pager = (
      <div>
        <Pager
          pageIndex={page}
          pageSize={pageSize}
          totalItems={totalRecords || app.gridLimit}
          onPageChange={this.handlePageChange}
          onPageSizeChange={this.handlePageSizeChange}
        />
      </div>
    );

    return (
      <div className="container">
        <div className="row mt170">
          <div className="col-md-12">
            <Tabs index={tabIndex} onChange={this.handleTabChange}>
              <Tab className="custom-tabs" label="Teacher">
                <div className="row">
                  <div className="col-xs-12 col-md-12">
                    <Invite label="Teachers" inviteType="teacher" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 col-sm-4 col-xs-12 pull-right">
                    {pager}
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    <div className="table-responsive table-custom">
                      <table className="table table-stripped">
                        <thead className="table_head">
                          <tr>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Location</th>
                            <th>Last Invited</th>
                            <th />
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                        {
                          teachersList.map(i => (
                            <tr key={i.id}>
                              <td>{i.email}</td>
                              <td>
                                {i.status}
                              </td>
                              <td>{this.getLocationName(i.location)}</td>
                              <td>{new Date(i.updatedAt).toDateString()}</td>
                              <td>
                                {i.status === 'Pending' ?
                                  <Button
                                    onClick={() => this.reInvite(i.email)}
                                    style={{ marginTop: '8px' }}
                                    label="ReSend" flat
                                  /> : null
                                }
                              </td>
                              <td>
                                <Button
                                  onClick={() => this.deleteTeacher(i.id, i.email)}
                                  style={{ marginTop: '8px' }}
                                  label="Delete" flat
                                />
                              </td>
                            </tr>
                          ))
                        }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab className="custom-tabs" label="Optometrist">
                <div className="row">
                  <div className="col-xs-12 col-md-12">
                    Optometrist
                  </div>
                </div>
              </Tab>
              <Tab className="custom-tabs" label="Guardian">
                <div className="row">
                  <div className="col-xs-12 col-md-12">
                    Guardian
                  </div>
                </div>

              </Tab>
              <Tab className="custom-tabs" label="Participant">
                <div className="row">
                  <div className="col-xs-12 col-md-12">
                    Participant
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}
