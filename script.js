/* =====================================================
   ESPORTS ARENA
   Main JavaScript
===================================================== */


/* =====================================================
   GAME DATA
===================================================== */

const games = [

    {
        id: "mlbb",
        name: "Mobile Legends",
        shortName: "MLBB",
        type: "Team Game",
        icon: "fa-solid fa-shield-halved",
        cover: "cover-mlbb"
    },

    {
        id: "pubg",
        name: "PUBG Mobile",
        shortName: "PUBG",
        type: "Team Game",
        icon: "fa-solid fa-crosshairs",
        cover: "cover-pubg"
    },

    {
        id: "freefire",
        name: "Free Fire",
        shortName: "FREE FIRE",
        type: "Team Game",
        icon: "fa-solid fa-fire",
        cover: "cover-freefire"
    },

    {
        id: "valorant",
        name: "Valorant",
        shortName: "VALORANT",
        type: "Team Game",
        icon: "fa-solid fa-bullseye",
        cover: "cover-valorant"
    },

    {
        id: "efootball",
        name: "eFootball",
        shortName: "eFOOTBALL",
        type: "Individual Game",
        icon: "fa-solid fa-futbol",
        cover: "cover-efootball"
    },

    {
        id: "codm",
        name: "Call of Duty Mobile",
        shortName: "CODM",
        type: "Team Game",
        icon: "fa-solid fa-gun",
        cover: "cover-codm"
    },

    {
        id: "fc",
        name: "EA Sports FC",
        shortName: "EA FC",
        type: "Individual Game",
        icon: "fa-solid fa-futbol",
        cover: "cover-efootball"
    },

    {
        id: "tekken",
        name: "Tekken 8",
        shortName: "TEKKEN 8",
        type: "Individual Game",
        icon: "fa-solid fa-hand-fist",
        cover: "cover-valorant"
    }

];


/* =====================================================
   TOURNAMENT DATA
===================================================== */

const tournaments = [

    {
        id: 101,
        game: "mlbb",
        name: "MLBB Championship Cup",
        description: "5v5 competitive Mobile Legends tournament.",
        level: "Local",
        participants: 64,
        filled: 48,
        entry: 25000,
        prize: 1600000,
        status: "LIVE",
        mode: "team"
    },

    {
        id: 102,
        game: "mlbb",
        name: "MLBB Global Masters",
        description: "High-level international MLBB competition.",
        level: "Global",
        participants: 128,
        filled: 91,
        entry: 100000,
        prize: 12000000,
        status: "OPEN",
        mode: "team"
    },

    {
        id: 103,
        game: "pubg",
        name: "PUBG Mobile Battle Royale",
        description: "Squad-based PUBG Mobile competition.",
        level: "Local",
        participants: 64,
        filled: 51,
        entry: 25000,
        prize: 2000000,
        status: "LIVE",
        mode: "team"
    },

    {
        id: 104,
        game: "freefire",
        name: "Free Fire Clash",
        description: "Fast-paced squad battle tournament.",
        level: "Casual",
        participants: 32,
        filled: 21,
        entry: 10000,
        prize: 500000,
        status: "OPEN",
        mode: "team"
    },

    {
        id: 105,
        game: "valorant",
        name: "Valorant Tactical Cup",
        description: "5v5 tactical FPS tournament.",
        level: "Global",
        participants: 128,
        filled: 73,
        entry: 100000,
        prize: 10000000,
        status: "OPEN",
        mode: "team"
    },

    {
        id: 106,
        game: "efootball",
        name: "eFootball Masters",
        description: "1v1 competitive football tournament.",
        level: "Local",
        participants: 128,
        filled: 82,
        entry: 25000,
        prize: 2500000,
        status: "OPEN",
        mode: "individual"
    },

    {
        id: 107,
        game: "efootball",
        name: "eFootball Global League",
        description: "Elite 1v1 football championship.",
        level: "Global",
        participants: 128,
        filled: 106,
        entry: 100000,
        prize: 15000000,
        status: "LIVE",
        mode: "individual"
    },

    {
        id: 108,
        game: "codm",
        name: "COD Mobile Strike Force",
        description: "Competitive team FPS tournament.",
        level: "Casual",
        participants: 32,
        filled: 18,
        entry: 10000,
        prize: 700000,
        status: "OPEN",
        mode: "team"
    }

];


/* =====================================================
   LEVEL DATA
===================================================== */

const levels = {

    casual: {
        name: "Casual",
        entry: 10000,
        prize: 500000
    },

    local: {
        name: "Local",
        entry: 25000,
        prize: 2500000
    },

    global: {
        name: "Global",
        entry: 100000,
        prize: 15000000
    }

};


/* =====================================================
   LOCAL STORAGE
===================================================== */

let registrations =
    JSON.parse(
        localStorage.getItem("esportsRegistrations")
    ) || [];

let currentTournament = null;

let currentRegistration = null;


/* =====================================================
   HELPER FUNCTIONS
===================================================== */

function formatMMK(amount) {

    return new Intl.NumberFormat("en-US").format(amount) + " MMK";

}


function getGame(gameId) {

    return games.find(game => game.id === gameId);

}


function getTournament(id) {

    return tournaments.find(
        tournament => tournament.id === Number(id)
    );

}


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showPage(pageId) {

    document.querySelectorAll(".page").forEach(page => {

        page.classList.remove("active-page");

    });


    const page = document.getElementById(pageId);

    if (page) {

        page.classList.add("active-page");

    }


    document.querySelectorAll(".nav-item").forEach(item => {

        item.classList.remove("active");

        if (item.dataset.page === pageId) {

            item.classList.add("active");

        }

    });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   NAVIGATION EVENTS
===================================================== */

document.querySelectorAll(".nav-item").forEach(item => {

    item.addEventListener("click", () => {

        const page = item.dataset.page;

        if (!page) return;

        showPage(page);

        if (page === "my-tournaments") {

            renderMyTournaments();

        }

    });

});


document.querySelectorAll("[data-page-link]").forEach(button => {

    button.addEventListener("click", () => {

        const page = button.dataset.pageLink;

        showPage(page);

    });

});


/* =====================================================
   MOBILE MENU
===================================================== */

document
    .getElementById("mobileMenu")
    .addEventListener("click", () => {

        document
            .querySelector(".sidebar")
            .classList.toggle("mobile-open");

    });


/* =====================================================
   GAME CARDS
===================================================== */

function renderGames() {

    const container =
        document.getElementById("gameGrid");

    container.innerHTML = "";


    games.forEach(game => {

        const card = document.createElement("div");

        card.className =
            `game-card ${game.cover}`;

        card.innerHTML = `

            <i class="${game.icon}"></i>

            <h3>${game.name}</h3>

            <span>${game.type}</span>

        `;


        card.addEventListener("click", () => {

            showPage("tournaments");

            document.getElementById("gameFilter").value =
                game.id;

            renderTournaments(game.id);

        });


        container.appendChild(card);

    });

}


/* =====================================================
   TOURNAMENT CARD
===================================================== */

function tournamentCard(tournament) {

    const game =
        getGame(tournament.game);


    const percentage =
        Math.round(
            (tournament.filled /
                tournament.participants) * 100
        );


    return `

        <div class="tournament-card">

            <div class="
                tournament-cover
                ${game.cover}
            ">

                ${
                    tournament.status === "LIVE"
                    ?
                    `<span class="live-badge">
                        ● LIVE
                    </span>`
                    :
                    `<span class="live-badge"
                        style="
                        background:rgba(34,197,94,.85)
                        ">
                        OPEN
                    </span>`
                }

                <span class="card-game">
                    ${game.shortName}
                </span>

                <i class="${game.icon}"></i>

            </div>


            <div class="tournament-body">

                <h3>
                    ${tournament.name}
                </h3>

                <p>
                    ${tournament.description}
                </p>


                <div class="tournament-info">

                    <div class="info-box">

                        <span>ENTRY</span>

                        <strong>
                            ${formatMMK(tournament.entry)}
                        </strong>

                    </div>


                    <div class="info-box">

                        <span>PRIZE POOL</span>

                        <strong>
                            ${formatMMK(tournament.prize)}
                        </strong>

                    </div>


                    <div class="info-box">

                        <span>PLAYERS / TEAMS</span>

                        <strong>
                            ${tournament.filled}
                            /
                            ${tournament.participants}
                        </strong>

                    </div>


                    <div class="info-box">

                        <span>LEVEL</span>

                        <strong>
                            ${tournament.level}
                        </strong>

                    </div>

                </div>


                <div style="
                    height:4px;
                    background:rgba(255,255,255,.06);
                    border-radius:5px;
                    margin-bottom:15px;
                    overflow:hidden;
                ">

                    <div style="
                        width:${percentage}%;
                        height:100%;
                        background:
                        linear-gradient(
                            90deg,
                            #8b5cf6,
                            #22d3ee
                        );
                    "></div>

                </div>


                <button
                    class="primary-btn full-btn register-btn"
                    data-id="${tournament.id}"
                >

                    ${
                        tournament.status === "LIVE"
                        ?
                        "Register & Enter"
                        :
                        "Register Now"
                    }

                    <i class="fa-solid fa-arrow-right"></i>

                </button>

            </div>

        </div>

    `;

}


/* =====================================================
   TOURNAMENT LIST
===================================================== */

function renderTournaments(filter = "all") {

    const container =
        document.getElementById("tournamentGrid");

    const list =
        filter === "all"
        ?
        tournaments
        :
        tournaments.filter(
            tournament =>
                tournament.game === filter
        );


    if (list.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-trophy"></i>

                <h3>No tournaments found</h3>

                <p>
                    Try another game.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        list.map(tournamentCard).join("");


    addRegisterEvents();

}


/* =====================================================
   FEATURED TOURNAMENTS
===================================================== */

function renderFeatured() {

    const container =
        document.getElementById(
            "featuredTournaments"
        );


    container.innerHTML =
        tournaments
            .slice(0, 3)
            .map(tournamentCard)
            .join("");


    addRegisterEvents();

}


/* =====================================================
   REGISTER BUTTON
===================================================== */

function addRegisterEvents() {

    document
        .querySelectorAll(".register-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openRegistration(
                        Number(button.dataset.id)
                    );

                }
            );

        });

}


/* =====================================================
   OPEN REGISTRATION
===================================================== */

function openRegistration(id) {

    currentTournament =
        getTournament(id);


    const game =
        getGame(currentTournament.game);


    document.getElementById(
        "registerTournamentName"
    ).textContent =
        currentTournament.name;


    document.getElementById(
        "selectedGame"
    ).textContent =
        game.name;


    document.getElementById(
        "selectedFormat"
    ).textContent =
        currentTournament.mode === "team"
        ?
        "Team Tournament"
        :
        "Individual Tournament";


    document.getElementById(
        "registerStep1"
    ).classList.add("active-step");


    document.getElementById(
        "registerStep2"
    ).classList.remove("active-step");


    document
        .getElementById("registerModal")
        .classList.add("show");

}


/* =====================================================
   CLOSE MODALS
===================================================== */

document
    .querySelectorAll("[data-close]")
    .forEach(button => {

        button.addEventListener("click", () => {

            const modal =
                document.getElementById(
                    button.dataset.close
                );

            modal.classList.remove("show");

        });

    });


/* =====================================================
   CONTINUE REGISTRATION
===================================================== */

document
    .getElementById("continueRegistration")
    .addEventListener("click", () => {

        const username =
            document
                .getElementById("usernameInput")
                .value
                .trim();

        const email =
            document
                .getElementById("emailInput")
                .value
                .trim();

        const password =
            document
                .getElementById("passwordInput")
                .value
                .trim();


        if (!username || !email || !password) {

            alert(
                "Please fill in all required fields."
            );

            return;

        }


        if (!email.includes("@")) {

            alert(
                "Please enter a valid email."
            );

            return;

        }


        document
            .getElementById("registerStep1")
            .classList.remove("active-step");


        document
            .getElementById("registerStep2")
            .classList.add("active-step");

    });


/* =====================================================
   BACK REGISTRATION
===================================================== */

document
    .getElementById("backRegistration")
    .addEventListener("click", () => {

        document
            .getElementById("registerStep2")
            .classList.remove("active-step");


        document
            .getElementById("registerStep1")
            .classList.add("active-step");

    });


/* =====================================================
   PAYMENT
===================================================== */

document
    .getElementById("continuePayment")
    .addEventListener("click", () => {

        const level =
            document.querySelector(
                'input[name="level"]:checked'
            ).value;


        const levelData =
            levels[level];


        document.getElementById(
            "paymentTournament"
        ).textContent =
            currentTournament.name;


        document.getElementById(
            "paymentLevel"
        ).textContent =
            levelData.name;


        document.getElementById(
            "paymentAmount"
        ).textContent =
            formatMMK(levelData.entry);


        document
            .getElementById("registerModal")
            .classList.remove("show");


        document
            .getElementById("paymentModal")
            .classList.add("show");

    });


/* =====================================================
   PAY NOW
===================================================== */

document
    .getElementById("payNow")
    .addEventListener("click", () => {

        const username =
            document
                .getElementById("usernameInput")
                .value
                .trim();

        const email =
            document
                .getElementById("emailInput")
                .value
                .trim();


        const level =
            document.querySelector(
                'input[name="level"]:checked'
            ).value;


        const levelData =
            levels[level];


        currentRegistration = {

            id:
                Date.now(),

            tournamentId:
                currentTournament.id,

            username:
                username,

            email:
                email,

            level:
                level,

            levelName:
                levelData.name,

            amount:
                levelData.entry,

            registeredAt:
                new Date().toISOString(),

            status:
                "Registered"

        };


        registrations.push(
            currentRegistration
        );


        localStorage.setItem(
            "esportsRegistrations",
            JSON.stringify(registrations)
        );


        document
            .getElementById("paymentModal")
            .classList.remove("show");


        document.getElementById(
            "successTournament"
        ).textContent =
            currentTournament.name;


        document.getElementById(
            "successLevel"
        ).textContent =
            levelData.name;


        document.getElementById(
            "successAmount"
        ).textContent =
            formatMMK(levelData.entry);


        document
            .getElementById("successModal")
            .classList.add("show");


        document.getElementById(
            "headerUsername"
        ).textContent =
            username;


        document.querySelector(
            ".avatar"
        ).textContent =
            username.charAt(0).toUpperCase();

    });


/* =====================================================
   ENTER ARENA
===================================================== */

document
    .getElementById("enterArenaBtn")
    .addEventListener("click", () => {

        document
            .getElementById("successModal")
            .classList.remove("show");


        openArena(
            currentTournament.id
        );

    });


/* =====================================================
   OPEN ARENA
===================================================== */

function openArena(tournamentId) {

    const tournament =
        getTournament(tournamentId);


    if (!tournament) return;


    currentTournament =
        tournament;


    renderArena(tournament);


    showPage("arena");

}


/* =====================================================
   ARENA DATA
===================================================== */

const teamNames = [

    "Shadow Wolves",
    "Night Raiders",
    "Phoenix Esports",
    "Nova Squad",
    "Titan Force",
    "Black Dragons",
    "Infinity X",
    "Royal Kings",
    "Cyber Titans",
    "Storm Breakers"

];


const playerNames = [

    "KHANTZ",
    "DanielVNB",
    "SWINMYAT",
    "AceKing",
    "Ronaldo7",
    "ShadowX",
    "NeoPlayer",
    "Legend99",
    "ProGamer",
    "KillerZ"

];


/* =====================================================
   ARENA RENDER
===================================================== */

function renderArena(tournament) {

    const game =
        getGame(tournament.game);


    const isTeam =
        tournament.mode === "team";


    document.getElementById(
        "arenaContent"
    ).innerHTML = `

        <div class="arena-header">

            <div class="arena-header-top">

                <div>

                    <span class="arena-game-label">
                        ${game.shortName}
                        •
                        ${tournament.level.toUpperCase()}
                    </span>

                    <h1>
                        ${tournament.name}
                    </h1>

                    <p>
                        ${
                            isTeam
                            ?
                            "Team-based competitive tournament"
                            :
                            "Individual competitive tournament"
                        }
                    </p>

                </div>


                <span class="arena-live">

                    ${
                        tournament.status === "LIVE"
                        ?
                        "● LIVE NOW"
                        :
                        "● REGISTRATION OPEN"
                    }

                </span>

            </div>


            <div class="arena-stats">

                <div class="arena-stat">

                    <span>PRIZE POOL</span>

                    <strong>
                        ${formatMMK(tournament.prize)}
                    </strong>

                </div>


                <div class="arena-stat">

                    <span>
                        ${
                            isTeam
                            ?
                            "TEAMS"
                            :
                            "PLAYERS"
                        }
                    </span>

                    <strong>
                        ${tournament.filled}
                        /
                        ${tournament.participants}
                    </strong>

                </div>


                <div class="arena-stat">

                    <span>ENTRY FEE</span>

                    <strong>
                        ${formatMMK(tournament.entry)}
                    </strong>

                </div>


                <div class="arena-stat">

                    <span>FORMAT</span>

                    <strong>
                        ${
                            isTeam
                            ?
                            "TEAM"
                            :
                            "1 VS 1"
                        }
                    </strong>

                </div>

            </div>

        </div>


        <div class="arena-tabs">

            <button
                class="arena-tab active"
                data-tab="overview"
            >
                Overview
            </button>

            <button
                class="arena-tab"
                data-tab="participants"
            >
                ${
                    isTeam
                    ?
                    "Teams"
                    :
                    "Players"
                }
            </button>

            <button
                class="arena-tab"
                data-tab="rankings"
            >
                Rankings
            </button>

            <button
                class="arena-tab"
                data-tab="matches"
            >
                Matches
            </button>

            <button
                class="arena-tab"
                data-tab="bracket"
            >
                Bracket
            </button>

            <button
                class="arena-tab"
                data-tab="results"
            >
                Results
            </button>

            <button
                class="arena-tab"
                data-tab="rules"
            >
                Rules
            </button>

            <button
                class="arena-tab"
                data-tab="statistics"
            >
                Statistics
            </button>

        </div>


        <div class="arena-panel active" id="overview-panel">

            ${arenaOverview(tournament)}

        </div>


        <div class="arena-panel" id="participants-panel">

            ${arenaParticipants(tournament)}

        </div>


        <div class="arena-panel" id="rankings-panel">

            ${arenaRankings(tournament)}

        </div>


        <div class="arena-panel" id="matches-panel">

            ${arenaMatches(tournament)}

        </div>


        <div class="arena-panel" id="bracket-panel">

            ${arenaBracket(tournament)}

        </div>


        <div class="arena-panel" id="results-panel">

            ${arenaResults(tournament)}

        </div>


        <div class="arena-panel" id="rules-panel">

            ${arenaRules(tournament)}

        </div>


        <div class="arena-panel" id="statistics-panel">

            ${arenaStatistics(tournament)}

        </div>

    `;


    activateArenaTabs();

}


/* =====================================================
   ARENA OVERVIEW
===================================================== */

function arenaOverview(tournament) {

    const registration =
        registrations.find(
            item =>
                item.tournamentId ===
                tournament.id
        );


    return `

        <div class="stats-grid">

            <div class="stat-card">

                <div class="stat-icon">
                    <i class="fa-solid fa-user-check"></i>
                </div>

                <div>

                    <span>Your Status</span>

                    <strong>
                        ${
                            registration
                            ?
                            "REGISTERED"
                            :
                            "VIEWING"
                        }
                    </strong>

                </div>

            </div>


            <div class="stat-card">

                <div class="stat-icon">
                    <i class="fa-solid fa-ranking-star"></i>
                </div>

                <div>

                    <span>Your Ranking</span>

                    <strong>
                        #24
                    </strong>

                </div>

            </div>


            <div class="stat-card">

                <div class="stat-icon">
                    <i class="fa-solid fa-gamepad"></i>
                </div>

                <div>

                    <span>Next Match</span>

                    <strong>
                        20:30
                    </strong>

                </div>

            </div>


            <div class="stat-card">

                <div class="stat-icon">
                    <i class="fa-solid fa-star"></i>
                </div>

                <div>

                    <span>Points</span>

                    <strong>
                        1,240
                    </strong>

                </div>

            </div>

        </div>


        <div class="section-title">

            <div>

                <span class="small-title">
                    TOURNAMENT INFO
                </span>

                <h2>
                    ${tournament.name}
                </h2>

            </div>

        </div>


        <div class="stat-card">

            <div>

                <span>
                    Tournament Description
                </span>

                <p style="
                    color:#aaa;
                    font-size:12px;
                    line-height:1.7;
                    margin-top:8px;
                ">

                    ${tournament.description}

                    This tournament is managed through
                    the ESPORTS ARENA competition system.
                    Participants can check rankings,
                    matches, brackets and results from
                    this tournament hub.

                </p>

            </div>

        </div>

    `;

}


/* =====================================================
   PARTICIPANTS
===================================================== */

function arenaParticipants(tournament) {

    const isTeam =
        tournament.mode === "team";


    if (isTeam) {

        return `

            <table class="data-table">

                <thead>

                    <tr>

                        <th>#</th>

                        <th>Team</th>

                        <th>Members</th>

                        <th>Wins</th>

                        <th>Points</th>

                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    ${teamNames.map(
                        (team, index) => `

                        <tr>

                            <td>
                                ${index + 1}
                            </td>

                            <td class="player-name">
                                ${team}
                            </td>

                            <td>
                                5 Players
                            </td>

                            <td>
                                ${9 - (index % 5)}
                            </td>

                            <td>
                                ${1240 - index * 72}
                            </td>

                            <td>

                                <span class="status-pill">
                                    ACTIVE
                                </span>

                            </td>

                        </tr>

                    `).join("")}

                </tbody>

            </table>

        `;

    }


    return `

        <table class="data-table">

            <thead>

                <tr>

                    <th>#</th>

                    <th>Player</th>

                    <th>Matches</th>

                    <th>Wins</th>

                    <th>Points</th>

                    <th>Status</th>

                </tr>

            </thead>

            <tbody>

                ${playerNames.map(
                    (player, index) => `

                    <tr>

                        <td>
                            ${index + 1}
                        </td>

                        <td class="player-name">
                            ${player}
                        </td>

                        <td>
                            ${12 - (index % 4)}
                        </td>

                        <td>
                            ${10 - (index % 5)}
                        </td>

                        <td>
                            ${1450 - index * 83}
                        </td>

                        <td>

                            <span class="status-pill">
                                ACTIVE
                            </span>

                        </td>

                    </tr>

                `).join("")}

            </tbody>

        </table>

    `;

}


/* =====================================================
   RANKINGS
===================================================== */

function arenaRankings(tournament) {

    const isTeam =
        tournament.mode === "team";


    const names =
        isTeam
        ?
        teamNames
        :
        playerNames;


    return `

        <table class="data-table">

            <thead>

                <tr>

                    <th>Rank</th>

                    <th>
                        ${isTeam ? "Team" : "Player"}
                    </th>

                    <th>Played</th>

                    <th>Won</th>

                    <th>Lost</th>

                    <th>Points</th>

                </tr>

            </thead>


            <tbody>

                ${names.map(
                    (name, index) => `

                    <tr>

                        <td class="rank-number">
                            #${index + 1}
                        </td>

                        <td class="player-name">
                            ${name}
                        </td>

                        <td>
                            ${12 - (index % 4)}
                        </td>

                        <td>
                            ${10 - (index % 5)}
                        </td>

                        <td>
                            ${2 + (index % 3)}
                        </td>

                        <td>
                            ${1450 - index * 75}
                        </td>

                    </tr>

                `).join("")}

            </tbody>

        </table>

    `;

}


/* =====================================================
   MATCHES
===================================================== */

function arenaMatches(tournament) {

    const isTeam =
        tournament.mode === "team";


    const names =
        isTeam
        ?
        teamNames
        :
        playerNames;


    let html = `<div class="match-list">`;


    for (let i = 0; i < 6; i++) {

        const first =
            names[i];

        const second =
            names[i + 1];


        html += `

            <div class="match-card">

                <div class="match-team">
                    ${first}
                </div>

                <div>

                    <div class="match-time">
                        ${18 + i}:30
                    </div>

                    <span class="match-status">
                        ${
                            i < 2
                            ?
                            "LIVE"
                            :
                            "UPCOMING"
                        }
                    </span>

                </div>

                <div class="match-team">
                    ${second}
                </div>

            </div>

        `;

    }


    html += `</div>`;


    return html;

}


/* =====================================================
   BRACKET
===================================================== */

function arenaBracket(tournament) {

    const isTeam =
        tournament.mode === "team";


    const names =
        isTeam
        ?
        teamNames
        :
        playerNames;


    return `

        <div class="bracket">

            <div class="bracket-column">

                <h3>ROUND OF 8</h3>

                ${names
                    .slice(0, 8)
                    .reduce(
                        (html, name, index) => {

                            if (index % 2 === 0) {

                                html += `

                                    <div class="bracket-match">

                                        <div>
                                            ${name}
                                            <strong>
                                                ${3 + index}
                                            </strong>
                                        </div>

                                        <div>
                                            ${names[index + 1]}
                                            <strong>
                                                ${1 + index}
                                            </strong>
                                        </div>

                                    </div>

                                `;

                            }

                            return html;

                        },
                        ""
                    )}

            </div>


            <div class="bracket-column">

                <h3>SEMIFINAL</h3>

                <div style="height:35px"></div>

                <div class="bracket-match">

                    <div>
                        Shadow Wolves
                        <strong>2</strong>
                    </div>

                    <div>
                        Phoenix Esports
                        <strong>1</strong>
                    </div>

                </div>


                <div style="height:35px"></div>

                <div class="bracket-match">

                    <div>
                        Titan Force
                        <strong>2</strong>
                    </div>

                    <div>
                        Royal Kings
                        <strong>0</strong>
                    </div>

                </div>

            </div>


            <div class="bracket-column">

                <h3>GRAND FINAL</h3>

                <div style="height:90px"></div>

                <div class="bracket-match">

                    <div>
                        Shadow Wolves
                        <strong>-</strong>
                    </div>

                    <div>
                        Titan Force
                        <strong>-</strong>
                    </div>

                </div>

            </div>

        </div>

    `;

}


/* =====================================================
   RESULTS
===================================================== */

function arenaResults(tournament) {

    return `

        <table class="data-table">

            <thead>

                <tr>

                    <th>Match</th>

                    <th>Winner</th>

                    <th>Score</th>

                    <th>Date</th>

                    <th>Status</th>

                </tr>

            </thead>

            <tbody>

                <tr>

                    <td>#M-001</td>

                    <td class="player-name">
                        Shadow Wolves
                    </td>

                    <td>2 - 0</td>

                    <td>24 Sep</td>

                    <td>
                        <span class="status-pill">
                            COMPLETED
                        </span>
                    </td>

                </tr>


                <tr>

                    <td>#M-002</td>

                    <td class="player-name">
                        Phoenix Esports
                    </td>

                    <td>2 - 1</td>

                    <td>24 Sep</td>

                    <td>
                        <span class="status-pill">
                            COMPLETED
                        </span>
                    </td>

                </tr>


                <tr>

                    <td>#M-003</td>

                    <td class="player-name">
                        Titan Force
                    </td>

                    <td>2 - 0</td>

                    <td>23 Sep</td>

                    <td>
                        <span class="status-pill">
                            COMPLETED
                        </span>
                    </td>

                </tr>

            </tbody>

        </table>

    `;

}


/* =====================================================
   RULES
===================================================== */

function arenaRules(tournament) {

    const isTeam =
        tournament.mode === "team";


    return `

        <div class="stat-card">

            <div>

                <h3 style="
                    margin-bottom:15px;
                ">
                    Tournament Rules
                </h3>

                <p style="
                    color:#aaa;
                    font-size:12px;
                    line-height:1.9;
                ">

                    1. All participants must use
                    their registered account.

                    <br>

                    2. ${
                        isTeam
                        ?
                        "Each team must submit its required team members before the tournament starts."
                        :
                        "Each player must use their registered player identity."
                    }

                    <br>

                    3. Cheating, exploits and
                    unauthorized software are prohibited.

                    <br>

                    4. Match results must be submitted
                    through the tournament system.

                    <br>

                    5. Players must be ready before
                    their scheduled match time.

                    <br>

                    6. Tournament administrators have
                    authority over disputes and results.

                </p>

            </div>

        </div>

    `;

}


/* =====================================================
   STATISTICS
===================================================== */

function arenaStatistics(tournament) {

    return `

        <div class="stats-grid">

            <div class="stat-card">

                <div class="stat-icon">
                    <i class="fa-solid fa-bolt"></i>
                </div>

                <div>

                    <span>Total Matches</span>

                    <strong>
                        42
                    </strong>

                </div>

            </div>


            <div class="stat-card">

                <div class="stat-icon">
                    <i class="fa-solid fa-chart-line"></i>
                </div>

                <div>

                    <span>Completed</span>

                    <strong>
                        28
                    </strong>

                </div>

            </div>


            <div class="stat-card">

                <div class="stat-icon">
                    <i class="fa-solid fa-clock"></i>
                </div>

                <div>

                    <span>Upcoming</span>

                    <strong>
                        14
                    </strong>

                </div>

            </div>


            <div class="stat-card">

                <div class="stat-icon">
                    <i class="fa-solid fa-users"></i>
                </div>

                <div>

                    <span>Active Participants</span>

                    <strong>
                        ${tournament.filled}
                    </strong>

                </div>

            </div>

        </div>

    `;

}


/* =====================================================
   ARENA TABS
===================================================== */

function activateArenaTabs() {

    document
        .querySelectorAll(".arena-tab")
        .forEach(tab => {

            tab.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(".arena-tab")
                        .forEach(item =>
                            item.classList.remove(
                                "active"
                            )
                        );


                    document
                        .querySelectorAll(".arena-panel")
                        .forEach(panel =>
                            panel.classList.remove(
                                "active"
                            )
                        );


                    tab.classList.add("active");


                    const target =
                        document.getElementById(
                            `${tab.dataset.tab}-panel`
                        );


                    if (target) {

                        target.classList.add(
                            "active"
                        );

                    }

                }
            );

        });

}


/* =====================================================
   BACK BUTTON
===================================================== */

document
    .getElementById("backToTournaments")
    .addEventListener("click", () => {

        showPage("tournaments");

    });


/* =====================================================
   MY TOURNAMENTS
===================================================== */

function renderMyTournaments() {

    const container =
        document.getElementById(
            "myTournamentList"
        );


    if (registrations.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-medal"></i>

                <h3>
                    No tournaments yet
                </h3>

                <p>
                    Register for a tournament
                    to see it here.
                </p>

                <br>

                <button
                    class="primary-btn"
                    data-page-link="tournaments"
                    onclick="showPage('tournaments')"
                >
                    Browse Tournaments
                </button>

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    registrations.forEach(registration => {

        const tournament =
            getTournament(
                registration.tournamentId
            );


        if (!tournament) return;


        const game =
            getGame(tournament.game);


        const item =
            document.createElement("div");


        item.className =
            "my-registration";


        item.innerHTML = `

            <div class="my-registration-info">

                <div class="my-game-icon">

                    <i class="${game.icon}"></i>

                </div>


                <div>

                    <h3>
                        ${tournament.name}
                    </h3>

                    <p>

                        ${game.name}
                        •
                        ${registration.levelName}
                        •
                        ${formatMMK(registration.amount)}

                    </p>

                </div>

            </div>


            <div>

                <span class="status-pill">
                    REGISTERED
                </span>

            </div>


            <button
                class="primary-btn arena-list-btn"
                data-id="${tournament.id}"
            >

                Enter Arena

                <i class="fa-solid fa-arrow-right"></i>

            </button>

        `;


        container.appendChild(item);

    });


    document
        .querySelectorAll(".arena-list-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openArena(
                        Number(
                            button.dataset.id
                        )
                    );

                }
            );

        });

}


/* =====================================================
   SEARCH
===================================================== */

document
    .getElementById("globalSearch")
    .addEventListener("input", event => {

        const query =
            event.target.value
                .toLowerCase()
                .trim();


        if (!query) return;


        const result =
            tournaments.find(
                tournament =>
                    tournament.name
                        .toLowerCase()
                        .includes(query)
                ||
                    tournament.game
                        .toLowerCase()
                        .includes(query)
            );


        if (result) {

            showPage("tournaments");

            document.getElementById(
                "gameFilter"
            ).value =
                result.game;

            renderTournaments(
                result.game
            );

        }

    });


/* =====================================================
   GAME FILTER
===================================================== */

document
    .getElementById("gameFilter")
    .addEventListener("change", event => {

        renderTournaments(
            event.target.value
        );

    });


/* =====================================================
   INITIAL LOAD
===================================================== */

renderGames();

renderTournaments();

renderFeatured();

renderMyTournaments();


/* =====================================================
   RESTORE USER
===================================================== */

if (registrations.length > 0) {

    const latest =
        registrations[
            registrations.length - 1
        ];


    document.getElementById(
        "headerUsername"
    ).textContent =
        latest.username;


    document.querySelector(
        ".avatar"
    ).textContent =
        latest.username
            .charAt(0)
            .toUpperCase();

}