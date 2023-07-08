import axios from 'axios';
import queryString from 'query-string';
import { EmployeeDataInterface, EmployeeDataGetQueryInterface } from 'interfaces/employee-data';
import { GetQueryInterface } from '../../interfaces';

export const getEmployeeData = async (query?: EmployeeDataGetQueryInterface) => {
  const response = await axios.get(`/api/employee-data${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createEmployeeData = async (employeeData: EmployeeDataInterface) => {
  const response = await axios.post('/api/employee-data', employeeData);
  return response.data;
};

export const updateEmployeeDataById = async (id: string, employeeData: EmployeeDataInterface) => {
  const response = await axios.put(`/api/employee-data/${id}`, employeeData);
  return response.data;
};

export const getEmployeeDataById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/employee-data/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteEmployeeDataById = async (id: string) => {
  const response = await axios.delete(`/api/employee-data/${id}`);
  return response.data;
};
