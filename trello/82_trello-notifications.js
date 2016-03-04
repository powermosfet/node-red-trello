var Trello = require('node-trello')
var JSONStream = require('JSONStream')
var es = require('event-stream')

module.exports = function (RED) {
  function TrelloNotificationNode (config) {
    RED.nodes.createNode(this, config)
    var node = this

    // Retrieve the config node
    var credentialNode = RED.nodes.getNode(config.trello)
    var trello = new Trello(credentialNode.apikey, credentialNode.secret)
    trello.get(
      '/1/boards/' + '52cdc8992ffa9f613dfdb046' + '/actions',
      {},
      function (err, data) {
        console.log(data)
        node.send(data)
      }
    )
  }
  RED.nodes.registerType('trello-notifications', TrelloNotificationNode)
}
