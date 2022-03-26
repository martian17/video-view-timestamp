
class TimestampInput extends ELEM{
    str = "0:00:00.000";
    constructor(){
        super("input","type:text;class:tsinput");
        let that = this;
        this.e.value = this.str;
        let bus = new Events();
        this.on = bus.on.bind(bus);
        this.emit = bus.emit.bind(bus);
        super.on("input",()=>{
            try{
                let str = that.e.value;
                let [time,err] = fromTimeStamp(str);
                if(err){
                    return;
                }
                let tsstr = toTimeStamp(time);
                if(tsstr === that.str && time === that.time){
                    return;
                }
                that.str = tsstr;
                //code below ensures the rounding up consistency
                time = fromTimeStamp(tsstr)[0];
                if(time === that.time){
                    return;
                }
                //round up consistency code end
                that.time = time;
                that.emit("input",that.time,that.str);
            }catch(err){
                //no commit on fail, so should be safe
                return;
            }
        });
        super.on("focusout",()=>{
            that.e.value = that.str;
            let time = fromTimeStamp(that.str);
        });
        this.on("input",(time,str)=>{
            console.log(time,str);
        });
    }
    setTime(t){//float
        this.time = t;
        this.str = toTimeStamp(t);
        this.e.value = this.str;
    }
};

let main = async function(){
    let body = new ELEM(document.body);
    let player = await body.add(new YTPlayer()).initialize("https://www.youtube.com/watch?v=RWbnNr-NM3A");
    player.style("height:80vh");
    let input = body.add(new TimestampInput());
    player.on("timechange",(t)=>{
        input.setTime(t);
    });
}

main();