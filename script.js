/* ==================================================
   基本設定
================================================== */

* {
    box-sizing: border-box;
}

html,
body {
    margin: 0;
    padding: 0;

    width: 100%;
    min-height: 100%;

    background: #e8e2d5;

    font-family:
        -apple-system,
        BlinkMacSystemFont,
        "PingFang TC",
        "Microsoft JhengHei",
        sans-serif;

    color: #3d3328;

    overscroll-behavior: none;
}

img {
    -webkit-user-drag: none;
    user-select: none;
}

button {
    font-family: inherit;
    cursor: pointer;

    -webkit-tap-highlight-color: transparent;

    touch-action: manipulation;
}

/* ==================================================
   按鈕焦點外框
================================================== */

button:focus {
    outline: none;
}

button:focus-visible {
    outline: none;
}

/* ==================================================
   遊戲主容器
================================================== */

#game {

    width: 100%;
    max-width: 600px;

    min-height: 100vh;
    min-height: 100dvh;

    margin: 0 auto;

    position: relative;

    overflow: hidden;

    background: #f8f3e8;

    isolation: isolate;
}


/* ==================================================
   畫面切換
================================================== */

.screen {

    display: none;

    width: 100%;

    min-height: 100vh;
    min-height: 100dvh;

    position: relative;
}

.screen.active {
    display: block;
}

/* ==================================================
   世界地圖
================================================== */

#worldScreen {

    position: relative;

    width: 100%;
    height: 100vh;
    height: 100dvh;

    min-height: 100vh;
    min-height: 100dvh;

    overflow: hidden;

    padding: 0;
}

.world-map-image {

    position: absolute;

    left: 0;
    top: 0;

    width: 100%;
    height: 100%;

    object-fit: cover;
    object-position: center center;

    display: block;

    user-select: none;
    -webkit-user-drag: none;

    z-index: 1;

    pointer-events: none;
}

/* ==================================================
   世界地圖點擊區
================================================== */

.map-location {

    position: absolute;

    width: 70px;
    height: 70px;

    padding: 0;
    margin: 0;

    border: none;

    background: transparent;

    z-index: 50;

    transform: translate(-50%, -50%);

    cursor: pointer;

    touch-action: manipulation;
}

/* ==================================================
   左上角人物資訊
================================================== */

.player-panel {

    position: absolute;

    top:
        max(15px,
            env(safe-area-inset-top));

    left: 15px;

    display: flex;

    align-items: center;

    gap: 8px;

    z-index: 20;

    max-width: calc(100% - 30px);
}


.player-button {

    width: 90px;
    height: 90px;

    flex: 0 0 90px;

    border-radius: 50%;

    border: 3px solid #4b4033;

    background: #fffdf6;

    padding: 0;

    overflow: hidden;

    box-shadow:
        0 2px 5px rgba(0, 0, 0, 0.25);
}


.player-button img {

    width: 100%;
    height: 100%;

    object-fit: cover;
}


.player-info-mini {

    background:
        rgba(255, 250, 238, 0.9);

    border: 2px solid #6b5b49;

    border-radius: 10px;

    padding: 7px 10px;

    font-size: 13px;

    box-shadow:
        0 2px 5px rgba(0, 0, 0, 0.15);

    white-space: nowrap;
}


.player-name-mini {

    font-weight: bold;

    margin-bottom: 3px;
}

/* ==================================================
   小小鎮人物按鈕
================================================== */

.town-player-button {

    position: absolute;

    top:
        max(15px,
            env(safe-area-inset-top));

    left: 15px;

    z-index: 50;

}

.town-back-button {
    position: absolute;
    bottom: 20px;
    left: 15px;
    z-index: 50;
}

/* ==================================================
   森林探索人物按鈕
================================================== */

.forest-player-button {

    position: absolute;

    top:
        max(15px,
            env(safe-area-inset-top));

    left: 15px;

    z-index: 50;

}


.forest-player-button .player-button {

    position: relative;

    z-index: 51;

}


/* ==================================================
   提示框
================================================== */

.message-box {

    position: fixed;

    left: 50%;

    bottom:
        max(25px,
            env(safe-area-inset-bottom));

    transform: translateX(-50%);

    width: min(85vw,
            500px);

    background: #fffaf0;

    border: 3px solid #6b5b49;

    border-radius: 12px;

    padding: 16px;

    text-align: center;

    box-shadow:
        0 4px 12px rgba(0, 0, 0, 0.2);

    z-index: 1200;

    display: none;
}

.message-box.show {
    display: block;
}


/* ==================================================
   一般頁面
================================================== */

.page {

    min-height: 100vh;
    min-height: 100dvh;

    padding:
        max(25px, env(safe-area-inset-top)) 18px max(25px, env(safe-area-inset-bottom));

    background:
        linear-gradient(180deg,
            #f8f3e8,
            #eee5d4);
}


.back-button {

    background: #fffaf0;

    border: 2px solid #6b5b49;

    border-radius: 10px;

    padding: 10px 15px;

    font-size: 15px;

    margin-bottom: 20px;

    min-height: 44px;
}


.page-title {

    text-align: center;

    margin: 5px 0 25px;

    font-size: 28px;
}


/* ==================================================
   人物詳情
================================================== */

.profile-card {

    background:
        rgba(255, 255, 255, 0.6);

    border: 2px solid #8a7a65;

    border-radius: 18px;

    padding: 25px;

    text-align: center;
}


.profile-avatar {

    width: min(180px, 45vw);
    height: min(180px, 45vw);

    border-radius: 50%;

    object-fit: cover;

    border: 4px solid #6b5b49;

    background: white;
}


.profile-name {

    font-size: 28px;

    margin: 15px 0 5px;
}


.level {

    font-size: 18px;

    color: #765d35;

    margin-bottom: 25px;
}


.stat-box {

    text-align: left;

    background: #fffaf0;

    border-radius: 10px;

    padding: 12px 15px;

    margin-top: 10px;

    border: 1px solid #b6a990;
}


.stat-main {
    font-size: 16px;
}


.stat-sub {

    font-size: 13px;

    color: #776b5c;

    margin-top: 4px;
}


/* ==================================================
   屬性配點
================================================== */

.attribute-section {

    margin-top: 20px;

    background: #fffaf0;

    border: 2px solid #8a7a65;

    border-radius: 12px;

    padding: 15px;
}


.attribute-title {

    font-weight: bold;

    font-size: 18px;

    margin-bottom: 10px;
}


.points {

    text-align: center;

    margin-bottom: 12px;

    color: #765d35;

    font-weight: bold;
}


.attribute-row {

    display: flex;

    align-items: center;

    justify-content: space-between;

    padding: 8px 0;

    border-bottom: 1px solid #ddd2bf;

    min-height: 48px;
}


.attribute-row:last-child {
    border-bottom: none;
}


.attribute-name {

    flex: 1;

    text-align: left;
}


.attribute-value {

    font-weight: bold;

    width: 40px;

    text-align: center;
}


.plus-button {

    width: 44px;
    height: 38px;

    border-radius: 8px;

    border: 2px solid #6b5b49;

    background: #e5d8bd;

    font-size: 18px;

    font-weight: bold;
}


.plus-button:disabled {

    opacity: 0.4;

    cursor: default;
}


/* ==================================================
   小小鎮
================================================== */

.town-page {

    min-height: 100vh;
    min-height: 100dvh;

    padding:
        max(25px, env(safe-area-inset-top)) 18px max(25px, env(safe-area-inset-bottom));

    background: #f5eddb;
}


.town-description {

    background: #fffaf0;

    border: 2px solid #8a7a65;

    border-radius: 12px;

    padding: 15px;

    margin-bottom: 20px;

    text-align: center;
}


.location-list {

    display: grid;

    grid-template-columns: 1fr 1fr;

    gap: 15px;
}


.location-button {

    min-height: 110px;

    background: #fffaf0;

    border: 2px solid #8a7a65;

    border-radius: 15px;

    font-size: 17px;

    color: #4d4033;

    box-shadow:
        0 3px 5px rgba(0, 0, 0, 0.1);

    padding: 12px;
}


.location-button:active {

    transform: scale(0.97);
}


/* ==================================================
   地點頁面
================================================== */

.location-card {

    background: #fffaf0;

    border: 2px solid #8a7a65;

    border-radius: 15px;

    padding: 20px;

    margin-top: 20px;

    text-align: center;
}


.big-icon {

    font-size: 80px;

    margin-bottom: 10px;
}


/* ==================================================
   NPC
================================================== */

.npc-image {

    width: min(500px,
            80%);

    max-width: 100%;

    height: auto;

    display: block;

    margin: 0 auto 10px;
}


/* ==================================================
   按鈕
================================================== */

.action-button {

    width: 100%;

    margin-top: 15px;

    padding: 14px;

    min-height: 48px;

    border-radius: 10px;

    border: 2px solid #6b5b49;

    background: #e5d8bd;

    font-size: 17px;
}


.action-button:disabled {

    opacity: 0.45;

    cursor: default;
}


/* ==================================================
   森林探索
================================================== */

#forestExploreScreen {

    position: relative;

    width: 100%;

    height: 100vh;
    height: 100dvh;

    min-height: 100vh;
    min-height: 100dvh;

    overflow: hidden;

    background: #7d9b6a;

    padding: 0;

    touch-action: none;
}


/* ==================================================
   森林背景
================================================== */

.forest-layer {

    position: absolute;

    left: 50%;
    top: 50%;

    width: max(180%, 1100px);

    height: max(240%, 1400px);

    object-fit: fill;

    pointer-events: none;

    user-select: none;

    will-change: transform;
}


#forestFar {
    z-index: 1;
}

#forestMid {
    z-index: 2;
}

#forestFront {
    z-index: 4;
}


/* ==================================================
   ⭐ 森林探索玩家
================================================== */

#explorePlayer {

    position: absolute;

    left: 50%;
    top: 50%;

    transform:
        translate(-50%, -50%);

    width: min(200px,
            30vw);

    height: min(280px,
            40vw);

    object-fit: contain;

    z-index: 5;

    pointer-events: none;

    user-select: none;

    filter:
        drop-shadow(0 3px 3px rgba(0, 0, 0, 0.3));
}


/* ==================================================
   玩家移動動畫
================================================== */

#explorePlayer.moving {

    animation:
        playerWalking 0.35s infinite alternate;
}


@keyframes playerWalking {

    from {

        transform:
            translate(-50%, -50%) translateY(0px);

    }

    to {

        transform:
            translate(-50%, -50%) translateY(-5px);

    }

}


/* ==================================================
   森林UI
================================================== */

.forest-explore-top {

    position: absolute;

    left: 20px;

    bottom:
        max(30px,
            env(safe-area-inset-bottom));

    z-index: 20;

    pointer-events: none;
}

.forest-explore-title {

    background:
        rgba(255, 250, 238, 0.88);

    border: 2px solid #6b5b49;

    border-radius: 10px;

    padding: 8px 12px;

    font-weight: bold;

    box-shadow:
        0 2px 5px rgba(0, 0, 0, 0.2);
}


/* ==================================================
   森林小地圖
================================================== */

#forestMiniMap {

    position: absolute;

    top:
        max(30px,
            calc(env(safe-area-inset-top) + 15px));

    right: 15px;

    width: min(280px,
            38vw);

    height: auto;

    z-index: 25;

    cursor: pointer;

    transition:
        transform 0.2s ease;
}


#forestMiniMap:active {

    transform: scale(0.97);
}

#forestMiniMapImage {

    display: block;

    width: 100%;

    height: auto;

    object-fit: contain;

    user-select: none;
}

/* ==================================================
   小地圖放大
================================================== */

#forestMapOverlay {

    position: fixed;

    inset: 0;

    background:
        rgba(35, 31, 25, 0.72);

    z-index: 200;

    display: none;

    align-items: center;
    justify-content: center;

    padding: 25px;

    cursor: pointer;
}


#forestMapOverlay.show {

    display: flex;
}


#forestMapLarge {

    width: min(90vw,
            520px);

    max-height: 85vh;

    object-fit: contain;

    border:
        3px solid #6b5b49;

    border-radius: 12px;

    background: #fffaf0;

    box-shadow:
        0 6px 20px rgba(0, 0, 0, 0.35);

    cursor: default;
}


#forestMapHint {

    position: absolute;

    left: 50%;

    bottom:
        max(25px,
            env(safe-area-inset-bottom));

    transform:
        translateX(-50%);

    color: white;

    font-size: 14px;

    background:
        rgba(0, 0, 0, 0.45);

    padding: 7px 12px;

    border-radius: 8px;

    pointer-events: none;
}

/* ==================================================
   小地圖玩家位置
================================================== */

#miniMapPlayer {

    position: absolute;

    left: 50%;
    top: 50%;

    width: 10px;
    height: 10px;

    margin-left: -5px;
    margin-top: -5px;

    border-radius: 50%;

    background: #5d7f4f;

    border: 2px solid #fffaf0;

    box-shadow:
        0 1px 4px rgba(0, 0, 0, 0.35);

    z-index: 5;

    transition:
        left 0.1s,
        top 0.1s;
}


/* ==================================================
   虛擬搖桿
================================================== */

#joystick {

    position: absolute;

    right:
        max(25px,
            env(safe-area-inset-right));

    bottom:
        max(30px,
            env(safe-area-inset-bottom));

    width: min(130px,
            27vw);

    height: min(130px,
            27vw);

    min-width: 100px;
    min-height: 100px;

    border-radius: 50%;

    background:
        rgba(255, 250, 238, 0.35);

    border:
        3px solid rgba(75, 64, 51, 0.65);

    z-index: 30;

    touch-action: none;

    user-select: none;

    -webkit-user-select: none;
}


#joystickKnob {

    position: absolute;

    left: 50%;
    top: 50%;

    width: 58px;
    height: 58px;

    margin-left: -29px;
    margin-top: -29px;

    border-radius: 50%;

    background:
        rgba(255, 250, 238, 0.85);

    border: 3px solid #6b5b49;

    box-shadow:
        0 3px 7px rgba(0, 0, 0, 0.25);

    pointer-events: none;
}


/* ==================================================
   搖桿方向
================================================== */

.joystick-direction {

    position: absolute;

    color:
        rgba(61, 51, 40, 0.65);

    font-size: 15px;

    font-weight: bold;

    pointer-events: none;
}


.joystick-up {

    top: 7px;
    left: 50%;

    transform:
        translateX(-50%);
}


.joystick-down {

    bottom: 7px;
    left: 50%;

    transform:
        translateX(-50%);
}


.joystick-left {

    left: 8px;
    top: 50%;

    transform:
        translateY(-50%);
}


.joystick-right {

    right: 8px;
    top: 50%;

    transform:
        translateY(-50%);
}


/* ==================================================
   探索按鈕
================================================== */

.forest-explore-actions {

    position: absolute;

    left:
        max(20px,
            env(safe-area-inset-left));

    bottom:
        max(100px,
            calc(env(safe-area-inset-bottom) + 70px));

    z-index: 20;

    display: flex;

    flex-direction: column;

    gap: 8px;

    align-items: flex-start;
}


.forest-back-button,
.forest-battle-button {

    background:
        rgba(255, 250, 238, 0.92);

    border:
        2px solid #6b5b49;

    border-radius: 10px;

    padding: 10px 14px;

    min-height: 44px;

    font-size: 14px;

    box-shadow:
        0 2px 5px rgba(0, 0, 0, 0.2);
}


/* ==================================================
   戰鬥
================================================== */

.adventure-card {

    background: #fffaf0;

    border: 2px solid #8a7a65;

    border-radius: 15px;

    padding: 20px;

    text-align: center;
}


.enemy {

    font-size: 85px;

    margin: 10px 0;
}


.enemy-name {

    margin: 5px 0 15px;
}


.battle-status {

    display: grid;

    grid-template-columns: 1fr 1fr;

    gap: 10px;

    margin-bottom: 15px;
}


.status-card {

    background: #f1eadc;

    border-radius: 10px;

    padding: 10px;

    text-align: left;

    font-size: 14px;
}


.status-name {

    font-weight: bold;

    margin-bottom: 5px;
}


.hp-bar {

    width: 100%;

    height: 18px;

    background: #ddd;

    border-radius: 10px;

    overflow: hidden;

    margin: 8px 0;
}


.hp-fill {

    height: 100%;

    width: 100%;

    background: #7fa66b;

    transition:
        width 0.3s;
}


.enemy-hp-fill {

    background: #b86f62;
}


.mp-fill {

    background: #7188a8;
}


.battle-log {

    min-height: 80px;

    margin-top: 15px;

    padding: 12px;

    background: #f1eadc;

    border-radius: 10px;

    text-align: left;

    line-height: 1.6;
}


.battle-buttons {

    margin-top: 10px;
}


.battle-small-info {

    font-size: 13px;

    color: #6d6255;

    margin-top: 5px;
}


/* ==================================================
   EXP
================================================== */

.exp-bar {

    width: 100%;

    height: 12px;

    background: #ddd;

    border-radius: 8px;

    overflow: hidden;

    margin-top: 7px;
}


.exp-fill {

    height: 100%;

    width: 0%;

    background: #c49b52;

    transition:
        width 0.3s;
}


/* ==================================================
   升級
================================================== */

.level-up-box {

    margin-top: 15px;

    padding: 12px;

    border-radius: 10px;

    background: #eee1b9;

    border: 2px solid #a88b4d;

    display: none;
}


.level-up-box.show {
    display: block;
}


/* ==================================================
   裝備
================================================== */

.equipment-box {

    margin-top: 20px;

    background: #fffaf0;

    border: 2px solid #8a7a65;

    border-radius: 12px;

    padding: 15px;

    text-align: left;
}


.equipment-title {

    font-weight: bold;

    font-size: 18px;

    margin-bottom: 10px;
}


.equipment-item {

    padding: 8px 0;

    border-bottom:
        1px solid #ddd2bf;
}


.equipment-item:last-child {
    border-bottom: none;
}


/* ==================================================
   角色創建
================================================== */

#characterCreateScreen {

    min-height: 100vh;
    min-height: 100dvh;

    display: none;

    flex-direction: column;

    align-items: center;

    padding: 35px 20px;

    background:
        linear-gradient(180deg,
            #f8f3e8,
            #eee3cf);

    text-align: center;
}


#characterCreateScreen.active {
    display: flex;
}


.create-title {

    font-size: 30px;

    margin: 10px 0 5px;
}


.create-subtitle {

    color: #756858;

    margin-bottom: 20px;
}


/* 角色預覽 */

.character-preview {

    width: 260px;
    height: 300px;

    display: flex;

    align-items: flex-end;

    justify-content: center;

    margin-bottom: 15px;
}


.character-preview img {

    max-width: 100%;
    max-height: 100%;

    object-fit: contain;
}


/* 名字 */

.name-label {

    align-self: flex-start;

    width: 100%;
    max-width: 360px;

    margin-bottom: 7px;

    font-weight: bold;
}


.name-input {

    width: 100%;
    max-width: 360px;

    padding: 13px 15px;

    border: 2px solid #8a7a65;

    border-radius: 10px;

    background: #fffdf7;

    font-size: 17px;

    outline: none;

    margin-bottom: 20px;
}


/* 性別 */

.gender-title {

    font-weight: bold;

    margin-bottom: 10px;
}


.gender-buttons {

    display: flex;

    gap: 15px;

    margin-bottom: 25px;
}


.gender-button {

    width: 120px;

    padding: 12px;

    border-radius: 12px;

    border: 2px solid #8a7a65;

    background: #fffaf0;

    font-size: 17px;

    transition: 0.15s;
}


.gender-button.selected {

    background: #e4d3b5;

    border-color: #4f4235;

    transform: scale(1.03);
}


/* 開始遊戲 */

.start-game-button {

    width: 100%;
    max-width: 360px;

    padding: 15px;

    border-radius: 12px;

    border: 2px solid #5c4d3c;

    background: #d9c39d;

    color: #3d3024;

    font-size: 18px;

    font-weight: bold;
}


.start-game-button:active {

    transform: scale(0.97);
}


/* ==================================================
   手機
================================================== */

@media (max-width: 600px) {

    #game {
        max-width: 100%;
    }


    .player-button {

        width: 58px;
        height: 58px;

        flex-basis: 58px;
    }


    .player-info-mini {

        font-size: 12px;

        padding:
            6px 8px;
    }


    .page-title {

        font-size: 25px;

        margin-bottom: 20px;
    }


    .profile-card {

        padding: 18px;
    }


    .profile-name {

        font-size: 25px;
    }


    .location-list {

        gap: 10px;
    }


    .location-button {

        min-height: 100px;

        font-size: 16px;
    }


    .enemy {

        font-size: 70px;
    }


    .battle-status {

        gap: 7px;
    }


    .status-card {

        padding: 8px;

        font-size: 13px;
    }


    .adventure-card {

        padding: 15px;
    }


    .forest-back-button,
    .forest-battle-button {

        padding:
            9px 11px;

        font-size: 13px;
    }


    #joystick {

        width: 120px;
        height: 120px;

        min-width: 120px;
        min-height: 120px;
    }

}


@media (max-width: 380px) {

    .profile-card {

        padding: 15px;
    }


    .profile-avatar {

        width: 145px;
        height: 145px;
    }


    .enemy {

        font-size: 62px;
    }


    .attribute-row {

        font-size: 14px;
    }


    #forestMiniMap {

        width: 145px;
    }


    #joystick {

        width: 105px;
        height: 105px;

        min-width: 105px;
        min-height: 105px;
    }


    #joystickKnob {

        width: 50px;
        height: 50px;

        margin-left: -25px;
        margin-top: -25px;
    }

}


@media (min-width: 601px) and (max-height: 600px) {

    #forestMiniMap {

        width: 210px;

        top: 15px;
    }


    #joystick {

        width: 110px;
        height: 110px;

        bottom: 20px;
    }


    .forest-explore-actions {

        bottom: 20px;
    }

}


@media (min-width: 1000px) {

    body {

        display: flex;

        justify-content: center;

        align-items: flex-start;
    }


    #game {

        min-height: 100vh;

        box-shadow:
            0 0 25px rgba(0, 0, 0, 0.15);
    }

}


@media (hover: none) and (pointer: coarse) {

    button {
        min-height: 44px;
    }

}


@media (prefers-reduced-motion: reduce) {

    *,
    *::before,
    *::after {

        animation-duration: 0.001ms !important;

        animation-iteration-count: 1 !important;

        transition-duration: 0.001ms !important;
    }

}

/* ==================================================
   戰敗過場
================================================== */

#defeatOverlay {

    position: fixed;

    inset: 0;

    background:
        rgba(30, 25, 20, 0.82);

    z-index: 200;

    display: none;

    align-items: center;

    justify-content: center;

    text-align: center;

    color: #fffaf0;

    pointer-events: none;

}


#defeatOverlay.show {

    display: flex;

}


.defeat-message {

    font-size: 22px;

    line-height: 1.8;

    opacity: 0;

    transform: translateY(8px);

    transition:
        opacity 0.8s ease,
        transform 0.8s ease;

}


#defeatOverlay.show .defeat-message {

    opacity: 1;

    transform: translateY(0);

}


.defeat-sub {

    margin-top: 10px;

    font-size: 15px;

    opacity: 0.7;

}

/* ==================================================
   背包
================================================== */

.inventory-overlay {

    position: fixed;

    inset: 0;

    display: none;

    align-items: center;

    justify-content: center;

    z-index: 1000;

}


.inventory-overlay.show {

    display: flex;

}


.inventory-window {

    width: 85%;

    max-width: 420px;

    padding: 20px;

    border-radius: 20px;

    background: white;

    box-shadow:
        0 8px 30px rgba(0, 0, 0, 0.25);

    max-height: 85vh;
    overflow-y: auto;
    box-sizing: border-box;

}


.inventory-title {

    text-align: center;

    font-size: 24px;

    font-weight: bold;

    margin-bottom: 20px;

}


/* ==================================================
   背包物品格子
================================================== */

.inventory-items {

    display: grid;

    grid-template-columns:
        repeat(4, 1fr);

    gap: 10px;

    width: 100%;

}

/* ==================================================
   背包單格
================================================== */

.inventory-item {

    aspect-ratio: 1 / 1;

    border: 2px solid #8b7355;

    border-radius: 8px;

    background:
        rgba(255, 255, 255, 0.55);

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    position: relative;

    box-sizing: border-box;

}

/* ==================================================
   背包物品圖示
================================================== */

.inventory-icon {

    font-size: 32px;

    line-height: 1;

}


/* ==================================================
   背包物品名稱
================================================== */

.inventory-name {

    font-size: 13px;

    margin-top: 5px;

}


/* ==================================================
   背包物品數量
================================================== */

.inventory-amount {

    position: absolute;

    right: 5px;

    bottom: 4px;

    font-size: 12px;

    font-weight: bold;

}

.inventory-close-button {

    display: block;

    width: 100%;

    margin-top: 20px;

    padding: 12px;

    border: none;

    border-radius: 12px;

    font-size: 18px;

    cursor: pointer;

}

/* ==================================================
   出售數量
================================================== */

.sell-quantity {

    display: flex;

    align-items: center;

    justify-content: center;

    gap: 25px;

    margin: 15px 0;

}


/* ==================================================
   數量按鈕
================================================== */

.quantity-button {

    width: 42px;

    height: 42px;

    border: 2px solid #8b7355;

    border-radius: 8px;

    background: white;

    font-size: 24px;

    font-weight: bold;

}


/* ==================================================
   出售數量文字
================================================== */

#sellQuantity {

    min-width: 35px;

    text-align: center;

    font-size: 20px;

    font-weight: bold;

}

/* ==================================================
   物品資訊視窗
================================================== */

.item-info-overlay {

    position: fixed;

    inset: 0;

    display: none;

    align-items: center;

    justify-content: center;

    background:
        rgba(0, 0, 0, 0.45);

    z-index: 1100;

}


.item-info-overlay.show {

    display: flex;

}


.item-info-window {

    width: 260px;

    padding: 22px;

    border: 3px solid #8b7355;

    border-radius: 12px;

    background: #fffaf0;

    text-align: center;

    box-sizing: border-box;

}


.item-info-icon {

    font-size: 52px;

    margin-bottom: 8px;

}


.item-info-name {

    font-size: 22px;

    font-weight: bold;

    margin-bottom: 12px;

}


.item-info-description {

    font-size: 14px;

    line-height: 1.6;

    margin-bottom: 12px;

}


.item-info-amount {

    font-size: 14px;

    margin-bottom: 18px;

}


.item-info-close-button {

    padding: 8px 24px;

    border: none;

    border-radius: 8px;

    cursor: pointer;

}

/* ==================================================
   使用物品按鈕
================================================== */

.item-use-button {

    padding: 8px 24px;

    margin-right: 8px;

    border: none;

    border-radius: 8px;

    cursor: pointer;

}

/* ==================================================
   🎒 全域背包按鈕
================================================== */

.global-inventory-button {

    position: fixed;

    top: 60px;
    right: 15px;

    width: 45px;
    height: 45px;

    background: rgba(255, 255, 255, 0.9);

    border: 2px solid #333;
    border-radius: 12px;

    font-size: 22px;

    z-index: 1000;

}

/* ==================================================
   冒險者狀態
================================================== */

.adventurer-status {

    margin: 15px 0;

    padding: 12px;

    border: 2px solid #8b7355;

    border-radius: 10px;

    background: #fffaf0;

    line-height: 1.8;

}


/* ==================================================
   公會委託
================================================== */

.guild-quest {

    margin-bottom: 12px;

    padding: 12px;

    border: 2px solid #8b7355;

    border-radius: 10px;

    background: #fffaf0;

    text-align: center;

    cursor: pointer;

}

.guild-quest h3 {

    margin: 0 0 5px 0;

}

.guild-quest p {

    margin: 3px 0;

}


.guild-quest h3 {

    margin-top: 0;

}


.guild-quest p {

    margin: 5px 0;

}

.guild-window {

    max-height: 75vh;

    overflow-y: auto;

}

/* ==================================================
   公會任務視窗
================================================== */

#guildQuestOverlay .inventory-window {

    width: 90%;

    max-width: 420px;

    max-height: 85vh;

    overflow-y: auto;

    box-sizing: border-box;

}

/* ==================================================
   戰鬥勝利 Overlay
================================================== */

.victory-overlay {

    position: fixed;

    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    display: none;

    align-items: center;

    justify-content: center;

    background: rgba(0, 0, 0, 0.45);

    z-index: 99999;

    pointer-events: auto;

}


.victory-overlay.show {

    display: flex;

}


.victory-message {

    text-align: center;

    color: white;

}


.victory-title {

    font-size: 32px;

    font-weight: bold;

    margin-bottom: 20px;

}


#victoryMessageText {

    font-size: 18px;

}

/* ==================================================
   🕐 遊戲時間
================================================== */

#gameTime {

    position: fixed;

    top: 15px;
    right: 15px;

    padding: 8px 12px;

    background: rgba(255, 255, 255, 0.9);

    border: 2px solid #333;
    border-radius: 12px;

    font-size: 14px;
    font-weight: bold;

    z-index: 1000;

}
