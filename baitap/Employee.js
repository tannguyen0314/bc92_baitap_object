export default class Employee {
    constructor(account, name, email, password, dayWorking, position, basicSalary, hoursWorking) {
        this.account = account;
        this.name = name;
        this.email = email;
        this.password = password;
        this.dayWorking = dayWorking;
        this.position = position;
        this.basicSalary = Number(basicSalary);
        this.hoursWorking = Number(hoursWorking);
        this.totalSalary = 0;
    }
    calculateTotalSalary() {
        switch (this.position) {
            case "Sếp":
                this.totalSalary = this.basicSalary * 3;
                break;
            case "Trưởng Phòng":
                this.totalSalary = this.basicSalary * 2;
                break;
            case "Nhân viên":
                this.totalSalary = this.basicSalary;
                break;
            default:
                this.totalSalary = 0;
        }
    }
        classifyEmployee() {
            if (this.hoursWorking >= 192) {
                return "Xuất Sắc";
            } else if (this.hoursWorking >= 176) {
                return "Giỏi";
            } else if (this.hoursWorking >= 160) {
                return "Khá";
            } else {
                return "Trung Bình";
            }
        }
    }