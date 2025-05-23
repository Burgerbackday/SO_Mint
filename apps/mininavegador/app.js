registerWindowApp("mininavegador", {
  id: "mininavegador",
  title: "Mini Navegador",
  body: `
    <style>
      .browser-bar {
        background: #f3f3f3;
        padding: 6px;
        display: flex;
        gap: 4px;
        align-items: center;
        border-bottom: 1px solid #ccc;
      }
      .browser-bar input {
        flex: 1;
        padding: 4px 8px;
        border: 1px solid #aaa;
        border-radius: 4px;
        font-size: 13px;
      }
      .browser-bar button {
        background: #e0e0e0;
        border: 1px solid #aaa;
        padding: 4px 10px;
        cursor: pointer;
        border-radius: 3px;
        font-size: 12px;
      }
      .browser-frame {
        width: 100%;
        height: calc(100% - 40px);
        border: none;
      }
    </style>
    <div class="browser-bar">
      <button id="btnBack">←</button>
      <button id="btnForward">→</button>
      <input type="text" id="urlInput" placeholder="https://..." />
      <button id="btnGo">Ir</button>
    </div>
    <iframe id="browserFrame" class="browser-frame" src=""></iframe>
  `
});