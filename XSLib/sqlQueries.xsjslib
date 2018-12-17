// Util file to store all the sql queries related to tables

var conn = $.hdb.getConnection();
var library = $.import("DFT.XSLib", "util");

function insertDFTHeader(body) {

	var headerId = library.getNextVal("DFT", "HEADERID");

	try {
		var headerQuery =
			'INSERT INTO "DFT"."DFT.Tables::DFT_HEADER" VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

		conn.executeUpdate(
			headerQuery,
			headerId,
			body.poNumber,
			body.vendorAdminId,
			body.vendorId,
			body.vendorName,
			body.vendorAddress,
			body.aribaSesNo,
			body.serviceProviderMail,
			body.serviceProviderId,
			body.serviceProviderName,
			body.ReviewerId,
			body.ReviewerName,
			body.ReviewerEmail,
			body.sesApproverName,
			body.sesApproverEmail,
			body.department,
			body.location,
			body.startDate,
			body.startTime,
			body.endDate,
			body.endTime,
			body.accountingCategory,
			body.costCenter,
			body.sesNumber,
			body.workOrderNo,
			body.signatureVersion,
			body.wbsElement,
			body.deviceType,
			body.deviceId,
			body.status,
			body.createdBy,
			body.createdOn,
			body.updatedBy,
			body.updatedOn,
			body.vendorRefNumber,
			body.reviewedOn,
			body.reviewedBy,
			body.completedBy,
			body.completedOn,
			body.well,
			body.field,
			body.facility,
			body.wellPad,
			body.ownerId

		);

		conn.commit();
		return {
			"Status": $.response.status,
			"headerId": headerId
		};

	} catch (e) {
		return e.message;
	}
}

//post for DFT Comments
function insertDFTComments(body, headerId) {
	var i;
	try {
		var headerQuery =
			'INSERT INTO "DFT"."DFT.Tables::DFT_COMMENT" VALUES (?,?,?,?,?)';

		for (i = 0; i < body.length; i++) {
			conn.executeUpdate(
				headerQuery,
				library.getNextVal("DFT", "COMMENTID"),
				headerId,
				body[i].commentedByName,
				body[i].commentedOn,
				body[i].comment
			);
		}

		conn.commit();
		return $.response.status;
	} catch (e) {
		return e.message;
	}
}

// Post for DFT Change Logs

function insertChangeLog(body, headerId, wfInstanceId) {
	var i;
	try {
		var headerQuery =
			'INSERT INTO "DFT"."DFT.Tables::DFT_CHANGELOG" VALUES (?,?,?,?,?,?)';
		for (i = 0; i < body.length; i++) {
			conn.executeUpdate(
				headerQuery,
				library.getNextVal("DFT", "CHANGELOGID"),
				headerId,
				wfInstanceId,
				body[i].status,
				body[i].createdOn,
				body[i].createdByName
			);
		}
		conn.commit();
		return $.response.status;

	} catch (e) {
		return e.message;
	}
}

function insertAttachments(body, headerId) {
	var i;
	var headerQuery =
		'INSERT INTO "DFT"."DFT.Tables::DFT_ATTACHMENT" VALUES (?,?,?,?,?,?,?,?,?)';
	try {
		for (i = 0; i < body.length; i++) {
			conn.executeUpdate(
				headerQuery,
				library.getNextVal("DFT", "ATTACHMENTID"),
				headerId,
				body[i].attachmentName,
				body[i].dftAttachmentType,
				body[i].createdByName,
				body[i].createdOn,
				body[i].updatedByName,
				body[i].updatedOn,
				body[i].attachmentUrl
			);
		}
		conn.commit();
		return $.response.status;
	} catch (e) {
		return e.message;
	}
}

//post for DFT_Signature
function insertDFTSignature(body) {
	var version = 0;
	var reviewerId = "'" + body.reviewerId + "'";
	try {

		var conn1 = $.db.getConnection();
		var getQuery = 'SELECT * FROM "DFT"."DFT.Tables::DFT_SIGNATURE" WHERE "reviewerId" =' + reviewerId;
		var getStmt = conn1.prepareStatement(getQuery);
		var getResult = getStmt.executeQuery();

		var headerQuery =
			'INSERT INTO "DFT"."DFT.Tables::DFT_SIGNATURE" VALUES (?,?,?,?)';

		while (getResult.next()) {
			version = getResult.getInteger(2);
		}

		if (version === 0) {
			version = 1;
		} else {
			version = version + 1;
		}

		conn.executeUpdate(
			headerQuery,
			body.reviewerId,
			version,
			body.digitalSignatureUrl,
			body.mimeType
		);

		conn.commit();
		conn1.close();
		return version;

	} catch (e) {
		return e.message;
	}
}

//Update of DFT_HEADER
function updateDFTHeader(body) {

	var conn = $.db.getConnection();

	try {
		var updateQuery =
			'UPDATE "DFT"."DFT.Tables::DFT_HEADER" SET "vendorAdminId" = \'' + body.vendorAdminId + '\'' + ' ,"poNumber" =\'' + body.poNumber +
			'\'' + ' ,"vendorId" =\'' + body.vendorId + '\'' + ' ,"vendorName" = \'' + body.vendorName + '\'' + ' ,"vendorAddress" = \'' + body.vendorAddress +
			'\'' + ' ,"aribaSesNo" = \'' + body.aribaSesNo + '\'' + ' ,"serviceProviderMail" = \'' + body.serviceProviderMail + '\'' +
			' ,"serviceProviderId" = \'' + body.serviceProviderId + '\'' + ' ,"serviceProviderName" = \'' + body.serviceProviderName + '\'' +
			' ,"ReviewerId" = \'' + body.ReviewerId + '\'' + ' ,"ReviewerName" = \'' + body.ReviewerName + '\'' + ' ,"ReviewerEmail" = \'' + body.ReviewerEmail +
			'\'' + ' ,"sesApproverName" = \'' + body.sesApproverName + '\'' + ' ,"sesApproverEmail" = \'' + body.sesApproverEmail + '\'' +
			' ,"department" =\'' + body.department + '\'' + ' ,"location" = \'' + body.location + '\'' + ' ,"startDate" = \'' + body.startDate +
			'\'' + ' ,"startTime" =\'' + body.startTime + '\'' + ' ,"endDate" = \'' + body.endDate + '\'' + ' ,"endTime" = \'' + body.endTime + '\'' +
			' ,"accountingCategory" = \'' + body.accountingCategory + '\'' + ' ,"costCenter" = \'' + body.costCenter + '\'' + ' ,"sesNumber" = \'' +
			body.sesNumber + '\'' + ' ,"workOrderNo" =\'' + body.workOrderNo + '\'' + ' ,"signatureVersion" = \'' + body.signatureVersion + '\'' +
			' ,"wbsElement" = \'' + body.wbsElement + '\'' + '  ,"deviceType" = \'' + body.deviceType + '\'' + '  ,"deviceId" = \'' + body.deviceId +
			'\'' + '  ,"status" = \'' + body.status + '\'' + '  ,"createdBy" = \'' + body.createdBy + '\'' + '  ,"createdOn" = \'' + body.createdOn +
			'\'' + '  ,"updatedBy" = \'' + body.updatedBy + '\'' + '  ,"updatedOn" = \'' + body.updatedOn + '\'' + '  ,"vendorRefNumber" = \'' +
			body.vendorRefNumber + '\'' + '  ,"reviewedOn" = \'' + body.reviewedOn + '\'' + '  ,"reviewedBy" = \'' + body.reviewedBy + '\'' +
			'  ,"completedBy" = \'' + body.completedBy + '\'' + '  ,"completedOn" = \'' + body.completedOn + '\'' + '  ,"well" = \'' + body.well +
			'\'' + '  ,"field" = \'' + body.field + '\'' + '  ,"facility" = \'' + body.facility + '\'' + '  ,"wellPad" = \'' + body.wellPad + '\'' +
			'  ,"ownerId" = \'' + body.ownerId + '\'' + ' WHERE "dftNumber" = ' + body.dftNumber;

		var updateStmt = conn.prepareStatement(updateQuery);
		var updateResult = updateStmt.executeUpdate();

		conn.commit();

// 		return updateResult;
		return {
			"Status": $.response.status,
			"headerId": body.dftNumber
		};
	} catch (e) {
		return e.message;
	}
}

//Update of DFT_Attachments
function updateAttachments(body, headerId) {
	var i;
	var conn = $.db.getConnection();
	try {

		for (i = 0; i < body.length; i++) {

			var headerQuery =
				'UPDATE "DFT"."DFT.Tables::DFT_ATTACHMENT" SET "attachmentName" = \'' + body[i].attachmentName + '\'' +
				' ,"dftAttachmentType" =\'' + body[i].dftAttachmentType + '\'' + ' ,"createdByName" =\'' + body[i].createdByName + '\'' +
				' ,"createdOn" = \'' + body[i].createdOn + '\'' + ' ,"updatedByName" = \'' + body[i].updatedByName + '\'' + ' ,"updatedOn" = \'' + body[
					i].updatedOn + '\'' + ' ,"attachmentUrl" = \'' + body[i].attachmentUrl + '\'' + ' WHERE "attachmentId" = ' + body[i].attachmentId +
				' and "dftNumber" = ' + body[i].dftNumber;

			var updateStmt = conn.prepareStatement(headerQuery);
			var updateResult = updateStmt.executeUpdate();

		}
		conn.commit();
	} catch (e) {
		return e.message;
	}
}