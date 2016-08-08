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
var WjjBody = React.createClass({
    getInitialState:()=>({searchValue : "",navText:"123"}),
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
            <div className="wjjBody">
                <WjjSearchBody searchValue={this.onChildSearch}/>
                <div className="wjjJianGe"/>
                <WjjTableBody source="json/table.json" filterText={this.state.searchValue}/>
                <div className="wjjJianGe" />
                <WjjNavTab source="json/NavTab.json"/>
                <div className="wjjJianGe" />
                <WjjLineBody source="json/LineDemo1.json" navText={this.state.navText}/>
            </div>
        )
    }
})

/**
 * line body 部分
 */
var WjjLineBody = React.createClass({
    getInitialState : ()=>({lineData:[]}),
    componentDidMount : function(){
        $.get(this.props.source,result=>{
            this.drawEchartsLine(result);
        })
    },
    drawEchartsLine : (result = [])=>{
        let myChart = echarts.init(document.getElementById("lineChart"));
        let option = result.option;
        option.xAxis.data = result.xData;
        option.series[0].data = result.data;
        myChart.setOption(option)
    },
    render : ()=>(<div id="lineChart"></div>)
})

/**
 * nvaTab 标签页
 */
var WjjNavTab = React.createClass({
    getInitialState : ()=>({data:[],selectIndex:0}),
    componentDidMount : function(){
        $.get(this.props.source, (result)=>{
            this.setState({
                data : result.tab,
            })
        })
    },
    onClick : function(e){
        this.setState({
            selectIndex:e.index
        })
    },
    render : function(){

        let {data,selectIndex} = this.state;

        data = data.map((item,index)=>{
            if(index == selectIndex)
                return <li key={index} className="active" role="presentation"><a onClick={this.onClick.bind(this,{index})}>{item.name}</a></li>
            return <li key={index} role="presentation"><a onClick={this.onClick.bind(this,{index})}>{item.name}</a></li>;
        });

        return (
            <ul className="nav nav-tabs">
                {data}
            </ul>
        )
    }
})

/**
 * table 组件部分
 */
var WjjTableBody = React.createClass({
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
                        <tr key={item.name}>
                            <td>{item.name}</td>
                            <td>{item.type}</td>
                            <td><a>{item.tableLink}</a></td>
                        </tr>
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
                return item.key==filterText;
            }).map(function(item){
                return item;
            })
        }
        return (
            <table className="table">
                <tbody>
                    {row}
                </tbody>
            </table>
        )
    }
})

/**
 * searchBody部分
 */
var WjjSearchBody = React.createClass({
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
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Search for..." value={value} onChange={this.handChange}/>
                <span className="input-group-btn">
                    <button className="btn btn-default" type="button" onClick={this.handClick}>Go!</button>
                </span>
            </div>
        )
    }
})

ReactDOM.render(
    <WjjBody/>,
    document.getElementById("jj_web_content")
);

