$q.define("CONFIGPANEL", {

  construct: function (kindOfPanel) {

    "use strict";

    this.kindOfPanel = kindOfPanel;

    $q.log.info(this, "I arrived at work to " + kindOfPanel + ".");

  },

  members : {

    kindOfPanel: null,
    configurationSafe: null,
    timeOfLastRequest: 0,
    apps: null,
    browsers: null,
    calendarWidget: null,
    timeContainer: null,
    calendarToggleIndicator: null,

    init : function () {

      "use strict";

      var timeNowValue, oneWeekOffset, oneWeekAgoValue;

      // The server guy needs the time as seconds (not ms)
      timeNowValue = (new Date().valueOf() / 1000);
      // Sec => min => hrs => days => week
      oneWeekOffset = (1 * 60 * 60 * 24 * 7);
      oneWeekAgoValue = (timeNowValue - oneWeekOffset);

      this.timeContainer = {
        timestampNow: timeNowValue,
        timestampOneWeekAgo: oneWeekAgoValue
      };

      this.apps = {};
      this.browsers = {};

      this.getConfigData();
      this.getFilterData();

      // Initial form configuration
      this.configurationSafe = {

        app: 'All',
        page: "All",
        periodFrom: oneWeekAgoValue,
        periodTo: timeNowValue,
        device: "All",
        browser: "All",
        bVersion: "All",
        flash: "All",
        quantile: "Standard"

      };

      // A low-level calendar widget with full-month view
      this.calendarWidget = $q("#" + this.kindOfPanel + "-date").calendar();

      this.calendarToggleIndicator = false;

      // This feature is only for config panel
      if(this.kindOfPanel === "config") {

        this.specialConfigPanelHandling();

        $q(window).on("hashchange", function () {

          this.specialConfigPanelHandling();

        }, this);

      }

      // Eventhandling

      this.calendarWidget.on("changeValue", function (e) {

        this.calendarChangeHandler(e);

      }, this);

      $q("#" + this.kindOfPanel + "Panel select").on("change", function (e) {

        // Call this.sendNewRequest() after this.configChangeHandler()
        this.configChangeHandler(e, true);

        if (e.target.name === "app") {
          this.appSelectionHandler(e.target);
        }

        if (e.target.name === "browser") {
          this.browserSelectionHandler(e.target);
        }

      }, this);

    },

    specialConfigPanelHandling : function () {

      /**
       * Pseudo callback chain:
       * (1) this.locHashProcessor(true);
       * (2) this.sendNewRequest();
       * The next method (3) is called after
       *  'getPerformanceDataSuccess' event is fired in florence.js
       * (3) this.adjustConfigFormOptions();
       */

      this.locHashProcessor(true);

    },

    getConfigData : function () {

      if(FLORENCE.resource) {
        FLORENCE.resource.getConfigData();
      }

    },

    getFilterData : function () {

      if(FLORENCE.resource) {
        FLORENCE.resource.getFilterData();
      }

    },

    mountConfigFormOptions : function (appsWrapper) {

      "use strict";

      var apps, appName;

      apps = this.apps;

      for(appName in appsWrapper) {

        if(appsWrapper.hasOwnProperty(appName)) {

          $q("#" + this.kindOfPanel + "Panel select[name='app']").append("<option value='"
            + appName + "'>" + appName + "</option>");

          apps[appName] = appsWrapper[appName];

        }

      }

    },

    mountFilterFormOptions : function (filterWrapper) {

      "use strict";

      var devices = [],
          flash = [],
          browsers = this.browsers,
          browser;

      // Devices
      filterWrapper.devices.forEach(function (device) {

        if(devices.indexOf(device) === -1) {

          devices.push(device);

          $q("#" + this.kindOfPanel + "Panel select[name='device']").append("<option value='"
            + device + "'>" + device + "</option>");
        }
      }, this);

      // Flash
      filterWrapper.flash.forEach(function (flashEmbedded) {

        if(flash.indexOf(flashEmbedded) === -1) {

          flash.push(flashEmbedded);

          $q("#" + this.kindOfPanel + "Panel select[name='flash']").append("<option value='"
            + flashEmbedded + "'>" + flashEmbedded + "</option>");
        }
      }, this);

      // Browser
      for(browser in filterWrapper.browsers) {

        browsers[browser] = filterWrapper.browsers[browser];

        if (browser === "ie") {
          // Long name for IE
          $q("#" + this.kindOfPanel
            + "Panel select[name='browser']").append("<option value='"
            + browser + "'>Internet Explorer</option>");

        } else {

          $q("#" + this.kindOfPanel
            + "Panel select[name='browser']").append("<option value='"
            + browser + "'>" + browser + "</option>");

        }

      }

    },

    appSelectionHandler : function (appSelection) {

      "use strict";

      var apps, i;

      apps = this.apps;

      // Get suitable pages when changing the app

      if (apps.hasOwnProperty(appSelection.value)) {

        $q("#" + this.kindOfPanel
          + "Panel select[name='page'] option").remove();

        $q("#" + this.kindOfPanel
          + "Panel select[name='page']").append("<option>All</option>");

        for(i = 0; i < apps[appSelection.value].length; i+=1) {

          $q("#" + this.kindOfPanel
            + "Panel select[name='page']").append("<option value='"
            + apps[appSelection.value][i] + "'>"
            + apps[appSelection.value][i] + "</option>");
        }

        // Disable "Please Select..." option (Application)
        this.disableFormOption('app', 0);
      }

    },

    browserSelectionHandler : function (browserSelection) {

      "use strict";

      var browsers, i;

      browsers = this.browsers;

      // Get suitable version numbers when changing the browser

      if (browsers.hasOwnProperty(browserSelection.value)) {

        $q("#" + this.kindOfPanel
          + "Panel select[name='bVersion'] option").remove();

        $q("#" + this.kindOfPanel
          + "Panel select[name='bVersion']").append("<option>All</option>");

        for(i = 0; i < browsers[browserSelection.value].length; i+=1) {

          $q("#" + this.kindOfPanel
            + "Panel select[name='bVersion']").append("<option value='"
            + browsers[browserSelection.value][i] + "'>"
            + browsers[browserSelection.value][i] + "</option>");
        }
      }

    },

    locHashProcessor : function (callback) {

      "use strict";

      var locHash;

      if(location.hash !== "") {

        locHash = location.hash.substr(1).split("!");

        /**
         * Process each value of location hash and store it
         * in the global configurationSafe-object
         */

        locHash.forEach(function (hash) {

          var configValue;

          for(configValue in this.configurationSafe) {

            /**
             * JSLint: 'The body of a for in should be wrapped in an if statement
             * to filter unwanted properties from the prototype'
             */

            if(this.configurationSafe.hasOwnProperty(configValue)) {

              if(hash.indexOf(configValue + ":") !== -1) {

                this.configurationSafe[configValue] = hash.slice(hash.indexOf(configValue + ":")
                  + (configValue.length + 1));

              }
            }
          }
        }, this);
      }

      // Disable "Please Select..." option (Application)
      this.disableFormOption('app', 0);

      // Pseudo callback
      if(callback) {
        this.sendNewRequest();
      }

    },

    calendarChangeHandler : function (e) {

      var fromTime, toTime, formattedDate, primitiveDateValue, calendarInfo, displayContainer;

      /**
       * e is a JavaScript Date Object
       * e.toLocaleFormat() e.g. 'Sun 17 Nov 2013 12:00:00 AM CET'
       */

      fromTime = this.configurationSafe.periodFrom;
      toTime = this.configurationSafe.periodTo;

      formattedDate = e.toDateString(); // e.g. 'Wed Feb 05 2014'
      primitiveDateValue = (e.valueOf() / 1000); // ms/1000 = sec, e.g. '1391554800'

      calendarInfo = "<span class=\"calendar-info\">" + formattedDate + "</span>";

      displayContainer = $q("#" + this.kindOfPanel + "-date-display");

      if(fromTime === this.timeContainer.timestampOneWeekAgo
        && toTime === this.timeContainer.timestampNow
        && this.calendarToggleIndicator === false) {

        this.configurationSafe.periodFrom = primitiveDateValue;

        if(this.kindOfPanel === "config") {
          this.updateLocationHash("periodFrom", primitiveDateValue);
        }

        displayContainer.append(calendarInfo);
        displayContainer.removeClass("kill-me");

        // Disable earlier dates
        this.calendarWidget.setConfig('minDate', e);
        this.calendarWidget.render();

        this.calendarToggleIndicator = true;

      } else if (fromTime !== this.timeContainer.timestampOneWeekAgo
                && toTime === this.timeContainer.timestampNow
                || this.calendarToggleIndicator) {

        // The above OR is necessary because the script was sometimes "too fast"

        this.configurationSafe.periodTo = primitiveDateValue;

        if(this.kindOfPanel === "config") {
          this.updateLocationHash("periodTo", primitiveDateValue);
        }

        $q("#" + this.kindOfPanel
          + "-date-display").append("<span class=\"calendar-info\">&nbsp;-&nbsp;</span>" + calendarInfo);

        // Disable later dates
        this.calendarWidget.setConfig('maxDate', e);
        this.calendarWidget.render();

        displayContainer.addClass("kill-me");

        this.calendarToggleIndicator = false;

        displayContainer.on("click", function (e) {

          /**
           * Reactivation of earlier and later dates
           * and removal of calendar info text
           */

          this.configurationSafe.periodFrom = this.timeContainer.timestampOneWeekAgo;
          this.configurationSafe.periodTo = this.timeContainer.timestampNow;

          this.calendarWidget.setConfig('minDate', null);
          this.calendarWidget.setConfig('maxDate', null);
          this.calendarWidget.render();

          displayContainer.removeClass("kill-me");
          displayContainer.empty();

        }, this);

      }

    },

    configChangeHandler : function (e, callback) {

      "use strict";

      /**
       * Process each value of config form, store it
       * in the global configurationSafe object and
       * update each location hash value
       */

      var configValue, selectField, optionValue;

      selectField = e.target.name;
      optionValue = e.target.value;

      for(configValue in this.configurationSafe) {

        if(selectField.indexOf(configValue) !== -1) {

          this.configurationSafe[configValue] = optionValue;

          if(this.kindOfPanel === "config") {
            this.updateLocationHash(configValue, optionValue);
          }

        }
      }

      $q.log.info(this, "Form value has changed.");

      // Pseudo callback
      if(callback) {
        this.sendNewRequest();
      }

    },

    updateLocationHash : function (keyToChange, valueToChange) {

      "use strict";

      var locHash, hashValPattern;

      /**
       * There are always 3 cases:
       * - location hash is empty -> set this key and value
       * - key is set -> replace value
       * - key is not in location hash -> concat value
       */

      locHash = location.hash;

      if(locHash !== "") {

        if(locHash.indexOf(keyToChange + ":") !== -1) {

          /**
           * RegEx matches an alphanumeric character
           * including underscore, whitespace, hyphens and dots
           */

          hashValPattern = new RegExp(keyToChange + ":[\\w\\s\-.]+", "i");

          locHash = locHash.replace(hashValPattern, keyToChange + ":" + valueToChange);

        } else {

          locHash = locHash.concat("!" + keyToChange + ":" + valueToChange);

        }

      } else {

        locHash = keyToChange + ":" + valueToChange;

      }

      location.hash = locHash;

    },

    sendNewRequest : function () {

      "use strict";

      var timeNow = new Date().getTime();

      /**
       * Allows a new request every 0.5 sec
       * to prevent overloading or double requests
       */

      if((timeNow - this.timeOfLastRequest) > 500) {

        this.timeOfLastRequest = timeNow;

        if(FLORENCE.resource) {

          FLORENCE.showLoadingIndicator();

          var performanceDataObject = { app: this.configurationSafe.app,
                                        page: this.configurationSafe.page,
                                        periodFrom: this.configurationSafe.periodFrom,
                                        periodTo: this.configurationSafe.periodTo,
                                        device: this.configurationSafe.device,
                                        browser: this.configurationSafe.browser,
                                        bVersion: this.configurationSafe.bVersion,
                                        flash: this.configurationSafe.flash,
                                        quantile: this.configurationSafe.quantile
                                      };

          if(this.kindOfPanel === "config") {

            // Sends the GET request '/performance/{app}/{page}/?attr...'
            FLORENCE.resource.getPerformanceData(performanceDataObject);

          } else if(this.kindOfPanel === "compare") {

            FLORENCE.resource.getCompareData(performanceDataObject);

          }

        }

      } else {

        $q.log.warn(this, "Too many requests in close succession.");

      }

    },

    adjustConfigFormOptions : function () {

      "use strict";

      var selectName;

      /**
       * Run through the whole object,
       * compare each key with the select box
       * and set suitable values 'selected'
       */

      for (selectName in this.configurationSafe) {

        $q("#configPanel select[name='" + selectName
          + "'] option").forEach(function (option) {

          if(option.value === this.configurationSafe[selectName]) {
            option.selected = true;
          }

        }, this);

      }

    },

    disableFormOption : function (element, number) {

      $q("#" + this.kindOfPanel + "Panel select[name='"
        + element + "'] option")[number].setAttribute('disabled', 'disabled');

    }

  }

});