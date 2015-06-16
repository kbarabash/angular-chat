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