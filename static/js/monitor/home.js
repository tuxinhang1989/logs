var memorydata = [];

var memory = $.parseJSON($("#id-memory-data").val());
var time_from = $("#id-time-from").val();

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

function get_value(obj) {
    var now = new Date(obj["clock"] * 1000);

    var value = parseFloat((obj["value"] / 1000 / 1000 / 1000).toFixed(3));
    return [
        now.Format("hh:mm MM-dd"),
        value
    ];
}

$.each(memory, function (i, obj) {
    memorydata.push(get_value(obj));
});

var memdateList = memorydata.map(function(item){
    return item[0].replace(' ', '\n');
});

var memvalueList = memorydata.map(function(item){
    return item[1];
});

var option = {
    tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        data: memdateList
    },
    yAxis: {
        splitLine: {
            show: true
        },
        splitNumber:5
    },
    grid: {
        top: '8%',
        left: '3%',
        right: '5%',
        bottom: '3%',
        containLabel: true
    },
    series: {
        type: 'line',
        showSymbol: false,
        data: memvalueList,
        itemStyle:{
            normal:{
                color: "#45a2ff", // 图标颜色
                lineStyle:{
                    color:'#45a2ff' //线条颜色
                }
            }
        }
    }
};

var memoryChart = echarts.init(document.getElementById('memory'));

var cpudata = [];

var cpu = $.parseJSON($("#id-cpu-data").val());

$.each(cpu, function (i, obj) {
    cpudata.push(get_value(obj));
});

var dateList = cpudata.map(function(item){
    return item[0].replace(' ', '\n');
});

var valueList = cpudata.map(function(item){
    return item[1];
});

var cpuoption = {
    tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        data: dateList
    },
    yAxis: {
        splitLine: {
            show: true
        },
        splitNumber:5
    },
    grid: {
			top:'8%',
			left: '3%',
			right: '5%',
			bottom: '3%',
			containLabel: true
		},
    series: {
        type: 'line',
        showSymbol: false,
        data: valueList,
        itemStyle:{
            normal:{
                color: "#c85350", //图标颜色
                lineStyle:{
                    color:'#c85350' //线条颜色
                }
            }
        }
    }
};

var cpuChart = echarts.init(document.getElementById('cpu'));

var p_count = $("#id-p-count").val();
var v_count = $("#id-v-count").val();
var h_count = $("#id-h-count").val();
var serverOption = {
    tooltip: {
        trigger: "item",
        formatter: "{a} <br />{b} : {c} ({d}%)"
    },
    color:['#359fcc','#fcce10','#f54c4c'],
    legend: {
        orient: "vertical",
        left: 30,
        top: 'center',
        data: ["物理机", "宿主机", "虚拟机"]
    },
    series: [
        {
            name: '服务器类型',
            type: 'pie',
            radius: '70%', //大小控制
            center: ['50%', '50%'], //居中位置
            data: [
                {value: p_count, name: '物理机'},
                {value: h_count, name: '宿主机'},
                {value: v_count, name: '虚拟机'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10, //选中部分阴影大小
                    shadowOffsetX: 0, //选中部分阴影的距离
                    shadowColor: 'rgba(0, 0, 0, 0.5)' //选中部分阴影的透明度
                }
            }
        }
    ]
};
var serverpie = echarts.init(document.getElementById("id-server-stats"));

var s_count = $("#id-s-count").val();
var f_count = $("#id-f-count").val();
var r_count = $("#id-r-count").val();
var networkOption = {
    tooltip: {
        trigger: "item",
        formatter: "{a} <br />{b} : {c} ({d}%)"
    },
    color:['#00bfae','#94c400','#f54c4c'],
    legend: {
        orient: "vertical",
        left: 30,
        top: 'center',
        data: ["交换机", "防火墙", "路由器"]
    },
    series: [
        {
            name: '网络设备类型',
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            data: [
                {value: s_count, name: '交换机'},
                {value: f_count, name: '防火墙'},
                {value: r_count, name: '路由器'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10, //选中部分阴影大小
                    shadowOffsetX: 0, //选中部分阴影的距离
                    shadowColor: 'rgba(0, 0, 0, 0.5)' //选中部分阴影的透明度
                }
            }
        }
    ]
};
var networkpie = echarts.init(document.getElementById("id-network-stats"));

memoryChart.setOption(option);
cpuChart.setOption(cpuoption);
serverpie.setOption(serverOption);
networkpie.setOption(networkOption);

function chartsResize(){
    memoryChart.resize();
    cpuChart.resize();
    serverpie.resize();
    networkpie.resize();
}

window.onresize = function() {
    chartsResize();
};