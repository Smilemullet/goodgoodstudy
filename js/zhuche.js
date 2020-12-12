$("#last-input").click(function() {
    $.get("http://jx.xuzhixiang.top/ap/api/reg.php", {
        username: $("#text1").val(),

        password: $("#text2").val()
    }, data => {
        console.log(data);
        if (data.code == 1) {

            alert("注册成功")
            location.href = "登录页面.html"

        } else {
            alert("该手机号已经注册，注册失败")
        }
    })
})