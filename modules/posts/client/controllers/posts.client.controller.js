'use strict';

// Articles controller
angular.module('posts').controller('PostsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Posts', 'Dictionaries',
  function ($scope, $stateParams, $location, Authentication, Posts, Dictionaries) {
    $scope.authentication = Authentication;

    $scope.update = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');
        return false;
      }

      var post;
      if ($scope.post._id) {
        post = $scope.post;
        post.$update(function() {
          $location.path('posts/' + post._id);
        }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      }
      else {
        post = new Posts({
          title: this.post.title,
          content: this.post.content,
          postType: this.post.postType,
          authorDisplay: this.post.authorDisplay
        });

        post.$save(function(response) {
          $location.path('posts/' + response._id);

          $scope.title = '';
          $scope.content = '';
        }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      }
    };
    // Remove existing Post
    $scope.remove = function (post) {
      if (post) {
        post.$remove();

        for (var i in $scope.posts) {
          if ($scope.posts[i] === post) {
            $scope.posts.splice(i, 1);
          }
        }
      } else {
        $scope.post.$remove(function () {
          $location.path('posts');
        });
      }
    };

    // Find a list of Posts
    $scope.find = function () {
      $scope.posts = Posts.query();
    };

    // Find existing Post
    $scope.findOne = function () {
      $scope.post = Posts.get({
        postId: $stateParams.postId
      });
    };

    $scope.getDictionary = function() {
      $scope.types = Dictionaries.get({
        dictId: 'POST_TYPE'
      });
    };

    $scope.initUpdateForm = function() {
      $scope.types = Dictionaries.get({
        dictId: 'POST_TYPE'
      });
      if($stateParams.postId) {
        $scope.post = Posts.get({
          postId: $stateParams.postId
        });
        $scope.updateValue = 'Update';
      }
      else {
        $scope.updateValue = 'Create';
        $scope.post = {
          authorDisplay: true
        };
      }
    };

    $scope.onCancel = function() {
      $location.path('/posts');
    };
  }
]);