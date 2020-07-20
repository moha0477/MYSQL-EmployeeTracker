const orm = require('../config/orm')

class Department {

    selectAll(){
        return orm.selectAll('department')
    }

    create(data) {
        return orm.create('department', ['name'], [data.deptName])
    }
} 
    
module.exports = new Department();
