import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';

const PatientDetails = () => (
  <div className="table-responsive">
    <table className="table table-custom table-striped">
      <thead />
      <tbody>
        <tr>
          <td>Vision blurs when reading, writing, or working on computer</td>
          <td>
            <label>
              <Field
                name="patient_vision_blurs_computer" component="input" type="radio" value="0"
              /> 0
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_vision_blurs_computer" component="input" type="radio" value="1"
              /> 1
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_vision_blurs_computer" component="input" type="radio" value="2"
              /> 2
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_vision_blurs_computer" component="input" type="radio" value="3"
              /> 3
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_vision_blurs_computer" component="input" type="radio" value="4"
              /> 4
            </label>
          </td>
        </tr>
        <tr>
          <td>Headaches when reading, writing, or working on computer</td>
          <td>
            <label>
              <Field name="patient_headaches_computer" component="input" type="radio" value="0" />
              0
            </label>
          </td>
          <td>
            <label>
              <Field name="patient_headaches_computer" component="input" type="radio" value="1" />
              1
            </label>
          </td>
          <td>
            <label>
              <Field name="patient_headaches_computer" component="input" type="radio" value="2" />
              2
            </label>
          </td>
          <td>
            <label>
              <Field name="patient_headaches_computer" component="input" type="radio" value="3" />
              3
            </label>
          </td>
          <td>
            <label>
              <Field name="patient_headaches_computer" component="input" type="radio" value="4" />
              4
            </label>
          </td>
        </tr>
        <tr>
          <td>Words go double or appear to move around when reading</td>
          <td>
            <label>
              <Field name="patient_words_move_reading" component="input" type="radio" value="0" />
              0
            </label>
          </td>
          <td>
            <label>
              <Field name="patient_words_move_reading" component="input" type="radio" value="1" />
              1
            </label>
          </td>
          <td>
            <label>
              <Field name="patient_words_move_reading" component="input" type="radio" value="2" />
              2
            </label>
          </td>
          <td>
            <label>
              <Field name="patient_words_move_reading" component="input" type="radio" value="3" />
              3
            </label>
          </td>
          <td>
            <label>
              <Field name="patient_words_move_reading" component="input" type="radio" value="4" />
              4
            </label>
          </td>
        </tr>
        <tr>
          <td>Burning, itching or watery eyes when reading</td>
          <td>
            <label>
              <Field name="patient_burning_reading" component="input" type="radio" value="0" />
              0
            </label>
          </td>
          <td>
            <label>
              <Field name="patient_burning_reading" component="input" type="radio" value="1" />
              1
            </label>
          </td>
          <td>
            <label>
              <Field name="patient_burning_reading" component="input" type="radio" value="2" />
              2
            </label>
          </td>
          <td>
            <label>
              <Field name="patient_burning_reading" component="input" type="radio" value="3" />
              3
            </label>
          </td>
          <td>
            <label>
              <Field name="patient_burning_reading" component="input" type="radio" value="4" />
              4
            </label>
          </td>
        </tr>
        <tr>
          <td>Loses place when reading</td>
          <td>
            <label>
              <Field
                name="patient_loses_place_when_reading" component="input" type="radio" value="0"
              />
              0
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_loses_place_when_reading"
                component="input" type="radio" value="1"
              />
              1
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_loses_place_when_reading"
                component="input" type="radio" value="2"
              />
              2
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_loses_place_when_reading"
                component="input" type="radio" value="3"
              />
              3
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_loses_place_when_reading"
                component="input" type="radio" value="4"
              />
              4
            </label>
          </td>
        </tr>
        <tr>
          <td> Tilts head or closes/covers one eye when reading</td>
          <td>
            <label>
              <Field
                name="patient_one_eye_when_reading" component="input" type="radio" value="0"
              />
              0
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_one_eye_when_reading" component="input" type="radio" value="1"
              />
              1
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_one_eye_when_reading" component="input" type="radio" value="2"
              />
              2
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_one_eye_when_reading" component="input" type="radio" value="3"
              />
              3
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_one_eye_when_reading" component="input" type="radio" value="4"
              />
              4
            </label>
          </td>
        </tr>
        <tr>
          <td>Difficulty copying from the whiteboard/chalkboard</td>
          <td>
            <label>
              <Field
                name="patient_difficulty_copying_whiteboard"
                component="input" type="radio" value="0"
              />
              0
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_difficulty_copying_whiteboard"
                component="input" type="radio" value="1"
              />
              1
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_difficulty_copying_whiteboard"
                component="input" type="radio" value="2"
              />
              2
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_difficulty_copying_whiteboard"
                component="input" type="radio" value="3"
              />
              3
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_difficulty_copying_whiteboard"
                component="input" type="radio" value="4"
              />
              4
            </label>
          </td>
        </tr>
        <tr>
          <td>Avoids near work such as reading or writing</td>
          <td>
            <label>
              <Field
                name="patient_avoids_reading_writing" component="input" type="radio" value="0"
              />
              0
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_avoids_reading_writing" component="input" type="radio" value="1"
              />
              1
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_avoids_reading_writing" component="input" type="radio" value="2"
              />
              2
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_avoids_reading_writing" component="input" type="radio" value="3"
              />
              3
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_avoids_reading_writing" component="input" type="radio" value="4"
              />
              4
            </label>
          </td>
        </tr>
        <tr>
          <td>Skips over or leaves out small words when reading</td>
          <td>
            <label>
              <Field name="patient_skips_words" component="input" type="radio" value="0" />
              0
            </label>
          </td>
          <td>
            <label>
              <Field name="patient_skips_words" component="input" type="radio" value="1" />
              1
            </label>
          </td>
          <td>
            <label>
              <Field name="patient_skips_words" component="input" type="radio" value="2" />
              2
            </label>
          </td>
          <td>
            <label>
              <Field name="patient_skips_words" component="input" type="radio" value="3" />
              3
            </label>
          </td>
          <td>
            <label>
              <Field name="patient_skips_words" component="input" type="radio" value="4" />
              4
            </label>
          </td>
        </tr>
        <tr>
          <td>Writes uphill or downhill; difficulty writing in a straight line</td>
          <td>
            <label>
              <Field
                name="patient_difficulty_writing_straight"
                component="input" type="radio" value="0"
              />
              0
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_difficulty_writing_straight"
                component="input" type="radio" value="1"
              />
              1
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_difficulty_writing_straight"
                component="input" type="radio" value="2"
              />
              2
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_difficulty_writing_straight"
                component="input" type="radio" value="3"
              />
              3
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_difficulty_writing_straight"
                component="input" type="radio" value="4"
              />
              4
            </label>
          </td>
        </tr>
        <tr>
          <td>Difficulty lining up numbers when doing math</td>
          <td>
            <label>
              <Field
                name="patient_difficulty_lining_numbers" component="input" type="radio" value="0"
              />
              0
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_difficulty_lining_numbers" component="input" type="radio" value="1"
              />
              1
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_difficulty_lining_numbers" component="input" type="radio" value="2"
              />
              2
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_difficulty_lining_numbers" component="input" type="radio" value="3"
              />
              3
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_difficulty_lining_numbers" component="input" type="radio" value="4"
              />
              4
            </label>
          </td>
        </tr>
        <tr>
          <td>Difficulty understanding what you read / poor comprehension</td>
          <td>
            <label>
              <Field
                name="patient_difficulty_poor_comprehension" component="input" type="radio"
                value="0"
              />
              0
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_difficulty_poor_comprehension" component="input" type="radio"
                value="1"
              />
              1
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_difficulty_poor_comprehension" component="input" type="radio"
                value="2"
              />
              2
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_difficulty_poor_comprehension"
                component="input" type="radio" value="3"
              />
              3
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_difficulty_poor_comprehension"
                component="input" type="radio" value="4"
              />
              4
            </label>
          </td>
        </tr>
        <tr>
          <td>Holds books too close; leans too close to computer screen</td>
          <td>
            <label>
              <Field
                name="patient_leans_too_close_computer"
                component="input" type="radio" value="0"
              />
              0
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_leans_too_close_computer" component="input" type="radio" value="1"
              />
              1
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_leans_too_close_computer"
                component="input" type="radio" value="2"
              />
              2
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_leans_too_close_computer"
                component="input" type="radio" value="3"
              />
              3
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_leans_too_close_computer" component="input" type="radio" value="4"
              />
              4
            </label>
          </td>
        </tr>
        <tr>
          <td>Difficulty keeping attention on reading material</td>
          <td>
            <label>
              <Field
                name="patient_difficulty_attention_reading"
                component="input" type="radio" value="0"
              />
              0
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_difficulty_attention_reading"
                component="input" type="radio" value="1"
              />
              1
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_difficulty_attention_reading"
                component="input" type="radio" value="2"
              />
              2
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_difficulty_attention_reading"
                component="input" type="radio" value="3"
              />
              3
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_difficulty_attention_reading"
                component="input" type="radio" value="4"
              />
              4
            </label>
          </td>
        </tr>
        <tr>
          <td>Difficulty finishing assignments on time</td>
          <td>
            <label>
              <Field
                name="patient_difficulty_finishing_assignments"
                component="input" type="radio" value="0"
              />
              0
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_difficulty_finishing_assignments"
                component="input" type="radio" value="1"
              />
              1
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_difficulty_finishing_assignments"
                component="input" type="radio" value="2"
              />
              2
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_difficulty_finishing_assignments"
                component="input" type="radio" value="3"
              />
              3
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_difficulty_finishing_assignments"
                component="input" type="radio" value="4"
              />
              4
            </label>
          </td>
        </tr>
        <tr>
          <td>First response is "I can't" before trying</td>
          <td>
            <label>
              <Field
                name="patient_first_response_I_cant"
                component="input" type="radio" value="0"
              />
              0
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_first_response_I_cant"
                component="input" type="radio" value="1"
              />
              1
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_first_response_I_cant"
                component="input" type="radio" value="2"
              />
              2
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_first_response_I_cant"
                component="input" type="radio" value="3"
              />
              3
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_first_response_I_cant"
                component="input" type="radio" value="4"
              />
              4
            </label>
          </td>
        </tr>
        <tr>
          <td>Clumsy, bumps into things, knocks things over</td>
          <td>
            <label>
              <Field name="patient_bumps_into_things" component="input" type="radio" value="0" />
              0
            </label>
          </td>
          <td>
            <label>
              <Field name="patient_bumps_into_things" component="input" type="radio" value="1" />
              1
            </label>
          </td>
          <td>
            <label>
              <Field name="patient_bumps_into_things" component="input" type="radio" value="2" />
              2
            </label>
          </td>
          <td>
            <label>
              <Field name="patient_bumps_into_things" component="input" type="radio" value="3" />
              3
            </label>
          </td>
          <td>
            <label>
              <Field name="patient_bumps_into_things" component="input" type="radio" value="4" />
              4
            </label>
          </td>
        </tr>
        <tr>
          <td>Does not use time well when doing near work (homework)</td>
          <td>
            <label>
              <Field
                name="patient_time_not_well_homework" component="input" type="radio" value="0"
              />
              0
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_time_not_well_homework" component="input" type="radio" value="1"
              />
              1
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_time_not_well_homework" component="input" type="radio" value="2"
              />
              2
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_time_not_well_homework" component="input" type="radio" value="3"
              />
              3
            </label>
          </td>
          <td>
            <label>
              <Field
                name="patient_time_not_well_homework" component="input" type="radio" value="4"
              />
              4
            </label>
          </td>
        </tr>
        <tr>
          <td>Loses belongings and things</td>
          <td>
            <label>
              <Field name="patient_looses_things" component="input" type="radio" value="0" />
              0
            </label>
          </td>
          <td>
            <label>
              <Field name="patient_looses_things" component="input" type="radio" value="1" />
              1
            </label>
          </td>
          <td>
            <label>
              <Field name="patient_looses_things" component="input" type="radio" value="2" />
              2
            </label>
          </td>
          <td>
            <label>
              <Field name="patient_looses_things" component="input" type="radio" value="3" />
              3
            </label>
          </td>
          <td>
            <label>
              <Field name="patient_looses_things" component="input" type="radio" value="4" />
              4
            </label>
          </td>
        </tr>
        <tr>
          <td>Forgetful, poor memory</td>
          <td>
            <label>
              <Field name="patient_poor_memory" component="input" type="radio" value="0" />
              0
            </label>
          </td>
          <td>
            <label>
              <Field name="patient_poor_memory" component="input" type="radio" value="1" />
              1
            </label>
          </td>
          <td>
            <label>
              <Field name="patient_poor_memory" component="input" type="radio" value="2" />
              2
            </label>
          </td>
          <td>
            <label>
              <Field name="patient_poor_memory" component="input" type="radio" value="3" />
              3
            </label>
          </td>
          <td>
            <label>
              <Field name="patient_poor_memory" component="input" type="radio" value="4" />
              4
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

PatientDetails.propTypes = {
  foo: PropTypes.string,
};

const mapState = state => ({
  visionNeedsDriveDifficulty: (state.form.participantRegister.values &&
  state.form.participantRegister.values.vision_needs_drive_difficulty &&
  state.form.participantRegister.values.vision_needs_drive_difficulty === 'yes') || false,
});

export default connect(mapState)(PatientDetails);
