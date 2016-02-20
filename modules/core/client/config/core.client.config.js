'use strict';

// Setting up route
angular.module('core')
  .config(['$affixProvider', function ($affixProvider) {
    angular.extend($affixProvider.defaults, {
      inlineStyles: false
    });
  }])

  .config(['$provide', function($provide){
    // this demonstrates how to register a new tool and add it to the default toolbar
    $provide.decorator('taOptions', ['$delegate', function(taOptions){
      // $delegate is the taOptions we are decorating
      // here we override the default toolbars and classes specified in taOptions.
      taOptions.forceTextAngularSanitize = false; // set false to allow the textAngular-sanitize provider to be replaced
      taOptions.keyMappings = []; // allow customizable keyMappings for specialized key boards or languages
      taOptions.toolbar = [
        ['h2', 'h3', 'h4', 'h5', 'p', 'pre', 'quote'],
        ['ul', 'ol', 'redo', 'undo', 'clear'],
        ['justifyLeft','justifyCenter','justifyRight', 'justifyFull'],
        ['html', 'insertImage', 'insertLink']
      ];
      taOptions.classes = {
        focussed: 'focussed',
        toolbar: 'btn-toolbar',
        toolbarGroup: 'btn-group',
        toolbarButton: 'btn btn-default',
        toolbarButtonActive: 'active',
        disabled: 'disabled',
        textEditor: 'form-control',
        htmlEditor: 'form-control'
      };
      return taOptions; // whatever you return will be the taOptions
    }]);
  }]);