/**
 * Created by p.campanella on 30/01/14.
 */

'use strict';
angular.module('omirl.stationsService', []).
    service('StationsService', ['$http',  function ($http) {
        this.APIURL = 'http://localhost:8080/it.fadeout.mercurius.webapi/rest';

        this.m_oHttp = $http;

        this.getStations = function(oStationsLink) {
            var aoSensors = [
                {"stationId": 1, "name":"Molino Branca","lat":44.049168,"lon":8.212778,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 2, "name":"Sesta Godano","lat":44.298332,"lon":9.6775,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 3, "name":"Istituto di Idraulica","lat":44.40139,"lon":8.964444,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 4, "name":"Boa Odas Italia 1 Ist.AutomNav","lat":43.815,"lon":9.113333,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 5, "name":"Pornassio UNKNOW","lat":44.0639,"lon":7.8664,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 6, "name":"Pavaglione","lat":44.523056,"lon":8.676389,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 7, "name":"Scisa","lat":44.518333,"lon":8.735833,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 8, "name":"Barro","lat":44.488888,"lon":8.770556,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 9, "name":"Alpe Grande Rezzo","lat":44.031944,"lon":7.808611,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 10, "name":"S.Bernardo DArmo","lat":44.103333,"lon":7.895833,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 11, "name":"Cairo Montenotte(StCortemilia)","lat":44.4046,"lon":8.270403,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 12, "name":"Dego","lat":44.467102,"lon":8.308555,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 13, "name":"Valle Acna","lat":44.396614,"lon":8.17936,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 14, "name":"Gavette","lat":44.433018,"lon":8.9603405,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 15, "name":"Mereta","lat":44.663055,"lon":8.941111,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 16, "name":"Savignone","lat":44.551945,"lon":8.978333,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 17, "name":"Caminata - Conscenti","lat":44.345554,"lon":9.393889,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 18, "name":"Gattorna","lat":44.427223,"lon":9.184444,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Pozzo Sara Bis","lat":44.26917,"lon":9.428889,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"S.Alberto","lat":44.43722,"lon":9.106667,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Velva","lat":44.276943,"lon":9.553611,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Castiglione Chiavarese","lat":44.274445,"lon":9.516111,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Monte Domenico","lat":44.310833,"lon":9.440833,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Genova-Bolzaneto","lat":44.45,"lon":8.88,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Ge-Idrografico","lat":44.4,"lon":8.946389,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Pontedecimo","lat":44.486942,"lon":8.901389,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Pontedecimo II (Idrog)","lat":44.486942,"lon":8.901389,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Prato I (Presa Prato)","lat":44.450558,"lon":9.023889,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Colle di Cadibona","lat":44.3328,"lon":8.3839,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Savona-Istituto Nautico","lat":44.325,"lon":8.48472,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Pero","lat":44.381668,"lon":8.556667,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Mignanego","lat":44.5389,"lon":8.93,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Madonna della Guardia","lat":44.489166,"lon":8.863056,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Crocetta Dorero","lat":44.519444,"lon":8.986111,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Scoffera","lat":44.4725,"lon":9.114722,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Prato II","lat":44.447777,"lon":9.010556,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Ponte Carrega","lat":44.433887,"lon":8.961389,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Premanico UNKNOWN","lat":44.42,"lon":9.02,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Ranzo","lat":44.0632,"lon":8.0049,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Alassio","lat":44.00611,"lon":8.169167,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Albenga-Isolabella","lat":44.068333,"lon":8.180833,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Bestagno","lat":43.933334,"lon":8.0008335,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Borgomaro","lat":43.977222,"lon":7.9530554,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Buggio","lat":43.961388,"lon":7.685,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Calice al Cornoviglio-Molunghi","lat":44.25,"lon":9.84,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Calice Ligure","lat":44.203056,"lon":8.293333,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Castelvecchio di R.B.","lat":44.131943,"lon":8.118889,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Cembrano","lat":44.3525,"lon":9.584167,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Cichero","lat":44.421112,"lon":9.321944,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Colonia Arnaldi","lat":44.408333,"lon":9.181389,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Conna","lat":43.98,"lon":8.1044445,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Crocetta D'Orero","lat":44.52028,"lon":8.985833,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Cuccarello","lat":44.34,"lon":9.71,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Davagna","lat":44.467777,"lon":9.095278,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Dolcedo-Sferisterio","lat":43.905834,"lon":7.951389,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Genova-Centro Funzionale","lat":44.4,"lon":8.95,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Genova-Gavette","lat":44.434444,"lon":8.961111,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"La Foce","lat":44.12472,"lon":9.788055,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"La Spezia","lat":44.106945,"lon":9.828055,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Levanto-Vallesanta","lat":44.17139,"lon":9.606667,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Marinella di Sarzana","lat":44.05,"lon":10.013889,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Mattarana OLD","lat":44.245,"lon":9.615,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Mele2","lat":44.456165,"lon":8.735556,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Monte Capellino OLD","lat":44.551388,"lon":8.957778,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Padivarma","lat":44.19528,"lon":9.7711115,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Panesi","lat":44.342224,"lon":9.356112,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Pieve di Teco","lat":44.049446,"lon":7.9147224,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Pogli d'Ortovero","lat":44.05389,"lon":8.055555,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Portovenere-Comune","lat":44.051945,"lon":9.835834,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Reppia","lat":44.375,"lon":9.457778,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Rocchetta Nervina","lat":43.88861,"lon":7.6016665,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"S.Margherita Vara","lat":44.274723,"lon":9.659722,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Sarzana","lat":44.11222,"lon":9.965555,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Serò di Zignago","lat":44.264446,"lon":9.736944,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Tavarone","lat":44.31278,"lon":9.548611,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Testico","lat":44.00528,"lon":8.027778,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Triora","lat":43.994446,"lon":7.7625,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Varese Ligure","lat":44.383057,"lon":9.584167,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Ventimiglia","lat":43.787777,"lon":7.612222,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Viganego","lat":44.428333,"lon":9.063611,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Altare","lat":44.334167,"lon":8.347777,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Cavi di Lavagna","lat":44.296944,"lon":9.373611,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Genova-Castellaccio","lat":44.428333,"lon":8.934444,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Genova-Pegli","lat":44.43222,"lon":8.824722,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Genova-Sant'Ilario","lat":44.384724,"lon":9.0616665,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Giacopiane-Lago","lat":44.461113,"lon":9.387777,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Imperia-Oss. Meteosismico","lat":43.879444,"lon":8.016389,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Monte Rocchetta","lat":44.07139,"lon":9.9383335,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Passo del Turchino","lat":44.48611,"lon":8.736111,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Passo Ghimbegna","lat":43.904724,"lon":7.733333,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Ponte Colombiera","lat":44.064167,"lon":9.972222,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Sella di Gouta","lat":43.939724,"lon":7.6080556,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Calice Ligure - Ca rosse","lat":44.195835,"lon":8.301945,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Campo Ligure","lat":44.5425,"lon":8.693889,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Castelnuovo Magra","lat":45.037224,"lon":10.006945,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"La Foce - Mte viseggi","lat":44.13222,"lon":9.790556,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Luni","lat":44.741665,"lon":10.008889,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Mattarana","lat":44.245,"lon":9.614722,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Monterosso","lat":44.134724,"lon":9.640278,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Onzo - Ponterotto","lat":44.05722,"lon":8.0413885,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Sarzana","lat":44.11227,"lon":9.96546,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Dolcedo","lat":43.9059,"lon":7.9515,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Sciarborasca","lat":44.40645,"lon":8.62464,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Statale","lat":44.35048,"lon":9.48082,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Scurtabò","lat":44.40681,"lon":9.53384,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Carro","lat":44.27525,"lon":9.59772,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Framura","lat":44.21359,"lon":9.54033,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Casale di Pignone","lat":44.18992,"lon":9.71496,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Ricco del Golfo","lat":44.15319,"lon":9.76373,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Pian dei Ratti","lat":44.39365,"lon":9.27102,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Seborga","lat":43.82756,"lon":7.6985,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Montagna","lat":44.28425,"lon":8.37136,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Cipressa","lat":43.85263,"lon":7.92859,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Pizzeglio","lat":43.91862,"lon":7.69454,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Prai","lat":44.51775,"lon":8.67306,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Sella Giassina","lat":44.48758,"lon":9.18206,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Ognio","lat":44.44372,"lon":9.16994,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Croce Orero","lat":44.42422,"lon":9.28492,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Rapallo","lat":44.35416,"lon":9.20946,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Valzemola","lat":44.36959,"lon":8.19105,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Manie","lat":44.19325,"lon":8.37883,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Genova - Pontedecimo","lat":44.48852,"lon":8.9001,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Monte Cappellino","lat":44.54856,"lon":8.95422,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Colle D'oggia","lat":43.98131,"lon":7.86667,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Bargone","lat":44.29506,"lon":9.48136,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Carpe","lat":44.14819,"lon":8.16447,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Colla Rossa","lat":43.83103,"lon":7.54322,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Verzi Loano","lat":44.16397,"lon":8.22002,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Verdeggia","lat":44.04425,"lon":7.72108,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Airole","lat":43.8732,"lon":7.54478,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Urbe - Vara Sup","lat":44.46953,"lon":8.62739,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Monte Pennello","lat":44.48007,"lon":8.79997,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Genova - Geirato","lat":44.45964,"lon":8.97959,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Genova - Quezzi","lat":44.42367,"lon":8.9726,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Camogli","lat":44.35394,"lon":9.14871,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Chiavari","lat":44.31802,"lon":9.32944,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Stella S. Giustina","lat":44.416344,"lon":8.481866,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Ellera","lat":44.3667,"lon":8.4675,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Alpicella","lat":44.4075,"lon":8.53583,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Sanda","lat":44.3617,"lon":8.52861,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Lerca","lat":44.4019,"lon":8.65056,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Fiorino","lat":44.4644,"lon":8.70639,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Mele1","lat":44.45,"lon":8.73,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Mad. delle Grazie","lat":44.4336,"lon":8.74333,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Turchino","lat":44.4847,"lon":8.73667,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Molinetto","lat":44.4394,"lon":8.74889,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Pegli","lat":44.4308,"lon":8.81972,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Monte Gazzo","lat":44.4406,"lon":8.85,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Monte Capellino","lat":44.5439,"lon":8.95139,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Mignanego","lat":44.5389,"lon":8.93,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Pontedecimo","lat":44.4869,"lon":8.90139,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Isoverde","lat":44.5289,"lon":8.87,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Bolzaneto","lat":44.4542,"lon":8.89694,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Valleregia","lat":44.5217,"lon":8.94639,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Vicomorasso","lat":44.4847,"lon":8.98055,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Premanico","lat":44.4222,"lon":9.01833,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Genova Righi","lat":44.4269,"lon":8.93583,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Creto","lat":44.4739,"lon":9.00833,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Bargagli","lat":44.4367,"lon":9.10806,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"La Presa","lat":44.440857,"lon":9.047985,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Sella Gouta","lat":43.9396,"lon":7.68808,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Colle di Melogno","lat":44.2328,"lon":8.2025,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Molino Branca","lat":44.0492,"lon":8.21278,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Nasceto 2","lat":44.297997,"lon":9.679889,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Borzone","lat":44.42429,"lon":9.41013,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Casoni","lat":44.3054,"lon":9.76581,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Giacopiane","lat":44.4617,"lon":9.3875,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Loco Carchelli C.le","lat":44.5547,"lon":9.285,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Monte Maure","lat":43.7926,"lon":7.6196,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Fontana Fresca","lat":44.4069,"lon":9.09444,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Biassa (M.Rocchetta)","lat":44.0719,"lon":9.93889,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Poggio Fearza","lat":44.04202,"lon":7.79343,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Oss. Meteosismico","lat":43.8789,"lon":8.01722,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"La Macchia","lat":44.323807,"lon":9.615663,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Brugnato- Borghetto Vara","lat":44.231434,"lon":9.715619,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Colombiera","lat":44.063602,"lon":9.973108,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Piana di Battolla","lat":44.197594,"lon":9.849256,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Taglieto","lat":44.3947,"lon":9.61722,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Pozzo Sara Bis","lat":44.2689,"lon":9.43,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Montedomenico","lat":44.2997,"lon":9.42972,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Chiavari","lat":44.32,"lon":9.32,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Colle di Nava","lat":44.0839,"lon":7.87417,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Colle Belenda","lat":43.9808,"lon":7.69889,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Capo Vado","lat":44.2575,"lon":8.44889,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Ceriana","lat":43.9053,"lon":7.73361,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Montalto","lat":43.9303,"lon":7.84167,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Sanremo","lat":43.8225,"lon":7.78583,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Ceriana Comune","lat":43.8786,"lon":7.775,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Pornassio","lat":44.0639,"lon":7.8664,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Cadibona","lat":44.3325,"lon":8.38333,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Sella di Savona","lat":44.3428,"lon":8.34889,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Ist. Nautico Savona","lat":44.3062,"lon":8.48305,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Santuario","lat":44.34555,"lon":8.43753,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Lavagnola","lat":44.33542,"lon":8.48011,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Pero","lat":44.3817,"lon":8.55667,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Cabanne","lat":44.48803,"lon":9.340174,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Alpe Gorreto","lat":44.60472,"lon":9.236389,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Barbagelata","lat":44.483055,"lon":9.242778,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Rovegno","lat":44.576946,"lon":9.277223,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Settepani","lat":44.243332,"lon":8.195833,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Calizzano","lat":44.23528,"lon":8.119445,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Sassello","lat":44.478333,"lon":8.484722,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Alpe Vobbia","lat":44.568333,"lon":9.077778,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Mallare","lat":44.289722,"lon":8.300555,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Cairo Montenotte","lat":44.399166,"lon":8.280278,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Rossiglione","lat":44.567223,"lon":8.659722,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Torriglia","lat":44.515835,"lon":9.155556,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Busalla","lat":44.566387,"lon":8.9475,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Osiglia","lat":44.28361,"lon":8.205277,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Montenotte Inferiore","lat":44.408054,"lon":8.412222,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Piampaludo","lat":44.465,"lon":8.58,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Brugneto Diga","lat":44.530556,"lon":9.208333,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Fornola","lat":44.13761,"lon":9.905685,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Borgonuovo","lat":43.8452,"lon":7.6215,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Diano Castello","lat":43.9145,"lon":8.0736,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Barcheo","lat":44.0494,"lon":7.96611,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Cenesi","lat":44.0761,"lon":8.13444,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Castellari","lat":44.1467,"lon":8.26083,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Polanesi","lat":44.3658,"lon":9.12472,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Cavi Panoramica","lat":44.2969,"lon":9.37361,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Corniolo","lat":44.10632,"lon":9.73483,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Romito Magra","lat":44.1139,"lon":9.93028,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Levanto","lat":44.18,"lon":9.61972,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Murialdo","lat":44.313343,"lon":8.159578,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Bavari","lat":44.4306,"lon":9.01944,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Istituto di Idraulica","lat":44.4014,"lon":8.96444,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Vernazza","lat":44.1472,"lon":9.68333,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"CIMA","lat":44.2989,"lon":8.4511,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Fabbriche","lat":44.44764,"lon":8.718826,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Crevari","lat":44.42437,"lon":8.730099,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Voltri","lat":44.427807,"lon":8.751691,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Pra CEP","lat":44.433823,"lon":8.767063,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Pra","lat":44.428238,"lon":8.784054,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Pegli","lat":44.425873,"lon":8.818352,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Sestri Ponente","lat":44.42987,"lon":8.847394,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Scarpino","lat":44.471256,"lon":8.859008,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Borzoli","lat":44.43779,"lon":8.876886,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Sampierdarena","lat":44.41647,"lon":8.886097,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Murta","lat":44.46115,"lon":8.890096,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Pontedecimo","lat":44.494755,"lon":8.902862,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Cesino","lat":44.506725,"lon":8.902497,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Granarolo","lat":44.42747,"lon":8.907963,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Begato CIGE","lat":44.447926,"lon":8.90374,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Genova Centro","lat":44.412067,"lon":8.933462,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Quezzi","lat":44.423733,"lon":8.972614,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Pino Sottano","lat":44.457237,"lon":8.973233,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"S.Eusebio","lat":44.443867,"lon":8.98632,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Quarto","lat":44.393646,"lon":8.997,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Prato","lat":44.449806,"lon":9.012362,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Bavari","lat":44.431828,"lon":9.017934,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"S.Cosimo di Struppa","lat":44.454002,"lon":9.019931,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Nervi","lat":44.38508,"lon":9.035974,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"San Carlo di Cese","lat":44.478874,"lon":8.833847,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"S.Martino","lat":44.407078,"lon":8.975563,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Viganego","lat":44.4285,"lon":9.0635,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Davagna","lat":44.4678,"lon":9.0954,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Genova Gavette","lat":44.4344,"lon":8.9611,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Genova Geirato","lat":44.4596,"lon":8.9796,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Genova Quezzi","lat":44.4237,"lon":8.9726,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Le Tagliate","lat":44.281387,"lon":8.332525,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"CIMA Acronet","lat":44.2991,"lon":8.4513,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Vivaio","lat":44.240044,"lon":8.271316,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Bocca Dorso","lat":44.325855,"lon":8.346951,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Ferrea","lat":44.29194,"lon":8.369123,"value":1,"imgPath":"img/marker.png"},
                {"stationId": 1, "name":"Quiliano","lat":44.291,"lon":8.414,"value":1,"imgPath":"img/marker.png"}
            ];

            var sLayerType = oStationsLink.code;

            aoSensors.forEach(function(oEntry) {
                oEntry.value = Math.random()*41;


                if (sLayerType=="Pluvio") {
                    var iIndex = Math.round(Math.random()*31+1);
                    oEntry.imgPath = "img/weather/w"+iIndex+".png";
                }
                else {
                    var iIndex = Math.round(Math.random()*3+1);
                    oEntry.imgPath = "img/warnings/s"+iIndex+".png";
                }

            });
            return aoSensors;
        }

    }]);

