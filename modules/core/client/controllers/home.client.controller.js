'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'News', 'NotificationService',
  function ($scope, Authentication, News, NotificationService) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.onBell = function() {
      setTimeout(function() {
        NotificationService.showNotification({
          title: 'CropForecast',
          content: 'Something happened1!',
          icon: 'modules/core/client/img/cloud.png'
        });
      }, 0);
    };

    $scope.postTypes = [
      {
        key: 'News',
        title: 'News'
      },
      {
        key: 'Post',
        title: 'Articles'
      },
      {
        key: 'Popular',
        title: 'Popular tags'
      }
    ];

    $scope.setSelected = function(item) {
      if ($scope.selectedPostType) $scope.selectedPostType.active = false;
      item.active = true;
      $scope.selectedPostType = item;
    };

    $scope.setSelected($scope.postTypes[0]);

    News.getData().then(function(result) {
      $scope.posts = result;
    });

    $scope.mainButtons = [
      {
        title: 'List',
        icon: 'list-alt'
      },
      {
        title: 'Favourite',
        icon: 'heart'
      },
      {
        title: 'Books',
        icon: 'book'
      },
      {
        title: 'Data',
        icon: 'barcode'
      },
      {
        title: 'Bells',
        icon: 'bell'
      },
      {
        title: 'Files',
        icon: 'folder-open'
      }
    ];

    $scope.news = [{
      title: 'Something new',
      content: 'Lorem ipsum ',
      user: 'Mary',
      date: 'Feb 19, 2016',
      from: 'argo'
    }, {
      title: 'The show performed!',
      content: 'Really great show performed last sunday',
      user: 'J. D. Henderson',
      date: 'Feb 19, 2016',
      from: 'argo'
    }];
  }
]);
