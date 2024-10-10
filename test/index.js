const html = /*html*/ `<form name="f" id="form">
    <div id="s_kw_wrap">
        <div class="field">
            <label class="label">Input</label>
            <div class="control">
                <input id="input" class="input" type="text" placeholder="input" >
            </div>
        </div>
        <div class="field">
            <label class="label">Sync</label>
            <div class="control">
                <input id="kw" class="input" readonly type="text" placeholder="sync">
            </div>
        </div>
    </div>
</form>
`;
const div = document.createElement('div');
div.innerHTML = html;
div.style.position = 'fixed';
div.style.top = '50%';
div.style.left = '50%';
div.style.transform = 'translate(-50%, -50%)';
div.style.backgroundColor = 'rgba(50, 50, 50, 0.5)';
div.style.padding = '20px';
div.style.border = '1px solid black';
div.style.borderRadius = '20px';

document.body.appendChild(div);

document.querySelector('#input').addEventListener('input', function () {
    document.querySelector('#kw').setAttribute('value', this.value);
});
