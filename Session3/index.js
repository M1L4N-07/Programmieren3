const os = require("os")
let message = "The platform is "

function main() {
    console.log(message + os.platform)
}

main()