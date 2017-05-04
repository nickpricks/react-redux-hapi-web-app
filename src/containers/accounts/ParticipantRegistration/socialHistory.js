import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'components/fields';
import { Field } from 'redux-form';

const SocialHealthHistory = ({ socialTobacco, socialAlcohol, socialIllegalDrugs }) => (
  <div>
    <div className="row">
      <p className="col-xs-12 text-left">
        This information is kept strictly confidential.
        However, you may discuss this portion directly with the doctor if you prefer.
      </p>
      <div className="col-xs-12 text-left">
        <Field
          name="social_health_history"
          component={Checkbox}
          label="Yes,
          I would prefer to discuss my Social History information directly with my doctor."
        />
      </div>
    </div>
    <div className="row">
      <div className="col-md-6 col-sm-6 col-xs-12">
        <label>
          Do you use tobacco products?
        </label>
        <span>
          <Field
            name="social_health_history_tobacco_products" component="input" type="radio" value="yes"
          /> Yes
        </span>
        <span>
          <Field
            name="social_health_history_tobacco_products" component="input" type="radio" value="no"
          /> No
        </span>
        {socialTobacco && <div>
          <label>
            If yes, type/amount/how long
          </label>
          <Field name="social_health_history_tobacco_products_describe" component="textarea" />
        </div>
        }
      </div>
      <div className="col-md-6 col-sm-6 col-xs-12">
        <label>
          Do you drink alcohol?
        </label>
        <span>
          <Field name="social_health_history_alcohol" component="input" type="radio" value="yes" /> Yes
        </span>
        <span>
          <Field name="social_health_history_alcohol" component="input" type="radio" value="no" /> No
        </span>
        {socialAlcohol && <div>
          <label>
            If yes, type/amount/how long
          </label>
          <Field name="social_health_history_alcohol_describe" component="textarea" />
        </div>
        }
      </div>
    </div>
    <div className="row">
      <div className="col-md-6 col-sm-6 col-xs-12">
        <label>
          Do you use illegal drugs?
        </label>
        <span>
          <Field name="social_health_history_illegal_drugs" component="input" type="radio" value="yes" /> Yes
        </span>
        <span>
          <Field name="social_health_history_illegal_drugs" component="input" type="radio" value="no" /> No
        </span>
      </div>
      {socialIllegalDrugs && <div className="col-md-6 col-sm-6 col-xs-12">
        <label>
          If yes, type/amount/how long
        </label>
        <Field name="social_health_history_illegal_drugs_describe" component="textarea" />
      </div>
      }
    </div>
    <div className="row">
      <label>
        Have you ever been exposed to or infected with:
      </label>
      <span>
        <Field name="social_health_history_infected_exposed" component="input" type="radio" value="Gonorrhea" />
        Gonorrhea
      </span>
      <span>
        <Field name="social_health_history_infected_exposed" component="input" type="radio" value="Hepatitis" />
        Hepatitis
      </span>
      <span>
        <Field name="social_health_history_infected_exposed" component="input" type="radio" value="HIV" />
        HIV
      </span>
      <span>
        <Field name="social_health_history_infected_exposed" component="input" type="radio" value="Syphilis" />
        Syphilis
      </span>
      <span>
        <Field name="social_health_history_infected_exposed" component="input" type="radio" value="None" />
        None
      </span>
    </div>
  </div>
);

SocialHealthHistory.propTypes = {
  socialTobacco: PropTypes.bool,
  socialAlcohol: PropTypes.bool,
  socialIllegalDrugs: PropTypes.bool,
};

const mapState = state => ({
  socialTobacco: (state.form.participantRegister.values &&
  state.form.participantRegister.values.social_health_history_tobacco_products &&
  state.form.participantRegister.values.social_health_history_tobacco_products === 'yes') || false,

  socialAlcohol: (state.form.participantRegister.values &&
  state.form.participantRegister.values.social_health_history_alcohol &&
  state.form.participantRegister.values.social_health_history_alcohol === 'yes') || false,

  socialIllegalDrugs: (state.form.participantRegister.values &&
  state.form.participantRegister.values.social_health_history_illegal_drugs &&
  state.form.participantRegister.values.social_health_history_illegal_drugs === 'yes') || false,
});

export default connect(mapState)(SocialHealthHistory);
