import random
import string

from algoritm.exceptions import LargeLenghtError, SmallLenghtError


def create_password(length=12, use_special_chars=True, use_numbers=True, use_uppercase=True, use_lowercase=True):
    characters = ''
    if length > 32:
        raise LargeLenghtError()
    elif length <6:
        raise SmallLenghtError()
    else:
        if use_lowercase:
            characters += string.ascii_lowercase
        if use_uppercase:
            characters += string.ascii_uppercase
        if use_special_chars:
            characters += string.punctuation
        if use_numbers:
            characters += string.digits

    password = ''.join(random.choice(characters) for _ in range(length))
    return password

if __name__ == "__main__":
    print("Generated Password:", create_password(5))