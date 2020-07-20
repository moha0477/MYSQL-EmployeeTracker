const orm = require('../config/orm')

class Employee {
    // Viewing all employees in the company
    selectAll(){
        return orm.selectAll('employee')
    }
    // Adding an employee that DOES have a manager
    addManagerID(data,input){
        return orm.create('employee',['first_name','last_name','role_id','manager_id'],[data.firstName, data.lastName, parseInt(data.roleID), parseInt(input.managerID)])
    }
    // Adding an employee that DOES NOT have a manager
    create(data){
        return orm.create('employee',['first_name','last_name','role_id','manager_id'],[data.firstName, data.lastName, parseInt(data.roleID)])
    }
    // Changing the role of an employee
    update(data){
        return orm.update('employee', ['role_id'], [parseInt(data.newRoleID), parseInt(data.employeeID)])
    }
     // Deleting an employee from the database
     delete(data){
        return orm.delete('employee',['id'],[data.employeeInfo])
    }
}

module.exports = new Employee();   