var bpm = 60.0; // pass in bpm from song metadata

anime({
    targets: '.square',
    rotate:{
        value: '1turn',
        easing: 'easeInOutSine',
        duration: 60000 / bpm
      },
    loop: true
  });