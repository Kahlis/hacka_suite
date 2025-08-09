use std::{collections::HashSet, thread, time::Duration};

use device_query::{DeviceQuery, DeviceState, Keycode};
use tauri::{AppHandle, Emitter, Manager};

pub fn start_keyboard_listener(app_handle: AppHandle) {
    thread::spawn(move || {
        let device_state = DeviceState::new();

        loop {
            let keys: HashSet<Keycode> = device_state.get_keys().into_iter().collect();

            if keys.contains(&Keycode::LControl)
                && keys.contains(&Keycode::F12)
                && keys.contains(&Keycode::LShift)
            {
                let window = app_handle.get_webview_window("main").unwrap();
                if window.is_visible().unwrap() {
                    let _ = window.hide();
                } else {
                    let _ = window.show();
                }
            }

            thread::sleep(Duration::from_millis(50));
        }
    });
}
