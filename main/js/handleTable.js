
var forMode = 0;
var employeeId = null;
$(document).ready(function () {
    loadData();
})

/**
 * Định dạng lại ngày sinh
 * @param {date} dob 
 * @returns chuỗi ngày tháng năm họp lệ
 */
function formatDOB(dob) {
    let dobString = '';
    if (dob != null || dob != undefined) {
        let newDate = new Date(dob);
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        dobString = `${month}/${date}/${year}`;
    }
    return dobString;
}

$('.add-att').click(function () {
    //reset form nhân viên
    $(".dialog-content-right input").val(null);
    $('#btn-delete').attr('style','display: none');

    //sinh mã nhân viên tự động khi thêm mới
    $.ajax({
        url: 'http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode',
        method: 'GET'
    })
        .done(function (res) {
            let employeeId = $('#EmployeeCode');
            employeeId.val(res);
            employeeId.focus();
        })
        .fail(function (res) {
            alert("Get Api fail");
        })
    $(".dialog-modal").show();
    forMode = 1;
})

/** 
 * Vadidate dữ liệu
 */

$('input[required]').blur(function () {
    let value = $(this).val();
    if (value == '') {
        $(this).css('border', '1px solid red');
        $(this).attr('title', 'Trường này bắt buộc nhập');
    } else {
        $(this).css('border', ' 1px solid #BBBBBB');
        $(this).removeAttr('title');
    }
})

/**
 * Load lại dữ liệu
 */
function loadData() {
    // $('tbody').empty();
    $.ajax({
        url: "http://cukcuk.manhnv.net/v1/Employees",
        method: 'GET',
        async: false
    }).done(function (res) {
        res.forEach(employee => {
            var employeeId = employee.EmployeeId
            var employeeCode = employee.EmployeeCode;
            var fullName = employee.FullName;
            var gender = vadidateGender(employee.GenderName) ;
            var dob = formatDOB(employee.DateOfBirth);
            var phoneNumber = employee.IdentityNumber;
            var email = employee.Email;
            var positionName = employee.PositionName;
            var departmentName = employee.DepartmentName;
            var salary = formatMoney(employee.Salary);
            var workStatus = employee.WorkStatus;
            var trHTML = `<tr employeeId='${employeeId}'>
                    <td>
                        <input type="checkbox" name="employeeId" value="">
                        <label for=""></label> 
                    </td>
                    <td>${employeeCode}</td>
                    <td>${fullName}</td>
                    <td>${gender}</td>
                    <td>${dob}</td>
                    <td>${phoneNumber}</td>
                    <td>${email}</td>
                    <td>${positionName}</td>
                    <td>${departmentName}</td>
                    <td class="align-item-money">${salary}</td>
                    <td>${workStatus}</td>
                </tr>`;
            $('tbody').append(trHTML);
        });

    }).fail(function (res) {
        console.log('fail');
    })
}




/**
 * Thêm mới nhân viên
 */

$('#btn-save').click(function () {

    let method = 'POST';
    let url = "http://cukcuk.manhnv.net/v1/Employees";
    if (forMode == 0) {
        method = 'PUT';
        url = `http://cukcuk.manhnv.net/v1/Employees/${employeeId}`;
    }
    let employeeInfor = {};
    employeeInfor.EmployeeCode = $('#EmployeeCode').val();
    employeeInfor.FullName = $('#FullName').val();
    employeeInfor.DateOfBirth = $('#DateOfBirth').val();
    employeeInfor.GenderName = $('#GenderName').val();
    employeeInfor.IdentityNumber = $('#IdentityNumber').val();
    employeeInfor.IdentityPlace = $('#IdentityPlace').val();
    employeeInfor.Email = $('#Email').val();
    employeeInfor.phoneNumber = $('#PhoneNumber').val();
    employeeInfor.PositionName = $('#PositionName').val();
    employeeInfor.PersonalTaxCode = $('#PersonalTaxCode').val();
    employeeInfor.Salary = $('#Salary').val();
    employeeInfor.WorkStatus = $('#WorkStatus').val();
    validateSave();
    $.ajax({
        url: url,
        method: method,
        data: JSON.stringify(employeeInfor),
        dataType: 'json',
        contentType: 'application/json',

    }).done(function (res) {
        alert("Success");
        loadData();
        $('.dialog-modal').hide();
    }).fail(function (res) {
        alert("chua hoan thien");
    })
})

/** 
 * Nhấn nút Xóa để xóa 
 */
$('#btn-delete').click(function(){
    $.ajax({
        method : 'DELETE',
        url : `http://cukcuk.manhnv.net/v1/Employees/${employeeId}`,
       
    }).done(function(res){
        alert('success');
        $('tbody').empty();
        loadData();
        $('.dialog-modal').hide();
    }).fail(function(res){
        alert('fail');
    })
})


/**
 * Ấn nút để refresh lại dữ liệu
 */
$('#refresh').click(function () {
    alert('refresh')
    $('tbody').empty();
    loadData();
})

/** 
 * Đổ dữ liệu lên form
 */
 function vadidateGender(gender) {
    debugger
    if (gender == null ) {
        return '';
    }
    else {
        return gender;
    }
}


window.onload = function () {

    var trs = document.querySelectorAll('tbody tr');
    trs.forEach(tr => {
        tr.addEventListener('dblclick', function () {
            forMode = 0;
            $('#btn-delete').attr('style','display: block');
            employeeId = tr.getAttribute('employeeId');
            // console.log(employeeId);
            $('.dialog-modal').show();
            $.ajax({
                url: `http://cukcuk.manhnv.net/v1/Employees/${employeeId}`,
                method: 'GET',
            }).done(function (res) {

                $('#FullName').val(res.FullName);
                $('#EmployeeCode').val(res.EmployeeCode);

                $('#DateOfBirth').val(formatDOB(res.DateOfBirth));
                $('#GenderName').val(vadidateGender(res.GenderName));
                $('#IdentityNumber').val(res.IdentityNumber);
                $('#IdentityPlace').val(res.IdentityPlace);
                $('#Email').val(res.Email);
                $('#PhoneNumber').val(res.phoneNumber);
                $('#PositionName').val(res.PositionName);
                $('#PersonalTaxCode').val(res.PersonalTaxCode);
                $('#Salary').val(formatMoney(res.Salary));
                $('#WorkStatus').val(res.WorkStatus);
            }).fail(function (res) {

            })
        })
    })
}

$('div#grid').on('dbclick', 'tbody tr', function () {
    console.log(1);
    $('.dialog-modal').show();
})

$('.btn-cancel').click(function () {
    //$(".dialog-content-right input").val(null);
    $('.dialog-modal').hide();
})

function formatMoney(money) {
    
    if (money) {
        return money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
    }
    return '';
}


// Validate lại Form khi nhấn "Lưu"
function validateSave() {
    console.log($('input[required]'));
    $.each($('input[required]'), function (index, item) {
        if ($(item).val() == '') {
            $(item).focus();
            $(item).css('border', '1px solid #red');
            $(item).attr('placeholder', "Bạn chưa nhập thông tin này!");
            return false;
        }
    });
    return false;
}

validateEmail();
function validateEmail() {
    $('#Email').blur(function () {
        var patternEmail = new RegExp('^[A-Za-z0-9]+[A-Za-z0-9]*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)$');
        var value = $(this).val();
        if (!patternEmail.test(value)) {
            console.log($('#Email'));
            $('#Email').css('border', '1px solid #FF4747');
            console.log("Sai dinh dang email");
        }
    });
}