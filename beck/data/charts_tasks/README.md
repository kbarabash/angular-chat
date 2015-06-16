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