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
});

function init(){
    i = Math.floor(Math.random() * data_length);
    var key_str = fun_frac_keys[i];                     // 原分数
    var fun_frac_raw_str = key_str.split(",");

    $("#frac").html(`<img src=\"https://latex.codecogs.com/svg.image?\\dfrac{${fun_frac_raw_str[0]}}{${fun_frac_raw_str[1]}}\=" alt="获取中，请稍后...">`)
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
    var num = $("#num").val();
    var denom = $("#denom").val();
    var key_str = fun_frac_keys[i];                     // 原分数
    var ans = fun_frac_data[key_str];
    var fun_frac_raw_str = key_str.split(",");

    if ((num == ans[0]) & (denom == ans[1])){
        alert("Correct!")
        var fun_frac_str = [get_reduct_result(fun_frac_raw_str[0], fun_frac_data[key_str][0].toString()), get_reduct_result(fun_frac_raw_str[1], fun_frac_data[key_str][1].toString())];

        $("#react").html(`<img src=\"https://latex.codecogs.com/svg.image?\\dfrac{${fun_frac_raw_str[0]}}{${fun_frac_raw_str[1]}}\=\\dfrac{${fun_frac_str[0]}}{${fun_frac_str[1]}}\=\\dfrac{${fun_frac_data[key_str][0]}}{${fun_frac_data[key_str][1]}}\" alt="获取中，请稍后...">`);
    }
    else{
        alert("Wrong!")
        var common_factor = Math.round(Number(fun_frac_raw_str[0]) / Number(fun_frac_data[key_str][0])).toString()
        $("#react").html(`<img src=\"https://latex.codecogs.com/svg.image?\\dfrac{${fun_frac_raw_str[0]}}{${fun_frac_raw_str[1]}}\=\\dfrac{${fun_frac_data[key_str][0]}\\times${common_factor}}{${fun_frac_data[key_str][1]}\\times${common_factor}}\=\\dfrac{${fun_frac_data[key_str][0]}}{${fun_frac_data[key_str][1]}}\" alt="获取中，请稍后...">`);
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
        check();
        $("#btn").html("下一题");
    }
}