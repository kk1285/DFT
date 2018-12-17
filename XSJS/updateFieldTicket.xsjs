// Service to create new Digital Field Tickets //

// Import the UTIL libraries

var library = $.import ("DFT.XSLib","util");
var queries = $.import("DFT.XSLib", "sqlQueries");
var response; // Service Response variable
var body = $.request.body.asString(); // Read the request payload
var input = JSON.parse(body); // Parse the request payload to JSON format
try{
   var headerResult = queries.updateDFTHeader(input.header); 
   var commentStatus = queries.insertDFTComments(input.comments,headerResult.headerId );
   var changeLogStatus = queries.insertChangeLog(input.changeLog, headerResult.headerId, '');
   var attachmentStatus = queries.updateAttachments(input.attachments, input.header.headerId);

}
catch(e){
    $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
    $.response.contentType = 'application/json';
    $.response.setBody(JSON.stringify(e.message));
}
$.response.setBody(JSON.stringify(changeLogStatus));
$.response.contentType = 'application/json';
$.response.status = $.net.http.CREATED;