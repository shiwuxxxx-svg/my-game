
/* ==================================================
     世界地圖座標系統
================================================== */

const WORLD_MAP_WIDTH = 559;
const WORLD_MAP_HEIGHT = 1001;


function updateWorldMapLocations() {

    const screen =
        document.getElementById("worldScreen");

    const map =
        screen.querySelector(".world-map-image");

    const locations =
        screen.querySelectorAll(".map-location");


    if (!screen || !map) {
        return;
    }


    const screenWidth =
        screen.clientWidth;

    const screenHeight =
        screen.clientHeight;


    /*
       object-fit: cover 的縮放比例
    */
    const scale = Math.max(
        screenWidth / WORLD_MAP_WIDTH,
        screenHeight / WORLD_MAP_HEIGHT
    );


    /*
       圖片實際顯示尺寸
    */
    const displayedWidth =
        WORLD_MAP_WIDTH * scale;

    const displayedHeight =
        WORLD_MAP_HEIGHT * scale;


    /*
       object-position: center center
       所以圖片超出的部分平均裁切
    */
    const offsetX =
        (screenWidth - displayedWidth) / 2;

    const offsetY =
        (screenHeight - displayedHeight) / 2;


    locations.forEach(location => {

        const mapX =
            Number(location.dataset.mapX);

        const mapY =
            Number(location.dataset.mapY);


        /*
           世界地圖座標
           ↓
           實際螢幕座標
        */
        const x =
            mapX * scale + offsetX;

        const y =
            mapY * scale + offsetY;


        location.style.left =
            `${x}px`;

        location.style.top =
            `${y}px`;

    });

}


/* ==================================================
   初始化
================================================== */

function initWorldMap() {

    const map =
        document.querySelector(".world-map-image");


    if (!map) {
        return;
    }


    if (map.complete) {

        updateWorldMapLocations();

    } else {

        map.addEventListener(
            "load",
            updateWorldMapLocations
        );

    }

}


window.addEventListener(
    "load",
    initWorldMap
);


window.addEventListener(
    "resize",
    updateWorldMapLocations
);

/* ==================================================
   裝備
================================================== */

const equipment = {

    weapon: {
        name: "木劍",
        attack: 3
    },

    armor: {
        name: "布衣",
        defense: 1
    }

};

/* ==================================================
   開啟人物介面
================================================== */

function openPlayerScreen(
    previousScreen
) {

    previousPlayerScreen =
        previousScreen;


    showScreen(
        "playerScreen"
    );

}

/* ==================================================
   ⭐ 唯一的玩家資料
================================================== */

const player = {

    name: "",

    gender: "female",

    level: 1,

    exp: 0,

    gold: 100,

    currentHp: 30,

    currentMp: 9,

    attributes: {

        str: 3,
        vit: 3,
        agi: 3,
        int: 3,
        spi: 3

    },

    attributePoints: 0

};

/* ==================================================
   玩家背包
================================================== */

const inventory = {

    herb: 0,

    wood: 0,

    ore: 0,

    fish: 0,

    mushroom: 0

};

/* ==================================================
   增加背包物品
================================================== */

function addItem(
    type,
    amount = 1
) {

    if (
        inventory[type] === undefined
    ) {

        inventory[type] = 0;

    }


    inventory[type] += amount;

}

/* 
==================================================
背包
================================================== */

function openInventory() {

    updateInventoryUI();

    document
        .getElementById(
            "inventoryOverlay"
        )
        .classList.add("show");

}


function closeInventory() {

    document
        .getElementById(
            "inventoryOverlay"
        )
        .classList.remove("show");

}


/* ==================================================
   背包按鈕顯示控制
================================================== */

function updateInventoryButton() {

    const button =
        document.getElementById(
            "globalInventoryButton"
        );


    if (!button) {

        return;

    }


    const characterCreateScreen =
        document.getElementById(
            "characterCreateScreen"
        );

    const forestScreen =
        document.getElementById(
            "forestScreen"
        );

    if (

        characterCreateScreen
        &&
        characterCreateScreen.classList.contains(
            "active"
        )

        ||

        forestScreen
        &&
        forestScreen.classList.contains(
            "active"
        )

    ) {

        button.style.display =
            "none";

    }

    else {

        button.style.display =
            "block";

    }

}
/* ==================================================
   更新背包內容
================================================== */

function updateInventoryUI() {

    const container =
        document.getElementById(
            "inventoryItems"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    const items = [

        {
            type: "herb",
            name: "藥草",
            icon: "🌿"
        },

        {
            type: "wood",
            name: "木材",
            icon: "🪵"
        },

        {
            type: "ore",
            name: "礦石",
            icon: "🪨"
        },

        {
            type: "fish",
            name: "魚",
            icon: "🐟"
        },

        {
            type: "mushroom",
            name: "蘑菇",
            icon: "🍄"
        }

    ];


    /* ==============================================
       有物品的才放進背包
    ============================================== */

    const ownedItems =
        items.filter(function (item) {

            return inventory[item.type] > 0;

        });


    /* ==============================================
       先建立 16 個空格
    ============================================== */

    for (
        let i = 0;
        i < 16;
        i++
    ) {

        const element =
            document.createElement("div");


        element.className =
            "inventory-item";


        /* 有物品就放進這一格 */

        if (
            ownedItems[i]
        ) {

            const item =
                ownedItems[i];


            element.innerHTML =

                "<div class='inventory-icon'>"
                + item.icon
                + "</div>"

                +

                "<div class='inventory-name'>"
                + item.name
                + "</div>"

                +

                "<div class='inventory-amount'>"
                + "× "
                + inventory[item.type]
                + "</div>";

            element.onclick = function () {

                openItemInfo(item);

            };

        }


        container.appendChild(
            element
        );

    }

}

/* ==================================================
   目前查看的物品
================================================== */

let selectedInventoryItem = null;

/* ==================================================
   開啟物品資訊
================================================== */

function openItemInfo(item) {

    selectedInventoryItem = item;

    const overlay =
        document.getElementById(
            "itemInfoOverlay"
        );


    document.getElementById(
        "itemInfoIcon"
    ).textContent =
        item.icon;


    document.getElementById(
        "itemInfoName"
    ).textContent =
        item.name;


    document.getElementById(
        "itemInfoDescription"
    ).textContent =
        getItemDescription(
            item.type
        );


    document.getElementById(
        "itemInfoAmount"
    ).textContent =
        "持有數量：× "
        + inventory[item.type];


    overlay.classList.add(
        "show"
    );

    const useButton =
        document.getElementById(
            "itemUseButton"
        );


    if (
        item.type === "herb"
    ) {

        useButton.style.display =
            "block";

    }

    else {

        useButton.style.display =
            "none";

    }

}


/* ==================================================
   關閉物品資訊
================================================== */

function closeItemInfo() {

    const overlay =
        document.getElementById(
            "itemInfoOverlay"
        );


    overlay.classList.remove(
        "show"
    );

}

/* ==================================================
使用物品
================================================== */

function useSelectedItem() {

    if (
        !selectedInventoryItem
    ) {

        return;

    }


    const type =
        selectedInventoryItem.type;


    /* ==============================================
       藥草
    ============================================== */

    if (
        type === "herb"
    ) {

        if (
            inventory.herb <= 0
        ) {

            return;

        }


        const stats =
            getPlayerStats();


        const oldHp =
            player.currentHp;


        player.currentHp =
            Math.min(
                stats.maxHp,
                player.currentHp + 10
            );


        inventory.herb--;


        updatePlayerUI();

        updateInventoryUI();


        const recovered =
            player.currentHp -
            oldHp;


        showMessage(
            "🌿 使用了藥草！"
            + " HP 恢復 "
            + recovered
            + "！"
        );


        closeItemInfo();

    }

}

/* ==================================================
   物品說明
================================================== */

function getItemDescription(type) {

    const descriptions = {

        herb:
            "森林中常見的藥草。",

        wood:
            "森林中的木材，可以作為製作材料。",

        ore:
            "從岩壁中採集的礦石。",

        fish:
            "在河岸附近捕獲的魚。",

        mushroom:
            "生長在深處森林中的蘑菇。"

    };


    return (
        descriptions[type]
        ||
        "沒有相關說明。"
    );

}

/* ==================================================
   怪物
================================================== */

const monsters = [

    {
        id: "slime",
        name: "森林史萊姆",
        icon: "🟢",
        hp: 30,
        attack: 7,
        defense: 1,
        speed: 2,
        evasion: 0,
        exp: 10,
        gold: 5
    },

    {
        id: "wolf",
        name: "森林狼",
        icon: "🐺",
        hp: 18,
        attack: 8,
        defense: 2,
        speed: 4,
        evasion: 2,
        exp: 12,
        gold: 7
    },

    {
        id: "bat",
        name: "蝙蝠",
        icon: "🦇",
        hp: 14,
        attack: 5,
        defense: 1,
        speed: 6,
        evasion: 8,
        exp: 11,
        gold: 6
    },

    {
        id: "frog",
        name: "森林青蛙",
        icon: "🐸",
        hp: 20,
        attack: 6,
        defense: 1,
        speed: 3,
        evasion: 5,
        exp: 10,
        gold: 5
    },

    {
        id: "bear",
        name: "森林熊",
        icon: "🐻",
        hp: 45,
        attack: 11,
        defense: 4,
        speed: 2,
        evasion: 0,
        exp: 20,
        gold: 12
    }

];


let currentEnemy = null;

let currentEnemyCount = 1;

let currentEnemies = [];

let targetEnemyIndex = 0;

let attackingEnemyIndex = 0;

let enemyHp = 0;

let battleActive = false;

let battleOver = false;


/* ==================================================
   玩家戰鬥數值
================================================== */

function getPlayerStats() {

    const level = player.level;

    const STR = player.attributes.str;
    const VIT = player.attributes.vit;
    const AGI = player.attributes.agi;
    const INT = player.attributes.int;
    const SPI = player.attributes.spi;


    const maxHp =
        20
        + level * 4
        + VIT * 2;


    const maxMp =
        5
        + level
        + INT;


    const attack =
        STR
        + equipment.weapon.attack;


    const defense =
        Math.floor(VIT / 2)
        + equipment.armor.defense;


    const magicAttack =
        3
        + INT;


    const magicDefense =
        SPI
        + INT / 2;


    const speed =
        AGI;


    const evasion =
        AGI * 0.2;


    return {

        level,
        maxHp,
        maxMp,

        attack,
        defense,

        magicAttack,
        magicDefense,

        speed,
        evasion

    };

}


/* ==================================================
   EXP
================================================== */

function getExpToNextLevel() {

    return player.level * 20;

}


/* ==================================================
   更新玩家 UI
================================================== */

function updatePlayerUI() {

    const stats = getPlayerStats();


    if (player.currentHp > stats.maxHp) {

        player.currentHp =
            stats.maxHp;

    }


    if (player.currentMp > stats.maxMp) {

        player.currentMp =
            stats.maxMp;

    }


    /* 世界地圖 */

    document.getElementById(
        "miniPlayerName"
    ).textContent =
        player.name || "冒險者";


    document.getElementById(
        "miniLevel"
    ).textContent =
        "Lv. " + player.level;


    document.getElementById(
        "miniHp"
    ).textContent =
        "❤️ "
        + player.currentHp
        + " / "
        + stats.maxHp;


    /* 冒險者資料 */

    document.getElementById(
        "profileName"
    ).textContent =
        player.name || "冒險者";


    document.getElementById(
        "profileLevel"
    ).textContent =
        "Lv. " + player.level;


    document.getElementById(
        "profileHp"
    ).textContent =
        "❤️ HP："
        + player.currentHp
        + " / "
        + stats.maxHp;


    document.getElementById(
        "profileMp"
    ).textContent =
        "🔵 MP："
        + player.currentMp
        + " / "
        + stats.maxMp;


    const expNeeded =
        getExpToNextLevel();


    document.getElementById(
        "profileExp"
    ).textContent =
        "✨ EXP："
        + player.exp
        + " / "
        + expNeeded;


    const expPercent =
        Math.min(
            100,
            (player.exp / expNeeded) * 100
        );


    document.getElementById(
        "profileExpFill"
    ).style.width =
        expPercent + "%";


    document.getElementById(
        "profileAttack"
    ).textContent =
        "⚔️ 攻擊力：" + stats.attack;


    document.getElementById(
        "profileDefense"
    ).textContent =
        "🛡️ 防禦力：" + stats.defense;


    document.getElementById(
        "profileMagicAttack"
    ).textContent =
        "🔮 魔法攻擊：" + stats.magicAttack;


    document.getElementById(
        "profileMagicDefense"
    ).textContent =
        "✨ 魔法防禦："
        + stats.magicDefense.toFixed(1);


    document.getElementById(
        "profileSpeed"
    ).textContent =
        "💨 速度：" + stats.speed;


    document.getElementById(
        "profileEvasion"
    ).textContent =
        "🪽 閃避率："
        + stats.evasion.toFixed(1)
        + "%";


    document.getElementById(
        "profileGold"
    ).textContent =
        player.gold;


    /* 屬性 */

    document.getElementById(
        "strValue"
    ).textContent =
        player.attributes.str;


    document.getElementById(
        "vitValue"
    ).textContent =
        player.attributes.vit;


    document.getElementById(
        "agiValue"
    ).textContent =
        player.attributes.agi;


    document.getElementById(
        "intValue"
    ).textContent =
        player.attributes.int;


    document.getElementById(
        "spiValue"
    ).textContent =
        player.attributes.spi;


    document.getElementById(
        "attributePoints"
    ).textContent =
        "可分配點數："
        + player.attributePoints;


    const buttons =
        document.querySelectorAll(
            ".plus-button"
        );


    buttons.forEach(function (button) {

        button.disabled =
            player.attributePoints <= 0;

    });


    updateBattlePlayerUI();

}


/* ==================================================
   戰鬥中的玩家 UI
================================================== */

function updateBattlePlayerUI() {

    const stats =
        getPlayerStats();


    const hpPercent =
        Math.max(
            0,
            Math.min(
                100,
                (player.currentHp / stats.maxHp) * 100
            )
        );


    const mpPercent =
        Math.max(
            0,
            Math.min(
                100,
                (player.currentMp / stats.maxMp) * 100
            )
        );


    const hpText =
        document.getElementById(
            "battlePlayerHp"
        );


    const mpText =
        document.getElementById(
            "battlePlayerMp"
        );


    if (hpText) {

        hpText.textContent =
            "❤️ HP："
            + player.currentHp
            + " / "
            + stats.maxHp;

    }


    if (mpText) {

        mpText.textContent =
            "MP："
            + player.currentMp
            + " / "
            + stats.maxMp;

    }


    const hpFill =
        document.getElementById(
            "battlePlayerHpFill"
        );


    const mpFill =
        document.getElementById(
            "battlePlayerMpFill"
        );


    if (hpFill) {

        hpFill.style.width =
            hpPercent + "%";

    }


    if (mpFill) {

        mpFill.style.width =
            mpPercent + "%";

    }

}


/* ==================================================
   屬性
================================================== */

function addAttribute(attribute) {

    if (player.attributePoints <= 0) {

        return;

    }


    player.attributes[attribute] += 1;

    player.attributePoints -= 1;


    updatePlayerUI();

}


/* ==================================================
   升級
================================================== */

function checkLevelUp() {

    let leveledUp = false;


    while (
        player.exp >= getExpToNextLevel()
    ) {

        const requiredExp =
            getExpToNextLevel();


        player.exp -= requiredExp;

        player.level += 1;

        player.attributePoints += 5;


        const newStats =
            getPlayerStats();


        player.currentHp =
            newStats.maxHp;


        player.currentMp =
            newStats.maxMp;


        leveledUp = true;

    }


    if (leveledUp) {

        updatePlayerUI();


        const levelUpBox =
            document.getElementById(
                "levelUpBox"
            );


        levelUpBox.classList.add(
            "show"
        );


        document.getElementById(
            "battleLog"
        ).innerHTML =
            "🎉 <strong>升級了！</strong><br>"
            + "現在是 Lv."
            + player.level
            + "！<br>"
            + "獲得 5 點屬性點。"
            + "<br>可以打開「冒險者資料」進行配點。";

    }

}


/* ==================================================
   傷害
================================================== */

function calculateDamage(
    attack,
    defense
) {

    const rawDamage =
        (attack - defense)
        * (0.9 + Math.random() * 0.2);


    return Math.max(
        1,
        Math.floor(rawDamage)
    );

}


/* ==================================================
   閃避
================================================== */

function checkEvasion(
    evasionPercent
) {

    return Math.random() * 100
        < evasionPercent;

}

/* ==================================================
   開啟人物介面
================================================== */

function openPlayerScreen(
    previousScreen
) {

    previousPlayerScreen =
        previousScreen;


    showScreen(
        "playerScreen"
    );

}

/* ==================================================
   進入森林
================================================== */

function enterForest() {

    forestHasLeftStart = false;
    forestX = 0;
    forestY = 0;
    forestMoveDistance = 0;

    showScreen(
        "forestExploreScreen"
    );

    resetForestPosition();

}


/* ==================================================
   新戰鬥
================================================== */

function startNewBattle(encounterType) {

    if (encounterType) {

        currentEnemy =
            monsters.find(
                monster =>
                    monster.id === encounterType
            );

    }

    else {

        const index =
            Math.floor(
                Math.random()
                * monsters.length
            );

        currentEnemy =
            monsters[index];

    }

    /* ==================================================
       決定怪物數量
    ================================================== */

    if (currentEnemy.id === "bat") {

        currentEnemyCount =
            determineBatCount();

    }

    else {

        currentEnemyCount = 1;

    }


    enemyHp =
        currentEnemy.hp;


    /* ==================================================
       建立怪物隊伍
    ================================================== */

    currentEnemies = [];

    for (
        let i = 0;
        i < currentEnemyCount;
        i++
    ) {

        currentEnemies.push({

            ...currentEnemy,

            currentHp:
                currentEnemy.hp

        });

    }


    targetEnemyIndex = 0;

    attackingEnemyIndex = 0;

    console.log("遭遇類型：", encounterType);
    console.log("怪物數量：", currentEnemyCount);

    battleActive = true;

    battleOver = false;


    document.getElementById(
        "attackButton"
    ).style.display =
        "block";


    document.getElementById(
        "attackButton"
    ).disabled =
        false;


    document.getElementById(
        "newEnemyButton"
    ).style.display =
        "block";

    document.getElementById(
        "levelUpBox"
    ).classList.remove(
        "show"
    );


    updateEnemyUI();

    updatePlayerUI();


    const playerStats =
        getPlayerStats();


    if (
        currentEnemy.speed
        > playerStats.speed
    ) {

        document.getElementById(
            "battleLog"
        ).innerHTML =
            currentEnemy.icon
            + " "
            + currentEnemy.name
            + " 比你快！<br>"
            + "牠先攻！";


        setTimeout(
            function () {

                enemyAttack();

            },
            500
        );

    }

    else {

        document.getElementById(
            "battleLog"
        ).innerHTML =
            currentEnemy.icon
            + " "
            + currentEnemy.name
            + " 出現了！<br>"
            + "你先攻！";

    }

}


/* ==================================================
   怪物 UI
================================================== */

function updateEnemyUI() {

    if (!currentEnemy) {

        return;

    }

    console.log("UI怪物數量：", currentEnemyCount);

    const enemyIcon =
        document.getElementById(
            "enemyIcon"
        );

    enemyIcon.innerHTML = "";

    for (
        let i = 0;
        i < currentEnemyCount;
        i++
    ) {

        enemyIcon.innerHTML +=
            "<span>"
            + currentEnemy.icon
            + "</span> ";

    }


    document.getElementById(
        "enemyName"
    ).textContent =
        currentEnemy.name
        + " × "
        + currentEnemyCount;

    const targetEnemy =
        currentEnemies[targetEnemyIndex];

    document.getElementById("enemyHpText").textContent =
        "HP：" +
        targetEnemy.currentHp +
        " / " +
        targetEnemy.hp;


    const hpPercent = Math.max(
        0,
        (targetEnemy.currentHp / targetEnemy.hp) * 100
    );


    document.getElementById(
        "enemyHpFill"
    ).style.width =
        hpPercent + "%";


    document.getElementById(
        "enemyStats"
    ).textContent =
        "ATK "
        + currentEnemy.attack
        + "　DEF "
        + currentEnemy.defense
        + "　SPD "
        + currentEnemy.speed
        + "　閃避 "
        + currentEnemy.evasion
        + "%";

}


/* ==================================================
   玩家攻擊
================================================== */

function attackEnemy() {

    if (
        !battleActive
        ||
        battleOver
    ) {

        return;

    }


    const attackButton =
        document.getElementById(
            "attackButton"
        );


    attackButton.disabled =
        true;


    const playerStats =
        getPlayerStats();


    const targetEnemy =
        currentEnemies[targetEnemyIndex];


    if (!targetEnemy) {

        return;

    }


    /* ==================================================
       怪物閃避
    ================================================== */

    if (
        checkEvasion(
            targetEnemy.evasion
        )
    ) {

        document.getElementById(
            "battleLog"
        ).innerHTML =

            "你揮出木劍！<br>"
            + targetEnemy.icon
            + " "
            + targetEnemy.name
            + " 閃開了你的攻擊！";

    }


    /* ==================================================
       造成傷害
    ================================================== */

    else {

        const damage =
            calculateDamage(
                playerStats.attack,
                targetEnemy.defense
            );


        targetEnemy.currentHp -=
            damage;


        if (
            targetEnemy.currentHp < 0
        ) {

            targetEnemy.currentHp = 0;

        }


        enemyHp =
            targetEnemy.currentHp;


        document.getElementById(
            "battleLog"
        ).innerHTML =

            "你對 "
            + targetEnemy.name
            + " 造成了 "
            + "<strong>"
            + damage
            + "</strong>"
            + " 點傷害！";

    }


    updateEnemyUI();


    /* ==================================================
       目前目標死亡
    ================================================== */

    if (
        targetEnemy.currentHp <= 0
    ) {

        document.getElementById(
            "battleLog"
        ).innerHTML =

            targetEnemy.icon
            + " "
            + targetEnemy.name
            + " 被擊倒了！";


        targetEnemyIndex++;


        /* ==============================================
           所有怪物都死了
        ============================================== */

        if (
            targetEnemyIndex
            >=
            currentEnemies.length
        ) {

            winBattle();

            return;

        }


        /* ==============================================
           還有下一隻
        ============================================== */

        enemyHp =
            currentEnemies[
                targetEnemyIndex
            ].currentHp;


        updateEnemyUI();


        document.getElementById(
            "battleLog"
        ).innerHTML =

            targetEnemy.icon
            + " "
            + targetEnemy.name
            + " 被擊倒了！<br>"
            + "下一隻怪物出現！";

    }


    /* ==================================================
       怪物反擊
    ================================================== */

    setTimeout(
        function () {

            enemyAttack();

        },
        500
    );

}


/* ==================================================
   怪物攻擊
================================================== */

function enemyAttack() {

    if (
        !battleActive
        ||
        battleOver
    ) {

        return;

    }


    /* ==================================================
       跳過已經死亡的怪物
    ================================================== */

    while (

        attackingEnemyIndex
        <
        currentEnemies.length

        &&

        currentEnemies[
            attackingEnemyIndex
        ].currentHp <= 0

    ) {

        attackingEnemyIndex++;

    }


    /* ==================================================
       所有怪物都已經攻擊完
    ================================================== */

    if (
        attackingEnemyIndex
        >=
        currentEnemies.length
    ) {

        attackingEnemyIndex = 0;


        document.getElementById(
            "attackButton"
        ).disabled = false;


        return;

    }


    const attackingEnemy =
        currentEnemies[
        attackingEnemyIndex
        ];


    const playerStats =
        getPlayerStats();


    /* ==================================================
       怪物攻擊被玩家閃避
    ================================================== */

    if (
        checkEvasion(
            playerStats.evasion
        )
    ) {

        document.getElementById(
            "battleLog"
        ).innerHTML +=

            "<br>你閃開了 "
            + attackingEnemy.name
            + " 的攻擊！";

    }


    /* ==================================================
       怪物造成傷害
    ================================================== */

    else {

        const damage =
            calculateDamage(
                attackingEnemy.attack,
                playerStats.defense
            );


        player.currentHp -=
            damage;


        if (
            player.currentHp < 0
        ) {

            player.currentHp = 0;

        }


        document.getElementById(
            "battleLog"
        ).innerHTML +=

            "<br>"
            + attackingEnemy.icon
            + " "
            + attackingEnemy.name
            + " 對你造成了 "
            + "<strong>"
            + damage
            + "</strong>"
            + " 點傷害！";

    }


    updatePlayerUI();


    /* ==================================================
       玩家死亡
    ================================================== */

    if (
        player.currentHp <= 0
    ) {

        loseBattle();

        return;

    }


    /* ==================================================
       換下一隻怪物攻擊
    ================================================== */

    attackingEnemyIndex++;


    /* 跳過已死亡的怪物 */

    while (

        attackingEnemyIndex
        <
        currentEnemies.length

        &&

        currentEnemies[
            attackingEnemyIndex
        ].currentHp <= 0

    ) {

        attackingEnemyIndex++;

    }


    /* ==================================================
       還有怪物 → 下一隻攻擊
    ================================================== */

    if (
        attackingEnemyIndex
        <
        currentEnemies.length
    ) {

        setTimeout(
            function () {

                enemyAttack();

            },
            500
        );

    }


    /* ==================================================
       所有怪物攻擊完
    ================================================== */

    else {

        attackingEnemyIndex = 0;


        document.getElementById(
            "attackButton"
        ).disabled = false;

    }

}

/* ==================================================
   戰鬥勝利
================================================== */

function winBattle() {

    battleActive = false;

    battleOver = true;


    document.getElementById(
        "attackButton"
    ).style.display =
        "none";


    document.getElementById(
        "newEnemyButton"
    ).style.display =
        "block";


    const oldLevel =
        player.level;


    const defeatedCount =
        currentEnemies.length;


    const totalExp =
        currentEnemy.exp
        * defeatedCount;


    const totalGold =
        currentEnemy.gold
        * defeatedCount;


    player.exp +=
        totalExp;


    player.gold +=
        totalGold;


    checkLevelUp();


    updatePlayerUI();


    if (
        player.level > oldLevel
    ) {

        document.getElementById(
            "battleLog"
        ).innerHTML =
            "🎉 <strong>戰鬥勝利！</strong><br>"
            + "擊敗了 "
            + currentEnemy.name
            + "！<br>"
            + "獲得 EXP "
            + currentEnemy.exp
            + "、"
            + currentEnemy.gold
            + " G！"
            + "<br><br>"
            + "🎉 升級至 Lv."
            + player.level
            + "！"
            + "<br>"
            + "獲得 5 點屬性點！";

    }

    else {

        document.getElementById("battleLog").innerHTML =
            "🎉 <strong>戰鬥勝利！</strong><br>"
            + "擊敗了 "
            + currentEnemy.name
            + "！<br>"
            + "獲得 EXP "
            + totalExp
            + "、"
            + totalGold
            + " G！";

    }


/* ==================================================
   顯示勝利畫面
================================================== */

const victoryOverlay =
    document.getElementById(
        "victoryOverlay"
    );


const victoryMessage =
    document.getElementById(
        "victoryMessageText"
    );


victoryMessage.innerHTML =
    "點擊任意處繼續";


victoryOverlay.classList.add(
    "show"
);

}

/* ==================================================
   關閉勝利畫面
================================================== */

function continueAfterVictory() {

    const victoryOverlay =
        document.getElementById(
            "victoryOverlay"
        );


    victoryOverlay.classList.remove(
        "show"
    );


    forestEncounterProtection = true;


    showScreen(
        "forestExploreScreen"
    );

}

/* ==================================================
   戰鬥失敗
================================================== */

function loseBattle() {

    battleActive = false;

    battleOver = true;


    document
        .getElementById("attackButton")
        .style.display = "none";


    document
        .getElementById("newEnemyButton")
        .style.display = "none";


    document.getElementById("battleLog").innerHTML =
        "💦 你失去了意識……";


    const overlay =
        document.getElementById("defeatOverlay");


    const message =
        document.getElementById("defeatMessageText");


    message.textContent =
        "你失去了意識……";


    overlay.classList.add("show");


    /* --------------------------------
       第一段過場
    -------------------------------- */

    setTimeout(function () {

        message.textContent =
            "……";

    }, 1200);


    /* --------------------------------
       進入病院
    -------------------------------- */

    setTimeout(function () {

        const stats =
            getPlayerStats();


        player.currentHp =
            stats.maxHp;


        player.currentMp =
            stats.maxMp;


        updatePlayerUI();


        showScreen("hospitalScreen");


        overlay.classList.remove("show");


        setTimeout(function () {

            showMessage(
                "你在病院醒了過來。"
                + " HP 與 MP 已完全恢復！"
            );

        }, 300);

    }, 2200);

}

/* ==================================================
   離開戰鬥
================================================== */

function leaveBattle() {

    battleActive = false;

    battleOver = true;


    showScreen(
        "worldScreen"
    );

    updatePlayerUI();

}


/* ==================================================
   休息
================================================== */

function rest() {

    const stats =
        getPlayerStats();


    player.currentHp =
        stats.maxHp;


    player.currentMp =
        stats.maxMp;


    updatePlayerUI();


    showMessage(
        "你舒服地休息了一會兒！"
        + " HP 與 MP 已完全恢復！"
    );

}

/* ==================================================
   病院休養
================================================== */

function restAtHospital() {

    const stats =
        getPlayerStats();


    player.currentHp =
        stats.maxHp;


    player.currentMp =
        stats.maxMp;


    updatePlayerUI();


    showMessage(
        "你在病院好好休息了一會兒！"
        + " HP 與 MP 已完全恢復！"
    );

}

/* ==================================================
   畫面切換
================================================== */

function showScreen(screenId) {

    const screens =
        document.querySelectorAll(
            ".screen"
        );


    screens.forEach(
        function (screen) {

            screen.classList.remove(
                "active"
            );

        }
    );


    const target =
        document.getElementById(
            screenId
        );


    if (!target) {
        return;
    }


    target.classList.add(
        "active"
    );


    window.scrollTo(
        0,
        0
    );


    updatePlayerUI();
    updateInventoryButton();


    /* ==================================================
       世界地圖顯示後重新計算地點位置
    ================================================== */

    if (screenId === "worldScreen") {

        requestAnimationFrame(
            function () {

                updateWorldMapLocations();

            }
        );

    }

}


/* ==================================================
   訊息
================================================== */

function showMessage(message) {

    document.getElementById(
        "messageText"
    ).textContent = message;

    document.getElementById(
        "messageBox"
    ).classList.add("show");

}

function showMessage(message) {

    document.getElementById(
        "messageText"
    ).textContent = message;

    document.getElementById(
        "messageBox"
    ).classList.add("show");


    /* 防止開啟提示的那一下點擊，
       立刻又把提示關掉 */

    messageClickReady = false;

    setTimeout(function () {

        messageClickReady = true;

    }, 100);

}

function hideMessage() {

    document.getElementById(
        "messageBox"
    ).classList.remove(
        "show"
    );

}

/* ==================================================
   提示訊息：點擊任意位置關閉
================================================== */

let messageClickReady = false;


document.addEventListener(
    "click",
    function () {

        const messageBox =
            document.getElementById("messageBox");

        if (
            messageBox &&
            messageBox.classList.contains("show") &&
            messageClickReady
        ) {

            hideMessage();

        }

    }
);

/* ==================================================
   提示訊息：任意鍵關閉
================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        const messageBox =
            document.getElementById("messageBox");

        if (
            messageBox &&
            messageBox.classList.contains("show")
        ) {

            event.preventDefault();

            hideMessage();

        }

    },
    true
);

/* ==================================================
   森林探索
================================================== */

let forestX = 0;

let forestY = 0;

let forestHasLeftStart = false;

/* ==================================================
   人物介面進入前的畫面
================================================== */

let previousPlayerScreen = "worldScreen";

/* ==================================================
   森林遇敵
================================================== */

let forestEncounterPending = false;

let forestEncounterProtection = false;

let forestMoveDistance = 0;

const forestEncounterDistance = 35;

/* ==================================================
   從遭遇表抽取結果
================================================== */

function rollForestEncounter(region) {

    const roll =
        Math.random() * 100;

    let cumulative = 0;

    for (const encounter of region.encounterTable) {

        cumulative += encounter.chance;

        if (roll < cumulative) {

            return encounter.type;

        }

    }

    return "none";

}


/* ==================================================
   森林遇敵判定
================================================== */

function checkForestEncounter() {

    if (forestEncounterPending) {

        return;

    }


    /* 戰鬥後保護 */

    if (forestEncounterProtection) {

        forestEncounterProtection = false;

        return;

    }


    const region =
        getCurrentForestRegion();


    if (!region) {

        return;

    }


    const result =
        rollForestEncounter(region);


    if (result === "none") {

        return;

    }

    triggerForestEncounter(result);

}

/* ==================================================
   蝙蝠數量
================================================== */

function determineBatCount() {

    const roll =
        Math.random() * 100;


    if (roll < 60) {

        return 1;

    }

    if (roll < 95) {

        return 2;

    }

    return 3;

}

/* ==================================================
   發生遇敵
================================================== */

function triggerForestEncounter(encounterType) {

    forestEncounterPending = true;


    /* 停止搖桿 */

    joystickActive = false;

    joystickPointerId = null;

    resetJoystick();


    /* 顯示提示 */

    showMessage(
        "⚠️ 有東西靠近了……"
    );


    setTimeout(function () {

        hideMessage();

        startBattleFromForest(encounterType);

        forestEncounterPending = false;

    }, 700);

}

const forestMinX = -100;
const forestMaxX = 100;

const forestMinY = 0;
const forestMaxY = 136;

/* ==================================================
   森林畫面更新
================================================== */

function updateForestPosition() {

    const far =
        document.getElementById(
            "forestFar"
        );


    const mid =
        document.getElementById(
            "forestMid"
        );


    const front =
        document.getElementById(
            "forestFront"
        );


    far.style.transform =
        "translate(-50%, -50%) "
        + "translate("
        + (forestX * 0.18)
        + "px, "
        + (forestY * 0.18)
        + "px)";


    mid.style.transform =
        "translate(-50%, -50%) "
        + "translate("
        + (forestX * 0.45)
        + "px, "
        + (forestY * 0.45)
        + "px)";


    front.style.transform =
        "translate(-50%, -50%) "
        + "translate("
        + (forestX * 0.8)
        + "px, "
        + (forestY * 0.8)
        + "px)";

}


/* ==================================================
   重設森林
================================================== */

function resetForestPosition() {

    forestX = 0;

    forestY = 0;

    forestMoveDistance = 0;

    forestEncounterPending = false;

    updateForestPosition();

    updateMiniMapPosition();

}

/* ==================================================
   移動森林
================================================== */

function moveForest(
    directionX,
    directionY
) {

    /* ==============================================
       移動座標
    ============================================== */

    forestX += directionX;

    forestY += directionY;


    /* ==============================================
       地圖邊界
       
       X：-100 ～ +100
       Y：0 ～ +136
    ============================================== */

    forestX =
        Math.max(
            forestMinX,
            Math.min(
                forestMaxX,
                forestX
            )
        );


    forestY =
        Math.max(
            forestMinY,
            Math.min(
                forestMaxY,
                forestY
            )
        );


    /* ==============================================
       更新森林畫面
    ============================================== */

    updateForestPosition();

    updateMiniMapPosition();

    checkDeepWorldEntrance();

    checkForestStartPoint();

    checkForestGatherPoint();

    /* ==============================================
       累積實際移動距離
    ============================================== */

    forestMoveDistance +=
        Math.sqrt(
            directionX * directionX
            +
            directionY * directionY
        );

    /* ==============================================
       累積到 40 單位後進行一次遇敵判定
    ============================================== */

    if (
        forestMoveDistance
        >= forestEncounterDistance
    ) {

        forestMoveDistance = 0;

        checkForestEncounter();

    }


    /* ==============================================
       玩家移動動畫
    ============================================== */

    const playerImage =
        document.getElementById(
            "explorePlayer"
        );


    if (
        Math.abs(directionX)
        +
        Math.abs(directionY)
        > 0
    ) {

        playerImage.classList.add(
            "moving"
        );

    }

}

/* ==================================================
   小地圖
================================================== */

function updateMiniMapPosition() {

    const miniPlayer =
        document.getElementById(
            "miniMapPlayer"
        );


    if (!miniPlayer) {

        return;

    }


    /*
       森林：
       X -100 ～ +100
       Y 0 ～ 136
 
       小地圖：
       X 約 8% ～ 92%
       Y 約 95% ～ 8%
    */


    const mapX =
        8
        +
        (
            (forestX - forestMinX)
            /
            (forestMaxX - forestMinX)
        )
        * 84;


    const mapY =
        95
        -
        (
            (forestY - forestMinY)
            /
            (forestMaxY - forestMinY)
        )
        * 87;


    miniPlayer.style.left =
        mapX + "%";


    miniPlayer.style.top =
        mapY + "%";

}

/* ==================================================
   小地圖放大
================================================== */

const forestMiniMap =
    document.getElementById("forestMiniMap");


const forestMapOverlay =
    document.getElementById("forestMapOverlay");


forestMiniMap.addEventListener(
    "click",
    function () {

        forestMapOverlay.classList.add("show");

    }
);


/* ==================================================
   關閉森林地圖
================================================== */

function closeForestMap() {

    forestMapOverlay.classList.remove("show");

}

/* ==================================================
   地圖Ⅰ：森林區域
================================================== */

/*
   座標：
   X：-100 ～ +100
   Y：0 ～ 136
 
   (0,0) = 玩家起點
*/


const forestRegions = {

    /* ==============================================
       ① 入口草原
    ============================================== */

    entrance: {

        name: "入口草原",

        encounterTable: [
            { type: "none", chance: 70 },
            { type: "slime", chance: 30 }
        ],

        polygon: [
            [-68, 0],
            [65, 0],
            [64, 5],
            [53, 12],
            [40, 19],
            [30, 25],
            [27, 35],
            [24, 43],
            [5, 46],
            [-20, 45],
            [-55, 48],
            [-62, 42],
            [-67, 32],
            [-70, 20],
            [-68, 8]
        ]

    },


    /* ==============================================
       ② 中央森林
    ============================================== */

    centralForest: {

        name: "中央森林",

        encounterTable: [
            { type: "none", chance: 55 },
            { type: "slime", chance: 25 },
            { type: "bat", chance: 15 },
            { type: "wolf", chance: 5 }
        ],

        polygon: [
            [-55, 48],
            [-50, 57],
            [-43, 69],
            [-35, 80],
            [-29, 83],
            [-10, 83],
            [5, 82],
            [20, 81],
            [31, 76],
            [46, 69],
            [43, 60],
            [45, 48],
            [27, 46],
            [5, 45],
            [-20, 45],
            [-38, 46]
        ]

    },


    /* ==============================================
       ③ 左側河岸
    ============================================== */

    riverBank: {

        name: "左側河岸",

        encounterTable: [
            { type: "none", chance: 65 },
            { type: "frog", chance: 35 }
        ],

        polygon: [
            [-100, 68],
            [-94, 88],
            [-82, 103],
            [-65, 109],
            [-50, 110],
            [-43, 96],
            [-35, 80],
            [-43, 69],
            [-50, 57],
            [-55, 48],
            [-62, 42],
            [-70, 30],
            [-80, 35],
            [-92, 48],
            [-100, 62]
        ]

    },


    /* ==============================================
       ④ 右側岩壁
    ============================================== */

    rockWall: {

        name: "右側岩壁",

        encounterTable: [
            { type: "none", chance: 55 },
            { type: "slime", chance: 25 },
            { type: "bat", chance: 20 }
        ],

        polygon: [
            [30, 82],
            [45, 88],
            [70, 100],
            [86, 98],
            [100, 88],
            [105, 72],
            [103, 55],
            [96, 42],
            [83, 32],
            [68, 25],
            [55, 27],
            [49, 36],
            [45, 48],
            [46, 69],
            [40, 76]
        ]

    },


    /* ==============================================
       ⑤ 深處深林
    ============================================== */

    deepForest: {

        name: "深處深林",

        encounterTable: [
            { type: "none", chance: 35 },
            { type: "slime", chance: 20 },
            { type: "bat", chance: 20 },
            { type: "wolf", chance: 18 },
            { type: "bear", chance: 7 }
        ],

        polygon: [
            [-50, 110],
            [-43, 120],
            [-32, 131],
            [-20, 136],
            [5, 136],
            [25, 133],
            [45, 126],
            [63, 116],
            [73, 105],
            [70, 96],
            [52, 91],
            [45, 88],
            [30, 82],
            [20, 81],
            [5, 82],
            [-10, 83],
            [-29, 83],
            [-35, 80],
            [-43, 96]
        ]

    }

};

/* ==================================================
   地圖Ⅰ 採集點
================================================== */

const forestGatherPoints = [

    /* ① 入口草原：藥草 */

    {
        type: "herb",
        x: 9,
        y: 34
    },

    {
        type: "herb",
        x: 44,
        y: 39
    },


    /* ② 中央森林：木材 */

    {
        type: "wood",
        x: -32,
        y: 64
    },

    {
        type: "wood",
        x: -15,
        y: 73
    },


    /* ③ 右側岩壁：礦石 */

    {
        type: "ore",
        x: 43,
        y: 45
    },

    {
        type: "ore",
        x: 65,
        y: 80
    },

    {
        type: "ore",
        x: 70,
        y: 62
    },


    /* ④ 左側河岸：魚 */

    {
        type: "fish",
        x: -79,
        y: 80
    },

    {
        type: "fish",
        x: -65,
        y: 87
    },


    /* ⑤ 深處深林 */

    {
        type: "mushroom",
        x: -12,
        y: 127
    },

    {
        type: "wood",
        x: 11,
        y: 115
    },

    {
        type: "herb",
        x: -8,
        y: 101
    }

];

/* ==================================================
   已採集的採集點
================================================== */

let gatheredForestPoints = [];
let forestGatherCooldown = [];

/* ==================================================
   採集判定
================================================== */

const forestGatherDistance = 5;

/* ==================================================
   檢查森林採集點
================================================== */

function checkForestGatherPoint() {

    for (
        let i = 0;
        i < forestGatherPoints.length;
        i++
    ) {

        /* 已經採集過 */

        if (
            gatheredForestPoints.includes(i)
        ) {

            continue;

        }


        const point =
            forestGatherPoints[i];


        const dx =
            forestX -
            point.x;


        const dy =
            forestY -
            point.y;


        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        /*
           離開採集點後
           解除取消後的冷卻
        */

        if (
            distance >
            forestGatherDistance
        ) {

            forestGatherCooldown[i] =
                false;

            continue;

        }


        /*
           還在取消後的冷卻範圍
        */

        if (
            forestGatherCooldown[i]
        ) {

            continue;

        }


        triggerForestGather(
            point,
            i
        );

        return;

    }

}

/* ==================================================
   發現採集物
================================================== */

function triggerForestGather(
    point,
    index
) {

    /* 停止鍵盤持續移動 */

    keyboardKeys["arrowup"] = false;
    keyboardKeys["arrowdown"] = false;
    keyboardKeys["arrowleft"] = false;
    keyboardKeys["arrowright"] = false;

    keyboardKeys["w"] = false;
    keyboardKeys["a"] = false;
    keyboardKeys["s"] = false;
    keyboardKeys["d"] = false;


    let itemName = "";


    if (point.type === "herb") {

        itemName = "藥草";

    }

    else if (point.type === "wood") {

        itemName = "木材";

    }

    else if (point.type === "ore") {

        itemName = "礦石";

    }

    else if (point.type === "fish") {

        itemName = "魚";

    }

    else if (point.type === "mushroom") {

        itemName = "蘑菇";

    }


    const collect =
        confirm(
            "你發現了「"
            + itemName
            + "」！\n\n"
            + "要採集嗎？"
        );



    if (collect) {

        gatheredForestPoints.push(
            index
        );


        addItem(
            point.type,
            1
        );


        showMessage(
            "🌿 獲得「"
            + itemName
            + " ×1"
        );

    }

    else {

        /* 不採 → 暫時冷卻 */

        forestGatherCooldown[index] =
            true;

    }

}

/* ==================================================
   深界入口
================================================== */

const deepWorldEntrance = {

    x: 11,
    y: 128,

    radius: 5

};


/* ==================================================
   檢查深界入口
================================================== */

function checkDeepWorldEntrance() {

    const dx =
        forestX -
        deepWorldEntrance.x;


    const dy =
        forestY -
        deepWorldEntrance.y;


    const distance =
        Math.sqrt(
            dx * dx +
            dy * dy
        );


    if (
        distance <=
        deepWorldEntrance.radius
    ) {

        triggerDeepWorldEntrance();

    }

}

/* ==================================================
   深界入口暫時處理
================================================== */

function triggerDeepWorldEntrance() {

    showMessage(
        "🟣 這裡是通往深界的入口"
    );

}

/* ==================================================
   回到森林起點
================================================== */

function checkForestStartPoint() {

    const distance =
        Math.sqrt(
            forestX * forestX
            +
            forestY * forestY
        );


    /* 已經離開起點 */

    if (distance > 5) {

        forestHasLeftStart = true;

        return;

    }


    /* 尚未離開起點 */

    if (!forestHasLeftStart) {

        return;

    }


    /* 回到起點 */

    showForestStartChoice();

    forestHasLeftStart = false;

}

/* ==================================================
   森林起點選擇
================================================== */

function showForestStartChoice() {

    /* 停止鍵盤持續移動 */

    keyboardKeys["arrowup"] = false;
    keyboardKeys["arrowdown"] = false;
    keyboardKeys["arrowleft"] = false;
    keyboardKeys["arrowright"] = false;

    keyboardKeys["w"] = false;
    keyboardKeys["a"] = false;
    keyboardKeys["s"] = false;
    keyboardKeys["d"] = false;


    const leave =
        confirm(
            "你回到了森林入口。\n\n"
            + "要回到世界地圖嗎？\n\n"
            + "按「確定」回到世界地圖\n"
            + "按「取消」繼續探險"
        );


    if (leave) {

        showScreen(
            "worldScreen"
        );

    }

}

/* ==================================================
   判斷座標是否位於多邊形內
================================================== */

function isPointInPolygon(x, y, polygon) {

    let inside = false;

    for (
        let i = 0, j = polygon.length - 1;
        i < polygon.length;
        j = i++
    ) {

        const xi = polygon[i][0];
        const yi = polygon[i][1];

        const xj = polygon[j][0];
        const yj = polygon[j][1];


        const intersect =
            (
                (yi > y) !== (yj > y)
            )
            &&
            (
                x <
                (xj - xi)
                * (y - yi)
                / (yj - yi)
                + xi
            );


        if (intersect) {

            inside = !inside;

        }

    }


    return inside;

}

/* ==================================================
   取得玩家目前所在區域
================================================== */

function getCurrentForestRegion() {

    for (const key in forestRegions) {

        const region =
            forestRegions[key];


        if (
            isPointInPolygon(
                forestX,
                forestY,
                region.polygon
            )
        ) {

            return region;

        }

    }


    return null;

}

/* ==================================================
   虛擬搖桿
================================================== */

const joystick =
    document.getElementById(
        "joystick"
    );


const joystickKnob =
    document.getElementById(
        "joystickKnob"
    );


let joystickActive = false;

let joystickPointerId = null;


function getJoystickRadius() {

    return joystick
        .getBoundingClientRect()
        .width / 2;

}


function getKnobRadius() {

    return Math.min(
        38,
        joystick
            .getBoundingClientRect()
            .width * 0.29
    );

}


/* ==================================================
   搖桿開始
================================================== */

joystick.addEventListener(
    "pointerdown",
    function (event) {

        const forestScreen =
            document.getElementById(
                "forestExploreScreen"
            );


        if (
            !forestScreen.classList.contains(
                "active"
            )
        ) {

            return;

        }


        joystickActive = true;

        joystickPointerId =
            event.pointerId;


        joystick.setPointerCapture(
            event.pointerId
        );


        updateJoystick(
            event.clientX,
            event.clientY
        );


        event.preventDefault();

    }
);


/* ==================================================
   搖桿移動
================================================== */

joystick.addEventListener(
    "pointermove",
    function (event) {

        if (
            !joystickActive
            ||
            event.pointerId
            !== joystickPointerId
        ) {

            return;

        }


        updateJoystick(
            event.clientX,
            event.clientY
        );


        event.preventDefault();

    }
);


/* ==================================================
   搖桿放開
================================================== */

joystick.addEventListener(
    "pointerup",
    function (event) {

        if (
            event.pointerId
            !== joystickPointerId
        ) {

            return;

        }


        joystickActive = false;

        joystickPointerId = null;

        resetJoystick();

    }
);


/* ==================================================
   搖桿取消
================================================== */

joystick.addEventListener(
    "pointercancel",
    function () {

        joystickActive = false;

        joystickPointerId = null;

        resetJoystick();

    }
);


/* ==================================================
   搖桿更新
================================================== */

function updateJoystick(
    clientX,
    clientY
) {

    const rect =
        joystick.getBoundingClientRect();


    const centerX =
        rect.left
        + rect.width / 2;


    const centerY =
        rect.top
        + rect.height / 2;


    let dx =
        clientX - centerX;


    let dy =
        clientY - centerY;


    const distance =
        Math.sqrt(
            dx * dx
            +
            dy * dy
        );


    const knobRadius =
        getKnobRadius();


    if (
        distance > knobRadius
    ) {

        dx =
            dx
            / distance
            * knobRadius;


        dy =
            dy
            / distance
            * knobRadius;

    }


    joystickKnob.style.transform =
        "translate("
        + dx
        + "px, "
        + dy
        + "px)";


    const strength =
        Math.min(
            1,
            distance / knobRadius
        );


    const moveX =
        (dx / knobRadius)
        * strength
        * 0.4;


    const moveY =
        -(dy / knobRadius)
        * strength
        * 0.4;


    moveForest(
        moveX,
        moveY
    );

}


/* ==================================================
   搖桿歸位
================================================== */

function resetJoystick() {

    joystickKnob.style.transform =
        "translate(0px, 0px)";


    const playerImage =
        document.getElementById(
            "explorePlayer"
        );


    playerImage.classList.remove(
        "moving"
    );

}


/* ==================================================
   森林動畫
================================================== */

let forestIdleTime = 0;


function forestMotionEffect() {

    const playerImage =
        document.getElementById(
            "explorePlayer"
        );


    if (!joystickActive) {

        requestAnimationFrame(
            forestMotionEffect
        );

        return;

    }


    forestIdleTime += 0.08;


    const waveX =
        Math.sin(
            forestIdleTime
        )
        * 8;


    const waveY =
        Math.cos(
            forestIdleTime * 1.3
        )
        * 6;


    const far =
        document.getElementById(
            "forestFar"
        );


    const mid =
        document.getElementById(
            "forestMid"
        );


    const front =
        document.getElementById(
            "forestFront"
        );


    far.style.transform =
        "translate(-50%, -50%) "
        + "translate("
        + (
            forestX * 0.18
            +
            waveX * 0.3
        )
        + "px, "
        + (
            forestY * 0.18
            +
            waveY * 0.3
        )
        + "px)";


    mid.style.transform =
        "translate(-50%, -50%) "
        + "translate("
        + (
            forestX * 0.45
            +
            waveX * 0.6
        )
        + "px, "
        + (
            forestY * 0.45
            +
            waveY * 0.6
        )
        + "px)";


    front.style.transform =
        "translate(-50%, -50%) "
        + "translate("
        + (
            forestX * 0.8
            +
            waveX
        )
        + "px, "
        + (
            forestY * 0.8
            +
            waveY
        )
        + "px)";


    requestAnimationFrame(
        forestMotionEffect
    );

}


forestMotionEffect();


/* ==================================================
   從森林進入戰鬥
================================================== */

function startBattleFromForest(encounterType) {

    resetJoystick();

    showScreen(
        "forestScreen"
    );

    startNewBattle(
        encounterType
    );

}


/* ==================================================
   離開森林
================================================== */

function leaveForestExplore() {

    resetJoystick();

    resetForestPosition();

    showScreen(
        "worldScreen"
    );

}


/* ==================================================
   電腦鍵盤
================================================== */

const keyboardKeys = {};


document.addEventListener(
    "keydown",
    function (event) {

        const forestScreen =
            document.getElementById(
                "forestExploreScreen"
            );


        if (
            !forestScreen.classList.contains(
                "active"
            )
        ) {

            return;

        }


        const key =
            event.key.toLowerCase();


        if (
            key !== "arrowup"
            &&
            key !== "arrowdown"
            &&
            key !== "arrowleft"
            &&
            key !== "arrowright"
            &&
            key !== "w"
            &&
            key !== "a"
            &&
            key !== "s"
            &&
            key !== "d"
        ) {

            return;

        }


        event.preventDefault();

        keyboardKeys[key] = true;

    }
);


document.addEventListener(
    "keyup",
    function (event) {

        const key =
            event.key.toLowerCase();


        keyboardKeys[key] = false;

    }
);


/* ==================================================
   電腦持續移動
================================================== */

function keyboardForestMovement() {

    const forestScreen =
        document.getElementById(
            "forestExploreScreen"
        );


    if (
        forestScreen.classList.contains(
            "active"
        )
    ) {

        let x = 0;

        let y = 0;


        /* =========================
           左右
        ========================= */

        if (
            keyboardKeys["arrowleft"]
            ||
            keyboardKeys["a"]
        ) {

            x -= 0.3;

        }


        if (
            keyboardKeys["arrowright"]
            ||
            keyboardKeys["d"]
        ) {

            x += 0.3;

        }

        /* =========================
           上下
        ========================= */

        if (
            keyboardKeys["arrowup"]
            ||
            keyboardKeys["w"]
        ) {

            y += 0.3;

        }


        if (
            keyboardKeys["arrowdown"]
            ||
            keyboardKeys["s"]
        ) {

            y -= 0.3;

        }


        /* =========================
           實際移動
        ========================= */

        if (
            x !== 0
            ||
            y !== 0
        ) {

            moveForest(
                x,
                y
            );


            const playerImage =
                document.getElementById(
                    "explorePlayer"
                );


            playerImage.classList.add(
                "moving"
            );

        }

        else if (!joystickActive) {

            const playerImage =
                document.getElementById(
                    "explorePlayer"
                );


            playerImage.classList.remove(
                "moving"
            );

        }

    }


    requestAnimationFrame(
        keyboardForestMovement
    );

}


keyboardForestMovement();


/* ==================================================
   ⭐ 角色創建
================================================== */

function selectGender(gender) {

    player.gender =
        gender;


    const preview =
        document.getElementById(
            "characterPreview"
        );


    const imagePath =
        gender === "male"
            ? "images/player-male.png"
            : "images/player-female.png";


    /* 創建畫面 */

    preview.src =
        imagePath;


    /* 性別按鈕 */

    document.getElementById(
        "femaleButton"
    ).classList.remove(
        "selected"
    );


    document.getElementById(
        "maleButton"
    ).classList.remove(
        "selected"
    );


    if (
        gender === "male"
    ) {

        document.getElementById(
            "maleButton"
        ).classList.add(
            "selected"
        );

    }

    else {

        document.getElementById(
            "femaleButton"
        ).classList.add(
            "selected"
        );

    }

}


/* ==================================================
   ⭐ 建立角色
================================================== */

function createCharacter() {

    const nameInput =
        document.getElementById(
            "playerNameInput"
        );


    const name =
        nameInput.value.trim();


    if (
        name === ""
    ) {

        alert(
            "請先輸入冒險者的名字！"
        );

        return;

    }


    player.name =
        name;


    const imagePath =
        player.gender === "male"
            ? "images/player-male.png"
            : "images/player-female.png";


    /* =========================
       ① 世界地圖頭像
    ========================= */

    document.getElementById(
        "playerAvatar"
    ).src =
        imagePath;


    /* =========================
       ② 冒險者資料立繪
    ========================= */

    document.getElementById(
        "playerProfileAvatar"
    ).src =
        imagePath;


    /* =========================
       ③ 森林探索立繪
    ========================= */

    document.getElementById(
        "explorePlayer"
    ).src =
        imagePath;

    /* =========================
    ④ 森林探索人物按鈕
    ========================= */

    document.getElementById(
        "forestPlayerAvatar"
    ).src =
        imagePath;

    /* =========================
    ④ 森林探索人物頭像
    ========================= */

    document.getElementById(
        "forestPlayerAvatar"
    ).src =
        imagePath;


    /* =========================
    ⑤ 小小鎮人物頭像
    ========================= */

    document.getElementById(
        "townPlayerAvatar"
    ).src =
        imagePath;

    /* =========================
       名字
    ========================= */

    document.getElementById(
        "miniPlayerName"
    ).textContent =
        player.name;


    document.getElementById(
        "profileName"
    ).textContent =
        player.name;


    /* =========================
       儲存
    ========================= */

    localStorage.setItem(
        "littleWorldPlayer",
        JSON.stringify(player)
    );


    updatePlayerUI();


    /* =========================
       進入世界
    ========================= */

    showScreen(
        "worldScreen"
    );

}


/* ==================================================
   初始化
================================================== */

updatePlayerUI();

updateForestPosition();

updateMiniMapPosition();