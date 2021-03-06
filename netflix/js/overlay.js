(()=>{
  $overlay = document.getElementById('overlay');
  $close = $overlay.getElementsByClassName('close')[0];

  $close.addEventListener('click', (e) => {
    window.location.hash = '';
  })

  window.onhashchange = () => {
    checkHash(window.location.hash);
  }

  document.body.onload = () => {
    checkHash(window.location.hash);
  }

  function checkHash(hash) {
    if(hash[0] === '#' && hash.length > 1) {
      $overlay.className = '';
      var videoUrl = `https://www.youtube.com/embed/${hash.slice(1, hash.length)}?autoplay=1`

      $iframe = document.createElement('iframe')
      $iframe.width = '100%';
      $iframe.height = '70%';
      $iframe.src = videoUrl;

      $overlay.append($iframe);
    } else {
      $overlay.className = 'hidden';
      if ($overlay.childNodes[3]) {
        $overlay.removeChild($overlay.childNodes[3]);
      }
    }
  }
})()
