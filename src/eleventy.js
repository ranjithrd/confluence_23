const { EleventyRenderPlugin } = require("@11ty/eleventy")
const markdownIt = require("markdown-it")
const markdownItRenderer = new markdownIt({
	breaks: true,
})
const eleventyRenderer = markdownIt({
	breaks: true,
})

module.exports = function (eleventyConfig) {
	// Ensures nothing interferes with the data files
	eleventyConfig.addPassthroughCopy("src/admin")
	eleventyConfig.addPassthroughCopy("src/_media")
	eleventyConfig.addPassthroughCopy("src/**/*.js")

	// Live reload for data
	eleventyConfig.addWatchTarget("src/_data")
	eleventyConfig.addWatchTarget("src/styles")

	// Markdown for descriptions, summaries etc
	eleventyConfig.addPlugin(EleventyRenderPlugin)
	eleventyConfig.addFilter("markdownify", (str) => {
		return markdownItRenderer.renderInline(str ?? "")
	})
	eleventyConfig.addFilter("mdfy", (str) => {
		return markdownItRenderer.render(str ?? "")
	})
	eleventyConfig.setLibrary("md", eleventyRenderer)

	// Liquid options
	eleventyConfig.setLiquidOptions({
		dynamicPartials: true,
		strict_filters: false,
	})

	return {
		passthroughFileCopy: true,
		dir: {
			input: "src",
			output: "_site",
		},
	}
}
