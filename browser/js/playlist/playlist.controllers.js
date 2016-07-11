'use strict';

juke.controller('PlaylistCtrl', function ($scope,PlaylistFactory,$rootScope,$state) {
	$scope.submitPlaylist=function(data){
		PlaylistFactory.create(data)
		.then(function(playlist){
			console.log('created dat playlist: ',playlist.id)
			$scope.playlist={};
			$scope.playlistForm.$setPristine();
			$state.go('SinglePlaylist',{id:playlist.id});
		});
	}
});

juke.controller('PlaylistListCtrl', function ($scope,PlaylistFactory) {
	PlaylistFactory.fetchAllPlaylists()
	.then(function(result){
		$scope.playlists=result;
		console.log('hi');
	})
});

juke.controller('SinglePlaylistCtrl', function ($scope,PlaylistFactory,$stateParams,SongFactory,PlayerFactory) {
	PlaylistFactory.fetchSinglePlaylist($stateParams.id)
	.then(function(result){
		$scope.playlist=result;
	})

	SongFactory.fetchAllSongs()
	.then(function(songs){
		$scope.songs=songs;
		console.log('songs',$scope.songs);
	});

	$scope.addSong=function(playlistId){
		var songId=$scope.selectedSong.id;
		SongFactory.addSong(playlistId,songId)
		.then(function(song){
			$scope.playlist.songs.push(song);
			$scope.selectedSong={};
			console.log('NEW SONG',song);
		});
	}
	$scope.removeSong=function(playlistId,songId){
		SongFactory.removeSong(playlistId,songId)
		.then(function(){
			for(var i=0;i<$scope.playlist.songs.length;i++){
				if($scope.playlist.songs[i].id===songId){
					$scope.playlist.songs.splice(i,1);
					break;
				}
			}
		})
		console.log('removing song');
	}
	$scope.toggle = function (song) {
		if (song !== PlayerFactory.getCurrentSong()) {
			PlayerFactory.start(song, $scope.songs);
		} else if ( PlayerFactory.isPlaying() ) {
			PlayerFactory.pause();
		} else {
			PlayerFactory.resume();
		}
	};

	$scope.getCurrentSong = function () {
		return PlayerFactory.getCurrentSong();
	};

	$scope.isPlaying = function (song) {
		return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
	};
});