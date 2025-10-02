import re
import string


def check_password_strength(password: str) -> dict:
    """Проверка надежности пароля."""

    result = {
        "length": len(password),
        "has_lower": bool(re.search(r"[a-z]", password)),
        "has_upper": bool(re.search(r"[A-Z]", password)),
        "has_digit": bool(re.search(r"\d", password)),
        "has_special": bool(re.search(rf"[{re.escape(string.punctuation)}]", password)),
        "has_space": " " in password,
        "score": 0,
        "strength": "Очень слабый"
    }

    # Минимальные требования
    if result["length"] >= 8:
        result["score"] += 1
    if result["length"] >= 12:
        result["score"] += 1

    if result["has_lower"]: result["score"] += 1
    if result["has_upper"]: result["score"] += 1
    if result["has_digit"]: result["score"] += 1
    if result["has_special"]: result["score"] += 1

    # Оценка
    if result["score"] <= 2:
        result["strength"] = "Очень слабый"
    elif result["score"] == 3:
        result["strength"] = "Слабый"
    elif result["score"] == 4:
        result["strength"] = "Средний"
    elif result["score"] == 5:
        result["strength"] = "Сильный"
    else:
        result["strength"] = "Очень сильный"

    return result


if __name__ == "__main__":
    print(check_password_strength("")['strength'])
