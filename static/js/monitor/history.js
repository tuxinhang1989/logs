var data = [];

var memory = $.parseJSON($("#id-memory-data").val());
$.each(memory, function (i, obj) {
    var now = new Date(obj["clock"] * 1000);
    var value = (obj["value"] / 1000 / 1000 / 1000).toFixed(3);
    data.push({
        name: now.toString(),
        value: [
            now,
            value
        ]
    });
});
var cond = $.parseJSON($("#id-cond").val());

option = {
    title: {
        text: "可用内存（GB）"
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
            return [date.getDate(), (date.getMonth() + 1), date.getFullYear()].join("/") + ' ' +
                [date.getHours(), date.getMinutes(), date.getSeconds()].join(":") + " " + params.value[1];
        },
        axisPointer: {
            animation: true
        }
    },
    xAxis: {
        type: 'time',
        boundaryGap: [0, '100%'],
        splitLine: {
            show: true
        },
        min: "dataMin"
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
            show: true
        },
        scale: true
    },
    series: [
        {
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data
        }
    ]
};

var myChart = echarts.init(document.getElementById('main1'));
myChart.setOption(option);

// setInterval(function () {
//
//     for (var i = 0; i < 5; i++) {
//         data.push(data.shift());
//     }
//
//     option["series"] = [
//         {
//             type: 'line',
//             showSymbol: false,
//             hoverAnimation: false,
//             data: data
//         }
//     ];
//     myChart.setOption(option);
// }, 1000);