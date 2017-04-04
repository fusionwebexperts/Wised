
// http://codepen.io/anon/pen/GWJWeq

// Show tooltips always even the stats are zero
Chart.pluginService.register({
  beforeRender: function(chart) {
    if (chart.config.options.showAllTooltips) {
      // create an array of tooltips
      // we can't use the chart tooltip because there is only one tooltip per chart
      chart.pluginTooltips = [];
      chart.config.data.datasets.forEach(function(dataset, i) {
        chart.getDatasetMeta(i).data.forEach(function(sector, j) {
          chart.pluginTooltips.push(new Chart.Tooltip({
            _chart: chart.chart,
            _chartInstance: chart,
            _data: chart.data,
            _options: chart.options.tooltips,
            _active: [sector]
          }, chart));
        });
      });

      // turn off normal tooltips
      chart.options.tooltips.enabled = false;
    }
  },
  afterDraw: function(chart, easing) {
    if (chart.config.options.showAllTooltips) {
      // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
      if (!chart.allTooltipsOnce) {
        if (easing !== 1)
          return;
        chart.allTooltipsOnce = true;
      }

      // turn on tooltips
      chart.options.tooltips.enabled = true;
      var drawed_values = [];
      var bubble_class = $(chart.chart.canvas).attr('id') + '-bubble-val';
      $('.' + bubble_class).remove();
      Chart.helpers.each(chart.pluginTooltips, function(tooltip) {
            
        tooltip.initialize();
        tooltip.update();
        tooltip.pivot();
        
        if(chart.config.type == 'bubble'){
            
            var tooltip_value = tooltip._view.dataPoints[0].yLabel;
            if($.inArray(tooltip_value, drawed_values) === -1){
              drawed_values.push(tooltip_value);
              tooltip._model.x = tooltip._model.x + 40;
              tooltip._model.xAlign = 'left';
              
              var elem = $("<div class='bubble-val " + bubble_class + "'></div>").css({
                "position": "absolute",
                "font-size": "12px",
                "color": "#666",
                "left": tooltip._view.caretX + 25,
                "top": tooltip._view.caretY - 10
              });
    
              elem.html(tooltip_value);
              $(chart.chart.canvas).parent().append(elem);
            } else {
              tooltip._model.x = tooltip._model.x - (tooltip._model.width + 40);
              tooltip._model.xAlign = 'right';
            } 
            
            // we don't actually need this since we are not animating tooltips
            tooltip.transition(1).draw();
        }
        else if(chart.config.type == 'bar'){
            var tooltip_value = tooltip._view.dataPoints[0].yLabel + '%';
            
            var elem = $("<div class='bubble-val " + bubble_class + "'></div>").css({
                "position": "absolute",
                "font-size": "12px",
                "color": "#f07d00",
                "left": tooltip._view.caretX + 10,
                "top": tooltip._view.caretY - 20
            });
    
            elem.html(tooltip_value);
            $(chart.chart.canvas).parent().append(elem);
        }
                       
      });
      chart.options.tooltips.enabled = false;
    }
  }
});
// Show tooltips always even the stats are zero


var lineChartConfig = {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 3,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
            }
        ]
    },
    options: {
        legend: {
            display: false
        },
        layout: {
            padding: 25  
        },
        tooltips: {
            mode: 'point',
            backgroundColor: '#CCC',
            cornerRadius: 0,
            caretSize: 12,
            xPadding: 15
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display:false
                },
                ticks: {
                    display: false
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Sistema Operativo'
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Pontuação'
                }
            }]
        }
    }
};

var bubbleChartConfig = {
    type: 'bubble',
    data: {
        datasets: [
            {
                data: [],
                borderColor:'#CCC',
                backgroundColor:"#FFF",
                hoverBackgroundColor: "#CCC",
            }]
    },
    options: {
        responsive: $(window).width() > 1500,
        title:{
            display: false
        },
        legend: {
            display: false
        },
        layout: {
          padding: 25  
        },
        tooltips: {
            enabled: false,
            mode: 'point',
            backgroundColor: '#CCC',
            displayColors: false,
            cornerRadius: 0,
            caretSize: 12,
            xPadding: 15,
            callbacks: {
                label: function(tooltipItem, data) {
                    var value = data.datasets[0].data[tooltipItem.index];
                    
                    return value.label;
                },
            }
        },
        showAllTooltips: true,
        scales: {
            yAxes: [{
                gridLines: {
                    display:false
                },
                ticks: {
                    display: false,
                    beginAtZero:true,
                    mirror:false,
                }
            }],
            xAxes: [{
                gridLines: {
                    lineWidth: 0,
                    color: "#fff"
                },
                ticks: {
                    display: false
                }
            }]
        }
    }
};


var barChartConfig = {
    type: 'bar',
    data: {
        labels: ["Resolução", "Sistema Operativo", "Autonomia"],
        datasets: [
            {
                backgroundColor: [
                    'rgb(0, 90, 148)',
                    'rgb(0, 90, 148)',
                    'rgb(0, 90, 148)',
                ],
            }
        ]
    },
    options: {
        showAllTooltips: true,
        tooltips: {
            enabled: false
        },
        legend: {
            display: false
        },
        layout: {
            padding: 25  
        },
        scales: {
            yAxes: [{
                gridLines: {
                    display:false
                },
                ticks: {
                    display: false,
                    beginAtZero:true,
                }
            }],
            xAxes: [{
                gridLines: {
                    display:false
                }
            }]
        }
    }
}; 