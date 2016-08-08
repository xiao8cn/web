/**
 * Created by Administrator on 2016/8/3.
 */

//(<image src="images/123.png"></image><h1>jiaoju.wu@qq.com</h1>),

var WjjTitle = React.createClass({displayName: "WjjTitle",
    render : function(){
        return (
            React.createElement("div", {className: "col-md-12"}, 
                React.createElement("img", {src: "images/123.png"}), 
                React.createElement("h1", {className: "col-md-4"}, "jiaoju.wu@qq.com")
            )
        )
    }
})

ReactDOM.render(
    React.createElement(WjjTitle, null),
    document.getElementById('jj_web_title')
);
