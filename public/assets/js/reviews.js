// var animTime = 6, // time for the animation in seconds
//     hueChange = 3, // the hue change from one span element to the next
//     prefixes = ["", "-webkit-", "-moz-", "-o-"],
//     numPrefixes = prefixes.length;

// $('.unicorn').find('i').each(function (i) {
//     for (var j = 0; j < numPrefixes; j++) {
//         $(this).css(prefixes[j] + 'animation-delay', (animTime * ((i * hueChange) % 360) / 360) - animTime + 's');
//     }
// });