var series = $.parseJSON($("#id-series").val());
function get_value(obj){
    var now = new Date(obj[0]);
    var value = obj[1];
    return {
        name: now.toString(),
        value: [
            now,
            value
        ]
    }
}

for (var i=0; i<series.length; i++){
    var data = [];
    var timestamp;

    var s = series[i]["values"];
    var ip = series[i]["tags"]["ip"];

    $.each(s, function (i, obj) {
        timestamp = obj[0];
        data.push(get_value(obj));
    });

    var option = {
        title: {
            text: ip + "可用性监控"
        },
        tooltip: {
            trigger: "axis",
            formatter: function(params){
                params = params[0];
                var date = new Date(params.name);
                return [date.getDate(), (date.getMonth() + 1), date.getFullYear()].join("/") + " " +
                        [date.getHours(), date.getMinutes(), date.getSeconds()].join(":") + " " + params.value[1];
            },
            axisPointer: {
                animation: true
            }
        },
        xAxis: {
            type: "time",
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: "value",
            boundaryGap: [0, "100%"],
            splitLine: {
                show: false
            }
        },
        series: [
            {
                name: "历史记录",
                type: "line",
                showSymbol: false,
                hoverAnimation: false,
                data: data
            }
        ]
    };
    var myChart = echarts.init(document.getElementById("id-main-"+(i+1)));
    myChart.setOption(option);

}
