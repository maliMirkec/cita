let FontFaceObserver;

// =include fontfaceobserver/fontfaceobserver.js

(function () {
  // Optimization for Repeat Views
  if (window.sessionStorage.criticalFoftDataUriFontsLoaded) {
    document.documentElement.className += ' fonts-stage-1 fonts-stage-2'
    return
  }

  const fontASubset = new FontFaceObserver('LatoSubset')

  Promise.all([fontASubset.load()]).then(() => {
    document.documentElement.className += ' fonts-stage-1'
    const fontA = new FontFaceObserver('Muli')
    Promise.all([fontA.load()]).then(() => {
      document.documentElement.className += ' fonts-stage-2'
      // Optimization for Repeat Views
      window.sessionStorage.criticalFoftDataUriFontsLoaded = true
    })
  })
})()
