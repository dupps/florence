$q.define("FLORENCE", {

  statics : {

    resource: null,
    currentPerformanceDataSet: null,
    configPanel: null,
    comparePanel: null,
    accumulationMode: false,

    init : function () {

      "use strict";

      this.resizeChartContainer();

      this.initRESTServiceCommunication();

      this.initializeConfigPanel();

      this.initializeChart();

      this.showLoadingIndicator();

      this.repollTimesAndRedrawChart();

      // Eventhandling

      $q("#accumulationView").on("click", function (e) {

        this.accumulatePerformanceData(e);

      }, this);

      $q.onResize(function () {

        this.resizeChartContainer();

      }, this);

    },

    resizeChartContainer : function () {

      "use strict";

      var containerWidth, chartWidth;

      containerWidth = $q("#container").getWidth();

      /**
       * Subtract the following from container width:
       *
       *  #container padding  2*15    30
       *  #configPanel margin 4*10    40
       *  #configPanel width  2*300  600
       *  #content margin     2*10    20
       *  Scrollbar (approx.)         10
       *  Safety buffer               20
       *  ------------------------------
       *                           = 720
       */

      chartWidth = (containerWidth - 720);

      // Ensure minimum chart width of 300 px
      chartWidth = (chartWidth < 300) ? 300 : chartWidth;

      $q("#content").setStyle("width", (chartWidth + "px"));

      $q("#performance").setStyle("width", (chartWidth + "px"));

      if($q("#highcharts-0")) {

        $q("#highcharts-0").setStyle("width", (chartWidth + "px"));

      }

    },

    initRESTServiceCommunication : function () {

      "use strict";

      var getPerformanceDataRESTRessource, getConfigDataRESTRessource,
          getFilterDataRESTRessource, description;

      getPerformanceDataRESTRessource = "/performance/apps/{app}/{page}/?periodFrom={periodFrom}&periodTo={periodTo}&device={device}&browser={browser}&bVersion={bVersion}&flash={flash}&quantile={quantile}";

      // Give me an json array with two dimensions [application][pages]

      getConfigDataRESTRessource = "/performance/apps";

      // Give me an json oject with all devices / browsers [versions] / flash : [filter][data]

      getFilterDataRESTRessource = "/performance/filters";

      // Configure REST resources
      description = {

        "getPerformanceData" : { method: "GET", url: getPerformanceDataRESTRessource },

        "getCompareData" : { method: "GET", url: getPerformanceDataRESTRessource },

        "getConfigData" : { method: "GET", url: getConfigDataRESTRessource },

        "getFilterData" : { method: "GET", url: getFilterDataRESTRessource }

      };

      this.resource = $q.rest(description);

      if (this.resource) {

        this.resource.on("getPerformanceDataSuccess", function (e) {
          // The response of a successful GET request
          this.currentPerformanceDataSet = e;
          this.repollTimesAndRedrawChart();
          // This method has to be called again at this point, to enjure the adjusting
          this.configPanel.adjustConfigFormOptions();

        }, this);

        this.resource.on("getCompareDataSuccess", function (e) {
          // The response of a successful GET request
          this.currentPerformanceDataSet = e;
          this.redrawForComparison();

        }, this);

        this.resource.once("getConfigDataSuccess", function (e) {
          // The response of a successful GET request
          var appsWrapper = this.getConfigFormOptions(e);
          this.configPanel.mountConfigFormOptions(appsWrapper);
          this.comparePanel.mountConfigFormOptions(appsWrapper);

        }, this);

        this.resource.once("getFilterDataSuccess", function (e) {
          // The response of a successful GET request
          var filterWrapper = this.getFilterFormOptions(e);
          this.configPanel.mountFilterFormOptions(filterWrapper);
          this.comparePanel.mountFilterFormOptions(filterWrapper);

        }, this);

        this.resource.on("getError", function (e) {
          // The response of a failing GET request
          $q.log.error(this, e.response);

        }, this);

        this.resource.on("putSuccess", function (e) {
          // The response of a successful PUT request
          $q.log.info(this, e.response);

        }, this);

        this.resource.on("putError", function (e) {
          // The response of a failing PUT request
          $q.log.error(this, e.response);

        }, this);

      }

    },

    getConfigFormOptions : function (configDataSet) {

      "use strict";

      var appsWrapper = configDataSet.response[0].apps;
      
      return appsWrapper;

    },

    getFilterFormOptions : function (filterDataSet) {

      "use strict";

      var filterWrapper = filterDataSet.response[0];

      return filterWrapper;

    },

    repollTimesAndRedrawChart : function () {

      "use strict";

      var timeContainers, i;

      timeContainers = this.getTimeContainersFromCPDS();

      if (typeof CHART.highcharts !== "undefined") {

        // Check if there is any data and put it into correct series object
        if(typeof timeContainers.network[0] !== "undefined" && timeContainers.network.length > 0) {

          CHART.highcharts.series[0].setData(timeContainers.client, false);
          CHART.highcharts.series[1].setData(timeContainers.network, false);
          CHART.highcharts.series[2].setData(timeContainers.server, false);

          $q.log.info(this, "Got new performance data.");

        } else {

          CHART.highcharts.series[0].setData([], false);
          CHART.highcharts.series[1].setData([], false);
          CHART.highcharts.series[2].setData([], false);

          $q.log.info(this, "There is no data to display.");

        }

        // Pattern: setTitle (object title, object subtitle)
        CHART.highcharts.setTitle({ text: "Performance for the last "
                                      + timeContainers.network.length + " days" },
                                    { text: "Application: " + this.configPanel.configurationSafe.app
                                      + " | Page: " + this.configPanel.configurationSafe.page }
                                    );

        CHART.highcharts.redraw();
        CHART.highcharts.hideLoading();

        // Show/hide no data message
        if(!timeContainers.network.length > 0) {

          CHART.highcharts.showNoData();

        } else {

          CHART.highcharts.hideNoData();

        }

      } else {

        $q.log.error(this, "There is no chart instance to work with.");

      }

    },

    redrawForComparison : function () {

      "use strict";

      var timeContainers = this.getTimeContainersFromCPDS("compare");

      /**
       * Create new series if they do not exist
       * or overwrite existing series data with new values or flatline
       */

      if (typeof CHART.highcharts.series[3] === "undefined") {

        if(typeof timeContainers.network[3] !== "undefined") {

          CHART.highcharts.addSeries({ name: "Cmp. Client",
                                       data: timeContainers.client }, false);
          CHART.highcharts.addSeries({ name: "Cmp. Network",
                                       data: timeContainers.network }, false);
          CHART.highcharts.addSeries({ name: "Cmp. Server",
                                       data: timeContainers.server }, false);

          $q.log.info(this, "Got new performance data.");

        }

      } else {

        if(typeof timeContainers.network[3] !== "undefined") {

          CHART.highcharts.series[3].setData(timeContainers.client, false);
          CHART.highcharts.series[4].setData(timeContainers.network, false);
          CHART.highcharts.series[5].setData(timeContainers.server, false);

          $q.log.info(this, "Got new performance data.");

        } else {

          CHART.highcharts.series[3].setData([], false);
          CHART.highcharts.series[4].setData([], false);
          CHART.highcharts.series[5].setData([], false);

        }

      }

      CHART.highcharts.setTitle({ text: "Comparison View" },
                                { text: this.configPanel.configurationSafe.app
                                  + ": " + this.configPanel.configurationSafe.page
                                  + " | " +  this.comparePanel.configurationSafe.app
                                  + ": " + this.comparePanel.configurationSafe.page }
                                );

      CHART.highcharts.redraw();
      CHART.highcharts.hideLoading();

    },

    accumulatePerformanceData : function (e) {

      var timeContainers, i;

      /**
       * Accumulation means that client-, network- and server-
       * times added to each other and the type of the graph is changed
       */

      // Toggle mode
      if(this.accumulationMode) {

        this.accumulationMode = false;
        e.target.value = "Mode: Off";

      } else {

        this.accumulationMode = true;
        e.target.value = "Mode: On";

      }

      $q.log.info(this, "Accumulation mode is " + (this.accumulationMode ? "on" : "off"));

      timeContainers = this.getTimeContainersFromCPDS();

      if(typeof CHART.highcharts !== "undefined") {

        if(this.accumulationMode) {

          // Change type of graph
          for (i = 0; i < 3; i += 1) {

            CHART.highcharts.series[i].update({ type: "area" });

          }

        } else {

          // Reset type of graph
          for (i = 0; i < 3; i += 1) {

            CHART.highcharts.series[i].update({ type: "line" });

          }
        }

        CHART.highcharts.series[0].setData(timeContainers.client, false);
        CHART.highcharts.series[1].setData(timeContainers.network, false);
        CHART.highcharts.series[2].setData(timeContainers.server, false);

        CHART.highcharts.redraw();
        CHART.highcharts.hideLoading();

      }

    },

    getTimeContainersFromCPDS : function (typeOfPanel) {

      "use strict";

      var appValue = this.configPanel.configurationSafe.app,
          pageValue = this.configPanel.configurationSafe.page,
          network = [],
          server = [],
          client = [];

      if(typeOfPanel === "compare") {

        appValue = this.comparePanel.configurationSafe.app;
        pageValue = this.comparePanel.configurationSafe.page;

      }

      if(this.currentPerformanceDataSet) {

        this.currentPerformanceDataSet.response.forEach(function (response) {

          if(!this.accumulationMode) {

            client.push(response.time_client);
            network.push(response.time_network);
            server.push(response.time_server);

          } else if(this.accumulationMode) {

            client.push(response.time_server + response.time_network + response.time_client);
            network.push(response.time_server + response.time_network);
            server.push(response.time_server);

          }

        }, this);

      }

      return { client: client, network: network, server: server };

    },

    showLoadingIndicator : function () {

      "use strict";

      /**
       * Loading Indicator with workaround
       * https://github.com/highslide-software/highcharts.com/issues/2674
       */

      if(CHART.highcharts) {

        CHART.highcharts.showLoading("Please wait while loading data...");

        $q(".highcharts-loading").setStyle("opacity", 0.8);

        // Add only one loading image
        if(!$q(".loading-img")[0]) {

          $q(".highcharts-loading").append("<img src=\"img/loading.gif\" class=\"loading-img\" alt=\"Loading...\">");

        }

      }

    },

    initializeConfigPanel : function () {

      "use strict";

      $q.log.info(this, "Creating panel instances...");

      this.configPanel = new CONFIGPANEL('config');
      this.configPanel.init();

      this.comparePanel = new CONFIGPANEL('compare');
      this.comparePanel.init();

    },

    initializeChart : function () {

      "use strict";

      $q.log.info(this, "Creating new chart instance...");

      CHART.init();

    },

  },

  defer : function (statics) {

    "use strict";

    statics.init();

  }

});