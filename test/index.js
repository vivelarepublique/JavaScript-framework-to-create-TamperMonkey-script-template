const html = /*html*/ `<form name="f" id="form">
    <div id="s_kw_wrap">
        <div class="input-group mb-3">
            <span class="input-group-text">Input</span>
            <input id="input" type="text" class="form-control" placeholder="input" >
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Sync</span>
            <input id="kw" disabled type="text" class="form-control" placeholder="sync">
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
