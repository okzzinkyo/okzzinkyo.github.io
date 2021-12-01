var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToDoTitle = function (_React$Component) {
  _inherits(ToDoTitle, _React$Component);

  function ToDoTitle() {
    _classCallCheck(this, ToDoTitle);

    return _possibleConstructorReturn(this, (ToDoTitle.__proto__ || Object.getPrototypeOf(ToDoTitle)).apply(this, arguments));
  }

  _createClass(ToDoTitle, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "h2",
        { className: "ToDoTitle" },
        "TODO LIST"
      );
    }
  }]);

  return ToDoTitle;
}(React.Component);

var ToDoInput = function (_React$Component2) {
  _inherits(ToDoInput, _React$Component2);

  function ToDoInput(props) {
    _classCallCheck(this, ToDoInput);

    var _this2 = _possibleConstructorReturn(this, (ToDoInput.__proto__ || Object.getPrototypeOf(ToDoInput)).call(this, props));

    _this2.state = { value: '' };

    _this2.handleChange = _this2.handleChange.bind(_this2);
    _this2.handleSubmit = _this2.handleSubmit.bind(_this2);
    return _this2;
  }

  _createClass(ToDoInput, [{
    key: "handleChange",
    value: function handleChange(event) {
      this.setState({ value: event.target.value });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      localStorage.setItem(this.state.value, this.state.value);
      event.preventDefault();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "form",
        { className: "ToDoInput", onSubmit: this.handleSubmit },
        React.createElement("input", { className: "ToDoText", type: "text", value: this.state.value, onChange: this.handleChange, placeholder: "what do you have to do?" }),
        React.createElement(
          "button",
          { className: "btn_add", type: "submit" },
          "ADD"
        )
      );
    }
  }]);

  return ToDoInput;
}(React.Component);

// change 이벤트 같은 경우 네이티브 이벤트와 동작이 다른데, 네이티브 이벤트는 포커스 아웃이 됐을 때 사용자 입력이 완료되었다고 인식하여 change 이벤트가 발생하는 반면 react의 change 이벤트는 인풋에 텍스트가 입력되어 변경이 생기면 발생한다

var ToDoItem = function (_React$Component3) {
  _inherits(ToDoItem, _React$Component3);

  function ToDoItem(props) {
    _classCallCheck(this, ToDoItem);

    var _this3 = _possibleConstructorReturn(this, (ToDoItem.__proto__ || Object.getPrototypeOf(ToDoItem)).call(this, props));

    ItemList = {};
    _this3.addItem = _this3.addItem.bind(_this3);
    return _this3;
  }

  _createClass(ToDoItem, [{
    key: "addItem",
    value: function addItem(event) {
      localStorage.getItem("");
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "li",
        { className: "ToDoItem" },
        React.createElement("button", { type: "button", className: "checkbox" }),
        React.createElement("p", { className: "ToDoValue" }),
        React.createElement(
          "button",
          { className: "btn_delete", type: "button" },
          React.createElement("i", { "class": "fas fa-eraser" })
        )
      );
    }
  }]);

  return ToDoItem;
}(React.Component);

var ToDoItemList = function (_React$Component4) {
  _inherits(ToDoItemList, _React$Component4);

  function ToDoItemList() {
    _classCallCheck(this, ToDoItemList);

    return _possibleConstructorReturn(this, (ToDoItemList.__proto__ || Object.getPrototypeOf(ToDoItemList)).apply(this, arguments));
  }

  _createClass(ToDoItemList, [{
    key: "render",
    value: function render() {
      return React.createElement("ul", { className: "ToDoItemList" });
    }
  }]);

  return ToDoItemList;
}(React.Component);

var ToDoTemplate = function (_React$Component5) {
  _inherits(ToDoTemplate, _React$Component5);

  function ToDoTemplate() {
    _classCallCheck(this, ToDoTemplate);

    return _possibleConstructorReturn(this, (ToDoTemplate.__proto__ || Object.getPrototypeOf(ToDoTemplate)).apply(this, arguments));
  }

  _createClass(ToDoTemplate, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "ToDoTemplate" },
        React.createElement(ToDoTitle, null),
        React.createElement(ToDoInput, null),
        React.createElement(
          ToDoItemList,
          null,
          React.createElement(ToDoItem, null)
        )
      );
    }
  }]);

  return ToDoTemplate;
}(React.Component);

var domContainer = document.querySelector('#wrap');
ReactDOM.render(React.createElement(ToDoTemplate, null), domContainer);