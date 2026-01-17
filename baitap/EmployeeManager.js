export default class EmployeeManager {
    constructor() {
        this.EmployeeManager = [];
    }
    addNewEmployee(data){
        this.EmployeeManager.push(data);
    }


findEmployeeIndex(account) {
    return this.EmployeeManager.findIndex(emp => emp.account === account);
}

updateEmployee(updatedEmp) {
    const index = this.findEmployeeIndex(updatedEmp.account);
    if (index !== -1) {
        this.EmployeeManager[index] = updatedEmp;
        return true;
    }
    return false;
}

saveStorage() {
    const jsonEmployeeManager = JSON.stringify(this.EmployeeManager);
    localStorage.setItem("EmployeeList", jsonEmployeeManager);
}

getStorage() {
    const jsonEmployeeManager = localStorage.getItem("EmployeeList");
    if (jsonEmployeeManager) {
        this.EmployeeManager = JSON.parse(jsonEmployeeManager);
    }
}





}
