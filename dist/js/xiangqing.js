var jian = document.getElementById('jian');
var jia = document.getElementById('jia')
var zhonjian = document.getElementById('zhonjian')
jian.onclick = function() {
    zhonjian.innerHTML--;
    console.log(1);
    if (zhonjian.innerText <= 1) {
        zhonjian.innerText = 1
    }
}
jia.onclick = function() {
    zhonjian.innerText++;
}