document.addEventListener("DOMContentLoaded", function() { 
    const width = 600;
    const height = 600; 
    const svg = d3.select("svg") 
      .attr("width", width) 
      .attr("height", height); 
    let pict = drawSmile(svg); 
})