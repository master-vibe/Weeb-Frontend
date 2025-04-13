// stomp.service.js
import { Client } from '@stomp/stompjs';

class StompService {
    constructor() {
        this.client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });
    }

    async connect() {
        try {
            await this.client.connect();
            console.log('Connected to Stomp broker');
        } catch (error) {
            console.error('Error connecting to Stomp broker:', error);
        }
    }

    async disconnect() {
        try {
            await this.client.disconnect();
            console.log('Disconnected from Stomp broker');
        } catch (error) {
            console.error('Error disconnecting from Stomp broker:', error);
        }
    }

    async subscribe(destination, callback) {
        try {
            await this.client.subscribe(destination, callback);
            console.log(`Subscribed to destination: ${destination}`);
        } catch (error) {
            console.error(`Error subscribing to destination: ${destination}`, error);
        }
    }

    async unsubscribe(destination) {
        try {
            await this.client.unsubscribe(destination);
            console.log(`Unsubscribed from destination: ${destination}`);
        } catch (error) {
            console.error(`Error unsubscribing from destination: ${destination}`, error);
        }
    }

    async send(destination, message) {
        try {
            await this.client.send(destination, {}, JSON.stringify(message));
            console.log(`Sent message to destination: ${destination}`);
        } catch (error) {
            console.error(`Error sending message to destination: ${destination}`, error);
        }
    }
}

export default new StompService();