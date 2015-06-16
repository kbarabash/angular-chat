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