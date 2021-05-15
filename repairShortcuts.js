const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const ShortcutMaker = Me.imports.shortcutMaker;
const Utils = Me.imports.utils;

var shortcutMaker = new ShortcutMaker.ShortcutMaker();

async function startupCheck() {
    let desktop = Gio.File.new_for_path(shortcutMaker._desktop);

    log("Ollare");

    desktop.enumerate_children_async(
        'standard::*',
        Gio.FileQueryInfoFlags.NONE,
        GLib.PRIORITY_DEFAULT,
        null,
        (source, result) => {
            try {
                let fileEnum = source.enumerate_children_finish(result);
                let info;
                while (info = fileEnum.next_file(null)) {
                    let filePath = shortcutMaker._desktop + '/' + info.get_name();
                    checkFile(filePath);
                }
            }
            catch (e) {
                log(`Failed to list files in Desktop folder: ${e.message}`);
            }
        }
    );
}

async function checkFile(filePath) {
    // Gio APis don't work with metadata attributes so I have to use command line interface
    let appPath;
    try {
        appPath = (await Utils.execCommand(['gio', 'info', '--attributes=metadata::shortcut-of', filePath])).match('metadata::shortcut-of: [^\n]*');
    }
    catch (e) {
        log(`Failed to get metadata: ${e.message}`);
        return;
    }

    if(appPath === null) {
        return;
    }

    //TODO: now we know it is a shortcut but we have to check if it is broken before repair it
    if(false) {
        repairShortcut(appPath);
    }
}

function repairShortcut(appPath) {
    shortcutMaker.makeShortcut(appPath);
}
