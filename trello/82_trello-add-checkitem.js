var Trello = require('node-trello')

module.exports = function (RED) {
  function TrelloAddCheckitemNode (config) {
    RED.nodes.createNode(this, config)
    var node = this

    // Retrieve the config node
    var credentialNode = RED.nodes.getNode(config.trello)
    var trello = new Trello(credentialNode.apikey, credentialNode.secret)
    this.on('input', function (msg) {
      var idChecklist = config.idChecklist
      msg.trello = msg.trello || {}
      var sendData = {
        name:    msg.trello.name    || config.itemName,
        pos:     msg.trello.pos     || config.pos,
        checked: msg.trello.checked || config.checked
      }
      trello.post(
        '/1/checklists/' + idChecklist + '/checkItems',
        sendData,
        (err, data) => {
          if (err) { node.error(err) }
          node.send(data)
        }
      )
    })
  }
  RED.nodes.registerType('trello-add-checkitem', TrelloAddCheckitemNode)
}
