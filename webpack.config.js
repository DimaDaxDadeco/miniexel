var path = require("path");
module.exports = {
    entry: "./src/entry.js",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "autoprefixer", "sass"]
            },
            {
                test: /\.html$/,
                loader: "html"
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel"
            }
        ]
    },
    resolve: {
        root: [
            path.resolve("./src/")
        ],
        alias: {
            "components": path.resolve(__dirname, "src", "components")
        },
        extensions: ["", ".js"]
    }
};