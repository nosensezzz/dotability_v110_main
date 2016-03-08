var _ = require("lodash");
	//fetch = require("react-fetch")

var api_user = "https:api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?",
	api_matches = "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?",
	api_the_match = "https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?",
	steamTestId = "76561198174201918",
	key = "3F583D9AB14EE27C6198A45E4108F7D4",
	defaultSteam64_1 = "76561",
	defaultSteam64_2 = "197960265728";

var JSON_Heroes = require("../lib/hero.json"),
	JSON_leave_status = require("../lib/leave_status.json"),
	JSON_Mode = require("../lib/mods.json"),
	JSON_Type = require("../lib/lobbies.json");

var options = {
		timeout: 1000
	};

class apiSteam {
	searchUser(obj, cb){
		var url, steamID;
		url = api_user;
		if(obj.dotaID === null || obj.dotaID === ""){
			//steamID = steamTestId;
			steamID = "0";
		} else {
			steamID = steam32to64(obj.dotaID);
		}
		url += "key=" + key + "&";
		url += "steamids=" + steamID;
		timeout(8000, fetch(url , options))
			.then(_statusHandler)
			.then(_jsonHandler)
			.then((results) =>{
				cb(results);
			})
			.catch(function(error) {
			  // might be a timeout error
			  	cb({
			  		timeout: true
			  	});
			})
	}

	getUserMatches(obj, cb){
		var url, id;
		url = api_matches;
		if(1===1){
			// non member
			id = steam64to32(obj.steamID);
			url += "key=" + key + "&";
			url += "account_id=" + id + "&";
			url += "matches_requested=" + "15";
		} else {
			// member

		}
		
		fetch(url)
			.then(_statusHandler)
			.then(_jsonHandler)
			.then((results) =>{
				if(results.result.matches && results.result.matches.length > 0){
					_.forEach(results.result.matches , function(match){
						_.forEach(match.players, function (player) {
							if(player.account_id === id){
								match.me = player;
								match.myHeroImage = retrieveHeroImage(player.hero_id);
							}
						});
					});
					cb(results);
				} else {
					cb(results , true);
				}
			});

	}

	getUserLocation(obj , cb){
		var //Locations = require("../lib/steam_countries.min.json"),
			foundCountry = "nul;",
			foundState = "nul;",
			foundCity = "nul;",
			response;

		response = {
			foundCountry : foundCountry,
			foundState : foundState,
			foundCity : foundCity
		}
		cb(response);
		return;
	}

	getSelectedMatch(obj , cb){
		var url = api_the_match;
			url += "key=" + key + "&";
			url += "match_id=" + obj.match_id;
		timeout(8000, fetch(url))
			.then(_statusHandler)
			.then(_jsonHandler)
			.then((results) =>{
				cb(results);
			})
			.catch(function(error) {
				console.log(error);
			  	cb({
			  		timeout: true
			  	});
			})
	}

	getHeroes(){
		return JSON_Heroes.result;
	}

	steamidToDotaid(steamid){
		return steam64to32(steamid);
	}

	findHeroPictrue(hero_id){
		return retrieveHeroImage(hero_id);
	}

	findHeroInfo(hero_id){
		var foundHero;
		_.forEach(JSON_Heroes.result.heroes , function (hero) {
			if(hero.id === hero_id){
				foundHero = hero;
				return;
			}
		});
		return foundHero;
	}

	findLobbyType(lobby_id){
		var lobbies = JSON_Type,
			foundLobby;
		_.forEach(lobbies.lobbies, (lobby)=>{
			if(lobby.id == lobby_id){
				foundLobby = lobby;
				return;
			}
		});

		return foundLobby;
	}

	getLeaverStatus(){
		return JSON_leave_status;
	}

	getModeJson(){
		return JSON_Mode;
	}

	getTypeJson(){
		return JSON_Type;
	}
}

function _statusHandler (callback) {
	// need implement
	return callback;
}

function _jsonHandler (callback) {
	// transfer to json format
	return callback.json();
}

function steam64to32(id64){
	var id32;

	id32 = +id64.substring(5) - +defaultSteam64_2;
	return id32;
}

function steam32to64(id32){
	var id64;
	id64 = +id32 + +defaultSteam64_2;
	id64 = defaultSteam64_1.concat(id64.toString());
	return id64;
}

function retrieveHeroImage(heroid){
	var image;
	switch(heroid){
		case 1:
			image = require("image!1");
			break;
		case 2:
			image = require("image!2");
			break;
		case 3:
			image = require("image!3");
			break;
		case 4:
			image = require("image!4");
			break;
		case 5:
			image = require("image!5");
			break;
		case 6:
			image = require("image!6");
			break;
		case 7:
			image = require("image!7");
			break;
		case 8:
			image = require("image!8");
			break;
		case 9:
			image = require("image!9");
			break;
		case 10:
			image = require("image!10");
			break;
		case 11:
			image = require("image!11");
			break;
		case 12:
			image = require("image!12");
			break;
		case 13:
			image = require("image!13");
			break;
		case 14:
			image = require("image!14");
			break;
		case 15:
			image = require("image!15");
			break;
		case 16:
			image = require("image!16");
			break;
		case 17:
			image = require("image!17");
			break;
		case 18:
			image = require("image!18");
			break;
		case 19:
			image = require("image!19");
			break;
		case 20:
			image = require("image!20");
			break;
		case 21:
			image = require("image!21");
			break;
		case 22:
			image = require("image!22");
			break;
		case 23:
			image = require("image!23");
			break;
		case 24:
		// missing picture
			image = require("image!25");
			break;
		case 25:
			image = require("image!25");
			break;
		case 26:
			image = require("image!26");
			break;
		case 27:
			image = require("image!27");
			break;
		case 28:
			image = require("image!28");
			break;
		case 29:
			image = require("image!29");
			break;
		case 30:
			image = require("image!30");
			break;
		case 31:
			image = require("image!31");
			break;
		case 32:
			image = require("image!32");
			break;
		case 33:
			image = require("image!33");
			break;
		case 34:
			image = require("image!34");
			break;
		case 35:
			image = require("image!35");
			break;
		case 36:
			image = require("image!36");
			break;
		case 37:
			image = require("image!37");
			break;
		case 38:
			image = require("image!38");
			break;
		case 39:
			image = require("image!39");
			break;
		case 40:
			image = require("image!40");
			break;
		case 41:
			image = require("image!41");
			break;
		case 42:
			image = require("image!42");
			break;
		case 43:
			image = require("image!43");
			break;
		case 44:
			image = require("image!44");
			break;
		case 45:
			image = require("image!45");
			break;
		case 46:
			image = require("image!46");
			break;
		case 47:
			image = require("image!47");
			break;
		case 48:
			image = require("image!48");
			break;
		case 49:
			image = require("image!49");
			break;
		case 50:
			image = require("image!50");
			break;
		case 51:
			image = require("image!51");
			break;
		case 52:
			image = require("image!52");
			break;
		case 53:
			image = require("image!53");
			break;
		case 54:
			image = require("image!54");
			break;
		case 55:
			image = require("image!55");
			break;
		case 56:
			image = require("image!56");
			break;
		case 57:
			image = require("image!57");
			break;
		case 58:
			image = require("image!58");
			break;
		case 59:
			image = require("image!59");
			break;
		case 60:
			image = require("image!60");
			break;
		case 61:
			image = require("image!61");
			break;
		case 62:
			image = require("image!62");
			break;
		case 63:
			image = require("image!63");
			break;
		case 64:
			image = require("image!64");
			break;
		case 65:
			image = require("image!65");
			break;
		case 66:
			image = require("image!66");
			break;
		case 67:
			image = require("image!67");
			break;
		case 68:
			image = require("image!68");
			break;
		case 69:
			image = require("image!69");
			break;
		case 70:
			image = require("image!70");
			break;
		case 71:
			image = require("image!71");
			break;
		case 72:
			image = require("image!72");
			break;
		case 73:
			image = require("image!73");
			break;
		case 74:
			image = require("image!74");
			break;
		case 75:
			image = require("image!75");
			break;
		case 76:
			image = require("image!76");
			break;
		case 77:
			image = require("image!77");
			break;
		case 78:
			image = require("image!78");
			break;
		case 79:
			image = require("image!79");
			break;
		case 80:
			image = require("image!80");
			break;
		case 81:
			image = require("image!81");
			break;
		case 82:
			image = require("image!82");
			break;
		case 83:
			image = require("image!83");
			break;
		case 84:
			image = require("image!84");
			break;
		case 85:
			image = require("image!85");
			break;
		case 86:
			image = require("image!86");
			break;
		case 87:
			image = require("image!87");
			break;
		case 88:
			image = require("image!88");
			break;
		case 89:
			image = require("image!89");
			break;
		case 90:
			image = require("image!90");
			break;
		case 91:
			image = require("image!91");
			break;
		case 92:
			image = require("image!92");
			break;
		case 93:
			image = require("image!93");
			break;
		case 94:
			image = require("image!94");
			break;
		case 95:
			image = require("image!95");
			break;
		case 96:
			image = require("image!96");
			break;
		case 97:
			image = require("image!97");
			break;
		case 98:
			image = require("image!98");
			break;
		case 99:
			image = require("image!99");
			break;
		case 100:
			image = require("image!100");
			break;
		case 101:
			image = require("image!101");
			break;
		case 102:
			image = require("image!102");
			break;
		case 103:
			image = require("image!103");
			break;
		case 104:
			image = require("image!104");
			break;
		case 105:
			image = require("image!105");
			break;
		case 106:
			image = require("image!106");
			break;
		case 107:
			image = require("image!107");
			break;
		case 108:
		// missing
			image = require("image!109");
			break;
		case 109:
			image = require("image!109");
			break;
		case 110:
			image = require("image!110");
			break;
		case 111:
			image = require("image!111");
			break;
		case 112:
			image = require("image!112");
			break;
		case 113:
			image = require("image!113");
			break;	
		default:
			image = require("image!1");
			break;
	}

	return image;
}

function timeout(ms, promise) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error("timeout"))
    }, ms)
    promise.then(resolve, reject)
  })
}

module.exports = new apiSteam();