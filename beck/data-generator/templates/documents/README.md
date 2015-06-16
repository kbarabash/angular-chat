### CPM-16107 Documents Tab
Track work for implementing MTU's documents page.

REST API
Image Ref	Method	URI	Input	Response	Response Code	Content-Type
1	GET	/entities/<entity_id>/documents	N/A	Grid	200	application/json
2	POST	/entities/<entity_id>/documents	document=MultiPartFile,documentType = documentType	N/A	201	N/A
3	GET	/entities/<entity_id>/documents/<document_id>	N/A	file	200	application/fileType
4	GET	/options/tax-form-types	N/A	N/A	200	application/json
5	GET	/options/self-cert-types	N/A	N/A	200	application/json


Example Response: GET Entity Documents
{
    "rows": [
        {
            "DOCCATEGORYORDER": "1",
            "DOCCATEGORY": "Cleint Agency Agreement",
            "DOCUMENTID": "337618654477707",
            "DOCUMENTTYPE": "Cleint Agency Agreement",
            "DOCUMENTTYPEID": "1",
            "UPLOADEDBY": "Rohit Kumar",
            "UPLOADEDDATE": "06/08/2015"
           
        },
        {
            "DOCCATEGORYORDER": "2",
            "DOCCATEGORY": "Validation Source",
            "DOCUMENTID": null,
            "DOCUMENTTYPE": "Tax Form",
            "DOCUMENTTYPEID": "3",
            "UPLOADEDBY": null,
            "UPLOADEDDATE": null
           
        }
		....
    ],
    "paginatedRowCount": 2,
    "totalRowCount": 2
}


Example Response: GET Tax Form Types
{
"rows": [
        {
            "RNUM": "1",
            "ID": "1",
            "NAME": "W-8BEN"
        },
        {
            "RNUM": "2",
            "ID": "2",
            "NAME": "W-8BEN-E"
        }		 
		],
    "paginatedRowCount": 8,
    "totalRowCount": 8
}


Example Response: GET Self Cert Types
{
"rows": [
        {
            "RNUM": "1",
            "ID": "1",
            "NAME": "United Kingdom"
        },
        {
            "RNUM": "2",
            "ID": "2",
            "NAME": "United States"
        }		 
		],
    "paginatedRowCount": 2,
    "totalRowCount": 2
}
###CPM-16158 MTU Task Grid - Document Upload Popups
Add Tax Form for implementing MTU's tasks grid.
Image Ref	Method	URI	Input	Response	Response Code
1	GET	/options/tax-form-types	N/A	List<String>	200
2, 5	POST	/entity/<entityId>/documents	File	N/A	200
3, 6	POST	/taxdocuments	Long entity_id, Long tax_doc_category, Long ws_doc_type, Long document_id	Entity	200
4	GET	/options/evidentiary-docs	N/A	List<String>	200
Additional Notes
Need popup for Self Certification Documents and Client Account Agency Agreement. Will be the same as the Tax Forms / Evidentiary Documents, but won't have multiple types