$(document).ready(function() {
    var view = document.getElementsByClassName("item");
    for (var i = 0; i < view.length; i++) {
        touchDown(view[i].childNodes[1])
    }
    console.log(view[1])
    meun();
    add();
    contTouchDown();
});
//菜单功能
function meun() {
    $("#meun").click(function() {
        $("#left-aside")[0].style.left = 0 + "px";
    })
    $("#shadow").click(function() {
        $("#left-aside")[0].style.left = -100 + "%";
    })
}
//添加ToDo内容
function add() {
    $("#return").click(function() {
        $("#add-textarea")[0].textContent = "";
        $("#add-aside").hide();
    })

    $("#add").click(function() {
        $("#add-aside").fadeIn();
        var hrt = document.documentElement.clientHeight;
        document.getElementById('add-head').parentNode.style.height = hrt + 'px'
        $("#add-textarea").focus();
    })

    $("#right").click(function() {
        var text = $("#add-textarea")[0].textContent
        if (text != "") {
            var node = $(".item").clone(true)[0];
            node.childNodes[1].children[0].children[0].innerText = text;
            node.childNodes[1].style.left = 0;
            touchDown(node.childNodes[1])
                // $("#cont").prepend(node);
            var tar = document.getElementsByClassName("item")[0];
            var parent = tar.parentNode
            parent.insertBefore(node, tar.nextSibling);
            $("#add-textarea")[0].textContent = "";
        }
        $("#add-aside").hide();
    })
}
//用js原生写的移动端触屏事件
function touchDown(v) {
    var width = document.body.clientWidth * 0.2;
    var lcont = document.getElementById("left-aside");

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
            var vLeft = parseInt(window.getComputedStyle(v)['left']);
            var lLeft = parseInt(window.getComputedStyle(lcont)['left']);
            scroll = endX - beginX;
            if (beginX > width * 2) {
                if (scroll < -15 || scroll > 15) {
                    if (scroll + vLeft >= 0) {
                        v.style.left = 0 + "px"
                    } else if (scroll >= -width) {
                        v.style.left = scroll + "px"
                    }
                }
            } else if (beginX < width) {
                if (scroll + lLeft <= -width * 5) {
                    lcont.style.left = -width * 5 + "px"
                } else if (scroll > 0 && (scroll + lLeft < 0)) {
                    lcont.style.left = scroll * 2 - width * 5 + "px"
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
            if ((endX - beginX) > -15 && (endX - beginX) < 15) {
                done(v);
            }
            if (beginX > width * 2)
                if (scroll >= -width / 2) {
                    v.style.left = 0 + "px"
                } else {
                    v.style.left = -width + "px"
                }
            else if (beginX < width) {
                if (scroll < width) {
                    lcont.style.left = -width * 5 + "px"
                } else {
                    lcont.style.left = 0 + "px"
                }
            }
        }
    }, { passive: false });
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
//cont中拉出侧边栏的触摸函数
function contTouchDown() {
    var cont1 = document.getElementsByTagName("section")[0];
    // var cont1 = document.getElementById("cont");
    var lcont = document.getElementById("left-aside");
    var width = document.body.clientWidth * 0.2;
    cont1.addEventListener('touchstart', function(event) {
        event.stopPropagation();
        // event.preventDefault();
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
            var lLeft = parseInt(window.getComputedStyle(lcont)['left']);
            scroll = endX - beginX;
            if (beginX < width) {
                if (scroll + lLeft <= -width * 5) {
                    lcont.style.left = -width * 5 + "px"
                } else if (scroll > 0 && (scroll + lLeft < 0)) {
                    lcont.style.left = scroll * 2 - width * 5 + "px"
                }
            }
        }

        function endHandler(event) {
            event.stopPropagation();
            // event.preventDefault();

            if (document.removeChild) {
                document.removeEventListener("touchend", endHandler, true);
                document.removeEventListener("touchmove", moveHandler, true);

            }
            if (beginX < width) {
                if (scroll < width) {
                    lcont.style.left = -width * 5 + "px"
                } else {
                    lcont.style.left = 0 + "px"
                }
            }
        }
    }, { passive: false })
}