const AppDisplay = imports.ui.appDisplay;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const ShortcutMaker = Me.imports.shortcutMaker;
const RepairShortcuts = Me.imports.repairShortcuts;

// Saves the standard Menu globally to be able to reset it on disable
var parentMenu = null;

function init () {

}

function enable () {
    parentMenu = AppDisplay.AppIconMenu;
    ShortcutMaker.editMenuClass(parentMenu);
    RepairShortcuts.startupCheck();
}

function disable () {
    // Reset the menu to the standard one (without new item)
    AppDisplay.AppIconMenu = parentMenu;
}
