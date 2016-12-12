

var Rooms = function() {
  var roomStore = {};
  /*
  * individual room class, requires a name
  * if a player is removed and the room becomes
  * empty it is destroyed
  */
  var Room = function(name) {
    if(!name){
      return null;
    } else {
      var players = {}
      var numPlayers = Object.keys(players).length
      var trivia = [];
      this.destroy = function() {
        delete roomStore[name];
      }
      this.addTrivia = function(trivia) {
        if(Array.isArray(trivia)) {        
          trivia = this.trivia.concat(trivia);
        } else {
          throw new Error('add trivia requires array argument');
        }
      }
      this.getTrivia = function() {
        return this.trivia.pop();
      }
      this.addPlayer = function(player) {
        if(this[player] === undefined) {
          players[player] = 0;
          numPlayers = Object.keys(players).length;
        } else {
          console.log('that player exists');
        }
        return this;
      }
      this.removePlayer =  function(player, persist) {
        delete players[player];
        if(!persist && Object.keys(players).length < 1 ) {
          this.destroy();
        }
        return this;
      }
      this.getPlayers = function() {
        var arr = []
        for(var key in players) {
          arr.push({name: key, score: players[key]})
        }
        return arr;
      }
    }
  }

  this.makeRoom = function(room, player) {
    return new Promise(function(resolve, reject) {
      if((typeof room) !== 'string' || room.length < 1) {
        reject('must have a room name');
      } else if(roomStore[room]) {
        reject('that room exists')
      } else {
        roomStore[room] = new Room(room)
        if(Object.keys(roomStore[room]).length < 1) {
          reject('unkown error making room');
        } else {
          if((typeof player) !== 'string' || player.length < 1){
            roomStore[room].addPlayer(player);
          }
          resolve(roomStore[room])
        }
      }
    })
  }

  this.getRoom = function(room) {
    return new Promise(function(resolve, reject) {
      if(roomStore[room]) {
        resolve(roomStore[room])
      } else {
        reject('no such room');
      }
    })
  }

  this.getRooms = function() {
    return new Promise(function(resolve, reject) {
      var arr = [];
      for(var key in roomStore) {
        arr.push({key: roomStore[key]})
      }
      resolve(arr);
    })
  }
}
