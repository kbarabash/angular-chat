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