<!DOCTYPE html>
<html>
<head>
    <title>Sales Report</title>
    <style>
        body {
            font-family: Arial, Helvetica, sans-serif
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            padding: 8px;
            text-align: left;
            border: 1px solid #ddd;
        }
        th {
            background-color: #3b82f6;
            color: white;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
    <h1 style="text-align: center;">Sales Report for {{ $year }}</h1>

    <h3 style="text-align: center;">Monthly Sales</h3>
    <table style="width: 90%; margin: 0 auto;">
        <thead>
            <tr>
                <th>Month</th>
                <th>Total Sales</th>
            </tr>
        </thead>
        <tbody>
            @foreach($monthlySales as $month)
            <tr>
                <td>{{ $month['name'] }}</td>
                <td>{{ number_format($month['sales'], 2) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <h3 style="text-align: center;">Recent Sales</h3>
    <table style="width: 90%; margin: 0 auto;">
        <thead>
            <tr>
                <th>Date</th>
                <th>Product</th>
                <th>Amount</th>
            </tr>
        </thead>
        <tbody>
            @foreach($recentSales as $sale)
            <tr>
                <td>{{ $sale['date'] }}</td>
                <td>{{ $sale['product'] }}</td>
                <td>{{ number_format($sale['amount'], 2) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>

