// Util file to store frequently used functions

// Open the connection to the database
var conn = $.db.getConnection();

// Function to get the next value for a given sequence
function getNextVal(schemaName, sequenceName){
	var result;
	
	try{
	var seqQuery = 'SELECT  ' + schemaName + '.' + sequenceName + '.NEXTVAL FROM DUMMY';
	var seqStmt = conn.prepareStatement(seqQuery);
	var seqResult = seqStmt.executeQuery();
	
	while(seqResult.next()){
	    result = seqResult.getString(1);
	}
	
	}
	catch(e){
	    return e.message;
	}
	
	return result;
}

function getTimeStamp(){
    var query = 'SELECT CURRENT_TIMESTAMP FROM DUMMY';
    var stmt = conn.prepareStatement(query);
    var result = stmt.executeQuery();
    
    var timestamp;
    while(result.next()){
        timestamp = result.getString(1);
    }
    
    return timestamp;
}