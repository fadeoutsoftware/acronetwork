/**
 * Created by p.campanella on 30/05/2014.
 */

'use strict';

angular.module('acronetwork.chartService', ['acronetwork.ConstantsService']).
    service('ChartService', ['$http', 'ConstantsService',  function ($http, oConstantsService) {

        this.m_oHttp = $http;
        this.m_oConstantsService = oConstantsService;

        this.m_aoCharts = [];

        this.setChart  = function(sCode, oChart) {

            for (var iCount = 0; iCount<this.m_aoCharts.length; iCount++) {
                var oChartReference = this.m_aoCharts[iCount];
                if (angular.isDefined(oChartReference)) {
                    if (oChartReference.sCode == sCode) {
                        oChartReference.oChart = oChart;
                        break;
                    }
                }
            }
        }

        this.addChart  = function(sCode, oChart) {
            var oChartReference = {};

            oChartReference.sCode = sCode;
            oChartReference.oChart = oChart;

            this.m_aoCharts.push(oChartReference);
        }

        this.getChart = function(sCode) {
            for (var iCount = 0; iCount<this.m_aoCharts.length; iCount++) {
                var oChartReference = this.m_aoCharts[iCount];
                if (angular.isDefined(oChartReference)) {
                    if (oChartReference.sCode == sCode) {
                        return oChartReference.oChart;
                    }
                }
            }

            return null;
        }

        this.removeChart = function(sCode) {
            for (var iCount = 0; iCount<this.m_aoCharts.length; iCount++) {
                var oChartReference = this.m_aoCharts[iCount];
                if (angular.isDefined(oChartReference)) {
                    if (oChartReference.sCode == sCode) {
                        this.m_aoCharts.splice(iCount,1);
                        return;
                    }
                }
            }
        }

        this.getStationChart = function(sSensorCode, sChart) {
            var sAPIURL = this.m_oConstantsService.getAPIURL();
            return this.m_oHttp.get(sAPIURL + '/charts/'+sSensorCode+'/'+sChart);
        }


        this.exportCsvStationChart = function(sSensorCode, sChart) {
            var sAPIURL = this.m_oConstantsService.getAPIURL();
            //return this.m_oHttp.get(sAPIURL + '/charts/csv/'+sSensorCode+'/'+sChart);
            return sAPIURL + '/charts/csv/'+sSensorCode+'/'+sChart;
        }

        this.isStockChart = function(sSensorType) {
            if (sSensorType == 'Pluvio') return false;
            if (sSensorType == 'PluvioNative') return false;
            if (sSensorType == 'Vento') return false;

            return true;
        }

    }]);

