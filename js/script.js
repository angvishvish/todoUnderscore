'use strict';

(function (window, $) {
  var todoTaskClass = function () {
    const enterKey = 13;
    var _todoScriptElem,
        _newTaskTextElem,
        _clearAllElem,
        _taskCounterElem,
        _removeTaskElem,
        _undoElem,
        _currentTaskId,
        _todoArray;
    
    var _init = function () {
      _todoScriptElem   = $('#todo-ul-script');
      _newTaskTextElem  = $('#new-task');
      _clearAllElem     = $('.clear-all');
      _taskCounterElem  = $('.task-counter');
      _removeTaskElem   = '.icon-remove';
      _undoElem         = '.undo-remove';
      _todoArray        = taskApi;

      _setUpDom();
      _bindUIActions();
    };

    function _updateDom () {

    }
    function _bindUIActions () {
      $(_newTaskTextElem).keypress(function (event) {
        if(event.charCode == enterKey) {
          _addTask();
        }
      });
      
      $(_clearAllElem).click(function (event) {
        event.preventDefault();
        _emptyArray();
      });

      $(_undoElem).click(function (event) {
        event.preventDefault();
        _undoTask();
      });

      $(document).on('click', _removeTaskElem, function (event) {
        event.preventDefault();
        _removeTask($(this).data('id'));
      });
    }
    
    function _setUpDom () {
      var todoTemplate    = _.template(_todoScriptElem.html()),
          todoApi         = todoTemplate({todoArray: _todoArray });

      // Update the dom
      $('.todo-ul-list').html(todoApi);
      _updateDom();
    }

    function _updateDom() {
      _taskCounterElem.html(_nextId() - 1);      
    }

    function _nextId () {
      return _todoArray.length + 1;
    }
    
    function _checkInput () {
      return _newTaskTextElem.val() == '';
    }

    function _emptyInput () {
      _newTaskTextElem.val('');
    }

    function _addTask () {
      var _unique = _nextId();

      if (!_checkInput()) {
        _currentTaskId = _unique;

        _todoArray.push({
          "tags": [],
          "position": 0,
          "status": {
            "displayString":"incomplete",
            "name":"INCOMPLETE",
          },
          "root": false,
          "id":   _unique,
          "name": _newTaskTextElem.val(),
          "comments":   [],
          "completed":  false,
          "deleted":    false
        });
        
        _emptyInput();
        _setUpDom();
      }
    }

    function _removeTask(Id) {
      _setTaskArray(Id, true);
    }

    function _undoTask() {
      _setTaskArray(_currentTaskId, false);
      _currentTaskId = _currentTaskId - 1;
    }
    function _setTaskArray (Id, set) {
      _.each(_todoArray, function (elem) {
        if (elem.id == Id) {
          _currentTaskId = Id;
          elem.deleted = set;
        }
      });
      _setUpDom();
    }

    function _emptyArray () {
      _todoArray = [];
    }
    return {
      init : _init
    }
  }
  // console.log(todoTaskClass)
  var todo = todoTaskClass();
  todo.init();

})(window, jQuery);
