'use strict';

juke.factory('SongFactory', function ($http) {
  return {
    convert: function (song) {
      song.audioUrl = '/api/songs/' + song.id + '/audio';
      return song;
    },
    fetchAllSongs: function(){
    	return $http.get('/api/songs')
    	.then(function(response){
    		var songs=response.data;
    		// songs.forEach(function(song){
   			// 	song.audioUrl = '/api/songs/' + song.id + '/audio';
   			// })
    		return songs;
    	})
    },
    addSong:function(playlistId,songId){
    	return $http.post('/api/playlists/'+playlistId+'/songs',{id:songId})
    	.then(function(response){
    		var song=response.data;
    		console.log(song);
    		song.audioUrl = '/api/songs/' + song.id + '/audio';
    		// var song=response.data;
    		// song=this.convert(song);
    		// return song
    		console.log(song);
    		return song;
    	})

    }
  };

});
