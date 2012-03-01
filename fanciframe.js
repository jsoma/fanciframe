(function(window) {
  "use strict";

  window.FanciFrame = {

    // From http://stackoverflow.com/a/3819589
    outerHTML: function(node){
      // if IE, Chrome take the internal method otherwise build one
      return node.outerHTML || (
          function(n){
              var div = document.createElement('div'), h;
              div.appendChild( n.cloneNode(true) );
              h = div.innerHTML;
              div = null;
              return h;
          })(node);
    },
    
    // Automatically embed the iframe at the given point of code
    embed: function(url, options, iframeOptions) {
      var iframe = this.iframe(url, options, iframeOptions);

      document.write(this.outerHTML(iframe));      
    },
    
    // Get the iframe object so you can attach it where you'd like
    iframe: function(url, options, iframeOptions) {
      var fullEmbedUrl = this.url(url, options);

      if( typeof(iframeOptions) === undefined) {
        iframeOptions = {};
      }

      var iframe = document.createElement('iframe');
      
      for(var item in iframeOptions) {
        iframe.setAttribute(item, iframeOptions[item]);
      }

      iframe.setAttribute('src', fullEmbedUrl);

      return iframe;
    },

    // Play around with the variables to get the iframe src
    url: function(url, options) {
      var anchor = window.location.hash.substring(1);
      var params;
      var input, output;

      if(options === undefined) {
        options = { input: 'anchor', output: 'anchor' };
      }
    
      if(typeof(options.input) === undefined) {
        options.input = 'anchor';
      }
      
      if(typeof(options.output) === undefined) {
        options.output = 'anchor';
      }
    
      if(window.location.href.indexOf('?') !== -1) {
        params = window.location.href.replace(/.*\?/,'');
      } else {
        params = "";
      }
    
      params = params.replace(/#.*/,'');
    
      if(options.input === 'anchor') {
        input = anchor;
      } else {
        input = params;
      }
    
      if(options.output === 'anchor') {
        return url + "#" + input;
      }
    
      if(options.input !== 'params') {
        var match_attempt = input.match('.*' + options.input + '=(.*)&?');
        var var_name;
      
        if(options.output === 'params') {
          var_name = options.input;
        } else {
          var_name = options.output;
        }
      
        if(match_attempt === null) {
          input = options.output + "=";
        } else {
          input = options.output + "=" + match_attempt[1];
        }
      }
    
      if(url.indexOf('?') !== -1) {
        return url + "&" + input;
      } else {
        return url + "?" + input;
      }
    
      return anchor;
    }

  };
})(window);