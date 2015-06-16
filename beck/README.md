# This is  mega super star server

### First start
```bash
#insall all dependencies
npm install
```

### Commands

```bash
npm start #run node server
npm run generate-data #generate data for server
```


### API

####CPM-16101 Track work for implementing MTU's client dashboard tasks chart.
REST API

Image Ref	Method	URI	Input	Response	Response Code
1	GET	/charts/tasks	N/A	Grid	200
Example Response: GET Task Stats


{
    "rows": [
        {
            "STATE": "Add Client Account Agency Agreement",
            "COUNT": "10"
        }
    ],
    "paginatedRowCount": 1,
    "totalRowCount": 1
}

####CPM-16171 Tax Readiness Chart

Track work for implementing MTU's dashboard chart for tax readiness status.
REST API
Image Ref	Method	URI	Input	Response	Response Code
1	GET	/charts/tax-readiness	N/A	Grid	200
Example Response: GET Tax Readiness Status Stats

{
    "rows": [
        {
            "STATE": "Tax Prep Complete",
            "COUNT": "1"
        },
        {
            "STATE": "Action Required",
            "COUNT": "2"
        }
    ],
    "paginatedRowCount": 2,
    "totalRowCount": 2
}

####CPM-16102 Entities Screener

Track work for implementing MTU's client entities grid.
REST API
Image Ref	Method	URI	Input	Response	Response Code
1	GET	/screeners/entities?pageSize=25&fromRow=1&entityName="Entity 1"	int pageSize; int fromRow; String entityName (or any other filters)	Grid	200
Eligible Filters:
entityName
mei
lei
entityType
taxReadiness
Example Response: GET for grid
{  
      "rows":[  
         {  
            "entityId":65000000506666,
            "trueLegalName":"Entity 1",
            "lei":"34234235345446545758",
            "mei":"Entity 1",
            "entityType":"Estate",
           "taxReadinessStatus":"",
         },
         {  
            "entityId":65000000506666,
            "trueLegalName":"Entity 1",
            "lei":"34234235345446545758",
            "mei":"Entity 1"
         }
      ],
    "paginatedRowCount": 2,
    "totalRowCount": 2
}

#### CPM-16105 Tasks Screener
Track work for implementing MTU's tasks grid.
REST API
Image Ref	Method	URI	Input	Response	Response Code
1	GET	/screeners/tasks?pageSize=25&fromRow=1&entityName="Entity 1"	int pageSize; int fromRow; String entityName (or any other filters)	Grid	200
Eligible Filters:
entityName
mei
lei
Example Response: GET for grid
{  
      "rows":[  
         {  
            "taskType":"Add Client Account Agency Agreement ",
            "entityId":65000000506666,
            "trueLegalName":"Entity 1",
            "mei":"129875312387",
            "lei":"129875312387"
         },
         {  
            "taskType":"Add Client Account Agency Agreement ",
            "entityId":65000000506696,
            "trueLegalName":"Entity 1",
            "mei":"129875312387",
            "lei":"129875312387"
         }
         ....
      ],
    "paginatedRowCount": 2,
    "totalRowCount": 2
}

### CPM-16166 Tasks Screener Filters
Track work for implementing MTU's dashboard tasks grid filters.
REST API

Image Ref	Method	URI	Input	Response	Response Code
1	GET	/screeners/tasks/filters/entity-name?filterValue=value&fromRow=1&pageSize=25	String filterValue, int fromRow, int pageSize	Grid	200
2	GET	/screeners/tasks/filters/mei?filterValue=value&fromRow=1&pageSize=25	String filterValue, int fromRow, int pageSize	Grid	200
3	GET	/screeners/tasks/filters/lei?filterValue=value&fromRow=1&pageSize=25	String filterValue, int fromRow, int pageSize	Grid	200


Example Response: GET for filters
   {  
      "rows":[  
         {  
            "id":65000000506666,
            "value":"Entity 1"
         },
         {  
            "id":65000000506342,
            "value":"Entity 2"
         },
         {  
            "id":65000000496771,
            "value":"Entity 3"
         },
         {  
            "id":65000000496078,
            "value":"Entity 4"
         }
      ],
    "paginatedRowCount": 4,
    "totalRowCount": 4
}

### CPM-16165 Entities Screener Filters
Track work for implementing MTU entities grid filters.
REST API

Image Ref	Method	URI	Input	Response	Response Code
1	GET	/screeners/entities/filters/entity-name?filterValue=value&fromRow=1&pageSize=25	String filterValue, int fromRow, int pageSize	Grid	200
2	GET	/screeners/entities/filters/mei?filterValue=value&fromRow=1&pageSize=25	String filterValue, int fromRow, int pageSize	Grid	200
3	GET	/screeners/entities/filters/lei?filterValue=value&fromRow=1&pageSize=25	String filterValue, int fromRow, int pageSize	Grid	200
4	GET	/screeners/entities/filters/entity-type	N/A	Grid	200
5	GET	/screeners/entities/filters/tax-readiness	N/A	Grid	200


Example Response: GET for filters
{  
      "rows":[  
         {  
            "id":65000000506666,
            "value":"Entity 1"
         },
         {  
            "id":65000000506342,
            "value":"Entity 2"
         },
         {  
            "id":65000000496771,
            "value":"Entity 3"
         },
         {  
            "id":65000000496078,
            "value":"Entity 4"
         }
      ],
    "paginatedRowCount": 4,
    "totalRowCount": 4
}

###CPM-16168 Tasks Screener Download 

Image Ref	Method	URI	Input	Response	Response Code
1	GET	/tasks/export?entityName="Entity 101"	String entityName (or any other filters)	File	200

###CPM-16167 Entities Screener Download
Track work for implementing MTU's entities grid download.
REST API
Image Ref	Method	URI	Input	Response	Response Code
1	GET	/entities/export?entityName="Entity 101"	String entityName (or any other filter)	File	200


###CPM-16028 Books and Records Tab
Track work for implementing Books and Records.
REST API


Image Ref	Method	URI	Input	Response	Response Code	Content-Type
1	GET	/entities/<entityId>/books-and-records	N/A	BooksAndRecords	200	application/json
2	GET	/options/tin-types	N/A	Grid	200	application/json
3, 4, 5	GET	/options/countries	N/A	Grid	200	application/json
6	POST	/entities/<entityId>/books-and-records	N/A	BooksAndRecords	201	N/A
6	PUT	/entities/<entityId>/books-and-records	N/A	BooksAndRecords	200	N/A


Books and Records Attributes:
Task.booksAndRecord.entityCategorisation.classification
Task.booksAndRecord.permanentAddress.address1
Task.booksAndRecord.permanentAddress.address2
Task.booksAndRecord.permanentAddress.city
Task.booksAndRecord.permanentAddress.state
Task.booksAndRecord.permanentAddress.zip
Task.booksAndRecord.permanentAddress.country
Task.booksAndRecord.contactInformation.phone
Task.booksAndRecord.contactInformation.bussinessDBAName
Task.booksAndRecord.idInformation.haveUSTin
Task.booksAndRecord.idInformation.USTin
Task.booksAndRecord.idInformation.USTinType
Task.booksAndRecord.idInformation.GIIN
Task.booksAndRecord.idInformation.foriegnTIN
Task.booksAndRecord.idInformation.foriegnTINCountry
Task.booksAndRecord.mailingAddress.address1
Task.booksAndRecord.mailingAddress.address2
Task.booksAndRecord.mailingAddress.city
Task.booksAndRecord.mailingAddress.state
Task.booksAndRecord.mailingAddress.zip
Task.booksAndRecord.mailingAddress.country


Example Request/Response: PUT/POST/GET Books and Records
{
    "root": [
        {
            "ATTR_NAME": "Task.booksAndRecord.entityCategorisation.classification",
            "ATTR_INDEX": "-1",
            "ATTR_VALUE": "No"
        },
        {
            "ATTR_NAME": "Task.booksAndRecord.permanentAddress.address1",
            "ATTR_INDEX": "-1",
            "ATTR_VALUE": "Address1"
        },
        {
            "ATTR_NAME": "Task.booksAndRecord.permanentAddress.address2",
            "ATTR_INDEX": "-1",
            "ATTR_VALUE": "Address2"
        },
        {
            "ATTR_NAME": "Task.booksAndRecord.permanentAddress.city",
            "ATTR_INDEX": "-1",
            "ATTR_VALUE": "Yeddds"
        },
        {
            "ATTR_NAME": "Task.booksAndRecord.permanentAddress.state",
            "ATTR_INDEX": "-1",
            "ATTR_VALUE": "dddd"
        },
        {
            "ATTR_NAME": "Task.booksAndRecord.permanentAddress.zip",
            "ATTR_INDEX": "-1",
            "ATTR_VALUE": "ddd"
        }
     ...
    ]
}


Example Response: GET Tin Types
{
"rows": [
        {
            "RNUM": "1",
            "ID": "1",
            "NAME": "EIN"
        },
        {
            "RNUM": "2",
            "ID": "2",
            "NAME": "QI_EIN"
        }		 
		],
    "paginatedRowCount": 2,
    "totalRowCount": 2
}
Example Response: Get Countries
{
    "rows": [
			{
				"RNUM": "1",
				"ID": "AF",
				"NAME": "Afghanistan"
			},
			{
				"RNUM": "2",
				"ID": "AX",
				"NAME": "Aland Islands"
			}
		 ],
    "paginatedRowCount": 2,
    "totalRowCount": 2
}

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

###CPM-16108 Permissions Tab
Track work for implementing MTU's premissions page.
REST API
Image Ref	Method	URI	Input	Response	Response Code	Content-Type
1	GET	/entities/<entity_id>/permissions	N/A	Grid	200	application/json
2	GET	/entities/<entity_id>/permissions/pending	N/A	Grid	200	application/json
3	POST	/entities/<entity_id>/permissions	entityId=<entity_id>&counterPartyId=<counterPartyId>	N/A	201	N/A
4	DELETE	/entities/<entity_id>/permissions/<counterParty_id>	N/A	N/A	200	N/A
5	POST	/entities/<entity_id>/permissions?all	N/A	N/A	201	N/A
6	DELETE	/entities/<entity_id>/permissions?all	N/A	N/A	200	N/A


Example Response: GET counterparties
{
    "rows": [
        {
            "COUNTERPARTYID": "100007",
            "COUNTERPARTYNAME": "Bank of America Corporation"
        },
        {
            "COUNTERPARTYID": "22743",
            "COUNTERPARTYNAME": "MARKIT GROUP LIMITED"
        },
        {
            "COUNTERPARTYID": "500",
            "COUNTERPARTYNAME": "Markit Genpact KYC Services"
        },
        {
            "COUNTERPARTYID": "600",
            "COUNTERPARTYNAME": "Markit Test"
        }
    ],
    "paginatedRowCount": 4,
    "totalRowCount": 4
}
Example Response: GET pending counterparties
	{
    "rows": [
        {
            "COUNTERPARTYID": "100000",
            "COUNTERPARTYNAME": "Abbey National"
        },
        {
            "COUNTERPARTYID": "100001",
            "COUNTERPARTYNAME": "Australia and New Zealand Bank"
        }   
	],
    "paginatedRowCount": 4,
    "totalRowCount": 4
}

###CPM-16109 Entity Details
Track work for implementing MTU's Entity Details on the screener page.
REST API
Image Ref	Method	URI	Input	Response	Response Code	Content-Type
2	GET	/entity/<entityId>	N/A	Grid	200	application/json
3	GET	/options/entity-types	N/A	Grid	200	application/json
4	PUT	/entity	entityName=%24%24%24%24%25%26%24%26%24&mei=&lei=&entityType=Fund&country=Antigua+and+Barbuda	N/A	200	N/A
Example Response: GET entityTypes
{
"rows": [
        {
            "RNUM": "1",
            "ID": "28",
            "NAME": "Account"
        },
        {
            "RNUM": "2",
            "ID": "8",
            "NAME": "Bank"
        }		 
		],
    "paginatedRowCount": 2,
    "totalRowCount": 2
}

Example Response: GET entity
{
    "rows": [
        {
            "ENTITYID": "49333439698300",
            "ENTITYNAME": "Cedarwood Investments Limited",
            "MEI": "KY0M001HB0",
            "LEI": null,
            "ENTITYTYPE": "Investment Management Company",
            "ENTITYSUBTYPE": null,
            "COUNTRY": "United States",
            "CLIENTIDENTIFER": "BBFEA",
            "BOOKS_AND_RECORD_COMPLETED": "false",
            "CLIENT_ACCOUNT_AA_COMPLETED": "true",
            "VS_TAX_FORM_COMPLETED": "false",
            "VS_SELF_CERT_COMPLETED": "false",
            "PERMISSIONS_COMPLETED": "false"
        }
    ],
    "paginatedRowCount": 1,
    "totalRowCount": 1
}


###CPM-16169 Tasks & MTU Scorecard
Track work for implementing MTU's screener tasks and scorecard.
REST API
Image Ref	Method	URI	Input	Response	Response Code	Content-Type
1	GET	/entities/<entityId>	N/A	Grid	200	application/json
2	GET	/entities/<entityId>/tasks	N/A	Grid	200	application/json
Example Response: GET Entity and scorecard
{
    "rows": [
        {
            "ENTITYID": "49333439698300",
            "ENTITYNAME": "Cedarwood Investments Limited",
            "MEI": "KY0M001HB0",
            "LEI": null,
            "ENTITYTYPE": "Investment Management Company",
            "ENTITYSUBTYPE": null,
            "COUNTRY": "United States",
            "CLIENTIDENTIFER": "BBFEA",
            "BOOKS_AND_RECORD_COMPLETED": "false",
            "CLIENT_ACCOUNT_AA_COMPLETED": "true",
            "VS_TAX_FORM_COMPLETED": "false",
            "VS_SELF_CERT_COMPLETED": "false",
            "PERMISSIONS_COMPLETED": "false"
        }
    ],
    "paginatedRowCount": 1,
    "totalRowCount": 1
}
Example Response: GET entity's tasks
{
    "rows": [
        {
            "RNUM": "1",
            "TASKNAME": "Provide Client Account Agency Agreement",
            "TASKID": "304327699129908",
            "TASKTYPE": "Client Account Agency Agreement"
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