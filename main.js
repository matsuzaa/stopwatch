
    //カウンター要素の定数化
    const counter = document.getElementById("counter");
    //ボタン要素の定数化
    const start = document.getElementById("start");
    const restart = document.getElementById("restart");
    const stop = document.getElementById("stop");
    const reset = document.getElementById("reset");

    //カウンターの表示
    let counterHour = 0;
    let counterMinute = 0;
    let counterSeconds = 0;
    let counterPoint = 0;

    let countStart = 0;     //計測開始時の時間格納
    let countEnd = 0;       //計測差分
    let countResult = 0;    //計測結果

    //カウンターストップ処理用変数
    let countStop;

    //基本的な処理の記述
    function counterStart(){
        countResult = new Date(Date.now() - countStart + countEnd);

        counterHour = String(countResult.getHours() - 9).padStart(2, "0"); //2桁表示固定
        counterMinute = String(countResult.getMinutes()).padStart(2, "0");
        counterSeconds = String(countResult.getSeconds()).padStart(2, "0");
        counterPoint = String(countResult.getMilliseconds()).padStart(1, "0");
        counterPoint = Math.floor(counterPoint /100); //1桁固定

        counter.textContent = counterHour + "：" + counterMinute + "：" + counterSeconds + " ." + counterPoint;

        //setTimeoutにて100ミリ秒ごとに処理を繰り返す(ストップ時に処理を止める必要があるため変数指定)
        countStop = setTimeout(function(){        
            counterStart();
        },100);
    }    

    //初期状態のボタン設定
    function setDefault(){
        start.classList.remove("invalid","hide");
        restart.classList.add("hide"); 
        stop.classList.add("invalid");
        reset.classList.add("invalid");
    }

    setDefault();       //初期状態の設定を呼び出す

    //スタート押下時の処理
    function setStart(){
        if(start.classList.contains("invalid") === true){
            return;
        }
        countStart = Date.now();
        counterStart();
        //ボタン設定変更
        start.classList.add("invalid");
        stop.classList.remove("invalid");
        reset.classList.add("invalid");
    }

    //再スタート押下時の処理
    function setRestart(){
        if(restart.classList.contains("invalid") === true){
            return;
        }
        countStart = Date.now();
        counterStart();
        //ボタン設定変更
        restart.classList.add("invalid");
        stop.classList.remove("invalid");
        reset.classList.add("invalid");
    }

    //ストップ押下時の処理
    function setStop(){
        if(stop.classList.contains("invalid") === true){
            return;
        }
        clearTimeout(countStop);
        countEnd = countEnd + Date.now() - countStart;
        //ボタン設定変更
        start.classList.add("hide");
        restart.classList.remove("hide","invalid");
        stop.classList.add("invalid");
        reset.classList.remove("invalid");
    }

    //リセット押下時の処理
    function setReset(){
        if(reset.classList.contains("invalid") === true){
            return;
        }
        setDefault();
        countEnd = 0;   //時間差分初期化
        //表示の初期化
        counter.textContent = "00：00：00 .0";
    }
