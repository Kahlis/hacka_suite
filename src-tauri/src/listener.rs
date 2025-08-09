use std::{collections::HashSet, thread, time::Duration};

use device_query::{DeviceQuery, DeviceState, Keycode};
use tauri::{AppHandle, Emitter, Manager};

pub fn start_keyboard_listener(app_handle: AppHandle) {
    thread::spawn(move || {
        let device_state = DeviceState::new();
        let mut last_keys: HashSet<Keycode> = HashSet::new();

        loop {
            let keys: HashSet<Keycode> = device_state.get_keys().into_iter().collect();

            if keys.contains(&Keycode::LControl)
                && keys.contains(&Keycode::F12)
                && keys.contains(&Keycode::LShift)
                && (!last_keys.contains(&Keycode::LControl) || !last_keys.contains(&Keycode::F12))
            {
                let window = app_handle.get_webview_window("main").unwrap();
                if window.is_visible().unwrap() {
                    let _ = window.hide();
                } else {
                    let _ = window.show();
                }
            }

            if keys != last_keys {
                for key in keys.difference(&last_keys) {
                    let _ = app_handle.emit("key_event", format!("Pressed: {:?}", key));
                }

                for key in last_keys.difference(&keys) {
                    let _ = app_handle.emit("key_event", format!("Released: {:?}", key));
                }

                last_keys = keys;
            }

            thread::sleep(Duration::from_millis(50));
        }
    });
}
