import * as yup from 'yup';

export const timeTrackingValidationSchema = yup.object().shape({
  hours_worked: yup.number().integer(),
  user_id: yup.string().nullable(),
});
