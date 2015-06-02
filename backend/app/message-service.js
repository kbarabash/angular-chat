"use strict";
module.exports = new MessageService();

function MessageService() {
    var collectionConnections = [];

    this.addConnection = function (connection) {
        console.log(

            'add connection'
        );
        connection.on('message', sendMessageToAllConnection.bind(this, connection));
        connection.on('close', removeConnectionFromCollection.bind(this, connection));
        collectionConnections.push(connection)
    };

    function sendMessageToAllConnection(connection, message) {
        console.log('Received Message: ' + message.utf8Data);
        collectionConnections.forEach(function (item) {
            if (item === connection) {
                return;
            }
            console.log('Received Message: ' + message.utf8Data);
            item.sendUTF(message.utf8Data);
        });
    }

    function removeConnectionFromCollection(connection) {
        var index = collectionConnections.indexOf(connection);
        if (index >= 0) {
            collectionConnections.splice(index, 1);
        }
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    }
}
