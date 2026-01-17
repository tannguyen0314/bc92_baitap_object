import Employee from "../baitap/Employee.js";
import EmployeeManager from "../baitap/EmployeeManager.js";
import Validation from "../baitap/validation.js";

const manager = new EmployeeManager();
const validation = new Validation();

const getInfoEmp = () => {
    const account = document.getElementById("tknv").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dayWorking = document.getElementById("datepicker").value;
    const position = document.getElementById("chucvu").value;
    const basicSalary = document.getElementById("luongCB").value;
    const hoursWorking = document.getElementById("gioLam").value;

    const newEmployee = new Employee(
        account, name, email, password, dayWorking, position, basicSalary, hoursWorking
    );

    newEmployee.calculateTotalSalary();
    return newEmployee;
}

const renderEmp = (data) => {
    let tableContent = "";
    data.forEach((emp) => {
        tableContent += `
        <tr>
            <td>${emp.account}</td>
            <td>${emp.name}</td>
            <td>${emp.email}</td>
            <td>${emp.dayWorking}</td>
            <td>${emp.position}</td>
            <td>${emp.totalSalary.toLocaleString()}</td>
            <td>${emp.classifyEmployee()}</td>
            <td>
            <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editEmp('${emp.account}')">Sửa</button>
            <button class="btn btn-danger" onclick="removeEmp('${emp.account}')">Xóa</button>
            </td>
        </tr>`;
    });
    document.getElementById("tableDanhSach").innerHTML = tableContent;
}


document.getElementById("btnThemNV").onclick = () => {

    const account = document.getElementById("tknv").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dayWorking = document.getElementById("datepicker").value;
    const position = document.getElementById("chucvu").value;
    const basicSalary = document.getElementById("luongCB").value;
    const hoursWorking = document.getElementById("gioLam").value;

    let isValid = true;

    isValid &= validation.checkEmpty(account, "tbTKNV", "Không được để trống") && validation.checkAccount(account, "tbTKNV", "Tài khoản từ 4-6 ký số");

    isValid &= validation.checkEmpty(name, "tbTen", "Không được để trống") && validation.checkName(name, "tbTen", "Tên phải là chữ");

    isValid &= validation.checkEmpty(email, "tbEmail", "Không được để trống") && validation.checkEmail(email, "tbEmail", "Email không đúng định dạng");

    isValid &= validation.checkEmpty(password, "tbMatKhau", "Không được để trống") && validation.checkPassword(password, "tbMatKhau", "Mật khẩu 6-10 ký tự (1 số, 1 hoa, 1 đặc biệt)");

    isValid &= validation.checkRange(basicSalary, "tbLuongCB", "Lương từ 1tr - 20tr", 1000000, 20000000);

    isValid &= validation.checkPosition("chucvu", "tbChucVu", "Vui lòng chọn chức vụ hợp lệ");

    isValid &= validation.checkRange(hoursWorking, "tbGiolam", "Giờ làm từ 80 - 200 giờ", 80, 200);

    // Nếu tất cả hợp lệ thì mới thêm nhân viên
    if (isValid) {
        const newEmp = getInfoEmp();
        manager.addNewEmployee(newEmp);
        renderEmp(manager.EmployeeManager);
        $('#myModal').modal('hide');
    }
};
document.getElementById("btnCapNhat").onclick = () => {

    const updatedEmp = getInfoEmp();

    if (isValid) {
        manager.updateEmployee(updatedEmp);
        manager.saveStorage();
        renderEmp(manager.EmployeeManager);
        $('#myModal').modal('hide');
    }
}

window.removeEmp = (account) => {
    // Logic xóa 
    manager.EmployeeManager = manager.EmployeeManager.filter(emp => emp.account !== account);
    renderEmp(manager.EmployeeManager);
}

//  nút sửa trên table
window.editEmp = (account) => {
    const emp = manager.EmployeeManager.find(item => item.account === account);
    
    if (emp) {

        document.getElementById("tknv").value = emp.account;
        document.getElementById("tknv").disabled = true; 
        document.getElementById("name").value = emp.name;
        document.getElementById("email").value = emp.email;
        document.getElementById("password").value = emp.password;
        document.getElementById("datepicker").value = emp.dayWorking;
        document.getElementById("luongCB").value = emp.basicSalary;
        document.getElementById("chucvu").value = emp.position;
        document.getElementById("gioLam").value = emp.hoursWorking;

        // Ẩn nút Thêm, hiện nút Cập nhật
        document.getElementById("btnThemNV").style.display = "none";
        document.getElementById("btnCapNhat").style.display = "inline-block";
    }
}

// nhấn nút cập nhật trên Modal
document.getElementById("btnCapNhat").onclick = () => {

    const updatedEmp = getInfoEmp();
    if (isValid) {
        manager.updateEmployee(updatedEmp);
        renderEmp(manager.EmployeeManager);
        $('#myModal').modal('hide'); 
    }
}

// 3. Xử lý nút "Thêm nhân viên" ở ngoài bảng để reset form
document.getElementById("btnThem").onclick = () => {
    document.querySelector('form').reset();
    document.getElementById("tknv").disabled = false;
    document.getElementById("btnThemNV").style.display = "inline-block";
    document.getElementById("btnCapNhat").style.display = "none";
}
