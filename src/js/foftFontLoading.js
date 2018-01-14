let FontFaceObserver;

// =include fontfaceobserver/fontfaceobserver.js

(function () {
  // Optimization for Repeat Views
  if (window.sessionStorage.criticalFoftDataUriFontsLoaded) {
    document.documentElement.className += ' fonts-stage-1'
    return
  }

  const fontASubset = new FontFaceObserver('Muli')

  Promise.all([fontASubset.load()]).then(() => {
    document.documentElement.className += ' fonts-stage-1'
    window.sessionStorage.criticalFoftDataUriFontsLoaded = true
  })
})()
