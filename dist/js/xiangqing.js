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





////////////////
$(function() {
    let id = location.search.split("=")[1];
    console.log(id);
    //获取url后挂的对应商品id;
    $.get("http://jx.xuzhixiang.top/ap/api/detail.php?id=" + id, data => {
        console.log(data);
        var data = data.data;
        var img = `
            <img src='${data.pimg}'>
        `;

        $("#spicture").html(img);
        $("#sb").html(data.pname);
        var imgStr = `
            <img src="${data.pimg}">
            <div class="zoom"></div>
        `;
        //只知道这个放大镜的区域放到div里面能解决卡顿冲突的问题，但是不知道原因
        var imgStr1 = `
            <img src="${data.pimg}">
        `;
        $(".pic div:first").html(imgStr);
        $(".pic div:last").html(imgStr1);





        //点击购物车按钮保存商品id及数量
        function savedata() {
            $("#btn").click(function() {
                if (localStorage.getItem("cartDatas")) {
                    var cartDatas = JSON.parse(localStorage.getItem("cartDatas"));
                } else {
                    var cartDatas = {};
                }

                var num = +($('#zhonjian').text())
                console.log(num);

                if (cartDatas[id]) {
                    cartDatas[id] += num
                } else {
                    cartDatas[id] = num
                }
                //我都没存localStorage，还在里面找

                localStorage.setItem("cartDatas", JSON.stringify(cartDatas));
                // alert("商品添加购物车成功")
                //而且，localStorage存的话要两个参数，第一个是字符串键名，第二个是json.stringify转成字符串的变量
                localStorage.setItem("cartDatas", JSON.stringify(cartDatas));

                var r = confirm("已成功添加" + num + "件商品" + '\n' + '是否跳转购物车');
                if (r == true) {
                    location.href = "购物车页面.html";
                } else {

                }
            })
        }
        savedata();

    })
})