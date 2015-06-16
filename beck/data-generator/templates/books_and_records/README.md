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