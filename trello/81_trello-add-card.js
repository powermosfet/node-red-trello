var Trello = require('node-trello')

module.exports = function (RED) {
  function TrelloAddCardNode (config) {
    RED.nodes.createNode(this, config)
    var node = this

    // Retrieve the config node
    var credentialNode = RED.nodes.getNode(config.trello)
    var trello = new Trello(credentialNode.apikey, credentialNode.secret)
    this.on('input', function (msg) {
      var sendData = {} //
      sendData.name = msg.trello.name ? msg.trello.name : config.cardName
      sendData.desc = msg.trello.desc ? msg.trello.desc : config.desc
      sendData.idList = msg.trello.idList ? msg.trello.idList : config.idList
      sendData.pos = msg.trello.pos ? msg.trello.pos : config.pos
      sendData.due = msg.trello.due ? msg.trello.due : config.due
      sendData.idMembers = msg.trello.idMembers ? msg.trello.idMembers : config.idMembers
      sendData.idLabels = msg.trello.idLabels ? msg.trello.idLabels : config.idLabels
      trello.post(
        '/1/cards',
        sendData,
        (err, data) => {
          if (err) { node.error(err) }
          node.send(data)
        }
      )
    })
  }
  RED.nodes.registerType('trello-add-card', TrelloAddCardNode)
}
