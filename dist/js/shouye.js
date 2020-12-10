$.get("http://jx.xuzhixiang.top/ap/api/allproductlist.php?uid=45238").then(data => {
        let str = ""
        console.log(data); //data立面没有数据
        //我发布id更首页的id对应的啊45229//可以了，i数据粗来了，id就写成id
        // 你没有往里面存，有一个上传数据的接口,后台查询的没u有一条数据，啥都没有，你那个商品在哪里上传的，没有看明白，我看看uid把，你上穿得是一个uid吗？？数据不对，对的，把你只要开一着接口他就会上串
        //存过一条再发布里面，html，数据结构变了，你得看看怎么渲染数据不对，换个接口口从新搞数据，重新上传把，行我在玲珑
        // 图片都没有

        // 你看这个就有
        data.data.forEach(data => {
            str += ` <a href="xiangqing.html?id=${data.pid}">
        <div id="ssss">
        <img src="${data.pimg}" alt="">
        <p id="clothes-p1">${data.pname}</p>
        <p id="clothes-p2">${data.pprice}</p>
        <button id="clothes-button">立即抢购</button>
        </div>
    </a>`
        });
        $("#clothes-picture").html(str);
    })
    /////////////////////////
var woman = document.getElementById('title-all-pictures');
woman.onclick = function() {
    location.href = 'https://list.vip.com/autolist.html?rule_id=53611286&title=%E5%A5%B3%E9%9D%B4'
}