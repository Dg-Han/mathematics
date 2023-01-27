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
    $("#detail_pic").hide()
    i = Math.floor(Math.random() * data_length);
    var key_str = fun_frac_keys[i];                     // 原分数

    var fun_frac_raw_str = key_str.split(",");          // 错约结果
    var fun_frac_str = [get_reduct_result(fun_frac_raw_str[0], fun_frac_data[key_str][0].toString()), get_reduct_result(fun_frac_raw_str[1], fun_frac_data[key_str][1].toString())];

    $("#math_pic").html(`<img src=\"https://latex.codecogs.com/svg.image?\\dfrac{${fun_frac_raw_str[0]}}{${fun_frac_raw_str[1]}}\=\\dfrac{${fun_frac_str[0]}}{${fun_frac_str[1]}}\=\\dfrac{${fun_frac_data[key_str][0]}}{${fun_frac_data[key_str][1]}}\" alt="获取中，请稍后...">`);
    $("#detail_hint").html(`${random_choice(detail_hint)}`)
    $("#detail_hint").show()
}

function show_details(){
    var key_str = fun_frac_keys[i];
    var fun_frac_raw_str = key_str.split(",");
    var common_factor = Math.round(Number(fun_frac_raw_str[0]) / Number(fun_frac_data[key_str][0])).toString();
    $("#detail_pic").html(`<img src=\"https://latex.codecogs.com/svg.image?\=\\dfrac{${fun_frac_data[key_str][0]}\\times${common_factor}}{${fun_frac_data[key_str][1]}\\times${common_factor}}\">`)
    $("#detail_hint").hide()
    $("#detail_pic").show()
}