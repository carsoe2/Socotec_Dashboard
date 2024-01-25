<?php 
//HEADER
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
    // echo "Testing";

//ESTABLISH CONNECTION
    $serverName = ""; //serverName\instanceName
    $connectionInfo = array();
    $conn = sqlsrv_connect($serverName, $connectionInfo);
    // include 'DbConnect.php';

    // $db = new DbConnect;
    // $conn = $db->connect();
    

//CRUD METHODS
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method) {
        //DISPLAY USERS
        case "GET":
            $query = "SELECT * FROM Users";
            $result = sqlsrv_query($conn, $query);
            $users = array();
            $i = 0;
            while($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)){
                $users[$i]["ID"] = $row['ID'];
                $users[$i]["Status"] = $row['Status'];
                $users[$i]["FirstName"] = $row['FirstName'];
                $users[$i]["LastName"] = $row['LastName'];
                $users[$i]["Email"] = $row['Email'];
                $users[$i]["Company"] = $row["Company"];
                $users[$i]["Division"] = $row["Division"];
                $users[$i]["ProfitCenter"] = $row["ProfitCenter"];
                $i++;
            }
            echo json_encode($users);
            break;
        //CREATE USER
        case "POST":
            $user = json_decode( file_get_contents('php://input') );
            $company = $user->company;
            $division = $user->division;
            $profit = $user->profit;
            $first = $user->first;
            $last = $user->last;
            $email = $user->email;
            $status = 'Active';
            $sql = "INSERT INTO Users(Company, Division, ProfitCenter, FirstName, LastName, Email, Status) VALUES(?, ?, ?, ?, ?, ?, ?)";
            $params = array(&$company, &$division, &$profit, &$first, &$last, &$email, &$status);
            $stmt = sqlsrv_prepare($conn, $sql, $params);
            if(sqlsrv_execute($stmt)) {
                $response = ['status' => 1, 'message' => 'Record created successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to create record.'];
            }
            echo json_encode($response);
            break;
        //UPDATE USER
        case "PUT":
            $user = json_decode( file_get_contents('php://input') );
            $company = $user->company;
            $division = $user->division;
            $profit = $user->profit;
            $first = $user->first;
            $last = $user->last;
            $email = $user->email;
            $status = $user->status;
            $sql = "UPDATE Users SET Company=?, Division=?, ProfitCenter=?, FirstName=?, LastName=?, Email=?, Status=?, WHERE ID=?";
            $path = explode('/', $_SERVER['REQUEST_URI']);
            $id = $path[4];
            echo $profit;
            $params = array(&$company, &$division, &$profit, &$first, &$last, &$email, &$status, &$id);
            $stmt = sqlsrv_prepare($conn, $sql, $params);
            if(sqlsrv_execute($stmt)) {
                $response = ['status' => 1, 'message' => 'Record updated successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to update record.'];
            }
            echo json_encode($response);
            break;
        //DELETE USER
        case "DELETE":
            $sql = "DELETE FROM Users WHERE ID = ?";
            $path = explode('/', $_SERVER['REQUEST_URI']);
            $id = $path[4];
            $param = array(&$id);
            $stmt = sqlsrv_prepare($conn, $sql, $param);

            if(sqlsrv_execute($stmt)) {
                $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to delete record.'];
            }
            echo json_encode($response);
            break;
    }

?>