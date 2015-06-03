(function() {
    'use strict';

    function Socket(config, merge, em) {
        var socket = null;

        //region default params
        var CloseCodes = {
            CLOSE_NORMAL: 1000,
            CLOSE_GOING_AWAY: 1001,
            CLOSE_PROTOCOL_ERROR: 1002,
            CLOSE_UNSUPPORTED: 1003,
            CLOSE_NO_STATUS: 1005,
            CLOSE_ABNORMAL: 1006,
            CLOSE_TOO_LARGE: 1009
        };
        var IS_OPEN_STATE = 1;
        var INFINITE_COUNT_OF_ATTEMPTS = -1;
        var DEFAULT_ATTEMPTS_TIMEOUT = 10 * 1000;
        //endregion

        //region reconnect
        var reconnectTimeout = null;
        var reconnectAttempts = 0;
        //endregion

        var sendMessageCollection = [];

        //region config
        var checkConfig = function(config) {
            return merge({
                attempts: 0,
                attemptsTimeout: DEFAULT_ATTEMPTS_TIMEOUT,
                url: '',
                isUseEchoProtocol: false
            }, config);
        };

        checkConfig(config);
        //endregion
        var onError = function(errorEvent) {
            em.trigger('error', errorEvent);
            this.abort(true);
        }.bind(this);

        //region socket events
        var socketEvents = {
            onClose: function(closeEvent) {
                socket = null;
                var isStartReconnect = closeEvent.code !== CloseCodes.CLOSE_NORMAL
                    && (
                        INFINITE_COUNT_OF_ATTEMPTS === config.attempts
                        || config.attempts > reconnectAttempts
                    );

                if (isStartReconnect) {
                    reconnectAttempts++;
                    reconnectTimeout = window.setTimeout(
                        this.connection.bind(this), config.attemptsTimeout
                    );
                }
                em.trigger('close', closeEvent);
            },
            onError: onError,
            onOpen: function(openEvent) {
                reconnectAttempts = 0;
                while (sendMessageCollection.length) {
                    var message = sendMessageCollection.shift();
                    this.send(message);
                }
                em.trigger('open', openEvent);
            },
            onMessage: function(messageEvent) {
                em.trigger('message', JSON.parse(messageEvent.data));
            }
        };
        //endregion

        //regions public function
        this.connection = function() {
            if (!socket) {
                this.abort();
            }

            if (!config.url) {
                onError(new Error('Url does not exist'));
                return false;
            }

            try {
                if (config.isUseEchoProtocol) {
                    socket = new WebSocket(config.url, 'echo-protocol');
                } else {
                    socket = new WebSocket(config.url);
                }
            } catch(e) {
                onError(e);
                return false;
            }

            socket.onclose = socketEvents.onClose.bind(this);
            socket.onmessage = socketEvents.onMessage.bind(this);
            socket.onerror = socketEvents.onError.bind(this);
            socket.onopen = socketEvents.onOpen.bind(this);
            return true;
        };

        this.abort = function(isNotReconnect) {
            if (reconnectTimeout && !isNotReconnect) {
                clearTimeout(reconnectTimeout);
                reconnectTimeout = null;
            }
            if (!socket) {
                return true;
            }
            socket.onclose = null;
            socket.onerror = null;
            socket.close();
            socket = null;
            reconnectTimeout = null;
            reconnectAttempts = 0;
            return true;
        };

        this.isOpenConnection = function() {
            return socket && socket.readyState === IS_OPEN_STATE;
        };

        this.send = function(message) {
            if (!this.isOpenConnection()) {
                sendMessageCollection.push(message);
            } else {
                socket.send(message);
                em.trigger('sendMessage', message);
            }
            return this;
        };

        this.setConfig = function(newConfig) {
            if (newConfig) {
                config = checkConfig(newConfig);
            }
            return this;
        };

        this.getConfig = function() {
            return config;
        };

        this.on = em.on.bind(em);
        this.off = em.off.bind(em);
        //endregion
    }

    function SocketService(mergeService, Em) {
        return {
            create: function(config) {
                return new Socket(config, mergeService, Em.create());
            }
        };
    }

    angular.module('app.service')
        .factory('socketService', ['mergeService', 'eventManagerService', SocketService]);
})();
