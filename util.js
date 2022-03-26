//utility functions
const ID = function() {
    return Math.floor(Math.random()*10000000000000000).toString(36);
};


let removeLeading0s = function(str){
    let i = 0;
    for(; i < str.length-1; i++){
        if(str[i] !== "0"){
            break;
        }
    }
    return str.slice(i);
};
let validateInt = function(str){
    //returns [result err]
    str = removeLeading0s(str);
    let n = parseInt(str);
    return [n,n+"" !== str];//true means error
};
let validateFloat = function(str){
    //trailing 0 is legal
    let [dig,frac] = str.split(".");
    let d,f,err1,err2;
    err2 = false;
    [d,err1] = validateInt(dig);
    if(frac)[f,err2] = validateInt(frac);
    return [parseFloat(str),err1||err2];
    /*//returns [result,err]
    let arr = str.split(".");
    arr[0] = removeLeading0s(arr[0]);
    str = arr.join(".");
    let n = parseFloat(str);
    return [n,n+"" !== str];//true means error*/
};
function strrepeat(str,n){
    let s = "";
    for(let i = 0; i < n; i++){
        s += str;
    }
    return s;
}
function truncateInt(num,n){
    return (strrepeat("0",n+1)+Math.floor(num)).slice(-n);
}
function truncateFloat(num,n1,n2){
    let str = truncateInt(Math.round(num*(10**n2)),n1+n2);
    if(n2 === 0)return str;
    let d = str.slice(0,n1);
    let f = str.slice(n1);
    return d+"."+f;
    /*let dig = Math.floor(num);
    let frac = num%1;
    return truncateInt(dig,n1) +"."+ (frac+strrepeat("0",n2+2)).slice(2,2+n2);*/
}
function toTimeStamp(num){
    let d = Math.floor(num/86400);
    let h = Math.floor((num%86400)/3600);
    let m = Math.floor((num%3600)/60);
    let s = num%60;
    if(d !== 0){
        return `${d}:${truncateInt(h,2)}:${truncateInt(m,2)}:${truncateFloat(s,2,3)}`;
    }else{
        return `${h}:${truncateInt(m,2)}:${truncateFloat(s,2,3)}`;
    }
}
function fromTimeStamp(str){
    //return [result,err]
    //validate it first
    let arr = str.split(":").reverse().slice(0,4);
    //now in seconds, minutes, hours, days
    //validate seconds
    let errflag = false;
    let t = 0;
    let multiplier = [1,60,3600,86400];
    let result = [];
    for(let i = 0; i < arr.length; i++){
        let validator = i === 0 ? validateFloat : validateInt;
        let [n,err] = validator(arr[i]);
        result.push();
        t += n*multiplier[i]
        errflag ||= err;
    }
    return [t,errflag]
}