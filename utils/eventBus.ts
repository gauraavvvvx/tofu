type Listener = () => void

class EventBus {
    private listeners: Record<string, Listener[]> = {}

    subscribe(event: string, callback: Listener): () => void {
        if (!this.listeners[event]) {
            this.listeners[event] = []
        }

        this.listeners[event].push(callback)

        // Return unsubscribe function
        return () => {
            this.listeners[event] = this.listeners[event].filter(
                (cb) => cb !== callback
            )
        }
    }

    publish(event: string): void {
        if (this.listeners[event]) {
            this.listeners[event].forEach((callback) => {
                try {
                    callback()
                } catch (e) {
                    console.error(`Error in event handler for ${event}:`, e)
                }
            })
        }
    }
}

export const eventBus = new EventBus()

// Common events
export const EVENTS = {
    GOAL_UPDATED: 'goal_updated',
    TRANSACTION_CREATED: 'transaction_created',
    BALANCE_UPDATED: 'balance_updated',
}
