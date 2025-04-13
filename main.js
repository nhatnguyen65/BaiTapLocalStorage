/*
    Yêu cầu: 1.tạo 2 trang index, trang nguồn(2 input: tên, mật khẩu, nút xem(input'submit'))
    2. click tạo ra 1 ô đăng nhập nằm giữa ở trên trang cũ, thoát
    3. Khi ấn đăng nhập lấy dữ liệu từ local để xem tài khoản có tồn tại hay không
        - Có thì hiện tên tài khoản lên góc
            + alert thông báo 
            + loại bỏ nút login thay thành tên tài khoản
        - Sai thì đăng nhập lại
    
*/
// Dữ liệu mở đóng modal
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const headModal = document.querySelector('.head-modal');
const modalBtn = document.querySelector('.form-btns .btn');
const formName = document.querySelector('.form-name');
const formPassword1_lable = document.querySelector('.form-password1 label');
const formPassword2 = document.querySelector('.form-password2');
const formPassword3 = document.querySelector('.form-password3');

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

// Sign-up & Log-in
function kiemTraValue(name, pw1, pw2, pw3) {
    if(!name || !pw1 || !pw2 || !pw3) {
        alert(`Không được để dữ liệu trống !`);
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
                setTimeout(() => {
                    alert(`Bạn đã đăng ký tài khoản ${newName} thành công <3`);
                    hideContent(newName);
                }, 300);
            }
            else {
                alert(`Xác thực mật khẩu sai, vui lòng nhập lại !`);
            }
        }
        else {
            alert(`Tài khoản ${newName} đã tồn tại, vui lòng dùng tên khác !`);
            resetModal();
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
                setTimeout(() => {
                    alert(`Bạn đã đăng nhập tài khoản ${name} thành công <3`);
                    hideContent(name);
                }, 300);
            }
            else {
                alert(`Nhập mật khẩu sai, vui lòng nhập lại !`);
            }
        }
        else {
            alert(`Tài khoản ${name} chưa được đăng ký, vui lòng đăng ký tài khoản trước !`);
        }
    }
}
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
function logout() {
    resetModal();
    headUser.classList.add('none');
    headBtns.classList.remove('none');
    contentBtns.classList.remove('none');
    contentHi.textContent = `Chào mừng bạn đến với website của tôi 💖`;
    contentTextBtn.textContent = `Hãy đăng ký/đăng nhập để biết thêm chi tiết !`;
}
// Thay đổi mật khẩu
function changePassword() {
    let taiKhoan;
    if(localStorage.getItem('TaiKhoan') === null)
        taiKhoan = [];
    else
        taiKhoan = JSON.parse(localStorage.getItem('TaiKhoan'));
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
                    taiKhoan[index].password = newPassword;
                    localStorage.setItem('TaiKhoan', JSON.stringify(taiKhoan));
                    closeModal(true);
                    setTimeout(() => {
                        alert(`Bạn đã đổi mật khẩu tài khoản ${name} thành công <3`);
                    }, 300);
                }
                else {
                    alert(`Xác thực mật khẩu sai, vui lòng nhập lại !`);
                }
            }
            else {
                alert(`Nhập mật khẩu sai, vui lòng nhập lại !`);
            }
        }
        else {
            alert(`Tài khoản ${name} chưa được đăng ký !`);
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
    let taiKhoan;
    if(localStorage.getItem('TaiKhoan') === null)
        taiKhoan = [];
    else
        taiKhoan = JSON.parse(localStorage.getItem('TaiKhoan'));
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
                setTimeout(() => {
                    logout();
                    alert(`Bạn đã xoá thành công tài khoản ${name} !`);
                }, 300);
            }
            else {
                alert(`Nhập mật khẩu/xác thực mật khẩu sai, vui lòng nhập lại !`);
            }
        }
        else {
            alert(`Tài khoản ${name} chưa được đăng ký nên không thể xoá !`);
        }
    }
}
function xoaTaiKhoan() {
    openModal(true);
    headModal.textContent = 'Delete Account';
    modalBtn.value = 'Delete Account';
}