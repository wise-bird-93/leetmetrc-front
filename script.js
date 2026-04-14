const API = "https://leetmetric-y0uj.onrender.com/leetcode/";

let chart;

async function getData() {
    const username = document.getElementById("username").value;
    const error = document.getElementById("error");
    const dashboard = document.getElementById("dashboard");

    error.textContent = "";
    dashboard.classList.add("hidden");

    try {
        const res = await fetch(API + username);
        const data = await res.json();

        const stats = data?.data?.matchedUser?.submitStats?.acSubmissionNum;

        if (!stats) {
            throw new Error("Invalid username");
        }

        let easy = stats.find(x => x.difficulty === "Easy")?.count || 0;
        let medium = stats.find(x => x.difficulty === "Medium")?.count || 0;
        let hard = stats.find(x => x.difficulty === "Hard")?.count || 0;

        document.getElementById("easy").textContent = easy;
        document.getElementById("medium").textContent = medium;
        document.getElementById("hard").textContent = hard;

        dashboard.classList.remove("hidden");

        createChart(easy, medium, hard);

    } catch (err) {
        error.textContent = "⚠️ Invalid username or server issue";
    }
}

function createChart(easy, medium, hard) {
    const ctx = document.getElementById("myChart");

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Easy", "Medium", "Hard"],
            datasets: [{
                data: [easy, medium, hard],
                backgroundColor: ["#00C49F", "#FFBB28", "#FF4C4C"]
            }]
        }
    });
}