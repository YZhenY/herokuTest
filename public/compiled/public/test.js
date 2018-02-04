"use strict";

var async = require("async"),
    // async module
request = require("request"),
    // request module
fs = require("fs"); // fs module

var email = "paolo.z.roxas@gmail.com",
    // your account email
password = "4dndkw97",
    // your account password
integratorKey = "63a720bf-4c75-4b42-8502-280594e250d7",
    // your Integrator Key (found on the Preferences -> API page)
recipientName = "bubba",
    // recipient (signer) name
documentName = "doc.pdf",
    // copy document with this name into same directory!
baseUrl = ""; // we will retrieve this through the Login call

async.waterfall([
/////////////////////////////////////////////////////////////////////////////////////
// Step 1: Login (used to retrieve your accountId and baseUrl)
/////////////////////////////////////////////////////////////////////////////////////
function (next) {
  var url = "https://demo.docusign.net/restapi/v2/login_information";
  var body = ""; // no request body for login api call

  // set request url, method, body, and headers
  var options = initializeRequest(url, "GET", body, email, password);

  // send the request...
  request(options, function (err, res, body) {
    if (!parseResponseBody(err, res, body)) {
      return;
    }
    baseUrl = JSON.parse(body).loginAccounts[0].baseUrl;
    next(null); // call next function
  });
},

/////////////////////////////////////////////////////////////////////////////////////
// Step 2: Request Signature on a PDF Document
/////////////////////////////////////////////////////////////////////////////////////
function (next) {
  var url = baseUrl + "/envelopes";
  // following request body will place 1 signature tab 100 pixels to the right and
  // 100 pixels down from the top left of the document that you send in the request
  var body = {
    "recipients": {
      "signers": [{
        "email": email,
        "name": recipientName,
        "recipientId": 1,
        "tabs": {
          "signHereTabs": [{
            "xPosition": "100",
            "yPosition": "100",
            "documentId": "1",
            "pageNumber": "1"
          }]
        }
      }]
    },
    "emailSubject": 'DocuSign API - Signature Request on Document Call',
    "documents": [{
      "name": documentName,
      "documentId": 1
    }],
    "status": "sent"
  };

  // set request url, method, body, and headers
  var options = initializeRequest(url, "POST", body, email, password);

  // change default Content-Type header from "application/json" to "multipart/form-data"
  options.headers["Content-Type"] = "multipart/form-data";

  // configure a multipart http request with JSON body and document bytes
  options.multipart = [{
    "Content-Type": "application/json",
    "Content-Disposition": "form-data",
    "body": JSON.stringify(body)
  }, {
    "Content-Type": "application/pdf",
    'Content-Disposition': 'file; filename="' + documentName + '"; documentId=1',
    "body": fs.readFileSync(documentName)
  }];

  // send the request...
  request(options, function (err, res, body) {
    parseResponseBody(err, res, body);
  });
} // end function
]);

//***********************************************************************************************
// --- HELPER FUNCTIONS ---
//***********************************************************************************************
function initializeRequest(url, method, body, email, password) {
  var options = {
    "method": method,
    "uri": url,
    "body": body,
    "headers": {}
  };
  addRequestHeaders(options, email, password);
  return options;
}

///////////////////////////////////////////////////////////////////////////////////////////////
function addRequestHeaders(options, email, password) {
  // JSON formatted authentication header (XML format allowed as well)
  dsAuthHeader = JSON.stringify({
    "Username": email,
    "Password": password,
    "IntegratorKey": integratorKey // global
  });
  // DocuSign authorization header
  options.headers["X-DocuSign-Authentication"] = dsAuthHeader;
}

///////////////////////////////////////////////////////////////////////////////////////////////
function parseResponseBody(err, res, body) {
  console.log("\r\nAPI Call Result: \r\n", JSON.parse(body));
  if (res.statusCode != 200 && res.statusCode != 201) {
    // success statuses
    console.log("Error calling webservice, status is: ", res.statusCode);
    console.log("\r\n", err);
    return false;
  }
  return true;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3Rlc3QuanMiXSwibmFtZXMiOlsiYXN5bmMiLCJyZXF1aXJlIiwicmVxdWVzdCIsImZzIiwiZW1haWwiLCJwYXNzd29yZCIsImludGVncmF0b3JLZXkiLCJyZWNpcGllbnROYW1lIiwiZG9jdW1lbnROYW1lIiwiYmFzZVVybCIsIndhdGVyZmFsbCIsIm5leHQiLCJ1cmwiLCJib2R5Iiwib3B0aW9ucyIsImluaXRpYWxpemVSZXF1ZXN0IiwiZXJyIiwicmVzIiwicGFyc2VSZXNwb25zZUJvZHkiLCJKU09OIiwicGFyc2UiLCJsb2dpbkFjY291bnRzIiwiaGVhZGVycyIsIm11bHRpcGFydCIsInN0cmluZ2lmeSIsInJlYWRGaWxlU3luYyIsIm1ldGhvZCIsImFkZFJlcXVlc3RIZWFkZXJzIiwiZHNBdXRoSGVhZGVyIiwiY29uc29sZSIsImxvZyIsInN0YXR1c0NvZGUiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBUUEsUUFBUUMsUUFBUSxPQUFSLENBQWhCO0FBQUEsSUFBb0M7QUFDNUJDLFVBQVVELFFBQVEsU0FBUixDQURsQjtBQUFBLElBQ3dDO0FBQ2xDRSxLQUFLRixRQUFRLElBQVIsQ0FGWCxDLENBRThCOztBQUU5QixJQUFNRyxRQUFRLHlCQUFkO0FBQUEsSUFBZ0Q7QUFDMUNDLFdBQVcsVUFEakI7QUFBQSxJQUNpQztBQUMzQkMsZ0JBQWdCLHNDQUZ0QjtBQUFBLElBRW1FO0FBQy9EQyxnQkFBZ0IsT0FIcEI7QUFBQSxJQUdrQztBQUM1QkMsZUFBZSxTQUpyQjtBQUFBLElBSW9DO0FBQzlCQyxVQUFVLEVBTGhCLEMsQ0FLNEI7O0FBRTVCVCxNQUFNVSxTQUFOLENBQ0U7QUFDRTtBQUNBO0FBQ0E7QUFDQSxVQUFTQyxJQUFULEVBQWU7QUFDZixNQUFJQyxNQUFNLHdEQUFWO0FBQ0EsTUFBSUMsT0FBTyxFQUFYLENBRmUsQ0FFQzs7QUFFaEI7QUFDQSxNQUFJQyxVQUFVQyxrQkFBa0JILEdBQWxCLEVBQXVCLEtBQXZCLEVBQThCQyxJQUE5QixF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LDJCQUFaLEVBQXlDWCxLQUFLQyxLQUFMLENBQVdQLElBQVgsQ0FBekM7QUFDQSxNQUFJSSxJQUFJYyxVQUFKLElBQWtCLEdBQWxCLElBQXlCZCxJQUFJYyxVQUFKLElBQWtCLEdBQS9DLEVBQW9EO0FBQUU7QUFDcERGLFlBQVFDLEdBQVIsQ0FBWSx1Q0FBWixFQUFxRGIsSUFBSWMsVUFBekQ7QUFDQUYsWUFBUUMsR0FBUixDQUFZLE1BQVosRUFBb0JkLEdBQXBCO0FBQ0EsV0FBTyxLQUFQO0FBQ0Q7QUFDRCxTQUFPLElBQVA7QUFDRCIsImZpbGUiOiJ0ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyICAgICBhc3luYyA9IHJlcXVpcmUoXCJhc3luY1wiKSwgICAvLyBhc3luYyBtb2R1bGVcbiAgICAgICAgcmVxdWVzdCA9IHJlcXVpcmUoXCJyZXF1ZXN0XCIpLCAgIC8vIHJlcXVlc3QgbW9kdWxlXG4gICAgICBmcyA9IHJlcXVpcmUoXCJmc1wiKTsgICAgIC8vIGZzIG1vZHVsZVxuXG52YXIgICBlbWFpbCA9IFwicGFvbG8uei5yb3hhc0BnbWFpbC5jb21cIiwgICAgICAgIC8vIHlvdXIgYWNjb3VudCBlbWFpbFxuICAgICAgcGFzc3dvcmQgPSBcIjRkbmRrdzk3XCIsICAgICAvLyB5b3VyIGFjY291bnQgcGFzc3dvcmRcbiAgICAgIGludGVncmF0b3JLZXkgPSBcIjYzYTcyMGJmLTRjNzUtNGI0Mi04NTAyLTI4MDU5NGUyNTBkN1wiLCAgICAgIC8vIHlvdXIgSW50ZWdyYXRvciBLZXkgKGZvdW5kIG9uIHRoZSBQcmVmZXJlbmNlcyAtPiBBUEkgcGFnZSlcbiAgICByZWNpcGllbnROYW1lID0gXCJidWJiYVwiLCAgICAgIC8vIHJlY2lwaWVudCAoc2lnbmVyKSBuYW1lXG4gICAgICBkb2N1bWVudE5hbWUgPSBcImRvYy5wZGZcIiwgICAgIC8vIGNvcHkgZG9jdW1lbnQgd2l0aCB0aGlzIG5hbWUgaW50byBzYW1lIGRpcmVjdG9yeSFcbiAgICAgIGJhc2VVcmwgPSBcIlwiOyAgICAgICAgIC8vIHdlIHdpbGwgcmV0cmlldmUgdGhpcyB0aHJvdWdoIHRoZSBMb2dpbiBjYWxsXG5cbmFzeW5jLndhdGVyZmFsbChcbiAgW1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvLyBTdGVwIDE6IExvZ2luICh1c2VkIHRvIHJldHJpZXZlIHlvdXIgYWNjb3VudElkIGFuZCBiYXNlVXJsKVxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICBmdW5jdGlvbihuZXh0KSB7XG4gICAgdmFyIHVybCA9IFwiaHR0cHM6Ly9kZW1vLmRvY3VzaWduLm5ldC9yZXN0YXBpL3YyL2xvZ2luX2luZm9ybWF0aW9uXCI7XG4gICAgdmFyIGJvZHkgPSBcIlwiOyAgLy8gbm8gcmVxdWVzdCBib2R5IGZvciBsb2dpbiBhcGkgY2FsbFxuXG4gICAgLy8gc2V0IHJlcXVlc3QgdXJsLCBtZXRob2QsIGJvZHksIGFuZCBoZWFkZXJzXG4gICAgdmFyIG9wdGlvbnMgPSBpbml0aWFsaXplUmVxdWVzdCh1cmwsIFwiR0VUXCIsIGJvZHksIGVtYWlsLCBwYXNzd29yZCk7XG5cbiAgICAvLyBzZW5kIHRoZSByZXF1ZXN0Li4uXG4gICAgcmVxdWVzdChvcHRpb25zLCBmdW5jdGlvbihlcnIsIHJlcywgYm9keSkge1xuICAgICAgaWYoIXBhcnNlUmVzcG9uc2VCb2R5KGVyciwgcmVzLCBib2R5KSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBiYXNlVXJsID0gSlNPTi5wYXJzZShib2R5KS5sb2dpbkFjY291bnRzWzBdLmJhc2VVcmw7XG4gICAgICBuZXh0KG51bGwpOyAvLyBjYWxsIG5leHQgZnVuY3Rpb25cbiAgICB9KTtcbiAgfSxcblxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvLyBTdGVwIDI6IFJlcXVlc3QgU2lnbmF0dXJlIG9uIGEgUERGIERvY3VtZW50XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIGZ1bmN0aW9uKG5leHQpIHtcbiAgICAgIHZhciB1cmwgPSBiYXNlVXJsICsgXCIvZW52ZWxvcGVzXCI7XG4gICAgICAvLyBmb2xsb3dpbmcgcmVxdWVzdCBib2R5IHdpbGwgcGxhY2UgMSBzaWduYXR1cmUgdGFiIDEwMCBwaXhlbHMgdG8gdGhlIHJpZ2h0IGFuZFxuICAgICAgLy8gMTAwIHBpeGVscyBkb3duIGZyb20gdGhlIHRvcCBsZWZ0IG9mIHRoZSBkb2N1bWVudCB0aGF0IHlvdSBzZW5kIGluIHRoZSByZXF1ZXN0XG4gICAgdmFyIGJvZHkgPSB7XG4gICAgICBcInJlY2lwaWVudHNcIjoge1xuICAgICAgICBcInNpZ25lcnNcIjogW3tcbiAgICAgICAgICBcImVtYWlsXCI6IGVtYWlsLFxuICAgICAgICAgIFwibmFtZVwiOiByZWNpcGllbnROYW1lLFxuICAgICAgICAgIFwicmVjaXBpZW50SWRcIjogMSxcbiAgICAgICAgICBcInRhYnNcIjoge1xuICAgICAgICAgICAgXCJzaWduSGVyZVRhYnNcIjogW3tcbiAgICAgICAgICAgICAgXCJ4UG9zaXRpb25cIjogXCIxMDBcIixcbiAgICAgICAgICAgICAgXCJ5UG9zaXRpb25cIjogXCIxMDBcIixcbiAgICAgICAgICAgICAgXCJkb2N1bWVudElkXCI6IFwiMVwiLFxuICAgICAgICAgICAgICBcInBhZ2VOdW1iZXJcIjogXCIxXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgICAgfVxuICAgICAgICB9XVxuICAgICAgfSxcbiAgICAgIFwiZW1haWxTdWJqZWN0XCI6ICdEb2N1U2lnbiBBUEkgLSBTaWduYXR1cmUgUmVxdWVzdCBvbiBEb2N1bWVudCBDYWxsJyxcbiAgICAgIFwiZG9jdW1lbnRzXCI6IFt7XG4gICAgICAgIFwibmFtZVwiOiBkb2N1bWVudE5hbWUsXG4gICAgICAgIFwiZG9jdW1lbnRJZFwiOiAxLFxuICAgICAgfV0sXG4gICAgICBcInN0YXR1c1wiOiBcInNlbnRcIixcbiAgICB9O1xuXG4gICAgLy8gc2V0IHJlcXVlc3QgdXJsLCBtZXRob2QsIGJvZHksIGFuZCBoZWFkZXJzXG4gICAgdmFyIG9wdGlvbnMgPSBpbml0aWFsaXplUmVxdWVzdCh1cmwsIFwiUE9TVFwiLCBib2R5LCBlbWFpbCwgcGFzc3dvcmQpO1xuXG4gICAgLy8gY2hhbmdlIGRlZmF1bHQgQ29udGVudC1UeXBlIGhlYWRlciBmcm9tIFwiYXBwbGljYXRpb24vanNvblwiIHRvIFwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiXG4gICAgb3B0aW9ucy5oZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdID0gXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCI7XG5cbiAgICAvLyBjb25maWd1cmUgYSBtdWx0aXBhcnQgaHR0cCByZXF1ZXN0IHdpdGggSlNPTiBib2R5IGFuZCBkb2N1bWVudCBieXRlc1xuICAgIG9wdGlvbnMubXVsdGlwYXJ0ID0gW3tcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICBcIkNvbnRlbnQtRGlzcG9zaXRpb25cIjogXCJmb3JtLWRhdGFcIixcbiAgICAgICAgICBcImJvZHlcIjogSlNPTi5zdHJpbmdpZnkoYm9keSksXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL3BkZlwiLFxuICAgICAgICAgICdDb250ZW50LURpc3Bvc2l0aW9uJzogJ2ZpbGU7IGZpbGVuYW1lPVwiJyArIGRvY3VtZW50TmFtZSArICdcIjsgZG9jdW1lbnRJZD0xJyxcbiAgICAgICAgICBcImJvZHlcIjogZnMucmVhZEZpbGVTeW5jKGRvY3VtZW50TmFtZSksXG4gICAgICAgIH1cbiAgICBdO1xuXG4gICAgLy8gc2VuZCB0aGUgcmVxdWVzdC4uLlxuICAgIHJlcXVlc3Qob3B0aW9ucywgZnVuY3Rpb24oZXJyLCByZXMsIGJvZHkpIHtcbiAgICAgIHBhcnNlUmVzcG9uc2VCb2R5KGVyciwgcmVzLCBib2R5KTtcbiAgICB9KTtcbiAgfSAvLyBlbmQgZnVuY3Rpb25cbl0pO1xuXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAtLS0gSEVMUEVSIEZVTkNUSU9OUyAtLS1cbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbmZ1bmN0aW9uIGluaXRpYWxpemVSZXF1ZXN0KHVybCwgbWV0aG9kLCBib2R5LCBlbWFpbCwgcGFzc3dvcmQpIHtcbiAgdmFyIG9wdGlvbnMgPSB7XG4gICAgXCJtZXRob2RcIjogbWV0aG9kLFxuICAgIFwidXJpXCI6IHVybCxcbiAgICBcImJvZHlcIjogYm9keSxcbiAgICBcImhlYWRlcnNcIjoge31cbiAgfTtcbiAgYWRkUmVxdWVzdEhlYWRlcnMob3B0aW9ucywgZW1haWwsIHBhc3N3b3JkKTtcbiAgcmV0dXJuIG9wdGlvbnM7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5mdW5jdGlvbiBhZGRSZXF1ZXN0SGVhZGVycyhvcHRpb25zLCBlbWFpbCwgcGFzc3dvcmQpIHtcbiAgLy8gSlNPTiBmb3JtYXR0ZWQgYXV0aGVudGljYXRpb24gaGVhZGVyIChYTUwgZm9ybWF0IGFsbG93ZWQgYXMgd2VsbClcbiAgZHNBdXRoSGVhZGVyID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgIFwiVXNlcm5hbWVcIjogZW1haWwsXG4gICAgXCJQYXNzd29yZFwiOiBwYXNzd29yZCxcbiAgICBcIkludGVncmF0b3JLZXlcIjogaW50ZWdyYXRvcktleSAgLy8gZ2xvYmFsXG4gIH0pO1xuICAvLyBEb2N1U2lnbiBhdXRob3JpemF0aW9uIGhlYWRlclxuICBvcHRpb25zLmhlYWRlcnNbXCJYLURvY3VTaWduLUF1dGhlbnRpY2F0aW9uXCJdID0gZHNBdXRoSGVhZGVyO1xufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZnVuY3Rpb24gcGFyc2VSZXNwb25zZUJvZHkoZXJyLCByZXMsIGJvZHkpIHtcbiAgY29uc29sZS5sb2coXCJcXHJcXG5BUEkgQ2FsbCBSZXN1bHQ6IFxcclxcblwiLCBKU09OLnBhcnNlKGJvZHkpKTtcbiAgaWYoIHJlcy5zdGF0dXNDb2RlICE9IDIwMCAmJiByZXMuc3RhdHVzQ29kZSAhPSAyMDEpIHsgLy8gc3VjY2VzcyBzdGF0dXNlc1xuICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgY2FsbGluZyB3ZWJzZXJ2aWNlLCBzdGF0dXMgaXM6IFwiLCByZXMuc3RhdHVzQ29kZSk7XG4gICAgY29uc29sZS5sb2coXCJcXHJcXG5cIiwgZXJyKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59Il19