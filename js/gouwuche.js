$(function() {
    //在购物车展示加入的商品
    function showData() {
        var cartDatas = JSON.parse(localStorage.getItem("cartDatas"));

        // console.log(cartDatas);

        var arr = [];

        for (let i in cartDatas) {
            // console.log(i, cartDatas[i])

            var str = "";
            $.get("http://jx.xuzhixiang.top/ap/api/detail.php?id=" + i).then(data => {
                // console.log(data);
                var data = data.data;
                arr.push(data.pprice);

                str += `
            <li data-id="${data.pid}">
                <input type="checkbox" class="check">
                <img src="${data.pimg}" alt="">
                <span>${data.pname}</span>
                <span class="price">${data.pprice}</span>
                <span class="kuang">
                    <button class="jian">-</button>
                    <input class="txt" type="text" value="${cartDatas[i]}">
                    <button class="jia">+</button>
                </span>
                <span class="pertotalprice">${data.pprice*cartDatas[i]}</span>
                <span class="delete">×</span>
            </li>

                `;
                $(".xieru").html(str);




            }).then(function() {
                //加减商品数

                var aJians = document.querySelectorAll(".jian");
                var jia = document.querySelectorAll(".jia");
                var aInputs = document.querySelectorAll(".txt");
                var ptprice = document.querySelectorAll(".pertotalprice")
                $(".num1").text($(".xieru li").length);

                for (let i = 0; i < aJians.length; i++) {

                    aJians[i].onclick = function() {
                        aInputs[i].value--;
                        if (aInputs[i].value == 0) {
                            aInputs[i].value = 1;
                            alert("修改数量不能小于0")
                        }

                        let id = $(this).parents("li").attr("data-id");
                        cartDatas[id]--;
                        if (cartDatas[id] == 0) {
                            cartDatas[id] = 1;
                        }

                        localStorage.setItem("cartDatas", JSON.stringify(cartDatas));

                        var pertotalprice = aInputs[i].value * arr[i];
                        ptprice[i].innerText = pertotalprice;
                        gettotal();

                    }
                    jia[i].onclick = function() {

                            aInputs[i].value++;

                            let id = $(this).parents("li").attr("data-id");
                            cartDatas[id]++;
                            localStorage.setItem("cartDatas", JSON.stringify(cartDatas));

                            var pertotalprice = aInputs[i].value * arr[i];
                            ptprice[i].innerText = pertotalprice;
                            gettotal();
                        }
                        //文本框输入商品数
                    $(".txt").change(function() {
                        if ($(this).val() <= 0) {
                            $(this).val(1);
                            alert("修改商品数量不能小于零")
                        }
                        var pertotalprice = $(this).val() * arr[i];
                        // ptprice.innerText = pertotalprice;
                        $(this).parents("li").find(".pertotalprice").text(pertotalprice);
                        gettotal();
                        let id = $(this).parents("li").attr("data-id");
                        cartDatas[id] = +$(this).val();
                        localStorage.setItem("cartDatas", JSON.stringify(cartDatas));
                    })
                }

                //点击❌号删除DOM节点
                $(".delete").click(function() {
                    let id = $(this).parent("li").attr("data-id");
                    var r = confirm("是否确定从购物车删除商品");
                    if (r) {
                        alert("删除成功")
                    } else {
                        return;
                    }
                    $(this).parent("li").remove();
                    delete cartDatas[id]; //本地储存是这么删的
                    localStorage.setItem("cartDatas", JSON.stringify(cartDatas));

                    /* $(".check").prop("checked", $(".checkAll").prop("checked"));
                    var num = $(".check:checked").length;
                    $(".num2").text(num); */
                    if ($(".check:checked").length == $(".check").length) {
                        $(".checkAll").prop("checked", true);
                    } else {
                        $(".checkAll").prop("checked", false);
                    }
                    gettotal();
                })
            }).then(function() {
                chexk()
                    //复选框处理
                    /* $(".checkAll").click(function() {
                        $(".check").prop("checked", $(".checkAll").prop("checked"));
                        var num = $(".check:checked").length;
                        $(".num2").text(num);
                        gettotal();

                    })
                    $(".check").click(function() {
                            if ($(".check:checked").length == $(".check").length) {
                                $(".checkAll").prop("checked", true);
                            } else {
                                $(".checkAll").prop("checked", false);
                            }
                            var num = $(".check:checked").length;
                            $(".num2").text(num);
                            gettotal();
                        }) */
                    //好不容易能看懂代码想着打了，还挺开心，然后就净是字母错误和名字错误，太无语了啊，一个接一个，改了又改啊啊啊啊啊啊
            })
        }
    }
    showData()



    //复选框
    function chexk() {

        $(".checkAll").click(function() {
            $(".check").prop("checked", $(".checkAll").prop("checked"));
            var num = $(".check:checked").length;
            $(".num2").text(num);
            gettotal();

        })
        $(".check").click(function() {
            if ($(".check:checked").length == $(".check").length) {
                $(".checkAll").prop("checked", true);
            } else {
                $(".checkAll").prop("checked", false);
            }
            var num = $(".check:checked").length;
            $(".num2").text(num);
            gettotal();
        })
    }







    //计算总价
    function gettotal() {
        var totalp = 0;
        for (var i = 0; i < $(".check:checked").length; i++) {
            console.log($(".check:checked").parent().find(".pertotalprice")[i].innerText * 1);
            totalp += $(".check:checked").parent().find(".pertotalprice")[i].innerText * 1;
            console.log(totalp)
        }
        $(".total").text(totalp);
    }
    //结算
    $(".list-footer a").click(function() {
        if (!$(".check:checked").length) {
            alert("请先勾选商品")
        } else {
            alert("我可去你的吧，还结算，弄得跟真的一样")
            return false;
        }

    })
})