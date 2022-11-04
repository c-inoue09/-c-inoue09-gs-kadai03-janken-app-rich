
// ローディング画面
$(window).on('load',function(){
    $("#splash-logo").delay(1200).fadeOut('slow');//ロゴを1.2秒でフェードアウトする記述
	
    //=====ここからローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる
    $("#splash").delay(1500).fadeOut('slow',function(){//ローディングエリア（splashエリア）を1.5秒でフェードアウトする記述
    
        $('body').addClass('appear');//フェードアウト後bodyにappearクラス付与
	
    });
    //=====ここまでローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる
    
   //=====ここから背景が伸びた後に動かしたいJSをまとめたい場合は
    $('.splashbg').on('animationend', function() {    
        //この中に動かしたいJSを記載
    });
    //=====ここまで背景が伸びた後に動かしたいJSをまとめる
        
});

// ユーザの名前を取得してローカルストレージに保存
$("#mawasu-button").on("click",function(){
    const userName = $("#user-name").val();
    localStorage.setItem("userNameKey",userName);
});

$(".clear").on("click",function(){
    localStorage.removeItem("userNameKey");
    $("#user-name").val("");
});

if (localStorage.getItem("userNameKey")){
    const userNameStorage = localStorage.getItem("userNameKey");
    $("#user-name").val(userNameStorage);

}


const okashi = [  // お菓子リストを配列で定義
{name: "うまい棒", price: 12, calorie: 43, taste: "しょっぱい"}, //0
{name: "プチプチチョコ占い", price: 20, calorie: 34, taste: "あまい"}, //1
{name: "モロッコヨーグル", price: 20, calorie: 27, taste: "あまい"}, //2
{name: "キャベツ太郎", price: 20, calorie: 81, taste: "しょっぱい"}, //3
{name: "すっぱいレモンにご用心", price: 30, calorie: 38, taste: "あまい"}, //4
{name: "こざくら餅", price: 35, calorie: 46, taste: "あまい"}, //5
{name: "ヤングドーナツ", price: 40, calorie: 195, taste: "あまい"},//6 
{name: "タラタラしてんじゃねーよ", price: 54, calorie: 37, taste: "しょっぱい"}, //7
{name: "ピエール・エルメのマカロン", price: 300, calorie: 96, taste: "あまい"} //8
]

const randomMessage = [ // サマリ用ランダムメッセージの配列
    "リュックに入らないなら、イノウエが食べてあげようか？",
    "おうちに帰るまでが 遠足ですよッ！",
    "やはり甘味…!! 甘味は全てを解決する…!!",
    "ところで イノウエの酢昆布と ひとつ交換しない？",
    "知ってた？ キャベツ太郎にキャベツは入ってないらしい",
    "イノウエの ねるねるねるねは あげないよッ！"
]

zankin = 300; // 残りのお金計算用の変数
totalCost = 0; // サマリ用 累計金額
totalNum = 0; // サマリ用 個数累計
totalCalorie = 0; // サマリ用 累計カロリー
numItem = [0,0,0,0,0,0,0,0,0] //サマリ表示用 各お菓子の個数を記録

const gacha = (randomNumber)=>{
    numItem[randomNumber] ++; //お菓子の種類ごとに個数をカウント
    zankin = zankin - okashi[randomNumber].price;
    totalNum ++; // これまでの個数累計をカウント
    totalCost = totalCost + okashi[randomNumber].price // 累計金額をカウント
    totalCalorie = totalCalorie + okashi[randomNumber].calorie; // これまでの累計カロリーをカウント

    $(".item-wrapper").append(
        `<div class = "okashi-item">
        <img src="img/okashi-${randomNumber}.jpeg" alt="${okashi[randomNumber].name}">
        <h3>${okashi[randomNumber].name}</h3>
        <p>${okashi[randomNumber].price}円 | ${okashi[randomNumber].calorie}kcal</p>
        </div>`
        );

    console.log(`「${okashi[randomNumber].name}」を買いました`);
    console.log(`お小遣いはのこり${zankin}円！`);
    console.log(``);
}


$(document).ready(function(){ //ページが読み込まれたら実行

    $("#user-name-display").html(`${localStorage.getItem("userNameKey")}さんのおやつは…`);

    while (zankin >= okashi[0].price){   
        if(zankin >= okashi[0].price && zankin < okashi[1].price){
            let randomNumber = Math.floor(Math.random()* 1);
            gacha(randomNumber);
        }

        else if(zankin >= okashi[1].price && zankin < okashi[2].price){
            let randomNumber =Math.floor(Math.random()* 2);
            gacha(randomNumber);
        }

        else if(zankin >= okashi[2].price && zankin < okashi[3].price){
            let randomNumber = Math.floor(Math.random()* 3);
            gacha(randomNumber);
        }

        else if(zankin >= okashi[3].price && zankin < okashi[4].price){
            let randomNumber = Math.floor(Math.random()* 4);
            gacha(randomNumber);
        }

        else if(zankin >= okashi[4].price && zankin < okashi[5].price){
            let randomNumber = Math.floor(Math.random()* 5);
            gacha(randomNumber);
        }

        else if(zankin >= okashi[5].price && zankin < okashi[6].price){
            let randomNumber = Math.floor(Math.random()* 6);
            gacha(randomNumber);
        }

        else if(zankin >= okashi[6].price && zankin < okashi[7].price){
            let randomNumber = Math.floor(Math.random()* 7);
            gacha(randomNumber);
        }

        else if(zankin >= okashi[7].price && zankin < okashi[8].price){
            let randomNumber = Math.floor(Math.random()* 8);
            gacha(randomNumber);
        }

        else{
            let randomNumber = Math.floor(Math.random()* 9);
            gacha(randomNumber);
        }



    } 

    console.log(numItem);

    for (let i = 0; i < okashi.length; i++){
        if(numItem[i] >=1){
            $("#item-list").append(`<p>・${okashi[i].name} ${okashi[i].price}円 × ${numItem[i]}個</p>`);
        }
        else{
            ; // 0個の場合は表示しない
        }
        }
        $("#summary-sentence").html(`<p>合計 ${totalNum}点 ${totalCost}円、${totalCalorie}kcal です！</p>`);
    
        let messageNumber = Math.floor(Math.random()* 5); //ランダムメッセージ用の乱数を発生
        $("#random-message").html(`<p>${randomMessage[messageNumber]}</p>`);
});

    

