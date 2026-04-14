let chart;

async function getData() {
    const username = document.getElementById("username").value;
    const loader = document.getElementById("loader");
    const result = document.getElementById("result");
    const error = document.getElementById("error");

    // ✅ RESET EVERYTHING FIRST
    error.innerText = "";
    result.classList.add("hidden");
    loader.classList.remove("hidden");

    try {
        const res = await fetch(`https://leetmetric-y0uj.onrender.com/leetcode/${username}`);
        const data = await res.json();

        console.log(data);

        if (!data || !data.data || !data.data.matchedUser) {
            throw new Error("Invalid username");
        }

        const stats = data.data.matchedUser.submitStats.acSubmissionNum;

        let easy = stats.find(s => s.difficulty === "Easy")?.count || 0;
        let medium = stats.find(s => s.difficulty === "Medium")?.count || 0;
        let hard = stats.find(s => s.difficulty === "Hard")?.count || 0;

        // ✅ SUCCESS UI
        loader.classList.add("hidden");
        result.classList.remove("hidden");
        error.innerText = "";   // ⭐ IMPORTANT FIX

        document.getElementById("easy").innerText = easy;
        document.getElementById("medium").innerText = medium;
        document.getElementById("hard").innerText = hard;

        // createChart(easy, medium, hard);

    } catch (err) {
        loader.classList.add("hidden");
        result.classList.add("hidden"); // optional clean UI
        error.innerText = "⚠️ Invalid username or server issue";
        console.error(err);
    }
}