'use strict';

juke.factory('PlaylistFactory', function ($http) {
  var cachedPlaylists=[];
  var PlaylistFactory={};
  PlaylistFactory.create=function(playlistData){
    return $http.post('/api/playlists', playlistData)
    .then(function(response){
      var playlist=response.data;
      cachedPlaylists.push(playlist)
      return playlist;

    })
  }
  PlaylistFactory.fetchAllPlaylists=function(){
    return $http.get('/api/playlists')
    .then(function(response){
      angular.copy(response.data,cachedPlaylists)
      return cachedPlaylists;
    })
  }
  PlaylistFactory.fetchSinglePlaylist=function(id){
    return $http.get('/api/playlists/'+id)
    .then(function(response){
      console.log('playlist',response.data);
      var playlist=response.data;
      playlist.songs.forEach(function(song){
         song.audioUrl = '/api/songs/' + song.id + '/audio';
      })
      return playlist;
    });
  }


  return PlaylistFactory;
});
