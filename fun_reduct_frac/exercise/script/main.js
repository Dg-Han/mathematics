/* this js file relys on jquery*/

var fun_frac_data, fun_frac_keys, data_length, i;

$.ajax({
    type:"GET",
    url:"https://dg-han.github.io/mathematics/fun_reduct_frac/data/fun_frac.json",
    dataType:"json",
    success:function(data){
        fun_frac_data=data;
        fun_frac_keys = Object.keys(fun_frac_data);
        data_length = fun_frac_keys.length;
        init();
    },
    error:function(){
        alert("缓存数据加载失败，请确认网络连接状态后刷新重试")
    }
});

function get_latex_pic_html(target_jquery, pic_url, success_func){
    $.ajax({
        type:"GET",
        url: pic_url,
        dataType:"html",
        success: function(data){
            $(`${target_jquery}`).html(data);
            statu = true;
            success_func();
        },
    })
}

function init(){
    $(".frac_input").hide();
    $("#btn").hide();
    $("#frac").html("题目加载中，请稍后...");

    i = Math.floor(Math.random() * data_length);
    var key_str = fun_frac_keys[i];                     // 原分数
    var fun_frac_raw_str = key_str.split(",");

    get_latex_pic_html("#frac", `https://latex.codecogs.com/svg.image?\\dfrac{${fun_frac_raw_str[0]}}{${fun_frac_raw_str[1]}}\=`, 
                       function(){
        $(".frac_input").show();
        $("#btn").show();
    });
    /*
    $.ajax({
        type:"GET",
        url:`https://latex.codecogs.com/svg.image?\\dfrac{${fun_frac_raw_str[0]}}{${fun_frac_raw_str[1]}}\=`,
        dataType:"html",
        success: function(data){
            $("#frac").html(data);
            $(".frac_input").show();
            $("#btn").show();
        }
    });
    */
}

function get_reduct_result(raw, res){
    str = ""
    let j = 0;
    for (let k=0; k<raw.length; k=k+1){
        if (raw[k] == res[j]){
            str += raw[k];
            j += 1;
            if (j > res.length){
                str += raw.slice(k+1);
                break
            }
        }
        else {
            str += `\\bcancel{${raw[k]}}`;
        }
    }
    return str
}

function check(){
    $("#react").html("获取解析中...")
    var num = $("#num").val();
    var denom = $("#denom").val();
    var key_str = fun_frac_keys[i];                     // 原分数
    var ans = fun_frac_data[key_str];
    var fun_frac_raw_str = key_str.split(",");

    if ((num == ans[0]) & (denom == ans[1])){
        alert("Correct!")
        var fun_frac_str = [get_reduct_result(fun_frac_raw_str[0], fun_frac_data[key_str][0].toString()), get_reduct_result(fun_frac_raw_str[1], fun_frac_data[key_str][1].toString())];

        get_latex_pic_html("#react", `https://latex.codecogs.com/svg.image?\\dfrac{${fun_frac_raw_str[0]}}{${fun_frac_raw_str[1]}}\=\\dfrac{${fun_frac_str[0]}}{${fun_frac_str[1]}}\=\\dfrac{${fun_frac_data[key_str][0]}}{${fun_frac_data[key_str][1]}}`, function(){return});
    }
    else{
        alert("Wrong!")
        var common_factor = Math.round(Number(fun_frac_raw_str[0]) / Number(fun_frac_data[key_str][0])).toString();

        get_latex_pic_html("#react", `https://latex.codecogs.com/svg.image?\\dfrac{${fun_frac_raw_str[0]}}{${fun_frac_raw_str[1]}}\=\\dfrac{${fun_frac_data[key_str][0]}\\times${common_factor}}{${fun_frac_data[key_str][1]}\\times${common_factor}}\=\\dfrac{${fun_frac_data[key_str][0]}}{${fun_frac_data[key_str][1]}}`, function(){return});
    }
}

function handling(){
    if ($("#btn").html() == "下一题"){
        init()
        $("#num").val("");
        $("#denom").val("");
        $("#btn").html("check");
        $("#react").html("");
    }
    else if ($("#btn").html() == "check"){
        if ($("#frac").html() == "题目加载中，请稍后..."){
            alert("题目尚未加载完成，请稍后再试");
            return
        };
        check();
        $("#btn").html("下一题");
    }
}