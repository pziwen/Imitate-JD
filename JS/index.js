// 获取css样式
function getStyle(obj,attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,1)[attr];
}


function $(id) {
    return document.getElementById(id)
}


window.onload = function () {


//----------top_nav分割线----------
    
    
    //获取页面元素
    var obq = $("dq");
    var olocation = $("location");
    var oltLi = olocation.getElementsByTagName("li");
    var odistrict = $("district");


    //鼠标移入定位栏事件
    obq.onmouseover = olocation.onmouseover = function () {
        obq.style.backgroundColor = "white";
        olocation.style.display = "block";
        //鼠标点击地区事件
        for (var i=0;i<oltLi.length;i++) {
            oltLi[i].index = i;
            oltLi[i].onclick = function () {
                odistrict.innerHTML = oltLi[this.index].innerHTML;
                for (var j=0;j<oltLi.length;j++) {
                    if (this.index == j){
                        oltLi[j].className = "select";
                    }else {
                        oltLi[j].className = "";
                    }
                }
            }
        }
    }
    //鼠标移出定位栏事件
    obq.onmouseout = olocation.onmouseout = function () {
        obq.style.backgroundColor = "";
        olocation.style.display = "";
    }


//----------主菜单分割线----------
    
    
    //获取导航、隐藏菜单box及分类
    var osideNav = $("side_nav").getElementsByTagName("li");
    var osideMenu = $("side_menu");
    var omenuUl = osideMenu.getElementsByTagName("ul");


    // //添加显示隐藏事件
    for (var i = 0;i<osideNav.length;i++){
        let idx = i;
        osideNav[i].onmouseenter = function () {
            this.className = "sign";
            osideMenu.style.display = "block";
            for (var j = 0;j<osideNav.length;j++){
                if (j == idx){
                    omenuUl[j].style.display = "block";
                }else {
                    omenuUl[j].style.display = "none";
                }
            }
        }
        osideNav[i].onmouseleave = function () {
            this.className = "";
            osideMenu.style.display = "none";
        }
    }

    osideMenu.onmouseenter = function () {
        osideMenu.style.display = "block";
    }
    osideMenu.onmouseleave = function () {
        osideMenu.style.display = "none";
    }


    //分割线----------
    //获取大图、小圆点、小图
    var obigPic = $("big_img").getElementsByTagName("li");
    var ocircle = $("circle").getElementsByTagName("span");
    var osmlPic = $("sml_img").getElementsByTagName("hgroup");
    var oBigPicBox = $("big_img");
    var oSmlPicBox = $("sml_img");

    //获取大图小图左右按钮
    var obtnBL = $("b_btn_l");
    var obtnBR = $("b_btn_r");
    var obtnSL = $("s_btn_l");
    var obtnSR = $("s_btn_r");


    //记录当前显示图片下标
    var nowBpic = 0;
    var nowSpic = 0;

    //轮播计时器
    var timerB = null;
    var timerS = null;


    //左右按钮透明度
    //大图
    obtnBL.onmouseover = function () {
        obtnBL.style.opacity = "0.8";
    }
    obtnBR.onmouseover = function () {
        obtnBR.style.opacity = "0.8";
    }
    obtnBL.onmouseout = function () {
        obtnBL.style.opacity = "";
    }
    obtnBR.onmouseout = function () {
        obtnBR.style.opacity = "";
    }
    //小图    先显示后透明
    oSmlPicBox.onmouseover = function () {
        obtnSL.style.zIndex = "1";
        obtnSR.style.zIndex = "1";
    }
    oSmlPicBox.onmouseout = function () {
        obtnSL.style.zIndex = "";
        obtnSR.style.zIndex = "";
    }
    obtnSL.onmouseover = function () {
        obtnSL.style.opacity = "0.8";
    }
    obtnSR.onmouseover = function () {
        obtnSR.style.opacity = "0.8";
    }
    obtnSL.onmouseout = function () {
        obtnSL.style.opacity = "";
    }
    obtnSR.onmouseout = function () {
        obtnSR.style.opacity = "";
    }


    //点击左右按钮事件
    //大图按钮
    obtnBL.onclick = function () {
        nowBpic--;
        if (nowBpic < 0){
            nowBpic = obigPic.length - 1;
        }
        nowbig();
    }
    obtnBR.onclick = function () {
        nowBpic++;
        if (nowBpic >= obigPic.length){
            nowBpic = 0;
        }
        nowbig();
    }
    //小图按钮
    obtnSL.onclick = function () {
        nowSpic--;
        if (nowSpic < 0){
            nowSpic = osmlPic.length - 1;
        }
        nowsml();
    }
    obtnSR.onclick = function () {
        nowSpic++;
        if (nowSpic >= osmlPic.length){
            nowSpic = 0;
        }
        nowsml();
    }


    //小圆点移入事件
    for (var i = 0;i<ocircle.length;i++){
        ocircle[i].index = i;   //记录下标
        ocircle[i].onmouseover = function () {
            nowBpic = this.index;
            nowbig();
        }
    }

    
    //当前图片状态
    //大图
    function nowbig() {
        //大图变换
        obigPic[nowBpic].style["z-index"] = 1;
        //小圆点变换
        ocircle[nowBpic].className = "current";
        for (var i = 0;i<obigPic.length;i++){
            if (i != nowBpic){
                obigPic[i].style["z-index"] = 0;
                ocircle[i].className = "";
            }
        }
    }
    //小图
    function nowsml() {
        osmlPic[nowSpic].style.zIndex = "1";
        for (var i = 0;i<osmlPic.length;i++){
            if (i != nowSpic){
                osmlPic[i].style.zIndex = "0";
            }
        }
    }


    //自动播放
    nowbig();
    autobig();
    autosml();
    //大图
    function autobig() {
        timerB = setInterval(function () {
            nowBpic++;
            if (nowBpic > obigPic.length - 1){
                nowBpic = 0;
            }
            nowbig();
        },3000)
    }
    //小图
    function autosml() {
        timerS = setInterval(function () {
            nowSpic++;
            if (nowSpic > osmlPic.length - 1){
                nowSpic = 0;
            }
            nowsml();
        },8000)
    }


    //优化自动播放
    //大图
    oBigPicBox.onmouseenter = function () {
        clearInterval(timerB);
    }
    oBigPicBox.onmouseleave = function () {
        autobig();
    }
    //小图
    oSmlPicBox.onmouseenter = function () {
        clearInterval(timerS);
    }
    oSmlPicBox.onmouseleave = function () {
        autosml();
    }


    //ico状态切换
    //获取ico列表、ico图标
    var oicoli = $("ico_nav").getElementsByTagName("li");
    var oicoimg = $("ico_nav").getElementsByTagName("img");


    for (var i = 0;i<oicoli.length;i++) {
        oicoli[i].index = i;
        oicoli[i].onmouseover = function () {
            oicoimg[this.index].src = "images/service_ico_img/" + (this.index + 1) +"b.png";
        }
        oicoli[i].onmouseout = function () {
            oicoimg[this.index].src = "images/service_ico_img/" + (this.index + 1) +"a.png";
        }
    }


//----------发现好货 分割线----------


    var ogoodsDIV = $("nice_goods");
    var ogoodsBox = $("nice_goods_box");
    var ogoodsLi = $("nice_goods_li");


    //自动滚动
    // autoscroll();
    function autoscroll() {

    }


//----------右边电梯导航  隐藏搜索栏 分割线----------


    //获取电梯元素
    var oElevator = $("elevator");
    var oElevatorLi = oElevator.getElementsByTagName("li");
    var oReturnTop = $("return_top");

    var returnSpeed = 0;
    var timerReturn = null;
    var flag = true;    //中断返回顶部和跳转的开关  false为中断
    var timerJump = null;

    //获取隐藏搜索栏元素
    var oHideSearch = $("hide");

    var timerHide = null;
    var isMoving = false;    //隐藏搜索栏移动状态开关  true为移动结束

    //相关的鼠标滚动动态写在鼠标滚动事件中

    //电梯点击事件  返回顶部
    oReturnTop.onclick = function () {
        timerReturn = setInterval(function () {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            returnSpeed = scrollTop / 5;
            document.documentElement.scrollTop = document.body.scrollTop = scrollTop - returnSpeed;
            if (scrollTop <= 0){
                clearInterval(timerReturn)
            }
            flag = true;
        },20)
    }

    //电梯点击事件  跳到指定位置
    oElevatorLi[0].onclick = function () {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > 600){
            timerJump = setInterval(function () {
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                document.documentElement.scrollTop = document.body.scrollTop = scrollTop - 20;
                if (scrollTop <= 640){
                    clearInterval(timerJump)
                }
                flag = true;
            },1)
        }else{
            timerJump = setInterval(function () {
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                document.documentElement.scrollTop = document.body.scrollTop = scrollTop + 10;
                if (scrollTop >= 600){
                    clearInterval(timerJump)
                }
                flag = true;
            },1)
        }
    }

    oElevatorLi[1].onclick = function () {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > 900){
            timerJump = setInterval(function () {
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                document.documentElement.scrollTop = document.body.scrollTop = scrollTop - 20;
                if (scrollTop <= 900){
                    clearInterval(timerJump)
                }
                flag = true;
            },1)
        }else{
            timerJump = setInterval(function () {
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                document.documentElement.scrollTop = document.body.scrollTop = scrollTop + 10;
                if (scrollTop >= 880){
                    clearInterval(timerJump)
                }
                flag = true;
            },1)
        }
    }

    oElevatorLi[2].onclick = function () {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > 1700){
            timerJump = setInterval(function () {
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                document.documentElement.scrollTop = document.body.scrollTop = scrollTop - 20;
                if (scrollTop <= 1700){
                    clearInterval(timerJump)
                }
                flag = true;
            },1)
        }else{
            timerJump = setInterval(function () {
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                document.documentElement.scrollTop = document.body.scrollTop = scrollTop + 10;
                if (scrollTop >= 1700){
                    clearInterval(timerJump)
                }
                flag = true;
            },1)
        }
    }

    //电梯移入移出事件
    for (var i = 0; i <oElevatorLi.length; i++){
        oElevatorLi[i].index = i;
        oElevatorLi[i].onmouseenter = function () {
            oElevatorLi[this.index].style.backgroundColor = "#c81623";
            oElevatorLi[this.index].style.color = "white";
        }
        oElevatorLi[i].onmouseleave = function () {
            oElevatorLi[this.index].style.backgroundColor = "";
            oElevatorLi[this.index].style.color = "";
        }
    }

    //在电梯区域亮起
    var timerLight = null;

    timerLight = setInterval(function () {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        //在特定位置的电梯高亮状态
        if ((scrollTop >= 500) && (scrollTop <= 700)){
            oElevatorLi[0].style.color = "#c81623"
        }else {
            oElevatorLi[0].style.color = ""
        }
        if ((scrollTop >= 800) && (scrollTop <= 1500)){
            oElevatorLi[1].style.color = "#c81623"
        }else {
            oElevatorLi[1].style.color = ""
        }
        if ((scrollTop >= 1600)){
            oElevatorLi[2].style.color = "#c81623"
        }else {
            oElevatorLi[2].style.color = ""
        }
    },20)


//----------频道广场 分割线----------





//----------为你推荐  分割线----------


    //获取元素
    var oRecommend = $("recommend_li");
    var oRecommendUl = $("recommend_ul");
    
    var loadsum = 0;    //记录加载次数
    
    var vH = document.documentElement.clientHeight;  //窗口可视高度

    //加载商品
    function loadUl(){
        if (loadsum == 10) {
            return 0;
        }else {
            var oNewUl = oRecommendUl.cloneNode(true);
            oRecommend.appendChild(oNewUl);
            loadsum++;
        }
    }
    

//----------鼠标滚动事件----------
    window.onscroll = function () {

        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        //实现电梯保持显示状态  弹出隐藏搜索栏
        if (scrollTop >= 600){

            //电梯导航
            oElevator.style.position = "fixed";
            oElevator.style.left = "1380px";
            oElevator.style.top = "70px";

            //隐藏搜索栏
            if (isMoving){
                return 0;
            }
            isMoving = true;  //执行一次

            timerHide = setInterval(function () {
                if (oHideSearch.offsetTop == 0){
                    clearInterval(timerHide);
                    isMoving = false;  //重置开关
                }else {
                    oHideSearch.style.top = oHideSearch.offsetTop + 1 +"px";
                }
            },10)
        }else{

            //电梯导航
            oElevator.style.position = "";
            oElevator.style.left = "";
            oElevator.style.top = "";

            //隐藏搜索栏
            if (isMoving){
                return 0;
            }

            isMoving = true;
            timerHide = setInterval(function () {
                if (oHideSearch.offsetTop == -50){
                    clearInterval(timerHide);
                    isMoving = false;
                } else{
                    oHideSearch.style.top = oHideSearch.offsetTop - 1 +"px";
                }
            },10)
        }

        //鼠标滚动时停止计时器
        if (flag == false){
            clearInterval(timerReturn);
            clearInterval(timerJump)
        }
        flag = false;
        
        //鼠标滚到底部加载商品
        if (scrollTop + vH >= document.documentElement.scrollHeight * 0.9) {
            loadUl();
        }
        

    }


}