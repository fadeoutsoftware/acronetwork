/**
 * Created by p.campanella on 30/05/2014.
 */


var ChartController = (function() {
    function ChartController($scope, dialogService, oChartService, $timeout, oConstantsService, $log) {
        this.m_oScope = $scope;
        this.m_oScope.m_oController = this;
        this.m_oDialogService = dialogService;
        this.m_oChartService = oChartService;
        this.m_oConstantsService = oConstantsService;
        this.m_aoOtherCharts = [];
        this.m_bLoading = true;
        this.m_oLog = $log;
        this.m_oDialogModel = this.m_oScope.model;
        this.m_sDialogTitle = "";

        this.oChartVM = [];

        this.m_sStationCode = this.m_oScope.model.stationCode;
        this.m_sChartType = this.m_oScope.model.chartType;

        var oControllerVar = this;


        oControllerVar.oChartVM = oControllerVar.m_oChartService.getStationChart(this.m_sStationCode,this.m_sChartType).success(function(data,status) {

            if (!angular.isDefined(data)){
                alert('Impossibile caricare il grafico della stazione ' + oControllerVar.m_sStationCode);
                oControllerVar.m_bLoading = false;
                return;
            }
            if (data=="") {
                alert('Impossibile caricare il grafico della stazione ' + oControllerVar.m_sStationCode);
                oControllerVar.m_bLoading = false;
                return;
            }

            oControllerVar.oChartVM = data;

            var oDialog = oControllerVar.m_oDialogService.getExistingDialog(oControllerVar.m_sStationCode);


            if(angular.isDefined(oControllerVar.oChartVM.otherChart)) {

                oControllerVar.oChartVM.otherChart.forEach(function(sType){
                    var oOtherChartLink = {};
                    oOtherChartLink.sensorType = sType;

                    if (oControllerVar.m_sChartType == sType)
                    {
                        oOtherChartLink.isActive = true;
                    }
                    else
                    {
                        oOtherChartLink.isActive = false;
                    }

                    var oSensorLink = oControllerVar.m_oConstantsService.getSensorLinkByType(sType);

                    if (oSensorLink != null)
                    {
                        oOtherChartLink.description = oSensorLink.description;
                        oOtherChartLink.imageLinkOff = oSensorLink.imageLinkOff;
                    }

                    oControllerVar.m_aoOtherCharts.push(oOtherChartLink);
                });

            }

            oControllerVar.addSeriesToChart();

            oControllerVar.m_bLoading = false;
        }).error(function(data,status){
            oControllerVar.m_oLog.error('Error Contacting Omirl Server');
        });
    }


    ChartController.prototype.isLoadingVisibile = function () {
        return this.m_bLoading;
    }

    ChartController.prototype.getOtherLinks = function() {
        return this.m_aoOtherCharts;
    }

    ChartController.prototype.otherLinkClicked = function(oOtherLink) {

        var oControllerVar = this;
        this.m_bLoading = true;

        var bIsStockChart = true;
        bIsStockChart = oControllerVar.m_oChartService.isStockChart(oOtherLink.sensorType);

        oControllerVar.oChartVM = oControllerVar.m_oChartService.getStationChart(this.m_sStationCode,oOtherLink.sensorType).success(function(data,status) {

            oControllerVar.m_oScope.model.isStock = bIsStockChart;
            oControllerVar.oChartVM = data;
            oControllerVar.m_sChartType = oOtherLink.sensorType;

            oControllerVar.m_aoOtherCharts = [];

            if(angular.isDefined(oControllerVar.oChartVM.otherChart)) {

                oControllerVar.oChartVM.otherChart.forEach(function(sType){
                    var oOtherChartLink = {};
                    oOtherChartLink.sensorType = sType;

                    if (oControllerVar.m_sChartType == sType)
                    {
                        oOtherChartLink.isActive = true;
                    }
                    else
                    {
                        oOtherChartLink.isActive = false;
                    }

                    var oSensorLink = oControllerVar.m_oConstantsService.getSensorLinkByType(sType);

                    if (oSensorLink != null)
                    {
                        oOtherChartLink.description = oSensorLink.description;
                        oOtherChartLink.imageLinkOff = oSensorLink.imageLinkOff;
                    }

                    oControllerVar.m_aoOtherCharts.push(oOtherChartLink);
                });
            }

            oControllerVar.addSeriesToChart();

            oControllerVar.m_bLoading = false;
        }).error(function(data,status){
            oControllerVar.m_oLog.error('Error Contacting Omirl Server');
        });

    }

    ChartController.prototype.csvExport = function (sCode, sChart) {
        window.open(this.m_oChartService.exportCsvStationChart(this.m_sStationCode,this.m_sChartType), '_blank', '');
    }

    ChartController.prototype.addSeriesToChart = function () {

        var oControllerVar = this;

        // Get Chart reference for this Chart
        var oChart = this.m_oChartService.getChart(this.m_sStationCode);

        // Get From the model if it is a Stock or a Normal Chart
        var bIsStockChart = this.m_oScope.model.isStock;

        if (oChart != null)
        {
            // Find if we have a Column Chart
            var bColumnChart = false;

            if (angular.isDefined(this.oChartVM.dataSeries))
            {
                // For each time Serie Check if the type is column
                this.oChartVM.dataSeries.forEach(function(oSerie) {
                    if (oSerie.type == "column") bColumnChart = true;
                });

                // Get Back the Chart Options
                var oChartOptions;


                var oElement = oChart.options.chart.renderTo;
                // Add Columns settings
                if (bIsStockChart) {

                    //Set template al grafico
                    // Load the fonts
                    Highcharts.createElement('link', {
                        href: 'http://fonts.googleapis.com/css?family=Unica+One',
                        rel: 'stylesheet',
                        type: 'text/css'
                    }, null, document.getElementsByTagName('head')[0]);

                    Highcharts.theme = {
                        colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
                            "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
                        chart: {
                            backgroundColor: {
                                linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                                stops: [
                                    [0, '#2a2a2b'],
                                    [1, '#3e3e40']
                                ]
                            },
                            style: {
                                fontFamily: "'Unica One', sans-serif"
                            },
                            plotBorderColor: '#606063'
                        },
                        title: {
                            style: {
                                color: '#E0E0E3',
                                textTransform: 'uppercase',
                                fontSize: '20px'
                            }
                        },
                        subtitle: {
                            style: {
                                color: '#E0E0E3',
                                textTransform: 'uppercase'
                            }
                        },
                        xAxis: {
                            gridLineColor: '#707073',
                            labels: {
                                style: {
                                    color: '#E0E0E3'
                                }
                            },
                            lineColor: '#707073',
                            minorGridLineColor: '#505053',
                            tickColor: '#707073',
                            title: {
                                style: {
                                    color: '#A0A0A3'

                                }
                            }
                        },
                        yAxis: {
                            gridLineColor: '#707073',
                            labels: {
                                style: {
                                    color: '#E0E0E3'
                                }
                            },
                            lineColor: '#707073',
                            minorGridLineColor: '#505053',
                            tickColor: '#707073',
                            tickWidth: 1,
                            title: {
                                style: {
                                    color: '#A0A0A3'
                                }
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.85)',
                            style: {
                                color: '#F0F0F0'
                            }
                        },
                        plotOptions: {
                            series: {
                                dataLabels: {
                                    color: '#B0B0B3'
                                },
                                marker: {
                                    lineColor: '#333'
                                }
                            },
                            boxplot: {
                                fillColor: '#505053'
                            },
                            candlestick: {
                                lineColor: 'white'
                            },
                            errorbar: {
                                color: 'white'
                            }
                        },
                        legend: {
                            itemStyle: {
                                color: '#E0E0E3'
                            },
                            itemHoverStyle: {
                                color: '#FFF'
                            },
                            itemHiddenStyle: {
                                color: '#606063'
                            }
                        },
                        credits: {
                            style: {
                                color: '#666'
                            }
                        },
                        labels: {
                            style: {
                                color: '#707073'
                            }
                        },

                        drilldown: {
                            activeAxisLabelStyle: {
                                color: '#F0F0F3'
                            },
                            activeDataLabelStyle: {
                                color: '#F0F0F3'
                            }
                        },

                        navigation: {
                            buttonOptions: {
                                symbolStroke: '#DDDDDD',
                                theme: {
                                    fill: '#505053'
                                }
                            }
                        },

                        // scroll charts
                        rangeSelector: {
                            buttonTheme: {
                                fill: '#505053',
                                stroke: '#000000',
                                style: {
                                    color: '#CCC'
                                },
                                states: {
                                    hover: {
                                        fill: '#707073',
                                        stroke: '#000000',
                                        style: {
                                            color: 'white'
                                        }
                                    },
                                    select: {
                                        fill: '#000003',
                                        stroke: '#000000',
                                        style: {
                                            color: 'white'
                                        }
                                    }
                                }
                            },
                            inputBoxBorderColor: '#505053',
                            inputStyle: {
                                backgroundColor: '#333',
                                color: 'silver'
                            },
                            labelStyle: {
                                color: 'silver'
                            }
                        },

                        navigator: {
                            handles: {
                                backgroundColor: '#666',
                                borderColor: '#AAA'
                            },
                            outlineColor: '#CCC',
                            maskFill: 'rgba(255,255,255,0.1)',
                            series: {
                                color: '#7798BF',
                                lineColor: '#A6C7ED'
                            },
                            xAxis: {
                                gridLineColor: '#505053'
                            }
                        },

                        scrollbar: {
                            barBackgroundColor: '#808083',
                            barBorderColor: '#808083',
                            buttonArrowColor: '#CCC',
                            buttonBackgroundColor: '#606063',
                            buttonBorderColor: '#606063',
                            rifleColor: '#FFF',
                            trackBackgroundColor: '#404043',
                            trackBorderColor: '#404043'
                        },

                        // special colors for some of the
                        legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
                        background2: '#505053',
                        dataLabelsColor: '#B0B0B3',
                        textColor: '#C0C0C0',
                        contrastTextColor: '#F0F0F3',
                        maskColor: 'rgba(255,255,255,0.3)'
                    };

// Apply the theme
                    Highcharts.setOptions(Highcharts.theme);

                    //Set template al grafico

                    oChartOptions = {
                        chart: {
                            renderTo: oElement
                        },
                        credits: {
                            enabled: false
                        },
                        subtitle:{
                            text: this.m_oScope.model.name + " (Comune di " + this.m_oScope.model.municipality + ") - ARPAL CFMI-PC"
                        },
                        plotOptions: {
                            series: {
                                dataGrouping: {
                                    enabled: true,
                                    approximation :"high"
                                }
                            },
                            line: {
                                marker: {
                                    enabled: false
                                }
                            },
                            line: {
                                marker: {
                                    enabled: false
                                }
                            }
                        },
                        rangeSelector: {
                            inputEnabled: true,
                            selected: 1,
                            buttons: [{
                                type: 'day',
                                count: 1,
                                text: '1g'
                            }, {
                                type: 'day',
                                count: 3,
                                text: '3gg'
                            }, {
                                type: 'week',
                                count: 1,
                                text: '7gg'
                            }/*, {
                                type: 'day',
                                count: 10,
                                text: '10gg'
                            }*/, {
                                type: 'day',
                                count: 15,
                                text: '15gg'
                            }/*, {
                                type: 'all',
                                text: 'Tutti'
                            }*/],
                            inputDateFormat:'%d/%m/%Y',
                            inputEditDateFormat:'%d/%m/%Y'
                        },
                        tooltip: {
                            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b>',
                            valueDecimals: 2,
                            valueSuffix: this.oChartVM.tooltipValueSuffix
                        },
                        exporting: {
                            buttons: {
                                contextButton: {
                                    symbol: 'url(img/chartdownload.png)'
                                }
                            }
                        }

                    };
                }
                else {

                    //Set template al grafico
                    // Load the fonts
                    Highcharts.createElement('link', {
                        href: 'http://fonts.googleapis.com/css?family=Unica+One',
                        rel: 'stylesheet',
                        type: 'text/css'
                    }, null, document.getElementsByTagName('head')[0]);

                    Highcharts.theme = {
                        colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
                            "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
                        chart: {
                            backgroundColor: {
                                linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                                stops: [
                                    [0, '#2a2a2b'],
                                    [1, '#3e3e40']
                                ]
                            },
                            style: {
                                fontFamily: "'Unica One', sans-serif"
                            },
                            plotBorderColor: '#606063'
                        },
                        title: {
                            style: {
                                color: '#E0E0E3',
                                textTransform: 'uppercase',
                                fontSize: '20px'
                            }
                        },
                        subtitle: {
                            style: {
                                color: '#E0E0E3',
                                textTransform: 'uppercase'
                            }
                        },
                        xAxis: {
                            gridLineColor: '#707073',
                            labels: {
                                style: {
                                    color: '#E0E0E3'
                                }
                            },
                            lineColor: '#707073',
                            minorGridLineColor: '#505053',
                            tickColor: '#707073',
                            title: {
                                style: {
                                    color: '#A0A0A3'

                                }
                            }
                        },
                        yAxis: {
                            gridLineColor: '#707073',
                            labels: {
                                style: {
                                    color: '#E0E0E3'
                                }
                            },
                            lineColor: '#707073',
                            minorGridLineColor: '#505053',
                            tickColor: '#707073',
                            tickWidth: 1,
                            title: {
                                style: {
                                    color: '#A0A0A3'
                                }
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.85)',
                            style: {
                                color: '#F0F0F0'
                            }
                        },
                        plotOptions: {
                            area: {
                                fillColor: {
                                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                                    stops: [
                                        [0, Highcharts.getOptions().colors[0]],
                                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                    ]
                                },
                                marker: {
                                    radius: 2
                                },
                                lineWidth: 1,
                                states: {
                                    hover: {
                                        lineWidth: 1
                                    }
                                },
                                threshold: null
                            },
                            series: {
                                dataLabels: {
                                    color: '#B0B0B3'
                                },
                                marker: {
                                    lineColor: '#333'
                                }
                            },
                            boxplot: {
                                fillColor: '#505053'
                            },
                            candlestick: {
                                lineColor: 'white'
                            },
                            errorbar: {
                                color: 'white'
                            }
                        },
                        legend: {
                            itemStyle: {
                                color: '#E0E0E3'
                            },
                            itemHoverStyle: {
                                color: '#FFF'
                            },
                            itemHiddenStyle: {
                                color: '#606063'
                            }
                        },
                        credits: {
                            style: {
                                color: '#666'
                            }
                        },
                        labels: {
                            style: {
                                color: '#707073'
                            }
                        },

                        drilldown: {
                            activeAxisLabelStyle: {
                                color: '#F0F0F3'
                            },
                            activeDataLabelStyle: {
                                color: '#F0F0F3'
                            }
                        },

                        navigation: {
                            buttonOptions: {
                                symbolStroke: '#DDDDDD',
                                theme: {
                                    fill: '#505053'
                                }
                            }
                        },

                        // scroll charts
                        rangeSelector: {
                            buttonTheme: {
                                fill: '#505053',
                                stroke: '#000000',
                                style: {
                                    color: '#CCC'
                                },
                                states: {
                                    hover: {
                                        fill: '#707073',
                                        stroke: '#000000',
                                        style: {
                                            color: 'white'
                                        }
                                    },
                                    select: {
                                        fill: '#000003',
                                        stroke: '#000000',
                                        style: {
                                            color: 'white'
                                        }
                                    }
                                }
                            },
                            inputBoxBorderColor: '#505053',
                            inputStyle: {
                                backgroundColor: '#333',
                                color: 'silver'
                            },
                            labelStyle: {
                                color: 'silver'
                            }
                        },

                        navigator: {
                            handles: {
                                backgroundColor: '#666',
                                borderColor: '#AAA'
                            },
                            outlineColor: '#CCC',
                            maskFill: 'rgba(255,255,255,0.1)',
                            series: {
                                color: '#7798BF',
                                lineColor: '#A6C7ED'
                            },
                            xAxis: {
                                gridLineColor: '#505053'
                            }
                        },

                        scrollbar: {
                            barBackgroundColor: '#808083',
                            barBorderColor: '#808083',
                            buttonArrowColor: '#CCC',
                            buttonBackgroundColor: '#606063',
                            buttonBorderColor: '#606063',
                            rifleColor: '#FFF',
                            trackBackgroundColor: '#404043',
                            trackBorderColor: '#404043'
                        },

                        // special colors for some of the
                        legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
                        background2: '#505053',
                        dataLabelsColor: '#B0B0B3',
                        textColor: '#C0C0C0',
                        contrastTextColor: '#F0F0F3',
                        maskColor: 'rgba(255,255,255,0.3)'
                    };

                    // Apply the theme
                    Highcharts.setOptions(Highcharts.theme);

                    //Set template al grafico

                    oChartOptions = {
                        chart: {
                            renderTo: oElement,
                            zoomType: "xy"
                        },
                        credits: {
                            enabled: false
                        },
                        tooltip: {
                            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b>',
                            valueDecimals: 2,
                            valueSuffix: this.oChartVM.tooltipValueSuffix
                        },
                        xAxis: {
                            type: 'datetime'
                        },
                        title:{
                            text:''
                        },
                        subtitle:{
                            text: this.m_oScope.model.name + " (Comune di " + this.m_oScope.model.municipality + ") - ARPAL CFMI-PC"
                        },
                        plotOptions: {
                            column: {
                                pointRange: 1000*60*60,
                                pointWidth: 5,
                                grouping: false,
                                borderWidth: 0,
                                pointPadding: 0
                            },
                            spline: {
                                marker: {
                                    enabled: false
                                }
                            },
                            line: {
                                marker: {
                                    enabled: false
                                }
                            }
                        },
                        exporting: {
                            buttons: {
                                contextButton: {
                                    symbol: 'url(img/chartdownload.png)'
                                }
                            }
                        }

                    };
                }

                oChart.destroy();

                // Create chart again
                if (bIsStockChart) {
                    oChart = new Highcharts.StockChart(oChartOptions);
                }
                else {
                    oChart = new Highcharts.Chart(oChartOptions);
                }



                // Update the Chart in the service
                this.m_oChartService.setChart(this.m_sStationCode,oChart);



                if (Highcharts.getOptions().exporting.buttons.contextButton.menuItems.length == 6)
                {
                    Highcharts.getOptions().exporting.buttons.contextButton.menuItems.push({
                        text: 'Scarica CSV',
                        onclick: function () {
                            oControllerVar.csvExport();
                        }
                    });
                }

                // Y MAIN AXIS
                if (angular.isDefined(oChart.yAxis[0])) {

                    var oPlotLines = undefined;
                    if (this.oChartVM.axisYTickInterval==0) this.oChartVM.axisYTickInterval = 1;

                    // Add Horizontal Lines
                    if (angular.isDefined(this.oChartVM.horizontalLines)) {
                        if (this.oChartVM.horizontalLines.length > 0) {
                            oPlotLines = [];

                            this.oChartVM.horizontalLines.forEach(function(oHorizontalLine){
                                var oLine = {};
                                oLine.color = oHorizontalLine.color;
                                oLine.width = 2;
                                oLine.value = oHorizontalLine.value;

                                oPlotLines.push(oLine);
                            });
                        }
                    }

                    // Set Main Axis Options
                    var oYAxisOptions = {
                        min: this.oChartVM.axisYMinValue,
                        max: this.oChartVM.axisYMaxValue,
                        tickInterval: this.oChartVM.axisYTickInterval,
                        title: {
                            text: this.oChartVM.axisYTitle
                        },
                        opposite: this.oChartVM.axisIsOpposite,
                        plotLines: oPlotLines
                    };

                    oChart.yAxis[0].setOptions(oYAxisOptions);
                }

                // OTHER Y AXIS
                if (!bIsStockChart)
                {
                    // Add Additional Axes
                    this.oChartVM.verticalAxes.forEach(function(oAdditionalAxes) {
                        oChart.addAxis({
                            title: {
                                text:oAdditionalAxes.axisYTitle,
                                rotation: 270,
                                margin: 30
                            },
                            opposite: oAdditionalAxes.isOpposite,
                            min: oAdditionalAxes.axisYMinValue,
                            max: oAdditionalAxes.axisYMaxValue,
                            tickInterval: oAdditionalAxes.axisYTickInterval
                        });
                    });
                }

                // X AXIS
                if (angular.isDefined(oChart.xAxis[0])) {
                    var oXAxisOptions = {
                        type: 'datetime'
                    };

                    oChart.xAxis[0].setOptions(oXAxisOptions);
                }

                // For each time Serie
                this.oChartVM.dataSeries.forEach(function(oSerie) {

                    // Check if exists
                    if (oSerie==null) return;
                    if (oSerie.data==null) return;

                    if (oSerie.axisId != 0) oSerie.yAxis = oSerie.axisId;

                    if (bIsStockChart)
                    {
                        // I need at least two points
                        if (oSerie.data.length>1)
                        {
                            // Get the two last elements
                            var oSecondToLastElement = oSerie.data[oSerie.data.length-2];
                            var oLastElement = oSerie.data[oSerie.data.length-1];
                            // Obtain time step
                            var iTimeDelta = oLastElement[0]-oSecondToLastElement[0];

                            // Get N hours offset
                            var iHoursOffset = 21600000 * 2;

                            // Compute max steps
                            var iMaxSteps = iHoursOffset/iTimeDelta;

                            // Add null values
                            for (var iSteps = 1; iSteps<=iMaxSteps; iSteps ++)
                            {
                                var oNullValue = [];

                                oNullValue[0] = oLastElement[0] + iSteps*iTimeDelta;
                                oNullValue[1] = null;

                                oSerie.data.push(oNullValue);
                            }
                        }
                    }
                    // Code to preset zoom: commented out for charts without navigators
                    /*else {
                        // I need at least two points
                        if (oSerie.data.length>1) {
                            // Get the two last elements
                            var oSecondToLastElement = oSerie.data[oSerie.data.length - 2];
                            var oLastElement = oSerie.data[oSerie.data.length - 1];
                            // Obtain time step
                            var iTimeStart = oLastElement[0] - 3*60*60*24*1000;
                            oChart.xAxis[0].zoom(iTimeStart,oLastElement[0]);
                            if( !oChart.resetZoomButton ) {
                                oChart.showResetZoom();
                            }
                            //oChart.showResetZoom();
                        }
                    }*/

                    oChart.addSeries(oSerie);
                });
            }


        }
    }

    ChartController.$inject = [
        '$scope',
        'dialogService',
        'ChartService',
        '$timeout',
        'ConstantsService',
        '$log'
    ];
    return ChartController;
}) ();

