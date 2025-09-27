class SmallLenghtError(ValueError):
    """Raised when the length of the input is less than 6."""
    def __init__(self, message="The length of the input is less than 6"):
        super().__init__(message)


class LargeLenghtError(ValueError):
    """Raised when the length of the input is greater than 32."""
    def __init__(self, message="The length of the input is greater than 32"):
        super().__init__(message)
