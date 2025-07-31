// ==================================================butterfly 右下角悬浮菜单栏百分比 ==========================================================================
window.onscroll = percent;// 执行函数
// 页面百分比
function percent() {
    const ele = document.getElementById('article-container')
    if(!ele){
        return
    }
    const currentTop = window.scrollY || document.documentElement.scrollTop;
    const up = document.getElementById("go-up");
    let docHeight, winHeight, headerHeight, contentMath
    docHeight = ele.clientHeight;
    winHeight = window.innerHeight;
    headerHeight = ele.offsetTop;
    contentMath = Math.max(
      docHeight - winHeight,
      document.documentElement.scrollHeight - winHeight
    );

    const scrollPercent = (currentTop - headerHeight) / contentMath;
    let result = Math.max(0, Math.min(100, Math.round(scrollPercent * 100)))
    if (result < 95) {
      up.childNodes[0].style.display = "none";
      up.childNodes[2].style.display = "block";
      up.childNodes[2].innerHTML = result;
    } else {
      up.childNodes[2].style.display = "none";
      up.childNodes[0].style.display = "block";
    }
}
