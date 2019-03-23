// window.onload = function() {
//     var view = document.getElementsByClassName("view")[0];
//     touchDown(view)
// }

//电脑鼠标事件
//onmousedown(this)
// function drag(div) {
//     var stateX = event.pageX;
//     if (document.addEventListener) {
//         document.addEventListener("mousemove", moveHandler, true);
//         document.addEventListener("mouseup", upHandler, true);
//     }

//     function moveHandler(e) {
//         var scroll = e.clientX - stateX
//         if (scroll >= 0) {
//             scroll = 0;
//         }
//         div.style.left = scroll + "px"
//     }

//     function upHandler(e) {
//         if (document.removeChild) {
//             document.removeEventListener("mouseup", upHandler, true);
//             document.removeEventListener("mousemove", moveHandler, true);

//         }
//     }
// }