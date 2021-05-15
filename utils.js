const Gio = imports.gi.Gio;

function execCommand(argv) {
    let proc = new Gio.Subprocess({
        argv: argv,
        flags: Gio.SubprocessFlags.STDOUT_PIPE,
    });
    proc.init(null);

    return new Promise((resolve, reject) => {
        proc.communicate_utf8_async(
            null,  // input
            null,  // cancellable
            (source, result) => {
                try {
                    resolve(source.communicate_utf8_finish(result)[1]);
                } catch(e) {
                    reject(e);
                }
            }
        );
    });
}
