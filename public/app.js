new Vue({
    el: '#app',

    data: {
        ws: null, 
        newMsg: '', 
        chatContent: '',
        username: null, 
        joined: false 
    },

    created: function() {
        var self = this;
        this.ws = new WebSocket('ws://' + window.location.host + '/ws');
        this.ws.addEventListener('message', function(e) {
            var msg = JSON.parse(e.data);
            self.chatContent += '<div>'
				+ '<b>' 
                + msg.username 
                + ": "
				+ '</b>' 				
				+ emojione.toImage(msg.message) + '</div>'
                + '<br/>'; 

            var element = document.getElementById('chat-messages');
            element.scrollTop = element.scrollHeight; 
        });
    },

    methods: {
        send: function () {
            if (this.newMsg != '') {
                this.ws.send(
                    JSON.stringify({
                        username: this.username,
                        message: $('<p>').html(this.newMsg).text() 
                    }
                ));
                this.newMsg = ''; 
            }
        },

        join: function () {
            if (!this.username) {
                Materialize.toast('Isi Username', 2000);
                return
            }
            this.username = $('<p>').html(this.username).text();
            this.joined = true;
        },
    }
});