from collections import defaultdict


class EventDispatcher:
    """
    Simple in-process event dispatcher.

    Later this can be replaced with:
    - Celery
    - Kafka
    - RabbitMQ
    - AWS EventBridge
    """

    def __init__(self):
        self._handlers = defaultdict(list)

    def register(self, event_type, handler):
        self._handlers[event_type].append(handler)

    def dispatch(self, event):

        for handler in self._handlers[type(event)]:
            handler(event)