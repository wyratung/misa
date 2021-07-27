var tbody = document.querySelector("tbody");
var dialog = document.querySelector(".dialog-modal")
var btnExit = document.querySelector('.btn-exit');
var btnAdd =document.querySelector('.add-att');



btnExit.addEventListener('click', () => {
    console.log('m bam exit');
    dialog.style.display = 'none';
})


//Dropdown
var dropdownList0 = document.querySelector(".dropdown-list-0");
var dropdownValue0 =document.querySelector(".dropdown-value-0");
var dropdownList1 = document.querySelector(".dropdown-list-1");
var dropdownValue1 =document.querySelector(".dropdown-value-1");
var dropdownList2 = document.querySelector(".dropdown-list-2");
var dropdownValue2 =document.querySelector(".dropdown-value-2");
var dropdownList3 = document.querySelector(".dropdown-list-3");
var dropdownValue3 =document.querySelector(".dropdown-value-3");
var dropdownList4 = document.querySelector(".dropdown-list-4");
var dropdownValue4 =document.querySelector(".dropdown-value-4");
var dropdownList5 = document.querySelector(".dropdown-list-5");
var dropdownValue5 =document.querySelector(".dropdown-value-5");

var state=false;
var currVal=0;
var dropdownPos=[
    
]

var dropdownPos2=[
    
]
$.ajax({
    url: 'http://cukcuk.manhnv.net/v1/Positions',
    method: 'GET',
    async :false

}).done(function(res){
    res.forEach(position=>{
        
        dropdownPos.push(position.PositionName);
        dropdownPos2.push(position.PositionName);
    })
}).fail(function(res){
    console.log('ga vl');
})


var dropdownRestaurant=[
    'Nhà hàng Biển Đông',
    'Nhà hàng Biển Hồ',
    'Nhà hàng Thailand',
    'Nhà hàng China'
];

var dropdownDepartment=[
    'Tất cả phòng ban',
    'Phòng nội vụ',
    'Phòng tài chính'
]



var dropdownDepartment2=[
    'Phòng nhân sự',
    'Phòng nội vụ',
    'Phòng tài chính'
]

var dropdownStatus=[
    'Đang làm việc',
    'Nghỉ phép',
    'Đã thôi việc'
]



function renderDropdown(dropdownValue, dropdownList, dropdownData) {

    render();


    function render() {
        var dropdownListHTML = '';
        dropdownValue.innerHTML = dropdownData[currVal];

        for (var i = 0; i < dropdownData.length; i++) {
            if (i == currVal) {
                dropdownListHTML += `<li data-id=${i} class="dropdown-item dropdown-item--active"><i class="fas fa-check dropdown-item__icon"></i> ${dropdownData[i]} </li>`;
            } else {
                dropdownListHTML += `<li data-id=${i} class="dropdown-item"><i class="fas fa-check dropdown-item__icon"></i> ${dropdownData[i]} </li>`;
            }
        }

        dropdownList.innerHTML = dropdownListHTML;

        var items = dropdownList.querySelectorAll('.dropdown-item');

        items.forEach((item) => {
            item.addEventListener('click', () => {
                var dataId = item.getAttribute('data-id');
                this.currVal = dataId;
                render();
            });
        });

    }
}

renderDropdown(dropdownValue0,dropdownList0,dropdownRestaurant);
renderDropdown(dropdownValue1,dropdownList1,dropdownDepartment);
renderDropdown(dropdownValue2,dropdownList2,dropdownPos);
renderDropdown(dropdownValue3,dropdownList3,dropdownPos2);
renderDropdown(dropdownValue4,dropdownList4,dropdownDepartment2);
renderDropdown(dropdownValue5,dropdownList5,dropdownStatus);

var dropdowns = document.querySelectorAll(".dropdown");
var dropshowLists=document.querySelectorAll(".search_places__department");

function render1(){
    
    // dropshowLists.forEach((dropshowList)=>{
    //     dropshowList.addEventListener('blur',function(){
    //         dropdown.querySelector('.dropdown-list').classList.toggle('show');
    //         console.log(1);
    //     })
    // });
    
    dropdowns.forEach((dropdown) => {
        dropdown.addEventListener('click', function () {
            dropdown.querySelector('.dropdown-list').classList.add('dropdown-list-active');
            dropdown.querySelector('.dropdown-list').classList.toggle('show');
            dropdown.querySelector('.icon-up').classList.toggle('show');
            dropdown.querySelector('.icon-down').classList.toggle('show');
        });
        dropdown.addEventListener('blur',function(){
            alert(1);
        });
    });
    // render();
}
 render1();

 

// console.log( $('.employee-profile-dialog')[0])
// $(document).ready(function(){
//     var xs=$('.dropdown');
//     xs.array.forEach(x=> {
//         x.blur(function(){
//             alert(1);
//         })
//     });
    
// })





// while(1){
//     var eixtdropdown=document.querySelector('.dropdown-list.dropdown-list-active');
// console.log(eixtdropdown);
// var exit = document.querySelector("#app");
// exit.addEventListener('click',function(){
    
//     eixtdropdown.classList.remove('dropdown-list-active');
//     eixtdropdown.querySelector('.dropdown-list').classList.toggle('show');
// })
// }





