import StompService from '../Config/Stomp';

StompService.connect().then(() => {
    StompService.subscribe('/topic/my-topic', (message) => {
        console.log('Received message:', message);
    });
});

// Send a message
StompService.send('/topic/my-topic', { hello: 'world' });