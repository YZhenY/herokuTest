"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Inputs = function (_React$Component) {
  _inherits(Inputs, _React$Component);

  function Inputs(props) {
    _classCallCheck(this, Inputs);

    return _possibleConstructorReturn(this, (Inputs.__proto__ || Object.getPrototypeOf(Inputs)).call(this, props));
  }

  _createClass(Inputs, [{
    key: "handleClick",
    value: function handleClick(e) {
      console.log($('#name').val());
      window.ApiCall();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "inputs", className: "container" },
        React.createElement(
          "div",
          { className: "inputBox" },
          React.createElement("input", {
            id: "name",
            placeholder: "Name",
            type: "text"
          })
        ),
        React.createElement(
          "div",
          { className: "inputBox" },
          React.createElement("input", {
            id: "email",
            placeholder: "Email Address",
            type: "email"
          })
        ),
        React.createElement(
          "div",
          { className: "inputBox" },
          React.createElement(
            "button",
            {
              onClick: this.handleClick.bind(this),
              id: "submit" },
            "Send MocuSign"
          )
        )
      );
    }
  }]);

  return Inputs;
}(React.Component);

window.Inputs = Inputs;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0lucHV0cy5qc3giXSwibmFtZXMiOlsiSW5wdXRzIiwicHJvcHMiLCJlIiwiY29uc29sZSIsImxvZyIsIiQiLCJ2YWwiLCJ3aW5kb3ciLCJBcGlDYWxsIiwiaGFuZGxlQ2xpY2siLCJiaW5kIiwiUmVhY3QiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTUEsTTs7O0FBRUosa0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSwyR0FDWEEsS0FEVztBQUVsQjs7OztnQ0FFV0MsQyxFQUFHO0FBQ2JDLGNBQVFDLEdBQVIsQ0FBWUMsRUFBRSxPQUFGLEVBQVdDLEdBQVgsRUFBWjtBQUNBQyxhQUFPQyxPQUFQO0FBQ0Q7Ozs2QkFDUTtBQUNQLGFBQ0U7QUFBQTtBQUFBLFVBQUssSUFBRyxRQUFSLEVBQWlCLFdBQVUsV0FBM0I7QUFDRTtBQUFBO0FBQUEsWUFBSyxXQUFVLFVBQWY7QUFDRTtBQUNFLGdCQUFHLE1BREw7QUFFRSx5QkFBWSxNQUZkO0FBR0Usa0JBQUs7QUFIUDtBQURGLFNBREY7QUFRRTtBQUFBO0FBQUEsWUFBSyxXQUFVLFVBQWY7QUFDRTtBQUNFLGdCQUFHLE9BREw7QUFFRSx5QkFBWSxlQUZkO0FBR0Usa0JBQUs7QUFIUDtBQURGLFNBUkY7QUFlRTtBQUFBO0FBQUEsWUFBSyxXQUFVLFVBQWY7QUFDRTtBQUFBO0FBQUE7QUFDRSx1QkFBUyxLQUFLQyxXQUFMLENBQWlCQyxJQUFqQixDQUFzQixJQUF0QixDQURYO0FBRUUsa0JBQUcsUUFGTDtBQUFBO0FBQUE7QUFERjtBQWZGLE9BREY7QUF3QkQ7Ozs7RUFuQ2tCQyxNQUFNQyxTOztBQXNDM0JMLE9BQU9QLE1BQVAsR0FBZ0JBLE1BQWhCIiwiZmlsZSI6IklucHV0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIElucHV0cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuICBoYW5kbGVDbGljayhlKSB7XG4gICAgY29uc29sZS5sb2coJCgnI25hbWUnKS52YWwoKSk7XG4gICAgd2luZG93LkFwaUNhbGwoKTtcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJpbnB1dHNcIiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dEJveFwiPlxuICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgIGlkPVwibmFtZVwiIFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJOYW1lXCIgXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5wdXRCb3hcIj5cbiAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICBpZD1cImVtYWlsXCIgXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVtYWlsIEFkZHJlc3NcIiBcbiAgICAgICAgICAgIHR5cGU9XCJlbWFpbFwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5wdXRCb3hcIj5cbiAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpfSBcbiAgICAgICAgICAgIGlkPVwic3VibWl0XCI+U2VuZCBNb2N1U2lnblxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG59XG53aW5kb3cuSW5wdXRzID0gSW5wdXRzO1xuIl19