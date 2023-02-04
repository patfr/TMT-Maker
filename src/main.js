const uploadSection = document.getElementById('uploadSection');
const loadingSection = document.getElementById('loadingSection');
const editorSection = document.getElementById('editorSection');

const data = {
    directory: null,
    new: false,
    config: null,
}

async function askForUpload() {
    const handle = await window.showDirectoryPicker({multiple: false});

    if (!handle) return;

    data.directory = handle;

    try {
        const file = await handle.getFileHandle('tmt-maker_config.json', {create:false});
        data.config = await file.text();
    } catch (error) {
        data.new = true;
        data.config = "";
    }

    uploaded();
}

function uploaded() {
    uploadSection.remove();

    load(data);

    editorSection.style.display = "initial";
}