var EventPublisher = function (moduleName) {
    this.moduleName = moduleName;
};

EventPublisher.prototype.eventHandlers = {};

EventPublisher.prototype.publishEvents = function (moduleName, eventName) {
    if (this.eventHandlers[eventName] !== undefined && Array.isArray(this.eventHandlers[eventName][moduleName])) {
        this.eventHandlers[eventName][moduleName].forEach(function (fn) {
            fn();
        });
    }
};

EventPublisher.prototype.publish = function (eventName, cb) {
    var that = this;

    setTimeout(function () {
        that.publishEvents(that.moduleName, eventName);
        that.publishEvents(null, eventName);
        that.publishEvents(that.moduleName, null);
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