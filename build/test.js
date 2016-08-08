/**
 * Created by Administrator on 2016/7/25.
 */

var data = [{
  time:1,
        value:1
},{
        time:2,
        value:2
},{
        time:3,
        value:3
}]

var dataArr = data.map(function(item,index){
        return [item.time,item.value]
})

console.log(dataArr);

