/**
 * Created by p.campanella on 24/09/2014.
 */

var SensorTableController = (function() {
    function SensorTableController($scope, $log, $location, oConstantService) {
        this.m_oScope = $scope;
        this.m_oScope.m_oController = this;
        this.m_oLog = $log;
        this.m_oLocation = $location;
        this.m_oConstantsService = oConstantService;
    }

    SensorTableController.prototype.linkClicked = function (sPath) {
        this.m_oLocation.path(sPath);
    }


    SensorTableController.$inject = [
        '$scope',
        '$log',
        '$location',
        'ConstantsService'
    ];
    return SensorTableController;
}) ();
