/* this js file relys on jquery*/

var fun_frac_data

$.ajax({
    type:"GET",
    url:"https://dg-han.github.io/mathematics/fun_reduct_frac/data/fun_frac.json",
    dataType:"json",
    success:function(data){
        fun_frac_data=data;
    },
});

var fun_frac_keys = Object.keys(fun_frac_data);
var data_length = fun_frac_keys.length;

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

function get_fun_frac(){
    let i = Math.floor(Math.random() * data_length);
    var key_str = fun_frac_keys[i]
    alert(key_str)
    var fun_frac_raw_str = key_str.split(",");
    var fun_frac_str = [get_reduct_result(fun_frac_raw_str[0], fun_frac_data[key_str][0].toString()), get_reduct_result(fun_frac_raw_str[1], fun_frac_data[key_str][1].toString())];

    alert(fun_frac_str)
    $("#math_pic").html(`<img src=\"https://latex.codecogs.com/svg.image?\\dfrac{${fun_frac_str[0]}}{${fun_frac_str[1]}}\=\\dfrac{${fun_frac_data[key_str][0]}}{${fun_frac_data[key_str][1]}}\">`);
}