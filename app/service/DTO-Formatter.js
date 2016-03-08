var _ = require("lodash"),
	moment = require("moment"),
	React = require("react-native"),
	Const = require("./Constant"),
	apiSteam = require("./api-steam"),

{
  AsyncStorage
} = React;

class dtoFormatter {
	formatMatch(match , cb){
		var result = {
			team_radiant:[],
			team_dire:[]
		};

		result.won = match.radiant_win?"radiant":"dire";
		result.gameStartTimeInUTC = moment.unix(match.start_time).format("DD/MM/YYYY, h:mm:ss a");
		result.gameLastTime = Math.floor(moment.duration(match.duration , "seconds").asMinutes());

		_.forEach(match.players , function (player) {
			player.player_slot < 128 ? result.team_radiant.push(player) : result.team_dire.push(player);
		});

		cb(result);
	}

	getSearchHistory(players, cb){
		var loadedPlayers = [], length = players.length,count = 0;

		_.forEach(players, (player, i)=>{
			AsyncStorage.multiGet(
				[
				Const.KEY_PLAYER_USERNAME + "_" + player ,
				Const.KEY_PLAYER_AVATAR + "_" + player ,
				Const.KEY_PLAYER_REQUEST_TIME + "_" + player 
				])
			.then((values)=>{
				loadedPlayers.push({
					steamid: player,
					dotaid: apiSteam.steamidToDotaid(player),
					username: values[0][1],
					avatar: values[1][1],
					requestTime: values[2][1],
				});
				count++;
				if(count === length){
					cb(loadedPlayers);
				}
			})
			.catch((err)=>{console.log(err);});
		});
	}
}

module.exports = new dtoFormatter();