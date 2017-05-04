import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import { UiButton as Button } from 'components/ui';
import VisionNeeds from './visionNeeds';
import SocialHealthHistory from './socialHistory';
import HealthHistory from './healthHistory';
import PatientDetails from './patientDetails';
import PatientPersonal from './patientPersonal';
import PatientMoreDetails from './patientMoreDetails';
import { createValidator, required, email, match } from 'utils/validation';
import { getTeacherGuardianInfoByToken, registerParticipant } from 'redux/modules/registration';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => new Promise((resolve, reject) => {
    const query = getState().routing.locationBeforeTransitions.query;
    dispatch(getTeacherGuardianInfoByToken(query.token))
      .then(resolve)
      .catch(reject);
  })
}])
@connect(state => ({
  initialValues: state.teacher.participantsDetails,
  teacherInfo: state.registration.teacherInfo,
}))
@reduxForm({
  form: 'participantRegister',
  validate: createValidator({
    vision_needs_any_questions: [required],
    firstName: [required],
    lastName: [required],
    email: [required, email],
    password: [required],
    confirmPassword: [required, match('password')],
  })
})

export default class ParticipantRegister extends Component {
  static propTypes = {
    visionNeedsDriveDifficulty: PropTypes.bool,
    visionNeedsLensesNotRight: PropTypes.bool,
    visionNeedsActivitiesRestrict: PropTypes.bool,
    submitting: PropTypes.bool,
    error: PropTypes.string,
    handleSubmit: PropTypes.func,
    dispatch: PropTypes.func,
    teacherInfo: PropTypes.object,
    location: PropTypes.object,
  };

  registerParticipant = (formData, dispatch) => new Promise((resolve, reject) => {
    global.console.log('submit clicked ***', formData);
    const { location } = this.props;
    dispatch(registerParticipant(location.query.token, formData))
      .then(resolve)
      .catch(error => reject(new SubmissionError({ _error: error.message || error })));
  });

  render() {
    const { error, submitting, handleSubmit, teacherInfo } = this.props;

    return (
      <div>
        <div className="inner-banner" />
        <div className="welcome-text">
          <div className="container">
            <div className="row">
              <div className="col-md-10 col-md-offset col-sm-10 col-sm-offset-1 col-xs-12 text-center">
                <h1> Welcome to Your Vision Clinic</h1>
                <p> The eye responds to many conditions and disorders within the body, please be aware that all
                  of the following questions are relevant to help diagnose your vision condition and needs. All
                  information is kept strictly confidential on a need to know basis for the use of physicians and
                  educators only to be used for the treatment and diagnosis of the individual. Any other use is
                  considered misuse and a violation in HIPAA laws.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bgGray">
          <Helmet title="Participant Registration" />
          <div className="container">
            <div className="col-md-10 col-sm-12 col-xs-12 col-md-offset-1">
              <form className="custom_form" onSubmit={handleSubmit(this.registerParticipant)}>
                <span className="mt-10 mb-20 error" style={{ display: 'inline-block' }}> {error}</span>
                <div className="row">
                  <div className="col-md-3 col-xs-12">
                    <span className="pull-left"> <strong>Guardian: </strong> {teacherInfo.guardianName} </span>
                  </div>
                  <div className="col-md-3 col-xs-12">
                    <span><strong>Teacher: </strong> {teacherInfo.teacherName} </span>
                  </div>
                  <div className="col-md-3 col-xs-12">
                    <span><strong>Location: </strong> {teacherInfo.teacherLocations} </span>
                  </div>
                  <div className="col-md-3 col-xs-12 text-center">
                    <span><a href="/signIn" title="Sign In">Already Registered</a></span>
                  </div>
                </div>
                <h5 className="text-center">
                  IF POSSIBLE, PLEASE HAVE THE PATIENT FILL THE REMAINDER OF THE APPLICATION.
                </h5>
                <h4 className="text-center">Vision Needs</h4>
                <VisionNeeds />
                <div className="row">
                  <div className="col-xs-12">
                    <h2 className="text-center mt40 mb40">Social Health History</h2>
                  </div>
                  <SocialHealthHistory />
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    <h3 className="text-center mt40 mb40">Health History</h3>
                  </div>
                  <HealthHistory />
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    <h3 className="mb40 mt40">
                      After you read each statement, mark the column that applies to the patient.
                      (0 – Never) (1- Seldom) (2-Occasional) (3-Frequently) (4-Always)
                    </h3>
                    <div className="clearfix"></div>
                    <PatientDetails />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    <h4 className="mt40 mb40"> Have you been experiencing any of the following eye conditions? </h4>
                  </div>
                  <PatientMoreDetails />
                </div>
                <div className="row">
                  <div className="col-xs-12 text-left">
                    <p>Eye care services and products are recommended for your optimum eye health and vision needs.
                      We expect that your insurance will cover the majority of services provided. However, there may
                      be some items that your insurance does not cover. You are responsible for the remaining balance.
                      The fact that your insurance company may not pay for a particular item or services does not
                      mean you should not receive it. (by signing below,
                      you agree to the above statement and to the HIPAA privacy act which can be found <a>here</a>).
                    </p>
                    <p>
                      I hereby agree that all the information above is true and accurate.
                    </p>
                    <p>
                      I agree to the privacy policy as outlined <a>(here)</a>.
                    </p>
                    <p>
                      I authorize the release of my personal information to be used to assess and help me with
                      treatment options, visual therapy, and any necessary billing through any vision, medical, or
                      other insurance options.
                    </p>
                  </div>
                </div>
                <div>
                  <PatientPersonal />
                </div>
                <div className="row end-xs">
                  <div className="col-xs pull-right">
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
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
