from abc import ABC, abstractmethod

class Basepolicy(ABC):
    """
    Base class for all business policies
    """

    @abstractmethod
    def evaluate(self,user,resource):
        """
        Return True if the policy passes
        """

        raise NotImplementedError
    