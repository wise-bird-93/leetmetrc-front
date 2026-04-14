let chart;

async function getData() {
    const username = document.getElementById("username").value;
    const loader = document.getElementById("loader");
    const result = document.getElementById("result");
    const error = document.getElementById("error");

    error.innerText = "";
    result.classList.add("hidden");
    loader.classList.remove("hidden");

    try {
        const res = await fetch(`http://https://leetmetric-y0uj.onrender.com/leetcode/${username}`);
        const data = await res.json();

        if (data.error) {
            throw new Error(data.error);
        }

        const stats = data.data.matchedUser.submitStats.acSubmissionNum;

        let easy = stats.find(s => s.difficulty === "Easy").count;
        let medium = stats.find(s => s.difficulty === "Medium").count;
        let hard = stats.find(s => s.difficulty === "Hard").count;

        loader.classList.add("hidden");
        result.classList.remove("hidden");

        document.getElementById("easy").innerText = easy;
        document.getElementById("medium").innerText = medium;
        document.getElementById("hard").innerText = hard;

        createChart(easy, medium, hard);

    } catch (err) {
        loader.classList.add("hidden");
        error.innerText = "⚠️ Invalid username or server error";
    }
}

function createChart(easy, medium, hard) {
    const ctx = document.getElementById("chart").getContext("2d");

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Easy", "Medium", "Hard"],
            datasets: [{
                data: [easy, medium, hard],
                backgroundColor: ["#22c55e", "#facc15", "#ef4444"]
            }]
        }
    });
}