const orm = require('../config/orm')

class Role {
    
    selectAll(){
        return orm.selectAll('role')
    }

    create(data){
        return orm.create("role", ["title", "salary", "department_id"], [data.roleName, parseInt(data.roleSalary), parseInt(data.deptID)])
    }
}

module.exports = new Role()