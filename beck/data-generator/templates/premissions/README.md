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