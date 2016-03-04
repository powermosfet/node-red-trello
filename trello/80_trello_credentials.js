module.exports = function (RED) {

// credentials
  function TrelloNode (config) {
    RED.nodes.createNode(this, config)
    this.memberId = config.memberId
    this.apikey = config.apikey
    this.secret = config.secret
  }
  RED.nodes.registerType('trello-credentials', TrelloNode)
}
