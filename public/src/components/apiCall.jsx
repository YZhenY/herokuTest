var     async = require("async"),   // async module
        request = require("request"),   // request module
      fs = require("fs");     // fs module

var   email = "docgenxtremellc@gmail.com",        // your account email
      password = "Docgen123",     // your account password
      integratorKey = "9297b13e-7cee-4f01-8c7b-bf3ad8bd6110",      // your Integrator Key (found on the Preferences -> API page)
    recipientName = "bubba",      // recipient (signer) name
      documentName = "prize_acceptance_terms.pdf",     // copy document with this name into same directory!
      baseUrl = "";         // we will retrieve this through the Login call

window.ApiCall = function() {
async.waterfall(
  [
    /////////////////////////////////////////////////////////////////////////////////////
    // Step 1: Login (used to retrieve your accountId and baseUrl)
    /////////////////////////////////////////////////////////////////////////////////////
    function(next) {
    var url = "https://demo.docusign.net/restapi/v2/login_information";
    var body = "";  // no request body for login api call
    
    // set request url, method, body, and headers
    var options = initializeRequest(url, "GET", body, email, password);
    
    // send the request...
    request(options, function(err, res, body) {
      if(!parseResponseBody(err, res, body)) {
        return;
      }
      baseUrl = JSON.parse(body).loginAccounts[0].baseUrl;
      next(null); // call next function
    });
  },
    
    /////////////////////////////////////////////////////////////////////////////////////
    // Step 2: Request Signature on a PDF Document
    /////////////////////////////////////////////////////////////////////////////////////
    function(next) {    
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
        }
        ],
      },
      "emailSubject": 'Release of Liability and Finalist/Winner Acceptance Form',
      "emailBlurb": "2018 Developer Week Hackathon #DeveloperWeek2018 Contest.",
      "documents": [{
        "name": documentName,
        "documentId": 1,
      }],
      "status": "sent",
    };
    
    // set request url, method, body, and headers
    var options = initializeRequest(url, "POST", body, email, password);
  
    // change default Content-Type header from "application/json" to "multipart/form-data"
    options.headers["Content-Type"] = "multipart/form-data";
    
    // configure a multipart http request with JSON body and document bytes
    options.multipart = [{
          "Content-Type": "application/json",
          "Content-Disposition": "form-data",
          "body": JSON.stringify(body),
        }, {
          "Content-Type": "application/pdf",
          'Content-Disposition': 'file; filename="' + documentName + '"; documentId=1',
          "body": fs.readFileSync(documentName),
        }
    ];

    // send the request...
    request(options, function(err, res, body) {
      parseResponseBody(err, res, body);
    });
  } // end function    
]);
}
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
    "IntegratorKey": integratorKey  // global
  });
  // DocuSign authorization header
  options.headers["X-DocuSign-Authentication"] = dsAuthHeader;
}

///////////////////////////////////////////////////////////////////////////////////////////////
function parseResponseBody(err, res, body) {
  console.log("\r\nAPI Call Result: \r\n", JSON.parse(body));
  if( res.statusCode != 200 && res.statusCode != 201) { // success statuses
    console.log("Error calling webservice, status is: ", res.statusCode);
    console.log("\r\n", err);
    return false;
  }
  return true;
}