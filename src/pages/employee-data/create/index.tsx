import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createEmployeeData } from 'apiSdk/employee-data';
import { Error } from 'components/error';
import { employeeDataValidationSchema } from 'validationSchema/employee-data';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { EmployeeDataInterface } from 'interfaces/employee-data';

function EmployeeDataCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: EmployeeDataInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createEmployeeData(values);
      resetForm();
      router.push('/employee-data');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<EmployeeDataInterface>({
    initialValues: {
      work_hours: 0,
      performance_evaluation: 0,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: employeeDataValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Employee Data
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="work_hours" mb="4" isInvalid={!!formik.errors?.work_hours}>
            <FormLabel>Work Hours</FormLabel>
            <NumberInput
              name="work_hours"
              value={formik.values?.work_hours}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('work_hours', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.work_hours && <FormErrorMessage>{formik.errors?.work_hours}</FormErrorMessage>}
          </FormControl>
          <FormControl id="performance_evaluation" mb="4" isInvalid={!!formik.errors?.performance_evaluation}>
            <FormLabel>Performance Evaluation</FormLabel>
            <NumberInput
              name="performance_evaluation"
              value={formik.values?.performance_evaluation}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('performance_evaluation', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.performance_evaluation && (
              <FormErrorMessage>{formik.errors?.performance_evaluation}</FormErrorMessage>
            )}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'employee_data',
    operation: AccessOperationEnum.CREATE,
  }),
)(EmployeeDataCreatePage);
