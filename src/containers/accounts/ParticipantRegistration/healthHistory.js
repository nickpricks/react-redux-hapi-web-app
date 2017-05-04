import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';

const HealthHistory = ({ historyAllergiesMedications }) => (
  <div>
    <div className="col-xs-12">
      <label>
        Do you have any allergies to medications?
      </label>
      <span>
        <Field
          name="health_history_allergies_to_medications" component="input" type="radio" value="yes"
        />
        Yes
      </span>
      <span>
        <Field
          name="health_history_allergies_to_medications" component="input" type="radio" value="no"
        />
        No
      </span>
      {historyAllergiesMedications && <div>
        <span> (If yes:) Please Explain: </span>
        <Field name="health_history_allergies_to_medications_describe" component="textarea" />
      </div>
      }
    </div>
    <div className="col-xs-12">
      <label>
        List any medications you take (including oral contraceptives, aspirin,
        over-the-counter medications and home remedies
      </label>
      <Field name="health_history_medications_describe" component="textarea" />
    </div>
    <div className="col-xs-12">
      <label>
        List all major injuries, surgeries and/or hospitalizations you have had
      </label>
      <Field name="health_history_hospitalizations_describe" component="textarea" />
    </div>
    <div className="col-md-12">
      <label>
        Is the participant pregnant and/or nursing?
      </label>
      <div>
        <span>
          <Field name="health_history_pregnant_nursing" component="input" type="radio" value="yes" />
          Yes
        </span>
        <span>
          <Field name="health_history_pregnant_nursing" component="input" type="radio" value="no" />
          No
        </span>
      </div>
    </div>
    <div>
      <h3>
        Please check any conditions that apply to you or your family
        (parents, grandparents, siblings, children; living or deceased):
      </h3>
      <div className="col-md-6 col-sm-6 col-xs-12">
        <h4>ALLERGIC</h4>
        <div className="col-md-6 col-sm-6 col-xs-12">
          <label>
            Allergies/Hay Fever
          </label>
          <span>
            <Field name="family_health_history_allergies" component="input" type="radio" value="self" /> Self
          </span>
          <span>
            <Field name="family_health_history_allergies" component="input" type="radio" value="family" /> Family
          </span>
        </div>
        <h4> NEUROLOGICAL</h4>
        <div className="col-md-6 col-sm-6 col-xs-12">
          <label>
            Headaches
          </label>
          <span>
            <Field
              name="family_health_history_headaches" component="input" type="radio" value="self"
            /> Self
          </span>
          <span>
            <Field
              name="family_health_history_headaches" component="input" type="radio" value="family"
            /> Family
          </span>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-12">
          <label>Migraines</label>
          <span>
            <Field
              name="family_health_history_migraines" component="input" type="radio" value="self"
            /> Self
          </span>
          <span>
            <Field
              name="family_health_history_migraines" component="input" type="radio" value="family"
            /> Family
          </span>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-12">
          <label>
            Seizures
          </label>
          <span>
            <Field
              name="family_health_history_seizures" component="input" type="radio" value="self"
            /> Self
          </span>
          <span>
            <Field
              name="family_health_history_seizures" component="input" type="radio" value="family"
            /> Family
          </span>
        </div>
        <h4>RESPIRATORY</h4>
        <div className="col-md-6 col-sm-6 col-xs-12">
          <label>
            Asthma
          </label>
          <span>
            <Field
              name="family_health_history_asthma" component="input" type="radio" value="self"
            /> Self
          </span>
          <span>
            <Field
              name="family_health_history_asthma" component="input" type="radio" value="family"
            /> Family
          </span>
        </div>
        <h4> VASCULAR / CARDIOVASCULAR</h4>
        <div className="col-md-6 col-sm-6 col-xs-12">
          <label>
            Asthma
          </label>
          <span>
            <Field
              name="family_health_history_vascular" component="input" type="radio" value="self"
            /> Self
          </span>
          <span>
            <Field
              name="family_health_history_vascular" component="input" type="radio" value="family"
            /> Family
          </span>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-12">
          <label>
            Diabetes
          </label>
          <span>
            <Field
              name="family_health_history_diabetes" component="input" type="radio" value="self"
            /> Self
          </span>
          <span>
            <Field
              name="family_health_history_diabetes" component="input" type="radio" value="family"
            /> Family
          </span>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-12">
          <label>
            Vascular Disease
          </label>
          <span>
            <Field
              name="family_health_history_vascular_disease" component="input" type="radio" value="self"
            /> Self
          </span>
          <span>
            <Field
              name="family_health_history_vascular_disease" component="input" type="radio" value="family"
            /> Family
          </span>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-12">
          <label>
            Bleeding Problems
          </label>
          <span>
            <Field
              name="family_health_history_bleeding_problems" component="input" type="radio" value="self"
            /> Self
          </span>
          <span>
            <Field
              name="family_health_history_bleeding_problems" component="input" type="radio" value="family"
            /> Family
          </span>
        </div>
      </div>
      <div className="col-md-6 col-sm-6 col-xs-12">
        <h4>INTEGUMENTARY (Skin)</h4>
        <div className="col-md-6 col-sm-6 col-xs-12">
          <label>
            Integumentary
          </label>
          <span>
            <Field
              name="family_health_history_integumentary" component="input" type="radio" value="self"
            /> Self
          </span>
          <span>
            <Field
              name="family_health_history_integumentary" component="input" type="radio" value="family"
            /> Family
          </span>
        </div>
        <h4> BONES / JOINTS / MUSCLES</h4>
        <div className="col-md-6 col-sm-6 col-xs-12">
          <label>
            Rheumatoid Arthritis
          </label>
          <span>
            <Field
              name="family_health_history_rheumatoid_arthritis" component="input" type="radio" value="self"
            /> Self
          </span>
          <span>
            <Field
              name="family_health_history_rheumatoid_arthritis" component="input" type="radio" value="family"
            /> Family
          </span>
        </div>
        <h4>VISION</h4>
        <div className="col-md-6 col-sm-6 col-xs-12">
          <label>
            Blindness
          </label>
          <span>
            <Field
              name="family_health_history_blindness" component="input" type="radio" value="self"
            /> Self
          </span>
          <span>
            <Field
              name="family_health_history_blindness" component="input" type="radio" value="family"
            /> Family
          </span>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-12">
          <label>
            Glaucoma
          </label>
          <span>
            <Field
              name="family_health_history_glaucoma" component="input" type="radio" value="self"
            /> Self
          </span>
          <span>
            <Field
              name="family_health_history_glaucoma" component="input" type="radio" value="family"
            /> Family
          </span>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-12">
          <label>
            Cataract
          </label>
          <span>
            <Field
              name="family_health_history_cataract" component="input" type="radio" value="self"
            /> Self
          </span>
          <span>
            <Field
              name="family_health_history_cataract" component="input" type="radio" value="family"
            /> Family
          </span>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-12">
          <label>
            Crossed Eyes
          </label>
          <span>
            <Field
              name="family_health_history_crossed_eyes" component="input" type="radio" value="self"
            /> Self
          </span>
          <span>
            <Field
              name="family_health_history_crossed_eyes" component="input" type="radio" value="family"
            /> Family
          </span>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-12">
          <label>
            Macular Degeneration
          </label>
          <span>
            <Field
              name="family_health_history_macular_degeneration" component="input" type="radio" value="self"
            /> Self
          </span>
          <span>
            <Field
              name="family_health_history_macular_degeneration" component="input" type="radio" value="family"
            /> Family
          </span>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-12">
          <label>
            Retinal Detach/Disease
          </label>
          <span>
            <Field
              name="family_health_history_retinal_detach" component="input" type="radio" value="self"
            /> Self
          </span>
          <span>
            <Field
              name="family_health_history_retinal_detach" component="input" type="radio" value="family"
            /> Family
          </span>
        </div>
      </div>
    </div>
  </div>
);

HealthHistory.propTypes = {
  historyAllergiesMedications: PropTypes.bool,
};

const mapState = state => ({
  historyAllergiesMedications: (state.form.participantRegister.values &&
  state.form.participantRegister.values.health_history_allergies_to_medications &&
  state.form.participantRegister.values.health_history_allergies_to_medications === 'yes') || false,
});

export default connect(mapState)(HealthHistory);
