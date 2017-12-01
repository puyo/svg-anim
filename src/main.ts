import './styles/main.css'
import jQuery = require('jquery')
import { sayHelloTo, sayGoodbyeTo } from './modules/mod1'
import addArray from './modules/mod2'
import debug = require('debug')

const log = debug('app:log')
const $ = jQuery

// window.$ = window.jQuery = jquery // for bootstrap.js

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

jQuery.ajax({
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
