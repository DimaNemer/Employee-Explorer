
import type { Employee } from '../types/employee';
async function getEmployeeData(): Promise<Employee> {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
   
    if (!response.ok) {
        throw new Error('Failed to fetch employee data');
}
return response.json();
}

export default async function EmployeeProfile() {
  let employee: Employee;

  try {
    employee = await getEmployeeData();
  } catch (error) {
    console.error("Error fetching employee data:", error);

    return (
      <p>Unable to load employee information. Please try again later.</p>
    );
  } 
    return (
    <section>
      <h2>Employee Profile</h2>
      <p>Name: {employee.name}</p>
      <p>Email: {employee.email}</p>
      <p>Company: {employee.company.name}</p>
    </section>
  );

}