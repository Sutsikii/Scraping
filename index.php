<?php 
    $json_data = file_get_contents("./products.json");
    $info = json_decode($json_data);

    // Pagination
    @$page=$_GET["page"];
    $nbr_articles = 8;
    $nbr_pages = ceil($info[0]["info"]/$nbr_articles);
    $debut=($page-1)*$nbr_articles;

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="index.css">
    <title>Document</title>
</head>
<body>


    <div class="bg-slate-900 grid grid-cols-3 grid-auto-flow ">
 
        <?php 
            foreach($info as $values)
            {
                // echo($values[0] . '<br/>');
                echo
                ('
                    <div>
                    <p>' . $values[0] . '</p>
                    <img src="' . $values[1] . '" alt="">
                    </div>
                ');
            }
        ?>

    </div>
        
    <script src="https://cdn.tailwindcss.com"></script>

</body>
</html>