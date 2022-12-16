<?php 
    $json_data = file_get_contents("./products.json");
    $info = json_decode($json_data);

    //Pagination
    // $numeropage = intval($_GET["page"]);
    // $nbrProduits = count($info);
    // $nbrProduitsParPage = 8;
    // $FirstProduct = $numeropage * $nbrProduitsParPage;
    // $nbrDePage = round($nbrProduits / $nbrProduitsParPage, 100, PHP_ROUND_HALF_UP) + 1;

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
<body class="bg-gray-200">

    <h1 class="text-center text-6xl py-7 text-white"> 
        FakeTeeTurle
    </h1>


    <div class="max-w-2xl mx-auto px-4 py-8 lg:max-w-7xl grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-8 lg:grid-cols-3 xl-grid-cols-4">
    
        <?php 
            foreach($info as $values)
            {
                echo
                ('
                    <div class="bg-white shadow-lg rounded-lg">
                        <img src="' . $values[1] . '" class="rounded-t-lg" alt="">
                        <div class="p-4">
                            <div class="flex mb-5">
                                <h3 class="texte-2xl text-gray-700">
                                    '. $values[0] .'
                                </h3>
                            </div>
                            <a href="' . $values[2] . '" class="inline-flex items-center justify-between px-5 py-1 shadow-sm font-medium rounded-md bg-blue-300"> Voir la page ! </a>
                        </div>
                    </div>
                ');
            }
        ?>

    </div>
        


    <script src="https://cdn.tailwindcss.com"></script>

</body>
</html>