const version = document.getElementById('version');

addEventListener("load", async e => {
    const data = await fetch('../tmt-maker.json').then(r => r.json());

    version.innerHTML = `TMT-Maker Version ${data.version}`;
});