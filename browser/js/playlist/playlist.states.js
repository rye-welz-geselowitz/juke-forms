'use strict';

juke.config(function ($stateProvider) {

  $stateProvider.state('createPlaylist', {
    url: '/playlists/new',
    templateUrl: '/js/playlist/templates/new-playlist.html',
    controller: 'PlaylistCtrl'
  });

});

juke.config(function ($stateProvider) {

  $stateProvider.state('SinglePlaylist', {
    url: '/playlists/:id',
    templateUrl: '/js/playlist/templates/single-playlist.html',
    controller: 'SinglePlaylistCtrl'
  });

});
