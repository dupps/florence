$q.define("CHART", {

  statics: {

    highcharts: null,

    init: function() {

      "use strict";

      $q.log.info(this, "Let's draw some charts.");

      this.highcharts = new Highcharts.Chart({

        chart: {
          renderTo: "performance",
          type: "line",
          marginRight: 130,
          marginBottom: 25,
          backgroundColor: "transparent"
        },

        loading: {
          labelStyle: {
            color: "#000000"
          },
          style: {
            backgroundColor: "#F1F1F1",
            opacity: 0.8,
          },
          hideDuration: 500,
          showDuration: 500
        },

        yAxis: {
          title: {
            text: "Time (ms)"
          }
        },

        tooltip: {
          valueSuffix: "ms"
        },

        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "top",
          x: -10,
          y: 100,
          borderWidth: 0
        },

        series: [{
          name: "Client",
          data: []
        }, {
          name: "Network",
          data: []
        }, {
          name: "Server",
          data: []
        }],

        noData: {
          attr: {
            "stroke-width": 1,
            stroke: "#CCCCCC"
          },
          style: {
            fontWeight: "bold",
            fontSize: "15px",
            color: "#202030"
          }
        }

      });

    }

  }

});