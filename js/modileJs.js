window.onload = function() {
    var view = document.getElementsByClassName("view")[0];
    touchDown(view)
}

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

function touchDown(div) {
    div.addEventListener('touchstart', function(event) {
        event.stopPropagation();
        event.preventDefault();
        var beginX = event.targetTouches[0].screenX;
        var scroll, endX;

        if (document.addEventListener) {
            document.addEventListener("touchmove", moveHandler, true);
            document.addEventListener("touchend", endHandler, true);
        }

        function moveHandler(event) {
            event.stopPropagation();
            event.preventDefault();

            endX = event.targetTouches[0].screenX;
            scroll = endX - beginX
            if (scroll >= 0) {
                scroll = 0;
            }
            div.style.left = scroll + "px"
        }

        function endHandler(event) {
            event.stopPropagation();
            event.preventDefault();
            if (document.removeChild) {
                document.removeEventListener("touchend", endHandler, true);
                document.removeEventListener("touchmove", moveHandler, true);

            }
        }
    });
}
//这是用于完成待办时间的处理函数
function done(e) {
    if (e.children[0].style.opacity == "1") {
        e.children[0].style.opacity = "0.5"
    } else {
        e.children[0].style.opacity = "1"
    }
}