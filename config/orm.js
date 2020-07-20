const connection = require('./connection');

class ORM {
    constructor(connection){
        this.connection = connection;
    }

    printQuestionMarks(numberOfValuesOrColumns){
        const questionMarks = [];
        for (var i = 0; i < numberOfValuesOrColumns; i++) {
            if(type === 'cols') {
                questionMarks.push("??");
            } else {
                questionMarks.push("?");
            }
            questionMarks.push("?");
        }
        return questionMarks.join(', ');
      }

    selectAll(table) {
        // SELECT ALL FROM Department
        const queryString = 'SELECT * FROM ??';
        return this.connection.query(queryString, [table])
    }

    create(table, columns, values) {
        const queryString = `INSERT INTO ?? (${columns.join(', ')}) VALUES (${this.printQuestionMarks(values.length)})`;
        console.log(queryString);
        
        return this.connection.query(queryString, [table, ...values])

    }

    update(table, objCol, colName, id, Col) {
        // UPDATE employee SET role_id = data.newRoleID WHERE id = data.employeeID
        var queryString = `UPDATE ?? SET ?? = ? WHERE ?? = ?`;
        console.log(queryString);

        return this.connection.query(queryString, [table, objCol, colName, id, Col])
    }

    delete(tableInput, colToSearch, valOfCol) {
      // DELETE FROM employee WHERE id = data.employeeInfo
      const queryString = "DELETE FROM ?? WHERE ?? = ?";
      return this.connection.query(queryString, [tableInput, colToSearch, valOfCol]);
    }

}

module.exports = new ORM(connection)