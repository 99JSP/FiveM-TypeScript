const webpack = require("webpack");
const path = require("path");
const RemovePlugin = require("remove-files-webpack-plugin");

const buildPath = path.resolve(__dirname, "build");

const server = {
    entry: "./server/src/server.ts",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ["ts-loader"],
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({ "global.GENTLY": false }),
        new RemovePlugin({
            before: {
                include: [path.resolve(buildPath, "server")],
            },
            watch: {
                include: [path.resolve(buildPath, "server")],
            },
        }),
    ],
    optimization: {
        minimize: true,
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    output: {
        filename: "[contenthash].server.js",
        path: path.resolve(buildPath, "server"),
    },
    target: "node",
};

const client = {
    entry: "./client/src/client.ts",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ["ts-loader"],
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new RemovePlugin({
            before: {
                include: [path.resolve(buildPath, "client")],
            },
            watch: {
                include: [path.resolve(buildPath, "client")],
            },
        }),
    ],
    optimization: {
        minimize: true,
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    output: {
        filename: "[contenthash].client.js",
        path: path.resolve(buildPath, "client"),
    },
};

module.exports = [server, client];
// module.exports = client;
