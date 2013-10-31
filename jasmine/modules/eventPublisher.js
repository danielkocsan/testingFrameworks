var EventPublisher = function (moduleName) {
    this.moduleName = moduleName;
};

EventPublisher.prototype.eventHandlers = {};

EventPublisher.prototype.publishEvents = function (moduleName, eventName,params) {
    if (this.eventHandlers[eventName] !== undefined && Array.isArray(this.eventHandlers[eventName][moduleName])) {
        this.eventHandlers[eventName][moduleName].forEach(function (fn) {
            var args = [moduleName,eventName],
                i = 0,
                len = params.length;

            for(; i < len; i++)
            {
                args.push(params[i]);
            }
            fn.apply(this,args);
        });
    }
};

EventPublisher.prototype.publish = function () {
    var that = this,
        eventName = arguments[0],
        cb = arguments[arguments.length-1],
        params = Array.prototype.slice.call(arguments,1,arguments.length);

    setTimeout(function () {
        that.publishEvents(that.moduleName, eventName,params);
        that.publishEvents(null, eventName,params);
        that.publishEvents(that.moduleName, null,params);
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
EventPublisher.prototype.unsubscribe = function () {
    return false;
};