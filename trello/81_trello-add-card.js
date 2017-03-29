var Trello = require('node-trello')

module.exports = function (RED) {
  function TrelloAddCardNode (config) {
    RED.nodes.createNode(this, config)
    var node = this

    // Retrieve the config node
    var credentialNode = RED.nodes.getNode(config.trello)
    var trello = new Trello(credentialNode.apikey, credentialNode.secret)
    this.on('input', function (msg) {
      var sendData = {
        name:      msg.trello.name      || config.cardName,
        desc:      msg.trello.desc      || config.desc,
        idList:    msg.trello.idList    || config.idList,
        pos:       msg.trello.pos       || config.pos,
        due:       msg.trello.due       || config.due,
        idMembers: msg.trello.idMembers || config.idMembers,
        idLabels:  msg.trello.idLabels  || config.idLabels
      }
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
