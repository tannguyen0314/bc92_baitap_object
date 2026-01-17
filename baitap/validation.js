export default class Validation {
    checkEmpty(value, spanId, message) {
        if (value.trim() === "") {
            document.getElementById(spanId).innerHTML = message;
            document.getElementById(spanId).style.display = "block";
            return false;
        }
        document.getElementById(spanId).innerHTML = "";
        return true;
    }

    // Kiểm tra Tài khoản (4-6 ký số)
    checkAccount(value, spanId, message) {
        const pattern = /^[0-9]{4,6}$/;
        if (value.match(pattern)) {
            document.getElementById(spanId).innerHTML = "";
            return true;
        }
        document.getElementById(spanId).innerHTML = message;
        document.getElementById(spanId).style.display = "block";
        return false;
    }

    // Kiểm tra Họ tên (Phải là chữ)
    checkName(value, spanId, message) {
        const pattern = /^[A-Za-zÀ-ỹ\s]+$/;
        if (value.match(pattern)) {
            document.getElementById(spanId).innerHTML = "";
            return true;
        }
        document.getElementById(spanId).innerHTML = message;
        document.getElementById(spanId).style.display = "block";
        return false;
    }

    // Kiểm tra Email
    checkEmail(value, spanId, message) {
        const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value.match(pattern)) {
            document.getElementById(spanId).innerHTML = "";
            return true;
        }
        document.getElementById(spanId).innerHTML = message;
        document.getElementById(spanId).style.display = "block";
        return false;
    }

    // Kiểm tra Mật khẩu (6-10 ký tự, ít nhất 1 số & 1 hoa & 1 đặc biệt & không để trống)
    checkPassword(value, spanId, message) {
        const pattern = /^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,10}$/;
        if (value.match(pattern)) {
            document.getElementById(spanId).innerHTML = "";
            return true;
        }
        document.getElementById(spanId).innerHTML = message;
        document.getElementById(spanId).style.display = "block";
        return false;
    }

    // Kiểm tra Lương và Giờ làm (Khoảng giá trị)
    checkRange(value, spanId, message, min, max) {
        if (value >= min && value <= max) {
            document.getElementById(spanId).innerHTML = "";
            return true;
        }
        document.getElementById(spanId).innerHTML = message;
        document.getElementById(spanId).style.display = "block";
        return false;
    }

    // Kiểm tra Chức vụ
    checkPosition(idSelect, spanId, message) {
    const selectElement = document.getElementById(idSelect);
    if (selectElement) {
        if (selectElement.selectedIndex !== 0) {
            document.getElementById(spanId).innerHTML = "";
            return true;
        }
    }
    
    document.getElementById(spanId).innerHTML = message;
    document.getElementById(spanId).style.display = "block";
    return false;
}
}