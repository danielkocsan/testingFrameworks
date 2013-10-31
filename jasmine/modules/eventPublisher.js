var EventPublisher = function (moduleName) {
    this.moduleName = moduleName;
};

EventPublisher.prototype.eventHandlers = {};

EventPublisher.prototype.publishEvents = function (moduleName, eventName, params) {
    var listeners,
        args = [moduleName, eventName];

    for (var i = 0, len = params.length; i < len; i++) {
        args.push(params[i]);
    }

    if (this.eventHandlers[eventName] !== undefined && Array.isArray(this.eventHandlers[eventName][moduleName])) {
        listeners = this.eventHandlers[eventName][moduleName];
        for (var i = 0, len = listeners.length; i < len; i++) {
            if (typeof(listeners[i]) === "function") {
                listeners[i].apply(this, args);
            }
        }
    }
};

EventPublisher.prototype.publish = function () {
    var that = this,
        eventName = arguments[0],
        cb = arguments[arguments.length - 1],
        params = Array.prototype.slice.call(arguments, 1, arguments.length);

    setTimeout(function () {
        that.publishEvents(that.moduleName, eventName, params);
        that.publishEvents(null, eventName, params);
        that.publishEvents(that.moduleName, null, params);
        if (typeof(cb) === "function") {
            cb();
        }
    }, 0);


};
EventPublisher.prototype.subscribe = function (eventName, moduleName, callback) {
    if (!this.eventHandlers[eventName]) {
        this.eventHandlers[eventName] = {};
    }

    if (!this.eventHandlers[eventName][moduleName]) {
        this.eventHandlers[eventName][moduleName] = [];
    }

    this.eventHandlers[eventName][moduleName].push(callback);
};
EventPublisher.prototype.unsubscribe = function (eventName, moduleName) {
    if (this.eventHandlers[eventName] !== undefined && Array.isArray(this.eventHandlers[eventName][moduleName])) {
        this.eventHandlers[eventName][moduleName] = null;
    }
};