/**
 * Created by Administrator on 2016/8/3.
 */

ReactDOM.render(
    React.createElement("h1", null, "jiaoju.wu@qq.com/block"),
    document.getElementById('jj_web_title')
);

var CommentBox = React.createClass({displayName: "CommentBox",
    render: function() {
        return (
            React.createElement("div", {className: "commentBox"}, 
                "Hello, world! I am a CommentBox."
            )
        );
    }
});

ReactDOM.render(
    React.createElement(CommentBox, null),
    document.getElementById('content')
);