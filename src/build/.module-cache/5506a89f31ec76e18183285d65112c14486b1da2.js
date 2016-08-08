/**
 * Created by Administrator on 2016/8/3.
 */
/**
 * 纯新手使用react 和 bs 写的一个小网站
 * 主要是为了尝试下react.js的写法
 * 如果有学习react的朋友，可以参照下，入门初学者的写法。可能会对你的自学有帮助
 */
var WjjTitle = React.createClass({displayName: "WjjTitle",
    render : function(){
        return (
            React.createElement("div", {className: "col-md-12 wjjTitleBackground"}, 
                React.createElement("h1", {className: "col-md-8"}, "xiao8的可视化驿站"), 
                React.createElement("img", {className: "wjjPic", src: "images/123.png"})
            )
        )
    }
})

//头的组件
ReactDOM.render(
    // 这里比较简单，使用的是组件
    React.createElement(WjjTitle, null),
    document.getElementById('jj_web_content')
);