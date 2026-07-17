from abc import ABC,abstractmethod

class NotificationProvider(ABC):
    @abstractmethod
    def send(self,notification):
        """
        Sends a notification using the provider 
        implementation
        """

        raise NotImplementedError