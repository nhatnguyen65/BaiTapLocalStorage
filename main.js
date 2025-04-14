// Dữ liệu mở đóng modal
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const headModal = document.querySelector('.head-modal');
const modalBtn = document.querySelector('.form-btns .btn');
const formName = document.querySelector('.form-name');
const formPassword1_lable = document.querySelector('.form-password1 label');
const formPassword2 = document.querySelector('.form-password2');
const formPassword3 = document.querySelector('.form-password3');
const alertBox = document.querySelector('.alertBox');

//Dữ liệu hiện user và thanh đổi content
const headBtns = document.querySelector('.head-btns');
const contentBtns = document.querySelector('.content-btns');
const headUser = document.querySelector('.head-user');
const contentHi = document.querySelector('.content-right .content-hi');
const contentTextBtn =  document.querySelector('.content-right .content-text-btn');

// Mở modal
function openModal(value) {
    modal.classList.remove('none');
    overlay.classList.remove('none');
    if(value) {
        headModal.textContent = 'Sign Up';
        modalBtn.value = 'Sign Up';
        formPassword2.classList.remove('none');
    }
    else {
        headModal.textContent = 'Log In';
        modalBtn.value = 'Log In';
        formPassword2.classList.add('none');
    }
}
// Đóng modal
function resetModal() {
    formName.classList.remove('none');
    formPassword2.classList.remove('none');
    document.querySelectorAll('.modal-form input').forEach(element => {
        element.value = null;
    });
}
function closeModal(value) {
    modal.classList.add('fadeOut');
    setTimeout(() => {
        modal.classList.add('none');
        overlay.classList.add('none');
        modal.classList.remove('fadeOut');
        formPassword3.classList.add('none');
        if(value)
            resetModal();
    }, 300);
}

// Hiện user và thay đổi content
function hideContent(name) {
    headBtns.classList.add('none');
    contentBtns.classList.add('none');
    headUser.classList.remove('none');
    headUser.querySelector('.user-name').textContent = name;
    contentHi.textContent = `Chào mừng ${name} đến website của tôi 💖`;
    contentTextBtn.textContent = `Cảm ơn bạn đã đăng ký/đăng nhập vào website của tôi 😘`;
}

// Ô thông báo
function autoAlert(message) {
    alertBox.querySelector('.alert-message').textContent = message;
    alertBox.classList.remove('none');
    setTimeout(() => {
        alertBox.classList.add('alertBoxOut');
        setTimeout(() => {
            alertBox.classList.add('none');
            alertBox.classList.remove('alertBoxOut');
        }, 300);
    }, 1000);
}

// Sign-up & Log-in
function kiemTraValue(name, pw1, pw2, pw3) {
    if(!name || !pw1 || !pw2 || !pw3) {
        autoAlert(`Không được để dữ liệu trống !`);
        return false;
    }
    return true;
}
function kiemTraTK(taiKhoan, tenTK) {
    return taiKhoan.find((element) => {
        return element.name === tenTK;
    });
}
function signup() {
    let taiKhoan;
    if(localStorage.getItem('TaiKhoan') === null)
        taiKhoan = [];
    else
        taiKhoan = JSON.parse(localStorage.getItem('TaiKhoan'));
    let newName = document.querySelector('#name').value;
    let password1 = document.querySelector('#password1').value;
    let password2 = document.querySelector('#password2').value;
    if(kiemTraValue(newName, password1, password2, true)) {
        if(!kiemTraTK(taiKhoan, newName)) {
            if(password1 === password2) {
                let newTK = {
                    name: newName,
                    password: password1
                };
                taiKhoan.push(newTK);
                localStorage.setItem('TaiKhoan', JSON.stringify(taiKhoan));
                closeModal(true);
                autoAlert(`Bạn đã đăng ký tài khoản ${newName} thành công <3`);
                setTimeout(() => {
                    hideContent(newName);
                }, 300);
            }
            else {
                autoAlert(`Xác thực mật khẩu sai, vui lòng nhập lại !`);
            }
        }
        else {
            autoAlert(`Tài khoản ${newName} đã tồn tại, vui lòng dùng tên khác !`);
            setTimeout(() => {
                resetModal();
            }, 300);
        }
    }
}
function login() {
    let taiKhoan;
    if(localStorage.getItem('TaiKhoan') === null)
        taiKhoan = [];
    else
        taiKhoan = JSON.parse(localStorage.getItem('TaiKhoan'));
    let name = document.querySelector('#name').value;
    let password = document.querySelector('#password1').value;
    if(kiemTraValue(name, password, true, true)) {
        let element = kiemTraTK(taiKhoan, name);
        if(element) {
            if(element.password === password) {
                closeModal(true);
                autoAlert(`Bạn đã đăng nhập tài khoản ${name} thành công <3`);
                setTimeout(() => {
                    hideContent(name);
                }, 300);
            }
            else {
                autoAlert(`Nhập mật khẩu sai, vui lòng nhập lại !`);
            }
        }
        else {
            autoAlert(`Tài khoản ${name} chưa được đăng ký, vui lòng đăng ký tài khoản trước !`);
        }
    }
}
// Xác định công việc
function changeData(value) {
    switch(value) {
        case 'Sign Up':
            signup();
            break;
        case 'Log In':
            login();
            break;
        case 'Change Password':
            changePassword();
            break;
        case 'Delete Account':
            deleteAcc();
            break;
    }
}
// Log-out
function logout(value) {
    resetModal();
    if(value) {
        autoAlert(`Bạn đã đăng xuất tài khoản`);
    }
    setTimeout(() => {
        headUser.classList.add('none');
        headBtns.classList.remove('none');
        contentBtns.classList.remove('none');
        contentHi.textContent = `Chào mừng bạn đến với website của tôi ❤️`;
        contentTextBtn.textContent = `Hãy đăng ký/đăng nhập để biết thêm chi tiết !`;
    }, 300);
}
// Thay đổi mật khẩu
function changePassword() {
    let taiKhoan = JSON.parse(localStorage.getItem('TaiKhoan'));
    let name = document.querySelector('#name').value;
    let password1 = document.querySelector('#password1').value;
    let newPassword = document.querySelector('#password3').value;
    let password2 = document.querySelector('#password2').value;
    if(kiemTraValue(name, password1, password2, newPassword)) {
        let element = kiemTraTK(taiKhoan, name);
        if(element) {
            if(element.password === password1) {
                let index = taiKhoan.findIndex((element) => {
                    return element.name === name;
                });
                if(newPassword === password2) {
                    if(password1 !== newPassword) {
                        taiKhoan[index].password = newPassword;
                        localStorage.setItem('TaiKhoan', JSON.stringify(taiKhoan));
                        closeModal(true);
                        autoAlert(`Bạn đã đổi mật khẩu tài khoản ${name} thành công <3`);
                    }
                    else {
                        autoAlert(`Mật khẩu mới không được trùng với mật khẩu cũ, vui lòng nhập lại !`);
                    }
                }
                else {
                    autoAlert(`Xác thực mật khẩu sai, vui lòng nhập lại !`);
                }
            }
            else {
                autoAlert(`Nhập mật khẩu sai, vui lòng nhập lại !`);
            }
        }
        else {
            autoAlert(`Tài khoản ${name} chưa được đăng ký !`);
        }
    }
}
function doiMatKhau() {
    openModal(true);
    headModal.textContent = 'Change Password';
    formPassword3.classList.remove('none');
    modalBtn.value = 'Change Password';
}
// Xoá tài khoản
function deleteAcc() {
    let taiKhoan = JSON.parse(localStorage.getItem('TaiKhoan'));
    let name = document.querySelector('#name').value;
    let password1 = document.querySelector('#password1').value;
    let password2 = document.querySelector('#password2').value;
    if(kiemTraValue(name, password1, password2, true)) {
        let element = kiemTraTK(taiKhoan, name);
        if(element) {
            let index = taiKhoan.findIndex((element) => {
                element.name === name;
            });
            if(element.password === password1 && element.password === password2) {
                taiKhoan.splice(index, 1);
                localStorage.setItem('TaiKhoan', JSON.stringify(taiKhoan));
                closeModal(true);
                logout();
                autoAlert(`Bạn đã xoá thành công tài khoản ${name} !`);
            }
            else {
                autoAlert(`Nhập mật khẩu/xác thực mật khẩu sai, vui lòng nhập lại !`);
            }
        }
        else {
            autoAlert(`Tài khoản ${name} chưa được đăng ký nên không thể xoá !`);
        }
    }
}
function xoaTaiKhoan() {
    openModal(true);
    headModal.textContent = 'Delete Account';
    modalBtn.value = 'Delete Account';
}

// Nút xoá dữ liệu LocalStorage
function clearData() {
    if(confirm(`Bạn có chắc muốn xoá hết dữ liệu tài khoản không !`)) {
        localStorage.removeItem('TaiKhoan');
        setTimeout(() => {
            logout();
        }, 300);
    }
}