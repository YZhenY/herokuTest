'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Data
 */

var contacts = [{ key: 1, name: "James K Nelson", email: "james@jamesknelson.com", description: "Front-end Unicorn", companyName: "MocuSign", address: "944 Market Street, San Francisco, CA. 94115" }, { key: 2, name: "Jim", email: "jim@example.com", companyName: "MocuSign", address: "944 Market Street, San Francisco, CA. 94115" }, { key: 3, name: "Joe" }];

var newContact = { name: "", email: "", description: ""

  /*
   * Entry point
   */
};it('renders without crashing', function () {
  _reactDom2.default.render(_react2.default.createElement(_App2.default, null), _react2.default.createElement(ContactView, {
    contacts: contacts,
    newContact: newContact
  }));
  _reactDom2.default.unmountComponentAtNode(div);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9BcHAudGVzdC5qcyJdLCJuYW1lcyI6WyJjb250YWN0cyIsImtleSIsIm5hbWUiLCJlbWFpbCIsImRlc2NyaXB0aW9uIiwiY29tcGFueU5hbWUiLCJhZGRyZXNzIiwibmV3Q29udGFjdCIsIml0IiwicmVuZGVyIiwiY3JlYXRlRWxlbWVudCIsIkNvbnRhY3RWaWV3IiwidW5tb3VudENvbXBvbmVudEF0Tm9kZSIsImRpdiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUdBOzs7O0FBSUEsSUFBSUEsV0FBVyxDQUNiLEVBQUNDLEtBQUssQ0FBTixFQUFTQyxNQUFNLGdCQUFmLEVBQWlDQyxPQUFPLHdCQUF4QyxFQUFrRUMsYUFBYSxtQkFBL0UsRUFBb0dDLGFBQWEsVUFBakgsRUFBNkhDLFNBQVMsNkNBQXRJLEVBRGEsRUFFYixFQUFDTCxLQUFLLENBQU4sRUFBU0MsTUFBTSxLQUFmLEVBQXNCQyxPQUFPLGlCQUE3QixFQUFnREUsYUFBYSxVQUE3RCxFQUF5RUMsU0FBUyw2Q0FBbEYsRUFGYSxFQUdiLEVBQUNMLEtBQUssQ0FBTixFQUFTQyxNQUFNLEtBQWYsRUFIYSxDQUFmOztBQU1BLElBQUlLLGFBQWEsRUFBQ0wsTUFBTSxFQUFQLEVBQVdDLE9BQU8sRUFBbEIsRUFBc0JDLGFBQWE7O0FBR3BEOzs7QUFIaUIsQ0FBakIsQ0FNQUksR0FBRywwQkFBSCxFQUErQixZQUFNO0FBQ25DLHFCQUFTQyxNQUFULENBQWdCLGtEQUFoQixFQUNFLGdCQUFNQyxhQUFOLENBQW9CQyxXQUFwQixFQUFpQztBQUMvQlgsY0FBVUEsUUFEcUI7QUFFL0JPLGdCQUFZQTtBQUZtQixHQUFqQyxDQURGO0FBS0EscUJBQVNLLHNCQUFULENBQWdDQyxHQUFoQztBQUNELENBUEQiLCJmaWxlIjoiQXBwLnRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgQXBwIGZyb20gJy4vQXBwJztcblxuXG4vKlxuICogRGF0YVxuICovXG5cbnZhciBjb250YWN0cyA9IFtcbiAge2tleTogMSwgbmFtZTogXCJKYW1lcyBLIE5lbHNvblwiLCBlbWFpbDogXCJqYW1lc0BqYW1lc2tuZWxzb24uY29tXCIsIGRlc2NyaXB0aW9uOiBcIkZyb250LWVuZCBVbmljb3JuXCIsIGNvbXBhbnlOYW1lOiBcIk1vY3VTaWduXCIsIGFkZHJlc3M6IFwiOTQ0IE1hcmtldCBTdHJlZXQsIFNhbiBGcmFuY2lzY28sIENBLiA5NDExNVwifSxcbiAge2tleTogMiwgbmFtZTogXCJKaW1cIiwgZW1haWw6IFwiamltQGV4YW1wbGUuY29tXCIsIGNvbXBhbnlOYW1lOiBcIk1vY3VTaWduXCIsIGFkZHJlc3M6IFwiOTQ0IE1hcmtldCBTdHJlZXQsIFNhbiBGcmFuY2lzY28sIENBLiA5NDExNVwifSxcbiAge2tleTogMywgbmFtZTogXCJKb2VcIn0sXG5dXG5cbnZhciBuZXdDb250YWN0ID0ge25hbWU6IFwiXCIsIGVtYWlsOiBcIlwiLCBkZXNjcmlwdGlvbjogXCJcIn1cblxuXG4vKlxuICogRW50cnkgcG9pbnRcbiAqL1xuaXQoJ3JlbmRlcnMgd2l0aG91dCBjcmFzaGluZycsICgpID0+IHtcbiAgUmVhY3RET00ucmVuZGVyKDxBcHAgLz4sXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChDb250YWN0Vmlldywge1xuICAgICAgY29udGFjdHM6IGNvbnRhY3RzLFxuICAgICAgbmV3Q29udGFjdDogbmV3Q29udGFjdFxuICAgIH0pKTtcbiAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZShkaXYpO1xufSk7XG4iXX0=