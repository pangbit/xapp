// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use base64::{engine::general_purpose, Engine as _};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn base64_decode(input: &str) -> String {
    match general_purpose::STANDARD.decode(input) {
        Ok(bs) => String::from_utf8_lossy(&bs).to_string(),
        Err(e) => format!("Decode Err: '{e:?}'"),
    }
}

#[tauri::command]
fn base64_encode(input: &str) -> String {
    general_purpose::STANDARD.encode(input)
}

#[tauri::command]
fn url_encode(input: &str) -> String {
    urlencoding::encode(input).to_string()
}

#[tauri::command]
fn url_decode(input: &str) -> String {
    // match urlencoding::decode(input) {
    //     Ok(s) => String::from_utf8_lossy(s.as_bytes()).to_string(),
    //     Err(e) => format!("Decode Err: '{e:?}'"),
    // }

    String::from_utf8_lossy(urlencoding::decode_binary(input.as_bytes()).as_ref()).to_string()
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_window::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .invoke_handler(tauri::generate_handler![
            base64_encode,
            base64_decode,
            url_encode,
            url_decode
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
