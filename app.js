const player = videojs("my-video");

const chatsTest = document.querySelector(".hidden");

const Plugin = videojs.getPlugin("plugin");

class Advanced extends Plugin {
  constructor(player, options) {
    super(player, options);

    this.on(player, ["playing", "pause"], this.updateState);
    this.on("statechanged", this.logState);
    this.one(player, "playing", this.newClass);
  }

  updateState() {
    this.setState({ playing: !this.player.paused() });
  }

  logState(changed) {
    videojs.log(
      `the player is now ${this.state.playing ? "playing" : "paused"}`
    );
  }

  newClass(changed) {
    chatsTest.classList.add("show");
  }
}

videojs.registerPlugin("advanced", Advanced);

player.advanced();

player.play();

class ChatComponent extends HTMLElement {
  render() {
    this.innerHTML = `
        <div class="main-wrapper">
        <div class="chat-title">Чат</div>
        <div class="message-list"></div>
        <div class="input-wrapper">
          <input class="message-input" placeholder="Сообщение" type="text">
          <button type="button" class="submit-btn">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier"> 
                <path d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          </button>
        </div>
      </div>
      `;
  }

  connectedCallback() {
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }
}

customElements.define("chat-component", ChatComponent);

const listМessage = document.querySelector(".message-list");
const inputMessage = document.querySelector(".message-input");
const buttonElement = document.querySelector(".submit-btn");
const chatData = JSON.parse(localStorage.getItem("messageList")) || [];

buttonElement.setAttribute("onclick", "addList()");

inputMessage.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addList();
  }
});

function addItem() {
  listМessage.innerHTML = "";

  for (i of chatData) {
    const list = document.createElement("div");
    const textItem = document.createElement("p");
    const ItemEl = document.createTextNode(i);

    list.setAttribute("class", "item");

    const dataEl = chatData.indexOf(i);

    textItem.appendChild(ItemEl);
    list.appendChild(textItem);
    listМessage.appendChild(list);
  }
}

addItem();

function addList() {
  const chat = inputMessage.value;

  if (chat != "") {
    chatData.push(chat);
    inputMessage.value = "";
    addItem();
    localItem();
  }
}

function localItem() {
  localStorage.setItem("messageList", JSON.stringify(chatData));
}
