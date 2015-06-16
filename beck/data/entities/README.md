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