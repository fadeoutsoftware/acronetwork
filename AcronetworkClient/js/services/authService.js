/**
 * Created by p.campanella on 20/08/2014.
 */


'use strict';
angular.module('acronetwork.authService', ['acronetwork.ConstantsService']).
    service('AuthService', ['$http',  'ConstantsService', function ($http, oConstantsService) {
        this.APIURL = oConstantsService.getAPIURL();

        this.m_oHttp = $http;

        this.login = function(oCredentials) {
            return this.m_oHttp.post(this.APIURL + '/auth/login',oCredentials);
        }

        this.logout = function() {
            return this.m_oHttp.get(this.APIURL + '/auth/logout');
        }

        this.saveUserSettings = function(oSettings) {
            return this.m_oHttp.post(this.APIURL + '/auth/settings',oSettings);
        }

        this.saveMapUserSettings = function(oSettings) {
            return this.m_oHttp.post(this.APIURL + '/auth/mapsettings',oSettings);
        }
    }]);

