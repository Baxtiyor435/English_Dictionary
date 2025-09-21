const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    const inpWord = document.getElementById("inp-word").value.trim();
    if (!inpWord) return alert("Please enter a word");

    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            // Audio URL (agar mavjud bo'lsa)
            const audioUrl = data[0]?.phonetics?.[0]?.audio || "";

            // HTML yaratish
            result.innerHTML = `
                <div class="word">
                    <h3>${inpWord}</h3>
                    ${audioUrl ? `<button id="play-sound"><i class="fa-solid fa-volume-high"></i></button>` : ""}
                </div>
                <div class="details">
                    <p>Part of Speech: ${data[0].meanings[0].partOfSpeech}</p>
                </div>
                <p class="word-meaning">
                    ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || "No example available"}
                </p>
            `;

            // Audio tugmasini ishga tushirish
            if (audioUrl) {
                const audio = new Audio(audioUrl);
                document.getElementById("play-sound").addEventListener("click", () => {
                    audio.play();
                });
            }
        })
        .catch((err) => {
            result.innerHTML = `<p>Word not found!</p>`;
            console.error(err);
        });
});
