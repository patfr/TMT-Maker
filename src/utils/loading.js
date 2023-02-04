const loadingBar = document.getElementById('loadingFill');
const loadingState = document.getElementById('loadingState');

function load(data) {
    if (data.new) {
        loadNew(data);
    }
    else {
        loadExisting(data);
    }
}

async function loadNew(data) {
    loadingSection.style.display = "flex";

    const config = await fetch('./default/default-config.json')
        .then(r => r.json());
    
        console.log(config);

    const sampleData = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    ];

    const total = sampleData.length;

    for (let i = 0; i < sampleData.length; i++) {
        setLoadingBar((i + 1) / total, "Loading file");
        loadAction(data, "")
        await wait(50);
    }

    await wait(1000);

    loadingSection.style.display = "none";
}

async function loadExisting(data) {
    loadingSection.style.display = "flex";

    loadingSection.style.display = "none";
}

function loadAction(data, action) {

}

function setLoadingBar(percentage, state) {
    percentage = Math.min(1, Math.max(0, percentage));
    var p = `${Math.round(percentage * 10000) / 100}%`;
    loadingBar.innerHTML = p;
    loadingState.innerHTML = state;
    loadingBar.style.width = `${percentage * 100}%`
}