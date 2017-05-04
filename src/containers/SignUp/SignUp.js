/**
 * Created by nick on 20/10/16.
 */

import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { reduxForm, FieldArray, SubmissionError } from 'redux-form';
import { UiButton as Button } from '../../components/ui';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { getTeacherByToken, registerGuardian } from '../../redux/modules/registration';
import GeneralDetails from './GeneralDetails';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => Promise.all([
    dispatch(getTeacherByToken(getState().routing.locationBeforeTransitions.query.token))
  ])
}])
@connect(state => ({
  initialValues: {
    patients: [{}]
  },
  teacherInfo: state.registration.teacherInfo,
  states: state.registration.states,
}))
@reduxForm({
  form: 'registerGuardian'
})
export default class SignUp extends Component {
  static get propTypes() {
    return {
      handleSubmit: PropTypes.func,
      submitting: PropTypes.bool,
      error: PropTypes.string,
      SubmissionError: PropTypes.string,
      hasMedicalInsurance: PropTypes.bool,
      hasVisionInsurance: PropTypes.bool,
      states: PropTypes.array,
      teacherInfo: PropTypes.object,
    };
  }

  registerGuardian = (formData, dispatch) => new Promise((resolve, reject) => {
    const { teacherInfo } = this.props;
    formData.teacherId = teacherInfo.teacherId;
    dispatch(registerGuardian(formData))
      .then(resolve)
      .catch(error => reject(new SubmissionError({ _error: error.message || error })));
  });

  render() {
    const { handleSubmit, submitting, teacherInfo } = this.props;
    return (
      <div>
        <div className="inner-banner" />
        <div className="welcome-text" >
          <div className="container" >
            <div className="row" >
              <div className="col-md-10 col-md-offset col-sm-10 col-sm-offset-1 col-xs-12 text-center" >
                <h1> Welcome</h1>
                <p> The eye responds to many conditions and disorders within the body, please be aware that all of the
                  following
                  questions are relevant to help diagnose your vision condition and needs.All information is kept
                  strictly
                  confidential on a need to know basis for the use of physicians and educators only to be used for the
                  treatment
                  and diagnosis of the individual. Any other use is considered misuse and a violation in HIPAA laws.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bgGray" >
          <div className="container" >
            <div className="row" >
              <div className="col-md-10 col-sm-10 col-xs-12 col-md-offset-1 col-sm-offset-1" >
                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true" >
                  <div className="panel panel-default" >
                    <div className="panel-heading" role="tab" id="headingOne" >
                      <h4 className="panel-title text-Rregular" >
                        <a
                          role="button" data-toggle="collapse" data-parent="#accordion"
                          aria-expanded="true" aria-controls="collapseOne"
                        >
                          Please choose the Location of your Treatment Facility
                          <i className="fa  fa-angle-down pull-right" > </i>
                        </a>
                      </h4>
                    </div>
                    <div className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                      <div className="panel-body" >
                        <p>Lone Peak High School</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Helmet title="SignUp" />
            <div className="row" >
              <div className="col-md-10 col-sm-10 col-xs-12 col-md-offset-1 col-sm-offset-1" >
                <div className="col-md-4 col-xs-12 text-center">
                  <h4><strong>Teacher: </strong> {teacherInfo.firstName} {teacherInfo.lastName} </h4>
                </div>
                <div className="col-md-4 col-xs-12 text-center">
                  <h4><strong>Location: </strong> {teacherInfo.locationName} </h4>
                </div>
                <div className="col-md-4 col-xs-12 text-center" >
                  <h4><a href="/signIn" title="Sign In" >Already Registered</a></h4>
                </div>
                <div className="clearfix" ></div>
                <h3 className="mt40" >Parent / Guardian or any Other Responsible Party </h3>

                <form className="custom_form" onSubmit={handleSubmit(this.registerGuardian)} >
                  <div className="row" >

                    <GeneralDetails />

                    <div className="col-xs-12" >
                      <div className="row end-xs" >
                        <div className="col-xs pull-right" >
                          <Button
                            label="Complete Registration"
                            className="btn-submit"
                            raised
                            primary
                            type="submit"
                            disabled={submitting}
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
