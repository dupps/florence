$q.define("FAKESERVER", {

  statics : {

    mockData:
    [
      {
        method: "GET",
        url: "/performance/apps/{app}/{page}/?periodFrom={periodFrom}&periodTo={periodTo}&device={device}&browser={browser}&bVersion={bVersion}&flash={flash}&quantile={quantile}",

        response : function (request) {

          "use strict";

          var status, headers, response, body;

          status = 200;
          headers = { "Content-Type": "application/json" };
          response = FAKESERVER.fakeResponseData(request.url);
          body = JSON.stringify(response);

          request.respond(status, headers, body);
        }
      },
      {
        method: "GET",
        url: "/performance/apps",

        response : function (request) {

          "use strict";

          var status, headers, response, body;

          status = 200;
          headers = { "Content-Type": "application/json" };
          response = myConfigMockData;
          body = JSON.stringify(response);

          request.respond(status, headers, body);
        }
      },
      {
        method: "GET",
        url: "/performance/filters",

        response : function (request) {

          "use strict";

          var status, headers, response, body;

          status = 200;
          headers = { "Content-Type": "application/json" };
          response = myFilterMockData;
          body = JSON.stringify(response);

          request.respond(status, headers, body);
        }
      },
      {
        method: "GET",
        url: "/performance/ranking",

        response : function (request) {

          "use strict";

          var status, headers, response, body;

          status = 200;
          headers = { "Content-Type": "application/json" };
          response = myRankingMockData;
          body = JSON.stringify(response);

          request.respond(status, headers, body);
        }
      }
    ],

    init : function () {

      "use strict";

      $q.$$qx.dev.FakeServer.getInstance().configure(this.mockData);

    },

    fakeResponseData : function (requestUrl) {

      "use strict";

      if(requestUrl) {

        var firstSlashPos, secondSlashPos, thirdSlashPos, fourthSlashPos, fifthSlashPos,
            appFilter, pageFilter, attributeContainer, filter_periodFrom, filter_periodTo,
            filter_device, filter_browser, filter_bVersion, filter_flash, filter_quantile,
            filteredMockData = [];

        // Detect slash positions in REST URI
        firstSlashPos = requestUrl.indexOf("/");
        secondSlashPos = requestUrl.indexOf("/", firstSlashPos + 1);
        thirdSlashPos = requestUrl.indexOf("/", secondSlashPos + 1);
        fourthSlashPos = requestUrl.indexOf("/", thirdSlashPos + 1);
        fifthSlashPos = requestUrl.indexOf("/", fourthSlashPos + 1);

        // Get the filter data
        appFilter = requestUrl.substring(thirdSlashPos + 1, fourthSlashPos);
        pageFilter = requestUrl.substring(fourthSlashPos + 1, fifthSlashPos);

        myJSONMockData.forEach(function (mockDataSet) {

          if(mockDataSet.application === appFilter) {
            // App filter passed

            if(mockDataSet.page === pageFilter || pageFilter === "All") {
              // Page filter passed

              if(requestUrl.indexOf("?") !== -1) {
                // Handle REST attribute filtering

                attributeContainer = requestUrl.substring(requestUrl.indexOf("?") + 1).split("&");

                filter_periodFrom = attributeContainer[0].substring(attributeContainer[0].indexOf("=") + 1);
                filter_periodTo = attributeContainer[1].substring(attributeContainer[1].indexOf("=") + 1);

                filter_device = attributeContainer[2].substring(attributeContainer[2].indexOf("=") + 1);

                filter_browser = attributeContainer[3].substring(attributeContainer[3].indexOf("=") + 1);
                filter_bVersion = attributeContainer[4].substring(attributeContainer[4].indexOf("=") + 1);

                filter_flash = attributeContainer[5].substring(attributeContainer[5].indexOf("=") + 1);

                filter_quantile = attributeContainer[6].substring(attributeContainer[6].indexOf("=") + 1);

                if(mockDataSet.device === filter_device || filter_device === "All") {
                  // Device filter passed

                  if(mockDataSet.browser === filter_browser || filter_browser === "All") {
                    // Browser filter passed

                    if(mockDataSet.bVersion === filter_bVersion || filter_bVersion === "All") {
                      // BrowserVersion filter passed

                      if(mockDataSet.flashembedded === filter_flash || filter_flash === "All") {
                        // Flash filter passed

                        if(mockDataSet.quantile === filter_quantile || filter_quantile === "Standard") {
                          // Quantile filter passed

                          /**
                           * filter_periodFrom
                           * filter_periodTo
                           */

                          filteredMockData.push(mockDataSet);
                        }
                      }
                    }
                  }
                }

              }

            }

          }

        });

        $q.log.info(this, "Responding with mocked data to XHR.");

        return filteredMockData;

      } else {

        $q.log.warn(this, "Filtering the mock data has failed.");

        return myJSONMockData;

      }

    }

  },

  defer : function (statics) {

    "use strict";

    statics.init();

  }

});