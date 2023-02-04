const loadingBar = document.getElementById('loadingFill');
const loadingState = document.getElementById('loadingState');
const temp = {};
const loadWait = 100;
const afterLoadTime = 1000;

function load(data) {
    window.onbeforeunload = function() {
        return "Keep pressing cancel";
    }

    document.title = "TMT-Maker Loading..."

    if (!data.new) {
        loadNew(data);
    }
    else {
        loadExisting(data);
    }
}

async function loadNew(data) {
    loadingSection.style.display = "flex";

    const config = await fetch('./default/new-config.json').then(r => r.json());
    const loadActions = config.loadActions;
    const total = loadActions.length;

    for (let i = 0; i < loadActions.length; i++) {
        setLoadingBar((i + 1) / total);
        await loadAction(data.directory, data, loadActions[i]);
        await wait(loadWait);
    }

    await wait(afterLoadTime);

    setLoadingBarState('Done!');

    await wait(1000000);

    loadingSection.style.display = "none";
}

async function loadExisting(data) {
    loadingSection.style.display = "flex";

    const config = data.config;
    const loadActions = config.loadActions;
    const total = loadActions.length;

    for (let i = 0; i < loadActions.length; i++) {
        setLoadingBar((i + 1) / total);
        await loadAction(data.directory, data, loadActions[i]);
        await wait(loadWait);
    }

    await wait(afterLoadTime);

    setLoadingBarState('Done!');

    await wait(1000000);

    loadingSection.style.display = "none";
}

async function loadAction(directory, data, action) {
    setLoadingBarState(action.state);

    switch (action.action) {
        case "getFileForTemp":
            temp[action.key] = await fetch(action.path).then(r => r.arrayBuffer());
            break;
    
        case "createFileFromTemp":
            const fileHandle = await directory.getFileHandle(action.path, {create:true});
            const writeStream = await fileHandle.createWritable();
            await writeStream.write(temp[action.key]);
            await writeStream.close();
            break;
        
        case "createDirectory":
            const directoryHandle = await directory.getDirectoryHandle(action.path, {create:true});
            const loadActions = action.actions;
            await wait(loadWait);

            for (let i = 0; i < loadActions.length; i++) {
                await loadAction(directoryHandle, data, loadActions[i]);
                await wait(loadWait);
            }
            break;

        default:
            break;
    }
}

function setLoadingBar(percentage) {
    percentage = Math.min(1, Math.max(0, percentage));
    var p = `${Math.round(percentage * 10000) / 100}%`;
    loadingBar.innerHTML = p;
    loadingBar.style.width = `${percentage * 100}%`
}

function setLoadingBarState(state) {
    loadingState.innerHTML = state;
}