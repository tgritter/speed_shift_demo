import React, { Component } from 'react';
import Input from './input'
import {
    employee_data, 
    employee_error, 
    phone_input_validate, 
    format_value,
    format_fields, 
    error_check
} from '../helpers/helpers'
import axios from 'axios'
import update from 'immutability-helper'

const fields = Object.keys(employee_data)

class Employees extends Component {

    constructor(props) {
        super(props)
        this.state = {
            employee_input: employee_data,
            employees_list: [],
            employee_error: employee_error
        }
    }

    componentDidMount() {
        this.getEmployees()
    }

    getEmployees() {
        axios.get('/api/v1/employees')
        .then(response => {
          this.setState({employees_list: response.data})
        })
        .catch(error => console.log(error))
    }

    createEmployee = () => {
        const employee_input = this.state.employee_input;

        employee_input.phone_number = employee_input.phone_number.replace(/-/g, '')

        axios.post('/api/v1/employees', {employee: employee_input})
        .then(response => {
            const employees_list = update(this.state.employees_list, {
                $splice: [[0, 0, response.data]]
            })
            this.setState({
                employees_list: employees_list,
                employee_input: {
                    name: '',
                    position: '',
                    email: '',
                    phone_number: '',
                    salary: '',
                    date_hired: '',
                }
            })
        })
        .catch(error => console.log(error))      
    }    

    deleteEmployee = (id) => {
        axios.delete(`/api/v1/employees/${id}`)
        .then(response => {
          const employeeIndex = this.state.employees_list.findIndex(x => x.id === id)
          const employees = update(this.state.employees_list, {
            $splice: [[employeeIndex, 1]]
          })
          this.setState({
            employees_list: employees
          })
        })
        .catch(error => console.log(error))
      }
    

    handleChange = (category, e) => {
        const { employee_input} = this.state;

        if(!(category == 'phone_number' && !phone_input_validate(e.target.value))){
            employee_input[category] = e.target.value;
        }
        this.setState({employee_input})
    }

    checkInputs = () => {
        const { employee_input, employee_error } = this.state;
        const errors = error_check(employee_input, employee_error);

        this.setState({employee_error: errors});

        if (Object.values(employee_error).indexOf(true) < 0) {
            this.createEmployee()
        }
    }


    render() {
        const { employee_input, employee_error } = this.state;
        return (
            <div>

                <div className="header">
                    <h1>Create Employee</h1>
                </div>

                <div className={"inputWrapper"}>
                    {fields.map((field) => {
                        return(
                            <Input 
                                key={field}
                                field={field} 
                                value={employee_input[field]}
                                onChange={(e) => this.handleChange(field, e)}
                                type={field == 'salary' ? 'number' : 'text'}
                                error={employee_error[field]}
                            />
                        )
                    })}
                </div>

                <div className="buttonContainer">
                    <button className="button" onClick={this.checkInputs}>Add Employee</button>
                </div>
                
                <div className="header">
                    <h1>Employee List</h1>
                </div>
                    
                <div className="listWrapper">
                    <ul className="employeeList">
                        <li className="employeeHeader"> 
                            {fields.map((field) => {
                                return(
                                    <div key={field} className="employeeItem">{format_fields(field)}</div> 
                                )
                            })} 
                            <span className="padding">{'x'}</span>
                        </li>
                        {this.state.employees_list.map((employee) => {
                            return(
                                <li className="employee" employee={employee} key={employee.id}> 
                                    {fields.map((field) => {
                                        return(
                                            <div key={field} className="employeeItem">{field == 'phone_number' || field == 'salary' ? format_value(field, employee[field], false) : employee[field]}</div> 
                                        )
                                    })}  
                                    <span className="deleteEmployeeBtn" onClick={() => this.deleteEmployee(employee.id)}>x</span>
                                </li>
                            )       
                        })} 
                    </ul>
                </div>
            </div> 
        );
    }
}

export default Employees;