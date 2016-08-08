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
    /**
     * 箭头函数
     */
    getInitialState:()=>({searchValue : "",navText:"123",navTabValue:"line"}),
    /**
     * 子组件上传参数
     * @param value
     */
    onChildSearch:function(data){
        console.log(data);
        /**
         * 赋值，如果undefined 则为 ""
         */
      this.setState({
          searchValue : data.searchValue?data.searchValue: "",
          navTabValue : data.navTabValue?data.navTabValue : ""
      })
    },
    render: function(){
        let chartRoute;
        if(this.state.navTabValue == "line"){
            chartRoute = <WjjLineBody source="json/LineDemo.json" navText={this.state.navTabValue}/>;
        }else{
            chartRoute = <WjjBarBody source="json/BarDemo.json" navText={this.state.navTabValue}/>;
        }

        return (
            /**
             * body 部分
             */
            <div className="wjjBody">
                <WjjSearchBody searchValue={this.onChildSearch}/>
                <div className="wjjJianGe"/>
                <WjjTableBody source="json/table.json" filterText={this.state.searchValue}/>
                <div className="wjjJianGe" />
                <WjjNavTab source="json/NavTab.json" navSearchValue={this.onChildSearch}/>
                <div className="wjjJianGe" />
                {chartRoute}
            </div>
        )
    }
})

/**
 * bar body 部分
 */
var WjjBarBody = React.createClass({
    /**
     * 箭头函数
     */
    getInitialState : ()=>({lineData:[]}),
    componentDidMount : function(){
        $.get(this.props.source,result=>{
            this.drawEchartsLine(result);
        })
    },
    drawEchartsLine : (result = [])=>{
        console.log(result);
        let myChart = echarts.init(document.getElementById("barChart")),
            {option,xData,data} = result;
        option.xAxis.data = xData;
        option.series[0].data = data;
        myChart.setOption(option)
    },
    render : function(){
        return (<div id="barChart"></div>)
    }
})

/**
 * line body 部分
 */
var WjjLineBody = React.createClass({
    /**
     * 箭头函数
     */
    getInitialState : ()=>({lineData:[]}),
    componentDidMount : function(){
        $.get(this.props.source,result=>{
            this.drawEchartsLine(result);
        })
    },
    drawEchartsLine : (result = [])=>{
        let myChart = echarts.init(document.getElementById("lineChart")),
            {option,xData,data} = result;
        option.xAxis.data = xData;
        option.series[0].data = data;
        myChart.setOption(option)
    },
    render : function(){
        return (<div id="lineChart"></div>)
    }
})

/**
 * nvaTab 标签页
 */
var WjjNavTab = React.createClass({
    getInitialState : ()=>({data:[],selectIndex:0}),
    componentDidMount : function(){
        $.get(this.props.source, result=>{
            this.setState({
                data : result.tab,
            })
        })
    },
    onClick : function(e){
        this.setState({
            selectIndex:e.index
        })
        this.props.navSearchValue({"navTabValue" : e.item.item.name});
    },
    render : function(){

        let {data,selectIndex} = this.state;

        data = data.map((item,index)=>{
            if(index == selectIndex)
                return <li key={index} className="active" role="presentation"><a onClick={this.onClick.bind(this,{index})}>{item.name}</a></li>
            return <li key={index} role="presentation"><a onClick={this.onClick.bind(this,({"index":index,"item":{item}}))}>{item.name}</a></li>;
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
            let {wjjTable} = result.wjj;
            this.setState({
                row :wjjTable.map((item,index)=>{
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
        let row = this.state.row;
        let filterText = this.props.filterText

        if(row&&filterText!=""){
            row = row.filter(item=>item.key==filterText).map(item=>item);
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
        let data = {
            searchValue : this.state.value
        }
        this.props.searchValue(data);
    },
    handChange:function(event){
        let data = {"searchValue":event.target.value};
        this.setState({
            value : data.searchValue
        });
        this.props.searchValue(data);
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

