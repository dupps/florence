(function()
{
  // creating the global namespace we need
  var qx = window.qx = {};

  if (!window.qui) {
    window.qui = {};
  }

  if (!window.baselib) {
    window.baselib = {};
  }

  if (!qx.$$environment) qx.$$environment = {};
  var envinfo = {"baselib.deprecated.stacktrace":false,"baselib.version":"0.9.6","module.logger":false,"phonegap":false,"qx.application":"baselib.Application","qx.debug":true,"qx.debug.databinding":false,"qx.debug.dispose":false,"qx.debug.io":false,"qx.debug.ui.queue":false,"qx.globalErrorHandling":false,"qx.mobile.nativescroll":true,"qx.optimization.statics":true,"qx.revision":"9bd3fd6178f2286b39df046633ba4c2f732c0878","qx.theme":"qx.theme.Modern","qx.version":"3.6"};
  for (var k in envinfo) qx.$$environment[k] = envinfo[k];

  if (!qx.$$libraries) qx.$$libraries = {};
  var libinfo = {"__out__":{"sourceUri":"script"},"qx":{"resourceUri":"/modules/frontend-qooxdoo/img","sourceUri":"script"}};
  for (var k in libinfo) qx.$$libraries[k] = libinfo[k];

  qx.$$resources = {"qx/static/blank.gif":[1, 1, "gif", "qx"]};
  qx.$$packageData = {};
  qx.$$loader = {
    // necessary to signal the application event handler to fire the 'ready' event
    scriptLoaded : true
  };

  qx.$$packageData['0']={"locales":{},"resources":{},"translations":{"C":{}}};

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Martin Wittemann (martinwittemann)

************************************************************************ */
/**
 * Create namespace
 *
 * @ignore(qx.data)
 * @ignore(qx.data.IListData)
 * @ignore(qx.util.OOUtil)
 */
if(!window.qx){

  window.qx = {
  };
};
/**
 * Bootstrap qx.Bootstrap to create myself later
 * This is needed for the API browser etc. to let them detect me
 */
qx.Bootstrap = {
  genericToString : function(){

    return "[Class " + this.classname + "]";
  },
  createNamespace : function(name, object){

    var splits = name.split(".");
    var part = splits[0];
    var parent = this.__root && this.__root[part] ? this.__root : window;
    for(var i = 0,len = splits.length - 1;i < len;i++,part = splits[i]){

      if(!parent[part]){

        parent = parent[part] = {
        };
      } else {

        parent = parent[part];
      };
    };
    // store object
    parent[part] = object;
    // return last part name (e.g. classname)
    return part;
  },
  setDisplayName : function(fcn, classname, name){

    fcn.displayName = classname + "." + name + "()";
  },
  setDisplayNames : function(functionMap, classname){

    for(var name in functionMap){

      var value = functionMap[name];
      if(value instanceof Function){

        value.displayName = classname + "." + name + "()";
      };
    };
  },
  base : function(args, varargs){

    if(qx.Bootstrap.DEBUG){

      if(!qx.Bootstrap.isFunction(args.callee.base)){

        throw new Error("Cannot call super class. Method is not derived: " + args.callee.displayName);
      };
    };
    if(arguments.length === 1){

      return args.callee.base.call(this);
    } else {

      return args.callee.base.apply(this, Array.prototype.slice.call(arguments, 1));
    };
  },
  define : function(name, config){

    if(!config){

      config = {
        statics : {
        }
      };
    };
    var clazz;
    var proto = null;
    qx.Bootstrap.setDisplayNames(config.statics, name);
    if(config.members || config.extend){

      qx.Bootstrap.setDisplayNames(config.members, name + ".prototype");
      clazz = config.construct || new Function;
      if(config.extend){

        this.extendClass(clazz, clazz, config.extend, name, basename);
      };
      var statics = config.statics || {
      };
      // use keys to include the shadowed in IE
      for(var i = 0,keys = qx.Bootstrap.keys(statics),l = keys.length;i < l;i++){

        var key = keys[i];
        clazz[key] = statics[key];
      };
      proto = clazz.prototype;
      // Enable basecalls within constructor
      proto.base = qx.Bootstrap.base;
      var members = config.members || {
      };
      var key,member;
      // use keys to include the shadowed in IE
      for(var i = 0,keys = qx.Bootstrap.keys(members),l = keys.length;i < l;i++){

        key = keys[i];
        member = members[key];
        // Enable basecalls for methods
        // Hint: proto[key] is not yet overwritten here
        if(member instanceof Function && proto[key]){

          member.base = proto[key];
        };
        proto[key] = member;
      };
    } else {

      clazz = config.statics || {
      };
      // Merge class into former class (needed for 'optimize: ["statics"]')
      if(qx.Bootstrap.$$registry && qx.Bootstrap.$$registry[name]){

        var formerClass = qx.Bootstrap.$$registry[name];
        // Add/overwrite properties and return early if necessary
        if(this.keys(clazz).length !== 0){

          // Execute defer to prevent too early overrides
          if(config.defer){

            config.defer(clazz, proto);
          };
          for(var curProp in clazz){

            formerClass[curProp] = clazz[curProp];
          };
          return formerClass;
        };
      };
    };
    // Store type info
    clazz.$$type = "Class";
    // Attach toString
    if(!clazz.hasOwnProperty("toString")){

      clazz.toString = this.genericToString;
    };
    // Create namespace
    var basename = name ? this.createNamespace(name, clazz) : "";
    // Store names in constructor/object
    clazz.name = clazz.classname = name;
    clazz.basename = basename;
    clazz.$$events = config.events;
    // Execute defer section
    if(config.defer){

      config.defer(clazz, proto);
    };
    // Store class reference in global class registry
    if(name != null){

      qx.Bootstrap.$$registry[name] = clazz;
    };
    return clazz;
  }
};
/**
 * Internal class that is responsible for bootstrapping the qooxdoo
 * framework at load time.
 */
qx.Bootstrap.define("qx.Bootstrap", {
  statics : {
    /** Root for create namespace. **/
    __root : null,
    /** Timestamp of qooxdoo based application startup */
    LOADSTART : qx.$$start || new Date(),
    /**
     * Mapping for early use of the qx.debug environment setting.
     */
    DEBUG : (function(){

      // make sure to reflect all changes here to the environment class!
      var debug = true;
      if(qx.$$environment && qx.$$environment["qx.debug"] === false){

        debug = false;
      };
      return debug;
    })(),
    /**
     * Minimal accessor API for the environment settings given from the
     * generator.
     *
     * WARNING: This method only should be used if the
     * {@link qx.core.Environment} class is not loaded!
     *
     * @param key {String} The key to get the value from.
     * @return {var} The value of the setting or <code>undefined</code>.
     */
    getEnvironmentSetting : function(key){

      if(qx.$$environment){

        return qx.$$environment[key];
      };
    },
    /**
     * Minimal mutator for the environment settings given from the generator.
     * It checks for the existance of the environment settings and sets the
     * key if its not given from the generator. If a setting is available from
     * the generator, the setting will be ignored.
     *
     * WARNING: This method only should be used if the
     * {@link qx.core.Environment} class is not loaded!
     *
     * @param key {String} The key of the setting.
     * @param value {var} The value for the setting.
     */
    setEnvironmentSetting : function(key, value){

      if(!qx.$$environment){

        qx.$$environment = {
        };
      };
      if(qx.$$environment[key] === undefined){

        qx.$$environment[key] = value;
      };
    },
    /**
     * Creates a namespace and assigns the given object to it.
     *
     * @internal
     * @signature function(name, object)
     * @param name {String} The complete namespace to create. Typically, the last part is the class name itself
     * @param object {Object} The object to attach to the namespace
     * @return {String} last part of the namespace (which object is assigned to)
     * @throws {Error} when the given object already exists.
     */
    createNamespace : qx.Bootstrap.createNamespace,
    /**
     * Offers the ability to change the root for creating namespaces from window to
     * whatever object is given.
     *
     * @param root {Object} The root to use.
     * @internal
     */
    setRoot : function(root){

      this.__root = root;
    },
    /**
     * Call the same method of the super class.
     *
     * @signature function(args, varargs)
     * @param args {arguments} the arguments variable of the calling method
     * @param varargs {var} variable number of arguments passed to the overwritten function
     * @return {var} the return value of the method of the base class.
     */
    base : qx.Bootstrap.base,
    /**
     * Define a new class using the qooxdoo class system.
     * Lightweight version of {@link qx.Class#define} with less features.
     *
     * @signature function(name, config)
     * @param name {String?} Name of the class. If null, the class will not be
     *   attached to a namespace.
     * @param config {Map ? null} Class definition structure. The configuration map has the following keys:
     *     <table>
     *       <tr><th>Name</th><th>Type</th><th>Description</th></tr>
     *       <tr><th>extend</th><td>Class</td><td>The super class the current class inherits from.</td></tr>
     *       <tr><th>construct</th><td>Function</td><td>The constructor of the class.</td></tr>
     *       <tr><th>statics</th><td>Map</td><td>Map of static values / functions of the class.</td></tr>
     *       <tr><th>members</th><td>Map</td><td>Map of instance members of the class.</td></tr>
     *       <tr><th>defer</th><td>Function</td><td>Function that is called at the end of
     *          processing the class declaration.</td></tr>
     *     </table>
     * @return {Class} The defined class.
     */
    define : qx.Bootstrap.define,
    /**
     * Sets the display name of the given function
     *
     * @signature function(fcn, classname, name)
     * @param fcn {Function} the function to set the display name for
     * @param classname {String} the name of the class the function is defined in
     * @param name {String} the function name
     */
    setDisplayName : qx.Bootstrap.setDisplayName,
    /**
     * Set the names of all functions defined in the given map
     *
     * @signature function(functionMap, classname)
     * @param functionMap {Object} a map with functions as values
     * @param classname {String} the name of the class, the functions are
     *   defined in
     */
    setDisplayNames : qx.Bootstrap.setDisplayNames,
    /**
     * This method will be attached to all classes to return
     * a nice identifier for them.
     *
     * @internal
     * @signature function()
     * @return {String} The class identifier
     */
    genericToString : qx.Bootstrap.genericToString,
    /**
     * Inherit a clazz from a super class.
     *
     * This function differentiates between class and constructor because the
     * constructor written by the user might be wrapped and the <code>base</code>
     * property has to be attached to the constructor, while the <code>superclass</code>
     * property has to be attached to the wrapped constructor.
     *
     * @param clazz {Function} The class's wrapped constructor
     * @param construct {Function} The unwrapped constructor
     * @param superClass {Function} The super class
     * @param name {Function} fully qualified class name
     * @param basename {Function} the base name
     */
    extendClass : function(clazz, construct, superClass, name, basename){

      var superproto = superClass.prototype;
      // Use helper function/class to save the unnecessary constructor call while
      // setting up inheritance.
      var helper = new Function();
      helper.prototype = superproto;
      var proto = new helper();
      // Apply prototype to new helper instance
      clazz.prototype = proto;
      // Store names in prototype
      proto.name = proto.classname = name;
      proto.basename = basename;
      /*
        - Store base constructor to constructor-
        - Store reference to extend class
      */
      construct.base = superClass;
      clazz.superclass = superClass;
      /*
        - Store statics/constructor onto constructor/prototype
        - Store correct constructor
        - Store statics onto prototype
      */
      construct.self = clazz.constructor = proto.constructor = clazz;
    },
    /**
     * Find a class by its name
     *
     * @param name {String} class name to resolve
     * @return {Class} the class
     */
    getByName : function(name){

      return qx.Bootstrap.$$registry[name];
    },
    /** @type {Map} Stores all defined classes */
    $$registry : {
    },
    /**
     * IE does not return "shadowed" keys even if they are defined directly
     * in the object.
     *
     * @internal
     * @type {String[]}
     */
    __shadowedKeys : ["isPrototypeOf", "hasOwnProperty", "toLocaleString", "toString", "valueOf", "propertyIsEnumerable", "constructor"],
    /**
     * Get the keys of a map as array as returned by a "for ... in" statement.
     *
     * @signature function(map)
     * @internal
     * @param map {Object} the map
     * @return {Array} array of the keys of the map
     */
    keys : ({
      "ES5" : Object.keys,
      "BROKEN_IE" : function(map){

        if(map === null || (typeof map != "object" && typeof map != "function")){

          throw new TypeError("Object.keys requires an object as argument.");
        };
        var arr = [];
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        for(var key in map){

          if(hasOwnProperty.call(map, key)){

            arr.push(key);
          };
        };
        // IE does not return "shadowed" keys even if they are defined directly
        // in the object. This is incompatible with the ECMA standard!!
        // This is why this checks are needed.
        var shadowedKeys = qx.Bootstrap.__shadowedKeys;
        for(var i = 0,a = shadowedKeys,l = a.length;i < l;i++){

          if(hasOwnProperty.call(map, a[i])){

            arr.push(a[i]);
          };
        };
        return arr;
      },
      "default" : function(map){

        if(map === null || (typeof map != "object" && typeof map != "function")){

          throw new TypeError("Object.keys requires an object as argument.");
        };
        var arr = [];
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        for(var key in map){

          if(hasOwnProperty.call(map, key)){

            arr.push(key);
          };
        };
        return arr;
      }
    })[typeof (Object.keys) == "function" ? "ES5" : (function(){

      for(var key in {
        toString : 1
      }){

        return key;
      };
    })() !== "toString" ? "BROKEN_IE" : "default"],
    /**
     * Mapping from JavaScript string representation of objects to names
     * @internal
     * @type {Map}
     */
    __classToTypeMap : {
      "[object String]" : "String",
      "[object Array]" : "Array",
      "[object Object]" : "Object",
      "[object RegExp]" : "RegExp",
      "[object Number]" : "Number",
      "[object Boolean]" : "Boolean",
      "[object Date]" : "Date",
      "[object Function]" : "Function",
      "[object Error]" : "Error"
    },
    /*
    ---------------------------------------------------------------------------
      FUNCTION UTILITY FUNCTIONS
    ---------------------------------------------------------------------------
    */
    /**
     * Returns a function whose "this" is altered.
     *
     * *Syntax*
     *
     * <pre class='javascript'>qx.Bootstrap.bind(myFunction, [self, [varargs...]]);</pre>
     *
     * *Example*
     *
     * <pre class='javascript'>
     * function myFunction()
     * {
     *   this.setStyle('color', 'red');
     *   // note that 'this' here refers to myFunction, not an element
     *   // we'll need to bind this function to the element we want to alter
     * };
     *
     * var myBoundFunction = qx.Bootstrap.bind(myFunction, myElement);
     * myBoundFunction(); // this will make the element myElement red.
     * </pre>
     *
     * @param func {Function} Original function to wrap
     * @param self {Object ? null} The object that the "this" of the function will refer to.
     * @param varargs {arguments ? null} The arguments to pass to the function.
     * @return {Function} The bound function.
     */
    bind : function(func, self, varargs){

      var fixedArgs = Array.prototype.slice.call(arguments, 2, arguments.length);
      return function(){

        var args = Array.prototype.slice.call(arguments, 0, arguments.length);
        return func.apply(self, fixedArgs.concat(args));
      };
    },
    /*
    ---------------------------------------------------------------------------
      STRING UTILITY FUNCTIONS
    ---------------------------------------------------------------------------
    */
    /**
     * Convert the first character of the string to upper case.
     *
     * @param str {String} the string
     * @return {String} the string with an upper case first character
     */
    firstUp : function(str){

      return str.charAt(0).toUpperCase() + str.substr(1);
    },
    /**
     * Convert the first character of the string to lower case.
     *
     * @param str {String} the string
     * @return {String} the string with a lower case first character
     */
    firstLow : function(str){

      return str.charAt(0).toLowerCase() + str.substr(1);
    },
    /*
    ---------------------------------------------------------------------------
      TYPE UTILITY FUNCTIONS
    ---------------------------------------------------------------------------
    */
    /**
     * Get the internal class of the value. See
     * http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/
     * for details.
     *
     * @param value {var} value to get the class for
     * @return {String} the internal class of the value
     */
    getClass : function(value){

      var classString = Object.prototype.toString.call(value);
      return (qx.Bootstrap.__classToTypeMap[classString] || classString.slice(8, -1));
    },
    /**
     * Whether the value is a string.
     *
     * @param value {var} Value to check.
     * @return {Boolean} Whether the value is a string.
     */
    isString : function(value){

      // Added "value !== null" because IE throws an exception "Object expected"
      // by executing "value instanceof String" if value is a DOM element that
      // doesn't exist. It seems that there is an internal difference between a
      // JavaScript null and a null returned from calling DOM.
      // e.q. by document.getElementById("ReturnedNull").
      return (value !== null && (typeof value === "string" || qx.Bootstrap.getClass(value) == "String" || value instanceof String || (!!value && !!value.$$isString)));
    },
    /**
     * Whether the value is an array.
     *
     * @param value {var} Value to check.
     * @return {Boolean} Whether the value is an array.
     */
    isArray : function(value){

      // Added "value !== null" because IE throws an exception "Object expected"
      // by executing "value instanceof Array" if value is a DOM element that
      // doesn't exist. It seems that there is an internal difference between a
      // JavaScript null and a null returned from calling DOM.
      // e.q. by document.getElementById("ReturnedNull").
      return (value !== null && (value instanceof Array || (value && qx.data && qx.data.IListData && qx.util.OOUtil.hasInterface(value.constructor, qx.data.IListData)) || qx.Bootstrap.getClass(value) == "Array" || (!!value && !!value.$$isArray)));
    },
    /**
     * Whether the value is an object. Note that built-in types like Window are
     * not reported to be objects.
     *
     * @param value {var} Value to check.
     * @return {Boolean} Whether the value is an object.
     */
    isObject : function(value){

      return (value !== undefined && value !== null && qx.Bootstrap.getClass(value) == "Object");
    },
    /**
     * Whether the value is a function.
     *
     * @param value {var} Value to check.
     * @return {Boolean} Whether the value is a function.
     */
    isFunction : function(value){

      return qx.Bootstrap.getClass(value) == "Function";
    },
    /*
    ---------------------------------------------------------------------------
      LOGGING UTILITY FUNCTIONS
    ---------------------------------------------------------------------------
    */
    $$logs : [],
    /**
     * Sending a message at level "debug" to the logger.
     *
     * @param object {Object} Contextual object (either instance or static class)
     * @param message {var} Any number of arguments supported. An argument may
     *   have any JavaScript data type. All data is serialized immediately and
     *   does not keep references to other objects.
     */
    debug : function(object, message){

      qx.Bootstrap.$$logs.push(["debug", arguments]);
    },
    /**
     * Sending a message at level "info" to the logger.
     *
     * @param object {Object} Contextual object (either instance or static class)
     * @param message {var} Any number of arguments supported. An argument may
     *   have any JavaScript data type. All data is serialized immediately and
     *   does not keep references to other objects.
     */
    info : function(object, message){

      qx.Bootstrap.$$logs.push(["info", arguments]);
    },
    /**
     * Sending a message at level "warn" to the logger.
     *
     * @param object {Object} Contextual object (either instance or static class)
     * @param message {var} Any number of arguments supported. An argument may
     *   have any JavaScript data type. All data is serialized immediately and
     *   does not keep references to other objects.
     */
    warn : function(object, message){

      qx.Bootstrap.$$logs.push(["warn", arguments]);
    },
    /**
     * Sending a message at level "error" to the logger.
     *
     * @param object {Object} Contextual object (either instance or static class)
     * @param message {var} Any number of arguments supported. An argument may
     *   have any JavaScript data type. All data is serialized immediately and
     *   does not keep references to other objects.
     */
    error : function(object, message){

      qx.Bootstrap.$$logs.push(["error", arguments]);
    },
    /**
     * Prints the current stack trace at level "info"
     *
     * @param object {Object} Contextual object (either instance or static class)
     */
    trace : function(object){
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * This class is a base class for the OO system defined by Class, Mixin
 * and Interface. It contains helper which are basically needed to create the
 * Classes which define the OO system.
 */
qx.Bootstrap.define("qx.util.OOUtil", {
  statics : {
    /**
     * Whether the given class exists
     *
     * @param name {String} class name to check
     * @return {Boolean} true if class exists
     */
    classIsDefined : function(name){

      return qx.Bootstrap.getByName(name) !== undefined;
    },
    /**
     * Returns the definition of the given property, if not redefined.
     * Returns null if the property does not exist.
     *
     * @param clazz {Class} class to check
     * @param name {String} name of the class to check for
     * @return {Map|null} whether the object support the given event.
     */
    getPropertyDefinition : function(clazz, name){

      while(clazz){

        if(clazz.$$properties && clazz.$$properties[name]){

          return clazz.$$properties[name];
        };
        clazz = clazz.superclass;
      };
      return null;
    },
    /**
     * Whether a class has the given property
     *
     * @param clazz {Class} class to check
     * @param name {String} name of the property to check for
     * @return {Boolean} whether the class includes the given property.
     */
    hasProperty : function(clazz, name){

      return !!qx.util.OOUtil.getPropertyDefinition(clazz, name);
    },
    /**
     * Returns the event type of the given event. Returns null if
     * the event does not exist.
     *
     * @param clazz {Class} class to check
     * @param name {String} name of the event
     * @return {Map|null} Event type of the given event.
     */
    getEventType : function(clazz, name){

      var clazz = clazz.constructor;
      while(clazz.superclass){

        if(clazz.$$events && clazz.$$events[name] !== undefined){

          return clazz.$$events[name];
        };
        clazz = clazz.superclass;
      };
      return null;
    },
    /**
     * Whether a class supports the given event type
     *
     * @param clazz {Class} class to check
     * @param name {String} name of the event to check for
     * @return {Boolean} whether the class supports the given event.
     */
    supportsEvent : function(clazz, name){

      return !!qx.util.OOUtil.getEventType(clazz, name);
    },
    /**
     * Returns the class or one of its super classes which contains the
     * declaration of the given interface. Returns null if the interface is not
     * specified anywhere.
     *
     * @param clazz {Class} class to look for the interface
     * @param iface {Interface} interface to look for
     * @return {Class | null} the class which directly implements the given interface
     */
    getByInterface : function(clazz, iface){

      var list,i,l;
      while(clazz){

        if(clazz.$$implements){

          list = clazz.$$flatImplements;
          for(i = 0,l = list.length;i < l;i++){

            if(list[i] === iface){

              return clazz;
            };
          };
        };
        clazz = clazz.superclass;
      };
      return null;
    },
    /**
     * Whether a given class or any of its super classes includes a given interface.
     *
     * This function will return "true" if the interface was defined
     * in the class declaration ({@link qx.Class#define}) of the class
     * or any of its super classes using the "implement"
     * key.
     *
     * @param clazz {Class} class to check
     * @param iface {Interface} the interface to check for
     * @return {Boolean} whether the class includes the interface.
     */
    hasInterface : function(clazz, iface){

      return !!qx.util.OOUtil.getByInterface(clazz, iface);
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2005-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */
/**
 * This class is the single point to access all settings that may be different
 * in different environments. This contains e.g. the browser name, engine
 * version but also qooxdoo or application specific settings.
 *
 * Its public API can be found in its four main methods. One pair of methods
 * is used to check the synchronous values of the environment. The other pair
 * of methods is used for asynchronous checks.
 *
 * The most often used method should be {@link #get}, which returns the
 * current value for a given environment check.
 *
 * All qooxdoo settings can be changed via the generator's config. See the manual
 * for more details about the environment key in the config. As you can see
 * from the methods API, there is no way to override an existing key. So if you
 * need to change a qooxdoo setting, you have to use the generator to do so.
 *
 * The generator is also responsible for requiring the necessary implementation
 * classes for each check. When using a check of a new category, make sure to
 * rebuild you application and let the generator include the necessary files.
 *
 * The following table shows the available checks. If you are
 * interested in more details, check the reference to the implementation of
 * each check. Please do not use those check implementations directly, as the
 * Environment class comes with a smart caching feature.
 *
 * <table border="0" cellspacing="10">
 *   <tbody>
 *     <tr>
 *       <td colspan="4"><h2>Synchronous checks</h2>
 *       </td>
 *     </tr>
 *     <tr>
 *       <th><h3>Key</h3></th>
 *       <th><h3>Type</h3></th>
 *       <th><h3>Example</h3></th>
 *       <th><h3>Details</h3></th>
 *     </tr>
 *     <tr>
 *       <td colspan="4"><b>browser</b></td>
 *     </tr>
 *     <tr>
 *       <td>browser.documentmode</td><td><i>Integer</i></td><td><code>0</code></td>
 *       <td>{@link qx.bom.client.Browser#getDocumentMode}</td>
 *     </tr>
 *     <tr>
 *       <td>browser.name</td><td><i>String</i></td><td><code> chrome </code></td>
 *       <td>{@link qx.bom.client.Browser#getName}</td>
 *     </tr>
 *     <tr>
 *       <td>browser.quirksmode</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Browser#getQuirksMode}</td>
 *     </tr>
 *     <tr>
 *       <td>browser.version</td><td><i>String</i></td><td><code>11.0</code></td>
 *       <td>{@link qx.bom.client.Browser#getVersion}</td>
 *     </tr>
 *     <tr>
 *       <td colspan="4"><b>runtime</b></td>
 *     </tr>
 *     <tr>
 *       <td>runtime.name</td><td><i> String </i></td><td><code> node.js </code></td>
 *       <td>{@link qx.bom.client.Runtime#getName}</td>
 *     </tr>
 *     <tr>
 *       <td colspan="4"><b>css</b></td>
 *     </tr>
 *     <tr>
 *       <td>css.borderradius</td><td><i>String</i> or <i>null</i></td><td><code>borderRadius</code></td>
 *       <td>{@link qx.bom.client.Css#getBorderRadius}</td>
 *     </tr>
 *     <tr>
 *       <td>css.borderimage</td><td><i>String</i> or <i>null</i></td><td><code>WebkitBorderImage</code></td>
 *       <td>{@link qx.bom.client.Css#getBorderImage}</td>
 *     </tr>
 *     <tr>
 *       <td>css.borderimage.standardsyntax</td><td><i>Boolean</i> or <i>null</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Css#getBorderImageSyntax}</td>
 *     </tr>
 *     <tr>
 *       <td>css.boxmodel</td><td><i>String</i></td><td><code>content</code></td>
 *       <td>{@link qx.bom.client.Css#getBoxModel}</td>
 *     </tr>
 *     <tr>
 *       <td>css.boxshadow</td><td><i>String</i> or <i>null</i></td><td><code>boxShadow</code></td>
 *       <td>{@link qx.bom.client.Css#getBoxShadow}</td>
 *     </tr>
 *     <tr>
 *       <td>css.gradient.linear</td><td><i>String</i> or <i>null</i></td><td><code>-moz-linear-gradient</code></td>
 *       <td>{@link qx.bom.client.Css#getLinearGradient}</td>
 *     </tr>
 *     <tr>
 *       <td>css.gradient.filter</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Css#getFilterGradient}</td>
 *     </tr>
 *     <tr>
 *       <td>css.gradient.radial</td><td><i>String</i> or <i>null</i></td><td><code>-moz-radial-gradient</code></td>
 *       <td>{@link qx.bom.client.Css#getRadialGradient}</td>
 *     </tr>
 *     <tr>
 *       <td>css.gradient.legacywebkit</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Css#getLegacyWebkitGradient}</td>
 *     </tr>
 *     <tr>
 *       <td>css.placeholder</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Css#getPlaceholder}</td>
 *     </tr>
 *     <tr>
 *       <td>css.textoverflow</td><td><i>String</i> or <i>null</i></td><td><code>textOverflow</code></td>
 *       <td>{@link qx.bom.client.Css#getTextOverflow}</td>
 *     </tr>
 *     <tr>
 *       <td>css.rgba</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Css#getRgba}</td>
 *     </tr>
 *     <tr>
 *       <td>css.usermodify</td><td><i>String</i> or <i>null</i></td><td><code>WebkitUserModify</code></td>
 *       <td>{@link qx.bom.client.Css#getUserModify}</td>
 *     </tr>
 *     <tr>
 *       <td>css.appearance</td><td><i>String</i> or <i>null</i></td><td><code>WebkitAppearance</code></td>
 *       <td>{@link qx.bom.client.Css#getAppearance}</td>
 *     </tr>
 *     <tr>
 *       <td>css.float</td><td><i>String</i> or <i>null</i></td><td><code>cssFloat</code></td>
 *       <td>{@link qx.bom.client.Css#getFloat}</td>
 *     </tr>
 *     <tr>
 *       <td>css.userselect</td><td><i>String</i> or <i>null</i></td><td><code>WebkitUserSelect</code></td>
 *       <td>{@link qx.bom.client.Css#getUserSelect}</td>
 *     </tr>
 *     <tr>
 *       <td>css.userselect.none</td><td><i>String</i> or <i>null</i></td><td><code>-moz-none</code></td>
 *       <td>{@link qx.bom.client.Css#getUserSelectNone}</td>
 *     </tr>
 *     <tr>
 *       <td>css.boxsizing</td><td><i>String</i> or <i>null</i></td><td><code>boxSizing</code></td>
 *       <td>{@link qx.bom.client.Css#getBoxSizing}</td>
 *     </tr>
 *     <tr>
 *       <td>css.animation</td><td><i>Object</i> or <i>null</i></td><td><code>{end-event: "webkitAnimationEnd", keyframes: "@-webkit-keyframes", play-state: null, name: "WebkitAnimation"}</code></td>
 *       <td>{@link qx.bom.client.CssAnimation#getSupport}</td>
 *     </tr>
 *     <tr>
 *       <td>css.animation.requestframe</td><td><i>String</i> or <i>null</i></td><td><code>mozRequestAnimationFrame</code></td>
 *       <td>{@link qx.bom.client.CssAnimation#getRequestAnimationFrame}</td>
 *     </tr>
 *     <tr>
 *       <td>css.transform</td><td><i>Object</i> or <i>null</i></td><td><code>{3d: true, origin: "WebkitTransformOrigin", name: "WebkitTransform", style: "WebkitTransformStyle", perspective: "WebkitPerspective", perspective-origin: "WebkitPerspectiveOrigin", backface-visibility: "WebkitBackfaceVisibility"}</code></td>
 *       <td>{@link qx.bom.client.CssTransform#getSupport}</td>
 *     </tr>
 *     <tr>
 *       <td>css.transform.3d</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.CssTransform#get3D}</td>
 *     </tr>
 *     <tr>
 *       <td>css.transition</td><td><i>Object</i> or <i>null</i></td><td><code>{end-event: "webkitTransitionEnd", name: "WebkitTransition"}</code></td>
 *       <td>{@link qx.bom.client.CssTransition#getSupport}</td>
 *     </tr>
 *     <tr>
 *       <td>css.inlineblock</td><td><i>String</i> or <i>null</i></td><td><code>inline-block</code></td>
 *       <td>{@link qx.bom.client.Css#getInlineBlock}</td>
 *     </tr>
 *     <tr>
 *       <td>css.opacity</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Css#getOpacity}</td>
 *     </tr>
 *     <tr>
 *       <td>css.textShadow</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Css#getTextShadow}</td>
 *     </tr>
 *     <tr>
 *       <td>css.textShadow.filter</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Css#getFilterTextShadow}</td>
 *     </tr>
 *     <tr>
 *       <td>css.alphaimageloaderneeded</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Css#getAlphaImageLoaderNeeded}</td>
 *     </tr>
 *     <tr>
 *       <td>css.pointerevents</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Css#getPointerEvents}</td>
 *     </tr>
 *     <tr>
 *       <td colspan="4"><b>device</b></td>
 *     </tr>
 *     <tr>
 *       <td>device.name</td><td><i>String</i></td><td><code>pc</code></td>
 *       <td>{@link qx.bom.client.Device#getName}</td>
 *     </tr>
 *     <tr>
 *       <td>device.type</td><td><i>String</i></td><td><code>mobile</code></td>
 *       <td>{@link qx.bom.client.Device#getType}</td>
 *     </tr>
 *     <tr>
 *       <td>device.pixelRatio</td><td><i>Number</i></td><td><code>2</code></td>
 *       <td>{@link qx.bom.client.Device#getDevicePixelRatio}</td>
 *     </tr>
 *     <tr>
 *       <td>device.touch</td><td><i>String</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Device#getTouch}</td>
 *     </tr>
 *     <tr>
 *       <td colspan="4"><b>ecmascript</b></td>
 *     </tr>
 *     <tr>
 *       <td>ecmascript.error.stacktrace</td><td><i>String</i> or <i>null</i></td><td><code>stack</code></td>
 *       <td>{@link qx.bom.client.EcmaScript#getStackTrace}</td>
 *     </tr>
 *     <tr>
 *       <td>ecmascript.array.indexof<td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.EcmaScript#getArrayIndexOf}</td>
 *     </tr>
 *     <tr>
 *       <td>ecmascript.array.lastindexof<td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.EcmaScript#getArrayLastIndexOf}</td>
 *     </tr>
 *     <tr>
 *       <td>ecmascript.array.foreach<td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.EcmaScript#getArrayForEach}</td>
 *     </tr>
 *     <tr>
 *       <td>ecmascript.array.filter<td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.EcmaScript#getArrayFilter}</td>
 *     </tr>
 *     <tr>
 *       <td>ecmascript.array.map<td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.EcmaScript#getArrayMap}</td>
 *     </tr>
 *     <tr>
 *       <td>ecmascript.array.some<td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.EcmaScript#getArraySome}</td>
 *     </tr>
 *     <tr>
 *       <td>ecmascript.array.every<td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.EcmaScript#getArrayEvery}</td>
 *     </tr>
 *     <tr>
 *       <td>ecmascript.array.reduce<td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.EcmaScript#getArrayReduce}</td>
 *     </tr>
 *     <tr>
 *       <td>ecmascript.array.reduceright<td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.EcmaScript#getArrayReduceRight}</td>
 *     </tr>
 *     <tr>
 *       <td>ecmascript.function.bind<td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.EcmaScript#getFunctionBind}</td>
 *     </tr>
 *     <tr>
 *       <td>ecmascript.object.keys<td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.EcmaScript#getObjectKeys}</td>
 *     </tr>
 *     <tr>
 *       <td>ecmascript.date.now<td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.EcmaScript#getDateNow}</td>
 *     </tr>
 *     <tr>
 *       <td>ecmascript.error.toString</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.EcmaScript#getErrorToString}</td>
 *     </tr>
 *     <tr>
 *       <td>ecmascript.string.trim</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.EcmaScript#getStringTrim}</td>
 *     </tr>
 *     <tr>
 *       <td colspan="4"><b>engine</b></td>
 *     </tr>
 *     <tr>
 *       <td>engine.name</td><td><i>String</i></td><td><code>webkit</code></td>
 *       <td>{@link qx.bom.client.Engine#getName}</td>
 *     </tr>
 *     <tr>
 *       <td>engine.version</td><td><i>String</i></td><td><code>534.24</code></td>
 *       <td>{@link qx.bom.client.Engine#getVersion}</td>
 *     </tr>

 *     <tr>
 *       <td colspan="4"><b>event</b></td>
 *     </tr>
 *      <tr>
 *       <td>event.mspointer</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Event#getMsPointer}</td>
 *     </tr>
 *     <tr>
 *       <td>event.touch</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Event#getTouch}</td>
 *     </tr>
 *     <tr>
 *       <td>event.help</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Event#getHelp}</td>
 *     </tr>
 *     <tr>
 *       <td>event.hashchange</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Event#getHashChange}</td>
 *     </tr>

 *     <tr>
 *       <td colspan="4"><b>html</b></td>
 *     </tr>
 *     <tr>
 *       <td>html.audio</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getAudio}</td>
 *     </tr>
 *     <tr>
 *       <td>html.audio.mp3</td><td><i>String</i></td><td><code>""</code></td>
 *       <td>{@link qx.bom.client.Html#getAudioMp3}</td>
 *     </tr>
 *     <tr>
 *       <td>html.audio.ogg</td><td><i>String</i></td><td><code>"maybe"</code></td>
 *       <td>{@link qx.bom.client.Html#getAudioOgg}</td>
 *     </tr>
 *     <tr>
 *       <td>html.audio.wav</td><td><i>String</i></td><td><code>"probably"</code></td>
 *       <td>{@link qx.bom.client.Html#getAudioWav}</td>
 *     </tr>
 *     <tr>
 *       <td>html.audio.au</td><td><i>String</i></td><td><code>"maybe"</code></td>
 *       <td>{@link qx.bom.client.Html#getAudioAu}</td>
 *     </tr>
 *     <tr>
 *       <td>html.audio.aif</td><td><i>String</i></td><td><code>"probably"</code></td>
 *       <td>{@link qx.bom.client.Html#getAudioAif}</td>
 *     </tr>
 *     <tr>
 *       <td>html.canvas</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getCanvas}</td>
 *     </tr>
 *     <tr>
 *       <td>html.classlist</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getClassList}</td>
 *     </tr>
 *     <tr>
 *       <td>html.geolocation</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getGeoLocation}</td>
 *     </tr>
 *     <tr>
 *       <td>html.storage.local</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getLocalStorage}</td>
 *     </tr>
 *     <tr>
 *       <td>html.storage.session</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getSessionStorage}</td>
 *     </tr>
 *     <tr>
 *       <td>html.storage.userdata</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getUserDataStorage}</td>
 *     </tr>
 *     <tr>
 *       <td>html.svg</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getSvg}</td>
 *     </tr>
 *     <tr>
 *       <td>html.video</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getVideo}</td>
 *     </tr>
 *     <tr>
 *       <td>html.video.h264</td><td><i>String</i></td><td><code>"probably"</code></td>
 *       <td>{@link qx.bom.client.Html#getVideoH264}</td>
 *     </tr>
 *     <tr>
 *       <td>html.video.ogg</td><td><i>String</i></td><td><code>""</code></td>
 *       <td>{@link qx.bom.client.Html#getVideoOgg}</td>
 *     </tr>
 *     <tr>
 *       <td>html.video.webm</td><td><i>String</i></td><td><code>"maybe"</code></td>
 *       <td>{@link qx.bom.client.Html#getVideoWebm}</td>
 *     </tr>
 *     <tr>
 *       <td>html.vml</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Html#getVml}</td>
 *     </tr>
 *     <tr>
 *       <td>html.webworker</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getWebWorker}</td>
 *     <tr>
 *       <td>html.filereader</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getFileReader}</td>
 *     </tr>
 *     <tr>
 *       <td>html.xpath</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getXPath}</td>
 *     </tr>
 *     <tr>
 *       <td>html.xul</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getXul}</td>
 *     </tr>
 *     <tr>
 *       <td>html.console</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getConsole}</td>
 *     </tr>
 *     <tr>
 *       <td>html.element.contains</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getContains}</td>
 *     </tr>
 *     <tr>
 *       <td>html.element.compareDocumentPosition</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getCompareDocumentPosition}</td>
 *     </tr>
 *     <tr>
 *       <td>html.element.textContent</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getTextContent}</td>
 *     </tr>
 *     <tr>
 *       <td>html.image.naturaldimensions</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getNaturalDimensions}</td>
 *     </tr>
 *     <tr>
 *       <td>html.history.state</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getHistoryState}</td>
 *     </tr>
 *     <tr>
 *       <td>html.selection</td><td><i>String</i></td><td><code>getSelection</code></td>
 *       <td>{@link qx.bom.client.Html#getSelection}</td>
 *     </tr>
 *     <tr>
 *       <td>html.node.isequalnode</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getIsEqualNode}</td>
 *     </tr>
 *     <tr>
 *       <td colspan="4"><b>XML</b></td>
 *     </tr>
 *     <tr>
 *       <td>xml.implementation</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Xml#getImplementation}</td>
 *     </tr>
 *     <tr>
 *       <td>xml.domparser</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Xml#getDomParser}</td>
 *     </tr>
 *     <tr>
 *       <td>xml.selectsinglenode</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Xml#getSelectSingleNode}</td>
 *     </tr>
 *     <tr>
 *       <td>xml.selectnodes</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Xml#getSelectNodes}</td>
 *     </tr>
 *     <tr>
 *       <td>xml.getelementsbytagnamens</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Xml#getElementsByTagNameNS}</td>
 *     </tr>
 *     <tr>
 *       <td>xml.domproperties</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Xml#getDomProperties}</td>
 *     </tr>
 *     <tr>
 *       <td>xml.attributens</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Xml#getAttributeNS}</td>
 *     </tr>
 *     <tr>
 *       <td>xml.createelementns</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Xml#getCreateElementNS}</td>
 *     </tr>
 *     <tr>
 *       <td>xml.createnode</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Xml#getCreateNode}</td>
 *     </tr>
 *     <tr>
 *       <td>xml.getqualifieditem</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Xml#getQualifiedItem}</td>
 *     </tr>

 *     <tr>
 *       <td colspan="4"><b>Stylesheets</b></td>
 *     </tr>
 *     <tr>
 *       <td>html.stylesheet.createstylesheet</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Stylesheet#getCreateStyleSheet}</td>
 *     </tr>
 *     <tr>
 *       <td>html.stylesheet.insertrule</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Stylesheet#getInsertRule}</td>
 *     </tr>
 *     <tr>
 *       <td>html.stylesheet.deleterule</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Stylesheet#getDeleteRule}</td>
 *     </tr>
 *     <tr>
 *       <td>html.stylesheet.addimport</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Stylesheet#getAddImport}</td>
 *     </tr>
 *     <tr>
 *       <td>html.stylesheet.removeimport</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Stylesheet#getRemoveImport}</td>
 *     </tr>

 *     <tr>
 *       <td colspan="4"><b>io</b></td>
 *     </tr>
 *     <tr>
 *       <td>io.maxrequests</td><td><i>Integer</i></td><td><code>4</code></td>
 *       <td>{@link qx.bom.client.Transport#getMaxConcurrentRequestCount}</td>
 *     </tr>
 *     <tr>
 *       <td>io.ssl</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Transport#getSsl}</td>
 *     </tr>
 *     <tr>
 *       <td>io.xhr</td><td><i>String</i></td><td><code>xhr</code></td>
 *       <td>{@link qx.bom.client.Transport#getXmlHttpRequest}</td>
 *     </tr>

 *     <tr>
 *       <td colspan="4"><b>locale</b></td>
 *     </tr>
 *     <tr>
 *       <td>locale</td><td><i>String</i></td><td><code>de</code></td>
 *       <td>{@link qx.bom.client.Locale#getLocale}</td>
 *     </tr>
 *     <tr>
 *       <td>locale.variant</td><td><i>String</i></td><td><code>de</code></td>
 *       <td>{@link qx.bom.client.Locale#getVariant}</td>
 *     </tr>

 *     <tr>
 *       <td colspan="4"><b>os</b></td>
 *     </tr>
 *     <tr>
 *       <td>os.name</td><td><i>String</i></td><td><code>osx</code></td>
 *       <td>{@link qx.bom.client.OperatingSystem#getName}</td>
 *     </tr>
 *     <tr>
 *       <td>os.version</td><td><i>String</i></td><td><code>10.6</code></td>
 *       <td>{@link qx.bom.client.OperatingSystem#getVersion}</td>
 *     </tr>
 *     <tr>
 *       <td>os.scrollBarOverlayed</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Scroll#scrollBarOverlayed}</td>
 *     </tr>

 *     <tr>
 *       <td colspan="4"><b>phonegap</b></td>
 *     </tr>
 *     <tr>
 *       <td>phonegap</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.PhoneGap#getPhoneGap}</td>
 *     </tr>
 *     <tr>
 *       <td>phonegap.notification</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.PhoneGap#getNotification}</td>
 *     </tr>

 *     <tr>
 *       <td colspan="4"><b>plugin</b></td>
 *     </tr>
 *     <tr>
 *       <td>plugin.divx</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Plugin#getDivX}</td>
 *     </tr>
 *     <tr>
 *       <td>plugin.divx.version</td><td><i>String</i></td><td></td>
 *       <td>{@link qx.bom.client.Plugin#getDivXVersion}</td>
 *     </tr>
 *     <tr>
 *       <td>plugin.flash</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Flash#isAvailable}</td>
 *     </tr>
 *     <tr>
 *       <td>plugin.flash.express</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Flash#getExpressInstall}</td>
 *     </tr>
 *     <tr>
 *       <td>plugin.flash.strictsecurity</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Flash#getStrictSecurityModel}</td>
 *     </tr>
 *     <tr>
 *       <td>plugin.flash.version</td><td><i>String</i></td><td><code>10.2.154</code></td>
 *       <td>{@link qx.bom.client.Flash#getVersion}</td>
 *     </tr>
 *     <tr>
 *       <td>plugin.gears</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Plugin#getGears}</td>
 *     </tr>
 *     <tr>
 *       <td>plugin.activex</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Plugin#getActiveX}</td>
 *     </tr>
 *     <tr>
 *       <td>plugin.skype</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Plugin#getSkype}</td>
 *     </tr>
 *     <tr>
 *       <td>plugin.pdf</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Plugin#getPdf}</td>
 *     </tr>
 *     <tr>
 *       <td>plugin.pdf.version</td><td><i>String</i></td><td></td>
 *       <td>{@link qx.bom.client.Plugin#getPdfVersion}</td>
 *     </tr>
 *     <tr>
 *       <td>plugin.quicktime</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Plugin#getQuicktime}</td>
 *     </tr>
 *     <tr>
 *       <td>plugin.quicktime.version</td><td><i>String</i></td><td><code>7.6</code></td>
 *       <td>{@link qx.bom.client.Plugin#getQuicktimeVersion}</td>
 *     </tr>
 *     <tr>
 *       <td>plugin.silverlight</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Plugin#getSilverlight}</td>
 *     </tr>
 *     <tr>
 *       <td>plugin.silverlight.version</td><td><i>String</i></td><td></td>
 *       <td>{@link qx.bom.client.Plugin#getSilverlightVersion}</td>
 *     </tr>
 *     <tr>
 *       <td>plugin.windowsmedia</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Plugin#getWindowsMedia}</td>
 *     </tr>
 *     <tr>
 *       <td>plugin.windowsmedia.version</td><td><i>String</i></td><td></td>
 *       <td>{@link qx.bom.client.Plugin#getWindowsMediaVersion}</td>
 *     </tr>

 *     <tr>
 *       <td colspan="4"><b>qx</b></td>
 *     </tr>
 *     <tr>
 *       <td>qx.allowUrlSettings</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td><i>default:</i> <code>false</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.allowUrlVariants</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td><i>default:</i> <code>false</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.application</td><td><i>String</i></td><td><code>name.space</code></td>
 *       <td><i>default:</i> <code>&lt;&lt;application name&gt;&gt;</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.aspects</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td><i>default:</i> <code>false</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.debug</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td><i>default:</i> <code>true</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.debug.databinding</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td><i>default:</i> <code>false</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.debug.dispose</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td><i>default:</i> <code>false</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.debug.dispose.level</td><td><i>Integer</i></td><td><code>0</code></td>
 *       <td><i>default:</i> <code>0</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.debug.io</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td><i>default:</i> <code>false</code></td>
 *     </tr>
 *     <tr>
 *     <tr>
 *       <td>qx.debug.io.remote</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td><i>default:</i> <code>false</code></td>
 *     </tr>
 *     <tr>
 *     <tr>
 *       <td>qx.debug.io.remote.data</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td><i>default:</i> <code>false</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.debug.property.level</td><td><i>Integer</i></td><td><code>0</code></td>
 *       <td><i>default:</i> <code>0</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.debug.ui.queue</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td><i>default:</i> <code>true</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.dynamicmousewheel</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td><i>default:</i> <code>true</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.dynlocale</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td><i>default:</i> <code>true</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.dyntheme</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td><i>default:</i> <code>true</code></td>
 *     </tr>

 *     <tr>
 *       <td>qx.globalErrorHandling</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td><i>default:</i> <code>true</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.emulatemouse</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td><i>default:</i> <code>false</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.mobile.emulatetouch</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td><i>default:</i> <code>false</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.mobile.nativescroll</td><td><i>Boolean</i></td><td><code>false</code></td>
 *       <td>{@link qx.bom.client.Scroll#getNativeScroll}</td>
 *     </tr>
 *     <tr>
 *       <td>qx.optimization.basecalls</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>true if the corresp. <i>optimize</i> key is set in the config</td>
 *     </tr>
 *     <tr>
 *       <td>qx.optimization.comments</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>true if the corresp. <i>optimize</i> key is set in the config</td>
 *     </tr>
 *     <tr>
 *       <td>qx.optimization.privates</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>true if the corresp. <i>optimize</i> key is set in the config</td>
 *     </tr>
 *     <tr>
 *       <td>qx.optimization.strings</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>true if the corresp. <i>optimize</i> key is set in the config</td>
 *     </tr>
 *     <tr>
 *       <td>qx.optimization.variables</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>true if the corresp. <i>optimize</i> key is set in the config</td>
 *     </tr>
 *     <tr>
 *       <td>qx.optimization.variants</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>true if the corresp. <i>optimize</i> key is set in the config</td>
 *     </tr>
 *     <tr>
 *       <td>qx.revision</td><td><i>String</i></td><td><code>27348</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.theme</td><td><i>String</i></td><td><code>qx.theme.Modern</code></td>
 *       <td><i>default:</i> <code>&lt;&lt;initial theme name&gt;&gt;</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.version</td><td><i>String</i></td><td><code>${qxversion}</code></td>
 *     </tr>
 *     <tr>
 *       <td>qx.blankpage</td><td><i>String</i></td><td><code>URI to blank.html page</code></td>
 *     </tr>

 *     <tr>
 *       <td colspan="4"><b>module</b></td>
 *     </tr>
 *     <tr>
 *       <td>module.databinding</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td><i>default:</i> <code>true</code></td>
 *     </tr>
 *     <tr>
 *       <td>module.logger</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td><i>default:</i> <code>true</code></td>
 *     </tr>
 *     <tr>
 *       <td>module.property</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td><i>default:</i> <code>true</code></td>
 *     </tr>
 *     <tr>
 *       <td>module.events</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td><i>default:</i> <code>true</code></td>
 *     </tr>
 *     <tr>
 *       <td colspan="4"><h3>Asynchronous checks</h3>
 *       </td>
 *     </tr>
 *     <tr>
 *       <td>html.dataurl</td><td><i>Boolean</i></td><td><code>true</code></td>
 *       <td>{@link qx.bom.client.Html#getDataUrl}</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 */
qx.Bootstrap.define("qx.core.Environment", {
  statics : {
    /** Map containing the synchronous check functions. */
    _checks : {
    },
    /** Map containing the asynchronous check functions. */
    _asyncChecks : {
    },
    /** Internal cache for all checks. */
    __cache : {
    },
    /** Internal map for environment keys to check methods. */
    _checksMap : {
      "engine.version" : "qx.bom.client.Engine.getVersion",
      "engine.name" : "qx.bom.client.Engine.getName",
      "browser.name" : "qx.bom.client.Browser.getName",
      "browser.version" : "qx.bom.client.Browser.getVersion",
      "browser.documentmode" : "qx.bom.client.Browser.getDocumentMode",
      "browser.quirksmode" : "qx.bom.client.Browser.getQuirksMode",
      "runtime.name" : "qx.bom.client.Runtime.getName",
      "device.name" : "qx.bom.client.Device.getName",
      "device.type" : "qx.bom.client.Device.getType",
      "device.pixelRatio" : "qx.bom.client.Device.getPixelRatio",
      "device.touch" : "qx.bom.client.Device.getTouch",
      "locale" : "qx.bom.client.Locale.getLocale",
      "locale.variant" : "qx.bom.client.Locale.getVariant",
      "os.name" : "qx.bom.client.OperatingSystem.getName",
      "os.version" : "qx.bom.client.OperatingSystem.getVersion",
      "os.scrollBarOverlayed" : "qx.bom.client.Scroll.scrollBarOverlayed",
      "plugin.gears" : "qx.bom.client.Plugin.getGears",
      "plugin.activex" : "qx.bom.client.Plugin.getActiveX",
      "plugin.skype" : "qx.bom.client.Plugin.getSkype",
      "plugin.quicktime" : "qx.bom.client.Plugin.getQuicktime",
      "plugin.quicktime.version" : "qx.bom.client.Plugin.getQuicktimeVersion",
      "plugin.windowsmedia" : "qx.bom.client.Plugin.getWindowsMedia",
      "plugin.windowsmedia.version" : "qx.bom.client.Plugin.getWindowsMediaVersion",
      "plugin.divx" : "qx.bom.client.Plugin.getDivX",
      "plugin.divx.version" : "qx.bom.client.Plugin.getDivXVersion",
      "plugin.silverlight" : "qx.bom.client.Plugin.getSilverlight",
      "plugin.silverlight.version" : "qx.bom.client.Plugin.getSilverlightVersion",
      "plugin.flash" : "qx.bom.client.Flash.isAvailable",
      "plugin.flash.version" : "qx.bom.client.Flash.getVersion",
      "plugin.flash.express" : "qx.bom.client.Flash.getExpressInstall",
      "plugin.flash.strictsecurity" : "qx.bom.client.Flash.getStrictSecurityModel",
      "plugin.pdf" : "qx.bom.client.Plugin.getPdf",
      "plugin.pdf.version" : "qx.bom.client.Plugin.getPdfVersion",
      "io.maxrequests" : "qx.bom.client.Transport.getMaxConcurrentRequestCount",
      "io.ssl" : "qx.bom.client.Transport.getSsl",
      "io.xhr" : "qx.bom.client.Transport.getXmlHttpRequest",
      "event.touch" : "qx.bom.client.Event.getTouch",
      "event.mspointer" : "qx.bom.client.Engine.getMsPointer",
      "event.help" : "qx.bom.client.Event.getHelp",
      "event.hashchange" : "qx.bom.client.Event.getHashChange",
      "ecmascript.error.stacktrace" : "qx.bom.client.EcmaScript.getStackTrace",
      "ecmascript.array.indexof" : "qx.bom.client.EcmaScript.getArrayIndexOf",
      "ecmascript.array.lastindexof" : "qx.bom.client.EcmaScript.getArrayLastIndexOf",
      "ecmascript.array.foreach" : "qx.bom.client.EcmaScript.getArrayForEach",
      "ecmascript.array.filter" : "qx.bom.client.EcmaScript.getArrayFilter",
      "ecmascript.array.map" : "qx.bom.client.EcmaScript.getArrayMap",
      "ecmascript.array.some" : "qx.bom.client.EcmaScript.getArraySome",
      "ecmascript.array.every" : "qx.bom.client.EcmaScript.getArrayEvery",
      "ecmascript.array.reduce" : "qx.bom.client.EcmaScript.getArrayReduce",
      "ecmascript.array.reduceright" : "qx.bom.client.EcmaScript.getArrayReduceRight",
      "ecmascript.function.bind" : "qx.bom.client.EcmaScript.getFunctionBind",
      "ecmascript.object.keys" : "qx.bom.client.EcmaScript.getObjectKeys",
      "ecmascript.date.now" : "qx.bom.client.EcmaScript.getDateNow",
      "ecmascript.error.toString" : "qx.bom.client.EcmaScript.getErrorToString",
      "ecmascript.string.trim" : "qx.bom.client.EcmaScript.getStringTrim",
      "html.webworker" : "qx.bom.client.Html.getWebWorker",
      "html.filereader" : "qx.bom.client.Html.getFileReader",
      "html.geolocation" : "qx.bom.client.Html.getGeoLocation",
      "html.audio" : "qx.bom.client.Html.getAudio",
      "html.audio.ogg" : "qx.bom.client.Html.getAudioOgg",
      "html.audio.mp3" : "qx.bom.client.Html.getAudioMp3",
      "html.audio.wav" : "qx.bom.client.Html.getAudioWav",
      "html.audio.au" : "qx.bom.client.Html.getAudioAu",
      "html.audio.aif" : "qx.bom.client.Html.getAudioAif",
      "html.video" : "qx.bom.client.Html.getVideo",
      "html.video.ogg" : "qx.bom.client.Html.getVideoOgg",
      "html.video.h264" : "qx.bom.client.Html.getVideoH264",
      "html.video.webm" : "qx.bom.client.Html.getVideoWebm",
      "html.storage.local" : "qx.bom.client.Html.getLocalStorage",
      "html.storage.session" : "qx.bom.client.Html.getSessionStorage",
      "html.storage.userdata" : "qx.bom.client.Html.getUserDataStorage",
      "html.classlist" : "qx.bom.client.Html.getClassList",
      "html.xpath" : "qx.bom.client.Html.getXPath",
      "html.xul" : "qx.bom.client.Html.getXul",
      "html.canvas" : "qx.bom.client.Html.getCanvas",
      "html.svg" : "qx.bom.client.Html.getSvg",
      "html.vml" : "qx.bom.client.Html.getVml",
      "html.dataset" : "qx.bom.client.Html.getDataset",
      "html.dataurl" : "qx.bom.client.Html.getDataUrl",
      "html.console" : "qx.bom.client.Html.getConsole",
      "html.stylesheet.createstylesheet" : "qx.bom.client.Stylesheet.getCreateStyleSheet",
      "html.stylesheet.insertrule" : "qx.bom.client.Stylesheet.getInsertRule",
      "html.stylesheet.deleterule" : "qx.bom.client.Stylesheet.getDeleteRule",
      "html.stylesheet.addimport" : "qx.bom.client.Stylesheet.getAddImport",
      "html.stylesheet.removeimport" : "qx.bom.client.Stylesheet.getRemoveImport",
      "html.element.contains" : "qx.bom.client.Html.getContains",
      "html.element.compareDocumentPosition" : "qx.bom.client.Html.getCompareDocumentPosition",
      "html.element.textcontent" : "qx.bom.client.Html.getTextContent",
      "html.image.naturaldimensions" : "qx.bom.client.Html.getNaturalDimensions",
      "html.history.state" : "qx.bom.client.Html.getHistoryState",
      "html.selection" : "qx.bom.client.Html.getSelection",
      "html.node.isequalnode" : "qx.bom.client.Html.getIsEqualNode",
      "json" : "qx.bom.client.Json.getJson",
      "css.textoverflow" : "qx.bom.client.Css.getTextOverflow",
      "css.placeholder" : "qx.bom.client.Css.getPlaceholder",
      "css.borderradius" : "qx.bom.client.Css.getBorderRadius",
      "css.borderimage" : "qx.bom.client.Css.getBorderImage",
      "css.borderimage.standardsyntax" : "qx.bom.client.Css.getBorderImageSyntax",
      "css.boxshadow" : "qx.bom.client.Css.getBoxShadow",
      "css.gradient.linear" : "qx.bom.client.Css.getLinearGradient",
      "css.gradient.filter" : "qx.bom.client.Css.getFilterGradient",
      "css.gradient.radial" : "qx.bom.client.Css.getRadialGradient",
      "css.gradient.legacywebkit" : "qx.bom.client.Css.getLegacyWebkitGradient",
      "css.boxmodel" : "qx.bom.client.Css.getBoxModel",
      "css.rgba" : "qx.bom.client.Css.getRgba",
      "css.userselect" : "qx.bom.client.Css.getUserSelect",
      "css.userselect.none" : "qx.bom.client.Css.getUserSelectNone",
      "css.usermodify" : "qx.bom.client.Css.getUserModify",
      "css.appearance" : "qx.bom.client.Css.getAppearance",
      "css.float" : "qx.bom.client.Css.getFloat",
      "css.boxsizing" : "qx.bom.client.Css.getBoxSizing",
      "css.animation" : "qx.bom.client.CssAnimation.getSupport",
      "css.animation.requestframe" : "qx.bom.client.CssAnimation.getRequestAnimationFrame",
      "css.transform" : "qx.bom.client.CssTransform.getSupport",
      "css.transform.3d" : "qx.bom.client.CssTransform.get3D",
      "css.transition" : "qx.bom.client.CssTransition.getSupport",
      "css.inlineblock" : "qx.bom.client.Css.getInlineBlock",
      "css.opacity" : "qx.bom.client.Css.getOpacity",
      "css.textShadow" : "qx.bom.client.Css.getTextShadow",
      "css.textShadow.filter" : "qx.bom.client.Css.getFilterTextShadow",
      "css.alphaimageloaderneeded" : "qx.bom.client.Css.getAlphaImageLoaderNeeded",
      "css.pointerevents" : "qx.bom.client.Css.getPointerEvents",
      "phonegap" : "qx.bom.client.PhoneGap.getPhoneGap",
      "phonegap.notification" : "qx.bom.client.PhoneGap.getNotification",
      "xml.implementation" : "qx.bom.client.Xml.getImplementation",
      "xml.domparser" : "qx.bom.client.Xml.getDomParser",
      "xml.selectsinglenode" : "qx.bom.client.Xml.getSelectSingleNode",
      "xml.selectnodes" : "qx.bom.client.Xml.getSelectNodes",
      "xml.getelementsbytagnamens" : "qx.bom.client.Xml.getElementsByTagNameNS",
      "xml.domproperties" : "qx.bom.client.Xml.getDomProperties",
      "xml.attributens" : "qx.bom.client.Xml.getAttributeNS",
      "xml.createnode" : "qx.bom.client.Xml.getCreateNode",
      "xml.getqualifieditem" : "qx.bom.client.Xml.getQualifiedItem",
      "xml.createelementns" : "qx.bom.client.Xml.getCreateElementNS",
      "qx.mobile.nativescroll" : "qx.bom.client.Scroll.getNativeScroll"
    },
    /**
     * The default accessor for the checks. It returns the value the current
     * environment has for the given key. The key could be something like
     * "qx.debug", "css.textoverflow" or "io.ssl". A complete list of
     * checks can be found in the class comment of this class.
     *
     * Please keep in mind that the result is cached. If you want to run the
     * check function again in case something could have been changed, take a
     * look at the {@link #invalidateCacheKey} function.
     *
     * @param key {String} The name of the check you want to query.
     * @return {var} The stored value depending on the given key.
     *   (Details in the class doc)
     */
    get : function(key){

      // @deprecated {3.5}
      if(qx.Bootstrap.DEBUG){

        if(key === "json"){

          qx.Bootstrap.warn("The environment key 'json' is deprecated " + "and will eventually be removed.");
        };
      };
      // check the cache
      if(this.__cache[key] != undefined){

        return this.__cache[key];
      };
      // search for a matching check
      var check = this._checks[key];
      if(check){

        // execute the check and write the result in the cache
        var value = check();
        this.__cache[key] = value;
        return value;
      };
      // try class lookup
      var classAndMethod = this._getClassNameFromEnvKey(key);
      if(classAndMethod[0] != undefined){

        var clazz = classAndMethod[0];
        var method = classAndMethod[1];
        var value = clazz[method]();
        // call the check method
        this.__cache[key] = value;
        return value;
      };
      // debug flag
      if(qx.Bootstrap.DEBUG){

        qx.Bootstrap.warn(key + " is not a valid key. Please see the API-doc of " + "qx.core.Environment for a list of predefined keys.");
        qx.Bootstrap.trace(this);
      };
    },
    /**
     * Maps an environment key to a check class and method name.
     *
     * @param key {String} The name of the check you want to query.
     * @return {Array} [className, methodName] of
     *  the corresponding implementation.
     */
    _getClassNameFromEnvKey : function(key){

      var envmappings = this._checksMap;
      if(envmappings[key] != undefined){

        var implementation = envmappings[key];
        // separate class from method
        var lastdot = implementation.lastIndexOf(".");
        if(lastdot > -1){

          var classname = implementation.slice(0, lastdot);
          var methodname = implementation.slice(lastdot + 1);
          var clazz = qx.Bootstrap.getByName(classname);
          if(clazz != undefined){

            return [clazz, methodname];
          };
        };
      };
      return [undefined, undefined];
    },
    /**
     * Returns the proper value dependent on the check for the given key.
     *
     * @param key {String} The name of the check the select depends on.
     * @param values {Map} A map containing the values which should be returned
     *   in any case. The "default" key could be used as a catch all statement.
     * @return {var} The value which is stored in the map for the given
     *   check of the key.
     */
    select : function(key, values){

      return this.__pickFromValues(this.get(key), values);
    },
    /**
     * Internal helper which tries to pick the given key from the given values
     * map. If that key is not found, it tries to use a key named "default".
     * If there is also no default key, it prints out a warning and returns
     * undefined.
     *
     * @param key {String} The key to search for in the values.
     * @param values {Map} A map containing some keys.
     * @return {var} The value stored as values[key] usually.
     */
    __pickFromValues : function(key, values){

      var value = values[key];
      if(values.hasOwnProperty(key)){

        return value;
      };
      // check for piped values
      for(var id in values){

        if(id.indexOf("|") != -1){

          var ids = id.split("|");
          for(var i = 0;i < ids.length;i++){

            if(ids[i] == key){

              return values[id];
            };
          };
        };
      };
      if(values["default"] !== undefined){

        return values["default"];
      };
      if(qx.Bootstrap.DEBUG){

        throw new Error('No match for variant "' + key + '" (' + (typeof key) + ' type)' + ' in variants [' + qx.Bootstrap.keys(values) + '] found, and no default ("default") given');
      };
    },
    /**
     * Takes a given map containing the check names as keys and converts
     * the map to an array only containing the values for check evaluating
     * to <code>true</code>. This is especially handy for conditional
     * includes of mixins.
     * @param map {Map} A map containing check names as keys and values.
     * @return {Array} An array containing the values.
     */
    filter : function(map){

      var returnArray = [];
      for(var check in map){

        if(this.get(check)){

          returnArray.push(map[check]);
        };
      };
      return returnArray;
    },
    /**
     * Add a check to the environment class. If there is already a check
     * added for the given key, the add will be ignored.
     *
     * @param key {String} The key for the check e.g. html.featurexyz.
     * @param check {var} It could be either a function or a simple value.
     *   The function should be responsible for the check and should return the
     *   result of the check.
     */
    add : function(key, check){

      // ignore already added checks.
      if(this._checks[key] == undefined){

        // add functions directly
        if(check instanceof Function){

          this._checks[key] = check;
        } else {

          this._checks[key] = this.__createCheck(check);
        };
      };
    },
    /**
     * Adds an asynchronous check to the environment. If there is already a check
     * added for the given key, the add will be ignored.
     *
     * @param key {String} The key of the check e.g. html.featureabc
     * @param check {Function} A function which should check for a specific
     *   environment setting in an asynchronous way. The method should take two
     *   arguments. First one is the callback and the second one is the context.
     */
    addAsync : function(key, check){

      if(this._checks[key] == undefined){

        this._asyncChecks[key] = check;
      };
    },
    /**
     * Initializer for the default values of the framework settings.
     */
    _initDefaultQxValues : function(){

      // an always-true key (e.g. for use in qx.core.Environment.filter() calls)
      this.add("true", function(){

        return true;
      });
      // old settings
      this.add("qx.allowUrlSettings", function(){

        return false;
      });
      this.add("qx.allowUrlVariants", function(){

        return false;
      });
      this.add("qx.debug.property.level", function(){

        return 0;
      });
      // old variants
      // make sure to reflect all changes to qx.debug here in the bootstrap class!
      this.add("qx.debug", function(){

        return true;
      });
      this.add("qx.debug.ui.queue", function(){

        return true;
      });
      this.add("qx.aspects", function(){

        return false;
      });
      this.add("qx.dynlocale", function(){

        return true;
      });
      this.add("qx.dyntheme", function(){

        return true;
      });
      this.add("qx.mobile.emulatetouch", function(){

        return false;
      });
      this.add("qx.emulatemouse", function(){

        return false;
      });
      this.add("qx.blankpage", function(){

        return "qx/static/blank.html";
      });
      this.add("qx.dynamicmousewheel", function(){

        return true;
      });
      this.add("qx.debug.databinding", function(){

        return false;
      });
      this.add("qx.debug.dispose", function(){

        return false;
      });
      // generator optimization vectors
      this.add("qx.optimization.basecalls", function(){

        return false;
      });
      this.add("qx.optimization.comments", function(){

        return false;
      });
      this.add("qx.optimization.privates", function(){

        return false;
      });
      this.add("qx.optimization.strings", function(){

        return false;
      });
      this.add("qx.optimization.variables", function(){

        return false;
      });
      this.add("qx.optimization.variants", function(){

        return false;
      });
      // qooxdoo modules
      this.add("module.databinding", function(){

        return true;
      });
      this.add("module.logger", function(){

        return true;
      });
      this.add("module.property", function(){

        return true;
      });
      this.add("module.events", function(){

        return true;
      });
      this.add("qx.nativeScrollBars", function(){

        return false;
      });
    },
    /**
     * Import checks from global qx.$$environment into the Environment class.
     */
    __importFromGenerator : function(){

      // import the environment map
      if(qx && qx.$$environment){

        for(var key in qx.$$environment){

          var value = qx.$$environment[key];
          this._checks[key] = this.__createCheck(value);
        };
      };
    },
    /**
     * Checks the URL for environment settings and imports these into the
     * Environment class.
     */
    __importFromUrl : function(){

      if(window.document && window.document.location){

        var urlChecks = window.document.location.search.slice(1).split("&");
        for(var i = 0;i < urlChecks.length;i++){

          var check = urlChecks[i].split(":");
          if(check.length != 3 || check[0] != "qxenv"){

            continue;
          };
          var key = check[1];
          var value = decodeURIComponent(check[2]);
          // implicit type conversion
          if(value == "true"){

            value = true;
          } else if(value == "false"){

            value = false;
          } else if(/^(\d|\.)+$/.test(value)){

            value = parseFloat(value);
          };;
          this._checks[key] = this.__createCheck(value);
        };
      };
    },
    /**
     * Internal helper which creates a function returning the given value.
     *
     * @param value {var} The value which should be returned.
     * @return {Function} A function which could be used by a test.
     */
    __createCheck : function(value){

      return qx.Bootstrap.bind(function(value){

        return value;
      }, null, value);
    }
  },
  defer : function(statics){

    // create default values for the environment class
    statics._initDefaultQxValues();
    // load the checks from the generator
    statics.__importFromGenerator();
    // load the checks from the url
    if(statics.get("qx.allowUrlSettings") === true){

      statics.__importFromUrl();
    };
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Martin Wittemann (martinwittemann)

   ======================================================================

   This class contains code from:

     Copyright:
       2011 Pocket Widget S.L., Spain, http://www.pocketwidget.com

     License:
       LGPL: http://www.gnu.org/licenses/lgpl.html
       EPL: http://www.eclipse.org/org/documents/epl-v10.php

     Authors:
       * Javier Martinez Villacampa

************************************************************************ */
/**
 * This class comes with all relevant information regarding
 * the client's engine.
 *
 * This class is used by {@link qx.core.Environment} and should not be used
 * directly. Please check its class comment for details how to use it.
 *
 * @internal
 */
qx.Bootstrap.define("qx.bom.client.Engine", {
  // General: http://en.wikipedia.org/wiki/Browser_timeline
  // Webkit: https://developer.apple.com/internet/safari/uamatrix.html
  // Firefox: http://en.wikipedia.org/wiki/History_of_Mozilla_Firefox
  // Maple: http://www.scribd.com/doc/46675822/2011-SDK2-0-Maple-Browser-Specification-V1-00
  statics : {
    /**
     * Returns the version of the engine.
     *
     * @return {String} The version number of the current engine.
     * @internal
     */
    getVersion : function(){

      var agent = window.navigator.userAgent;
      var version = "";
      if(qx.bom.client.Engine.__isOpera()){

        // Opera has a special versioning scheme, where the second part is combined
        // e.g. 8.54 which should be handled like 8.5.4 to be compatible to the
        // common versioning system used by other browsers
        if(/Opera[\s\/]([0-9]+)\.([0-9])([0-9]*)/.test(agent)){

          // opera >= 10 has as a first verison 9.80 and adds the proper version
          // in a separate "Version/" postfix
          // http://my.opera.com/chooseopera/blog/2009/05/29/changes-in-operas-user-agent-string-format
          if(agent.indexOf("Version/") != -1){

            var match = agent.match(/Version\/(\d+)\.(\d+)/);
            // ignore the first match, its the whole version string
            version = match[1] + "." + match[2].charAt(0) + "." + match[2].substring(1, match[2].length);
          } else {

            version = RegExp.$1 + "." + RegExp.$2;
            if(RegExp.$3 != ""){

              version += "." + RegExp.$3;
            };
          };
        };
      } else if(qx.bom.client.Engine.__isWebkit()){

        if(/AppleWebKit\/([^ ]+)/.test(agent)){

          version = RegExp.$1;
          // We need to filter these invalid characters
          var invalidCharacter = RegExp("[^\\.0-9]").exec(version);
          if(invalidCharacter){

            version = version.slice(0, invalidCharacter.index);
          };
        };
      } else if(qx.bom.client.Engine.__isGecko() || qx.bom.client.Engine.__isMaple()){

        // Parse "rv" section in user agent string
        if(/rv\:([^\);]+)(\)|;)/.test(agent)){

          version = RegExp.$1;
        };
      } else if(qx.bom.client.Engine.__isMshtml()){

        var isTrident = /Trident\/([^\);]+)(\)|;)/.test(agent);
        if(/MSIE\s+([^\);]+)(\)|;)/.test(agent)){

          version = RegExp.$1;
          // If the IE8 or IE9 is running in the compatibility mode, the MSIE value
          // is set to an older version, but we need the correct version. The only
          // way is to compare the trident version.
          if(version < 8 && isTrident){

            if(RegExp.$1 == "4.0"){

              version = "8.0";
            } else if(RegExp.$1 == "5.0"){

              version = "9.0";
            };
          };
        } else if(isTrident){

          // IE 11 dropped the "MSIE" string
          var match = /\brv\:(\d+?\.\d+?)\b/.exec(agent);
          if(match){

            version = match[1];
          };
        };
      } else {

        var failFunction = window.qxFail;
        if(failFunction && typeof failFunction === "function"){

          version = failFunction().FULLVERSION;
        } else {

          version = "1.9.0.0";
          qx.Bootstrap.warn("Unsupported client: " + agent + "! Assumed gecko version 1.9.0.0 (Firefox 3.0).");
        };
      };;;
      return version;
    },
    /**
     * Returns the name of the engine.
     *
     * @return {String} The name of the current engine.
     * @internal
     */
    getName : function(){

      var name;
      if(qx.bom.client.Engine.__isOpera()){

        name = "opera";
      } else if(qx.bom.client.Engine.__isWebkit()){

        name = "webkit";
      } else if(qx.bom.client.Engine.__isGecko() || qx.bom.client.Engine.__isMaple()){

        name = "gecko";
      } else if(qx.bom.client.Engine.__isMshtml()){

        name = "mshtml";
      } else {

        // check for the fallback
        var failFunction = window.qxFail;
        if(failFunction && typeof failFunction === "function"){

          name = failFunction().NAME;
        } else {

          name = "gecko";
          qx.Bootstrap.warn("Unsupported client: " + window.navigator.userAgent + "! Assumed gecko version 1.9.0.0 (Firefox 3.0).");
        };
      };;;
      return name;
    },
    /**
     * Internal helper for checking for opera (presto powered).
     *
     * Note that with opera >= 15 their engine switched to blink, so
     * things like "window.opera" don't work anymore or changed (e.g. user agent).
     *
     * @return {Boolean} true, if its opera (presto powered).
     */
    __isOpera : function(){

      return window.opera && Object.prototype.toString.call(window.opera) == "[object Opera]";
    },
    /**
     * Internal helper for checking for webkit.
     * @return {Boolean} true, if its webkit.
     */
    __isWebkit : function(){

      return window.navigator.userAgent.indexOf("AppleWebKit/") != -1;
    },
    /**
     * Internal helper for checking for Maple .
     * Maple is used in Samsung SMART TV 2010-2011 models. It's based on Gecko
     * engine 1.8.1.11.
     * @return {Boolean} true, if its maple.
     */
    __isMaple : function(){

      return window.navigator.userAgent.indexOf("Maple") != -1;
    },
    /**
     * Internal helper for checking for gecko.
     * @return {Boolean} true, if its gecko.
     */
    __isGecko : function(){

      return window.controllers && window.navigator.product === "Gecko" && window.navigator.userAgent.indexOf("Maple") == -1 && window.navigator.userAgent.indexOf("Trident") == -1;
    },
    /**
     * Internal helper to check for MSHTML.
     * @return {Boolean} true, if its MSHTML.
     */
    __isMshtml : function(){

      return window.navigator.cpuClass && (/MSIE\s+([^\);]+)(\)|;)/.test(window.navigator.userAgent) || /Trident\/\d+?\.\d+?/.test(window.navigator.userAgent));
    }
  },
  defer : function(statics){

    qx.core.Environment.add("engine.version", statics.getVersion);
    qx.core.Environment.add("engine.name", statics.getName);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */
/**
 * The main purpose of this class to hold all checks about ECMAScript.
 *
 * This class is used by {@link qx.core.Environment} and should not be used
 * directly. Please check its class comment for details how to use it.
 *
 * @internal
 */
qx.Bootstrap.define("qx.bom.client.EcmaScript", {
  statics : {
    /**
     * Returns the name of the Error object property that holds stack trace
     * information or null if the client does not provide any.
     *
     * @internal
     * @return {String|null} <code>stack</code>, <code>stacktrace</code> or
     * <code>null</code>
     */
    getStackTrace : function(){

      var propName;
      var e = new Error("e");
      propName = e.stack ? "stack" : e.stacktrace ? "stacktrace" : null;
      // only thrown errors have the stack property in IE10 and PhantomJS
      if(!propName){

        try{

          throw e;
        } catch(ex) {

          e = ex;
        };
      };
      return e.stacktrace ? "stacktrace" : e.stack ? "stack" : null;
    },
    /**
     * Checks if 'indexOf' is supported on the Array object.
     * @internal
     * @return {Boolean} <code>true</code>, if the method is available.
     */
    getArrayIndexOf : function(){

      return !!Array.prototype.indexOf;
    },
    /**
     * Checks if 'lastIndexOf' is supported on the Array object.
     * @internal
     * @return {Boolean} <code>true</code>, if the method is available.
     */
    getArrayLastIndexOf : function(){

      return !!Array.prototype.lastIndexOf;
    },
    /**
     * Checks if 'forEach' is supported on the Array object.
     * @internal
     * @return {Boolean} <code>true</code>, if the method is available.
     */
    getArrayForEach : function(){

      return !!Array.prototype.forEach;
    },
    /**
     * Checks if 'filter' is supported on the Array object.
     * @internal
     * @return {Boolean} <code>true</code>, if the method is available.
     */
    getArrayFilter : function(){

      return !!Array.prototype.filter;
    },
    /**
     * Checks if 'map' is supported on the Array object.
     * @internal
     * @return {Boolean} <code>true</code>, if the method is available.
     */
    getArrayMap : function(){

      return !!Array.prototype.map;
    },
    /**
     * Checks if 'some' is supported on the Array object.
     * @internal
     * @return {Boolean} <code>true</code>, if the method is available.
     */
    getArraySome : function(){

      return !!Array.prototype.some;
    },
    /**
     * Checks if 'every' is supported on the Array object.
     * @internal
     * @return {Boolean} <code>true</code>, if the method is available.
     */
    getArrayEvery : function(){

      return !!Array.prototype.every;
    },
    /**
     * Checks if 'reduce' is supported on the Array object.
     * @internal
     * @return {Boolean} <code>true</code>, if the method is available.
     */
    getArrayReduce : function(){

      return !!Array.prototype.reduce;
    },
    /**
     * Checks if 'reduceRight' is supported on the Array object.
     * @internal
     * @return {Boolean} <code>true</code>, if the method is available.
     */
    getArrayReduceRight : function(){

      return !!Array.prototype.reduceRight;
    },
    /**
     * Checks if 'toString' is supported on the Error object and
     * its working as expected.
     * @internal
     * @return {Boolean} <code>true</code>, if the method is available.
     */
    getErrorToString : function(){

      return typeof Error.prototype.toString == "function" && Error.prototype.toString() !== "[object Error]";
    },
    /**
     * Checks if 'bind' is supported on the Function object.
     * @internal
     * @return {Boolean} <code>true</code>, if the method is available.
     */
    getFunctionBind : function(){

      return typeof Function.prototype.bind === "function";
    },
    /**
     * Checks if 'keys' is supported on the Object object.
     * @internal
     * @return {Boolean} <code>true</code>, if the method is available.
     */
    getObjectKeys : function(){

      return !!Object.keys;
    },
    /**
     * Checks if 'now' is supported on the Date object.
     * @internal
     * @return {Boolean} <code>true</code>, if the method is available.
     */
    getDateNow : function(){

      return !!Date.now;
    },
    /**
     * Checks if 'trim' is supported on the String object.
     * @internal
     * @return {Boolean} <code>true</code>, if the method is available.
     */
    getStringTrim : function(){

      return typeof String.prototype.trim === "function";
    }
  },
  defer : function(statics){

    // array polyfill
    qx.core.Environment.add("ecmascript.array.indexof", statics.getArrayIndexOf);
    qx.core.Environment.add("ecmascript.array.lastindexof", statics.getArrayLastIndexOf);
    qx.core.Environment.add("ecmascript.array.foreach", statics.getArrayForEach);
    qx.core.Environment.add("ecmascript.array.filter", statics.getArrayFilter);
    qx.core.Environment.add("ecmascript.array.map", statics.getArrayMap);
    qx.core.Environment.add("ecmascript.array.some", statics.getArraySome);
    qx.core.Environment.add("ecmascript.array.every", statics.getArrayEvery);
    qx.core.Environment.add("ecmascript.array.reduce", statics.getArrayReduce);
    qx.core.Environment.add("ecmascript.array.reduceright", statics.getArrayReduceRight);
    // date polyfill
    qx.core.Environment.add("ecmascript.date.now", statics.getDateNow);
    // error bugfix
    qx.core.Environment.add("ecmascript.error.toString", statics.getErrorToString);
    qx.core.Environment.add("ecmascript.error.stacktrace", statics.getStackTrace);
    // function polyfill
    qx.core.Environment.add("ecmascript.function.bind", statics.getFunctionBind);
    // object polyfill
    qx.core.Environment.add("ecmascript.object.keys", statics.getObjectKeys);
    // string polyfill
    qx.core.Environment.add("ecmascript.string.trim", statics.getStringTrim);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * This class takes care of the normalization of the native 'Array' object.
 * Therefore it checks the availability of the following methods and appends
 * it, if not available. This means you can use the methods during
 * development in every browser. For usage samples, check out the attached links.
 *
 * *indexOf*:
 * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf">MDN documentation</a> |
 * <a href="http://es5.github.com/#x15.4.4.14">Annotated ES5 Spec</a>
 *
 * *lastIndexOf*:
 * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/lastIndexOf">MDN documentation</a> |
 * <a href="http://es5.github.com/#x15.4.4.15">Annotated ES5 Spec</a>
 *
 * *forEach*:
 * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/forEach">MDN documentation</a> |
 * <a href="http://es5.github.com/#x15.4.4.18">Annotated ES5 Spec</a>
 *
 * *filter*:
 * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/filter">MDN documentation</a> |
 * <a href="http://es5.github.com/#x15.4.4.20">Annotated ES5 Spec</a>
 *
 * *map*:
 * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/map">MDN documentation</a> |
 * <a href="http://es5.github.com/#x15.4.4.19">Annotated ES5 Spec</a>
 *
 * *some*:
 * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/some">MDN documentation</a> |
 * <a href="http://es5.github.com/#x15.4.4.17">Annotated ES5 Spec</a>
 *
 * *every*:
 * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/every">MDN documentation</a> |
 * <a href="http://es5.github.com/#x15.4.4.16">Annotated ES5 Spec</a>
 *
 * *reduce*:
 * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/reduce">MDN documentation</a> |
 * <a href="http://es5.github.com/#x15.4.4.21">Annotated ES5 Spec</a>
 *
 * *reduceRight*:
 * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/reduceRight">MDN documentation</a> |
 * <a href="http://es5.github.com/#x15.4.4.22">Annotated ES5 Spec</a>
 *
 * Here is a little sample of how to use <code>indexOf</code> e.g.
 * <pre class="javascript">var a = ["a", "b", "c"];
 * a.indexOf("b"); // returns 1</pre>
 *
 * @group (Polyfill)
 */
qx.Bootstrap.define("qx.lang.normalize.Array", {
  defer : function(){

    // fix indexOf
    if(!qx.core.Environment.get("ecmascript.array.indexof")){

      Array.prototype.indexOf = function(searchElement, fromIndex){

        if(fromIndex == null){

          fromIndex = 0;
        } else if(fromIndex < 0){

          fromIndex = Math.max(0, this.length + fromIndex);
        };
        for(var i = fromIndex;i < this.length;i++){

          if(this[i] === searchElement){

            return i;
          };
        };
        return -1;
      };
    };
    // lastIndexOf
    if(!qx.core.Environment.get("ecmascript.array.lastindexof")){

      Array.prototype.lastIndexOf = function(searchElement, fromIndex){

        if(fromIndex == null){

          fromIndex = this.length - 1;
        } else if(fromIndex < 0){

          fromIndex = Math.max(0, this.length + fromIndex);
        };
        for(var i = fromIndex;i >= 0;i--){

          if(this[i] === searchElement){

            return i;
          };
        };
        return -1;
      };
    };
    // forEach
    if(!qx.core.Environment.get("ecmascript.array.foreach")){

      Array.prototype.forEach = function(callback, obj){

        var l = this.length;
        for(var i = 0;i < l;i++){

          var value = this[i];
          if(value !== undefined){

            callback.call(obj || window, value, i, this);
          };
        };
      };
    };
    // filter
    if(!qx.core.Environment.get("ecmascript.array.filter")){

      Array.prototype.filter = function(callback, obj){

        var res = [];
        var l = this.length;
        for(var i = 0;i < l;i++){

          var value = this[i];
          if(value !== undefined){

            if(callback.call(obj || window, value, i, this)){

              res.push(this[i]);
            };
          };
        };
        return res;
      };
    };
    // map
    if(!qx.core.Environment.get("ecmascript.array.map")){

      Array.prototype.map = function(callback, obj){

        var res = [];
        var l = this.length;
        for(var i = 0;i < l;i++){

          var value = this[i];
          if(value !== undefined){

            res[i] = callback.call(obj || window, value, i, this);
          };
        };
        return res;
      };
    };
    // some
    if(!qx.core.Environment.get("ecmascript.array.some")){

      Array.prototype.some = function(callback, obj){

        var l = this.length;
        for(var i = 0;i < l;i++){

          var value = this[i];
          if(value !== undefined){

            if(callback.call(obj || window, value, i, this)){

              return true;
            };
          };
        };
        return false;
      };
    };
    // every
    if(!qx.core.Environment.get("ecmascript.array.every")){

      Array.prototype.every = function(callback, obj){

        var l = this.length;
        for(var i = 0;i < l;i++){

          var value = this[i];
          if(value !== undefined){

            if(!callback.call(obj || window, value, i, this)){

              return false;
            };
          };
        };
        return true;
      };
    };
    // reduce
    if(!qx.core.Environment.get("ecmascript.array.reduce")){

      Array.prototype.reduce = function(callback, init){

        if(typeof callback !== "function"){

          throw new TypeError("First argument is not callable");
        };
        if(init === undefined && this.length === 0){

          throw new TypeError("Length is 0 and no second argument given");
        };
        var ret = init === undefined ? this[0] : init;
        for(var i = init === undefined ? 1 : 0;i < this.length;i++){

          if(i in this){

            ret = callback.call(undefined, ret, this[i], i, this);
          };
        };
        return ret;
      };
    };
    // reduceRight
    if(!qx.core.Environment.get("ecmascript.array.reduceright")){

      Array.prototype.reduceRight = function(callback, init){

        if(typeof callback !== "function"){

          throw new TypeError("First argument is not callable");
        };
        if(init === undefined && this.length === 0){

          throw new TypeError("Length is 0 and no second argument given");
        };
        var ret = init === undefined ? this[this.length - 1] : init;
        for(var i = init === undefined ? this.length - 2 : this.length - 1;i >= 0;i--){

          if(i in this){

            ret = callback.call(undefined, ret, this[i], i, this);
          };
        };
        return ret;
      };
    };
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Fabian Jakobs (fjakobs)

   ======================================================================

   This class uses ideas and code snipplets presented at
   http://webreflection.blogspot.com/2008/05/habemus-array-unlocked-length-in-ie8.html
   http://webreflection.blogspot.com/2008/05/stack-and-arrayobject-how-to-create.html

   Author:
     Andrea Giammarchi

   License:
     MIT: http://www.opensource.org/licenses/mit-license.php

   ======================================================================

   This class uses documentation of the native Array methods from the MDC
   documentation of Mozilla.

   License:
     CC Attribution-Sharealike License:
     http://creativecommons.org/licenses/by-sa/2.5/

************************************************************************ */
/**
 * This class is the common superclass for most array classes in
 * qooxdoo. It supports all of the shiny 1.6 JavaScript array features
 * like <code>forEach</code> and <code>map</code>.
 *
 * This class may be instantiated instead of the native Array if
 * one wants to work with a feature-unified Array instead of the native
 * one. This class uses native features whereever possible but fills
 * all missing implementations with custom ones.
 *
 * Through the ability to extend from this class one could add even
 * more utility features on top of it.
 *
 * @require(qx.bom.client.Engine)
 * @require(qx.lang.normalize.Array)
 */
qx.Bootstrap.define("qx.type.BaseArray", {
  extend : Array,
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  /**
   * Creates a new Array with the given length or the listed elements.
   *
   * <pre class="javascript">
   * var arr1 = new qx.type.BaseArray(arrayLength);
   * var arr2 = new qx.type.BaseArray(item0, item1, ..., itemN);
   * </pre>
   *
   * * <code>arrayLength</code>: The initial length of the array. You can access
   * this value using the length property. If the value specified is not a
   * number, an array of length 1 is created, with the first element having
   * the specified value. The maximum length allowed for an
   * array is 2^32-1, i.e. 4,294,967,295.
   * * <code>itemN</code>:  A value for the element in that position in the
   * array. When this form is used, the array is initialized with the specified
   * values as its elements, and the array's length property is set to the
   * number of arguments.
   *
   * @param length_or_items {Integer|var?null} The initial length of the array
   *        OR an argument list of values.
   */
  construct : function(length_or_items){
  },
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members : {
    /**
     * Converts a base array to a native Array
     *
     * @signature function()
     * @return {Array} The native array
     */
    toArray : null,
    /**
     * Returns the current number of items stored in the Array
     *
     * @signature function()
     * @return {Integer} number of items
     */
    valueOf : null,
    /**
     * Removes the last element from an array and returns that element.
     *
     * This method modifies the array.
     *
     * @signature function()
     * @return {var} The last element of the array.
     */
    pop : null,
    /**
     * Adds one or more elements to the end of an array and returns the new length of the array.
     *
     * This method modifies the array.
     *
     * @signature function(varargs)
     * @param varargs {var} The elements to add to the end of the array.
     * @return {Integer} The new array's length
     */
    push : null,
    /**
     * Reverses the order of the elements of an array -- the first becomes the last, and the last becomes the first.
     *
     * This method modifies the array.
     *
     * @signature function()
     * @return {Array} Returns the modified array (works in place)
     */
    reverse : null,
    /**
     * Removes the first element from an array and returns that element.
     *
     * This method modifies the array.
     *
     * @signature function()
     * @return {var} The first element of the array.
     */
    shift : null,
    /**
     * Sorts the elements of an array.
     *
     * This method modifies the array.
     *
     * @signature function(compareFunction)
     * @param compareFunction {Function?null} Specifies a function that defines the sort order. If omitted,
     *   the array is sorted lexicographically (in dictionary order) according to the string conversion of each element.
     * @return {Array} Returns the modified array (works in place)
     */
    sort : null,
    /**
     * Adds and/or removes elements from an array.
     *
     * @signature function(index, howMany, varargs)
     * @param index {Integer} Index at which to start changing the array. If negative, will begin
     *   that many elements from the end.
     * @param howMany {Integer} An integer indicating the number of old array elements to remove.
     *   If <code>howMany</code> is 0, no elements are removed. In this case, you should specify
     *   at least one new element.
     * @param varargs {var?null} The elements to add to the array. If you don't specify any elements,
     *   splice simply removes elements from the array.
     * @return {BaseArray} New array with the removed elements.
     */
    splice : null,
    /**
     * Adds one or more elements to the front of an array and returns the new length of the array.
     *
     * This method modifies the array.
     *
     * @signature function(varargs)
     * @param varargs {var} The elements to add to the front of the array.
     * @return {Integer} The new array's length
     */
    unshift : null,
    /**
     * Returns a new array comprised of this array joined with other array(s) and/or value(s).
     *
     * This method does not modify the array and returns a modified copy of the original.
     *
     * @signature function(varargs)
     * @param varargs {Array|var} Arrays and/or values to concatenate to the resulting array.
     * @return {qx.type.BaseArray} New array built of the given arrays or values.
     */
    concat : null,
    /**
     * Joins all elements of an array into a string.
     *
     * @signature function(separator)
     * @param separator {String} Specifies a string to separate each element of the array. The separator is
     *   converted to a string if necessary. If omitted, the array elements are separated with a comma.
     * @return {String} The stringified values of all elements divided by the given separator.
     */
    join : null,
    /**
     * Extracts a section of an array and returns a new array.
     *
     * @signature function(begin, end)
     * @param begin {Integer} Zero-based index at which to begin extraction. As a negative index, start indicates
     *   an offset from the end of the sequence. slice(-2) extracts the second-to-last element and the last element
     *   in the sequence.
     * @param end {Integer?length} Zero-based index at which to end extraction. slice extracts up to but not including end.
     *   <code>slice(1,4)</code> extracts the second element through the fourth element (elements indexed 1, 2, and 3).
     *   As a negative index, end indicates an offset from the end of the sequence. slice(2,-1) extracts the third element through the second-to-last element in the sequence.
     *   If end is omitted, slice extracts to the end of the sequence.
     * @return {BaseArray} An new array which contains a copy of the given region.
     */
    slice : null,
    /**
     * Returns a string representing the array and its elements. Overrides the Object.prototype.toString method.
     *
     * @signature function()
     * @return {String} The string representation of the array.
     */
    toString : null,
    /**
     * Returns the first (least) index of an element within the array equal to the specified value, or -1 if none is found.
     *
     * @signature function(searchElement, fromIndex)
     * @param searchElement {var} Element to locate in the array.
     * @param fromIndex {Integer?0} The index at which to begin the search. Defaults to 0, i.e. the
     *   whole array will be searched. If the index is greater than or equal to the length of the
     *   array, -1 is returned, i.e. the array will not be searched. If negative, it is taken as
     *   the offset from the end of the array. Note that even when the index is negative, the array
     *   is still searched from front to back. If the calculated index is less than 0, the whole
     *   array will be searched.
     * @return {Integer} The index of the given element
     */
    indexOf : null,
    /**
     * Returns the last (greatest) index of an element within the array equal to the specified value, or -1 if none is found.
     *
     * @signature function(searchElement, fromIndex)
     * @param searchElement {var} Element to locate in the array.
     * @param fromIndex {Integer?length} The index at which to start searching backwards. Defaults to
     *   the array's length, i.e. the whole array will be searched. If the index is greater than
     *   or equal to the length of the array, the whole array will be searched. If negative, it
     *   is taken as the offset from the end of the array. Note that even when the index is
     *   negative, the array is still searched from back to front. If the calculated index is
     *   less than 0, -1 is returned, i.e. the array will not be searched.
     * @return {Integer} The index of the given element
     */
    lastIndexOf : null,
    /**
     * Executes a provided function once per array element.
     *
     * <code>forEach</code> executes the provided function (<code>callback</code>) once for each
     * element present in the array.  <code>callback</code> is invoked only for indexes of the array
     * which have assigned values; it is not invoked for indexes which have been deleted or which
     * have never been assigned values.
     *
     * <code>callback</code> is invoked with three arguments: the value of the element, the index
     * of the element, and the Array object being traversed.
     *
     * If a <code>obj</code> parameter is provided to <code>forEach</code>, it will be used
     * as the <code>this</code> for each invocation of the <code>callback</code>.  If it is not
     * provided, or is <code>null</code>, the global object associated with <code>callback</code>
     * is used instead.
     *
     * <code>forEach</code> does not mutate the array on which it is called.
     *
     * The range of elements processed by <code>forEach</code> is set before the first invocation of
     * <code>callback</code>.  Elements which are appended to the array after the call to
     * <code>forEach</code> begins will not be visited by <code>callback</code>. If existing elements
     * of the array are changed, or deleted, their value as passed to <code>callback</code> will be
     * the value at the time <code>forEach</code> visits them; elements that are deleted are not visited.
     *
     * @signature function(callback, obj)
     * @param callback {Function} Function to execute for each element.
     * @param obj {Object} Object to use as this when executing callback.
     */
    forEach : null,
    /**
     * Creates a new array with all elements that pass the test implemented by the provided
     * function.
     *
     * <code>filter</code> calls a provided <code>callback</code> function once for each
     * element in an array, and constructs a new array of all the values for which
     * <code>callback</code> returns a true value.  <code>callback</code> is invoked only
     * for indexes of the array which have assigned values; it is not invoked for indexes
     * which have been deleted or which have never been assigned values.  Array elements which
     * do not pass the <code>callback</code> test are simply skipped, and are not included
     * in the new array.
     *
     * <code>callback</code> is invoked with three arguments: the value of the element, the
     * index of the element, and the Array object being traversed.
     *
     * If a <code>obj</code> parameter is provided to <code>filter</code>, it will
     * be used as the <code>this</code> for each invocation of the <code>callback</code>.
     * If it is not provided, or is <code>null</code>, the global object associated with
     * <code>callback</code> is used instead.
     *
     * <code>filter</code> does not mutate the array on which it is called. The range of
     * elements processed by <code>filter</code> is set before the first invocation of
     * <code>callback</code>. Elements which are appended to the array after the call to
     * <code>filter</code> begins will not be visited by <code>callback</code>. If existing
     * elements of the array are changed, or deleted, their value as passed to <code>callback</code>
     * will be the value at the time <code>filter</code> visits them; elements that are deleted
     * are not visited.
     *
     * @signature function(callback, obj)
     * @param callback {Function} Function to test each element of the array.
     * @param obj {Object} Object to use as <code>this</code> when executing <code>callback</code>.
     * @return {BaseArray} The newly created array with all matching elements
     */
    filter : null,
    /**
     * Creates a new array with the results of calling a provided function on every element in this array.
     *
     * <code>map</code> calls a provided <code>callback</code> function once for each element in an array,
     * in order, and constructs a new array from the results.  <code>callback</code> is invoked only for
     * indexes of the array which have assigned values; it is not invoked for indexes which have been
     * deleted or which have never been assigned values.
     *
     * <code>callback</code> is invoked with three arguments: the value of the element, the index of the
     * element, and the Array object being traversed.
     *
     * If a <code>obj</code> parameter is provided to <code>map</code>, it will be used as the
     * <code>this</code> for each invocation of the <code>callback</code>. If it is not provided, or is
     * <code>null</code>, the global object associated with <code>callback</code> is used instead.
     *
     * <code>map</code> does not mutate the array on which it is called.
     *
     * The range of elements processed by <code>map</code> is set before the first invocation of
     * <code>callback</code>. Elements which are appended to the array after the call to <code>map</code>
     * begins will not be visited by <code>callback</code>.  If existing elements of the array are changed,
     * or deleted, their value as passed to <code>callback</code> will be the value at the time
     * <code>map</code> visits them; elements that are deleted are not visited.
     *
     * @signature function(callback, obj)
     * @param callback {Function} Function produce an element of the new Array from an element of the current one.
     * @param obj {Object} Object to use as <code>this</code> when executing <code>callback</code>.
     * @return {BaseArray} A new array which contains the return values of every item executed through the given function
     */
    map : null,
    /**
     * Tests whether some element in the array passes the test implemented by the provided function.
     *
     * <code>some</code> executes the <code>callback</code> function once for each element present in
     * the array until it finds one where <code>callback</code> returns a true value. If such an element
     * is found, <code>some</code> immediately returns <code>true</code>. Otherwise, <code>some</code>
     * returns <code>false</code>. <code>callback</code> is invoked only for indexes of the array which
     * have assigned values; it is not invoked for indexes which have been deleted or which have never
     * been assigned values.
     *
     * <code>callback</code> is invoked with three arguments: the value of the element, the index of the
     * element, and the Array object being traversed.
     *
     * If a <code>obj</code> parameter is provided to <code>some</code>, it will be used as the
     * <code>this</code> for each invocation of the <code>callback</code>. If it is not provided, or is
     * <code>null</code>, the global object associated with <code>callback</code> is used instead.
     *
     * <code>some</code> does not mutate the array on which it is called.
     *
     * The range of elements processed by <code>some</code> is set before the first invocation of
     * <code>callback</code>.  Elements that are appended to the array after the call to <code>some</code>
     * begins will not be visited by <code>callback</code>. If an existing, unvisited element of the array
     * is changed by <code>callback</code>, its value passed to the visiting <code>callback</code> will
     * be the value at the time that <code>some</code> visits that element's index; elements that are
     * deleted are not visited.
     *
     * @signature function(callback, obj)
     * @param callback {Function} Function to test for each element.
     * @param obj {Object} Object to use as <code>this</code> when executing <code>callback</code>.
     * @return {Boolean} Whether at least one elements passed the test
     */
    some : null,
    /**
     * Tests whether all elements in the array pass the test implemented by the provided function.
     *
     * <code>every</code> executes the provided <code>callback</code> function once for each element
     * present in the array until it finds one where <code>callback</code> returns a false value. If
     * such an element is found, the <code>every</code> method immediately returns <code>false</code>.
     * Otherwise, if <code>callback</code> returned a true value for all elements, <code>every</code>
     * will return <code>true</code>.  <code>callback</code> is invoked only for indexes of the array
     * which have assigned values; it is not invoked for indexes which have been deleted or which have
     * never been assigned values.
     *
     * <code>callback</code> is invoked with three arguments: the value of the element, the index of
     * the element, and the Array object being traversed.
     *
     * If a <code>obj</code> parameter is provided to <code>every</code>, it will be used as
     * the <code>this</code> for each invocation of the <code>callback</code>. If it is not provided,
     * or is <code>null</code>, the global object associated with <code>callback</code> is used instead.
     *
     * <code>every</code> does not mutate the array on which it is called. The range of elements processed
     * by <code>every</code> is set before the first invocation of <code>callback</code>. Elements which
     * are appended to the array after the call to <code>every</code> begins will not be visited by
     * <code>callback</code>.  If existing elements of the array are changed, their value as passed
     * to <code>callback</code> will be the value at the time <code>every</code> visits them; elements
     * that are deleted are not visited.
     *
     * @signature function(callback, obj)
     * @param callback {Function} Function to test for each element.
     * @param obj {Object} Object to use as <code>this</code> when executing <code>callback</code>.
     * @return {Boolean} Whether all elements passed the test
     */
    every : null
  }
});
(function(){

  function createStackConstructor(stack){

    // In IE don't inherit from Array but use an empty object as prototype
    // and copy the methods from Array
    if((qx.core.Environment.get("engine.name") == "mshtml")){

      Stack.prototype = {
        length : 0,
        $$isArray : true
      };
      var args = "pop.push.reverse.shift.sort.splice.unshift.join.slice".split(".");
      for(var length = args.length;length;){

        Stack.prototype[args[--length]] = Array.prototype[args[length]];
      };
    };
    // Remember Array's slice method
    var slice = Array.prototype.slice;
    // Fix "concat" method
    Stack.prototype.concat = function(){

      var constructor = this.slice(0);
      for(var i = 0,length = arguments.length;i < length;i++){

        var copy;
        if(arguments[i] instanceof Stack){

          copy = slice.call(arguments[i], 0);
        } else if(arguments[i] instanceof Array){

          copy = arguments[i];
        } else {

          copy = [arguments[i]];
        };
        constructor.push.apply(constructor, copy);
      };
      return constructor;
    };
    // Fix "toString" method
    Stack.prototype.toString = function(){

      return slice.call(this, 0).toString();
    };
    // Fix "toLocaleString"
    Stack.prototype.toLocaleString = function(){

      return slice.call(this, 0).toLocaleString();
    };
    // Fix constructor
    Stack.prototype.constructor = Stack;
    // Add JS 1.6 Array features
    Stack.prototype.indexOf = Array.prototype.indexOf;
    Stack.prototype.lastIndexOf = Array.prototype.lastIndexOf;
    Stack.prototype.forEach = Array.prototype.forEach;
    Stack.prototype.some = Array.prototype.some;
    Stack.prototype.every = Array.prototype.every;
    var filter = Array.prototype.filter;
    var map = Array.prototype.map;
    // Fix methods which generates a new instance
    // to return an instance of the same class
    Stack.prototype.filter = function(){

      var ret = new this.constructor;
      ret.push.apply(ret, filter.apply(this, arguments));
      return ret;
    };
    Stack.prototype.map = function(){

      var ret = new this.constructor;
      ret.push.apply(ret, map.apply(this, arguments));
      return ret;
    };
    Stack.prototype.slice = function(){

      var ret = new this.constructor;
      ret.push.apply(ret, Array.prototype.slice.apply(this, arguments));
      return ret;
    };
    Stack.prototype.splice = function(){

      var ret = new this.constructor;
      ret.push.apply(ret, Array.prototype.splice.apply(this, arguments));
      return ret;
    };
    // Add new "toArray" method for convert a base array to a native Array
    Stack.prototype.toArray = function(){

      return Array.prototype.slice.call(this, 0);
    };
    // Add valueOf() to return the length
    Stack.prototype.valueOf = function(){

      return this.length;
    };
    // Return final class
    return Stack;
  };
  function Stack(length){

    if(arguments.length === 1 && typeof length === "number"){

      this.length = -1 < length && length === length >> .5 ? length : this.push(length);
    } else if(arguments.length){

      this.push.apply(this, arguments);
    };
  };
  function PseudoArray(){
  };
  PseudoArray.prototype = [];
  Stack.prototype = new PseudoArray;
  Stack.prototype.length = 0;
  qx.type.BaseArray = createStackConstructor(Stack);
})();

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * The Core module's responsibility is to query the DOM for elements and offer
 * these elements as a collection. The Core module itself does not offer any methods to
 * work with the collection. These methods are added by the other included modules,
 * such as Manipulating or Attributes.
 *
 * Core also provides the plugin API which allows modules to attach either
 * static functions to the global <code>q</code> object or define methods on the
 * collection it returns.
 *
 * By default, the core module is assigned to a global module named <code>q</code>.
 * In case <code>q</code> is already defined, the name <code>qxWeb</code>
 * is used instead.
 *
 * For further details, take a look at the documentation in the
 * <a href='http://manual.qooxdoo.org/${qxversion}/pages/website.html' target='_blank'>user manual</a>.
 *
 * @ignore(q)
 *
 * @group (Core)
 */
qx.Bootstrap.define("qxWeb", {
  extend : qx.type.BaseArray,
  statics : {
    // internal storage for all initializers
    __init : [],
    // internal reference to the used qx namespace
    $$qx : qx,
    /**
     * Internal helper to initialize collections.
     *
     * @param arg {var} An array of Elements which will
     *   be initialized as {@link q}. All items in the array which are not
     *   either a window object, a DOM element node or a DOM document node will
     *   be ignored.
     * @param clazz {Class} The class of the new collection.
     * @return {q} A new initialized collection.
     */
    $init : function(arg, clazz){

      var clean = [];
      for(var i = 0;i < arg.length;i++){

        // check for node or window object
        var isNode = !!(arg[i] && (arg[i].nodeType === 1 || arg[i].nodeType === 9));
        if(isNode){

          clean.push(arg[i]);
          continue;
        };
        var isWindow = !!(arg[i] && arg[i].history && arg[i].location && arg[i].document);
        if(isWindow){

          clean.push(arg[i]);
        };
      };
      if(arg[0] && arg[0].getAttribute && arg[0].getAttribute("data-qx-class")){

        clazz = qx.Bootstrap.getByName(arg[0].getAttribute("data-qx-class")) || clazz;
      };
      var col = qx.lang.Array.cast(clean, clazz);
      for(var i = 0;i < qxWeb.__init.length;i++){

        qxWeb.__init[i].call(col);
      };
      return col;
    },
    /**
     * This is an API for module development and can be used to attach new methods
     * to {@link q}.
     *
     * @param module {Map} A map containing the methods to attach.
     */
    $attach : function(module){

      for(var name in module){

        if(qx.core.Environment.get("qx.debug")){

          if(qxWeb.prototype[name] != undefined && Array.prototype[name] == undefined){

            throw new Error("Method '" + name + "' already available.");
          };
        };
        qxWeb.prototype[name] = module[name];
      };
    },
    /**
     * This is an API for module development and can be used to attach new methods
     * to {@link q}.
     *
     * @param module {Map} A map containing the methods to attach.
     */
    $attachStatic : function(module){

      for(var name in module){

        if(qx.core.Environment.get("qx.debug")){

          if(qxWeb[name] != undefined){

            throw new Error("Method '" + name + "' already available as static method.");
          };
        };
        qxWeb[name] = module[name];
      };
    },
    /**
     * This is an API for module development and can be used to attach new initialization
     * methods to {@link q} which will be called when a new collection is
     * created.
     *
     * @param init {Function} The initialization method for a module.
     */
    $attachInit : function(init){

      this.__init.push(init);
    },
    /**
     * Define a new class using the qooxdoo class system.
     *
     * @param name {String?} Name of the class. If null, the class will not be
     *   attached to a namespace.
     * @param config {Map ? null} Class definition structure. The configuration map has the following keys:
     *     <table>
     *       <thead>
     *         <tr><th>Name</th><th>Type</th><th>Description</th></tr>
     *       </thead>
     *       <tr><td>extend</td><td>Class</td><td>The super class the current class inherits from.</td></tr>
     *       <tr><td>construct</td><td>Function</td><td>The constructor of the class.</td></tr>
     *       <tr><td>statics</td><td>Map</td><td>Map of static values / functions of the class.</td></tr>
     *       <tr><td>members</td><td>Map</td><td>Map of instance members of the class.</td></tr>
     *       <tr><td>defer</td><td>Function</td><td>Function that is called at the end of
     *          processing the class declaration.</td></tr>
     *     </table>
     * @return {Function} The defined class.
     */
    define : function(name, config){

      if(config == undefined){

        config = name;
        name = null;
      };
      return qx.Bootstrap.define.call(qx.Bootstrap, name, config);
    }
  },
  /**
   * Primary usage:
   * Accepts a selector string and returns a collection of found items. The optional context
   * element can be used to reduce the amount of found elements to children of the
   * context element. If the context object is a collection, its first item is used.
   *
   * Secondary usage:
   * Creates a collection from an existing DOM element, document node or window object
   * (or an Array containing any such objects)
   *
   * <a href="http://sizzlejs.com/" target="_blank">Sizzle</a> is used as selector engine.
   * Check out the <a href="https://github.com/jquery/sizzle/wiki/Sizzle-Home" target="_blank">documentation</a>
   * for more details.
   *
   * @param selector {String|Element|Document|Window|Array} Valid selector (CSS3 + extensions),
   *   window object, DOM element/document or Array of DOM Elements.
   * @param context {Element|q} Only the children of this element are considered.
   * @return {q} A collection of DOM elements.
   */
  construct : function(selector, context){

    if(!selector && this instanceof qxWeb){

      return this;
    };
    if(qx.Bootstrap.isString(selector)){

      if(context instanceof qxWeb){

        context = context[0];
      };
      selector = qx.bom.Selector.query(selector, context);
    } else if(!(qx.Bootstrap.isArray(selector))){

      selector = [selector];
    };
    return qxWeb.$init(selector, qxWeb);
  },
  members : {
    /**
     * Gets a new collection containing only those elements that passed the
     * given filter. This can be either a selector expression or a filter
     * function.
     *
     * @param selector {String|Function} Selector expression or filter function
     * @return {q} New collection containing the elements that passed the filter
     */
    filter : function(selector){

      if(qx.lang.Type.isFunction(selector)){

        return qxWeb.$init(Array.prototype.filter.call(this, selector), this.constructor);
      };
      return qxWeb.$init(qx.bom.Selector.matches(selector, this), this.constructor);
    },
    /**
     * Recreates a collection which is free of all duplicate elements from the original.
     *
     * @return {q} Returns a copy with no duplicates
     */
    unique : function(){

      var unique = qx.lang.Array.unique(this);
      return qxWeb.$init(unique, this.constructor);
    },
    /**
     * Returns a copy of the collection within the given range.
     *
     * @param begin {Number} The index to begin.
     * @param end {Number?} The index to end.
     * @return {q} A new collection containing a slice of the original collection.
     */
    slice : function(begin, end){

      // Old IEs return an empty array if the second argument is undefined
      // check 'end' explicit for "undefined" [BUG #7322]
      if(end !== undefined){

        return qxWeb.$init(Array.prototype.slice.call(this, begin, end), this.constructor);
      };
      return qxWeb.$init(Array.prototype.slice.call(this, begin), this.constructor);
    },
    /**
     * Removes the given number of items and returns the removed items as a new collection.
     * This method can also add items. Take a look at the
     * <a href='https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/splice' target='_blank'>documentation of MDN</a> for more details.
     *
     * @param index {Number} The index to begin.
     * @param howMany {Number} the amount of items to remove.
     * @param varargs {var} As many items as you want to add.
     * @return {q} A new collection containing the removed items.
     */
    splice : function(index, howMany, varargs){

      return qxWeb.$init(Array.prototype.splice.apply(this, arguments), this.constructor);
    },
    /**
     * Returns a new collection containing the modified elements. For more details, check out the
     * <a href='https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/map' target='_blank'>MDN documentation</a>.
     *
     * @param callback {Function} Function which produces the new element.
     * @param thisarg {var} Context of the callback.
     * @return {q} New collection containing the elements that passed the filter
     */
    map : function(callback, thisarg){

      return qxWeb.$init(Array.prototype.map.apply(this, arguments), this.constructor);
    },
    /**
     * Returns a copy of the collection including the given elements.
     *
     * @param varargs {var} As many items as you want to add.
     * @return {q} A new collection containing all items.
     */
    concat : function(varargs){

      var clone = Array.prototype.slice.call(this, 0);
      for(var i = 0;i < arguments.length;i++){

        if(arguments[i] instanceof qxWeb){

          clone = clone.concat(Array.prototype.slice.call(arguments[i], 0));
        } else {

          clone.push(arguments[i]);
        };
      };
      return qxWeb.$init(clone, this.constructor);
    },
    /**
     * Returns the index of the given element within the current
     * collection or -1 if the element is not in the collection
     * @param elem {Element|Element[]|qxWeb} Element or collection of elements
     * @return {Number} The element's index
     */
    indexOf : function(elem){

      if(!elem){

        return -1;
      };
      if(qx.Bootstrap.isArray(elem)){

        elem = elem[0];
      };
      for(var i = 0,l = this.length;i < l;i++){

        if(this[i] === elem){

          return i;
        };
      };
      return -1;
    },
    /**
     * Calls the browser's native debugger to easily allow debugging within
     * chained calls.
     *
     * @return {q} The collection for chaining
     * @ignore(debugger)
     */
    debug : function(){

      debugger;
      return this;
    },
    /**
     * Calls a function for each DOM element node in the collection. This is used
     * for DOM manipulations which can't be applied to document nodes or window
     * objects.
     *
     * @param func {Function} Callback function. Will be called with three arguments:
     * The element, the element's index within the collection and the collection itself.
     * @param ctx {Object} The context for the callback function (default: The collection)
     * @return {q} The collection for chaining
     */
    _forEachElement : function(func, ctx){

      for(var i = 0,l = this.length;i < l;i++){

        if(this[i] && this[i].nodeType === 1){

          func.apply(ctx || this, [this[i], i, this]);
        };
      };
      return this;
    },
    /**
     * Calls a function for each DOM element node in the collection. Each node is wrapped
     * in a collection before the function is called.
     *
     * @param func {Function} Callback function. Will be called with three arguments:
     * The element wrappend in a collection, the element's index within the collection and
     * the collection itself.
     * @param ctx {Object} The context for the callback function (default: The collection)
     * @return {q} The collection for chaining
     */
    _forEachElementWrapped : function(func, ctx){

      this._forEachElement(function(item, idx, arr){

        func.apply(this, [qxWeb(item), idx, arr]);
      }, ctx);
      return this;
    }
  },
  /**
   * @ignore(q)
   */
  defer : function(statics){

    if(window.q == undefined){

      q = statics;
    };
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * This class takes care of the normalization of the native 'Date' object.
 * Therefore it checks the availability of the following methods and appends
 * it, if not available. This means you can use the methods during
 * development in every browser. For usage samples, check out the attached links.
 *
 * *now*:
 * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/now">MDN documentation</a> |
 * <a href="http://es5.github.com/#x15.9.4.4">Annotated ES5 Spec</a>
 *
 * @group (Polyfill)
 */
qx.Bootstrap.define("qx.lang.normalize.Date", {
  defer : function(){

    // Date.now
    if(!qx.core.Environment.get("ecmascript.date.now")){

      Date.now = function(){

        return +new Date();
      };
    };
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

   ======================================================================

   This class contains code based on the following work:

   * jQuery
     http://jquery.com
     Version 1.3.1

     Copyright:
       2009 John Resig

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

************************************************************************ */
/**
 * Static helper functions for arrays with a lot of often used convenience
 * methods like <code>remove</code> or <code>contains</code>.
 *
 * The native JavaScript Array is not modified by this class. However,
 * there are modifications to the native Array in {@link qx.lang.normalize.Array} for
 * browsers that do not support certain JavaScript features natively .
 *
 * @ignore(qx.data)
 * @ignore(qx.data.IListData)
 * @ignore(qx.Class.*)
 * @require(qx.lang.normalize.Date)
 */
qx.Bootstrap.define("qx.lang.Array", {
  statics : {
    /**
     * Converts an array like object to any other array like
     * object.
     *
     * Attention: The returned array may be same
     * instance as the incoming one if the constructor is identical!
     *
     * @param object {var} any array-like object
     * @param constructor {Function} constructor of the new instance
     * @param offset {Integer?0} position to start from
     * @return {Array} the converted array
     */
    cast : function(object, constructor, offset){

      if(object.constructor === constructor){

        return object;
      };
      if(qx.data && qx.data.IListData){

        if(qx.Class && qx.Class.hasInterface(object, qx.data.IListData)){

          var object = object.toArray();
        };
      };
      // Create from given constructor
      var ret = new constructor;
      // Some collections in mshtml are not able to be sliced.
      // These lines are a special workaround for this client.
      if((qx.core.Environment.get("engine.name") == "mshtml")){

        if(object.item){

          for(var i = offset || 0,l = object.length;i < l;i++){

            ret.push(object[i]);
          };
          return ret;
        };
      };
      // Copy over items
      if(Object.prototype.toString.call(object) === "[object Array]" && offset == null){

        ret.push.apply(ret, object);
      } else {

        ret.push.apply(ret, Array.prototype.slice.call(object, offset || 0));
      };
      return ret;
    },
    /**
     * Convert an arguments object into an array.
     *
     * @param args {arguments} arguments object
     * @param offset {Integer?0} position to start from
     * @return {Array} a newly created array (copy) with the content of the arguments object.
     */
    fromArguments : function(args, offset){

      return Array.prototype.slice.call(args, offset || 0);
    },
    /**
     * Convert a (node) collection into an array
     *
     * @param coll {var} node collection
     * @return {Array} a newly created array (copy) with the content of the node collection.
     */
    fromCollection : function(coll){

      // The native Array.slice cannot be used with some Array-like objects
      // including NodeLists in older IEs
      if((qx.core.Environment.get("engine.name") == "mshtml")){

        if(coll.item){

          var arr = [];
          for(var i = 0,l = coll.length;i < l;i++){

            arr[i] = coll[i];
          };
          return arr;
        };
      };
      return Array.prototype.slice.call(coll, 0);
    },
    /**
     * Insert an element into the array before a given second element.
     *
     * @param arr {Array} the array
     * @param obj {var} object to be inserted
     * @param obj2 {var} insert obj1 before this object
     * @return {Array} the array
     */
    insertBefore : function(arr, obj, obj2){

      var i = arr.indexOf(obj2);
      if(i == -1){

        arr.push(obj);
      } else {

        arr.splice(i, 0, obj);
      };
      return arr;
    },
    /**
     * Insert an element into the array after a given second element.
     *
     * @param arr {Array} the array
     * @param obj {var} object to be inserted
     * @param obj2 {var} insert obj1 after this object
     * @return {Array} the array
     */
    insertAfter : function(arr, obj, obj2){

      var i = arr.indexOf(obj2);
      if(i == -1 || i == (arr.length - 1)){

        arr.push(obj);
      } else {

        arr.splice(i + 1, 0, obj);
      };
      return arr;
    },
    /**
     * Remove an element from the array at the given index
     *
     * @param arr {Array} the array
     * @param i {Integer} index of the element to be removed
     * @return {var} The removed element.
     */
    removeAt : function(arr, i){

      return arr.splice(i, 1)[0];
    },
    /**
     * Remove all elements from the array
     *
     * @param arr {Array} the array
     * @return {Array} empty array
     */
    removeAll : function(arr){

      arr.length = 0;
      return this;
    },
    /**
     * Modifies the first array as it removes all elements
     * which are listed in the second array as well.
     *
     * @param arr1 {Array} the array
     * @param arr2 {Array} the elements of this array will be excluded from the other one
     * @return {Array} The modified array.
     * @throws {Error} if one of the arguments is not an array
     */
    exclude : function(arr1, arr2){

      // this check is important because opera throws an uncatchable error if apply is called without
      // an arr as second argument.
      if(qx.core.Environment.get("qx.debug")){

        qx.core.Assert && qx.core.Assert.assertArray(arr1, "The first parameter must be an array.");
        qx.core.Assert && qx.core.Assert.assertArray(arr2, "The second parameter must be an array.");
      };
      for(var i = 0,il = arr2.length,index;i < il;i++){

        index = arr1.indexOf(arr2[i]);
        if(index != -1){

          arr1.splice(index, 1);
        };
      };
      return arr1;
    },
    /**
     * Remove an element from the array.
     *
     * @param arr {Array} the array
     * @param obj {var} element to be removed from the array
     * @return {var} the removed element
     */
    remove : function(arr, obj){

      var i = arr.indexOf(obj);
      if(i != -1){

        arr.splice(i, 1);
        return obj;
      };
    },
    /**
     * Whether the array contains the given element
     *
     * @param arr {Array} the array
     * @param obj {var} object to look for
     * @return {Boolean} whether the arr contains the element
     */
    contains : function(arr, obj){

      return arr.indexOf(obj) !== -1;
    },
    /**
     * Check whether the two arrays have the same content. Checks only the
     * equality of the arrays' content.
     *
     * @param arr1 {Array} first array
     * @param arr2 {Array} second array
     * @return {Boolean} Whether the two arrays are equal
     */
    equals : function(arr1, arr2){

      var length = arr1.length;
      if(length !== arr2.length){

        return false;
      };
      for(var i = 0;i < length;i++){

        if(arr1[i] !== arr2[i]){

          return false;
        };
      };
      return true;
    },
    /**
     * Returns the highest value in the given array. Supports
     * numeric values only.
     *
     * @param arr {Number[]} Array to process
     * @return {Number | null} The highest of all values or undefined if array is empty.
     */
    max : function(arr){

      if(qx.core.Environment.get("qx.debug")){

        qx.core.Assert && qx.core.Assert.assertArray(arr, "Parameter must be an array.");
      };
      var i,len = arr.length,result = arr[0];
      for(i = 1;i < len;i++){

        if(arr[i] > result){

          result = arr[i];
        };
      };
      return result === undefined ? null : result;
    },
    /**
     * Returns the lowest value in the given array. Supports
     * numeric values only.
     *
     * @param arr {Number[]} Array to process
     * @return {Number | null} The lowest of all values or undefined if array is empty.
     */
    min : function(arr){

      if(qx.core.Environment.get("qx.debug")){

        qx.core.Assert && qx.core.Assert.assertArray(arr, "Parameter must be an array.");
      };
      var i,len = arr.length,result = arr[0];
      for(i = 1;i < len;i++){

        if(arr[i] < result){

          result = arr[i];
        };
      };
      return result === undefined ? null : result;
    },
    /**
     * Recreates an array which is free of all duplicate elements from the original.
     *
     * This method does not modify the original array!
     *
     * Keep in mind that this methods deletes undefined indexes.
     *
     * @param arr {Array} Incoming array
     * @return {Array} Returns a copy with no duplicates
     */
    unique : function(arr){

      var ret = [],doneStrings = {
      },doneNumbers = {
      },doneObjects = {
      };
      var value,count = 0;
      var key = "qx" + Date.now();
      var hasNull = false,hasFalse = false,hasTrue = false;
      // Rebuild array and omit duplicates
      for(var i = 0,len = arr.length;i < len;i++){

        value = arr[i];
        // Differ between null, primitives and reference types
        if(value === null){

          if(!hasNull){

            hasNull = true;
            ret.push(value);
          };
        } else if(value === undefined){
        } else if(value === false){

          if(!hasFalse){

            hasFalse = true;
            ret.push(value);
          };
        } else if(value === true){

          if(!hasTrue){

            hasTrue = true;
            ret.push(value);
          };
        } else if(typeof value === "string"){

          if(!doneStrings[value]){

            doneStrings[value] = 1;
            ret.push(value);
          };
        } else if(typeof value === "number"){

          if(!doneNumbers[value]){

            doneNumbers[value] = 1;
            ret.push(value);
          };
        } else {

          var hash = value[key];
          if(hash == null){

            hash = value[key] = count++;
          };
          if(!doneObjects[hash]){

            doneObjects[hash] = value;
            ret.push(value);
          };
        };;;;;
      };
      // Clear object hashs
      for(var hash in doneObjects){

        try{

          delete doneObjects[hash][key];
        } catch(ex) {

          try{

            doneObjects[hash][key] = null;
          } catch(ex1) {

            throw new Error("Cannot clean-up map entry doneObjects[" + hash + "][" + key + "]");
          };
        };
      };
      return ret;
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

   ======================================================================

   This class contains code based on the following work:

   * es5-shim

     Code:
       https://github.com/kriskowal/es5-shim/

     Copyright:
       (c) 2009, 2010 Kristopher Michael Kowal

     License:
       https://github.com/kriskowal/es5-shim/blob/master/LICENSE

   ----------------------------------------------------------------------

   Copyright 2009, 2010 Kristopher Michael Kowal. All rights reserved.
   Permission is hereby granted, free of charge, to any person obtaining a copy
   of this software and associated documentation files (the "Software"), to
   deal in the Software without restriction, including without limitation the
   rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
   sell copies of the Software, and to permit persons to whom the Software is
   furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in
   all copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
   FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
   IN THE SOFTWARE.

   ----------------------------------------------------------------------

   Version:
     Snapshot taken on 2012-07-25,:
     commit  9f539abd9aa9950e1d907077a4be7f5133a00e52

************************************************************************ */
/**
 * This class takes care of the normalization of the native 'Function' object.
 * Therefore it checks the availability of the following methods and appends
 * it, if not available. This means you can use the methods during
 * development in every browser. For usage samples, check out the attached links.
 *
 * *bind*:
 * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/bind">MDN documentation</a> |
 * <a href="http://es5.github.com/#x15.3.4.5">Annotated ES5 Spec</a>
 *
 * Example for the <code>bind</code> method:
 * <pre class='javascript'>
 * // sample code, assumes the used variables are already defined
 *
 * // the listener method demonstrates how to pass dynamic values
 * // to a method using 'bind'
 * var changeValueListener = function(value, event) {
 *   // value is passed by the 'bind' method: its value is 'myArray[i]'
 *   // second argument is passed by the 'on' method: its value is a event object
 *   // 'this' is pointing to 'myComponent', since the first argument of 'bind' defines the context of the function call
 * };
 * var myArray = [ 0, 2, 4, 6 ];
 * for (var i=0, j=myArray.length; i&lt;j; i++) {
 *   myComponent.on("changeValue", changeValueListener.bind(myComponent, myArray[i]));
 * }
 * </pre>
 *
 * @group (Polyfill)
 */
qx.Bootstrap.define("qx.lang.normalize.Function", {
  defer : function(){

    // bind
    if(!qx.core.Environment.get("ecmascript.function.bind")){

      var slice = Array.prototype.slice;
      Function.prototype.bind = function(that){

        // .length is 1
        // 1. Let Target be the this value.
        var target = this;
        // 2. If IsCallable(Target) is false, throw a TypeError exception.
        if(typeof target != "function"){

          throw new TypeError("Function.prototype.bind called on incompatible " + target);
        };
        // 3. Let A be a new (possibly empty) internal list of all of the
        //   argument values provided after thisArg (arg1, arg2 etc), in order.
        // XXX slicedArgs will stand in for "A" if used
        var args = slice.call(arguments, 1);
        // for normal call
        // 4. Let F be a new native ECMAScript object.
        // 11. Set the [[Prototype]] internal property of F to the standard
        //   built-in Function prototype object as specified in 15.3.3.1.
        // 12. Set the [[Call]] internal property of F as described in
        //   15.3.4.5.1.
        // 13. Set the [[Construct]] internal property of F as described in
        //   15.3.4.5.2.
        // 14. Set the [[HasInstance]] internal property of F as described in
        //   15.3.4.5.3.
        var bound = function(){

          if(this instanceof bound){

            // 15.3.4.5.2 [[Construct]]
            // When the [[Construct]] internal method of a function object,
            // F that was created using the bind function is called with a
            // list of arguments ExtraArgs, the following steps are taken:
            // 1. Let target be the value of F's [[TargetFunction]]
            //   internal property.
            // 2. If target has no [[Construct]] internal method, a
            //   TypeError exception is thrown.
            // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
            //   property.
            // 4. Let args be a new list containing the same values as the
            //   list boundArgs in the same order followed by the same
            //   values as the list ExtraArgs in the same order.
            // 5. Return the result of calling the [[Construct]] internal
            //   method of target providing args as the arguments.
            var F = function(){
            };
            F.prototype = target.prototype;
            var self = new F;
            var result = target.apply(self, args.concat(slice.call(arguments)));
            if(Object(result) === result){

              return result;
            };
            return self;
          } else {

            // 15.3.4.5.1 [[Call]]
            // When the [[Call]] internal method of a function object, F,
            // which was created using the bind function is called with a
            // this value and a list of arguments ExtraArgs, the following
            // steps are taken:
            // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
            //   property.
            // 2. Let boundThis be the value of F's [[BoundThis]] internal
            //   property.
            // 3. Let target be the value of F's [[TargetFunction]] internal
            //   property.
            // 4. Let args be a new list containing the same values as the
            //   list boundArgs in the same order followed by the same
            //   values as the list ExtraArgs in the same order.
            // 5. Return the result of calling the [[Call]] internal method
            //   of target providing boundThis as the this value and
            //   providing args as the arguments.
            // equiv: target.call(this, ...boundArgs, ...args)
            return target.apply(that, args.concat(slice.call(arguments)));
          };
        };
        // XXX bound.length is never writable, so don't even try
        //
        // 15. If the [[Class]] internal property of Target is "Function", then
        //     a. Let L be the length property of Target minus the length of A.
        //     b. Set the length own property of F to either 0 or L, whichever is
        //       larger.
        // 16. Else set the length own property of F to 0.
        // 17. Set the attributes of the length own property of F to the values
        //   specified in 15.3.5.1.
        // (Not implemented but in the spec)
        // 18. Set the [[Extensible]] internal property of F to true.
        // (Not implemented but in the spec)
        // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
        // 20. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
        //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
        //   false.
        // 21. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
        //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
        //   and false.
        // NOTE Function objects created using Function.prototype.bind do not
        // have a prototype property or the [[Code]], [[FormalParameters]], and
        // [[Scope]] internal properties.
        // XXX can't delete prototype in pure-js.
        // 22. Return F.
        return bound;
      };
    };
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

************************************************************************ */
/**
 * This class is used to define mixins (similar to mixins in Ruby).
 *
 * Mixins are collections of code and variables, which can be merged into
 * other classes. They are similar to classes but don't support inheritance.
 *
 * See the description of the {@link #define} method how a mixin is defined.
 *
 * @require(qx.lang.normalize.Array)
 */
qx.Bootstrap.define("qx.Mixin", {
  statics : {
    /*
    ---------------------------------------------------------------------------
       PUBLIC API
    ---------------------------------------------------------------------------
    */
    /**
     * Define a new mixin.
     *
     * Example:
     * <pre class='javascript'>
     * qx.Mixin.define("name",
     * {
     *   include: [SuperMixins],
     *
     *   properties: {
     *     tabIndex: {type: "number", init: -1}
     *   },
     *
     *   members:
     *   {
     *     prop1: "foo",
     *     meth1: function() {},
     *     meth2: function() {}
     *   }
     * });
     * </pre>
     *
     * @param name {String} name of the mixin
     * @param config {Map ? null} Mixin definition structure. The configuration map has the following keys:
     *   <table>
     *     <tr><th>Name</th><th>Type</th><th>Description</th></tr>
     *     <tr><th>construct</th><td>Function</td><td>An optional mixin constructor. It is called on instantiation each
     *         class including this mixin. The constructor takes no parameters.</td></tr>
     *     <tr><th>destruct</th><td>Function</td><td>An optional mixin destructor.</td></tr>
     *     <tr><th>include</th><td>Mixin[]</td><td>Array of mixins, which will be merged into the mixin.</td></tr>
     *     <tr><th>statics</th><td>Map</td><td>
     *         Map of statics of the mixin. The statics will not get copied into the target class. They remain
     *         accessible from the mixin. This is the same behaviour as statics in interfaces ({@link qx.Interface#define}).
     *     </td></tr>
     *     <tr><th>members</th><td>Map</td><td>Map of members of the mixin.</td></tr>
     *     <tr><th>properties</th><td>Map</td><td>Map of property definitions. For a description of the format of a property definition see
     *           {@link qx.core.Property}.</td></tr>
     *     <tr><th>events</th><td>Map</td><td>
     *         Map of events the mixin fires. The keys are the names of the events and the values are
     *         corresponding event type classes.
     *     </td></tr>
     *   </table>
     *
     * @return {qx.Mixin} The configured mixin
     */
    define : function(name, config){

      if(config){

        // Normalize include
        if(config.include && !(qx.Bootstrap.getClass(config.include) === "Array")){

          config.include = [config.include];
        };
        // Validate incoming data
        if(qx.core.Environment.get("qx.debug")){

          this.__validateConfig(name, config);
        };
        // Create Interface from statics
        var mixin = config.statics ? config.statics : {
        };
        qx.Bootstrap.setDisplayNames(mixin, name);
        for(var key in mixin){

          if(mixin[key] instanceof Function){

            mixin[key].$$mixin = mixin;
          };
        };
        // Attach configuration
        if(config.construct){

          mixin.$$constructor = config.construct;
          qx.Bootstrap.setDisplayName(config.construct, name, "constructor");
        };
        if(config.include){

          mixin.$$includes = config.include;
        };
        if(config.properties){

          mixin.$$properties = config.properties;
        };
        if(config.members){

          mixin.$$members = config.members;
          qx.Bootstrap.setDisplayNames(config.members, name + ".prototype");
        };
        for(var key in mixin.$$members){

          if(mixin.$$members[key] instanceof Function){

            mixin.$$members[key].$$mixin = mixin;
          };
        };
        if(config.events){

          mixin.$$events = config.events;
        };
        if(config.destruct){

          mixin.$$destructor = config.destruct;
          qx.Bootstrap.setDisplayName(config.destruct, name, "destruct");
        };
      } else {

        var mixin = {
        };
      };
      // Add basics
      mixin.$$type = "Mixin";
      mixin.name = name;
      // Attach toString
      mixin.toString = this.genericToString;
      // Assign to namespace
      mixin.basename = qx.Bootstrap.createNamespace(name, mixin);
      // Store class reference in global mixin registry
      this.$$registry[name] = mixin;
      // Return final mixin
      return mixin;
    },
    /**
     * Check compatibility between mixins (including their includes)
     *
     * @param mixins {Mixin[]} an array of mixins
     * @throws {Error} when there is a conflict between the mixins
     * @return {Boolean} <code>true</code> if the mixin passed the compatibilty check
     */
    checkCompatibility : function(mixins){

      var list = this.flatten(mixins);
      var len = list.length;
      if(len < 2){

        return true;
      };
      var properties = {
      };
      var members = {
      };
      var events = {
      };
      var mixin;
      for(var i = 0;i < len;i++){

        mixin = list[i];
        for(var key in mixin.events){

          if(events[key]){

            throw new Error('Conflict between mixin "' + mixin.name + '" and "' + events[key] + '" in member "' + key + '"!');
          };
          events[key] = mixin.name;
        };
        for(var key in mixin.properties){

          if(properties[key]){

            throw new Error('Conflict between mixin "' + mixin.name + '" and "' + properties[key] + '" in property "' + key + '"!');
          };
          properties[key] = mixin.name;
        };
        for(var key in mixin.members){

          if(members[key]){

            throw new Error('Conflict between mixin "' + mixin.name + '" and "' + members[key] + '" in member "' + key + '"!');
          };
          members[key] = mixin.name;
        };
      };
      return true;
    },
    /**
     * Generates a list of all mixins given plus all the
     * mixins these includes plus... (deep)
     *
     * @param mixins {Mixin[] ? []} List of mixins
     * @return {Array} List of all mixins
     */
    flatten : function(mixins){

      if(!mixins){

        return [];
      };
      // we need to create a copy and not to modify the existing array
      var list = mixins.concat();
      for(var i = 0,l = mixins.length;i < l;i++){

        if(mixins[i].$$includes){

          list.push.apply(list, this.flatten(mixins[i].$$includes));
        };
      };
      return list;
    },
    /*
    ---------------------------------------------------------------------------
       PRIVATE/INTERNAL API
    ---------------------------------------------------------------------------
    */
    /**
     * This method will be attached to all mixins to return
     * a nice identifier for them.
     *
     * @internal
     * @return {String} The mixin identifier
     */
    genericToString : function(){

      return "[Mixin " + this.name + "]";
    },
    /** Registers all defined mixins */
    $$registry : {
    },
    /** @type {Map} allowed keys in mixin definition */
    __allowedKeys : qx.core.Environment.select("qx.debug", {
      "true" : {
        "include" : "object",
        // Mixin | Mixin[]
        "statics" : "object",
        // Map
        "members" : "object",
        // Map
        "properties" : "object",
        // Map
        "events" : "object",
        // Map
        "destruct" : "function",
        // Function
        "construct" : "function"
      },
      "default" : null
    }),
    /**
     * Validates incoming configuration and checks keys and values
     *
     * @signature function(name, config)
     * @param name {String} The name of the class
     * @param config {Map} Configuration map
     */
    __validateConfig : qx.core.Environment.select("qx.debug", {
      "true" : function(name, config){

        // Validate keys
        var allowed = this.__allowedKeys;
        for(var key in config){

          if(!allowed[key]){

            throw new Error('The configuration key "' + key + '" in mixin "' + name + '" is not allowed!');
          };
          if(config[key] == null){

            throw new Error('Invalid key "' + key + '" in mixin "' + name + '"! The value is undefined/null!');
          };
          if(allowed[key] !== null && typeof config[key] !== allowed[key]){

            throw new Error('Invalid type of key "' + key + '" in mixin "' + name + '"! The type of the key must be "' + allowed[key] + '"!');
          };
        };
        // Validate maps
        var maps = ["statics", "members", "properties", "events"];
        for(var i = 0,l = maps.length;i < l;i++){

          var key = maps[i];
          if(config[key] !== undefined && (["Array", "RegExp", "Date"].indexOf(qx.Bootstrap.getClass(config[key])) != -1 || config[key].classname !== undefined)){

            throw new Error('Invalid key "' + key + '" in mixin "' + name + '"! The value needs to be a map!');
          };
        };
        // Validate includes
        if(config.include){

          for(var i = 0,a = config.include,l = a.length;i < l;i++){

            if(a[i] == null){

              throw new Error("Includes of mixins must be mixins. The include number '" + (i + 1) + "' in mixin '" + name + "'is undefined/null!");
            };
            if(a[i].$$type !== "Mixin"){

              throw new Error("Includes of mixins must be mixins. The include number '" + (i + 1) + "' in mixin '" + name + "'is not a mixin!");
            };
          };
          this.checkCompatibility(config.include);
        };
      },
      "default" : function(name, config){
      }
    })
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)
     * Andreas Ecker (ecker)

************************************************************************ */
/**
 * Basis for Aspect Oriented features in qooxdoo.
 *
 * This class makes it possible to attach functions (aspects) before or
 * after each function call of any function defined in {@link qx.Class#define}.
 *
 * Classes, which define own aspects must add an explicit require to this class
 * in the header comment using the following code:
 *
 * <pre>
 * &#35;require(qx.core.Aspect)
 * &#35;ignore(auto-require)
 * </pre>
 *
 * One example for a qooxdoo aspect is profiling ({@link qx.dev.Profile}).
 */
qx.Bootstrap.define("qx.core.Aspect", {
  statics : {
    /** @type {Array} Registry for all known aspect wishes */
    __registry : [],
    /**
     * This function is used by {@link qx.Class#define} to wrap all statics, members and
     * constructors.
     *
     * @param fullName {String} Full name of the function including the class name.
     * @param fcn {Function} function to wrap.
     * @param type {String} Type of the wrapped function. One of "member", "static",
     *          "constructor", "destructor" or "property".
     *
     * @return {Function} wrapped function
     */
    wrap : function(fullName, fcn, type){

      var before = [];
      var after = [];
      var reg = this.__registry;
      var entry;
      for(var i = 0;i < reg.length;i++){

        entry = reg[i];
        if((entry.type == null || type == entry.type || entry.type == "*") && (entry.name == null || fullName.match(entry.name))){

          entry.pos == -1 ? before.push(entry.fcn) : after.push(entry.fcn);
        };
      };
      if(before.length === 0 && after.length === 0){

        return fcn;
      };
      var wrapper = function(){

        for(var i = 0;i < before.length;i++){

          before[i].call(this, fullName, fcn, type, arguments);
        };
        var ret = fcn.apply(this, arguments);
        for(var i = 0;i < after.length;i++){

          after[i].call(this, fullName, fcn, type, arguments, ret);
        };
        return ret;
      };
      if(type !== "static"){

        wrapper.self = fcn.self;
        wrapper.base = fcn.base;
      };
      fcn.wrapper = wrapper;
      wrapper.original = fcn;
      return wrapper;
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * This class takes care of the normalization of the native 'String' object.
 * Therefore it checks the availability of the following methods and appends
 * it, if not available. This means you can use the methods during
 * development in every browser. For usage samples, check out the attached links.
 *
 * *trim*:
 * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/Trim">MDN documentation</a> |
 * <a href="http://es5.github.com/#x15.5.4.20">Annotated ES5 Spec</a>
 *
 * @group (Polyfill)
 */
qx.Bootstrap.define("qx.lang.normalize.String", {
  defer : function(){

    // trim
    if(!qx.core.Environment.get("ecmascript.string.trim")){

      String.prototype.trim = function(context){

        return this.replace(/^\s+|\s+$/g, '');
      };
    };
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * This class takes care of the normalization of the native 'Object' object.
 * Therefore it checks the availability of the following methods and appends
 * it, if not available. This means you can use the methods during
 * development in every browser. For usage samples, check out the attached links.
 *
 * *keys*:
 * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/keys">MDN documentation</a> |
 * <a href="http://es5.github.com/#x15.2.3.14">Annotated ES5 Spec</a>
 *
 * @group (Polyfill)
 */
qx.Bootstrap.define("qx.lang.normalize.Object", {
  defer : function(){

    // keys
    if(!qx.core.Environment.get("ecmascript.object.keys")){

      Object.keys = qx.Bootstrap.keys;
    };
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

************************************************************************ */
/**
 * This class is used to define interfaces (similar to Java interfaces).
 *
 * See the description of the {@link #define} method how an interface is
 * defined.
 *
 * @require(qx.lang.normalize.Array)
 */
qx.Bootstrap.define("qx.Interface", {
  statics : {
    /*
    ---------------------------------------------------------------------------
       PUBLIC API
    ---------------------------------------------------------------------------
    */
    /**
     * Define a new interface. Interface definitions look much like class definitions.
     *
     * The main difference is that the bodies of functions defined in <code>members</code>
     * and <code>statics</code> are called before the original function with the
     * same arguments. This can be used to check the passed arguments. If the
     * checks fail, an exception should be thrown. It is convenient to use the
     * method defined in {@link qx.core.MAssert} to check the arguments.
     *
     * In the <code>build</code> version the checks are omitted.
     *
     * For properties only the names are required so the value of the properties
     * can be empty maps.
     *
     * Example:
     * <pre class='javascript'>
     * qx.Interface.define("name",
     * {
     *   extend: [SuperInterfaces],
     *
     *   statics:
     *   {
     *     PI : 3.14
     *   },
     *
     *   properties: {"color": {}, "name": {} },
     *
     *   members:
     *   {
     *     meth1: function() {},
     *     meth2: function(a, b) { this.assertArgumentsCount(arguments, 2, 2); },
     *     meth3: function(c) { this.assertInterface(c.constructor, qx.some.Interface); }
     *   },
     *
     *   events :
     *   {
     *     keydown : "qx.event.type.KeySequence"
     *   }
     * });
     * </pre>
     *
     * @param name {String} name of the interface
     * @param config {Map ? null} Interface definition structure. The configuration map has the following keys:
     *   <table>
     *     <tr><th>Name</th><th>Type</th><th>Description</th></tr>
     *     <tr><th>extend</th><td>Interface |<br>Interface[]</td><td>Single interface or array of interfaces this interface inherits from.</td></tr>
     *     <tr><th>members</th><td>Map</td><td>Map of members of the interface.</td></tr>
     *     <tr><th>statics</th><td>Map</td><td>
     *         Map of statics of the interface. The statics will not get copied into the target class.
     *         This is the same behaviour as statics in mixins ({@link qx.Mixin#define}).
     *     </td></tr>
     *     <tr><th>properties</th><td>Map</td><td>Map of properties and their definitions.</td></tr>
     *     <tr><th>events</th><td>Map</td><td>Map of event names and the corresponding event class name.</td></tr>
     *   </table>
     *
     * @return {qx.Interface} The configured interface
     */
    define : function(name, config){

      if(config){

        // Normalize include
        if(config.extend && !(qx.Bootstrap.getClass(config.extend) === "Array")){

          config.extend = [config.extend];
        };
        // Validate incoming data
        if(qx.core.Environment.get("qx.debug")){

          this.__validateConfig(name, config);
        };
        // Create interface from statics
        var iface = config.statics ? config.statics : {
        };
        // Attach configuration
        if(config.extend){

          iface.$$extends = config.extend;
        };
        if(config.properties){

          iface.$$properties = config.properties;
        };
        if(config.members){

          iface.$$members = config.members;
        };
        if(config.events){

          iface.$$events = config.events;
        };
      } else {

        // Create empty interface
        var iface = {
        };
      };
      // Add Basics
      iface.$$type = "Interface";
      iface.name = name;
      // Attach toString
      iface.toString = this.genericToString;
      // Assign to namespace
      iface.basename = qx.Bootstrap.createNamespace(name, iface);
      // Add to registry
      qx.Interface.$$registry[name] = iface;
      // Return final interface
      return iface;
    },
    /**
     * Generates a list of all interfaces including their super interfaces
     * (resolved recursively)
     *
     * @param ifaces {Interface[] ? []} List of interfaces to be resolved
     * @return {Array} List of all interfaces
     */
    flatten : function(ifaces){

      if(!ifaces){

        return [];
      };
      // we need to create a copy and not to modify the existing array
      var list = ifaces.concat();
      for(var i = 0,l = ifaces.length;i < l;i++){

        if(ifaces[i].$$extends){

          list.push.apply(list, this.flatten(ifaces[i].$$extends));
        };
      };
      return list;
    },
    /**
     * Assert members
     *
     * @param object {qx.core.Object} The object, which contains the methods
     * @param clazz {Class} class of the object
     * @param iface {Interface} the interface to verify
     * @param wrap {Boolean ? false} wrap functions required by interface to
     *     check parameters etc.
     * @param shouldThrow {Boolean} if <code>false</code>, the method
     *   will return a boolean instead of throwing an exception
     * @return {Boolean} <code>true</code> if all members are supported
     */
    __checkMembers : function(object, clazz, iface, wrap, shouldThrow){

      // Validate members
      var members = iface.$$members;
      if(members){

        for(var key in members){

          if(qx.Bootstrap.isFunction(members[key])){

            var isPropertyMethod = this.__isPropertyMethod(clazz, key);
            var hasMemberFunction = isPropertyMethod || qx.Bootstrap.isFunction(object[key]);
            if(!hasMemberFunction){

              if(shouldThrow){

                throw new Error('Implementation of method "' + key + '" is missing in class "' + clazz.classname + '" required by interface "' + iface.name + '"');
              } else {

                return false;
              };
            };
            // Only wrap members if the interface was not been applied yet. This
            // can easily be checked by the recursive hasInterface method.
            var shouldWrapFunction = wrap === true && !isPropertyMethod && !qx.util.OOUtil.hasInterface(clazz, iface);
            if(shouldWrapFunction){

              object[key] = this.__wrapInterfaceMember(iface, object[key], key, members[key]);
            };
          } else {

            // Other members are not checked more detailed because of
            // JavaScript's loose type handling
            if(typeof object[key] === undefined){

              if(typeof object[key] !== "function"){

                if(shouldThrow){

                  throw new Error('Implementation of member "' + key + '" is missing in class "' + clazz.classname + '" required by interface "' + iface.name + '"');
                } else {

                  return false;
                };
              };
            };
          };
        };
      };
      if(!shouldThrow){

        return true;
      };
    },
    /**
     * Internal helper to detect if the method will be generated by the
     * property system.
     *
     * @param clazz {Class} The current class.
     * @param methodName {String} The name of the method.
     *
     * @return {Boolean} true, if the method will be generated by the property
     *   system.
     */
    __isPropertyMethod : function(clazz, methodName){

      var match = methodName.match(/^(is|toggle|get|set|reset)(.*)$/);
      if(!match){

        return false;
      };
      var propertyName = qx.Bootstrap.firstLow(match[2]);
      var isPropertyMethod = qx.util.OOUtil.getPropertyDefinition(clazz, propertyName);
      if(!isPropertyMethod){

        return false;
      };
      var isBoolean = match[0] == "is" || match[0] == "toggle";
      if(isBoolean){

        return qx.util.OOUtil.getPropertyDefinition(clazz, propertyName).check == "Boolean";
      };
      return true;
    },
    /**
     * Assert properties
     *
     * @param clazz {Class} class to check interface for
     * @param iface {Interface} the interface to verify
     * @param shouldThrow {Boolean} if <code>false</code>, the method
     *   will return a boolean instead of throwing an exception
     * @return {Boolean} <code>true</code> if all properties are supported
     */
    __checkProperties : function(clazz, iface, shouldThrow){

      if(iface.$$properties){

        for(var key in iface.$$properties){

          if(!qx.util.OOUtil.getPropertyDefinition(clazz, key)){

            if(shouldThrow){

              throw new Error('The property "' + key + '" is not supported by Class "' + clazz.classname + '"!');
            } else {

              return false;
            };
          };
        };
      };
      if(!shouldThrow){

        return true;
      };
    },
    /**
     * Assert events
     *
     * @param clazz {Class} class to check interface for
     * @param iface {Interface} the interface to verify
     * @param shouldThrow {Boolean} if <code>false</code>, the method
     *   will return a boolean instead of throwing an exception
     * @return {Boolean} <code>true</code> if all events are supported
     */
    __checkEvents : function(clazz, iface, shouldThrow){

      if(iface.$$events){

        for(var key in iface.$$events){

          if(!qx.util.OOUtil.supportsEvent(clazz, key)){

            if(shouldThrow){

              throw new Error('The event "' + key + '" is not supported by Class "' + clazz.classname + '"!');
            } else {

              return false;
            };
          };
        };
      };
      if(!shouldThrow){

        return true;
      };
    },
    /**
     * Asserts that the given object implements all the methods defined in the
     * interface. This method throws an exception if the object does not
     * implement the interface.
     *
     *  @param object {qx.core.Object} Object to check interface for
     *  @param iface {Interface} The interface to verify
     */
    assertObject : function(object, iface){

      var clazz = object.constructor;
      this.__checkMembers(object, clazz, iface, false, true);
      this.__checkProperties(clazz, iface, true);
      this.__checkEvents(clazz, iface, true);
      // Validate extends, recursive
      var extend = iface.$$extends;
      if(extend){

        for(var i = 0,l = extend.length;i < l;i++){

          this.assertObject(object, extend[i]);
        };
      };
    },
    /**
     * Checks if an interface is implemented by a class
     *
     * @param clazz {Class} class to check interface for
     * @param iface {Interface} the interface to verify
     * @param wrap {Boolean ? false} wrap functions required by interface to
     *     check parameters etc.
     */
    assert : function(clazz, iface, wrap){

      this.__checkMembers(clazz.prototype, clazz, iface, wrap, true);
      this.__checkProperties(clazz, iface, true);
      this.__checkEvents(clazz, iface, true);
      // Validate extends, recursive
      var extend = iface.$$extends;
      if(extend){

        for(var i = 0,l = extend.length;i < l;i++){

          this.assert(clazz, extend[i], wrap);
        };
      };
    },
    /**
     * Asserts that the given object implements all the methods defined in the
     * interface.
     *
     *  @param object {qx.core.Object} Object to check interface for
     *  @param iface {Interface} The interface to verify
     * @return {Boolean} <code>true</code> if the objects implements the interface
     */
    objectImplements : function(object, iface){

      var clazz = object.constructor;
      if(!this.__checkMembers(object, clazz, iface) || !this.__checkProperties(clazz, iface) || !this.__checkEvents(clazz, iface)){

        return false;
      };
      // Validate extends, recursive
      var extend = iface.$$extends;
      if(extend){

        for(var i = 0,l = extend.length;i < l;i++){

          if(!this.objectImplements(object, extend[i])){

            return false;
          };
        };
      };
      return true;
    },
    /**
     * Tests whether an interface is implemented by a class, without throwing an
     * exception when it doesn't.
     *
     * @param clazz {Class} class to check interface for
     * @param iface {Interface} the interface to verify
     * @return {Boolean} <code>true</code> if interface is implemented
     */
    classImplements : function(clazz, iface){

      if(!this.__checkMembers(clazz.prototype, clazz, iface) || !this.__checkProperties(clazz, iface) || !this.__checkEvents(clazz, iface)){

        return false;
      };
      // Validate extends, recursive
      var extend = iface.$$extends;
      if(extend){

        for(var i = 0,l = extend.length;i < l;i++){

          if(!this.has(clazz, extend[i])){

            return false;
          };
        };
      };
      return true;
    },
    /*
    ---------------------------------------------------------------------------
       PRIVATE/INTERNAL API
    ---------------------------------------------------------------------------
    */
    /**
     * This method will be attached to all interface to return
     * a nice identifier for them.
     *
     * @internal
     * @return {String} The interface identifier
     */
    genericToString : function(){

      return "[Interface " + this.name + "]";
    },
    /** Registry of all defined interfaces */
    $$registry : {
    },
    /**
     * Wrap a method with a precondition check.
     *
     * @signature function(iface, origFunction, functionName, preCondition)
     * @param iface {String} Name of the interface, where the pre condition
     *   was defined. (Used in error messages).
     * @param origFunction {Function} function to wrap.
     * @param functionName {String} name of the function. (Used in error messages).
     * @param preCondition {Function}. This function gets called with the arguments of the
     *   original function. If this function return true the original function is called.
     *   Otherwise an exception is thrown.
     * @return {Function} wrapped function
     */
    __wrapInterfaceMember : qx.core.Environment.select("qx.debug", {
      "true" : function(iface, origFunction, functionName, preCondition){

        function wrappedFunction(){

          // call precondition
          preCondition.apply(this, arguments);
          // call original function
          return origFunction.apply(this, arguments);
        };
        origFunction.wrapper = wrappedFunction;
        return wrappedFunction;
      },
      "default" : function(iface, origFunction, functionName, preCondition){
      }
    }),
    /** @type {Map} allowed keys in interface definition */
    __allowedKeys : qx.core.Environment.select("qx.debug", {
      "true" : {
        "extend" : "object",
        // Interface | Interface[]
        "statics" : "object",
        // Map
        "members" : "object",
        // Map
        "properties" : "object",
        // Map
        "events" : "object"
      },
      "default" : null
    }),
    /**
     * Validates incoming configuration and checks keys and values
     *
     * @signature function(name, config)
     * @param name {String} The name of the class
     * @param config {Map} Configuration map
     */
    __validateConfig : qx.core.Environment.select("qx.debug", {
      "true" : function(name, config){

        if(qx.core.Environment.get("qx.debug")){

          // Validate keys
          var allowed = this.__allowedKeys;
          for(var key in config){

            if(allowed[key] === undefined){

              throw new Error('The configuration key "' + key + '" in class "' + name + '" is not allowed!');
            };
            if(config[key] == null){

              throw new Error("Invalid key '" + key + "' in interface '" + name + "'! The value is undefined/null!");
            };
            if(allowed[key] !== null && typeof config[key] !== allowed[key]){

              throw new Error('Invalid type of key "' + key + '" in interface "' + name + '"! The type of the key must be "' + allowed[key] + '"!');
            };
          };
          // Validate maps
          var maps = ["statics", "members", "properties", "events"];
          for(var i = 0,l = maps.length;i < l;i++){

            var key = maps[i];
            if(config[key] !== undefined && (["Array", "RegExp", "Date"].indexOf(qx.Bootstrap.getClass(config[key])) != -1 || config[key].classname !== undefined)){

              throw new Error('Invalid key "' + key + '" in interface "' + name + '"! The value needs to be a map!');
            };
          };
          // Validate extends
          if(config.extend){

            for(var i = 0,a = config.extend,l = a.length;i < l;i++){

              if(a[i] == null){

                throw new Error("Extends of interfaces must be interfaces. The extend number '" + i + 1 + "' in interface '" + name + "' is undefined/null!");
              };
              if(a[i].$$type !== "Interface"){

                throw new Error("Extends of interfaces must be interfaces. The extend number '" + i + 1 + "' in interface '" + name + "' is not an interface!");
              };
            };
          };
          // Validate statics
          if(config.statics){

            for(var key in config.statics){

              if(key.toUpperCase() !== key){

                throw new Error('Invalid key "' + key + '" in interface "' + name + '"! Static constants must be all uppercase.');
              };
              switch(typeof config.statics[key]){case "boolean":case "string":case "number":
              break;default:
              throw new Error('Invalid key "' + key + '" in interface "' + name + '"! Static constants must be all of a primitive type.');};
            };
          };
        };
      },
      "default" : function(name, config){
      }
    })
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * This class takes care of the normalization of the native 'Error' object.
 * It contains a simple bugfix for toString which might not print out the proper
 * error message.
 *
 * *toString*:
 * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Error/toString">MDN documentation</a> |
 * <a href="http://es5.github.com/#x15.11.4.4">Annotated ES5 Spec</a>
 *
 * @group (Polyfill)
 */
qx.Bootstrap.define("qx.lang.normalize.Error", {
  defer : function(){

    // toString
    if(!qx.core.Environment.get("ecmascript.error.toString")){

      Error.prototype.toString = function(){

        var name = this.name || "Error";
        var message = this.message || "";
        if(name === "" && message === ""){

          return "Error";
        };
        if(name === ""){

          return message;
        };
        if(message === ""){

          return name;
        };
        return name + ": " + message;
      };
    };
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Martin Wittemann (martinwittemann)

************************************************************************ */
/**
 * Internal class for handling of dynamic properties. Should only be used
 * through the methods provided by {@link qx.Class}.
 *
 * For a complete documentation of properties take a look at
 * http://manual.qooxdoo.org/${qxversion}/pages/core.html#properties.
 *
 *
 * *Normal properties*
 *
 * The <code>properties</code> key in the class definition map of {@link qx.Class#define}
 * is used to generate the properties.
 *
 * Valid keys of a property definition are:
 *
 * <table>
 *   <tr><th>Name</th><th>Type</th><th>Description</th></tr>
 *   <tr><th>check</th><td>Array, String, Function</td><td>
 *     The check is used to check the type the incoming value of a property. This will only
 *     be executed in the source version. The build version will not contain the checks.
 *     The check can be:
 *     <ul>
 *       <li>a custom check function. The function takes the incoming value as a parameter and must
 *           return a boolean value to indicate whether the values is valid.
 *       </li>
 *       <li>inline check code as a string e.g. <code>"value &gt; 0 && value &lt; 100"</code></li>
 *       <li>a class name e.g. <code>qx.ui.form.Button</code></li>
 *       <li>a name of an interface the value must implement</li>
 *       <li>an array of all valid values</li>
 *       <li>one of the predefined checks: Boolean, String, Number, Integer, Float, Double,
 *           Object, Array, Map, Class, Mixin, Interface, Theme, Error, RegExp, Function,
 *           Date, Node, Element, Document, Window, Event
 *       </li>
 *     <ul>
 *   </td></tr>
 *   <tr><th>init</th><td>var</td><td>
 *     Sets the default/initial value of the property. If no property value is set or the property
 *     gets reset, the getter will return the <code>init</code> value.
 *   </td></tr>
 *   <tr><th>apply</th><td>String</td><td>
 *     On change of the property value the method of the specified name will be called. The signature of
 *     the method is <code>function(newValue, oldValue, propertyName)</code>. It is conventional to name
 *     the callback <code>_apply</code> + <i>PropertyName</i>, with the property name camel-cased (e.g.
 *     "<i>_applyFooBar</i>" for a property <i>fooBar</i>).
 *   </td></tr>
 *   <tr><th>event</th><td>String</td><td>
 *     On change of the property value an event with the given name will be dispatched. The event type is
 *     {@link qx.event.type.Data}.
 *   </td></tr>
 *   <tr><th>themeable</th><td>Boolean</td><td>
 *     Whether this property can be set using themes.
 *   </td></tr>
 *   <tr><th>inheritable</th><td>Boolean</td><td>
 *     Whether the property value should be inheritable. If the property does not have an user defined or an
 *     init value, the property will try to get the value from the parent of the current object.
 *   </td></tr>
 *   <tr><th>nullable</th><td>Boolean</td><td>
 *     Whether <code>null</code> is an allowed value of the property. This is complementary to the check
 *     defined using the <code>check</code> key.
 *   </td></tr>
 *   <tr><th>refine</th><td>Boolean</td><td>
 *     Whether the property definition is a refinement of a property in one of the super classes of the class.
 *     Only the <code>init</code> value can be changed using refine.
 *   </td></tr>
 *   <tr><th>transform</th><td>String</td><td>
 *     On setting of the property value the method of the specified name will
 *     be called. The signature of the method is <code>function(value)</code>.
 *     The parameter <code>value</code> is the value passed to the setter.
 *     The function must return the modified or unmodified value.
 *     Transformation occurs before the check function, so both may be
 *     specified if desired.  Alternatively, the transform function may throw
 *     an error if the value passed to it is invalid.
 *   </td></tr>
 *   <tr><th>validate</th><td>Function, String</td><td>
 *     On setting of the property value the method of the specified name will
 *     be called. The signature of the method is <code>function(value)</code>.
 *     The parameter <code>value</code> is the value passed to the setter.
 *     If the validation fails, an <code>qx.core.ValidationError</code> should
 *     be thrown by the validation function. Otherwise, just do nothing in the
 *     function.<br>
 *     If a string is given, the string should hold a reference to a member
 *     method.<br>
 *     <code>"<i>methodname</i>"</code> for example
 *     <code>"__validateProperty"</code><br>
 *     There are some default validators in the {@link qx.util.Validate} class.
 *     See this documentation for usage examples.
 *   </td></tr>
 *   <tr><th>dereference</th><td>Boolean</td><td>
 *     By default, the references to the values (current, init, ...) of the
 *     property will be stored as references on the object. When disposing
 *     this object, the references will not be deleted. Setting the
 *     dereference key to true tells the property system to delete all
 *     connections made by this property on dispose. This can be necessary for
 *     disconnecting DOM objects to allow the garbage collector to work
 *     properly.
 *   </td></tr>
 *   <tr><th>deferredInit</th><td>Boolean</td><td>
 *     Allow for a deferred initialization for reference types. Defaults to false.
 *   </td></tr>
 * </table>
 *
 * *Property groups*
 *
 * Property groups are defined in a similar way but support a different set of keys:
 *
 * <table>
 *   <tr><th>Name</th><th>Type</th><th>Description</th></tr>
 *   <tr><th>group</th><td>String[]</td><td>
 *     A list of property names which should be set using the property group.
 *   </td></tr>
 *   <tr><th>mode</th><td>String</td><td>
 *     If mode is set to <code>"shorthand"</code>, the properties can be set using a CSS like shorthand mode.
 *   </td></tr>
 *   <tr><th>themeable</th><td>Boolean</td><td>
 *     Whether this property can be set using themes.
 *   </td></tr>
 * </table>
 *
 * @internal
 * @ignore(qx.Interface)
 */
qx.Bootstrap.define("qx.core.Property", {
  statics : {
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

************************************************************************ */
/**
 * This class is one of the most important parts of qooxdoo's
 * object-oriented features.
 *
 * Its {@link #define} method is used to create qooxdoo classes.
 *
 * Each instance of a class defined by {@link #define} has
 * the following keys attached to the constructor and the prototype:
 *
 * <table>
 * <tr><th><code>classname</code></th><td>The fully-qualified name of the class (e.g. <code>"qx.ui.core.Widget"</code>).</td></tr>
 * <tr><th><code>basename</code></th><td>The namespace part of the class name (e.g. <code>"qx.ui.core"</code>).</td></tr>
 * <tr><th><code>constructor</code></th><td>A reference to the constructor of the class.</td></tr>
 * <tr><th><code>superclass</code></th><td>A reference to the constructor of the super class.</td></tr>
 * </table>
 *
 * Each method may access static members of the same class by using
 * <code>this.self(arguments)</code> ({@link qx.core.Object#self}):
 * <pre class='javascript'>
 * statics : { FOO : "bar" },
 * members: {
 *   baz: function(x) {
 *     this.self(arguments).FOO;
 *     ...
 *   }
 * }
 * </pre>
 *
 * Each overriding method may call the overridden method by using
 * <code>this.base(arguments [, ...])</code> ({@link qx.core.Object#base}). This is also true for calling
 * the constructor of the superclass.
 * <pre class='javascript'>
 * members: {
 *   foo: function(x) {
 *     this.base(arguments, x);
 *     ...
 *   }
 * }
 * </pre>
 *
 * By using <code>qx.Class</code> within an app, the native JS data types are
 * conveniently polyfilled according to {@link qx.lang.normalize}.
 *
 * @require(qx.Interface)
 * @require(qx.Mixin)
 * @require(qx.lang.normalize.Array)
 * @require(qx.lang.normalize.Date)
 * @require(qx.lang.normalize.Error)
 * @require(qx.lang.normalize.Function)
 * @require(qx.lang.normalize.String)
 * @require(qx.lang.normalize.Object)
 */
qx.Bootstrap.define("qx.Class", {
  statics : {
    /**
     * A static reference to the property implementation in the case it
     * should be included.
     */
    __Property : qx.core.Environment.get("module.property") ? qx.core.Property : null,
    /*
    ---------------------------------------------------------------------------
       PUBLIC METHODS
    ---------------------------------------------------------------------------
    */
    /**
     * Define a new class using the qooxdoo class system. This sets up the
     * namespace for the class and generates the class from the definition map.
     *
     * Example:
     * <pre class='javascript'>
     * qx.Class.define("name",
     * {
     *   extend : Object, // superclass
     *   implement : [Interfaces],
     *   include : [Mixins],
     *
     *   statics:
     *   {
     *     CONSTANT : 3.141,
     *
     *     publicMethod: function() {},
     *     _protectedMethod: function() {},
     *     __privateMethod: function() {}
     *   },
     *
     *   properties:
     *   {
     *     "tabIndex": { check: "Number", init : -1 }
     *   },
     *
     *   members:
     *   {
     *     publicField: "foo",
     *     publicMethod: function() {},
     *
     *     _protectedField: "bar",
     *     _protectedMethod: function() {},
     *
     *     __privateField: "baz",
     *     __privateMethod: function() {}
     *   }
     * });
     * </pre>
     *
     * @param name {String?null} Name of the class. If <code>null</code>, the class
     *   will not be added to any namespace which could be handy for testing.
     * @param config {Map ? null} Class definition structure. The configuration map has the following keys:
     *     <table>
     *       <tr><th>Name</th><th>Type</th><th>Description</th></tr>
     *       <tr><th>type</th><td>String</td><td>
     *           Type of the class. Valid types are "abstract", "static" and "singleton".
     *           If unset it defaults to a regular non-static class.
     *       </td></tr>
     *       <tr><th>extend</th><td>Class</td><td>The super class the current class inherits from.</td></tr>
     *       <tr><th>implement</th><td>Interface | Interface[]</td><td>Single interface or array of interfaces the class implements.</td></tr>
     *       <tr><th>include</th><td>Mixin | Mixin[]</td><td>Single mixin or array of mixins, which will be merged into the class.</td></tr>
     *       <tr><th>construct</th><td>Function</td><td>The constructor of the class.</td></tr>
     *       <tr><th>statics</th><td>Map</td><td>Map of static members of the class.</td></tr>
     *       <tr><th>properties</th><td>Map</td><td>Map of property definitions. For a description of the format of a property definition see
     *           {@link qx.core.Property}.</td></tr>
     *       <tr><th>members</th><td>Map</td><td>Map of instance members of the class.</td></tr>
     *       <tr><th>environment</th><td>Map</td><td>Map of environment settings for this class. For a description of the format of a setting see
     *           {@link qx.core.Environment}.</td></tr>
     *       <tr><th>events</th><td>Map</td><td>
     *           Map of events the class fires. The keys are the names of the events and the values are the
     *           corresponding event type class names.
     *       </td></tr>
     *       <tr><th>defer</th><td>Function</td><td>Function that is called at the end of processing the class declaration. It allows access to the declared statics, members and properties.</td></tr>
     *       <tr><th>destruct</th><td>Function</td><td>The destructor of the class.</td></tr>
     *     </table>
     * @return {Class} The defined class
     */
    define : function(name, config){

      if(!config){

        config = {
        };
      };
      // Normalize include to array
      if(config.include && !(qx.Bootstrap.getClass(config.include) === "Array")){

        config.include = [config.include];
      };
      // Normalize implement to array
      if(config.implement && !(qx.Bootstrap.getClass(config.implement) === "Array")){

        config.implement = [config.implement];
      };
      // Normalize type
      var implicitType = false;
      if(!config.hasOwnProperty("extend") && !config.type){

        config.type = "static";
        implicitType = true;
      };
      // Validate incoming data
      if(qx.core.Environment.get("qx.debug")){

        try{

          this.__validateConfig(name, config);
        } catch(ex) {

          if(implicitType){

            ex.message = 'Assumed static class because no "extend" key was found. ' + ex.message;
          };
          throw ex;
        };
      };
      // Create the class
      var clazz = this.__createClass(name, config.type, config.extend, config.statics, config.construct, config.destruct, config.include);
      // Members, properties, events and mixins are only allowed for non-static classes
      if(config.extend){

        // Attach properties
        if(config.properties){

          this.__addProperties(clazz, config.properties, true);
        };
        // Attach members
        if(config.members){

          this.__addMembers(clazz, config.members, true, true, false);
        };
        // Process events
        if(config.events){

          this.__addEvents(clazz, config.events, true);
        };
        // Include mixins
        // Must be the last here to detect conflicts
        if(config.include){

          for(var i = 0,l = config.include.length;i < l;i++){

            this.__addMixin(clazz, config.include[i], false);
          };
        };
      } else if(config.hasOwnProperty('extend') && qx.core.Environment.get("qx.debug")){

        throw new Error('"extend" parameter is null or undefined');
      };
      // Process environment
      if(config.environment){

        for(var key in config.environment){

          qx.core.Environment.add(key, config.environment[key]);
        };
      };
      // Interface support for non-static classes
      if(config.implement){

        for(var i = 0,l = config.implement.length;i < l;i++){

          this.__addInterface(clazz, config.implement[i]);
        };
      };
      if(qx.core.Environment.get("qx.debug")){

        this.__validateAbstractInterfaces(clazz);
      };
      // Process defer
      if(config.defer){

        config.defer.self = clazz;
        config.defer(clazz, clazz.prototype, {
          add : function(name, config){

            // build pseudo properties map
            var properties = {
            };
            properties[name] = config;
            // execute generic property handler
            qx.Class.__addProperties(clazz, properties, true);
          }
        });
      };
      return clazz;
    },
    /**
     * Whether the given class exists
     *
     * @signature function(name)
     * @param name {String} class name to check
     * @return {Boolean} true if class exists
     */
    isDefined : qx.util.OOUtil.classIsDefined,
    /**
     * Find a class by its name
     *
     * @signature function(name)
     * @param name {String} class name to resolve
     * @return {Class} the class
     */
    getByName : qx.Bootstrap.getByName,
    /**
     * Whether a class is a direct or indirect sub class of another class,
     * or both classes coincide.
     *
     * @param clazz {Class} the class to check.
     * @param superClass {Class} the potential super class
     * @return {Boolean} whether clazz is a sub class of superClass.
     */
    isSubClassOf : function(clazz, superClass){

      if(!clazz){

        return false;
      };
      if(clazz == superClass){

        return true;
      };
      if(clazz.prototype instanceof superClass){

        return true;
      };
      return false;
    },
    /**
     * Returns the definition of the given property. Returns null
     * if the property does not exist.
     *
     * @signature function(clazz, name)
     * @param clazz {Class} class to check
     * @param name {String} name of the class to check for
     * @return {Map|null} whether the object support the given event.
     */
    getPropertyDefinition : qx.util.OOUtil.getPropertyDefinition,
    /**
     * Returns a list of all properties supported by the given class
     *
     * @param clazz {Class} Class to query
     * @return {String[]} List of all property names
     */
    getProperties : function(clazz){

      var list = [];
      while(clazz){

        if(clazz.$$properties){

          list.push.apply(list, Object.keys(clazz.$$properties));
        };
        clazz = clazz.superclass;
      };
      return list;
    },
    /**
     * Returns the class or one of its superclasses which contains the
     * declaration for the given property in its class definition. Returns null
     * if the property is not specified anywhere.
     *
     * @param clazz {Class} class to look for the property
     * @param name {String} name of the property
     * @return {Class | null} The class which includes the property
     */
    getByProperty : function(clazz, name){

      while(clazz){

        if(clazz.$$properties && clazz.$$properties[name]){

          return clazz;
        };
        clazz = clazz.superclass;
      };
      return null;
    },
    /**
     * Whether a class has the given property
     *
     * @signature function(clazz, name)
     * @param clazz {Class} class to check
     * @param name {String} name of the property to check for
     * @return {Boolean} whether the class includes the given property.
     */
    hasProperty : qx.util.OOUtil.hasProperty,
    /**
     * Returns the event type of the given event. Returns null if
     * the event does not exist.
     *
     * @signature function(clazz, name)
     * @param clazz {Class} class to check
     * @param name {String} name of the event
     * @return {String|null} Event type of the given event.
     */
    getEventType : qx.util.OOUtil.getEventType,
    /**
     * Whether a class supports the given event type
     *
     * @signature function(clazz, name)
     * @param clazz {Class} class to check
     * @param name {String} name of the event to check for
     * @return {Boolean} whether the class supports the given event.
     */
    supportsEvent : qx.util.OOUtil.supportsEvent,
    /**
     * Returns the class or one of its superclasses which contains the
     * declaration for the given mixin. Returns null if the mixin is not
     * specified anywhere.
     *
     * @param clazz {Class} class to look for the mixin
     * @param mixin {Mixin} mixin to look for
     * @return {Class | null} The class which directly includes the given mixin
     */
    getByMixin : function(clazz, mixin){

      var list,i,l;
      while(clazz){

        if(clazz.$$includes){

          list = clazz.$$flatIncludes;
          for(i = 0,l = list.length;i < l;i++){

            if(list[i] === mixin){

              return clazz;
            };
          };
        };
        clazz = clazz.superclass;
      };
      return null;
    },
    /**
     * Whether a given class or any of its superclasses includes a given mixin.
     *
     * @param clazz {Class} class to check
     * @param mixin {Mixin} the mixin to check for
     * @return {Boolean} whether the class includes the mixin.
     */
    hasMixin : function(clazz, mixin){

      return !!this.getByMixin(clazz, mixin);
    },
    /**
     * Whether a given class directly includes an interface.
     *
     * This function will only return "true" if the interface was defined
     * in the class declaration ({@link qx.Class#define}) using the "implement"
     * key.
     *
     * @param clazz {Class} class or instance to check
     * @param iface {Interface} the interface to check for
     * @return {Boolean} whether the class includes the mixin directly.
     */
    hasOwnInterface : function(clazz, iface){

      return clazz.$$implements && clazz.$$implements.indexOf(iface) !== -1;
    },
    /**
     * Whether a given class or any of its super classes includes a given interface.
     *
     * This function will return "true" if the interface was defined
     * in the class declaration ({@link qx.Class#define}) of the class
     * or any of its super classes using the "implement"
     * key.
     *
     * @signature function(clazz, iface)
     * @param clazz {Class} class to check
     * @param iface {Interface} the interface to check for
     * @return {Boolean} whether the class includes the interface.
     */
    hasInterface : qx.util.OOUtil.hasInterface,
    /**
     * Whether a given class complies to an interface.
     *
     * Checks whether all methods defined in the interface are
     * implemented. The class does not need to implement
     * the interface explicitly in the <code>extend</code> key.
     *
     * @param obj {Object} class to check
     * @param iface {Interface} the interface to check for
     * @return {Boolean} whether the class conforms to the interface.
     */
    implementsInterface : function(obj, iface){

      var clazz = obj.constructor;
      if(this.hasInterface(clazz, iface)){

        return true;
      };
      if(qx.Interface.objectImplements(obj, iface)){

        return true;
      };
      if(qx.Interface.classImplements(clazz, iface)){

        return true;
      };
      return false;
    },
    /**
     * Helper method to handle singletons
     *
     * @internal
     * @return {Object} The singleton instance
     */
    getInstance : function(){

      if(!this.$$instance){

        this.$$allowconstruct = true;
        this.$$instance = new this();
        delete this.$$allowconstruct;
      };
      return this.$$instance;
    },
    /*
    ---------------------------------------------------------------------------
       PRIVATE/INTERNAL BASICS
    ---------------------------------------------------------------------------
    */
    /**
     * This method will be attached to all classes to return
     * a nice identifier for them.
     *
     * @internal
     * @return {String} The class identifier
     */
    genericToString : function(){

      return "[Class " + this.classname + "]";
    },
    /** Stores all defined classes */
    $$registry : qx.Bootstrap.$$registry,
    /** @type {Map} allowed keys in non-static class definition */
    __allowedKeys : qx.core.Environment.select("qx.debug", {
      "true" : {
        "type" : "string",
        // String
        "extend" : "function",
        // Function
        "implement" : "object",
        // Interface[]
        "include" : "object",
        // Mixin[]
        "construct" : "function",
        // Function
        "statics" : "object",
        // Map
        "properties" : "object",
        // Map
        "members" : "object",
        // Map
        "environment" : "object",
        // Map
        "events" : "object",
        // Map
        "defer" : "function",
        // Function
        "destruct" : "function"
      },
      "default" : null
    }),
    /** @type {Map} allowed keys in static class definition */
    __staticAllowedKeys : qx.core.Environment.select("qx.debug", {
      "true" : {
        "type" : "string",
        // String
        "statics" : "object",
        // Map
        "environment" : "object",
        // Map
        "defer" : "function"
      },
      "default" : null
    }),
    /**
     * Validates an incoming configuration and checks for proper keys and values
     *
     * @signature function(name, config)
     * @param name {String} The name of the class
     * @param config {Map} Configuration map
     */
    __validateConfig : qx.core.Environment.select("qx.debug", {
      "true" : function(name, config){

        // Validate type
        if(config.type && !(config.type === "static" || config.type === "abstract" || config.type === "singleton")){

          throw new Error('Invalid type "' + config.type + '" definition for class "' + name + '"!');
        };
        // Validate non-static class on the "extend" key
        if(config.type && config.type !== "static" && !config.extend){

          throw new Error('Invalid config in class "' + name + '"! Every non-static class has to extend at least the "qx.core.Object" class.');
        };
        // Validate keys
        var allowed = config.type === "static" ? this.__staticAllowedKeys : this.__allowedKeys;
        for(var key in config){

          if(!allowed[key]){

            throw new Error('The configuration key "' + key + '" in class "' + name + '" is not allowed!');
          };
          if(config[key] == null){

            throw new Error('Invalid key "' + key + '" in class "' + name + '"! The value is undefined/null!');
          };
          if(typeof config[key] !== allowed[key]){

            throw new Error('Invalid type of key "' + key + '" in class "' + name + '"! The type of the key must be "' + allowed[key] + '"!');
          };
        };
        // Validate maps
        var maps = ["statics", "properties", "members", "environment", "settings", "variants", "events"];
        for(var i = 0,l = maps.length;i < l;i++){

          var key = maps[i];
          if(config[key] !== undefined && (config[key].$$hash !== undefined || !qx.Bootstrap.isObject(config[key]))){

            throw new Error('Invalid key "' + key + '" in class "' + name + '"! The value needs to be a map!');
          };
        };
        // Validate include definition
        if(config.include){

          if(qx.Bootstrap.getClass(config.include) === "Array"){

            for(var i = 0,a = config.include,l = a.length;i < l;i++){

              if(a[i] == null || a[i].$$type !== "Mixin"){

                throw new Error('The include definition in class "' + name + '" contains an invalid mixin at position ' + i + ': ' + a[i]);
              };
            };
          } else {

            throw new Error('Invalid include definition in class "' + name + '"! Only mixins and arrays of mixins are allowed!');
          };
        };
        // Validate implement definition
        if(config.implement){

          if(qx.Bootstrap.getClass(config.implement) === "Array"){

            for(var i = 0,a = config.implement,l = a.length;i < l;i++){

              if(a[i] == null || a[i].$$type !== "Interface"){

                throw new Error('The implement definition in class "' + name + '" contains an invalid interface at position ' + i + ': ' + a[i]);
              };
            };
          } else {

            throw new Error('Invalid implement definition in class "' + name + '"! Only interfaces and arrays of interfaces are allowed!');
          };
        };
        // Check mixin compatibility
        if(config.include){

          try{

            qx.Mixin.checkCompatibility(config.include);
          } catch(ex) {

            throw new Error('Error in include definition of class "' + name + '"! ' + ex.message);
          };
        };
        // Validate environment
        if(config.environment){

          for(var key in config.environment){

            if(key.substr(0, key.indexOf(".")) != name.substr(0, name.indexOf("."))){

              throw new Error('Forbidden environment setting "' + key + '" found in "' + name + '". It is forbidden to define a ' + 'environment setting for an external namespace!');
            };
          };
        };
        // Validate settings
        if(config.settings){

          for(var key in config.settings){

            if(key.substr(0, key.indexOf(".")) != name.substr(0, name.indexOf("."))){

              throw new Error('Forbidden setting "' + key + '" found in "' + name + '". It is forbidden to define a default setting for an external namespace!');
            };
          };
        };
        // Validate variants
        if(config.variants){

          for(var key in config.variants){

            if(key.substr(0, key.indexOf(".")) != name.substr(0, name.indexOf("."))){

              throw new Error('Forbidden variant "' + key + '" found in "' + name + '". It is forbidden to define a variant for an external namespace!');
            };
          };
        };
      },
      "default" : function(name, config){
      }
    }),
    /**
     * Validates the interfaces required by abstract base classes
     *
     * @signature function(clazz)
     * @param clazz {Class} The configured class.
     */
    __validateAbstractInterfaces : qx.core.Environment.select("qx.debug", {
      "true" : function(clazz){

        var superclass = clazz.superclass;
        while(superclass){

          if(superclass.$$classtype !== "abstract"){

            break;
          };
          var interfaces = superclass.$$implements;
          if(interfaces){

            for(var i = 0;i < interfaces.length;i++){

              qx.Interface.assert(clazz, interfaces[i], true);
            };
          };
          superclass = superclass.superclass;
        };
      },
      "default" : function(clazz){
      }
    }),
    /**
     * Creates a class by type. Supports modern inheritance etc.
     *
     * @param name {String} Full name of the class
     * @param type {String} type of the class, i.e. "static", "abstract" or "singleton"
     * @param extend {Class} Superclass to inherit from
     * @param statics {Map} Static methods or fields
     * @param construct {Function} Constructor of the class
     * @param destruct {Function} Destructor of the class
     * @param mixins {Mixin[]} array of mixins of the class
     * @return {Class} The generated class
     */
    __createClass : function(name, type, extend, statics, construct, destruct, mixins){

      var clazz;
      if(!extend && qx.core.Environment.get("qx.aspects") == false){

        // Create empty/non-empty class
        clazz = statics || {
        };
        qx.Bootstrap.setDisplayNames(clazz, name);
      } else {

        clazz = {
        };
        if(extend){

          // Create default constructor
          if(!construct){

            construct = this.__createDefaultConstructor();
          };
          if(this.__needsConstructorWrapper(extend, mixins)){

            clazz = this.__wrapConstructor(construct, name, type);
          } else {

            clazz = construct;
          };
          // Add singleton getInstance()
          if(type === "singleton"){

            clazz.getInstance = this.getInstance;
          };
          qx.Bootstrap.setDisplayName(construct, name, "constructor");
        };
        // Copy statics
        if(statics){

          qx.Bootstrap.setDisplayNames(statics, name);
          var key;
          for(var i = 0,a = Object.keys(statics),l = a.length;i < l;i++){

            key = a[i];
            var staticValue = statics[key];
            if(qx.core.Environment.get("qx.aspects")){

              if(staticValue instanceof Function){

                staticValue = qx.core.Aspect.wrap(name + "." + key, staticValue, "static");
              };
              clazz[key] = staticValue;
            } else {

              clazz[key] = staticValue;
            };
          };
        };
      };
      // Create namespace
      var basename = name ? qx.Bootstrap.createNamespace(name, clazz) : "";
      // Store names in constructor/object
      clazz.name = clazz.classname = name;
      clazz.basename = basename;
      // Store type info
      clazz.$$type = "Class";
      if(type){

        clazz.$$classtype = type;
      };
      // Attach toString
      if(!clazz.hasOwnProperty("toString")){

        clazz.toString = this.genericToString;
      };
      if(extend){

        qx.Bootstrap.extendClass(clazz, construct, extend, name, basename);
        // Store destruct onto class
        if(destruct){

          if(qx.core.Environment.get("qx.aspects")){

            destruct = qx.core.Aspect.wrap(name, destruct, "destructor");
          };
          clazz.$$destructor = destruct;
          qx.Bootstrap.setDisplayName(destruct, name, "destruct");
        };
      };
      // Store class reference in global class registry
      this.$$registry[name] = clazz;
      // Return final class object
      return clazz;
    },
    /*
    ---------------------------------------------------------------------------
       PRIVATE ADD HELPERS
    ---------------------------------------------------------------------------
    */
    /**
     * Attach events to the class
     *
     * @param clazz {Class} class to add the events to
     * @param events {Map} map of event names the class fires.
     * @param patch {Boolean ? false} Enable redefinition of event type?
     */
    __addEvents : function(clazz, events, patch){

      if(qx.core.Environment.get("qx.debug")){

        if(typeof events !== "object" || qx.Bootstrap.getClass(events) === "Array"){

          throw new Error(clazz.classname + ": the events must be defined as map!");
        };
        for(var key in events){

          if(typeof events[key] !== "string"){

            throw new Error(clazz.classname + "/" + key + ": the event value needs to be a string with the class name of the event object which will be fired.");
          };
        };
        // Compare old and new event type/value if patching is disabled
        if(clazz.$$events && patch !== true){

          for(var key in events){

            if(clazz.$$events[key] !== undefined && clazz.$$events[key] !== events[key]){

              throw new Error(clazz.classname + "/" + key + ": the event value/type cannot be changed from " + clazz.$$events[key] + " to " + events[key]);
            };
          };
        };
      };
      if(clazz.$$events){

        for(var key in events){

          clazz.$$events[key] = events[key];
        };
      } else {

        clazz.$$events = events;
      };
    },
    /**
     * Attach properties to classes
     *
     * @param clazz {Class} class to add the properties to
     * @param properties {Map} map of properties
     * @param patch {Boolean ? false} Overwrite property with the limitations of a property
               which means you are able to refine but not to replace (esp. for new properties)
     */
    __addProperties : function(clazz, properties, patch){

      // check for the property module
      if(!qx.core.Environment.get("module.property")){

        throw new Error("Property module disabled.");
      };
      var config;
      if(patch === undefined){

        patch = false;
      };
      var proto = clazz.prototype;
      for(var name in properties){

        config = properties[name];
        // Check incoming configuration
        if(qx.core.Environment.get("qx.debug")){

          this.__validateProperty(clazz, name, config, patch);
        };
        // Store name into configuration
        config.name = name;
        // Add config to local registry
        if(!config.refine){

          if(clazz.$$properties === undefined){

            clazz.$$properties = {
            };
          };
          clazz.$$properties[name] = config;
        };
        // Store init value to prototype. This makes it possible to
        // overwrite this value in derived classes.
        if(config.init !== undefined){

          clazz.prototype["$$init_" + name] = config.init;
        };
        // register event name
        if(config.event !== undefined){

          // break if no events layer loaded
          if(!qx.core.Environment.get("module.events")){

            throw new Error("Events module not enabled.");
          };
          var event = {
          };
          event[config.event] = "qx.event.type.Data";
          this.__addEvents(clazz, event, patch);
        };
        // Remember inheritable properties
        if(config.inheritable){

          this.__Property.$$inheritable[name] = true;
          if(!proto.$$refreshInheritables){

            this.__Property.attachRefreshInheritables(clazz);
          };
        };
        if(!config.refine){

          this.__Property.attachMethods(clazz, name, config);
        };
      };
    },
    /**
     * Validates the given property
     *
     * @signature function(clazz, name, config, patch)
     * @param clazz {Class} class to add property to
     * @param name {String} name of the property
     * @param config {Map} configuration map
     * @param patch {Boolean ? false} enable refine/patch?
     */
    __validateProperty : qx.core.Environment.select("qx.debug", {
      "true" : function(clazz, name, config, patch){

        // check for properties
        if(!qx.core.Environment.get("module.property")){

          throw new Error("Property module disabled.");
        };
        var has = this.hasProperty(clazz, name);
        if(has){

          var existingProperty = this.getPropertyDefinition(clazz, name);
          if(config.refine && existingProperty.init === undefined){

            throw new Error("Could not refine an init value if there was previously no init value defined. Property '" + name + "' of class '" + clazz.classname + "'.");
          };
        };
        if(!has && config.refine){

          throw new Error("Could not refine non-existent property: '" + name + "' of class: '" + clazz.classname + "'!");
        };
        if(has && !patch){

          throw new Error("Class " + clazz.classname + " already has a property: " + name + "!");
        };
        if(has && patch){

          if(!config.refine){

            throw new Error('Could not refine property "' + name + '" without a "refine" flag in the property definition! This class: ' + clazz.classname + ', original class: ' + this.getByProperty(clazz, name).classname + '.');
          };
          for(var key in config){

            if(key !== "init" && key !== "refine"){

              throw new Error("Class " + clazz.classname + " could not refine property: " + name + "! Key: " + key + " could not be refined!");
            };
          };
        };
        // Check 0.7 keys
        var allowed = config.group ? this.__Property.$$allowedGroupKeys : this.__Property.$$allowedKeys;
        for(var key in config){

          if(allowed[key] === undefined){

            throw new Error('The configuration key "' + key + '" of property "' + name + '" in class "' + clazz.classname + '" is not allowed!');
          };
          if(config[key] === undefined){

            throw new Error('Invalid key "' + key + '" of property "' + name + '" in class "' + clazz.classname + '"! The value is undefined: ' + config[key]);
          };
          if(allowed[key] !== null && typeof config[key] !== allowed[key]){

            throw new Error('Invalid type of key "' + key + '" of property "' + name + '" in class "' + clazz.classname + '"! The type of the key must be "' + allowed[key] + '"!');
          };
        };
        if(config.transform != null){

          if(!(typeof config.transform == "string")){

            throw new Error('Invalid transform definition of property "' + name + '" in class "' + clazz.classname + '"! Needs to be a String.');
          };
        };
        if(config.check != null){

          if(!qx.Bootstrap.isString(config.check) && !qx.Bootstrap.isArray(config.check) && !qx.Bootstrap.isFunction(config.check)){

            throw new Error('Invalid check definition of property "' + name + '" in class "' + clazz.classname + '"! Needs to be a String, Array or Function.');
          };
        };
      },
      "default" : null
    }),
    /**
     * Attach members to a class
     *
     * @param clazz {Class} clazz to add members to
     * @param members {Map} The map of members to attach
     * @param patch {Boolean ? false} Enable patching of
     * @param base {Boolean ? true} Attach base flag to mark function as members
     *     of this class
     * @param wrap {Boolean ? false} Whether the member method should be wrapped.
     *     this is needed to allow base calls in patched mixin members.
     */
    __addMembers : function(clazz, members, patch, base, wrap){

      var proto = clazz.prototype;
      var key,member;
      qx.Bootstrap.setDisplayNames(members, clazz.classname + ".prototype");
      for(var i = 0,a = Object.keys(members),l = a.length;i < l;i++){

        key = a[i];
        member = members[key];
        if(qx.core.Environment.get("qx.debug")){

          if(proto[key] !== undefined && key.charAt(0) == "_" && key.charAt(1) == "_"){

            throw new Error('Overwriting private member "' + key + '" of Class "' + clazz.classname + '" is not allowed!');
          };
          if(patch !== true && proto.hasOwnProperty(key)){

            throw new Error('Overwriting member "' + key + '" of Class "' + clazz.classname + '" is not allowed!');
          };
          if(proto[key] != undefined && proto[key].$$propertyMethod){

            throw new Error('Overwriting generated property method "' + key + '" of Class "' + clazz.classname + '" is not allowed!');
          };
        };
        // Added helper stuff to functions
        // Hint: Could not use typeof function because RegExp objects are functions, too
        // Protect to apply base property and aspect support on special attributes e.g.
        // classes which are function like as well.
        if(base !== false && member instanceof Function && member.$$type == null){

          if(wrap == true){

            // wrap "patched" mixin member
            member = this.__mixinMemberWrapper(member, proto[key]);
          } else {

            // Configure extend (named base here)
            // Hint: proto[key] is not yet overwritten here
            if(proto[key]){

              member.base = proto[key];
            };
            member.self = clazz;
          };
          if(qx.core.Environment.get("qx.aspects")){

            member = qx.core.Aspect.wrap(clazz.classname + "." + key, member, "member");
          };
        };
        // Attach member
        proto[key] = member;
      };
    },
    /**
     * Wraps a member function of a mixin, which is included using "patch". This
     * allows "base" calls in the mixin member function.
     *
     * @param member {Function} The mixin method to wrap
     * @param base {Function} The overwritten method
     * @return {Function} the wrapped mixin member
     */
    __mixinMemberWrapper : function(member, base){

      if(base){

        return function(){

          var oldBase = member.base;
          member.base = base;
          var retval = member.apply(this, arguments);
          member.base = oldBase;
          return retval;
        };
      } else {

        return member;
      };
    },
    /**
     * Add a single interface to a class
     *
     * @param clazz {Class} class to add interface to
     * @param iface {Interface} the Interface to add
     */
    __addInterface : function(clazz, iface){

      if(qx.core.Environment.get("qx.debug")){

        if(!clazz || !iface){

          throw new Error("Incomplete parameters!");
        };
        // This differs from mixins, we only check if the interface is already
        // directly used by this class. It is allowed however, to have an interface
        // included multiple times by extends in the interfaces etc.
        if(this.hasOwnInterface(clazz, iface)){

          throw new Error('Interface "' + iface.name + '" is already used by Class "' + clazz.classname + '!');
        };
        // Check interface and wrap members
        if(clazz.$$classtype !== "abstract"){

          qx.Interface.assert(clazz, iface, true);
        };
      };
      // Store interface reference
      var list = qx.Interface.flatten([iface]);
      if(clazz.$$implements){

        clazz.$$implements.push(iface);
        clazz.$$flatImplements.push.apply(clazz.$$flatImplements, list);
      } else {

        clazz.$$implements = [iface];
        clazz.$$flatImplements = list;
      };
    },
    /**
     * Wrap the constructor of an already existing clazz. This function will
     * replace all references to the existing constructor with the new wrapped
     * constructor.
     *
     * @param clazz {Class} The class to wrap
     * @return {Class} The wrapped class
     */
    __retrospectWrapConstruct : function(clazz){

      var name = clazz.classname;
      var wrapper = this.__wrapConstructor(clazz, name, clazz.$$classtype);
      // copy all keys from the wrapped constructor to the wrapper
      for(var i = 0,a = Object.keys(clazz),l = a.length;i < l;i++){

        key = a[i];
        wrapper[key] = clazz[key];
      };
      // fix prototype
      wrapper.prototype = clazz.prototype;
      // fix self references in members
      var members = clazz.prototype;
      for(var i = 0,a = Object.keys(members),l = a.length;i < l;i++){

        key = a[i];
        var method = members[key];
        // check if method is available because null values can be stored as
        // init values on classes e.g. [BUG #3709]
        if(method && method.self == clazz){

          method.self = wrapper;
        };
      };
      // fix base and superclass references in all defined classes
      for(var key in this.$$registry){

        var construct = this.$$registry[key];
        if(!construct){

          continue;
        };
        if(construct.base == clazz){

          construct.base = wrapper;
        };
        if(construct.superclass == clazz){

          construct.superclass = wrapper;
        };
        if(construct.$$original){

          if(construct.$$original.base == clazz){

            construct.$$original.base = wrapper;
          };
          if(construct.$$original.superclass == clazz){

            construct.$$original.superclass = wrapper;
          };
        };
      };
      qx.Bootstrap.createNamespace(name, wrapper);
      this.$$registry[name] = wrapper;
      return wrapper;
    },
    /**
     * Include all features of the mixin into the given class, recursively.
     *
     * @param clazz {Class} The class onto which the mixin should be attached.
     * @param mixin {Mixin} Include all features of this mixin
     * @param patch {Boolean} Overwrite existing fields, functions and properties
     */
    __addMixin : function(clazz, mixin, patch){

      if(qx.core.Environment.get("qx.debug")){

        if(!clazz || !mixin){

          throw new Error("Incomplete parameters!");
        };
      };
      if(this.hasMixin(clazz, mixin)){

        return;
      };
      var isConstructorWrapped = clazz.$$original;
      if(mixin.$$constructor && !isConstructorWrapped){

        clazz = this.__retrospectWrapConstruct(clazz);
      };
      // Attach content
      var list = qx.Mixin.flatten([mixin]);
      var entry;
      for(var i = 0,l = list.length;i < l;i++){

        entry = list[i];
        // Attach events
        if(entry.$$events){

          this.__addEvents(clazz, entry.$$events, patch);
        };
        // Attach properties (Properties are already readonly themselves, no patch handling needed)
        if(entry.$$properties){

          this.__addProperties(clazz, entry.$$properties, patch);
        };
        // Attach members (Respect patch setting, but dont apply base variables)
        if(entry.$$members){

          this.__addMembers(clazz, entry.$$members, patch, patch, patch);
        };
      };
      // Store mixin reference
      if(clazz.$$includes){

        clazz.$$includes.push(mixin);
        clazz.$$flatIncludes.push.apply(clazz.$$flatIncludes, list);
      } else {

        clazz.$$includes = [mixin];
        clazz.$$flatIncludes = list;
      };
    },
    /*
    ---------------------------------------------------------------------------
       PRIVATE FUNCTION HELPERS
    ---------------------------------------------------------------------------
    */
    /**
     * Returns the default constructor.
     * This constructor just calls the constructor of the base class.
     *
     * @return {Function} The default constructor.
     */
    __createDefaultConstructor : function(){

      function defaultConstructor(){

        defaultConstructor.base.apply(this, arguments);
      };
      return defaultConstructor;
    },
    /**
     * Checks if the constructor needs to be wrapped.
     *
     * @param base {Class} The base class.
     * @param mixins {Mixin[]} All mixins which should be included.
     * @return {Boolean} true, if the constructor needs to be wrapped.
     */
    __needsConstructorWrapper : function(base, mixins){

      if(qx.core.Environment.get("qx.debug")){

        return true;
      };
      // Check for base class mixin constructors
      if(base && base.$$includes){

        var baseMixins = base.$$flatIncludes;
        for(var i = 0,l = baseMixins.length;i < l;i++){

          if(baseMixins[i].$$constructor){

            return true;
          };
        };
      };
      // check for direct mixin constructors
      if(mixins){

        var flatMixins = qx.Mixin.flatten(mixins);
        for(var i = 0,l = flatMixins.length;i < l;i++){

          if(flatMixins[i].$$constructor){

            return true;
          };
        };
      };
      return false;
    },
    /**
     * Generate a wrapper of the original class constructor in order to enable
     * some of the advanced OO features (e.g. abstract class, singleton, mixins)
     *
     * @param construct {Function} the original constructor
     * @param name {String} name of the class
     * @param type {String} the user specified class type
     * @return {Function} The wrapped constructor
     */
    __wrapConstructor : function(construct, name, type){

      var wrapper = function(){

        var clazz = wrapper;
        if(qx.core.Environment.get("qx.debug")){

          // new keyword check
          if(!(this instanceof clazz)){

            throw new Error("Please initialize '" + name + "' objects using the new keyword!");
          };
          // add abstract and singleton checks
          if(type === "abstract"){

            if(this.classname === name){

              throw new Error("The class '," + name + "' is abstract! It is not possible to instantiate it.");
            };
          } else if(type === "singleton"){

            if(!clazz.$$allowconstruct){

              throw new Error("The class '" + name + "' is a singleton! It is not possible to instantiate it directly. Use the static getInstance() method instead.");
            };
          };
        };
        // Execute default constructor
        var retval = clazz.$$original.apply(this, arguments);
        // Initialize local mixins
        if(clazz.$$includes){

          var mixins = clazz.$$flatIncludes;
          for(var i = 0,l = mixins.length;i < l;i++){

            if(mixins[i].$$constructor){

              mixins[i].$$constructor.apply(this, arguments);
            };
          };
        };
        if(qx.core.Environment.get("qx.debug")){

          // Mark instance as initialized
          if(this.classname === name){

            this.$$initialized = true;
          };
        };
        // Return optional return value
        return retval;
      };
      if(qx.core.Environment.get("qx.aspects")){

        var aspectWrapper = qx.core.Aspect.wrap(name, wrapper, "constructor");
        wrapper.$$original = construct;
        wrapper.constructor = aspectWrapper;
        wrapper = aspectWrapper;
      };
      // Store original constructor
      wrapper.$$original = construct;
      // Store wrapper into constructor (needed for base calls etc.)
      construct.wrapper = wrapper;
      // Return generated wrapper
      return wrapper;
    }
  },
  defer : function(){

    // Binding of already loaded bootstrap classes
    if(qx.core.Environment.get("qx.aspects")){

      for(var classname in qx.Bootstrap.$$registry){

        var statics = qx.Bootstrap.$$registry[classname];
        for(var key in statics){

          // only functions, no regexps
          if(statics[key] instanceof Function){

            statics[key] = qx.core.Aspect.wrap(classname + "." + key, statics[key], "static");
          };
        };
      };
    };
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)

************************************************************************ */
/**
 * Utility class with type check for all native JavaScript data types.
 */
qx.Bootstrap.define("qx.lang.Type", {
  statics : {
    /**
     * Get the internal class of the value. See
     * http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/
     * for details.
     *
     * @signature function(value)
     * @param value {var} value to get the class for
     * @return {String} the internal class of the value
     */
    getClass : qx.Bootstrap.getClass,
    /**
     * Whether the value is a string.
     *
     * @signature function(value)
     * @param value {var} Value to check.
     * @return {Boolean} Whether the value is a string.
     */
    isString : qx.Bootstrap.isString,
    /**
     * Whether the value is an array.
     *
     * @signature function(value)
     * @param value {var} Value to check.
     * @return {Boolean} Whether the value is an array.
     */
    isArray : qx.Bootstrap.isArray,
    /**
     * Whether the value is an object. Note that built-in types like Window are
     * not reported to be objects.
     *
     * @signature function(value)
     * @param value {var} Value to check.
     * @return {Boolean} Whether the value is an object.
     */
    isObject : qx.Bootstrap.isObject,
    /**
     * Whether the value is a function.
     *
     * @signature function(value)
     * @param value {var} Value to check.
     * @return {Boolean} Whether the value is a function.
     */
    isFunction : qx.Bootstrap.isFunction,
    /**
    * Whether the value is a boolean.
    *
    * @param value {var} Value to check.
    * @return {Boolean} Whether the value is a boolean.
    */
    isBoolean : function(value){

      // Added "value !== null" because IE throws an exception "Object expected"
      // by executing "value instanceof Boolean" if value is a DOM element that
      // doesn't exist. It seems that there is an internal different between a
      // JavaScript null and a null returned from calling DOM.
      // e.q. by document.getElementById("ReturnedNull").
      return (value !== null && (this.getClass(value) == "Boolean" || value instanceof Boolean));
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)

************************************************************************ */
/**
 * A collection of assertions.
 *
 * These methods can be used to assert incoming parameters, return values, ...
 * If an assertion fails an {@link AssertionError} is thrown.
 *
 * Assertions are used in unit tests as well.
 *
 * @require(qx.lang.Type)
 */
qx.Class.define("qx.core.Assert", {
  statics : {
    __logError : true,
    /**
     * Assert that the condition evaluates to <code>true</code>. An
     * {@link AssertionError} is thrown if otherwise.
     *
     * @param comment {String} Message to be shown if the assertion fails. This
     *    message is provided by the user.
     * @param msgvarargs {var} any number of parts of a message to show if assertion
     *                         triggers. Each will be converted to a string and all
     *                         parts will be concatenated. E. g. instead of
     *                         "Got invalid value " + this.__toString(val) + "!!!!!"
     *                         use
     *                         "Got invalid value ", val, "!!!!!"
     *                         (much better performance)
     *
     */
    __fail : function(comment, msgvarargs){

      // Build up message from message varargs. It's not really important
      // how long this takes as it is done only when assertion is triggered
      var msg = "";
      for(var i = 1,l = arguments.length;i < l;i++){

        msg = msg + this.__toString(arguments[i] === undefined ? "'undefined'" : arguments[i]);
      };
      var fullComment = "";
      if(msg){

        fullComment = comment + ": " + msg;
      } else {

        fullComment = comment;
      };
      var errorMsg = "Assertion error! " + fullComment;
      if(qx.Class.isDefined("qx.core.AssertionError")){

        var err = new qx.core.AssertionError(comment, msg);
        if(this.__logError){

          qx.Bootstrap.error(errorMsg + "\n Stack trace: \n" + err.getStackTrace());
        };
        throw err;
      } else {

        if(this.__logError){

          qx.Bootstrap.error(errorMsg);
        };
        throw new Error(errorMsg);
      };
    },
    /**
     * Convert an unknown value to a string to display in error messages
     *
     * @param value {var} any value
     * @return {String} a string representation of the value
     */
    __toString : function(value){

      var stringValue;
      if(value === null){

        stringValue = "null";
      } else if(qx.lang.Type.isArray(value) && value.length > 10){

        stringValue = "Array[" + value.length + "]";
      } else if((value instanceof Object) && (value.toString == null)){

        stringValue = qx.lang.Json.stringify(value, null, 2);
      } else {

        try{

          stringValue = value.toString();
        } catch(e) {

          stringValue = "";
        };
      };;
      return stringValue;
    },
    /**
     * Assert that the value is <code>false</code> (Identity check).
     *
     * @param value {Boolean} Condition to check for. Must be identical to
     *    <code>false</code>.
     * @param msg {String} Message to be shown if the assertion fails.
     */
    assertFalse : function(value, msg){

      (value === false) || this.__fail(msg || "", "Called assertFalse with '", value, "'");
    },
    /**
     * Assert that the value is not <code>undefined</code>.
     *
     * @param value {var} Value to check
     * @param msg {String} Message to be shown if the assertion fails.
     */
    assertNotUndefined : function(value, msg){

      value !== undefined || this.__fail(msg || "", "Expected value not to be undefined but found undefined!");
    },
    /**
     * Assert that the value is not <code>null</code>.
     *
     * @param value {var} Value to check
     * @param msg {String} Message to be shown if the assertion fails.
     */
    assertNotNull : function(value, msg){

      value !== null || this.__fail(msg || "", "Expected value not to be null but found null!");
    },
    /**
     * Assert that the value is a function.
     *
     * @param value {var} Value to check
     * @param msg {String} Message to be shown if the assertion fails.
     */
    assertFunction : function(value, msg){

      qx.lang.Type.isFunction(value) || this.__fail(msg || "", "Expected value to be typeof function but found ", value, "!");
    },
    /**
     * Assert that the value is a string.
     *
     * @param value {var} Value to check
     * @param msg {String} Message to be shown if the assertion fails.
     */
    assertString : function(value, msg){

      qx.lang.Type.isString(value) || this.__fail(msg || "", "Expected value to be a string but found ", value, "!");
    },
    /**
     * Assert that the value is a boolean.
     *
     * @param value {var} Value to check
     * @param msg {String} Message to be shown if the assertion fails.
     */
    assertBoolean : function(value, msg){

      qx.lang.Type.isBoolean(value) || this.__fail(msg || "", "Expected value to be a boolean but found ", value, "!");
    },
    /**
     * Assert that the value is an object.
     *
     * @param value {var} Value to check
     * @param msg {String} Message to be shown if the assertion fails.
     */
    assertObject : function(value, msg){

      var condition = value !== null && (qx.lang.Type.isObject(value) || typeof value === "object");
      condition || this.__fail(msg || "", "Expected value to be typeof object but found ", (value), "!");
    },
    /**
     * Assert that the value is an array.
     *
     * @param value {var} Value to check
     * @param msg {String} Message to be shown if the assertion fails.
     */
    assertArray : function(value, msg){

      qx.lang.Type.isArray(value) || this.__fail(msg || "", "Expected value to be an array but found ", value, "!");
    },
    /**
     * Assert that the value is a map either created using <code>new Object</code>
     * or by using the object literal notation <code>{ ... }</code>.
     *
     * @param value {var} Value to check
     * @param msg {String} Message to be shown if the assertion fails.
     */
    assertMap : function(value, msg){

      qx.lang.Type.isObject(value) || this.__fail(msg || "", "Expected value to be a map but found ", value, "!");
    },
    /**
     * Assert that the value is an instance of the given class.
     *
     * @param value {var} Value to check
     * @param clazz {Class} The value must be an instance of this class
     * @param msg {String} Message to be shown if the assertion fails.
     */
    assertInstance : function(value, clazz, msg){

      var className = clazz.classname || clazz + "";
      value instanceof clazz || this.__fail(msg || "", "Expected value to be instanceof '", className, "' but found ", value, "!");
    },
    /**
     * Assert that the value implements the given interface.
     *
     * @param value {var} Value to check
     * @param iface {Class} The value must implement this interface
     * @param msg {String} Message to be shown if the assertion fails.
     */
    assertInterface : function(value, iface, msg){

      qx.Class.implementsInterface(value, iface) || this.__fail(msg || "", "Expected object '", value, "' to implement the interface '", iface, "'!");
    },
    /**
     * Assert that the value is a DOM element.
     *
     * @param value {var} Value to check
     * @param msg {String} Message to be shown if the assertion fails.
     */
    assertElement : function(value, msg){

      // see qx.dom.Node.isElement
      !!(value && value.nodeType === 1) || this.__fail(msg || "", "Expected value to be a DOM element but found  '", value, "'!");
    }
  }
});

/* ************************************************************************

  qooxdoo - the new era of web development

  http://qooxdoo.org

  Copyright:
    2007-2008 1&1 Internet AG, Germany, http://www.1und1.de

  License:
    LGPL: http://www.gnu.org/licenses/lgpl.html
    EPL: http://www.eclipse.org/org/documents/epl-v10.php
    See the LICENSE file in the project's top-level directory for details.

  Authors:
    * Fabian Jakobs (fjakobs)
    * Martin Wittemann (martinwittemann)

************************************************************************ */
/**
 * This class is the common super class for all error classes in qooxdoo.
 *
 * It has a comment and a fail message as members. The toString method returns
 * the comment and the fail message separated by a colon.
 */
qx.Class.define("qx.type.BaseError", {
  extend : Error,
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  /**
   * @param comment {String} Comment passed to the assertion call
   * @param failMessage {String} Fail message provided by the assertion
   */
  construct : function(comment, failMessage){

    var inst = Error.call(this, failMessage);
    // map stack trace properties since they're not added by Error's constructor
    if(inst.stack){

      this.stack = inst.stack;
    };
    if(inst.stacktrace){

      this.stacktrace = inst.stacktrace;
    };
    this.__comment = comment || "";
    // opera 10 crashes if the message is an empty string!!!?!?!
    this.message = failMessage || qx.type.BaseError.DEFAULTMESSAGE;
  },
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    DEFAULTMESSAGE : "error"
  },
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members : {
    __sTrace : null,
    __comment : null,
    /** @type {String} Fail message provided by the assertion */
    message : null,
    /**
     * Comment passed to the assertion call
     *
     * @return {String} The comment passed to the assertion call
     */
    getComment : function(){

      return this.__comment;
    },
    /**
     * Get the error message
     *
     * @return {String} The error message
     */
    toString : function(){

      return this.__comment + (this.message ? ": " + this.message : "");
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)

************************************************************************ */
/**
 * Assertion errors are thrown if an assertion in {@link qx.core.Assert}
 * fails.
 */
qx.Class.define("qx.core.AssertionError", {
  extend : qx.type.BaseError,
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  /**
   * @param comment {String} Comment passed to the assertion call
   * @param failMessage {String} Fail message provided by the assertion
   */
  construct : function(comment, failMessage){

    qx.type.BaseError.call(this, comment, failMessage);
    this.__trace = qx.dev.StackTrace.getStackTrace();
  },
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members : {
    __trace : null,
    /**
     * Stack trace of the error
     *
     * @return {String[]} The stack trace of the location the exception was thrown
     */
    getStackTrace : function(){

      return this.__trace;
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)

************************************************************************ */
/**
 * Methods to get information about the JavaScript call stack.
 *
 * @require(qx.lang.normalize.String)
 * @ignore(qx.bom.client.EcmaScript.*)
 * @ignore(qx.Class.*)
 */
qx.Bootstrap.define("qx.dev.StackTrace", {
  statics : {
    /**
     * Optional user-defined function to convert source file names into readable
     * class names. Will be called with the source file name extracted from the
     * browser's stack trace information as the only argument. The returned
     * string is used in the output of {@link #getStackTraceFromError}
     */
    FILENAME_TO_CLASSNAME : null,
    /**
     * Optional user-defined formatting function for stack trace information.
     * Will be called by with an array of strings representing the calls in the
     * stack trace. {@link #getStackTraceFromError} will return the output of
     * this function. Must return an array of strings.
     */
    FORMAT_STACKTRACE : null,
    /**
     * Get a stack trace of the current position in the code.
     *
     * Browser compatibility:
     * <ul>
     *   <li>In new versions of Gecko, WebKit and Opera, the output of
     *   {@link #getStackTraceFromError} and {@link #getStackTraceFromCaller} is
     *   combined to generate the richest trace, including line numbers.</li>
     *   <li>For Internet Explorer (and other engines that do not provide stack
     *    traces), {@link #getStackTraceFromCaller} is used</li>
     * </ul>
     *
     * @return {String[]} Stack trace of the current position in the code. Each line in the array
     *     represents one call in the stack trace.
     */
    getStackTrace : function(){

      var trace = [];
      try{

        throw new Error();
      } catch(ex) {

        if(qx.dev.StackTrace.hasEnvironmentCheck && qx.core.Environment.get("ecmascript.error.stacktrace")){

          var errorTrace = qx.dev.StackTrace.getStackTraceFromError(ex);
          var callerTrace = qx.dev.StackTrace.getStackTraceFromCaller(arguments);
          qx.lang.Array.removeAt(errorTrace, 0);
          trace = callerTrace.length > errorTrace.length ? callerTrace : errorTrace;
          for(var i = 0;i < Math.min(callerTrace.length, errorTrace.length);i++){

            var callerCall = callerTrace[i];
            if(callerCall.indexOf("anonymous") >= 0){

              continue;
            };
            var methodName = null;
            var callerArr = callerCall.split(".");
            var mO = /(.*?)\(/.exec(callerArr[callerArr.length - 1]);
            if(mO && mO.length == 2){

              methodName = mO[1];
              callerArr.pop();
            };
            if(callerArr[callerArr.length - 1] == "prototype"){

              callerArr.pop();
            };
            var callerClassName = callerArr.join(".");
            var errorCall = errorTrace[i];
            var errorArr = errorCall.split(":");
            var errorClassName = errorArr[0];
            var lineNumber = errorArr[1];
            var columnNumber;
            if(errorArr[2]){

              columnNumber = errorArr[2];
            };
            var className = null;
            if(qx.Class && qx.Class.getByName(errorClassName)){

              className = errorClassName;
            } else {

              className = callerClassName;
            };
            var line = className;
            if(methodName){

              line += "." + methodName;
            };
            line += ":" + lineNumber;
            if(columnNumber){

              line += ":" + columnNumber;
            };
            trace[i] = line;
          };
        } else {

          trace = this.getStackTraceFromCaller(arguments);
        };
      };
      return trace;
    },
    /**
     * Get a stack trace from the arguments special variable using the
     * <code>caller</code> property.
     *
     * This methods returns class/mixin and function names of each step
     * in the call stack.
     *
     * Recursion is not supported.
     *
     * @param args {arguments} arguments variable.
     * @return {String[]} Stack trace of caller of the function the arguments variable belongs to.
     *     Each line in the array represents one call in the stack trace.
     * @signature function(args)
     */
    getStackTraceFromCaller : function(args){

      var trace = [];
      var fcn = qx.lang.Function.getCaller(args);
      var knownFunction = {
      };
      while(fcn){

        var fcnName = qx.lang.Function.getName(fcn);
        trace.push(fcnName);
        try{

          fcn = fcn.caller;
        } catch(ex) {

          break;
        };
        if(!fcn){

          break;
        };
        // avoid infinite recursion
        var hash = qx.core.ObjectRegistry.toHashCode(fcn);
        if(knownFunction[hash]){

          trace.push("...");
          break;
        };
        knownFunction[hash] = fcn;
      };
      return trace;
    },
    /**
     * Try to get a stack trace from an Error object. Mozilla sets the field
     * <code>stack</code> for Error objects thrown using <code>throw new Error()</code>.
     * From this field it is possible to get a stack trace from the position
     * the exception was thrown at.
     *
     * This will get the JavaScript file names and the line numbers of each call.
     * The file names are converted into qooxdoo class names if possible (customizable
     * via {@link #FILENAME_TO_CLASSNAME}).
     *
     * The stack trace can be custom formatted using {@link #FORMAT_STACKTRACE}.
     *
     * This works reliably in Gecko-based browsers. Later Opera versions and
     * Chrome also provide a useful stack trace. For Safari, only the class or
     * file name and line number where the error occurred are returned.
     * IE 6/7/8/9 does not attach any stack information to error objects so an
     * empty array is returned.
     *
     * @param error {Error} Error exception instance.
     * @return {String[]} Stack trace of the exception. Each line in the array
     *     represents one call in the stack trace.
     */
    getStackTraceFromError : function(error){

      var trace = [];
      var lineRe,hit,className,lineNumber,columnNumber,fileName,url;
      var traceProp = qx.dev.StackTrace.hasEnvironmentCheck ? qx.core.Environment.get("ecmascript.error.stacktrace") : null;
      if(traceProp === "stack"){

        if(!error.stack){

          return trace;
        };
        // Gecko style, e.g. "()@http://localhost:8080/webcomponent-test-SNAPSHOT/webcomponent/js/com/ptvag/webcomponent/common/log/Logger:253"
        lineRe = /@(.+):(\d+)$/gm;
        while((hit = lineRe.exec(error.stack)) != null){

          url = hit[1];
          lineNumber = hit[2];
          className = this.__fileNameToClassName(url);
          trace.push(className + ":" + lineNumber);
        };
        if(trace.length > 0){

          return this.__formatStackTrace(trace);
        };
        /*
         * Chrome trace info comes in two flavors:
         * at [jsObject].function (fileUrl:line:char)
         * at fileUrl:line:char
         */
        lineRe = /at (.*)/gm;
        var fileReParens = /\((.*?)(:[^\/].*)\)/;
        var fileRe = /(.*?)(:[^\/].*)/;
        while((hit = lineRe.exec(error.stack)) != null){

          var fileMatch = fileReParens.exec(hit[1]);
          if(!fileMatch){

            fileMatch = fileRe.exec(hit[1]);
          };
          if(fileMatch){

            className = this.__fileNameToClassName(fileMatch[1]);
            trace.push(className + fileMatch[2]);
          } else {

            trace.push(hit[1]);
          };
        };
      } else if(traceProp === "stacktrace"){

        // Opera
        var stacktrace = error.stacktrace;
        if(!stacktrace){

          return trace;
        };
        if(stacktrace.indexOf("Error created at") >= 0){

          stacktrace = stacktrace.split("Error created at")[0];
        };
        // new Opera style (10.6+)
        lineRe = /line\ (\d+?),\ column\ (\d+?)\ in\ (?:.*?)\ in\ (.*?):[^\/]/gm;
        while((hit = lineRe.exec(stacktrace)) != null){

          lineNumber = hit[1];
          columnNumber = hit[2];
          url = hit[3];
          className = this.__fileNameToClassName(url);
          trace.push(className + ":" + lineNumber + ":" + columnNumber);
        };
        if(trace.length > 0){

          return this.__formatStackTrace(trace);
        };
        // older Opera style
        lineRe = /Line\ (\d+?)\ of\ linked\ script\ (.*?)$/gm;
        while((hit = lineRe.exec(stacktrace)) != null){

          lineNumber = hit[1];
          url = hit[2];
          className = this.__fileNameToClassName(url);
          trace.push(className + ":" + lineNumber);
        };
      } else if(error.message && error.message.indexOf("Backtrace:") >= 0){

        // Some old Opera versions append the trace to the message property
        var traceString = error.message.split("Backtrace:")[1].trim();
        var lines = traceString.split("\n");
        for(var i = 0;i < lines.length;i++){

          var reResult = lines[i].match(/\s*Line ([0-9]+) of.* (\S.*)/);
          if(reResult && reResult.length >= 2){

            lineNumber = reResult[1];
            fileName = this.__fileNameToClassName(reResult[2]);
            trace.push(fileName + ":" + lineNumber);
          };
        };
      } else if(error.sourceURL && error.line){

        // Safari
        trace.push(this.__fileNameToClassName(error.sourceURL) + ":" + error.line);
      };;;
      return this.__formatStackTrace(trace);
    },
    /**
     * Converts the URL of a JavaScript file to a class name using either a
     * user-defined ({@link #FILENAME_TO_CLASSNAME}) or default
     * ({@link #__fileNameToClassNameDefault}) converter
     *
     * @param fileName {String} URL of the JavaScript file
     * @return {String} Result of the conversion
     */
    __fileNameToClassName : function(fileName){

      if(typeof qx.dev.StackTrace.FILENAME_TO_CLASSNAME == "function"){

        var convertedName = qx.dev.StackTrace.FILENAME_TO_CLASSNAME(fileName);
        if(qx.core.Environment.get("qx.debug") && !qx.lang.Type.isString(convertedName)){

          throw new Error("FILENAME_TO_CLASSNAME must return a string!");
        };
        return convertedName;
      };
      return qx.dev.StackTrace.__fileNameToClassNameDefault(fileName);
    },
    /**
     * Converts the URL of a JavaScript file to a class name if the file is
     * named using the qooxdoo naming conventions.
     *
     * @param fileName {String} URL of the JavaScript file
     * @return {String} class name of the file if conversion was possible.
     * Otherwise the fileName is returned unmodified.
     */
    __fileNameToClassNameDefault : function(fileName){

      var scriptDir = "/source/class/";
      var jsPos = fileName.indexOf(scriptDir);
      var paramPos = fileName.indexOf("?");
      if(paramPos >= 0){

        fileName = fileName.substring(0, paramPos);
      };
      var className = (jsPos == -1) ? fileName : fileName.substring(jsPos + scriptDir.length).replace(/\//g, ".").replace(/\.js$/, "");
      return className;
    },
    /**
     * Runs the given stack trace array through the formatter function
     * ({@link #FORMAT_STACKTRACE}) if available and returns it. Otherwise, the
     * original array is returned
     *
     * @param trace {String[]} Stack trace information
     * @return {String[]} Formatted stack trace info
     */
    __formatStackTrace : function(trace){

      if(typeof qx.dev.StackTrace.FORMAT_STACKTRACE == "function"){

        trace = qx.dev.StackTrace.FORMAT_STACKTRACE(trace);
        // Can't use qx.core.Assert here since it throws an AssertionError which
        // calls getStackTrace in its constructor, leading to infinite recursion
        if(qx.core.Environment.get("qx.debug") && !qx.lang.Type.isArray(trace)){

          throw new Error("FORMAT_STACKTRACE must return an array of strings!");
        };
      };
      return trace;
    }
  },
  defer : function(statics){

    // This is necessary to avoid an infinite loop when logging the absence
    // of the "ecmascript.error.stacktrace" environment key.
    statics.hasEnvironmentCheck = qx.bom.client.EcmaScript && qx.bom.client.EcmaScript.getStackTrace;
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

   ======================================================================

   This class contains code based on the following work:

   * Mootools
     http://mootools.net
     Version 1.1.1

     Copyright:
       2007 Valerio Proietti

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

************************************************************************ */
/**
 * Collection of helper methods operating on functions.
 *
 * @ignore(qx.core.Object)
 * @require(qx.lang.Array)
 */
qx.Bootstrap.define("qx.lang.Function", {
  statics : {
    /**
     * Extract the caller of a function from the arguments variable.
     * This will not work in Opera < 9.6.
     *
     * @param args {arguments} The local arguments variable
     * @return {Function} A reference to the calling function or "undefined" if caller is not supported.
     */
    getCaller : function(args){

      return args.caller ? args.caller.callee : args.callee.caller;
    },
    /**
     * Try to get a sensible textual description of a function object.
     * This may be the class/mixin and method name of a function
     * or at least the signature of the function.
     *
     * @param fcn {Function} function the get the name for.
     * @return {String} Name of the function.
     */
    getName : function(fcn){

      if(fcn.displayName){

        return fcn.displayName;
      };
      if(fcn.$$original || fcn.wrapper || fcn.classname){

        return fcn.classname + ".constructor()";
      };
      if(fcn.$$mixin){

        //members
        for(var key in fcn.$$mixin.$$members){

          if(fcn.$$mixin.$$members[key] == fcn){

            return fcn.$$mixin.name + ".prototype." + key + "()";
          };
        };
        // statics
        for(var key in fcn.$$mixin){

          if(fcn.$$mixin[key] == fcn){

            return fcn.$$mixin.name + "." + key + "()";
          };
        };
      };
      if(fcn.self){

        var clazz = fcn.self.constructor;
        if(clazz){

          // members
          for(var key in clazz.prototype){

            if(clazz.prototype[key] == fcn){

              return clazz.classname + ".prototype." + key + "()";
            };
          };
          // statics
          for(var key in clazz){

            if(clazz[key] == fcn){

              return clazz.classname + "." + key + "()";
            };
          };
        };
      };
      var fcnReResult = fcn.toString().match(/function\s*(\w*)\s*\(.*/);
      if(fcnReResult && fcnReResult.length >= 1 && fcnReResult[1]){

        return fcnReResult[1] + "()";
      };
      return 'anonymous()';
    },
    /**
     * Base function for creating functional closures which is used by most other methods here.
     *
     * *Syntax*
     *
     * <pre class='javascript'>var createdFunction = qx.lang.Function.create(myFunction, [options]);</pre>
     *
     * @param func {Function} Original function to wrap
     * @param options {Map?} Map of options
     * <ul>
     * <li><strong>self</strong>: The object that the "this" of the function will refer to. Default is the same as the wrapper function is called.</li>
     * <li><strong>args</strong>: An array of arguments that will be passed as arguments to the function when called.
     *     Default is no custom arguments; the function will receive the standard arguments when called.</li>
     * <li><strong>delay</strong>: If set, the returned function will delay the actual execution by this amount of milliseconds and return a timer handle when called.
     *     Default is no delay.</li>
     * <li><strong>periodical</strong>: If set the returned function will periodically perform the actual execution with this specified interval
     *      and return a timer handle when called. Default is no periodical execution.</li>
     * <li><strong>attempt</strong>: If set to true, the returned function will try to execute and return either the results or false on error. Default is false.</li>
     * </ul>
     *
     * @return {Function} Wrapped function
     */
    create : function(func, options){

      if(qx.core.Environment.get("qx.debug")){

        qx.core.Assert && qx.core.Assert.assertFunction(func, "Invalid parameter 'func'.");
      };
      // Nothing to be done when there are no options.
      if(!options){

        return func;
      };
      // Check for at least one attribute.
      if(!(options.self || options.args || options.delay != null || options.periodical != null || options.attempt)){

        return func;
      };
      return function(event){

        if(qx.core.Environment.get("qx.debug")){

          if(qx.core.Object && options.self && qx.Bootstrap.isObject(options.self) && options.self.isDisposed && qx.Bootstrap.isFunction(options.self.isDisposed)){

            qx.core.Assert && qx.core.Assert.assertFalse(options.self.isDisposed(), "Trying to call a bound function with a disposed object as context: " + options.self.toString() + " :: " + qx.lang.Function.getName(func));
          };
        };
        // Convert (and copy) incoming arguments
        var args = qx.lang.Array.fromArguments(arguments);
        // Prepend static arguments
        if(options.args){

          args = options.args.concat(args);
        };
        if(options.delay || options.periodical){

          var returns = function(){

            return func.apply(options.self || this, args);
          };
          if(qx.core.Environment.get("qx.globalErrorHandling")){

            returns = qx.event.GlobalError.observeMethod(returns);
          };
          if(options.delay){

            return window.setTimeout(returns, options.delay);
          };
          if(options.periodical){

            return window.setInterval(returns, options.periodical);
          };
        } else if(options.attempt){

          var ret = false;
          try{

            ret = func.apply(options.self || this, args);
          } catch(ex) {
          };
          return ret;
        } else {

          return func.apply(options.self || this, args);
        };
      };
    },
    /**
     * Returns a function whose "this" is altered.
     *
     *
     * *Native way*
     *
     * This is also a feature of JavaScript 1.8.5 and will be supplied
     * by modern browsers. Including {@link qx.lang.normalize.Function}
     * will supply a cross browser normalization of the native
     * implementation. We like to encourage you to use the native function!
     *
     *
     * *Syntax*
     *
     * <pre class='javascript'>qx.lang.Function.bind(myFunction, [self, [varargs...]]);</pre>
     *
     * *Example*
     *
     * <pre class='javascript'>
     * function myFunction()
     * {
     *   this.setStyle('color', 'red');
     *   // note that 'this' here refers to myFunction, not an element
     *   // we'll need to bind this function to the element we want to alter
     * };
     *
     * var myBoundFunction = qx.lang.Function.bind(myFunction, myElement);
     * myBoundFunction(); // this will make the element myElement red.
     * </pre>
     *
     * If you find yourself using this static method a lot, you may be
     * interested in the bindTo() method in the mixin qx.core.MBindTo.
     *
     * @see qx.core.MBindTo
     *
     * @param func {Function} Original function to wrap
     * @param self {Object ? null} The object that the "this" of the function will refer to.
     * @param varargs {arguments ? null} The arguments to pass to the function.
     * @return {Function} The bound function.
     */
    bind : function(func, self, varargs){

      return this.create(func, {
        self : self,
        args : arguments.length > 2 ? qx.lang.Array.fromArguments(arguments, 2) : null
      });
    },
    /**
     * Returns a function which could be used as a listener for a native event callback.
     *
     * *Syntax*
     *
     * <pre class='javascript'>qx.lang.Function.listener(myFunction, [self, [varargs...]]);</pre>
     *
     * @param func {Function} Original function to wrap
     * @param self {Object ? null} The object that the "this" of the function will refer to.
     * @param varargs {arguments ? null} The arguments to pass to the function.
     * @return {var} The bound function.
     */
    listener : function(func, self, varargs){

      if(arguments.length < 3){

        return function(event){

          // Directly execute, but force first parameter to be the event object.
          return func.call(self || this, event || window.event);
        };
      } else {

        var optargs = qx.lang.Array.fromArguments(arguments, 2);
        return function(event){

          var args = [event || window.event];
          // Append static arguments
          args.push.apply(args, optargs);
          // Finally execute original method
          func.apply(self || this, args);
        };
      };
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)
     * Martin Wittemann (martinwittemann)

************************************************************************ */
/**
 * The GlobalError class stores a reference to a global error handler function.
 *
 *  This function is called for each uncatched JavaScript exception. To enable
 *  global error handling the setting <code>qx.globalErrorHandling</code> must
 *  be enabled and an error handler must be registered.
 *  Further each JavaScript "entry point" must be wrapped with a call to
 *  {@link qx.event.GlobalError#observeMethod}.
 *
 * @ignore(qx.core, qx.core.Environment)
 */
qx.Bootstrap.define("qx.event.GlobalError", {
  statics : {
    __callback : null,
    __originalOnError : null,
    __context : null,
    /**
     * Little helper to check if the global error handling is enabled.
     * @return {Boolean} <code>true</code>, if it is enabled.
     */
    __isGlobaErrorHandlingEnabled : function(){

      if(qx.core && qx.core.Environment){

        return qx.core.Environment.get("qx.globalErrorHandling");
      } else {

        return !!qx.Bootstrap.getEnvironmentSetting("qx.globalErrorHandling");
      };
    },
    /**
     * Set the global fallback error handler
     *
     * @param callback {Function} The error handler. The first argument is the
     *    exception, which caused the error
     * @param context {Object} The "this" context of the callback function
     */
    setErrorHandler : function(callback, context){

      this.__callback = callback || null;
      this.__context = context || window;
      if(this.__isGlobaErrorHandlingEnabled()){

        // wrap the original onerror
        if(callback && window.onerror){

          var wrappedHandler = qx.Bootstrap.bind(this.__onErrorWindow, this);
          if(this.__originalOnError == null){

            this.__originalOnError = window.onerror;
          };
          var self = this;
          window.onerror = function(msg, uri, lineNumber){

            self.__originalOnError(msg, uri, lineNumber);
            wrappedHandler(msg, uri, lineNumber);
          };
        };
        if(callback && !window.onerror){

          window.onerror = qx.Bootstrap.bind(this.__onErrorWindow, this);
        };
        // reset
        if(this.__callback == null){

          if(this.__originalOnError != null){

            window.onerror = this.__originalOnError;
            this.__originalOnError = null;
          } else {

            window.onerror = null;
          };
        };
      };
    },
    /**
     * Catches all errors of the <code>window.onerror</code> handler
     * and passes an {@link qx.core.WindowError} object to the error
     * handling.
     *
     * @param msg {String} browser error message
     * @param uri {String} uri to errornous script
     * @param lineNumber {Integer} line number of error
     */
    __onErrorWindow : function(msg, uri, lineNumber){

      if(this.__callback){

        this.handleError(new qx.core.WindowError(msg, uri, lineNumber));
      };
    },
    /**
     * Wraps a method with error handling code. Only methods, which are called
     * directly by the browser (e.g. event handler) should be wrapped.
     *
     * @param method {Function} method to wrap
     * @return {Function} The function wrapped with error handling code
     */
    observeMethod : function(method){

      if(this.__isGlobaErrorHandlingEnabled()){

        var self = this;
        return function(){

          if(!self.__callback){

            return method.apply(this, arguments);
          };
          try{

            return method.apply(this, arguments);
          } catch(ex) {

            self.handleError(new qx.core.GlobalError(ex, arguments));
          };
        };
      } else {

        return method;
      };
    },
    /**
     * Delegates every given exception to the registered error handler
     *
     * @param ex {qx.core.WindowError|Error} Exception to delegate
     */
    handleError : function(ex){

      if(this.__callback){

        this.__callback.call(this.__context, ex);
      };
    }
  },
  defer : function(statics){

    // only use the environment class if already loaded
    if(qx.core && qx.core.Environment){

      qx.core.Environment.add("qx.globalErrorHandling", true);
    } else {

      qx.Bootstrap.setEnvironmentSetting("qx.globalErrorHandling", true);
    };
    statics.setErrorHandler(null, null);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)

************************************************************************ */
/**
 * This exception is thrown by the {@link qx.event.GlobalError} handler if a
 * <code>window.onerror</code> event occurs in the browser.
 */
qx.Bootstrap.define("qx.core.WindowError", {
  extend : Error,
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  /**
   * @param failMessage {String} The error message
   * @param uri {String} URI where error was raised
   * @param lineNumber {Integer} The line number where the error was raised
   */
  construct : function(failMessage, uri, lineNumber){

    var inst = Error.call(this, failMessage);
    // map stack trace properties since they're not added by Error's constructor
    if(inst.stack){

      this.stack = inst.stack;
    };
    if(inst.stacktrace){

      this.stacktrace = inst.stacktrace;
    };
    this.__failMessage = failMessage;
    this.__uri = uri || "";
    this.__lineNumber = lineNumber === undefined ? -1 : lineNumber;
  },
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members : {
    __failMessage : null,
    __uri : null,
    __lineNumber : null,
    /**
     * Returns the error message.
     *
     * @return {String} error message
     */
    toString : function(){

      return this.__failMessage;
    },
    /**
     * Get the URI where error was raised
     *
     * @return {String} URI where error was raised
     */
    getUri : function(){

      return this.__uri;
    },
    /**
     * Get the line number where the error was raised
     *
     * @return {Integer} The line number where the error was raised
     */
    getLineNumber : function(){

      return this.__lineNumber;
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Michael Haitz (mhaitz)

************************************************************************ */
/**
 * This exception is thrown by the {@link qx.event.GlobalError} handler if a
 * observed method throws an exception.
 */
qx.Bootstrap.define("qx.core.GlobalError", {
  extend : Error,
  /**
   * @param exc {Error} source exception
   * @param args {Array} arguments
   */
  construct : function(exc, args){

    // Do not use the Environment class to keep the minimal
    // package size small [BUG #5068]
    if(qx.Bootstrap.DEBUG){

      qx.core.Assert.assertNotUndefined(exc);
    };
    this.__failMessage = "GlobalError: " + (exc && exc.message ? exc.message : exc);
    var inst = Error.call(this, this.__failMessage);
    // map stack trace properties since they're not added by Error's constructor
    if(inst.stack){

      this.stack = inst.stack;
    };
    if(inst.stacktrace){

      this.stacktrace = inst.stacktrace;
    };
    this.__arguments = args;
    this.__exc = exc;
  },
  members : {
    __exc : null,
    __arguments : null,
    __failMessage : null,
    /**
     * Returns the error message.
     *
     * @return {String} error message
     */
    toString : function(){

      return this.__failMessage;
    },
    /**
     * Returns the arguments which are
     *
     * @return {Object} arguments
     */
    getArguments : function(){

      return this.__arguments;
    },
    /**
     * Get the source exception
     *
     * @return {Error} source exception
     */
    getSourceException : function(){

      return this.__exc;
    }
  },
  destruct : function(){

    this.__exc = null;
    this.__arguments = null;
    this.__failMessage = null;
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

************************************************************************ */
/**
 * Registration for all instances of qooxdoo classes. Mainly
 * used to manage them for the final shutdown sequence and to
 * use weak references when connecting widgets to DOM nodes etc.
 *
 * @ignore(qx.dev, qx.dev.Debug.*)
 */
qx.Bootstrap.define("qx.core.ObjectRegistry", {
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    /** @type {Boolean} Whether the application is in the shutdown phase */
    inShutDown : false,
    /** @type {Map} Internal data structure to store objects */
    __registry : {
    },
    /** @type {Integer} Next new hash code. */
    __nextHash : 0,
    /** @type {Array} List of all free hash codes */
    __freeHashes : [],
    /** @type {String} Post id for hash code creation. */
    __postId : "",
    /** @type {Map} Object hashes to stack traces (for dispose profiling only) */
    __stackTraces : {
    },
    /**
     * Registers an object into the database. This adds a hashcode
     * to the object (if not already done before) and stores it under
     * this hashcode. You can access this object later using the hashcode
     * by calling {@link #fromHashCode}.
     *
     * All registered objects are automatically disposed on application
     * shutdown. Each registered object must at least have a method
     * called <code>dispose</code>.
     *
     * @param obj {Object} Any object with a dispose() method
     */
    register : function(obj){

      var registry = this.__registry;
      if(!registry){

        return;
      };
      var hash = obj.$$hash;
      if(hash == null){

        // Create new hash code
        var cache = this.__freeHashes;
        if(cache.length > 0 && !qx.core.Environment.get("qx.debug.dispose")){

          hash = cache.pop();
        } else {

          hash = (this.__nextHash++) + this.__postId;
        };
        // Store hash code
        obj.$$hash = hash;
        if(qx.core.Environment.get("qx.debug.dispose")){

          if(qx.dev && qx.dev.Debug && qx.dev.Debug.disposeProfilingActive){

            this.__stackTraces[hash] = qx.dev.StackTrace.getStackTrace();
          };
        };
      };
      if(qx.core.Environment.get("qx.debug")){

        if(!obj.dispose){

          throw new Error("Invalid object: " + obj);
        };
      };
      registry[hash] = obj;
    },
    /**
     * Removes the given object from the database.
     *
     * @param obj {Object} Any previously registered object
     */
    unregister : function(obj){

      var hash = obj.$$hash;
      if(hash == null){

        return;
      };
      var registry = this.__registry;
      if(registry && registry[hash]){

        delete registry[hash];
        this.__freeHashes.push(hash);
      };
      // Delete the hash code
      try{

        delete obj.$$hash;
      } catch(ex) {

        // IE has trouble directly removing the hash
        // but it's ok with using removeAttribute
        if(obj.removeAttribute){

          obj.removeAttribute("$$hash");
        };
      };
    },
    /**
     * Returns an unique identifier for the given object. If such an identifier
     * does not yet exist, create it.
     *
     * @param obj {Object} the object to get the hashcode for
     * @return {String} unique identifier for the given object
     */
    toHashCode : function(obj){

      if(qx.core.Environment.get("qx.debug")){

        if(obj == null){

          throw new Error("Invalid object: " + obj);
        };
      };
      var hash = obj.$$hash;
      if(hash != null){

        return hash;
      };
      // Create new hash code
      var cache = this.__freeHashes;
      if(cache.length > 0){

        hash = cache.pop();
      } else {

        hash = (this.__nextHash++) + this.__postId;
      };
      // Store
      return obj.$$hash = hash;
    }
  },
  defer : function(statics){

    if(window && window.top){

      var frames = window.top.frames;
      for(var i = 0;i < frames.length;i++){

        if(frames[i] === window){

          statics.__postId = "-" + (i + 1);
          return;
        };
      };
    };
    statics.__postId = "-0";
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2013 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)
     * Richard Sternagel (rsternagel)

   ======================================================================

   This class contains code from:

   * JSON 3 (v3.2.5)

     Code:
       https://github.com/bestiejs/json3

     Copyright:
       (c) 2012-2013, Kit Cambridge

     License:
       MIT: https://raw.github.com/bestiejs/json3/gh-pages/LICENSE

   ----------------------------------------------------------------------

    Copyright (c) 2012-2013 Kit Cambridge.
    http://kitcambridge.be/

    Permission is hereby granted, free of charge, to any person obtaining a copy of
    this software and associated documentation files (the "Software"), to deal in
    the Software without restriction, including without limitation the rights to
    use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
    of the Software, and to permit persons to whom the Software is furnished to do
    so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.

************************************************************************ */
/**
 * Exposes (potentially polyfilled or patched) window.JSON to qooxdoo
 * (enabled by <a href="https://github.com/bestiejs/json3">JSON 3</a>).
 */
qx.Bootstrap.define("qx.lang.Json", {
  statics : {
    /**
     * This method produces a JSON text from a JavaScript value.
     *
     * When an object value is found, if the object contains a toJSON
     * method, its toJSON method will be called and the result will be
     * stringified. A toJSON method does not serialize: it returns the
     * value represented by the name/value pair that should be serialized,
     * or undefined if nothing should be serialized. The toJSON method
     * will be passed the key associated with the value, and this will be
     * bound to the object holding the key.
     *
     * For example, this would serialize Dates as ISO strings.
     *
     * <pre class="javascript">
     *     Date.prototype.toJSON = function (key) {
     *         function f(n) {
     *             // Format integers to have at least two digits.
     *             return n < 10 ? '0' + n : n;
     *         }
     *
     *         return this.getUTCFullYear()   + '-' +
     *              f(this.getUTCMonth() + 1) + '-' +
     *              f(this.getUTCDate())      + 'T' +
     *              f(this.getUTCHours())     + ':' +
     *              f(this.getUTCMinutes())   + ':' +
     *              f(this.getUTCSeconds())   + 'Z';
     *     };
     * </pre>
     *
     * You can provide an optional replacer method. It will be passed the
     * key and value of each member, with this bound to the containing
     * object. The value that is returned from your method will be
     * serialized. If your method returns undefined, then the member will
     * be excluded from the serialization.
     *
     * If the replacer parameter is an array of strings, then it will be
     * used to select the members to be serialized. It filters the results
     * such that only members with keys listed in the replacer array are
     * stringified.
     *
     * Values that do not have JSON representations, such as undefined or
     * functions, will not be serialized. Such values in objects will be
     * dropped; in arrays they will be replaced with null. You can use
     * a replacer function to replace those with JSON values.
     * JSON.stringify(undefined) returns undefined.
     *
     * The optional space parameter produces a stringification of the
     * value that is filled with line breaks and indentation to make it
     * easier to read.
     *
     * If the space parameter is a non-empty string, then that string will
     * be used for indentation. If the space parameter is a number, then
     * the indentation will be that many spaces.
     *
     * Example:
     *
     * <pre class="javascript">
     * text = JSON.stringify(['e', {pluribus: 'unum'}]);
     * // text is '["e",{"pluribus":"unum"}]'
     *
     *
     * text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
     * // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'
     *
     * text = JSON.stringify([new Date()], function (key, value) {
     *     return this[key] instanceof Date ?
     *         'Date(' + this[key] + ')' : value;
     * });
     * // text is '["Date(---current time---)"]'
     * </pre>
     *
     * @signature function(value, replacer, space)
     *
     * @param value {var} any JavaScript value, usually an object or array.
     *
     * @param replacer {Function?} an optional parameter that determines how
     *    object values are stringified for objects. It can be a function or an
     *    array of strings.
     *
     * @param space {String?} an optional parameter that specifies the
     *    indentation of nested structures. If it is omitted, the text will
     *    be packed without extra whitespace. If it is a number, it will specify
     *    the number of spaces to indent at each level. If it is a string
     *    (such as '\t' or '&nbsp;'), it contains the characters used to indent
     *    at each level.
     *
     * @return {String} The JSON string of the value
     */
    stringify : null,
    // will be set after the polyfill
    /**
     * This method parses a JSON text to produce an object or array.
     * It can throw a SyntaxError exception.
     *
     * The optional reviver parameter is a function that can filter and
     * transform the results. It receives each of the keys and values,
     * and its return value is used instead of the original value.
     * If it returns what it received, then the structure is not modified.
     * If it returns undefined then the member is deleted.
     *
     * Example:
     *
     * <pre class="javascript">
     * // Parse the text. Values that look like ISO date strings will
     * // be converted to Date objects.
     *
     * myData = JSON.parse(text, function (key, value)
     * {
     *   if (typeof value === 'string')
     *   {
     *     var a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
     *     if (a) {
     *       return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));
     *     }
     *   }
     *   return value;
     * });
     *
     * myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
     *     var d;
     *     if (typeof value === 'string' &&
     *             value.slice(0, 5) === 'Date(' &&
     *             value.slice(-1) === ')') {
     *         d = new Date(value.slice(5, -1));
     *         if (d) {
     *             return d;
     *         }
     *     }
     *     return value;
     * });
     * </pre>
     *
     * @signature function(text, reviver)
     *
     * @param text {String} JSON string to parse
     *
     * @param reviver {Function?} Optional reviver function to filter and
     *    transform the results
     *
     * @return {Object} The parsed JSON object
     */
    parse : null
  }
});
/*! JSON v3.2.5 | http://bestiejs.github.io/json3 | Copyright 2012-2013, Kit Cambridge | http://kit.mit-license.org */
/**
 * @ignore(define.*, exports)
 * @lint ignoreNoLoopBlock()
 */
(function(window){

  // Convenience aliases.
  var getClass = {
  }.toString,isProperty,forEach,undef;
  // Detect the `define` function exposed by asynchronous module loaders. The
  // strict `define` check is necessary for compatibility with `r.js`.
  var isLoader = typeof define === "function" && define.amd,JSON3 = typeof exports == "object" && exports;
  if(JSON3 || isLoader){

    if(typeof JSON == "object" && JSON){

      // Delegate to the native `stringify` and `parse` implementations in
      // asynchronous module loaders and CommonJS environments.
      if(JSON3){

        JSON3.stringify = JSON.stringify;
        JSON3.parse = JSON.parse;
      } else {

        JSON3 = JSON;
      };
    } else if(isLoader){

      JSON3 = window.JSON = {
      };
    };
  } else {

    // Export for web browsers and JavaScript engines.
    JSON3 = window.JSON || (window.JSON = {
    });
  };
  // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
  var isExtended = new Date(-3509827334573292);
  try{

    // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
    // results for certain dates in Opera >= 10.53.
    isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 && // Safari < 2.0.2 stores the internal millisecond time value correctly,
    // but clips the values returned by the date methods to the range of
    // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
    isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
  } catch(exception) {
  };
  // Internal: Determines whether the native `JSON.stringify` and `parse`
  // implementations are spec-compliant. Based on work by Ken Snyder.
  function has(name){

    if(name == "bug-string-char-index"){

      // IE <= 7 doesn't support accessing string characters using square
      // bracket notation. IE 8 only supports this for primitives.
      return "a"[0] != "a";
    };
    var value,serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}',isAll = name == "json";
    if(isAll || name == "json-stringify" || name == "json-parse"){

      // Test `JSON.stringify`.
      if(name == "json-stringify" || isAll){

        var stringify = JSON3.stringify,stringifySupported = typeof stringify == "function" && isExtended;
        if(stringifySupported){

          // A test function object with a custom `toJSON` method.
          (value = function(){

            return 1;
          }).toJSON = value;
          try{

            stringifySupported = // Firefox 3.1b1 and b2 serialize string, number, and boolean
            // primitives as object literals.
            stringify(0) === "0" && // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
            // literals.
            stringify(new Number()) === "0" && stringify(new String()) == '""' && // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
            // does not define a canonical JSON representation (this applies to
            // objects with `toJSON` properties as well, *unless* they are nested
            // within an object or array).
            stringify(getClass) === undef && // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
            // FF 3.1b3 pass this test.
            stringify(undef) === undef && // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
            // respectively, if the value is omitted entirely.
            stringify() === undef && // FF 3.1b1, 2 throw an error if the given value is not a number,
            // string, array, object, Boolean, or `null` literal. This applies to
            // objects with custom `toJSON` methods as well, unless they are nested
            // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
            // methods entirely.
            stringify(value) === "1" && stringify([value]) == "[1]" && // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
            // `"[null]"`.
            stringify([undef]) == "[null]" && // YUI 3.0.0b1 fails to serialize `null` literals.
            stringify(null) == "null" && // FF 3.1b1, 2 halts serialization if an array contains a function:
            // `[1, true, getClass, 1]` serializes as "[1,true,],". These versions
            // of Firefox also allow trailing commas in JSON objects and arrays.
            // FF 3.1b3 elides non-JSON values from objects and arrays, unless they
            // define custom `toJSON` methods.
            stringify([undef, getClass, null]) == "[null,null,null]" && // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
            // where character escape codes are expected (e.g., `\b` => `\u0008`).
            stringify({
              "a" : [value, true, false, null, "\x00\b\n\f\r\t"]
            }) == serialized && // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
            stringify(null, value) === "1" && stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" && // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
            // serialize extended years.
            stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' && // The milliseconds are optional in ES 5, but required in 5.1.
            stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' && // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
            // four-digit years instead of six-digit years. Credits: @Yaffle.
            stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' && // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
            // values less than 1000. Credits: @Yaffle.
            stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
          } catch(exception) {

            stringifySupported = false;
          };
        };
        if(!isAll){

          return stringifySupported;
        };
      };
      // Test `JSON.parse`.
      if(name == "json-parse" || isAll){

        var parse = JSON3.parse;
        if(typeof parse == "function"){

          try{

            // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
            // Conforming implementations should also coerce the initial argument to
            // a string prior to parsing.
            if(parse("0") === 0 && !parse(false)){

              // Simple parsing test.
              value = parse(serialized);
              var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
              if(parseSupported){

                try{

                  // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                  parseSupported = !parse('"\t"');
                } catch(exception) {
                };
                if(parseSupported){

                  try{

                    // FF 4.0 and 4.0.1 allow leading `+` signs, and leading and
                    // trailing decimal points. FF 4.0, 4.0.1, and IE 9-10 also
                    // allow certain octal literals.
                    parseSupported = parse("01") !== 1;
                  } catch(exception) {
                  };
                };
              };
            };
          } catch(exception) {

            parseSupported = false;
          };
        };
        if(!isAll){

          return parseSupported;
        };
      };
      return stringifySupported && parseSupported;
    };
  };
  if(!has("json")){

    // Common `[[Class]]` name aliases.
    var functionClass = "[object Function]";
    var dateClass = "[object Date]";
    var numberClass = "[object Number]";
    var stringClass = "[object String]";
    var arrayClass = "[object Array]";
    var booleanClass = "[object Boolean]";
    // Detect incomplete support for accessing string characters by index.
    var charIndexBuggy = has("bug-string-char-index");
    // Define additional utility methods if the `Date` methods are buggy.
    if(!isExtended){

      var floor = Math.floor;
      // A mapping between the months of the year and the number of days between
      // January 1st and the first of the respective month.
      var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
      // Internal: Calculates the number of days between the Unix epoch and the
      // first day of the given month.
      var getDay = function(year, month){

        return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
      };
    };
    // Internal: Determines if a property is a direct property of the given
    // object. Delegates to the native `Object#hasOwnProperty` method.
    if(!(isProperty = {
    }.hasOwnProperty)){

      isProperty = function(property){

        var members = {
        },constructor;
        if((members.__proto__ = null, members.__proto__ = {
          // The *proto* property cannot be set multiple times in recent
          // versions of Firefox and SeaMonkey.
          "toString" : 1
        }, members).toString != getClass){

          // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
          // supports the mutable *proto* property.
          isProperty = function(property){

            // Capture and break the object's prototype chain (see section 8.6.2
            // of the ES 5.1 spec). The parenthesized expression prevents an
            // unsafe transformation by the Closure Compiler.
            var original = this.__proto__,result = property in (this.__proto__ = null, this);
            // Restore the original prototype chain.
            this.__proto__ = original;
            return result;
          };
        } else {

          // Capture a reference to the top-level `Object` constructor.
          constructor = members.constructor;
          // Use the `constructor` property to simulate `Object#hasOwnProperty` in
          // other environments.
          isProperty = function(property){

            var parent = (this.constructor || constructor).prototype;
            return property in this && !(property in parent && this[property] === parent[property]);
          };
        };
        members = null;
        return isProperty.call(this, property);
      };
    };
    // Internal: A set of primitive types used by `isHostType`.
    var PrimitiveTypes = {
      'boolean' : 1,
      'number' : 1,
      'string' : 1,
      'undefined' : 1
    };
    // Internal: Determines if the given object `property` value is a
    // non-primitive.
    var isHostType = function(object, property){

      var type = typeof object[property];
      return type == 'object' ? !!object[property] : !PrimitiveTypes[type];
    };
    // Internal: Normalizes the `for...in` iteration algorithm across
    // environments. Each enumerated key is yielded to a `callback` function.
    forEach = function(object, callback){

      var size = 0,Properties,members,property,forEach;
      // Tests for bugs in the current environment's `for...in` algorithm. The
      // `valueOf` property inherits the non-enumerable flag from
      // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
      (Properties = function(){

        this.valueOf = 0;
      }).prototype.valueOf = 0;
      // Iterate over a new instance of the `Properties` class.
      members = new Properties();
      for(property in members){

        // Ignore all properties inherited from `Object.prototype`.
        if(isProperty.call(members, property)){

          size++;
        };
      };
      Properties = members = null;
      // Normalize the iteration algorithm.
      if(!size){

        // A list of non-enumerable properties inherited from `Object.prototype`.
        members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
        // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
        // properties.
        forEach = function(object, callback){

          var isFunction = getClass.call(object) == functionClass,property,length;
          var hasProperty = !isFunction && typeof object.constructor != 'function' && isHostType(object, 'hasOwnProperty') ? object.hasOwnProperty : isProperty;
          for(property in object){

            // Gecko <= 1.0 enumerates the `prototype` property of functions under
            // certain conditions; IE does not.
            if(!(isFunction && property == "prototype") && hasProperty.call(object, property)){

              callback(property);
            };
          };
          // Manually invoke the callback for each non-enumerable property.
          for(length = members.length;property = members[--length];hasProperty.call(object, property) && callback(property));
        };
      } else if(size == 2){

        // Safari <= 2.0.4 enumerates shadowed properties twice.
        forEach = function(object, callback){

          // Create a set of iterated properties.
          var members = {
          },isFunction = getClass.call(object) == functionClass,property;
          for(property in object){

            // Store each property name to prevent double enumeration. The
            // `prototype` property of functions is not enumerated due to cross-
            // environment inconsistencies.
            if(!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)){

              callback(property);
            };
          };
        };
      } else {

        // No bugs detected; use the standard `for...in` algorithm.
        forEach = function(object, callback){

          var isFunction = getClass.call(object) == functionClass,property,isConstructor;
          for(property in object){

            if(!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")){

              callback(property);
            };
          };
          // Manually invoke the callback for the `constructor` property due to
          // cross-environment inconsistencies.
          if(isConstructor || isProperty.call(object, (property = "constructor"))){

            callback(property);
          };
        };
      };
      return forEach(object, callback);
    };
    // Public: Serializes a JavaScript `value` as a JSON string. The optional
    // `filter` argument may specify either a function that alters how object and
    // array members are serialized, or an array of strings and numbers that
    // indicates which properties should be serialized. The optional `width`
    // argument may be either a string or number that specifies the indentation
    // level of the output.
    if(!has("json-stringify")){

      // Internal: A map of control characters and their escaped equivalents.
      var Escapes = {
        '92' : "\\\\",
        '34' : '\\"',
        '8' : "\\b",
        '12' : "\\f",
        '10' : "\\n",
        '13' : "\\r",
        '9' : "\\t"
      };
      // Internal: Converts `value` into a zero-padded string such that its
      // length is at least equal to `width`. The `width` must be <= 6.
      var leadingZeroes = "000000";
      var toPaddedString = function(width, value){

        // The `|| 0` expression is necessary to work around a bug in
        // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
        return (leadingZeroes + (value || 0)).slice(-width);
      };
      // Internal: Double-quotes a string `value`, replacing all ASCII control
      // characters (characters with code unit values between 0 and 31) with
      // their escaped equivalents. This is an implementation of the
      // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
      var unicodePrefix = "\\u00";
      var quote = function(value){

        var result = '"',index = 0,length = value.length,isLarge = length > 10 && charIndexBuggy,symbols;
        if(isLarge){

          symbols = value.split("");
        };
        for(;index < length;index++){

          var charCode = value.charCodeAt(index);
          // If the character is a control character, append its Unicode or
          // shorthand escape sequence; otherwise, append the character as-is.
          switch(charCode){case 8:case 9:case 10:case 12:case 13:case 34:case 92:
          result += Escapes[charCode];
          break;default:
          if(charCode < 32){

            result += unicodePrefix + toPaddedString(2, charCode.toString(16));
            break;
          };
          result += isLarge ? symbols[index] : charIndexBuggy ? value.charAt(index) : value[index];};
        };
        return result + '"';
      };
      // Internal: Recursively serializes an object. Implements the
      // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
      var serialize = function(property, object, callback, properties, whitespace, indentation, stack){

        var value = object[property],className,year,month,date,time,hours,minutes,seconds,milliseconds,results,element,index,length,prefix,hasMembers,result;
        try{

          // Necessary for host object support.
          value = object[property];
        } catch(exception) {
        };
        if(typeof value == "object" && value){

          className = getClass.call(value);
          if(className == dateClass && !isProperty.call(value, "toJSON")){

            if(value > -1 / 0 && value < 1 / 0){

              // Dates are serialized according to the `Date#toJSON` method
              // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
              // for the ISO 8601 date time string format.
              if(getDay){

                // Manually compute the year, month, date, hours, minutes,
                // seconds, and milliseconds if the `getUTC*` methods are
                // buggy. Adapted from @Yaffle's `date-shim` project.
                date = floor(value / 864e5);
                for(year = floor(date / 365.2425) + 1970 - 1;getDay(year + 1, 0) <= date;year++);
                for(month = floor((date - getDay(year, 0)) / 30.42);getDay(year, month + 1) <= date;month++);
                date = 1 + date - getDay(year, month);
                // The `time` value specifies the time within the day (see ES
                // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                // to compute `A modulo B`, as the `%` operator does not
                // correspond to the `modulo` operation for negative numbers.
                time = (value % 864e5 + 864e5) % 864e5;
                // The hours, minutes, seconds, and milliseconds are obtained by
                // decomposing the time within the day. See section 15.9.1.10.
                hours = floor(time / 36e5) % 24;
                minutes = floor(time / 6e4) % 60;
                seconds = floor(time / 1e3) % 60;
                milliseconds = time % 1e3;
              } else {

                year = value.getUTCFullYear();
                month = value.getUTCMonth();
                date = value.getUTCDate();
                hours = value.getUTCHours();
                minutes = value.getUTCMinutes();
                seconds = value.getUTCSeconds();
                milliseconds = value.getUTCMilliseconds();
              };
              // Serialize extended years correctly.
              value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) + "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) + // Months, dates, hours, minutes, and seconds should have two
              // digits; milliseconds should have three.
              "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) + // Milliseconds are optional in ES 5.0, but required in 5.1.
              "." + toPaddedString(3, milliseconds) + "Z";
            } else {

              value = null;
            };
          } else if(typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))){

            // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
            // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
            // ignores all `toJSON` methods on these objects unless they are
            // defined directly on an instance.
            value = value.toJSON(property);
          };
        };
        if(callback){

          // If a replacement function was provided, call it to obtain the value
          // for serialization.
          value = callback.call(object, property, value);
        };
        if(value === null){

          return "null";
        };
        className = getClass.call(value);
        if(className == booleanClass){

          // Booleans are represented literally.
          return "" + value;
        } else if(className == numberClass){

          // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
          // `"null"`.
          return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
        } else if(className == stringClass){

          // Strings are double-quoted and escaped.
          return quote("" + value);
        };;
        // Recursively serialize objects and arrays.
        if(typeof value == "object"){

          // Check for cyclic structures. This is a linear search; performance
          // is inversely proportional to the number of unique nested objects.
          for(length = stack.length;length--;){

            if(stack[length] === value){

              // Cyclic structures cannot be serialized by `JSON.stringify`.
              throw TypeError();
            };
          };
          // Add the object to the stack of traversed objects.
          stack.push(value);
          results = [];
          // Save the current indentation level and indent one additional level.
          prefix = indentation;
          indentation += whitespace;
          if(className == arrayClass){

            // Recursively serialize array elements.
            for(index = 0,length = value.length;index < length;hasMembers || (hasMembers = true),index++){

              element = serialize(index, value, callback, properties, whitespace, indentation, stack);
              results.push(element === undef ? "null" : element);
            };
            result = hasMembers ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
          } else {

            // Recursively serialize object members. Members are selected from
            // either a user-specified list of property names, or the object
            // itself.
            forEach(properties || value, function(property){

              var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
              if(element !== undef){

                // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                // is not the empty string, let `member` {quote(property) + ":"}
                // be the concatenation of `member` and the `space` character."
                // The "`space` character" refers to the literal space
                // character, not the `space` {width} argument provided to
                // `JSON.stringify`.
                results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
              };
              hasMembers || (hasMembers = true);
            });
            result = hasMembers ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
          };
          // Remove the object from the traversed object stack.
          stack.pop();
          return result;
        };
      };
      // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
      JSON3.stringify = function(source, filter, width){

        var whitespace,callback,properties;
        if(typeof filter == "function" || typeof filter == "object" && filter){

          if(getClass.call(filter) == functionClass){

            callback = filter;
          } else if(getClass.call(filter) == arrayClass){

            // Convert the property names array into a makeshift set.
            properties = {
            };
            for(var index = 0,length = filter.length,value;index < length;value = filter[index++],((getClass.call(value) == stringClass || getClass.call(value) == numberClass) && (properties[value] = 1)));
          };
        };
        if(width){

          if(getClass.call(width) == numberClass){

            // Convert the `width` to an integer and create a string containing
            // `width` number of space characters.
            if((width -= width % 1) > 0){

              for(whitespace = "",width > 10 && (width = 10);whitespace.length < width;whitespace += " ");
            };
          } else if(getClass.call(width) == stringClass){

            whitespace = width.length <= 10 ? width : width.slice(0, 10);
          };
        };
        // Opera <= 7.54u2 discards the values associated with empty string keys
        // (`""`) only if they are used directly within an object member list
        // (e.g., `!("" in { "": 1})`).
        return serialize("", (value = {
        }, value[""] = source, value), callback, properties, whitespace, "", []);
      };
    };
    // Public: Parses a JSON source string.
    if(!has("json-parse")){

      var fromCharCode = String.fromCharCode;
      // Internal: A map of escaped control characters and their unescaped
      // equivalents.
      var Unescapes = {
        '92' : "\\",
        '34' : '"',
        '47' : "/",
        '98' : "\b",
        '116' : "\t",
        '110' : "\n",
        '102' : "\f",
        '114' : "\r"
      };
      // Internal: Stores the parser state.
      var Index,Source;
      // Internal: Resets the parser state and throws a `SyntaxError`.
      var abort = function(){

        Index = Source = null;
        throw SyntaxError();
      };
      // Internal: Returns the next token, or `"$"` if the parser has reached
      // the end of the source string. A token may be a string, number, `null`
      // literal, or Boolean literal.
      var lex = function(){

        var source = Source,length = source.length,value,begin,position,isSigned,charCode;
        while(Index < length){

          charCode = source.charCodeAt(Index);
          switch(charCode){case 9:case 10:case 13:case 32:
          // Skip whitespace tokens, including tabs, carriage returns, line
          // feeds, and space characters.
          Index++;
          break;case 123:case 125:case 91:case 93:case 58:case 44:
          // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
          // the current position.
          value = charIndexBuggy ? source.charAt(Index) : source[Index];
          Index++;
          return value;case 34:
          // `"` delimits a JSON string; advance to the next character and
          // begin parsing the string. String tokens are prefixed with the
          // sentinel `@` character to distinguish them from punctuators and
          // end-of-string tokens.
          for(value = "@",Index++;Index < length;){

            charCode = source.charCodeAt(Index);
            if(charCode < 32){

              // Unescaped ASCII control characters (those with a code unit
              // less than the space character) are not permitted.
              abort();
            } else if(charCode == 92){

              // A reverse solidus (`\`) marks the beginning of an escaped
              // control character (including `"`, `\`, and `/`) or Unicode
              // escape sequence.
              charCode = source.charCodeAt(++Index);
              switch(charCode){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:
              // Revive escaped control characters.
              value += Unescapes[charCode];
              Index++;
              break;case 117:
              // `\u` marks the beginning of a Unicode escape sequence.
              // Advance to the first character and validate the
              // four-digit code point.
              begin = ++Index;
              for(position = Index + 4;Index < position;Index++){

                charCode = source.charCodeAt(Index);
                // A valid sequence comprises four hexdigits (case-
                // insensitive) that form a single hexadecimal value.
                if(!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)){

                  // Invalid Unicode escape sequence.
                  abort();
                };
              };
              // Revive the escaped character.
              value += fromCharCode("0x" + source.slice(begin, Index));
              break;default:
              // Invalid escape sequence.
              abort();};
            } else {

              if(charCode == 34){

                // An unescaped double-quote character marks the end of the
                // string.
                break;
              };
              charCode = source.charCodeAt(Index);
              begin = Index;
              // Optimize for the common case where a string is valid.
              while(charCode >= 32 && charCode != 92 && charCode != 34){

                charCode = source.charCodeAt(++Index);
              };
              // Append the string as-is.
              value += source.slice(begin, Index);
            };
          };
          if(source.charCodeAt(Index) == 34){

            // Advance to the next character and return the revived string.
            Index++;
            return value;
          };
          // Unterminated string.
          abort();default:
          // Parse numbers and literals.
          begin = Index;
          // Advance past the negative sign, if one is specified.
          if(charCode == 45){

            isSigned = true;
            charCode = source.charCodeAt(++Index);
          };
          // Parse an integer or floating-point value.
          if(charCode >= 48 && charCode <= 57){

            // Leading zeroes are interpreted as octal literals.
            if(charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)){

              // Illegal octal literal.
              abort();
            };
            isSigned = false;
            // Parse the integer component.
            for(;Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57);Index++);
            // Floats cannot contain a leading decimal point; however, this
            // case is already accounted for by the parser.
            if(source.charCodeAt(Index) == 46){

              position = ++Index;
              // Parse the decimal component.
              for(;position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57);position++);
              if(position == Index){

                // Illegal trailing decimal.
                abort();
              };
              Index = position;
            };
            // Parse exponents. The `e` denoting the exponent is
            // case-insensitive.
            charCode = source.charCodeAt(Index);
            if(charCode == 101 || charCode == 69){

              charCode = source.charCodeAt(++Index);
              // Skip past the sign following the exponent, if one is
              // specified.
              if(charCode == 43 || charCode == 45){

                Index++;
              };
              // Parse the exponential component.
              for(position = Index;position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57);position++);
              if(position == Index){

                // Illegal empty exponent.
                abort();
              };
              Index = position;
            };
            // Coerce the parsed value to a JavaScript number.
            return +source.slice(begin, Index);
          };
          // A negative sign may only precede numbers.
          if(isSigned){

            abort();
          };
          // `true`, `false`, and `null` literals.
          if(source.slice(Index, Index + 4) == "true"){

            Index += 4;
            return true;
          } else if(source.slice(Index, Index + 5) == "false"){

            Index += 5;
            return false;
          } else if(source.slice(Index, Index + 4) == "null"){

            Index += 4;
            return null;
          };;
          // Unrecognized token.
          abort();};
        };
        // Return the sentinel `$` character if the parser has reached the end
        // of the source string.
        return "$";
      };
      // Internal: Parses a JSON `value` token.
      var get = function(value){

        var results,hasMembers;
        if(value == "$"){

          // Unexpected end of input.
          abort();
        };
        if(typeof value == "string"){

          if((charIndexBuggy ? value.charAt(0) : value[0]) == "@"){

            // Remove the sentinel `@` character.
            return value.slice(1);
          };
          // Parse object and array literals.
          if(value == "["){

            // Parses a JSON array, returning a new JavaScript array.
            results = [];
            for(;;hasMembers || (hasMembers = true)){

              value = lex();
              // A closing square bracket marks the end of the array literal.
              if(value == "]"){

                break;
              };
              // If the array literal contains elements, the current token
              // should be a comma separating the previous element from the
              // next.
              if(hasMembers){

                if(value == ","){

                  value = lex();
                  if(value == "]"){

                    // Unexpected trailing `,` in array literal.
                    abort();
                  };
                } else {

                  // A `,` must separate each array element.
                  abort();
                };
              };
              // Elisions and leading commas are not permitted.
              if(value == ","){

                abort();
              };
              results.push(get(value));
            };
            return results;
          } else if(value == "{"){

            // Parses a JSON object, returning a new JavaScript object.
            results = {
            };
            for(;;hasMembers || (hasMembers = true)){

              value = lex();
              // A closing curly brace marks the end of the object literal.
              if(value == "}"){

                break;
              };
              // If the object literal contains members, the current token
              // should be a comma separator.
              if(hasMembers){

                if(value == ","){

                  value = lex();
                  if(value == "}"){

                    // Unexpected trailing `,` in object literal.
                    abort();
                  };
                } else {

                  // A `,` must separate each object member.
                  abort();
                };
              };
              // Leading commas are not permitted, object property names must be
              // double-quoted strings, and a `:` must separate each property
              // name and value.
              if(value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":"){

                abort();
              };
              results[value.slice(1)] = get(lex());
            };
            return results;
          };
          // Unexpected token encountered.
          abort();
        };
        return value;
      };
      // Internal: Updates a traversed object member.
      var update = function(source, property, callback){

        var element = walk(source, property, callback);
        if(element === undef){

          delete source[property];
        } else {

          source[property] = element;
        };
      };
      // Internal: Recursively traverses a parsed JSON object, invoking the
      // `callback` function for each value. This is an implementation of the
      // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
      var walk = function(source, property, callback){

        var value = source[property],length;
        if(typeof value == "object" && value){

          // `forEach` can't be used to traverse an array in Opera <= 8.54
          // because its `Object#hasOwnProperty` implementation returns `false`
          // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
          if(getClass.call(value) == arrayClass){

            for(length = value.length;length--;){

              update(value, length, callback);
            };
          } else {

            forEach(value, function(property){

              update(value, property, callback);
            });
          };
        };
        return callback.call(source, property, value);
      };
      // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
      JSON3.parse = function(source, callback){

        var result,value;
        Index = 0;
        Source = "" + source;
        result = get(lex());
        // If a JSON string contains multiple tokens, it is invalid.
        if(lex() != "$"){

          abort();
        };
        // Reset the parser state.
        Index = Source = null;
        return callback && getClass.call(callback) == functionClass ? walk((value = {
        }, value[""] = result, value), "", callback) : result;
      };
    };
  };
  // Export for asynchronous module loaders.
  if(isLoader){

    define(function(){

      return JSON3;
    });
  };
}(this));
// End of original code.
// Finally expose (polyfilled) window.JSON as qx.lang.Json.JSON
qx.lang.Json.stringify = window.JSON.stringify;
qx.lang.Json.parse = window.JSON.parse;

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

   ======================================================================

   This class contains code based on the following work:

   * Mootools
     http://mootools.net/
     Version 1.1.1

     Copyright:
       (c) 2007 Valerio Proietti

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

   and

   * XRegExp
   http://xregexp.com/
   Version 1.5

   Copyright:
       (c) 2006-2007, Steven Levithan <http://stevenlevithan.com>

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

     Authors:
       * Steven Levithan

************************************************************************ */
/**
 * String helper functions
 *
 * The native JavaScript String is not modified by this class. However,
 * there are modifications to the native String in {@link qx.lang.normalize.String} for
 * browsers that do not support certain features.
 *
 * @require(qx.lang.normalize.String)
 */
qx.Bootstrap.define("qx.lang.String", {
  statics : {
    /**
     * @type {Map} Cache for often used string operations [camelCasing and hyphenation]
     * e.g. marginTop => margin-top
     */
    __stringsMap : {
    },
    /**
     * Converts a hyphenated string (separated by '-') to camel case.
     *
     * Example:
     * <pre class='javascript'>qx.lang.String.camelCase("I-like-cookies"); //returns "ILikeCookies"</pre>
     *
     * @param str {String} hyphenated string
     * @return {String} camelcase string
     */
    camelCase : function(str){

      var result = this.__stringsMap[str];
      if(!result){

        result = str.replace(/\-([a-z])/g, function(match, chr){

          return chr.toUpperCase();
        });
        if(str.indexOf("-") >= 0){

          this.__stringsMap[str] = result;
        };
      };
      return result;
    },
    /**
     * Converts a camelcased string to a hyphenated (separated by '-') string.
     *
     * Example:
     * <pre class='javascript'>qx.lang.String.hyphenate("weLikeCookies"); //returns "we-like-cookies"</pre>
     *
     * @param str {String} camelcased string
     * @return {String} hyphenated string
     */
    hyphenate : function(str){

      var result = this.__stringsMap[str];
      if(!result){

        result = str.replace(/[A-Z]/g, function(match){

          return ('-' + match.charAt(0).toLowerCase());
        });
        if(str.indexOf("-") == -1){

          this.__stringsMap[str] = result;
        };
      };
      return result;
    },
    /**
     * Check whether the string starts with the given substring
     *
     * @param fullstr {String} the string to search in
     * @param substr {String} the substring to look for
     * @return {Boolean} whether the string starts with the given substring
     */
    startsWith : function(fullstr, substr){

      return fullstr.indexOf(substr) === 0;
    },
    /**
     * Check whether the string ends with the given substring
     *
     * @param fullstr {String} the string to search in
     * @param substr {String} the substring to look for
     * @return {Boolean} whether the string ends with the given substring
     */
    endsWith : function(fullstr, substr){

      return fullstr.substring(fullstr.length - substr.length, fullstr.length) === substr;
    },
    /**
     * Convert the first character of the string to upper case.
     *
     * @signature function(str)
     * @param str {String} the string
     * @return {String} the string with an upper case first character
     */
    firstUp : qx.Bootstrap.firstUp,
    /**
     * Convert the first character of the string to lower case.
     *
     * @signature function(str)
     * @param str {String} the string
     * @return {String} the string with a lower case first character
     */
    firstLow : qx.Bootstrap.firstLow,
    /**
     * Escapes all chars that have a special meaning in regular expressions
     *
     * @param str {String} the string where to escape the chars.
     * @return {String} the string with the escaped chars.
     */
    escapeRegexpChars : function(str){

      return str.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1');
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2006 STZ-IDA, Germany, http://www.stz-ida.de
     2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Carsten Lergenmueller (carstenl)
     * Fabian Jakobs (fjakobs)

************************************************************************ */
/**
 * An memory container which stores arbitrary data up to a maximum number of
 * entries. When new entries come in an the maximum is reached, the oldest
 * entries are deleted.
 *
 * A mark feature also exists which can be used to remember a point in time.
 * When retrieving entriues, it is possible to get only those entries
 * after the marked time. This is useful if data from the buffer is extracted
 * and processed. Whenever this happens, a mark() call can be used so that the
 * next extraction will only get new data.
 */
qx.Bootstrap.define("qx.util.RingBuffer", {
  extend : Object,
  /**
   * Constructor.
   *
   * @param maxEntries {Integer ? 50} Maximum number of entries in the buffer
   */
  construct : function(maxEntries){

    this.setMaxEntries(maxEntries || 50);
  },
  members : {
    //Next slot in ringbuffer to use
    __nextIndexToStoreTo : 0,
    //Number of elements in ring buffer
    __entriesStored : 0,
    //Was a mark set?
    __isMarkActive : false,
    //How many elements were stored since setting of mark?
    __entriesStoredSinceMark : 0,
    //ring buffer
    __entries : null,
    //Maximum number of messages to store. Could be converted to a qx property.
    __maxEntries : null,
    /**
     * Set the maximum number of messages to hold. If null the number of
     * messages is not limited.
     *
     * Warning: Changing this property will clear the events logged so far.
     *
     * @param maxEntries {Integer} the maximum number of messages to hold
     */
    setMaxEntries : function(maxEntries){

      this.__maxEntries = maxEntries;
      this.clear();
    },
    /**
     * Get the maximum number of entries to hold
     *
     * @return {Integer}
     */
    getMaxEntries : function(){

      return this.__maxEntries;
    },
    /**
     * Adds a single entry
     *
     * @param entry {var} The data to store
     */
    addEntry : function(entry){

      this.__entries[this.__nextIndexToStoreTo] = entry;
      this.__nextIndexToStoreTo = this.__addToIndex(this.__nextIndexToStoreTo, 1);
      //Count # of stored entries
      var max = this.getMaxEntries();
      if(this.__entriesStored < max){

        this.__entriesStored++;
      };
      //Count # of stored elements since last mark call
      if(this.__isMarkActive && (this.__entriesStoredSinceMark < max)){

        this.__entriesStoredSinceMark++;
      };
    },
    /**
     * Remembers the current position in the ring buffer
     *
     */
    mark : function(){

      this.__isMarkActive = true;
      this.__entriesStoredSinceMark = 0;
    },
    /**
     * Removes the current mark position
     */
    clearMark : function(){

      this.__isMarkActive = false;
    },
    /**
     * Returns all stored entries. Mark is ignored.
     *
     * @return {Array} array of stored entries
     */
    getAllEntries : function(){

      return this.getEntries(this.getMaxEntries(), false);
    },
    /**
     * Returns entries which have been added previously.
     *
     * @param count {Integer} The number of entries to retrieve. If there are
     *    more entries than the given count, the oldest ones will not be returned.
     *
     * @param startingFromMark {Boolean ? false} If true, only entries since
     *   the last call to mark() will be returned
     * @return {Array} array of stored entries
     */
    getEntries : function(count, startingFromMark){

      //Trim count so it does not exceed ringbuffer size
      if(count > this.__entriesStored){

        count = this.__entriesStored;
      };
      // Trim count so it does not exceed last call to mark (if mark was called
      // and startingFromMark was true)
      if(startingFromMark && this.__isMarkActive && (count > this.__entriesStoredSinceMark)){

        count = this.__entriesStoredSinceMark;
      };
      if(count > 0){

        var indexOfYoungestElementInHistory = this.__addToIndex(this.__nextIndexToStoreTo, -1);
        var startIndex = this.__addToIndex(indexOfYoungestElementInHistory, -count + 1);
        var result;
        if(startIndex <= indexOfYoungestElementInHistory){

          //Requested segment not wrapping around ringbuffer boundary, get in one run
          result = this.__entries.slice(startIndex, indexOfYoungestElementInHistory + 1);
        } else {

          //Requested segment wrapping around ringbuffer boundary, get two parts & concat
          result = this.__entries.slice(startIndex, this.__entriesStored).concat(this.__entries.slice(0, indexOfYoungestElementInHistory + 1));
        };
      } else {

        result = [];
      };
      return result;
    },
    /**
     * Clears all entries
     */
    clear : function(){

      this.__entries = new Array(this.getMaxEntries());
      this.__entriesStored = 0;
      this.__entriesStoredSinceMark = 0;
      this.__nextIndexToStoreTo = 0;
    },
    /**
     * Adds a number to an ringbuffer index. Does a modulus calculation,
     * i. e. if the index leaves the ringbuffer space it will wrap around to
     * the other end of the ringbuffer.
     *
     * @param idx {Number} The current index.
     * @param addMe {Number} The number to add.
     * @return {Number} The new index
     */
    __addToIndex : function(idx, addMe){

      var max = this.getMaxEntries();
      var result = (idx + addMe) % max;
      //If negative, wrap up into the ringbuffer space
      if(result < 0){

        result += max;
      };
      return result;
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2006 STZ-IDA, Germany, http://www.stz-ida.de
     2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Carsten Lergenmueller (carstenl)
     * Fabian Jakobs (fjakobs)

************************************************************************ */
/**
 * An appender that writes all messages to a memory container. The messages
 * can be retrieved later, f. i. when an error dialog pops up and the question
 * arises what actions have caused the error.
 *
 * A mark feature also exists which can be used to remember a point in time.
 * When retrieving log events, it is possible to get only those events
 * after the marked time. This is useful if data from the buffer is extracted
 * and f. i. sent to a logging system. Whenever this happens, a mark() call
 * can be used so that the next extraction will only get new data.
 */
qx.Bootstrap.define("qx.log.appender.RingBuffer", {
  extend : qx.util.RingBuffer,
  /**
   * @param maxMessages {Integer?50} Maximum number of messages in the buffer
   */
  construct : function(maxMessages){

    this.setMaxMessages(maxMessages || 50);
  },
  members : {
    /**
     * Set the maximum number of messages to hold. If null the number of
     * messages is not limited.
     *
     * Warning: Changing this property will clear the events logged so far.
     *
     * @param maxMessages {Integer} the maximum number of messages to hold
     */
    setMaxMessages : function(maxMessages){

      this.setMaxEntries(maxMessages);
    },
    /**
     * Get the maximum number of messages to hold
     *
     * @return {Integer} the maximum number of messages
     */
    getMaxMessages : function(){

      return this.getMaxEntries();
    },
    /**
     * Processes a single log entry
     *
     * @param entry {Map} The entry to process
     */
    process : function(entry){

      this.addEntry(entry);
    },
    /**
     * Returns all stored log events
     *
     * @return {Array} array of stored log events
     */
    getAllLogEvents : function(){

      return this.getAllEntries();
    },
    /**
     * Returns log events which have been logged previously.
     *
     * @param count {Integer} The number of events to retrieve. If there are
     *    more events than the given count, the oldest ones will not be returned.
     *
     * @param startingFromMark {Boolean ? false} If true, only entries since the last call to mark()
     *                                           will be returned
     * @return {Array} array of stored log events
     */
    retrieveLogEvents : function(count, startingFromMark){

      return this.getEntries(count, startingFromMark);
    },
    /**
     * Clears the log history
     */
    clearHistory : function(){

      this.clear();
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

************************************************************************ */
/**
 * Main qooxdoo logging class.
 *
 * Used as central logging feature by qx.core.Object.
 *
 * Extremely modular and lightweight to support logging at bootstrap and
 * at shutdown as well.
 *
 * * Supports dynamic appenders to push the output to the user
 * * Supports buffering of the last 50 messages (configurable)
 * * Supports different debug levels ("debug", "info", "warn" or "error")
 * * Simple data serialization for incoming messages
 *
 * @require(qx.dev.StackTrace)
 */
qx.Bootstrap.define("qx.log.Logger", {
  statics : {
    /*
    ---------------------------------------------------------------------------
      CONFIGURATION
    ---------------------------------------------------------------------------
    */
    __level : "debug",
    /*
    ---------------------------------------------------------------------------
      APPENDER MANAGEMENT
    ---------------------------------------------------------------------------
    */
    /** @type {Map} Map of all known appenders by ID */
    __appender : {
    },
    /*
    ---------------------------------------------------------------------------
      USER METHODS
    ---------------------------------------------------------------------------
    */
    /**
     * Sending a message at level "debug" to the logger.
     *
     * @param object {Object} Contextual object (either instance or static class)
     * @param message {var} Any number of arguments supported. An argument may
     *   have any JavaScript data type. All data is serialized immediately and
     *   does not keep references to other objects.
     */
    debug : function(object, message){

      qx.log.Logger.__log("debug", arguments);
    },
    /**
     * Sending a message at level "info" to the logger.
     *
     * @param object {Object} Contextual object (either instance or static class)
     * @param message {var} Any number of arguments supported. An argument may
     *   have any JavaScript data type. All data is serialized immediately and
     *   does not keep references to other objects.
     */
    info : function(object, message){

      qx.log.Logger.__log("info", arguments);
    },
    /**
     * Sending a message at level "warn" to the logger.
     *
     * @param object {Object} Contextual object (either instance or static class)
     * @param message {var} Any number of arguments supported. An argument may
     *   have any JavaScript data type. All data is serialized immediately and
     *   does not keep references to other objects.
     */
    warn : function(object, message){

      qx.log.Logger.__log("warn", arguments);
    },
    /**
     * Sending a message at level "error" to the logger.
     *
     * @param object {Object} Contextual object (either instance or static class)
     * @param message {var} Any number of arguments supported. An argument may
     *   have any JavaScript data type. All data is serialized immediately and
     *   does not keep references to other objects.
     */
    error : function(object, message){

      qx.log.Logger.__log("error", arguments);
    },
    /**
     * Prints the current stack trace at level "info"
     *
     * @param object {Object?} Contextual object (either instance or static class)
     */
    trace : function(object){

      var trace = qx.dev.StackTrace.getStackTrace();
      qx.log.Logger.__log("info", [(typeof object !== "undefined" ? [object].concat(trace) : trace).join("\n")]);
    },
    /*
    ---------------------------------------------------------------------------
      INTERNAL LOGGING IMPLEMENTATION
    ---------------------------------------------------------------------------
    */
    /** @type {qx.log.appender.RingBuffer} Message buffer of previously fired messages. */
    __buffer : new qx.log.appender.RingBuffer(50),
    /** @type {Map} Numeric translation of log levels */
    __levels : {
      debug : 0,
      info : 1,
      warn : 2,
      error : 3
    },
    /**
     * Internal logging main routine.
     *
     * @param level {String} One of "debug", "info", "warn" or "error"
     * @param args {Array} List of other arguments, where the first is
     *   taken as the context object.
     */
    __log : function(level, args){

      // Filter according to level
      var levels = this.__levels;
      if(levels[level] < levels[this.__level]){

        return;
      };
      // Serialize and cache
      var object = args.length < 2 ? null : args[0];
      var start = object ? 1 : 0;
      var items = [];
      for(var i = start,l = args.length;i < l;i++){

        items.push(this.__serialize(args[i], true));
      };
      // Build entry
      var time = new Date;
      var entry = {
        time : time,
        offset : time - qx.Bootstrap.LOADSTART,
        level : level,
        items : items,
        // store window to allow cross frame logging
        win : window
      };
      // Add relation fields
      if(object){

        // Do not explicitly check for instanceof qx.core.Object, in order not
        // to introduce an unwanted load-time dependency
        if(object.$$hash !== undefined){

          entry.object = object.$$hash;
        } else if(object.$$type){

          entry.clazz = object;
        } else if(object.constructor){

          entry.clazz = object.constructor;
        };;
      };
      this.__buffer.process(entry);
      // Send to appenders
      var appender = this.__appender;
      for(var id in appender){

        appender[id].process(entry);
      };
    },
    /**
     * Detects the type of the variable given.
     *
     * @param value {var} Incoming value
     * @return {String} Type of the incoming value. Possible values:
     *   "undefined", "null", "boolean", "number", "string",
     *   "function", "array", "error", "map",
     *   "class", "instance", "node", "stringify", "unknown"
     */
    __detect : function(value){

      if(value === undefined){

        return "undefined";
      } else if(value === null){

        return "null";
      };
      if(value.$$type){

        return "class";
      };
      var type = typeof value;
      if(type === "function" || type == "string" || type === "number" || type === "boolean"){

        return type;
      } else if(type === "object"){

        if(value.nodeType){

          return "node";
        } else if(value instanceof Error || (value.name && value.message)){

          return "error";
        } else if(value.classname){

          return "instance";
        } else if(value instanceof Array){

          return "array";
        } else if(value instanceof Date){

          return "date";
        } else {

          return "map";
        };;;;
      };
      if(value.toString){

        return "stringify";
      };
      return "unknown";
    },
    /**
     * Serializes the incoming value. If it is a singular value, the result is
     * a simple string. For an array or a map the result can also be a
     * serialized string of a limited number of individual items.
     *
     * @param value {var} Incoming value
     * @param deep {Boolean?false} Whether arrays and maps should be
     *    serialized for a limited number of items
     * @return {Map} Contains the keys <code>type</code>, <code>text</code> and
     * <code>trace</code>.
     */
    __serialize : function(value, deep){

      var type = this.__detect(value);
      var text = "unknown";
      var trace = [];
      switch(type){case "null":case "undefined":
      text = type;
      break;case "string":case "number":case "boolean":case "date":
      text = value;
      break;case "node":
      if(value.nodeType === 9){

        text = "document";
      } else if(value.nodeType === 3){

        text = "text[" + value.nodeValue + "]";
      } else if(value.nodeType === 1){

        text = value.nodeName.toLowerCase();
        if(value.id){

          text += "#" + value.id;
        };
      } else {

        text = "node";
      };;
      break;case "function":
      text = qx.lang.Function.getName(value) || type;
      break;case "instance":
      text = value.basename + "[" + value.$$hash + "]";
      break;case "class":case "stringify":
      text = value.toString();
      break;case "error":
      trace = qx.dev.StackTrace.getStackTraceFromError(value);
      text = (value.basename ? value.basename + ": " : "") + value.toString();
      break;case "array":
      if(deep){

        text = [];
        for(var i = 0,l = value.length;i < l;i++){

          if(text.length > 20){

            text.push("...(+" + (l - i) + ")");
            break;
          };
          text.push(this.__serialize(value[i], false));
        };
      } else {

        text = "[...(" + value.length + ")]";
      };
      break;case "map":
      if(deep){

        var temp;
        // Produce sorted key list
        var sorted = [];
        for(var key in value){

          sorted.push(key);
        };
        sorted.sort();
        // Temporary text list
        text = [];
        for(var i = 0,l = sorted.length;i < l;i++){

          if(text.length > 20){

            text.push("...(+" + (l - i) + ")");
            break;
          };
          // Additional storage of hash-key
          key = sorted[i];
          temp = this.__serialize(value[key], false);
          temp.key = key;
          text.push(temp);
        };
      } else {

        var number = 0;
        for(var key in value){

          number++;
        };
        text = "{...(" + number + ")}";
      };
      break;};
      return {
        type : type,
        text : text,
        trace : trace
      };
    }
  },
  defer : function(statics){

    var logs = qx.Bootstrap.$$logs;
    for(var i = 0;i < logs.length;i++){

      statics.__log(logs[i][0], logs[i][1]);
    };
    qx.Bootstrap.debug = statics.debug;
    qx.Bootstrap.info = statics.info;
    qx.Bootstrap.warn = statics.warn;
    qx.Bootstrap.error = statics.error;
    qx.Bootstrap.trace = statics.trace;
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

************************************************************************ */
/**
 * Basic node creation and type detection
 */
qx.Bootstrap.define("qx.dom.Node", {
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    /*
    ---------------------------------------------------------------------------
      NODE TYPES
    ---------------------------------------------------------------------------
    */
    /**
     * @type {Map} Node type:
     *
     * * ELEMENT
     * * ATTRIBUTE
     * * TEXT
     * * CDATA_SECTION
     * * ENTITY_REFERENCE
     * * ENTITY
     * * PROCESSING_INSTRUCTION
     * * COMMENT
     * * DOCUMENT
     * * DOCUMENT_TYPE
     * * DOCUMENT_FRAGMENT
     * * NOTATION
     */
    ELEMENT : 1,
    TEXT : 3,
    DOCUMENT : 9,
    /*
    ---------------------------------------------------------------------------
      DOCUMENT ACCESS
    ---------------------------------------------------------------------------
    */
    /**
     * Returns the owner document of the given node
     *
     * @param node {Node|Document|Window} the node which should be tested
     * @return {Document|null} The document of the given DOM node
     */
    getDocument : function(node){

      return node.nodeType === this.DOCUMENT ? node : // is document already
      node.ownerDocument || // is DOM node
      node.document;
    },
    /**
     * Returns the DOM2 <code>defaultView</code> (window).
     *
     * @param node {Node|Document|Window} node to inspect
     * @return {Window} the <code>defaultView</code> of the given node
     */
    getWindow : function(node){

      // is a window already
      if(node.nodeType == null){

        return node;
      };
      // jump to document
      if(node.nodeType !== this.DOCUMENT){

        node = node.ownerDocument;
      };
      // jump to window
      return node.defaultView || node.parentWindow;
    },
    /*
    ---------------------------------------------------------------------------
      TYPE TESTS
    ---------------------------------------------------------------------------
    */
    /**
     * Whether the given object is a DOM node
     *
     * @param node {Node} the node which should be tested
     * @return {Boolean} true if the node is a DOM node
     */
    isNode : function(node){

      return !!(node && node.nodeType != null);
    },
    /**
     * Whether the given object is a DOM element node
     *
     * @param node {Node} the node which should be tested
     * @return {Boolean} true if the node is a DOM element
     */
    isElement : function(node){

      return !!(node && node.nodeType === this.ELEMENT);
    },
    /**
     * Whether the given object is a DOM document node
     *
     * @param node {Node} the node which should be tested
     * @return {Boolean} true when the node is a DOM document
     */
    isDocument : function(node){

      return !!(node && node.nodeType === this.DOCUMENT);
    },
    /**
     * Whether the given object is a DOM text node
     *
     * @param node {Node} the node which should be tested
     * @return {Boolean} true if the node is a DOM text node
     */
    isText : function(node){

      return !!(node && node.nodeType === this.TEXT);
    },
    /**
     * Check whether the given object is a browser window object.
     *
     * @param obj {Object} the object which should be tested
     * @return {Boolean} true if the object is a window object
     */
    isWindow : function(obj){

      return !!(obj && obj.history && obj.location && obj.document);
    },
    /**
     * Whether the node has the given node name
     *
     * @param node {Node} the node
     * @param nodeName {String} the node name to check for
     * @return {Boolean} Whether the node has the given node name
     */
    isNodeName : function(node, nodeName){

      if(!nodeName || !node || !node.nodeName){

        return false;
      };
      return nodeName.toLowerCase() == qx.dom.Node.getName(node);
    },
    /*
    ---------------------------------------------------------------------------
      UTILITIES
    ---------------------------------------------------------------------------
    */
    /**
     * Get the node name as lower case string
     *
     * @param node {Node} the node
     * @return {String} the node name
     */
    getName : function(node){

      if(!node || !node.nodeName){

        return null;
      };
      return node.nodeName.toLowerCase();
    },
    /**
     * Returns the text content of an node where the node may be of node type
     * NODE_ELEMENT, NODE_ATTRIBUTE, NODE_TEXT or NODE_CDATA
     *
     * @param node {Node} the node from where the search should start.
     *     If the node has subnodes the text contents are recursively retreived and joined.
     * @return {String} the joined text content of the given node or null if not appropriate.
     * @signature function(node)
     */
    getText : function(node){

      if(!node || !node.nodeType){

        return null;
      };
      switch(node.nodeType){case 1:
      // NODE_ELEMENT
      var i,a = [],nodes = node.childNodes,length = nodes.length;
      for(i = 0;i < length;i++){

        a[i] = this.getText(nodes[i]);
      };
      return a.join("");case 2:// NODE_ATTRIBUTE
      case 3:// NODE_TEXT
      case 4:
      // CDATA
      return node.nodeValue;};
      return null;
    },
    /**
     * Checks if the given node is a block node
     *
     * @param node {Node} Node
     * @return {Boolean} whether it is a block node
     */
    isBlockNode : function(node){

      if(!qx.dom.Node.isElement(node)){

        return false;
      };
      node = qx.dom.Node.getName(node);
      return /^(body|form|textarea|fieldset|ul|ol|dl|dt|dd|li|div|hr|p|h[1-6]|quote|pre|table|thead|tbody|tfoot|tr|td|th|iframe|address|blockquote)$/.test(node);
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)
     * Sebastian Werner (wpbasti)
     * Alexander Steitz (aback)
     * Christian Hagendorn (chris_schmidt)

   ======================================================================

   This class contains code based on the following work:

   * Juriy Zaytsev
     http://thinkweb2.com/projects/prototype/detecting-event-support-without-browser-sniffing/

     Copyright (c) 2009 Juriy Zaytsev

     Licence:
       BSD: http://github.com/kangax/iseventsupported/blob/master/LICENSE

     ----------------------------------------------------------------------

     http://github.com/kangax/iseventsupported/blob/master/LICENSE

     Copyright (c) 2009 Juriy Zaytsev

     Permission is hereby granted, free of charge, to any person
     obtaining a copy of this software and associated documentation
     files (the "Software"), to deal in the Software without
     restriction, including without limitation the rights to use,
     copy, modify, merge, publish, distribute, sublicense, and/or sell
     copies of the Software, and to permit persons to whom the
     Software is furnished to do so, subject to the following
     conditions:

     The above copyright notice and this permission notice shall be
     included in all copies or substantial portions of the Software.

     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
     OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
     HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
     WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
     OTHER DEALINGS IN THE SOFTWARE.

************************************************************************ */
/**
 * Wrapper around native event management capabilities of the browser.
 * This class should not be used directly normally. It's better
 * to use {@link qx.event.Registration} instead.
 */
qx.Bootstrap.define("qx.bom.Event", {
  statics : {
    /**
     * Use the low level browser functionality to attach event listeners
     * to DOM nodes.
     *
     * Use this with caution. This is only thought for event handlers and
     * qualified developers. These are not mem-leak protected!
     *
     * @param target {Object} Any valid native event target
     * @param type {String} Name of the event
     * @param listener {Function} The pointer to the function to assign
     * @param useCapture {Boolean ? false} A Boolean value that specifies the event phase to add
     *    the event handler for the capturing phase or the bubbling phase.
     */
    addNativeListener : function(target, type, listener, useCapture){

      if(target.addEventListener){

        target.addEventListener(type, listener, !!useCapture);
      } else if(target.attachEvent){

        target.attachEvent("on" + type, listener);
      } else if(typeof target["on" + type] != "undefined"){

        target["on" + type] = listener;
      } else {

        if(qx.core.Environment.get("qx.debug")){

          qx.log.Logger.warn("No method available to add native listener to " + target);
        };
      };;
    },
    /**
     * Use the low level browser functionality to remove event listeners
     * from DOM nodes.
     *
     * @param target {Object} Any valid native event target
     * @param type {String} Name of the event
     * @param listener {Function} The pointer to the function to assign
     * @param useCapture {Boolean ? false} A Boolean value that specifies the event phase to remove
     *    the event handler for the capturing phase or the bubbling phase.
     */
    removeNativeListener : function(target, type, listener, useCapture){

      if(target.removeEventListener){

        target.removeEventListener(type, listener, !!useCapture);
      } else if(target.detachEvent){

        try{

          target.detachEvent("on" + type, listener);
        } catch(e) {

          // IE7 sometimes dispatches "unload" events on protected windows
          // Ignore the "permission denied" errors.
          if(e.number !== -2146828218){

            throw e;
          };
        };
      } else if(typeof target["on" + type] != "undefined"){

        target["on" + type] = null;
      } else {

        if(qx.core.Environment.get("qx.debug")){

          qx.log.Logger.warn("No method available to remove native listener from " + target);
        };
      };;
    },
    /**
     * Returns the target of the event.
     *
     * @param e {Event} Native event object
     * @return {Object} Any valid native event target
     */
    getTarget : function(e){

      return e.target || e.srcElement;
    },
    /**
     * Computes the related target from the native DOM event
     *
     * @param e {Event} Native DOM event object
     * @return {Element} The related target
     */
    getRelatedTarget : function(e){

      if(e.relatedTarget !== undefined){

        // In Firefox the related target of mouse events is sometimes an
        // anonymous div inside of a text area, which raises an exception if
        // the nodeType is read. This is why the try/catch block is needed.
        if((qx.core.Environment.get("engine.name") == "gecko")){

          try{

            e.relatedTarget && e.relatedTarget.nodeType;
          } catch(ex) {

            return null;
          };
        };
        return e.relatedTarget;
      } else if(e.fromElement !== undefined && e.type === "mouseover"){

        return e.fromElement;
      } else if(e.toElement !== undefined){

        return e.toElement;
      } else {

        return null;
      };;
    },
    /**
     * Whether the given target supports the given event type.
     *
     * Useful for testing for support of new features like
     * touch events, gesture events, orientation change, on/offline, etc.
     *
     * *NOTE:* This check is *case-insensitive*.
     * <code>supportsEvent(window, "cLicK")</code> will return <code>true</code>
     * but <code>window.addEventListener("cLicK", callback)</code> will fail
     * silently!
     *
     * @param target {var} Any valid target e.g. window, dom node, etc.
     * @param type {String} Type of the event e.g. click, mousedown
     * @return {Boolean} Whether the given event is supported
     */
    supportsEvent : function(target, type){

      // transitionEnd support can not be detected generically for Internet Explorer 10+ [BUG #7875]
      if(type.toLowerCase().indexOf("transitionend") != -1 && qx.core.Environment.get("engine.name") === "mshtml" && qx.core.Environment.get("browser.documentmode") > 9){

        return true;
      };
      // The 'transitionend' event can only be detected on window objects,
      // not DOM elements [BUG #7249]
      if(target != window && type.toLowerCase().indexOf("transitionend") != -1){

        var transitionSupport = qx.core.Environment.get("css.transition");
        return (transitionSupport && transitionSupport["end-event"] == type);
      };
      // Using the lowercase representation is important for the
      // detection of events like 'MSPointer*'. They have to detected
      // using the lower case name of the event.
      var eventName = "on" + type.toLowerCase();
      var supportsEvent = (eventName in target);
      if(!supportsEvent){

        supportsEvent = typeof target[eventName] == "function";
        if(!supportsEvent && target.setAttribute){

          target.setAttribute(eventName, "return;");
          supportsEvent = typeof target[eventName] == "function";
          target.removeAttribute(eventName);
        };
      };
      return supportsEvent;
    },
    /**
     * Returns the (possibly vendor-prefixed) name of the given event type.
     * *NOTE:* Incorrect capitalization of type names will *not* be corrected. See
     * {@link #supportsEvent} for details.
     *
     * @param target {var} Any valid target e.g. window, dom node, etc.
     * @param type {String} Type of the event e.g. click, mousedown
     * @return {String|null} Event name or <code>null</code> if the event is not
     * supported.
     */
    getEventName : function(target, type){

      var pref = [""].concat(qx.bom.Style.VENDOR_PREFIXES);
      for(var i = 0,l = pref.length;i < l;i++){

        var prefix = pref[i].toLowerCase();
        if(qx.bom.Event.supportsEvent(target, prefix + type)){

          return prefix ? prefix + qx.lang.String.firstUp(type) : type;
        };
      };
      return null;
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)
     * Daniel Wagner (danielwagner)

************************************************************************ */
/**
 * Responsible class for everything concerning styles without the need of
 * an element.
 *
 * If you want to query or modify styles of HTML elements,
 * take a look at {@link qx.bom.element.Style}.
 */
qx.Bootstrap.define("qx.bom.Style", {
  statics : {
    /** Vendor-specific style property prefixes */
    VENDOR_PREFIXES : ["Webkit", "Moz", "O", "ms", "Khtml"],
    /**
     * Internal lookup table to map property names to CSS names
     * @internal
     */
    __cssName : {
    },
    /**
     * A reference to the native CSS.supports function (supportsCSS in Opera)
     * @internal
     */
    __supports : null,
    /**
     * Takes the name of a style property and returns the name the browser uses
     * for its implementation, which might include a vendor prefix.
     *
     * @param propertyName {String} Style property name to check
     * @return {String|null} The supported property name or <code>null</code> if
     * not supported
     */
    getPropertyName : function(propertyName){

      var style = document.documentElement.style;
      if(style[propertyName] !== undefined){

        return propertyName;
      };
      for(var i = 0,l = this.VENDOR_PREFIXES.length;i < l;i++){

        var prefixedProp = this.VENDOR_PREFIXES[i] + qx.lang.String.firstUp(propertyName);
        if(style[prefixedProp] !== undefined){

          return prefixedProp;
        };
      };
      return null;
    },
    /**
     * Takes the name of a JavaScript style property and returns the
     * corresponding CSS name.
     *
     * The name of the style property is taken as is, i.e. it gets not
     * extended by vendor prefixes. The conversion into the CSS name is
     * done by string manipulation, not involving the DOM.
     *
     * Example:
     * <pre class='javascript'>qx.bom.Style.getCssName("MozTransform"); //returns "-moz-transform"</pre>
     *
     * @param propertyName {String} JavaScript style property
     * @return {String} CSS property
     */
    getCssName : function(propertyName){

      var cssName = this.__cssName[propertyName];
      if(!cssName){

        // all vendor prefixes (except for "ms") start with an uppercase letter
        cssName = propertyName.replace(/[A-Z]/g, function(match){

          return ('-' + match.charAt(0).toLowerCase());
        });
        // lowercase "ms" vendor prefix needs special handling
        if((/^ms/.test(cssName))){

          cssName = "-" + cssName;
        };
        this.__cssName[propertyName] = cssName;
      };
      return cssName;
    },
    /**
     * Detects CSS support by using the native CSS.supports function or by
     * applying a style to a DOM element of the given type and verifying
     * the result. Also checks for vendor-prefixed variants of the
     * value, e.g. "linear-gradient" -> "-webkit-linear-gradient". Returns the
     * (possibly vendor-prefixed) value if successful or <code>null</code> if
     * the property and/or value are not supported.
     *
     * @param element {Element} element to be used for the detection
     * @param propertyName {String} the style property to be tested
     * @param value {String} style property value to be tested
     * @param prefixed {Boolean?} try to determine the appropriate vendor prefix
     * for the value. Default: <code>true</code>
     * @return {String|null} prefixed style value or <code>null</code> if not supported
     * @internal
     */
    getAppliedStyle : function(element, propertyName, value, prefixed){

      var cssProperty = qx.bom.Style.getCssName(propertyName);
      var win = qx.dom.Node.getWindow(element);
      var vendorPrefixes = (prefixed !== false) ? [null].concat(this.VENDOR_PREFIXES) : [null];
      for(var i = 0,l = vendorPrefixes.length;i < l;i++){

        var supported = false;
        var prefixedVal = vendorPrefixes[i] ? "-" + vendorPrefixes[i].toLowerCase() + "-" + value : value;
        if(qx.bom.Style.__supports){

          supported = qx.bom.Style.__supports.call(win, cssProperty, prefixedVal);
        } else {

          element.style.cssText += cssProperty + ":" + prefixedVal + ";";
          supported = (typeof element.style[propertyName] == "string" && element.style[propertyName] !== "");
        };
        if(supported){

          return prefixedVal;
        };
      };
      return null;
    }
  },
  defer : function(statics){

    if(window.CSS && window.CSS.supports){

      qx.bom.Style.__supports = window.CSS.supports.bind(window.CSS);
    } else if(window.supportsCSS){

      qx.bom.Style.__supports = window.supportsCSS.bind(window);
    };
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)
     * Sebastian Fastner (fastner)

************************************************************************ */
/**
 * This class is responsible for checking the operating systems name.
 *
 * This class is used by {@link qx.core.Environment} and should not be used
 * directly. Please check its class comment for details how to use it.
 *
 * @internal
 */
qx.Bootstrap.define("qx.bom.client.OperatingSystem", {
  statics : {
    /**
     * Checks for the name of the operating system.
     * @return {String} The name of the operating system.
     * @internal
     */
    getName : function(){

      if(!navigator){

        return "";
      };
      var input = navigator.platform || "";
      var agent = navigator.userAgent || "";
      if(input.indexOf("Windows") != -1 || input.indexOf("Win32") != -1 || input.indexOf("Win64") != -1){

        return "win";
      } else if(input.indexOf("Macintosh") != -1 || input.indexOf("MacPPC") != -1 || input.indexOf("MacIntel") != -1 || input.indexOf("Mac OS X") != -1){

        return "osx";
      } else if(agent.indexOf("RIM Tablet OS") != -1){

        return "rim_tabletos";
      } else if(agent.indexOf("webOS") != -1){

        return "webos";
      } else if(input.indexOf("iPod") != -1 || input.indexOf("iPhone") != -1 || input.indexOf("iPad") != -1){

        return "ios";
      } else if(agent.indexOf("Android") != -1){

        return "android";
      } else if(input.indexOf("Linux") != -1){

        return "linux";
      } else if(input.indexOf("X11") != -1 || input.indexOf("BSD") != -1 || input.indexOf("Darwin") != -1){

        return "unix";
      } else if(input.indexOf("SymbianOS") != -1){

        return "symbian";
      } else if(input.indexOf("BlackBerry") != -1){

        return "blackberry";
      };;;;;;;;;
      // don't know
      return "";
    },
    /** Maps user agent names to system IDs */
    __ids : {
      // Windows
      "Windows NT 6.3" : "8.1",
      "Windows NT 6.2" : "8",
      "Windows NT 6.1" : "7",
      "Windows NT 6.0" : "vista",
      "Windows NT 5.2" : "2003",
      "Windows NT 5.1" : "xp",
      "Windows NT 5.0" : "2000",
      "Windows 2000" : "2000",
      "Windows NT 4.0" : "nt4",
      "Win 9x 4.90" : "me",
      "Windows CE" : "ce",
      "Windows 98" : "98",
      "Win98" : "98",
      "Windows 95" : "95",
      "Win95" : "95",
      // OS X
      "Mac OS X 10_9" : "10.9",
      "Mac OS X 10.9" : "10.9",
      "Mac OS X 10_8" : "10.8",
      "Mac OS X 10.8" : "10.8",
      "Mac OS X 10_7" : "10.7",
      "Mac OS X 10.7" : "10.7",
      "Mac OS X 10_6" : "10.6",
      "Mac OS X 10.6" : "10.6",
      "Mac OS X 10_5" : "10.5",
      "Mac OS X 10.5" : "10.5",
      "Mac OS X 10_4" : "10.4",
      "Mac OS X 10.4" : "10.4",
      "Mac OS X 10_3" : "10.3",
      "Mac OS X 10.3" : "10.3",
      "Mac OS X 10_2" : "10.2",
      "Mac OS X 10.2" : "10.2",
      "Mac OS X 10_1" : "10.1",
      "Mac OS X 10.1" : "10.1",
      "Mac OS X 10_0" : "10.0",
      "Mac OS X 10.0" : "10.0"
    },
    /**
     * Checks for the version of the operating system using the internal map.
     *
     * @internal
     * @return {String} The version as strin or an empty string if the version
     *   could not be detected.
     */
    getVersion : function(){

      var version = qx.bom.client.OperatingSystem.__getVersionForDesktopOs(navigator.userAgent);
      if(version == null){

        version = qx.bom.client.OperatingSystem.__getVersionForMobileOs(navigator.userAgent);
      };
      if(version != null){

        return version;
      } else {

        return "";
      };
    },
    /**
     * Detect OS version for desktop devices
     * @param userAgent {String} userAgent parameter, needed for detection.
     * @return {String} version number as string or null.
     */
    __getVersionForDesktopOs : function(userAgent){

      var str = [];
      for(var key in qx.bom.client.OperatingSystem.__ids){

        str.push(key);
      };
      var reg = new RegExp("(" + str.join("|").replace(/\./g, "\.") + ")", "g");
      var match = reg.exec(userAgent);
      if(match && match[1]){

        return qx.bom.client.OperatingSystem.__ids[match[1]];
      };
      return null;
    },
    /**
     * Detect OS version for mobile devices
     * @param userAgent {String} userAgent parameter, needed for detection.
     * @return {String} version number as string or null.
     */
    __getVersionForMobileOs : function(userAgent){

      var android = userAgent.indexOf("Android") != -1;
      var iOs = userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false;
      if(android){

        var androidVersionRegExp = new RegExp(/ Android (\d+(?:\.\d+)+)/i);
        var androidMatch = androidVersionRegExp.exec(userAgent);
        if(androidMatch && androidMatch[1]){

          return androidMatch[1];
        };
      } else if(iOs){

        var iOsVersionRegExp = new RegExp(/(CPU|iPhone|iPod) OS (\d+)_(\d+)(?:_(\d+))*\s+/);
        var iOsMatch = iOsVersionRegExp.exec(userAgent);
        if(iOsMatch && iOsMatch[2] && iOsMatch[3]){

          if(iOsMatch[4]){

            return iOsMatch[2] + "." + iOsMatch[3] + "." + iOsMatch[4];
          } else {

            return iOsMatch[2] + "." + iOsMatch[3];
          };
        };
      };
      return null;
    }
  },
  defer : function(statics){

    qx.core.Environment.add("os.name", statics.getName);
    qx.core.Environment.add("os.version", statics.getVersion);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Hagendorn (chris_schmidt)
     * Martin Wittemann (martinwittemann)

   ======================================================================

   This class contains code from:

     Copyright:
       2009 Deutsche Telekom AG, Germany, http://telekom.com

     License:
       LGPL: http://www.gnu.org/licenses/lgpl.html
       EPL: http://www.eclipse.org/org/documents/epl-v10.php

     Authors:
       * Sebastian Werner (wpbasti)

   ======================================================================

   This class contains code from:

     Copyright:
       2011 Pocket Widget S.L., Spain, http://www.pocketwidget.com

     License:
       LGPL: http://www.gnu.org/licenses/lgpl.html
       EPL: http://www.eclipse.org/org/documents/epl-v10.php

     Authors:
       * Javier Martinez Villacampa


************************************************************************ */
/**
 * Basic browser detection for qooxdoo.
 *
 * This class is used by {@link qx.core.Environment} and should not be used
 * directly. Please check its class comment for details how to use it.
 *
 * @require(qx.bom.client.OperatingSystem#getVersion)
 * @internal
 */
qx.Bootstrap.define("qx.bom.client.Browser", {
  statics : {
    /**
     * Checks for the name of the browser and returns it.
     * @return {String} The name of the current browser.
     * @internal
     */
    getName : function(){

      var agent = navigator.userAgent;
      var reg = new RegExp("(" + qx.bom.client.Browser.__agents + ")(/| )([0-9]+\.[0-9])");
      var match = agent.match(reg);
      if(!match){

        return "";
      };
      var name = match[1].toLowerCase();
      var engine = qx.bom.client.Engine.getName();
      if(engine === "webkit"){

        if(name === "android"){

          // Fix Chrome name (for instance wrongly defined in user agent on Android 1.6)
          name = "mobile chrome";
        } else if(agent.indexOf("Mobile Safari") !== -1 || agent.indexOf("Mobile/") !== -1){

          // Fix Safari name
          name = "mobile safari";
        } else if(agent.indexOf(" OPR/") != -1){

          name = "opera";
        };;
      } else if(engine === "mshtml"){

        // IE 11's ua string no longer contains "MSIE" or even "IE"
        if(name === "msie" || name === "trident"){

          name = "ie";
          // Fix IE mobile before Microsoft added IEMobile string
          if(qx.bom.client.OperatingSystem.getVersion() === "ce"){

            name = "iemobile";
          };
        };
      } else if(engine === "opera"){

        if(name === "opera mobi"){

          name = "operamobile";
        } else if(name === "opera mini"){

          name = "operamini";
        };
      } else if(engine === "gecko"){

        if(agent.indexOf("Maple") !== -1){

          name = "maple";
        };
      };;;
      return name;
    },
    /**
     * Determines the version of the current browser.
     * @return {String} The name of the current browser.
     * @internal
     */
    getVersion : function(){

      var agent = navigator.userAgent;
      var reg = new RegExp("(" + qx.bom.client.Browser.__agents + ")(/| )([0-9]+\.[0-9])");
      var match = agent.match(reg);
      if(!match){

        return "";
      };
      var name = match[1].toLowerCase();
      var version = match[3];
      // Support new style version string used by Opera and Safari
      if(agent.match(/Version(\/| )([0-9]+\.[0-9])/)){

        version = RegExp.$2;
      };
      if(qx.bom.client.Engine.getName() == "mshtml"){

        // Use the Engine version, because IE8 and higher change the user agent
        // string to an older version in compatibility mode
        version = qx.bom.client.Engine.getVersion();
        if(name === "msie" && qx.bom.client.OperatingSystem.getVersion() == "ce"){

          // Fix IE mobile before Microsoft added IEMobile string
          version = "5.0";
        };
      };
      if(qx.bom.client.Browser.getName() == "maple"){

        // Fix version detection for Samsung Smart TVs Maple browser from 2010 and 2011 models
        reg = new RegExp("(Maple )([0-9]+\.[0-9]+\.[0-9]*)");
        match = agent.match(reg);
        if(!match){

          return "";
        };
        version = match[2];
      };
      if(qx.bom.client.Engine.getName() == "webkit" || qx.bom.client.Browser.getName() == "opera"){

        if(agent.match(/OPR(\/| )([0-9]+\.[0-9])/)){

          version = RegExp.$2;
        };
      };
      return version;
    },
    /**
     * Returns in which document mode the current document is (only for IE).
     *
     * @internal
     * @return {Number} The mode in which the browser is.
     */
    getDocumentMode : function(){

      if(document.documentMode){

        return document.documentMode;
      };
      return 0;
    },
    /**
     * Check if in quirks mode.
     *
     * @internal
     * @return {Boolean} <code>true</code>, if the environment is in quirks mode
     */
    getQuirksMode : function(){

      if(qx.bom.client.Engine.getName() == "mshtml" && parseFloat(qx.bom.client.Engine.getVersion()) >= 8){

        return qx.bom.client.Engine.DOCUMENT_MODE === 5;
      } else {

        return document.compatMode !== "CSS1Compat";
      };
    },
    /**
     * Internal helper map for picking the right browser names to check.
     */
    __agents : {
      // Safari should be the last one to check, because some other Webkit-based browsers
      // use this identifier together with their own one.
      // "Version" is used in Safari 4 to define the Safari version. After "Safari" they place the
      // Webkit version instead. Silly.
      // Palm Pre uses both Safari (contains Webkit version) and "Version" contains the "Pre" version. But
      // as "Version" is not Safari here, we better detect this as the Pre-Browser version. So place
      // "Pre" in front of both "Version" and "Safari".
      "webkit" : "AdobeAIR|Titanium|Fluid|Chrome|Android|Epiphany|Konqueror|iCab|OmniWeb|Maxthon|Pre|PhantomJS|Mobile Safari|Safari",
      // Better security by keeping Firefox the last one to match
      "gecko" : "prism|Fennec|Camino|Kmeleon|Galeon|Netscape|SeaMonkey|Namoroka|Firefox",
      // No idea what other browsers based on IE's engine
      "mshtml" : "IEMobile|Maxthon|MSIE|Trident",
      // Keep "Opera" the last one to correctly prefer/match the mobile clients
      "opera" : "Opera Mini|Opera Mobi|Opera"
    }[qx.bom.client.Engine.getName()]
  },
  defer : function(statics){

    qx.core.Environment.add("browser.name", statics.getName) , qx.core.Environment.add("browser.version", statics.getVersion) , qx.core.Environment.add("browser.documentmode", statics.getDocumentMode) , qx.core.Environment.add("browser.quirksmode", statics.getQuirksMode);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2013 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Daniel Wagner (danielwagner)

************************************************************************ */
/**
 * CSS Transition support checks.
 *
 * Spec: http://www.w3.org/TR/css3-transitions/
 *
 * @internal
 */
qx.Bootstrap.define("qx.bom.client.CssTransition", {
  statics : {
    /**
     * Returns the (possibly vendor-prefixed) name of the CSS transition property
     * @return {String|null} transition property name or <code>null</code> if
     * not supported
     * @internal
     */
    getTransitionName : function(){

      return qx.bom.Style.getPropertyName("transition");
    },
    /**
     * Main check method which returns an object if CSS transitions are
     * supported. The object contains the following keys:
     * <ul>
     *  <li><code>name</code> The name of the CSS transition property</li>
     *  <li><code>end-event</code> The name of the end event</li>
     * </ul>
     *
     * @internal
     * @return {Object|null} The described object or <code>null</code> if
     * transitions are not supported.
     */
    getSupport : function(){

      var name = qx.bom.client.CssTransition.getTransitionName();
      if(!name){

        return null;
      };
      var eventName = qx.bom.Event.getEventName(window, "transitionEnd");
      eventName = eventName == "transitionEnd" ? eventName.toLowerCase() : eventName;
      // Detecting the end event's name is not possible in some browsers,
      // so we deduce it from the property name instead.
      if(!eventName){

        eventName = name + (name.indexOf("Trans") > 0 ? "E" : "e") + "nd";
      };
      return {
        name : name,
        "end-event" : eventName
      };
    }
  },
  defer : function(statics){

    qx.core.Environment.add("css.transition", statics.getSupport);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2008-2010 Sebastian Werner, http://sebastian-werner.net

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Fabian Jakobs (fjakobs)
     * Andreas Ecker (ecker)

   ======================================================================

   This class contains code based on the following work:

   * Sizzle CSS Selector Engine - v1.8.2

     Homepage:
       http://sizzlejs.com/

     Documentation:
       http://wiki.github.com/jeresig/sizzle

     Discussion:
       http://groups.google.com/group/sizzlejs

     Code:
       http://github.com/jeresig/sizzle/tree

     Copyright:
       (c) 2009, The Dojo Foundation

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

   ----------------------------------------------------------------------

     Copyright (c) 2009 John Resig

     Permission is hereby granted, free of charge, to any person
     obtaining a copy of this software and associated documentation files
     (the "Software"), to deal in the Software without restriction,
     including without limitation the rights to use, copy, modify, merge,
     publish, distribute, sublicense, and/or sell copies of the Software,
     and to permit persons to whom the Software is furnished to do so,
     subject to the following conditions:

     The above copyright notice and this permission notice shall be
     included in all copies or substantial portions of the Software.

     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
     MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
     HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
     WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
     DEALINGS IN THE SOFTWARE.

   ----------------------------------------------------------------------

     Version:
       Snapshot taken on 2012-10-02, latest Sizzle commit on 2012-09-20:
       commit  41a7c2ce9be6c66e0c9b8b15e0a29c8e3ca6fb31

************************************************************************ */
/**
 * The selector engine supports virtually all CSS 3 Selectors  – this even
 * includes some parts that are infrequently implemented such as escaped
 * selectors (<code>.foo\\+bar</code>), Unicode selectors, and results returned
 * in document order. There are a few notable exceptions to the CSS 3 selector
 * support:
 *
 * * <code>:root</code>
 * * <code>:target</code>
 * * <code>:nth-last-child</code>
 * * <code>:nth-of-type</code>
 * * <code>:nth-last-of-type</code>
 * * <code>:first-of-type</code>
 * * <code>:last-of-type</code>
 * * <code>:only-of-type</code>
 * * <code>:lang()</code>
 *
 * In addition to the CSS 3 Selectors the engine supports the following
 * additional selectors or conventions.
 *
 * *Changes*
 *
 * * <code>:not(a.b)</code>: Supports non-simple selectors in <code>:not()</code> (most browsers only support <code>:not(a)</code>, for example).
 * * <code>:not(div > p)</code>: Supports full selectors in <code>:not()</code>.
 * * <code>:not(div, p)</code>: Supports multiple selectors in <code>:not()</code>.
 * * <code>[NAME=VALUE]</code>: Doesn't require quotes around the specified value in an attribute selector.
 *
 * *Additions*
 *
 * * <code>[NAME!=VALUE]</code>: Finds all elements whose <code>NAME</code> attribute doesn't match the specified value. Is equivalent to doing <code>:not([NAME=VALUE])</code>.
 * * <code>:contains(TEXT)</code>: Finds all elements whose textual context contains the word <code>TEXT</code> (case sensitive).
 * * <code>:header</code>: Finds all elements that are a header element (h1, h2, h3, h4, h5, h6).
 * * <code>:parent</code>: Finds all elements that contains another element.
 *
 * *Positional Selector Additions*
 *
 * * <code>:first</code>/</code>:last</code>: Finds the first or last matching element on the page. (e.g. <code>div:first</code> would find the first div on the page, in document order)
 * * <code>:even</code>/<code>:odd</code>: Finds every other element on the page (counting begins at 0, so <code>:even</code> would match the first element).
 * * <code>:eq</code>/<code>:nth</code>: Finds the Nth element on the page (e.g. <code>:eq(5)</code> finds the 6th element on the page).
 * * <code>:lt</code>/<code>:gt</code>: Finds all elements at positions less than or greater than the specified positions.
 *
 * *Form Selector Additions*
 *
 * * <code>:input</code>: Finds all input elements (includes textareas, selects, and buttons).
 * * <code>:text</code>, <code>:checkbox</code>, <code>:file</code>, <code>:password</code>, <code>:submit</code>, <code>:image</code>, <code>:reset</code>, <code>:button</code>: Finds the input element with the specified input type (<code>:button</code> also finds button elements).
 *
 * Based on Sizzle by John Resig, see:
 *
 * * http://sizzlejs.com/
 *
 * For further usage details also have a look at the wiki page at:
 *
 * * https://github.com/jquery/sizzle/wiki/Sizzle-Home
 */
qx.Bootstrap.define("qx.bom.Selector", {
  statics : {
    /**
     * Queries the document for the given selector. Supports all CSS3 selectors
     * plus some extensions as mentioned in the class description.
     *
     * @signature function(selector, context)
     * @param selector {String} Valid selector (CSS3 + extensions)
     * @param context {Element} Context element (result elements must be children of this element)
     * @return {Array} Matching elements
     */
    query : null,
    /**
     * Returns an reduced array which only contains the elements from the given
     * array which matches the given selector
     *
     * @signature function(selector, set)
     * @param selector {String} Selector to filter given set
     * @param set {Array} List to filter according to given selector
     * @return {Array} New array containing matching elements
     */
    matches : null
  }
});
/**
 * Below is the original Sizzle code. Snapshot date is mentioned in the head of
 * this file.
 * @lint ignoreUnused(j, rnot, rendsWithNot)
 */
/*!
 * Sizzle CSS Selector Engine
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://sizzlejs.com/
 */
(function(window, undefined){

  var cachedruns,assertGetIdNotName,Expr,getText,isXML,contains,compile,sortOrder,hasDuplicate,outermostContext,baseHasDuplicate = true,strundefined = "undefined",expando = ("sizcache" + Math.random()).replace(".", ""),Token = String,document = window.document,docElem = document.documentElement,dirruns = 0,done = 0,pop = [].pop,push = [].push,slice = [].slice,// Use a stripped-down indexOf if a native one is unavailable
  indexOf = [].indexOf || function(elem){

    var i = 0,len = this.length;
    for(;i < len;i++){

      if(this[i] === elem){

        return i;
      };
    };
    return -1;
  },// Augment a function for special use by Sizzle
  markFunction = function(fn, value){

    fn[expando] = value == null || value;
    return fn;
  },createCache = function(){

    var cache = {
    },keys = [];
    return markFunction(function(key, value){

      // Only keep the most recent entries
      if(keys.push(key) > Expr.cacheLength){

        delete cache[keys.shift()];
      };
      return (cache[key] = value);
    }, cache);
  },classCache = createCache(),tokenCache = createCache(),compilerCache = createCache(),// Regex
  // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
  whitespace = "[\\x20\\t\\r\\n\\f]",// http://www.w3.org/TR/css3-syntax/#characters
  characterEncoding = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",// Loosely modeled on CSS identifier characters
  // An unquoted value should be a CSS identifier (http://www.w3.org/TR/css3-selectors/#attribute-selectors)
  // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
  identifier = characterEncoding.replace("w", "w#"),// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
  operators = "([*^$|!~]?=)",attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace + "*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",// Prefer arguments not in parens/brackets,
  //   then attribute selectors and non-pseudos (denoted by :),
  //   then anything else
  // These preferences are here to reduce the number of selectors
  //   needing tokenize in the PSEUDO preFilter
  pseudos = ":(" + characterEncoding + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + attributes + ")|[^:]|\\\\.)*|.*))\\)|)",// For matchExpr.POS and matchExpr.needsContext
  pos = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)",// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
  rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),rcombinators = new RegExp("^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*"),rpseudo = new RegExp(pseudos),// Easily-parseable/retrievable ID or TAG or CLASS selectors
  rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,rnot = /^:not/,rsibling = /[\x20\t\r\n\f]*[+~]/,rendsWithNot = /:not\($/,rheader = /h\d/i,rinputs = /input|select|textarea|button/i,rbackslash = /\\(?!\\)/g,matchExpr = {
    "ID" : new RegExp("^#(" + characterEncoding + ")"),
    "CLASS" : new RegExp("^\\.(" + characterEncoding + ")"),
    "NAME" : new RegExp("^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]"),
    "TAG" : new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
    "ATTR" : new RegExp("^" + attributes),
    "PSEUDO" : new RegExp("^" + pseudos),
    "POS" : new RegExp(pos, "i"),
    "CHILD" : new RegExp("^:(only|nth|first|last)-child(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
    // For use in libraries implementing .is()
    "needsContext" : new RegExp("^" + whitespace + "*[>+~]|" + pos, "i")
  },// Support
  // Used for testing something on an element
  assert = function(fn){

    var div = document.createElement("div");
    try{

      return fn(div);
    } catch(e) {

      return false;
    }finally{

      // release memory in IE
      div = null;
    };
  },// Check if getElementsByTagName("*") returns only elements
  assertTagNameNoComments = assert(function(div){

    div.appendChild(document.createComment(""));
    return !div.getElementsByTagName("*").length;
  }),// Check if getAttribute returns normalized href attributes
  assertHrefNotNormalized = assert(function(div){

    div.innerHTML = "<a href='#'></a>";
    return div.firstChild && typeof div.firstChild.getAttribute !== strundefined && div.firstChild.getAttribute("href") === "#";
  }),// Check if attributes should be retrieved by attribute nodes
  assertAttributes = assert(function(div){

    div.innerHTML = "<select></select>";
    var type = typeof div.lastChild.getAttribute("multiple");
    // IE8 returns a string for some attributes even when not present
    return type !== "boolean" && type !== "string";
  }),// Check if getElementsByClassName can be trusted
  assertUsableClassName = assert(function(div){

    // Opera can't find a second classname (in 9.6)
    div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
    if(!div.getElementsByClassName || !div.getElementsByClassName("e").length){

      return false;
    };
    // Safari 3.2 caches class attributes and doesn't catch changes
    div.lastChild.className = "e";
    return div.getElementsByClassName("e").length === 2;
  }),// Check if getElementById returns elements by name
  // Check if getElementsByName privileges form controls or returns elements by ID
  assertUsableName = assert(function(div){

    // Inject content
    div.id = expando + 0;
    div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
    docElem.insertBefore(div, docElem.firstChild);
    // Test
    var pass = document.getElementsByName && // buggy browsers will return fewer than the correct 2
    document.getElementsByName(expando).length === 2 + // buggy browsers will return more than the correct 0
    document.getElementsByName(expando + 0).length;
    assertGetIdNotName = !document.getElementById(expando);
    // Cleanup
    docElem.removeChild(div);
    return pass;
  });
  // If slice is not available, provide a backup
  try{

    slice.call(docElem.childNodes, 0)[0].nodeType;
  } catch(e) {

    slice = function(i){

      var elem,results = [];
      for(;(elem = this[i]);i++){

        results.push(elem);
      };
      return results;
    };
  };
  function Sizzle(selector, context, results, seed){

    results = results || [];
    context = context || document;
    var match,elem,xml,m,nodeType = context.nodeType;
    if(!selector || typeof selector !== "string"){

      return results;
    };
    if(nodeType !== 1 && nodeType !== 9){

      return [];
    };
    xml = isXML(context);
    if(!xml && !seed){

      if((match = rquickExpr.exec(selector))){

        // Speed-up: Sizzle("#ID")
        if((m = match[1])){

          if(nodeType === 9){

            elem = context.getElementById(m);
            // Check parentNode to catch when Blackberry 4.6 returns
            // nodes that are no longer in the document #6963
            if(elem && elem.parentNode){

              // Handle the case where IE, Opera, and Webkit return items
              // by name instead of ID
              if(elem.id === m){

                results.push(elem);
                return results;
              };
            } else {

              return results;
            };
          } else {

            // Context is not a document
            if(context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m){

              results.push(elem);
              return results;
            };
          };
        } else if(match[2]){

          push.apply(results, slice.call(context.getElementsByTagName(selector), 0));
          return results;
        } else if((m = match[3]) && assertUsableClassName && context.getElementsByClassName){

          push.apply(results, slice.call(context.getElementsByClassName(m), 0));
          return results;
        };;
      };
    };
    // All others
    return select(selector.replace(rtrim, "$1"), context, results, seed, xml);
  };
  Sizzle.matches = function(expr, elements){

    return Sizzle(expr, null, null, elements);
  };
  Sizzle.matchesSelector = function(elem, expr){

    return Sizzle(expr, null, null, [elem]).length > 0;
  };
  // Returns a function to use in pseudos for input types
  function createInputPseudo(type){

    return function(elem){

      var name = elem.nodeName.toLowerCase();
      return name === "input" && elem.type === type;
    };
  };
  // Returns a function to use in pseudos for buttons
  function createButtonPseudo(type){

    return function(elem){

      var name = elem.nodeName.toLowerCase();
      return (name === "input" || name === "button") && elem.type === type;
    };
  };
  // Returns a function to use in pseudos for positionals
  function createPositionalPseudo(fn){

    return markFunction(function(argument){

      argument = +argument;
      return markFunction(function(seed, matches){

        var j,matchIndexes = fn([], seed.length, argument),i = matchIndexes.length;
        // Match elements found at the specified indexes
        while(i--){

          if(seed[(j = matchIndexes[i])]){

            seed[j] = !(matches[j] = seed[j]);
          };
        };
      });
    });
  };
  /**
   * Utility function for retrieving the text value of an array of DOM nodes
   * @param elem {Array|Element}
   */
  getText = Sizzle.getText = function(elem){

    var node,ret = "",i = 0,nodeType = elem.nodeType;
    if(nodeType){

      if(nodeType === 1 || nodeType === 9 || nodeType === 11){

        // Use textContent for elements
        // innerText usage removed for consistency of new lines (see #11153)
        if(typeof elem.textContent === "string"){

          return elem.textContent;
        } else {

          // Traverse its children
          for(elem = elem.firstChild;elem;elem = elem.nextSibling){

            ret += getText(elem);
          };
        };
      } else if(nodeType === 3 || nodeType === 4){

        return elem.nodeValue;
      };
    } else {

      // If no nodeType, this is expected to be an array
      for(;(node = elem[i]);i++){

        // Do not traverse comment nodes
        ret += getText(node);
      };
    };
    return ret;
  };
  isXML = Sizzle.isXML = function(elem){

    // documentElement is verified for cases where it doesn't yet exist
    // (such as loading iframes in IE - #4833)
    var documentElement = elem && (elem.ownerDocument || elem).documentElement;
    return documentElement ? documentElement.nodeName !== "HTML" : false;
  };
  // Element contains another
  contains = Sizzle.contains = docElem.contains ? function(a, b){

    var adown = a.nodeType === 9 ? a.documentElement : a,bup = b && b.parentNode;
    return a === bup || !!(bup && bup.nodeType === 1 && adown.contains && adown.contains(bup));
  } : docElem.compareDocumentPosition ? function(a, b){

    return b && !!(a.compareDocumentPosition(b) & 16);
  } : function(a, b){

    while((b = b.parentNode)){

      if(b === a){

        return true;
      };
    };
    return false;
  };
  Sizzle.attr = function(elem, name){

    var val,xml = isXML(elem);
    if(!xml){

      name = name.toLowerCase();
    };
    if((val = Expr.attrHandle[name])){

      return val(elem);
    };
    if(xml || assertAttributes){

      return elem.getAttribute(name);
    };
    val = elem.getAttributeNode(name);
    return val ? typeof elem[name] === "boolean" ? elem[name] ? name : null : val.specified ? val.value : null : null;
  };
  Expr = Sizzle.selectors = {
    // Can be adjusted by the user
    cacheLength : 50,
    createPseudo : markFunction,
    match : matchExpr,
    // IE6/7 return a modified href
    attrHandle : assertHrefNotNormalized ? {
    } : {
      "href" : function(elem){

        return elem.getAttribute("href", 2);
      },
      "type" : function(elem){

        return elem.getAttribute("type");
      }
    },
    find : {
      "ID" : assertGetIdNotName ? function(id, context, xml){

        if(typeof context.getElementById !== strundefined && !xml){

          var m = context.getElementById(id);
          // Check parentNode to catch when Blackberry 4.6 returns
          // nodes that are no longer in the document #6963
          return m && m.parentNode ? [m] : [];
        };
      } : function(id, context, xml){

        if(typeof context.getElementById !== strundefined && !xml){

          var m = context.getElementById(id);
          return m ? m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ? [m] : undefined : [];
        };
      },
      "TAG" : assertTagNameNoComments ? function(tag, context){

        if(typeof context.getElementsByTagName !== strundefined){

          return context.getElementsByTagName(tag);
        };
      } : function(tag, context){

        var results = context.getElementsByTagName(tag);
        // Filter out possible comments
        if(tag === "*"){

          var elem,tmp = [],i = 0;
          for(;(elem = results[i]);i++){

            if(elem.nodeType === 1){

              tmp.push(elem);
            };
          };
          return tmp;
        };
        return results;
      },
      "NAME" : assertUsableName && function(tag, context){

        if(typeof context.getElementsByName !== strundefined){

          return context.getElementsByName(name);
        };
      },
      "CLASS" : assertUsableClassName && function(className, context, xml){

        if(typeof context.getElementsByClassName !== strundefined && !xml){

          return context.getElementsByClassName(className);
        };
      }
    },
    relative : {
      ">" : {
        dir : "parentNode",
        first : true
      },
      " " : {
        dir : "parentNode"
      },
      "+" : {
        dir : "previousSibling",
        first : true
      },
      "~" : {
        dir : "previousSibling"
      }
    },
    preFilter : {
      "ATTR" : function(match){

        match[1] = match[1].replace(rbackslash, "");
        // Move the given value to match[3] whether quoted or unquoted
        match[3] = (match[4] || match[5] || "").replace(rbackslash, "");
        if(match[2] === "~="){

          match[3] = " " + match[3] + " ";
        };
        return match.slice(0, 4);
      },
      "CHILD" : function(match){

        /* matches from matchExpr["CHILD"]
          1 type (only|nth|...)
          2 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
          3 xn-component of xn+y argument ([+-]?\d*n|)
          4 sign of xn-component
          5 x of xn-component
          6 sign of y-component
          7 y of y-component
        */
        match[1] = match[1].toLowerCase();
        if(match[1] === "nth"){

          // nth-child requires argument
          if(!match[2]){

            Sizzle.error(match[0]);
          };
          // numeric x and y parameters for Expr.filter.CHILD
          // remember that false/true cast respectively to 0/1
          match[3] = +(match[3] ? match[4] + (match[5] || 1) : 2 * (match[2] === "even" || match[2] === "odd"));
          match[4] = +((match[6] + match[7]) || match[2] === "odd");
        } else if(match[2]){

          Sizzle.error(match[0]);
        };
        return match;
      },
      "PSEUDO" : function(match){

        var unquoted,excess;
        if(matchExpr["CHILD"].test(match[0])){

          return null;
        };
        if(match[3]){

          match[2] = match[3];
        } else if((unquoted = match[4])){

          // Only check arguments that contain a pseudo
          if(rpseudo.test(unquoted) && // Get excess from tokenize (recursively)
          (excess = tokenize(unquoted, true)) && // advance to the next closing parenthesis
          (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)){

            // excess is a negative index
            unquoted = unquoted.slice(0, excess);
            match[0] = match[0].slice(0, excess);
          };
          match[2] = unquoted;
        };
        // Return only captures needed by the pseudo filter method (type and argument)
        return match.slice(0, 3);
      }
    },
    filter : {
      "ID" : assertGetIdNotName ? function(id){

        id = id.replace(rbackslash, "");
        return function(elem){

          return elem.getAttribute("id") === id;
        };
      } : function(id){

        id = id.replace(rbackslash, "");
        return function(elem){

          var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
          return node && node.value === id;
        };
      },
      "TAG" : function(nodeName){

        if(nodeName === "*"){

          return function(){

            return true;
          };
        };
        nodeName = nodeName.replace(rbackslash, "").toLowerCase();
        return function(elem){

          return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
        };
      },
      "CLASS" : function(className){

        var pattern = classCache[expando][className];
        if(!pattern){

          pattern = classCache(className, new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)"));
        };
        return function(elem){

          return pattern.test(elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "");
        };
      },
      "ATTR" : function(name, operator, check){

        return function(elem, context){

          var result = Sizzle.attr(elem, name);
          if(result == null){

            return operator === "!=";
          };
          if(!operator){

            return true;
          };
          result += "";
          return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.substr(result.length - check.length) === check : operator === "~=" ? (" " + result + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.substr(0, check.length + 1) === check + "-" : false;
        };
      },
      "CHILD" : function(type, argument, first, last){

        if(type === "nth"){

          return function(elem){

            var node,diff,parent = elem.parentNode;
            if(first === 1 && last === 0){

              return true;
            };
            if(parent){

              diff = 0;
              for(node = parent.firstChild;node;node = node.nextSibling){

                if(node.nodeType === 1){

                  diff++;
                  if(elem === node){

                    break;
                  };
                };
              };
            };
            // Incorporate the offset (or cast to NaN), then check against cycle size
            diff -= last;
            return diff === first || (diff % first === 0 && diff / first >= 0);
          };
        };
        return function(elem){

          var node = elem;
          switch(type){case "only":case "first":
          while((node = node.previousSibling)){

            if(node.nodeType === 1){

              return false;
            };
          };
          if(type === "first"){

            return true;
          };
          node = elem;/* falls through */
          case "last":
          while((node = node.nextSibling)){

            if(node.nodeType === 1){

              return false;
            };
          };
          return true;};
        };
      },
      "PSEUDO" : function(pseudo, argument){

        // pseudo-class names are case-insensitive
        // http://www.w3.org/TR/selectors/#pseudo-classes
        // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
        // Remember that setFilters inherits from pseudos
        var args,fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
        // The user may use createPseudo to indicate that
        // arguments are needed to create the filter function
        // just as Sizzle does
        if(fn[expando]){

          return fn(argument);
        };
        // But maintain support for old signatures
        if(fn.length > 1){

          args = [pseudo, pseudo, "", argument];
          return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches){

            var idx,matched = fn(seed, argument),i = matched.length;
            while(i--){

              idx = indexOf.call(seed, matched[i]);
              seed[idx] = !(matches[idx] = matched[i]);
            };
          }) : function(elem){

            return fn(elem, 0, args);
          };
        };
        return fn;
      }
    },
    pseudos : {
      "not" : markFunction(function(selector){

        // Trim the selector passed to compile
        // to avoid treating leading and trailing
        // spaces as combinators
        var input = [],results = [],matcher = compile(selector.replace(rtrim, "$1"));
        return matcher[expando] ? markFunction(function(seed, matches, context, xml){

          var elem,unmatched = matcher(seed, null, xml, []),i = seed.length;
          // Match elements unmatched by `matcher`
          while(i--){

            if((elem = unmatched[i])){

              seed[i] = !(matches[i] = elem);
            };
          };
        }) : function(elem, context, xml){

          input[0] = elem;
          matcher(input, null, xml, results);
          return !results.pop();
        };
      }),
      "has" : markFunction(function(selector){

        return function(elem){

          return Sizzle(selector, elem).length > 0;
        };
      }),
      "contains" : markFunction(function(text){

        return function(elem){

          return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
        };
      }),
      "enabled" : function(elem){

        return elem.disabled === false;
      },
      "disabled" : function(elem){

        return elem.disabled === true;
      },
      "checked" : function(elem){

        // In CSS3, :checked should return both checked and selected elements
        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
        var nodeName = elem.nodeName.toLowerCase();
        return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
      },
      "selected" : function(elem){

        // Accessing this property makes selected-by-default
        // options in Safari work properly
        if(elem.parentNode){

          elem.parentNode.selectedIndex;
        };
        return elem.selected === true;
      },
      "parent" : function(elem){

        return !Expr.pseudos["empty"](elem);
      },
      "empty" : function(elem){

        // http://www.w3.org/TR/selectors/#empty-pseudo
        // :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
        //   not comment, processing instructions, or others
        // Thanks to Diego Perini for the nodeName shortcut
        //   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
        var nodeType;
        elem = elem.firstChild;
        while(elem){

          if(elem.nodeName > "@" || (nodeType = elem.nodeType) === 3 || nodeType === 4){

            return false;
          };
          elem = elem.nextSibling;
        };
        return true;
      },
      "header" : function(elem){

        return rheader.test(elem.nodeName);
      },
      "text" : function(elem){

        var type,attr;
        // IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
        // use getAttribute instead to test this case
        return elem.nodeName.toLowerCase() === "input" && (type = elem.type) === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === type);
      },
      // Input types
      "radio" : createInputPseudo("radio"),
      "checkbox" : createInputPseudo("checkbox"),
      "file" : createInputPseudo("file"),
      "password" : createInputPseudo("password"),
      "image" : createInputPseudo("image"),
      "submit" : createButtonPseudo("submit"),
      "reset" : createButtonPseudo("reset"),
      "button" : function(elem){

        var name = elem.nodeName.toLowerCase();
        return name === "input" && elem.type === "button" || name === "button";
      },
      "input" : function(elem){

        return rinputs.test(elem.nodeName);
      },
      "focus" : function(elem){

        var doc = elem.ownerDocument;
        return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href);
      },
      "active" : function(elem){

        return elem === elem.ownerDocument.activeElement;
      },
      // Positional types
      "first" : createPositionalPseudo(function(matchIndexes, length, argument){

        return [0];
      }),
      "last" : createPositionalPseudo(function(matchIndexes, length, argument){

        return [length - 1];
      }),
      "eq" : createPositionalPseudo(function(matchIndexes, length, argument){

        return [argument < 0 ? argument + length : argument];
      }),
      "even" : createPositionalPseudo(function(matchIndexes, length, argument){

        for(var i = 0;i < length;i += 2){

          matchIndexes.push(i);
        };
        return matchIndexes;
      }),
      "odd" : createPositionalPseudo(function(matchIndexes, length, argument){

        for(var i = 1;i < length;i += 2){

          matchIndexes.push(i);
        };
        return matchIndexes;
      }),
      "lt" : createPositionalPseudo(function(matchIndexes, length, argument){

        for(var i = argument < 0 ? argument + length : argument;--i >= 0;){

          matchIndexes.push(i);
        };
        return matchIndexes;
      }),
      "gt" : createPositionalPseudo(function(matchIndexes, length, argument){

        for(var i = argument < 0 ? argument + length : argument;++i < length;){

          matchIndexes.push(i);
        };
        return matchIndexes;
      })
    }
  };
  function siblingCheck(a, b, ret){

    if(a === b){

      return ret;
    };
    var cur = a.nextSibling;
    while(cur){

      if(cur === b){

        return -1;
      };
      cur = cur.nextSibling;
    };
    return 1;
  };
  sortOrder = docElem.compareDocumentPosition ? function(a, b){

    if(a === b){

      hasDuplicate = true;
      return 0;
    };
    return (!a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition : a.compareDocumentPosition(b) & 4) ? -1 : 1;
  } : function(a, b){

    // The nodes are identical, we can exit early
    if(a === b){

      hasDuplicate = true;
      return 0;
    } else if(a.sourceIndex && b.sourceIndex){

      return a.sourceIndex - b.sourceIndex;
    };
    var al,bl,ap = [],bp = [],aup = a.parentNode,bup = b.parentNode,cur = aup;
    // If the nodes are siblings (or identical) we can do a quick check
    if(aup === bup){

      return siblingCheck(a, b);
    } else if(!aup){

      return -1;
    } else if(!bup){

      return 1;
    };;
    // Otherwise they're somewhere else in the tree so we need
    // to build up a full list of the parentNodes for comparison
    while(cur){

      ap.unshift(cur);
      cur = cur.parentNode;
    };
    cur = bup;
    while(cur){

      bp.unshift(cur);
      cur = cur.parentNode;
    };
    al = ap.length;
    bl = bp.length;
    // Start walking down the tree looking for a discrepancy
    for(var i = 0;i < al && i < bl;i++){

      if(ap[i] !== bp[i]){

        return siblingCheck(ap[i], bp[i]);
      };
    };
    // We ended someplace up the tree so do a sibling check
    return i === al ? siblingCheck(a, bp[i], -1) : siblingCheck(ap[i], b, 1);
  };
  // Always assume the presence of duplicates if sort doesn't
  // pass them to our comparison function (as in Google Chrome).
  [0, 0].sort(sortOrder);
  baseHasDuplicate = !hasDuplicate;
  // Document sorting and removing duplicates
  Sizzle.uniqueSort = function(results){

    var elem,i = 1;
    hasDuplicate = baseHasDuplicate;
    results.sort(sortOrder);
    if(hasDuplicate){

      for(;(elem = results[i]);i++){

        if(elem === results[i - 1]){

          results.splice(i--, 1);
        };
      };
    };
    return results;
  };
  Sizzle.error = function(msg){

    throw new Error("Syntax error, unrecognized expression: " + msg);
  };
  function tokenize(selector, parseOnly){

    var matched,match,tokens,type,soFar,groups,preFilters,cached = tokenCache[expando][selector];
    if(cached){

      return parseOnly ? 0 : cached.slice(0);
    };
    soFar = selector;
    groups = [];
    preFilters = Expr.preFilter;
    while(soFar){

      // Comma and first run
      if(!matched || (match = rcomma.exec(soFar))){

        if(match){

          soFar = soFar.slice(match[0].length);
        };
        groups.push(tokens = []);
      };
      matched = false;
      // Combinators
      if((match = rcombinators.exec(soFar))){

        tokens.push(matched = new Token(match.shift()));
        soFar = soFar.slice(matched.length);
        // Cast descendant combinators to space
        matched.type = match[0].replace(rtrim, " ");
      };
      // Filters
      for(type in Expr.filter){

        if((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || // The last two arguments here are (context, xml) for backCompat
        (match = preFilters[type](match, document, true)))){

          tokens.push(matched = new Token(match.shift()));
          soFar = soFar.slice(matched.length);
          matched.type = type;
          matched.matches = match;
        };
      };
      if(!matched){

        break;
      };
    };
    // Return the length of the invalid excess
    // if we're just parsing
    // Otherwise, throw an error or return tokens
    return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : // Cache the tokens
    tokenCache(selector, groups).slice(0);
  };
  function addCombinator(matcher, combinator, base){

    var dir = combinator.dir,checkNonElements = base && combinator.dir === "parentNode",doneName = done++;
    return combinator.first ? // Check against closest ancestor/preceding element
    function(elem, context, xml){

      while((elem = elem[dir])){

        if(checkNonElements || elem.nodeType === 1){

          return matcher(elem, context, xml);
        };
      };
    } : // Check against all ancestor/preceding elements
    function(elem, context, xml){

      // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
      if(!xml){

        var cache,dirkey = dirruns + " " + doneName + " ",cachedkey = dirkey + cachedruns;
        while((elem = elem[dir])){

          if(checkNonElements || elem.nodeType === 1){

            if((cache = elem[expando]) === cachedkey){

              return elem.sizset;
            } else if(typeof cache === "string" && cache.indexOf(dirkey) === 0){

              if(elem.sizset){

                return elem;
              };
            } else {

              elem[expando] = cachedkey;
              if(matcher(elem, context, xml)){

                elem.sizset = true;
                return elem;
              };
              elem.sizset = false;
            };
          };
        };
      } else {

        while((elem = elem[dir])){

          if(checkNonElements || elem.nodeType === 1){

            if(matcher(elem, context, xml)){

              return elem;
            };
          };
        };
      };
    };
  };
  function elementMatcher(matchers){

    return matchers.length > 1 ? function(elem, context, xml){

      var i = matchers.length;
      while(i--){

        if(!matchers[i](elem, context, xml)){

          return false;
        };
      };
      return true;
    } : matchers[0];
  };
  function condense(unmatched, map, filter, context, xml){

    var elem,newUnmatched = [],i = 0,len = unmatched.length,mapped = map != null;
    for(;i < len;i++){

      if((elem = unmatched[i])){

        if(!filter || filter(elem, context, xml)){

          newUnmatched.push(elem);
          if(mapped){

            map.push(i);
          };
        };
      };
    };
    return newUnmatched;
  };
  function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector){

    if(postFilter && !postFilter[expando]){

      postFilter = setMatcher(postFilter);
    };
    if(postFinder && !postFinder[expando]){

      postFinder = setMatcher(postFinder, postSelector);
    };
    return markFunction(function(seed, results, context, xml){

      // Positional selectors apply to seed elements, so it is invalid to follow them with relative ones
      if(seed && postFinder){

        return;
      };
      var i,elem,postFilterIn,preMap = [],postMap = [],preexisting = results.length,// Get initial elements from seed or context
      elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, [], seed),// Prefilter to get matcher input, preserving a map for seed-results synchronization
      matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,matcherOut = matcher ? // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
      postFinder || (seed ? preFilter : preexisting || postFilter) ? // ...intermediate processing is necessary
      [] : // ...otherwise use results directly
      results : matcherIn;
      // Find primary matches
      if(matcher){

        matcher(matcherIn, matcherOut, context, xml);
      };
      // Apply postFilter
      if(postFilter){

        postFilterIn = condense(matcherOut, postMap);
        postFilter(postFilterIn, [], context, xml);
        // Un-match failing elements by moving them back to matcherIn
        i = postFilterIn.length;
        while(i--){

          if((elem = postFilterIn[i])){

            matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
          };
        };
      };
      // Keep seed and results synchronized
      if(seed){

        // Ignore postFinder because it can't coexist with seed
        i = preFilter && matcherOut.length;
        while(i--){

          if((elem = matcherOut[i])){

            seed[preMap[i]] = !(results[preMap[i]] = elem);
          };
        };
      } else {

        matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
        if(postFinder){

          postFinder(null, results, matcherOut, xml);
        } else {

          push.apply(results, matcherOut);
        };
      };
    });
  };
  function matcherFromTokens(tokens){

    var checkContext,matcher,j,len = tokens.length,leadingRelative = Expr.relative[tokens[0].type],implicitRelative = leadingRelative || Expr.relative[" "],i = leadingRelative ? 1 : 0,// The foundational matcher ensures that elements are reachable from top-level context(s)
    matchContext = addCombinator(function(elem){

      return elem === checkContext;
    }, implicitRelative, true),matchAnyContext = addCombinator(function(elem){

      return indexOf.call(checkContext, elem) > -1;
    }, implicitRelative, true),matchers = [function(elem, context, xml){

      return (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
    }];
    for(;i < len;i++){

      if((matcher = Expr.relative[tokens[i].type])){

        matchers = [addCombinator(elementMatcher(matchers), matcher)];
      } else {

        // The concatenated values are (context, xml) for backCompat
        matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
        // Return special upon seeing a positional matcher
        if(matcher[expando]){

          // Find the next relative operator (if any) for proper handling
          j = ++i;
          for(;j < len;j++){

            if(Expr.relative[tokens[j].type]){

              break;
            };
          };
          return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && tokens.slice(0, i - 1).join("").replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && tokens.join(""));
        };
        matchers.push(matcher);
      };
    };
    return elementMatcher(matchers);
  };
  function matcherFromGroupMatchers(elementMatchers, setMatchers){

    var bySet = setMatchers.length > 0,byElement = elementMatchers.length > 0,superMatcher = function(seed, context, xml, results, expandContext){

      var elem,j,matcher,setMatched = [],matchedCount = 0,i = "0",unmatched = seed && [],outermost = expandContext != null,contextBackup = outermostContext,// We must always have either seed elements or context
      elems = seed || byElement && Expr.find["TAG"]("*", expandContext && context.parentNode || context),// Nested matchers should use non-integer dirruns
      dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.E);
      if(outermost){

        outermostContext = context !== document && context;
        cachedruns = superMatcher.el;
      };
      // Add elements passing elementMatchers directly to results
      for(;(elem = elems[i]) != null;i++){

        if(byElement && elem){

          for(j = 0;(matcher = elementMatchers[j]);j++){

            if(matcher(elem, context, xml)){

              results.push(elem);
              break;
            };
          };
          if(outermost){

            dirruns = dirrunsUnique;
            cachedruns = ++superMatcher.el;
          };
        };
        // Track unmatched elements for set filters
        if(bySet){

          // They will have gone through all possible matchers
          if((elem = !matcher && elem)){

            matchedCount--;
          };
          // Lengthen the array for every element, matched or not
          if(seed){

            unmatched.push(elem);
          };
        };
      };
      // Apply set filters to unmatched elements
      matchedCount += i;
      if(bySet && i !== matchedCount){

        for(j = 0;(matcher = setMatchers[j]);j++){

          matcher(unmatched, setMatched, context, xml);
        };
        if(seed){

          // Reintegrate element matches to eliminate the need for sorting
          if(matchedCount > 0){

            while(i--){

              if(!(unmatched[i] || setMatched[i])){

                setMatched[i] = pop.call(results);
              };
            };
          };
          // Discard index placeholder values to get only actual matches
          setMatched = condense(setMatched);
        };
        // Add matches to results
        push.apply(results, setMatched);
        // Seedless set matches succeeding multiple successful matchers stipulate sorting
        if(outermost && !seed && setMatched.length > 0 && (matchedCount + setMatchers.length) > 1){

          Sizzle.uniqueSort(results);
        };
      };
      // Override manipulation of globals by nested matchers
      if(outermost){

        dirruns = dirrunsUnique;
        outermostContext = contextBackup;
      };
      return unmatched;
    };
    superMatcher.el = 0;
    return bySet ? markFunction(superMatcher) : superMatcher;
  };
  compile = Sizzle.compile = function(selector, group){

    var i,setMatchers = [],elementMatchers = [],cached = compilerCache[expando][selector];
    if(!cached){

      // Generate a function of recursive functions that can be used to check each element
      if(!group){

        group = tokenize(selector);
      };
      i = group.length;
      while(i--){

        cached = matcherFromTokens(group[i]);
        if(cached[expando]){

          setMatchers.push(cached);
        } else {

          elementMatchers.push(cached);
        };
      };
      // Cache the compiled function
      cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
    };
    return cached;
  };
  function multipleContexts(selector, contexts, results, seed){

    var i = 0,len = contexts.length;
    for(;i < len;i++){

      Sizzle(selector, contexts[i], results, seed);
    };
    return results;
  };
  function select(selector, context, results, seed, xml){

    var i,tokens,token,type,find,match = tokenize(selector),j = match.length;
    if(!seed){

      // Try to minimize operations if there is only one group
      if(match.length === 1){

        // Take a shortcut and set the context if the root selector is an ID
        tokens = match[0] = match[0].slice(0);
        if(tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && !xml && Expr.relative[tokens[1].type]){

          context = Expr.find["ID"](token.matches[0].replace(rbackslash, ""), context, xml)[0];
          if(!context){

            return results;
          };
          selector = selector.slice(tokens.shift().length);
        };
        // Fetch a seed set for right-to-left matching
        for(i = matchExpr["POS"].test(selector) ? -1 : tokens.length - 1;i >= 0;i--){

          token = tokens[i];
          // Abort if we hit a combinator
          if(Expr.relative[(type = token.type)]){

            break;
          };
          if((find = Expr.find[type])){

            // Search, expanding context for leading sibling combinators
            if((seed = find(token.matches[0].replace(rbackslash, ""), rsibling.test(tokens[0].type) && context.parentNode || context, xml))){

              // If seed is empty or no tokens remain, we can return early
              tokens.splice(i, 1);
              selector = seed.length && tokens.join("");
              if(!selector){

                push.apply(results, slice.call(seed, 0));
                return results;
              };
              break;
            };
          };
        };
      };
    };
    // Compile and execute a filtering function
    // Provide `match` to avoid retokenization if we modified the selector above
    compile(selector, match)(seed, context, xml, results, rsibling.test(selector));
    return results;
  };
  if(document.querySelectorAll){

    (function(){

      var disconnectedMatch,oldSelect = select,rescape = /'|\\/g,rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,// qSa(:focus) reports false when true (Chrome 21),
      // A support test would require too much code (would include document ready)
      rbuggyQSA = [":focus"],// matchesSelector(:focus) reports false when true (Chrome 21),
      // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
      // A support test would require too much code (would include document ready)
      // just skip matchesSelector for :active
      rbuggyMatches = [":active", ":focus"],matches = docElem.matchesSelector || docElem.mozMatchesSelector || docElem.webkitMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector;
      // Build QSA regex
      // Regex strategy adopted from Diego Perini
      assert(function(div){

        // Select is set to empty string on purpose
        // This is to test IE's treatment of not explictly
        // setting a boolean content attribute,
        // since its presence should be enough
        // http://bugs.jquery.com/ticket/12359
        div.innerHTML = "<select><option selected=''></option></select>";
        // IE8 - Some boolean attributes are not treated correctly
        if(!div.querySelectorAll("[selected]").length){

          rbuggyQSA.push("\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)");
        };
        // Webkit/Opera - :checked should return selected option elements
        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
        // IE8 throws error here (do not put tests after this one)
        if(!div.querySelectorAll(":checked").length){

          rbuggyQSA.push(":checked");
        };
      });
      assert(function(div){

        // Opera 10-12/IE9 - ^= $= *= and empty values
        // Should not select anything
        div.innerHTML = "<p test=''></p>";
        if(div.querySelectorAll("[test^='']").length){

          rbuggyQSA.push("[*^$]=" + whitespace + "*(?:\"\"|'')");
        };
        // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
        // IE8 throws error here (do not put tests after this one)
        div.innerHTML = "<input type='hidden'/>";
        if(!div.querySelectorAll(":enabled").length){

          rbuggyQSA.push(":enabled", ":disabled");
        };
      });
      // rbuggyQSA always contains :focus, so no need for a length check
      rbuggyQSA = /* rbuggyQSA.length && */      new RegExp(rbuggyQSA.join("|"));
      select = function(selector, context, results, seed, xml){

        // Only use querySelectorAll when not filtering,
        // when this is not xml,
        // and when no QSA bugs apply
        if(!seed && !xml && (!rbuggyQSA || !rbuggyQSA.test(selector))){

          var groups,i,old = true,nid = expando,newContext = context,newSelector = context.nodeType === 9 && selector;
          // qSA works strangely on Element-rooted queries
          // We can work around this by specifying an extra ID on the root
          // and working up from there (Thanks to Andrew Dupont for the technique)
          // IE 8 doesn't work on object elements
          if(context.nodeType === 1 && context.nodeName.toLowerCase() !== "object"){

            groups = tokenize(selector);
            if((old = context.getAttribute("id"))){

              nid = old.replace(rescape, "\\$&");
            } else {

              context.setAttribute("id", nid);
            };
            nid = "[id='" + nid + "'] ";
            i = groups.length;
            while(i--){

              groups[i] = nid + groups[i].join("");
            };
            newContext = rsibling.test(selector) && context.parentNode || context;
            newSelector = groups.join(",");
          };
          if(newSelector){

            try{

              push.apply(results, slice.call(newContext.querySelectorAll(newSelector), 0));
              return results;
            } catch(qsaError) {
            }finally{

              if(!old){

                context.removeAttribute("id");
              };
            };
          };
        };
        return oldSelect(selector, context, results, seed, xml);
      };
      if(matches){

        assert(function(div){

          // Check to see if it's possible to do matchesSelector
          // on a disconnected node (IE 9)
          disconnectedMatch = matches.call(div, "div");
          // This should fail with an exception
          // Gecko does not error, returns false instead
          try{

            matches.call(div, "[test!='']:sizzle");
            rbuggyMatches.push("!=", pseudos);
          } catch(e) {
          };
        });
        // rbuggyMatches always contains :active and :focus, so no need for a length check
        rbuggyMatches = /* rbuggyMatches.length && */        new RegExp(rbuggyMatches.join("|"));
        Sizzle.matchesSelector = function(elem, expr){

          // Make sure that attribute selectors are quoted
          expr = expr.replace(rattributeQuotes, "='$1']");
          // rbuggyMatches always contains :active, so no need for an existence check
          if(!isXML(elem) && !rbuggyMatches.test(expr) && (!rbuggyQSA || !rbuggyQSA.test(expr))){

            try{

              var ret = matches.call(elem, expr);
              // IE 9's matchesSelector returns false on disconnected nodes
              if(ret || disconnectedMatch || // As well, disconnected nodes are said to be in a document
              // fragment in IE 9
              elem.document && elem.document.nodeType !== 11){

                return ret;
              };
            } catch(e) {
            };
          };
          return Sizzle(expr, null, null, [elem]).length > 0;
        };
      };
    })();
  };
  // Deprecated
  Expr.pseudos["nth"] = Expr.pseudos["eq"];
  // Back-compat
  function setFilters(){
  };
  Expr.filters = setFilters.prototype = Expr.pseudos;
  Expr.setFilters = new setFilters();
  // EXPOSE qooxdoo variant
  qx.bom.Selector.query = function(selector, context){

    return Sizzle(selector, context);
  };
  qx.bom.Selector.matches = function(selector, set){

    return Sizzle(selector, null, null, set);
  };
})(window);

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2011-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)
     * Daniel Wagner (danielwagner)

************************************************************************ */
/**
 * CSS/Style property manipulation module
 * @group (Core)
 */
qx.Bootstrap.define("qx.module.Css", {
  statics : {
    /**
     * Modifies the given style property on all elements in the collection.
     *
     * @attach {qxWeb}
     * @param name {String} Name of the style property to modify
     * @param value {var} The value to apply
     * @return {qxWeb} The collection for chaining
     */
    setStyle : function(name, value){

      if(/\w-\w/.test(name)){

        name = qx.lang.String.camelCase(name);
      };
      this._forEachElement(function(item){

        qx.bom.element.Style.set(item, name, value);
      });
      return this;
    },
    /**
     * Returns the value of the given style property for the first item in the
     * collection.
     *
     * @attach {qxWeb}
     * @param name {String} Style property name
     * @return {var} Style property value
     */
    getStyle : function(name){

      if(this[0] && qx.dom.Node.isElement(this[0])){

        if(/\w-\w/.test(name)){

          name = qx.lang.String.camelCase(name);
        };
        return qx.bom.element.Style.get(this[0], name);
      };
      return null;
    },
    /**
     * Sets multiple style properties for each item in the collection.
     *
     * @attach {qxWeb}
     * @param styles {Map} A map of style property name/value pairs
     * @return {qxWeb} The collection for chaining
     */
    setStyles : function(styles){

      for(var name in styles){

        this.setStyle(name, styles[name]);
      };
      return this;
    },
    /**
     * Returns the values of multiple style properties for each item in the
     * collection
     *
     * @attach {qxWeb}
     * @param names {String[]} List of style property names
     * @return {Map} Map of style property name/value pairs
     */
    getStyles : function(names){

      var styles = {
      };
      for(var i = 0;i < names.length;i++){

        styles[names[i]] = this.getStyle(names[i]);
      };
      return styles;
    },
    /**
     * Adds a class name to each element in the collection
     *
     * @attach {qxWeb}
     * @param name {String} Class name
     * @return {qxWeb} The collection for chaining
     */
    addClass : function(name){

      this._forEachElement(function(item){

        qx.bom.element.Class.add(item, name);
      });
      return this;
    },
    /**
     * Adds multiple class names to each element in the collection
     *
     * @attach {qxWeb}
     * @param names {String[]} List of class names to add
     * @return {qxWeb} The collection for chaining
     */
    addClasses : function(names){

      this._forEachElement(function(item){

        qx.bom.element.Class.addClasses(item, names);
      });
      return this;
    },
    /**
     * Removes a class name from each element in the collection
     *
     * @attach {qxWeb}
     * @param name {String} The class name to remove
     * @return {qxWeb} The collection for chaining
     */
    removeClass : function(name){

      this._forEachElement(function(item){

        qx.bom.element.Class.remove(item, name);
      });
      return this;
    },
    /**
     * Removes multiple class names from each element in the collection.
     * Use {@link qx.module.Attribute#removeAttribute} to remove all classes.
     *
     * @attach {qxWeb}
     * @param names {String[]} List of class names to remove
     * @return {qxWeb} The collection for chaining
     */
    removeClasses : function(names){

      this._forEachElement(function(item){

        qx.bom.element.Class.removeClasses(item, names);
      });
      return this;
    },
    /**
     * Checks if the first element in the collection has the given class name
     *
     * @attach {qxWeb}
     * @param name {String} Class name to check for
     * @return {Boolean} <code>true</code> if the first item has the given class name
     */
    hasClass : function(name){

      if(!this[0] || !qx.dom.Node.isElement(this[0])){

        return false;
      };
      return qx.bom.element.Class.has(this[0], name);
    },
    /**
     * Returns the class name of the first element in the collection
     *
     * @attach {qxWeb}
     * @return {String} Class name
     */
    getClass : function(){

      if(!this[0] || !qx.dom.Node.isElement(this[0])){

        return "";
      };
      return qx.bom.element.Class.get(this[0]);
    },
    /**
     * Toggles the given class name on each item in the collection
     *
     * @attach {qxWeb}
     * @param name {String} Class name
     * @return {qxWeb} The collection for chaining
     */
    toggleClass : function(name){

      var bCls = qx.bom.element.Class;
      this._forEachElement(function(item){

        bCls.has(item, name) ? bCls.remove(item, name) : bCls.add(item, name);
      });
      return this;
    },
    /**
     * Toggles the given list of class names on each item in the collection
     *
     * @attach {qxWeb}
     * @param names {String[]} Class names
     * @return {qxWeb} The collection for chaining
     */
    toggleClasses : function(names){

      for(var i = 0,l = names.length;i < l;i++){

        this.toggleClass(names[i]);
      };
      return this;
    },
    /**
     * Replaces a class name on each element in the collection
     *
     * @attach {qxWeb}
     * @param oldName {String} Class name to remove
     * @param newName {String} Class name to add
     * @return {qxWeb} The collection for chaining
     */
    replaceClass : function(oldName, newName){

      this._forEachElement(function(item){

        qx.bom.element.Class.replace(item, oldName, newName);
      });
      return this;
    },
    /**
     * Returns the rendered height of the first element in the collection.
     * @attach {qxWeb}
     * @param force {Boolean?false} When true also get the height of a <em>non displayed</em> element
     * @return {Number} The first item's rendered height
     */
    getHeight : function(force){

      var elem = this[0];
      if(elem){

        if(qx.dom.Node.isElement(elem)){

          var elementHeight;
          if(force){

            var stylesToSwap = {
              display : "block",
              position : "absolute",
              visibility : "hidden"
            };
            elementHeight = qx.module.Css.__swap(elem, stylesToSwap, qx.module.Css.getHeight, this);
          } else {

            elementHeight = qx.bom.element.Dimension.getHeight(elem);
          };
          return elementHeight;
        } else if(qx.dom.Node.isDocument(elem)){

          return qx.bom.Document.getHeight(qx.dom.Node.getWindow(elem));
        } else if(qx.dom.Node.isWindow(elem)){

          return qx.bom.Viewport.getHeight(elem);
        };;
      };
      return null;
    },
    /**
     * Returns the rendered width of the first element in the collection
     * @attach {qxWeb}
     * @param force {Boolean?false} When true also get the width of a <em>non displayed</em> element
     * @return {Number} The first item's rendered width
     */
    getWidth : function(force){

      var elem = this[0];
      if(elem){

        if(qx.dom.Node.isElement(elem)){

          var elementWidth;
          if(force){

            var stylesToSwap = {
              display : "block",
              position : "absolute",
              visibility : "hidden"
            };
            elementWidth = qx.module.Css.__swap(elem, stylesToSwap, qx.module.Css.getWidth, this);
          } else {

            elementWidth = qx.bom.element.Dimension.getWidth(elem);
          };
          return elementWidth;
        } else if(qx.dom.Node.isDocument(elem)){

          return qx.bom.Document.getWidth(qx.dom.Node.getWindow(elem));
        } else if(qx.dom.Node.isWindow(elem)){

          return qx.bom.Viewport.getWidth(elem);
        };;
      };
      return null;
    },
    /**
     * Returns the computed location of the given element in the context of the
     * document dimensions.
     *
     * Supported modes:
     *
     * * <code>margin</code>: Calculate from the margin box of the element (bigger than the visual appearance: including margins of given element)
     * * <code>box</code>: Calculates the offset box of the element (default, uses the same size as visible)
     * * <code>border</code>: Calculate the border box (useful to align to border edges of two elements).
     * * <code>scroll</code>: Calculate the scroll box (relevant for absolute positioned content).
     * * <code>padding</code>: Calculate the padding box (relevant for static/relative positioned content).
     *
     * @attach {qxWeb}
     * @param mode {String?box} A supported option. See comment above.
     * @return {Map} A map with the keys <code>left</code>, <code>top</code>,
     * <code>right</code> and <code>bottom</code> which contains the distance
     * of the element relative to the document.
     */
    getOffset : function(mode){

      var elem = this[0];
      if(elem && qx.dom.Node.isElement(elem)){

        return qx.bom.element.Location.get(elem, mode);
      };
      return null;
    },
    /**
     * Returns the content height of the first element in the collection.
     * This is the maximum height the element can use, excluding borders,
     * margins, padding or scroll bars.
     * @attach {qxWeb}
     * @param force {Boolean?false} When true also get the content height of a <em>non displayed</em> element
     * @return {Number} Computed content height
     */
    getContentHeight : function(force){

      var obj = this[0];
      if(qx.dom.Node.isElement(obj)){

        var contentHeight;
        if(force){

          var stylesToSwap = {
            position : "absolute",
            visibility : "hidden",
            display : "block"
          };
          contentHeight = qx.module.Css.__swap(obj, stylesToSwap, qx.module.Css.getContentHeight, this);
        } else {

          contentHeight = qx.bom.element.Dimension.getContentHeight(obj);
        };
        return contentHeight;
      };
      return null;
    },
    /**
     * Returns the content width of the first element in the collection.
     * This is the maximum width the element can use, excluding borders,
     * margins, padding or scroll bars.
     * @attach {qxWeb}
     * @param force {Boolean?false} When true also get the content width of a <em>non displayed</em> element
     * @return {Number} Computed content width
     */
    getContentWidth : function(force){

      var obj = this[0];
      if(qx.dom.Node.isElement(obj)){

        var contentWidth;
        if(force){

          var stylesToSwap = {
            position : "absolute",
            visibility : "hidden",
            display : "block"
          };
          contentWidth = qx.module.Css.__swap(obj, stylesToSwap, qx.module.Css.getContentWidth, this);
        } else {

          contentWidth = qx.bom.element.Dimension.getContentWidth(obj);
        };
        return contentWidth;
      };
      return null;
    },
    /**
     * Returns the distance between the first element in the collection and its
     * offset parent
     *
     * @attach {qxWeb}
     * @return {Map} a map with the keys <code>left</code> and <code>top</code>
     * containing the distance between the elements
     */
    getPosition : function(){

      var obj = this[0];
      if(qx.dom.Node.isElement(obj)){

        return qx.bom.element.Location.getPosition(obj);
      };
      return null;
    },
    /**
     * Includes a Stylesheet file
     *
     * @attachStatic {qxWeb}
     * @param uri {String} The stylesheet's URI
     * @param doc {Document?} Document to modify
     */
    includeStylesheet : function(uri, doc){

      qx.bom.Stylesheet.includeFile(uri, doc);
    },
    /**
     * Hides all elements in the collection by setting their "display"
     * style to "none". The previous value is stored so it can be re-applied
     * when {@link #show} is called.
     *
     * @attach {qxWeb}
     * @return {qxWeb} The collection for chaining
     */
    hide : function(){

      this._forEachElementWrapped(function(item){

        var prevStyle = item.getStyle("display");
        if(prevStyle !== "none"){

          item[0].$$qPrevDisp = prevStyle;
          item.setStyle("display", "none");
        };
      });
      return this;
    },
    /**
     * Shows any elements with "display: none" in the collection. If an element
     * was hidden by using the {@link #hide} method, its previous
     * "display" style value will be re-applied. Otherwise, the
     * default "display" value for the element type will be applied.
     *
     * @attach {qxWeb}
     * @return {qxWeb} The collection for chaining
     */
    show : function(){

      this._forEachElementWrapped(function(item){

        var currentVal = item.getStyle("display");
        var prevVal = item[0].$$qPrevDisp;
        var newVal;
        if(currentVal == "none"){

          if(prevVal && prevVal != "none"){

            newVal = prevVal;
          } else {

            var doc = qxWeb.getDocument(item[0]);
            newVal = qx.module.Css.__getDisplayDefault(item[0].tagName, doc);
          };
          item.setStyle("display", newVal);
          item[0].$$qPrevDisp = "none";
        };
      });
      return this;
    },
    /**
     * Maps HTML elements to their default "display" style values.
     */
    __displayDefaults : {
    },
    /**
     * Attempts tp determine the default "display" style value for
     * elements with the given tag name.
     *
     * @param tagName {String} Tag name
     * @param  doc {Document?} Document element. Default: The current document
     * @return {String} The default "display" value, e.g. <code>inline</code>
     * or <code>block</code>
     */
    __getDisplayDefault : function(tagName, doc){

      var defaults = qx.module.Css.__displayDefaults;
      if(!defaults[tagName]){

        var docu = doc || document;
        var tempEl = qxWeb(docu.createElement(tagName)).appendTo(doc.body);
        defaults[tagName] = tempEl.getStyle("display");
        tempEl.remove();
      };
      return defaults[tagName] || "";
    },
    /**
     * Swaps the given styles of the element and execute the callback
     * before the original values are restored.
     *
     * Finally returns the return value of the callback.
     *
     * @param element {Element} the DOM element to operate on
     * @param styles {Map} the styles to swap
     * @param callback {Function} the callback function
     * @param context {Object} the context in which the callback should be called
     * @return {Object} the return value of the callback
     */
    __swap : function(element, styles, callback, context){

      // get the current values
      var currentValues = {
      };
      for(var styleProperty in styles){

        currentValues[styleProperty] = element.style[styleProperty];
        element.style[styleProperty] = styles[styleProperty];
      };
      var value = callback.call(context);
      for(var styleProperty in currentValues){

        element.style[styleProperty] = currentValues[styleProperty];
      };
      return value;
    }
  },
  defer : function(statics){

    qxWeb.$attach({
      "setStyle" : statics.setStyle,
      "getStyle" : statics.getStyle,
      "setStyles" : statics.setStyles,
      "getStyles" : statics.getStyles,
      "addClass" : statics.addClass,
      "addClasses" : statics.addClasses,
      "removeClass" : statics.removeClass,
      "removeClasses" : statics.removeClasses,
      "hasClass" : statics.hasClass,
      "getClass" : statics.getClass,
      "toggleClass" : statics.toggleClass,
      "toggleClasses" : statics.toggleClasses,
      "replaceClass" : statics.replaceClass,
      "getHeight" : statics.getHeight,
      "getWidth" : statics.getWidth,
      "getOffset" : statics.getOffset,
      "getContentHeight" : statics.getContentHeight,
      "getContentWidth" : statics.getContentWidth,
      "getPosition" : statics.getPosition,
      "hide" : statics.hide,
      "show" : statics.show
    });
    qxWeb.$attachStatic({
      "includeStylesheet" : statics.includeStylesheet
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

************************************************************************ */
/**
 * Contains methods to control and query the element's box-sizing property.
 *
 * Supported values:
 *
 * * "content-box" = W3C model (dimensions are content specific)
 * * "border-box" = Microsoft model (dimensions are box specific incl. border and padding)
 */
qx.Bootstrap.define("qx.bom.element.BoxSizing", {
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    /** @type {Map} Internal data structure for __usesNativeBorderBox() */
    __nativeBorderBox : {
      tags : {
        button : true,
        select : true
      },
      types : {
        search : true,
        button : true,
        submit : true,
        reset : true,
        checkbox : true,
        radio : true
      }
    },
    /**
     * Whether the given elements defaults to the "border-box" Microsoft model in all cases.
     *
     * @param element {Element} DOM element to query
     * @return {Boolean} true when the element uses "border-box" independently from the doctype
     */
    __usesNativeBorderBox : function(element){

      var map = this.__nativeBorderBox;
      return map.tags[element.tagName.toLowerCase()] || map.types[element.type];
    },
    /**
     * Compiles the given box sizing into a CSS compatible string.
     *
     * @param value {String} Valid CSS box-sizing value
     * @return {String} CSS string
     */
    compile : function(value){

      if(qx.core.Environment.get("css.boxsizing")){

        var prop = qx.bom.Style.getCssName(qx.core.Environment.get("css.boxsizing"));
        return prop + ":" + value + ";";
      } else {

        if(qx.core.Environment.get("qx.debug")){

          qx.log.Logger.warn(this, "This client does not support dynamic modification of the boxSizing property.");
          qx.log.Logger.trace();
        };
      };
    },
    /**
     * Returns the box sizing for the given element.
     *
     * @param element {Element} The element to query
     * @return {String} Box sizing value of the given element.
     */
    get : function(element){

      if(qx.core.Environment.get("css.boxsizing")){

        return qx.bom.element.Style.get(element, "boxSizing", null, false) || "";
      };
      if(qx.bom.Document.isStandardMode(qx.dom.Node.getWindow(element))){

        if(!this.__usesNativeBorderBox(element)){

          return "content-box";
        };
      };
      return "border-box";
    },
    /**
     * Applies a new box sizing to the given element
     *
     * @param element {Element} The element to modify
     * @param value {String} New box sizing value to set
     */
    set : function(element, value){

      if(qx.core.Environment.get("css.boxsizing")){

        // IE8 bombs when trying to apply an unsupported value
        try{

          element.style[qx.core.Environment.get("css.boxsizing")] = value;
        } catch(ex) {

          if(qx.core.Environment.get("qx.debug")){

            qx.log.Logger.warn(this, "This client does not support the boxSizing value", value);
          };
        };
      } else {

        if(qx.core.Environment.get("qx.debug")){

          qx.log.Logger.warn(this, "This client does not support dynamic modification of the boxSizing property.");
        };
      };
    },
    /**
     * Removes the local box sizing applied to the element
     *
     * @param element {Element} The element to modify
     */
    reset : function(element){

      this.set(element, "");
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

************************************************************************ */
/**
 * Contains methods to control and query the element's cursor property
 */
qx.Bootstrap.define("qx.bom.element.Cursor", {
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    /** Internal helper structure to map cursor values to supported ones */
    __map : {
    },
    /**
     * Compiles the given cursor into a CSS compatible string.
     *
     * @param cursor {String} Valid CSS cursor name
     * @return {String} CSS string
     */
    compile : function(cursor){

      return "cursor:" + (this.__map[cursor] || cursor) + ";";
    },
    /**
     * Returns the computed cursor style for the given element.
     *
     * @param element {Element} The element to query
     * @param mode {Number} Choose one of the modes {@link qx.bom.element.Style#COMPUTED_MODE},
     *   {@link qx.bom.element.Style#CASCADED_MODE}, {@link qx.bom.element.Style#LOCAL_MODE}.
     *   The computed mode is the default one.
     * @return {String} Computed cursor value of the given element.
     */
    get : function(element, mode){

      return qx.bom.element.Style.get(element, "cursor", mode, false);
    },
    /**
     * Applies a new cursor style to the given element
     *
     * @param element {Element} The element to modify
     * @param value {String} New cursor value to set
     */
    set : function(element, value){

      element.style.cursor = this.__map[value] || value;
    },
    /**
     * Removes the local cursor style applied to the element
     *
     * @param element {Element} The element to modify
     */
    reset : function(element){

      element.style.cursor = "";
    }
  },
  defer : function(statics){

    // < IE 9
    if(qx.core.Environment.get("engine.name") == "mshtml" && ((parseFloat(qx.core.Environment.get("engine.version")) < 9 || qx.core.Environment.get("browser.documentmode") < 9) && !qx.core.Environment.get("browser.quirksmode"))){

      statics.__map["nesw-resize"] = "ne-resize";
      statics.__map["nwse-resize"] = "nw-resize";
      // < IE 8
      if(((parseFloat(qx.core.Environment.get("engine.version")) < 8 || qx.core.Environment.get("browser.documentmode") < 8) && !qx.core.Environment.get("browser.quirksmode"))){

        statics.__map["ew-resize"] = "e-resize";
        statics.__map["ns-resize"] = "n-resize";
      };
    } else if(qx.core.Environment.get("engine.name") == "opera" && parseInt(qx.core.Environment.get("engine.version")) < 12){

      statics.__map["nesw-resize"] = "ne-resize";
      statics.__map["nwse-resize"] = "nw-resize";
    };
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Christian Hagendorn (chris_schmidt)

   ======================================================================

   This class contains code based on the following work:

   * Prototype JS
     http://www.prototypejs.org/
     Version 1.5

     Copyright:
       (c) 2006-2007, Prototype Core Team

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

     Authors:
       * Prototype Core Team

   ----------------------------------------------------------------------

     Copyright (c) 2005-2008 Sam Stephenson

     Permission is hereby granted, free of charge, to any person
     obtaining a copy of this software and associated documentation
     files (the "Software"), to deal in the Software without restriction,
     including without limitation the rights to use, copy, modify, merge,
     publish, distribute, sublicense, and/or sell copies of the Software,
     and to permit persons to whom the Software is furnished to do so,
     subject to the following conditions:

     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
     MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
     HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
     WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
     DEALINGS IN THE SOFTWARE.

************************************************************************ */
/**
 * Cross-browser opacity support.
 *
 * Optimized for animations (contains workarounds for typical flickering
 * in some browsers). Reduced class dependencies for optimal size and
 * performance.
 */
qx.Bootstrap.define("qx.bom.element.Opacity", {
  statics : {
    /**
     * Compiles the given opacity value into a cross-browser CSS string.
     * Accepts numbers between zero and one
     * where "0" means transparent, "1" means opaque.
     *
     * @signature function(opacity)
     * @param opacity {Float} A float number between 0 and 1
     * @return {String} CSS compatible string
     */
    compile : qx.core.Environment.select("engine.name", {
      "mshtml" : function(opacity){

        if(opacity >= 1){

          opacity = 1;
        };
        if(opacity < 0.00001){

          opacity = 0;
        };
        if(qx.core.Environment.get("css.opacity")){

          return "opacity:" + opacity + ";";
        } else {

          return "zoom:1;filter:alpha(opacity=" + (opacity * 100) + ");";
        };
      },
      "default" : function(opacity){

        if(opacity >= 1){

          return "";
        };
        return "opacity:" + opacity + ";";
      }
    }),
    /**
     * Sets opacity of given element. Accepts numbers between zero and one
     * where "0" means transparent, "1" means opaque.
     *
     * @param element {Element} DOM element to modify
     * @param opacity {Float} A float number between 0 and 1
     * @signature function(element, opacity)
     */
    set : qx.core.Environment.select("engine.name", {
      "mshtml" : function(element, opacity){

        if(qx.core.Environment.get("css.opacity")){

          if(opacity >= 1){

            opacity = "";
          };
          element.style.opacity = opacity;
        } else {

          // Read in computed filter
          var filter = qx.bom.element.Style.get(element, "filter", qx.bom.element.Style.COMPUTED_MODE, false);
          if(opacity >= 1){

            opacity = 1;
          };
          if(opacity < 0.00001){

            opacity = 0;
          };
          // IE has trouble with opacity if it does not have layout (hasLayout)
          // Force it by setting the zoom level
          if(!element.currentStyle || !element.currentStyle.hasLayout){

            element.style.zoom = 1;
          };
          // Remove old alpha filter and add new one
          element.style.filter = filter.replace(/alpha\([^\)]*\)/gi, "") + "alpha(opacity=" + opacity * 100 + ")";
        };
      },
      "default" : function(element, opacity){

        if(opacity >= 1){

          opacity = "";
        };
        element.style.opacity = opacity;
      }
    }),
    /**
     * Resets opacity of given element.
     *
     * @param element {Element} DOM element to modify
     * @signature function(element)
     */
    reset : qx.core.Environment.select("engine.name", {
      "mshtml" : function(element){

        if(qx.core.Environment.get("css.opacity")){

          element.style.opacity = "";
        } else {

          // Read in computed filter
          var filter = qx.bom.element.Style.get(element, "filter", qx.bom.element.Style.COMPUTED_MODE, false);
          // Remove old alpha filter
          element.style.filter = filter.replace(/alpha\([^\)]*\)/gi, "");
        };
      },
      "default" : function(element){

        element.style.opacity = "";
      }
    }),
    /**
     * Gets computed opacity of given element. Accepts numbers between zero and one
     * where "0" means transparent, "1" means opaque.
     *
     * @param element {Element} DOM element to modify
     * @param mode {Number} Choose one of the modes {@link qx.bom.element.Style#COMPUTED_MODE},
     *   {@link qx.bom.element.Style#CASCADED_MODE}, {@link qx.bom.element.Style#LOCAL_MODE}.
     *   The computed mode is the default one.
     * @return {Float} A float number between 0 and 1
     * @signature function(element, mode)
     */
    get : qx.core.Environment.select("engine.name", {
      "mshtml" : function(element, mode){

        if(qx.core.Environment.get("css.opacity")){

          var opacity = qx.bom.element.Style.get(element, "opacity", mode, false);
          if(opacity != null){

            return parseFloat(opacity);
          };
          return 1.0;
        } else {

          var filter = qx.bom.element.Style.get(element, "filter", mode, false);
          if(filter){

            var opacity = filter.match(/alpha\(opacity=(.*)\)/);
            if(opacity && opacity[1]){

              return parseFloat(opacity[1]) / 100;
            };
          };
          return 1.0;
        };
      },
      "default" : function(element, mode){

        var opacity = qx.bom.element.Style.get(element, "opacity", mode, false);
        if(opacity != null){

          return parseFloat(opacity);
        };
        return 1.0;
      }
    })
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

************************************************************************ */
/**
 * Contains methods to control and query the element's clip property
 *
 * @require(qx.lang.normalize.String)
 */
qx.Bootstrap.define("qx.bom.element.Clip", {
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    /**
     * Compiles the given clipping into a CSS compatible string. This
     * is a simple square which describes the visible area of an DOM element.
     * Changing the clipping does not change the dimensions of
     * an element.
     *
     * @param map {Map}  Map which contains <code>left</code>, <code>top</code>
     *   <code>width</code> and <code>height</code> of the clipped area.
     * @return {String} CSS compatible string
     */
    compile : function(map){

      if(!map){

        return "clip:auto;";
      };
      var left = map.left;
      var top = map.top;
      var width = map.width;
      var height = map.height;
      var right,bottom;
      if(left == null){

        right = (width == null ? "auto" : width + "px");
        left = "auto";
      } else {

        right = (width == null ? "auto" : left + width + "px");
        left = left + "px";
      };
      if(top == null){

        bottom = (height == null ? "auto" : height + "px");
        top = "auto";
      } else {

        bottom = (height == null ? "auto" : top + height + "px");
        top = top + "px";
      };
      return "clip:rect(" + top + "," + right + "," + bottom + "," + left + ");";
    },
    /**
     * Gets the clipping of the given element.
     *
     * @param element {Element} DOM element to query
     * @param mode {Number} Choose one of the modes {@link qx.bom.element.Style#COMPUTED_MODE},
     *   {@link qx.bom.element.Style#CASCADED_MODE}, {@link qx.bom.element.Style#LOCAL_MODE}.
     *   The computed mode is the default one.
     * @return {Map} Map which contains <code>left</code>, <code>top</code>
     *   <code>width</code> and <code>height</code> of the clipped area.
     *   Each one could be null or any integer value.
     */
    get : function(element, mode){

      var clip = qx.bom.element.Style.get(element, "clip", mode, false);
      var left,top,width,height;
      var right,bottom;
      if(typeof clip === "string" && clip !== "auto" && clip !== ""){

        clip = clip.trim();
        // Do not use "global" here. This will break Firefox because of
        // an issue that the lastIndex will not be resetted on separate calls.
        if(/\((.*)\)/.test(clip)){

          var result = RegExp.$1;
          // Process result
          // Some browsers store values space-separated, others comma-separated.
          // Handle both cases by means of feature-detection.
          if(/,/.test(result)){

            var split = result.split(",");
          } else {

            var split = result.split(" ");
          };
          top = split[0].trim();
          right = split[1].trim();
          bottom = split[2].trim();
          left = split[3].trim();
          // Normalize "auto" to null
          if(left === "auto"){

            left = null;
          };
          if(top === "auto"){

            top = null;
          };
          if(right === "auto"){

            right = null;
          };
          if(bottom === "auto"){

            bottom = null;
          };
          // Convert to integer values
          if(top != null){

            top = parseInt(top, 10);
          };
          if(right != null){

            right = parseInt(right, 10);
          };
          if(bottom != null){

            bottom = parseInt(bottom, 10);
          };
          if(left != null){

            left = parseInt(left, 10);
          };
          // Compute width and height
          if(right != null && left != null){

            width = right - left;
          } else if(right != null){

            width = right;
          };
          if(bottom != null && top != null){

            height = bottom - top;
          } else if(bottom != null){

            height = bottom;
          };
        } else {

          throw new Error("Could not parse clip string: " + clip);
        };
      };
      // Return map when any value is available.
      return {
        left : left || null,
        top : top || null,
        width : width || null,
        height : height || null
      };
    },
    /**
     * Sets the clipping of the given element. This is a simple
     * square which describes the visible area of an DOM element.
     * Changing the clipping does not change the dimensions of
     * an element.
     *
     * @param element {Element} DOM element to modify
     * @param map {Map} A map with one or more of these available keys:
     *   <code>left</code>, <code>top</code>, <code>width</code>, <code>height</code>.
     */
    set : function(element, map){

      if(!map){

        element.style.clip = "rect(auto,auto,auto,auto)";
        return;
      };
      var left = map.left;
      var top = map.top;
      var width = map.width;
      var height = map.height;
      var right,bottom;
      if(left == null){

        right = (width == null ? "auto" : width + "px");
        left = "auto";
      } else {

        right = (width == null ? "auto" : left + width + "px");
        left = left + "px";
      };
      if(top == null){

        bottom = (height == null ? "auto" : height + "px");
        top = "auto";
      } else {

        bottom = (height == null ? "auto" : top + height + "px");
        top = top + "px";
      };
      element.style.clip = "rect(" + top + "," + right + "," + bottom + "," + left + ")";
    },
    /**
     * Resets the clipping of the given DOM element.
     *
     * @param element {Element} DOM element to modify
     */
    reset : function(element){

      element.style.clip = "rect(auto, auto, auto, auto)";
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

************************************************************************ */
/**
 * Helper functions to handle Object as a Hash map.
 *
 * @require(qx.lang.normalize.Object)
 * @ignore(qx.core.Assert)
 */
qx.Bootstrap.define("qx.lang.Object", {
  statics : {
    /**
     * Check if the hash has any keys
     *
     * @signature function(map)
     * @param map {Object} the map to check
     * @return {Boolean} whether the map has any keys
     * @lint ignoreUnused(key)
     */
    isEmpty : function(map){

      if(qx.core.Environment.get("qx.debug")){

        qx.core.Assert && qx.core.Assert.assertMap(map, "Invalid argument 'map'");
      };
      for(var key in map){

        return false;
      };
      return true;
    },
    /**
     * Get the values of a map as array
     *
     * @param map {Object} the map
     * @return {Array} array of the values of the map
     */
    getValues : function(map){

      if(qx.core.Environment.get("qx.debug")){

        qx.core.Assert && qx.core.Assert.assertMap(map, "Invalid argument 'map'");
      };
      var arr = [];
      var keys = Object.keys(map);
      for(var i = 0,l = keys.length;i < l;i++){

        arr.push(map[keys[i]]);
      };
      return arr;
    },
    /**
     * Return a copy of an Object
     *
     * @param source {Object} Object to copy
     * @param deep {Boolean} If the clone should be a deep clone.
     * @return {Object} A copy of the object
     */
    clone : function(source, deep){

      if(qx.lang.Type.isObject(source)){

        var clone = {
        };
        for(var key in source){

          if(deep){

            clone[key] = qx.lang.Object.clone(source[key], deep);
          } else {

            clone[key] = source[key];
          };
        };
        return clone;
      } else if(qx.lang.Type.isArray(source)){

        var clone = [];
        for(var i = 0;i < source.length;i++){

          if(deep){

            clone[i] = qx.lang.Object.clone(source[i]);
          } else {

            clone[i] = source[i];
          };
        };
        return clone;
      };
      return source;
    },
    /**
     * Inverts a map by exchanging the keys with the values.
     *
     * If the map has the same values for different keys, information will get lost.
     * The values will be converted to strings using the toString methods.
     *
     * @param map {Object} Map to invert
     * @return {Object} inverted Map
     */
    invert : function(map){

      if(qx.core.Environment.get("qx.debug")){

        qx.core.Assert && qx.core.Assert.assertMap(map, "Invalid argument 'map'");
      };
      var result = {
      };
      for(var key in map){

        result[map[key].toString()] = key;
      };
      return result;
    },
    /**
     * Get the key of the given value from a map.
     * If the map has more than one key matching the value, the first match is returned.
     * If the map does not contain the value, <code>null</code> is returned.
     *
     * @param map {Object} Map to search for the key
     * @param value {var} Value to look for
     * @return {String|null} Name of the key (null if not found).
     */
    getKeyFromValue : function(map, value){

      if(qx.core.Environment.get("qx.debug")){

        qx.core.Assert && qx.core.Assert.assertMap(map, "Invalid argument 'map'");
      };
      for(var key in map){

        if(map.hasOwnProperty(key) && map[key] === value){

          return key;
        };
      };
      return null;
    },
    /**
     * Whether the map contains the given value.
     *
     * @param map {Object} Map to search for the value
     * @param value {var} Value to look for
     * @return {Boolean} Whether the value was found in the map.
     */
    contains : function(map, value){

      if(qx.core.Environment.get("qx.debug")){

        qx.core.Assert && qx.core.Assert.assertMap(map, "Invalid argument 'map'");
      };
      return this.getKeyFromValue(map, value) !== null;
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */
/**
 * The purpose of this class is to contain all checks about css.
 *
 * This class is used by {@link qx.core.Environment} and should not be used
 * directly. Please check its class comment for details how to use it.
 *
 * @internal
 * @ignore(WebKitCSSMatrix)
 */
qx.Bootstrap.define("qx.bom.client.Css", {
  statics : {
    __WEBKIT_LEGACY_GRADIENT : null,
    /**
     * Checks what box model is used in the current environemnt.
     * @return {String} It either returns "content" or "border".
     * @internal
     */
    getBoxModel : function(){

      var content = qx.bom.client.Engine.getName() !== "mshtml" || !qx.bom.client.Browser.getQuirksMode();
      return content ? "content" : "border";
    },
    /**
     * Returns the (possibly vendor-prefixed) name the browser uses for the
     * <code>textOverflow</code> style property.
     *
     * @return {String|null} textOverflow property name or <code>null</code> if
     * textOverflow is not supported.
     * @internal
     */
    getTextOverflow : function(){

      return qx.bom.Style.getPropertyName("textOverflow");
    },
    /**
     * Checks if a placeholder could be used.
     * @return {Boolean} <code>true</code>, if it could be used.
     * @internal
     */
    getPlaceholder : function(){

      var i = document.createElement("input");
      return "placeholder" in i;
    },
    /**
     * Returns the (possibly vendor-prefixed) name the browser uses for the
     * <code>appearance</code> style property.
     *
     * @return {String|null} appearance property name or <code>null</code> if
     * appearance is not supported.
     * @internal
     */
    getAppearance : function(){

      return qx.bom.Style.getPropertyName("appearance");
    },
    /**
     * Returns the (possibly vendor-prefixed) name the browser uses for the
     * <code>borderRadius</code> style property.
     *
     * @return {String|null} borderRadius property name or <code>null</code> if
     * borderRadius is not supported.
     * @internal
     */
    getBorderRadius : function(){

      return qx.bom.Style.getPropertyName("borderRadius");
    },
    /**
     * Returns the (possibly vendor-prefixed) name the browser uses for the
     * <code>boxShadow</code> style property.
     *
     * @return {String|null} boxShadow property name or <code>null</code> if
     * boxShadow is not supported.
     * @internal
     */
    getBoxShadow : function(){

      return qx.bom.Style.getPropertyName("boxShadow");
    },
    /**
     * Returns the (possibly vendor-prefixed) name the browser uses for the
     * <code>borderImage</code> style property.
     *
     * @return {String|null} borderImage property name or <code>null</code> if
     * borderImage is not supported.
     * @internal
     */
    getBorderImage : function(){

      return qx.bom.Style.getPropertyName("borderImage");
    },
    /**
     * Returns the type of syntax this client supports for its CSS border-image
     * implementation. Some browsers do not support the "fill" keyword defined
     * in the W3C draft (http://www.w3.org/TR/css3-background/) and will not
     * show the border image if it's set. Others follow the standard closely and
     * will omit the center image if "fill" is not set.
     *
     * @return {Boolean|null} <code>true</code> if the standard syntax is supported.
     * <code>null</code> if the supported syntax could not be detected.
     * @internal
     */
    getBorderImageSyntax : function(){

      var styleName = qx.bom.client.Css.getBorderImage();
      if(!styleName){

        return null;
      };
      var el = document.createElement("div");
      if(styleName === "borderImage"){

        // unprefixed implementation: check individual properties
        el.style[styleName] = 'url("foo.png") 4 4 4 4 fill stretch';
        if(el.style.borderImageSource.indexOf("foo.png") >= 0 && el.style.borderImageSlice.indexOf("4 fill") >= 0 && el.style.borderImageRepeat.indexOf("stretch") >= 0){

          return true;
        };
      } else {

        // prefixed implementation, assume no support for "fill"
        el.style[styleName] = 'url("foo.png") 4 4 4 4 stretch';
        // serialized value is unreliable, so just a simple check
        if(el.style[styleName].indexOf("foo.png") >= 0){

          return false;
        };
      };
      // unable to determine syntax
      return null;
    },
    /**
     * Returns the (possibly vendor-prefixed) name the browser uses for the
     * <code>userSelect</code> style property.
     *
     * @return {String|null} userSelect property name or <code>null</code> if
     * userSelect is not supported.
     * @internal
     */
    getUserSelect : function(){

      return qx.bom.Style.getPropertyName("userSelect");
    },
    /**
     * Returns the (possibly vendor-prefixed) value for the
     * <code>userSelect</code> style property that disables selection. For Gecko,
     * "-moz-none" is returned since "none" only makes the target element appear
     * as if its text could not be selected
     *
     * @internal
     * @return {String|null} the userSelect property value that disables
     * selection or <code>null</code> if userSelect is not supported
     */
    getUserSelectNone : function(){

      var styleProperty = qx.bom.client.Css.getUserSelect();
      if(styleProperty){

        var el = document.createElement("span");
        el.style[styleProperty] = "-moz-none";
        return el.style[styleProperty] === "-moz-none" ? "-moz-none" : "none";
      };
      return null;
    },
    /**
     * Returns the (possibly vendor-prefixed) name the browser uses for the
     * <code>userModify</code> style property.
     *
     * @return {String|null} userModify property name or <code>null</code> if
     * userModify is not supported.
     * @internal
     */
    getUserModify : function(){

      return qx.bom.Style.getPropertyName("userModify");
    },
    /**
     * Returns the vendor-specific name of the <code>float</code> style property
     *
     * @return {String|null} <code>cssFloat</code> for standards-compliant
     * browsers, <code>styleFloat</code> for legacy IEs, <code>null</code> if
     * the client supports neither property.
     * @internal
     */
    getFloat : function(){

      var style = document.documentElement.style;
      return style.cssFloat !== undefined ? "cssFloat" : style.styleFloat !== undefined ? "styleFloat" : null;
    },
    /**
     * Returns the (possibly vendor-prefixed) name this client uses for
     * <code>linear-gradient</code>.
     * http://dev.w3.org/csswg/css3-images/#linear-gradients
     *
     * @return {String|null} Prefixed linear-gradient name or <code>null</code>
     * if linear gradients are not supported
     * @internal
     */
    getLinearGradient : function(){

      qx.bom.client.Css.__WEBKIT_LEGACY_GRADIENT = false;
      var value = "linear-gradient(0deg, #fff, #000)";
      var el = document.createElement("div");
      var style = qx.bom.Style.getAppliedStyle(el, "backgroundImage", value);
      if(!style){

        //try old WebKit syntax (versions 528 - 534.16)
        value = "-webkit-gradient(linear,0% 0%,100% 100%,from(white), to(red))";
        var style = qx.bom.Style.getAppliedStyle(el, "backgroundImage", value, false);
        if(style){

          qx.bom.client.Css.__WEBKIT_LEGACY_GRADIENT = true;
        };
      };
      // not supported
      if(!style){

        return null;
      };
      var match = /(.*?)\(/.exec(style);
      return match ? match[1] : null;
    },
    /**
     * Returns <code>true</code> if the browser supports setting gradients
     * using the filter style. This usually only applies for IE browsers
     * starting from IE5.5.
     * http://msdn.microsoft.com/en-us/library/ms532997(v=vs.85).aspx
     *
     * @return {Boolean} <code>true</code> if supported.
     * @internal
     */
    getFilterGradient : function(){

      return qx.bom.client.Css.__isFilterSupported("DXImageTransform.Microsoft.Gradient", "startColorStr=#550000FF, endColorStr=#55FFFF00");
    },
    /**
     * Returns the (possibly vendor-prefixed) name this client uses for
     * <code>radial-gradient</code>.
     *
     * @return {String|null} Prefixed radial-gradient name or <code>null</code>
     * if radial gradients are not supported
     * @internal
     */
    getRadialGradient : function(){

      var value = "radial-gradient(0px 0px, cover, red 50%, blue 100%)";
      var el = document.createElement("div");
      var style = qx.bom.Style.getAppliedStyle(el, "backgroundImage", value);
      if(!style){

        return null;
      };
      var match = /(.*?)\(/.exec(style);
      return match ? match[1] : null;
    },
    /**
     * Checks if **only** the old WebKit (version < 534.16) syntax for
     * linear gradients is supported, e.g.
     * <code>linear-gradient(0deg, #fff, #000)</code>
     *
     * @return {Boolean} <code>true</code> if the legacy syntax must be used
     * @internal
     */
    getLegacyWebkitGradient : function(){

      if(qx.bom.client.Css.__WEBKIT_LEGACY_GRADIENT === null){

        qx.bom.client.Css.getLinearGradient();
      };
      return qx.bom.client.Css.__WEBKIT_LEGACY_GRADIENT;
    },
    /**
     * Checks if rgba colors can be used:
     * http://www.w3.org/TR/2010/PR-css3-color-20101028/#rgba-color
     *
     * @return {Boolean} <code>true</code>, if rgba colors are supported.
     * @internal
     */
    getRgba : function(){

      var el;
      try{

        el = document.createElement("div");
      } catch(ex) {

        el = document.createElement();
      };
      // try catch for IE
      try{

        el.style["color"] = "rgba(1, 2, 3, 0.5)";
        if(el.style["color"].indexOf("rgba") != -1){

          return true;
        };
      } catch(ex) {
      };
      return false;
    },
    /**
     * Returns the (possibly vendor-prefixed) name the browser uses for the
     * <code>boxSizing</code> style property.
     *
     * @return {String|null} boxSizing property name or <code>null</code> if
     * boxSizing is not supported.
     * @internal
     */
    getBoxSizing : function(){

      return qx.bom.Style.getPropertyName("boxSizing");
    },
    /**
     * Returns the browser-specific name used for the <code>display</code> style
     * property's <code>inline-block</code> value.
     *
     * @internal
     * @return {String|null}
     */
    getInlineBlock : function(){

      var el = document.createElement("span");
      el.style.display = "inline-block";
      if(el.style.display == "inline-block"){

        return "inline-block";
      };
      el.style.display = "-moz-inline-box";
      if(el.style.display !== "-moz-inline-box"){

        return "-moz-inline-box";
      };
      return null;
    },
    /**
     * Checks if CSS opacity is supported
     *
     * @internal
     * @return {Boolean} <code>true</code> if opacity is supported
     */
    getOpacity : function(){

      return (typeof document.documentElement.style.opacity == "string");
    },
    /**
     * Checks if CSS texShadow is supported
     *
     * @internal
     * @return {Boolean} <code>true</code> if textShadow is supported
     */
    getTextShadow : function(){

      return !!qx.bom.Style.getPropertyName("textShadow");
    },
    /**
     * Returns <code>true</code> if the browser supports setting text shadow
     * using the filter style. This usually only applies for IE browsers
     * starting from IE5.5.
     *
     * @internal
     * @return {Boolean} <code>true</code> if textShadow is supported
     */
    getFilterTextShadow : function(){

      return qx.bom.client.Css.__isFilterSupported("DXImageTransform.Microsoft.Shadow", "color=#666666,direction=45");
    },
    /**
     * Checks if the given filter is supported.
     *
     * @param filterClass {String} The name of the filter class
     * @param initParams {String} Init values for the filter
     * @return {Boolean} <code>true</code> if the given filter is supported
     */
    __isFilterSupported : function(filterClass, initParams){

      var supported = false;
      var value = "progid:" + filterClass + "(" + initParams + ");";
      var el = document.createElement("div");
      document.body.appendChild(el);
      el.style.filter = value;
      if(el.filters && el.filters.length > 0 && el.filters.item(filterClass).enabled == true){

        supported = true;
      };
      document.body.removeChild(el);
      return supported;
    },
    /**
     * Checks if the Alpha Image Loader must be used to display transparent PNGs.
     *
     * @return {Boolean} <code>true</code> if the Alpha Image Loader is required
     */
    getAlphaImageLoaderNeeded : function(){

      return qx.bom.client.Engine.getName() == "mshtml" && qx.bom.client.Browser.getDocumentMode() < 9;
    },
    /**
     * Checks if pointer events are available.
     *
     * @internal
     * @return {Boolean} <code>true</code> if pointer events are supported.
     */
    getPointerEvents : function(){

      var el = document.documentElement;
      // Check if browser reports that pointerEvents is a known style property
      if("pointerEvents" in el.style){

        // The property is defined in Opera and IE9 but setting it has no effect
        var initial = el.style.pointerEvents;
        el.style.pointerEvents = "auto";
        // don't assume support if a nonsensical value isn't ignored
        el.style.pointerEvents = "foo";
        var supported = el.style.pointerEvents == "auto";
        el.style.pointerEvents = initial;
        return supported;
      };
      return false;
    }
  },
  defer : function(statics){

    qx.core.Environment.add("css.textoverflow", statics.getTextOverflow);
    qx.core.Environment.add("css.placeholder", statics.getPlaceholder);
    qx.core.Environment.add("css.borderradius", statics.getBorderRadius);
    qx.core.Environment.add("css.boxshadow", statics.getBoxShadow);
    qx.core.Environment.add("css.gradient.linear", statics.getLinearGradient);
    qx.core.Environment.add("css.gradient.filter", statics.getFilterGradient);
    qx.core.Environment.add("css.gradient.radial", statics.getRadialGradient);
    qx.core.Environment.add("css.gradient.legacywebkit", statics.getLegacyWebkitGradient);
    qx.core.Environment.add("css.boxmodel", statics.getBoxModel);
    qx.core.Environment.add("css.rgba", statics.getRgba);
    qx.core.Environment.add("css.borderimage", statics.getBorderImage);
    qx.core.Environment.add("css.borderimage.standardsyntax", statics.getBorderImageSyntax);
    qx.core.Environment.add("css.usermodify", statics.getUserModify);
    qx.core.Environment.add("css.userselect", statics.getUserSelect);
    qx.core.Environment.add("css.userselect.none", statics.getUserSelectNone);
    qx.core.Environment.add("css.appearance", statics.getAppearance);
    qx.core.Environment.add("css.float", statics.getFloat);
    qx.core.Environment.add("css.boxsizing", statics.getBoxSizing);
    qx.core.Environment.add("css.inlineblock", statics.getInlineBlock);
    qx.core.Environment.add("css.opacity", statics.getOpacity);
    qx.core.Environment.add("css.textShadow", statics.getTextShadow);
    qx.core.Environment.add("css.textShadow.filter", statics.getFilterTextShadow);
    qx.core.Environment.add("css.alphaimageloaderneeded", statics.getAlphaImageLoaderNeeded);
    qx.core.Environment.add("css.pointerevents", statics.getPointerEvents);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

   ======================================================================

   This class contains code based on the following work:

   * Prototype JS
     http://www.prototypejs.org/
     Version 1.5

     Copyright:
       (c) 2006-2007, Prototype Core Team

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

     Authors:
       * Prototype Core Team

   ----------------------------------------------------------------------

     Copyright (c) 2005-2008 Sam Stephenson

     Permission is hereby granted, free of charge, to any person
     obtaining a copy of this software and associated documentation
     files (the "Software"), to deal in the Software without restriction,
     including without limitation the rights to use, copy, modify, merge,
     publish, distribute, sublicense, and/or sell copies of the Software,
     and to permit persons to whom the Software is furnished to do so,
     subject to the following conditions:

     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
     MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
     HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
     WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
     DEALINGS IN THE SOFTWARE.

************************************************************************ */
/**
 * Style querying and modification of HTML elements.
 *
 * Automatically normalizes cross-browser differences for setting and reading
 * CSS attributes. Optimized for performance.
 *
 * @require(qx.lang.String)
 * @require(qx.bom.client.Css)

 * @require(qx.bom.element.Clip#set)
 * @require(qx.bom.element.Cursor#set)
 * @require(qx.bom.element.Opacity#set)
 * @require(qx.bom.element.BoxSizing#set)

 * @require(qx.bom.element.Clip#get)
 * @require(qx.bom.element.Cursor#get)
 * @require(qx.bom.element.Opacity#get)
 * @require(qx.bom.element.BoxSizing#get)

 * @require(qx.bom.element.Clip#reset)
 * @require(qx.bom.element.Cursor#reset)
 * @require(qx.bom.element.Opacity#reset)
 * @require(qx.bom.element.BoxSizing#reset)

 * @require(qx.bom.element.Clip#compile)
 * @require(qx.bom.element.Cursor#compile)
 * @require(qx.bom.element.Opacity#compile)
 * @require(qx.bom.element.BoxSizing#compile)
 */
qx.Bootstrap.define("qx.bom.element.Style", {
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    __styleNames : null,
    __cssNames : null,
    /**
     * Detect vendor specific properties.
     */
    __detectVendorProperties : function(){

      var styleNames = {
        "appearance" : qx.core.Environment.get("css.appearance"),
        "userSelect" : qx.core.Environment.get("css.userselect"),
        "textOverflow" : qx.core.Environment.get("css.textoverflow"),
        "borderImage" : qx.core.Environment.get("css.borderimage"),
        "float" : qx.core.Environment.get("css.float"),
        "userModify" : qx.core.Environment.get("css.usermodify"),
        "boxSizing" : qx.core.Environment.get("css.boxsizing")
      };
      this.__cssNames = {
      };
      for(var key in qx.lang.Object.clone(styleNames)){

        if(!styleNames[key]){

          delete styleNames[key];
        } else {

          this.__cssNames[key] = key == "float" ? "float" : qx.bom.Style.getCssName(styleNames[key]);
        };
      };
      this.__styleNames = styleNames;
    },
    /**
     * Gets the (possibly vendor-prefixed) name of a style property and stores
     * it to avoid multiple checks.
     *
     * @param name {String} Style property name to check
     * @return {String|null} The client-specific name of the property, or
     * <code>null</code> if it's not supported.
     */
    __getStyleName : function(name){

      var styleName = qx.bom.Style.getPropertyName(name);
      if(styleName){

        this.__styleNames[name] = styleName;
      };
      return styleName;
    },
    /**
     * Mshtml has proprietary pixel* properties for locations and dimensions
     * which return the pixel value. Used by getComputed() in mshtml variant.
     *
     * @internal
     */
    __mshtmlPixel : {
      width : "pixelWidth",
      height : "pixelHeight",
      left : "pixelLeft",
      right : "pixelRight",
      top : "pixelTop",
      bottom : "pixelBottom"
    },
    /**
     * Whether a special class is available for the processing of this style.
     *
     * @internal
     */
    __special : {
      clip : qx.bom.element.Clip,
      cursor : qx.bom.element.Cursor,
      opacity : qx.bom.element.Opacity,
      boxSizing : qx.bom.element.BoxSizing
    },
    /** @type {Integer} Computed value of a style property. Compared to the cascaded style,
     * this one also interprets the values e.g. translates <code>em</code> units to
     * <code>px</code>.
     */
    COMPUTED_MODE : 1,
    /** @type {Integer} Cascaded value of a style property. */
    CASCADED_MODE : 2,
    /**
     * @type {Integer} Local value of a style property. Ignores inheritance cascade.
     *   Does not interpret values.
     */
    LOCAL_MODE : 3,
    /**
     * Sets the value of a style property
     *
     * @param element {Element} The DOM element to modify
     * @param name {String} Name of the style attribute (js variant e.g. marginTop, wordSpacing)
     * @param value {var} The value for the given style
     * @param smart {Boolean?true} Whether the implementation should automatically use
     *    special implementations for some properties
     */
    set : function(element, name, value, smart){

      if(qx.core.Environment.get("qx.debug")){

        qx.core.Assert.assertElement(element, "Invalid argument 'element'");
        qx.core.Assert.assertString(name, "Invalid argument 'name'");
        if(smart !== undefined){

          qx.core.Assert.assertBoolean(smart, "Invalid argument 'smart'");
        };
      };
      // normalize name
      name = this.__styleNames[name] || this.__getStyleName(name) || name;
      // special handling for specific properties
      // through this good working switch this part costs nothing when
      // processing non-smart properties
      if(smart !== false && this.__special[name]){

        this.__special[name].set(element, value);
      } else {

        element.style[name] = value !== null ? value : "";
      };
    },
    /**
     * Gets the value of a style property.
     *
     * *Computed*
     *
     * Returns the computed value of a style property. Compared to the cascaded style,
     * this one also interprets the values e.g. translates <code>em</code> units to
     * <code>px</code>.
     *
     * *Cascaded*
     *
     * Returns the cascaded value of a style property.
     *
     * *Local*
     *
     * Ignores inheritance cascade. Does not interpret values.
     *
     * @signature function(element, name, mode, smart)
     * @param element {Element} The DOM element to modify
     * @param name {String} Name of the style attribute (js variant e.g. marginTop, wordSpacing)
     * @param mode {Number} Choose one of the modes {@link #COMPUTED_MODE}, {@link #CASCADED_MODE},
     *   {@link #LOCAL_MODE}. The computed mode is the default one.
     * @param smart {Boolean?true} Whether the implementation should automatically use
     *    special implementations for some properties
     * @return {var} The value of the property
     */
    get : function(element, name, mode, smart){

      // normalize name
      name = this.__styleNames[name] || this.__getStyleName(name) || name;
      // special handling
      if(smart !== false && this.__special[name]){

        return this.__special[name].get(element, mode);
      };
      // switch to right mode
      switch(mode){case this.LOCAL_MODE:
      return element.style[name] || "";case this.CASCADED_MODE:
      // Currently only supported by Opera and Internet Explorer
      if(element.currentStyle){

        return element.currentStyle[name] || "";
      };
      throw new Error("Cascaded styles are not supported in this browser!");default:
      // Opera, Mozilla and Safari 3+ also have a global getComputedStyle which is identical
      // to the one found under document.defaultView.
      // The problem with this is however that this does not work correctly
      // when working with frames and access an element of another frame.
      // Then we must use the <code>getComputedStyle</code> of the document
      // where the element is defined.
      var doc = qx.dom.Node.getDocument(element);
      var getStyle = doc.defaultView ? doc.defaultView.getComputedStyle : undefined;
      if(getStyle !== undefined){

        // Support for the DOM2 getComputedStyle method
        //
        // Safari >= 3 & Gecko > 1.4 expose all properties to the returned
        // CSSStyleDeclaration object. In older browsers the function
        // "getPropertyValue" is needed to access the values.
        //
        // On a computed style object all properties are read-only which is
        // identical to the behavior of MSHTML's "currentStyle".
        var computed = getStyle(element, null);
        // All relevant browsers expose the configured style properties to
        // the CSSStyleDeclaration objects
        if(computed && computed[name]){

          return computed[name];
        };
      } else {

        // if the element is not inserted into the document "currentStyle"
        // may be undefined. In this case always return the local style.
        if(!element.currentStyle){

          return element.style[name] || "";
        };
        // Read cascaded style. Shorthand properties like "border" are not available
        // on the currentStyle object.
        var currentStyle = element.currentStyle[name] || element.style[name] || "";
        // Pixel values are always OK
        if(/^-?[\.\d]+(px)?$/i.test(currentStyle)){

          return currentStyle;
        };
        // Try to convert non-pixel values
        var pixel = this.__mshtmlPixel[name];
        if(pixel && (pixel in element.style)){

          // Backup local and runtime style
          var localStyle = element.style[name];
          // Overwrite local value with cascaded value
          // This is needed to have the pixel value setup
          element.style[name] = currentStyle || 0;
          // Read pixel value and add "px"
          var value = element.style[pixel] + "px";
          // Recover old local value
          element.style[name] = localStyle;
          // Return value
          return value;
        };
        // Just the current style
        return currentStyle;
      };
      return element.style[name] || "";};
    }
  },
  defer : function(statics){

    statics.__detectVendorProperties();
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

   ======================================================================

   This class contains code based on the following work:

   * Yahoo! UI Library
       http://developer.yahoo.com/yui
       Version 2.2.0

     Copyright:
       (c) 2007, Yahoo! Inc.

     License:
       BSD: http://developer.yahoo.com/yui/license.txt

   ----------------------------------------------------------------------

     http://developer.yahoo.com/yui/license.html

     Copyright (c) 2009, Yahoo! Inc.
     All rights reserved.

     Redistribution and use of this software in source and binary forms,
     with or without modification, are permitted provided that the
     following conditions are met:

     * Redistributions of source code must retain the above copyright
       notice, this list of conditions and the following disclaimer.
     * Redistributions in binary form must reproduce the above copyright
       notice, this list of conditions and the following disclaimer in
       the documentation and/or other materials provided with the
       distribution.
     * Neither the name of Yahoo! Inc. nor the names of its contributors
       may be used to endorse or promote products derived from this
       software without specific prior written permission of Yahoo! Inc.

     THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
     "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
     LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
     FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
     COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
     INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
     (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
     SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
     HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
     STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
     ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
     OF THE POSSIBILITY OF SUCH DAMAGE.

************************************************************************ */
/**
 * Includes library functions to work with the current document.
 */
qx.Bootstrap.define("qx.bom.Document", {
  statics : {
    /**
     * Whether the document is in quirks mode (e.g. non XHTML, HTML4 Strict or missing doctype)
     *
     * @signature function(win)
     * @param win {Window?window} The window to query
     * @return {Boolean} true when containing document is in quirks mode
     */
    isQuirksMode : qx.core.Environment.select("engine.name", {
      "mshtml" : function(win){

        if(qx.core.Environment.get("engine.version") >= 8){

          return (win || window).document.documentMode === 5;
        } else {

          return (win || window).document.compatMode !== "CSS1Compat";
        };
      },
      "webkit" : function(win){

        if(document.compatMode === undefined){

          var el = (win || window).document.createElement("div");
          el.style.cssText = "position:absolute;width:0;height:0;width:1";
          return el.style.width === "1px" ? true : false;
        } else {

          return (win || window).document.compatMode !== "CSS1Compat";
        };
      },
      "default" : function(win){

        return (win || window).document.compatMode !== "CSS1Compat";
      }
    }),
    /**
     * Whether the document is in standard mode (e.g. XHTML, HTML4 Strict or doctype defined)
     *
     * @param win {Window?window} The window to query
     * @return {Boolean} true when containing document is in standard mode
     */
    isStandardMode : function(win){

      return !this.isQuirksMode(win);
    },
    /**
     * Returns the width of the document.
     *
     * Internet Explorer in standard mode stores the proprietary <code>scrollWidth</code> property
     * on the <code>documentElement</code>, but in quirks mode on the body element. All
     * other known browsers simply store the correct value on the <code>documentElement</code>.
     *
     * If the viewport is wider than the document the viewport width is returned.
     *
     * As the html element has no visual appearance it also can not scroll. This
     * means that we must use the body <code>scrollWidth</code> in all non mshtml clients.
     *
     * Verified to correctly work with:
     *
     * * Mozilla Firefox 2.0.0.4
     * * Opera 9.2.1
     * * Safari 3.0 beta (3.0.2)
     * * Internet Explorer 7.0
     *
     * @param win {Window?window} The window to query
     * @return {Integer} The width of the actual document (which includes the body and its margin).
     *
     * NOTE: Opera 9.5x and 9.6x have wrong value for the scrollWidth property,
     * if an element use negative value for top and left to be outside the viewport!
     * See: http://bugzilla.qooxdoo.org/show_bug.cgi?id=2869
     */
    getWidth : function(win){

      var doc = (win || window).document;
      var view = qx.bom.Viewport.getWidth(win);
      var scroll = this.isStandardMode(win) ? doc.documentElement.scrollWidth : doc.body.scrollWidth;
      return Math.max(scroll, view);
    },
    /**
     * Returns the height of the document.
     *
     * Internet Explorer in standard mode stores the proprietary <code>scrollHeight</code> property
     * on the <code>documentElement</code>, but in quirks mode on the body element. All
     * other known browsers simply store the correct value on the <code>documentElement</code>.
     *
     * If the viewport is higher than the document the viewport height is returned.
     *
     * As the html element has no visual appearance it also can not scroll. This
     * means that we must use the body <code>scrollHeight</code> in all non mshtml clients.
     *
     * Verified to correctly work with:
     *
     * * Mozilla Firefox 2.0.0.4
     * * Opera 9.2.1
     * * Safari 3.0 beta (3.0.2)
     * * Internet Explorer 7.0
     *
     * @param win {Window?window} The window to query
     * @return {Integer} The height of the actual document (which includes the body and its margin).
     *
     * NOTE: Opera 9.5x and 9.6x have wrong value for the scrollWidth property,
     * if an element use negative value for top and left to be outside the viewport!
     * See: http://bugzilla.qooxdoo.org/show_bug.cgi?id=2869
     */
    getHeight : function(win){

      var doc = (win || window).document;
      var view = qx.bom.Viewport.getHeight(win);
      var scroll = this.isStandardMode(win) ? doc.documentElement.scrollHeight : doc.body.scrollHeight;
      return Math.max(scroll, view);
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Sebastian Fastner (fastner)
     * Tino Butz (tbtz)

   ======================================================================

   This class contains code based on the following work:

   * Unify Project

     Homepage:
       http://unify-project.org

     Copyright:
       2009-2010 Deutsche Telekom AG, Germany, http://telekom.com

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

   * Yahoo! UI Library
       http://developer.yahoo.com/yui
       Version 2.2.0

     Copyright:
       (c) 2007, Yahoo! Inc.

     License:
       BSD: http://developer.yahoo.com/yui/license.txt

   ----------------------------------------------------------------------

     http://developer.yahoo.com/yui/license.html

     Copyright (c) 2009, Yahoo! Inc.
     All rights reserved.

     Redistribution and use of this software in source and binary forms,
     with or without modification, are permitted provided that the
     following conditions are met:

     * Redistributions of source code must retain the above copyright
       notice, this list of conditions and the following disclaimer.
     * Redistributions in binary form must reproduce the above copyright
       notice, this list of conditions and the following disclaimer in
       the documentation and/or other materials provided with the
       distribution.
     * Neither the name of Yahoo! Inc. nor the names of its contributors
       may be used to endorse or promote products derived from this
       software without specific prior written permission of Yahoo! Inc.

     THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
     "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
     LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
     FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
     COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
     INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
     (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
     SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
     HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
     STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
     ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
     OF THE POSSIBILITY OF SUCH DAMAGE.

************************************************************************ */
/**
 * Includes library functions to work with the client's viewport (window).
 * Orientation related functions are point to window.top as default.
 */
qx.Bootstrap.define("qx.bom.Viewport", {
  statics : {
    /**
     * Returns the current width of the viewport (excluding the vertical scrollbar
     * if present).
     *
     * @param win {Window?window} The window to query
     * @return {Integer} The width of the viewable area of the page (excluding scrollbars).
     */
    getWidth : function(win){

      var win = win || window;
      var doc = win.document;
      return qx.bom.Document.isStandardMode(win) ? doc.documentElement.clientWidth : doc.body.clientWidth;
    },
    /**
     * Returns the current height of the viewport (excluding the horizontal scrollbar
     * if present).
     *
     * @param win {Window?window} The window to query
     * @return {Integer} The Height of the viewable area of the page (excluding scrollbars).
     */
    getHeight : function(win){

      var win = win || window;
      var doc = win.document;
      // [BUG #7785] Document element's clientHeight is calculated wrong on iPad iOS7
      if(qx.core.Environment.get("os.name") == "ios" && window.innerHeight != doc.documentElement.clientHeight){

        return window.innerHeight;
      };
      return qx.bom.Document.isStandardMode(win) ? doc.documentElement.clientHeight : doc.body.clientHeight;
    },
    /**
     * Returns the scroll position of the viewport
     *
     * All clients except IE < 9 support the non-standard property <code>pageXOffset</code>.
     * As this is easier to evaluate we prefer this property over <code>scrollLeft</code>.
     * Since the window could differ from the one the application is running in, we can't
     * use a one-time environment check to decide which property to use.
     *
     * @param win {Window?window} The window to query
     * @return {Integer} Scroll position in pixels from left edge, always a positive integer or zero
     */
    getScrollLeft : function(win){

      var win = win ? win : window;
      if(typeof win.pageXOffset !== "undefined"){

        return win.pageXOffset;
      };
      // Firefox is using 'documentElement.scrollLeft' and Chrome is using
      // 'document.body.scrollLeft'. For the other value each browser is returning
      // 0, so we can use this check to get the positive value without using specific
      // browser checks.
      var doc = win.document;
      return doc.documentElement.scrollLeft || doc.body.scrollLeft;
    },
    /**
     * Returns the scroll position of the viewport
     *
     * All clients except MSHTML support the non-standard property <code>pageYOffset</code>.
     * As this is easier to evaluate we prefer this property over <code>scrollTop</code>.
     * Since the window could differ from the one the application is running in, we can't
     * use a one-time environment check to decide which property to use.
     *
     * @param win {Window?window} The window to query
     * @return {Integer} Scroll position in pixels from top edge, always a positive integer or zero
     */
    getScrollTop : function(win){

      var win = win ? win : window;
      if(typeof win.pageYOffset !== "undefined"){

        return win.pageYOffset;
      };
      // Firefox is using 'documentElement.scrollTop' and Chrome is using
      // 'document.body.scrollTop'. For the other value each browser is returning
      // 0, so we can use this check to get the positive value without using specific
      // browser checks.
      var doc = win.document;
      return doc.documentElement.scrollTop || doc.body.scrollTop;
    },
    /**
     * Returns an orientation normalizer value that should be added to device orientation
     * to normalize behaviour on different devices.
     *
     * @param win {Window} The window to query
     * @return {Map} Orientation normalizing value
     */
    __getOrientationNormalizer : function(win){

      // Calculate own understanding of orientation (0 = portrait, 90 = landscape)
      var currentOrientation = this.getWidth(win) > this.getHeight(win) ? 90 : 0;
      var deviceOrientation = win.orientation;
      if(deviceOrientation == null || Math.abs(deviceOrientation % 180) == currentOrientation){

        // No device orientation available or device orientation equals own understanding of orientation
        return {
          "-270" : 90,
          "-180" : 180,
          "-90" : -90,
          "0" : 0,
          "90" : 90,
          "180" : 180,
          "270" : -90
        };
      } else {

        // Device orientation is not equal to own understanding of orientation
        return {
          "-270" : 180,
          "-180" : -90,
          "-90" : 0,
          "0" : 90,
          "90" : 180,
          "180" : -90,
          "270" : 0
        };
      };
    },
    // Cache orientation normalizer map on start
    __orientationNormalizer : null,
    /**
     * Returns the current orientation of the viewport in degree.
     *
     * All possible values and their meaning:
     *
     * * <code>-90</code>: "Landscape"
     * * <code>0</code>: "Portrait"
     * * <code>90</code>: "Landscape"
     * * <code>180</code>: "Portrait"
     *
     * @param win {Window?window.top} The window to query. (Default = top window)
     * @return {Integer} The current orientation in degree
     */
    getOrientation : function(win){

      // Set window.top as default, because orientationChange event is only fired top window
      var win = win || window.top;
      // The orientation property of window does not have the same behaviour over all devices
      // iPad has 0degrees = Portrait, Playbook has 90degrees = Portrait, same for Android Honeycomb
      //
      // To fix this an orientationNormalizer map is calculated on application start
      //
      // The calculation of getWidth and getHeight returns wrong values if you are in an input field
      // on iPad and rotate your device!
      var orientation = win.orientation;
      if(orientation == null){

        // Calculate orientation from window width and window height
        orientation = this.getWidth(win) > this.getHeight(win) ? 90 : 0;
      } else {

        if(this.__orientationNormalizer == null){

          this.__orientationNormalizer = this.__getOrientationNormalizer(win);
        };
        // Normalize orientation value
        orientation = this.__orientationNormalizer[orientation];
      };
      return orientation;
    },
    /**
     * Whether the viewport orientation is currently in landscape mode.
     *
     * @param win {Window?window} The window to query
     * @return {Boolean} <code>true</code> when the viewport orientation
     *     is currently in landscape mode.
     */
    isLandscape : function(win){

      return this.getWidth(win) >= this.getHeight(win);
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */
/**
 * Internal class which contains the checks used by {@link qx.core.Environment}.
 * All checks in here are marked as internal which means you should never use
 * them directly.
 *
 * This class should contain all checks about HTML.
 *
 * @internal
 */
qx.Bootstrap.define("qx.bom.client.Html", {
  statics : {
    /**
     * Whether the client supports Web Workers.
     *
     * @internal
     * @return {Boolean} <code>true</code> if webworkers are supported
     */
    getWebWorker : function(){

      return window.Worker != null;
    },
    /**
     * Whether the client supports File Readers
     *
     * @internal
     * @return {Boolean} <code>true</code> if FileReaders are supported
     */
    getFileReader : function(){

      return window.FileReader != null;
    },
    /**
     * Whether the client supports Geo Location.
     *
     * @internal
     * @return {Boolean} <code>true</code> if geolocation supported
     */
    getGeoLocation : function(){

      return "geolocation" in navigator;
    },
    /**
     * Whether the client supports audio.
     *
     * @internal
     * @return {Boolean} <code>true</code> if audio is supported
     */
    getAudio : function(){

      return !!document.createElement('audio').canPlayType;
    },
    /**
     * Whether the client can play ogg audio format.
     *
     * @internal
     * @return {String} "" or "maybe" or "probably"
     */
    getAudioOgg : function(){

      if(!qx.bom.client.Html.getAudio()){

        return "";
      };
      var a = document.createElement("audio");
      return a.canPlayType("audio/ogg");
    },
    /**
     * Whether the client can play mp3 audio format.
     *
     * @internal
     * @return {String} "" or "maybe" or "probably"
     */
    getAudioMp3 : function(){

      if(!qx.bom.client.Html.getAudio()){

        return "";
      };
      var a = document.createElement("audio");
      return a.canPlayType("audio/mpeg");
    },
    /**
     * Whether the client can play wave audio wave format.
     *
     * @internal
     * @return {String} "" or "maybe" or "probably"
     */
    getAudioWav : function(){

      if(!qx.bom.client.Html.getAudio()){

        return "";
      };
      var a = document.createElement("audio");
      return a.canPlayType("audio/x-wav");
    },
    /**
     * Whether the client can play au audio format.
     *
     * @internal
     * @return {String} "" or "maybe" or "probably"
     */
    getAudioAu : function(){

      if(!qx.bom.client.Html.getAudio()){

        return "";
      };
      var a = document.createElement("audio");
      return a.canPlayType("audio/basic");
    },
    /**
     * Whether the client can play aif audio format.
     *
     * @internal
     * @return {String} "" or "maybe" or "probably"
     */
    getAudioAif : function(){

      if(!qx.bom.client.Html.getAudio()){

        return "";
      };
      var a = document.createElement("audio");
      return a.canPlayType("audio/x-aiff");
    },
    /**
     * Whether the client supports video.
     *
     * @internal
     * @return {Boolean} <code>true</code> if video is supported
     */
    getVideo : function(){

      return !!document.createElement('video').canPlayType;
    },
    /**
     * Whether the client supports ogg video.
     *
     * @internal
     * @return {String} "" or "maybe" or "probably"
     */
    getVideoOgg : function(){

      if(!qx.bom.client.Html.getVideo()){

        return "";
      };
      var v = document.createElement("video");
      return v.canPlayType('video/ogg; codecs="theora, vorbis"');
    },
    /**
     * Whether the client supports mp4 video.
     *
     * @internal
     * @return {String} "" or "maybe" or "probably"
     */
    getVideoH264 : function(){

      if(!qx.bom.client.Html.getVideo()){

        return "";
      };
      var v = document.createElement("video");
      return v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
    },
    /**
     * Whether the client supports webm video.
     *
     * @internal
     * @return {String} "" or "maybe" or "probably"
     */
    getVideoWebm : function(){

      if(!qx.bom.client.Html.getVideo()){

        return "";
      };
      var v = document.createElement("video");
      return v.canPlayType('video/webm; codecs="vp8, vorbis"');
    },
    /**
     * Whether the client supports local storage.
     *
     * @internal
     * @return {Boolean} <code>true</code> if local storage is supported
     */
    getLocalStorage : function(){

      try{

        var has = window.localStorage != null;
        // write once to make sure to catch safari's private mode [BUG #7718]
        if(has){

          window.sessionStorage.setItem("$qx_check", "test");
          window.sessionStorage.removeItem("$qx_check");
        };
        return has;
      } catch(exc) {

        // Firefox Bug: Local execution of window.sessionStorage throws error
        // see https://bugzilla.mozilla.org/show_bug.cgi?id=357323
        return false;
      };
    },
    /**
     * Whether the client supports session storage.
     *
     * @internal
     * @return {Boolean} <code>true</code> if session storage is supported
     */
    getSessionStorage : function(){

      try{

        var has = window.sessionStorage != null;
        // write once to make sure to catch safari's private mode [BUG #7718]
        if(has){

          window.sessionStorage.setItem("$qx_check", "test");
          window.sessionStorage.removeItem("$qx_check");
        };
        return has;
      } catch(exc) {

        // Firefox Bug: Local execution of window.sessionStorage throws error
        // see https://bugzilla.mozilla.org/show_bug.cgi?id=357323
        return false;
      };
    },
    /**
     * Whether the client supports user data to persist data. This is only
     * relevant for IE < 8.
     *
     * @internal
     * @return {Boolean} <code>true</code> if the user data is supported.
     */
    getUserDataStorage : function(){

      var el = document.createElement("div");
      el.style["display"] = "none";
      document.getElementsByTagName("head")[0].appendChild(el);
      var supported = false;
      try{

        el.addBehavior("#default#userdata");
        el.load("qxtest");
        supported = true;
      } catch(e) {
      };
      document.getElementsByTagName("head")[0].removeChild(el);
      return supported;
    },
    /**
     * Whether the browser supports CSS class lists.
     * https://developer.mozilla.org/en-US/docs/DOM/element.classList
     *
     * @internal
     * @return {Boolean} <code>true</code> if class list is supported.
     */
    getClassList : function(){

      return !!(document.documentElement.classList && qx.Bootstrap.getClass(document.documentElement.classList) === "DOMTokenList");
    },
    /**
     * Checks if XPath could be used.
     *
     * @internal
     * @return {Boolean} <code>true</code> if xpath is supported.
     */
    getXPath : function(){

      return !!document.evaluate;
    },
    /**
     * Checks if XUL could be used.
     *
     * @internal
     * @return {Boolean} <code>true</code> if XUL is supported.
     */
    getXul : function(){

      try{

        document.createElementNS("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul", "label");
        return true;
      } catch(e) {

        return false;
      };
    },
    /**
     * Checks if SVG could be used
     *
     * @internal
     * @return {Boolean} <code>true</code> if SVG is supported.
     */
    getSvg : function(){

      return document.implementation && document.implementation.hasFeature && (document.implementation.hasFeature("org.w3c.dom.svg", "1.0") || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"));
    },
    /**
     * Checks if VML is supported
     *
     * @internal
     * @return {Boolean} <code>true</code> if VML is supported.
     */
    getVml : function(){

      var el = document.createElement("div");
      document.body.appendChild(el);
      el.innerHTML = '<v:shape id="vml_flag1" adj="1" />';
      el.firstChild.style.behavior = "url(#default#VML)";
      var hasVml = typeof el.firstChild.adj == "object";
      document.body.removeChild(el);
      return hasVml;
    },
    /**
     * Checks if canvas could be used
     *
     * @internal
     * @return {Boolean} <code>true</code> if canvas is supported.
     */
    getCanvas : function(){

      return !!window.CanvasRenderingContext2D;
    },
    /**
     * Asynchronous check for using data urls.
     *
     * @internal
     * @param callback {Function} The function which should be executed as
     *   soon as the check is done.
     */
    getDataUrl : function(callback){

      var data = new Image();
      data.onload = data.onerror = function(){

        // wrap that into a timeout because IE might execute it synchronously
        window.setTimeout(function(){

          callback.call(null, (data.width == 1 && data.height == 1));
        }, 0);
      };
      data.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    },
    /**
     * Checks if dataset could be used
     *
     * @internal
     * @return {Boolean} <code>true</code> if dataset is supported.
     */
    getDataset : function(){

      return !!document.documentElement.dataset;
    },
    /**
     * Check for element.contains
     *
     * @internal
     * @return {Boolean} <code>true</code> if element.contains is supported
     */
    getContains : function(){

      // "object" in IE6/7/8, "function" in IE9
      return (typeof document.documentElement.contains !== "undefined");
    },
    /**
     * Check for element.compareDocumentPosition
     *
     * @internal
     * @return {Boolean} <code>true</code> if element.compareDocumentPosition is supported
     */
    getCompareDocumentPosition : function(){

      return (typeof document.documentElement.compareDocumentPosition === "function");
    },
    /**
     * Check for element.textContent. Legacy IEs do not support this, use
     * innerText instead.
     *
     * @internal
     * @return {Boolean} <code>true</code> if textContent is supported
     */
    getTextContent : function(){

      var el = document.createElement("span");
      return (typeof el.textContent !== "undefined");
    },
    /**
     * Check for a console object.
     *
     * @internal
     * @return {Boolean} <code>true</code> if a console is available.
     */
    getConsole : function(){

      return typeof window.console !== "undefined";
    },
    /**
     * Check for the <code>naturalHeight</code> and <code>naturalWidth</code>
     * image element attributes.
     *
     * @internal
     * @return {Boolean} <code>true</code> if both attributes are supported
     */
    getNaturalDimensions : function(){

      var img = document.createElement("img");
      return typeof img.naturalHeight === "number" && typeof img.naturalWidth === "number";
    },
    /**
     * Check for HTML5 history manipulation support.
    
     * @internal
     * @return {Boolean} <code>true</code> if the HTML5 history API is supported
     */
    getHistoryState : function(){

      return (typeof window.onpopstate !== "undefined" && typeof window.history.replaceState !== "undefined" && typeof window.history.pushState !== "undefined");
    },
    /**
     * Returns the name of the native object/function used to access the
     * document's text selection.
     *
     * @return {String|null} <code>getSelection</code> if the standard window.getSelection
     * function is available; <code>selection</code> if the MS-proprietary
     * document.selection object is available; <code>null</code> if no known
     * text selection API is available.
     */
    getSelection : function(){

      if(typeof window.getSelection === "function"){

        return "getSelection";
      };
      if(typeof document.selection === "object"){

        return "selection";
      };
      return null;
    },
    /**
     * Check for the isEqualNode DOM method.
     *
     * @return {Boolean} <code>true</code> if isEqualNode is supported by DOM nodes
     */
    getIsEqualNode : function(){

      return typeof document.documentElement.isEqualNode === "function";
    }
  },
  defer : function(statics){

    qx.core.Environment.add("html.webworker", statics.getWebWorker);
    qx.core.Environment.add("html.filereader", statics.getFileReader);
    qx.core.Environment.add("html.geolocation", statics.getGeoLocation);
    qx.core.Environment.add("html.audio", statics.getAudio);
    qx.core.Environment.add("html.audio.ogg", statics.getAudioOgg);
    qx.core.Environment.add("html.audio.mp3", statics.getAudioMp3);
    qx.core.Environment.add("html.audio.wav", statics.getAudioWav);
    qx.core.Environment.add("html.audio.au", statics.getAudioAu);
    qx.core.Environment.add("html.audio.aif", statics.getAudioAif);
    qx.core.Environment.add("html.video", statics.getVideo);
    qx.core.Environment.add("html.video.ogg", statics.getVideoOgg);
    qx.core.Environment.add("html.video.h264", statics.getVideoH264);
    qx.core.Environment.add("html.video.webm", statics.getVideoWebm);
    qx.core.Environment.add("html.storage.local", statics.getLocalStorage);
    qx.core.Environment.add("html.storage.session", statics.getSessionStorage);
    qx.core.Environment.add("html.storage.userdata", statics.getUserDataStorage);
    qx.core.Environment.add("html.classlist", statics.getClassList);
    qx.core.Environment.add("html.xpath", statics.getXPath);
    qx.core.Environment.add("html.xul", statics.getXul);
    qx.core.Environment.add("html.canvas", statics.getCanvas);
    qx.core.Environment.add("html.svg", statics.getSvg);
    qx.core.Environment.add("html.vml", statics.getVml);
    qx.core.Environment.add("html.dataset", statics.getDataset);
    qx.core.Environment.addAsync("html.dataurl", statics.getDataUrl);
    qx.core.Environment.add("html.element.contains", statics.getContains);
    qx.core.Environment.add("html.element.compareDocumentPosition", statics.getCompareDocumentPosition);
    qx.core.Environment.add("html.element.textcontent", statics.getTextContent);
    qx.core.Environment.add("html.console", statics.getConsole);
    qx.core.Environment.add("html.image.naturaldimensions", statics.getNaturalDimensions);
    qx.core.Environment.add("html.history.state", statics.getHistoryState);
    qx.core.Environment.add("html.selection", statics.getSelection);
    qx.core.Environment.add("html.node.isequalnode", statics.getIsEqualNode);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

   ======================================================================

   This class contains code based on the following work:

   * Base2
     http://code.google.com/p/base2/
     Version 0.9

     Copyright:
       (c) 2006-2007, Dean Edwards

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

     Authors:
       * Dean Edwards

************************************************************************ */
/**
 * CSS class name support for HTML elements. Supports multiple class names
 * for each element. Can query and apply class names to HTML elements.
 */
qx.Bootstrap.define("qx.bom.element.Class", {
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    /** @type {RegExp} Regular expressions to split class names */
    __splitter : /\s+/g,
    /** @type {RegExp} String trim regular expression. */
    __trim : /^\s+|\s+$/g,
    /**
     * Adds a className to the given element
     * If successfully added the given className will be returned
     *
     * @signature function(element, name)
     * @param element {Element} The element to modify
     * @param name {String} The class name to add
     * @return {String} The added classname (if so)
     */
    add : {
      "native" : function(element, name){

        element.classList.add(name);
        return name;
      },
      "default" : function(element, name){

        if(!this.has(element, name)){

          element.className += (element.className ? " " : "") + name;
        };
        return name;
      }
    }[qx.core.Environment.get("html.classlist") ? "native" : "default"],
    /**
     * Adds multiple classes to the given element
     *
     * @signature function(element, classes)
     * @param element {Element} DOM element to modify
     * @param classes {String[]} List of classes to add.
     * @return {String} The resulting class name which was applied
     */
    addClasses : {
      "native" : function(element, classes){

        for(var i = 0;i < classes.length;i++){

          element.classList.add(classes[i]);
        };
        return element.className;
      },
      "default" : function(element, classes){

        var keys = {
        };
        var result;
        var old = element.className;
        if(old){

          result = old.split(this.__splitter);
          for(var i = 0,l = result.length;i < l;i++){

            keys[result[i]] = true;
          };
          for(var i = 0,l = classes.length;i < l;i++){

            if(!keys[classes[i]]){

              result.push(classes[i]);
            };
          };
        } else {

          result = classes;
        };
        return element.className = result.join(" ");
      }
    }[qx.core.Environment.get("html.classlist") ? "native" : "default"],
    /**
     * Gets the classname of the given element
     *
     * @param element {Element} The element to query
     * @return {String} The retrieved classname
     */
    get : function(element){

      var className = element.className;
      if(typeof className.split !== 'function'){

        if(typeof className === 'object'){

          if(qx.Bootstrap.getClass(className) == 'SVGAnimatedString'){

            className = className.baseVal;
          } else {

            if(qx.core.Environment.get("qx.debug")){

              qx.log.Logger.warn(this, "className for element " + element + " cannot be determined");
            };
            className = '';
          };
        };
        if(typeof className === 'undefined'){

          if(qx.core.Environment.get("qx.debug")){

            qx.log.Logger.warn(this, "className for element " + element + " is undefined");
          };
          className = '';
        };
      };
      return className;
    },
    /**
     * Whether the given element has the given className.
     *
     * @signature function(element, name)
     * @param element {Element} The DOM element to check
     * @param name {String} The class name to check for
     * @return {Boolean} true when the element has the given classname
     */
    has : {
      "native" : function(element, name){

        return element.classList.contains(name);
      },
      "default" : function(element, name){

        var regexp = new RegExp("(^|\\s)" + name + "(\\s|$)");
        return regexp.test(element.className);
      }
    }[qx.core.Environment.get("html.classlist") ? "native" : "default"],
    /**
     * Removes a className from the given element
     *
     * @signature function(element, name)
     * @param element {Element} The DOM element to modify
     * @param name {String} The class name to remove
     * @return {String} The removed class name
     */
    remove : {
      "native" : function(element, name){

        element.classList.remove(name);
        return name;
      },
      "default" : function(element, name){

        var regexp = new RegExp("(^|\\s)" + name + "(\\s|$)");
        element.className = element.className.replace(regexp, "$2");
        return name;
      }
    }[qx.core.Environment.get("html.classlist") ? "native" : "default"],
    /**
     * Removes multiple classes from the given element
     *
     * @signature function(element, classes)
     * @param element {Element} DOM element to modify
     * @param classes {String[]} List of classes to remove.
     * @return {String} The resulting class name which was applied
     */
    removeClasses : {
      "native" : function(element, classes){

        for(var i = 0;i < classes.length;i++){

          element.classList.remove(classes[i]);
        };
        return element.className;
      },
      "default" : function(element, classes){

        var reg = new RegExp("\\b" + classes.join("\\b|\\b") + "\\b", "g");
        return element.className = element.className.replace(reg, "").replace(this.__trim, "").replace(this.__splitter, " ");
      }
    }[qx.core.Environment.get("html.classlist") ? "native" : "default"],
    /**
     * Replaces the first given class name with the second one
     *
     * @param element {Element} The DOM element to modify
     * @param oldName {String} The class name to remove
     * @param newName {String} The class name to add
     * @return {String} The added class name
     */
    replace : function(element, oldName, newName){

      if(!this.has(element, oldName)){

        return "";
      };
      this.remove(element, oldName);
      return this.add(element, newName);
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Fabian Jakobs (fjakobs)

************************************************************************ */
/**
 * Contains support for calculating dimensions of HTML elements.
 *
 * We differ between the box (or border) size which is available via
 * {@link #getWidth} and {@link #getHeight} and the content or scroll
 * sizes which are available via {@link #getContentWidth} and
 * {@link #getContentHeight}.
 */
qx.Bootstrap.define("qx.bom.element.Dimension", {
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    /**
     * Returns the rendered width of the given element.
     *
     * This is the visible width of the object, which need not to be identical
     * to the width configured via CSS. This highly depends on the current
     * box-sizing for the document and maybe even for the element.
     *
     * @signature function(element)
     * @param element {Element} element to query
     * @return {Integer} width of the element
     */
    getWidth : function(element){

      var rect = element.getBoundingClientRect();
      return Math.round(rect.right) - Math.round(rect.left);
    },
    /**
     * Returns the rendered height of the given element.
     *
     * This is the visible height of the object, which need not to be identical
     * to the height configured via CSS. This highly depends on the current
     * box-sizing for the document and maybe even for the element.
     *
     * @signature function(element)
     * @param element {Element} element to query
     * @return {Integer} height of the element
     */
    getHeight : function(element){

      var rect = element.getBoundingClientRect();
      return Math.round(rect.bottom) - Math.round(rect.top);
    },
    /** @type {Map} Contains all overflow values where scrollbars are invisible */
    __hiddenScrollbars : {
      visible : true,
      hidden : true
    },
    /**
     * Returns the content width.
     *
     * The content width is basically the maximum
     * width used or the maximum width which can be used by the content. This
     * excludes all kind of styles of the element like borders, paddings, margins,
     * and even scrollbars.
     *
     * Please note that with visible scrollbars the content width returned
     * may be larger than the box width returned via {@link #getWidth}.
     *
     * @param element {Element} element to query
     * @return {Integer} Computed content width
     */
    getContentWidth : function(element){

      var Style = qx.bom.element.Style;
      var overflowX = qx.bom.element.Style.get(element, "overflowX");
      var paddingLeft = parseInt(Style.get(element, "paddingLeft") || "0px", 10);
      var paddingRight = parseInt(Style.get(element, "paddingRight") || "0px", 10);
      if(this.__hiddenScrollbars[overflowX]){

        var contentWidth = element.clientWidth;
        if((qx.core.Environment.get("engine.name") == "opera") || qx.dom.Node.isBlockNode(element)){

          contentWidth = contentWidth - paddingLeft - paddingRight;
        };
        // IE seems to return 0 on clientWidth if the element is 0px
        // in height so we use the offsetWidth instead
        if(qx.core.Environment.get("engine.name") == "mshtml"){

          if(contentWidth === 0 && element.offsetHeight === 0){

            return element.offsetWidth;
          };
        };
        return contentWidth;
      } else {

        if(element.clientWidth >= element.scrollWidth){

          // Scrollbars visible, but not needed? We need to substract both paddings
          return Math.max(element.clientWidth, element.scrollWidth) - paddingLeft - paddingRight;
        } else {

          // Scrollbars visible and needed. We just remove the left padding,
          // as the right padding is not respected in rendering.
          var width = element.scrollWidth - paddingLeft;
          // IE renders the paddingRight as well with scrollbars on
          if(qx.core.Environment.get("engine.name") == "mshtml" && qx.core.Environment.get("engine.version") >= 6){

            width -= paddingRight;
          };
          return width;
        };
      };
    },
    /**
     * Returns the content height.
     *
     * The content height is basically the maximum
     * height used or the maximum height which can be used by the content. This
     * excludes all kind of styles of the element like borders, paddings, margins,
     * and even scrollbars.
     *
     * Please note that with visible scrollbars the content height returned
     * may be larger than the box height returned via {@link #getHeight}.
     *
     * @param element {Element} element to query
     * @return {Integer} Computed content height
     */
    getContentHeight : function(element){

      var Style = qx.bom.element.Style;
      var overflowY = qx.bom.element.Style.get(element, "overflowY");
      var paddingTop = parseInt(Style.get(element, "paddingTop") || "0px", 10);
      var paddingBottom = parseInt(Style.get(element, "paddingBottom") || "0px", 10);
      if(this.__hiddenScrollbars[overflowY]){

        return element.clientHeight - paddingTop - paddingBottom;
      } else {

        if(element.clientHeight >= element.scrollHeight){

          // Scrollbars visible, but not needed? We need to substract both paddings
          return Math.max(element.clientHeight, element.scrollHeight) - paddingTop - paddingBottom;
        } else {

          // Scrollbars visible and needed. We just remove the top padding,
          // as the bottom padding is not respected in rendering.
          var height = element.scrollHeight - paddingTop;
          // IE renders the paddingBottom as well with scrollbars on
          if(qx.core.Environment.get("engine.name") == "mshtml" && qx.core.Environment.get("engine.version") == 6){

            height -= paddingBottom;
          };
          return height;
        };
      };
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

   ======================================================================

   This class contains code based on the following work:

   * jQuery Dimension Plugin
       http://jquery.com/
       Version 1.1.3

     Copyright:
       (c) 2007, Paul Bakaus & Brandon Aaron

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

     Authors:
       Paul Bakaus
       Brandon Aaron

************************************************************************ */
/**
 * Query the location of an arbitrary DOM element in relation to its top
 * level body element. Works in all major browsers:
 *
 * * Mozilla 1.5 + 2.0
 * * Internet Explorer 6.0 + 7.0 (both standard & quirks mode)
 * * Opera 9.2
 * * Safari 3.0 beta
 */
qx.Bootstrap.define("qx.bom.element.Location", {
  statics : {
    /**
     * Queries a style property for the given element and parses it to an integer value
     *
     * @param elem {Element} DOM element to query
     * @param style {String} Style property
     * @return {Integer} Value of given style property
     */
    __num : function(elem, style){

      return parseInt(qx.bom.element.Style.get(elem, style, qx.bom.element.Style.COMPUTED_MODE, false), 10) || 0;
    },
    /**
     * Computes the scroll offset of the given element relative to the document
     * <code>body</code>.
     *
     * @param elem {Element} DOM element to query
     * @return {Map} Map which contains the <code>left</code> and <code>top</code> scroll offsets
     */
    __computeScroll : function(elem){

      var left = 0,top = 0;
      // Find window
      var win = qx.dom.Node.getWindow(elem);
      left -= qx.bom.Viewport.getScrollLeft(win);
      top -= qx.bom.Viewport.getScrollTop(win);
      return {
        left : left,
        top : top
      };
    },
    /**
     * Computes the offset of the given element relative to the document
     * <code>body</code>.
     *
     * @param elem {Element} DOM element to query
     * @return {Map} Map which contains the <code>left</code> and <code>top</code> offsets
     */
    __computeBody : qx.core.Environment.select("engine.name", {
      "mshtml" : function(elem){

        // Find body element
        var doc = qx.dom.Node.getDocument(elem);
        var body = doc.body;
        var left = 0;
        var top = 0;
        left -= body.clientLeft + doc.documentElement.clientLeft;
        top -= body.clientTop + doc.documentElement.clientTop;
        if(!qx.core.Environment.get("browser.quirksmode")){

          left += this.__num(body, "borderLeftWidth");
          top += this.__num(body, "borderTopWidth");
        };
        return {
          left : left,
          top : top
        };
      },
      "webkit" : function(elem){

        // Find body element
        var doc = qx.dom.Node.getDocument(elem);
        var body = doc.body;
        // Start with the offset
        var left = body.offsetLeft;
        var top = body.offsetTop;
        // only for safari < version 4.0
        if(parseFloat(qx.core.Environment.get("engine.version")) < 530.17){

          left += this.__num(body, "borderLeftWidth");
          top += this.__num(body, "borderTopWidth");
        };
        return {
          left : left,
          top : top
        };
      },
      "gecko" : function(elem){

        // Find body element
        var body = qx.dom.Node.getDocument(elem).body;
        // Start with the offset
        var left = body.offsetLeft;
        var top = body.offsetTop;
        // add the body margin for firefox 3.0 and below
        if(parseFloat(qx.core.Environment.get("engine.version")) < 1.9){

          left += this.__num(body, "marginLeft");
          top += this.__num(body, "marginTop");
        };
        // Correct substracted border (only in content-box mode)
        if(qx.bom.element.BoxSizing.get(body) !== "border-box"){

          left += this.__num(body, "borderLeftWidth");
          top += this.__num(body, "borderTopWidth");
        };
        return {
          left : left,
          top : top
        };
      },
      // At the moment only correctly supported by Opera
      "default" : function(elem){

        // Find body element
        var body = qx.dom.Node.getDocument(elem).body;
        // Start with the offset
        var left = body.offsetLeft;
        var top = body.offsetTop;
        return {
          left : left,
          top : top
        };
      }
    }),
    /**
     * Computes the sum of all offsets of the given element node.
     *
     * @signature function(elem)
     * @param elem {Element} DOM element to query
     * @return {Map} Map which contains the <code>left</code> and <code>top</code> offsets
     */
    __computeOffset : function(elem){

      var rect = elem.getBoundingClientRect();
      // Firefox 3.0 alpha 6 (gecko 1.9) returns floating point numbers
      // use Math.round() to round them to style compatible numbers
      // MSHTML returns integer numbers
      return {
        left : Math.round(rect.left),
        top : Math.round(rect.top)
      };
    },
    /**
     * Computes the location of the given element in context of
     * the document dimensions.
     *
     * Supported modes:
     *
     * * <code>margin</code>: Calculate from the margin box of the element (bigger than the visual appearance: including margins of given element)
     * * <code>box</code>: Calculates the offset box of the element (default, uses the same size as visible)
     * * <code>border</code>: Calculate the border box (useful to align to border edges of two elements).
     * * <code>scroll</code>: Calculate the scroll box (relevant for absolute positioned content).
     * * <code>padding</code>: Calculate the padding box (relevant for static/relative positioned content).
     *
     * @param elem {Element} DOM element to query
     * @param mode {String?box} A supported option. See comment above.
     * @return {Map} Returns a map with <code>left</code>, <code>top</code>,
     *   <code>right</code> and <code>bottom</code> which contains the distance
     *   of the element relative to the document.
     */
    get : function(elem, mode){

      if(elem.tagName == "BODY"){

        var location = this.__getBodyLocation(elem);
        var left = location.left;
        var top = location.top;
      } else {

        var body = this.__computeBody(elem);
        var offset = this.__computeOffset(elem);
        // Reduce by viewport scrolling.
        // Hint: getBoundingClientRect returns the location of the
        // element in relation to the viewport which includes
        // the scrolling
        var scroll = this.__computeScroll(elem);
        var left = offset.left + body.left - scroll.left;
        var top = offset.top + body.top - scroll.top;
      };
      var right = left + elem.offsetWidth;
      var bottom = top + elem.offsetHeight;
      if(mode){

        // In this modes we want the size as seen from a child what means that we want the full width/height
        // which may be higher than the outer width/height when the element has scrollbars.
        if(mode == "padding" || mode == "scroll"){

          var overX = qx.bom.element.Style.get(elem, "overflowX");
          if(overX == "scroll" || overX == "auto"){

            right += elem.scrollWidth - elem.offsetWidth + this.__num(elem, "borderLeftWidth") + this.__num(elem, "borderRightWidth");
          };
          var overY = qx.bom.element.Style.get(elem, "overflowY");
          if(overY == "scroll" || overY == "auto"){

            bottom += elem.scrollHeight - elem.offsetHeight + this.__num(elem, "borderTopWidth") + this.__num(elem, "borderBottomWidth");
          };
        };
        switch(mode){case "padding":
        left += this.__num(elem, "paddingLeft");
        top += this.__num(elem, "paddingTop");
        right -= this.__num(elem, "paddingRight");
        bottom -= this.__num(elem, "paddingBottom");// no break here
        case "scroll":
        left -= elem.scrollLeft;
        top -= elem.scrollTop;
        right -= elem.scrollLeft;
        bottom -= elem.scrollTop;// no break here
        case "border":
        left += this.__num(elem, "borderLeftWidth");
        top += this.__num(elem, "borderTopWidth");
        right -= this.__num(elem, "borderRightWidth");
        bottom -= this.__num(elem, "borderBottomWidth");
        break;case "margin":
        left -= this.__num(elem, "marginLeft");
        top -= this.__num(elem, "marginTop");
        right += this.__num(elem, "marginRight");
        bottom += this.__num(elem, "marginBottom");
        break;};
      };
      return {
        left : left,
        top : top,
        right : right,
        bottom : bottom
      };
    },
    /**
     * Get the location of the body element relative to the document.
     * @param body {Element} The body element.
     * @return {Map} map with the keys <code>left</code> and <code>top</code>
     */
    __getBodyLocation : function(body){

      var top = body.offsetTop;
      var left = body.offsetLeft;
      if(qx.core.Environment.get("engine.name") !== "mshtml" || !((parseFloat(qx.core.Environment.get("engine.version")) < 8 || qx.core.Environment.get("browser.documentmode") < 8) && !qx.core.Environment.get("browser.quirksmode"))){

        top += this.__num(body, "marginTop");
        left += this.__num(body, "marginLeft");
      };
      if(qx.core.Environment.get("engine.name") === "gecko"){

        top += this.__num(body, "borderLeftWidth");
        left += this.__num(body, "borderTopWidth");
      };
      return {
        left : left,
        top : top
      };
    },
    /**
     * Returns the distance between two DOM elements. For supported modes please
     * have a look at the {@link qx.bom.element.Location#get} method.
     *
     * @param elem1 {Element} First element
     * @param elem2 {Element} Second element
     * @param mode1 {String?null} Mode for first element
     * @param mode2 {String?null} Mode for second element
     * @return {Map} Returns a map with <code>left</code> and <code>top</code>
     *   which contains the distance of the elements from each other.
     */
    getRelative : function(elem1, elem2, mode1, mode2){

      var loc1 = this.get(elem1, mode1);
      var loc2 = this.get(elem2, mode2);
      return {
        left : loc1.left - loc2.left,
        top : loc1.top - loc2.top,
        right : loc1.right - loc2.right,
        bottom : loc1.bottom - loc2.bottom
      };
    },
    /**
     * Returns the distance between the given element to its offset parent.
     *
     * @param elem {Element} DOM element to query
     * @return {Map} Returns a map with <code>left</code> and <code>top</code>
     *   which contains the distance of the elements from each other.
     */
    getPosition : function(elem){

      return this.getRelative(elem, this.getOffsetParent(elem));
    },
    /**
     * Detects the offset parent of the given element
     *
     * @param element {Element} Element to query for offset parent
     * @return {Element} Detected offset parent
     */
    getOffsetParent : function(element){

      var offsetParent = element.offsetParent || document.body;
      var Style = qx.bom.element.Style;
      while(offsetParent && (!/^body|html$/i.test(offsetParent.tagName) && Style.get(offsetParent, "position") === "static")){

        offsetParent = offsetParent.offsetParent;
      };
      return offsetParent;
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
     2006 STZ-IDA, Germany, http://www.stz-ida.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Andreas Junghans (lucidcake)

************************************************************************ */
/**
 * Cross-browser wrapper to work with CSS stylesheets.
 */
qx.Bootstrap.define("qx.bom.Stylesheet", {
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    /**
     * Include a CSS file
     *
     * <em>Note:</em> Using a resource ID as the <code>href</code> parameter
     * will no longer be supported. Call
     * <code>qx.util.ResourceManager.getInstance().toUri(href)</code> to get
     * valid URI to be used with this method.
     *
     * @param href {String} Href value
     * @param doc {Document?} Document to modify
     */
    includeFile : function(href, doc){

      if(!doc){

        doc = document;
      };
      var el = doc.createElement("link");
      el.type = "text/css";
      el.rel = "stylesheet";
      el.href = href;
      var head = doc.getElementsByTagName("head")[0];
      head.appendChild(el);
    },
    /**
     * Create a new Stylesheet node and append it to the document
     *
     * @param text {String?} optional string of css rules
     * @return {Stylesheet} the generates stylesheet element
     */
    createElement : function(text){

      if(qx.core.Environment.get("html.stylesheet.createstylesheet")){

        var sheet = document.createStyleSheet();
        if(text){

          sheet.cssText = text;
        };
        return sheet;
      } else {

        var elem = document.createElement("style");
        elem.type = "text/css";
        if(text){

          elem.appendChild(document.createTextNode(text));
        };
        document.getElementsByTagName("head")[0].appendChild(elem);
        return elem.sheet;
      };
    },
    /**
     * Insert a new CSS rule into a given Stylesheet
     *
     * @param sheet {Object} the target Stylesheet object
     * @param selector {String} the selector
     * @param entry {String} style rule
     */
    addRule : function(sheet, selector, entry){

      if(qx.core.Environment.get('qx.debug')){

        var msg = "qx.bom.Stylesheet.addRule: The rule '" + entry + "' for the selector '" + selector + "' must not be enclosed in braces";
        qx.core.Assert.assertFalse(/^\s*?\{.*?\}\s*?$/.test(entry), msg);
      };
      if(qx.core.Environment.get("html.stylesheet.insertrule")){

        sheet.insertRule(selector + "{" + entry + "}", sheet.cssRules.length);
      } else {

        sheet.addRule(selector, entry);
      };
    },
    /**
     * Remove a CSS rule from a stylesheet
     *
     * @param sheet {Object} the Stylesheet
     * @param selector {String} the Selector of the rule to remove
     */
    removeRule : function(sheet, selector){

      if(qx.core.Environment.get("html.stylesheet.deleterule")){

        var rules = sheet.cssRules;
        var len = rules.length;
        for(var i = len - 1;i >= 0;--i){

          if(rules[i].selectorText == selector){

            sheet.deleteRule(i);
          };
        };
      } else {

        var rules = sheet.rules;
        var len = rules.length;
        for(var i = len - 1;i >= 0;--i){

          if(rules[i].selectorText == selector){

            sheet.removeRule(i);
          };
        };
      };
    },
    /**
     * Remove the given sheet from its owner.
     * @param sheet {Object} the stylesheet object
     */
    removeSheet : function(sheet){

      var owner = sheet.ownerNode ? sheet.ownerNode : sheet.owningElement;
      qx.dom.Element.removeChild(owner, owner.parentNode);
    },
    /**
     * Remove all CSS rules from a stylesheet
     *
     * @param sheet {Object} the stylesheet object
     */
    removeAllRules : function(sheet){

      if(qx.core.Environment.get("html.stylesheet.deleterule")){

        var rules = sheet.cssRules;
        var len = rules.length;
        for(var i = len - 1;i >= 0;i--){

          sheet.deleteRule(i);
        };
      } else {

        var rules = sheet.rules;
        var len = rules.length;
        for(var i = len - 1;i >= 0;i--){

          sheet.removeRule(i);
        };
      };
    },
    /**
     * Add an import of an external CSS file to a stylesheet
     *
     * @param sheet {Object} the stylesheet object
     * @param url {String} URL of the external stylesheet file
     */
    addImport : function(sheet, url){

      if(qx.core.Environment.get("html.stylesheet.addimport")){

        sheet.addImport(url);
      } else {

        sheet.insertRule('@import "' + url + '";', sheet.cssRules.length);
      };
    },
    /**
     * Removes an import from a stylesheet
     *
     * @param sheet {Object} the stylesheet object
     * @param url {String} URL of the imported CSS file
     */
    removeImport : function(sheet, url){

      if(qx.core.Environment.get("html.stylesheet.removeimport")){

        var imports = sheet.imports;
        var len = imports.length;
        for(var i = len - 1;i >= 0;i--){

          if(imports[i].href == url || imports[i].href == qx.util.Uri.getAbsolute(url)){

            sheet.removeImport(i);
          };
        };
      } else {

        var rules = sheet.cssRules;
        var len = rules.length;
        for(var i = len - 1;i >= 0;i--){

          if(rules[i].href == url){

            sheet.deleteRule(i);
          };
        };
      };
    },
    /**
     * Remove all imports from a stylesheet
     *
     * @param sheet {Object} the stylesheet object
     */
    removeAllImports : function(sheet){

      if(qx.core.Environment.get("html.stylesheet.removeimport")){

        var imports = sheet.imports;
        var len = imports.length;
        for(var i = len - 1;i >= 0;i--){

          sheet.removeImport(i);
        };
      } else {

        var rules = sheet.cssRules;
        var len = rules.length;
        for(var i = len - 1;i >= 0;i--){

          if(rules[i].type == rules[i].IMPORT_RULE){

            sheet.deleteRule(i);
          };
        };
      };
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

************************************************************************ */
/**
 * Manages children structures of an element. Easy and convenient APIs
 * to insert, remove and replace children.
 */
qx.Bootstrap.define("qx.dom.Element", {
  statics : {
    /**
     * Returns the parent element of the given element.
     *
     * @param element {Element} Element to find the parent for
     * @return {Element} The parent element
     */
    getParentElement : function(element){

      return element.parentNode;
    },
    /**
     * Insert <code>node</code> into <code>parent</code> as last child.
     *
     * @param node {Node} Node to insert
     * @param parent {Element} parent element node
     * @return {Boolean} returns true (successful)
     */
    insertEnd : function(node, parent){

      parent.appendChild(node);
      return true;
    },
    /**
     * Inserts <code>node</code> before <code>ref</code> in the same parent.
     *
     * @param node {Node} Node to insert
     * @param ref {Node} Node which will be used as reference for insertion
     * @return {Boolean} returns true (successful)
     */
    insertBefore : function(node, ref){

      ref.parentNode.insertBefore(node, ref);
      return true;
    },
    /**
     * Inserts <code>node</code> after <code>ref</code> in the same parent.
     *
     * @param node {Node} Node to insert
     * @param ref {Node} Node which will be used as reference for insertion
     * @return {Boolean} returns true (successful)
     */
    insertAfter : function(node, ref){

      var parent = ref.parentNode;
      if(ref == parent.lastChild){

        parent.appendChild(node);
      } else {

        return this.insertBefore(node, ref.nextSibling);
      };
      return true;
    },
    /*
    ---------------------------------------------------------------------------
      REMOVAL
    ---------------------------------------------------------------------------
    */
    /**
     * Removes the given <code>node</code> from its parent element.
     *
     * @param node {Node} Node to remove
     * @return {Boolean} <code>true</code> when node was successfully removed,
     *   otherwise <code>false</code>
     */
    remove : function(node){

      if(!node.parentNode){

        return false;
      };
      node.parentNode.removeChild(node);
      return true;
    },
    /**
     * Removes the given <code>node</code> from the <code>parent</code>.
     *
     * @param node {Node} Node to remove
     * @param parent {Element} parent element which contains the <code>node</code>
     * @return {Boolean} <code>true</code> when node was successfully removed,
     *   otherwise <code>false</code>
     */
    removeChild : function(node, parent){

      if(node.parentNode !== parent){

        return false;
      };
      parent.removeChild(node);
      return true;
    },
    /**
     * Creates a DOM element.
     *
     * @param name {String} Tag name of the element
     * @param attributes {Map?} Map of attributes to apply
     * @param win {Window?} Window to create the element for
     * @return {Element} The created element node
     */
    create : function(name, attributes, win){

      if(!win){

        win = window;
      };
      if(!name){

        throw new Error("The tag name is missing!");
      };
      var element = win.document.createElement(name);
      for(var key in attributes){

        qx.bom.element.Attribute.set(element, key, attributes[key]);
      };
      return element;
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2010 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Alexander Steitz (aback)

   ======================================================================

   This class contains code based on the following work:

   * Prototype JS
     http://www.prototypejs.org/
     Version 1.5

     Copyright:
       (c) 2006-2007, Prototype Core Team

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

     Authors:
       * Prototype Core Team

   ----------------------------------------------------------------------

     Copyright (c) 2005-2008 Sam Stephenson

     Permission is hereby granted, free of charge, to any person
     obtaining a copy of this software and associated documentation
     files (the "Software"), to deal in the Software without restriction,
     including without limitation the rights to use, copy, modify, merge,
     publish, distribute, sublicense, and/or sell copies of the Software,
     and to permit persons to whom the Software is furnished to do so,
     subject to the following conditions:

     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
     MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
     HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
     WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
     DEALINGS IN THE SOFTWARE.

************************************************************************ */
/**
 * Attribute/Property handling for DOM HTML elements.
 *
 * Also includes support for HTML properties like <code>checked</code>
 * or <code>value</code>. This feature set is supported cross-browser
 * through one common interface and is independent of the differences between
 * the multiple implementations.
 *
 * Supports applying text and HTML content using the attribute names
 * <code>text</code> and <code>html</code>.
 */
qx.Bootstrap.define("qx.bom.element.Attribute", {
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    /** Internal map of attribute conversions */
    __hints : {
      // Name translation table (camelcase is important for some attributes)
      names : {
        "class" : "className",
        "for" : "htmlFor",
        html : "innerHTML",
        text : qx.core.Environment.get("html.element.textcontent") ? "textContent" : "innerText",
        colspan : "colSpan",
        rowspan : "rowSpan",
        valign : "vAlign",
        datetime : "dateTime",
        accesskey : "accessKey",
        tabindex : "tabIndex",
        maxlength : "maxLength",
        readonly : "readOnly",
        longdesc : "longDesc",
        cellpadding : "cellPadding",
        cellspacing : "cellSpacing",
        frameborder : "frameBorder",
        usemap : "useMap"
      },
      // Attributes which are only applyable on a DOM element (not using compile())
      runtime : {
        "html" : 1,
        "text" : 1
      },
      // Attributes which are (forced) boolean
      bools : {
        compact : 1,
        nowrap : 1,
        ismap : 1,
        declare : 1,
        noshade : 1,
        checked : 1,
        disabled : 1,
        readOnly : 1,
        multiple : 1,
        selected : 1,
        noresize : 1,
        defer : 1,
        allowTransparency : 1
      },
      // Interpreted as property (element.property)
      property : {
        // Used by qx.html.Element
        $$html : 1,
        // Used by qx.ui.core.Widget
        $$widget : 1,
        // Native properties
        disabled : 1,
        checked : 1,
        readOnly : 1,
        multiple : 1,
        selected : 1,
        value : 1,
        maxLength : 1,
        className : 1,
        innerHTML : 1,
        innerText : 1,
        textContent : 1,
        htmlFor : 1,
        tabIndex : 1
      },
      qxProperties : {
        $$widget : 1,
        $$html : 1
      },
      // Default values when "null" is given to a property
      propertyDefault : {
        disabled : false,
        checked : false,
        readOnly : false,
        multiple : false,
        selected : false,
        value : "",
        className : "",
        innerHTML : "",
        innerText : "",
        textContent : "",
        htmlFor : "",
        tabIndex : 0,
        maxLength : qx.core.Environment.select("engine.name", {
          "mshtml" : 2147483647,
          "webkit" : 524288,
          "default" : -1
        })
      },
      // Properties which can be removed to reset them
      removeableProperties : {
        disabled : 1,
        multiple : 1,
        maxLength : 1
      },
      // Use getAttribute(name, 2) for these to query for the real value, not
      // the interpreted one.
      original : {
        href : 1,
        src : 1,
        type : 1
      }
    },
    /**
     * Returns the value of the given HTML attribute
     *
     * @param element {Element} The DOM element to query
     * @param name {String} Name of the attribute
     * @return {var} The value of the attribute
     */
    get : function(element, name){

      var hints = this.__hints;
      var value;
      // normalize name
      name = hints.names[name] || name;
      // respect original values
      // http://msdn2.microsoft.com/en-us/library/ms536429.aspx
      if(qx.core.Environment.get("engine.name") == "mshtml" && parseInt(qx.core.Environment.get("browser.documentmode"), 10) < 8 && hints.original[name]){

        value = element.getAttribute(name, 2);
      } else if(hints.property[name]){

        value = element[name];
        if(typeof hints.propertyDefault[name] !== "undefined" && value == hints.propertyDefault[name]){

          // only return null for all non-boolean properties
          if(typeof hints.bools[name] === "undefined"){

            return null;
          } else {

            return value;
          };
        };
      } else {

        // fallback to attribute
        value = element.getAttribute(name);
      };
      if(hints.bools[name]){

        return !!value;
      };
      return value;
    },
    /**
     * Sets an HTML attribute on the given DOM element
     *
     * @param element {Element} The DOM element to modify
     * @param name {String} Name of the attribute
     * @param value {var} New value of the attribute
     */
    set : function(element, name, value){

      if(typeof value === "undefined"){

        return;
      };
      var hints = this.__hints;
      // normalize name
      name = hints.names[name] || name;
      // respect booleans
      if(hints.bools[name]){

        value = !!value;
      };
      // apply attribute
      // only properties which can be applied by the browser or qxProperties
      // otherwise use the attribute methods
      if(hints.property[name] && (!(element[name] === undefined) || hints.qxProperties[name])){

        // resetting the attribute/property
        if(value == null){

          // for properties which need to be removed for a correct reset
          if(hints.removeableProperties[name]){

            element.removeAttribute(name);
            return;
          } else if(typeof hints.propertyDefault[name] !== "undefined"){

            value = hints.propertyDefault[name];
          };
        };
        element[name] = value;
      } else {

        if(value === true){

          element.setAttribute(name, name);
        } else if(value === false || value === null){

          element.removeAttribute(name);
        } else {

          element.setAttribute(name, value);
        };
      };
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Tristan Koch (tristankoch)

************************************************************************ */
/**
 * Static helpers for parsing and modifying URIs.
 */
qx.Bootstrap.define("qx.util.Uri", {
  statics : {
    /**
     * Split URL
     *
     * Code taken from:
     *   parseUri 1.2.2
     *   (c) Steven Levithan <stevenlevithan.com>
     *   MIT License
     *
     *
     * @param str {String} String to parse as URI
     * @param strict {Boolean} Whether to parse strictly by the rules
     * @return {Object} Map with parts of URI as properties
     */
    parseUri : function(str, strict){

      var options = {
        key : ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
        q : {
          name : "queryKey",
          parser : /(?:^|&)([^&=]*)=?([^&]*)/g
        },
        parser : {
          strict : /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
          loose : /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
        }
      };
      var o = options,m = options.parser[strict ? "strict" : "loose"].exec(str),uri = {
      },i = 14;
      while(i--){

        uri[o.key[i]] = m[i] || "";
      };
      uri[o.q.name] = {
      };
      uri[o.key[12]].replace(o.q.parser, function($0, $1, $2){

        if($1){

          uri[o.q.name][$1] = $2;
        };
      });
      return uri;
    },
    /**
     * Append string to query part of URL. Respects existing query.
     *
     * @param url {String} URL to append string to.
     * @param params {String} Parameters to append to URL.
     * @return {String} URL with string appended in query part.
     */
    appendParamsToUrl : function(url, params){

      if(params === undefined){

        return url;
      };
      if(qx.core.Environment.get("qx.debug")){

        if(!(qx.lang.Type.isString(params) || qx.lang.Type.isObject(params))){

          throw new Error("params must be either string or object");
        };
      };
      if(qx.lang.Type.isObject(params)){

        params = qx.util.Uri.toParameter(params);
      };
      if(!params){

        return url;
      };
      return url += (/\?/).test(url) ? "&" + params : "?" + params;
    },
    /**
     * Serializes an object to URI parameters (also known as query string).
     *
     * Escapes characters that have a special meaning in URIs as well as
     * umlauts. Uses the global function encodeURIComponent, see
     * https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/encodeURIComponent
     *
     * Note: For URI parameters that are to be sent as
     * application/x-www-form-urlencoded (POST), spaces should be encoded
     * with "+".
     *
     * @param obj {Object}   Object to serialize.
     * @param post {Boolean} Whether spaces should be encoded with "+".
     * @return {String}      Serialized object. Safe to append to URIs or send as
     *                       URL encoded string.
     */
    toParameter : function(obj, post){

      var key,parts = [];
      for(key in obj){

        if(obj.hasOwnProperty(key)){

          var value = obj[key];
          if(value instanceof Array){

            for(var i = 0;i < value.length;i++){

              this.__toParameterPair(key, value[i], parts, post);
            };
          } else {

            this.__toParameterPair(key, value, parts, post);
          };
        };
      };
      return parts.join("&");
    },
    /**
     * Encodes key/value to URI safe string and pushes to given array.
     *
     * @param key {String} Key.
     * @param value {String} Value.
     * @param parts {Array} Array to push to.
     * @param post {Boolean} Whether spaces should be encoded with "+".
     */
    __toParameterPair : function(key, value, parts, post){

      var encode = window.encodeURIComponent;
      if(post){

        parts.push(encode(key).replace(/%20/g, "+") + "=" + encode(value).replace(/%20/g, "+"));
      } else {

        parts.push(encode(key) + "=" + encode(value));
      };
    },
    /**
     * Takes a relative URI and returns an absolute one.
     *
     * @param uri {String} relative URI
     * @return {String} absolute URI
     */
    getAbsolute : function(uri){

      var div = document.createElement("div");
      div.innerHTML = '<a href="' + uri + '">0</a>';
      return div.firstChild.href;
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Daniel Wagner (d_wagner)

************************************************************************ */
/**
 * Internal class which contains the checks used by {@link qx.core.Environment}.
 * All checks in here are marked as internal which means you should never use
 * them directly.
 *
 * This class contains checks related to Stylesheet objects.
 *
 * @internal
 */
qx.Bootstrap.define("qx.bom.client.Stylesheet", {
  statics : {
    /**
     * Returns a stylesheet to be used for feature checks
     *
     * @return {Stylesheet} Stylesheet element
     */
    __getStylesheet : function(){

      if(!qx.bom.client.Stylesheet.__stylesheet){

        qx.bom.client.Stylesheet.__stylesheet = qx.bom.Stylesheet.createElement();
      };
      return qx.bom.client.Stylesheet.__stylesheet;
    },
    /**
     * Check for IE's non-standard document.createStyleSheet function.
     * In IE9 (standards mode), the typeof check returns "function" so false is
     * returned. This is intended since IE9 supports the DOM-standard
     * createElement("style") which should be used instead.
     *
     * @internal
     * @return {Boolean} <code>true</code> if the browser supports
     * document.createStyleSheet
     */
    getCreateStyleSheet : function(){

      return typeof document.createStyleSheet === "object";
    },
    /**
     * Check for stylesheet.insertRule. Legacy IEs do not support this.
     *
     * @internal
     * @return {Boolean} <code>true</code> if insertRule is supported
     */
    getInsertRule : function(){

      return typeof qx.bom.client.Stylesheet.__getStylesheet().insertRule === "function";
    },
    /**
     * Check for stylesheet.deleteRule. Legacy IEs do not support this.
     *
     * @internal
     * @return {Boolean} <code>true</code> if deleteRule is supported
     */
    getDeleteRule : function(){

      return typeof qx.bom.client.Stylesheet.__getStylesheet().deleteRule === "function";
    },
    /**
     * Decides whether to use the legacy IE-only stylesheet.addImport or the
     * DOM-standard stylesheet.insertRule('@import [...]')
     *
     * @internal
     * @return {Boolean} <code>true</code> if stylesheet.addImport is supported
     */
    getAddImport : function(){

      return (typeof qx.bom.client.Stylesheet.__getStylesheet().addImport === "object");
    },
    /**
     * Decides whether to use the legacy IE-only stylesheet.removeImport or the
     * DOM-standard stylesheet.deleteRule('@import [...]')
     *
     * @internal
     * @return {Boolean} <code>true</code> if stylesheet.removeImport is supported
     */
    getRemoveImport : function(){

      return (typeof qx.bom.client.Stylesheet.__getStylesheet().removeImport === "object");
    }
  },
  defer : function(statics){

    qx.core.Environment.add("html.stylesheet.createstylesheet", statics.getCreateStyleSheet);
    qx.core.Environment.add("html.stylesheet.insertrule", statics.getInsertRule);
    qx.core.Environment.add("html.stylesheet.deleterule", statics.getDeleteRule);
    qx.core.Environment.add("html.stylesheet.addimport", statics.getAddImport);
    qx.core.Environment.add("html.stylesheet.removeimport", statics.getRemoveImport);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

   ======================================================================

   This class contains code based on the following work:

   * Prototype JS
     http://www.prototypejs.org/
     Version 1.5

     Copyright:
       (c) 2006-2007, Prototype Core Team

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

     Authors:
       * Prototype Core Team

   ----------------------------------------------------------------------

     Copyright (c) 2005-2008 Sam Stephenson

     Permission is hereby granted, free of charge, to any person
     obtaining a copy of this software and associated documentation
     files (the "Software"), to deal in the Software without restriction,
     including without limitation the rights to use, copy, modify, merge,
     publish, distribute, sublicense, and/or sell copies of the Software,
     and to permit persons to whom the Software is furnished to do so,
     subject to the following conditions:

     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
     MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
     HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
     WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
     DEALINGS IN THE SOFTWARE.

************************************************************************ */
/**
 * Methods to operate on nodes and elements on a DOM tree. This contains
 * special getters to query for child nodes, siblings, etc. This class also
 * supports to operate on one element and reorganize the content with
 * the insertion of new HTML or nodes.
 */
qx.Bootstrap.define("qx.dom.Hierarchy", {
  statics : {
    /**
     * Return the next element to the supplied element
     *
     * "nextSibling" is not good enough as it might return a text or comment element
     *
     * @param element {Element} Starting element node
     * @return {Element | null} Next element node
     */
    getNextElementSibling : function(element){

      while(element && (element = element.nextSibling) && !qx.dom.Node.isElement(element)){

        continue;
      };
      return element || null;
    },
    /**
     * Return the previous element to the supplied element
     *
     * "previousSibling" is not good enough as it might return a text or comment element
     *
     * @param element {Element} Starting element node
     * @return {Element | null} Previous element node
     */
    getPreviousElementSibling : function(element){

      while(element && (element = element.previousSibling) && !qx.dom.Node.isElement(element)){

        continue;
      };
      return element || null;
    },
    /**
     * Whether the first element contains the second one
     *
     * Uses native non-standard contains() in Internet Explorer,
     * Opera and Webkit (supported since Safari 3.0 beta)
     *
     * @param element {Element} Parent element
     * @param target {Node} Child node
     * @return {Boolean}
     */
    contains : function(element, target){

      if(qx.core.Environment.get("html.element.contains")){

        if(qx.dom.Node.isDocument(element)){

          var doc = qx.dom.Node.getDocument(target);
          return element && doc == element;
        } else if(qx.dom.Node.isDocument(target)){

          return false;
        } else {

          return element.contains(target);
        };
      } else if(qx.core.Environment.get("html.element.compareDocumentPosition")){

        // https://developer.mozilla.org/en-US/docs/DOM:Node.compareDocumentPosition
        return !!(element.compareDocumentPosition(target) & 16);
      } else {

        while(target){

          if(element == target){

            return true;
          };
          target = target.parentNode;
        };
        return false;
      };
    },
    /**
     * Whether the element is inserted into the document
     * for which it was created.
     *
     * @param element {Element} DOM element to check
     * @return {Boolean} <code>true</code> when the element is inserted
     *    into the document.
     */
    isRendered : function(element){

      var doc = element.ownerDocument || element.document;
      if(qx.core.Environment.get("html.element.contains")){

        // Fast check for all elements which are not in the DOM
        if(!element.parentNode || !element.offsetParent){

          return false;
        };
        return doc.body.contains(element);
      } else if(qx.core.Environment.get("html.element.compareDocumentPosition")){

        // Gecko way, DOM3 method
        return !!(doc.compareDocumentPosition(element) & 16);
      } else {

        while(element){

          if(element == doc.body){

            return true;
          };
          element = element.parentNode;
        };
        return false;
      };
    },
    /**
     * Returns element's children.
     *
     * @param element {Element} DOM element to query for child elements
     * @return {Array} list of all child elements
     */
    getChildElements : function(element){

      element = element.firstChild;
      if(!element){

        return [];
      };
      var arr = this.getNextSiblings(element);
      if(element.nodeType === 1){

        arr.unshift(element);
      };
      return arr;
    },
    /**
     * Collects all of element's previous siblings and returns them as an array of elements.
     *
     * @param element {Element} DOM element to query for previous siblings
     * @return {Array} list of found DOM elements
     */
    getPreviousSiblings : function(element){

      return this._recursivelyCollect(element, "previousSibling");
    },
    /**
     * Collects all of element's next siblings and returns them as an array of
     * elements.
     *
     * @param element {Element} DOM element to query for next siblings
     * @return {Array} list of found DOM elements
     */
    getNextSiblings : function(element){

      return this._recursivelyCollect(element, "nextSibling");
    },
    /**
     * Recursively collects elements whose relationship is specified by
     * property.  <code>property</code> has to be a property (a method won't
     * do!) of element that points to a single DOM node. Returns an array of
     * elements.
     *
     * @param element {Element} DOM element to start with
     * @param property {String} property to look for
     * @return {Array} result list
     */
    _recursivelyCollect : function(element, property){

      var list = [];
      while(element = element[property]){

        if(element.nodeType == 1){

          list.push(element);
        };
      };
      return list;
    },
    /**
     * Collects all of element's siblings and returns them as an array of elements.
     *
     * @param element {var} DOM element to start with
     * @return {Array} list of all found siblings
     */
    getSiblings : function(element){

      return this.getPreviousSiblings(element).reverse().concat(this.getNextSiblings(element));
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2011-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)
     * Daniel Wagner (danielwagner)

************************************************************************ */
/**
 * DOM traversal module
 *
 * @require(qx.dom.Hierarchy#getSiblings)
 * @require(qx.dom.Hierarchy#getNextSiblings)
 * @require(qx.dom.Hierarchy#getPreviousSiblings)
 * @require(qx.dom.Hierarchy#contains)
 *
 * @group (Core)
 */
qx.Bootstrap.define("qx.module.Traversing", {
  statics : {
    /**
     * String attributes used to determine if two DOM nodes are equal
     * as defined in <a href="http://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-isEqualNode">
     * DOM Level 3</a>
     */
    EQUALITY_ATTRIBUTES : ["nodeType", "nodeName", "localName", "namespaceURI", "prefix", "nodeValue"],
    /**
     * Adds an element to the collection
     *
     * @attach {qxWeb}
     * @param el {Element|qxWeb} DOM element to add to the collection.
     * If a collection is given, only the first element will be added
     * @return {qxWeb} The collection for chaining
     */
    add : function(el){

      if(el instanceof qxWeb){

        el = el[0];
      };
      if(qx.module.Traversing.isElement(el) || qx.module.Traversing.isDocument(el) || qx.module.Traversing.isWindow(el)){

        this.push(el);
      };
      return this;
    },
    /**
     * Gets a set of elements containing all of the unique immediate children of
     * each of the matched set of elements.
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {qxWeb}
     * @param selector {String?null} Optional selector to match
     * @return {qxWeb} Collection containing the child elements
     */
    getChildren : function(selector){

      var children = [];
      for(var i = 0;i < this.length;i++){

        var found = qx.dom.Hierarchy.getChildElements(this[i]);
        if(selector){

          found = qx.bom.Selector.matches(selector, found);
        };
        children = children.concat(found);
      };
      return qxWeb.$init(children, qxWeb);
    },
    /**
     * Executes the provided callback function once for each item in the
     * collection.
     *
     * @attach {qxWeb}
     * @param fn {Function} Callback function which is called with two parameters
     * <ul>
     *  <li>current item - DOM node</li>
     *  <li>current index - Number</li>
     * </ul>
     * @param ctx {Object} Context object
     * @return {qxWeb} The collection for chaining
     */
    forEach : function(fn, ctx){

      for(var i = 0;i < this.length;i++){

        fn.call(ctx, this[i], i, this);
      };
      return this;
    },
    /**
     * Gets a set of elements containing the parent of each element in the
     * collection.
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {qxWeb}
     * @param selector {String?null} Optional selector to match
     * @return {qxWeb} Collection containing the parent elements
     */
    getParents : function(selector){

      var parents = [];
      for(var i = 0;i < this.length;i++){

        var found = qx.dom.Element.getParentElement(this[i]);
        if(selector){

          found = qx.bom.Selector.matches(selector, [found]);
        };
        parents = parents.concat(found);
      };
      return qxWeb.$init(parents, qxWeb);
    },
    /**
    * Checks if any element of the current collection is child of any element of a given
    * parent collection.
    *
    * @attach{qxWeb}
    * @param parent {qxWeb | String} Collection or selector of the parent collection to check.
    * @return {Boolean} Returns true if at least one element of the current collection is child of the parent collection
    *
    */
    isChildOf : function(parent){

      if(this.length == 0){

        return false;
      };
      var ancestors = null,parentCollection = qxWeb(parent),isChildOf = false;
      for(var i = 0,l = this.length;i < l && !isChildOf;i++){

        ancestors = qxWeb(this[i]).getAncestors();
        for(var j = 0,len = parentCollection.length;j < len;j++){

          if(ancestors.indexOf(parentCollection[j]) != -1){

            isChildOf = true;
            break;
          };
        };
      };
      return isChildOf;
    },
    /**
     * Gets a set of elements containing all ancestors of each element in the
     * collection.
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {qxWeb}
     * @param filter {String?null} Optional selector to match
     * @return {qxWeb} Collection containing the ancestor elements
     */
    getAncestors : function(filter){

      return this.__getAncestors(null, filter);
    },
    /**
     * Gets a set of elements containing all ancestors of each element in the
     * collection, up to (but not including) the element matched by the provided
     * selector.
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {qxWeb}
     * @param selector {String} Selector that indicates where to stop including
     * ancestor elements
     * @param filter {String?null} Optional selector to match
     * @return {qxWeb} Collection containing the ancestor elements
     */
    getAncestorsUntil : function(selector, filter){

      return this.__getAncestors(selector, filter);
    },
    /**
     * Internal helper for getAncestors and getAncestorsUntil
     *
     * @attach {qxWeb}
     * @param selector {String} Selector that indicates where to stop including
     * ancestor elements
     * @param filter {String?null} Optional selector to match
     * @return {qxWeb} Collection containing the ancestor elements
     * @internal
     */
    __getAncestors : function(selector, filter){

      var ancestors = [];
      for(var i = 0;i < this.length;i++){

        var parent = qx.dom.Element.getParentElement(this[i]);
        while(parent){

          var found = [parent];
          if(selector && qx.bom.Selector.matches(selector, found).length > 0){

            break;
          };
          if(filter){

            found = qx.bom.Selector.matches(filter, found);
          };
          ancestors = ancestors.concat(found);
          parent = qx.dom.Element.getParentElement(parent);
        };
      };
      return qxWeb.$init(ancestors, qxWeb);
    },
    /**
     * Gets a set containing the closest matching ancestor for each item in
     * the collection.
     * If the item itself matches, it is added to the new set. Otherwise, the
     * item's parent chain will be traversed until a match is found.
     *
     * @attach {qxWeb}
     * @param selector {String} Selector expression to match
     * @return {qxWeb} New collection containing the closest matching ancestors
     */
    getClosest : function(selector){

      var closest = [];
      var findClosest = function(current){

        var found = qx.bom.Selector.matches(selector, current);
        if(found.length){

          closest.push(found[0]);
        } else {

          current = current.getParents();
          // One up
          if(current[0] && current[0].parentNode){

            findClosest(current);
          };
        };
      };
      for(var i = 0;i < this.length;i++){

        findClosest(qxWeb(this[i]));
      };
      return qxWeb.$init(closest, qxWeb);
    },
    /**
     * Searches the child elements of each item in the collection and returns
     * a new collection containing the children that match the provided selector
     *
     * @attach {qxWeb}
     * @param selector {String} Selector expression to match the child elements
     * against
     * @return {qxWeb} New collection containing the matching child elements
     */
    find : function(selector){

      var found = [];
      for(var i = 0;i < this.length;i++){

        found = found.concat(qx.bom.Selector.query(selector, this[i]));
      };
      return qxWeb.$init(found, qxWeb);
    },
    /**
     * Gets a new set of elements containing the child nodes of each item in the
     * current set.
     *
     * @attach {qxWeb}
     * @return {qxWeb} New collection containing the child nodes
     */
    getContents : function(){

      var found = [];
      this._forEachElement(function(item){

        found = found.concat(qx.lang.Array.fromCollection(item.childNodes));
      });
      return qxWeb.$init(found, qxWeb);
    },
    /**
     * Checks if at least one element in the collection passes the provided
     * filter. This can be either a selector expression or a filter
     * function
     *
     * @attach {qxWeb}
     * @param selector {String|Function} Selector expression or filter function
     * @return {Boolean} <code>true</code> if at least one element matches
     */
    is : function(selector){

      if(qx.lang.Type.isFunction(selector)){

        return this.filter(selector).length > 0;
      };
      return !!selector && qx.bom.Selector.matches(selector, this).length > 0;
    },
    /**
     * Reduce the set of matched elements to a single element.
     *
     * @attach {qxWeb}
     * @param index {Number} The position of the element in the collection
     * @return {qxWeb} A new collection containing one element
     */
    eq : function(index){

      return this.slice(index, +index + 1);
    },
    /**
     * Reduces the collection to the first element.
     *
     * @attach {qxWeb}
     * @return {qxWeb} A new collection containing one element
     */
    getFirst : function(){

      return this.slice(0, 1);
    },
    /**
     * Reduces the collection to the last element.
     *
     * @attach {qxWeb}
     * @return {qxWeb} A new collection containing one element
     */
    getLast : function(){

      return this.slice(this.length - 1);
    },
    /**
     * Gets a collection containing only the elements that have descendants
     * matching the given selector
     *
     * @attach {qxWeb}
     * @param selector {String} Selector expression
     * @return {qxWeb} a new collection containing only elements with matching descendants
     */
    has : function(selector){

      var found = [];
      this._forEachElement(function(item, index){

        var descendants = qx.bom.Selector.matches(selector, this.eq(index).getContents());
        if(descendants.length > 0){

          found.push(item);
        };
      });
      return qxWeb.$init(found, this.constructor);
    },
    /**
     * Returns a new collection containing only those nodes that
     * contain the given element. Also accepts a qxWeb
     * collection or an Array of elements. In those cases, the first element
     * in the list is used.
     *
     * @attach {qxWeb}
     * @param element {Element|Window|Element[]|qxWeb} element to check for.
     * @return {qxWeb} Collection with matching items
     */
    contains : function(element){

      // qxWeb does not inherit from Array in IE
      if(element instanceof Array || element instanceof qxWeb){

        element = element[0];
      };
      if(!element){

        return qxWeb();
      };
      if(qx.dom.Node.isWindow(element)){

        element = element.document;
      };
      return this.filter(function(el){

        if(qx.dom.Node.isWindow(el)){

          el = el.document;
        };
        return qx.dom.Hierarchy.contains(el, element);
      });
    },
    /**
     * Gets a collection containing the next sibling element of each item in
     * the current set.
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {qxWeb}
     * @param selector {String?} Optional selector expression
     * @return {qxWeb} New set containing next siblings
     */
    getNext : function(selector){

      var found = this.map(qx.dom.Hierarchy.getNextElementSibling, qx.dom.Hierarchy);
      if(selector){

        found = qxWeb.$init(qx.bom.Selector.matches(selector, found), qxWeb);
      };
      return found;
    },
    /**
     * Gets a collection containing all following sibling elements of each
     * item in the current set.
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {qxWeb}
     * @param selector {String?} Optional selector expression
     * @return {qxWeb} New set containing following siblings
     */
    getNextAll : function(selector){

      var ret = qx.module.Traversing.__hierarchyHelper(this, "getNextSiblings", selector);
      return qxWeb.$init(ret, qxWeb);
    },
    /**
     * Gets a collection containing the following sibling elements of each
     * item in the current set up to but not including any element that matches
     * the given selector.
     *
     * @attach {qxWeb}
     * @param selector {String?} Optional selector expression
     * @return {qxWeb} New set containing following siblings
     */
    getNextUntil : function(selector){

      var found = [];
      this.forEach(function(item, index){

        var nextSiblings = qx.dom.Hierarchy.getNextSiblings(item);
        for(var i = 0,l = nextSiblings.length;i < l;i++){

          if(qx.bom.Selector.matches(selector, [nextSiblings[i]]).length > 0){

            break;
          };
          found.push(nextSiblings[i]);
        };
      });
      return qxWeb.$init(found, qxWeb);
    },
    /**
     * Gets a collection containing the previous sibling element of each item in
     * the current set.
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {qxWeb}
     * @param selector {String?} Optional selector expression
     * @return {qxWeb} New set containing previous siblings
     */
    getPrev : function(selector){

      var found = this.map(qx.dom.Hierarchy.getPreviousElementSibling, qx.dom.Hierarchy);
      if(selector){

        found = qxWeb.$init(qx.bom.Selector.matches(selector, found), qxWeb);
      };
      return found;
    },
    /**
     * Gets a collection containing all preceding sibling elements of each
     * item in the current set.
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {qxWeb}
     * @param selector {String?} Optional selector expression
     * @return {qxWeb} New set containing preceding siblings
     */
    getPrevAll : function(selector){

      var ret = qx.module.Traversing.__hierarchyHelper(this, "getPreviousSiblings", selector);
      return qxWeb.$init(ret, qxWeb);
    },
    /**
     * Gets a collection containing the preceding sibling elements of each
     * item in the current set up to but not including any element that matches
     * the given selector.
     *
     * @attach {qxWeb}
     * @param selector {String?} Optional selector expression
     * @return {qxWeb} New set containing preceding siblings
     */
    getPrevUntil : function(selector){

      var found = [];
      this.forEach(function(item, index){

        var previousSiblings = qx.dom.Hierarchy.getPreviousSiblings(item);
        for(var i = 0,l = previousSiblings.length;i < l;i++){

          if(qx.bom.Selector.matches(selector, [previousSiblings[i]]).length > 0){

            break;
          };
          found.push(previousSiblings[i]);
        };
      });
      return qxWeb.$init(found, qxWeb);
    },
    /**
     * Gets a collection containing all sibling elements of the items in the
     * current set.
     * This set can be filtered with an optional expression that will cause only
     * elements matching the selector to be collected.
     *
     * @attach {qxWeb}
     * @param selector {String?} Optional selector expression
     * @return {qxWeb} New set containing sibling elements
     */
    getSiblings : function(selector){

      var ret = qx.module.Traversing.__hierarchyHelper(this, "getSiblings", selector);
      return qxWeb.$init(ret, qxWeb);
    },
    /**
     * Remove elements from the collection that do not pass the given filter.
     * This can be either a selector expression or a filter function
     *
     * @attach {qxWeb}
     * @param selector {String|Function} Selector or filter function
     * @return {qxWeb} Reduced collection
     */
    not : function(selector){

      if(qx.lang.Type.isFunction(selector)){

        return this.filter(function(item, index, obj){

          return !selector(item, index, obj);
        });
      };
      var res = qx.bom.Selector.matches(selector, this);
      return this.filter(function(value){

        return res.indexOf(value) === -1;
      });
    },
    /**
     * Gets a new collection containing the offset parent of each item in the
     * current set.
     *
     * @attach {qxWeb}
     * @return {qxWeb} New collection containing offset parents
     */
    getOffsetParent : function(){

      return this.map(qx.bom.element.Location.getOffsetParent);
    },
    /**
     * Whether the first element in the collection is inserted into
     * the document for which it was created.
     *
     * @attach {qxWeb}
     * @return {Boolean} <code>true</code> when the element is inserted
     *    into the document.
     */
    isRendered : function(){

      if(!this[0]){

        return false;
      };
      return qx.dom.Hierarchy.isRendered(this[0]);
    },
    /**
     * Checks if the given object is a DOM element
     *
     * @attachStatic{qxWeb}
     * @param element {Object} Object to check
     * @return {Boolean} <code>true</code> if the object is a DOM element
     */
    isElement : function(element){

      return qx.dom.Node.isElement(element);
    },
    /**
     * Checks if the given object is a DOM node
     *
     * @attachStatic{qxWeb}
     * @param node {Object} Object to check
     * @return {Boolean} <code>true</code> if the object is a DOM node
     */
    isNode : function(node){

      return qx.dom.Node.isNode(node);
    },
    /**
     * Whether the node has the given node name
     *
     * @attachStatic{qxWeb}
     * @param node {Node} the node to check
     * @param  nodeName {String} the node name to check for
     * @return {Boolean} <code>true</code> if the node has the given name
     */
    isNodeName : function(node, nodeName){

      return qx.dom.Node.isNodeName(node, nodeName);
    },
    /**
     * Checks if the given object is a DOM document object
     *
     * @attachStatic{qxWeb}
     * @param node {Object} Object to check
     * @return {Boolean} <code>true</code> if the object is a DOM document
     */
    isDocument : function(node){

      return qx.dom.Node.isDocument(node);
    },
    /**
     * Returns the DOM2 <code>defaultView</code> (window) for the given node.
     *
     * @attachStatic{qxWeb}
     * @param node {Node|Document|Window} Node to inspect
     * @return {Window} the <code>defaultView</code> for the given node
     */
    getWindow : function(node){

      return qx.dom.Node.getWindow(node);
    },
    /**
     * Checks whether the given object is a DOM text node
     *
     * @attachStatic{qxWeb}
     * @param obj {Object} the object to be tested
     * @return {Boolean} <code>true</code> if the object is a textNode
     */
    isTextNode : function(obj){

      return qx.dom.Node.isText(obj);
    },
    /**
     * Check whether the given object is a browser window object.
     *
     * @attachStatic{qxWeb}
     * @param obj {Object} the object to be tested
     * @return {Boolean} <code>true</code> if the object is a window object
     */
    isWindow : function(obj){

      return qx.dom.Node.isWindow(obj);
    },
    /**
     * Returns the owner document of the given node
     *
     * @attachStatic{qxWeb}
     * @param node {Node} Node to get the document for
     * @return {Document|null} The document of the given DOM node
     */
    getDocument : function(node){

      return qx.dom.Node.getDocument(node);
    },
    /**
     * Get the DOM node's name as a lowercase string
     *
     * @attachStatic{qxWeb}
     * @param node {Node} DOM Node
     * @return {String} node name
     */
    getNodeName : function(node){

      return qx.dom.Node.getName(node);
    },
    /**
     * Returns the text content of a node where the node type may be one of
     * NODE_ELEMENT, NODE_ATTRIBUTE, NODE_TEXT, NODE_CDATA
     *
     * @attachStatic{qxWeb}
     * @param node {Node} the node from where the search should start. If the
     * node has subnodes the text contents are recursively retreived and joined
     * @return {String} the joined text content of the given node or null if not
     * appropriate.
     */
    getNodeText : function(node){

      return qx.dom.Node.getText(node);
    },
    /**
     * Checks if the given node is a block node
     *
     * @attachStatic{qxWeb}
     * @param node {Node} the node to check
     * @return {Boolean} <code>true</code> if the node is a block node
     */
    isBlockNode : function(node){

      return qx.dom.Node.isBlockNode(node);
    },
    /**
     * Determines if two DOM nodes are equal as defined in the
     * <a href="http://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-isEqualNode">DOM Level 3 isEqualNode spec</a>.
     * Also works in legacy browsers without native <em>isEqualNode</em> support.
     *
     * @attachStatic{qxWeb}
     * @param node1 {String|Element|Element[]|qxWeb} first object to compare
     * @param node2 {String|Element|Element[]|qxWeb} second object to compare
     * @return {Boolean} <code>true</code> if the nodes are equal
     */
    equalNodes : function(node1, node2){

      node1 = qx.module.Traversing.__getNodeFromArgument(node1);
      node2 = qx.module.Traversing.__getNodeFromArgument(node2);
      if(!node1 || !node2){

        return false;
      };
      if(qx.core.Environment.get("html.node.isequalnode")){

        return node1.isEqualNode(node2);
      } else {

        if(node1 === node2){

          return true;
        };
        // quick attributes length check
        var hasAttributes = node1.attributes && node2.attributes;
        if(hasAttributes && node1.attributes.length !== node2.attributes.length){

          return false;
        };
        var hasChildNodes = node1.childNodes && node2.childNodes;
        // quick childNodes length check
        if(hasChildNodes && node1.childNodes.length !== node2.childNodes.length){

          return false;
        };
        // string attribute check
        var domAttributes = qx.module.Traversing.EQUALITY_ATTRIBUTES;
        for(var i = 0,l = domAttributes.length;i < l;i++){

          var domAttrib = domAttributes[i];
          if(node1[domAttrib] !== node2[domAttrib]){

            return false;
          };
        };
        // attribute values
        if(hasAttributes){

          var node1Attributes = qx.module.Traversing.__getAttributes(node1);
          var node2Attributes = qx.module.Traversing.__getAttributes(node2);
          for(var attr in node1Attributes){

            if(node1Attributes[attr] !== node2Attributes[attr]){

              return false;
            };
          };
        };
        // child nodes
        if(hasChildNodes){

          for(var j = 0,m = node1.childNodes.length;j < m;j++){

            var child1 = node1.childNodes[j];
            var child2 = node2.childNodes[j];
            if(!qx.module.Traversing.equalNodes(child1, child2)){

              return false;
            };
          };
        };
        return true;
      };
    },
    /**
     * Helper that attempts to convert the given argument into a DOM node
     * @param arg {var} object to convert
     * @return {Node|null} DOM node or null if the conversion failed
     */
    __getNodeFromArgument : function(arg){

      if(typeof arg == "string"){

        arg = qxWeb(arg);
      };
      if(arg instanceof Array || arg instanceof qxWeb){

        arg = arg[0];
      };
      return qxWeb.isNode(arg) ? arg : null;
    },
    /**
     * Returns a map containing the given DOM node's attribute names
     * and values
     *
     * @param node {Node} DOM node
     * @return {Map} Map of attribute names/values
     */
    __getAttributes : function(node){

      var attributes = {
      };
      for(var attr in node.attributes){

        if(attr == "length"){

          continue;
        };
        var name = node.attributes[attr].name;
        var value = node.attributes[attr].value;
        attributes[name] = value;
      };
      return attributes;
    },
    /**
     * Helper function that iterates over a set of items and applies the given
     * qx.dom.Hierarchy method to each entry, storing the results in a new Array.
     * Duplicates are removed and the items are filtered if a selector is
     * provided.
     *
     * @attach{qxWeb}
     * @param collection {Array} Collection to iterate over (any Array-like object)
     * @param method {String} Name of the qx.dom.Hierarchy method to apply
     * @param selector {String?} Optional selector that elements to be included
     * must match
     * @return {Array} Result array
     * @internal
     */
    __hierarchyHelper : function(collection, method, selector){

      // Iterate ourself, as we want to directly combine the result
      var all = [];
      var Hierarchy = qx.dom.Hierarchy;
      for(var i = 0,l = collection.length;i < l;i++){

        all.push.apply(all, Hierarchy[method](collection[i]));
      };
      // Remove duplicates
      var ret = qx.lang.Array.unique(all);
      // Post reduce result by selector
      if(selector){

        ret = qx.bom.Selector.matches(selector, ret);
      };
      return ret;
    }
  },
  defer : function(statics){

    qxWeb.$attach({
      "add" : statics.add,
      "getChildren" : statics.getChildren,
      "forEach" : statics.forEach,
      "getParents" : statics.getParents,
      "getAncestors" : statics.getAncestors,
      "getAncestorsUntil" : statics.getAncestorsUntil,
      "__getAncestors" : statics.__getAncestors,
      "getClosest" : statics.getClosest,
      "find" : statics.find,
      "getContents" : statics.getContents,
      "is" : statics.is,
      "eq" : statics.eq,
      "getFirst" : statics.getFirst,
      "getLast" : statics.getLast,
      "has" : statics.has,
      "getNext" : statics.getNext,
      "getNextAll" : statics.getNextAll,
      "getNextUntil" : statics.getNextUntil,
      "getPrev" : statics.getPrev,
      "getPrevAll" : statics.getPrevAll,
      "getPrevUntil" : statics.getPrevUntil,
      "getSiblings" : statics.getSiblings,
      "not" : statics.not,
      "getOffsetParent" : statics.getOffsetParent,
      "isRendered" : statics.isRendered,
      "isChildOf" : statics.isChildOf,
      "contains" : statics.contains
    });
    qxWeb.$attachStatic({
      "isElement" : statics.isElement,
      "isNode" : statics.isNode,
      "isNodeName" : statics.isNodeName,
      "isDocument" : statics.isDocument,
      "getDocument" : statics.getDocument,
      "getWindow" : statics.getWindow,
      "isWindow" : statics.isWindow,
      "isBlockNode" : statics.isBlockNode,
      "getNodeName" : statics.getNodeName,
      "getNodeText" : statics.getNodeText,
      "isTextNode" : statics.isTextNode,
      "equalNodes" : statics.equalNodes
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */
/**
 * The class is responsible for device detection. This is specially usefull
 * if you are on a mobile device.
 *
 * This class is used by {@link qx.core.Environment} and should not be used
 * directly. Please check its class comment for details how to use it.
 *
 * @internal
 */
qx.Bootstrap.define("qx.bom.client.Device", {
  statics : {
    /** Maps user agent names to device IDs */
    __ids : {
      "iPod" : "ipod",
      "iPad" : "ipad",
      "iPhone" : "iPhone",
      "PSP" : "psp",
      "PLAYSTATION 3" : "ps3",
      "Nintendo Wii" : "wii",
      "Nintendo DS" : "ds",
      "XBOX" : "xbox",
      "Xbox" : "xbox"
    },
    /**
     * Returns the name of the current device if detectable. It falls back to
     * <code>pc</code> if the detection for other devices fails.
     *
     * @internal
     * @return {String} The string of the device found.
     */
    getName : function(){

      var str = [];
      for(var key in this.__ids){

        str.push(key);
      };
      var reg = new RegExp("(" + str.join("|").replace(/\./g, "\.") + ")", "g");
      var match = reg.exec(navigator.userAgent);
      if(match && match[1]){

        return qx.bom.client.Device.__ids[match[1]];
      };
      return "pc";
    },
    /**
     * Determines on what type of device the application is running.
     * Valid values are: "mobile", "tablet" or "desktop".
     * @return {String} The device type name of determined device.
     */
    getType : function(){

      return qx.bom.client.Device.detectDeviceType(navigator.userAgent);
    },
    /**
     * Detects the device type, based on given userAgentString.
     *
     * @param userAgentString {String} userAgent parameter, needed for decision.
     * @return {String} The device type name of determined device: "mobile","desktop","tablet"
     */
    detectDeviceType : function(userAgentString){

      if(qx.bom.client.Device.detectTabletDevice(userAgentString)){

        return "tablet";
      } else if(qx.bom.client.Device.detectMobileDevice(userAgentString)){

        return "mobile";
      };
      return "desktop";
    },
    /**
     * Detects if a device is a mobile phone. (Tablets excluded.)
     * @param userAgentString {String} userAgent parameter, needed for decision.
     * @return {Boolean} Flag which indicates whether it is a mobile device.
     */
    detectMobileDevice : function(userAgentString){

      return /android.+mobile|ip(hone|od)|bada\/|blackberry|BB10|maemo|opera m(ob|in)i|fennec|NetFront|phone|psp|symbian|IEMobile|windows (ce|phone)|xda/i.test(userAgentString);
    },
    /**
     * Detects if a device is a tablet device.
     * @param userAgentString {String} userAgent parameter, needed for decision.
     * @return {Boolean} Flag which indicates whether it is a tablet device.
     */
    detectTabletDevice : function(userAgentString){

      var isIE10Tablet = (/MSIE 10/i.test(userAgentString)) && (/ARM/i.test(userAgentString)) && !(/windows phone/i.test(userAgentString));
      var isCommonTablet = (!(/Fennec|HTC.Magic|Nexus|android.+mobile|Tablet PC/i.test(userAgentString)) && (/Android|ipad|tablet|playbook|silk|kindle|psp/i.test(userAgentString)));
      return isIE10Tablet || isCommonTablet;
    },
    /**
     * Detects the device's pixel ratio. Returns 1 if detection is not possible.
     *
     * @return {Number} The device's pixel ratio
     */
    getDevicePixelRatio : function(){

      if(typeof window.devicePixelRatio !== "undefined"){

        return window.devicePixelRatio;
      };
      return 1;
    },
    /**
     * Detects if either touch events or pointer events are supported.
     * Additionally it checks if touch is enabled for pointer events.
     *
     * @return {Boolean} <code>true</code>, if the device supports touch
     */
    getTouch : function(){

      return (("ontouchstart" in window) || window.navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0);
    }
  },
  defer : function(statics){

    qx.core.Environment.add("device.name", statics.getName);
    qx.core.Environment.add("device.touch", statics.getTouch);
    qx.core.Environment.add("device.type", statics.getType);
    qx.core.Environment.add("device.pixelRatio", statics.getDevicePixelRatio);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */
/**
 * Internal class which contains the checks used by {@link qx.core.Environment}.
 * All checks in here are marked as internal which means you should never use
 * them directly.
 *
 * This class should contain all checks about events.
 *
 * @internal
 */
qx.Bootstrap.define("qx.bom.client.Event", {
  statics : {
    /**
     * Checks if touch events are supported.
     *
     * @internal
     * @return {Boolean} <code>true</code> if touch events are supported.
     */
    getTouch : function(){

      return ("ontouchstart" in window);
    },
    /**
     * Checks if MSPointer events are available.
     *
     * @internal
     * @return {Boolean} <code>true</code> if pointer events are supported.
     */
    getMsPointer : function(){

      if("pointerEnabled" in window.navigator){

        return window.navigator.pointerEnabled;
      } else if("msPointerEnabled" in window.navigator){

        return window.navigator.msPointerEnabled;
      };
      return false;
    },
    /**
     * Checks if the proprietary <code>help</code> event is available.
     *
     * @internal
     * @return {Boolean} <code>true</code> if the "help" event is supported.
     */
    getHelp : function(){

      return ("onhelp" in document);
    },
    /**
     * Checks if the <code>hashchange</code> event is available
     *
     * @internal
     * @return {Boolean} <code>true</code> if the "hashchange" event is supported.
     */
    getHashChange : function(){

      // avoid false positive in IE7
      var engine = qx.bom.client.Engine.getName();
      var hashchange = "onhashchange" in window;
      return (engine !== "mshtml" && hashchange) || (engine === "mshtml" && "documentMode" in document && document.documentMode >= 8 && hashchange);
    }
  },
  defer : function(statics){

    qx.core.Environment.add("event.touch", statics.getTouch);
    qx.core.Environment.add("event.mspointer", statics.getMsPointer);
    qx.core.Environment.add("event.help", statics.getHelp);
    qx.core.Environment.add("event.hashchange", statics.getHashChange);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * Module for querying information about the environment / runtime.
 * It adds a static key <code>env</code> to qxWeb and offers the given methods.
 *
 * <pre class="javascript">
 * q.env.get("engine.name"); // return "webkit" e.g.
 * </pre>
 *
 * The following values are predefined:
 *
 * * <code>browser.name</code> : The name of the browser
 * * <code>browser.version</code> : The version of the browser
 * * <code>browser.quirksmode</code>  : <code>true</code> if the browser is in quirksmode
 * * <code>browser.documentmode</code> : The document mode of the browser
 *
 * * <code>device.name</code> : The name of the device e.g. <code>iPad</code>.
 * * <code>device.type</code> : Either <code>desktop</code>, <code>tablet</code> or <code>mobile</code>.
 *
 * * <code>engine.name</code> : The name of the browser engine
 * * <code>engine.version</code> : The version of the browser engine
 * @group (Core)
 */
qx.Bootstrap.define("qx.module.Environment", {
  statics : {
    /**
     * Get the value stored for the given key.
     *
     * @attachStatic {qxWeb, env.get}
     * @param key {String} The key to check for.
     * @return {var} The value stored for the given key.
     * @lint environmentNonLiteralKey(key)
     */
    get : function(key){

      return qx.core.Environment.get(key);
    },
    /**
     * Adds a new environment setting which can be queried via {@link #get}.
     * @param key {String} The key to store the value for.
     *
     * @attachStatic {qxWeb, env.add}
     * @param value {var} The value to store.
     * @return {qxWeb} The collection for chaining.
     */
    add : function(key, value){

      qx.core.Environment.add(key, value);
      return this;
    }
  },
  defer : function(statics){

    // make sure the desired keys are available (browser.* and engine.*)
    qx.core.Environment.get("browser.name");
    qx.core.Environment.get("browser.version");
    qx.core.Environment.get("browser.quirksmode");
    qx.core.Environment.get("browser.documentmode");
    qx.core.Environment.get("engine.name");
    qx.core.Environment.get("engine.version");
    qx.core.Environment.get("device.type");
    qx.core.Environment.get("event.touch");
    qx.core.Environment.get("event.mspointer");
    qxWeb.$attachStatic({
      "env" : {
        get : statics.get,
        add : statics.add
      }
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2011-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)
     * Daniel Wagner (danielwagner)

************************************************************************ */
/**
 * Attribute/Property handling for DOM elements.
 * @group (Core)
 */
qx.Bootstrap.define("qx.module.Attribute", {
  statics : {
    /**
     * Returns the HTML content of the first item in the collection
     * @attach {qxWeb}
     * @return {String|null} HTML content or null if the collection is empty
     */
    getHtml : function(){

      if(this[0] && this[0].nodeType === 1){

        return qx.bom.element.Attribute.get(this[0], "html");
      };
      return null;
    },
    /**
     * Sets the HTML content of each item in the collection
     *
     * @attach {qxWeb}
     * @param html {String} HTML string
     * @return {qxWeb} The collection for chaining
     */
    setHtml : function(html){

      html = qx.bom.Html.fixEmptyTags(html);
      this._forEachElement(function(item){

        qx.bom.element.Attribute.set(item, "html", html);
      });
      return this;
    },
    /**
     * Sets an HTML attribute on each item in the collection
     *
     * @attach {qxWeb}
     * @param name {String} Attribute name
     * @param value {var} Attribute value
     * @return {qxWeb} The collection for chaining
     */
    setAttribute : function(name, value){

      this._forEachElement(function(item){

        qx.bom.element.Attribute.set(item, name, value);
      });
      return this;
    },
    /**
     * Returns the value of the given attribute for the first item in the
     * collection.
     *
     * @attach {qxWeb}
     * @param name {String} Attribute name
     * @return {var} Attribute value
     */
    getAttribute : function(name){

      if(this[0] && this[0].nodeType === 1){

        return qx.bom.element.Attribute.get(this[0], name);
      };
      return null;
    },
    /**
     * Removes the given attribute from all elements in the collection
     *
     * @attach {qxWeb}
     * @param name {String} Attribute name
     * @return {qxWeb} The collection for chaining
     */
    removeAttribute : function(name){

      this._forEachElement(function(item){

        qx.bom.element.Attribute.set(item, name, null);
      });
      return this;
    },
    /**
     * Sets multiple attributes for each item in the collection.
     *
     * @attach {qxWeb}
     * @param attributes {Map} A map of attribute name/value pairs
     * @return {qxWeb} The collection for chaining
     */
    setAttributes : function(attributes){

      for(var name in attributes){

        this.setAttribute(name, attributes[name]);
      };
      return this;
    },
    /**
     * Returns the values of multiple attributes for the first item in the collection
     *
     * @attach {qxWeb}
     * @param names {String[]} List of attribute names
     * @return {Map} Map of attribute name/value pairs
     */
    getAttributes : function(names){

      var attributes = {
      };
      for(var i = 0;i < names.length;i++){

        attributes[names[i]] = this.getAttribute(names[i]);
      };
      return attributes;
    },
    /**
     * Removes multiple attributes from each item in the collection.
     *
     * @attach {qxWeb}
     * @param attributes {String[]} List of attribute names
     * @return {qxWeb} The collection for chaining
     */
    removeAttributes : function(attributes){

      for(var i = 0,l = attributes.length;i < l;i++){

        this.removeAttribute(attributes[i]);
      };
      return this;
    },
    /**
     * Sets a property on each item in the collection
     *
     * @attach {qxWeb}
     * @param name {String} Property name
     * @param value {var} Property value
     * @return {qxWeb} The collection for chaining
     */
    setProperty : function(name, value){

      for(var i = 0;i < this.length;i++){

        this[i][name] = value;
      };
      return this;
    },
    /**
     * Returns the value of the given property for the first item in the
     * collection
     *
     * @attach {qxWeb}
     * @param name {String} Property name
     * @return {var} Property value
     */
    getProperty : function(name){

      if(this[0]){

        return this[0][name];
      };
      return null;
    },
    /**
     * Sets multiple properties for each item in the collection.
     *
     * @attach {qxWeb}
     * @param properties {Map} A map of property name/value pairs
     * @return {qxWeb} The collection for chaining
     */
    setProperties : function(properties){

      for(var name in properties){

        this.setProperty(name, properties[name]);
      };
      return this;
    },
    /**
     * Returns the values of multiple properties for the first item in the collection
     *
     * @attach {qxWeb}
     * @param names {String[]} List of property names
     * @return {Map} Map of property name/value pairs
     */
    getProperties : function(names){

      var properties = {
      };
      for(var i = 0;i < names.length;i++){

        properties[names[i]] = this.getProperty(names[i]);
      };
      return properties;
    },
    /**
     * Returns the currently configured value for the first item in the collection.
     * Works with simple input fields as well as with select boxes or option
     * elements. Returns an array for select boxes with multi selection. In all
     * other cases, a string is returned.
     *
     * @attach {qxWeb}
     * @return {String|String[]} String value or Array of string values (for multiselect)
     */
    getValue : function(){

      if(this[0] && this[0].nodeType === 1){

        return qx.bom.Input.getValue(this[0]);
      };
      return null;
    },
    /**
     * Applies the given value to each element in the collection.
     * Normally the value is given as a string/number value and applied to the
     * field content (textfield, textarea) or used to detect whether the field
     * is checked (checkbox, radiobutton).
     * Supports array values for selectboxes (multiple selection) and checkboxes
     * or radiobuttons (for convenience).
     * Please note: To modify the value attribute of a checkbox or radiobutton
     * use @link{#set} instead.
     *
     * @attach {qxWeb}
     * @param value {String|Number|Array} The value to apply
     * @return {qxWeb} The collection for chaining
     */
    setValue : function(value){

      this._forEachElement(function(item){

        qx.bom.Input.setValue(item, value);
      });
      return this;
    }
  },
  defer : function(statics){

    qxWeb.$attach({
      "getHtml" : statics.getHtml,
      "setHtml" : statics.setHtml,
      "getAttribute" : statics.getAttribute,
      "setAttribute" : statics.setAttribute,
      "removeAttribute" : statics.removeAttribute,
      "getAttributes" : statics.getAttributes,
      "setAttributes" : statics.setAttributes,
      "removeAttributes" : statics.removeAttributes,
      "getProperty" : statics.getProperty,
      "setProperty" : statics.setProperty,
      "getProperties" : statics.getProperties,
      "setProperties" : statics.setProperties,
      "getValue" : statics.getValue,
      "setValue" : statics.setValue
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2009 Sebastian Werner, http://sebastian-werner.net

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

   ======================================================================

   This class contains code based on the following work:

   * jQuery
     http://jquery.com
     Version 1.3.1

     Copyright:
       2009 John Resig

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

************************************************************************ */
/**
 * This class is mainly a convenience wrapper for DOM elements to
 * qooxdoo's event system.
 *
 * @ignore(qxWeb)
 */
qx.Bootstrap.define("qx.bom.Html", {
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    /**
     * Helper method for XHTML replacement.
     *
     * @param all {String} Complete string
     * @param front {String} Front of the match
     * @param tag {String} Tag name
     * @return {String} XHTML corrected tag
     */
    __fixNonDirectlyClosableHelper : function(all, front, tag){

      return tag.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i) ? all : front + "></" + tag + ">";
    },
    /** @type {Map} Contains wrap fragments for specific HTML matches */
    __convertMap : {
      opt : [1, "<select multiple='multiple'>", "</select>"],
      // option or optgroup
      leg : [1, "<fieldset>", "</fieldset>"],
      table : [1, "<table>", "</table>"],
      tr : [2, "<table><tbody>", "</tbody></table>"],
      td : [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      col : [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
      def : qx.core.Environment.select("engine.name", {
        "mshtml" : [1, "div<div>", "</div>"],
        "default" : null
      })
    },
    /**
     * Fixes "XHTML"-style tags in all browsers.
     * Replaces tags which are not allowed to be closed directly such as
     * <code>div</code> or <code>p</code>. They are patched to use opening and
     * closing tags instead, e.g. <code>&lt;p&gt;</code> => <code>&lt;p&gt;&lt;/p&gt;</code>
     *
     * @param html {String} HTML to fix
     * @return {String} Fixed HTML
     */
    fixEmptyTags : function(html){

      return html.replace(/(<(\w+)[^>]*?)\/>/g, this.__fixNonDirectlyClosableHelper);
    },
    /**
     * Translates a HTML string into an array of elements.
     *
     * @param html {String} HTML string
     * @param context {Document} Context document in which (helper) elements should be created
     * @return {Array} List of resulting elements
     */
    __convertHtmlString : function(html, context){

      var div = context.createElement("div");
      html = qx.bom.Html.fixEmptyTags(html);
      // Trim whitespace, otherwise indexOf won't work as expected
      var tags = html.replace(/^\s+/, "").substring(0, 5).toLowerCase();
      // Auto-wrap content into required DOM structure
      var wrap,map = this.__convertMap;
      if(!tags.indexOf("<opt")){

        wrap = map.opt;
      } else if(!tags.indexOf("<leg")){

        wrap = map.leg;
      } else if(tags.match(/^<(thead|tbody|tfoot|colg|cap)/)){

        wrap = map.table;
      } else if(!tags.indexOf("<tr")){

        wrap = map.tr;
      } else if(!tags.indexOf("<td") || !tags.indexOf("<th")){

        wrap = map.td;
      } else if(!tags.indexOf("<col")){

        wrap = map.col;
      } else {

        wrap = map.def;
      };;;;;
      // Omit string concat when no wrapping is needed
      if(wrap){

        // Go to html and back, then peel off extra wrappers
        div.innerHTML = wrap[1] + html + wrap[2];
        // Move to the right depth
        var depth = wrap[0];
        while(depth--){

          div = div.lastChild;
        };
      } else {

        div.innerHTML = html;
      };
      // Fix IE specific bugs
      if((qx.core.Environment.get("engine.name") == "mshtml")){

        // Remove IE's autoinserted <tbody> from table fragments
        // String was a <table>, *may* have spurious <tbody>
        var hasBody = /<tbody/i.test(html);
        // String was a bare <thead> or <tfoot>
        var tbody = !tags.indexOf("<table") && !hasBody ? div.firstChild && div.firstChild.childNodes : wrap[1] == "<table>" && !hasBody ? div.childNodes : [];
        for(var j = tbody.length - 1;j >= 0;--j){

          if(tbody[j].tagName.toLowerCase() === "tbody" && !tbody[j].childNodes.length){

            tbody[j].parentNode.removeChild(tbody[j]);
          };
        };
        // IE completely kills leading whitespace when innerHTML is used
        if(/^\s/.test(html)){

          div.insertBefore(context.createTextNode(html.match(/^\s*/)[0]), div.firstChild);
        };
      };
      return qx.lang.Array.fromCollection(div.childNodes);
    },
    /**
     * Cleans-up the given HTML and append it to a fragment
     *
     * When no <code>context</code> is given the global document is used to
     * create new DOM elements.
     *
     * When a <code>fragment</code> is given the nodes are appended to this
     * fragment except the script tags. These are returned in a separate Array.
     *
     * Please note: HTML coming from user input must be validated prior
     * to passing it to this method. HTML is temporarily inserted to the DOM
     * using <code>innerHTML</code>. As a consequence, scripts included in
     * attribute event handlers may be executed.
     *
     * @param objs {Element[]|String[]} Array of DOM elements or HTML strings
     * @param context {Document?document} Context in which the elements should be created
     * @param fragment {Element?null} Document fragment to appends elements to
     * @return {Element[]} Array of elements (when a fragment is given it only contains script elements)
     */
    clean : function(objs, context, fragment){

      context = context || document;
      // !context.createElement fails in IE with an error but returns typeof 'object'
      if(typeof context.createElement === "undefined"){

        context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
      };
      // Fast-Path:
      // If a single string is passed in and it's a single tag
      // just do a createElement and skip the rest
      if(!fragment && objs.length === 1 && typeof objs[0] === "string"){

        var match = /^<(\w+)\s*\/?>$/.exec(objs[0]);
        if(match){

          return [context.createElement(match[1])];
        };
      };
      // Interate through items in incoming array
      var obj,ret = [];
      for(var i = 0,l = objs.length;i < l;i++){

        obj = objs[i];
        // Convert HTML string into DOM nodes
        if(typeof obj === "string"){

          obj = this.__convertHtmlString(obj, context);
        };
        // Append or merge depending on type
        if(obj.nodeType){

          ret.push(obj);
        } else if(obj instanceof qx.type.BaseArray || (typeof qxWeb !== "undefined" && obj instanceof qxWeb)){

          ret.push.apply(ret, Array.prototype.slice.call(obj, 0));
        } else if(obj.toElement){

          ret.push(obj.toElement());
        } else {

          ret.push.apply(ret, obj);
        };;
      };
      // Append to fragment and filter out scripts... or...
      if(fragment){

        return qx.bom.Html.extractScripts(ret, fragment);
      };
      // Otherwise return the array of all elements
      return ret;
    },
    /**
     * Extracts script elements from an element list. Optionally
     * attaches them to a given document fragment
     *
     * @param elements {Element[]} list of elements
     * @param fragment {Document?} document fragment
     * @return {Element[]} Array containing the script elements
     */
    extractScripts : function(elements, fragment){

      var scripts = [],elem;
      for(var i = 0;elements[i];i++){

        elem = elements[i];
        if(elem.nodeType == 1 && elem.tagName.toLowerCase() === "script" && (!elem.type || elem.type.toLowerCase() === "text/javascript")){

          // Trying to remove the element from DOM
          if(elem.parentNode){

            elem.parentNode.removeChild(elements[i]);
          };
          // Store in script list
          scripts.push(elem);
        } else {

          if(elem.nodeType === 1){

            // Recursively search for scripts and append them to the list of elements to process
            var scriptList = qx.lang.Array.fromCollection(elem.getElementsByTagName("script"));
            elements.splice.apply(elements, [i + 1, 0].concat(scriptList));
          };
          // Finally append element to fragment
          if(fragment){

            fragment.appendChild(elem);
          };
        };
      };
      return scripts;
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

   ======================================================================

   This class contains code based on the following work:

   * jQuery
     http://jquery.com
     Version 1.3.1

     Copyright:
       2009 John Resig

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

************************************************************************ */
/**
 * Cross browser abstractions to work with input elements.
 *
 * @require(qx.lang.Array#contains)
 */
qx.Bootstrap.define("qx.bom.Input", {
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    /**
     * Applies the given value to the element.
     *
     * Normally the value is given as a string/number value and applied
     * to the field content (textfield, textarea) or used to
     * detect whether the field is checked (checkbox, radiobutton).
     *
     * Supports array values for selectboxes (multiple-selection)
     * and checkboxes or radiobuttons (for convenience).
     *
     * Please note: To modify the value attribute of a checkbox or
     * radiobutton use {@link qx.bom.element.Attribute#set} instead.
     *
     * @param element {Element} element to update
     * @param value {String|Number|Array} the value to apply
     */
    setValue : function(element, value){

      var tag = element.nodeName.toLowerCase();
      var type = element.type;
      var Array = qx.lang.Array;
      var Type = qx.lang.Type;
      if(typeof value === "number"){

        value += "";
      };
      if((type === "checkbox" || type === "radio")){

        if(Type.isArray(value)){

          element.checked = Array.contains(value, element.value);
        } else {

          element.checked = element.value == value;
        };
      } else if(tag === "select"){

        var isArray = Type.isArray(value);
        var options = element.options;
        var subel,subval;
        for(var i = 0,l = options.length;i < l;i++){

          subel = options[i];
          subval = subel.getAttribute("value");
          if(subval == null){

            subval = subel.text;
          };
          subel.selected = isArray ? Array.contains(value, subval) : value == subval;
        };
        if(isArray && value.length == 0){

          element.selectedIndex = -1;
        };
      } else if((type === "text" || type === "textarea") && (qx.core.Environment.get("engine.name") == "mshtml")){

        // These flags are required to detect self-made property-change
        // events during value modification. They are used by the Input
        // event handler to filter events.
        element.$$inValueSet = true;
        element.value = value;
        element.$$inValueSet = null;
      } else {

        element.value = value;
      };;
    },
    /**
     * Returns the currently configured value.
     *
     * Works with simple input fields as well as with
     * select boxes or option elements.
     *
     * Returns an array in cases of multi-selection in
     * select boxes but in all other cases a string.
     *
     * @param element {Element} DOM element to query
     * @return {String|Array} The value of the given element
     */
    getValue : function(element){

      var tag = element.nodeName.toLowerCase();
      if(tag === "option"){

        return (element.attributes.value || {
        }).specified ? element.value : element.text;
      };
      if(tag === "select"){

        var index = element.selectedIndex;
        // Nothing was selected
        if(index < 0){

          return null;
        };
        var values = [];
        var options = element.options;
        var one = element.type == "select-one";
        var clazz = qx.bom.Input;
        var value;
        // Loop through all the selected options
        for(var i = one ? index : 0,max = one ? index + 1 : options.length;i < max;i++){

          var option = options[i];
          if(option.selected){

            // Get the specifc value for the option
            value = clazz.getValue(option);
            // We don't need an array for one selects
            if(one){

              return value;
            };
            // Multi-Selects return an array
            values.push(value);
          };
        };
        return values;
      } else {

        return (element.value || "").replace(/\r/g, "");
      };
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)
     * Daniel Wagner (danielwagner)

************************************************************************ */
/**
 * Adds JavaScript features that may not be supported by all clients.
 *
 * @require(qx.lang.normalize.Function)
 * @require(qx.lang.normalize.String)
 * @require(qx.lang.normalize.Date)
 * @require(qx.lang.normalize.Array)
 * @require(qx.lang.normalize.Error)
 * @require(qx.lang.normalize.Object)
 *
 * @group (Polyfill)
 */
qx.Bootstrap.define("qx.module.Polyfill", {
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2011-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)
     * Daniel Wagner (danielwagner)

************************************************************************ */
/**
 * Support for native and custom events.
 *
 * @require(qx.module.Polyfill)
 * @group (Core)
 */
qx.Bootstrap.define("qx.module.Event", {
  statics : {
    /**
     * Event normalization registry
     *
     * @internal
     */
    __normalizations : {
    },
    /**
     * Registry of event hooks
     * @internal
     */
    __hooks : {
      on : {
      },
      off : {
      }
    },
    /**
     * Registers a listener for the given event type on each item in the
     * collection. This can be either native or custom events.
     *
     * @attach {qxWeb}
     * @param type {String} Type of the event to listen for
     * @param listener {Function} Listener callback
     * @param context {Object?} Context the callback function will be executed in.
     * Default: The element on which the listener was registered
     * @param useCapture {Boolean?} Attach the listener to the capturing
     * phase if true
     * @return {qxWeb} The collection for chaining
     */
    on : function(type, listener, context, useCapture){

      for(var i = 0;i < this.length;i++){

        var el = this[i];
        var ctx = context || qxWeb(el);
        // call hooks
        var hooks = qx.module.Event.__hooks.on;
        // generic
        var typeHooks = hooks["*"] || [];
        // type specific
        if(hooks[type]){

          typeHooks = typeHooks.concat(hooks[type]);
        };
        for(var j = 0,m = typeHooks.length;j < m;j++){

          typeHooks[j](el, type, listener, context);
        };
        var bound = function(event){

          // apply normalizations
          var registry = qx.module.Event.__normalizations;
          // generic
          var normalizations = registry["*"] || [];
          // type specific
          if(registry[type]){

            normalizations = normalizations.concat(registry[type]);
          };
          for(var x = 0,y = normalizations.length;x < y;x++){

            event = normalizations[x](event, el, type);
          };
          // call original listener with normalized event
          listener.apply(this, [event]);
        }.bind(ctx);
        bound.original = listener;
        // add native listener
        if(qx.bom.Event.supportsEvent(el, type)){

          qx.bom.Event.addNativeListener(el, type, bound, useCapture);
        };
        // create an emitter if necessary
        if(!el.__emitter){

          el.__emitter = new qx.event.Emitter();
        };
        var id = el.__emitter.on(type, bound, ctx);
        if(!el.__listener){

          el.__listener = {
          };
        };
        if(!el.__listener[type]){

          el.__listener[type] = {
          };
        };
        el.__listener[type][id] = bound;
        if(!context){

          // store a reference to the dynamically created context so we know
          // what to check for when removing the listener
          if(!el.__ctx){

            el.__ctx = {
            };
          };
          el.__ctx[id] = ctx;
        };
      };
      return this;
    },
    /**
     * Unregisters event listeners for the given type from each element in the
     * collection.
     *
     * @attach {qxWeb}
     * @param type {String} Type of the event
     * @param listener {Function} Listener callback
     * @param context {Object?} Listener callback context
     * @param useCapture {Boolean?} Attach the listener to the capturing
     * phase if true
     * @return {qxWeb} The collection for chaining
     */
    off : function(type, listener, context, useCapture){

      var removeAll = (listener === null && context === null);
      for(var j = 0;j < this.length;j++){

        var el = this[j];
        // continue if no listeners are available
        if(!el.__listener){

          continue;
        };
        var types = [];
        if(type !== null){

          types.push(type);
        } else {

          // no type specified, remove all listeners
          for(var listenerType in el.__listener){

            types.push(listenerType);
          };
        };
        for(var i = 0,l = types.length;i < l;i++){

          for(var id in el.__listener[types[i]]){

            var storedListener = el.__listener[types[i]][id];
            if(removeAll || storedListener == listener || storedListener.original == listener){

              // get the stored context
              var hasStoredContext = typeof el.__ctx !== "undefined" && el.__ctx[id];
              var storedContext;
              if(!context && hasStoredContext){

                storedContext = el.__ctx[id];
              };
              // remove the listener from the emitter
              el.__emitter.off(types[i], storedListener, storedContext || context);
              // check if it's a bound listener which means it was a native event
              if(removeAll || storedListener.original == listener){

                // remove the native listener
                qx.bom.Event.removeNativeListener(el, types[i], storedListener, useCapture);
              };
              delete el.__listener[types[i]][id];
              if(hasStoredContext){

                delete el.__ctx[id];
              };
            };
          };
          // call hooks
          var hooks = qx.module.Event.__hooks.off;
          // generic
          var typeHooks = hooks["*"] || [];
          // type specific
          if(hooks[type]){

            typeHooks = typeHooks.concat(hooks[type]);
          };
          for(var k = 0,m = typeHooks.length;k < m;k++){

            typeHooks[k](el, type, listener, context);
          };
        };
      };
      return this;
    },
    /**
     * Removes all event listeners (or all listeners for a given type) from the
     * collection.
     *
     * @attach {qxWeb}
     * @param type {String?} Event type. All listeners will be removed if this is undefined.
     * @return {qxWeb} The collection for chaining
     */
    allOff : function(type){

      return this.off(type || null, null, null);
    },
    /**
     * Fire an event of the given type.
     *
     * @attach {qxWeb}
     * @param type {String} Event type
     * @param data {var?} Optional data that will be passed to the listener
     * callback function.
     * @return {qxWeb} The collection for chaining
     */
    emit : function(type, data){

      for(var j = 0;j < this.length;j++){

        var el = this[j];
        if(el.__emitter){

          el.__emitter.emit(type, data);
        };
      };
      return this;
    },
    /**
     * Attaches a listener for the given event that will be executed only once.
     *
     * @attach {qxWeb}
     * @param type {String} Type of the event to listen for
     * @param listener {Function} Listener callback
     * @param context {Object?} Context the callback function will be executed in.
     * Default: The element on which the listener was registered
     * @return {qxWeb} The collection for chaining
     */
    once : function(type, listener, context){

      var self = this;
      var wrappedListener = function(data){

        self.off(type, wrappedListener, context);
        listener.call(this, data);
      };
      this.on(type, wrappedListener, context);
      return this;
    },
    /**
     * Checks if one or more listeners for the given event type are attached to
     * the first element in the collection
     *
     * @attach {qxWeb}
     * @param type {String} Event type, e.g. <code>mousedown</code>
     * @param listener {Function?} Event listener to check for.
     * @param context {Object?} Context object listener to check for.
     * @return {Boolean} <code>true</code> if one or more listeners are attached
     */
    hasListener : function(type, listener, context){

      if(!this[0] || !this[0].__emitter || !this[0].__emitter.getListeners()[type]){

        return false;
      };
      if(listener){

        var attachedListeners = this[0].__emitter.getListeners()[type];
        for(var i = 0;i < attachedListeners.length;i++){

          var hasListener = false;
          if(attachedListeners[i].listener == listener){

            hasListener = true;
          };
          if(attachedListeners[i].listener.original && attachedListeners[i].listener.original == listener){

            hasListener = true;
          };
          if(hasListener){

            if(context !== undefined){

              if(attachedListeners[i].ctx === context){

                return true;
              };
            } else {

              return true;
            };
          };
        };
        return false;
      };
      return this[0].__emitter.getListeners()[type].length > 0;
    },
    /**
     * Copies any event listeners that are attached to the elements in the
     * collection to the provided target element
     *
     * @internal
     * @param target {Element} Element to attach the copied listeners to
     */
    copyEventsTo : function(target){

      // Copy both arrays to make sure the original collections are not manipulated.
      // If e.g. the 'target' array contains a DOM node with child nodes we run into
      // problems because the 'target' array is flattened within this method.
      var source = this.concat();
      var targetCopy = target.concat();
      // get all children of source and target
      for(var i = source.length - 1;i >= 0;i--){

        var descendants = source[i].getElementsByTagName("*");
        for(var j = 0;j < descendants.length;j++){

          source.push(descendants[j]);
        };
      };
      for(var i = targetCopy.length - 1;i >= 0;i--){

        var descendants = targetCopy[i].getElementsByTagName("*");
        for(var j = 0;j < descendants.length;j++){

          targetCopy.push(descendants[j]);
        };
      };
      // make sure no emitter object has been copied
      targetCopy.forEach(function(el){

        el.__emitter = null;
      });
      for(var i = 0;i < source.length;i++){

        var el = source[i];
        if(!el.__emitter){

          continue;
        };
        var storage = el.__emitter.getListeners();
        for(var name in storage){

          for(var j = storage[name].length - 1;j >= 0;j--){

            var listener = storage[name][j].listener;
            if(listener.original){

              listener = listener.original;
            };
            qxWeb(targetCopy[i]).on(name, listener, storage[name][j].ctx);
          };
        };
      };
    },
    __isReady : false,
    /**
     * Executes the given function once the document is ready.
     *
     * @attachStatic {qxWeb}
     * @param callback {Function} callback function
     */
    ready : function(callback){

      // DOM is already ready
      if(document.readyState === "complete"){

        window.setTimeout(callback, 1);
        return;
      };
      // listen for the load event so the callback is executed no matter what
      var onWindowLoad = function(){

        qx.module.Event.__isReady = true;
        callback();
      };
      qxWeb(window).on("load", onWindowLoad);
      var wrappedCallback = function(){

        qxWeb(window).off("load", onWindowLoad);
        callback();
      };
      // Listen for DOMContentLoaded event if available (no way to reliably detect
      // support)
      if(qxWeb.env.get("engine.name") !== "mshtml" || qxWeb.env.get("browser.documentmode") > 8){

        qx.bom.Event.addNativeListener(document, "DOMContentLoaded", wrappedCallback);
      } else {

        // Continually check to see if the document is ready
        var timer = function(){

          // onWindowLoad already executed
          if(qx.module.Event.__isReady){

            return;
          };
          try{

            // If DOMContentLoaded is unavailable, use the trick by Diego Perini
            // http://javascript.nwbox.com/IEContentLoaded/
            document.documentElement.doScroll("left");
            if(document.body){

              wrappedCallback();
            };
          } catch(error) {

            window.setTimeout(timer, 100);
          };
        };
        timer();
      };
    },
    /**
     * Bind one or two callbacks to the collection.
     * If only the first callback is defined the collection
     * does react on 'mouseover' only.
     *
     * @attach {qxWeb}
     *
     * @param callbackIn {Function} callback when hovering over
     * @param callbackOut {Function?} callback when hovering out
     * @return {qxWeb} The collection for chaining
     */
    hover : function(callbackIn, callbackOut){

      this.on("mouseover", callbackIn, this);
      if(qx.lang.Type.isFunction(callbackOut)){

        this.on("mouseout", callbackOut, this);
      };
      return this;
    },
    /**
     * Registers a normalization function for the given event types. Listener
     * callbacks for these types will be called with the return value of the
     * normalization function instead of the regular event object.
     *
     * The normalizer will be called with two arguments: The original event
     * object and the element on which the event was triggered
     *
     * @attachStatic {qxWeb, $registerEventNormalization}
     * @param types {String[]} List of event types to be normalized. Use an
     * asterisk (<code>*</code>) to normalize all event types
     * @param normalizer {Function} Normalizer function
     */
    $registerNormalization : function(types, normalizer){

      if(!qx.lang.Type.isArray(types)){

        types = [types];
      };
      var registry = qx.module.Event.__normalizations;
      for(var i = 0,l = types.length;i < l;i++){

        var type = types[i];
        if(qx.lang.Type.isFunction(normalizer)){

          if(!registry[type]){

            registry[type] = [];
          };
          registry[type].push(normalizer);
        };
      };
    },
    /**
     * Unregisters a normalization function from the given event types.
     *
     * @attachStatic {qxWeb, $unregisterEventNormalization}
     * @param types {String[]} List of event types
     * @param normalizer {Function} Normalizer function
     */
    $unregisterNormalization : function(types, normalizer){

      if(!qx.lang.Type.isArray(types)){

        types = [types];
      };
      var registry = qx.module.Event.__normalizations;
      for(var i = 0,l = types.length;i < l;i++){

        var type = types[i];
        if(registry[type]){

          qx.lang.Array.remove(registry[type], normalizer);
        };
      };
    },
    /**
     * Returns all registered event normalizers
     *
     * @attachStatic {qxWeb, $getEventNormalizationRegistry}
     * @return {Map} Map of event types/normalizer functions
     */
    $getRegistry : function(){

      return qx.module.Event.__normalizations;
    },
    /**
     * Registers an event hook for the given event types.
     *
     * @attachStatic {qxWeb, $registerEventHook}
     * @param types {String[]} List of event types
     * @param registerHook {Function} Hook function to be called on event registration
     * @param unregisterHook {Function?} Hook function to be called on event deregistration
     * @internal
     */
    $registerEventHook : function(types, registerHook, unregisterHook){

      if(!qx.lang.Type.isArray(types)){

        types = [types];
      };
      var onHooks = qx.module.Event.__hooks.on;
      for(var i = 0,l = types.length;i < l;i++){

        var type = types[i];
        if(qx.lang.Type.isFunction(registerHook)){

          if(!onHooks[type]){

            onHooks[type] = [];
          };
          onHooks[type].push(registerHook);
        };
      };
      if(!unregisterHook){

        return;
      };
      var offHooks = qx.module.Event.__hooks.off;
      for(var i = 0,l = types.length;i < l;i++){

        var type = types[i];
        if(qx.lang.Type.isFunction(unregisterHook)){

          if(!offHooks[type]){

            offHooks[type] = [];
          };
          offHooks[type].push(unregisterHook);
        };
      };
    },
    /**
     * Unregisters a hook from the given event types.
     *
     * @attachStatic {qxWeb, $unregisterEventHooks}
     * @param types {String[]} List of event types
     * @param registerHook {Function} Hook function to be called on event registration
     * @param unregisterHook {Function?} Hook function to be called on event deregistration
     * @internal
     */
    $unregisterEventHook : function(types, registerHook, unregisterHook){

      if(!qx.lang.Type.isArray(types)){

        types = [types];
      };
      var onHooks = qx.module.Event.__hooks.on;
      for(var i = 0,l = types.length;i < l;i++){

        var type = types[i];
        if(onHooks[type]){

          qx.lang.Array.remove(onHooks[type], registerHook);
        };
      };
      if(!unregisterHook){

        return;
      };
      var offHooks = qx.module.Event.__hooks.off;
      for(var i = 0,l = types.length;i < l;i++){

        var type = types[i];
        if(offHooks[type]){

          qx.lang.Array.remove(offHooks[type], unregisterHook);
        };
      };
    },
    /**
     * Returns all registered event hooks
     *
     * @attachStatic {qxWeb, $getEventHookRegistry}
     * @return {Map} Map of event types/registration hook functions
     * @internal
     */
    $getHookRegistry : function(){

      return qx.module.Event.__hooks;
    }
  },
  defer : function(statics){

    qxWeb.$attach({
      "on" : statics.on,
      "off" : statics.off,
      "allOff" : statics.allOff,
      "once" : statics.once,
      "emit" : statics.emit,
      "hasListener" : statics.hasListener,
      "copyEventsTo" : statics.copyEventsTo,
      "hover" : statics.hover
    });
    qxWeb.$attachStatic({
      "ready" : statics.ready,
      "$registerEventNormalization" : statics.$registerNormalization,
      "$unregisterEventNormalization" : statics.$unregisterNormalization,
      "$getEventNormalizationRegistry" : statics.$getRegistry,
      "$registerEventHook" : statics.$registerEventHook,
      "$unregisterEventHook" : statics.$unregisterEventHook,
      "$getEventHookRegistry" : statics.$getHookRegistry
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * Basic implementation for an event emitter. This supplies a basic and
 * minimalistic event mechanism.
 */
qx.Bootstrap.define("qx.event.Emitter", {
  extend : Object,
  statics : {
    /** Static storage for all event listener */
    __storage : []
  },
  members : {
    __listener : null,
    __any : null,
    /**
     * Attach a listener to the event emitter. The given <code>name</code>
     * will define the type of event. Handing in a <code>'*'</code> will
     * listen to all events emitted by the event emitter.
     *
     * @param name {String} The name of the event to listen to.
     * @param listener {Function} The function execute on {@link #emit}.
     * @param ctx {var?Window} The context of the listener.
     * @return {Integer} An unique <code>id</code> for the attached listener.
     */
    on : function(name, listener, ctx){

      var id = qx.event.Emitter.__storage.length;
      this.__getStorage(name).push({
        listener : listener,
        ctx : ctx,
        id : id
      });
      qx.event.Emitter.__storage.push({
        name : name,
        listener : listener,
        ctx : ctx
      });
      return id;
    },
    /**
     * Attach a listener to the event emitter which will be executed only once.
     * The given <code>name</code> will define the type of event. Handing in a
     * <code>'*'</code> will listen to all events emitted by the event emitter.
     *
     * @param name {String} The name of the event to listen to.
     * @param listener {Function} The function execute on {@link #emit}.
     * @param ctx {var?Window} The context of the listener.
     * @return {Integer} An unique <code>id</code> for the attached listener.
     */
    once : function(name, listener, ctx){

      var id = qx.event.Emitter.__storage.length;
      this.__getStorage(name).push({
        listener : listener,
        ctx : ctx,
        once : true,
        id : id
      });
      qx.event.Emitter.__storage.push({
        name : name,
        listener : listener,
        ctx : ctx
      });
      return id;
    },
    /**
     * Remove a listener from the event emitter. The given <code>name</code>
     * will define the type of event.
     *
     * @param name {String} The name of the event to listen to.
     * @param listener {Function} The function execute on {@link #emit}.
     * @param ctx {var?Window} The context of the listener.
     * @return {Integer|null} The listener's id if it was removed or
     * <code>null</code> if it wasn't found
     */
    off : function(name, listener, ctx){

      var storage = this.__getStorage(name);
      for(var i = storage.length - 1;i >= 0;i--){

        var entry = storage[i];
        if(entry.listener == listener && entry.ctx == ctx){

          storage.splice(i, 1);
          qx.event.Emitter.__storage[entry.id] = null;
          return entry.id;
        };
      };
      return null;
    },
    /**
     * Removes the listener identified by the given <code>id</code>. The id
     * will be return on attaching the listener and can be stored for removing.
     *
     * @param id {Integer} The id of the listener.
     * @return {Integer|null} The listener's id if it was removed or
     * <code>null</code> if it wasn't found
     */
    offById : function(id){

      var entry = qx.event.Emitter.__storage[id];
      if(entry){

        this.off(entry.name, entry.listener, entry.ctx);
      };
      return null;
    },
    /**
     * Alternative for {@link #on}.
     * @param name {String} The name of the event to listen to.
     * @param listener {Function} The function execute on {@link #emit}.
     * @param ctx {var?Window} The context of the listener.
     * @return {Integer} An unique <code>id</code> for the attached listener.
     */
    addListener : function(name, listener, ctx){

      return this.on(name, listener, ctx);
    },
    /**
     * Alternative for {@link #once}.
     * @param name {String} The name of the event to listen to.
     * @param listener {Function} The function execute on {@link #emit}.
     * @param ctx {var?Window} The context of the listener.
     * @return {Integer} An unique <code>id</code> for the attached listener.
     */
    addListenerOnce : function(name, listener, ctx){

      return this.once(name, listener, ctx);
    },
    /**
     * Alternative for {@link #off}.
     * @param name {String} The name of the event to listen to.
     * @param listener {Function} The function execute on {@link #emit}.
     * @param ctx {var?Window} The context of the listener.
     */
    removeListener : function(name, listener, ctx){

      this.off(name, listener, ctx);
    },
    /**
     * Alternative for {@link #offById}.
     * @param id {Integer} The id of the listener.
     */
    removeListenerById : function(id){

      this.offById(id);
    },
    /**
     * Emits an event with the given name. The data will be passed
     * to the listener.
     * @param name {String} The name of the event to emit.
     * @param data {var?undefined} The data which should be passed to the listener.
     */
    emit : function(name, data){

      var storage = this.__getStorage(name);
      for(var i = 0;i < storage.length;i++){

        var entry = storage[i];
        entry.listener.call(entry.ctx, data);
        if(entry.once){

          storage.splice(i, 1);
          i--;
        };
      };
      // call on any
      storage = this.__getStorage("*");
      for(var i = storage.length - 1;i >= 0;i--){

        var entry = storage[i];
        entry.listener.call(entry.ctx, data);
      };
    },
    /**
     * Returns the internal attached listener.
     * @internal
     * @return {Map} A map which has the event name as key. The values are
     *   arrays containing a map with 'listener' and 'ctx'.
     */
    getListeners : function(){

      return this.__listener;
    },
    /**
     * Internal helper which will return the storage for the given name.
     * @param name {String} The name of the event.
     * @return {Array} An array which is the storage for the listener and
     *   the given event name.
     */
    __getStorage : function(name){

      if(this.__listener == null){

        this.__listener = {
        };
      };
      if(this.__listener[name] == null){

        this.__listener[name] = [];
      };
      return this.__listener[name];
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2011-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)
     * Daniel Wagner (danielwagner)

************************************************************************ */
/**
 * DOM manipulation module
 *
 * @ignore(qx.bom.element, qx.bom.element.AnimationJs)
 * @group (Core)
 */
qx.Bootstrap.define("qx.module.Manipulating", {
  statics : {
    /**
     * Creates a new collection from the given argument. This can either be an
     * HTML string, a single DOM element or an array of elements
     *
     * When no <code>context</code> is given the global document is used to
     * create new DOM elements.
     *
     * @attachStatic{qxWeb}
     * @param html {String|Element[]} HTML string or DOM element(s)
     * @param context {Document?document} Context in which the elements should be created
     * @return {qxWeb} Collection of elements
     */
    create : function(html, context){

      return qxWeb.$init(qx.bom.Html.clean([html], context), qxWeb);
    },
    /**
     * Clones the items in the current collection and returns them in a new set.
     * Event listeners can also be cloned.
     *
     * @attach{qxWeb}
     * @param events {Boolean} clone event listeners. Default: <pre>false</pre>
     * @return {qxWeb} New collection with clones
     */
    clone : function(events){

      var clones = [];
      for(var i = 0;i < this.length;i++){

        if(this[i] && this[i].nodeType === 1){

          clones[i] = this[i].cloneNode(true);
        };
      };
      if(events === true && this.copyEventsTo){

        this.copyEventsTo(clones);
      };
      return qxWeb(clones);
    },
    /**
     * Appends content to each element in the current set. Accepts an HTML string,
     * a single DOM element or an array of elements
     *
     * @attach{qxWeb}
     * @param html {String|Element[]|qxWeb} HTML string or DOM element(s) to append
     * @return {qxWeb} The collection for chaining
     */
    append : function(html){

      var arr = qx.bom.Html.clean([html]);
      var children = qxWeb.$init(arr, qxWeb);
      this._forEachElement(function(item, index){

        for(var j = 0,m = children.length;j < m;j++){

          if(index == 0){

            // first parent: move the target node(s)
            qx.dom.Element.insertEnd(children[j], item);
          } else {

            qx.dom.Element.insertEnd(children.eq(j).clone(true)[0], item);
          };
        };
      });
      return this;
    },
    /**
     * Appends all items in the collection to the specified parents. If multiple
     * parents are given, the items will be moved to the first parent, while
     * clones of the items will be appended to subsequent parents.
     *
     * @attach{qxWeb}
     * @param parent {String|Element[]|qxWeb} Parent selector expression or list of
     * parent elements
     * @return {qxWeb} The collection for chaining
     */
    appendTo : function(parent){

      parent = qx.module.Manipulating.__getElementArray(parent);
      for(var i = 0,l = parent.length;i < l;i++){

        this._forEachElement(function(item, j){

          if(i == 0){

            // first parent: move the target node(s)
            qx.dom.Element.insertEnd(this[j], parent[i]);
          } else {

            // further parents: clone the target node(s)
            qx.dom.Element.insertEnd(this.eq(j).clone(true)[0], parent[i]);
          };
        });
      };
      return this;
    },
    /**
     * Inserts the current collection before each target item. The collection
     * items are moved before the first target. For subsequent targets,
     * clones of the collection items are created and inserted.
     *
     * @attach{qxWeb}
     * @param target {String|Element|Element[]|qxWeb} Selector expression, DOM element,
     * Array of DOM elements or collection
     * @return {qxWeb} The collection for chaining
     */
    insertBefore : function(target){

      target = qx.module.Manipulating.__getElementArray(target);
      for(var i = 0,l = target.length;i < l;i++){

        this._forEachElement(function(item, index){

          if(i == 0){

            // first target: move the target node(s)
            qx.dom.Element.insertBefore(item, target[i]);
          } else {

            // further targets: clone the target node(s)
            qx.dom.Element.insertBefore(this.eq(index).clone(true)[0], target[i]);
          };
        });
      };
      return this;
    },
    /**
     * Inserts the current collection after each target item. The collection
     * items are moved after the first target. For subsequent targets,
     * clones of the collection items are created and inserted.
     *
     * @attach{qxWeb}
     * @param target {String|Element|Element[]|qxWeb} Selector expression, DOM element,
     * Array of DOM elements or collection
     * @return {qxWeb} The collection for chaining
     */
    insertAfter : function(target){

      target = qx.module.Manipulating.__getElementArray(target);
      for(var i = 0,l = target.length;i < l;i++){

        for(var j = this.length - 1;j >= 0;j--){

          if(!this[j] || this[j].nodeType !== 1){

            continue;
          };
          if(i == 0){

            // first target: move the target node(s)
            qx.dom.Element.insertAfter(this[j], target[i]);
          } else {

            // further targets: clone the target node(s)
            qx.dom.Element.insertAfter(this.eq(j).clone(true)[0], target[i]);
          };
        };
      };
      return this;
    },
    /**
     * Returns an array from a selector expression or a single element
     *
     * @attach{qxWeb}
     * @param arg {String|Element} Selector expression or DOM element
     * @return {Element[]} Array of elements
     * @internal
     */
    __getElementArray : function(arg){

      if(!qx.lang.Type.isArray(arg)){

        var fromSelector = qxWeb(arg);
        arg = fromSelector.length > 0 ? fromSelector : [arg];
      };
      return arg.filter(function(item){

        return (item && item.nodeType === 1);
      });
    },
    /**
     * Wraps each element in the collection in a copy of an HTML structure.
     * Elements will be appended to the deepest nested element in the structure
     * as determined by a depth-first search.
     *
     * @attach{qxWeb}
     * @param wrapper {String|Element|Element[]|qxWeb} Selector expression, HTML string, DOM element or
     * list of DOM elements
     * @return {qxWeb} The collection for chaining
     */
    wrap : function(wrapper){

      wrapper = qx.module.Manipulating.__getCollectionFromArgument(wrapper);
      if(wrapper.length == 0){

        return this;
      };
      this._forEachElement(function(item){

        var clonedwrapper = wrapper.eq(0).clone(true);
        qx.dom.Element.insertAfter(clonedwrapper[0], item);
        var innermost = qx.module.Manipulating.__getInnermostElement(clonedwrapper[0]);
        qx.dom.Element.insertEnd(item, innermost);
      });
      return this;
    },
    /**
     * Creates a new collection from the given argument
     * @param arg {var} Selector expression, HTML string, DOM element or list of
     * DOM elements
     * @return {qxWeb} Collection
     * @internal
     */
    __getCollectionFromArgument : function(arg){

      var coll;
      // Collection/array of DOM elements
      if(qx.lang.Type.isArray(arg)){

        coll = qxWeb(arg);
      } else {

        var arr = qx.bom.Html.clean([arg]);
        if(arr.length > 0 && qx.dom.Node.isElement(arr[0])){

          coll = qxWeb(arr);
        } else {

          coll = qxWeb(arg);
        };
      };
      return coll;
    },
    /**
     * Returns the innermost element of a DOM tree as determined by a simple
     * depth-first search.
     *
     * @param element {Element} Root element
     * @return {Element} innermost element
     * @internal
     */
    __getInnermostElement : function(element){

      if(element.childNodes.length == 0){

        return element;
      };
      for(var i = 0,l = element.childNodes.length;i < l;i++){

        if(element.childNodes[i].nodeType === 1){

          return this.__getInnermostElement(element.childNodes[i]);
        };
      };
      return element;
    },
    /**
     * Removes each element in the current collection from the DOM
     *
     * @attach{qxWeb}
     * @return {qxWeb} The collection for chaining
     */
    remove : function(){

      this._forEachElement(function(item){

        qx.dom.Element.remove(item);
      });
      return this;
    },
    /**
     * Removes all content from the elements in the collection
     *
     * @attach{qxWeb}
     * @return {qxWeb} The collection for chaining
     */
    empty : function(){

      this._forEachElement(function(item){

        // don't use innerHTML="" because of [BUG #7323]
        // and don't use textContent="" because of missing IE8 support
        while(item.firstChild){

          item.removeChild(item.firstChild);
        };
      });
      return this;
    },
    /**
     * Inserts content before each element in the collection. This can either
     * be an HTML string, an array of HTML strings, a single DOM element or an
     * array of elements.
     *
     * @attach{qxWeb}
     * @param content {String|String[]|Element|Element[]|qxWeb} HTML string(s),
     * DOM element(s) or collection to insert
     * @return {qxWeb} The collection for chaining
     */
    before : function(content){

      if(!qx.lang.Type.isArray(content)){

        content = [content];
      };
      var fragment = document.createDocumentFragment();
      qx.bom.Html.clean(content, document, fragment);
      this._forEachElement(function(item, index){

        var kids = qx.lang.Array.cast(fragment.childNodes, Array);
        for(var i = 0,l = kids.length;i < l;i++){

          var child;
          if(index < this.length - 1){

            child = kids[i].cloneNode(true);
          } else {

            child = kids[i];
          };
          item.parentNode.insertBefore(child, item);
        };
      }, this);
      return this;
    },
    /**
     * Inserts content after each element in the collection. This can either
     * be an HTML string, an array of HTML strings, a single DOM element or an
     * array of elements.
     *
     * @attach{qxWeb}
     * @param content {String|String[]|Element|Element[]|qxWeb} HTML string(s),
     * DOM element(s) or collection to insert
     * @return {qxWeb} The collection for chaining
     */
    after : function(content){

      if(!qx.lang.Type.isArray(content)){

        content = [content];
      };
      var fragment = document.createDocumentFragment();
      qx.bom.Html.clean(content, document, fragment);
      this._forEachElement(function(item, index){

        var kids = qx.lang.Array.cast(fragment.childNodes, Array);
        for(var i = kids.length - 1;i >= 0;i--){

          var child;
          if(index < this.length - 1){

            child = kids[i].cloneNode(true);
          } else {

            child = kids[i];
          };
          item.parentNode.insertBefore(child, item.nextSibling);
        };
      }, this);
      return this;
    },
    /**
     * Returns the left scroll position of the first element in the collection.
     *
     * @attach{qxWeb}
     * @return {Number} Current left scroll position
     */
    getScrollLeft : function(){

      var obj = this[0];
      if(!obj){

        return null;
      };
      var Node = qx.dom.Node;
      if(Node.isWindow(obj) || Node.isDocument(obj)){

        return qx.bom.Viewport.getScrollLeft();
      };
      return obj.scrollLeft;
    },
    /**
     * Returns the top scroll position of the first element in the collection.
     *
     * @attach{qxWeb}
     * @return {Number} Current top scroll position
     */
    getScrollTop : function(){

      var obj = this[0];
      if(!obj){

        return null;
      };
      var Node = qx.dom.Node;
      if(Node.isWindow(obj) || Node.isDocument(obj)){

        return qx.bom.Viewport.getScrollTop();
      };
      return obj.scrollTop;
    },
    /** Default animation descriptions for animated scrolling **/
    _animationDescription : {
      scrollLeft : {
        duration : 700,
        timing : "ease-in",
        keep : 100,
        keyFrames : {
          '0' : {
          },
          '100' : {
            scrollLeft : 1
          }
        }
      },
      scrollTop : {
        duration : 700,
        timing : "ease-in",
        keep : 100,
        keyFrames : {
          '0' : {
          },
          '100' : {
            scrollTop : 1
          }
        }
      }
    },
    /**
     * Performs animated scrolling
     *
     * @param property {String} Element property to animate: <code>scrollLeft</code>
     * or <code>scrollTop</code>
     * @param value {Number} Final scroll position
     * @param duration {Number} The animation's duration in ms
     * @return {q} The collection for chaining.
     */
    __animateScroll : function(property, value, duration){

      var desc = qx.lang.Object.clone(qx.module.Manipulating._animationDescription[property], true);
      desc.keyFrames[100][property] = value;
      return this.animate(desc, duration);
    },
    /**
     * Scrolls the elements of the collection to the given coordinate.
     *
     * @attach{qxWeb}
     * @param value {Number} Left scroll position
     * @param duration {Number?} Optional: Duration in ms for animated scrolling
     * @return {qxWeb} The collection for chaining
     */
    setScrollLeft : function(value, duration){

      var Node = qx.dom.Node;
      if(duration && qx.bom.element && qx.bom.element.AnimationJs){

        qx.module.Manipulating.__animateScroll.bind(this, "scrollLeft", value, duration)();
      };
      for(var i = 0,l = this.length,obj;i < l;i++){

        obj = this[i];
        if(Node.isElement(obj)){

          if(!(duration && qx.bom.element && qx.bom.element.AnimationJs)){

            obj.scrollLeft = value;
          };
        } else if(Node.isWindow(obj)){

          obj.scrollTo(value, this.getScrollTop(obj));
        } else if(Node.isDocument(obj)){

          Node.getWindow(obj).scrollTo(value, this.getScrollTop(obj));
        };;
      };
      return this;
    },
    /**
     * Scrolls the elements of the collection to the given coordinate.
     *
     * @attach{qxWeb}
     * @param value {Number} Top scroll position
     * @param duration {Number?} Optional: Duration in ms for animated scrolling
     * @return {qxWeb} The collection for chaining
     */
    setScrollTop : function(value, duration){

      var Node = qx.dom.Node;
      if(duration && qx.bom.element && qx.bom.element.AnimationJs){

        qx.module.Manipulating.__animateScroll.bind(this, "scrollTop", value, duration)();
      };
      for(var i = 0,l = this.length,obj;i < l;i++){

        obj = this[i];
        if(Node.isElement(obj)){

          if(!(duration && qx.bom.element && qx.bom.element.AnimationJs)){

            obj.scrollTop = value;
          };
        } else if(Node.isWindow(obj)){

          obj.scrollTo(this.getScrollLeft(obj), value);
        } else if(Node.isDocument(obj)){

          Node.getWindow(obj).scrollTo(this.getScrollLeft(obj), value);
        };;
      };
      return this;
    },
    /**
     * Focuses the first element in the collection
     *
     * @attach{qxWeb}
     * @return {qxWeb} The collection for chaining
     */
    focus : function(){

      try{

        this[0].focus();
      } catch(ex) {
      };
      return this;
    },
    /**
     * Blurs each element in the collection
     *
     * @attach{qxWeb}
     * @return {qxWeb} The collection for chaining
     */
    blur : function(){

      this.forEach(function(item, index){

        try{

          item.blur();
        } catch(ex) {
        };
      });
      return this;
    }
  },
  defer : function(statics){

    qxWeb.$attachStatic({
      "create" : statics.create
    });
    qxWeb.$attach({
      "append" : statics.append,
      "appendTo" : statics.appendTo,
      "remove" : statics.remove,
      "empty" : statics.empty,
      "before" : statics.before,
      "insertBefore" : statics.insertBefore,
      "after" : statics.after,
      "insertAfter" : statics.insertAfter,
      "wrap" : statics.wrap,
      "clone" : statics.clone,
      "getScrollLeft" : statics.getScrollLeft,
      "setScrollLeft" : statics.setScrollLeft,
      "getScrollTop" : statics.getScrollTop,
      "setScrollTop" : statics.setScrollTop,
      "focus" : statics.focus,
      "blur" : statics.blur
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * Placeholder class which simply defines and includes the core of qxWeb.
 * The core modules are:
 *
 * * {@link qx.module.Attribute}
 * * {@link qx.module.Css}
 * * {@link qx.module.Environment}
 * * {@link qx.module.Event}
 * * {@link qx.module.Manipulating}
 * * {@link qx.module.Polyfill}
 * * {@link qx.module.Traversing}
 *
 * @require(qx.module.Attribute)
 * @require(qx.module.Css)
 * @require(qx.module.Environment)
 * @require(qx.module.Event)
 * @require(qx.module.Manipulating)
 * @require(qx.module.Polyfill)
 * @require(qx.module.Traversing)
 */
qx.Bootstrap.define("qx.module.Core", {
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Daniel Wagner (danielwagner)

************************************************************************ */
/**
 * Common normalizations for native events
 *
 * @require(qx.module.Event)
 * @require(qx.bom.Event#getTarget)
 * @require(qx.bom.Event#getRelatedTarget)
 *
 * @group (Event_Normalization)
 */
qx.Bootstrap.define("qx.module.event.Native", {
  statics : {
    /**
     * List of event types to be normalized
     */
    TYPES : ["*"],
    /**
     * List of qx.bom.Event methods to be attached to native event objects
     * @internal
     */
    FORWARD_METHODS : ["getTarget", "getRelatedTarget"],
    /**
     * List of qx.module.event.Native methods to be attached to native event objects
     * @internal
     */
    BIND_METHODS : ["preventDefault", "stopPropagation", "getType"],
    /**
     * Prevent the native default behavior of the event.
     */
    preventDefault : function(){

      try{

        // this allows us to prevent some key press events in IE.
        // See bug #1049
        this.keyCode = 0;
      } catch(ex) {
      };
      this.returnValue = false;
    },
    /**
     * Stops the event's propagation to the element's parent
     */
    stopPropagation : function(){

      this.cancelBubble = true;
    },
    /**
     * Returns the event's type
     *
     * @return {String} event type
     */
    getType : function(){

      return this._type || this.type;
    },
    /**
     * Returns the target of the event.
     * Example:
     * <pre class="javascript">
     *   var collection = q("div.inline");
     *   collection.on("click", function(e) {
     *     var clickedElement = e.getTarget();
     *   });
     * </pre>
     *
     * @signature function ()
     * @return {Object} Any valid native event target
     */
    getTarget : function(){
    },
    /**
     * Computes the related target from the native DOM event
     *
     * Example:
     * <pre class="javascript">
     *   var collection = q("div.inline");
     *   collection.on("mouseout", function(e) {
     *     // when using 'mouseout' events the 'relatedTarget' is pointing to the DOM element
     *     //  the device exited to.
     *     // Useful for scenarios you only interested if e.g. the user moved away from a
     *     // section at the website
     *     var exitTarget = e.getRelatedTarget();
     *   });
     *
     *   collection.on("mouseover", function(e){
     *      // when using 'mouseover' events the 'relatedTarget' is pointing to the DOM element
     *      // the device entered from.
     *      var earlierElement = e.getRelatedTarget();
     *   });
     * </pre>
     *
     * @signature function ()
     * @return {Element} The related target
     */
    getRelatedTarget : function(){
    },
    /**
     * Computes the current target from the native DOM event. Emulates the current target
     * for all browsers without native support (like older IEs).
     *
     * Example:
     * <pre class="javascript">
     *   var collection = q("div.inline");
     *   collection.on("mouseout", function(e) {
     *     var current = e.getCurrentTarget();
     *   });
     * </pre>
     *
     * @signature function ()
     * @return {Element} The current target
     */
    getCurrentTarget : function(){
    },
    /**
     * Manipulates the native event object, adding methods if they're not
     * already present
     *
     * @param event {Event} Native event object
     * @param element {Element} DOM element the listener was attached to
     * @return {Event} Normalized event object
     * @internal
     */
    normalize : function(event, element){

      if(!event){

        return event;
      };
      var fwdMethods = qx.module.event.Native.FORWARD_METHODS;
      for(var i = 0,l = fwdMethods.length;i < l;i++){

        event[fwdMethods[i]] = qx.bom.Event[fwdMethods[i]].bind(null, event);
      };
      var bindMethods = qx.module.event.Native.BIND_METHODS;
      for(var i = 0,l = bindMethods.length;i < l;i++){

        if(typeof event[bindMethods[i]] != "function"){

          event[bindMethods[i]] = qx.module.event.Native[bindMethods[i]].bind(event);
        };
      };
      event.getCurrentTarget = function(){

        return event.currentTarget || element;
      };
      return event;
    }
  },
  defer : function(statics){

    qxWeb.$registerEventNormalization(statics.TYPES, statics.normalize);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Daniel Wagner (danielwagner)

************************************************************************ */
/**
 * Normalization for native keyboard events.
 *
 * NOTE: Some browsers won't fire the <code>keypress</code> event for all keys.
 * It's generally better to listen for <code>keyup</code> or <code>keydown</code>
 * instead.
 *
 * @require(qx.module.Event)
 * @require(qx.module.Environment)
 *
 * @group (Event_Normalization)
 */
qx.Bootstrap.define("qx.module.event.Keyboard", {
  statics : {
    /**
     * List of event types to be normalized
     */
    TYPES : ["keydown", "keypress", "keyup"],
    /**
     * List qx.module.event.Keyboard methods to be attached to native mouse event
     * objects
     * @internal
     */
    BIND_METHODS : ["getKeyIdentifier"],
    /**
     * Identifier of the pressed key. This property is modeled after the <em>KeyboardEvent.keyIdentifier</em> property
     * of the W3C DOM 3 event specification
     * (http://www.w3.org/TR/2003/NOTE-DOM-Level-3-Events-20031107/events.html#Events-KeyboardEvent-keyIdentifier).
     *
     * Printable keys are represented by an unicode string, non-printable keys
     * have one of the following values:
     *
     * <table>
     * <tr><th>Backspace</th><td>The Backspace (Back) key.</td></tr>
     * <tr><th>Tab</th><td>The Horizontal Tabulation (Tab) key.</td></tr>
     * <tr><th>Space</th><td>The Space (Spacebar) key.</td></tr>
     * <tr><th>Enter</th><td>The Enter key. Note: This key identifier is also used for the Return (Macintosh numpad) key.</td></tr>
     * <tr><th>Shift</th><td>The Shift key.</td></tr>
     * <tr><th>Control</th><td>The Control (Ctrl) key.</td></tr>
     * <tr><th>Alt</th><td>The Alt (Menu) key.</td></tr>
     * <tr><th>CapsLock</th><td>The CapsLock key</td></tr>
     * <tr><th>Meta</th><td>The Meta key. (Apple Meta and Windows key)</td></tr>
     * <tr><th>Escape</th><td>The Escape (Esc) key.</td></tr>
     * <tr><th>Left</th><td>The Left Arrow key.</td></tr>
     * <tr><th>Up</th><td>The Up Arrow key.</td></tr>
     * <tr><th>Right</th><td>The Right Arrow key.</td></tr>
     * <tr><th>Down</th><td>The Down Arrow key.</td></tr>
     * <tr><th>PageUp</th><td>The Page Up key.</td></tr>
     * <tr><th>PageDown</th><td>The Page Down (Next) key.</td></tr>
     * <tr><th>End</th><td>The End key.</td></tr>
     * <tr><th>Home</th><td>The Home key.</td></tr>
     * <tr><th>Insert</th><td>The Insert (Ins) key. (Does not fire in Opera/Win)</td></tr>
     * <tr><th>Delete</th><td>The Delete (Del) Key.</td></tr>
     * <tr><th>F1</th><td>The F1 key.</td></tr>
     * <tr><th>F2</th><td>The F2 key.</td></tr>
     * <tr><th>F3</th><td>The F3 key.</td></tr>
     * <tr><th>F4</th><td>The F4 key.</td></tr>
     * <tr><th>F5</th><td>The F5 key.</td></tr>
     * <tr><th>F6</th><td>The F6 key.</td></tr>
     * <tr><th>F7</th><td>The F7 key.</td></tr>
     * <tr><th>F8</th><td>The F8 key.</td></tr>
     * <tr><th>F9</th><td>The F9 key.</td></tr>
     * <tr><th>F10</th><td>The F10 key.</td></tr>
     * <tr><th>F11</th><td>The F11 key.</td></tr>
     * <tr><th>F12</th><td>The F12 key.</td></tr>
     * <tr><th>NumLock</th><td>The Num Lock key.</td></tr>
     * <tr><th>PrintScreen</th><td>The Print Screen (PrintScrn, SnapShot) key.</td></tr>
     * <tr><th>Scroll</th><td>The scroll lock key</td></tr>
     * <tr><th>Pause</th><td>The pause/break key</td></tr>
     * <tr><th>Win</th><td>The Windows Logo key</td></tr>
     * <tr><th>Apps</th><td>The Application key (Windows Context Menu)</td></tr>
     * </table>
     *
     * @return {String} The key identifier
     */
    getKeyIdentifier : function(){

      if(this.type == "keypress" && (qxWeb.env.get("engine.name") != "gecko" || this.charCode !== 0)){

        return qx.event.util.Keyboard.charCodeToIdentifier(this.charCode || this.keyCode);
      };
      return qx.event.util.Keyboard.keyCodeToIdentifier(this.keyCode);
    },
    /**
     * Manipulates the native event object, adding methods if they're not
     * already present
     *
     * @param event {Event} Native event object
     * @param element {Element} DOM element the listener was attached to
     * @return {Event} Normalized event object
     * @internal
     */
    normalize : function(event, element){

      if(!event){

        return event;
      };
      var bindMethods = qx.module.event.Keyboard.BIND_METHODS;
      for(var i = 0,l = bindMethods.length;i < l;i++){

        if(typeof event[bindMethods[i]] != "function"){

          event[bindMethods[i]] = qx.module.event.Keyboard[bindMethods[i]].bind(event);
        };
      };
      return event;
    },
    /**
     * IE9 will not fire an "input" event on text input elements if the user changes
     * the field's value by pressing the Backspace key. We fix this by listening
     * for the "keyup" event and emitting the missing event if necessary
     *
     * @param element {Element} Target element
     */
    registerInputFix : function(element){

      if(element.type === "text" || element.type === "password" || element.type === "textarea"){

        if(!element.__inputFix){

          element.__inputFix = qxWeb(element).on("keyup", qx.module.event.Keyboard._inputFix);
        };
      };
    },
    /**
     * Removes the IE9 input event fix
     * @param element {Element} target element
     */
    unregisterInputFix : function(element){

      if(element.__inputFix && !qxWeb(element).hasListener("input")){

        qxWeb(element).off("keyup", qx.module.event.Keyboard._inputFix);
        element.__inputFix = null;
      };
    },
    /**
     * IE9 fix: Emits an "input" event if a text input element's value was changed
     * using the Backspace key
     * @param ev {Event} Keyup event
     */
    _inputFix : function(ev){

      if(ev.getKeyIdentifier() !== "Backspace"){

        return;
      };
      var target = ev.getTarget();
      var newValue = qxWeb(target).getValue();
      if(!target.__oldInputValue || target.__oldInputValue !== newValue){

        target.__oldInputValue = newValue;
        ev.type = ev._type = "input";
        target.__emitter.emit("input", ev);
      };
    }
  },
  defer : function(statics){

    qxWeb.$registerEventNormalization(qx.module.event.Keyboard.TYPES, statics.normalize);
    if(qxWeb.env.get("engine.name") === "mshtml" && qxWeb.env.get("browser.documentmode") === 9){

      qxWeb.$registerEventHook("input", statics.registerInputFix, statics.unregisterInputFix);
    };
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Fabian Jakobs (fjakobs)

************************************************************************ */
/**
 * Utilities for working with character codes and key identifiers
 */
qx.Bootstrap.define("qx.event.util.Keyboard", {
  statics : {
    /*
    ---------------------------------------------------------------------------
      KEY MAPS
    ---------------------------------------------------------------------------
    */
    /**
     * @type {Map} maps the charcodes of special printable keys to key identifiers
     *
     * @lint ignoreReferenceField(specialCharCodeMap)
     */
    specialCharCodeMap : {
      '8' : "Backspace",
      // The Backspace (Back) key.
      '9' : "Tab",
      // The Horizontal Tabulation (Tab) key.
      //   Note: This key identifier is also used for the
      //   Return (Macintosh numpad) key.
      '13' : "Enter",
      // The Enter key.
      '27' : "Escape",
      // The Escape (Esc) key.
      '32' : "Space"
    },
    /**
     * @type {Map} maps the keycodes of the numpad keys to the right charcodes
     *
     * @lint ignoreReferenceField(numpadToCharCode)
     */
    numpadToCharCode : {
      '96' : "0".charCodeAt(0),
      '97' : "1".charCodeAt(0),
      '98' : "2".charCodeAt(0),
      '99' : "3".charCodeAt(0),
      '100' : "4".charCodeAt(0),
      '101' : "5".charCodeAt(0),
      '102' : "6".charCodeAt(0),
      '103' : "7".charCodeAt(0),
      '104' : "8".charCodeAt(0),
      '105' : "9".charCodeAt(0),
      '106' : "*".charCodeAt(0),
      '107' : "+".charCodeAt(0),
      '109' : "-".charCodeAt(0),
      '110' : ",".charCodeAt(0),
      '111' : "/".charCodeAt(0)
    },
    /**
     * @type {Map} maps the keycodes of non printable keys to key identifiers
     *
     * @lint ignoreReferenceField(keyCodeToIdentifierMap)
     */
    keyCodeToIdentifierMap : {
      '16' : "Shift",
      // The Shift key.
      '17' : "Control",
      // The Control (Ctrl) key.
      '18' : "Alt",
      // The Alt (Menu) key.
      '20' : "CapsLock",
      // The CapsLock key
      '224' : "Meta",
      // The Meta key. (Apple Meta and Windows key)
      '37' : "Left",
      // The Left Arrow key.
      '38' : "Up",
      // The Up Arrow key.
      '39' : "Right",
      // The Right Arrow key.
      '40' : "Down",
      // The Down Arrow key.
      '33' : "PageUp",
      // The Page Up key.
      '34' : "PageDown",
      // The Page Down (Next) key.
      '35' : "End",
      // The End key.
      '36' : "Home",
      // The Home key.
      '45' : "Insert",
      // The Insert (Ins) key. (Does not fire in Opera/Win)
      '46' : "Delete",
      // The Delete (Del) Key.
      '112' : "F1",
      // The F1 key.
      '113' : "F2",
      // The F2 key.
      '114' : "F3",
      // The F3 key.
      '115' : "F4",
      // The F4 key.
      '116' : "F5",
      // The F5 key.
      '117' : "F6",
      // The F6 key.
      '118' : "F7",
      // The F7 key.
      '119' : "F8",
      // The F8 key.
      '120' : "F9",
      // The F9 key.
      '121' : "F10",
      // The F10 key.
      '122' : "F11",
      // The F11 key.
      '123' : "F12",
      // The F12 key.
      '144' : "NumLock",
      // The Num Lock key.
      '44' : "PrintScreen",
      // The Print Screen (PrintScrn, SnapShot) key.
      '145' : "Scroll",
      // The scroll lock key
      '19' : "Pause",
      // The pause/break key
      // The left Windows Logo key or left cmd key
      '91' : qx.core.Environment.get("os.name") == "osx" ? "cmd" : "Win",
      '92' : "Win",
      // The right Windows Logo key or left cmd key
      // The Application key (Windows Context Menu) or right cmd key
      '93' : qx.core.Environment.get("os.name") == "osx" ? "cmd" : "Apps"
    },
    /** char code for capital A */
    charCodeA : "A".charCodeAt(0),
    /** char code for capital Z */
    charCodeZ : "Z".charCodeAt(0),
    /** char code for 0 */
    charCode0 : "0".charCodeAt(0),
    /** char code for 9 */
    charCode9 : "9".charCodeAt(0),
    /**
     * converts a keyboard code to the corresponding identifier
     *
     * @param keyCode {Integer} key code
     * @return {String} key identifier
     */
    keyCodeToIdentifier : function(keyCode){

      if(this.isIdentifiableKeyCode(keyCode)){

        var numPadKeyCode = this.numpadToCharCode[keyCode];
        if(numPadKeyCode){

          return String.fromCharCode(numPadKeyCode);
        };
        return (this.keyCodeToIdentifierMap[keyCode] || this.specialCharCodeMap[keyCode] || String.fromCharCode(keyCode));
      } else {

        return "Unidentified";
      };
    },
    /**
     * converts a character code to the corresponding identifier
     *
     * @param charCode {String} character code
     * @return {String} key identifier
     */
    charCodeToIdentifier : function(charCode){

      return this.specialCharCodeMap[charCode] || String.fromCharCode(charCode).toUpperCase();
    },
    /**
     * Check whether the keycode can be reliably detected in keyup/keydown events
     *
     * @param keyCode {String} key code to check.
     * @return {Boolean} Whether the keycode can be reliably detected in keyup/keydown events.
     */
    isIdentifiableKeyCode : function(keyCode){

      if(keyCode >= this.charCodeA && keyCode <= this.charCodeZ){

        return true;
      };
      // 0-9
      if(keyCode >= this.charCode0 && keyCode <= this.charCode9){

        return true;
      };
      // Enter, Space, Tab, Backspace
      if(this.specialCharCodeMap[keyCode]){

        return true;
      };
      // Numpad
      if(this.numpadToCharCode[keyCode]){

        return true;
      };
      // non printable keys
      if(this.isNonPrintableKeyCode(keyCode)){

        return true;
      };
      return false;
    },
    /**
     * Checks whether the keyCode represents a non printable key
     *
     * @param keyCode {String} key code to check.
     * @return {Boolean} Whether the keyCode represents a non printable key.
     */
    isNonPrintableKeyCode : function(keyCode){

      return this.keyCodeToIdentifierMap[keyCode] ? true : false;
    }
  },
  defer : function(statics, members){

    // construct inverse of keyCodeToIdentifierMap
    if(!statics.identifierToKeyCodeMap){

      statics.identifierToKeyCodeMap = {
      };
      for(var key in statics.keyCodeToIdentifierMap){

        statics.identifierToKeyCodeMap[statics.keyCodeToIdentifierMap[key]] = parseInt(key, 10);
      };
      for(var key in statics.specialCharCodeMap){

        statics.identifierToKeyCodeMap[statics.specialCharCodeMap[key]] = parseInt(key, 10);
      };
    };
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Daniel Wagner (danielwagner)

************************************************************************ */
/**
 * Normalization for native mouse events
 *
 * @require(qx.module.Environment)
 * @require(qx.module.Event)
 *
 * @group (Event_Normalization)
 */
qx.Bootstrap.define("qx.module.event.Mouse", {
  statics : {
    /**
     * List of event types to be normalized
     */
    TYPES : ["click", "dblclick", "mousedown", "mouseup", "mouseover", "mousemove", "mouseout"],
    /**
     * List qx.module.event.Mouse methods to be attached to native mouse event
     * objects
     * @internal
     */
    BIND_METHODS : ["getButton", "getViewportLeft", "getViewportTop", "getDocumentLeft", "getDocumentTop", "getScreenLeft", "getScreenTop"],
    /**
     * Standard mouse button mapping
     */
    BUTTONS_DOM2 : {
      '0' : "left",
      '2' : "right",
      '1' : "middle"
    },
    /**
     * Legacy Internet Explorer mouse button mapping
     */
    BUTTONS_MSHTML : {
      '1' : "left",
      '2' : "right",
      '4' : "middle"
    },
    /**
     * Returns the identifier of the mouse button that change state when the
     * event was triggered
     *
     * @return {String} One of <code>left</code>, <code>right</code> or
     * <code>middle</code>
     */
    getButton : function(){

      switch(this.type){case "contextmenu":
      return "right";case "click":
      // IE does not support buttons on click --> assume left button
      if(qxWeb.env.get("browser.name") === "ie" && qxWeb.env.get("browser.documentmode") < 9){

        return "left";
      };default:
      if(this.target !== undefined){

        return qx.module.event.Mouse.BUTTONS_DOM2[this.button] || "none";
      } else {

        return qx.module.event.Mouse.BUTTONS_MSHTML[this.button] || "none";
      };};
    },
    /**
     * Get the horizontal coordinate at which the event occurred relative
     * to the viewport.
     *
     * @return {Number} The horizontal mouse position
     */
    getViewportLeft : function(){

      return this.clientX;
    },
    /**
     * Get the vertical coordinate at which the event occurred relative
     * to the viewport.
     *
     * @return {Number} The vertical mouse position
     * @signature function()
     */
    getViewportTop : function(){

      return this.clientY;
    },
    /**
     * Get the horizontal position at which the event occurred relative to the
     * left of the document. This property takes into account any scrolling of
     * the page.
     *
     * @return {Number} The horizontal mouse position in the document.
     */
    getDocumentLeft : function(){

      if(this.pageX !== undefined){

        return this.pageX;
      } else {

        var win = qx.dom.Node.getWindow(this.srcElement);
        return this.clientX + qx.bom.Viewport.getScrollLeft(win);
      };
    },
    /**
     * Get the vertical position at which the event occurred relative to the
     * top of the document. This property takes into account any scrolling of
     * the page.
     *
     * @return {Number} The vertical mouse position in the document.
     */
    getDocumentTop : function(){

      if(this.pageY !== undefined){

        return this.pageY;
      } else {

        var win = qx.dom.Node.getWindow(this.srcElement);
        return this.clientY + qx.bom.Viewport.getScrollTop(win);
      };
    },
    /**
     * Get the horizontal coordinate at which the event occurred relative to
     * the origin of the screen coordinate system.
     *
     * Note: This value is usually not very useful unless you want to
     * position a native popup window at this coordinate.
     *
     * @return {Number} The horizontal mouse position on the screen.
     */
    getScreenLeft : function(){

      return this.screenX;
    },
    /**
     * Get the vertical coordinate at which the event occurred relative to
     * the origin of the screen coordinate system.
     *
     * Note: This value is usually not very useful unless you want to
     * position a native popup window at this coordinate.
     *
     * @return {Number} The vertical mouse position on the screen.
     */
    getScreenTop : function(){

      return this.screenY;
    },
    /**
     * Manipulates the native event object, adding methods if they're not
     * already present
     *
     * @param event {Event} Native event object
     * @param element {Element} DOM element the listener was attached to
     * @return {Event} Normalized event object
     * @internal
     */
    normalize : function(event, element){

      if(!event){

        return event;
      };
      var bindMethods = qx.module.event.Mouse.BIND_METHODS;
      for(var i = 0,l = bindMethods.length;i < l;i++){

        if(typeof event[bindMethods[i]] != "function"){

          event[bindMethods[i]] = qx.module.event.Mouse[bindMethods[i]].bind(event);
        };
      };
      return event;
    }
  },
  defer : function(statics){

    qxWeb.$registerEventNormalization(qx.module.event.Mouse.TYPES, statics.normalize);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * The module supplies a fallback implementation for placeholders, which is
 * used on input and textarea elements. If the browser supports native placeholders
 * the API silently ignores all calls. If not, an element will be created for every
 * given input element and acts as placeholder. Most modern browsers support
 * placeholders which makes the fallback only relevant for IE < 10 and FF < 4.
 *
 *  * <a href="http://dev.w3.org/html5/spec/single-page.html#the-placeholder-attribute">HTML Spec</a>
 *
 *  * <a href="http://caniuse.com/#feat=input-placeholder">Browser Support</a>
 *
 * @require(qx.module.Manipulating)
 * @require(qx.module.Css)
 * @require(qx.module.Attribute)
 * @require(qx.module.Event)
 * @require(qx.module.Environment)
 * @require(qx.module.Polyfill)
 * @require(qx.module.Traversing)
 */
qx.Bootstrap.define("qx.module.Placeholder", {
  statics : {
    /**
     * String holding the property name which holds the placeholder
     * element for each input.
     */
    PLACEHOLDER_NAME : "$qx_placeholder",
    /**
     * Queries for all input and textarea elements on the page and updates
     * their placeholder.
     * @attachStatic{qxWeb, placeholder.update}
     */
    update : function(){

      // ignore if native placeholder are supported
      if(!qxWeb.env.get("css.placeholder")){

        qxWeb("input[placeholder], textarea[placeholder]").updatePlaceholder();
      };
    },
    /**
     * Updates the placeholders for input's and textarea's in the collection.
     * This includes positioning, styles and DOM positioning.
     * In case the browser supports native placeholders, this methods simply
     * does nothing.
     *
     * @attach {qxWeb}
     * @return {qxWeb} The collection for chaining
     */
    updatePlaceholder : function(){

      // ignore everything if native placeholder are supported
      if(!qxWeb.env.get("css.placeholder")){

        for(var i = 0;i < this.length;i++){

          var item = qxWeb(this[i]);
          // ignore all not fitting items in the collection
          var placeholder = item.getAttribute("placeholder");
          var tagName = item.getProperty("tagName");
          if(!placeholder || (tagName != "TEXTAREA" && tagName != "INPUT")){

            continue;
          };
          // create the element if necessary
          var placeholderEl = item.getProperty(qx.module.Placeholder.PLACEHOLDER_NAME);
          if(!placeholderEl){

            placeholderEl = qx.module.Placeholder.__createPlaceholderElement(item);
          };
          // remove and add handling
          var itemInBody = item.isRendered();
          var placeholderElInBody = placeholderEl.isRendered();
          if(itemInBody && !placeholderElInBody){

            item.before(placeholderEl);
          } else if(!itemInBody && placeholderElInBody){

            placeholderEl.remove();
            return this;
          };
          qx.module.Placeholder.__syncStyles(item);
        };
      };
      return this;
    },
    /**
     * Internal helper method to update the styles for a given input element.
     * @param item {qxWeb} The input element to update.
     */
    __syncStyles : function(item){

      var placeholder = item.getAttribute("placeholder");
      var placeholderEl = item.getProperty(qx.module.Placeholder.PLACEHOLDER_NAME);
      var zIndex = item.getStyle("z-index");
      var paddingHor = parseInt(item.getStyle("padding-left")) + 2 * parseInt(item.getStyle("padding-right"));
      var paddingVer = parseInt(item.getStyle("padding-top")) + 2 * parseInt(item.getStyle("padding-bottom"));
      placeholderEl.setHtml(placeholder).setStyles({
        display : item.getValue() == "" ? "inline" : "none",
        zIndex : zIndex == "auto" ? 1 : zIndex + 1,
        textAlign : item.getStyle("text-align"),
        width : (item.getWidth() - paddingHor - 4) + "px",
        height : (item.getHeight() - paddingVer - 4) + "px",
        left : item.getOffset().left + "px",
        top : item.getOffset().top + "px",
        fontFamily : item.getStyle("font-family"),
        fontStyle : item.getStyle("font-style"),
        fontVariant : item.getStyle("font-variant"),
        fontWeight : item.getStyle("font-weight"),
        fontSize : item.getStyle("font-size"),
        paddingTop : (parseInt(item.getStyle("padding-top")) + 2) + "px",
        paddingRight : (parseInt(item.getStyle("padding-right")) + 2) + "px",
        paddingBottom : (parseInt(item.getStyle("padding-bottom")) + 2) + "px",
        paddingLeft : (parseInt(item.getStyle("padding-left")) + 2) + "px"
      });
    },
    /**
     * Creates a placeholder element based on the given input element.
     * @param item {qxWeb} The input element.
     * @return {qxWeb} The placeholder element.
     */
    __createPlaceholderElement : function(item){

      // create the label with initial styles
      var placeholderEl = qxWeb.create("<label>").setStyles({
        position : "absolute",
        color : "#989898",
        overflow : "hidden",
        pointerEvents : "none"
      });
      // store the label at the input field
      item.setProperty(qx.module.Placeholder.PLACEHOLDER_NAME, placeholderEl);
      // update the placeholders visibility on keyUp
      item.on("keyup", function(item){

        var el = item.getProperty(qx.module.Placeholder.PLACEHOLDER_NAME);
        el.setStyle("display", item.getValue() == "" ? "inline" : "none");
      }.bind(this, item));
      // for browsers not supporting pointer events
      if(!qxWeb.env.get("css.pointerevents")){

        placeholderEl.setStyle("cursor", "text").on("click", function(item){

          item.focus();
        }.bind(this, item));
      };
      return placeholderEl;
    }
  },
  defer : function(statics){

    qxWeb.$attachStatic({
      "placeholder" : {
        update : statics.update
      }
    });
    qxWeb.$attach({
      "updatePlaceholder" : statics.updatePlaceholder
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)
     * Christian Hagendorn (chris_schmidt)

************************************************************************ */
/**
 * Abstract class to compute the position of an object on one axis.
 */
qx.Bootstrap.define("qx.util.placement.AbstractAxis", {
  extend : Object,
  statics : {
    /**
     * Computes the start of the object on the axis
     *
     * @param size {Integer} Size of the object to align
     * @param target {Map} Location of the object to align the object to. This map
     *   should have the keys <code>start</code> and <code>end</code>.
     * @param offsets {Map} Map with all offsets on each side.
     *   Comes with the keys <code>start</code> and <code>end</code>.
     * @param areaSize {Integer} Size of the axis.
     * @param position {String} Alignment of the object on the target. Valid values are
     *   <ul>
     *   <li><code>edge-start</code> The object is placed before the target</li>
     *   <li><code>edge-end</code> The object is placed after the target</li>
     *   <li><code>align-start</code>The start of the object is aligned with the start of the target</li>
     *   <li><code>align-center</code>The center of the object is aligned with the center of the target</li>
     *   <li><code>align-end</code>The end of the object is aligned with the end of the object</li>
     *   </ul>
     * @return {Integer} The computed start position of the object.
     * @abstract
     */
    computeStart : function(size, target, offsets, areaSize, position){

      throw new Error("abstract method call!");
    },
    /**
     * Computes the start of the object by taking only the attachment and
     * alignment into account. The object by be not fully visible.
     *
     * @param size {Integer} Size of the object to align
     * @param target {Map} Location of the object to align the object to. This map
     *   should have the keys <code>start</code> and <code>end</code>.
     * @param offsets {Map} Map with all offsets on each side.
     *   Comes with the keys <code>start</code> and <code>end</code>.
     * @param position {String} Accepts the same values as the <code> position</code>
     *   argument of {@link #computeStart}.
     * @return {Integer} The computed start position of the object.
     */
    _moveToEdgeAndAlign : function(size, target, offsets, position){

      switch(position){case "edge-start":
      return target.start - offsets.end - size;case "edge-end":
      return target.end + offsets.start;case "align-start":
      return target.start + offsets.start;case "align-center":
      return target.start + parseInt((target.end - target.start - size) / 2, 10) + offsets.start;case "align-end":
      return target.end - offsets.end - size;};
    },
    /**
     * Whether the object specified by <code>start</code> and <code>size</code>
     * is completely inside of the axis' range..
     *
     * @param start {Integer} Computed start position of the object
     * @param size {Integer} Size of the object
     * @param areaSize {Integer} The size of the axis
     * @return {Boolean} Whether the object is inside of the axis' range
     */
    _isInRange : function(start, size, areaSize){

      return start >= 0 && start + size <= areaSize;
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)
     * Christian Hagendorn (chris_schmidt)

************************************************************************ */
/**
 * Places the object directly at the specified position. It is not moved if
 * parts of the object are outside of the axis' range.
 */
qx.Bootstrap.define("qx.util.placement.DirectAxis", {
  statics : {
    /**
     * Computes the start of the object by taking only the attachment and
     * alignment into account. The object by be not fully visible.
     *
     * @param size {Integer} Size of the object to align
     * @param target {Map} Location of the object to align the object to. This map
     *   should have the keys <code>start</code> and <code>end</code>.
     * @param offsets {Map} Map with all offsets on each side.
     *   Comes with the keys <code>start</code> and <code>end</code>.
     * @param position {String} Accepts the same values as the <code> position</code>
     *   argument of {@link #computeStart}.
     * @return {Integer} The computed start position of the object.
     */
    _moveToEdgeAndAlign : qx.util.placement.AbstractAxis._moveToEdgeAndAlign,
    /**
     * Computes the start of the object on the axis
     *
     * @param size {Integer} Size of the object to align
     * @param target {Map} Location of the object to align the object to. This map
     *   should have the keys <code>start</code> and <code>end</code>.
     * @param offsets {Map} Map with all offsets on each side.
     *   Comes with the keys <code>start</code> and <code>end</code>.
     * @param areaSize {Integer} Size of the axis.
     * @param position {String} Alignment of the object on the target. Valid values are
     *   <ul>
     *   <li><code>edge-start</code> The object is placed before the target</li>
     *   <li><code>edge-end</code> The object is placed after the target</li>
     *   <li><code>align-start</code>The start of the object is aligned with the start of the target</li>
     *   <li><code>align-center</code>The center of the object is aligned with the center of the target</li>
     *   <li><code>align-end</code>The end of the object is aligned with the end of the object</li>
     *   </ul>
     * @return {Integer} The computed start position of the object.
     */
    computeStart : function(size, target, offsets, areaSize, position){

      return this._moveToEdgeAndAlign(size, target, offsets, position);
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)
     * Christian Hagendorn (chris_schmidt)

************************************************************************ */
/**
 * Places the object to the target. If parts of the object are outside of the
 * range this class places the object at the best "edge", "alignment"
 * combination so that the overlap between object and range is maximized.
 */
qx.Bootstrap.define("qx.util.placement.KeepAlignAxis", {
  statics : {
    /**
     * Computes the start of the object by taking only the attachment and
     * alignment into account. The object by be not fully visible.
     *
     * @param size {Integer} Size of the object to align
     * @param target {Map} Location of the object to align the object to. This map
     *   should have the keys <code>start</code> and <code>end</code>.
     * @param offsets {Map} Map with all offsets on each side.
     *   Comes with the keys <code>start</code> and <code>end</code>.
     * @param position {String} Accepts the same values as the <code> position</code>
     *   argument of {@link #computeStart}.
     * @return {Integer} The computed start position of the object.
     */
    _moveToEdgeAndAlign : qx.util.placement.AbstractAxis._moveToEdgeAndAlign,
    /**
     * Whether the object specified by <code>start</code> and <code>size</code>
     * is completely inside of the axis' range..
     *
     * @param start {Integer} Computed start position of the object
     * @param size {Integer} Size of the object
     * @param areaSize {Integer} The size of the axis
     * @return {Boolean} Whether the object is inside of the axis' range
     */
    _isInRange : qx.util.placement.AbstractAxis._isInRange,
    /**
     * Computes the start of the object on the axis
     *
     * @param size {Integer} Size of the object to align
     * @param target {Map} Location of the object to align the object to. This map
     *   should have the keys <code>start</code> and <code>end</code>.
     * @param offsets {Map} Map with all offsets on each side.
     *   Comes with the keys <code>start</code> and <code>end</code>.
     * @param areaSize {Integer} Size of the axis.
     * @param position {String} Alignment of the object on the target. Valid values are
     *   <ul>
     *   <li><code>edge-start</code> The object is placed before the target</li>
     *   <li><code>edge-end</code> The object is placed after the target</li>
     *   <li><code>align-start</code>The start of the object is aligned with the start of the target</li>
     *   <li><code>align-center</code>The center of the object is aligned with the center of the target</li>
     *   <li><code>align-end</code>The end of the object is aligned with the end of the object</li>
     *   </ul>
     * @return {Integer} The computed start position of the object.
     */
    computeStart : function(size, target, offsets, areaSize, position){

      var start = this._moveToEdgeAndAlign(size, target, offsets, position);
      var range1End,range2Start;
      if(this._isInRange(start, size, areaSize)){

        return start;
      };
      if(position == "edge-start" || position == "edge-end"){

        range1End = target.start - offsets.end;
        range2Start = target.end + offsets.start;
      } else {

        range1End = target.end - offsets.end;
        range2Start = target.start + offsets.start;
      };
      if(range1End > areaSize - range2Start){

        start = range1End - size;
      } else {

        start = range2Start;
      };
      return start;
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)
     * Christian Hagendorn (chris_schmidt)

************************************************************************ */
/**
 * Places the object according to the target. If parts of the object are outside
 * of the axis' range the object's start is adjusted so that the overlap between
 * the object and the axis is maximized.
 */
qx.Bootstrap.define("qx.util.placement.BestFitAxis", {
  statics : {
    /**
     * Whether the object specified by <code>start</code> and <code>size</code>
     * is completely inside of the axis' range..
     *
     * @param start {Integer} Computed start position of the object
     * @param size {Integer} Size of the object
     * @param areaSize {Integer} The size of the axis
     * @return {Boolean} Whether the object is inside of the axis' range
     */
    _isInRange : qx.util.placement.AbstractAxis._isInRange,
    /**
     * Computes the start of the object by taking only the attachment and
     * alignment into account. The object by be not fully visible.
     *
     * @param size {Integer} Size of the object to align
     * @param target {Map} Location of the object to align the object to. This map
     *   should have the keys <code>start</code> and <code>end</code>.
     * @param offsets {Map} Map with all offsets on each side.
     *   Comes with the keys <code>start</code> and <code>end</code>.
     * @param position {String} Accepts the same values as the <code> position</code>
     *   argument of {@link #computeStart}.
     * @return {Integer} The computed start position of the object.
     */
    _moveToEdgeAndAlign : qx.util.placement.AbstractAxis._moveToEdgeAndAlign,
    /**
     * Computes the start of the object on the axis
     *
     * @param size {Integer} Size of the object to align
     * @param target {Map} Location of the object to align the object to. This map
     *   should have the keys <code>start</code> and <code>end</code>.
     * @param offsets {Map} Map with all offsets on each side.
     *   Comes with the keys <code>start</code> and <code>end</code>.
     * @param areaSize {Integer} Size of the axis.
     * @param position {String} Alignment of the object on the target. Valid values are
     *   <ul>
     *   <li><code>edge-start</code> The object is placed before the target</li>
     *   <li><code>edge-end</code> The object is placed after the target</li>
     *   <li><code>align-start</code>The start of the object is aligned with the start of the target</li>
     *   <li><code>align-center</code>The center of the object is aligned with the center of the target</li>
     *   <li><code>align-end</code>The end of the object is aligned with the end of the object</li>
     *   </ul>
     * @return {Integer} The computed start position of the object.
     */
    computeStart : function(size, target, offsets, areaSize, position){

      var start = this._moveToEdgeAndAlign(size, target, offsets, position);
      if(this._isInRange(start, size, areaSize)){

        return start;
      };
      if(start < 0){

        start = Math.min(0, areaSize - size);
      };
      if(start + size > areaSize){

        start = Math.max(0, areaSize - size);
      };
      return start;
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Daniel Wagner (danielwagner)

************************************************************************ */
/**
 * The Placement module provides a convenient way to align two elements relative
 * to each other using various pre-defined algorithms.
 *
 * @require(qx.util.placement.KeepAlignAxis#computeStart)
 * @require(qx.util.placement.BestFitAxis#computeStart)
 * @require(qx.util.placement.DirectAxis#computeStart)
 */
qxWeb.define("qx.module.Placement", {
  statics : {
    /**
     * Moves the first element in the collection, aligning it with the given
     * target.
     *
     * <strong>NOTE:</strong> The <code>placeTo</code> method also works for hidden
     * elements. However, the visibility / display styles are only manipulated during
     * the placement operation. As a result a previously hidden element <strong>stays hidden</strong>.
     *
     * @attach{qxWeb}
     * @param target {Element} Placement target
     * @param position {String} Alignment of the object with the target, any of
     * <code>"top-left"</code>, <code>"top-center"</code>, <code>"top-right"</code>,
     * <code>"bottom-left"</code>, <code>"bottom-center"</code>, <code>"bottom-right"</code>,
     * <code>"left-top"</code>, <code>"left-middle"</code>, <code>"left-bottom"</code>,
     * <code>"right-top"</code>, <code>"right-middle"</code>, <code>"right-bottom"</code>
     * @param offsets {Map?null} Map with the desired offsets between the two elements.
     * Must contain the keys <code>left</code>, <code>top</code>,
     * <code>right</code> and <code>bottom</code>
     * @param modeX {String?"direct"} Horizontal placement mode. Valid values are:
     *   <ul>
     *   <li><code>direct</code>: place the element directly at the given
     *   location.</li>
     *   <li><code>keep-align</code>: if the element is partially outside of the
     *   visible area, it is moved to the best fitting 'edge' and 'alignment' of
     *   the target.
     *   It is guaranteed the the new position attaches the object to one of the
     *   target edges and that it is aligned with a target edge.</li>
     *   <li><code>best-fit</code>: If the element is partially outside of the visible
     *   area, it is moved into the view port, ignoring any offset and position
     *   values.</li>
     *   </ul>
     * @param modeY {String?"direct"} Vertical placement mode. Accepts the same values as
     *   the 'modeX' argument.
     * @return {qxWeb} The collection for chaining
     */
    placeTo : function(target, position, offsets, modeX, modeY){

      if(!this[0] || !target){

        return this;
      };
      target = qxWeb(target);
      // make sure the DOM elements are rendered so we can get the size of them.
      // It's not necessary to move them out of the viewport - just out of the
      // layout flow.
      var visible = this.isRendered();
      var displayStyleValue = null;
      var visibilityStyleValue = null;
      if(!visible){

        // do not use the computed style value otherwise we will mess up the styles
        // when resetting them, since these styles might also be set via a CSS class.
        displayStyleValue = this[0].style.display;
        visibilityStyleValue = this[0].style.visibility;
        this.setStyles({
          position : "absolute",
          visibility : "hidden",
          display : "block"
        });
      };
      var axes = {
        x : qx.module.Placement._getAxis(modeX),
        y : qx.module.Placement._getAxis(modeY)
      };
      var size = {
        width : this.getWidth(),
        height : this.getHeight()
      };
      var parent = this.getParents();
      var area = {
        width : parent.getWidth(),
        height : parent.getHeight()
      };
      offsets = offsets || {
        top : 0,
        right : 0,
        bottom : 0,
        left : 0
      };
      var split = position.split("-");
      var edge = split[0];
      var align = split[1];
      var newPosition = {
        x : qx.module.Placement._getPositionX(edge, align),
        y : qx.module.Placement._getPositionY(edge, align)
      };
      var targetLocation;
      var parentPositioning = parent.getStyle("position");
      if(parentPositioning == "relative" || parentPositioning == "static"){

        targetLocation = target.getOffset();
      } else {

        var targetPos = target.getPosition();
        targetLocation = {
          top : targetPos.top,
          bottom : targetPos.top + target.getHeight(),
          left : targetPos.left,
          right : targetPos.left + target.getWidth()
        };
      };
      var newLocation = qx.module.Placement._computePlacement(axes, size, area, targetLocation, offsets, newPosition);
      while(parent.length > 0){

        if(parent.getStyle("position") == "relative"){

          var offset = parent.getOffset();
          var borderTop = parseInt(parent.getStyle("border-top-width")) || 0;
          var borderLeft = parseInt(parent.getStyle("border-left-width")) || 0;
          newLocation.left -= (offset.left + borderLeft);
          newLocation.top -= (offset.top + borderTop);
          parent = [];
        } else {

          parent = parent.getParents();
        };
      };
      // Reset the styles to hide the element if it was previously hidden
      if(!visible){

        this[0].style.display = displayStyleValue;
        this[0].style.visibility = visibilityStyleValue;
      };
      this.setStyles({
        position : "absolute",
        left : newLocation.left + "px",
        top : newLocation.top + "px"
      });
      return this;
    },
    /**
     * Returns the appropriate axis implementation for the given placement
     * mode
     *
     * @param mode {String} Placement mode
     * @return {Object} Placement axis class
     */
    _getAxis : function(mode){

      switch(mode){case "keep-align":
      return qx.util.placement.KeepAlignAxis;case "best-fit":
      return qx.util.placement.BestFitAxis;case "direct":default:
      return qx.util.placement.DirectAxis;};
    },
    /**
     * Returns the computed coordinates for the element to be placed
     *
     * @param axes {Map} Map with the keys <code>x</code> and <code>y</code>. Values
     * are the axis implementations
     * @param size {Map} Map with the keys <code>width</code> and <code>height</code>
     * containing the size of the placement target
     * @param area {Map} Map with the keys <code>width</code> and <code>height</code>
     * containing the size of the two elements' common parent (available space for
     * placement)
     * @param target {Map} Location of the object to align the object to. This map
     * should have the keys <code>left</code>, <code>top</code>, <code>right</code>
     * and <code>bottom</code>
     * @param offsets {Map} Map of offsets (top, right, bottom, left)
     * @param position {Map} Map with the keys <code>x</code> and <code>y</code>,
     * containing the type of positioning for each axis
     * @return {Map} Map with the keys <code>left</code> and <code>top</code>
     * containing the computed coordinates to which the element should be moved
     */
    _computePlacement : function(axes, size, area, target, offsets, position){

      var left = axes.x.computeStart(size.width, {
        start : target.left,
        end : target.right
      }, {
        start : offsets.left,
        end : offsets.right
      }, area.width, position.x);
      var top = axes.y.computeStart(size.height, {
        start : target.top,
        end : target.bottom
      }, {
        start : offsets.top,
        end : offsets.bottom
      }, area.height, position.y);
      return {
        left : left,
        top : top
      };
    },
    /**
     * Returns the X axis positioning type for the given edge and alignment
     * values
     *
     * @param edge {String} edge value
     * @param align {String} align value
     * @return {String} X positioning type
     */
    _getPositionX : function(edge, align){

      if(edge == "left"){

        return "edge-start";
      } else if(edge == "right"){

        return "edge-end";
      } else if(align == "left"){

        return "align-start";
      } else if(align == "center"){

        return "align-center";
      } else if(align == "right"){

        return "align-end";
      };;;;
    },
    /**
     * Returns the Y axis positioning type for the given edge and alignment
     * values
     *
     * @param edge {String} edge value
     * @param align {String} align value
     * @return {String} Y positioning type
     */
    _getPositionY : function(edge, align){

      if(edge == "top"){

        return "edge-start";
      } else if(edge == "bottom"){

        return "edge-end";
      } else if(align == "top"){

        return "align-start";
      } else if(align == "middle"){

        return "align-center";
      } else if(align == "bottom"){

        return "align-end";
      };;;;
    }
  },
  defer : function(statics){

    qxWeb.$attach({
      "placeTo" : statics.placeTo
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * HTML templating module. This is a wrapper for mustache.js which is a
 * "framework-agnostic way to render logic-free views".
 *
 * Here is a basic example how to use it:
 * <pre class="javascript">
 * var template = "Hi, my name is {{name}}!";
 * var view = {name: "qooxdoo"};
 * q.template.render(template, view);
 *   // return "Hi, my name is qooxdoo!"
 * </pre>
 *
 * For further details, please visit the mustache.js documentation here:
 *   https://github.com/janl/mustache.js/blob/master/README.md
 */
qx.Bootstrap.define("qx.module.Template", {
  statics : {
    /**
     * Helper method which provides direct access to templates stored as HTML in
     * the DOM. The DOM node with the given ID will be treated as a template,
     * parsed and a new DOM element will be returned containing the parsed data.
     * Keep in mind that templates can only have one root element.
     * Additionally, you should not put the template into a regular, hidden
     * DOM element because the template may not be valid HTML due to the containing
     * mustache tags. We suggest to put it into a script tag with the type
     * <code>text/template</code>.
     *
     * @attachStatic{qxWeb, template.get}
     * @param id {String} The id of the HTML template in the DOM.
     * @param view {Object} The object holding the data to render.
     * @param partials {Object} Object holding parts of a template.
     * @return {qxWeb} Collection containing a single DOM element with the parsed
     * template data.
     */
    get : function(id, view, partials){

      var el = qx.bom.Template.get(id, view, partials);
      el = qx.module.Template.__wrap(el);
      return qxWeb.$init([el], qxWeb);
    },
    /**
     * Original and only template method of mustache.js. For further
     * documentation, please visit <a href="https://github.com/janl/mustache.js">mustache.js</a>.
     *
     * @attachStatic{qxWeb, template.render}
     * @param template {String} The String containing the template.
     * @param view {Object} The object holding the data to render.
     * @param partials {Object} Object holding parts of a template.
     * @return {String} The parsed template.
     */
    render : function(template, view, partials){

      return qx.bom.Template.render(template, view, partials);
    },
    /**
     * Combines {@link #render} and {@link #get}. Input is equal to {@link #render}
     * and output is equal to {@link #get}. The advantage over {@link #get}
     * is that you don't need a HTML template but can use a template
     * string and still get a collection. Keep in mind that templates
     * can only have one root element.
     *
     * @attachStatic{qxWeb, template.renderToNode}
     * @param template {String} The String containing the template.
     * @param view {Object} The object holding the data to render.
     * @param partials {Object} Object holding parts of a template.
     * @return {qxWeb} Collection containing a single DOM element with the parsed
     * template data.
     */
    renderToNode : function(template, view, partials){

      var el = qx.bom.Template.renderToNode(template, view, partials);
      el = qx.module.Template.__wrap(el);
      return qxWeb.$init([el], qxWeb);
    },
    /**
     * If the given node is a DOM text node, wrap it in a span element and return
     * the wrapper.
     * @param el {Node} a DOM node
     * @return {Element} Original element or wrapper
     */
    __wrap : function(el){

      if(qxWeb.isTextNode(el)){

        var wrapper = document.createElement("span");
        wrapper.appendChild(el);
        el = wrapper;
      };
      return el;
    }
  },
  defer : function(statics){

    qxWeb.$attachStatic({
      "template" : {
        get : statics.get,
        render : statics.render,
        renderToNode : statics.renderToNode
      }
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

   ======================================================================

   This class contains code based on the following work:

   * Mustache.js version 0.7.3

     Code:
       https://github.com/janl/mustache.js

     Copyright:
       (c) 2009 Chris Wanstrath (Ruby)
       (c) 2010 Jan Lehnardt (JavaScript)

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

   ----------------------------------------------------------------------

   Copyright (c) 2009 Chris Wanstrath (Ruby)
   Copyright (c) 2010 Jan Lehnardt (JavaScript)

   Permission is hereby granted, free of charge, to any person obtaining
   a copy of this software and associated documentation files (the
   "Software"), to deal in the Software without restriction, including
   without limitation the rights to use, copy, modify, merge, publish,
   distribute, sublicense, and/or sell copies of the Software, and to
   permit persons to whom the Software is furnished to do so, subject to
   the following conditions:

   The above copyright notice and this permission notice shall be
   included in all copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
   EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
   MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
   NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
   LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
   OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
   WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

************************************************************************ */
/**
 * The is a template class which can be used for HTML templating. In fact,
 * this is a wrapper for mustache.js which is a "framework-agnostic way to
 * render logic-free views".
 *
 * Here is a basic example how to use it:
 * Template:
 * <pre class="javascript">
 * var template = "Hi, my name is {{name}}!";
 * var view = {name: "qooxdoo"};
 * qx.bom.Template.render(template, view);
 * // return "Hi, my name is qooxdoo!"
 * </pre>
 *
 * For further details, please visit the mustache.js documentation here:
 *   https://github.com/janl/mustache.js/blob/master/README.md
 *
 * @ignore(module)
 */
qx.Bootstrap.define("qx.bom.Template", {
  statics : {
    /** Contains the mustache.js version. */
    version : null,
    /**
     * Original and only template method of mustache.js. For further
     * documentation, please visit https://github.com/janl/mustache.js
     *
     * @signature function(template, view, partials)
     * @param template {String} The String containing the template.
     * @param view {Object} The object holding the data to render.
     * @param partials {Object} Object holding parts of a template.
     * @return {String} The parsed template.
     */
    render : null,
    /**
     * Combines {@link #render} and {@link #get}. Input is equal to {@link #render}
     * and output is equal to {@link #get}. The advantage over {@link #get}
     * is that you don't need a HTML template but can use a template
     * string and still get a DOM element. Keep in mind that templates
     * can only have one root element.
     *
     * @param template {String} The String containing the template.
     * @param view {Object} The object holding the data to render.
     * @param partials {Object} Object holding parts of a template.
     * @return {Element} A DOM element holding the parsed template data.
     */
    renderToNode : function(template, view, partials){

      var renderedTmpl = this.render(template, view, partials);
      return this._createNodeFromTemplate(renderedTmpl);
    },
    /**
     * Helper method which provides you with a direct access to templates
     * stored as HTML in the DOM. The DOM node with the given ID will be used
     * as a template, parsed and a new DOM node will be returned containing the
     * parsed data. Keep in mind to have only one root DOM element in the the
     * template.
     * Additionally, you should not put the template into a regular, hidden
     * DOM element because the template may not be valid HTML due to the containing
     * mustache tags. We suggest to put it into a script tag with the type
     * <code>text/template</code>.
     *
     * @param id {String} The id of the HTML template in the DOM.
     * @param view {Object} The object holding the data to render.
     * @param partials {Object} Object holding parts of a template.
     * @return {Element} A DOM element holding the parsed template data.
     */
    get : function(id, view, partials){

      // get the content stored in the DOM
      var template = document.getElementById(id);
      return this.renderToNode(template.innerHTML, view, partials);
    },
    /**
     * Accepts a parsed template and returns a (potentially nested) node.
     *
     * @param template {String} The String containing the template.
     * @return {Element} A DOM element holding the parsed template data.
     */
    _createNodeFromTemplate : function(template){

      // template is text only (no html elems) so use text node
      if(template.search(/<|>/) === -1){

        return document.createTextNode(template);
      };
      // template has html elems so convert string into DOM nodes
      var helper = qx.dom.Element.create("div");
      helper.innerHTML = template;
      return helper.children[0];
    }
  }
});
(function(){

  /**
   * Below is the original mustache.js code. Snapshot date is mentioned in
   * the head of this file.
   * @ignore(exports)
   * @ignore(define.*)
   * @ignore(module.*)
   * @lint ignoreNoLoopBlock()
   */
  /*!
   * mustache.js - Logic-less {{mustache}} templates with JavaScript
   * http://github.com/janl/mustache.js
   */
  /*global define: false*/
  (function(root, factory){

    if(typeof exports === "object" && exports){

      factory(exports);
    } else {

      var mustache = {
      };
      factory(mustache);
      if(typeof define === "function" && define.amd){

        define(mustache);
      } else {

        root.Mustache = mustache;
      };
    };
  }(this, function(mustache){

    var whiteRe = /\s*/;
    var spaceRe = /\s+/;
    var nonSpaceRe = /\S/;
    var eqRe = /\s*=/;
    var curlyRe = /\s*\}/;
    var tagRe = /#|\^|\/|>|\{|&|=|!/;
    // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
    // See https://github.com/janl/mustache.js/issues/189
    var RegExp_test = RegExp.prototype.test;
    function testRegExp(re, string){

      return RegExp_test.call(re, string);
    };
    function isWhitespace(string){

      return !testRegExp(nonSpaceRe, string);
    };
    var Object_toString = Object.prototype.toString;
    var isArray = Array.isArray || function(object){

      return Object_toString.call(object) === '[object Array]';
    };
    function isFunction(object){

      return typeof object === 'function';
    };
    function escapeRegExp(string){

      return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
    };
    var entityMap = {
      "&" : "&amp;",
      "<" : "&lt;",
      ">" : "&gt;",
      '"' : '&quot;',
      "'" : '&#39;',
      "/" : '&#x2F;'
    };
    function escapeHtml(string){

      return String(string).replace(/[&<>"'\/]/g, function(s){

        return entityMap[s];
      });
    };
    function Scanner(string){

      this.string = string;
      this.tail = string;
      this.pos = 0;
    };
    /**
     * Returns `true` if the tail is empty (end of string).
     */
    Scanner.prototype.eos = function(){

      return this.tail === "";
    };
    /**
     * Tries to match the given regular expression at the current position.
     * Returns the matched text if it can match, the empty string otherwise.
     */
    Scanner.prototype.scan = function(re){

      var match = this.tail.match(re);
      if(match && match.index === 0){

        var string = match[0];
        this.tail = this.tail.substring(string.length);
        this.pos += string.length;
        return string;
      };
      return "";
    };
    /**
     * Skips all text until the given regular expression can be matched. Returns
     * the skipped string, which is the entire tail if no match can be made.
     */
    Scanner.prototype.scanUntil = function(re){

      var index = this.tail.search(re),match;
      switch(index){case -1:
      match = this.tail;
      this.tail = "";
      break;case 0:
      match = "";
      break;default:
      match = this.tail.substring(0, index);
      this.tail = this.tail.substring(index);};
      this.pos += match.length;
      return match;
    };
    function Context(view, parent){

      this.view = view == null ? {
      } : view;
      this.parent = parent;
      this._cache = {
        '.' : this.view
      };
    };
    Context.make = function(view){

      return (view instanceof Context) ? view : new Context(view);
    };
    Context.prototype.push = function(view){

      return new Context(view, this);
    };
    Context.prototype.lookup = function(name){

      var value;
      if(name in this._cache){

        value = this._cache[name];
      } else {

        var context = this;
        while(context){

          if(name.indexOf('.') > 0){

            value = context.view;
            var names = name.split('.'),i = 0;
            while(value != null && i < names.length){

              value = value[names[i++]];
            };
          } else {

            value = context.view[name];
          };
          if(value != null)break;
          context = context.parent;
        };
        this._cache[name] = value;
      };
      if(isFunction(value)){

        value = value.call(this.view);
      };
      return value;
    };
    function Writer(){

      this.clearCache();
    };
    Writer.prototype.clearCache = function(){

      this._cache = {
      };
      this._partialCache = {
      };
    };
    Writer.prototype.compile = function(template, tags){

      var fn = this._cache[template];
      if(!fn){

        var tokens = mustache.parse(template, tags);
        fn = this._cache[template] = this.compileTokens(tokens, template);
      };
      return fn;
    };
    Writer.prototype.compilePartial = function(name, template, tags){

      var fn = this.compile(template, tags);
      this._partialCache[name] = fn;
      return fn;
    };
    Writer.prototype.getPartial = function(name){

      if(!(name in this._partialCache) && this._loadPartial){

        this.compilePartial(name, this._loadPartial(name));
      };
      return this._partialCache[name];
    };
    Writer.prototype.compileTokens = function(tokens, template){

      var self = this;
      return function(view, partials){

        if(partials){

          if(isFunction(partials)){

            self._loadPartial = partials;
          } else {

            for(var name in partials){

              self.compilePartial(name, partials[name]);
            };
          };
        };
        return renderTokens(tokens, self, Context.make(view), template);
      };
    };
    Writer.prototype.render = function(template, view, partials){

      return this.compile(template)(view, partials);
    };
    /**
     * Low-level function that renders the given `tokens` using the given `writer`
     * and `context`. The `template` string is only needed for templates that use
     * higher-order sections to extract the portion of the original template that
     * was contained in that section.
     */
    function renderTokens(tokens, writer, context, template){

      var buffer = '';
      // This function is used to render an artbitrary template
      // in the current context by higher-order functions.
      function subRender(template){

        return writer.render(template, context);
      };
      var token,tokenValue,value;
      for(var i = 0,len = tokens.length;i < len;++i){

        token = tokens[i];
        tokenValue = token[1];
        switch(token[0]){case '#':
        value = context.lookup(tokenValue);
        if(typeof value === 'object' || typeof value === 'string'){

          if(isArray(value)){

            for(var j = 0,jlen = value.length;j < jlen;++j){

              buffer += renderTokens(token[4], writer, context.push(value[j]), template);
            };
          } else if(value){

            buffer += renderTokens(token[4], writer, context.push(value), template);
          };
        } else if(isFunction(value)){

          var text = template == null ? null : template.slice(token[3], token[5]);
          value = value.call(context.view, text, subRender);
          if(value != null)buffer += value;
        } else if(value){

          buffer += renderTokens(token[4], writer, context, template);
        };;
        break;case '^':
        value = context.lookup(tokenValue);
        // Use JavaScript's definition of falsy. Include empty arrays.
        // See https://github.com/janl/mustache.js/issues/186
        if(!value || (isArray(value) && value.length === 0)){

          buffer += renderTokens(token[4], writer, context, template);
        };
        break;case '>':
        value = writer.getPartial(tokenValue);
        if(isFunction(value))buffer += value(context);
        break;case '&':
        value = context.lookup(tokenValue);
        if(value != null)buffer += value;
        break;case 'name':
        value = context.lookup(tokenValue);
        if(value != null)buffer += mustache.escape(value);
        break;case 'text':
        buffer += tokenValue;
        break;};
      };
      return buffer;
    };
    /**
     * Forms the given array of `tokens` into a nested tree structure where
     * tokens that represent a section have two additional items: 1) an array of
     * all tokens that appear in that section and 2) the index in the original
     * template that represents the end of that section.
     */
    function nestTokens(tokens){

      var tree = [];
      var collector = tree;
      var sections = [];
      var token;
      for(var i = 0,len = tokens.length;i < len;++i){

        token = tokens[i];
        switch(token[0]){case '#':case '^':
        sections.push(token);
        collector.push(token);
        collector = token[4] = [];
        break;case '/':
        var section = sections.pop();
        section[5] = token[2];
        collector = sections.length > 0 ? sections[sections.length - 1][4] : tree;
        break;default:
        collector.push(token);};
      };
      return tree;
    };
    /**
     * Combines the values of consecutive text tokens in the given `tokens` array
     * to a single token.
     */
    function squashTokens(tokens){

      var squashedTokens = [];
      var token,lastToken;
      for(var i = 0,len = tokens.length;i < len;++i){

        token = tokens[i];
        if(token){

          if(token[0] === 'text' && lastToken && lastToken[0] === 'text'){

            lastToken[1] += token[1];
            lastToken[3] = token[3];
          } else {

            lastToken = token;
            squashedTokens.push(token);
          };
        };
      };
      return squashedTokens;
    };
    function escapeTags(tags){

      return [new RegExp(escapeRegExp(tags[0]) + "\\s*"), new RegExp("\\s*" + escapeRegExp(tags[1]))];
    };
    /**
     * Breaks up the given `template` string into a tree of token objects. If
     * `tags` is given here it must be an array with two string values: the
     * opening and closing tags used in the template (e.g. ["<%", "%>"]). Of
     * course, the default is to use mustaches (i.e. Mustache.tags).
     */
    function parseTemplate(template, tags){

      template = template || '';
      tags = tags || mustache.tags;
      if(typeof tags === 'string')tags = tags.split(spaceRe);
      if(tags.length !== 2)throw new Error('Invalid tags: ' + tags.join(', '));
      var tagRes = escapeTags(tags);
      var scanner = new Scanner(template);
      var sections = [];
      // Stack to hold section tokens
      var tokens = [];
      // Buffer to hold the tokens
      var spaces = [];
      // Indices of whitespace tokens on the current line
      var hasTag = false;
      // Is there a {{tag}} on the current line?
      var nonSpace = false;
      // Is there a non-space char on the current line?
      // Strips all whitespace tokens array for the current line
      // if there was a {{#tag}} on it and otherwise only space.
      function stripSpace(){

        if(hasTag && !nonSpace){

          while(spaces.length){

            delete tokens[spaces.pop()];
          };
        } else {

          spaces = [];
        };
        hasTag = false;
        nonSpace = false;
      };
      var start,type,value,chr,token,openSection;
      while(!scanner.eos()){

        start = scanner.pos;
        // Match any text between tags.
        value = scanner.scanUntil(tagRes[0]);
        if(value){

          for(var i = 0,len = value.length;i < len;++i){

            chr = value.charAt(i);
            if(isWhitespace(chr)){

              spaces.push(tokens.length);
            } else {

              nonSpace = true;
            };
            tokens.push(['text', chr, start, start + 1]);
            start += 1;
            // Check for whitespace on the current line.
            if(chr == '\n')stripSpace();
          };
        };
        // Match the opening tag.
        if(!scanner.scan(tagRes[0]))break;
        hasTag = true;
        // Get the tag type.
        type = scanner.scan(tagRe) || 'name';
        scanner.scan(whiteRe);
        // Get the tag value.
        if(type === '='){

          value = scanner.scanUntil(eqRe);
          scanner.scan(eqRe);
          scanner.scanUntil(tagRes[1]);
        } else if(type === '{'){

          value = scanner.scanUntil(new RegExp('\\s*' + escapeRegExp('}' + tags[1])));
          scanner.scan(curlyRe);
          scanner.scanUntil(tagRes[1]);
          type = '&';
        } else {

          value = scanner.scanUntil(tagRes[1]);
        };
        // Match the closing tag.
        if(!scanner.scan(tagRes[1]))throw new Error('Unclosed tag at ' + scanner.pos);
        token = [type, value, start, scanner.pos];
        tokens.push(token);
        if(type === '#' || type === '^'){

          sections.push(token);
        } else if(type === '/'){

          // Check section nesting.
          openSection = sections.pop();
          if(!openSection){

            throw new Error('Unopened section "' + value + '" at ' + start);
          };
          if(openSection[1] !== value){

            throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
          };
        } else if(type === 'name' || type === '{' || type === '&'){

          nonSpace = true;
        } else if(type === '='){

          // Set the tags for the next time around.
          tags = value.split(spaceRe);
          if(tags.length !== 2){

            throw new Error('Invalid tags at ' + start + ': ' + tags.join(', '));
          };
          tagRes = escapeTags(tags);
        };;;
      };
      // Make sure there are no open sections when we're done.
      openSection = sections.pop();
      if(openSection){

        throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);
      };
      return nestTokens(squashTokens(tokens));
    };
    mustache.name = "mustache.js";
    mustache.version = "0.7.3";
    mustache.tags = ["{{", "}}"];
    mustache.Scanner = Scanner;
    mustache.Context = Context;
    mustache.Writer = Writer;
    mustache.parse = parseTemplate;
    // Export the escaping function so that the user may override it.
    // See https://github.com/janl/mustache.js/issues/244
    mustache.escape = escapeHtml;
    // All Mustache.* functions use this writer.
    var defaultWriter = new Writer();
    /**
     * Clears all cached templates and partials in the default writer.
     */
    mustache.clearCache = function(){

      return defaultWriter.clearCache();
    };
    /**
     * Compiles the given `template` to a reusable function using the default
     * writer.
     */
    mustache.compile = function(template, tags){

      return defaultWriter.compile(template, tags);
    };
    /**
     * Compiles the partial with the given `name` and `template` to a reusable
     * function using the default writer.
     */
    mustache.compilePartial = function(name, template, tags){

      return defaultWriter.compilePartial(name, template, tags);
    };
    /**
     * Compiles the given array of tokens (the output of a parse) to a reusable
     * function using the default writer.
     */
    mustache.compileTokens = function(tokens, template){

      return defaultWriter.compileTokens(tokens, template);
    };
    /**
     * Renders the `template` with the given `view` and `partials` using the
     * default writer.
     */
    mustache.render = function(template, view, partials){

      return defaultWriter.render(template, view, partials);
    };
    // This is here for backwards compatibility with 0.4.x.
    mustache.to_html = function(template, view, partials, send){

      var result = mustache.render(template, view, partials);
      if(isFunction(send)){

        send(result);
      } else {

        return result;
      };
    };
  }));
  /**
   * Above is the original mustache code.
   */
  // EXPOSE qooxdoo variant
  qx.bom.Template.version = this.Mustache.version;
  qx.bom.Template.render = this.Mustache.render;
}).call({
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * Utility module to give some support to work with arrays.
 *
 * @group (Utilities)
 */
qx.Bootstrap.define("qx.module.util.Array", {
  statics : {
    /**
     * Converts an array like object to any other array like
     * object.
     *
     * Attention: The returned array may be same
     * instance as the incoming one if the constructor is identical!
     *
     * @signature function(object, constructor, offset)
     * @attachStatic {qxWeb, array.cast}
     *
     * @param object {var} any array-like object
     * @param constructor {Function} constructor of the new instance
     * @param offset {Number?0} position to start from
     * @return {Array} the converted array
     */
    cast : qx.lang.Array.cast,
    /**
     * Check whether the two arrays have the same content. Checks only the
     * equality of the arrays' content.
     *
     * @signature function(arr1, arr2)
     * @attachStatic {qxWeb, array.equals}
     *
     * @param arr1 {Array} first array
     * @param arr2 {Array} second array
     * @return {Boolean} Whether the two arrays are equal
     */
    equals : qx.lang.Array.equals,
    /**
     * Modifies the first array as it removes all elements
     * which are listed in the second array as well.
     *
     * @signature function(arr1, arr2)
     * @attachStatic {qxWeb, array.exclude}
     *
     * @param arr1 {Array} the array
     * @param arr2 {Array} the elements of this array will be excluded from the other one
     * @return {Array} The modified array.
     */
    exclude : qx.lang.Array.exclude,
    /**
     * Convert an arguments object into an array.
     *
     * @signature function(args, offset)
     * @attachStatic {qxWeb, array.fromArguments}
     *
     * @param args {arguments} arguments object
     * @param offset {Number?0} position to start from
     * @return {Array} a newly created array (copy) with the content of the arguments object.
     */
    fromArguments : qx.lang.Array.fromArguments,
    /**
     * Insert an element into the array after a given second element.
     *
     * @signature function(arr, obj, obj2)
     * @attachStatic {qxWeb, array.insertAfter}
     *
     * @param arr {Array} the array
     * @param obj {var} object to be inserted
     * @param obj2 {var} insert obj1 after this object
     * @return {Array} The given array.
     */
    insertAfter : qx.lang.Array.insertAfter,
    /**
     * Insert an element into the array before a given second element.
     *
     * @signature function(arr, obj, obj2)
     * @attachStatic {qxWeb, array.insertBefore}
     *
     * @param arr {Array} the array
     * @param obj {var} object to be inserted
     * @param obj2 {var} insert obj1 before this object
     * @return {Array} The given array.
     */
    insertBefore : qx.lang.Array.insertBefore,
    /**
     * Returns the highest value in the given array. Supports
     * numeric values only.
     *
     * @signature function(arr)
     * @attachStatic {qxWeb, array.max}
     *
     * @param arr {Array} Array to process.
     * @return {Number | undefined} The highest of all values or undefined if array is empty.
     */
    max : qx.lang.Array.max,
    /**
     * Returns the lowest value in the given array. Supports
     * numeric values only.
     *
     * @signature function(arr)
     * @attachStatic {qxWeb, array.min}
     *
     * @param arr {Array} Array to process.
     * @return {Number | undefined} The lowest of all values or undefined if array is empty.
     */
    min : qx.lang.Array.min,
    /**
     * Remove an element from the array.
     *
     * @signature function(arr, obj)
     * @attachStatic {qxWeb, array.remove}
     *
     * @param arr {Array} the array
     * @param obj {var} element to be removed from the array
     * @return {var} the removed element
     */
    remove : qx.lang.Array.remove,
    /**
     * Remove all elements from the array
     *
     * @signature function(arr)
     * @attachStatic {qxWeb, array.removeAll}
     *
     * @param arr {Array} the array
     * @return {Array} empty array
     */
    removeAll : qx.lang.Array.removeAll,
    /**
     * Recreates an array which is free of all duplicate elements from the original.
     * This method do not modifies the original array!
     * Keep in mind that this methods deletes undefined indexes.
     *
     * @signature function(arr)
     * @attachStatic {qxWeb, array.unique}
     *
     * @param arr {Array} Incoming array
     * @return {Array} Returns a copy with no duplicates
     *   or the original array if no duplicates were found.
     */
    unique : qx.lang.Array.unique
  },
  defer : function(statics){

    qxWeb.$attachStatic({
      array : {
        cast : statics.cast,
        equals : statics.equals,
        exclude : statics.exclude,
        fromArguments : statics.fromArguments,
        insertAfter : statics.insertAfter,
        insertBefore : statics.insertBefore,
        max : statics.max,
        min : statics.min,
        remove : statics.remove,
        removeAll : statics.removeAll,
        unique : statics.unique
      }
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)

************************************************************************ */
/**
 * A Collection of utility functions to escape and unescape strings.
 */
qx.Bootstrap.define("qx.bom.String", {
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    /** Mapping of HTML entity names to the corresponding char code */
    TO_CHARCODE : {
      "quot" : 34,
      // " - double-quote
      "amp" : 38,
      // &
      "lt" : 60,
      // <
      "gt" : 62,
      // >
      // http://www.w3.org/TR/REC-html40/sgml/entities.html
      // ISO 8859-1 characters
      "nbsp" : 160,
      // no-break space
      "iexcl" : 161,
      // inverted exclamation mark
      "cent" : 162,
      // cent sign
      "pound" : 163,
      // pound sterling sign
      "curren" : 164,
      // general currency sign
      "yen" : 165,
      // yen sign
      "brvbar" : 166,
      // broken (vertical) bar
      "sect" : 167,
      // section sign
      "uml" : 168,
      // umlaut (dieresis)
      "copy" : 169,
      // copyright sign
      "ordf" : 170,
      // ordinal indicator, feminine
      "laquo" : 171,
      // angle quotation mark, left
      "not" : 172,
      // not sign
      "shy" : 173,
      // soft hyphen
      "reg" : 174,
      // registered sign
      "macr" : 175,
      // macron
      "deg" : 176,
      // degree sign
      "plusmn" : 177,
      // plus-or-minus sign
      "sup2" : 178,
      // superscript two
      "sup3" : 179,
      // superscript three
      "acute" : 180,
      // acute accent
      "micro" : 181,
      // micro sign
      "para" : 182,
      // pilcrow (paragraph sign)
      "middot" : 183,
      // middle dot
      "cedil" : 184,
      // cedilla
      "sup1" : 185,
      // superscript one
      "ordm" : 186,
      // ordinal indicator, masculine
      "raquo" : 187,
      // angle quotation mark, right
      "frac14" : 188,
      // fraction one-quarter
      "frac12" : 189,
      // fraction one-half
      "frac34" : 190,
      // fraction three-quarters
      "iquest" : 191,
      // inverted question mark
      "Agrave" : 192,
      // capital A, grave accent
      "Aacute" : 193,
      // capital A, acute accent
      "Acirc" : 194,
      // capital A, circumflex accent
      "Atilde" : 195,
      // capital A, tilde
      "Auml" : 196,
      // capital A, dieresis or umlaut mark
      "Aring" : 197,
      // capital A, ring
      "AElig" : 198,
      // capital AE diphthong (ligature)
      "Ccedil" : 199,
      // capital C, cedilla
      "Egrave" : 200,
      // capital E, grave accent
      "Eacute" : 201,
      // capital E, acute accent
      "Ecirc" : 202,
      // capital E, circumflex accent
      "Euml" : 203,
      // capital E, dieresis or umlaut mark
      "Igrave" : 204,
      // capital I, grave accent
      "Iacute" : 205,
      // capital I, acute accent
      "Icirc" : 206,
      // capital I, circumflex accent
      "Iuml" : 207,
      // capital I, dieresis or umlaut mark
      "ETH" : 208,
      // capital Eth, Icelandic
      "Ntilde" : 209,
      // capital N, tilde
      "Ograve" : 210,
      // capital O, grave accent
      "Oacute" : 211,
      // capital O, acute accent
      "Ocirc" : 212,
      // capital O, circumflex accent
      "Otilde" : 213,
      // capital O, tilde
      "Ouml" : 214,
      // capital O, dieresis or umlaut mark
      "times" : 215,
      // multiply sign
      "Oslash" : 216,
      // capital O, slash
      "Ugrave" : 217,
      // capital U, grave accent
      "Uacute" : 218,
      // capital U, acute accent
      "Ucirc" : 219,
      // capital U, circumflex accent
      "Uuml" : 220,
      // capital U, dieresis or umlaut mark
      "Yacute" : 221,
      // capital Y, acute accent
      "THORN" : 222,
      // capital THORN, Icelandic
      "szlig" : 223,
      // small sharp s, German (sz ligature)
      "agrave" : 224,
      // small a, grave accent
      "aacute" : 225,
      // small a, acute accent
      "acirc" : 226,
      // small a, circumflex accent
      "atilde" : 227,
      // small a, tilde
      "auml" : 228,
      // small a, dieresis or umlaut mark
      "aring" : 229,
      // small a, ring
      "aelig" : 230,
      // small ae diphthong (ligature)
      "ccedil" : 231,
      // small c, cedilla
      "egrave" : 232,
      // small e, grave accent
      "eacute" : 233,
      // small e, acute accent
      "ecirc" : 234,
      // small e, circumflex accent
      "euml" : 235,
      // small e, dieresis or umlaut mark
      "igrave" : 236,
      // small i, grave accent
      "iacute" : 237,
      // small i, acute accent
      "icirc" : 238,
      // small i, circumflex accent
      "iuml" : 239,
      // small i, dieresis or umlaut mark
      "eth" : 240,
      // small eth, Icelandic
      "ntilde" : 241,
      // small n, tilde
      "ograve" : 242,
      // small o, grave accent
      "oacute" : 243,
      // small o, acute accent
      "ocirc" : 244,
      // small o, circumflex accent
      "otilde" : 245,
      // small o, tilde
      "ouml" : 246,
      // small o, dieresis or umlaut mark
      "divide" : 247,
      // divide sign
      "oslash" : 248,
      // small o, slash
      "ugrave" : 249,
      // small u, grave accent
      "uacute" : 250,
      // small u, acute accent
      "ucirc" : 251,
      // small u, circumflex accent
      "uuml" : 252,
      // small u, dieresis or umlaut mark
      "yacute" : 253,
      // small y, acute accent
      "thorn" : 254,
      // small thorn, Icelandic
      "yuml" : 255,
      // small y, dieresis or umlaut mark
      // Latin Extended-B
      "fnof" : 402,
      // latin small f with hook = function= florin, U+0192 ISOtech
      // Greek
      "Alpha" : 913,
      // greek capital letter alpha, U+0391
      "Beta" : 914,
      // greek capital letter beta, U+0392
      "Gamma" : 915,
      // greek capital letter gamma,U+0393 ISOgrk3
      "Delta" : 916,
      // greek capital letter delta,U+0394 ISOgrk3
      "Epsilon" : 917,
      // greek capital letter epsilon, U+0395
      "Zeta" : 918,
      // greek capital letter zeta, U+0396
      "Eta" : 919,
      // greek capital letter eta, U+0397
      "Theta" : 920,
      // greek capital letter theta,U+0398 ISOgrk3
      "Iota" : 921,
      // greek capital letter iota, U+0399
      "Kappa" : 922,
      // greek capital letter kappa, U+039A
      "Lambda" : 923,
      // greek capital letter lambda,U+039B ISOgrk3
      "Mu" : 924,
      // greek capital letter mu, U+039C
      "Nu" : 925,
      // greek capital letter nu, U+039D
      "Xi" : 926,
      // greek capital letter xi, U+039E ISOgrk3
      "Omicron" : 927,
      // greek capital letter omicron, U+039F
      "Pi" : 928,
      // greek capital letter pi, U+03A0 ISOgrk3
      "Rho" : 929,
      // greek capital letter rho, U+03A1
      // there is no Sigmaf, and no U+03A2 character either
      "Sigma" : 931,
      // greek capital letter sigma,U+03A3 ISOgrk3
      "Tau" : 932,
      // greek capital letter tau, U+03A4
      "Upsilon" : 933,
      // greek capital letter upsilon,U+03A5 ISOgrk3
      "Phi" : 934,
      // greek capital letter phi,U+03A6 ISOgrk3
      "Chi" : 935,
      // greek capital letter chi, U+03A7
      "Psi" : 936,
      // greek capital letter psi,U+03A8 ISOgrk3
      "Omega" : 937,
      // greek capital letter omega,U+03A9 ISOgrk3
      "alpha" : 945,
      // greek small letter alpha,U+03B1 ISOgrk3
      "beta" : 946,
      // greek small letter beta, U+03B2 ISOgrk3
      "gamma" : 947,
      // greek small letter gamma,U+03B3 ISOgrk3
      "delta" : 948,
      // greek small letter delta,U+03B4 ISOgrk3
      "epsilon" : 949,
      // greek small letter epsilon,U+03B5 ISOgrk3
      "zeta" : 950,
      // greek small letter zeta, U+03B6 ISOgrk3
      "eta" : 951,
      // greek small letter eta, U+03B7 ISOgrk3
      "theta" : 952,
      // greek small letter theta,U+03B8 ISOgrk3
      "iota" : 953,
      // greek small letter iota, U+03B9 ISOgrk3
      "kappa" : 954,
      // greek small letter kappa,U+03BA ISOgrk3
      "lambda" : 955,
      // greek small letter lambda,U+03BB ISOgrk3
      "mu" : 956,
      // greek small letter mu, U+03BC ISOgrk3
      "nu" : 957,
      // greek small letter nu, U+03BD ISOgrk3
      "xi" : 958,
      // greek small letter xi, U+03BE ISOgrk3
      "omicron" : 959,
      // greek small letter omicron, U+03BF NEW
      "pi" : 960,
      // greek small letter pi, U+03C0 ISOgrk3
      "rho" : 961,
      // greek small letter rho, U+03C1 ISOgrk3
      "sigmaf" : 962,
      // greek small letter final sigma,U+03C2 ISOgrk3
      "sigma" : 963,
      // greek small letter sigma,U+03C3 ISOgrk3
      "tau" : 964,
      // greek small letter tau, U+03C4 ISOgrk3
      "upsilon" : 965,
      // greek small letter upsilon,U+03C5 ISOgrk3
      "phi" : 966,
      // greek small letter phi, U+03C6 ISOgrk3
      "chi" : 967,
      // greek small letter chi, U+03C7 ISOgrk3
      "psi" : 968,
      // greek small letter psi, U+03C8 ISOgrk3
      "omega" : 969,
      // greek small letter omega,U+03C9 ISOgrk3
      "thetasym" : 977,
      // greek small letter theta symbol,U+03D1 NEW
      "upsih" : 978,
      // greek upsilon with hook symbol,U+03D2 NEW
      "piv" : 982,
      // greek pi symbol, U+03D6 ISOgrk3
      // General Punctuation
      "bull" : 8226,
      // bullet = black small circle,U+2022 ISOpub
      // bullet is NOT the same as bullet operator, U+2219
      "hellip" : 8230,
      // horizontal ellipsis = three dot leader,U+2026 ISOpub
      "prime" : 8242,
      // prime = minutes = feet, U+2032 ISOtech
      "Prime" : 8243,
      // double prime = seconds = inches,U+2033 ISOtech
      "oline" : 8254,
      // overline = spacing overscore,U+203E NEW
      "frasl" : 8260,
      // fraction slash, U+2044 NEW
      // Letterlike Symbols
      "weierp" : 8472,
      // script capital P = power set= Weierstrass p, U+2118 ISOamso
      "image" : 8465,
      // blackletter capital I = imaginary part,U+2111 ISOamso
      "real" : 8476,
      // blackletter capital R = real part symbol,U+211C ISOamso
      "trade" : 8482,
      // trade mark sign, U+2122 ISOnum
      "alefsym" : 8501,
      // alef symbol = first transfinite cardinal,U+2135 NEW
      // alef symbol is NOT the same as hebrew letter alef,U+05D0 although the same glyph could be used to depict both characters
      // Arrows
      "larr" : 8592,
      // leftwards arrow, U+2190 ISOnum
      "uarr" : 8593,
      // upwards arrow, U+2191 ISOnum-->
      "rarr" : 8594,
      // rightwards arrow, U+2192 ISOnum
      "darr" : 8595,
      // downwards arrow, U+2193 ISOnum
      "harr" : 8596,
      // left right arrow, U+2194 ISOamsa
      "crarr" : 8629,
      // downwards arrow with corner leftwards= carriage return, U+21B5 NEW
      "lArr" : 8656,
      // leftwards double arrow, U+21D0 ISOtech
      // ISO 10646 does not say that lArr is the same as the 'is implied by' arrowbut also does not have any other character for that function. So ? lArr canbe used for 'is implied by' as ISOtech suggests
      "uArr" : 8657,
      // upwards double arrow, U+21D1 ISOamsa
      "rArr" : 8658,
      // rightwards double arrow,U+21D2 ISOtech
      // ISO 10646 does not say this is the 'implies' character but does not have another character with this function so ?rArr can be used for 'implies' as ISOtech suggests
      "dArr" : 8659,
      // downwards double arrow, U+21D3 ISOamsa
      "hArr" : 8660,
      // left right double arrow,U+21D4 ISOamsa
      // Mathematical Operators
      "forall" : 8704,
      // for all, U+2200 ISOtech
      "part" : 8706,
      // partial differential, U+2202 ISOtech
      "exist" : 8707,
      // there exists, U+2203 ISOtech
      "empty" : 8709,
      // empty set = null set = diameter,U+2205 ISOamso
      "nabla" : 8711,
      // nabla = backward difference,U+2207 ISOtech
      "isin" : 8712,
      // element of, U+2208 ISOtech
      "notin" : 8713,
      // not an element of, U+2209 ISOtech
      "ni" : 8715,
      // contains as member, U+220B ISOtech
      // should there be a more memorable name than 'ni'?
      "prod" : 8719,
      // n-ary product = product sign,U+220F ISOamsb
      // prod is NOT the same character as U+03A0 'greek capital letter pi' though the same glyph might be used for both
      "sum" : 8721,
      // n-ary summation, U+2211 ISOamsb
      // sum is NOT the same character as U+03A3 'greek capital letter sigma' though the same glyph might be used for both
      "minus" : 8722,
      // minus sign, U+2212 ISOtech
      "lowast" : 8727,
      // asterisk operator, U+2217 ISOtech
      "radic" : 8730,
      // square root = radical sign,U+221A ISOtech
      "prop" : 8733,
      // proportional to, U+221D ISOtech
      "infin" : 8734,
      // infinity, U+221E ISOtech
      "ang" : 8736,
      // angle, U+2220 ISOamso
      "and" : 8743,
      // logical and = wedge, U+2227 ISOtech
      "or" : 8744,
      // logical or = vee, U+2228 ISOtech
      "cap" : 8745,
      // intersection = cap, U+2229 ISOtech
      "cup" : 8746,
      // union = cup, U+222A ISOtech
      "int" : 8747,
      // integral, U+222B ISOtech
      "there4" : 8756,
      // therefore, U+2234 ISOtech
      "sim" : 8764,
      // tilde operator = varies with = similar to,U+223C ISOtech
      // tilde operator is NOT the same character as the tilde, U+007E,although the same glyph might be used to represent both
      "cong" : 8773,
      // approximately equal to, U+2245 ISOtech
      "asymp" : 8776,
      // almost equal to = asymptotic to,U+2248 ISOamsr
      "ne" : 8800,
      // not equal to, U+2260 ISOtech
      "equiv" : 8801,
      // identical to, U+2261 ISOtech
      "le" : 8804,
      // less-than or equal to, U+2264 ISOtech
      "ge" : 8805,
      // greater-than or equal to,U+2265 ISOtech
      "sub" : 8834,
      // subset of, U+2282 ISOtech
      "sup" : 8835,
      // superset of, U+2283 ISOtech
      // note that nsup, 'not a superset of, U+2283' is not covered by the Symbol font encoding and is not included. Should it be, for symmetry?It is in ISOamsn  --> <!ENTITY nsub": 8836,  //not a subset of, U+2284 ISOamsn
      "sube" : 8838,
      // subset of or equal to, U+2286 ISOtech
      "supe" : 8839,
      // superset of or equal to,U+2287 ISOtech
      "oplus" : 8853,
      // circled plus = direct sum,U+2295 ISOamsb
      "otimes" : 8855,
      // circled times = vector product,U+2297 ISOamsb
      "perp" : 8869,
      // up tack = orthogonal to = perpendicular,U+22A5 ISOtech
      "sdot" : 8901,
      // dot operator, U+22C5 ISOamsb
      // dot operator is NOT the same character as U+00B7 middle dot
      // Miscellaneous Technical
      "lceil" : 8968,
      // left ceiling = apl upstile,U+2308 ISOamsc
      "rceil" : 8969,
      // right ceiling, U+2309 ISOamsc
      "lfloor" : 8970,
      // left floor = apl downstile,U+230A ISOamsc
      "rfloor" : 8971,
      // right floor, U+230B ISOamsc
      "lang" : 9001,
      // left-pointing angle bracket = bra,U+2329 ISOtech
      // lang is NOT the same character as U+003C 'less than' or U+2039 'single left-pointing angle quotation mark'
      "rang" : 9002,
      // right-pointing angle bracket = ket,U+232A ISOtech
      // rang is NOT the same character as U+003E 'greater than' or U+203A 'single right-pointing angle quotation mark'
      // Geometric Shapes
      "loz" : 9674,
      // lozenge, U+25CA ISOpub
      // Miscellaneous Symbols
      "spades" : 9824,
      // black spade suit, U+2660 ISOpub
      // black here seems to mean filled as opposed to hollow
      "clubs" : 9827,
      // black club suit = shamrock,U+2663 ISOpub
      "hearts" : 9829,
      // black heart suit = valentine,U+2665 ISOpub
      "diams" : 9830,
      // black diamond suit, U+2666 ISOpub
      // Latin Extended-A
      "OElig" : 338,
      //  -- latin capital ligature OE,U+0152 ISOlat2
      "oelig" : 339,
      //  -- latin small ligature oe, U+0153 ISOlat2
      // ligature is a misnomer, this is a separate character in some languages
      "Scaron" : 352,
      //  -- latin capital letter S with caron,U+0160 ISOlat2
      "scaron" : 353,
      //  -- latin small letter s with caron,U+0161 ISOlat2
      "Yuml" : 376,
      //  -- latin capital letter Y with diaeresis,U+0178 ISOlat2
      // Spacing Modifier Letters
      "circ" : 710,
      //  -- modifier letter circumflex accent,U+02C6 ISOpub
      "tilde" : 732,
      // small tilde, U+02DC ISOdia
      // General Punctuation
      "ensp" : 8194,
      // en space, U+2002 ISOpub
      "emsp" : 8195,
      // em space, U+2003 ISOpub
      "thinsp" : 8201,
      // thin space, U+2009 ISOpub
      "zwnj" : 8204,
      // zero width non-joiner,U+200C NEW RFC 2070
      "zwj" : 8205,
      // zero width joiner, U+200D NEW RFC 2070
      "lrm" : 8206,
      // left-to-right mark, U+200E NEW RFC 2070
      "rlm" : 8207,
      // right-to-left mark, U+200F NEW RFC 2070
      "ndash" : 8211,
      // en dash, U+2013 ISOpub
      "mdash" : 8212,
      // em dash, U+2014 ISOpub
      "lsquo" : 8216,
      // left single quotation mark,U+2018 ISOnum
      "rsquo" : 8217,
      // right single quotation mark,U+2019 ISOnum
      "sbquo" : 8218,
      // single low-9 quotation mark, U+201A NEW
      "ldquo" : 8220,
      // left double quotation mark,U+201C ISOnum
      "rdquo" : 8221,
      // right double quotation mark,U+201D ISOnum
      "bdquo" : 8222,
      // double low-9 quotation mark, U+201E NEW
      "dagger" : 8224,
      // dagger, U+2020 ISOpub
      "Dagger" : 8225,
      // double dagger, U+2021 ISOpub
      "permil" : 8240,
      // per mille sign, U+2030 ISOtech
      "lsaquo" : 8249,
      // single left-pointing angle quotation mark,U+2039 ISO proposed
      // lsaquo is proposed but not yet ISO standardized
      "rsaquo" : 8250,
      // single right-pointing angle quotation mark,U+203A ISO proposed
      // rsaquo is proposed but not yet ISO standardized
      "euro" : 8364
    },
    /**
     * Escapes the characters in a <code>String</code> using HTML entities.
     *
     * For example: <tt>"bread" & "butter"</tt> => <tt>&amp;quot;bread&amp;quot; &amp;amp; &amp;quot;butter&amp;quot;</tt>.
     * Supports all known HTML 4.0 entities, including funky accents.
     *
     * * <a href="http://www.w3.org/TR/REC-html32#latin1">HTML 3.2 Character Entities for ISO Latin-1</a>
     * * <a href="http://www.w3.org/TR/REC-html40/sgml/entities.html">HTML 4.0 Character entity references</a>
     * * <a href="http://www.w3.org/TR/html401/charset.html#h-5.3">HTML 4.01 Character References</a>
     * * <a href="http://www.w3.org/TR/html401/charset.html#code-position">HTML 4.01 Code positions</a>
     *
     * @param str {String} the String to escape
     * @return {String} a new escaped String
     * @see #unescape
     */
    escape : function(str){

      return qx.util.StringEscape.escape(str, qx.bom.String.FROM_CHARCODE);
    }
  },
  /*
  *****************************************************************************
     DEFER
  *****************************************************************************
  */
  defer : function(statics){

    /** Mapping of char codes to HTML entity names */
    statics.FROM_CHARCODE = qx.lang.Object.invert(statics.TO_CHARCODE);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)

************************************************************************ */
/**
 * Generic escaping and unescaping of DOM strings.
 *
 * {@link qx.bom.String} for (un)escaping of HTML strings.
 * {@link qx.xml.String} for (un)escaping of XML strings.
 */
qx.Bootstrap.define("qx.util.StringEscape", {
  statics : {
    /**
     * generic escaping method
     *
     * @param str {String} string to escape
     * @param charCodeToEntities {Map} entity to charcode map
     * @return {String} escaped string
     * @signature function(str, charCodeToEntities)
     */
    escape : function(str, charCodeToEntities){

      var entity,result = "";
      for(var i = 0,l = str.length;i < l;i++){

        var chr = str.charAt(i);
        var code = chr.charCodeAt(0);
        if(charCodeToEntities[code]){

          entity = "&" + charCodeToEntities[code] + ";";
        } else {

          if(code > 0x7F){

            entity = "&#" + code + ";";
          } else {

            entity = chr;
          };
        };
        result += entity;
      };
      return result;
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * Utility module to give some support to work with strings.
 *
 * *Info:* The <pre class='javascript'>trim</pre> method is available as <a href="#String">Polyfill</a>.
 *
 * @group (Utilities)
 */
qx.Bootstrap.define("qx.module.util.String", {
  statics : {
    /**
     * Converts a hyphenated string (separated by '-') to camel case.
     *
     * Example:
     * <pre class='javascript'>q.string.camelCase("I-like-cookies"); //returns "ILikeCookies"</pre>
     *
     * @attachStatic {qxWeb, string.camelCase}
     * @param str {String} hyphenated string
     * @return {String} camelcase string
     */
    camelCase : function(str){

      return qx.lang.String.camelCase.call(qx.lang.String, str);
    },
    /**
     * Converts a camelcased string to a hyphenated (separated by '-') string.
     *
     * Example:
     * <pre class='javascript'>q.string.hyphenate("weLikeCookies"); //returns "we-like-cookies"</pre>
     *
     * @attachStatic {qxWeb, string.hyphenate}
     * @param str {String} camelcased string
     * @return {String} hyphenated string
     */
    hyphenate : function(str){

      return qx.lang.String.hyphenate.call(qx.lang.String, str);
    },
    /**
     * Convert the first character of the string to upper case.
     *
     * @attachStatic {qxWeb, string.firstUp}
     * @signature function(str)
     * @param str {String} the string
     * @return {String} the string with an upper case first character
     */
    firstUp : qx.lang.String.firstUp,
    /**
     * Convert the first character of the string to lower case.
     *
     * @attachStatic {qxWeb, string.firstLow}
     * @signature function(str)
     * @param str {String} the string
     * @return {String} the string with a lower case first character
     */
    firstLow : qx.lang.String.firstLow,
    /**
     * Check whether the string starts with the given substring.
     *
     * @attachStatic {qxWeb, string.startsWith}
     * @signature function(fullstr, substr)
     * @param fullstr {String} the string to search in
     * @param substr {String} the substring to look for
     * @return {Boolean} whether the string starts with the given substring
     */
    startsWith : qx.lang.String.startsWith,
    /**
     * Check whether the string ends with the given substring.
     *
     * @attachStatic {qxWeb, string.endsWith}
     * @signature function(fullstr, substr)
     * @param fullstr {String} the string to search in
     * @param substr {String} the substring to look for
     * @return {Boolean} whether the string ends with the given substring
     */
    endsWith : qx.lang.String.endsWith,
    /**
     * Escapes all chars that have a special meaning in regular expressions.
     *
     * @attachStatic {qxWeb, string.escapeRegexpChars}
     * @signature function(str)
     * @param str {String} the string where to escape the chars.
     * @return {String} the string with the escaped chars.
     */
    escapeRegexpChars : qx.lang.String.escapeRegexpChars,
    /**
     * Escapes the characters in a <code>String</code> using HTML entities.
     *
     * For example: <tt>"bread" & "butter"</tt> => <tt>&amp;quot;bread&amp;quot; &amp;amp; &amp;quot;butter&amp;quot;</tt>.
     * Supports all known HTML 4.0 entities, including funky accents.
     *
     * @attachStatic {qxWeb, string.escapeHtml}
     * @signature function(str)
     * @param str {String} the String to escape
     * @return {String} a new escaped String
     */
    escapeHtml : qx.bom.String.escape
  },
  defer : function(statics){

    qxWeb.$attachStatic({
      string : {
        camelCase : statics.camelCase,
        hyphenate : statics.hyphenate,
        firstUp : statics.firstUp,
        firstLow : statics.firstLow,
        startsWith : statics.startsWith,
        endsWith : statics.endsWith,
        escapeRegexpChars : statics.escapeRegexpChars,
        escapeHtml : statics.escapeHtml
      }
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * Utility for checking the type of a variable.
 * It adds a <code>type</code> key static to q and offers the given method.
 *
 * <pre class="javascript">
 * q.type.get("abc"); // return "String" e.g.
 * </pre>
 *
 * @group (Utilities)
 */
qx.Bootstrap.define("qx.module.util.Type", {
  statics : {
    /**
     * Get the internal class of the value. The following classes are possible:
     * <pre>
     * <code>"String"</code>,
     * <code>"Array"</code>,
     * <code>"Object"</code>,
     * <code>"RegExp"</code>,
     * <code>"Number"</code>,
     * <code>"Boolean"</code>,
     * <code>"Date"</code>,
     * <code>"Function"</code>,
     * <code>"Error"</code>
     * </pre>
     * @attachStatic {qxWeb, type.get}
     * @signature function(value)
     * @param value {var} Value to get the class for.
     * @return {String} The internal class of the value.
     */
    get : qx.Bootstrap.getClass
  },
  defer : function(statics){

    qxWeb.$attachStatic({
      type : {
        get : statics.get
      }
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2013 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Alexander Steitz (aback)

************************************************************************ */
/**
 * Helper functions to handle an Object as a Hash map.
 *
 * @group (Utilities)
 */
qx.Bootstrap.define("qx.module.util.Object", {
  statics : {
    /**
     * Return a copy of an Object
     *
     * @signature function(source, deep)
     * @attachStatic {qxWeb, object.clone}
     *
     * @param source {Object} Object to copy
     * @param deep {Boolean} If the clone should be a deep clone.
     * @return {Object} A copy of the object
     */
    clone : qx.lang.Object.clone,
    /**
     * Get the values of a map as array
     *
     * @signature function(map)
     * @attachStatic {qxWeb, object.getValues}
     *
     * @param map {Object} the map
     * @return {Array} array of the values of the map
     */
    getValues : qx.lang.Object.getValues,
    /**
     * Inverts a map by exchanging the keys with the values.
     *
     * @signature function(map)
     * @attachStatic {qxWeb, object.invert}
     *
     * If the map has the same values for different keys, information will get lost.
     * The values will be converted to strings using the toString methods.
     *
     * @param map {Object} Map to invert
     * @return {Object} inverted Map
     */
    invert : qx.lang.Object.invert,
    /**
     * Whether the map contains the given value.
     *
     * @signature function(map, value)
     * @attachStatic {qxWeb, object.contains}
     *
     * @param map {Object} Map to search for the value
     * @param value {var} Value to look for
     * @return {Boolean} Whether the value was found in the map.
     */
    contains : qx.lang.Object.contains
  },
  defer : function(statics){

    qxWeb.$attachStatic({
      "object" : {
        "clone" : statics.clone,
        "getValues" : statics.getValues,
        "invert" : statics.invert,
        "contains" : statics.contains
      }
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Alexander Steitz (aback)

   ======================================================================

   This class contains code based on the following work:

   * Underscore.js
     http://underscorejs.org
     Version 1.5.2

     Copyright:
       2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

************************************************************************ */
/**
 * Utility module to give some support to work with functions.
 *
 * @group (Utilities)
 */
qx.Bootstrap.define("qx.module.util.Function", {
  statics : {
    /**
     * Returns a debounced version of the given callback. The execution of the callback
     * is delayed by the given delay and after no events were triggered anymore.
     * This mechanism is very useful for event handling: only after a specified delay
     * the event should be handled (e.g. at keyboard input by the user) to prevent flooding
     * the handler with a large amounts of events.
     *
     * @attachStatic{qxWeb, func.debounce}
     * @param callback {Function} the callback which should be executed after the given delay
     * if the wrapper method is *not* called during this delay.
     * @param delay {Number} Delay in milliseconds
     * @param immediate {Boolean} whether to run the callback at the beginning and then debounce
     * @return {Function} a wrapper function which <em>shields</em> the given callback function
     */
    debounce : function(callback, delay, immediate){

      var wrapperFunction = function(){

        arguments.callee.immediate = !!(immediate);
        // store the current arguments at the function object
        // to have access inside the interval method
        arguments.callee.args = qx.lang.Array.fromArguments(arguments);
        // it's necessary to store the context to be able to call
        // the callback within the right scope
        var context = this;
        // arguments.callee is the wrapper function itself
        // use this function object to store the 'intervalId' and the 'fired' state
        var id = arguments.callee.intervalId;
        if(typeof id === "undefined"){

          // setup the interval for the first run
          var intervalId = window.setInterval((function(){

            // if the 'wrapperFunction' was *not* called during the last
            // interval then can call the provided callback and clear the interval
            // except for 'immediate' mode
            if(!this.fired){

              window.clearInterval(this.intervalId);
              delete this.intervalId;
              if(this.immediate === false){

                callback.apply(context, this.args);
              };
            };
            this.fired = false;
          }).bind(arguments.callee), delay);
          arguments.callee.intervalId = intervalId;
          if(arguments.callee.immediate){

            callback.apply(context, arguments.callee.args);
          };
        };
        // This prevents the logic to clear the interval
        arguments.callee.fired = true;
      };
      return wrapperFunction;
    },
    /**
     * Returns a throttled version of the given callback. The execution of the callback
     * is throttled which means it is only executed in the given interval.
     * This mechanism is very useful for event handling: only in specified intervals
     * the event should be handled (e.g. at resize of the browser window) to prevent flooding
     * the handler with a large amounts of events.
     *
     * @attachStatic{qxWeb, func.throttle}
     * @param callback {Function} the callback which should be executed in the given interval
     * @param interval {Number} Interval in milliseconds
     * @param options {Map} the keys are <code>leading</code> and <code>trailing</code> to control the
     * firing of events precisely.
     * @return {Function} a wrapper function which <em>shields</em> the given callback function
     */
    throttle : function(callback, interval, options){

      if(typeof options === "undefined"){

        options = {
        };
      };
      var context,args,result;
      var timeout = null;
      var previous = 0;
      var later = function(){

        previous = options.leading === false ? 0 : new Date();
        timeout = null;
        result = callback.apply(context, args);
      };
      return function(){

        var now = new Date();
        if(!previous && options.leading === false){

          previous = now;
        };
        var remaining = interval - (now - previous);
        context = this;
        args = arguments;
        if(remaining <= 0){

          window.clearTimeout(timeout);
          timeout = null;
          previous = now;
          result = callback.apply(context, args);
        } else if(!timeout && options.trailing !== false){

          timeout = window.setTimeout(later, remaining);
        };
        return result;
      };
    }
  },
  defer : function(statics){

    qxWeb.$attachStatic({
      func : {
        debounce : statics.debounce,
        throttle : statics.throttle
      }
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Daniel Wagner (danielwagner)

************************************************************************ */
/**
 * Provides a way to block elements so they will no longer receive (native)
 * events by overlaying them with a div.
 * For Internet Explorer, an additional Iframe element will be overlayed since
 * native form controls cannot be blocked otherwise.
 *
 * The blocker can also be applied to the entire document, e.g.:
 *
 * <pre class="javascript">
 * q(document).block();
 * </pre>
 *
 * @require(qx.module.Environment)
 * @require(qx.module.Manipulating)
 * @require(qx.module.Traversing)
 * @require(qx.module.Css)
 * @require(qx.module.Attribute)
 */
qxWeb.define("qx.module.Blocker", {
  statics : {
    /**
     * Attaches a blocker div (and additionally a blocker Iframe for IE) to the
     * given element.
     *
     * @param item {Element|Document} The element to be overlaid with the blocker
     * @param color {String} The color for the blocker element (any CSS color value)
     * @param opacity {Number} The CSS opacity value for the blocker
     * @param zIndex {Number} The zIndex value for the blocker
     */
    __attachBlocker : function(item, color, opacity, zIndex){

      var win = qxWeb.getWindow(item);
      var isDocument = qxWeb.isDocument(item);
      if(!isDocument && !qxWeb.isElement(item)){

        return;
      };
      if(!item.__blocker){

        item.__blocker = {
          div : qxWeb.create("<div/>")
        };
        if((qxWeb.env.get("engine.name") == "mshtml")){

          item.__blocker.iframe = qx.module.Blocker.__getIframeElement(win);
        };
      };
      qx.module.Blocker.__styleBlocker(item, color, opacity, zIndex, isDocument);
      item.__blocker.div.appendTo(win.document.body);
      if(item.__blocker.iframe){

        item.__blocker.iframe.appendTo(win.document.body);
      };
      if(isDocument){

        qxWeb(win).on("resize", qx.module.Blocker.__onWindowResize);
      };
    },
    /**
     * Styles the blocker element(s)
     *
     * @param item {Element|Document} The element to be overlaid with the blocker
     * @param color {String} The color for the blocker element (any CSS color value)
     * @param opacity {Number} The CSS opacity value for the blocker
     * @param zIndex {Number} The zIndex value for the blocker
     * @param isDocument {Boolean} Whether the item is a document node
     */
    __styleBlocker : function(item, color, opacity, zIndex, isDocument){

      var qItem = qxWeb(item);
      var styles = {
        "zIndex" : zIndex,
        "display" : "block",
        "position" : "absolute",
        "backgroundColor" : color,
        "opacity" : opacity,
        "width" : qItem.getWidth() + "px",
        "height" : qItem.getHeight() + "px"
      };
      if(isDocument){

        styles.top = 0 + "px";
        styles.left = 0 + "px";
      } else {

        var pos = qItem.getOffset();
        styles.top = pos.top + "px";
        styles.left = pos.left + "px";
      };
      item.__blocker.div.setStyles(styles);
      if(item.__blocker.iframe){

        styles.zIndex = styles.zIndex - 1;
        styles.backgroundColor = "transparent";
        styles.opacity = 0;
        item.__blocker.iframe.setStyles(styles);
      };
    },
    /**
     * Creates an iframe element used as a blocker in IE
     *
     * @param win {Window} The parent window of the item to be blocked
     * @return {Element} Iframe blocker
     */
    __getIframeElement : function(win){

      var iframe = qxWeb.create('<iframe></iframe>');
      iframe.setAttributes({
        frameBorder : 0,
        frameSpacing : 0,
        marginWidth : 0,
        marginHeight : 0,
        hspace : 0,
        vspace : 0,
        border : 0,
        allowTransparency : false,
        src : "javascript:false"
      });
      return iframe;
    },
    /**
     * Callback for the Window's resize event. Applies the window's new sizes
     * to the blocker element(s).
     *
     * @param ev {Event} resize event
     */
    __onWindowResize : function(ev){

      var win = this[0];
      var size = {
        width : this.getWidth() + "px",
        height : this.getHeight() + "px"
      };
      qxWeb(win.document.__blocker.div).setStyles(size);
      if(win.document.__blocker.iframe){

        qxWeb(win.document.__blocker.iframe).setStyles(size);
      };
    },
    /**
     * Removes the given item's blocker element(s) from the DOM
     *
     * @param item {Element} Blocked element
     * @param index {Number} index of the item in the collection
     */
    __detachBlocker : function(item, index){

      if(!item.__blocker){

        return;
      };
      item.__blocker.div.remove();
      if(item.__blocker.iframe){

        item.__blocker.iframe.remove();
      };
      if(qxWeb.isDocument(item)){

        qxWeb(qxWeb.getWindow(item)).off("resize", qx.module.Blocker.__onWindowResize);
      };
    },
    /**
     * Returns the blocker elements as collection
     *
     * @param collection {qxWeb} Collection to get the blocker elements from
     * @return {qxWeb} collection of blocker elements
     */
    __getBlocker : function(collection){

      var blockerElements = qxWeb();
      collection.forEach(function(item, index){

        if(typeof item.__blocker !== "undefined"){

          blockerElements = blockerElements.concat(item.__blocker.div);
        };
      });
      return blockerElements;
    },
    /**
     * Adds an overlay to all items in the collection that intercepts mouse
     * events.
     *
     * @attach {qxWeb}
     * @param color {String ? transparent} The color for the blocker element (any CSS color value)
     * @param opacity {Number ? 0} The CSS opacity value for the blocker (floating point number from 0 to 1)
     * @param zIndex {Number ? 10000} The zIndex value for the blocker
     * @return {qxWeb} The collection for chaining
     */
    block : function(color, opacity, zIndex){

      if(!this[0]){

        return this;
      };
      color = color || "transparent";
      opacity = opacity || 0;
      zIndex = zIndex || 10000;
      this.forEach(function(item, index){

        qx.module.Blocker.__attachBlocker(item, color, opacity, zIndex);
      });
      return this;
    },
    /**
     * Removes the blockers from all items in the collection
     *
     * @attach {qxWeb}
     * @return {qxWeb} The collection for chaining
     */
    unblock : function(){

      if(!this[0]){

        return this;
      };
      this.forEach(qx.module.Blocker.__detachBlocker);
      return this;
    },
    /**
     * Returns all blocker elements as collection.
     *
     * <strong>Note:</strong> This will only return elements if
     * the <code>block</code> method was called at least once,
     * since the blocker elements are created on-demand.
     *
     * @attach {qxWeb}
     * @return {qxWeb} collection with all blocker elements
     */
    getBlocker : function(){

      if(!this[0]){

        return this;
      };
      var collection = qx.module.Blocker.__getBlocker(this);
      return collection;
    }
  },
  defer : function(statics){

    qxWeb.$attach({
      "block" : statics.block,
      "unblock" : statics.unblock,
      "getBlocker" : statics.getBlocker
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

************************************************************************ */
/**
 * A wrapper for Cookie handling.
 */
qx.Bootstrap.define("qx.bom.Cookie", {
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    /*
    ---------------------------------------------------------------------------
      USER APPLICATION METHODS
    ---------------------------------------------------------------------------
    */
    /**
     * Returns the string value of a cookie.
     *
     * @param key {String} The key for the saved string value.
     * @return {null | String} Returns the saved string value, if the cookie
     *    contains a value for the key, <code>null</code> otherwise.
     */
    get : function(key){

      var start = document.cookie.indexOf(key + "=");
      var len = start + key.length + 1;
      if((!start) && (key != document.cookie.substring(0, key.length))){

        return null;
      };
      if(start == -1){

        return null;
      };
      var end = document.cookie.indexOf(";", len);
      if(end == -1){

        end = document.cookie.length;
      };
      return unescape(document.cookie.substring(len, end));
    },
    /**
     * Sets the string value of a cookie.
     *
     * @param key {String} The key for the string value.
     * @param value {String} The string value.
     * @param expires {Number?null} The expires in days starting from now,
     *    or <code>null</code> if the cookie should deleted after browser close.
     * @param path {String?null} Path value.
     * @param domain {String?null} Domain value.
     * @param secure {Boolean?null} Secure flag.
     */
    set : function(key, value, expires, path, domain, secure){

      // Generate cookie
      var cookie = [key, "=", escape(value)];
      if(expires){

        var today = new Date();
        today.setTime(today.getTime());
        cookie.push(";expires=", new Date(today.getTime() + (expires * 1000 * 60 * 60 * 24)).toGMTString());
      };
      if(path){

        cookie.push(";path=", path);
      };
      if(domain){

        cookie.push(";domain=", domain);
      };
      if(secure){

        cookie.push(";secure");
      };
      // Store cookie
      document.cookie = cookie.join("");
    },
    /**
     * Deletes the string value of a cookie.
     *
     * @param key {String} The key for the string value.
     * @param path {String?null} Path value.
     * @param domain {String?null} Domain value.
     */
    del : function(key, path, domain){

      if(!qx.bom.Cookie.get(key)){

        return;
      };
      // Generate cookie
      var cookie = [key, "="];
      if(path){

        cookie.push(";path=", path);
      };
      if(domain){

        cookie.push(";domain=", domain);
      };
      cookie.push(";expires=Thu, 01-Jan-1970 00:00:01 GMT");
      // Store cookie
      document.cookie = cookie.join("");
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Daniel Wagner (danielwagner)

************************************************************************ */
/**
 * Cookie handling module
 */
qx.Bootstrap.define("qx.module.Cookie", {
  statics : {
    /**
     * Returns the string value of a cookie.
     *
     * @attachStatic {qxWeb, cookie.get}
     * @param key {String} The key for the saved string value.
     * @return {String|null} Returns the saved string value if the cookie
     *    contains a value for the key, otherwise <code>null</code>
     * @signature function(key)
     */
    get : qx.bom.Cookie.get,
    /**
     * Sets the string value of a cookie.
     *
     * @attachStatic {qxWeb, cookie.set}
     * @param key {String} The key for the string value.
     * @param value {String} The string value.
     * @param expires {Number?null} Expires directive value in days starting from now,
     *    or <code>null</code> if the cookie should be deleted when the browser
     *    is closed.
     * @param path {String?null} Path value.
     * @param domain {String?null} Domain value.
     * @param secure {Boolean?null} Secure flag.
     * @signature function(key, value, expires, path, domain, secure)
     */
    set : qx.bom.Cookie.set,
    /**
     * Deletes the string value of a cookie.
     *
     * @attachStatic {qxWeb, cookie.del}
     * @param key {String} The key for the string value.
     * @param path {String?null} Path value.
     * @param domain {String?null} Domain value.
     * @signature function(key, path, domain)
     */
    del : qx.bom.Cookie.del
  },
  defer : function(statics){

    qxWeb.$attachStatic({
      "cookie" : {
        get : statics.get,
        set : statics.set,
        del : statics.del
      }
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * Compatibility class for {@link qxWeb}.
 */
qx.Bootstrap.define("q", {
  extend : qxWeb
});
// make sure it's the same
q = qxWeb;

/* ************************************************************************

   baseLib - enterprise-proven low-level library


   http://1und1.de

   Copyright:
     2013 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     commercial

   Authors:
     * Alexander Steitz (aback)
     * Romeo Kenfack Tsakem (rkenfack)

************************************************************************ */
/**
@require(qx.module.Environment)
*/
qx.Bootstrap.define("baselib.DeviceInfo", {
  defer : function(){

    var EVENT = {
    };
    if(qxWeb.env.get("event.touch")){

      EVENT = {
        api : "touch",
        down : "touchstart",
        move : "touchmove",
        up : "touchend",
        cancel : "touchcancel",
        click : "tap"
      };
    } else if(qxWeb.env.get("event.mspointer")){

      EVENT = {
        api : "pointer",
        down : "MSPointerDown",
        move : "MSPointerMove",
        up : "MSPointerUp",
        cancel : "MSPointerCancel",
        click : qxWeb.env.get("device.type") === "desktop" ? "click" : "tap"
      };
    } else {

      EVENT = {
        api : "mouse",
        down : "mousedown",
        move : "mousemove",
        up : "mouseup",
        cancel : "mouseout",
        click : "click"
      };
    };
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    (function(){

      var lastTime = 0;
      for(var x = 0;x < vendors.length && !window.requestAnimationFrame;++x){

        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
      };
      if(!window.requestAnimationFrame){

        window.requestAnimationFrame = function(callback){

          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = window.setTimeout(function(){

            callback(currTime + timeToCall);
          }, timeToCall);
          lastTime = currTime + timeToCall;
          return id;
        };
      };
      if(!window.cancelAnimationFrame){

        window.cancelAnimationFrame = function(id){

          clearTimeout(id);
        };
      };
    }());
    (function(){

      EVENT.pageVisibility = {
        hidden : null,
        visibilityChange : null
      };
      if(document.hidden !== undefined){

        EVENT.pageVisibility.hidden = "hidden";
        EVENT.pageVisibility.visibilityChange = "visibilitychange";
      };
      var vendor = null;
      for(var i = 0;i < vendors.length;i++){

        vendor = vendors[i];
        if(document[vendor + "Hidden"] !== undefined){

          EVENT.pageVisibility.hidden = vendor + "Hidden";
          EVENT.pageVisibility.visibilityChange = vendor + "visibilitychange";
        };
      };
    }());
    EVENT.animation = {
      requestFrame : function(callback, element){

        return window.requestAnimationFrame(callback, element);
      },
      cancelFrame : function(id){

        return window.cancelAnimationFrame(id);
      }
    };
    EVENT.transitionStyleName = null;
    EVENT.transitionEndSupported = false;
    EVENT.transitionEnd = null;
    var transitionObj = qxWeb.env.get("css.transition");
    if(transitionObj !== null){

      EVENT.transitionEndSupported = true;
      EVENT.transitionStyleName = transitionObj.name;
      EVENT.transitionEnd = transitionObj["end-event"];
    };
    EVENT.resize = 'onorientationchange' in window ? 'orientationchange' : 'resize';
    q.$attachStatic({
      "EVENT" : EVENT
    });
  }
});

/* ************************************************************************

   baseLib - enterprise-proven low-level library


   http://1und1.de
   
   Copyright:
     2013 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     commercial

   Authors:
     * Alexander Steitz (aback)
     * Romeo Kenfack Tsakem (rkenfack)

************************************************************************ */
/**
 * Toggles between two or more functions when one element of the collection is clicked.
 */
qxWeb.define("baselib.Toggle", {
  statics : {
    /**
     * Fires one of the specified callbacks according to the arguments order when any element of the collection is clicked.
     *
     * @signature function(varargs)
     * @attach {qxWeb}
     */
    toggle : function(){

      var args = arguments,current = {
      },lastCalled = {
      },uid;
      var toggler = function(){
      };
      if(args.length === 0){

        return;
      };
      toggler = function(event){

        if(!this[0].uid){

          this[0].uid = (new Date()).getTime();
          current[this[0].uid] = 0;
        };
        uid = this[0].uid;
        if(event.preventDefault){

          event.preventDefault();
        } else {

          event.returnValue = false;
        };
        lastCalled[uid] = current[uid];
        //Calculating the index of the next function to be called
        current[uid] = (current[uid] + 1) % args.length;
        //Calling the current function
        return args[lastCalled[uid]].apply(this, arguments) || false;
      };
      //Toggle when a click event happen on the Element
      this.on(qxWeb.EVENT.click, toggler);
    }
  },
  defer : function(statics){

    qxWeb.$attach({
      "toggle" : statics.toggle
    });
  }
});

/* ************************************************************************

   baseLib - enterprise-proven low-level library


   http://1und1.de

   Copyright:
     2013 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     commercial

   Authors:
     * Alexander Steitz (aback)
     * Romeo Kenfack Tsakem (rkenfack)

************************************************************************ */
/**
 * Set/get text content of elements
 */
qx.Bootstrap.define("baselib.TextContent", {
  statics : {
    /**
     * Returns the text content of the first element in the collection
     *
     * @return {String} text content of the first element in the collection
     *
     * @attach {qxWeb}
     */
    getTextContent : function(){

      if(this[0]){

        return qx.bom.Label.getValue(this[0]);
      };
    },
    /**
     * Sets the text content for all elements in the collection
     *
     * @param textContent {String} new text content of the elements
     * @return {qxWeb} qxWeb instance for chaining
     *
     * @attach {qxWeb}
     */
    setTextContent : function(textContent){

      for(var i = 0;i < this.length;i++){

        qx.bom.Label.setValue(this[i], textContent);
      };
      return this;
    }
  },
  defer : function(statics){

    qxWeb.$attach({
      "getTextContent" : statics.getTextContent,
      "setTextContent" : statics.setTextContent
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Fabian Jakobs (fjakobs)

************************************************************************ */
/**
 * Cross browser abstractions to work with labels.
 */
qx.Bootstrap.define("qx.bom.Label", {
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    /**
     * Sets the content of the element.
     *
     * The possibilities of the value depends on the mode
     * defined using {@link #create}.
     *
     * @param element {Element} DOM element to modify.
     * @param value {String} Content to insert.
     */
    setValue : function(element, value){

      value = value || "";
      if(element.useHtml){

        element.innerHTML = value;
      } else if(!qx.core.Environment.get("css.textoverflow") && qx.core.Environment.get("html.xul")){

        element.firstChild.setAttribute("value", value);
      } else {

        qx.bom.element.Attribute.set(element, "text", value);
      };
    },
    /**
     * Returns the content of the element.
     *
     * @param element {Element} DOM element to query.
     * @return {String} Content stored in the element.
     */
    getValue : function(element){

      if(element.useHtml){

        return element.innerHTML;
      } else if(!qx.core.Environment.get("css.textoverflow") && qx.core.Environment.get("html.xul")){

        return element.firstChild.getAttribute("value") || "";
      } else {

        return qx.bom.element.Attribute.get(element, "text");
      };
    }
  }
});

/* ************************************************************************

   baseLib - enterprise-proven low-level library


   http://1und1.de
   
   Copyright:
     2013 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     commercial

   Authors:
     * Alexander Steitz (aback)
     * Romeo Kenfack Tsakem (rkenfack)

************************************************************************ */
/**
 * Normalizations for native events.
 *
 * This on top of the q normalization and added for easier migration
 * from older versions of the baseLib to the current (q-based) one.
 */
qx.Bootstrap.define("baselib.EventNormalization", {
  statics : {
    /**
     * List of event types to be normalized
     */
    TYPES : ["*"],
    /**
     * Manipulates the native event object, adding methods if they're not
     * already present
     *
     * @param event {Event} Native event object
     * @param element {Element} DOM element the listener was attached to
     * @return {Event} Normalized event object
     * @internal
     */
    normalize : function(event, element){

      if(!event){

        return event;
      };
      event._currentTarget = event.currentTarget || element;
      event._relatedTarget = event.relatedTarget || element;
      return event;
    }
  },
  defer : function(statics){

    qxWeb.$registerEventNormalization(statics.TYPES, statics.normalize);
  }
});

/* ************************************************************************

   baseLib - enterprise-proven low-level library


   http://1und1.de
   
   Copyright:
     2013 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     commercial

   Authors:
     * Alexander Steitz (aback)
     * Romeo Kenfack Tsakem (rkenfack)

************************************************************************ */
/**
 * Animated scrolling of the whole document.
 */
qx.Bootstrap.define("baselib.DocumentScroll", {
  statics : {
    /**
     * Animates scrolling in vertical direction
     *
     * @attachStatic{qxWeb}
     * @param value {Integer} absolute value to scroll to
     * @param duration {Integer} duration of the animation
     */
    setDocumentScrollTop : function(value, duration){

      qxWeb("html,body").setScrollTop(value, duration);
    },
    /**
     * Animates scrolling in horizontal direction
     *
     * @attachStatic{qxWeb}
     * @param value {Integer} absolute value to scroll to
     * @param duration {Integer} duration of the animation
     */
    setDocumentScrollLeft : function(value, duration){

      qxWeb("html,body").setScrollLeft(value, duration);
    }
  },
  defer : function(statics){

    qxWeb.$attachStatic({
      "setDocumentScrollTop" : statics.setDocumentScrollTop,
      "setDocumentScrollLeft" : statics.setDocumentScrollLeft
    });
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * Responsible for checking all relevant CSS transform properties.
 *
 * Specs:
 * http://www.w3.org/TR/css3-2d-transforms/
 * http://www.w3.org/TR/css3-3d-transforms/
 *
 * @internal
 */
qx.Bootstrap.define("qx.bom.client.CssTransform", {
  statics : {
    /**
     * Main check method which returns an object if CSS animations are
     * supported. This object contains all necessary keys to work with CSS
     * animations.
     * <ul>
     *  <li><code>name</code> The name of the css transform style</li>
     *  <li><code>style</code> The name of the css transform-style style</li>
     *  <li><code>origin</code> The name of the transform-origin style</li>
     *  <li><code>3d</code> Whether 3d transforms are supported</li>
     *  <li><code>perspective</code> The name of the perspective style</li>
     *  <li><code>perspective-origin</code> The name of the perspective-origin style</li>
     *  <li><code>backface-visibility</code> The name of the backface-visibility style</li>
     * </ul>
     *
     * @internal
     * @return {Object|null} The described object or null, if animations are
     *   not supported.
     */
    getSupport : function(){

      var name = qx.bom.client.CssTransform.getName();
      if(name != null){

        return {
          "name" : name,
          "style" : qx.bom.client.CssTransform.getStyle(),
          "origin" : qx.bom.client.CssTransform.getOrigin(),
          "3d" : qx.bom.client.CssTransform.get3D(),
          "perspective" : qx.bom.client.CssTransform.getPerspective(),
          "perspective-origin" : qx.bom.client.CssTransform.getPerspectiveOrigin(),
          "backface-visibility" : qx.bom.client.CssTransform.getBackFaceVisibility()
        };
      };
      return null;
    },
    /**
     * Checks for the style name used to set the transform origin.
     * @internal
     * @return {String|null} The name of the style or null, if the style is
     *   not supported.
     */
    getStyle : function(){

      return qx.bom.Style.getPropertyName("transformStyle");
    },
    /**
     * Checks for the style name used to set the transform origin.
     * @internal
     * @return {String|null} The name of the style or null, if the style is
     *   not supported.
     */
    getPerspective : function(){

      return qx.bom.Style.getPropertyName("perspective");
    },
    /**
     * Checks for the style name used to set the perspective origin.
     * @internal
     * @return {String|null} The name of the style or null, if the style is
     *   not supported.
     */
    getPerspectiveOrigin : function(){

      return qx.bom.Style.getPropertyName("perspectiveOrigin");
    },
    /**
     * Checks for the style name used to set the backface visibility.
     * @internal
     * @return {String|null} The name of the style or null, if the style is
     *   not supported.
     */
    getBackFaceVisibility : function(){

      return qx.bom.Style.getPropertyName("backfaceVisibility");
    },
    /**
     * Checks for the style name used to set the transform origin.
     * @internal
     * @return {String|null} The name of the style or null, if the style is
     *   not supported.
     */
    getOrigin : function(){

      return qx.bom.Style.getPropertyName("transformOrigin");
    },
    /**
     * Checks for the style name used for transforms.
     * @internal
     * @return {String|null} The name of the style or null, if the style is
     *   not supported.
     */
    getName : function(){

      return qx.bom.Style.getPropertyName("transform");
    },
    /**
     * Checks if 3D transforms are supported.
     * @internal
     * @return {Boolean} <code>true</code>, if 3D transformations are supported
     */
    get3D : function(){

      return qx.bom.client.CssTransform.getPerspective() != null;
    }
  },
  defer : function(statics){

    qx.core.Environment.add("css.transform", statics.getSupport);
    qx.core.Environment.add("css.transform.3d", statics.get3D);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Tristan Koch (tristankoch)

************************************************************************ */
/**
 * JSON detection.
 *
 * This class is used by {@link qx.core.Environment} and should not be used
 * directly. Please check its class comment for details how to use it.
 *
 * @internal
 */
qx.Bootstrap.define("qx.bom.client.Json", {
  statics : {
    /**
     * Checks if native JSON could be used and is full-featured.
     * @return {Boolean} <code>true</code>, if it could be used.
     * @internal
     */
    getJson : function(){

      return (// Exists
      qx.Bootstrap.getClass(window.JSON) == "JSON" && // Can parse
      JSON.parse('{"x":1}').x === 1 && // Supports replacer
      //
      // Catches browser bug found in Firefox >=3.5 && < 4, see
      // https://bugzilla.mozilla.org/show_bug.cgi?id=509184
      JSON.stringify({
        "prop" : "val"
      }, function(k, v){

        return k === "prop" ? "repl" : v;
      }).indexOf("repl") > 0);
    }
  },
  defer : function(statics){

    qx.core.Environment.add("json", statics.getJson);
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Martin Wittemann (martinwittemann)

   ======================================================================

   This class contains code based on the following work:

   * SWFFix
     http://www.swffix.org
     Version 0.3 (r17)

     Copyright:
       (c) 2007 SWFFix developers

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

     Authors:
       * Geoff Stearns
       * Michael Williams
       * Bobby van der Sluis

************************************************************************ */
/**
 * This class contains all Flash detection.
 *
 * It is used by {@link qx.core.Environment} and should not be used
 * directly. Please check its class comment for details how to use it.
 *
 * @require(qx.bom.client.OperatingSystem)
 * @internal
 */
qx.Bootstrap.define("qx.bom.client.Flash", {
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    /**
     * Checks if the flash plugin is available.
     * @return {Boolean} <code>true</code>, if flash is available.
     * @internal
     */
    isAvailable : function(){

      return parseFloat(qx.bom.client.Flash.getVersion()) > 0;
    },
    /**
     * Checks for the version of flash and returns it as a string. If the
     * version could not be detected, an empty string will be returned.
     *
     * @return {String} The version number as string.
     * @internal
     */
    getVersion : function(){

      if(navigator.plugins && typeof navigator.plugins["Shockwave Flash"] === "object"){

        var full = [0, 0, 0];
        var desc = navigator.plugins["Shockwave Flash"].description;
        if(typeof desc != "undefined"){

          desc = desc.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
          full[0] = parseInt(desc.replace(/^(.*)\..*$/, "$1"), 10);
          full[1] = parseInt(desc.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
          full[2] = /r/.test(desc) ? parseInt(desc.replace(/^.*r(.*)$/, "$1"), 10) : 0;
        };
        return full.join(".");
      } else if(window.ActiveXObject){

        var full = [0, 0, 0];
        var fp6Crash = false;
        try{

          var obj = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
        } catch(ex) {

          try{

            var obj = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
            full = [6, 0, 21];
            obj.AllowScriptAccess = "always";
          } catch(ex1) {

            if(full[0] == 6){

              fp6Crash = true;
            };
          };
          if(!fp6Crash){

            try{

              obj = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            } catch(ex1) {
            };
          };
        };
        if(!fp6Crash && typeof obj == "object"){

          var info = obj.GetVariable("$version");
          if(typeof info != "undefined"){

            info = info.split(" ")[1].split(",");
            full[0] = parseInt(info[0], 10);
            full[1] = parseInt(info[1], 10);
            full[2] = parseInt(info[2], 10);
          };
        };
        return full.join(".");
      } else {

        return "";
      };
    },
    /**
     * Checks if the flash installation is an expres installation.
     *
     * @return {Boolean} <code>true</code>, if its an express installation.
     * @internal
     */
    getExpressInstall : function(){

      var availableVersion = qx.bom.client.Flash.getVersion();
      if(availableVersion == ""){

        return false;
      };
      var os = qx.bom.client.OperatingSystem.getName();
      return (os == "win" || os == "osx") && qx.bom.client.Flash.__supportsVersion("6.0.65", availableVersion);
    },
    /**
     * Checks if a strict security model is available.
     *
     * @return {Boolean} <code>true</code>, if its available.
     * @internal
     */
    getStrictSecurityModel : function(){

      var version = qx.bom.client.Flash.getVersion();
      if(version == ""){

        return false;
      };
      var full = version.split(".");
      if(full[0] < 10){

        return qx.bom.client.Flash.__supportsVersion("9.0.151", version);
      } else {

        return qx.bom.client.Flash.__supportsVersion("10.0.12", version);
      };
    },
    /**
     * Check if the first given version is supported by either the current
     * version available on the system or the optional given second parameter.
     *
     * @param input {String} The version to check.
     * @param availableVersion {String} The version available on the current
     *   system.
     * @return {Boolean} <code>true</code>, if the version is supported.
     */
    __supportsVersion : function(input, availableVersion){

      var splitInput = input.split(".");
      var system = availableVersion || qx.bom.client.Flash.getVersion();
      system = system.split(".");
      for(var i = 0;i < splitInput.length;i++){

        var diff = parseInt(system[i], 10) - parseInt(splitInput[i], 10);
        if(diff > 0){

          return true;
        } else if(diff < 0){

          return false;
        };
      };
      return true;
    }
  },
  defer : function(statics){

    qx.core.Environment.add("plugin.flash", statics.isAvailable);
    qx.core.Environment.add("plugin.flash.version", statics.getVersion);
    qx.core.Environment.add("plugin.flash.express", statics.getExpressInstall);
    qx.core.Environment.add("plugin.flash.strictsecurity", statics.getStrictSecurityModel);
  }
});

/* ************************************************************************

   baseLib - enterprise-proven low-level library


   http://1und1.de

   Copyright:
     2013 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     commercial

   Authors:
     * Alexander Steitz (aback)
     * Romeo Kenfack Tsakem (rkenfack)

************************************************************************ */
/**
 * Feature detection module for baseLib
 * Additional feature checks which are necessary / requested by the
 * baseLib consumers go into this module.
 */
// These require are necessary to make sure the listed methods
// are *not* excluded by the static optimization
/**
@require(qx.bom.client.Event)
@require(qx.lang.Function#getName)
@require(qx.lang.Function#create)
@require(qx.lang.Function#listener)
@require(qx.lang.Function#bind)
@require(qx.lang.Type#isString)
@require(qx.lang.Type#isBoolean)
@require(qx.lang.Object#isEmpty)
@require(qx.Bootstrap#setRoot)
@require(qx.bom.Viewport#getOrientation)
@require(qx.bom.Viewport#isLandscape)
*/
qx.Bootstrap.define("baselib.FeatureDetection", {
  defer : function(){

    // add the feature check for JSON - necessary to support IE7
    qx.core.Environment.get("json");
    // this triggers the inclusion of the 'qx.bom.client.Flash'
    // feature detection class so this check can be used.
    qx.core.Environment.get("plugin.flash");
    // this triggers the inclusion of the 'qx.bom.client.CssTransform'
    // feature detection class so this check can be used.
    qx.core.Environment.get("css.transition");
    qx.core.Environment.get("css.transform");
    qx.core.Environment.get("css.transform.3d");
    // triggers the inclusion of the 'assertMap' method which is
    // necessary for the 'rest' module in the 'debug' mode
    /*jshint unused:false */
    if(qx.core.Environment.get("qx.debug")){

      var assertMap = qx.core.Assert.assertMap;
    };
  }
});

/* ************************************************************************

   baseLib - enterprise-proven low-level library


   http://1und1.de
   
   Copyright:
     2013 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     commercial

   Authors:
     * Alexander Steitz (aback)
     * Romeo Kenfack Tsakem (rkenfack)

************************************************************************ */
/**
 * URI util module for baseLib
 * This module is providing utility methods for working with URIs
 *
 * Usage :
 *
 * <pre class="javascript">
 *
 * // result is a object with the keys
 * // 'anchor' = 'anchor'
 * // 'query' = 'query=test&sort=ASC'
 * // 'file' = 'index.html'
 * // 'directory' = '/path/to/'
 * // 'path' = '/path/to/index.html'
 * // 'relative' = /'path/to/index.html?query=test&sort=ASC#anchor'
 * // 'port' = '8080'
 * // 'host' = 'qooxdoo.org'
 * // 'password' = ''
 * // 'user' = ''
 * // 'userInfo' = ''
 * // 'authority' = 'qooxdoo.org:8080'
 * // 'protocol' = 'http'
 * // 'source' = 'http://qooxdoo.org:8080/path/to/index.html?query=test&sort=ASC#anchor'
 * // 'queryKey' = { query: 'test', sort: 'ASC' }
 * var parsedUrl = q.uri.parse("http://qooxdoo.org:8080/path/to/index.html?query=test&sort=ASC#anchor");
 *
 * </pre>
 */
/**
@require(qx.util.Uri)
*/
qxWeb.define("baselib.UriUtil", {
  statics : {
    /**
     * Append string to query part of URL. Respects existing query.
     *
     * @param url {String} URL to append string to.
     * @param params {String} Parameters to append to URL.
     * @return {String} URL with string appended in query part.
     *
     * @attachStatic {qxWeb, uri.appendParams}
     */
    appendParams : function(url, params){

      return qx.util.Uri.appendParamsToUrl(url, params);
    },
    /**
     * Returns the absolute URI.
     *
     * @param uri {String} the complete URI
     * @return {String} the absolute URI
     *
     * @attachStatic {qxWeb, uri.getAbsolute}
     */
    getAbsolute : function(uri){

      return qx.util.Uri.getAbsolute(uri);
    },
    /**
     * Split URL
     *
     * Code taken from:
     *   parseUri 1.2.2
     *   (c) Steven Levithan <stevenlevithan.com>
     *   MIT License
     *
     *
     * @param str {String} String to parse as URI
     * @param strict {Boolean} Whether to parse strictly by the rules
     * @return {Object} Map with parts of URI as properties
     *
     * @attachStatic {qxWeb, uri.parse}
     */
    parse : function(str, strict){

      return qx.util.Uri.parseUri(str, strict);
    },
    /**
     * Serializes an object to URI parameters (also known as query string).
     *
     * Escapes characters that have a special meaning in URIs as well as
     * umlauts. Uses the global function encodeURIComponent, see
     * https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/encodeURIComponent
     *
     * Note: For URI parameters that are to be sent as
     * application/x-www-form-urlencoded (POST), spaces should be encoded
     * with "+".
     *
     * @param paramObject {Object}   Object to serialize.
     * @param post {Boolean} Whether spaces should be encoded with "+".
     * @return {String}      Serialized object. Safe to append to URIs or send as
     *                       URL encoded string.
     * @attachStatic {qxWeb, uri.toParameter}
     */
    toParameter : function(paramObject, post){

      return qx.util.Uri.toParameter(paramObject, post);
    }
  },
  defer : function(statics){

    qxWeb.$attachStatic({
      uri : {
        appendParams : statics.appendParams,
        getAbsolute : statics.getAbsolute,
        parse : statics.parse,
        toParameter : statics.toParameter
      }
    });
  }
});

/* ************************************************************************

   baseLib - enterprise-proven low-level library


   http://1und1.de

   Copyright:
     2013 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     commercial

   Authors:
     * Alexander Steitz (aback)
     * Romeo Kenfack Tsakem (rkenfack)

************************************************************************ */
/**
 * Tooltip module to create tooltips relative to a specific HTMLElement
 *
 * @group (Widget)
 */
qxWeb.define("baselib.Tooltip", {
  /**
  * Constructor : Returns a tooltip instance
  *
  * @param target {String | qxWeb} Placement target
  * @param element {String | qxWeb} Collection containing the tooltip element
  * @param position {String?"bottom-center"} Alignment of the tooltip with the target, any of
  * <code>"top-left"</code>, <code>"top-center"</code>, <code>"top-right"</code>,
  * <code>"bottom-left"</code>, <code>"bottom-center"</code>, <code>"bottom-right"</code>,
  * <code>"left-top"</code>, <code>"left-middle"</code>, <code>"left-bottom"</code>,
  * <code>"right-top"</code>, <code>"right-middle"</code>, <code>"right-bottom"</code>. Default is <code>"bottom-center"</code>
  * @param offsets {Map? {top:0, left : 0, right : 0, bottom : 0} } Map with the desired offsets between target and the tooltip.
  */
  construct : function(target, element, position, offsets){

    this.__target = qxWeb(target);
    this.__element = qxWeb(element);
    /** Set the tooltip position */
    this.setPosition(position);
    /** Set the placement offsets */
    this.__offsets = offsets || {
    };
    /** Update the tooltip position */
    this.updatePosition();
    /** Register resize event */
    this.__addResizeEvent();
  },
  members : {
    /** The target the tooltip will be position to*/
    __target : null,
    /** The tooltip element */
    __element : null,
    /** Position of the tooltip element */
    __position : null,
    /** Map containing the offsets to apply to the tooltip element */
    __offsets : null,
    /**
    * Returns the target the tooltip is position in to
    * @return {qxWeb} The current tooltip target
    */
    getTarget : function(){

      return this.__target;
    },
    /**
    * Set a placement target for the tooltip
    * @param target {String | qxWeb} Placement target
    *
    */
    setTarget : function(target){

      this.__target = qxWeb(target);
      this.updatePosition();
    },
    /**
    * Returns the tooltip element
    * @return {qxWeb} The tooltip element
    */
    getElement : function(){

      return this.__element;
    },
    /**
    * Set the position of the tooltip element related to the target
    * @param position {String} The position where to place the tooltip related to the current target
    */
    setPosition : function(position){

      var defaultPosition = "bottom-center";
      var positions = baselib.Tooltip.POSITIONS;
      this.__position = (positions.indexOf(position) == -1) ? defaultPosition : position;
      this.updatePosition();
    },
    /**
    * Returns the current position of the tooltip element related to it's target
    * @return {String} The current tooltip position
    */
    getPosition : function(){

      return this.__position;
    },
    /**
    * Set the offsets to use for the tooltip positioning
    * @param offsets {Map} Map containing the placement offsets
    */
    setOffsets : function(offsets){

      this.__offsets = offsets;
      this.updatePosition();
    },
    /**
    * Returns a map containing the current offsets
    * @return {Map} Map containing the current placement offsets
    */
    getOffset : function(){

      return this.__offsets;
    },
    /**
    * Check if the tooltip element is currently visible
    * @return {Boolean} return true if the tooltip element is visible
    */
    isVisible : function(){

      return this.__element.getWidth() || this.__element.getHeight();
    },
    /** Position the tooltip element related to the target */
    updatePosition : function(){

      if(this.__element.length > 0 && this.__target.length > 0){

        var defaultOffsets = {
          top : 0,
          left : 0,
          right : 0,
          bottom : 0
        };
        if(this.__offsets){

          for(var offset in defaultOffsets){

            if(typeof this.__offsets[offset] == "number"){

              defaultOffsets[offset] = this.__offsets[offset];
            };
          };
        };
        // make sure the DOM elements are rendered so we can get the size of them.
        // It's not necessary to move them out of the viewport - just out of the
        // layout flow.
        var visible = this.__element.isRendered();
        var displayStyleValue = null;
        var visibilityStyleValue = null;
        if(!visible){

          // do not use the computed style value otherwise we will mess up the styles
          // when resetting them, since these styles might also be set via a CSS class.
          displayStyleValue = this.__element[0].style.display;
          visibilityStyleValue = this.__element[0].style.visibility;
          this.__element.setStyles({
            position : "absolute",
            visibility : "hidden",
            display : "block"
          });
        };
        this.__positionElement(defaultOffsets);
        // Reset the styles to hide the element if it was previously hidden
        if(!visible){

          this.__element[0].style.display = displayStyleValue;
          this.__element[0].style.visibility = visibilityStyleValue;
        };
      };
    },
    /**
    * Position the tooltip element according the specified options.
    * @param offsets {Map} Map containing the current placement offsets
    *
    */
    __positionElement : function(offsets){

      this.__element.setStyles({
        position : "absolute",
        top : "0px",
        left : "0px"
      });
      var targetOffset = this.__target.getOffset(),elementOffset = this.__element.getOffset();
      var tooltipLeft = targetOffset.left - elementOffset.left,tooltipTop = targetOffset.top - elementOffset.top;
      var widthOffset = this.__target.getWidth() - this.__element.getWidth();
      var heightOffset = this.__target.getHeight() - this.__element.getHeight();
      var parts = this.__position.split("-");
      var styles = this.__getLeftPositionPart(tooltipLeft, tooltipTop, widthOffset, heightOffset, offsets, parts[0], {
      });
      styles = this.__getRightPositionPart(tooltipLeft, tooltipTop, widthOffset, heightOffset, offsets, parts[1], styles);
      this.__element.setStyles(styles);
    },
    /**
    * Calculates the styles to apply on the tooltip element according to the left part of the position string
    *
    * @param tooltipLeft {Number} The tooltip left position that make the left border of the tooltip fit to the target left border
    * @param tooltipTop {Number} The tooltip left position that make the top border of the tooltip fit to the target top border
    * @param widthOffset {Number} The offsetWidth of target and tooltip
    * @param heightOffset {Number} The offsetHeight of target and tooltip
    * @param offsets {Map} Map containing the current placement offsets
    * @param position {String} The left part of the positionstring
    * @param styles {Map} Map containing the initials styles
    * @return {Map} Map containing the calculated styles
    *
    */
    __getLeftPositionPart : function(tooltipLeft, tooltipTop, widthOffset, heightOffset, offsets, position, styles){

      switch(position){case "bottom":
      styles.top = (tooltipTop + this.__target.getHeight() + offsets.top) + "px";
      break;case "top":
      styles.top = (tooltipTop - this.__element.getHeight() - offsets.bottom) + "px";
      break;case "left":
      styles.left = (tooltipLeft - this.__element.getWidth() + offsets.left) + "px";
      break;case "right":
      styles.left = (tooltipLeft + this.__target.getWidth() - offsets.right) + "px";
      break;};
      return styles;
    },
    /**
    * Calculates the styles to apply on the tooltip element according to the right part of the position string
    * @param tooltipLeft {Number} The tooltip left position that make the left border of the tooltip fit to the target left border
    * @param tooltipTop {Number} The tooltip left position that make the top border of the tooltip fit to the target top border
    * @param widthOffset {Number} The offsetWidth of target and tooltip
    * @param heightOffset {Number} The offsetHeight of target and tooltip
    * @param offsets {Map} Map containing the current placement offsets
    * @param position {String} The right part of the positionstring
    * @param styles {Map} Map containing the initials styles
    * @return {Map} Map containing the calculated styles
    *
    */
    __getRightPositionPart : function(tooltipLeft, tooltipTop, widthOffset, heightOffset, offsets, position, styles){

      switch(position){case "center":
      styles.left = (tooltipLeft + widthOffset / 2 + offsets.left) + "px";
      break;case "left":
      styles.left = (tooltipLeft + offsets.left) + "px";
      break;case "right":
      styles.left = (tooltipLeft + widthOffset - offsets.right) + "px";
      break;case "middle":
      styles.top = (tooltipTop + heightOffset / 2 + offsets.top) + "px";
      break;case "top":
      styles.top = (tooltipTop + offsets.top) + "px";
      break;case "bottom":
      styles.top = (tooltipTop + heightOffset - offsets.bottom) + "px";
      break;};
      return styles;
    },
    /** Registers a resize event to update the tooltip position */
    __addResizeEvent : function(){

      qxWeb(window).on(qxWeb.EVENT.resize, function(){

        if(this.isVisible){

          this.updatePosition();
        };
      }, this);
    }
  },
  statics : {
    /**
    * Creates a tooltip with a specific element at a given position relative to the first element in the Collection.
    *
    * @attach {qxWeb}
    * @param tooltip {qxWeb} Collection containing the tooltip element
    * @param position {String?"bottom-center"} Alignment of the tooltip with the target, any of
    * <code>"top-left"</code>, <code>"top-center"</code>, <code>"top-right"</code>,
    * <code>"bottom-left"</code>, <code>"bottom-center"</code>, <code>"bottom-right"</code>,
    * <code>"left-top"</code>, <code>"left-middle"</code>, <code>"left-bottom"</code>,
    * <code>"right-top"</code>, <code>"right-middle"</code>, <code>"right-bottom"</code>. Default is <code>"bottom-center"</code>
    * @param offsets {Map? {top:0, left : 0, right : 0, bottom : 0} } Map with the desired offsets between target and the tooltip.
    * @return {baselib.Tooltip} A baselib.Tooltip instance
    *
    */
    tooltip : function(tooltip, position, offsets){

      if(!this[0] || !tooltip){

        return this;
      };
      var target = qxWeb(this[0]);
      position = position || "bottom-center";
      var defaultOffsets = {
        top : 0,
        left : 0,
        right : 0,
        bottom : 0
      };
      offsets = offsets || {
      };
      if(offsets){

        for(var offset in defaultOffsets){

          if(typeof offsets[offset] != "number"){

            offsets[offset] = defaultOffsets[offset];
          };
        };
      };
      return new baselib.Tooltip(target, tooltip, position, offsets);
    },
    /** Allowed positions */
    POSITIONS : ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right", "left-top", "left-middle", "left-bottom", "right-top", "right-middle", "right-bottom"]
  },
  defer : function(statics){

    qxWeb.$attach({
      "tooltip" : statics.tooltip
    });
  }
});

/* ************************************************************************

   baseLib - enterprise-proven low-level library


   http://1und1.de

   Copyright:
     2013 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     commercial

   Authors:
     * Alexander Steitz (aback)
     * Romeo Kenfack Tsakem (rkenfack)

************************************************************************ */
/**
 * Possibility to fire synthetically native events.
 */
qxWeb.define("baselib.NativeEvent", {
  statics : {
    /**
     * Emits a native event to be able to e.g. fire a 'mousedown' event
     * at a specific target.
     *
     * @attach{qxWeb}
     * @param type {String} event type to emit (e.g. 'mousedown')
     */
    emitNative : function(type){

      var evt;
      // dispatch for standard first
      if(document.createEvent){

        for(var i = 0;i < this.length;i++){

          evt = document.createEvent("HTMLEvents");
          evt.initEvent(type, true, true);
          this[i].dispatchEvent(evt);
        };
      } else {

        for(var j = 0;j < this.length;j++){

          evt = document.createEventObject();
          this[j].fireEvent("on" + type, evt);
        };
      };
    }
  },
  defer : function(statics){

    qxWeb.$attach({
      "emitNative" : statics.emitNative
    });
  }
});

qx.Bootstrap.define("baselib.Multiview", {
  extend : qx.event.Emitter,
  /**
  * Constructor: Returns a Multiview.
  * @param elements {Array} Array containing the stack elements
  * @param startIndex {Integer} The index of the item to be shown at start up
  */
  construct : function(elements, startIndex){

    this.__elements = elements;
    this.__startIndex = startIndex;
    this.__initialize();
  },
  events : {
    /** Fires after each switch (Hide and Show) of the multiview */
    "switch" : "qx.event.Emitter",
    /** Fires before a specific view is hidden */
    "beforehide" : "qx.event.Emitter",
    /** Fires before a specific view is shown */
    "beforeshow" : "qx.event.Emitter",
    /** Fires after a specific view has been hidden */
    "afterhide" : "qx.event.Emitter",
    /** Fires after a specific view has been shown */
    "aftershow" : "qx.event.Emitter"
  },
  members : {
    /** Stack elements */
    __elements : null,
    /** The index of the item to be shown at start up */
    __startIndex : null,
    /** The index of the current visible item */
    __currentIndex : null,
    /** Function to generate description for the hide animation */
    __hideAnimationDescription : null,
    /** Function to generate description for the show animation */
    __showAnimationDescription : null,
    /** Number of running animations */
    __state : 0,
    /** Initialize the stack */
    __initialize : function(){

      this.__currentIndex = this.__startIndex;
      /*jshint loopfunc:true */
      for(var i = 0,l = this.__elements.length;i < l;i++){

        (function(ctx, i){

          var current = qxWeb(ctx.__elements[i]);
          var startHandler = ctx.__animationStart.bind(ctx, current);
          var endHandler = ctx.__animationEnd.bind(ctx, current);
          current.on("animationStart", startHandler, ctx);
          current.on("animationEnd", endHandler, ctx);
          if(ctx.__startIndex !== undefined){

            if(i != ctx.__startIndex){

              current.hide();
            } else {

              current.show();
            };
          } else {

            current.hide();
          };
        })(this, i);
      };
    },
    /********************************************
    **************  Public API  *****************
    *********************************************/
    /** Returns the stack items*/
    getItems : function(){

      return this.__elements;
    },
    /** returns the current visible item
    * @return {QxWeb} Collection containing the current visible item
    */
    getCurrentItem : function(){

      return qxWeb(this.__elements[this.__currentIndex]);
    },
    /** Shows the next item */
    showNext : function(){

      this.showItem((this.__currentIndex + 1) % this.__elements.length, false);
    },
    /** Show the previous stack item */
    showPrev : function(){

      var prev = this.__currentIndex - 1;
      prev = prev < 0 ? prev + this.__elements.length : prev;
      this.showItem(prev, true);
    },
    /**
    * Returns the index of the current visible item
    * @return {Integer} The index of the current visible item
    */
    getCurrentIndex : function(){

      return this.__currentIndex;
    },
    /**
    * Shows the stack item at the given index
    * @param index {Integer} The index of the item to show
    */
    showItem : function(index, reverse){

      if(!this.__validateIndex(index) || (index == this.__currentIndex) || this.isAnimating()){

        return;
      };
      reverse = reverse !== undefined ? reverse : false;
      var currentItem = this.getCurrentItem();
      if(this._shouldAnimate()){

        if(currentItem.length > 0){

          this.__hide(currentItem, reverse);
        };
        this.__currentIndex = index;
        this.__show(this.getCurrentItem(), reverse);
      } else {

        if(currentItem.length > 0){

          currentItem.hide();
        };
        this.__currentIndex = index;
        this.getCurrentItem().show();
      };
    },
    /**
    * Set the function to generate the description for the hide animation
    * @param func {Function} The function for generation animation description
    */
    setHideAnimationDescription : function(func){

      this.__hideAnimationDescription = func;
    },
    /**
    * Set the function to generate the description for the show animation
    * @param func {Function} The function for generation animation description
    */
    setShowAnimationDescription : function(func){

      this.__showAnimationDescription = func;
    },
    /** Determines if any animation is running */
    isAnimating : function(){

      return this.__state > 0;
    },
    /**
    * Hides the current visible item
    * @param animate {Boolean} Determines if closing the multiview should be animated
    */
    close : function(animate){

      if(this.isAnimating()){

        return;
      };
      if(this.getCurrentItem().length > 0){

        if((this._shouldAnimate() && !animate) || !this._shouldAnimate()){

          this.getCurrentItem().hide();
          this.__currentIndex = null;
        } else if(this._shouldAnimate() && animate){

          this.once("afterhide", function(){

            this.__currentIndex = null;
          }, this);
          this.__hide(this.getCurrentItem());
        };
      };
    },
    /********************************************
    **************  Private API  *****************
    *********************************************/
    /**
    * Shows a specific stack item
    * @param item {qxWeb} The item to be shown
    * @param reverse {Boolean} Determines if the animation should be reversed
    */
    __show : function(item, reverse){

      item.show();
      this.emit("beforeshow", {
        target : item,
        reverse : reverse
      });
      window.setTimeout(function(){

        var description = this.__showAnimationDescription.call(item, reverse);
        item[0].$$qxoperation = "show";
        item.animate(description);
      }.bind(this), 10);
    },
    /**
    * Hide a specific stack item
    * @param item {qxWeb} The item to be hidden
    * @param reverse {Boolean} Determines if the animation should be reversed
    */
    __hide : function(item, reverse){

      this.emit("beforehide", {
        target : item,
        reverse : reverse
      });
      window.setTimeout(function(){

        var description = this.__hideAnimationDescription.call(item, reverse);
        item[0].$$qxoperation = "hide";
        item.animate(description);
      }.bind(this), 10);
    },
    /**
    * Callback for animationStart event
    */
    __animationStart : function(){

      this.__state++;
    },
    /**
    * Callback for animationEnd event
    * @param target {qxWeb} The target the animation is running on
    */
    __animationEnd : function(target){

      if(target[0].$$qxoperation == "hide"){

        target.hide();
        this.emit("afterhide", {
          target : target
        });
      } else {

        this.emit("aftershow", {
          target : target
        });
      };
      this.__state--;
      if(this.__state === 0){

        this.emit("switch", {
          current : this.getCurrentItem()
        });
      };
    },
    /**
       * Checks if a given index exists for the multiview
       * @param index {Integer} the index to check
       * @return {Boolean} Returned value is true if the index was valid
       */
    __validateIndex : function(index){

      if(qxWeb.type.get(index) === "Number" && (parseFloat(index) == parseInt(index, 10))){

        return index >= 0 && index < this.__elements.length;
      };
      return false;
    },
    /** Determines if animations should be used for hide/show actions */
    _shouldAnimate : function(){

      return (typeof this.__hideAnimationDescription == "function") && (typeof this.__showAnimationDescription == "function");
    }
  }
});

/* ************************************************************************

   baseLib - enterprise-proven low-level library


   http://1und1.de

   Copyright:
     2013 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     commercial

   Authors:
     * Alexander Steitz (aback)
     * Romeo Kenfack Tsakem (rkenfack)

************************************************************************ */
/**
 * CSS/Style property methods.
 */
qx.Bootstrap.define("baselib.Css", {
  statics : {
    /**
     * Returns the maximum width value of the collection elements.
     *
     * @attach{qxWeb}
     * @param force {Boolean?false} Whether <em>non-displayed</em> elements should be considered
     * @return {Number} the maximum width value of the collections elements
     */
    getWidthMax : function(force){

      var widths = [];
      this.forEach(function(item){

        widths.push(qxWeb(item).getWidth(force));
      });
      return qxWeb.array.max(widths);
    },
    /**
     * Returns the minimum width value of the collection elements.
     *
     * @attach{qxWeb}
     * @param force {Boolean?false} Whether <em>non-displayed</em> elements should be considered
     * @return {Number} the minimum width value of the collections elements
     */
    getWidthMin : function(force){

      var widths = [];
      this.forEach(function(item){

        widths.push(qxWeb(item).getWidth(force));
      });
      return qxWeb.array.min(widths);
    },
    /**
      Returns the maximum height value of the collection elements.
     *
     * @attach{qxWeb}
     * @param force {Boolean?false} Whether <em>non-displayed</em> elements should be considered
     * @return {Number} the maximum height value of the collections elements
     */
    getHeightMax : function(force){

      var heights = [];
      this.forEach(function(item){

        heights.push(qxWeb(item).getHeight(force));
      });
      return qxWeb.array.max(heights);
    },
    /**
     * Returns the minimum height value of the collection elements.
     *
     * @attach{qxWeb}
     * @param force {Boolean?false} Whether <em>non-displayed</em> elements should be considered
     * @return {Number} the minimum height value of the collections elements
     */
    getHeightMin : function(force){

      var heights = [];
      this.forEach(function(item){

        heights.push(qxWeb(item).getHeight(force));
      });
      return qxWeb.array.min(heights);
    }
  },
  defer : function(statics){

    qxWeb.$attach({
      "getWidthMax" : statics.getWidthMax,
      "getWidthMin" : statics.getWidthMin,
      "getHeightMax" : statics.getHeightMax,
      "getHeightMin" : statics.getHeightMin
    });
  }
});

/* ************************************************************************

   baseLib - enterprise-proven low-level library


   http://1und1.de

   Copyright:
     2013 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     commercial

   Authors:
     * Alexander Steitz (aback)

************************************************************************ */
/**
 * Small utility to sync a selectbox with any content (container).
 */
qx.Bootstrap.define('baselib.SelectboxSync', {
  statics : {
    /**
     * Internal registry for all listeners which are attached
     * @internal
     */
    __listeners : null,
    /**
     * Sync the element of the collection (normally a selectbox element) with the given target
     * using the data structure provided.
     * The <code>keys</code> of the data structure represent the values of the selectbox and the
     * <code>entries</code> of the data structure is the content to sync.
     * Auto-sync is done right at the beginning.
     *
     * @attach{qxWeb}
     * @param data {Object} the data structure to sync
     * @param target {qxWeb|Element} the target of the sync. Either a collection or a DOM element.
     * @param targetAttribute {String?html} Optional attribute to sync.
     * If you like to set any other attribute than <code>html</code>
     * @return {qxWeb} collection for chaining
     */
    selectSync : function(data, target, targetAttribute){

      if(!this[0]){

        if(qxWeb.env.get('qx.debug') && qxWeb.log !== undefined){

          qxWeb.log.debug(baselib.SelectboxSync, 'Your collection is empty! It has to match a select element.');
        };
        return this;
      };
      if(!(target instanceof qxWeb)){

        target = qxWeb(target);
      };
      if(target.length === 0){

        if(qxWeb.env.get('qx.debug') && qxWeb.log !== undefined){

          qxWeb.log.debug(baselib.SelectboxSync, 'Your target collection is empty! It has to match an element.');
        };
        return this;
      };
      if(targetAttribute === undefined){

        targetAttribute = 'html';
      };
      var src = this.eq(0),srcAttribute = 'value',functionName = baselib.SelectboxSync.__createFunctionName(src, srcAttribute, target, targetAttribute),selected = src.getAttribute('value');
      if(baselib.SelectboxSync.__listeners[functionName] !== undefined){

        return this;
      };
      baselib.SelectboxSync.__listeners[functionName] = function(){

        target.setAttribute(targetAttribute, data[this.getValue()]);
      };
      src.on('change', baselib.SelectboxSync.__listeners[functionName]);
      // sync directly with the current value on startup
      target.setAttribute(targetAttribute, data[selected]);
    },
    /**
     * Unsync the element of the collection (normally a selectbox element) with the given target
     * using the data structure provided.
     * The <code>keys</code> of the data structure represent the values of the selectbox and the
     * <code>entries</code> of the data structure is the content to sync.
     *
     * @attach{qxWeb}
     * @param target {qxWeb|Element} the target of the sync. Either a collection or a DOM element.
     * @param targetAttribute {String?html} Optional attribute to sync.
     * If you like to set any other attribute than <code>html</code>
     * @return {qxWeb} collection for chaining
     */
    selectUnsync : function(target, targetAttribute){

      if(!this[0]){

        return this;
      };
      var src = this.eq(0),srcAttribute = 'value',functionName = baselib.SelectboxSync.__createFunctionName(src, srcAttribute, target, targetAttribute),listenerToRemove = baselib.SelectboxSync.__listeners[functionName];
      if(!(target instanceof qxWeb)){

        target = qxWeb(target);
      };
      if(targetAttribute === undefined){

        targetAttribute = 'html';
      };
      if(listenerToRemove !== undefined){

        src.off('change', baselib.SelectboxSync.__listeners[functionName]);
      };
    },
    /**
     * Creates an unified function name to add to the target. This little helper
     * is used to add it to the "registry"
     *
     * @param src {qxWeb} collection with the source element (the one which is the source of the sync)
     * @param srcAttribute {String} name of the source attribute for the sync
     * @param target {qxWeb} collection with the target element (the one which is the target of the sync)
     * @param targetAttribute {String} name of the target attribute for the sync
     * @return {String} the name of the function
     *
     * @internal
     */
    __createFunctionName : function(src, srcAttribute, target, targetAttribute){

      var functionName = src[0].nodeName.toLowerCase();
      functionName += srcAttribute.toLowerCase();
      functionName += target[0].nodeName.toLowerCase();
      functionName += targetAttribute.toLowerCase();
      return functionName;
    }
  },
  defer : function(statics){

    qxWeb.$attach({
      'selectSync' : statics.selectSync,
      'selectUnsync' : statics.selectUnsync
    });
    baselib.SelectboxSync.__listeners = {
    };
  }
});

/* ************************************************************************

   baseLib - enterprise-proven low-level library


   http://1und1.de

   Copyright:
     2013 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     commercial

   Authors:
     * Alexander Steitz (aback)
     * Romeo Kenfack Tsakem (rkenfack)

************************************************************************ */
/**
 * Utility methods to simplify the event handling for specific browser issues.
 */
/**
@require(qx.module.util.Function)
*/
qx.Bootstrap.define('baselib.event.Util', {
  statics : {
    /** Whether a callback is already attached */
    __attached : false,
    /** Internal data structure to memorize the callbacks */
    __callbacks : null,
    /** Internal data structure to memorize the contexts of the callbacks */
    __contexts : null,
    /**
     * Register a callback for <code>resize</code> events. This callback is only
     * called once even if the event is fired twice directly in sequence.
     * Very useful to solve browser issues with these resize events
     * (e.g. Firefox and at least IE8 are firing them twice).
     *
     * This is a convienent method for
     * <pre class="javascript">q(window).on('resize', q.func.throttle(callback, 150, { trailing: false }), context);</pre>
     *
     * @attachStatic{qxWeb}
     *
     * @param callback {Function} The callback to notify
     * @param context {Object?window} The context in which the callback should be called
     */
    onResize : function(callback, context){

      var Util = baselib.event.Util;
      Util.__callbacks.push(callback);
      Util.__contexts.push(context !== undefined ? context : window);
      if(Util.__attached === false){

        var internalCallback = function(e){

          var eventClone = qxWeb.object.clone(e);
          for(var i = 0,j = Util.__callbacks.length;i < j;i++){

            Util.__callbacks[i].call(Util.__contexts[i], eventClone);
          };
        };
        var throttled = qxWeb.func.throttle(internalCallback, 150, {
          trailing : false
        });
        qxWeb(window).on('resize', throttled);
      };
      Util.__attached = true;
    }
  },
  defer : function(statics){

    qxWeb.$attachStatic({
      'onResize' : statics.onResize
    });
    baselib.event.Util.__callbacks = [];
    baselib.event.Util.__contexts = [];
  }
});

/* ************************************************************************

   baseLib - enterprise-proven low-level library


   http://1und1.de

   Copyright:
     2013 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     commercial

   Authors:
     * Alexander Steitz (aback)
     * Romeo Kenfack Tsakem (rkenfack)

************************************************************************ */
/**
* Viewport utility functions
*/
qx.Bootstrap.define("baselib.util.Viewport", {
  statics : {
    /**
    * Returns a map containing the offsets of the first element in the collection relative to the viewport origin
    * @attach {qxWeb}
    * @return {Map} A map containing the offsets
    */
    getViewportOffset : function(){

      if(!this[0]){

        return;
      };
      var rect = this[0].getBoundingClientRect();
      return {
        top : rect.top,
        bottom : rect.bottom,
        left : rect.left,
        right : rect.right
      };
    }
  },
  defer : function(statics){

    qxWeb.$attach({
      "getViewportOffset" : statics.getViewportOffset
    });
  }
});


  // Export the global 'qxWeb' variable to '$q'. This variable is used by the follow-up
  // modules to guard them against overwriting 'q' in the global namespace.
  // It is necessary to define the variable locally - "copy" it into the local function 
  // scope before exporting it.
  if (!window.$q) {
    window.$q = window.qxWeb;
  }

  window["qx"] = undefined;
  try {
    delete window.qx;
  } catch(e) {}
})();