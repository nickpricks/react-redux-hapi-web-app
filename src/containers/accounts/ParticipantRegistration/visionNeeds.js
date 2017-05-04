import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';

const VisionNeeds = ({ visionNeedsDriveDifficulty, visionNeedsLensesNotRight, visionNeedsActivitiesRestrict }) => (
  <div>
    <div>
      <p className="text-center">
        What questions do you have about vision in general and the student or reader’s
        vision specifically?
      </p>
      <div className="row">
        <div className="col-md-12 col-xs-12">
          <Field name="vision_needs_any_questions" component="textarea" />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-6 col-xs-12 text-left">
          <label>
            Have you ever worn glasses?
          </label>
          <span>
            <Field name="vision_needs_glasses_ever_worn" component="input" type="radio" value="yes" /> Yes
          </span>
          <span>
            <Field name="vision_needs_glasses_ever_worn" component="input" type="radio" value="no" /> No
          </span>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-12 text-left">
          <label>
            Do you wear glasses now?
          </label>
          <div>
            <span>
              <Field name="vision_needs_glasses_now" component="input" type="radio" value="yes" /> Yes
            </span>
            <span>
              <Field name="vision_needs_glasses_now" component="input" type="radio" value="no" /> No
            </span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-6 col-xs-12">
          <span> If yes </span>
          <span className="spanW100">
            <Field name="vision_needs_glasses_now_yes" component="input" type="radio" value="for distance only" />
            for distance only
          </span>
          <span className="spanW100">
            <Field name="vision_needs_glasses_now_yes" component="input" type="radio" value="for near only" />
            for near only
          </span>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-12">
          <span className="spanW100">
            <Field name="vision_needs_glasses_now_yes" component="input" type="radio" value="wear them full time" />
            wear them full time
          </span>
          <span className="spanW100">
            <Field name="vision_needs_glasses_now_yes" component="input" type="radio" value="for computer work" />
            for computer work
          </span>
        </div>
        <div className="col-md-3 col-sm-6 col-xs-12 ">
          <span className="spanW100">
            <Field name="vision_needs_glasses_now_yes" component="input" type="radio" value="sports" />
            sports
          </span>
        </div>
      </div>
      <div className="row text-left">
        <div className="col-md-12  col-xs-12">
          <label>
            What sports or hobbies are you involved in
          </label>
          <Field name="vision_needs_sports_or_hobbies" component="textarea" />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-6 col-xs-12">
          <label>
            Do you wear contact lenses at this time?
          </label>
          <span>
            <Field name="vision_needs_contact_lenses_wear" component="input" type="radio" value="yes" /> Yes
          </span>
          <span>
            <Field name="vision_needs_contact_lenses_wear" component="input" type="radio" value="no" /> No
          </span>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-12">
          <label>
            Are you interested in trying contact lenses?
          </label>
          <span> <Field name="vision_needs_contact_lenses_interested" component="input" type="radio" value="yes" />
            Yes
          </span>
          <span>
            <Field name="vision_needs_contact_lenses_interested" component="input" type="radio" value="no" /> No
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-6 col-xs-12">
          <label>
            Have you had problems wearing contact lenses in the past?
          </label>
          <span>
            <Field name="vision_needs_contact_lenses_problems" component="input" type="radio" value="yes" /> Yes
          </span>
          <span>
            <Field name="vision_needs_contact_lenses_problems" component="input" type="radio" value="no" /> No
          </span>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-12">
          <label>
            Do you drive?
          </label>
          <span>
            <Field name="vision_needs_drive" component="input" type="radio" value="yes" /> Yes
          </span>
          <span>
            <Field name="vision_needs_drive" component="input" type="radio" value="no" /> No
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <label>
            Do you have visual difficulty when driving?
          </label>
          <span>
            <Field name="vision_needs_drive_difficulty" component="input" type="radio" value="yes" /> Yes
          </span>
          <span>
            <Field name="vision_needs_drive_difficulty" component="input" type="radio" value="no" /> No
          </span>
        </div>
      </div>
      <div className="row">
        {visionNeedsDriveDifficulty && <div className="col-xs-12">
          <label>
            (If yes:) Please describe:
          </label>
          <Field name="vision_needs_drive_difficulty_describe" component="textarea" />
        </div>
        }
      </div>
      <div className="row">
        <div className="col-md-12 col-xs-12">
          <label>
            Are there times when your vision (or present lenses) are not quite right?
          </label>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-12">
          <span>
            <Field name="vision_needs_lenses_not_right" component="input" type="radio" value="yes" />
            Yes
          </span>
          <span>
            <Field name="vision_needs_lenses_not_right" component="input" type="radio" value="no" /> No
          </span>
        </div>
        {visionNeedsLensesNotRight && <div className="col-md-6 col-sm-6 col-xs-12">
          <label>
            (If yes:) Please Explain:
          </label>
          <Field name="vision_needs_lenses_not_right_describe" component="textarea" />
        </div>
        }
      </div>
      <div className="row">
        <div className="col-xs-12">
          <label>
            Are there any activities that you would enjoy doing,
            but must restrict because of your vision?
          </label>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-12">
          <span>
            <Field name="vision_needs_activities_restrict" component="input" type="radio" value="yes" /> Yes
          </span>
          <span>
            <Field name="vision_needs_activities_restrict" component="input" type="radio" value="no" /> No
          </span>
        </div>
        {visionNeedsActivitiesRestrict && <div className="col-md-6 col-sm-6 col-xs-12">
          <label>
            (If yes:) Please Explain:
          </label>
          <Field name="vision_needs_activities_restrict_describe" component="textarea" />
        </div>
        }
      </div>
    </div>
  </div>
);

VisionNeeds.propTypes = {
  visionNeedsDriveDifficulty: PropTypes.bool,
  visionNeedsLensesNotRight: PropTypes.bool,
  visionNeedsActivitiesRestrict: PropTypes.bool,
};

const mapState = state => ({
  visionNeedsDriveDifficulty: (state.form.participantRegister.values &&
  state.form.participantRegister.values.vision_needs_drive_difficulty &&
  state.form.participantRegister.values.vision_needs_drive_difficulty === 'yes') || false,

  visionNeedsLensesNotRight: (state.form.participantRegister.values &&
  state.form.participantRegister.values.vision_needs_lenses_not_right &&
  state.form.participantRegister.values.vision_needs_lenses_not_right === 'yes') || false,

  visionNeedsActivitiesRestrict: (state.form.participantRegister.values &&
  state.form.participantRegister.values.vision_needs_activities_restrict &&
  state.form.participantRegister.values.vision_needs_activities_restrict === 'yes') || false,
});

export default connect(mapState)(VisionNeeds);
