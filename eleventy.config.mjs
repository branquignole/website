import fs from 'fs';
import path from 'path';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';

export default function (eleventyConfig) {
  eleventyConfig.on('eleventy.before', async () => {
    const tailwindInputPath = path.resolve('./src/styles/index.css');
    const tailwindOutputPath = './docs/styles/index.css';
    const cssContent = fs.readFileSync(tailwindInputPath, 'utf8');
    const outputDir = path.dirname(tailwindOutputPath);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const result = await postcss([tailwindcss()]).process(cssContent, {
      from: tailwindInputPath,
      to: tailwindOutputPath,
    });

    fs.writeFileSync(tailwindOutputPath, result.css);
  });
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/_data");

    eleventyConfig.addCollection("research", collection =>
        collection.getFilteredByGlob("./src/research.md")
    );
    eleventyConfig.addCollection("about", collection =>
        collection.getFilteredByGlob("./src/about.md")
    );
    eleventyConfig.addCollection("teaching", collection =>
        collection.getFilteredByGlob("./src/teaching.md")
    );

    eleventyConfig.addCollection("publications", collection =>
        collection.getFilteredByGlob("./src/publications.md")
    );

    eleventyConfig.addCollection("recent_projects", collection =>
        collection.getFilteredByGlob("./src/recent_projects.md")
    );

    eleventyConfig.addCollection("projects", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/projects/*.md");
    });

    eleventyConfig.addShortcode("currentYear", () => {
        return new Date().getFullYear();
    });


    return {
    dir: { input: 'src', output: 'docs' },
      templateFormats: ["njk", "md"],  // <- s'assurer que njk est bien supporté
      htmlTemplateEngine: "njk",
      markdownTemplateEngine: "njk"
  };

}
