'use strict';

(function (window, $) {
  var todoTaskClass = function () {
    const enterKey = 13;
    var _todoScript,
        _todoArray,
        _newTaskText,
        _clearAll,
        _taskCounter;
    
    var _init = function () {
      _todoScript   = $('#todo-ul-script');
      _newTaskText  = $('#new-task');
      _clearAll     = $('.clear-all');
      _taskCounter  = $('.task-counter');
      _todoArray    = taskApi;

      _setUpDom();
      _bindUIActions();
    };

    function _updateDom () {

    }
    function _bindUIActions () {
      $(_newTaskText).keypress(function(event) {
        if(event.charCode == enterKey) {
          _addTask();
        }
      });
      
      $(_clearAll).click(function (event) {
        event.preventDefault();
        _emptyArray();
      });
    }
    
    function _setUpDom () {
      var todoTemplate    = _.template(_todoScript.html()),
          todoApi         = todoTemplate({todoArray: _todoArray });

      // Update the dom
      $('.todo-ul-list').html(todoApi);
      _updateDom();
    }

    function _updateDom() {
      _taskCounter.html(_nextId() - 1);      
    }

    function _nextId () {
      return _todoArray.length + 1;
    }
    
    function _checkInput () {
      return _newTaskText.text();
    }

    function _emptyInput () {
      _newTaskText.val('');
    }

    function _addTask () {
      var _unique = _nextId();

      if (!_checkInput()) {
        _todoArray.push({
          "tags": [],
          "position": 0,
          "status": {
            "displayString":"incomplete",
            "name":"INCOMPLETE",
          },
          "root":false,
          "id":   _unique,
          "name": _newTaskText.val(),
          "comments": [],
          "completed": false
        });
        
        _emptyInput();
        _setUpDom();
      }
    }

    function _emptyArray () {
      _todoArray = [];
      _setUpDom();
    }
    return {
      init      : _init
    }
  }
  // console.log(todoTaskClass)
  var todo = new todoTaskClass();
  todo.init();

})(window, jQuery);
