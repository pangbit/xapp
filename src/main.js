const { invoke } = window.__TAURI__.primitives;
const { writeText } = window.__TAURI__.clipboardManager;

let xTextEl;
let base64EncodeBtn;
let base64DecodeBtn;
let urlEncodeBtn;
let urlDecodeBtn;
let cleanBtn;
let copyBtn;

async function base64decode() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  xTextEl.value = await invoke("base64_decode", { input: xTextEl.value });
}

async function base64encode() {
  xTextEl.value = await invoke("base64_encode", { input: xTextEl.value });
}

async function urlencode() {
  xTextEl.value = await invoke("url_encode", { input: xTextEl.value });
}

async function urldecode() {
  xTextEl.value = await invoke("url_decode", { input: xTextEl.value });
}

window.addEventListener("DOMContentLoaded", () => {
  xTextEl = document.querySelector("#xtext");

  base64DecodeBtn = document.querySelector("#btn-base64-decode");
  base64EncodeBtn = document.querySelector("#btn-base64-encode");

  urlDecodeBtn = document.querySelector("#btn-url-decode");
  urlEncodeBtn = document.querySelector("#btn-url-encode");

  cleanBtn = document.querySelector("#btn-clean");
  copyBtn = document.querySelector("#btn-copy");

  base64DecodeBtn.addEventListener("click", () => {
    base64decode();
  });

  base64EncodeBtn.addEventListener("click", () => {
    base64encode();
  });

  urlDecodeBtn.addEventListener("click", () => {
    urldecode();
  });

  urlEncodeBtn.addEventListener("click", () => {
    urlencode();
  });

  cleanBtn.addEventListener("click", () => {
    xTextEl.value = "";
  })

  copyBtn.addEventListener("click", () => {
    writeText(xTextEl.value);
  });

  console.log("hello tauri");
});
