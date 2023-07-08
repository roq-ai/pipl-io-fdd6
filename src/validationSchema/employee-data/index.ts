import * as yup from 'yup';

export const employeeDataValidationSchema = yup.object().shape({
  work_hours: yup.number().integer(),
  performance_evaluation: yup.number().integer(),
  user_id: yup.string().nullable(),
});
