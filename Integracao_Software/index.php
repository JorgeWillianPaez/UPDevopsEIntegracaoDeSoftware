<?php

const SUCCESS = true;
const FAIL = false;
const HTTP_CODE_OK = 200;
const HTTP_CODE_BAD_REQUEST = 500;
const HTTP_CODE_NOT_FOUND = 404;
const DEFAULT_EXCEPTION_CODE = 1;

try {

    $response = [];

    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        $response["success"] = false;
        throw new Exception(
            "Only route POST is permition",
            HTTP_CODE_BAD_REQUEST
        );
    }

    if ($_SERVER["REQUEST_URI"] !== "/user") {
        $response["success"] = false;
        throw new Exception(
            "This route is not defined",
            HTTP_CODE_NOT_FOUND
        );
    }

    $body = json_decode(file_get_contents("php://input"));
    
    $connection = new PDO(
        "mysql:host=localhost;dbname=users",
        "root",
        "1234"
    );

    $sql = "INSERT INTO users (name, lastname, age) VALUES (:name, :lastname, :age)";
    $stmt = $connection->prepare($sql);
    $stmt->execute([
        ":name" => $body->name,
        ":lastname" => $body->lastname,
        ":age" => $body->age
    ]);

    http_response_code(HTTP_CODE_OK);
    $response["success"] = SUCCESS;

} catch (Exception $e) {
    $exceptionCode = $e->getCode();
    $http_response_code(
        $exceptionCode === DEFAULT_EXCEPTION_CODE
            ? HTTP_CODE_BAD_REQUEST
            : $exceptionCode
    );
}

header("Content-Type: application/json; charset=UTF-8");

echo json_encode($response);

?>