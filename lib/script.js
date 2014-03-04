var questionArray = [6, 5, 5];
var deactiveFlag = 0;
var levelsAttempted = 'L1';
var levelWiseStatus = '';
var _levelWiseStatus = [];
var levelWiseScore = 0;
var asdf = 0;
var levelWiseAttempt = 0;
var extraParameters = '';
var completed = 0;
var noOfLevels;
var levelWiseMaxScores = "40000|5000|6000";
var lastLevelCleared;
var previousLevelLock=0;
var interactiveObj;
var parameterMissing = '';
var currentLevel;
var totalTimeTaken=0;
var levelWiseTimeTaken = "";
var levelWiseTimeTakenArr = new Array(0, 0, 0);
var levelAttemptedArr = new Array();
var levelWiseStatusArr = new Array(0, 0, 0);
var levelWiseScoreArr = new Array(0, 0, 0);
var levelWiseAttemptArr = new Array(0,0,0);
var score = 60;
var levelThree = false;
var correct = new Array(0,0,0);
var pauseTime = false;
repeat = [false,false,false];
var rand_no = [];
var stop_flag = 0;
var can_click = 0;
var question_attempted = 0;
var correct_answered = 0;
var level_flag = 0;
var timer = [];
timer[0] = 0;
var randTemp = 0;
var randTemp1 = 0;
var loader;
var randArr2 = [];
var idle_flag = 0;
var timeCounter = 0;
var timerPromptFlag = 0;
var correctAns = [];
var tymAttempted = 0;
var highlightFlag = 0;
var randArr1 = [];
var substitutionFlag = 0;
var correctAnswerFlag = 0;
var previousHighlightFlag = 0;
var previousSubstitutedImg = 0;
var tryAgainFlag = 0;
var guessFlag = 0;
var gameOver = 0;
var counter = 0;
var replayFlag = 0;
var hintsArray = [-1, -1, -1, -1, -1, -1];
var disableArray = [];
var symbolCorrectlyAnswered = 0;
var grnbordr = [];
var rdbordr = [];
var blbordr = [];
var tymTry = 0;
var sbmtFlag = 0;
var totalScore = 0;
var totalHints = 0;
var hints = 0;
var l1Score = 0;
var l2Score = 0;
var l3Score = 0;
var hintPromptFlag = 0;
var lFlag = 0;
var kkFlag = 0;

$(document).ready(function (e) {
    $(function () {
        interactiveObj = new questionInteractive();
        var imageArray = new Array('tarot_cards_1.png', 'tarot_cards_2.png', 'tarot_cards_3.png', 'tarot_cards_4.png', 'lock2.png', '');
        var loader = new PxLoader();
        $.each(imageArray, function (key, value1) {
            var pxImage = new PxLoaderImage('../assets/' + value1);
            loader.add(pxImage);
        });
        loader.addCompletionListener(function () {
            loadXML("xml.xml", function () {
                $("#loader").hide();
                currentLevel = 1;
                xmlText();
                idle_prompt();
                if (counter > 0) {
                    $("#container").html(parameterMissing + " are missing");
                }
                else if (lastLevelCleared > 3) {
                    $("#container").show();
                    $("#container").html("lastLevelCleared parameter is not set properly..!!");
                }
                else {
                    switch (lastLevelCleared) {
                        case 0:
                            if (previousLevelLock == 0) {
                                $("#intro_page").show();
                            }
                            else {
                                $("#landing_page").hide();
                                $("#content").show();
                                currentLevel = 1;
                                level_1();
                                StartTimer();
                            }
                            break;
                        case 1:
                            if (previousLevelLock == 0) {
                                $("#landing_page").show();
                                $("#lck_l2").hide();
                                currentLevel = 2;
                            }
                            else {
                                $("#content").show();
                                currentLevel = 2;
                                if (currentLevel == 2) {
                                    $("#landing_page").hide();
                                    $("#content").show();
                                    level_2();
                                    restart_game();
                                }
                                else if (currentLevel > 2) {
                                    show_popup("clr");
                                }
                                StartTimer();
                            }
                            break;
                        case 2:
                            if (previousLevelLock == 0) {
                                $("#lck_l2").hide();
                                $("#lck_l3").hide();
                                currentLevel = 3;
                                $("#landing_page").show();
                            }
                            else {
                                $("#content").show();
                                currentLevel = 3;
                                if (currentLevel == 3) {
                                    $("#landing_page").hide();
                                    $("#content").show();
                                    level_3();
                                    restart_game();
                                }
                                else if (currentLevel > 3) {
                                    show_popup("clr");
                                }
                                StartTimer();
                            }
                            break;
                        case 3:
                            if (previousLevelLock == 0) {
                                $("#intro_page").show();
                                //currentLevel = 1;
                            }
                            else {
                                $("#landing_page").hide();
                                $("#content").show();
                                currentLevel = 1;
                                level_1();
                                StartTimer();
                            }
                            break;
                    }
                }
                $("#clicktobegin").click(function () {
                    $("#intro_page").hide();
                    $("#landing_page").show();
                });

                $("#click1").click(function () {
                    if (currentLevel == 1) {
                        $("#landing_page").hide();
                        $("#content").show();
                        level_1();
                        restart_game();
                        StartTimer();
                    }
                    else if (currentLevel > 1) {
                        show_popup("clr");
                    }
                });

                $("#click2").click(function () {
                    if (currentLevel == 2) {
                        $("#landing_page").hide();
                        $("#content").show();
                        level_2();
                        restart_game();
                    }
                    else if (currentLevel > 2) {
                        show_popup("clr");
                    }
                });

                $("#click3").click(function () {
                    if (currentLevel == 3) {
                        $("#landing_page").hide();
                        $("#content").show();
                        level_3();
                        restart_game();
                    }
                    else if (currentLevel > 3) {
                        show_popup("clr");
                    }
                });

                $("#submt").click(function () {
                    if (sbmtFlag == 1) {
                        sbmtFlag = 0;
                        var empty_flag = 0;
                        for (var cnt = 1; cnt <= (currentLevel + 1); cnt++) {
                            if ($("#l" + currentLevel + "ans" + cnt).val() == "" || $("#l" + currentLevel + "ans" + cnt).val() == undefined) {
                                empty_flag++;
                                //console.log($("#l" + currentLevel + "ans" + cnt).val());
                            }
                        }
                        var dis = 0;
                        for (var ru = 2; ru <= (currentLevel + 1); ru++) {
                            if ($("#l" + currentLevel + "ans" + ru).is(':disabled')) {
                                dis++;
                            }
                        }
                        if (empty_flag == 0 || (dis == currentLevel && empty_flag != (currentLevel + 1))) {
                            tymAttempted++;
                            check_ans();
                        }
                        else {
                            kkFlag = 1;
                            $("#kk").show();
                            $("#kk_text").show();
                            $("#instructions").show();
                            $("#instructions").html("Please fill all blanks first.<br /><br />Click OK to move on!");
                            sbmtFlag = 1;
                        }
                    }
                    else {
                        //kkFlag = 1;
                        //$("#kk").show();
                        //$("#kk_text").show();
                        //$("#instructions").html("Please fill all blanks first.<br /><br />Click OK to move on!");
                        return;
                    }
                });

                $(".userans").forceNumeric();
                $(".userans").live('keypress', onKeyPress);
                $("#container").click(function () {
                    timeCounter = 0;
                });

                $("#clicktoprogress").click(function () {
                    stop_flag = 1;
                    clearTimeout(anim);
                    $("#next").hide();
                    setTimeout(function () {
                        if (can_click == 1) {
                            for (var z1 = 1; z1 <= (currentLevel + 1); z1++) {
                                $("#l" + currentLevel + "ans" + z1).attr("disabled", true);
                            }
                            can_click = 0;
                            $("#kk").hide();
                            $("#kk_text").hide();
                            var percent_correct = (correct_answered / question_attempted) * 100;
                            if (percent_correct >= 75 && question_attempted >= 2) {
                                $("#instructions").hide();
                                lastLevelCleared++;
                                $("#promptText").append(" " + currentLevel);
                                if (currentLevel == 3) {
                                    updateExtraPara();
                                    gameOver = 1;
                                    clearTimeout(idlePro);
                                    $("#submt").hide();
                                    $("#level3").hide();
                                    $("#ans_level3").hide();
                                    $("#clicktoprogress").hide();
                                    $("#hint_points").hide();
                                    $("#question").hide();
                                    $("#tarot").hide();
                                    $(".title").hide();
                                    $("#screenModal").show();
                                    $("#promptText").html(promptArr['over']);
                                    $("#endScreen").show();
                                    levelWiseStatus = "1|1|1";
                                    $("#landing_page").hide();
                                }
                                else {
                                    if (currentLevel == 1) {
                                        levelWiseStatus = "1";
                                    }
                                    else {
                                        levelWiseStatus = "1|1";
                                    }
                                    $("#screenModal").show();
                                    if (question_attempted == 2) {
                                        var temp = 0;
                                        switch (currentLevel) {
                                            case 1:
                                                temp = 170;
                                                l1Score += 170;
                                                totalScore += 170;
                                                levelWiseScore = l1Score;
                                                break;
                                            case 2:
                                                l2Score += 250;
                                                totalScore += 250;
                                                temp = 250;
                                                levelWiseScore = l1Score + "|" + l2Score;
                                                break;
                                            case 3:
                                                temp = 330;
                                                l3Score += 330;
                                                totalScore += 330;
                                                levelWiseScore = l1Score + "|" + l2Score + "|" + l3Score;
                                                break;
                                        }
                                        $("#pl").html(promptArr['pnt'] + " : " + replaceDynamicText(totalScore, interactiveObj.numberLanguage, ""));
                                        $("#promptText").html("Bingo!! You got two questions correct, " + temp + " points awarded");
                                        $("#promptText").append("<br /><br />" + promptArr['cong'] + " " + replaceDynamicText(currentLevel, interactiveObj.numberLanguage, "") + ".");

                                    }
                                    else {
                                        $("#promptText").html(promptArr['congo'] + promptArr['cong'] + " " + replaceDynamicText(currentLevel, interactiveObj.numberLanguage, "") + ".");
                                    }
                                    currentLevel++;
                                }
                                level_flag = 1;
                                pauseTime = true;
                            }
                            else {
                                $(".userans").attr("value", "");
                                $("#instructions").hide();
                                if (question_attempted == questionArray[currentLevel - 1]) {
                                    replayFlag = 1;
                                    $("#screenModal").show();
                                    $("#level" + currentLevel).hide();
                                    $("#clicktoprogress").hide();
                                    $("#submt").hide();
                                    $("#hint_points").hide();
                                    $("#ans_level" + currentLevel).hide();
                                    $("#question").hide();
                                    $("#promptText").html(promptArr['cannotComplete'] + replaceDynamicText(currentLevel, interactiveObj.numberLanguage, "") + ".");
                                    $("#landing_page").show();
                                }
                                else {
                                    eval("level_" + currentLevel + "()");
                                }
                            }
                        }
                    }, 0)
                });

                $("#prompt_k").click(function () {
                    $("#screenModal").hide();
                    if (hintPromptFlag == 1) {
                        hintPromptFlag = 0;
                    }
                    else {
                        if (timerPromptFlag == 0 && gameOver != 1) {
                            level_change();
                            $("#clicktoprogress").hide();
                            $("#landing_page").show();
                            if (currentLevel == 2) {
                                $("#lck_l" + currentLevel).remove();
                            }
                            else if (currentLevel == 3) {
                                $("#lck_l" + currentLevel).remove();
                                $("#lck_l" + (currentLevel - 1)).remove();
                            }

                        }
                        else if (gameOver == 1) {
                            completed = 1;
                        }
                        else {
                            timeCounter = 0;
                            idle_prompt();
                            timerPromptFlag = 0;
                        }
                    }
                });

                $(".promptContainer").draggable({
                    containment: "#container",
                    cursor: "pointer"
                });

                $("#kk,#kk_text").click(function () {
                    for (var e3 = 1; e3 <= (currentLevel + 1); e3++) {
                        $("#l" + currentLevel + "ans" + e3).attr("disabled", false);
                    }
                    for (var e3 = 2; e3 <= (currentLevel + 1); e3++) {
                        if (highlightFlag < 3 & highlightFlag > 0) {
                            $("#l" + currentLevel + "ans" + e3).attr("disabled", true);
                        }
                    }
                    for (var e0 = 0; e0 < blbordr.length; e0++) {
                        if (grnbordr.indexOf(blbordr[e0]) != -1) {
                            grnbordr.splice(grnbordr.indexOf(blbordr[e0]), 1);
                        }
                    }
                    for (var e3 = 1; e3 <= (previousSubstitutedImg - 1); e3++) {
                        if (grnbordr.indexOf(e3) != -1) {
                            $("#l" + currentLevel + "ans" + e3).css({ "border": "1px solid green" });
                        }
                        //$("#l" + currentLevel + "ans" + e3).attr("disabled", true);
                    }
                    if (kkFlag == 1) {
                        $("#instructions").hide();
                        $("#kk").hide();
                        $("#kk_text").hide();
                    }
                    switch (highlightFlag) {
                        case 0:
                            switch (substitutionFlag) {
                                case 0:
                                    if (correctAnswerFlag == 1) {
                                        stop_flag = 0;
                                        can_click = 1;
                                        $("#kk").hide();
                                        $("#kk_text").hide();
                                        generateScore();
                                        animation();
                                    }
                                    else {
                                        sbmtFlag = 1;
                                        $("#instructions").hide();
                                        $("#kk").hide();
                                        $("#kk_text").hide();
                                    }
                                    break;
                                case 1:
                                    for (r0 = 1; r0 <= (currentLevel + 1); r0++) {
                                        if (correctAns[r0 - 1] == 1) {
                                            $("#l" + currentLevel + "ans" + r0).attr("value", rand_no[r0 - 1]);
                                        }
                                        else {
                                            $("#l" + currentLevel + "ans" + r0).attr("value", "");
                                        }
                                    }
                                    sbmtFlag = 1;
                                    $("#kk").hide();
                                    $("#kk_text").hide();
                                    $("#instructions").hide();
                                    break;
                                case 2:
                                    sbmtFlag = 1;
                                    $("#kk").hide();
                                    $("kk_text").hide();
                                    $("#instructions").hide();
                                    $("#l" + currentLevel + "ans" + previousSubstitutedImg).attr("value", rand_no[previousSubstitutedImg - 1]);
                                    $("#l" + currentLevel + "ans" + previousSubstitutedImg).attr("disabled", true);
                                    blbordr.push(previousSubstitutedImg);
                                    $("#l" + currentLevel + "ans" + previousSubstitutedImg).css({ "border": "1px solid blue" });
                                    var success = 0;
                                    for (var e0 = 0; e0 < (currentLevel + 1); e0++) {
                                        if (correctAns[e0] == 1) {
                                            success++;
                                        }
                                    }
                                    if (question_attempted <= 5 && previousSubstitutedImg == (currentLevel + 1)) {
                                        sbmtFlag = 0;
                                        stop_flag = 0;
                                        can_click = 1;
                                        $("#kk").hide();
                                        $("#kk_text").hide();
                                        generateScore();
                                        animation();
                                    }
                                    else if (previousSubstitutedImg != (currentLevel + 1)) {
                                        sbmtFlag = 1;
                                        $("#kk").hide();
                                        $("#kk_text").hide();
                                    }
                                    else {
                                        if (previousSubstitutedImg == (currentLevel + 1)) {
                                            stop_flag = 0;
                                            can_click = 1;
                                            sbmtFlag = 0;
                                            $("#kk").hide();
                                            $("#kk_text").hide();
                                            generateScore();
                                            animation();
                                        }
                                        else {
                                            sbmtFlag = 1;
                                            $("#kk").hide();
                                            $("#kk_text").hide();
                                        }
                                        //replayFlag = 1;
                                        //extraParameters += hints;
                                    }
                                    break;
                            }
                            break;
                        case 1:
                            sbmtFlag = 1;
                            $("#l" + currentLevel + "ans1").attr("value", "");
                            for (var fe = 1; fe <= (currentLevel + 1); fe++) {
                                $("#l" + currentLevel + "ans" + fe).attr({ "disabled": false, "value": "" });
                            }
                            $("#l" + currentLevel + "ans1").attr("disabled", false);
                            $("#kk").hide();
                            $("#kk_text").hide();
                            $("#instructions").hide();
                            $("#l" + currentLevel + "ans1").attr("src", "");
                            break;
                        case 2:
                            sbmtFlag = 1;
                            $("#l" + currentLevel + "ans1").attr("value", "");
                            for (var k1 = 2; k1 <= (currentLevel + 1); k1++) {
                                $("#l" + currentLevel + "ans" + k1).attr({ "value": "", "disabled": true });
                            }
                            $("#instructions").hide();
                            $("#l" + currentLevel + "ans1").attr("disabled", false);
                            $("#kk").hide();
                            $("#kk_text").hide();
                            switch (currentLevel) {
                                case 1:
                                    $("#hintHighlightEqn").show();
                                    if (randArr2[0] == 2) {
                                        $("#hintHighlightEqn").css({ "top": "150px" });
                                    }
                                    else {
                                        $("#hintHighlightEqn").css({ "top": "254px" });
                                    }
                                    break;
                                case 2:
                                    $("#hintHighlightEqn").show();
                                    switch (randArr2[0]) {
                                        case 1:
                                            $("#hintHighlightEqn").css({ "top": "242px", "width": "340px", "height": "158px" });
                                            break;
                                        case 2:
                                            $("#hintHighlightEqn1").show();
                                            $("#hintHighlightEqn").css({ "top": "150px", "width": "340px", "height": "88px" });
                                            $("#hintHighlightEqn1").css({ "top": "312px", "width": "340px", "height": "88px" });
                                            break;
                                        case 3:
                                            $("#hintHighlightEqn").css({ "top": "150px", "width": "340px", "height": "158px" });
                                            break;
                                    }
                                    break;
                                case 3:
                                    sbmtFlag = 1;
                                    $("#hintHighlightEqn").show();
                                    switch (randArr2[0]) {
                                        case 1:
                                            $("#hintHighlightEqn").css({ "top": "215px", "width": "395px", "height": "201px", "left": "140px" });
                                            break;
                                        case 2:
                                            $("#hintHighlightEqn1").show();
                                            $("#hintHighlightEqn").css({ "top": "140px", "width": "395px", "height": "70px", "left": "140px" });
                                            $("#hintHighlightEqn1").css({ "top": "277px", "width": "395px", "height": "132px", "left": "140px" });
                                            break;
                                        case 3:
                                            $("#hintHighlightEqn1").show();
                                            $("#hintHighlightEqn").css({ "top": "140px", "width": "395px", "height": "132px", "left": "140px" });
                                            $("#hintHighlightEqn1").css({ "top": "345px", "width": "395px", "height": "70px", "left": "140px" });
                                            break;
                                        case 4:
                                            $("#hintHighlightEqn").css({ "top": "140px", "width": "395px", "height": "201px", "left": "140px" });
                                            break;
                                    }
                                    break;
                            }
                            break;
                        case 3:
                            sbmtFlag = 1;
                            $("#l" + currentLevel + "ans1").attr("value", "");
                            $("#kk").hide();
                            $("#kk_text").hide();
                            $("#instructions").hide();
                            $("#l" + currentLevel + "ans1").attr("value", rand_no[0]);
                            $("#l" + currentLevel + "ans1").attr("disabled", true);
                            blbordr.push(1);
                            $("#l" + currentLevel + "ans1").css({ "border": "1px solid blue" });
                            $(".hideDiv").hide();
                            for (var rq = 2; rq <= (currentLevel + 1); rq++) {
                                $("#l" + currentLevel + "ans" + rq).attr("disabled", false);
                            }
                            break;
                    }

                });
            });
        });
        loader.start();
    });
});

function onKeyPress(e) {
    timeCounter = 0;
    if ($(this).val().length > 1) {
        e.preventDefault();
    }
}

function generateScore() {
    switch (currentLevel) {
        case 1:
            l1Score += (5 - hints) * 10;
            totalScore += (5 - hints) * 10;
            levelWiseScore = l1Score;
            break;
        case 2:
            l2Score += (7 - hints) * 10;
            totalScore += (7 - hints) * 10;
            levelWiseScore = l1Score + "|" + l2Score;
            break;
        case 3:
            l3Score += (9 - hints) * 10;
            totalScore += (9 - hints) * 10;
            levelWiseScore = l1Score + "|" + l2Score + "|" + l3Score;
            break;
    }
    $("#pl").html(promptArr['pnt'] + " : " + replaceDynamicText(totalScore, interactiveObj.numberLanguage, ""));
        
}

var idlePro;
function idle_prompt() {
    if (timeCounter <= 60) {
        idlePro = setTimeout(function () {
            timeCounter++;
            idle_prompt();
        }, 1000)
    }
    else {
        timerPromptFlag = 1;
        $("#screenModal").show();
        $("#promptText").html(promptArr['idle']);
    }
}

function questionInteractive() {
    if (typeof getParameters['noOfLevels'] == "undefined") {
        counter++;
        parameterMissing += ' noOfLevels ';
    }
    else {
        noOfLevels = getParameters['noOfLevels'];
        if (noOfLevels != 3) {
            $("#container").show();
            $("#container").html("noOfLevels parameter is not correct");
        }
    }
    if (typeof getParameters['lastLevelCleared'] == "undefined") {
        counter++;
        parameterMissing += ' lastLevelCleared ';
    }
    else {
        lastLevelCleared = parseInt(getParameters['lastLevelCleared']);
    }
    if (typeof getParameters['previousLevelLock'] == "undefined") {
        counter++;
        parameterMissing += ' previousLevelLock ';
    }
    else {
        previousLevelLock = parseInt(getParameters['previousLevelLock']);
    }
    if (typeof getParameters['numberLanguage'] == "undefined") {
        this.numberLanguage = "english";
    }
    else {
        this.numberLanguage = getParameters['numberLanguage'];
    }
    if (typeof getParameters['language'] == "undefined") {
        this.language = "english";
    }
    else {
        this.language = getParameters['language'];
    }
}

jQuery.fn.forceNumeric = function () {
   return this.each(function () {
      $(this).keydown(function (e) {
         var key = e.which || e.keyCode;
         if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
            // numbers
            key >= 46 && key <= 57 ||
            // Numeric keypad
            key >= 96 && key <= 105 ||
            // Backspace and Tab and Enter
            key == 8 || key == 9 || key == 13 ||
            // Home and End
            key == 35 || key == 36 || 
            // left and right arrows
            key == 37 || key == 39 || key == 14 || key == 15 || key == 188 || key == 191 || key == 114)

            return true;

         return false;
      });
   });
}

function show_popup(t){
    $("#screenModal").show();
    $("#promptText").html(promptArr[t]);
}

function xmlText() {
    $("#clicktobegin").html(promptArr['nxt11']);
    $("#submt").html(promptArr['sbmt1']);
    $("#next_text").html(promptArr['nxttxt']);
    $("#remedial_title").html(promptArr['game']);
    $("#landing_title").html(promptArr['game']);
    $(".game_name").html(promptArr['trtcrd']);
    $("#level").html(promptArr['level']);
    $("#question").html(promptArr['qustn']);
    $("#hnt").html(promptArr['ht']);
    $("#pl").html('SCORE : '+replaceDynamicText(0, interactiveObj.numberLanguage, ""));
    $("#hnt").html(promptArr['ht']);
    $("#instructions").html(promptArr['wd'] + "<br />" + promptArr['mvon']);
    $("#kk_text").html(promptArr['k']);
    $("#click11").append(promptArr['lvl'] + " " + replaceDynamicText(1, interactiveObj.numberLanguage, ""));
    $("#click12").append(promptArr['lvl'] + " " + replaceDynamicText(2, interactiveObj.numberLanguage, ""));
    $("#click13").append(promptArr['lvl'] + " " + replaceDynamicText(3, interactiveObj.numberLanguage, ""));
}

function level_change() {
    if (replayFlag == 1) {
        $("#clicktoprogress").hide();
        $("#level"+(currentLevel)).hide();
        $("#ans_level"+(currentLevel)).hide();
    }
    $("#level"+(currentLevel-1)).hide();
    $("#ans_level"+(currentLevel-1)).hide();
    $("#submt").hide();
    $("#hint_points").hide();
    $("#title").hide();
    $("#tarot").hide();
    $("#next").hide();
    $("#question").hide();
    question_attempted = 0;
    lFlag = 1;
    updateExtraPara();
    for (var rt = 0; rt < 6; rt++) {
        hintsArray[rt] = -1;
    }
    correct_answered = 0;
    
}

function restart_game() {
    pauseTime = false; 
    $("#hint_points").show();
    $("#submt").show();
    $("#title").show();
    $("#tarot").show();
    $("#question").show();
}

function StartTimer() {
    var timer1 = [];
    var i = 0;
    var j = 0;
    if (completed != 1) {
        CounterForInterval = window.setInterval(function () {
            if (level_flag == 1) {
                level_flag = 0;
                j++;
                timer1[j] = "|";
                j++;
                i++;
                timer[i] = 0;
            }
            timer1[j] = timer[i];
            levelWiseTimeTaken = "";
            for (var k = 0; k <= j; k++) {
                levelWiseTimeTaken += timer1[k];
            }
            if (!pauseTime) {
                timer[i]++;
            }
        }, 1000);
	 } 
     else {
	    clearInterval(CounterForInterval);
	 }

}

function ques(no, no1) {
    var i = 0;
    while (i < no) {
        rand_no[i] = 0;
        rand_no[i] = Math.random();
        rand_no[i] = (Math.floor(rand_no[i] * 100) % (no1)) + 1;
        i++;
    }
    return rand_no;
}

function level_1() {
    if (question_attempted == 6) {
        replayFlag = 1;
        level_change();
        levelWiseStatus = "2"; 
        $("#landing_page").show();
    }
    else {
        sbmtFlag = 1;
        levelsAttempted = "L1";
        levelWiseStatus = '0';
        tymTry = 0;
        $("#level").html(promptArr['level'] +" "+ replaceDynamicText(currentLevel, interactiveObj.numberLanguage, ""));
        $("#l1ans1").attr("value", "");
        $("#l1ans2").attr("value", "");
        $("#l1ans1").css("border", "1px solid");
        $("#l1ans2").css("border", "1px solid");
        $("#l1ans1").attr("disabled", false);
        $("#l1ans2").attr("disabled", false);
        $("#level1 p").each(function () {
            var img = document.createElement("img");
            if ($(this).attr("customattr") == 1) {
                $(img).insertAfter(this);
                img.id = this.id;
                $(this).remove();
            }
        });
        blbordr = [];
        grnbordr = [];
        
        $("#clicktoprogress").show();
        //if (question_attempted == 0) {
        //    totalScore = 0;
        //    l1Score = 0;
        //}
        //else { 
        //    //l1Score += (5 - hints) * 10;
        //    //totalScore += (5 - hints) * 10;
        //}
        ////levelWiseScore = l1Score;
        $("#pl").html(promptArr['pnt'] + " : " + replaceDynamicText(totalScore, interactiveObj.numberLanguage, ""));
        hints = 0;
        $("#hnt").html(promptArr['ht'] + " : " + replaceDynamicText(hints, interactiveObj.numberLanguage, ""));
        randVertPic(2);
        tymAttempted = 0;
        highlightFlag = 0;
        correctAnswerFlag = 0;
        substitutionFlag = 0;
        $("#level2").hide();
        $("#level3").hide();
        $("#level1").show();
        $("#ans_level2").hide();
        $("#ans_level3").hide();
        $("#ans_level1").show();
        $("#kk_text").hide();
        question_attempted++;
        hintsArray[question_attempted - 1] = 0;
        ques(2, 12);
        $("#l1q" + randArr2[0]).html(replaceDynamicText(rand_no[0] * 2, interactiveObj.numberLanguage, ""));
        $("#l1q" + randArr2[1]).html(replaceDynamicText(rand_no[0] + rand_no[1], interactiveObj.numberLanguage, ""));
        return;
    }
}

function level_2() {
    if (question_attempted == 5) {
        replayFlag = 1;
        level_change();
        levelWiseStatus = "1|2";
        $("#landing_page").show();
    }
    else {
        sbmtFlag = 1;
        tymTry = 0;
        blbordr = [];
        grnbordr = [];
        levelsAttempted = "L1 | L2";
        levelWiseStatus = '1|0';
        $("#l2ans1").attr("value", "");
        $("#l2ans2").attr("value", "");
        $("#l2ans3").attr("value", "");
        $("#l2ans1").css("border", "1px solid");
        $("#l2ans2").css("border", "1px solid");
        $("#l2ans3").css("border", "1px solid");
        $("#l2ans1").attr("disabled", false);
        $("#l2ans2").attr("disabled", false);
        $("#l2ans3").attr("disabled", false);
        $("#level").html(promptArr['level'] + " " + replaceDynamicText(currentLevel, interactiveObj.numberLanguage, ""));
        $("#level2 p").each(function () {
            var img = document.createElement("img");
            if ($(this).attr("customattr") == 1) {
                $(img).insertAfter(this);
                img.id = this.id;
                $(this).remove();
            }
        });
        randVertPic(3);
        //if (question_attempted == 0 ) {
        //    l2Score = 0;
        //}
        //else { 
        //    //totalScore += (7 - hints) * 10;
        //    //l2Score += (7 - hints) * 10;
        //}
        hints = 0;
        $("#hnt").html(promptArr['ht'] + " : " + replaceDynamicText(hints, interactiveObj.numberLanguage, ""));
        levelWiseScore = l1Score + "|" + l2Score;
        $("#clicktoprogress").show();
        $("#pl").html(promptArr['pnt'] + " : " + replaceDynamicText(totalScore, interactiveObj.numberLanguage, ""));
        question_attempted++;
        hintsArray[question_attempted - 1] = 0;
        tymAttempted = 0;
        highlightFlag = 0;
        correctAnswerFlag = 0;
        substitutionFlag = 0;
        $("#level1").hide();
        $("#level3").hide();
        $("#level2").show();
        $("#next").hide();
        $("#ans_level1").hide();
        $("#ans_level3").hide();
        $("#ans_level2").show();
        var temp = Math.round(Math.random() * 100) % 2;
        ques(3, 12);
        $("#l2q" + randArr2[0]).html(replaceDynamicText(rand_no[0] * 3, interactiveObj.numberLanguage, ""));
        if (randTemp == 1) {
            $("#l2q" + randArr2[1]).html(replaceDynamicText(rand_no[0] + rand_no[1] * 2, interactiveObj.numberLanguage, ""));
        }
        else {
            $("#l2q" + randArr2[1]).html(replaceDynamicText(rand_no[0] * 2 + rand_no[1], interactiveObj.numberLanguage, ""));
        }
        $("#l2q" + randArr2[2]).html(replaceDynamicText(rand_no[0] + rand_no[1] + rand_no[2], interactiveObj.numberLanguage, ""));
        return;
    } 
}

function level_3() {
    if (question_attempted == 5) {
        replayFlag = 1;
        level_change();
        levelWiseStatus = "1|1|2";
        $("#landing_page").show();
    }
    else {
        sbmtFlag = 1;
        blbordr = [];
        grnbordr = [];
        levelsAttempted = "L1 | L2 | L3";
        levelWiseStatus = '1|1|0';
        $("#level").html(promptArr['level'] + " " + replaceDynamicText(currentLevel, interactiveObj.numberLanguage, ""));
        $("#l3ans1").attr("value", "");
        $("#l3ans2").attr("value", "");
        $("#l3ans3").attr("value", "");
        $("#l3ans4").attr("value", "");
        $("#l3ans1").css("border", "1px solid");
        $("#l3ans2").css("border", "1px solid");
        $("#l3ans3").css("border", "1px solid");
        $("#l3ans4").css("border", "1px solid");
        $("#l3ans1").attr("disabled", false);
        $("#l3ans2").attr("disabled", false);
        $("#l3ans3").attr("disabled", false);
        $("#l3ans4").attr("disabled", false);
        $("#level3 p").each(function () {
            var img = document.createElement("img");
            if ($(this).attr("customattr") == 1) {
                $(img).insertAfter(this);
                img.id = this.id;
                $(this).remove();
            }
        });
        randVertPic(4);
        //if (question_attempted == 0) {
        //    l3Score = 0;
        //}
        //else { 
        //    //totalScore += (9 - hints) * 10;
        //    //l3Score += (9 - hints) * 10;
        //}
        hints = 0;
        levelWiseScore = l1Score + "|" + l2Score + "|" + l3Score;
        $("#clicktoprogress").show();
        $("#hnt").html(promptArr['ht'] + " : " + replaceDynamicText(hints, interactiveObj.numberLanguage, ""));
        $("#pl").html(promptArr['pnt'] + " : " + replaceDynamicText(totalScore, interactiveObj.numberLanguage, ""));
        correctAnswerFlag = 0;
        substitutionFlag = 0;
        tymAttempted = 0;
        highlightFlag = 0;
        $("#level1").hide();
        $("#level2").hide();
        $("#level3").show();
        question_attempted++;
        hintsArray[question_attempted - 1] = 0;
        $("#ans_level1").hide();
        $("#ans_level2").hide();
        $("#ans_level3").show();
        ques(4, 12);
        $("#l3q" + randArr2[0]).html(replaceDynamicText(rand_no[0] * 4, interactiveObj.numberLanguage, ""));
        $("#l3q" + randArr2[3]).html(replaceDynamicText(rand_no[0] + rand_no[1] + rand_no[2] + rand_no[3], interactiveObj.numberLanguage, ""));
        if (randTemp == 1) {
            $("#l3q" + randArr2[1]).html(replaceDynamicText(rand_no[0] + rand_no[1] * 3, interactiveObj.numberLanguage, ""));
            $("#l3q" + randArr2[2]).html(replaceDynamicText(rand_no[0] + rand_no[1] * 2 + rand_no[2], interactiveObj.numberLanguage, ""));
        }
        else {
            $("#l3q" + randArr2[1]).html(replaceDynamicText(rand_no[0] * 2 + rand_no[1] * 2, interactiveObj.numberLanguage, ""));
            $("#l3q" + randArr2[2]).html(replaceDynamicText(rand_no[0] * 2 + rand_no[1] + rand_no[2], interactiveObj.numberLanguage, ""));
        }
        return;
    }
}

function check_ans() {
    for (var r0 = 0; r0 < (currentLevel + 1); r0++) {
        $("#l" + currentLevel + "ans" + (r0 + 1)).attr("disabled", true);
    }
    symbolCorrectlyAnswered = 0;
    for (var g = 0; g <= currentLevel; g++) {
        if ($("#l" + currentLevel + "ans" + (g + 1)).val() == rand_no[g]) {
            correctAns[g] = 1;
            if (blbordr.indexOf((g + 1)) == -1) {
                grnbordr.push((g + 1));
            }
            symbolCorrectlyAnswered++;
        }
        else {
            correctAns[g] = 0;
        }
    }
    if (symbolCorrectlyAnswered == (currentLevel + 1)) {
        if (previousHighlightFlag == 1 && correctAns[0] == 1) {
            $("#l" + currentLevel + "ans1").attr("value", rand_no[0]);
            $(".hideDiv").hide();
            highlightFlag = 0;
        }
        if (previousSubstitutedImg != 0 && correctAns[previousSubstitutedImg - 1] == 1) {
            substitutionFlag = 0;
            previousSubstitutedImg = 0;
        }
        correctAnswerFlag = 1;
        $("#kk").show();
        $("#kk_text").show();
        $("#instructions").html(promptArr['wd'] + "<br />" + promptArr['mvon']);
        $("#instructions").show();
        for (var f1 = 0; f1 <= (currentLevel + 1); f1++) {
            if (blbordr.indexOf(f1) != -1) {
                $("#l" + currentLevel + "ans" + f1).css({ "border": "1px solid blue" });
            }
            else if (grnbordr.indexOf(f1) != -1) {
                $("#l" + currentLevel + "ans" + f1).css({ "border": "1px solid green" });
            }
        }
        correct_answered++;
    }
    else {
        if (previousHighlightFlag == 1 && correctAns[0] == 1) {
            $("#l" + currentLevel + "ans1").attr("value", rand_no[0]);
            $(".hideDiv").hide();
            if (grnbordr.indexOf(1) != -1) {
                $("#l" + currentLevel + "ans1").css({ "border": "1px solid green" });
            }
            highlightFlag = 0;
        }
        if (previousHighlightFlag == 1 && correctAns[0] == 1 && highlightFlag == 0) {
            previousHighlightFlag = 0;
            sbmtFlag = 1;
            for (var v = 2; v <= (currentLevel + 1); v++) {
                $("#l" + currentLevel + "ans" + v).attr("disabled", false);
            }
        }
        else {

            if (previousSubstitutedImg != 0 && correctAns[previousSubstitutedImg - 1] == 1) {
                substitutionFlag = 0;
                previousSubstitutedImg = 0;
            }
            if (symbolCorrectlyAnswered == 1) {
                if (correctAns[0] == 1) {
                    substitution_eqn(2);
                }
                else if (correctAns[1] == 1) {
                    highlight_eqn();
                }
                else {
                    if (tymTry == 0) {

                        instruct_try();
                    }
                    else {
                        if (guessFlag == 0) {
                            instruction_guess();
                        }
                        else {
                            highlight_eqn();
                        }
                    }
                }
            }
            else if (symbolCorrectlyAnswered == 2) {
                if (currentLevel == 2 && (blbordr.indexOf(1) != -1 || blbordr.indexOf(2) != -1)) {
                    tymTry++;
                }
                if (tymTry == 0) {
                    instruct_try();
                }
                else {
                    if (currentLevel == 3 && correctAns[2] == 1 && correctAns[3] == 1 && guessFlag == 0) {
                        instruction_guess();
                    }
                    else if (correctAns[0] == 0) {
                        highlight_eqn();
                    }
                    else if (correctAns[1] == 0) {
                        substitution_eqn(2);
                    }
                    else if (correctAns[2] == 0) {
                        substitution_eqn(3);
                    }
                    else if (correctAns[3] == 0) {
                        substitution_eqn(4);
                    }
                    else {
                        if (currentLevel == 2) {
                            for (var g2 = 2; g2 <= (currentLevel + 1); g2++) {
                                if (correctAns[g2 - 1] == 0) {
                                    substitution_eqn(g2);
                                }
                            }
                        }
                        else {
                            if (correctAns[1] == 0) {
                                substitution_eqn(2);
                            }
                            else {
                                if (tymAttempted == 2) {
                                    instruction_guess();
                                }
                                else {
                                    if (correctAns[1] == 0) {
                                        substitution_eqn(2);
                                    }
                                    else if (correctAns[2] == 0) {
                                        substitution_eqn(3);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else if (symbolCorrectlyAnswered == 0) {
                highlight_eqn();
            }
            else {
                if (currentLevel == 3 && correctAns[0] == 0) {
                    if (tymTry == 0) {
                        instruct_try();
                    }
                    else {
                        highlight_eqn();
                    }
                }
                else {
                    var rt = 0;
                    for (var g2 = 1; g2 <= (currentLevel + 1); g2++) {
                        if (correctAns[g2 - 1] == 0 && tymAttempted > 1) {
                            var rt = g2;
                        }
                        //tymAttempted++;
                    }
                    if (rt != 0) {
                        substitution_eqn(rt);
                    }
                    else if (rt == 1) {
                        highlight_eqn();
                    }
                    else {
                        instruct_try();
                    }
                }
            }
        }
    }
}

function instruct_try() {
    tymTry = 1;
    $("#instructions").show();
    $("#instructions").html(promptArr['tryAgain'] + "<br />" + promptArr['tryAgain1'] + "<br />" + promptArr['tryAgain2']);
    $("#kk").show();
    $("#kk_text").show();
}

function instruction_tryAgain2() {
    if (tryAgainFlag == 0) {
        tryAgainFlag++;
        $("#instructions").show();
        $("#kk").show();
        $("#kk_text").show();
        $("#instructions").html(promptArr['tryAgain1'] + "<br />" + promptArr['tryAgain2']);
    }
    else {
        tryAgainFlag++;
        instruction_guess();
    }
}

function instruction_guess() {
    tryAgainFlag = 0;
    guessFlag = 1;
    $("#instructions").show();
    $("#instructions").html(promptArr['guess1'] + "<br />" + promptArr['guess2'] + "<br />" + promptArr['guess3']);
    $("#kk").show();
    $("#kk_text").show();
}

function highlight_eqn() {
    switch (highlightFlag) {
        case 0:
            previousHighlightFlag = 1;
            score--;
            hints++;
            totalHints++;
            hintPrompt();
            deactiveFlag = 1;
            hintsArray[question_attempted - 1]++;
            $("#hnt").html(promptArr['ht'] + " : " + replaceDynamicText(hints, interactiveObj.numberLanguage, ""));
            $("#instructions").show();
            $("#kk").show();
            $("#kk_text").show();
            highlightFlag++;
            $("#instructions").html(promptArr['highlightText1'] + "<br /><br />" + promptArr['highlightText2']);
            break;
        case 1:
            highlightFlag++;
            $("#instructions").show();
            deactiveFlag = 1;
            score--;
            hints++;
            totalHints++;
            hintPrompt();
            hintsArray[question_attempted - 1]++;
            $("#hnt").html(promptArr['ht'] + " : " + replaceDynamicText(hints, interactiveObj.numberLanguage, ""));
            $("#kk").show();
            $("#kk_text").show();
            $("#instructions").html(promptArr['highlightText3'] + "<img class='hintImg' />" + promptArr['highlightText4']+"<br />"+promptArr['highlightText5']+"<br />"+promptArr['highlightText6']);
            $(".hintImg").attr("src", "../assets/tarot_cards_" + randArr1[0] + ".png");
            break;
        case 2:
            highlightFlag++;
            $("#instructions").show();
            deactiveFlag = 1;
            score--;
            hints++;
            totalHints++;
            hintPrompt();
            hintsArray[question_attempted - 1]++;
            $("#hnt").html(promptArr['ht'] + " : " + replaceDynamicText(hints, interactiveObj.numberLanguage, ""));
            $("#kk").show();
            $("#kk_text").show();
            $("#instructions").html(promptArr['highlightText7'] + "<br />");
            for (var ry = 0; ry < (currentLevel); ry++) {
                $("#instructions").append("<img class='hintImg'>" + " + ");
            }
            $("#instructions").append("<img class='hintImg'>" + " = " + (currentLevel + 1) * rand_no[0] + "<br /><br />So, &nbsp;<img class='hintImg'>" + "" + " = " + (currentLevel + 1) * rand_no[0] + "/" + (currentLevel + 1) + " = " + rand_no[0] + ".<br />" + promptArr['highlightText8'])
            $(".hintImg").attr("src", "../assets/tarot_cards_" + randArr1[0] + ".png");
            break;
    }
}

function substitution_eqn(k) {
    switch (substitutionFlag) {
        case 0:
            previousSubstitutedImg = k;
            substitutionFlag++;
            $("#instructions").show();
            $("#kk").show();
            score--;
            hints++;
            totalHints++;
            hintPrompt();
            hintsArray[question_attempted - 1]++;
            $("#hnt").html(promptArr['ht'] + " : " + replaceDynamicText(hints, interactiveObj.numberLanguage, ""));
            $("#kk_text").show();
            if (previousSubstitutedImg > 2) {
                $("#instructions").html("The symbols we know are replaced by their values!<br /> Now try again! <br />Press OK to proceed.")
            }
            else {
                $("#instructions").html(promptArr['subText1'] + "<img class='hintImg'>" + promptArr['subText2'] + "<br />" + promptArr['subText3'] + "<br />" + promptArr['subText4']);
            }
            $(".hintImg").attr("src", "../assets/tarot_cards_" + randArr1[0] + ".png");
            for (var r = 1; r <= (currentLevel + 1); r++) {
                var temp4 = (currentLevel + 1) * (randArr2[k - 1] - 1) + r;
                for (var r1 = 1; k - r1 - 1 >= 0; r1++) {
                    if ($("#l" + currentLevel + "c" + temp4).attr("src") == "../assets/tarot_cards_" + randArr1[k - r1 - 1] + ".png") {
                        $("#l" + currentLevel + "c" + temp4).remove();
                        $("#level" + currentLevel).append("<p customattr='1' id='l" + currentLevel + "c" + temp4 + "'>" + rand_no[k - r1 - 1]);
                        $("#l" + currentLevel + "c" + temp4).css({ "border": " 1px solid black", "text-align": "center", "width": "52px", "height": "41px", "padding-top": "8px", "background": "white" });
                    }
                }
            }

            break;
        case 1:
            substitutionFlag++;
            $("#instructions").show();
            score--;
            hints++;
            totalHints++;
            hintPrompt();
            hintsArray[question_attempted - 1]++;
            $("#hnt").html(promptArr['ht'] + " : " + replaceDynamicText(hints, interactiveObj.numberLanguage, ""));
            var iu = currentLevel;
            var iu1 = 0;
            $("#instructions").html("We know, ");
            while (iu1 < k - 1) {
                $("#instructions").append("<img class='hintImg' src='../assets/tarot_cards_" + randArr1[iu1] + ".png' /> = " + rand_no[iu1]);
                if (iu1 != k - 2 && iu1 != 0) {
                    $("#instructions").append(" , ");
                }
                else if (iu1 != k - 1) {
                    $("#instructions").append(", ");
                }
                iu1++;
            }
            var r4 = 0;
            var r3 = [];
            setTimeout(function () {
                iu1 = 0;
                $("#instructions").append("<br /><br />");
                while (iu1 < (currentLevel + 1)) {
                    var tem = (currentLevel + 1) * (randArr2[k - 1] - 1) + (iu1 + 1);
                    if (iu1 != 0) {
                        $("#instructions").append(" + ");
                    }
                    if ($("#l" + currentLevel + "c" + tem).attr("src") == "../assets/tarot_cards_" + randArr1[k - 1] + ".png") {
                        r4++;
                    }
                    if (parseInt($("#l" + currentLevel + "c" + tem).html()) == rand_no[0]) {
                        r3.push(parseInt($("#l" + currentLevel + "c" + tem).html()));
                        var item = "../assets/tarot_cards_" + randArr1[0] + ".png";
                        $("#instructions").append("<img class='hintImg' src='" + item + "' />");
                    }
                    else if (parseInt($("#l" + currentLevel + "c" + tem).html()) == rand_no[1]) {
                        r3.push(parseInt($("#l" + currentLevel + "c" + tem).html()));
                        var item = "../assets/tarot_cards_" + randArr1[1] + ".png";
                        $("#instructions").append("<img class='hintImg' src='" + item + "' />");
                    }
                    else if (parseInt($("#l" + currentLevel + "c" + tem).html()) == rand_no[2]) {
                        r3.push(parseInt($("#l" + currentLevel + "c" + tem).html()));
                        var item = "../assets/tarot_cards_" + randArr1[2] + ".png";
                        $("#instructions").append("<img class='hintImg' src='" + item + "' />");
                    }
                    else {
                        $("#instructions").append("<img class='hintImg' src='../assets/tarot_cards_" + randArr1[k - 1] + ".png' />");
                    }
                    iu1++;

                }
                var value3 = $("#l" + currentLevel + "q" + randArr2[k - 1]).html();
                $("#instructions").append(" = " + value3 + "<br /><br />");
                setTimeout(function () {
                    var r5 = parseInt($("#l" + currentLevel + "q" + randArr2[k - 1]).html());
                    if (r4 != 1) {
                        $("#instructions").append(r4);
                    }
                    $("#instructions").append("<img class='hintImg' src='../assets/tarot_cards_" + randArr1[k - 1] + ".png' /> = " + r5);

                    var ui = 0;
                    value3 = r5;
                    while (ui < r3.length) {
                        $("#instructions").append(" - " + r3[ui]);
                        ui++;
                        value3 = value3 - r3[ui - 1];
                        //console.log(value3);
                    }

                    setTimeout(function () {
                        $("#instructions").append("<br /><br />");
                        $("#instructions").append("<img class='hintImg' src='../assets/tarot_cards_" + randArr1[k - 1] + ".png' /> = " + value3);
                        if (r4 != 1) {
                            $("#instructions").append("/" + r4);
                            $("#instructions").append(" = " + rand_no[k - 1]);
                        }
                        $("#kk").show();
                        $("#kk_text").show();
                    }, 2000)
                }, 2000)
            }, 2000)

    }
}

var anim;

function updateExtraPara() {
    //console.log(level_flag);
     var t = 0;
     while(hintsArray[t] != -1 && t<=5){
         extraParameters += hintsArray[t];
         t++;
     }
     if (replayFlag == 1) {
         extraParameters += "~";
         replayFlag = 0;
     }
     else if(completed != 1 && lFlag == 1){
         extraParameters += "|";
     }   
}

function animation() {
    for (var tr = 1; tr <= (currentLevel + 1); tr++) {
        $("#l" + currentLevel + "ans" + tr).attr("disabled", true);
    }
    $("#next").show();
    $("#next").animate({
        top: "324px"
    }, 500)
    setTimeout(function () {
        $("#next").animate({
            top: "285px"
        }, 500)
        if (!stop_flag) {
           anim = setTimeout(function () {
                animation();
            }, 600)
        }
        else {
            $("#next").hide();
            return;
        }
    }, 500)
}

function randPicGen(x, y) {
    var rand_pic = [];
    ques(x, y);
    for (var w = 0; w < x; w++) { 
        rand_pic[w] = rand_no[w];
    }
    for (var s = 1; s < x; s++) {
        for (var s1 = s - 1; s1 >= 0; s1--) {
            if (rand_pic[s] == rand_pic[s1]) {
                ques(1, x);
                rand_pic[s] = rand_no[0];
                s--;
            }
        }
    }
    return rand_pic;
}

function randVertPic(x) {
    randArr1 = randPicGen(x, 4);
    randArr2 = randPicGen(x, x);
    switch (x) {
        case 2:
            for (var c = 0; c < x; c++) {
                $("#l1ques" + (c + 1)).attr("src", "../assets/tarot_cards_" + randArr1[c] + ".png");
                for (var c1 = 0; c1 < x; c1++) {
                    $("#l1c" + (c * 2 + c1 + 1)).attr("src", "../assets/tarot_cards_" + (randArr1[0]) + ".png");
                }
            }
            $("#l1c" + (randArr2[1] * 2)).attr("src", "../assets/tarot_cards_" + (randArr1[1]) + ".png");
            break;

        case 3:
            for (var c = 1; c <= x; c++) {
                $("#l2ques" + (c)).attr("src", "../assets/tarot_cards_" + randArr1[c-1] + ".png");
                $("#l2c" + (x * (randArr2[0] - 1) + c)).attr("src", "../assets/tarot_cards_" + (randArr1[0]) + ".png");
                $("#l2c" + (x * (randArr2[2] -1) + c)).attr("src", "../assets/tarot_cards_" + (randArr1[c-1]) + ".png");
            }
            randTemp = (Math.floor(Math.random() * 100) % 2) + 1;
            for (var c = 1; c <= randTemp; c++) {
                $("#l2c" + (3 * (randArr2[1] - 1) + c)).attr("src", "../assets/tarot_cards_" + (randArr1[0]) + ".png");
            }
            for (var c = randTemp + 1; c <= 3; c++) {
                $("#l2c" + (3 * (randArr2[1] - 1) + c)).attr("src", "../assets/tarot_cards_" + (randArr1[1]) + ".png");
            }
            break;
        case 4:
            for (var c = 1; c <= x; c++) {
                $("#l3ques" + (c)).attr("src", "../assets/tarot_cards_" + randArr1[c - 1] + ".png");
                $("#l3c" + (x * (randArr2[0] - 1) + c)).attr("src", "../assets/tarot_cards_" + (randArr1[0]) + ".png");
                $("#l3c" + (x * (randArr2[3] - 1) + c)).attr("src", "../assets/tarot_cards_" + (randArr1[c - 1]) + ".png");
            }

            randTemp = (Math.floor(Math.random() * 100) % 2) + 1;
            for (var c1 = 1; c1 <= randTemp; c1++) {
                $("#l3c" + (4 * (randArr2[1] - 1) + c1)).attr("src", "../assets/tarot_cards_" + (randArr1[0]) + ".png");
            }

            for (var c2 = randTemp + 1; c2 <= 4; c2++) {
                $("#l3c" + (4 * (randArr2[1] - 1) + c2)).attr("src", "../assets/tarot_cards_" + (randArr1[1]) + ".png");
            }

            randTemp1 = 3 - randTemp;

            for (var c3 = 1; c3 <= randTemp; c3++) {
                $("#l3c" + (4 * (randArr2[2] - 1) + c3)).attr("src", "../assets/tarot_cards_" + (randArr1[0]) + ".png");
            }

            for (var c4 = randTemp + 1; c4 <= 3; c4++) {
                $("#l3c" + (4 * (randArr2[2] - 1) + c4)).attr("src", "../assets/tarot_cards_" + (randArr1[1]) + ".png");
            }
            c5 = 4;
            $("#l3c" + (4 * (randArr2[2]-1) + c5)).attr("src", "../assets/tarot_cards_" + (randArr1[2]) + ".png");
            break;
    }
}

function hintPrompt() {
    if (totalHints == 30 || totalHints == 40 || totalHints == 50 || totalHints == 55 || totalHints == 59) {
        hintPromptFlag = 1;
        $("#screenModal").show();
        var temp = 60 - totalHints;
        $("#promptText").html("No. of Hints Left : " + replaceDynamicText(temp, interactiveObj.numberLanguage, ""));
    }
    else if (totalHints == 60) {
        gameOver = 1;
        clearTimeout(idlePro);
        $("#submt").hide();
        $("#level3").hide();
        $("#ans_level3").hide();
        $("#clicktoprogress").hide();
        $("#hint_points").hide();
        $("#question").hide();
        $("#tarot").hide();
        $(".title").hide();
        $("#screenModal").show();
        $("#promptText").html(promptArr['over']);
        $("#endScreen").show();
        levelWiseStatus = "1|1|1";
        updateExtraPara();
        generateScore();
        $("#landing_page").hide();
    }
}
