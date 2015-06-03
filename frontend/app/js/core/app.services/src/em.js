(function() {
    'use strict';

    var EventManager = function() {
        this.eventCollections = {};
        this.triggering = true;
        this.valid = true;
        this.childs = [];
        this.childsLn = 0;
    };

    var getListenerIndex = function(eventName, listener, cntx) {
        var eventCollections = cntx.eventCollections[eventName] || [];
        for (var i = 0, l = eventCollections.length; i < l; i++) {
            if (listener === eventCollections[i].listener) {
                return i;
            }
        }
        return -1;
    };
    var addListener = function(eventName, listener, priority, isRemove) {
        if (!this.eventCollections[eventName]) {
            this.eventCollections[eventName] = [];
        }
        var listenerObj = {
            isRemove: !!isRemove,
            listener: listener
        };
        if (-1 === getListenerIndex(eventName, listenerObj, this)) {
            priority = typeof(priority) === 'undefined'
                ? this.eventCollections[eventName].length
                : priority;
            this.eventCollections[eventName].splice(priority, 0, listenerObj);
        }
        return this;
    };
    var getListenerPriority = function(eventName, listener) {
        var index = getListenerIndex(eventName, listener, this);
        return -1 !== index
            ? index
            : undefined;
    };
    var removeListener = function(eventName, listener) {
        if (!eventName && !listener) {
            this.eventCollections = [];
            return this;
        }

        if (eventName && !listener) {
            if (this.eventCollections.hasOwnProperty(eventName)) {
                delete this.eventCollections[eventName];
            }
        }

        var index = getListenerIndex(eventName, listener, this);
        if (-1 !== index) {
            this.eventCollections[eventName].splice(index, 1);
        }
        return this;
    };
    var triggerEvent = function(eventName, params) {
        this.valid = true;
        if (this.eventCollections[eventName]) {
            var events = this.eventCollections[eventName];
            for (var i = 0, ln = events.length; i < ln && this.triggering; i++) {
                var listenerObj = events[i];
                if (!listenerObj || !listenerObj.listener) {
                    continue;
                }
                var listener = listenerObj.listener;
                var eventObject = {
                    eventManager: this,
                    event: eventName,
                    context: this.getContext(),
                    params: params || null
                };
                if (Array.isArray(listener)) {
                    listener[1].call(listener[0], eventObject);
                } else {
                    listener(eventObject);
                }
                if (listenerObj.isRemove) {
                    this.removeListener(eventName, listener);
                    i -= 1;
                    ln -= 1;
                }
            }
        }
        for (var k = this.childsLn; k-- > 0;) {
            this.childs[k].triggerEvent(eventName, params);
        }
        this.triggering = true;
        return this;
    };

    EventManager.prototype = {
        on: addListener,
        once: function(eventName, listener, priority) {
            return this.addListener(eventName, listener, priority, true);
        },
        addListener: addListener,
        addEventListener: addListener,
        getListenerPriority: getListenerPriority,
        removeListener: removeListener,
        removeEventListener: removeListener,
        off: removeListener,
        triggerEvent: triggerEvent,
        trigger: triggerEvent,
        stopTriggering: function() {
            this.triggering = false;
            return this;
        },
        getContext: function() {
            return this.context;
        },
        clear: function(eventName) {
            if (eventName) {
                delete this.eventCollections[eventName];
                return this;
            }
            this.eventCollections = {};
            return this;
        },
        setContext: function(obj) {
            this.context = obj;
            return this;
        },
        isValid: function() {
            return this.valid;
        },
        setValid: function(o) {
            this.valid = o;
            return this;
        },
        extend: function(em) {
            em.addChild(this);
            return this;
        },
        addChild: function(em) {
            this.childs.push(em);
            this.childsLn++;
            return this;
        }
    };

    function EventManagerService() {
        return {
            create: function() {
                return new EventManager();
            }
        };
    }

    angular.module('app.service')
        .service('eventManagerService', EventManagerService);
})();
