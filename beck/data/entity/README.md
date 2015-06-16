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