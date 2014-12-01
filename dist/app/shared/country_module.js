'use strict';

var countryModule = angular.module('countryModule', [])
	.service('countryService', [
		function countryService() {
			var country=function(name, iso2, iso3, isoNumeric){
				this.name=name;
				this.iso2=iso2;
				this.iso3=iso3;
				this.isoNumeric=isoNumeric;
			}
			var service={
				countries:[],
				init:function(){
					service.countries.push(new country("Afghanistan", "AF", "AFG", "004"));
					service.countries.push(new country("Albania", "AL", "ALB", "008"));
					service.countries.push(new country("Algeria", "DZ", "DZA", "012"));
					service.countries.push(new country("American Samoa", "AS", "ASM", "016"));
					service.countries.push(new country("Andorra", "AD", "AND", "020"));
					service.countries.push(new country("Angola", "AO", "AGO", "024"));
					service.countries.push(new country("Anguilla", "AI", "AIA", "660"));
					service.countries.push(new country("Antigua and Barbuda", "AG", "ATG", "028"));
					service.countries.push(new country("Argentina", "AR", "ARG", "032"));
					service.countries.push(new country("Armenia", "AM", "ARM", "051"));
					service.countries.push(new country("Aruba", "AW", "ABW", "533"));
					service.countries.push(new country("Australia", "AU", "AUS", "036"));
					service.countries.push(new country("Austria", "AT", "AUT", "040"));
					service.countries.push(new country("Azerbaijan", "AZ", "AZE", "031"));
					service.countries.push(new country("Bahamas", "BS", "BHS", "044"));
					service.countries.push(new country("Bahrain", "BH", "BHR", "048"));
					service.countries.push(new country("Bangladesh", "BD", "BGD", "050"));
					service.countries.push(new country("Barbados", "BB", "BRB", "052"));
					service.countries.push(new country("Belarus", "BY", "BLR", "112"));
					service.countries.push(new country("Belgium", "BE", "BEL", "056"));
					service.countries.push(new country("Belize", "BZ", "BLZ", "084"));
					service.countries.push(new country("Benin", "BJ", "BEN", "204"));
					service.countries.push(new country("Bermuda", "BM", "BMU", "060"));
					service.countries.push(new country("Bhutan", "BT", "BTN", "064"));
					service.countries.push(new country("Bolivia", "BO", "BOL", "068"));
					service.countries.push(new country("Bosnia and Herzegovina", "BA", "BIH", "070"));
					service.countries.push(new country("Botswana", "BW", "BWA", "072"));
					service.countries.push(new country("Brazil", "BR", "BRA", "076"));
					service.countries.push(new country("British Virgin Islands", "VG", "VGB", "092"));
					service.countries.push(new country("Brunei Darussalam", "BN", "BRN", "096"));
					service.countries.push(new country("Bulgaria", "BG", "BGR", "100"));
					service.countries.push(new country("Burkina Faso", "BF", "BFA", "854"));
					service.countries.push(new country("Myanmar", "MM", "MMR", "104"));
					service.countries.push(new country("Burundi", "BI", "BDI", "108"));
					service.countries.push(new country("Cambodia", "KH", "KHM", "116"));
					service.countries.push(new country("Cameroon", "CM", "CMR", "120"));
					service.countries.push(new country("Canada", "CA", "CAN", "124"));
					service.countries.push(new country("Cape Verde", "CV", "CPV", "132"));
					service.countries.push(new country("Cayman Islands ", "KY", "CYM", "136"));
					service.countries.push(new country("Central African Republic", "CF", "CAF", "140"));
					service.countries.push(new country("Chad", "TD", "TCD", "148"));
					service.countries.push(new country("Chile", "CL", "CHL", "152"));
					service.countries.push(new country("China", "CN", "CHN", "156"));
					service.countries.push(new country("Christmas Island", "CX", "CXR", "162"));
					service.countries.push(new country("Cocos (Keeling) Islands", "CC", "CCK", "166"));
					service.countries.push(new country("Colombia", "CO", "COL", "170"));
					service.countries.push(new country("Comoros", "KM", "COM", "174"));
					service.countries.push(new country("Congo, Democratic Republic of the", "CD", "COD", "180"));
					service.countries.push(new country("Congo (Brazzaville)", "CG", "COG", "178"));
					service.countries.push(new country("Cook Islands ", "CK", "COK", "184"));
					service.countries.push(new country("Costa Rica", "CR", "CRI", "188"));
					service.countries.push(new country("Côte d'Ivoire", "CI", "CIV", "384"));
					service.countries.push(new country("Croatia", "HR", "HRV", "191"));
					service.countries.push(new country("Cuba", "CU", "CUB", "192"));
					service.countries.push(new country("Cyprus", "CY", "CYP", "196"));
					service.countries.push(new country("Czech Republic", "CZ", "CZE", "203"));
					service.countries.push(new country("Denmark", "DK", "DNK", "208"));
					service.countries.push(new country("Djibouti", "DJ", "DJI", "262"));
					service.countries.push(new country("Dominica", "DM", "DMA", "212"));
					service.countries.push(new country("Dominican Republic", "DO", "DOM", "214"));
					service.countries.push(new country("Ecuador", "EC", "ECU", "218"));
					service.countries.push(new country("Egypt", "EG", "EGY", "818"));
					service.countries.push(new country("El Salvador", "SV", "SLV", "222"));
					service.countries.push(new country("Equatorial Guinea", "GQ", "GNQ", "226"));
					service.countries.push(new country("Eritrea", "ER", "ERI", "232"));
					service.countries.push(new country("Estonia", "EE", "EST", "233"));
					service.countries.push(new country("Ethiopia", "ET", "ETH", "231"));
					service.countries.push(new country("Falkland Islands (Malvinas) ", "FK", "FLK", "238"));
					service.countries.push(new country("Faroe Islands", "FO", "FRO", "234"));
					service.countries.push(new country("Fiji", "FJ", "FJI", "242"));
					service.countries.push(new country("Finland", "FI", "FIN", "246"));
					service.countries.push(new country("France", "FR", "FRA", "250"));
					service.countries.push(new country("French Guiana", "GF", "GUF", "254"));
					service.countries.push(new country("French Polynesia", "PF", "PYF", "258"));
					service.countries.push(new country("Gabon", "GA", "GAB", "266"));
					service.countries.push(new country("Gambia", "GM", "GMB", "270"));
					service.countries.push(new country("Palestinian Territory, Gaza", "PS", " PSE", "275"));
					service.countries.push(new country("Georgia", "GE", "GEO", "268"));
					service.countries.push(new country("Germany", "DE", "DEU", "276"));
					service.countries.push(new country("Ghana", "GH", "GHA", "288"));
					service.countries.push(new country("Gibraltar ", "GI", "GIB", "292"));
					service.countries.push(new country("Greece", "GR", "GRC", "300"));
					service.countries.push(new country("Greenland", "GL", "GRL", "304"));
					service.countries.push(new country("Grenada", "GD", "GRD", "308"));
					service.countries.push(new country("Guadeloupe", "GP", "GLP", "312"));
					service.countries.push(new country("Guam", "GU", "GUM", "316"));
					service.countries.push(new country("Guatemala", "GT", "GTM", "320"));
					service.countries.push(new country("Guernsey", "GG", "GGY", "831"));
					service.countries.push(new country("Guinea", "GN", "GIN", "324"));
					service.countries.push(new country("Guinea-Bissau", "GW", "GNB", "624"));
					service.countries.push(new country("Guyana", "GY", "GUY", "328"));
					service.countries.push(new country("Haiti", "HT", "HTI", "332"));
					service.countries.push(new country("Heard Island and Mcdonald Islands", "HM", "HMD", "334"));
					service.countries.push(new country("Honduras", "HN", "HND", "340"));
					service.countries.push(new country("Hong Kong, Special Administrative Region of China", "HK", " HKG", "344"));
					service.countries.push(new country("Hungary", "HU", "HUN", "348"));
					service.countries.push(new country("Iceland", "IS", "ISL", "352"));
					service.countries.push(new country("India", "IN", "IND", "356"));
					service.countries.push(new country("Indonesia", "ID", "IDN", "360"));
					service.countries.push(new country("Iran, Islamic Republic of", "IR", "IRN", "364"));
					service.countries.push(new country("Iraq", "IQ", "IRQ", "368"));
					service.countries.push(new country("Ireland", "IE", "IRL", "372"));
					service.countries.push(new country("Israel", "IL", "ISR", "376"));
					service.countries.push(new country("Italy", "IT", "ITA", "380"));
					service.countries.push(new country("Jamaica", "JM", "JAM", "388"));
					service.countries.push(new country("Japan", "JP", "JPN", "392"));
					service.countries.push(new country("Jersey", "JE", "JEY", "832"));
					service.countries.push(new country("Jordan", "JO", "JOR", "400"));
					service.countries.push(new country("Kazakhstan", "KZ", "KAZ", "398"));
					service.countries.push(new country("Kenya", "KE", "KEN", "404"));
					service.countries.push(new country("Kiribati", "KI", "KIR", "296"));
					service.countries.push(new country("Korea, Democratic People's Republic of", "KP", "PRK", "408"));
					service.countries.push(new country("Korea, Republic of", "KR", "KOR", "410"));
					service.countries.push(new country("Kuwait", "KW", "KWT", "414"));
					service.countries.push(new country("Kyrgyzstan", "KG", "KGZ", "417"));
					service.countries.push(new country("Lao PDR", "LA", "LAO", "418"));
					service.countries.push(new country("Latvia", "LV", "LVA", "428"));
					service.countries.push(new country("Lebanon", "LB", "LBN", "422"));
					service.countries.push(new country("Lesotho", "LS", "LSO", "426"));
					service.countries.push(new country("Liberia", "LR", "LBR", "430"));
					service.countries.push(new country("Libya", "LY", "LBY", "434"));
					service.countries.push(new country("Liechtenstein", "LI", "LIE", "438"));
					service.countries.push(new country("Lithuania", "LT", "LTU", "440"));
					service.countries.push(new country("Luxembourg", "LU", "LUX", "442"));
					service.countries.push(new country("Macao, Special Administrative Region of China", "MO", "MAC", "446"));
					service.countries.push(new country("Macedonia, Republic of", "MK", "MKD", "807"));
					service.countries.push(new country("Madagascar", "MG", "MDG", "450"));
					service.countries.push(new country("Malawi", "MW", "MWI", "454"));
					service.countries.push(new country("Malaysia", "MY", "MYS", "458"));
					service.countries.push(new country("Maldives", "MV", "MDV", "462"));
					service.countries.push(new country("Mali", "ML", "MLI", "466"));
					service.countries.push(new country("Malta", "MT", "MLT", "470"));
					service.countries.push(new country("Isle of Man ", "IM", "IMN", "833"));
					service.countries.push(new country("Marshall Islands", "MH", "MHL", "584"));
					service.countries.push(new country("Martinique", "MQ", "MTQ", "474"));
					service.countries.push(new country("Mauritania", "MR", "MRT", "478"));
					service.countries.push(new country("Mauritius", "MU", "MUS", "480"));
					service.countries.push(new country("Mayotte", "YT", "MYT", "175"));
					service.countries.push(new country("Mexico", "MX", "MEX", "484"));
					service.countries.push(new country("Micronesia, Federated States of", "FM", "FSM", "583"));
					service.countries.push(new country("Moldova", "MD", "MDA", "498"));
					service.countries.push(new country("Monaco", "MC", "MCO", "492"));
					service.countries.push(new country("Mongolia", "MN", "MNG", "496"));
					service.countries.push(new country("Montserrat", "MS", "MSR", "500"));
					service.countries.push(new country("Morocco", "MA", "MAR", "504"));
					service.countries.push(new country("Mozambique", "MZ", "MOZ", "508"));
					service.countries.push(new country("Namibia", "NA", "NAM", "516"));
					service.countries.push(new country("Nauru", "NR", "NRU", "520"));
					service.countries.push(new country("Nepal", "NP", "NPL", "524"));
					service.countries.push(new country("Netherlands", "NL", "NLD", "528"));
					service.countries.push(new country("Netherlands Antilles", "AN", "ANT", "530"));
					service.countries.push(new country("New Caledonia", "NC", "NCL", "540"));
					service.countries.push(new country("New Zealand", "NZ", "NZL", "554"));
					service.countries.push(new country("Nicaragua", "NI", "NIC", "558"));
					service.countries.push(new country("Niger", "NE", "NER", "562"));
					service.countries.push(new country("Nigeria", "NG", "NGA", "566"));
					service.countries.push(new country("Niue ", "NU", "NIU", "570"));
					service.countries.push(new country("Norfolk Island", "NF", "NFK", "574"));
					service.countries.push(new country("Northern Mariana Islands", "MP", "MNP", "580"));
					service.countries.push(new country("Norway", "NO", "NOR", "578"));
					service.countries.push(new country("Oman", "OM", "OMN", "512"));
					service.countries.push(new country("Pakistan", "PK", "PAK", "586"));
					service.countries.push(new country("Palau", "PW", "PLW", "585"));
					service.countries.push(new country("Panama", "PA", "PAN", "591"));
					service.countries.push(new country("Papua New Guinea", "PG", "PNG", "598"));
					service.countries.push(new country("Paraguay", "PY", "PRY", "600"));
					service.countries.push(new country("Peru", "PE", "PER", "604"));
					service.countries.push(new country("Philippines", "PH", "PHL", "608"));
					service.countries.push(new country("Pitcairn", "PN", "PCN", "612"));
					service.countries.push(new country("Poland", "PL", "POL", "616"));
					service.countries.push(new country("Portugal", "PT", "PRT", "620"));
					service.countries.push(new country("Puerto Rico", "PR", "PRI", "630"));
					service.countries.push(new country("Qatar", "QA", "QAT", "634"));
					service.countries.push(new country("Réunion", "RE", "REU", "638"));
					service.countries.push(new country("Romania", "RO", "ROU", "642"));
					service.countries.push(new country("Russian Federation", "RU", "RUS", "643"));
					service.countries.push(new country("Rwanda", "RW", "RWA", "646"));
					service.countries.push(new country("Saint Helena", "SH", "SHN", "654"));
					service.countries.push(new country("Saint Kitts and Nevis", "KN", "KNA", "659"));
					service.countries.push(new country("Saint Lucia", "LC", "LCA", "662"));
					service.countries.push(new country("Saint Pierre and Miquelon ", "PM", "SPM", "666"));
					service.countries.push(new country("Saint Vincent and Grenadines", "VC", "VCT", "670"));
					service.countries.push(new country("Samoa", "WS", "WSM", "882"));
					service.countries.push(new country("San Marino", "SM", "SMR", "674"));
					service.countries.push(new country("Sao Tome and Principe", "ST", "STP", "678"));
					service.countries.push(new country("Saudi Arabia", "SA", "SAU", "682"));
					service.countries.push(new country("Senegal", "SN", "SEN", "686"));
					service.countries.push(new country("Serbia", "RS", "SRB", "688"));
					service.countries.push(new country("Seychelles", "SC", "SYC", "690"));
					service.countries.push(new country("Sierra Leone", "SL", "SLE", "694"));
					service.countries.push(new country("Singapore", "SG", "SGP", "702"));
					service.countries.push(new country("Slovakia", "SK", "SVK", "703"));
					service.countries.push(new country("Slovenia", "SI", "SVN", "705"));
					service.countries.push(new country("Solomon Islands", "SB", "SLB", "090"));
					service.countries.push(new country("Somalia", "SO", "SOM", "706"));
					service.countries.push(new country("South Africa", "ZA", "ZAF", "710"));
					service.countries.push(new country("Spain", "ES", "ESP", "724"));
					service.countries.push(new country("Sri Lanka", "LK", "LKA", "144"));
					service.countries.push(new country("Sudan", "SD", "SDN", "736"));
					service.countries.push(new country("Suriname *", "SR", "SUR", "740"));
					service.countries.push(new country("Swaziland", "SZ", "SWZ", "748"));
					service.countries.push(new country("Sweden", "SE", "SWE", "752"));
					service.countries.push(new country("Switzerland", "CH", "CHE", "756"));
					service.countries.push(new country("Syrian Arab Republic (Syria)", "SY", "SYR", "760"));
					service.countries.push(new country("Taiwan, Republic of China", "TW", "TWN", "158"));
					service.countries.push(new country("Tajikistan", "TJ", "TJK", "762"));
					service.countries.push(new country("Tanzania *, United Republic of", "TZ", "TZA", "834"));
					service.countries.push(new country("Thailand", "TH", "THA", "764"));
					service.countries.push(new country("Togo", "TG", "TGO", "768"));
					service.countries.push(new country("Tokelau ", "TK", "TKL", "772"));
					service.countries.push(new country("Tonga", "TO", "TON", "776"));
					service.countries.push(new country("Trinidad and Tobago", "TT", "TTO", "780"));
					service.countries.push(new country("Tunisia", "TN", "TUN", "788"));
					service.countries.push(new country("Turkey", "TR", "TUR", "792"));
					service.countries.push(new country("Turkmenistan", "TM", "TKM", "795"));
					service.countries.push(new country("Turks and Caicos Islands ", "TC", "TCA", "796"));
					service.countries.push(new country("Tuvalu", "TV", "TUV", "798"));
					service.countries.push(new country("Uganda", "UG", "UGA", "800"));
					service.countries.push(new country("Ukraine", "UA", "UKR", "804"));
					service.countries.push(new country("United Arab Emirates", "AE", "ARE", "784"));
					service.countries.push(new country("United Kingdom", "GB", "GBR", "826"));
					service.countries.push(new country("United States of America", "US", "USA", "840"));
					service.countries.push(new country("Uruguay", "UY", "URY", "858"));
					service.countries.push(new country("Uzbekistan", "UZ", "UZB", "860"));
					service.countries.push(new country("Vanuatu", "VU", "VUT", "548"));
					service.countries.push(new country("Venezuela (Bolivarian Republic of)", "VE", "VEN", "862"));
					service.countries.push(new country("Viet Nam", "VN", "VNM", "704"));
					service.countries.push(new country("Virgin Islands, US", "VI", "VIR", "850"));
					service.countries.push(new country("Wallis and Futuna Islands ", "WF", "WLF", "876"));
					service.countries.push(new country("Palestinian Territory, West Bank", "PS", " PSE", "275"));
					service.countries.push(new country("Western Sahara", "EH", "ESH", "732"));
					service.countries.push(new country("Yemen", "YE", "YEM", "887"));
					service.countries.push(new country("Zambia", "ZM", "ZMB", "894"));
					service.countries.push(new country("Zimbabwe", "ZW", "ZWE", "716"));
					service.countries.push(new country("South Sudan", "SS", "SSD", "728"));
					service.countries.push(new country("Montenegro", "ME", "MNE", "499"));
					service.countries.push(new country("Saint-Barthélemy", "BL", "BLM", "652"));
					service.countries.push(new country("Saint-Martin (French part)", "MF", "MAF", "663"));
					service.countries.push(new country("Svalbard and Jan Mayen Islands ", "SJ", "SJM", "744"));
					service.countries.push(new country("Timor-Leste", "TL", "TLS", "626"));
					service.countries.push(new country("United States Minor Outlying Islands", "UM", "UMI", "581"));
					service.countries.push(new country("Antarctica", "AQ", "ATA", "010"));
					console.log("countryService loaded")
				},
				get3From2:function(value){
					return this.getFromTo("iso2","iso3",value)
				},
				get2From3:function(value){
					return this.getFromTo("iso3","iso2",value)
				},
				getFromTo:function(fromProp, toProp, value){
					var n = value ? null : [];
					if(n==[]){
						for(var o=0;o<service.countries.length;o++){
							n.push(service.countries[o][toProp])
						}
					}else{
						for(var o=0;o<service.countries.length;o++){
							if(service.countries[o][fromProp].toLowerCase()==value.toLowerCase()){
								n=toProp ? service.countries[o][toProp] : service.countries[o];
								break;
							}
						}
					}
					return n;
				}
			}
			return service;
		}
	]);