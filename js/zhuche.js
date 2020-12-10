$("#last-input").click(function() {
    console.log(aa);
    $.get("http://jx.xuzhixiang.top/ap/api/reg.php", {
        username: $("#text1").val(),

        password: $("#text2").val()
    }, data => {
        console.log(data);
        if (data.code == 1) {

            // location.href = "shouye.html"
            alert("注册成功")
        } else {
            alert("该手机号已经注册，注册失败")
        }
    })
})