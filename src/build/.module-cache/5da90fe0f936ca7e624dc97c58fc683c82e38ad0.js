/**
 * Created by Administrator on 2016/8/3.
 */

//(<image src="images/123.png"></image><h1>jiaoju.wu@qq.com</h1>),

var wjjTitle = React.createClass({displayName: "wjjTitle",
    render : function(){
        return (
            React.createElement("div", null, 
                React.createElement("img", {src: "images/123.png"})
            )
        )
    }
})

ReactDOM.render(
    React.createElement(WjjTitle, null),
    document.getElementById('jj_web_title')
);
