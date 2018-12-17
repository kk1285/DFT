var library = $.import ("DFT.XSLib","Util");
var queries = $.import("DFT.XSLib", "sqlQueries");
var response; // Service Response variable
var body = $.request.body.asString(); // Read the request payload
var input = JSON.parse(body); // Parse the request payload to JSON format
try{
     var signatureStatus = queries.insertDFTSignature(input);

}
catch(e){
    $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
    $.response.contentType = 'application/json';
    $.response.setBody(JSON.stringify(e.message));
}
$.response.setBody(JSON.stringify(signatureStatus));
$.response.contentType = 'application/json';
$.response.status = $.net.http.OK;