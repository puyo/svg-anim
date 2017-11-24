import '../styles/main.css'
import jquery from 'jquery'
import { sayHelloTo, sayGoodbyeTo } from './modules/mod1'
import addArray from './modules/mod2'
import debug from 'debug'

const log = debug('app:log')

window.$ = window.jQuery = jquery

// The logger should only be disabled if we’re not in production.
if (ENV !== 'production') {

  // Enable the logger.
  debug.enable('*')
  log('Logging is enabled!')

  // Enable LiveReload
  document.write(
    '<script src="http://' + (location.host || 'localhost').split(':')[0] +
    ':35729/livereload.js?snipver=1"></' + 'script>'
  )
} else {
  debug.disable()
}

// Run some functions from our imported modules.
const result1 = sayHelloTo('Jason')
const result2 = addArray([1, 2, 3, 4])

// Print the results on the page.
const printTarget = document.getElementsByClassName('debug__output')[0]

printTarget.innerText = `sayHelloTo('Jason') => ${result1}\n\n`
printTarget.innerText += `addArray([1, 2, 3, 4]) => ${result2}\n`
printTarget.innerText += sayGoodbyeTo('Foo')


function consume(reader) {
  var total = 0
  var output = ''
  log(reader)
  return new Promise((resolve, reject) => {
    function pump() {
      reader.read().then(({done, value}) => {
        if (done) {
          resolve(output)
          return
        }
        output += value
        total += value.byteLength
        log(`received ${value.byteLength} bytes (${total} bytes in total)`)
        pump()
      }).catch(reject)
    }
    pump()
  })
}

const t = Number(new Date())
const url = `https://images.ozspeedtest.com/images/grass_15mb.jpg?t=${t}`
//const url = 'https://www.youtube.com'
var percentComplete = 1;

$.ajax({
  method: "post",
  url: url,
  data: { actionPerform: "actionPerform" },
  xhr: function() {
    var xhr = new window.XMLHttpRequest();
    xhr.addEventListener(
      "progress",
      function(e) {
        if (e.lengthComputable) {
          //percentComplete = (e.loaded / e.total) * 100
          percentComplete = parseInt(e.loaded / e.total * 100, 10);
          log(percentComplete);
          $("#bulk-action-progbar").toggleClass("progress-bar-animated", false);
          $("#bulk-action-progbar").data("aria-valuenow", percentComplete);
          $("#bulk-action-progbar").css("width", percentComplete + "%");
        } else {
          $("#bulk-action-progbar").data("aria-valuenow", 100);
          $("#bulk-action-progbar").css("width", "100%");
          $("#bulk-action-progbar").toggleClass("progress-bar-animated", true);
          log("Length not computable.");
        }
      },
      false
    );
    return xhr;
  },
  success: function(res) {
    $("#bulk-action-progbar").toggleClass("progress-bar-animated", false);
    log("RESULT", res.length);
  },
  error: function(xhr, status, msg) {
    $("#bulk-action-progbar").toggleClass("progress-bar-animated", false);
    log("ERROR", status);
  }
});

// fetch(url)
//   .then(res => consume(res.body.getReader()))
//   .then((x) => log("consumed the entire body without keeping the whole thing in memory!", x.slice(1,10)))
//   .catch(e => log("something went wrong: " + e))
