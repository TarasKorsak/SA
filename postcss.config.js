module.exports = {
    syntax: "postcss-scss",
    plugins: [
        require("postcss-easy-import")({
            extensions: ".scss"
        }),
        require("autoprefixer")({
            browsers: ["last 2 versions"],
            cascade: false
        }),
        require("postcss-advanced-variables"),
        require("postcss-nested"),
        require("cssnano")()
    ]
};