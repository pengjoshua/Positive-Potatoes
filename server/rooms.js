

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
}

