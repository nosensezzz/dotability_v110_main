'use strict';

var React = require('react-native'),
	apiSteam = require("./api-steam"),
	_ = require("lodash"),
	moment = require("moment"),
	Const = require("./Constant"),

{
  AsyncStorage
} = React;

class Storage {
	User_Save_ID(id){
		var Key_user_id = "dotability_user_id";
		AsyncStorage.setItem(Key_user_id , id);
	}

	User_Save_Session_Key(session_key){
		var Key_Session_Key = "dotability_user_session_key";
		AsyncStorage.setItem(Key_Session_Key , session_key);
	}

	User_Get_Session_Key(cb){
		AsyncStorage.getItem("dotability_user_session_key")
		.then((val)=>{
			//console.log(val);
			cb(val); 
		});	
	}

	User_Get_Id(callback){
		AsyncStorage
		.getItem("dotability_user_id")
		.then((value)=>{
			callback(value);
		});
	}

	User_Clear_Login(cb){
		AsyncStorage.multiRemove(["dotability_user_id","dotability_user_session_key"], (err)=>{
			if(err){
				console.log(err);
			}
			cb();
		});
	}

	Search_Save_User(user , cb, errcb){
		var Key_Players = "dotability_searched_players",
			Key_Player_Avatar = "dotability_searched_player_avatar",
			Key_Player_Username = "dotability_searched_player_username",
			Key_Player_RequestTime = "dotability_searched_player_request_time",
			id = user.steamid,
			name = user.personaname,
			avatar = user.avatar,
			time = null,
			a1, newValue;

		time = moment().unix().toString();

		// console.log(id);
		// console.log(name);
		// console.log(avatar);
		// console.log(time);
		AsyncStorage.getItem(Key_Players)
		.then((value)=>{
			if(!value){
				AsyncStorage.setItem(Key_Players , id);
				AsyncStorage.setItem(Key_Player_Username + "_" + id , name);
				AsyncStorage.setItem(Key_Player_Avatar + "_" + id , avatar);
				AsyncStorage.setItem(Key_Player_RequestTime + "_" + id , time);
			} else {
				a1 = value.split("_");

				if(_.indexOf(a1, id) >= 0){
					_.remove(a1 , (sid)=>{
						return (sid == id);
					});
					a1.push(id);
					newValue = a1.join("_");
					AsyncStorage.setItem(Key_Players , newValue);
					AsyncStorage.setItem(Key_Player_RequestTime + "_" + id , time);
					cb({
						status : 200 // update
					});
				} else {
					if(a1.length >= Const.NON_VIP_SEARCH_HISTORY_LIMIT){
						a1.shift();
						a1.push(id);
						newValue = a1.join("_");
						AsyncStorage.setItem(Key_Players , newValue);
						AsyncStorage.setItem(Key_Player_Username + "_" + id , name);
						AsyncStorage.setItem(Key_Player_Avatar + "_" + id , avatar);
						AsyncStorage.setItem(Key_Player_RequestTime + "_" + id , time);
						cb({
							status : 101 // add new to end and remove first one
						});
					} else {
						newValue = value + "_" + id;
						AsyncStorage.setItem(Key_Players , newValue);
						AsyncStorage.setItem(Key_Player_Username + "_" + id , name);
						AsyncStorage.setItem(Key_Player_Avatar + "_" + id , avatar);
						AsyncStorage.setItem(Key_Player_RequestTime + "_" + id , time);
						cb({
							status : 100 // add new
						});
					}
				}
			}
		})
		.catch((err)=>{
			errcb(err);
		});
	}
}

module.exports = new Storage();