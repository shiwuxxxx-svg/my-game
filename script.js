
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
   🕐 遊戲時間
================================================== */

const gameTime = {
    day: 1,
    hour: 8,
    minute: 0
};


/* ==================================================
   🕐 增加遊戲時間
================================================== */

function advanceGameTime(minutes) {

    const oldDay =
        gameTime.day;


    gameTime.minute += minutes;


    while (gameTime.minute >= 60) {

        gameTime.minute -= 60;
        gameTime.hour += 1;

    }


    while (gameTime.hour >= 24) {

        gameTime.hour -= 24;
        gameTime.day += 1;

    }


    /*
       如果日期改變
       就讓公會委託系統在下一次使用時
       自動生成新一天的 10 個委託
    */

    if (
        gameTime.day
        !==
        oldDay
    ) {

        guildDailyState.quests = [];

        guildDailyState.rankUpTask = null;

        guildDailyState.rankUpTaskAccepted =
            false;

        adventurerShopDailyPurchase = {};

    }


    updateGameTimeUI();

}

/* ==================================================
   🕐 更新遊戲時間 UI
================================================== */

function updateGameTimeUI() {

    const gameTimeElement =
        document.getElementById("gameTime");


    if (!gameTimeElement) {

        return;

    }


    const currentScreen =
        document.querySelector(".screen.active");


    /* ==============================================
       沒有畫面 / 創角畫面 → 隱藏
    ============================================== */

    if (
        !currentScreen
        ||
        currentScreen.id === "characterCreateScreen"
    ) {

        gameTimeElement.style.display =
            "none";

        return;

    }


    /* ==============================================
       只有這些畫面顯示時間
    ============================================== */

    const showTimeScreens = [

        "worldScreen",
        "townScreen",
        "homeScreen",
        "guildScreen",
        "hospitalScreen",
        "itemShopScreen",
        "weaponShopScreen",
        "tavernScreen",
        "forestExploreScreen"

    ];


    if (
        !showTimeScreens.includes(
            currentScreen.id
        )
    ) {

        gameTimeElement.style.display =
            "none";

        return;

    }


    /* ==============================================
       顯示時間
    ============================================== */

    const hour =
        String(gameTime.hour)
            .padStart(2, "0");


    const minute =
        String(gameTime.minute)
            .padStart(2, "0");


    gameTimeElement.textContent =
        `第 ${gameTime.day} 天　${hour}:${minute}`;


    gameTimeElement.style.display =
        "block";

}


/* ==================================================
   玩家資料
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
   冒險者資料
================================================== */

/*
   冒險者等級與角色 Lv. 完全獨立

   rankIndex：
   0 初心者
   1 見習冒險者
   2 初階冒險者
   3 中階冒險者
   4 資深冒險者
   5 高階冒險者
   6 大師冒險者
   7 傳說中的冒險者
*/

const adventurerRanks = [
    {
        name: "初心者",
        nextExp: 30,
        armband: "🥉"
    },
    {
        name: "見習冒險者",
        nextExp: 60,
        armband: "🟤"
    },
    {
        name: "初階冒險者",
        nextExp: 100,
        armband: "⚪"
    },
    {
        name: "中階冒險者",
        nextExp: 180,
        armband: "🔵"
    },
    {
        name: "資深冒險者",
        nextExp: 300,
        armband: "🟣"
    },
    {
        name: "高階冒險者",
        nextExp: 500,
        armband: "🟡"
    },
    {
        name: "大師冒險者",
        nextExp: 800,
        armband: "🔴"
    },
    {
        name: "傳說中的冒險者",
        nextExp: null,
        armband: "⭐"
    }
];


const adventurer = {
    rankIndex: 0,
    exp: 0,
    rankUpReady: false,
    rankUpTaskAccepted: false,
    rankUpTaskProgress: 0,
    rankUpExploredRegions: []
};

/* ==================================================
   🏅 冒險者升階任務
================================================== */

const rankUpTasks = [

    {
        rankIndex: 0,
        name: "森林的第一步",
        description: "探索迷霧森林的 3 個不同區域。",
        type: "explore",
        target: 3,
        rewardGold: 50
    },

    {
        rankIndex: 1,
        name: "熟悉森林的威脅",
        description: "在迷霧森林討伐 5 隻史萊姆。",
        type: "hunt",
        enemyType: "slime",
        target: 5,
        rewardGold: 80
    },

    {
        rankIndex: 2,
        name: "獨當一面",
        description: "完成 5 次迷霧森林探索，並討伐 5 隻怪物。",
        type: "mixed",
        target: 5,
        rewardGold: 120
    }

];

/* ==================================================
   🏅 接取／完成升階任務
================================================== */

function handleRankUpTask() {

    const task =
        getCurrentRankUpTask();

    if (!task) {
        return;
    }


    /* 尚未接取 */

    if (!adventurer.rankUpTaskAccepted) {

        adventurer.rankUpTaskAccepted =
            true;

        adventurer.rankUpTaskProgress =
            0;

        updateRankUpTaskUI();

        showMessage(
            "🏅 已接取升階任務！\n\n"
            + task.name
            + "\n\n"
            + task.description
        );

        return;
    }


    /* 已接取，但尚未完成 */

    if (
        (adventurer.rankUpTaskProgress || 0)
        < task.target
    ) {

        showMessage(
            "目前還無法升階。\n\n"
            + "升階任務進度："
            + (adventurer.rankUpTaskProgress || 0)
            + " / "
            + task.target
        );

        return;
    }


    /* 完成升階 */

    const oldRank =
        getAdventurerRank();

    const oldRankName =
        oldRank.name;


    adventurer.rankIndex++;

    adventurer.exp = 0;

    adventurer.rankUpReady =
        false;

    adventurer.rankUpTaskAccepted =
        false;

    adventurer.rankUpTaskProgress =
        0;


    player.gold +=
        task.rewardGold;


    updateAdventurerUI();
    updateRankUpTaskUI();
    updatePlayerUI();


    const newRank =
        getAdventurerRank();


    showMessage(
        "🎉 升階成功！\n\n"
        + oldRankName
        + " → "
        + newRank.name
        + "\n\n"
        + "🎖️ 冒險者臂章："
        + newRank.armband
        + "\n"
        + "💰 升階獎勵：+"
        + task.rewardGold
        + " G"
    );

}

/* ==================================================
   🏅 更新升階任務進度
================================================== */

function updateRankUpTaskProgress(amount = 1) {

    if (!adventurer.rankUpTaskAccepted) {
        return;
    }

    const task =
        getCurrentRankUpTask();

    if (!task) {
        return;
    }

    if (adventurer.rankUpTaskProgress === undefined) {
        adventurer.rankUpTaskProgress = 0;
    }

    adventurer.rankUpTaskProgress +=
        amount;

    adventurer.rankUpTaskProgress =
        Math.min(
            adventurer.rankUpTaskProgress,
            task.target
        );

    updateRankUpTaskUI();

}

/* ==================================================
   取得目前階級的升階任務
================================================== */

function getCurrentRankUpTask() {

    return rankUpTasks.find(
        function (task) {

            return (
                task.rankIndex ===
                adventurer.rankIndex
            );

        }
    );

}


/* ==================================================
   更新升階任務畫面
================================================== */

function updateRankUpTaskUI() {

    const box =
        document.getElementById(
            "rankUpTaskBox"
        );

    if (!box) {
        return;
    }


    /*
       還沒達到升階條件
       → 不顯示升階任務
    */

    if (!adventurer.rankUpReady) {

        box.style.display = "none";

        return;

    }


    const task =
        getCurrentRankUpTask();


    if (!task) {

        box.style.display = "none";

        return;

    }


    box.style.display = "block";


    document.getElementById(
        "rankUpTaskName"
    ).textContent =
        "📜 " + task.name;


    document.getElementById(
        "rankUpTaskDescription"
    ).textContent =
        task.description;


    const progressElement =
        document.getElementById(
            "rankUpTaskProgress"
        );


    if (
        task.type === "explore"
    ) {

        progressElement.textContent =
            (
                adventurer.rankUpTaskProgress
                || 0
            )
            + " / "
            + task.target;

    }
    else {

        progressElement.textContent =
            (
                adventurer.rankUpTaskProgress
                || 0
            )
            + " / "
            + task.target;

    }


    const button =
        document.getElementById(
            "rankUpTaskButton"
        );


    if (!adventurer.rankUpTaskAccepted) {

        button.textContent =
            "接取升階任務";

        button.disabled =
            false;

    }
    else {

        button.textContent =
            "進行升階";

        button.disabled =
            (
                adventurer.rankUpTaskProgress
                || 0
            ) < task.target;

    }

}


/* ==================================================
   取得目前冒險者等級
================================================== */

function getAdventurerRank() {

    return adventurerRanks[
        adventurer.rankIndex
    ];

}


/* ==================================================
   取得目前冒險者等級名稱
================================================== */

function getAdventurerRankName() {

    return getAdventurerRank().name;

}


/* ==================================================
   取得冒險者下一階所需經驗
================================================== */

function getAdventurerNextExp() {

    return getAdventurerRank().nextExp;

}


/* ==================================================
   更新冒險者資料
================================================== */

function updateAdventurerUI() {

    const rankElement =
        document.getElementById(
            "adventurerRank"
        );

    const expElement =
        document.getElementById(
            "adventurerExp"
        );


    const rank =
        getAdventurerRank();


    if (rankElement) {

        rankElement.textContent =
            rank.name;

    }


    if (expElement) {

        if (rank.nextExp === null) {

            expElement.textContent =
                adventurer.exp
                + "（MAX）";

        }

        else {

            expElement.textContent =
                adventurer.exp
                + " / "
                + rank.nextExp;

        }

    }

}


/* ==================================================
   增加冒險者經驗
================================================== */

function addAdventurerExp(amount) {

    if (amount <= 0) {

        return;

    }


    /*
       已經是最高階
    */

    if (
        adventurer.rankIndex
        >=
        adventurerRanks.length - 1
    ) {

        return;

    }


    adventurer.exp += amount;


    checkAdventurerLevel();

    updateAdventurerUI();

}


/* ==================================================
   檢查冒險者是否達到升階條件
================================================== */

function checkAdventurerLevel() {

    const nextExp =
        getAdventurerNextExp();


    /*
       最高階
    */

    if (nextExp === null) {

        return;

    }


    /*
       經驗尚未滿
    */

    if (
        adventurer.exp
        <
        nextExp
    ) {

        return;

    }


    /*
       經驗達標後：

       不直接升階！

       必須先完成升階任務。
    */

    adventurer.exp =
        nextExp;


    adventurer.rankUpReady =
        true;


    updateAdventurerUI();


    showMessage(
        "📜 冒險者經驗已達到升階條件！\n\n"
        + "請回到冒險者公會進行升階任務。"
    );

}



/* ==================================================
   玩家背包
================================================== */

const inventory = {
    herb: 0,
    wood: 0,
    ore: 0,
    fish: 0,
    mushroom: 0,

    redPotion: 0,
    bluePotion: 0
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
   🎒📜 全域按鈕顯示控制
================================================== */

function updateInventoryButton() {

    const inventoryButton =
        document.getElementById(
            "globalInventoryButton"
        );

    const guildQuestButton =
        document.getElementById(
            "globalGuildQuestButton"
        );


    const currentScreen =
        document.querySelector(".screen.active");


    /* 沒有目前畫面 */

    if (!currentScreen) {

        if (inventoryButton) {
            inventoryButton.style.display = "none";
        }

        if (guildQuestButton) {
            guildQuestButton.style.display = "none";
        }

        return;

    }


    /* 創角畫面、戰鬥畫面不顯示 */

    const hideGlobalButtons =
        currentScreen.id === "characterCreateScreen" ||
        currentScreen.id === "forestScreen";


    if (inventoryButton) {

        inventoryButton.style.display =
            hideGlobalButtons
                ? "none"
                : "block";

    }


    if (guildQuestButton) {

        guildQuestButton.style.display =
            hideGlobalButtons
                ? "none"
                : "block";

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
        },

        {
            type: "redPotion",
            name: "小紅藥水",
            icon: "🧪"
        },

        {
            type: "bluePotion",
            name: "小藍藥水",
            icon: "🔵"
        },

        {
            type: "bandage",
            name: "初級繃帶",
            icon: "🩹"
        },

        {
            type: "travelFood",
            name: "旅行糧食",
            icon: "🍞"
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
        item.type === "herb" ||
        item.type === "redPotion" ||
        item.type === "bluePotion"
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


    const stats =
        getPlayerStats();


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


    /* ==============================================
       小紅藥水
    ============================================== */

    else if (
        type === "redPotion"
    ) {

        if (
            inventory.redPotion <= 0
        ) {

            return;

        }


        const oldHp =
            player.currentHp;


        player.currentHp =
            Math.min(
                stats.maxHp,
                player.currentHp + 20
            );


        inventory.redPotion--;


        updatePlayerUI();

        updateInventoryUI();


        const recovered =
            player.currentHp -
            oldHp;


        showMessage(
            "🧪 使用了小紅藥水！"
            + " HP 恢復 "
            + recovered
            + "！"
        );


        closeItemInfo();

    }


    /* ==============================================
       小藍藥水
    ============================================== */

    else if (
        type === "bluePotion"
    ) {

        if (
            inventory.bluePotion <= 0
        ) {

            return;

        }


        const oldMp =
            player.currentMp;


        player.currentMp =
            Math.min(
                stats.maxMp,
                player.currentMp + 10
            );


        inventory.bluePotion--;


        updatePlayerUI();

        updateInventoryUI();


        const recovered =
            player.currentMp -
            oldMp;


        showMessage(
            "🔵 使用了小藍藥水！"
            + " MP 恢復 "
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
   購買物品
================================================== */

function buyItem(itemType) {

    const itemPrice = 20;

    const itemNames = {
        redPotion: "小紅藥水",
        bluePotion: "小藍藥水"
    };

    const itemName =
        itemNames[itemType];

    if (!itemName) {
        return;
    }

    if (player.gold < itemPrice) {

        showMessage(
            "💰 你的錢不夠。\n\n"
            + itemName
            + "需要 "
            + itemPrice
            + " G。"
        );

        return;
    }

    player.gold -= itemPrice;

    inventory[itemType] += 1;

    updatePlayerUI();

    showMessage(
        "🛍️ 購買了「"
        + itemName
        + " ×1」！\n\n"
        + "💰 支付 "
        + itemPrice
        + " G。"
    );
}

/* ==================================================
   開啟購買商品
================================================== */

function openBuyShop() {

    document
        .getElementById("buyShopOverlay")
        .classList.add("show");

}


/* ==================================================
   關閉購買商品
================================================== */

function closeBuyShop() {

    document
        .getElementById("buyShopOverlay")
        .classList.remove("show");

}

/* ==================================================
   出售物品價格
================================================== */

const sellPrices = {

    herb: 5,

    wood: 4,

    ore: 6,

    fish: 5,

    mushroom: 5,

    redPotion: 10,

    bluePotion: 10

};

/* ==================================================
   開啟出售商店
================================================== */

function openSellShop() {

    const container =
        document.getElementById(
            "sellShopItems"
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
        },

        {
            type: "redPotion",
            name: "小紅藥水",
            icon: "🧪"
        },

        {
            type: "bluePotion",
            name: "小藍藥水",
            icon: "🔵"
        }

    ];

    // 建立 16 格
    for (let i = 0; i < 16; i++) {

        const element =
            document.createElement("div");

        element.className =
            "inventory-item";

        // 只有有持有的物品才放進格子
        const item =
            items.filter(function (item) {
                return inventory[item.type] > 0;
            })[i];

        if (item) {

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

            element.onclick =
                function () {

                    sellItem(item.type);

                };
        }

        container.appendChild(element);
    }

    document
        .getElementById("sellShopOverlay")
        .classList.add("show");
}

/* ==================================================
   出售物品
================================================== */

let selectedSellItem = null;
let selectedSellAmount = 1;


/* ==================================================
   開啟出售確認
================================================== */

function sellItem(itemType) {

    if (
        !inventory[itemType] ||
        inventory[itemType] <= 0
    ) {
        return;
    }

    const sellPrice =
        sellPrices[itemType];

    if (!sellPrice) {
        return;
    }

    const itemNames = {

        herb: "藥草",

        wood: "木材",

        ore: "礦石",

        fish: "魚",

        mushroom: "蘑菇",

        redPotion: "小紅藥水",

        bluePotion: "小藍藥水"

    };

    const itemIcons = {

        herb: "🌿",

        wood: "🪵",

        ore: "🪨",

        fish: "🐟",

        mushroom: "🍄",

        redPotion: "🧪",

        bluePotion: "🔵"

    };

    selectedSellItem = {

        type: itemType,

        name: itemNames[itemType],

        icon: itemIcons[itemType],

        price: sellPrice

    };

    selectedSellAmount = 1;

    updateSellInfo();

    document
        .getElementById("sellInfoOverlay")
        .classList.add("show");
}

/* ==================================================
   更新出售資訊
================================================== */

function updateSellInfo() {

    if (!selectedSellItem) {
        return;
    }

    const itemType =
        selectedSellItem.type;

    const amount =
        inventory[itemType];

    const price =
        selectedSellItem.price;

    document
        .getElementById("sellInfoIcon")
        .textContent =
        selectedSellItem.icon;

    document
        .getElementById("sellInfoName")
        .textContent =
        selectedSellItem.name;

    document
        .getElementById("sellInfoAmount")
        .textContent =
        "持有數量：× "
        + amount;

    document
        .getElementById("sellInfoPrice")
        .textContent =
        "收購價格："
        + price
        + " G / 個";

    document
        .getElementById("sellQuantity")
        .textContent =
        selectedSellAmount;

    document
        .getElementById("sellTotalPrice")
        .textContent =
        "預計獲得："
        + (price * selectedSellAmount)
        + " G";
}


/* ==================================================
   調整出售數量
================================================== */

function changeSellAmount(change) {

    if (!selectedSellItem) {
        return;
    }

    const maxAmount =
        inventory[selectedSellItem.type];

    selectedSellAmount += change;

    if (selectedSellAmount < 1) {
        selectedSellAmount = 1;
    }

    if (selectedSellAmount > maxAmount) {
        selectedSellAmount = maxAmount;
    }

    updateSellInfo();
}


/* ==================================================
   確認出售
================================================== */

function confirmSellItem() {

    if (!selectedSellItem) {
        return;
    }

    const itemType =
        selectedSellItem.type;

    const amount =
        selectedSellAmount;

    const price =
        selectedSellItem.price;

    if (
        !inventory[itemType] ||
        inventory[itemType] < amount
    ) {
        return;
    }

    const totalPrice =
        price * amount;

    inventory[itemType] -= amount;

    player.gold += totalPrice;

    updatePlayerUI();

    closeSellInfo();

    openSellShop();

    showMessage(
        "💰 賣出了「"
        + selectedSellItem.name
        + " ×"
        + amount
        + "」！\n\n"
        + "獲得 "
        + totalPrice
        + " G。"
    );

    selectedSellItem = null;
    selectedSellAmount = 1;
}


/* ==================================================
   關閉出售確認
================================================== */

function closeSellInfo() {

    document
        .getElementById("sellInfoOverlay")
        .classList.remove("show");

    selectedSellItem = null;
    selectedSellAmount = 1;
}

/* ==================================================
   關閉出售商店
================================================== */

function closeSellShop() {

    document
        .getElementById("sellShopOverlay")
        .classList.remove("show");

}

/* ==================================================
   冒險者公會：每日委託
================================================== */

/*
   委託類型：

   collect  收集
   hunt     討伐
   explore  探索
   rescue   救助
   escort   護送

*/

/* ==================================================
   冒險者商會
================================================== */

function openAdventurerShop() {

    const container =
        document.getElementById(
            "adventurerShopList"
        );

    const goldElement =
        document.getElementById(
            "adventurerShopGold"
        );

    if (!container) return;

    container.innerHTML = "";


    if (goldElement) {

        goldElement.textContent =
            player.gold;

    }


    adventurerShopItems.forEach(
        function (item) {

            const element =
                document.createElement("div");

            element.className =
                "guild-quest";


            element.innerHTML =

                "<h3>"
                + item.icon
                + " "
                + item.name
                + "</h3>"

                +

                "<p>"
                + item.description
                + "</p>"

                +

                "<p>"
                + "💰 "
                + item.price
                + " G"
                + "</p>";


            element.onclick =
                function () {

                    buyAdventurerShopItem(
                        item
                    );

                };


            container.appendChild(
                element
            );

        }
    );


    document
        .getElementById(
            "adventurerShopOverlay"
        )
        .classList.add("show");

}

function closeAdventurerShop() {

    document
        .getElementById(
            "adventurerShopOverlay"
        )
        .classList.remove("show");

}

function buyAdventurerShopItem(item) {

    /*
       每日限購
    */

    const purchased =
        adventurerShopDailyPurchase[item.type] || 0;

    if (purchased >= item.dailyLimit) {

        showMessage(
            "🛒 今天已經達到 "
            + item.name
            + " 的購買上限了。\n\n"
            + "明天再來看看吧！"
        );

        return;

    }


    /*
       Gold 不足
    */

    if (
        player.gold <
        item.price
    ) {

        showMessage(
            "💰 Gold 不足，無法購買。"
        );

        return;

    }


    /*
       扣除 Gold
    */

    player.gold -=
        item.price;


    /*
       加入背包
    */

    if (
        inventory[item.type] === undefined
    ) {

        inventory[item.type] = 0;

    }

    inventory[item.type] += 1;


    /*
       記錄今天已購買
    */

    adventurerShopDailyPurchase[item.type] =
        (adventurerShopDailyPurchase[item.type] || 0) + 1;


    updatePlayerUI();
    updateInventoryUI();


    const goldElement =
        document.getElementById(
            "adventurerShopGold"
        );

    if (goldElement) {

        goldElement.textContent =
            player.gold;

    }


    showMessage(
        "🛒 購買成功！\n\n"
        + item.icon
        + " "
        + item.name
        + " ×1\n"
        + "💰 -"
        + item.price
        + " G"
    );

}

/* ==================================================
   🛒 冒險者商會每日購買紀錄
================================================== */

let adventurerShopDailyPurchase = {};

/* ==================================================
   委託名稱
================================================== */

const guildQuestTemplates = [

    /* =========================
       收集
    ========================= */

    {
        type: "collect",
        rank: "初級",
        name: "收集藥草",
        icon: "🌿",
        itemType: "herb",
        amountMin: 2,
        amountMax: 5,
        goldMin: 15,
        goldMax: 35,
        exp: 10
    },

    {
        type: "collect",
        rank: "初級",
        name: "收集木材",
        icon: "🪵",
        itemType: "wood",
        amountMin: 2,
        amountMax: 5,
        goldMin: 15,
        goldMax: 35,
        exp: 10
    },

    {
        type: "collect",
        rank: "初級",
        name: "收集礦石",
        icon: "🪨",
        itemType: "ore",
        amountMin: 2,
        amountMax: 4,
        goldMin: 18,
        goldMax: 40,
        exp: 12
    },

    {
        type: "collect",
        rank: "初級",
        name: "收集魚",
        icon: "🐟",
        itemType: "fish",
        amountMin: 2,
        amountMax: 4,
        goldMin: 15,
        goldMax: 35,
        exp: 10
    },

    {
        type: "collect",
        rank: "初級",
        name: "收集蘑菇",
        icon: "🍄",
        itemType: "mushroom",
        amountMin: 2,
        amountMax: 4,
        goldMin: 18,
        goldMax: 38,
        exp: 12
    },


    /* =========================
       討伐
    ========================= */

    {
        type: "hunt",
        rank: "初級",
        name: "討伐史萊姆",
        icon: "🟢",
        enemyType: "slime",
        amountMin: 2,
        amountMax: 5,
        goldMin: 20,
        goldMax: 40,
        exp: 12
    },

    {
        type: "hunt",
        rank: "初級",
        name: "討伐蝙蝠",
        icon: "🦇",
        enemyType: "bat",
        amountMin: 2,
        amountMax: 4,
        goldMin: 22,
        goldMax: 45,
        exp: 14
    },

    {
        type: "hunt",
        rank: "初級",
        name: "討伐野狼",
        icon: "🐺",
        enemyType: "wolf",
        amountMin: 1,
        amountMax: 3,
        goldMin: 25,
        goldMax: 50,
        exp: 16
    },

    {
        type: "hunt",
        rank: "初級",
        name: "討伐青蛙",
        icon: "🐸",
        enemyType: "frog",
        amountMin: 2,
        amountMax: 4,
        goldMin: 20,
        goldMax: 40,
        exp: 12
    },

    {
        type: "hunt",
        rank: "初級",
        name: "討伐熊",
        icon: "🐻",
        enemyType: "bear",
        amountMin: 1,
        amountMax: 2,
        goldMin: 35,
        goldMax: 65,
        exp: 20
    },


    /* =========================
       探索
    ========================= */

    {
        type: "explore",
        rank: "初級",
        name: "探索入口草原",
        icon: "🗺️",
        regionKey: "entrance",
        amount: 1,
        goldMin: 15,
        goldMax: 25,
        expMin: 5,
        expMax: 8
    },

    {
        type: "explore",
        rank: "初級",
        name: "探索中央森林",
        icon: "🗺️",
        regionKey: "centralForest",
        amount: 1,
        goldMin: 20,
        goldMax: 30,
        expMin: 6,
        expMax: 10
    },

    {
        type: "explore",
        rank: "初級",
        name: "探索左側河岸",
        icon: "🗺️",
        regionKey: "riverBank",
        amount: 1,
        goldMin: 20,
        goldMax: 30,
        expMin: 6,
        expMax: 10
    },

    {
        type: "explore",
        rank: "初級",
        name: "探索右側岩壁",
        icon: "🗺️",
        regionKey: "rockWall",
        amount: 1,
        goldMin: 20,
        goldMax: 30,
        expMin: 6,
        expMax: 10
    },

    {
        type: "explore",
        rank: "初級",
        name: "探索深處深林",
        icon: "🗺️",
        regionKey: "deepForest",
        amount: 1,
        goldMin: 30,
        goldMax: 45,
        expMin: 10,
        expMax: 15
    },

    /* =========================
       救助
    ========================= */

    {
        type: "rescue",
        rank: "初級",
        name: "尋找迷路的冒險者",
        icon: "🧭",
        amountMin: 1,
        amountMax: 1,
        goldMin: 30,
        goldMax: 50,
        exp: 15
    },


    /* =========================
       護送
    ========================= */

    {
        type: "escort",
        rank: "初級",
        name: "護送商人前往指定地點",
        icon: "🛒",
        destinationRegions: [
            "centralForest",
            "riverBank",
            "rockWall"
        ],
        amountMin: 1,
        amountMax: 1,
        goldMin: 30,
        goldMax: 55,
        exp: 15
    }

];

/* ==================================================
   🛒 冒險者商會商品
================================================== */

const adventurerShopItems = [
    {
        type: "bandage",
        name: "初級繃帶",
        icon: "🩹",
        price: 30,
        dailyLimit: 1,
        description: "戰鬥中每回合恢復少許 HP"
    },
    {
        type: "travelFood",
        name: "旅行糧食",
        icon: "🍞",
        price: 20,
        dailyLimit: 1,
        description: "增加飽食度，並恢復少許 HP"
    }
];

/* ==================================================
   每日公會資料
================================================== */

const guildDailyState = {

    day: 0,

    quests: []

};


/* ==================================================
   隨機整數
================================================== */

function randomInt(min, max) {

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;

}


/* ==================================================
   建立一個新的委託
================================================== */

function createGuildQuest(template, id) {

    const amount =
        template.amount !== undefined
            ? template.amount
            : randomInt(
                template.amountMin,
                template.amountMax
            );


    const gold =
        randomInt(
            template.goldMin,
            template.goldMax
        );

    const exp =
        template.exp !== undefined
            ? template.exp
            : randomInt(
                template.expMin,
                template.expMax
            );


    return {
        id,
        type: template.type,
        rank: template.rank,
        name: template.name,
        icon: template.icon,

        itemType: template.itemType || null,
        enemyType: template.enemyType || null,
        regionKey: template.regionKey || null,

        /* 救助／護送 */
        destinationRegionKey: null,
        destinationX: null,
        destinationY: null,

        amount,
        gold,
        exp,

        progress: 0,

        accepted: false,
        completed: false,
        failed: false,

        /* 護送任務是否已開始 */
        escortStarted: false,

        rescueRegionKey: null,
        rescueX: null,
        rescueY: null,
        rescueStarted: false,

        /* 救助／護送是否已經完成森林階段 */
        forestEventCompleted: false,

        /* 回到小小鎮後是否已觸發完成對話 */
        townCompletionReady: false
    };

}


/* ==================================================
   產生每日 10 個委託
================================================== */

function generateDailyGuildQuests() {

    guildDailyState.quests = [];


    const availableTemplates = [
        ...guildQuestTemplates
    ];


    /*
       洗牌
    */

    for (
        let i = availableTemplates.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );


        [
            availableTemplates[i],
            availableTemplates[j]
        ] =
            [
                availableTemplates[j],
                availableTemplates[i]
            ];

    }


    /*
       每天固定產生 10 個
    */

    for (
        let i = 0;
        i < 10;
        i++
    ) {

        const template =
            availableTemplates[
            i % availableTemplates.length
            ];


        guildDailyState.quests.push(
            createGuildQuest(
                template,
                "guildQuest_"
                + gameTime.day
                + "_"
                + i
            )
        );

    }


    guildDailyState.day =
        gameTime.day;

}


/* ==================================================
   確認每日委託是否需要刷新
================================================== */

function ensureDailyGuildQuests() {

    if (
        guildDailyState.day
        !==
        gameTime.day
    ) {

        generateDailyGuildQuests();

    }


    if (
        guildDailyState.quests.length
        === 0
    ) {

        generateDailyGuildQuests();

    }

}


/* ==================================================
   開啟委託詳細資料
================================================== */

let selectedGuildQuest = null;

let guildQuestInfoFromAccepted = false;

function openGuildQuestInfo(quest) {

    selectedGuildQuest =
        quest;


    const icon =
        document.getElementById(
            "guildQuestInfoIcon"
        );

    const name =
        document.getElementById(
            "guildQuestInfoName"
        );

    const requirement =
        document.getElementById(
            "guildQuestInfoRequirement"
        );

    const owned =
        document.getElementById(
            "guildQuestInfoOwned"
        );

    const reward =
        document.getElementById(
            "guildQuestInfoReward"
        );

    const exp =
        document.getElementById(
            "guildQuestInfoExp"
        );


    if (icon) {

        icon.textContent =
            quest.icon;

    }


    if (name) {

        name.textContent =
            quest.name;

    }


    if (requirement) {

        if (
            quest.type === "collect"
        ) {

            const itemNames = {
                herb: "藥草",
                wood: "木材",
                ore: "礦石",
                fish: "魚",
                mushroom: "蘑菇"
            };


            requirement.textContent =
                "需求："
                + itemNames[
                quest.itemType
                ]
                + " ×"
                + quest.amount;

        }

        else if (
            quest.type === "hunt"
        ) {

            const enemyNames = {
                slime: "史萊姆",
                bat: "蝙蝠",
                wolf: "野狼",
                frog: "青蛙",
                bear: "熊"
            };


            requirement.textContent =
                "需求：討伐 "
                + enemyNames[
                quest.enemyType
                ]
                + " ×"
                + quest.amount;

        }

        else if (
            quest.type === "explore"
        ) {

            requirement.textContent =
                "需求：探索「"
                + forestRegions[quest.regionKey].name
                + "」";

        }

        else if (
            quest.type === "rescue"
        ) {

            requirement.textContent =
                "需求：完成救助事件";

        }

        else if (
            quest.type === "escort"
        ) {

            requirement.textContent =
                "需求：完成護送事件";

        }

    }


    if (owned) {

        if (
            quest.type === "collect"
        ) {

            const ownedAmount =
                inventory[
                quest.itemType
                ] || 0;


            owned.textContent =
                "目前持有：×"
                + ownedAmount;

        }

        else {

            owned.textContent =
                "目前進度："
                + quest.progress
                + " / "
                + quest.amount;

        }

    }


    if (reward) {

        reward.textContent =
            "💰 報酬："
            + quest.gold
            + " G";

    }


    if (exp) {

        exp.textContent =
            "📈 冒險者經驗：+"
            + quest.exp;

    }


    const completeButton =
        document.querySelector(
            "#guildQuestInfoOverlay button"
        );


    if (completeButton) {

        /*
           從「我的委託」進來
           不顯示完成委託按鈕
        */

        if (guildQuestInfoFromAccepted) {

            completeButton.style.display =
                "none";

        }

        else {

            completeButton.style.display =
                "block";


            /*
               已完成
            */

            if (quest.completed) {

                completeButton.textContent =
                    "已完成";

                completeButton.disabled =
                    true;

            }

            /*
               尚未接取
            */

            else if (!quest.accepted) {

                completeButton.textContent =
                    "接取委託";

                completeButton.disabled =
                    false;

            }

            /*
               已接取
            */

            else {

                completeButton.textContent =
                    "完成委託";

                completeButton.disabled =
                    !canCompleteGuildQuest(
                        quest
                    );

            }

        }

    }


    document.getElementById(
        "guildQuestInfoOverlay"
    ).classList.add(
        "show"
    );

}


/* ==================================================
   判斷委託是否可以完成
================================================== */

function canCompleteGuildQuest(quest) {

    if (
        quest.completed
        ||
        quest.failed
        ||
        !quest.accepted
    ) {

        return false;

    }


    /*
       收集
    */

    if (
        quest.type === "collect"
    ) {

        return (
            (
                inventory[
                quest.itemType
                ] || 0
            )
            >=
            quest.amount
        );

    }


    /*
       討伐
    */

    if (
        quest.type === "hunt"
    ) {

        return (
            quest.progress
            >=
            quest.amount
        );

    }


    /*
       探索
    */

    if (
        quest.type === "explore"
    ) {

        return (
            quest.progress
            >=
            quest.amount
        );

    }


    /*
       救助／護送
    */

    if (
        quest.type === "rescue"
        ||
        quest.type === "escort"
    ) {

        return (
            quest.progress
            >=
            quest.amount
        );

    }


    return false;

}


/* ==================================================
   接取／完成委託
================================================== */

function completeSelectedGuildQuest() {

    if (!selectedGuildQuest) {

        return;

    }


    const quest =
        selectedGuildQuest;


    /*
       第一次按：

       接取委託
    */

    if (!quest.accepted) {

        quest.accepted =
            true;

        /* ==================================================
   護送委託：接取時決定目的地
================================================== */

        if (quest.type === "escort") {

            const template =
                guildQuestTemplates.find(
                    t =>
                        t.type === "escort"
                        &&
                        t.name === quest.name
                );

            if (
                template
                &&
                template.destinationRegions
                &&
                template.destinationRegions.length > 0
            ) {

                const regions =
                    template.destinationRegions;

                quest.destinationRegionKey =
                    regions[
                    Math.floor(
                        Math.random()
                        * regions.length
                    )
                    ];

                const point =
                    getRandomPointInRegion(
                        quest.destinationRegionKey
                    );

                if (point) {

                    quest.destinationX =
                        point.x;

                    quest.destinationY =
                        point.y;

                }

            }

        }

        else if (quest.type === "rescue") {

            setupRescueQuest(quest);

        }

        if (quest.type === "collect") {

            quest.progress =
                Math.min(
                    inventory[
                    quest.itemType
                    ] || 0,
                    quest.amount
                );

        }


        /*
           收集任務可以在接取以前
           就已經持有材料。

           所以接取後立即檢查。
        */

        openGuildQuestInfo(
            quest
        );


        let acceptMessage =
            "📜 已接取委託：\n"
            + quest.name;

        if (
            quest.type === "escort"
            &&
            quest.destinationRegionKey
            &&
            forestRegions[quest.destinationRegionKey]
        ) {
            acceptMessage +=
                "\n\n📍 目的地："
                + forestRegions[
                    quest.destinationRegionKey
                ].name;
        }

        showMessage(
            acceptMessage
        );


        return;

    }


    /*
       第二次按：

       完成委託
    */

    if (
        !canCompleteGuildQuest(
            quest
        )
    ) {

        showMessage(
            "目前還無法完成這項委託。"
        );

        return;

    }


    /*
       收集委託：
       扣除材料
    */

    if (
        quest.type === "collect"
    ) {

        inventory[
            quest.itemType
        ] -= quest.amount;


        updateInventoryUI();

    }


    /*
       發放獎勵
    */

    player.gold +=
        quest.gold;


    addAdventurerExp(
        quest.exp
    );


    quest.completed =
        true;


    updatePlayerUI();


    openGuildQuestInfo(
        quest
    );


    showMessage(
        "🎉 委託完成！\n\n"
        + quest.name
        + "\n"
        + "💰 +"
        + quest.gold
        + " G\n"
        + "📈 冒險者經驗 +"
        + quest.exp
    );


    openGuildQuests();

}

function checkTownGuildQuestCompletion() {

    ensureDailyGuildQuests();


    /*
       ==========================================
       找出已完成森林事件、等待回小小鎮回報的委託
       ==========================================
    */

    const forestQuest =
        guildDailyState.quests.find(
            quest =>
                (
                    quest.type === "escort"
                    ||
                    quest.type === "rescue"
                )
                &&
                quest.accepted
                &&
                !quest.completed
                &&
                !quest.failed
                &&
                quest.townCompletionReady
        );


    if (!forestQuest) {
        return;
    }


    /*
       ==========================================
       護送委託
       ==========================================
    */

    if (forestQuest.type === "escort") {

        showMessage(
            "🛒 商人：\n"
            + "謝謝你幫忙護送我！\n\n"
            + "這次的護送順利完成了。\n"
            + "可以回公會回報委託了。"
        );

    }


    /*
       ==========================================
       救助委託
       ==========================================
    */

    else if (forestQuest.type === "rescue") {

        showMessage(
            "🧭 冒險者：\n"
            + "謝謝你把我救出來！\n\n"
            + "我終於可以回去了。\n"
            + "你可以回公會回報委託了。"
        );

    }


    /*
       ==========================================
       避免每次進入小小鎮都重複觸發
       ==========================================
    */

    forestQuest.townCompletionReady =
        false;

}

/* ==================================================
   關閉委託詳細資料
================================================== */

function closeGuildQuestInfo() {

    document.getElementById(
        "guildQuestInfoOverlay"
    ).classList.remove(
        "show"
    );


    selectedGuildQuest =
        null;


    /*
       如果公會委託列表目前是開啟的，
       關閉詳情後立即刷新列表
    */

    const guildOverlay =
        document.getElementById(
            "guildQuestOverlay"
        );


    if (
        guildOverlay
        &&
        guildOverlay.classList.contains("show")
    ) {

        openGuildQuests();

    }

}


/* ==================================================
   關閉公會委託
================================================== */

function closeGuildQuests() {

    document.getElementById(
        "guildQuestOverlay"
    ).classList.remove(
        "show"
    );

}

/* ==================================================
   開啟公會委託
================================================== */

function openGuildQuests() {

    ensureDailyGuildQuests();


    const container =
        document.getElementById(
            "guildQuestList"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    guildDailyState.quests.forEach(
        function (quest) {

            const questElement =
                document.createElement("div");


            questElement.className =
                "guild-quest";


            let statusText =
                "📜 可接取";


            if (quest.completed) {

                statusText =
                    "✅ 已完成";

            }

            else if (quest.failed) {

                statusText =
                    "❌ 已失敗";

            }

            else if (quest.accepted) {

                statusText =
                    "📌 已接取";

            }


            let progressText = "";

            if (quest.type === "collect") {
                const owned = inventory[quest.itemType] || 0;
                const current = Math.min(owned, quest.amount);

                progressText =
                    "<p>進度：" +
                    current +
                    " / " +
                    quest.amount +
                    "</p>";

            } else if (
                quest.type === "hunt"
                || quest.type === "explore"
            ) {
                progressText =
                    "<p>進度：" +
                    quest.progress +
                    " / " +
                    quest.amount +
                    "</p>";
            }


            questElement.innerHTML =

                "<h3>"
                + quest.icon
                + " "
                + quest.name
                + "</h3>"

                +

                "<p>"
                + "🟢 "
                + quest.rank
                + "委託"
                + "</p>"

                +

                progressText

                +

                "<p>"
                + statusText
                + "</p>"

                +

                "<p>"
                + "💰 "
                + quest.gold
                + " G　"
                + "📈 +"
                + quest.exp
                + " 冒險者經驗"
                + "</p>";


            questElement.onclick = function () {
                guildQuestInfoFromAccepted = false;
                openGuildQuestInfo(quest);
            };


            container.appendChild(
                questElement
            );

        }
    );


    document
        .getElementById(
            "guildQuestOverlay"
        )
        .classList.add(
            "show"
        );

}

/* ==================================================
   📜 開啟我的委託
================================================== */

function openAcceptedGuildQuests() {

    ensureDailyGuildQuests();


    const container =
        document.getElementById(
            "acceptedGuildQuestList"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    const acceptedQuests =
        guildDailyState.quests.filter(
            function (quest) {

                return (
                    quest.accepted
                    &&
                    !quest.completed
                    &&
                    !quest.failed
                );

            }
        );


    if (
        acceptedQuests.length === 0
    ) {

        container.innerHTML =
            "<p style=\"text-align:center;\">"
            + "目前沒有已接取的委託。"
            + "</p>";

    }


    acceptedQuests.forEach(
        function (quest) {

            const questElement =
                document.createElement("div");


            questElement.className =
                "guild-quest";


            let current =
                quest.progress;


            if (
                quest.type === "collect"
            ) {

                const owned =
                    inventory[
                    quest.itemType
                    ] || 0;


                current =
                    Math.min(
                        owned,
                        quest.amount
                    );

            }


            questElement.innerHTML =

                "<h3>"
                + quest.icon
                + " "
                + quest.name
                + "</h3>"

                +

                "<p>"
                + "📌 已接取"
                + "</p>"

                +

                "<p>"
                + "進度："
                + current
                + " / "
                + quest.amount
                + "</p>"

                +

                "<p>"
                + "💰 "
                + quest.gold
                + " G　"
                + "📈 +"
                + quest.exp
                + " 冒險者經驗"
                + "</p>";


            questElement.onclick = function () {
                guildQuestInfoFromAccepted = true;
                openGuildQuestInfo(quest);
            };


            container.appendChild(
                questElement
            );

        }
    );


    document
        .getElementById(
            "acceptedGuildQuestOverlay"
        )
        .classList.add(
            "show"
        );

}


/* ==================================================
   關閉我的委託
================================================== */

function closeAcceptedGuildQuests() {

    document
        .getElementById(
            "acceptedGuildQuestOverlay"
        )
        .classList.remove(
            "show"
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

/* ==================================================
   戰鬥道具
================================================== */

/* ==============================================
   開啟戰鬥道具
============================================== */

function openBattleItems() {

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

    const itemButton =
        document.getElementById(
            "itemButton"
        );

    const escapeButton =
        document.getElementById(
            "escapeButton"
        );


    /* 暫停玩家操作 */

    attackButton.disabled = true;
    itemButton.disabled = true;
    escapeButton.disabled = true;


    const container =
        document.getElementById(
            "battleItemList"
        );


    container.innerHTML = "";


    /* ==============================================
       可以在戰鬥中使用的道具
    ============================================== */

    const battleItems = [

        {
            type: "redPotion",
            name: "小紅藥水",
            icon: "🧪",
            description: "恢復 20 HP"
        },

        {
            type: "bluePotion",
            name: "小藍藥水",
            icon: "🔵",
            description: "恢復 10 MP"
        }

    ];


    const usableItems =
        battleItems.filter(function (item) {

            return inventory[item.type] > 0;

        });

    /* ==============================================
   建立道具格子
============================================== */

    const maxSlots = 4;

    for (
        let i = 0;
        i < maxSlots;
        i++
    ) {

        const element =
            document.createElement("div");

        element.className =
            "inventory-item";


        /* 有道具 */

        if (usableItems[i]) {

            const item =
                usableItems[i];


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
                + "</div>"

                +

                "<div class='inventory-description'>"
                + item.description
                + "</div>";


            element.onclick =
                function () {

                    useBattleItem(
                        item.type
                    );

                };

        }

        /* 沒有道具 → 保留空格 */

        else {

            element.classList.add(
                "empty"
            );

        }


        container.appendChild(
            element
        );

    }

    document
        .getElementById(
            "battleItemOverlay"
        )
        .classList.add("show");

}


/* ==============================================
   關閉戰鬥道具
============================================== */

function closeBattleItems() {

    document
        .getElementById(
            "battleItemOverlay"
        )
        .classList.remove("show");


    /* 如果還在戰鬥，就恢復玩家操作 */

    if (
        battleActive
        &&
        !battleOver
    ) {

        document.getElementById(
            "attackButton"
        ).disabled = false;


        document.getElementById(
            "itemButton"
        ).disabled = false;


        document.getElementById(
            "escapeButton"
        ).disabled = false;

    }

}


/* ==============================================
   使用戰鬥道具
============================================== */

function useBattleItem(type) {

    if (
        !battleActive
        ||
        battleOver
    ) {

        return;

    }


    if (
        !inventory[type]
        ||
        inventory[type] <= 0
    ) {

        return;

    }


    const stats =
        getPlayerStats();


    let message = "";


    /* ==============================================
       小紅藥水
    ============================================== */

    if (
        type === "redPotion"
    ) {

        const oldHp =
            player.currentHp;


        player.currentHp =
            Math.min(
                stats.maxHp,
                player.currentHp + 20
            );


        const recovered =
            player.currentHp - oldHp;


        inventory.redPotion--;


        message =
            "🧪 使用了小紅藥水！<br>"
            + "HP 恢復 "
            + "<strong>"
            + recovered
            + "</strong>"
            + "！";

    }


    /* ==============================================
       小藍藥水
    ============================================== */

    else if (
        type === "bluePotion"
    ) {

        const oldMp =
            player.currentMp;


        player.currentMp =
            Math.min(
                stats.maxMp,
                player.currentMp + 10
            );


        const recovered =
            player.currentMp - oldMp;


        inventory.bluePotion--;


        message =
            "🔵 使用了小藍藥水！<br>"
            + "MP 恢復 "
            + "<strong>"
            + recovered
            + "</strong>"
            + "！";

    }


    else {

        return;

    }


    /* 更新玩家狀態 */

    updatePlayerUI();


    updateInventoryUI();


    /* 關閉道具視窗 */

    document
        .getElementById(
            "battleItemOverlay"
        )
        .classList.remove("show");


    /* 顯示戰鬥訊息 */

    document.getElementById(
        "battleLog"
    ).innerHTML =
        message;


    /* ==============================================
       使用道具算一次行動
       → 怪物反擊
    ============================================== */

    setTimeout(
        function () {

            enemyAttack();

        },
        500
    );

}


let currentEnemy = null;

let currentEnemyCount = 1;

let currentEnemies = [];

let targetEnemyIndex = 0;

let attackingEnemyIndex = 0;

let enemyHp = 0;

let battleActive = false;

let battleOver = false;

let currentBattleEnemyType = null;


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
    forestTimeDistance = 0;


    showScreen("forestExploreScreen");
    resetForestPosition();


    /*
       ==========================================
       檢查是否有正在進行的護送委託
       ==========================================
    */

    const escortQuest =
        guildDailyState.quests.find(
            quest =>
                quest.type === "escort"
                &&
                quest.accepted
                &&
                !quest.completed
                &&
                !quest.failed
        );


    /*
       ==========================================
       第一次進入森林
       在入口遇到商人
       ==========================================
    */

    if (
        escortQuest
        &&
        !escortQuest.escortStarted
        &&
        !escortQuest.forestEventCompleted
    ) {

        escortQuest.forestEventCompleted =
            true;

        escortQuest.escortStarted =
            true;


        const destination =
            forestRegions[
            escortQuest.destinationRegionKey
            ];


        if (destination) {

            showMessage(
                "🛒 商人：\n"
                + "你就是公會派來的人嗎？\n\n"
                + "麻煩你護送我到森林裡的"
                + destination.name
                + "。"
            );

        }

    }

    /*
   ==========================================
   檢查是否有正在進行的救助委託
   ==========================================
*/

    const rescueQuest =
        guildDailyState.quests.find(
            quest =>
                quest.type === "rescue"
                &&
                quest.accepted
                &&
                !quest.completed
                &&
                !quest.failed
        );


    /*
       ==========================================
       第一次進入森林
       不在入口直接觸發
       玩家需要自己找到迷路的冒險者
       ==========================================
    */

    if (
        rescueQuest
        &&
        !rescueQuest.rescueStarted
        &&
        !rescueQuest.forestEventCompleted
    ) {

        rescueQuest.rescueStarted =
            true;

    }

}

function setupRescueQuest(quest) {

    const regionKeys = [
        "centralForest",
        "riverBank",
        "rockWall"
    ];

    const regionKey =
        regionKeys[
        Math.floor(
            Math.random() * regionKeys.length
        )
        ];

    const point =
        getRandomPointInRegion(regionKey);

    if (!point) return;

    rescueEventX = point.x;
    rescueEventY = point.y;

    quest.rescueRegionKey =
        regionKey;

    quest.rescueX =
        point.x;

    quest.rescueY =
        point.y;
}

function checkEscortDestination() {

    const escortQuest =
        guildDailyState.quests.find(
            quest =>
                quest.type === "escort"
                &&
                quest.accepted
                &&
                !quest.completed
                &&
                !quest.failed
                &&
                quest.escortStarted
        );

    if (!escortQuest) return;

    if (
        escortQuest.destinationX === null
        ||
        escortQuest.destinationY === null
    ) {
        return;
    }

    const dx =
        forestX - escortQuest.destinationX;

    const dy =
        forestY - escortQuest.destinationY;

    const distance =
        Math.sqrt(
            dx * dx
            +
            dy * dy
        );

    // 距離指定地點 15 以內，就算抵達
    if (distance > 15) {
        return;
    }

    // 護送完成
    escortQuest.progress =
        escortQuest.amount;

    escortQuest.townCompletionReady =
        true;

    escortQuest.escortStarted =
        false;

    showMessage(
        "🛒 商人：\n"
        + "謝謝你送我到這裡！\n\n"
        + "護送成功！"
    );
}

function checkRescueEvent() {

    const rescueQuest =
        guildDailyState.quests.find(
            quest =>
                quest.type === "rescue"
                &&
                quest.accepted
                &&
                !quest.completed
                &&
                !quest.failed
                &&
                quest.rescueStarted
        );

    if (!rescueQuest) return;


    if (
        rescueQuest.rescueX === null
        ||
        rescueQuest.rescueY === null
    ) {
        return;
    }


    const dx =
        forestX -
        rescueQuest.rescueX;

    const dy =
        forestY -
        rescueQuest.rescueY;

    const distance =
        Math.sqrt(
            dx * dx
            +
            dy * dy
        );


    // 距離迷路冒險者 12 以內
    if (distance > 12) {
        return;
    }


    rescueQuest.progress =
        rescueQuest.amount;

    rescueQuest.forestEventCompleted =
        true;

    rescueQuest.rescueStarted =
        false;

    rescueQuest.townCompletionReady =
        true;


    showMessage(
        "🧭 迷路的冒險者：\n"
        + "你也是冒險者嗎？\n\n"
        + "太好了……我在這裡迷路了。\n"
        + "喔!你是公會派來的人。\n"
        + "謝謝你找到我！\n\n"
        + "救助成功！"
    );
}

/* ==================================================
   新戰鬥
================================================== */

function startNewBattle(encounterType) {

    currentBattleEnemyType =
        encounterType;

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
        "escapeButton"
    ).style.display =
        "block";

    document.getElementById(
        "escapeButton"
    ).disabled =
        false;

    document.getElementById(
        "itemButton"
    ).style.display =
        "block";

    document.getElementById(
        "itemButton"
    ).disabled =
        false;

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
   玩家逃跑
================================================== */

function escapeBattle() {

    if (
        !battleActive
        ||
        battleOver
    ) {

        return;

    }


    const escapeButton =
        document.getElementById(
            "escapeButton"
        );


    const attackButton =
        document.getElementById(
            "attackButton"
        );


    /* 防止重複點擊 */

    escapeButton.disabled = true;
    attackButton.disabled = true;


    /* ==================================================
       60% 逃跑成功率
    ================================================== */

    const success =
        Math.random() < 0.60;


    if (success) {

        /* ==============================================
           逃跑成功
        ============================================== */

        battleActive = false;
        battleOver = true;


        document.getElementById(
            "battleLog"
        ).innerHTML =
            "🏃 你成功逃離了戰鬥！";


        escapeButton.style.display =
            "none";


        attackButton.style.display =
            "none";


        document.getElementById(
            "newEnemyButton"
        ).style.display =
            "none";


        /* 回到森林探索 */

        setTimeout(
            function () {

                forestEncounterProtection = true;

                showScreen(
                    "forestExploreScreen"
                );

            },
            500
        );

    }


    else {

        /* ==============================================
           逃跑失敗
        ============================================== */

        document.getElementById(
            "battleLog"
        ).innerHTML =
            "🏃 你試圖逃跑……<br>"
            + "但失敗了！";


        /* 怪物反擊 */

        setTimeout(
            function () {

                enemyAttack();

                /*
                   怪物攻擊結束後，
                   escapeButton 會重新啟用
                */

            },
            500
        );

    }

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


        document.getElementById(
            "escapeButton"
        ).disabled = false;

        document.getElementById(
            "itemButton"
        ).disabled = false;

    }

}

/* ==================================================
   戰鬥勝利
================================================== */

function winBattle() {

    advanceGameTime(10);

    battleActive = false;

    battleOver = true;


    document.getElementById(
        "attackButton"
    ).style.display =
        "none";

    document.getElementById(
        "itemButton"
    ).style.display =
        "none";

    document.getElementById(
        "escapeButton"
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

    updateGuildHuntQuestProgress(
        currentBattleEnemyType,
        defeatedCount
    );


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
   公會委託：討伐進度
================================================== */

function updateGuildHuntQuestProgress(
    enemyType,
    amount
) {

    ensureDailyGuildQuests();


    for (
        const quest
        of guildDailyState.quests
    ) {

        if (
            quest.type !== "hunt"
            ||
            !quest.accepted
            ||
            quest.completed
            ||
            quest.failed
        ) {

            continue;

        }


        if (
            quest.enemyType
            !==
            enemyType
        ) {

            continue;

        }


        quest.progress += amount;


        quest.progress =
            Math.min(
                quest.progress,
                quest.amount
            );

    }

}

/* ==================================================
   公會委託：探索進度
================================================== */

function updateGuildExploreQuestProgress(regionKey) {
    ensureDailyGuildQuests();

    const region = forestRegions[regionKey];
    if (!region) return;

    for (const quest of guildDailyState.quests) {
        if (
            quest.type !== "explore"
            || !quest.accepted
            || quest.completed
            || quest.failed
        ) continue;

        if (
            quest.regionKey
            && quest.regionKey !== regionKey
        ) {
            continue;
        }

        quest.progress += 1;
        quest.progress = Math.min(
            quest.progress,
            quest.amount
        );
    }
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
        .getElementById("itemButton")
        .style.display = "none";

    document
        .getElementById("escapeButton")
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

    advanceGameTime(60);


    updatePlayerUI();


    showMessage(
        "你舒服地休息了一會兒！"
        + " HP 與 MP 已完全恢復！"
    );

}

function visitDoctor() {

    const medicalCost = 30;


    if (player.gold < medicalCost) {

        showMessage(
            "💰 你的錢不夠。\n\n"
            + "醫療費需要 "
            + medicalCost
            + " G。"
        );

        return;

    }


    player.gold -= medicalCost;


    const playerStats =
        getPlayerStats();


    player.currentHp =
        playerStats.maxHp;


    player.currentMp =
        playerStats.maxMp;


    updatePlayerUI();


    showMessage(
        "🩺 醫生幫你檢查了一下。\n\n"
        + "「為你開了一些藥。」\n"
        + "「你吃下去感覺身體好多了。」\n\n"
        + "❤️ HP、💙 MP 已完全恢復。\n"
        + "💰 支付醫療費 "
        + medicalCost
        + " G。"
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

    if (screenId === "townScreen") {
        checkTownGuildQuestCompletion();
    }


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

    updateGameTimeUI();

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

// 救助委託
let rescueEventX = null;
let rescueEventY = null;

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

let forestTimeDistance = 0;

const forestTimeDistanceUnit = 20;

/* ==================================================
   🌲 森林區域探索距離
================================================== */

const forestExploreDistanceRequired = 30;

const forestExploreDistance = {
    entrance: 0,
    centralForest: 0,
    riverBank: 0,
    rockWall: 0,
    deepForest: 0
};

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

    const moveDistance = Math.sqrt(
        directionX * directionX +
        directionY * directionY
    );

    forestMoveDistance += moveDistance;

    forestTimeDistance += moveDistance;


    /* 🌲 累積目前區域的探索距離 */

    updateForestExploreProgress(
        moveDistance
    );

    checkEscortDestination();

    checkRescueEvent();


    // 怪物遭遇判定
    if (forestMoveDistance >= forestEncounterDistance) {
        forestMoveDistance = 0;
        checkForestEncounter();
    }


    // 遊戲時間計算
    while (forestTimeDistance >= forestTimeDistanceUnit) {
        forestTimeDistance -= forestTimeDistanceUnit;
        advanceGameTime(10);
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
   🌲 在指定森林區域隨機取得一個座標
================================================== */

function getRandomPointInRegion(regionKey) {

    const region =
        forestRegions[regionKey];

    if (!region) {
        return null;
    }

    const polygon =
        region.polygon;

    /* 找出多邊形的範圍 */

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    for (const point of polygon) {

        minX = Math.min(minX, point[0]);
        maxX = Math.max(maxX, point[0]);

        minY = Math.min(minY, point[1]);
        maxY = Math.max(maxY, point[1]);

    }

    /* 在範圍內隨機嘗試 */

    for (let i = 0; i < 100; i++) {

        const x =
            minX +
            Math.random() *
            (maxX - minX);

        const y =
            minY +
            Math.random() *
            (maxY - minY);

        if (
            isPointInPolygon(
                x,
                y,
                polygon
            )
        ) {

            return {
                x,
                y
            };

        }

    }

    /* 理論上的保底 */

    return {
        x: polygon[0][0],
        y: polygon[0][1]
    };

}

/* ==================================================
   地圖Ⅰ 採集點
================================================== */

const forestGatherPoints = [

    /* ① 入口草原：藥草 */

    {
        type: "herb",
        x: 8,
        y: 28
    },

    {
        type: "herb",
        x: 34,
        y: 33
    },


    /* ② 中央森林：木材 */

    {
        type: "wood",
        x: -31,
        y: 60
    },

    {
        type: "wood",
        x: -15,
        y: 67
    },


    /* ③ 右側岩壁：礦石 */

    {
        type: "ore",
        x: 49,
        y: 68
    },

    {
        type: "ore",
        x: 47,
        y: 76
    },

    {
        type: "ore",
        x: 38,
        y: 83
    },


    /* ④ 左側河岸：魚 */

    {
        type: "fish",
        x: -68,
        y: 75
    },

    {
        type: "fish",
        x: -57,
        y: 80
    },


    /* ⑤ 深處深林 */

    {
        type: "mushroom",
        x: -12,
        y: 118
    },

    {
        type: "wood",
        x: 7,
        y: 109
    },

    {
        type: "herb",
        x: -10,
        y: 98
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

const forestGatherDistance = 4;

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

        updateGuildCollectQuestProgress(
            point.type
        );

        advanceGameTime(10);


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
   公會委託：收集進度
================================================== */

function updateGuildCollectQuestProgress(
    itemType
) {

    ensureDailyGuildQuests();


    for (
        const quest
        of guildDailyState.quests
    ) {

        /*
           只有：
           ・收集委託
           ・已接取
           ・尚未完成
           才需要處理
        */

        if (
            quest.type !== "collect"
            ||
            !quest.accepted
            ||
            quest.completed
            ||
            quest.failed
        ) {

            continue;

        }


        if (
            quest.itemType
            !==
            itemType
        ) {

            continue;

        }


        /*
           收集委託的進度直接以
           玩家目前持有數量判定。

           這樣可以支援：

           接取前就有材料
           接取後再去採集
        */

        const ownedAmount =
            inventory[itemType] || 0;


        quest.progress =
            Math.min(
                ownedAmount,
                quest.amount
            );

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


    /*
       玩家離開森林入口
    */

    if (distance > 5) {

        forestHasLeftStart = true;

        return;

    }


    /*
       玩家還沒有離開入口
       不做任何事情
    */

    if (!forestHasLeftStart) {

        return;

    }

    /*
       ==========================================
       一般森林入口
       ==========================================
    */

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
   🌲 森林探索進度
================================================== */

function updateForestExploreProgress(moveDistance) {

    const region =
        getCurrentForestRegion();

    if (!region) {
        return;
    }


    /* 找出目前區域的 key */

    let regionKey = null;

    for (const key in forestRegions) {

        if (
            forestRegions[key] === region
        ) {

            regionKey = key;
            break;

        }

    }

    if (!regionKey) {
        return;
    }


    /* 累積這個區域的探索距離 */

    forestExploreDistance[regionKey] +=
        moveDistance;


    /* 每達到 30 距離 = 完成一次探索 */

    while (
        forestExploreDistance[regionKey]
        >= forestExploreDistanceRequired
    ) {

        forestExploreDistance[regionKey]
            -= forestExploreDistanceRequired;


        /* ==========================================
           📜 公會探索委託
        ========================================== */

        updateGuildExploreQuestProgress(
            regionKey
        );


        /* ==========================================
           🏅 升階任務
        ========================================== */

        const task =
            getCurrentRankUpTask();


        if (
            adventurer.rankUpTaskAccepted
            &&
            task
            &&
            task.type === "explore"
        ) {

            /*
               如果是「探索不同區域」
               就記錄區域，而不是單純 +1
            */

            if (
                !adventurer.rankUpExploredRegions
            ) {

                adventurer.rankUpExploredRegions =
                    [];

            }


            if (
                !adventurer.rankUpExploredRegions
                    .includes(regionKey)
            ) {

                adventurer.rankUpExploredRegions
                    .push(regionKey);

                adventurer.rankUpTaskProgress =
                    adventurer.rankUpExploredRegions.length;

                adventurer.rankUpTaskProgress =
                    Math.min(
                        adventurer.rankUpTaskProgress,
                        task.target
                    );

                updateRankUpTaskUI();

            }

        }

    }

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

updateGameTimeUI();

updateInventoryButton();

updateForestPosition();

updateMiniMapPosition();