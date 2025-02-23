const Handlebars = require("handlebars");

module.exports = {
  cascadingImages: function (images, columns, options) {
    let html = "";
    const numColumns = parseInt(columns, 10) || 2; // Default to 2 columns
    const numRows = Math.ceil(images.length / numColumns); // Calculate rows needed

    // Create empty columns
    const columnData = Array.from({ length: numColumns }, () => []);

    // Distribute images row-first
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numColumns; col++) {
        const imageIndex = row * numColumns + col; // Calculate index row-first
        if (imageIndex < images.length) {
          columnData[col].push(images[imageIndex]); // Assign to correct column
        }
      }
    }

    // Generate column divs
    html += '<div class="gallery-flex-grid">';
    columnData.forEach((column) => {
      html += '<div class="gallery-column">';
      column.forEach((image) => {
        html += `<div class="gallery-item">
                    <img src="${image.path}" alt="${image.alt}" loading="lazy">
                 </div>`;
      });
      html += "</div>";
    });
    html += "</div>";

    return new Handlebars.SafeString(html);
  },
};
