const EMPLOYEE_KEY = "employees";

export const getEmployees = () => {
  const data = localStorage.getItem(EMPLOYEE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveEmployees = (employees) => {
  localStorage.setItem(EMPLOYEE_KEY, JSON.stringify(employees));
};
