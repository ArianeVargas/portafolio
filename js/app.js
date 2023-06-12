document.addEventListener('DOMContentLoaded', function() {
    var cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);
  
    document.addEventListener('mousemove', function(e) {
      var x = e.clientX;
      var y = e.clientY;
  
      cursor.style.left = (x - 16) + 'px';  // Adjust the position to center the cursor
      cursor.style.top = (y - 16) + 'px';
    });
  });