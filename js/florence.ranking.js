$q.define("RANKING", {

  statics : {

    resource: null,
    currentRankingDataSet: null,

    init : function () {

      "use strict";

      this.initRESTServiceCommunication();

      this.resource.getRankingData();

    },

    initRESTServiceCommunication : function () {

      "use strict";

      var getRankingDataRESTRessource, description;

      getRankingDataRESTRessource = "/performance/ranking";

      // Configure REST resources
      description = {

        "getRankingData" : { method: "GET", url: getRankingDataRESTRessource }

      };

      this.resource = $q.rest(description);

      if (this.resource) {

        this.resource.on("getRankingDataSuccess", function (e) {
          // The response of a successful GET request
          this.currentRankingDataSet = e.response[0];
          this.fillDataInTable();

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

    fillDataInTable : function () {

      var rankingContainer, rank;

      rankingContainer = $q("#insertRankingDataHere");

      if(rankingContainer) {

        rankingContainer.empty();

        for(var rank in this.currentRankingDataSet) {

          if(this.currentRankingDataSet.hasOwnProperty(rank)) {

            rankingContainer.append("<tr>"
                                      + "<td>" + rank + "</td>"
                                      + "<td>" + this.currentRankingDataSet[rank].app + "</td>"
                                      + "<td>" + this.currentRankingDataSet[rank].page + "</td>"
                                      + "<td>" + this.currentRankingDataSet[rank].time + "</td>"
                                    +"</tr>");

          }

        };

      }

    }

  },

  defer : function (statics) {

    "use strict";

    statics.init();

  }

});