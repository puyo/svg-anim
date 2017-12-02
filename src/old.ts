import './styles/main.css'
import jQuery from 'jquery'
import debug from 'debug'
import { sayHelloTo, sayGoodbyeTo } from './modules/mod1'
import addArray from './modules/mod2'
import * as Phaser from 'phaser'

const $ = jQuery
const log = debug('app:log')

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

const t = Number(new Date())
const url = `https://images.ozspeedtest.com/images/grass_15mb.jpg?t=${t}`
//const url = 'https://www.youtube.com'
var percentComplete = 1

$.ajax({
  method: "post",
  url: url,
  data: { actionPerform: "actionPerform" },
  xhr: function() {
    const xhr = new (<any>window).XMLHttpRequest()
    xhr.addEventListener(
      "progress",
      function(e : ProgressEvent) {
        if (e.lengthComputable) {
          percentComplete = e.loaded / e.total * 100
          log(percentComplete)
          $("#bulk-action-progbar").toggleClass("progress-bar-animated", false)
          $("#bulk-action-progbar").data("aria-valuenow", percentComplete)
          $("#bulk-action-progbar").css("width", percentComplete + "%")
        } else {
          $("#bulk-action-progbar").data("aria-valuenow", 100)
          $("#bulk-action-progbar").css("width", "100%")
          $("#bulk-action-progbar").toggleClass("progress-bar-animated", true)
          log("Length not computable.")
        }
      },
      false
    )
    return xhr
  },
  success: function(res : any) {
    $("#bulk-action-progbar").toggleClass("progress-bar-animated", false)
    log("RESULT", res.length)
  },
  error: function(xhr, status, msg) {
    $("#bulk-action-progbar").toggleClass("progress-bar-animated", false)
    log("ERROR", status)
  }
})
