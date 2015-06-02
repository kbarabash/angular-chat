(function() {
    'use strict';

    function Logger(CONFIG) {
        localStorage.setItem('debug', CONFIG.debug ? 1 : 0);

        this.isShowDebug = function() {
            if (!window.console) {
                return false;
            }
            if (CONFIG.debug) {
                return true;
            }
            return '1' === localStorage.getItem('debug');
        };

        this.style = {
            error: 'color: #d83343; font-weight: bold',
            success: 'color: #27ae60; font-weight: bold',
            alert: 'color: #8e44ad; font-weight: bold',
            warning: 'color: #e67e22; font-weight: bold',
            notice: 'color: #0074c9; font-weight: bold'
        };
        var Namespace = function() {
            var namespaces = [];
            var hideAll = false;

            this.isShow = function(namespace) {
                if (namespace) {
                    if (hideAll) {
                        return false;
                    }
                    if (0 !== namespaces.length) {
                        if (-1 === namespaces.indexOf(namespace)) {
                            return false;
                        }
                    }
                }
                return true;
            };

            this.showAll = function() {
                hideAll = false;
                namespaces = [];
            };

            this.showOnly = function() {
                hideAll = false;
                for (var i = 0; i < arguments.length; i++) {
                    if (-1 === namespaces.indexOf(arguments[i])) {
                        namespaces.push(arguments[i]);
                    }
                }
            };

            this.hideAll = function() {
                hideAll = true;
            };
        };

        this.namespace = new Namespace();

        this.write = function(text, color, namespace) {
            if (this.isShowDebug()) {
                if (!this.namespace.isShow(namespace)) {
                    return this;
                }
                var appendText = false;
                var content = '';
                var args = [];
                if (namespace) {
                    content += namespace + ': ';
                }
                if ('string' === typeof text) {
                    content += text;
                    appendText = true;
                }
                if (color) {
                    args.push('%c ' + content);
                    args.push(color);
                } else {
                    args.push(content);
                }
                if (!appendText) {
                    args.push(text);
                }

                console.log.apply(console, args);
            }
            return this;
        };

        this.log = function(text, namespace) {
            return this.write(text, null, namespace, 'Log');
        };

        this.notice = function(text, namespace) {
            return this.write(text, this.style.notice, namespace, 'Notice');
        };

        this.warning = function(text, namespace) {
            return this.write(text, this.style.warning, namespace, 'Warning');
        };

        this.success = function(text, namespace) {
            return this.write(text, this.style.success, namespace, 'Success');
        };

        this.error = function(text, namespace) {
            return this.write(
                text, this.style.error,
                namespace, 'Error', true
            );
        };

        this.alert = function(text, namespace) {
            return this.write(text, this.style.alert, namespace, 'Alert');
        };
    }

    angular.module('app.service')
        .service('loggerService', ['CONFIG', Logger]);
})();
