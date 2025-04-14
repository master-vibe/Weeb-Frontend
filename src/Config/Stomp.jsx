// StompService.js
import { Client } from '@stomp/stompjs';

class StompService {
    constructor() {
        this.client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            debug: str => console.log('[STOMP DEBUG]', str),
        });

        this.connected = false;
    }

    static getInstance() {
        if (!StompService.instance) {
            StompService.instance = new StompService();
        }
        return StompService.instance;
    }

    getClient() {
        return this.client;
    }

    async connect() {
        if (this.connected) return;

        return new Promise((resolve, reject) => {
            this.client.onConnect = () => {
                this.connected = true;
                resolve();
            };
            this.client.onStompError = (frame) => {
                console.error('Broker reported error:', frame.headers['message']);
                reject(frame.body);
            };
            this.client.activate();
        });
    }

    async disconnect() {
        if (this.client && this.connected) {
            await this.client.deactivate();
            this.connected = false;
        }
    }
}

export default StompService.getInstance();
