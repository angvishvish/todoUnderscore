'use strict';

(function (window, $) {
  var todoTaskClass = function () {
    const enterKey = 13;
    var _todoScriptElem,
        _newTaskTextElem,
        _taskCounterElem,
        _clearAllElem,
        _clearCheckedElem,
        _checkTaskElem,
        _removeTaskElem,
        _undoElem,
        _currentTaskId,
        _todoArray;
    
    var _init = function () {
      _todoScriptElem   = $('#todo-ul-script');
      _newTaskTextElem  = $('#new-task');
      _taskCounterElem  = $('.task-counter');
      _clearAllElem     = '.clear-all';
      _clearCheckedElem = '.clear-checked';
      _checkTaskElem    = '.check-task:checkbox';
      _removeTaskElem   = '.icon-remove';
      _undoElem         = '.undo-remove';
      _todoArray        = taskApi;

      _setUpDom();
      _bindUIActions();
    };

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

      $(_clearCheckedElem).click(function (event) {
        event.preventDefault();
        _clearChecked();
      });

      $(_undoElem).click(function (event) {
        event.preventDefault();
        _undoTask();
      });

      $(document).on('change', _checkTaskElem, function (event) {
        event.preventDefault();
        if($(this).is(':checked')) {
          _checkTask($(this).data('id'), true);
        } else {
          _checkTask($(this).data('id'), false);
        }
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
      var taskCount = 0;
      _.each(_todoArray, function (elem) {
        if (!elem.deleted) {
          taskCount++;
        }
      });
      _taskCounterElem.html(taskCount);
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
      _setTaskArray(Id, true, false);
    }

    function _checkTask (Id, set) {
      _setTaskArray(Id, set, true);
    }

    function _clearChecked() {
      _.each(_todoArray, function (elem) {
        if (elem.completed) {
          elem.deleted = true;
        }
      });
      _setUpDom();
    }

    function _undoTask() {
      _setTaskArray(_currentTaskId, false, false);
      _currentTaskId = _currentTaskId - 1;
    }
    function _setTaskArray (Id, set, checked) {
      _.each(_todoArray, function (elem) {
        if (checked && elem.id == Id) {
          elem.completed = set;
        } else {
          if (elem.id == Id) {
            elem.deleted = set;
          }
        }
        _currentTaskId = Id;
      });
      _setUpDom();
      console.log(_todoArray);
    }

    function _emptyArray () {
      _todoArray = [];
      _setUpDom();
    }
    return {
      init : _init
    }
  }
  // console.log(todoTaskClass)
  var todo = todoTaskClass();
  todo.init();

})(window, jQuery);
