/**
 * Created by Administrator on 2016/8/3.
 */
/**
 * 纯新手使用react 和 bs 写的一个小网站
 * 主要是为了尝试下react.js的写法
 * 如果有学习react的朋友，可以参照下，入门初学者的写法。可能会对你的自学有帮助
 */

/**
 * @author jiaoju.wu
 * 内容
 */

/**
 * step1 页面的想法，
 * 一个大的div，内容有搜索框，然后是搜索的内容
 * body部分
 */
var WjjBody = React.createClass({displayName: "WjjBody",
    getInitialState:()=>({searchValue : ""}),
    /**
     * 子组件上传参数
     * @param value
     */
    onChildSearch:function(value){
      this.setState({
          searchValue : value
      })
    },
    render: function(){
        return (
            /**
             * body 部分
             */
            React.createElement("div", {className: "wjjBody"}, 
                React.createElement(WjjSearchBody, {searchValue: this.onChildSearch}), 
                React.createElement("div", {className: "wjjJianGe"}), 
                React.createElement(WjjTableBody, {source: "json/table.json", filterText: this.state.searchValue}), 
                React.createElement("div", {className: "wjjJianGe"})
            )
        )
    }
})

/**
 * table 组件部分
 */
var WjjTableBody = React.createClass({displayName: "WjjTableBody",
    /**
     * 初始化，row 是表单内容
     * @returns {{row: string}}
     */
    getInitialState : ()=>({row:""}),
    /**
     * 组件加载完后加载
     */
    componentDidMount :function(){
        /**
         * 用的jquery的读取json文件
         */
        this.serverRequest = $.get(this.props.source, function (result) {
            var tableView = result.wjj.wjjTable;
            this.setState({
                row :tableView.map(function(item,index){
                    return (
                        /**
                         * 注意这里的key ， 批量生成的如li，tr等，不写key的话，部分版本的react会警告
                         */
                        React.createElement("tr", {key: item.name}, 
                            React.createElement("td", null, item.name), 
                            React.createElement("td", null, item.type), 
                            React.createElement("td", null, React.createElement("a", null, item.tableLink))
                        )
                    )
                }),
            })
        }.bind(this));
    },
    render : function(){
        var row = this.state.row;
        var filterText = this.props.filterText
        if(row&&filterText!=""){
            row = row.filter(function(item){
                console.log(item);
                return item.key==filterText;
            }).map(function(item){
                return item;
            })
        }
        return (
            React.createElement("table", {className: "table"}, 
                React.createElement("thead", null, 
                    React.createElement("tr", null, 
                        React.createElement("th", null, "图表名称"), 
                        React.createElement("th", null, "图表类型"), 
                        React.createElement("th", null, "图表链接")
                    )
                ), 
                React.createElement("tbody", null, 
                    row
                )
            )
        )
    }
})

/**
 * searchBody部分
 */
var WjjSearchBody = React.createClass({displayName: "WjjSearchBody",
    getInitialState: ()=> ({value: ""}),
    handClick : function(event){
        var value = this.state.value;
        this.props.searchValue(value);
    },
    handChange:function(event){
        var value = event.target.value;
        this.setState({
            value : value
        });
        this.props.searchValue(value);
    },
    render: function(){
        var value = this.state.value;
        return (
            React.createElement("div", {className: "input-group"}, 
                React.createElement("input", {type: "text", className: "form-control", placeholder: "Search for...", value: value, onChange: this.handChange}), 
                React.createElement("span", {className: "input-group-btn"}, 
                    React.createElement("button", {className: "btn btn-default", type: "button", onClick: this.handClick}, "Go!")
                )
            )
        )
    }
})

ReactDOM.render(
    React.createElement(WjjBody, null),
    document.getElementById("jj_web_content")
);
