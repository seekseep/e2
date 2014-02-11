<?php

    // 文字コード指定
    header("Content-Type: text/html;charset=utf-8");

    // イベントコード
    $eventCode = $_GET['eventCode'];

    // DBとのコネクションの確保
    include_once('./php/dbLink.php'); 

    // SQL の発行
    $query = "SELECT `eventcode` FROM `event` WHERE `eventcode` = '$eventCode'";    

    // SQL の実行
    $result = mysqli_query($link, $query);
    $row = mysqli_fetch_array($result); 

    if(!$row){
        // ログイン失敗時にログイン画面に移動
        header("Location: bigscreen_login.php?error=1");        
    }else{
?>
<!doctype html>
<html>
<head lang="ja">
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>ホスト | e2</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
    <!-- lib -->
    <script type="text/javascript" src="./lib/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="./lib/raphael-min.js"></script>
    <!-- css -->
    <link type="text/css" rel="stylesheet" href="css/host.css" />
	<link type="text/css" rel="stylesheet" href="css/fontsize.css" />
    <!-- script -->
    <script type="text/javascript" src="./js/host/host.effect.js"></script>
</head>
<body>
<article id="hostApp" data-eventCode='<?php echo $eventCode; ?>'>
    <header>
        <h1><a href="./index.php">e<sup>2</sup></a></h1>
        <h2>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                viewBox="0 0 100 100"
                enable-background="new 0 0 100 100"
                xml:space="preserve">
                    <g fill="#EEE">
                        <path d="M82.309,72.391c4.782,0,9.737,3.751,11.043,8.341l1.879,6.643c1.301,4.588-1.554,8.348-6.326,8.323  l-77.745-0.05c-4.768,0-7.656-3.769-6.418-8.37l1.773-6.51c1.24-4.626,6.174-8.377,10.941-8.377H82.309z"/>
                        <path d="M89.901,4.302H10.11c-2.013,0-3.641,1.625-3.641,3.641v55.565c0,2.017,1.628,3.643,3.641,3.643h79.791  c2.006,0,3.643-1.626,3.643-3.643V7.943C93.544,5.928,91.907,4.302,89.901,4.302z M86.26,59.869H13.749V11.583H86.26V59.869z"/>
                    </g>
            </svg>
        </h2>
        <h3><?php echo $eventCode; ?></h3>
    </header>
    <nav>
          <div id="menu_icon">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                viewBox="0 0 100 100"
                enable-background="new 0 0 100 100"
                xml:space="preserve">
                <g fille="#999">
                    <rect x="31.114" y="65.946" width="56.72" height="9.475"/>
                    <rect x="31.114" y="45.264" width="56.72" height="9.474"/>
                    <rect x="31.114" y="24.579" width="56.72" height="9.474"/>
                    <rect x="12.167" y="24.579" width="9.474" height="9.474"/>
                    <rect x="12.167" y="45.264" width="9.474" height="9.474"/>
                    <rect x="12.167" y="65.947" width="9.474" height="9.474"/>
                </g>
            </svg>
        </div>
        <div id="current_page_name">
            <p>メッセージの送信</p>
        </div>
    </nav>
    <menu>
        <ul id="menu_body">
            <li class="current">
                <a href="#send">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        viewBox="0 0 100 100"
                        xml:space="preserve">
                        <g class="wrap">
                            <polygon points="14,17 14,67 25,67 25,83.463 50.837,67 86,67 86,17  "/>
                        </g>
                    </svg>
                    <span>メッセージの送信</span>
                </a>
            </li>
            <li>
                <a href="#delete">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        viewBox="0 0 100 100"
                        xml:space="preserve">
                        <g class="wrap">
                            <path d="M26.01,85.981h47.975V32.011H26.01V85.981z M59.994,42.006h3.994v35.979h-3.994V42.006z M48,42.006h3.994v35.979H48V42.006   z M36.004,42.006h4v35.979h-4V42.006z"/>
                            <path d="M67.988,26.012h11.996c0-3.311-2.686-5.997-6-5.997h-13.99v-5.996h-19.99v5.996H26.01c-3.314,0-5.994,2.687-5.994,5.997   h11.988H67.988z"/>
                        </g>
                    </svg>
                    <span>メッセージの削除</span>
                </a>
            </li>
            <li>
                <a href="#optioin">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        viewBox="0 0 100 100"
                        xml:space="preserve">
                        <g class="wrap">
                            <path d="M93.794,45.797c-0.276-2.015-1.833-3.666-3.849-3.939c-2.475-0.273-7.514-0.918-7.514-0.918  c-2.199-0.547-3.85-2.474-3.85-4.854c0-0.915,0.275-1.833,0.827-2.565c0-0.091,4.581-6.046,4.581-6.046  c1.281-1.556,1.188-3.848-0.092-5.405c-1.741-2.2-3.758-4.216-5.959-5.958c-1.556-1.283-3.848-1.374-5.403-0.091  c-2.017,1.557-5.955,4.584-5.955,4.584c-0.824,0.456-1.741,0.821-2.748,0.821c-2.383,0-4.308-1.739-4.767-4.031l-0.914-7.329  c-0.274-2.016-1.926-3.572-3.94-3.846c-2.838-0.276-5.679-0.276-8.427,0c-2.016,0.273-3.666,1.83-3.94,3.846l-0.915,7.329  c-0.368,2.292-2.383,4.031-4.766,4.031c-1.097,0-2.106-0.365-2.93-0.915l-5.772-4.49c-1.557-1.283-3.849-1.191-5.405,0.091  c-2.201,1.742-4.216,3.757-5.958,5.958c-1.374,1.557-1.374,3.849-0.091,5.405c1.468,1.924,4.398,5.772,4.398,5.772  c0.641,0.824,1.009,1.833,1.009,2.839c0,2.475-1.833,4.49-4.216,4.854l-7.146,0.918c-2.016,0.274-3.663,1.924-3.848,3.939  c-0.274,2.839-0.274,5.682,0,8.43c0.276,2.016,1.833,3.666,3.848,3.939l7.146,0.915c2.383,0.276,4.216,2.292,4.216,4.767  c0,1.098-0.368,2.106-1.009,2.93l-4.398,5.772c-1.283,1.56-1.192,3.849,0.091,5.405c1.741,2.199,3.757,4.216,5.958,5.957  c0.824,0.643,1.739,1.007,2.748,1.007c0.915,0,1.924-0.274,2.657-0.915l5.772-4.49c0.824-0.55,1.833-0.918,2.93-0.918  c2.383,0,4.398,1.742,4.766,4.034c0,0.091,0.915,7.329,0.915,7.329c0.274,2.016,1.924,3.57,3.94,3.848  c1.374,0.092,2.839,0.184,4.216,0.184c1.374,0,2.838-0.092,4.211-0.184c2.017-0.275,3.666-1.832,3.94-3.848l0.914-7.329  c0.459-2.292,2.384-4.034,4.767-4.034c1.007,0,2.017,0.277,2.748,0.827l5.955,4.581c0.731,0.641,1.741,0.915,2.655,0.915  c1.011,0,1.926-0.274,2.748-1.007c2.201-1.741,4.218-3.757,5.959-5.957c1.279-1.557,1.373-3.846,0.092-5.405  c-1.561-2.016-4.581-5.954-4.581-6.046c-0.552-0.732-0.827-1.65-0.827-2.656c0-2.291,1.65-4.308,3.85-4.767  c0,0,5.039-0.642,7.514-0.915c2.016-0.273,3.572-1.925,3.849-3.939C94.066,51.385,94.066,48.545,93.794,45.797z M50.001,64.943  c-8.247,0-14.934-6.688-14.934-14.934c0-8.244,6.688-14.932,14.934-14.932c8.243,0,14.931,6.688,14.931,14.932  C64.932,58.257,58.244,64.943,50.001,64.943z"/>
                        </g>
                    </svg>
                    <span>イベントの設定</span>
                </a>
            </li>
            <li>
                <a href="#qr">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        viewBox="0 0 100 100"
                        xml:space="preserve">
                        <g class="wrap" fill="#333">
                            <path d="M35.715,35.715V7.143V0H7.144H0v7.143v21.428v7.144h28.57H35.715z M7.144,28.571V7.143H28.57v21.428H7.144z"/>
                            <rect x="14.285" y="14.286" width="7.143" height="7.143"/>
                            <polygon points="57.144,14.286 50,14.286 50,7.143 57.144,7.143 57.144,0 50,0 42.856,0 42.856,7.143 42.856,21.429 50,21.429   50,28.571 57.144,28.571 "/>
                            <polygon points="50,50 57.144,50 57.144,35.715 50,35.715 50,28.571 42.856,28.571 42.856,42.857 50,42.857 "/>
                            <path d="M71.428,0h-7.143v35.715h7.143h21.429H100V7.143V0H71.428z M92.856,28.571H71.428V7.143h21.429V28.571z"/>
                            <rect x="78.57" y="14.286" width="7.145" height="7.143"/>
                            <polygon points="0,42.857 0,50 0,57.144 7.144,57.144 7.144,50 14.285,50 14.285,42.857 "/>
                            <polygon points="57.144,64.285 57.144,57.144 50,57.144 50,50 42.856,50 42.856,42.857 21.428,42.857 21.428,50 14.285,50   14.285,57.144 28.57,57.144 28.57,50 35.715,50 35.715,57.144 42.856,57.144 42.856,64.285 50,64.285 50,71.43 57.144,71.43 "/>
                            <polygon points="64.285,85.715 71.428,85.715 71.428,78.57 64.285,78.57 64.285,71.43 57.144,71.43 57.144,78.57 50,78.57 50,71.43   42.856,71.43 42.856,85.715 50,85.715 50,92.857 57.144,92.857 57.144,85.715 "/>
                            <rect x="71.428" y="71.43" width="7.143" height="7.141"/>
                            <rect x="64.285" y="64.285" width="7.143" height="7.145"/>
                            <polygon points="64.285,57.144 71.428,57.144 71.428,64.285 78.57,64.285 78.57,71.43 85.715,71.43 85.715,57.144 78.57,57.144   78.57,50 71.428,50 71.428,42.857 64.285,42.857 64.285,50 57.144,50 57.144,57.144 "/>
                            <rect x="92.856" y="57.144" width="7.144" height="14.286"/>
                            <rect x="78.57" y="42.857" width="7.145" height="7.143"/>
                            <rect x="85.715" y="50" width="7.142" height="7.144"/>
                            <rect x="92.856" y="42.857" width="7.144" height="7.143"/>
                            <rect x="85.715" y="71.43" width="7.142" height="7.141"/>
                            <rect x="92.856" y="78.57" width="7.144" height="7.145"/>
                            <rect x="92.856" y="92.857" width="7.144" height="7.143"/>
                            <polygon points="78.57,85.715 71.428,85.715 71.428,92.857 78.57,92.857 78.57,100 85.715,100 85.715,78.57 78.57,78.57 "/>
                            <rect x="57.144" y="92.857" width="14.284" height="7.143"/>
                            <rect x="42.856" y="92.857" width="7.144" height="7.143"/>
                            <path d="M0,71.43V100h7.144h28.571v-7.143V71.43v-7.145H0V71.43z M28.57,71.43v21.428H7.144V71.43H28.57z"/>
                            <rect x="14.285" y="78.57" width="7.143" height="7.145"/>
                        </g>
                    </svg>
                    <span>QRコードの表示</span>
                </a>
            </li>
        </ul>
    </menu>
    <section id="content">
        <section id="send_host_message" class="preview_select_column" data-hash="send">
            <section class="preview">send</section>
            <section class="select"></section>
        </section>
        <section id="delete_host_message" class="preview_select_column hidden" data-hash="delete">
            <section class="preview">delete</section>
            <section class="select"></section>
        </section>
        <section id="set_event_option" class="preview_select_column hidden" data-hash="option">
            <section class="preview">option</section>
            <section class="select"></section>
        </section>
        <section id="view_qr_code" class="single_column hidden" data-hash="qr">
            <section>qr</section>
        </section>
    </section>
</article>
</body>
</html>
<?php } ?>