var tbody = document.querySelector("tbody");
var dialog = document.querySelector(".dialog-modal")

// tbody.addEventListener('click', function() {
//     console.log('may da bam vao tao roi day thang doggggg')
// })

tbody.onclick = function() {
    dialog.style.display = "block"
}