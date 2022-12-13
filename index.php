<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

    <?php 

        $json_data = file_get_contents("./products.json");
        $info = json_decode($json_data);

        foreach($info as $values)
        {
            echo($values[0] . '<br/>');
            echo('<img src="' . $values[1] . '" alt="">' . '<br/>');
        }
    ?>


        

</body>
</html>