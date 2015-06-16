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
