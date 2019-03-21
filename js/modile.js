$(document).ready(function() {
    var view = document.getElementsByClassName("view")[0];
    touchDown(view)
    meun();
    add();
});
//菜单功能
function meun() {
    $("#meun").click(function() {
        alert("meun")
    })
}
//添加ToDo内容
function add() {
    $("#return").click(function() {
        $("#add-background").hide();
    })

    $("#add").click(function() {
        $("#add-background").fadeIn();
        var hrt = document.documentElement.clientHeight;
        document.getElementById('add-background').style.height = hrt + 'px'
        $("#add-input").focus();
    })

    $("#right").click(function() {
        var text = $("#add-input")[0].textContent
        if (text != "") {
            var node = $("#cont div").clone()[0]
            node.childNodes[1].children[0].innerText = text;
            node.childNodes[1].style.left = 0;
            touchDown(node.childNodes[1])
            $("#cont").prepend(node);
            $("#add-input")[0].textContent = "";
        }
        $("#add-background").hide();
    })
}
//用js原生写的移动端触屏事件
function touchDown(div) {
    var width = document.body.clientWidth * 0.15;
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
            scroll = endX - beginX + parseInt(window.getComputedStyle(div)['top'])
            if (scroll >= 0) {
                div.style.left = 0 + "px"
            } else if (scroll >= -width) {
                div.style.left = scroll + "px"
            } else if (scroll < -width) {
                div.style.left = -width + "px"
            }
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