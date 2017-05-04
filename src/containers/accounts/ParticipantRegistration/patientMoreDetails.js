import React from 'react';
import { Checkbox } from 'components/fields';
import { Field } from 'redux-form';

const PatientMoreDetails = () => (
  <div>
    <div className="col-md-6 col-sm-6 col-xs-12">
      <Field name="patient_loss_vision" component={Checkbox} label="Loss of Vision" />
      <Field name="patient_double_vision" component={Checkbox} label="Double Vision" />
      <Field name="patient_blurred_vision" component={Checkbox} label="Blurred Vision" />
      <Field name="patient_distorted_vision" component={Checkbox} label="Distorted Vision/Halos" />
      <Field name="patient_loss_side_vision" component={Checkbox} label="Loss of Side Vision" />
      <Field name="patient_eye_pain_soreness" component={Checkbox} label="Eye Pain or Soreness" />
      <Field name="patient_mucous_discharge" component={Checkbox} label="Mucous Discharge" />
      <Field name="patient_redness" component={Checkbox} label="Redness" />
      <Field name="patient_sandy_gritty_feeling" component={Checkbox} label="Sandy or Gritty Feeling" />
    </div>
    <div className="col-md-6">
      <Field name="patient_burning_eyes" component={Checkbox} label="Burning Eyes" />
      <Field
        name="patient_foreign_body_sensation" component={Checkbox} label="Foreign Body Sensation"
      />
      <Field name="patient_glare_sensitivity" component={Checkbox} label="Glare/Light Sensitivity" />
      <Field
        name="patient_flashes_in_vision" component={Checkbox} label="Flashes/Clear Floaters in Vision"
      />
      <Field name="patient_tired_eyes" component={Checkbox} label="Tired Eyes" />
      <Field
        name="patient_excess_tearing_watering" component={Checkbox} label="Excess Tearing/Watering"
      />
      <Field name="patient_dryness" component={Checkbox} label="Dryness" />
      <Field name="patient_itching" component={Checkbox} label="Itching Eyes" />
      <Field
        name="patient_chronic_infection_eye" component={Checkbox} label="Chronic Infection of Eye/Lid"
      />
    </div>
  </div>
);

export default PatientMoreDetails;
