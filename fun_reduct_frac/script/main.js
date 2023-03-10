/* this js file relys on jquery*/

var fun_frac_data, fun_frac_keys, data_length, i;
var detail_hint = ["Show details", "What?!", "Really?", "Is it true...?"]

$.ajax({
    type:"GET",
    url:"https://dg-han.github.io/mathematics/fun_reduct_frac/data/fun_frac.json",
    dataType:"json",
    success:function(data){
        fun_frac_data=data;
        fun_frac_keys = Object.keys(fun_frac_data);
        data_length = fun_frac_keys.length;
        $("#btn_main").html("获取一点小小的数学震撼")
    },
});

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

function random_choice(l){
    let j = Math.floor(Math.random() * detail_hint.length);
    return l[j]
}

function get_fun_frac(){
    if ($("#btn_main").html() == "缓存加载中，请稍后..."){
        alert("后台数据未加载完成，请稍后再试...");
        return
    }

    $("#detail_pic").hide();
    $("#math_pic").html("加载中，请稍后...");
    i = Math.floor(Math.random() * data_length);
    var key_str = fun_frac_keys[i];                     // 原分数

    var fun_frac_raw_str = key_str.split(",");
    var fun_frac_str = [get_reduct_result(fun_frac_raw_str[0], fun_frac_data[key_str][0].toString()), get_reduct_result(fun_frac_raw_str[1], fun_frac_data[key_str][1].toString())];

    $.ajax({
        type:"GET",
        url: `https://latex.codecogs.com/svg.image?\\dfrac{${fun_frac_raw_str[0]}}{${fun_frac_raw_str[1]}}\=\\dfrac{${fun_frac_str[0]}}{${fun_frac_str[1]}}\=\\dfrac{${fun_frac_data[key_str][0]}}{${fun_frac_data[key_str][1]}}`,
        dataType: "html",
        success:function(data){
            $("#math_pic").html(data);
            $("#detail_hint").html(`${random_choice(detail_hint)}`);
            $("#detail_hint").show();
        }
    });
    /*
    $("#math_pic").html(`<img src=\"https://latex.codecogs.com/svg.image?\\dfrac{${fun_frac_raw_str[0]}}{${fun_frac_raw_str[1]}}\=\\dfrac{${fun_frac_str[0]}}{${fun_frac_str[1]}}\=\\dfrac{${fun_frac_data[key_str][0]}}{${fun_frac_data[key_str][1]}}\" alt="获取中，请稍后...">`);
    */
}

function show_details(){
    $("#detail_hint").hide();
    $("#detail_pic").html("图片加载中，请稍后...");
    $("#detail_pic").show();
    var key_str = fun_frac_keys[i];
    var fun_frac_raw_str = key_str.split(",");
    var common_factor = Math.round(Number(fun_frac_raw_str[0]) / Number(fun_frac_data[key_str][0])).toString();
    $.ajax({
        type:"GET",
        url: `https://latex.codecogs.com/svg.image?\=\\dfrac{${fun_frac_data[key_str][0]}\\times${common_factor}}{${fun_frac_data[key_str][1]}\\times${common_factor}}`,
        dataType: "html",
        success: function(data){
            $("#detail_pic").html(data);
        }
    })
    /*
    $("#detail_pic").html(`<img src=\"https://latex.codecogs.com/svg.image?\=\\dfrac{${fun_frac_data[key_str][0]}\\times${common_factor}}{${fun_frac_data[key_str][1]}\\times${common_factor}}\">`)
    */
}