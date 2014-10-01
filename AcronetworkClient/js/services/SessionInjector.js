/**
 * Created by p.campanella on 22/08/2014.
 */

angular.module('acronetwork.sessionInjector', ['acronetwork.ConstantsService']).
    factory('sessionInjector', ['ConstantsService', function(oConstantsService) {
    var sessionInjector = {
        request: function(config) {
            config.headers['x-session-token'] = oConstantsService.getSessionId();
            return config;
        }
    };
    return sessionInjector;
}]);