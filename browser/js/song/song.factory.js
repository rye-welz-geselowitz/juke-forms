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
    		return songs;
    	})
    },
    addSong:function(playlistId,songId){
    	return $http.post('/api/playlists/'+playlistId+'/songs',{id:songId})
    	.then(function(response){
    		var song=response.data;
    		song.audioUrl = '/api/songs/' + song.id + '/audio';
    		return song;
    	})
    },
    removeSong:function(playlistId,songId){
      return $http.delete('/api/playlists/'+playlistId+'/songs/'+songId);
    }

  };

});
