"use strict";

var async = require("async"),
    // async module
request = require("request"),
    // request module
fs = require("fs"); // fs module

var email = "docgenxtremellc@gmail.com",
    // your account email
password = "Docgen123",
    // your account password
integratorKey = "9297b13e-7cee-4f01-8c7b-bf3ad8bd6110",
    // your Integrator Key (found on the Preferences -> API page)
recipientName = "bubba",
    // recipient (signer) name
documentName = "prize_acceptance_terms.pdf",
    // copy document with this name into same directory!
baseUrl = ""; // we will retrieve this through the Login call

window.ApiCall = function () {
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
          "email": "guinzar@gmail.com",
          "name": recipientName,
          "recipientId": 1,
          "tabs": {
            // "fullNameTabs": [{
            //   "xPosition": "300",
            //   "yPosition": "100",
            //   "documentId": "1",
            //   "pageNumber": "1"                                         
            // }],
            "signHereTabs": [{
              "xPosition": "100",
              "yPosition": "100",
              "documentId": "1",
              "pageNumber": "1"
            }]
          }
        }]
      },
      "emailSubject": 'Release of Liability and Finalist/Winner Acceptance Form',
      "emailBlurb": "2018 Developer Week Hackathon #DeveloperWeek2018 Contest.",
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
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2FwaUNhbGwuanN4Il0sIm5hbWVzIjpbImFzeW5jIiwicmVxdWlyZSIsInJlcXVlc3QiLCJmcyIsImVtYWlsIiwicGFzc3dvcmQiLCJpbnRlZ3JhdG9yS2V5IiwicmVjaXBpZW50TmFtZSIsImRvY3VtZW50TmFtZSIsImJhc2VVcmwiLCJ3aW5kb3ciLCJBcGlDYWxsIiwid2F0ZXJmYWxsIiwibmV4dCIsInVybCIsImJvZHkiLCJvcHRpb25zIiwiaW5pdGlhbGl6ZVJlcXVlc3QiLCJlcnIiLCJyZXMiLCJwYXJzZVJlc3BvbnNlQm9keSIsIkpTT04iLCJwYXJzZSIsImxvZ2luQWNjb3VudHMiLCJoZWFkZXJzIiwibXVsdGlwYXJ0Iiwic3RyaW5naWZ5IiwicmVhZEZpbGVTeW5jIiwibWV0aG9kIiwiYWRkUmVxdWVzdEhlYWRlcnMiLCJkc0F1dGhIZWFkZXIiLCJjb25zb2xlIiwibG9nIiwic3RhdHVzQ29kZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFRQSxRQUFRQyxRQUFRLE9BQVIsQ0FBaEI7QUFBQSxJQUFvQztBQUM1QkMsVUFBVUQsUUFBUSxTQUFSLENBRGxCO0FBQUEsSUFDd0M7QUFDbENFLEtBQUtGLFFBQVEsSUFBUixDQUZYLEMsQ0FFOEI7O0FBRTlCLElBQU1HLFFBQVEsMkJBQWQ7QUFBQSxJQUFrRDtBQUM1Q0MsV0FBVyxXQURqQjtBQUFBLElBQ2tDO0FBQzVCQyxnQkFBZ0Isc0NBRnRCO0FBQUEsSUFFbUU7QUFDL0RDLGdCQUFnQixPQUhwQjtBQUFBLElBR2tDO0FBQzVCQyxlQUFlLDRCQUpyQjtBQUFBLElBSXVEO0FBQ2pEQyxVQUFVLEVBTGhCLEMsQ0FLNEI7O0FBRTVCQyxPQUFPQyxPQUFQLEdBQWlCLFlBQVc7QUFDNUJYLFFBQU1ZLFNBQU4sQ0FDRTtBQUNFO0FBQ0E7QUFDQTtBQUNBLFlBQVNDLElBQVQsRUFBZTtBQUNmLFFBQUlDLE1BQU0sd0RBQVY7QUFDQSxRQUFJQyxPQUFPLEVBQVgs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Q0FVLFVBQVFRLE9BQVIsQ0FBZ0IsMkJBQWhCLElBQStDTSxZQUEvQztBQUNEOztBQUVEO0FBQ0EsU0FBU1YsaUJBQVQsQ0FBMkJGLEdBQTNCLEVBQWdDQyxHQUFoQyxFQUFxQ0osSUFBckMsRUFBMkM7QUFDekNnQixVQUFRQyxHQUFSLENBQVksMkJBQVosRUFBeUNYLEtBQUtDLEtBQUwsQ0FBV1AsSUFBWCxDQUF6QztBQUNBLE1BQUlJLElBQUljLFVBQUosSUFBa0IsR0FBbEIsSUFBeUJkLElBQUljLFVBQUosSUFBa0IsR0FBL0MsRUFBb0Q7QUFBRTtBQUNwREYsWUFBUUMsR0FBUixDQUFZLHVDQUFaLEVBQXFEYixJQUFJYyxVQUF6RDtBQUNBRixZQUFRQyxHQUFSLENBQVksTUFBWixFQUFvQmQsR0FBcEI7QUFDQSxXQUFPLEtBQVA7QUFDRDtBQUNELFNBQU8sSUFBUDtBQUNEIiwiZmlsZSI6ImFwaUNhbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgICAgIGFzeW5jID0gcmVxdWlyZShcImFzeW5jXCIpLCAgIC8vIGFzeW5jIG1vZHVsZVxuICAgICAgICByZXF1ZXN0ID0gcmVxdWlyZShcInJlcXVlc3RcIiksICAgLy8gcmVxdWVzdCBtb2R1bGVcbiAgICAgIGZzID0gcmVxdWlyZShcImZzXCIpOyAgICAgLy8gZnMgbW9kdWxlXG5cbnZhciAgIGVtYWlsID0gXCJkb2NnZW54dHJlbWVsbGNAZ21haWwuY29tXCIsICAgICAgICAvLyB5b3VyIGFjY291bnQgZW1haWxcbiAgICAgIHBhc3N3b3JkID0gXCJEb2NnZW4xMjNcIiwgICAgIC8vIHlvdXIgYWNjb3VudCBwYXNzd29yZFxuICAgICAgaW50ZWdyYXRvcktleSA9IFwiOTI5N2IxM2UtN2NlZS00ZjAxLThjN2ItYmYzYWQ4YmQ2MTEwXCIsICAgICAgLy8geW91ciBJbnRlZ3JhdG9yIEtleSAoZm91bmQgb24gdGhlIFByZWZlcmVuY2VzIC0+IEFQSSBwYWdlKVxuICAgIHJlY2lwaWVudE5hbWUgPSBcImJ1YmJhXCIsICAgICAgLy8gcmVjaXBpZW50IChzaWduZXIpIG5hbWVcbiAgICAgIGRvY3VtZW50TmFtZSA9IFwicHJpemVfYWNjZXB0YW5jZV90ZXJtcy5wZGZcIiwgICAgIC8vIGNvcHkgZG9jdW1lbnQgd2l0aCB0aGlzIG5hbWUgaW50byBzYW1lIGRpcmVjdG9yeSFcbiAgICAgIGJhc2VVcmwgPSBcIlwiOyAgICAgICAgIC8vIHdlIHdpbGwgcmV0cmlldmUgdGhpcyB0aHJvdWdoIHRoZSBMb2dpbiBjYWxsXG5cbndpbmRvdy5BcGlDYWxsID0gZnVuY3Rpb24oKSB7XG5hc3luYy53YXRlcmZhbGwoXG4gIFtcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLy8gU3RlcCAxOiBMb2dpbiAodXNlZCB0byByZXRyaWV2ZSB5b3VyIGFjY291bnRJZCBhbmQgYmFzZVVybClcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgZnVuY3Rpb24obmV4dCkge1xuICAgIHZhciB1cmwgPSBcImh0dHBzOi8vZGVtby5kb2N1c2lnbi5uZXQvcmVzdGFwaS92Mi9sb2dpbl9pbmZvcm1hdGlvblwiO1xuICAgIHZhciBib2R5ID0gXCJcIjsgIC8vIG5vIHJlcXVlc3QgYm9keSBmb3IgbG9naW4gYXBpIGNhbGxcbiAgICBcbiAgICAvLyBzZXQgcmVxdWVzdCB1cmwsIG1ldGhvZCwgYm9keSwgYW5kIGhlYWRlcnNcbiAgICB2YXIgb3B0aW9ucyA9IGluaXRpYWxpemVSZXF1ZXN0KHVybCwgXCJHRVRcIiwgYm9keSwgZW1haWwsIHBhc3N3b3JkKTtcbiAgICBcbiAgICAvLyBzZW5kIHRoZSByZXF1ZXN0Li4uXG4gICAgcmVxdWVzdChvcHRpb25zLCBmdW5jdGlvbihlcnIsIHJlcywgYm9keSkge1xuICAgICAgaWYoIXBhcnNlUmVzcG9uc2VCb2R5KGVyciwgcmVzLCBib2R5KSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBiYXNlVXJsID0gSlNPTi5wYXJzZShib2R5KS5sb2dpbkFjY291bnRzWzBdLmJhc2VVcmw7XG4gICAgICBuZXh0KG51bGwpOyAvLyBjYWxsIG5leHQgZnVuY3Rpb25cbiAgICB9KTtcbiAgfSxcbiAgICBcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLy8gU3RlcCAyOiBSZXF1ZXN0IFNpZ25hdHVyZSBvbiBhIFBERiBEb2N1bWVudFxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICBmdW5jdGlvbihuZXh0KSB7ICAgIFxuICAgICAgdmFyIHVybCA9IGJhc2VVcmwgKyBcIi9lbnZlbG9wZXNcIjtcbiAgICAgIC8vIGZvbGxvd2luZyByZXF1ZXN0IGJvZHkgd2lsbCBwbGFjZSAxIHNpZ25hdHVyZSB0YWIgMTAwIHBpeGVscyB0byB0aGUgcmlnaHQgYW5kXG4gICAgICAvLyAxMDAgcGl4ZWxzIGRvd24gZnJvbSB0aGUgdG9wIGxlZnQgb2YgdGhlIGRvY3VtZW50IHRoYXQgeW91IHNlbmQgaW4gdGhlIHJlcXVlc3RcbiAgICB2YXIgYm9keSA9IHtcbiAgICAgIFwicmVjaXBpZW50c1wiOiB7XG4gICAgICAgIFwic2lnbmVyc1wiOiBbe1xuICAgICAgICAgIFwiZW1haWxcIjogXCJndWluemFyQGdtYWlsLmNvbVwiLFxuICAgICAgICAgIFwibmFtZVwiOiByZWNpcGllbnROYW1lLFxuICAgICAgICAgIFwicmVjaXBpZW50SWRcIjogMSxcbiAgICAgICAgICBcInRhYnNcIjoge1xuICAgICAgICAgICAgLy8gXCJmdWxsTmFtZVRhYnNcIjogW3tcbiAgICAgICAgICAgIC8vICAgXCJ4UG9zaXRpb25cIjogXCIzMDBcIixcbiAgICAgICAgICAgIC8vICAgXCJ5UG9zaXRpb25cIjogXCIxMDBcIixcbiAgICAgICAgICAgIC8vICAgXCJkb2N1bWVudElkXCI6IFwiMVwiLFxuICAgICAgICAgICAgLy8gICBcInBhZ2VOdW1iZXJcIjogXCIxXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gfV0sXG4gICAgICAgICAgICBcInNpZ25IZXJlVGFic1wiOiBbe1xuICAgICAgICAgICAgICBcInhQb3NpdGlvblwiOiBcIjEwMFwiLFxuICAgICAgICAgICAgICBcInlQb3NpdGlvblwiOiBcIjEwMFwiLFxuICAgICAgICAgICAgICBcImRvY3VtZW50SWRcIjogXCIxXCIsXG4gICAgICAgICAgICAgIFwicGFnZU51bWJlclwiOiBcIjFcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIFwiZW1haWxTdWJqZWN0XCI6ICdSZWxlYXNlIG9mIExpYWJpbGl0eSBhbmQgRmluYWxpc3QvV2lubmVyIEFjY2VwdGFuY2UgRm9ybScsXG4gICAgICBcImVtYWlsQmx1cmJcIjogXCIyMDE4IERldmVsb3BlciBXZWVrIEhhY2thdGhvbiAjRGV2ZWxvcGVyV2VlazIwMTggQ29udGVzdC5cIixcbiAgICAgIFwiZG9jdW1lbnRzXCI6IFt7XG4gICAgICAgIFwibmFtZVwiOiBkb2N1bWVudE5hbWUsXG4gICAgICAgIFwiZG9jdW1lbnRJZFwiOiAxLFxuICAgICAgfV0sXG4gICAgICBcInN0YXR1c1wiOiBcInNlbnRcIixcbiAgICB9O1xuICAgIFxuICAgIC8vIHNldCByZXF1ZXN0IHVybCwgbWV0aG9kLCBib2R5LCBhbmQgaGVhZGVyc1xuICAgIHZhciBvcHRpb25zID0gaW5pdGlhbGl6ZVJlcXVlc3QodXJsLCBcIlBPU1RcIiwgYm9keSwgZW1haWwsIHBhc3N3b3JkKTtcbiAgXG4gICAgLy8gY2hhbmdlIGRlZmF1bHQgQ29udGVudC1UeXBlIGhlYWRlciBmcm9tIFwiYXBwbGljYXRpb24vanNvblwiIHRvIFwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiXG4gICAgb3B0aW9ucy5oZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdID0gXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCI7XG4gICAgXG4gICAgLy8gY29uZmlndXJlIGEgbXVsdGlwYXJ0IGh0dHAgcmVxdWVzdCB3aXRoIEpTT04gYm9keSBhbmQgZG9jdW1lbnQgYnl0ZXNcbiAgICBvcHRpb25zLm11bHRpcGFydCA9IFt7XG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgXCJDb250ZW50LURpc3Bvc2l0aW9uXCI6IFwiZm9ybS1kYXRhXCIsXG4gICAgICAgICAgXCJib2R5XCI6IEpTT04uc3RyaW5naWZ5KGJvZHkpLFxuICAgICAgICB9LCB7XG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9wZGZcIixcbiAgICAgICAgICAnQ29udGVudC1EaXNwb3NpdGlvbic6ICdmaWxlOyBmaWxlbmFtZT1cIicgKyBkb2N1bWVudE5hbWUgKyAnXCI7IGRvY3VtZW50SWQ9MScsXG4gICAgICAgICAgXCJib2R5XCI6IGZzLnJlYWRGaWxlU3luYyhkb2N1bWVudE5hbWUpLFxuICAgICAgICB9XG4gICAgXTtcblxuICAgIC8vIHNlbmQgdGhlIHJlcXVlc3QuLi5cbiAgICByZXF1ZXN0KG9wdGlvbnMsIGZ1bmN0aW9uKGVyciwgcmVzLCBib2R5KSB7XG4gICAgICBwYXJzZVJlc3BvbnNlQm9keShlcnIsIHJlcywgYm9keSk7XG4gICAgfSk7XG4gIH0gLy8gZW5kIGZ1bmN0aW9uICAgIFxuXSk7XG59XG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAtLS0gSEVMUEVSIEZVTkNUSU9OUyAtLS1cbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbmZ1bmN0aW9uIGluaXRpYWxpemVSZXF1ZXN0KHVybCwgbWV0aG9kLCBib2R5LCBlbWFpbCwgcGFzc3dvcmQpIHsgIFxuICB2YXIgb3B0aW9ucyA9IHtcbiAgICBcIm1ldGhvZFwiOiBtZXRob2QsXG4gICAgXCJ1cmlcIjogdXJsLFxuICAgIFwiYm9keVwiOiBib2R5LFxuICAgIFwiaGVhZGVyc1wiOiB7fVxuICB9O1xuICBhZGRSZXF1ZXN0SGVhZGVycyhvcHRpb25zLCBlbWFpbCwgcGFzc3dvcmQpO1xuICByZXR1cm4gb3B0aW9ucztcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmZ1bmN0aW9uIGFkZFJlcXVlc3RIZWFkZXJzKG9wdGlvbnMsIGVtYWlsLCBwYXNzd29yZCkgeyAgXG4gIC8vIEpTT04gZm9ybWF0dGVkIGF1dGhlbnRpY2F0aW9uIGhlYWRlciAoWE1MIGZvcm1hdCBhbGxvd2VkIGFzIHdlbGwpXG4gIGRzQXV0aEhlYWRlciA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICBcIlVzZXJuYW1lXCI6IGVtYWlsLFxuICAgIFwiUGFzc3dvcmRcIjogcGFzc3dvcmQsIFxuICAgIFwiSW50ZWdyYXRvcktleVwiOiBpbnRlZ3JhdG9yS2V5ICAvLyBnbG9iYWxcbiAgfSk7XG4gIC8vIERvY3VTaWduIGF1dGhvcml6YXRpb24gaGVhZGVyXG4gIG9wdGlvbnMuaGVhZGVyc1tcIlgtRG9jdVNpZ24tQXV0aGVudGljYXRpb25cIl0gPSBkc0F1dGhIZWFkZXI7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5mdW5jdGlvbiBwYXJzZVJlc3BvbnNlQm9keShlcnIsIHJlcywgYm9keSkge1xuICBjb25zb2xlLmxvZyhcIlxcclxcbkFQSSBDYWxsIFJlc3VsdDogXFxyXFxuXCIsIEpTT04ucGFyc2UoYm9keSkpO1xuICBpZiggcmVzLnN0YXR1c0NvZGUgIT0gMjAwICYmIHJlcy5zdGF0dXNDb2RlICE9IDIwMSkgeyAvLyBzdWNjZXNzIHN0YXR1c2VzXG4gICAgY29uc29sZS5sb2coXCJFcnJvciBjYWxsaW5nIHdlYnNlcnZpY2UsIHN0YXR1cyBpczogXCIsIHJlcy5zdGF0dXNDb2RlKTtcbiAgICBjb25zb2xlLmxvZyhcIlxcclxcblwiLCBlcnIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn0iXX0=