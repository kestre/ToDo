$(document).ready(function() {
    var view = document.getElementsByClassName("view");
    for (var i = 0; i < view.length; i++) {
        touchDown(view[i])
    }
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
            var node = $("#cont div").clone(true)[0];
            node.childNodes[1].children[0].children[0].innerText = text;
            node.childNodes[1].style.left = 0;
            touchDown(node.childNodes[1])
                // $("#cont").prepend(node);
            var tar = document.getElementsByClassName("item")[0];
            var parent = tar.parentNode
            parent.insertBefore(node, tar.nextSibling);
            $("#add-input")[0].textContent = "";
        }
        $("#add-background").hide();
    })
}
//用js原生写的移动端触屏事件
function touchDown(v) {
    var width = document.body.clientWidth * 0.25;
    v.childNodes[3].addEventListener('click', () => {
        v.parentNode.parentNode.removeChild(v.parentNode);
    })
    v.childNodes[1].addEventListener('touchstart', function(event) {
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
            var vTop = parseInt(window.getComputedStyle(v)['top']);
            scroll = endX - beginX + vTop;
            if (((endX - beginX) < -10 || (endX - beginX) > 10)) {
                if (scroll >= 0) {
                    v.style.left = 0 + "px"
                } else if (scroll >= -width) {
                    v.style.left = scroll + "px"
                } else if (scroll < -width) {
                    v.style.left = -width + "px"
                }
            }
        }

        function endHandler(event) {
            event.stopPropagation();
            event.preventDefault();
            if (document.removeChild) {
                document.removeEventListener("touchend", endHandler, true);
                document.removeEventListener("touchmove", moveHandler, true);

            }
            if ((endX - beginX) > -10 && (endX - beginX) < 10) {
                done(v);
            }
            if (scroll >= -width / 2) {
                v.style.left = 0 + "px"
            } else if (scroll < -width / 2) {
                v.style.left = -width + "px"
            }
        }
    });
}
//这是用于完成待办时间的处理函数
function done(v) {
    if (v.children[0].style.opacity == "1") {
        v.children[0].style.opacity = "0.5"
        v.children[0].children[0].style.textDecoration = "line-through"
    } else {
        v.children[0].style.opacity = "1"
        v.children[0].children[0].style.textDecoration = "none"
    }
}